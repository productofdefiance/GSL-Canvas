// Load numbers (v51.23): a production build (prod.js --plain) at 390 with 4x CPU slowdown in Chromium.
// Per run: first contentful paint; League drawn (the last change to the page's height, stylesheets or fonts,
// once nothing has changed for 1.5s); bytes downloaded (Google Fonts included, the play CDN stand-in left out); CSS bytes (stylesheet files plus
// index.html's inline style; with the play CDN, the stand-in's compiled style). Prints each run and the middle one.
//   node load.js <buildDir> [--playcdn <classesFile>] [--runs 3]
// --playcdn answers the play CDN with site.js's static stand-in (styles for the classes in classesFile, from
// pixel.js PX_CLASSES), in place at once: a lower bound for a play CDN page, without the CDN's download and compile.
// No fixed waits beyond the 1.5s quiet window; hard timeout 300s.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { startServer, playCdnStatic, playCdnCss } = require('./site');

const dir = path.resolve(process.argv[2] || '');
const ci = process.argv.indexOf('--playcdn');
const CLASSES = ci > 0 ? process.argv[ci + 1] : null;
const ri = process.argv.indexOf('--runs');
const RUNS = ri > 0 ? Number(process.argv[ri + 1]) : 3;
setTimeout(() => { console.log('timeout after 300s'); process.exit(2); }, 300000).unref();

const WATCH = `(() => {
  const t = { last: 0 };
  window.__load = t;
  const key = () => [document.documentElement.scrollHeight, document.styleSheets.length, document.fonts ? document.fonts.status : '', [...document.querySelectorAll('style')].reduce((n, s) => n + s.textContent.length, 0), document.querySelectorAll('#root *').length].join('|');
  let k = '';
  const tick = () => { const n = key(); if (n !== k) { k = n; t.last = performance.now(); } requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
})();`;

async function run(br, cdnCss, url) {
  const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  if (cdnCss) await playCdnStatic(p, cdnCss);
  await p.addInitScript(WATCH);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  let bytes = 0;
  const cssBytes = {};
  const types = {};
  const cdnIds = new Set();
  cdp.on('Network.responseReceived', (e) => { types[e.requestId] = e.type; if (e.response.url.includes('cdn.tailwindcss.com')) cdnIds.add(e.requestId); });
  // The stand-in's own response is left out of the bytes: it isn't the real CDN script.
  cdp.on('Network.loadingFinished', (e) => { if (cdnIds.has(e.requestId)) return; bytes += e.encodedDataLength; if (types[e.requestId] === 'Stylesheet') cssBytes[e.requestId] = e.encodedDataLength; });
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__load && window.__load.last > 0 && performance.now() - window.__load.last > 1500, null, { polling: 250, timeout: 120000 });
  const m = await p.evaluate(() => {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    const inline = [...document.querySelectorAll('style')].reduce((n, s) => n + s.textContent.length, 0);
    return { fcp: fcp ? fcp.startTime : null, drawn: window.__load.last, inline, league: !!document.querySelector('main, #root > *') };
  });
  await ctx.close();
  return { ...m, bytes, css: Object.values(cssBytes).reduce((a, b) => a + b, 0) };
}

(async () => {
  const cdnCss = CLASSES ? await playCdnCss(fs.readFileSync(path.join(dir, 'index.html'), 'utf8'), fs.readFileSync(CLASSES, 'utf8')) : null;
  const srv = await startServer(dir);
  const br = await chromium.launch();
  const rs = [];
  for (let i = 0; i < RUNS; i++) {
    const r = await run(br, cdnCss, srv.url);
    rs.push(r);
    console.log(`run ${i + 1}: first paint ${Math.round(r.fcp)}ms · League drawn ${Math.round(r.drawn)}ms · downloaded ${(r.bytes / 1024).toFixed(1)} KB · stylesheets ${(r.css / 1024).toFixed(1)} KB transferred · inline style ${(r.inline / 1024).toFixed(1)} KB`);
  }
  await br.close();
  srv.close();
  const mid = (k) => rs.map((r) => r[k]).sort((a, b) => a - b)[Math.floor(rs.length / 2)];
  console.log(`middle: first paint ${Math.round(mid('fcp'))}ms · League drawn ${Math.round(mid('drawn'))}ms · downloaded ${(mid('bytes') / 1024).toFixed(1)} KB`);
})().catch((e) => { console.error(e.message); process.exit(1); });
