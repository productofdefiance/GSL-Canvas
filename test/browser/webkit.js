// Safari engine check (v51.25): every page and tab of a production build (prod.js output, the site's own index.html,
// CSS and script) in Playwright's WebKit at 390 and 1440. Fails on a page error, a page that draws nothing, or a page
// that scrolls sideways. The rest of the kit runs Chromium; this catches Safari-only breakage.
//   node webkit.js [buildDir]        (default ../out/prod; build it first: node prod.js . ../out/prod)
//   ENGINE=chromium node webkit.js   (the same check in Chromium, where WebKit can't be installed)
// No fixed waits: each view polls until the page has drawn and its height holds still. Hard timeout: --max seconds (480).
const path = require('path');
const pw = require('playwright');
const { TABS, PAGEKEY } = require('../pages');
const { serveSite } = require('./site');

const DIR = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : path.join(__dirname, '../out/prod'));
const ENGINE = process.env.ENGINE || 'webkit';
const maxArg = process.argv.indexOf('--max');
const MAX = (maxArg > 0 ? Number(process.argv[maxArg + 1]) : 480) * 1000;
setTimeout(() => { console.log(`timeout after ${MAX / 1000}s`); process.exit(2); }, MAX).unref();

(async () => {
  const br = await pw[ENGINE].launch();
  const fails = [];
  let n = 0;
  for (const w of [390, 1440]) for (const page of Object.keys(TABS)) for (const tab of TABS[page]) {
    const p = await br.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await serveSite(p, DIR);
    await p.addInitScript(`globalThis.__OV=${JSON.stringify({ 'App:sectionId': page, [PAGEKEY[page]]: tab })};`);
    await p.goto('http://gsl.test/');
    const tag = `${page}/${tab} ${w}`;
    const drawn = await p.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, null, { polling: 100, timeout: 20000 }).then(() => true, () => false);
    if (!drawn) fails.push(`${tag}: nothing drawn`);
    let last = -1, sw = 0;
    for (let i = 0; i < 40 && drawn; i++) {
      const r = await p.evaluate(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok([document.documentElement.scrollHeight, document.documentElement.scrollWidth])))));
      sw = r[1];
      if (r[0] === last) break;
      last = r[0];
    }
    if (errs.length) fails.push(`${tag}: page error: ${errs[0].slice(0, 200)}`);
    if (sw > w) fails.push(`${tag}: page scrolls sideways (${sw}px wide at ${w})`);
    n++;
    await p.close();
  }
  await br.close();
  fails.forEach((f) => console.log(`${ENGINE.toUpperCase()} ${f}`));
  console.log(`${ENGINE}: ${n} views; ${fails.length} failures`);
  process.exitCode = fails.length ? 1 : 0;
})().catch((e) => { console.error(e.message); process.exit(1); });
