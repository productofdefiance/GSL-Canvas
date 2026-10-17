// v51.06 checks: League tabs in light and dark, desktop and phone
const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const jobs=JSON.parse(process.argv[2]);
(async()=>{const b=await chromium.launch();
 for(const j of jobs){const p=await b.newPage({viewport:{width:j.w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const pre=j.dark?"localStorage.setItem('gsl-theme','dark');":"localStorage.setItem('gsl-theme','light');";
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>${pre}globalThis.__OV=${JSON.stringify(j.ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
  await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(1000);
  if(j.click){for(const sel of j.click){await p.click(sel).catch(e=>errs.push('click '+sel));await p.waitForTimeout(300);}}
  await p.screenshot({path:j.out,fullPage:true,clip:j.clip});console.log(j.out,'errors',JSON.stringify(errs));await p.close();}
 await b.close();})();
