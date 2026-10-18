// Compile the site's Tailwind stylesheet for the browser tests, prefixed with index.html's <style> block
// (colour variables, division and dark-mode CSS).
// v51.23: reads ../tailwind.config.js, the same file the live build uses, so the kit and the site can't drift.
// With a snapshot folder (the server render's HTML), it also lists every class the rendered pages use that the
// config's build lacks (a class name built at runtime, not written whole in the source and not in the safelist)
// and fails if there is any.
// Usage: node css.js [snapshotDir] [outFile]   (defaults: snap, cssC.css)
const fs=require('fs'),path=require('path');
const postcss=require('postcss'),tailwind=require('tailwindcss');
const SNAP=process.argv[2]||'snap',OUT=process.argv[3]||'cssC.css';
const ROOT=path.join(__dirname,'..');
const config=require(path.join(ROOT,'tailwind.config.js'));
const idx=fs.readFileSync(path.join(ROOT,'public/index.html'),'utf8');const root=(idx.match(/<style>([\s\S]*?)<\/style>/)||['',''])[1];
// Tailwind resolves a relative content list against the working directory; point it at the repo root.
const files=(config.content.files||config.content).map(f=>path.join(ROOT,f));
const compile=(cfg)=>postcss([tailwind(cfg)]).process('@tailwind base;@tailwind components;@tailwind utilities;',{from:undefined}).then(r=>r.css);
const selectors=(css)=>{const s=new Set();for(const m of css.matchAll(/(^|[},])\s*([^{}@]+)\{/g))for(const x of m[2].split(','))s.add(x.trim());return s;};
(async()=>{
  const css=await compile({...config,content:{files}});
  fs.writeFileSync(OUT,root+css);
  console.log('css ok',OUT,'(tailwind.config.js)');
  if(!fs.existsSync(SNAP))return;
  // Only the class attributes of the rendered pages (not their text), added to the source scan.
  const raw=fs.readdirSync(SNAP).filter(f=>f.endsWith('.html')).map(f=>[...fs.readFileSync(path.join(SNAP,f),'utf8').matchAll(/class="([^"]*)"/g)].map(m=>m[1]).join(' ')).join('\n');
  const withSnap=selectors(await compile({...config,content:[...files,{raw,extension:'html'}]}));
  const have=selectors(css);
  const missing=[...withSnap].filter(x=>!have.has(x));
  if(missing.length){console.log('runtime class names missing from the build (write them whole, or add them to the safelist):',missing.join(' '));process.exit(1);}
  console.log('runtime class names: every class the rendered pages use is in the build');
})().catch(e=>{console.error(e);process.exit(1);});
