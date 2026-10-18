// Empty-save check (v51.22): every page and tab at 390 and 1440 against two workbooks:
//   empty         every sheet missing
//   headers-only  every sheet keeps its heading rows: each tab's rows up to (not including) its first row with a number
// Fails on a React error or a section crash, or on "NaN", "undefined", "null" or any club name in the visible text.
// Run after build.js (reads out/). Club names: clubs.js (the sheet's club directory).
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
require('./stubs');
const setScreen = require('./env');
const { clubNames } = require('./clubs');
const { TABS, PAGEKEY } = require('./pages');

const { sheetData } = require('./out/sheetData.js');
const headersOnly = {};
for (const [tab, rows] of Object.entries(sheetData)) {
  const out = [];
  for (const r of rows) {
    if ((r.row || []).some((v) => typeof v === 'number')) break;
    out.push(r);
  }
  headersOnly[tab] = out;
}
const WORKBOOKS = { empty: {}, 'headers-only': headersOnly };

const { abbrs, names } = clubNames();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Names: whole words, any case, longer than 3 letters; abbreviations: whole words in capitals.
const nameRe = new RegExp(`(^|[^\\p{L}\\p{N}])(${[...names].filter((n) => n.length > 3).sort((a, b) => b.length - a.length).map(esc).join('|')})(?=$|[^\\p{L}\\p{N}])`, 'giu');
const abbrRe = new RegExp(`(^|[^\\p{L}\\p{N}])(${[...abbrs].sort((a, b) => b.length - a.length).map(esc).join('|')})(?=$|[^\\p{L}\\p{N}])`, 'gu');
// Allowed: rules-allow.json "empty" entries ({ page, text, kind, reason }); an entry that matches nothing fails.
const ALLOW = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'rules-allow.json'), 'utf8')).empty || [];
const usedAllow = new Set();

function visibleText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

const origErr = console.error;
let caught = [];
console.error = (...a) => caught.push(a.map(String).join(' ').slice(0, 200));
console.warn = () => {};
let n = 0;
const fails = [];
for (const [wb, sheets] of Object.entries(WORKBOOKS)) {
  for (const w of [390, 1440]) {
    for (const page of Object.keys(TABS)) for (const tab of TABS[page]) {
      setScreen(w);
      for (const k of Object.keys(require.cache)) if (k.includes('/out/') && !k.endsWith('sheetData.js')) delete require.cache[k];
      globalThis.__OV = { 'App:sectionId': page, [PAGEKEY[page]]: tab };
      caught = [];
      const App = require('./out/App.js').default;
      let html = '';
      try { html = renderToStaticMarkup(React.createElement(App, { sheets })); } catch (e) { caught.push(`THROW ${e.message}`); }
      n++;
      const tag = `${wb} ${page}/${tab} ${w}`;
      const errs = caught.filter((c) => !/useLayoutEffect|act\(/.test(c));
      if (errs.length) fails.push(`${tag}: React error: ${errs[0]}`);
      const text = visibleText(html);
      if (/section hit an error/.test(text)) fails.push(`${tag}: section crashed: ${(text.match(/section hit an error\.?\s*(.{0,120})/) || [])[1]}`);
      const bad = text.match(/(^|[^\p{L}])(NaN|undefined|null)(?=$|[^\p{L}])/u);
      if (bad) { const i = text.indexOf(bad[0]); fails.push(`${tag}: "${bad[2]}" in "${text.slice(Math.max(0, i - 50), i + 50).trim()}"`); }
      for (const re of [nameRe, abbrRe]) {
        for (const m of text.matchAll(re)) {
          const a = ALLOW.find((x) => x.page === page && x.text.toUpperCase() === m[2].toUpperCase());
          if (a) { usedAllow.add(a); continue; }
          const i = m.index;
          fails.push(`${tag}: club name "${m[2]}" in "${text.slice(Math.max(0, i - 50), i + 50).trim()}"`);
          break;
        }
      }
    }
  }
}
console.error = origErr;
ALLOW.filter((a) => !usedAllow.has(a)).forEach((a) => fails.push(`rules-allow.json: empty entry matches nothing, remove it (${a.page} "${a.text}")`));
fails.forEach((f) => console.log(`EMPTY ${f}`));
console.log(`empty save: ${n} renders (empty and headers-only workbooks, 390 and 1440); ${fails.length} failures`);
process.exitCode = fails.length ? 1 : 0;
