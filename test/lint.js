// Lint baseline (v51.22): ESLint (eslint.config.js) over every file in src/, counted per file and
// compared with lint-baseline.json. A count that goes up fails the check. A count that goes down also
// stops the check until the baseline is lowered (`node lint.js --update`), so the baseline stays true.
// `node lint.js --list` prints every finding.
const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(__dirname, 'lint-baseline.json');
const update = process.argv.includes('--update');
const list = process.argv.includes('--list');

(async () => {
  const eslint = new ESLint({ cwd: ROOT, overrideConfigFile: path.join(__dirname, 'eslint.config.js') });
  const results = await eslint.lintFiles(['src/*.js']);
  const counts = {};
  const rules = {};
  for (const r of results) {
    const f = path.relative(ROOT, r.filePath);
    counts[f] = r.messages.length;
    for (const m of r.messages) {
      rules[m.ruleId || 'parse'] = (rules[m.ruleId || 'parse'] || 0) + 1;
      if (list || m.fatal) console.log(`${f}:${m.line} ${m.ruleId || 'parse'} ${m.message}`);
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (update) {
    fs.writeFileSync(BASE, JSON.stringify({ about: 'ESLint findings per file (test/lint.js). Lower it when a file improves; it may never rise.', total, files: counts }, null, 2) + '\n');
    console.log(`lint: baseline written, ${total} findings`);
    return;
  }
  const base = JSON.parse(fs.readFileSync(BASE, 'utf8')).files;
  const problems = [];
  for (const f of Object.keys({ ...base, ...counts })) {
    const now = counts[f] || 0, was = base[f] || 0;
    if (now > was) problems.push(`LINT ${f}: ${now} findings, baseline ${was} (up ${now - was}; node lint.js --list shows them)`);
    else if (now < was) problems.push(`LINT ${f}: down to ${now} from ${was}: lower the baseline (node lint.js --update)`);
  }
  problems.forEach((p) => console.log(p));
  console.log(`lint: ${total} findings (${Object.entries(rules).map(([k, n]) => `${k} ${n}`).join(', ')}); ${problems.length ? 'differs from the baseline' : 'matches the baseline'}`);
  process.exitCode = problems.length ? 1 : 0;
})().catch((e) => { console.error(e); process.exit(1); });
