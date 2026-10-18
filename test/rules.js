// Rules check (v51.22): the CLAUDE.md code rules the kit can check, over every file in src/.
// Fails (exit 1) with file and line for each break that test/rules-allow.json doesn't allow.
// Reads the code's syntax tree (Babel), so comments never count. Run after build.js (clubs.js reads out/).
//
// Rules
//   screen-px      window.innerWidth / window.innerHeight (use useScreen() or Tailwind; ui.js viewport() places fixed cards)
//   hover-none     "(hover: none)" (touch is decided per event by pointerType)
//   club-name      a club's name or abbreviation as a string in code (abbreviations matched in capitals only)
//   club-default   useState('<club abbreviation>')
//   typed-count    91 / 92 as numbers, a for loop to a fixed number of 8 or more, a season number capped by a
//                  typed-in number (sNum <= 20), a GAMES_PER_SEASON-style table
//   overflow-row   overflow-x-auto (chip and switch rows use ui.js ScrollRow; listed wide tables are allowed)
//
// Allowed exceptions: test/rules-allow.json. Each entry names its file, rule, kind and reason, and either
//   "in": a function or variable the break sits inside (any enclosing name), optionally with "text"
//   (the string that matched), or, for page debt only, "count": how many breaks that page may still have.
// An entry that matches nothing fails too, so the list stays true. `node rules.js --list` prints every break.
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { clubNames } = require('./clubs');

const SRC = path.join(__dirname, '../src');
const SKIP = new Set(['sheetData.js']); // the workbook itself
const ALLOW = JSON.parse(fs.readFileSync(path.join(__dirname, 'rules-allow.json'), 'utf8'));
const KINDS = Object.keys(ALLOW.kinds);
const { abbrs, names } = clubNames();
const list = process.argv.includes('--list');

function isClub(s) {
  const t = s.trim();
  if (!t) return false;
  if (abbrs.has(t)) return true; // abbreviations in capitals only ("Club" is a word, "CLUB" a code)
  return names.has(t.toUpperCase()) && t.length > 3;
}

const breaks = [];
function walk(node, anc, file) {
  if (!node || typeof node.type !== 'string') return;
  const add = (rule, text) => breaks.push({ file, rule, text, line: node.loc.start.line, names: anc.filter(Boolean) });
  const ownName =
    (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ClassDeclaration') && node.id ? node.id.name
      : node.type === 'VariableDeclarator' && node.id.type === 'Identifier' ? node.id.name
        : node.type === 'ObjectProperty' && node.key && (node.key.name || node.key.value) ? String(node.key.name || node.key.value)
          : null;
  switch (node.type) {
    case 'MemberExpression':
      if (node.object.type === 'Identifier' && node.object.name === 'window' && !node.computed && /^inner(Width|Height)$/.test(node.property.name)) add('screen-px', `window.${node.property.name}`);
      break;
    case 'StringLiteral':
    case 'TemplateElement':
    case 'JSXText': {
      const v = node.type === 'StringLiteral' ? node.value : node.type === 'TemplateElement' ? node.value.cooked || '' : node.value;
      if (/\(\s*hover\s*:\s*none\s*\)/.test(v)) add('hover-none', '(hover: none)');
      if (/(^|\s|:)overflow-x-auto(\s|$)/.test(v)) add('overflow-row', 'overflow-x-auto');
      if (isClub(v)) add('club-name', v.trim());
      break;
    }
    case 'CallExpression':
      if (node.callee.type === 'Identifier' && node.callee.name === 'useState' && node.arguments[0] && node.arguments[0].type === 'StringLiteral' && abbrs.has(node.arguments[0].value.trim())) add('club-default', `useState('${node.arguments[0].value}')`);
      break;
    case 'NumericLiteral':
      if (node.value === 91 || node.value === 92) add('typed-count', String(node.value));
      break;
    case 'ForStatement': {
      const t = node.test;
      if (t && t.type === 'BinaryExpression' && /^<=?$/.test(t.operator) && t.right.type === 'NumericLiteral' && t.right.value >= 8) add('typed-count', `loop to ${t.right.value}`);
      break;
    }
    case 'BinaryExpression':
      // a season number capped by a typed-in number (sNum <= 20)
      if (/^<=?$/.test(node.operator) && node.right.type === 'NumericLiteral' && node.right.value >= 8 && node.left.type === 'Identifier' && /season|^s(eason)?num$/i.test(node.left.name)) add('typed-count', `${node.left.name} ${node.operator} ${node.right.value}`);
      break;
    case 'VariableDeclarator':
      if (node.id.type === 'Identifier' && /(GAMES|MATCHDAYS|SEASONS|CLUBS|TEAMS)/.test(node.id.name) && /^[A-Z0-9_]+$/.test(node.id.name) && node.init &&
        (node.init.type === 'NumericLiteral' || (node.init.type === 'ObjectExpression' && node.init.properties.some((p) => p.value && p.value.type === 'NumericLiteral')))) add('typed-count', node.id.name);
      break;
    default:
  }
  const next = ownName ? [...anc, ownName] : anc;
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'leadingComments' || k === 'trailingComments' || k === 'innerComments') continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === 'string' && walk(c, next, file));
    else if (v && typeof v.type === 'string') walk(v, next, file);
  }
}

for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.js') && !SKIP.has(f)).sort()) {
  const code = fs.readFileSync(path.join(SRC, f), 'utf8');
  const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  walk(ast.program, [], `src/${f}`);
}

// Match each break to an allow entry
const used = new Map();
const bad = [];
const problems = [];
for (const e of ALLOW.allow) {
  if (!KINDS.includes(e.kind)) problems.push(`rules-allow.json: unknown kind "${e.kind}" (${e.file} ${e.rule})`);
  if (!e.reason) problems.push(`rules-allow.json: no reason (${e.file} ${e.rule})`);
  if (e.count != null && e.kind !== 'page-debt') problems.push(`rules-allow.json: only page debt may use a count (${e.file} ${e.rule})`);
  if (e.kind === 'page-debt' && !e.page) problems.push(`rules-allow.json: page debt names its page (${e.file} ${e.rule})`);
  used.set(e, 0);
}
for (const b of breaks) {
  const e = ALLOW.allow.find((x) => x.file === b.file && x.rule === b.rule && x.count == null && x.in && b.names.includes(x.in) && (x.text == null || x.text === b.text))
    || ALLOW.allow.find((x) => x.file === b.file && x.rule === b.rule && x.count != null);
  if (e) { used.set(e, used.get(e) + 1); b.allowed = e.kind; } else bad.push(b);
}
for (const [e, n] of used) {
  if (e.count != null) {
    if (n > e.count) problems.push(`${e.file}: ${n} ${e.rule} breaks, page debt allows ${e.count} (${e.page}): new breaks were added`);
    else if (n < e.count) problems.push(`${e.file}: ${e.rule} page debt is down to ${n} (allowed ${e.count}): lower the count in rules-allow.json`);
  } else if (!n) problems.push(`rules-allow.json: entry matches nothing, remove it (${e.file} ${e.rule} in ${e.in}${e.text ? ` "${e.text}"` : ''})`);
}

if (list) breaks.forEach((b) => console.log(`${b.file}:${b.line} ${b.rule} ${b.text}${b.allowed ? ` [allowed: ${b.allowed}]` : ''} (in ${b.names.slice(-2).join(' > ')})`));
bad.forEach((b) => console.log(`RULE ${b.rule}: ${b.file}:${b.line} ${b.text} (in ${b.names.slice(-1)[0] || 'top level'})`));
problems.forEach((p) => console.log(`RULES ${p}`));
// Exceptions per page (by file)
const per = {};
for (const b of breaks) if (b.allowed) { const k = `${b.file} ${b.allowed}`; per[k] = (per[k] || 0) + 1; }
console.log(`rules: ${breaks.length} matches, ${breaks.length - bad.length} allowed (${Object.entries(per).map(([k, n]) => `${k} ${n}`).join(', ')}), ${bad.length} breaks, ${problems.length} list problems`);
process.exitCode = bad.length || problems.length ? 1 : 0;
