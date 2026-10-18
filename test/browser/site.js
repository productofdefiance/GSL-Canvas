// Serving a production build to the browser tests (v51.23), for pixel.js and load.js.
//   serveSite(page, dir): http://gsl.test/ answers from a build folder (prod.js output), as Netlify serves it.
//   startServer(dir): the same folder on a real local server with gzip (load.js).
//   playCdn(page): answers the Tailwind play CDN's request (cdn.tailwindcss.com, unreachable from Claude Code
//   cloud sessions) with a stand-in that does what the play CDN does: it watches the page's class names and
//   keeps one <style> at the end of <head> holding Tailwind 3.4.17 compiled with the page's own
//   tailwind.config. It compiles in Node, not in the page, so it shows the play CDN's styles but not its cost:
//   load numbers measured with it leave out the CDN's download and its in-browser compile.
//   window.__twBusy counts compiles still running; pixel.js waits for 0. window.__twSeen holds every class seen.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const postcss = require('postcss');
const tailwind = require('tailwindcss');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.ico': 'image/x-icon', '.png': 'image/png', '.svg': 'image/svg+xml', '.map': 'application/json', '.txt': 'text/plain' };

async function serveSite(page, dir) {
  dir = path.resolve(dir);
  await page.route('http://gsl.test/**', (r) => {
    let p = decodeURIComponent(new URL(r.request().url()).pathname);
    let f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(dir, 'index.html');
    let body = fs.readFileSync(f);
    // PX_DOCTYPE=1 (diagnosis only): put a doctype in front of a page that has none, to see what standards mode
    // alone changes against quirks mode.
    if (process.env.PX_DOCTYPE && f.endsWith('index.html') && !/^<!doctype/i.test(body.toString())) body = Buffer.from('<!doctype html>' + body);
    r.fulfill({ body, contentType: TYPES[path.extname(f)] || 'application/octet-stream' });
  });
}

// A real local server for load.js: files from a build folder, text compressed as Netlify serves it (gzip here;
// Netlify may send brotli, a little smaller). Resolves to { url, close }.
function startServer(dir) {
  dir = path.resolve(dir);
  const http = require('http');
  const srv = http.createServer((req, res) => {
    let f = path.join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(dir, 'index.html');
    const type = TYPES[path.extname(f)] || 'application/octet-stream';
    let body = fs.readFileSync(f);
    const head = { 'content-type': type, 'cache-control': 'no-store' };
    if (/^text|json|javascript|svg/.test(type)) { body = zlib.gzipSync(body); head['content-encoding'] = 'gzip'; }
    res.writeHead(200, head);
    res.end(body);
  });
  return new Promise((ok) => srv.listen(0, '127.0.0.1', () => ok({ url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close() })));
}

const STANDIN = `(function () {
  window.tailwind = window.tailwind || {};
  var style = document.createElement('style');
  document.head.appendChild(style);
  var seen = new Set(), queue = Promise.resolve();
  window.__twSeen = seen;
  window.__twBusy = 0;
  function scan() {
    var fresh = false;
    document.querySelectorAll('[class]').forEach(function (el) {
      (el.getAttribute('class') || '').split(/\\s+/).forEach(function (c) { if (c && !seen.has(c)) { seen.add(c); fresh = true; } });
    });
    if (!fresh) return;
    var classes = Array.from(seen).join(' '), config = JSON.stringify(window.tailwind.config || {});
    window.__twBusy++;
    queue = queue.then(function () { return window.__twCompile(classes, config); }).then(function (css) { style.textContent = css; window.__twBusy--; });
  }
  new MutationObserver(scan).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  document.addEventListener('DOMContentLoaded', scan);
  scan();
})();`;

// Static stand-in: one stylesheet compiled ahead (playCdnCss), put in place the moment the CDN script runs, so
// the page never draws unstyled. Used for the pixel comparison: the dynamic stand-in's styles arrive a round trip
// late, after the page's first measurements (e.g. a season strip scrolling its selected chip into view).
async function playCdnStatic(page, css) {
  const body = `(function(){window.tailwind=window.tailwind||{};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);})();`;
  await page.route('https://cdn.tailwindcss.com/**', (r) => r.fulfill({ body, contentType: 'text/javascript' }));
}
// The CSS for playCdnStatic: Tailwind 3.4.17 for a class list, with the build's own inline config (its index.html's
// script after the CDN tag, run here as the page runs it).
async function playCdnCss(indexHtml, classes) {
  const m = indexHtml.match(/cdn\.tailwindcss\.com[^>]*><\/script>\s*<script>([\s\S]*?)<\/script>/);
  if (!m) throw new Error('no inline tailwind.config after the play CDN tag');
  const ctx = { tailwind: {} };
  require('vm').runInNewContext(m[1], ctx);
  const r = await postcss([tailwind({ ...ctx.tailwind.config, content: [{ raw: classes, extension: 'html' }] })]).process('@tailwind base;@tailwind components;@tailwind utilities;', { from: undefined });
  return r.css;
}

async function playCdn(page) {
  await page.exposeFunction('__twCompile', async (classes, config) => {
    const cfg = JSON.parse(config);
    const r = await postcss([tailwind({ ...cfg, content: [{ raw: classes, extension: 'html' }] })]).process('@tailwind base;@tailwind components;@tailwind utilities;', { from: undefined });
    return r.css;
  });
  await page.route('https://cdn.tailwindcss.com/**', (r) => r.fulfill({ body: STANDIN, contentType: 'text/javascript' }));
}

module.exports = { serveSite, startServer, playCdn, playCdnStatic, playCdnCss };
