const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>globalThis.__OV=${JSON.stringify({"App:sectionId":"league","League:activeTab":"race"})}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(900);
const r=p.locator('rect[style*="pan-y"]').first();await r.scrollIntoViewIfNeeded();const bb=await r.boundingBox();
// simulate a finger drag: pointer events of type touch
await p.evaluate(({x,y})=>{const el=document.elementFromPoint(x,y);const ev=(t,xx)=>el.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:xx,clientY:y,pointerType:'touch',isPrimary:true}));ev('pointerdown',x);ev('pointermove',x);ev('pointermove',x+20);ev('pointerup',x+20);ev('pointerleave',x+20);},{x:bb.x+bb.width*0.5,y:bb.y+bb.height*0.5});
await p.waitForTimeout(300);await p.screenshot({path:'v8/p-touch2.png'});
const card=await p.$$eval('div.fixed.bottom-3',els=>els.map(e=>e.innerText.slice(0,80)));console.log('bottom cards:',JSON.stringify(card),'errs',JSON.stringify(errs));await b.close();})();
