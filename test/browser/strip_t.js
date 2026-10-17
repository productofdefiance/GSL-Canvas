// v51.20: the Points race season strip keeps the focused season in view after late layout.
// At 390 (iPhone 13), measures the focused cell against the strip's visible box:
//   A. web fonts arriving after the first render (served with a delay, then the text switches to them)
//   B. the season cards widening after render (late CSS), as when fonts widen them
//   C. Pace → Focus, after the strip was scrolled back to the start by script
//   D. Div 1 → All
//   E. the user scrolls the strip by hand: a later resize must not pull it back; a new focus does
// "Fully inside" = the cell's left and right edges within the strip's box (1px tolerance).
// Usage (after npm run css and npm run bundle): node strip_t.js   (hard timeout: --max seconds, default 180)
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const MAX=Number((process.argv.indexOf('--max')>0&&process.argv[process.argv.indexOf('--max')+1])||180);
setTimeout(()=>{console.log(`TIMEOUT: hard limit of ${MAX}s reached`);process.exit(2);},MAX*1000).unref();
// A monospace font, so its widths differ clearly from the container's default sans
const FONT=['/usr/share/fonts/truetype/freefont/FreeMonoBold.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'].find((f)=>fs.existsSync(f));
let failed=0;const out=(ok,name,info)=>{if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);};
async function open(b,ov,{lateFont=false,textCards=false,noRO=false}={}){
 const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 // A late web font: the page asks for it at once; the server answers 1.5s later
 const fontCss=lateFont?`@font-face{font-family:'GslLate';src:url(/late.ttf) format('truetype');font-display:swap}*{font-family:'GslLate',system-ui,sans-serif!important}`:'';
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><style>${fontCss}${textCards?'[data-season]{width:auto!important;white-space:nowrap}':''}</style><script>${noRO?'window.ResizeObserver=undefined;':''}localStorage.setItem('gsl-theme','light');globalThis.__OV=${JSON.stringify(ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));
 await p.route('http://gsl.test/late.ttf',async(r)=>{await new Promise((res)=>setTimeout(res,1500));r.fulfill({body:fs.readFileSync(FONT),contentType:'font/ttf'});});
 // domcontentloaded: the load event would wait for the late font, and "before" must be measured without it
 await p.goto('http://gsl.test/',{waitUntil:'domcontentloaded'});await p.waitForSelector('[data-season]',{timeout:15000});
 await p.evaluate(()=>{const frame=()=>new Promise((r)=>requestAnimationFrame(()=>r()));
  window.__s={frame,
   poll:async(c,max=1500)=>{const t0=performance.now();while(performance.now()-t0<max){if(c())return true;await frame();}return !!c();},
   strip:()=>document.querySelector('[data-season]').closest('.overflow-x-auto'),
   focusNum:()=>{const sel=[...document.querySelectorAll('[data-season]')].find((c)=>c.className.includes('ring-2'));return sel?sel.dataset.season:null;},
   measure:(num)=>{const s=window.__s.strip(),c=s.querySelector(`[data-season="${num}"]`);if(!c)return {num,missing:true};const sb=s.getBoundingClientRect(),cb=c.getBoundingClientRect();
    return {num,inside:cb.left>=sb.left-1&&cb.right<=sb.right+1,cellL:Math.round(cb.left),cellR:Math.round(cb.right),stripL:Math.round(sb.left),stripR:Math.round(sb.right),gapR:Math.round(sb.right-cb.right),scrollLeft:Math.round(s.scrollLeft),cellW:Math.round(cb.width)};},
   settle:async()=>{const s=window.__s.strip();let l=null,n=0;await window.__s.poll(()=>{const k=`${s.scrollLeft},${s.getBoundingClientRect().width}`;n=k===l?n+1:0;l=k;return n>=5;},2000);}};});
 return {p,ctx,errs};
}
const fmt=(m)=>m.missing?`S${m.num} not in the strip`:`S${m.num} at ${m.cellL}–${m.cellR}px (${m.cellW}px wide) in a strip at ${m.stripL}–${m.stripR}px, ${m.gapR}px clear of its right edge, strip scrolled ${m.scrollLeft}px`;
const PTS={"App:sectionId":"league","League:activeTab":"race"};
(async()=>{const b=await chromium.launch();
 // A. late web fonts
 {const {p,ctx,errs}=await open(b,PTS,{lateFont:true});
  const r=await p.evaluate(async()=>{const S=window.__s;const f=S.focusNum();const before=S.measure(f);const fam0=getComputedStyle(S.strip().querySelector('[data-season] span')).fontFamily;
   const loaded=await S.poll(()=>[...document.fonts].some((x)=>x.family.replace(/"/g,'')==='GslLate'&&x.status==='loaded'),5000);await S.settle();
   const textW=Math.round(S.strip().querySelector(`[data-season="${f}"] span`).getBoundingClientRect().width);return {before,after:S.measure(f),loaded,fam0,textW};});
  out(r.loaded&&r.after.inside,'A. web fonts arriving 1.5s after the first render: the focused cell is fully inside the strip afterwards',`font loaded: ${r.loaded}; before: ${fmt(r.before)}; after: ${fmt(r.after)}`);
  out(errs.length===0,'A. no page errors',errs.join(' | '));await ctx.close();}
 // A2. the font itself widens the cards: cards sized to their text, ResizeObserver switched off,
 //     so only the document.fonts handlers can bring the focused cell back
 {const {p,ctx,errs}=await open(b,PTS,{lateFont:true,textCards:true,noRO:true});
  const r=await p.evaluate(async()=>{const S=window.__s;const f=S.focusNum();const before=S.measure(f);
   const loaded=await S.poll(()=>[...document.fonts].some((x)=>x.family.replace(/"/g,'')==='GslLate'&&x.status==='loaded'),5000);await S.settle();return {before,after:S.measure(f),loaded,ro:typeof ResizeObserver};});
  out(r.loaded&&r.before.inside&&r.after.inside&&r.after.cellW!==r.before.cellW,'A2. the late font widens the cards (sized to their text, no ResizeObserver): the font handlers alone keep the focused cell inside',`ResizeObserver: ${r.ro}; before: ${fmt(r.before)}; after: ${fmt(r.after)}`);
  out(errs.length===0,'A2. no page errors',errs.join(' | '));await ctx.close();}
 // B. cards widen after render
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const S=window.__s;await S.settle();const f=S.focusNum();const before=S.measure(f);
   const st=document.createElement('style');st.textContent='[data-season]{width:150px!important}';document.head.appendChild(st);await S.settle();return {before,after:S.measure(f)};});
  out(r.before.inside&&r.after.inside&&r.after.cellW===150,'B. season cards widening from 108px to 150px after render: the focused cell is pulled back inside the strip',`before: ${fmt(r.before)}; after: ${fmt(r.after)}`);
  out(errs.length===0,'B. no page errors',errs.join(' | '));await ctx.close();}
 // C. Pace → Focus; D. Div 1 → All
 {const {p,ctx,errs}=await open(b,{...PTS,'LeagueTabs:mode':'pace'});
  const r=await p.evaluate(async()=>{const S=window.__s;await S.settle();const sec=S.strip().closest('.rounded-2xl');const btn=(t)=>[...sec.querySelectorAll('button')].find((x)=>x.textContent===t);
   S.strip().scrollLeft=0;await S.settle();const atStart=Math.round(S.strip().scrollLeft);
   btn('Focus').click();await S.poll(()=>!!S.focusNum());await S.settle();const f=S.focusNum();const c=S.measure(f);
   btn('Div 1').click();await S.settle();const d1=S.measure(f);
   btn('All').click();await S.settle();const d=S.measure(f);
   return {atStart,c,d1,d};});
  out(r.c.inside,'C. Pace → Focus (strip first scrolled back to the start): the focused cell is fully inside',`strip at ${r.atStart}px before the switch; after: ${fmt(r.c)}`);
  out(r.d.inside&&(r.d1.missing||r.d1.inside),'D. Div 1 → All: the focused cell is fully inside after each switch',`Div 1: ${fmt(r.d1)}; All: ${fmt(r.d)}`);
  out(errs.length===0,'C/D. no page errors',errs.join(' | '));await ctx.close();}
 // E. the user's own scroll wins until focus changes
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const S=window.__s;await S.settle();const s=S.strip(),f=S.focusNum();
   // a finger on the strip, then a sideways scroll back to the start
   const b=s.getBoundingClientRect();s.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerType:'touch',pointerId:7,isPrimary:true,clientX:b.left+20,clientY:b.top+10}));
   s.scrollLeft=0;s.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerType:'touch',pointerId:7}));await S.settle();
   // a layout change that would normally re-fit
   const st=document.createElement('style');st.textContent='[data-season]{width:140px!important}';document.head.appendChild(st);await S.settle();
   const kept=Math.round(s.scrollLeft);const hidden=S.measure(f);
   // a new focus: tap the first cell, then the last again
   // (the cells are re-created on each render, so look them up again before each tap)
   const cells=()=>[...s.querySelectorAll('[data-season]')];cells()[0].click();await S.settle();const last=cells()[cells().length-1];last.click();await S.settle();
   return {kept,hidden,refit:S.measure(last.dataset.season)};});
  out(r.kept===0&&r.refit.inside,'E. after the user scrolls the strip, a resize leaves it where they put it; choosing a season brings auto-fit back',`after the user's scroll and a resize: strip still at ${r.kept}px (${r.hidden.inside?'focused cell visible':'focused cell off-screen, as the user left it'}); after choosing S${r.refit.num}: ${fmt(r.refit)}`);
  out(errs.length===0,'E. no page errors',errs.join(' | '));await ctx.close();}
 await b.close();console.log(failed?`${failed} check(s) failed`:'all strip checks passed');process.exit(failed?1:0);})();
