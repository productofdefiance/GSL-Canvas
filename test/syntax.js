const ts=require('typescript');const fs=require('fs'),path=require('path');
const SRC=path.join(__dirname,'../src');let bad=0;
for(const f of fs.readdirSync(SRC).filter(f=>f.endsWith('.js'))){const sf=ts.createSourceFile(f,fs.readFileSync(path.join(SRC,f),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.JSX);
 const d=sf.parseDiagnostics||[];if(d.length){bad++;d.slice(0,3).forEach(x=>console.log(f,x.start,ts.flattenDiagnosticMessageText(x.messageText,'\n')));}}
console.log(bad?`SYNTAX FAIL in ${bad} file(s)`:'syntax ok');process.exit(bad?1:0);
