// Capture each top-level section of a League tab (real DOM) for the Palette Lab
const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const [tab,outdir,w]=[process.argv[2],process.argv[3],+(process.argv[4]||1440)];fs.mkdirSync(outdir,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:900}});
 const html=`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style><script>localStorage.setItem('gsl-fonts',JSON.stringify({text:'lexend',title:'outfit',big:'outfit',small:'atkinson',track:'t2'}));globalThis.__OV={"App:sectionId":"league","League:activeTab":"${tab}"}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(1500);
 const secs=await p.evaluate(()=>{const main=document.querySelector('header').nextElementSibling;const tabRoot=main.querySelector('.space-y-6');
   return [...tabRoot.children].map(el=>({html:el.outerHTML,h:Math.ceil(el.getBoundingClientRect().height),title:(el.querySelector('h3,h4')||{}).textContent||''}));});
 secs.forEach((s,i)=>fs.writeFileSync(`${outdir}/sec${i}.html`,s.html));
 fs.writeFileSync(`${outdir}/index.json`,JSON.stringify(secs.map((s,i)=>({i,h:s.h,title:s.title.trim().slice(0,60)}))));
 console.log(JSON.stringify(secs.map((s,i)=>[i,s.h,s.title.trim().slice(0,40)])));await b.close();})();
