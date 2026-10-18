// Layout diff (v51.24): what moved between two production builds (prod.js output), view by view. Loads the same
// page, tab, width and theme from both builds, walks every element in page order (same source, so the same DOM)
// and reports the deepest elements whose height, width or text colour changed, grouped by tag and class, with how
// many and by how much. Use it to explain a pixel.js difference.
//   node layout.js <buildA> <buildB> [view …]      a view is page-tab-width (e.g. cups-rivalries-390); none = all
// Options: --dark; --top N (groups per view, default 8); --json <file> (every view's result).
// No fixed waits: each load polls until the page has settled (as pixel.js does). Hard timeout: --max seconds (900).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { TABS, PAGEKEY } = require('../pages');
const { serveSite } = require('./site');

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const [A, B] = argv;
const DARK = argv.includes('--dark');
const TOP = Number(opt('--top', 8));
const JSON_OUT = opt('--json', null);
const MAX = Number(opt('--max', 900)) * 1000;
const named = argv.slice(2).filter((x, i, all) => !x.startsWith('--') && !['--top', '--json', '--max'].includes(all[i - 1]));
setTimeout(() => { console.log(`timeout after ${MAX / 1000}s`); process.exit(2); }, MAX).unref();

const views = [];
for (const w of [390, 1440]) for (const page of Object.keys(TABS)) for (const tab of TABS[page]) views.push({ page, tab, w, id: `${page}-${tab}-${w}` });
const todo = named.length ? views.filter((v) => named.includes(v.id)) : views;

async function settle(p) {
  await p.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, null, { polling: 'raf', timeout: 15000 });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  let last = -1;
  for (let i = 0; i < 60; i++) {
    const h = await p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(document.documentElement.scrollHeight)))));
    if (h === last) return;
    last = h;
  }
}

async function grab(br, dir, v) {
  const p = await br.newPage({ viewport: { width: v.w, height: 900 } });
  await serveSite(p, dir);
  await p.addInitScript(`localStorage.setItem('gsl-theme','${DARK ? 'dark' : 'light'}');globalThis.__OV=${JSON.stringify({ 'App:sectionId': v.page, [PAGEKEY[v.page]]: v.tab })};`);
  await p.goto('http://gsl.test/');
  await settle(p);
  const r = await p.evaluate(() => {
    const els = [...document.querySelectorAll('#root *')];
    const idx = new Map(els.map((e, i) => [e, i]));
    return {
      mode: document.compatMode,
      height: document.documentElement.scrollHeight,
      width: document.documentElement.scrollWidth,
      els: els.map((e) => {
        const b = e.getBoundingClientRect();
        const c = getComputedStyle(e);
        const own = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
        return { tag: e.tagName.toLowerCase(), cls: (e.getAttribute('class') || '').trim(), h: Math.round(b.height * 2) / 2, w: Math.round(b.width * 2) / 2, color: own ? c.color : '', text: (e.textContent || '').trim().slice(0, 24), parent: e.parentElement && idx.has(e.parentElement) ? idx.get(e.parentElement) : -1 };
      }),
    };
  });
  await p.close();
  return r;
}

function compare(a, b) {
  const out = { before: { h: a.height, w: a.width, mode: a.mode }, after: { h: b.height, w: b.width, mode: b.mode }, groups: [], colors: [] };
  if (a.els.length !== b.els.length) { out.error = `element count ${a.els.length} vs ${b.els.length}`; return out; }
  // An element counts when its height (or width) changed and none of its children's did: the deepest cause.
  const changed = a.els.map((e, i) => e.h !== b.els[i].h || e.w !== b.els[i].w);
  const childChanged = new Set();
  a.els.forEach((e, i) => { if (changed[i] && e.parent >= 0) childChanged.add(e.parent); });
  const groups = {};
  const colors = {};
  a.els.forEach((e, i) => {
    const f = b.els[i];
    if (changed[i] && !childChanged.has(i)) {
      const k = `${e.tag}.${e.cls}`;
      const g = groups[k] || (groups[k] = { tag: e.tag, cls: e.cls, n: 0, dh: {}, dw: {}, sample: e.text, from: e.h, to: f.h });
      g.n++;
      const dh = Math.round((f.h - e.h) * 2) / 2, dw = Math.round((f.w - e.w) * 2) / 2;
      if (dh) g.dh[dh] = (g.dh[dh] || 0) + 1;
      if (dw) g.dw[dw] = (g.dw[dw] || 0) + 1;
    }
    if (e.color !== f.color) {
      const k = `${e.tag}.${e.cls} ${e.color} → ${f.color}`;
      colors[k] = (colors[k] || 0) + 1;
    }
  });
  out.groups = Object.values(groups).sort((x, y) => y.n - x.n);
  out.colors = Object.entries(colors).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${n}× ${k}`);
  return out;
}

(async () => {
  const br = await chromium.launch();
  const all = {};
  for (const v of todo) {
    const r = compare(await grab(br, A, v), await grab(br, B, v));
    all[v.id] = r;
    const moved = r.before.h !== r.after.h || r.before.w !== r.after.w || r.groups.length || r.colors.length;
    if (!moved) { console.log(`${v.id}: same`); continue; }
    console.log(`${v.id}: page ${r.before.w}×${r.before.h} → ${r.after.w}×${r.after.h} (${r.before.mode} → ${r.after.mode})${r.error ? ' · ' + r.error : ''}`);
    r.groups.slice(0, TOP).forEach((g) => console.log(`   ${g.n}× <${g.tag} class="${g.cls.slice(0, 90)}"> ${g.from}→${g.to}px tall · Δh ${JSON.stringify(g.dh)}${Object.keys(g.dw).length ? ' · Δw ' + JSON.stringify(g.dw) : ''} · "${g.sample}"`));
    if (r.groups.length > TOP) console.log(`   … ${r.groups.length - TOP} more groups`);
    r.colors.slice(0, 3).forEach((c) => console.log(`   colour: ${c.slice(0, 160)}`));
  }
  await br.close();
  if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(all, null, 1));
})().catch((e) => { console.error(e.message); process.exit(1); });
