const { chromium } = require('playwright');const path=require('path');
const { serveSite } = require(path.resolve('site.js'));const { PAGEKEY } = require(path.resolve('../pages.js'));
const [dir,page,tab,w,cls,txt]=process.argv.slice(2);
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:+w,height:900}});await serveSite(p,dir);
await p.addInitScript(`globalThis.__OV=${JSON.stringify({'App:sectionId':page,[PAGEKEY[page]]:tab})}`);await p.goto('http://gsl.test/');await p.waitForTimeout(2500);
console.log(await p.evaluate(([cls,txt])=>{const e=[...document.querySelectorAll('#root *')].find(e=>(e.getAttribute('class')||'')===cls&&(e.textContent||'').trim().startsWith(txt));const r={};
for(const [k,v] of [['none',''],['lh1','1'],['lh0','0'],['lh16.5','16.5px']]){e.style.lineHeight=v;r[k]=e.getBoundingClientRect().height;}return JSON.stringify(r)},[cls,txt]));await br.close();})();
