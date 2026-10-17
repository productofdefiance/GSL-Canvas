const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
(async()=>{const b=await chromium.launch();
for(const tab of ['race','homeaway','analytics','fixtures','overview','clubs','spider']){const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>globalThis.__OV=${JSON.stringify({"App:sectionId":"league","League:activeTab":tab})}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const W=document.documentElement.clientWidth;const bad=[...document.querySelectorAll('body *')].filter(e=>{const b=e.getBoundingClientRect();return b.right>W+1&&getComputedStyle(e).position!=='fixed'}).filter(e=>{let q=e.parentElement;while(q){const s=getComputedStyle(q);if(/(auto|scroll|hidden)/.test(s.overflowX))return false;q=q.parentElement;}return true;}).slice(0,3).map(e=>e.tagName+'.'+String(e.className).slice(0,60)+' w='+Math.round(e.getBoundingClientRect().width));return {sw:document.documentElement.scrollWidth,W,bad};});
console.log(tab,JSON.stringify(r));await ctx.close();}
await b.close();})();
