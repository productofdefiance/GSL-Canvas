// Pixel comparison (v51.22): screenshots every page and tab at 390 and 1440, light and dark,
// then compares two such sets pixel by pixel. The footer is hidden (its version line changes every build);
// animations, transitions and smooth scrolling are off, so a shot never catches a row mid-scroll.
//   node pixel.js shoot <dir>          (needs ../cssC.css and app.bundle.js: npm run css && npm run bundle)
//   node pixel.js diff <dirA> <dirB>   (prints every shot that differs, with the count of changed pixels)
// PX_BUNDLE / PX_CSS point a shoot at another build (e.g. main's, for the "before" set); PX_ONLY=league-fixtures,…
// shoots only those tabs (to re-check a difference).
// v51.23: PX_SITE=<dir> shoots a real production build instead (prod.js output: the site's own index.html, CSS and
// script, served as Netlify serves them); PX_PLAYCDN=1 answers a build's play CDN request with site.js's dynamic
// stand-in and writes every class the pages used to PX_CLASSES (a file); PX_PLAYCDN=<that file> then answers with
// the static stand-in compiled from those classes (styles in place before the page draws). Use the static one for
// the "before" set.
// No fixed waits: each shot polls until the page has rendered and fonts have settled. Hard timeout: --max seconds.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const { TABS, PAGEKEY } = require('../pages');
const { serveSite, playCdn, playCdnStatic, playCdnCss } = require('./site');
const [mode, a, b] = process.argv.slice(2);
const maxArg = process.argv.indexOf('--max');
const MAX = (maxArg > 0 ? Number(process.argv[maxArg + 1]) : 900) * 1000;
setTimeout(() => { console.log(`timeout after ${MAX / 1000}s`); process.exit(2); }, MAX).unref();

async function settle(p) {
  // Poll: root has content, fonts are ready, and the page height holds still for two frames.
  await p.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, null, { polling: 'raf', timeout: 15000 });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  let last = -1;
  for (let i = 0; i < 60; i++) {
    // The play CDN stand-in (site.js) compiles out of the page: wait until its styles are in.
    await p.waitForFunction(() => !window.__twBusy, null, { polling: 'raf', timeout: 15000 });
    const h = await p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(document.documentElement.scrollHeight)))));
    if (h === last) return;
    last = h;
  }
}

async function shoot(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const FREEZE = 'footer{visibility:hidden!important}\n*{caret-color:transparent!important;animation:none!important;transition:none!important;scroll-behavior:auto!important}';
  const SITE = process.env.PX_SITE && path.resolve(process.env.PX_SITE);
  const css = SITE ? '' : fs.readFileSync(process.env.PX_CSS || path.join(__dirname, '../cssC.css'), 'utf8') + '\n' + FREEZE;
  const bundle = SITE ? '' : fs.readFileSync(process.env.PX_BUNDLE || path.join(__dirname, 'app.bundle.js'), 'utf8');
  const CDN = process.env.PX_PLAYCDN;
  const cdnCss = SITE && CDN && CDN !== '1' ? await playCdnCss(fs.readFileSync(path.join(SITE, 'index.html'), 'utf8'), fs.readFileSync(CDN, 'utf8')) : null;
  const seenAll = new Set();
  const br = await chromium.launch();
  let n = 0;
  for (const w of [390, 1440]) for (const dark of [false, true]) for (const page of Object.keys(TABS)) for (const tab of TABS[page]) {
    if (process.env.PX_ONLY && !process.env.PX_ONLY.split(',').includes(`${page}-${tab}`)) continue;
    const ov = { 'App:sectionId': page, [PAGEKEY[page]]: tab };
    const p = await br.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    const pre = `localStorage.setItem('gsl-theme','${dark ? 'dark' : 'light'}');`;
    if (SITE) {
      await serveSite(p, SITE);
      if (cdnCss) await playCdnStatic(p, cdnCss);
      else if (CDN) await playCdn(p);
      await p.addInitScript(`${pre}globalThis.__OV=${JSON.stringify(ov)};document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(FREEZE)};document.head.appendChild(s);});`);
    } else {
      const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>${pre}globalThis.__OV=${JSON.stringify(ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
      await p.route('http://gsl.test/', (r) => r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' }));
    }
    await p.goto('http://gsl.test/');
    await settle(p);
    const out = path.join(dir, `${page}-${tab}-${w}-${dark ? 'dark' : 'light'}.png`);
    await p.screenshot({ path: out, fullPage: true });
    if (CDN === '1') (await p.evaluate(() => [...(window.__twSeen || [])])).forEach((c) => seenAll.add(c));
    if (errs.length) console.log(out, 'errors', JSON.stringify(errs));
    n++;
    await p.close();
  }
  await br.close();
  if (CDN === '1' && process.env.PX_CLASSES) fs.writeFileSync(process.env.PX_CLASSES, [...seenAll].sort().join(' '));
  console.log(`shot ${n}`);
}

async function diff(da, db) {
  const br = await chromium.launch();
  const p = await br.newPage();
  const files = fs.readdirSync(da).filter((f) => f.endsWith('.png')).sort();
  let same = 0;
  const bad = [];
  for (const f of files) {
    const fa = path.join(da, f), fb = path.join(db, f);
    if (!fs.existsSync(fb)) { bad.push(`${f}: missing in ${db}`); continue; }
    const A = fs.readFileSync(fa), B = fs.readFileSync(fb);
    if (A.equals(B)) { same++; continue; }
    // Decode both in the browser and count differing pixels
    const r = await p.evaluate(async ([x, y]) => {
      const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; });
      const [ia, ib] = await Promise.all([load(x), load(y)]);
      if (ia.width !== ib.width || ia.height !== ib.height) return { size: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}` };
      const get = (i) => { const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d'); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height).data; };
      const pa = get(ia), pb = get(ib);
      let n = 0, top = -1;
      for (let k = 0; k < pa.length; k += 4) if (pa[k] !== pb[k] || pa[k + 1] !== pb[k + 1] || pa[k + 2] !== pb[k + 2]) { n++; if (top < 0) top = Math.floor(k / 4 / ia.width); }
      return { n, top };
    }, [A.toString('base64'), B.toString('base64')]);
    if (r.size) bad.push(`${f}: size ${r.size}`);
    else if (r.n) bad.push(`${f}: ${r.n} pixels differ (first at y=${r.top})`);
    else same++;
  }
  await br.close();
  bad.forEach((x) => console.log(x));
  console.log(`identical ${same} of ${files.length}; different ${bad.length}`);
  process.exitCode = bad.length ? 1 : 0;
}

(mode === 'shoot' ? shoot(a) : mode === 'diff' ? diff(a, b) : Promise.reject(new Error('usage: pixel.js shoot <dir> | diff <dirA> <dirB>')))
  .catch((e) => { console.error(e.message); process.exit(1); });
