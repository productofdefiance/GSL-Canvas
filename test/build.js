const ts=require('typescript');
const fs=require('fs'),path=require('path');
const SRC=path.join(__dirname,'../src'),OUT=path.join(__dirname,'out');
fs.mkdirSync(OUT,{recursive:true});
const header="const __R=require('react');const __us=(k,i)=>__R.useState(globalThis.__OV&&k in globalThis.__OV?globalThis.__OV[k]:i);\n";
for(const f of fs.readdirSync(SRC).filter(f=>f.endsWith('.js'))){
  let code=fs.readFileSync(path.join(SRC,f),'utf8');const stem=f.replace('.js','');
  code=code.replace(/const \[(\w+),\s*(\w+)\]\s*=\s*useState\(/g,(m,a,b)=>`const [${a}, ${b}] = __us('${stem}:${a}', `);
  const out=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2019,jsx:ts.JsxEmit.React,esModuleInterop:true}});
  fs.writeFileSync(path.join(OUT,f),header+out.outputText);
}
console.log('built');
