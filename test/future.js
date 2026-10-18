// Future-save check (v51.25): the canvas on a synthetic workbook that runs the save to its limits.
// Built from today's workbook (out/sheetData.js), within the save's own limits: at most 15 seasons, 4 divisions,
// 92 clubs in the Pyramid. Nothing here is a real result; no club name is added that isn't already in the data.
//   - League: S9–S15 filled into the sheet's own template rows (3 rows a season). S9–S11 repeat S5–S7's results;
//     S12 is a relegation season (S8's matches, most results turned around, 18th); S13 is in Division 2 (46 games,
//     S3's results) and faces the 8 Pyramid clubs the save never met (ROMA, MARSEILLE, PORTO, BRENTFORD, BRAGA,
//     RANGERS, AZ, YOUNG BOYS), so every club has been faced; S14 is back in Division 1 (S4's results); S15 is half
//     played (S5's first 19 matchdays).
//   - Long names: a few clubs show the longest names the data already holds ("BRIGHTON AND HOVE ALBION FC",
//     "WOLVERHAMPTON WANDERERS FC", "SPORTING CLUBE DE PORTUGAL", "BAYERN MÜNCHEN", "MÖNCHENGLADBACH").
//   - Pyramid: a finishing position for all 92 clubs in S9–S15 (each division reshuffled, three up and three down
//     each time; the save's club placed as above); completed seasons 14.
//   - Cups: S9–S15 campaigns (S5–S8's repeated); Winners: season blocks for S10–S15 (S6–S8's repeated).
// Checks, every page and tab at 390 and 1440:
//   server render: no React error, no section crash, no "NaN", "undefined" or "null" on screen;
//   browser (the kit's bundle with this workbook): no page error, no sideways page scroll.
// Exit 1 on any failure. Things that render but look wrong are flags (FLAGS.md), not failures.
// Usage: node future.js [--shots <dir>]   (run after build.js; --shots saves a screenshot of every view)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FIRST = 9, LAST = 15;
const clone = (x) => JSON.parse(JSON.stringify(x));
// Deterministic shuffles (same fixture every run)
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; }; }

function buildFutureSave(base) {
  const wb = clone(base);
  const rand = rng(51025);

  // ── League ──
  const L = wb.League;
  const at = (i) => { let r = L.find((x) => x.index_ === i); if (!r) { r = { index_: i, row: [] }; L.push(r); } return r; };
  const head = at(1).row;
  let mdEnd = head.length;
  for (let c = 33; c < head.length; c++) if (head[c] != null && head[c] !== '') { mdEnd = c; break; }
  const MDS = Math.floor((mdEnd - 32) / 4);
  const main = (s) => 16 + 3 * (s - 1); // S1 is row 16, three rows a season
  const abbrRow = at(6).row, nameRow = at(3).row;
  const colOf = (abbr) => { for (let c = 253; c < nameRow.length; c += 2) if (String(abbrRow[c] || abbrRow[c + 1] || '').trim() === abbr) return c; return -1; };

  function copySeason(to, from, { div, keepMds = MDS, flip = 0 } = {}) {
    const year = at(main(to)).row[1];
    for (let k = 0; k < 3; k++) at(main(to) + k).row = clone(at(main(from) + k).row);
    const [m, res, gd] = [0, 1, 2].map((k) => at(main(to) + k).row);
    m[0] = to; m[1] = year;
    if (div) m[2] = div;
    let W = 0, D = 0, Lo = 0, GF = 0, GA = 0, gp = 0;
    for (let md = 1; md <= MDS; md++) {
      const b = 32 + 4 * (md - 1);
      if (md > keepMds) { for (const r of [m, res, gd]) for (let j = 0; j < 4; j++) r[b + j] = null; continue; }
      if (!m[b + 1]) continue;
      let o = String(res[b] || '').toUpperCase(), f = Number(res[b + 1]) || 0, a = Number(res[b + 3]) || 0;
      if (o === 'W' && rand() < flip) { o = 'L'; [f, a] = [a, f]; res[b] = 'L'; res[b + 1] = f; res[b + 3] = a; gd[b + 1] = f - a; }
      gp++; GF += f; GA += a;
      if (o === 'W') W++; else if (o === 'D') D++; else if (o === 'L') Lo++;
    }
    Object.assign(m, { 5: W * 3 + D, 7: gp, 8: W, 9: D, 10: Lo, 11: GF, 12: GA, 13: GF - GA });
    return m;
  }
  copySeason(9, 5); copySeason(10, 6); copySeason(11, 7);
  const s12 = copySeason(12, 8, { flip: 0.7 }); s12[4] = 18; s12[3] = null; s12[6] = null; at(main(12) + 1).row[6] = null; at(main(12) + 2).row[6] = null;
  const s13 = copySeason(13, 3, { div: 'DIV 2' });
  // S13 meets the clubs the save never faced (home and away), so every Pyramid club has been played
  const never = [];
  for (let c = 253; c < nameRow.length; c += 2) {
    if (nameRow[c] && !String(nameRow[c]).startsWith('#') && !(at(9).row || [])[c]) never.push(String(abbrRow[c] || abbrRow[c + 1]).trim());
  }
  never.forEach((abbr, i) => {
    for (const md of [1 + i, 24 + i]) s13[32 + 4 * (md - 1) + 1] = abbr;
    const c = colOf(abbr);
    const r = at(main(13) + 1).row, b1 = 32 + 4 * i, b2 = 32 + 4 * (23 + i);
    const pts = [r[b1], r[b2]].map((o) => String(o || '').toUpperCase());
    at(9).row[c] = 2; at(10).row[c] = pts.filter((o) => o === 'W').length; at(11).row[c] = pts.filter((o) => o === 'D').length;
    at(12).row[c] = pts.filter((o) => o === 'L').length;
    at(13).row[c] = (r[b1 + 1] - r[b1 + 3]) + (r[b2 + 1] - r[b2 + 3]);
  });
  copySeason(14, 4);
  const s15 = copySeason(15, 5, { keepMds: 19 }); s15[3] = null; s15[6] = null; at(main(15) + 1).row[6] = null; at(main(15) + 2).row[6] = null;
  // Long names already in the data
  const LONG = { BHA: 'BRIGHTON AND HOVE ALBION FC', WOL: 'WOLVERHAMPTON WANDERERS FC', SPO: 'SPORTING CLUBE DE PORTUGAL', BAY: 'BAYERN MÜNCHEN', BMG: 'MÖNCHENGLADBACH' };
  for (const [abbr, name] of Object.entries(LONG)) { const c = colOf(abbr); if (c >= 0) nameRow[c] = name; }

  // ── Pyramid: positions 1–92 for S9–S15 ──
  const P = wb.Pyramid;
  const clubs = P.filter((r) => r.index_ > 5 && typeof (r.row || [])[30] === 'string' && r.row[30].trim());
  for (const r of clubs) { const n = LONG[r.row[30].trim()]; if (n) { r.row[31] = n; r.row[33] = n; } }
  const own = clubs.find((r) => String(r.row[31] || '').includes('✦'));
  const DIVS = [[1, 20], [21, 44], [45, 68], [69, 92]];
  const ownAt = { 9: 1, 10: 1, 11: 1, 12: 18, 13: 21, 14: 3, 15: 2 };
  let order = clubs.slice().sort((a, b) => a.row[36 + 2 * 7] - b.row[36 + 2 * 7]); // S8 finish
  for (let s = FIRST; s <= LAST; s++) {
    // three up, three down between neighbouring divisions, then each division reshuffled
    const next = order.slice();
    for (let d = 0; d < 3; d++) { const lo = DIVS[d][1]; for (let k = 0; k < 3; k++) { const i = lo - 3 + k, j = lo + k; [next[i], next[j]] = [next[j], next[i]]; } }
    for (const [a, b] of DIVS) { const part = next.slice(a - 1, b); for (let i = part.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [part[i], part[j]] = [part[j], part[i]]; } next.splice(a - 1, part.length, ...part); }
    next.splice(next.indexOf(own), 1); next.splice(ownAt[s] - 1, 0, own);
    next.forEach((r, i) => { r.row[36 + 2 * (s - 1)] = i + 1; r.row[37 + 2 * (s - 1)] = null; });
    order = next;
  }
  const p3 = P.find((r) => r.index_ === 3); if (p3) p3.row[69] = LAST - 1;

  // ── Cups: S9–S15 campaigns, 15 rows a season (S5–S8 repeated) ──
  const C = wb.Cups;
  const starts = {};
  C.forEach((r) => { const x = r.row || []; if (typeof x[2] === 'number' && typeof x[1] === 'string' && /\d{4}/.test(x[1])) starts[x[2]] = r.index_; });
  const per = starts[8] - starts[7];
  const years = {};
  for (let s = FIRST; s <= LAST; s++) years[s] = `${2023 + s} - ${String(24 + s).padStart(2, '0')}`;
  const keep = C.filter((r) => r.index_ < starts[8] + per);
  for (let s = FIRST; s <= LAST; s++) {
    const from = 5 + ((s - FIRST) % 4);
    for (let k = 0; k < per; k++) {
      const src = C.find((r) => r.index_ === starts[from] + k);
      const row = clone((src && src.row) || []);
      if (k === 0) { row[1] = years[s]; row[2] = s; }
      if (typeof row[0] === 'number') row[0] = k % 3 === 0 ? 2 * s + 4 : 5 * s + 1;
      keep.push({ index_: starts[8] + per + (s - FIRST) * per + k, row });
    }
  }
  wb.Cups = keep;

  // ── Winners: a block of five columns per season, found by the year headers ──
  const Wn = wb.Winners;
  const hdr = Wn.find((r) => (r.row || []).some((c) => /^\d{4}\s*-\s*\d{2}$/.test(String(c || '').trim())));
  if (hdr) {
    const blocks = []; hdr.row.forEach((c, i) => { if (/^\d{4}\s*-\s*\d{2}$/.test(String(c || '').trim())) blocks.push(i); });
    const after = blocks[blocks.length - 1] + 5, add = (LAST - blocks.length) * 5;
    for (const r of Wn) {
      const row = r.row || [];
      const tail = row.slice(after);
      row.length = Math.max(row.length, after);
      for (let s = blocks.length + 1; s <= LAST; s++) {
        const b = after + (s - blocks.length - 1) * 5, src = blocks[5 + ((s - 1) % 3)];
        for (let j = 0; j < 5; j++) row[b + j] = row[src + j] === undefined ? null : clone(row[src + j]);
      }
      tail.forEach((v, j) => { row[after + add + j] = v; });
      r.row = row;
    }
    for (let s = blocks.length + 1; s <= LAST; s++) hdr.row[after + (s - blocks.length - 1) * 5] = years[s];
  }
  return wb;
}

module.exports = { buildFutureSave };
if (require.main !== module) return;

// ───────────────────────── the check ─────────────────────────
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
require('./stubs');
const setScreen = require('./env');
const { TABS, PAGEKEY } = require('./pages');
const { sheetData } = require('./out/sheetData.js');
const sheets = buildFutureSave(sheetData);
const shotsArg = process.argv.indexOf('--shots');
const SHOTS = shotsArg > 0 ? path.resolve(process.argv[shotsArg + 1]) : null;
const fails = [];
const visibleText = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const badWord = (text) => text.match(/(^|[^\p{L}])(NaN|undefined|null)(?=$|[^\p{L}])/u);

// 1. Server render
const origErr = console.error;
let caught = [];
console.error = (...a) => caught.push(a.map(String).join(' ').slice(0, 200));
console.warn = () => {};
let n = 0;
for (const w of [390, 1440]) for (const page of Object.keys(TABS)) for (const tab of TABS[page]) {
  setScreen(w);
  for (const k of Object.keys(require.cache)) if (k.includes('/out/') && !k.endsWith('sheetData.js')) delete require.cache[k];
  globalThis.__OV = { 'App:sectionId': page, [PAGEKEY[page]]: tab };
  caught = [];
  const App = require('./out/App.js').default;
  let html = '';
  try { html = renderToStaticMarkup(React.createElement(App, { sheets })); } catch (e) { caught.push(`THROW ${e.message}`); }
  n++;
  const tag = `${page}/${tab} ${w}`;
  const errs = caught.filter((c) => !/useLayoutEffect|act\(/.test(c));
  if (errs.length) fails.push(`${tag}: React error: ${errs[0]}`);
  const text = visibleText(html);
  if (/section hit an error/.test(text)) fails.push(`${tag}: section crashed`);
  const bad = badWord(text);
  if (bad) { const i = text.indexOf(bad[0]); fails.push(`${tag}: "${bad[2]}" in "${text.slice(Math.max(0, i - 50), i + 50).trim()}"`); }
}
console.error = origErr;
console.log(`future save, server render: ${n} renders; ${fails.length} failures`);

// 2. Browser: the kit's bundle with this workbook, the site's stylesheet
(async () => {
  const OUT = path.join(__dirname, 'out');
  execFileSync('node', [path.join(__dirname, 'css.js'), path.join(OUT, 'no-snapshots'), path.join(OUT, 'future.css')], { stdio: 'ignore' });
  execFileSync('node', ['bundle.js', 'entry.js', path.join(OUT, 'future.bundle.js')], { cwd: path.join(__dirname, 'browser'), stdio: 'ignore' });
  const css = fs.readFileSync(path.join(OUT, 'future.css'), 'utf8');
  const bundle = fs.readFileSync(path.join(OUT, 'future.bundle.js'), 'utf8');
  const fonts = (fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8').match(/<link [^>]*fonts\.(googleapis|gstatic)\.com[^>]*>/g) || []).join('');
  const { chromium } = require('playwright');
  const timer = setTimeout(() => { console.log('future save: timeout after 300s'); process.exit(2); }, 300000);
  const br = await chromium.launch();
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  const before = fails.length;
  let m = 0;
  for (const w of [390, 1440]) for (const page of Object.keys(TABS)) for (const tab of TABS[page]) {
    const p = await br.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${fonts}<style>${css}</style>`
      + `<script>globalThis.__OV=${JSON.stringify({ 'App:sectionId': page, [PAGEKEY[page]]: tab })};globalThis.__SHEETS=${JSON.stringify(sheets).replace(/</g, '\\u003c')}</script>`
      + `</head><body><div id="root"></div><script>${bundle}</script></body></html>`;
    await p.route('http://gsl.test/', (r) => r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' }));
    await p.goto('http://gsl.test/');
    await p.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, null, { polling: 'raf', timeout: 20000 }).catch(() => errs.push('nothing rendered'));
    await p.evaluate(() => document.fonts && document.fonts.ready);
    const r = await p.evaluate(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok({ sw: document.documentElement.scrollWidth, text: document.body.innerText })))));
    const tag = `${page}/${tab} ${w}`;
    if (errs.length) fails.push(`${tag}: page error: ${errs[0].slice(0, 160)}`);
    if (r.sw > w) fails.push(`${tag}: page scrolls sideways (${r.sw}px wide at ${w})`);
    const bad = badWord(r.text.replace(/\s+/g, ' '));
    if (bad) fails.push(`${tag}: "${bad[2]}" on screen in the browser`);
    if (SHOTS) await p.screenshot({ path: path.join(SHOTS, `${page}-${tab}-${w}.png`), fullPage: true });
    m++;
    await p.close();
  }
  await br.close();
  clearTimeout(timer);
  console.log(`future save, browser: ${m} views; ${fails.length - before} failures`);
  fails.forEach((f) => console.log(`FUTURE ${f}`));
  process.exitCode = fails.length ? 1 : 0;
})().catch((e) => { console.error(e.message); process.exit(1); });
