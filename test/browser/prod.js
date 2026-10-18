// Production build for the pixel comparison (v51.23): the app's real react-scripts build
// (CI=false npm run build, as Netlify runs it), from a git ref or from the working tree, with one test hook:
// each `const [x, setX] = useState(init)` reads globalThis.__OV['<FileStem>:x'] first (as build.js does for the kit),
// so pixel.js can open every page and tab. Nothing else in the source changes. ESLint is off in this build
// (the hook trips rules-of-hooks); the live build keeps it.
//   --plain skips the hook and keeps ESLint and source maps: the build exactly as Netlify makes it (for load numbers).
//   node prod.js <ref | .> <outDir> [--plain]      e.g. node prod.js origin/main ../out/prod-main ; node prod.js . ../out/prod-branch
// Then: PX_SITE=<outDir> node pixel.js shoot <shotsDir>   (PX_PLAYCDN=1 answers the play CDN's request; see pixel.js)
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [ref, outArg] = process.argv.slice(2);
const PLAIN = process.argv.includes('--plain');
if (!ref || !outArg) { console.log('usage: node prod.js <ref | .> <outDir>'); process.exit(1); }
const ROOT = path.join(__dirname, '../..');
const OUT = path.resolve(outArg);
const WORK = path.join(__dirname, '../out/prod-src');
fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });

// The source: a git ref (committed files only) or the working tree as it is.
if (ref === '.') {
  for (const f of ['package.json', 'public', 'src', 'tailwind.config.js']) if (fs.existsSync(path.join(ROOT, f))) fs.cpSync(path.join(ROOT, f), path.join(WORK, f), { recursive: true });
} else {
  execFileSync('sh', ['-c', `git -C "${ROOT}" archive "${ref}" | tar -x -C "${WORK}"`], { stdio: 'inherit' });
}
fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(WORK, 'node_modules'));

const SRC = path.join(WORK, 'src');
const hook = "import * as __R from 'react';\nconst __us = (k, i) => __R.useState(globalThis.__OV && k in globalThis.__OV ? globalThis.__OV[k] : i);\n";
for (const f of PLAIN ? [] : fs.readdirSync(SRC).filter((x) => x.endsWith('.js'))) {
  const stem = f.replace('.js', '');
  const code = fs.readFileSync(path.join(SRC, f), 'utf8');
  const out = code.replace(/const \[(\w+),\s*(\w+)\]\s*=\s*useState\(/g, (m, a, b) => `const [${a}, ${b}] = __us('${stem}:${a}', `);
  if (out !== code) fs.writeFileSync(path.join(SRC, f), hook + out);
}

execFileSync('npx', ['react-scripts', 'build'], { cwd: WORK, stdio: 'inherit', env: { ...process.env, CI: 'false', ...(PLAIN ? {} : { DISABLE_ESLINT_PLUGIN: 'true', GENERATE_SOURCEMAP: 'false' }) } });
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(WORK, 'build'), OUT, { recursive: true });
console.log('prod build', ref, '->', OUT);
