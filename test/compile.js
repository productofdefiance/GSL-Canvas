// Compile check (v51.18): parses every file in ../src with Babel's parser,
// the one react-scripts compiles with, as ES modules with JSX. Babel tracks
// declarations, so it fails on what a plain syntax check lets through, e.g.
// the same name imported twice (Cups v18's lucide Flag next to ui.js's Flag).
const { parse } = require('@babel/parser');
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '../src');
let bad = 0;
for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).sort()) {
  try {
    parse(fs.readFileSync(path.join(SRC, f), 'utf8'), { sourceType: 'module', plugins: ['jsx'], errorRecovery: false });
  } catch (e) {
    bad++;
    console.log(`${f}: ${e.message}`);
  }
}
// react-scripts puts its script after the first "<html…>" text it finds in
// public/index.html. If that text sits inside a comment, the script is
// commented out and the page stays blank.
const HTML = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
// v51.24: the page must start with the doctype. Without it browsers draw the
// live site in quirks mode, while the kit draws standards mode.
if (!/^<!doctype html>/i.test(HTML)) {
  bad++;
  console.log('index.html: does not start with <!doctype html> (the live site would draw in quirks mode)');
}
const tag = HTML.match(/<html[^>]*>/i);
if (tag) {
  const before = HTML.slice(0, tag.index);
  const inHtmlComment = before.lastIndexOf('<!--') > before.lastIndexOf('-->');
  const inCssComment = before.lastIndexOf('/*') > before.lastIndexOf('*/');
  if (inHtmlComment || inCssComment) {
    bad++;
    console.log(`index.html: "${tag[0]}" inside a comment at character ${tag.index}; react-scripts would inject its script there`);
  }
}
// v51.25: the kit draws icons with the real lucide-react, at the site's exact version.
const siteIcons = require('../package.json').dependencies['lucide-react'];
const kitIcons = require('./package.json').devDependencies['lucide-react'];
if (siteIcons !== kitIcons) {
  bad++;
  console.log(`lucide-react: the site pins ${siteIcons}, the kit ${kitIcons}; set test/package.json to the site's version`);
}
console.log(bad ? `COMPILE FAIL in ${bad} file(s)` : 'compile ok');
process.exit(bad ? 1 : 0);
