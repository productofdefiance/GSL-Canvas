// Compile the Tailwind classes used by the source (and any snapshot folder) into one stylesheet,
// prefixed with index.html's <style> block (colour variables, division and dark-mode CSS).
// Usage: node css.js [snapshotDir] [outFile]   (defaults: snap, cssC.css)
const fs=require('fs'),path=require('path');
const postcss=require('postcss'),tailwind=require('tailwindcss');
const SNAP=process.argv[2]||'snap',OUT=process.argv[3]||'cssC.css';
const SRC=path.join(__dirname,'../src');
const content=[...(fs.existsSync(SNAP)?fs.readdirSync(SNAP).filter(f=>f.endsWith('.html')).map(f=>({raw:fs.readFileSync(path.join(SNAP,f),'utf8'),extension:'html'})):[]),
  ...fs.readdirSync(SRC).filter(f=>f.endsWith('.js')).map(f=>({raw:fs.readFileSync(path.join(SRC,f),'utf8'),extension:'js'}))];
const idx=fs.readFileSync(path.join(__dirname,'../public/index.html'),'utf8');const root=(idx.match(/<style>([\s\S]*?)<\/style>/)||['',''])[1];
const fam=['slate','gray','zinc','neutral','stone','red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose'];
const colors={};fam.forEach(f=>{colors[f]={};[50,100,200,300,400,500,600,700,800,900,950].forEach(s=>colors[f][s]=`rgb(var(--c-${f}-${s}) / <alpha-value>)`);});
postcss([tailwind({content,theme:{extend:{colors,fontFamily:{sans:['var(--font-text)']}}}})]).process('@tailwind base;@tailwind components;@tailwind utilities;',{from:undefined})
  .then(r=>{fs.writeFileSync(OUT,root+r.css);console.log('css ok',OUT);});
