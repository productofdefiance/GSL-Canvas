// Hover cards on touch, tapped the iPhone way (kit step from Canvas v51.19).
// A tap is pointerdown + pointerup (pointerType 'touch') and nothing else: no pointermove,
// and no click (iPhone sends none for taps on blank space or plain divs).
// For every League tab and view at 390, every hover target ([data-hv]) is tapped and must:
//   open its card ([data-hv-card]) · switch when another target is tapped · close on a tap on
//   blank space · close when the page scrolls.
// Plus: an [i] closes an open card and sits above it (Home vs Away); a Cups sample
// (HoverProvider); the mouse still hovers at 1440.
// Usage (after npm run css and npm run bundle): npm run tap   (exit code 1 on any failure)
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
let failed=0;
const out=(ok,name,info)=>{if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);};
const VIEWS=[
 ['overview',{}],['fixtures',{}],['clubs',{}],
 ['race',{'LeagueTabs:mode':'focus'}],['race',{'LeagueTabs:mode':'compare'}],['race',{'LeagueTabs:mode':'pace'}],
 ['analytics',{'LeagueTabs:momMode':'single'}],['analytics',{'LeagueTabs:momMode':'overlay'}],
 ['homeaway',{}],
 ['spider',{'LeagueTabs:mode':'versus'}],['spider',{'LeagueTabs:mode':'group','LeagueTabs:gKind':'seasons'}],['spider',{'LeagueTabs:mode':'group','LeagueTabs:gKind':'clubs'}],
];
async function open(b,ov,phone=true){
 const ctx=await b.newContext(phone?{...devices['iPhone 13']}:{viewport:{width:1440,height:900}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>localStorage.setItem('gsl-theme','light');globalThis.__OV=${JSON.stringify(ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(1000);
 return {p,ctx,errs};
}
// In-page helpers (installed once per page)
const HELPERS=()=>{
 const sleep=(ms)=>new Promise((r)=>setTimeout(r,ms));
 const tap=async(x,y,id=11)=>{const t=document.elementFromPoint(x,y);if(!t)return;const o={bubbles:true,cancelable:true,composed:true,pointerType:'touch',pointerId:id,isPrimary:true,clientX:x,clientY:y,button:0};
  t.dispatchEvent(new PointerEvent('pointerdown',{...o,buttons:1}));await sleep(30);t.dispatchEvent(new PointerEvent('pointerup',{...o,buttons:0}));};
 const card=()=>{const c=[...document.querySelectorAll('[data-hv-card]')].filter((e)=>{const b=e.getBoundingClientRect();return b.height>0&&b.width>0;});return c.length?c.map((e)=>e.textContent.replace(/\s+/g,' ').trim()).join(' | '):null;};
 const inView=(x,y)=>x>2&&y>2&&x<innerWidth-2&&y<innerHeight-2;
 // a point inside element t that a finger would actually hit (t or its child is on top)
 const spot=(t,fx=null)=>{const rs=[...t.getClientRects()];const b=rs.length?rs[0]:t.getBoundingClientRect();
  const xs=fx!==null?[fx]:[0.5,0.3,0.7,0.15,0.85],ys=[0.5,0.3,0.7];
  for(const a of xs)for(const c of ys){const x=b.left+b.width*a,y=b.top+b.height*c;if(!inView(x,y))continue;const h=document.elementFromPoint(x,y);if(h&&(h===t||t.contains(h)))return [x,y];}return null;};
 // a blank point: nothing tappable there (no hover target, card, control or link)
 const blank=()=>{for(let y=Math.round(innerHeight*0.25);y<innerHeight*0.85;y+=17)for(let x=8;x<innerWidth-8;x+=23){const h=document.elementFromPoint(x,y);
   if(!h||!h.closest('main'))continue;if(h.closest('[data-hv],[data-hv-card],button,a,input,select,label,summary,[role=button],[role=dialog],.cursor-pointer'))continue;return [x,y];}return null;};
 // wait (up to 500ms) until a card is open (want true) or none is (want false)
 const until=async(want)=>{for(let i=0;i<25;i++){await sleep(20);const c=card();if(!!c===want){if(want){await sleep(40);return card();}await sleep(40);return card();}}return card();};
 window.__tap={sleep,tap,card,spot,blank,until};
};
// Sweep every hover target in `scope` (CSS selector); limit = max targets
const SWEEP=async([scope,limit])=>{const {sleep,tap,card,spot,blank,until}=window.__tap;
 const all=[...document.querySelectorAll(`${scope} [data-hv]`)].filter((e)=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0;}).slice(0,limit);
 const r={n:all.length,open:0,sw:0,blank:0,scroll:0,covered:0,noPartner:0,sameText:0,fails:[]};
 const name=(e)=>`${e.tagName.toLowerCase()}${e.textContent?' "'+e.textContent.replace(/\s+/g,' ').trim().slice(0,18)+'"':''}#${all.indexOf(e)}`;
 const fail=(e,what)=>{if(r.fails.length<12)r.fails.push(`${name(e)}: ${what}`);};
 for(const t of all){
  if(card()){window.scrollBy(0,1);await until(false);}
  t.scrollIntoView({block:'center',inline:'nearest'});await sleep(120);
  const p=spot(t);if(!p){r.covered++;continue;}
  await tap(p[0],p[1]);const c1=await until(true);if(!c1){fail(t,'tap did not open a card');continue;}r.open++;
  // switch: another target in view (or, for a wide chart target, another spot on it)
  let q=null,pt=null;for(const o of all){if(o===t||o.contains(t)||t.contains(o))continue;const s=spot(o);if(s){q=o;pt=s;break;}}
  if(!q&&t.getBoundingClientRect().width>120){const a=spot(t,0.12),b=spot(t,0.88);pt=Math.abs(a?a[0]-p[0]:0)>Math.abs(b?b[0]-p[0]:0)?a:b;q=t;}
  if(!pt)r.noPartner++;else{await tap(pt[0],pt[1],13);await sleep(150);const c2=await until(true);if(!c2)fail(t,`tapping ${q===t?'another spot':name(q)} closed the card instead of switching`);else if(c2===c1)r.sameText++;else r.sw++;}
  if(!card()){await tap(p[0],p[1]);await until(true);}
  const bl=blank();if(!bl)fail(t,'no blank space in view');else{await tap(bl[0],bl[1],15);if(await until(false))fail(t,'tap on blank space left it open');else r.blank++;}
  await tap(p[0],p[1]);if(!(await until(true)))fail(t,'did not reopen');else{window.scrollBy(0,40);if(await until(false))fail(t,'scroll left it open');else r.scroll++;window.scrollBy(0,-40);await sleep(80);}
 }
 return r;};
const report=(tag,r,errs)=>{
 const ok=r.fails.length===0&&errs.length===0;
 if(r.n===0){out(ok,`390 ${tag}: no hover targets on this view at 390`);return;}
 out(ok,`390 ${tag}: ${r.n} hover targets tapped`,`opened ${r.open} · switched ${r.sw}${r.sameText?` (+${r.sameText} to a card with the same text)`:''} · blank tap closed ${r.blank} · scroll closed ${r.scroll}${r.covered?` · ${r.covered} covered by another target (not tappable)`:''}${r.noPartner?` · ${r.noPartner} with no other target in view`:''}${errs.length?' · page errors: '+errs.join(' | '):''}`);
 r.fails.forEach((f)=>console.log('     ',f));};

// Optional: node tap_t.js <tab>[,<tab>…] runs only those League tabs (or one view: race-pace, analytics-overlay) (and 'extras' for the [i] / Cups / mouse checks)
const ONLY=process.argv[2]?process.argv[2].split(','):null;
const want=(k,v='')=>!ONLY||ONLY.includes(k)||(v&&ONLY.includes(`${k}-${v}`));
(async()=>{const b=await chromium.launch();
 for(const [tab,extra] of VIEWS.filter(([t,x])=>want(t,Object.values(x).join('-')))){const {p,ctx,errs}=await open(b,{"App:sectionId":"league","League:activeTab":tab,...extra});
  await p.evaluate(HELPERS);const seen=await p.evaluate(()=>{const s={move:0,click:0};document.addEventListener('pointermove',()=>s.move++,true);document.addEventListener('click',()=>s.click++,true);window.__seen=s;return s;});
  const r=await p.evaluate(SWEEP,['main',400]);const s=await p.evaluate(()=>window.__seen);
  report(`League ${tab}${Object.keys(extra).length?' ('+Object.values(extra).join(', ')+')':''}`,r,errs);
  if(s.move||s.click)out(false,`390 League ${tab}: the taps sent no pointermove or click`,`pointermove ${s.move}, click ${s.click}`);
  await ctx.close();}
 // [i] while a card is open (Home vs Away)
 if(want('extras')){const {p,ctx,errs}=await open(b,{"App:sectionId":"league","League:activeTab":"homeaway"});await p.evaluate(HELPERS);
  const r=await p.evaluate(async()=>{const {sleep,tap,card,spot}=window.__tap;const col=document.querySelector('main rect[data-tap=season]').parentElement;col.scrollIntoView({block:'center'});await sleep(120);
   const {until}=window.__tap;const s=spot(col);await tap(s[0],s[1]);const before=await until(true);
   const ib=document.querySelector('main button[aria-label="About Venue swing"]');const bb=ib.getBoundingClientRect();await tap(bb.left+bb.width/2,bb.top+bb.height/2);ib.click();await sleep(400);
   const sh=document.querySelector('.gsl-sheet');return {before:!!before,after:card(),sheet:!!sh,z:sh?getComputedStyle(sh.parentElement).zIndex:null};});
  out(r.before&&!r.after&&r.sheet&&Number(r.z)>70,'390 Home vs Away: opening an [i] closes the open card; the [i] sheet sits above hover cards',`sheet z ${r.z} (hover cards 70)`);
  out(errs.length===0,'390 Home vs Away [i]: no page errors',errs.join(' | '));await ctx.close();}
 // Sideways scrub (Points race, Form & Margins Overlay): slide a finger along the chart; the card follows and stays after lifting
 if(want('extras'))for(const [tab,ov,sel] of [['race',{},'main svg rect[data-hv]'],['analytics',{'LeagueTabs:momMode':'overlay'},'main svg[data-hv]']]){
  const {p,ctx,errs}=await open(b,{"App:sectionId":"league","League:activeTab":tab,...ov});await p.evaluate(HELPERS);
  const r=await p.evaluate(async(sel)=>{const {sleep,until,card}=window.__tap;const t=document.querySelector(sel);t.scrollIntoView({block:'center'});await sleep(150);
   const b=t.getBoundingClientRect(),y=b.top+b.height/2,o={bubbles:true,cancelable:true,composed:true,pointerType:'touch',pointerId:21,isPrimary:true,clientY:y};
   const at=(f)=>b.left+b.width*f;const seen=[];t.dispatchEvent(new PointerEvent('pointerdown',{...o,clientX:at(0.2),buttons:1}));
   for(let i=1;i<=12;i++){t.dispatchEvent(new PointerEvent('pointermove',{...o,clientX:at(0.2+0.6*i/12),buttons:1}));await sleep(40);const c=card();if(c&&!seen.includes(c))seen.push(c);}
   t.dispatchEvent(new PointerEvent('pointerup',{...o,clientX:at(0.8),buttons:0}));await sleep(200);return {steps:seen.length,after:!!card()};},sel);
  out(r.steps>=3&&r.after&&errs.length===0,`390 League ${tab}${ov['LeagueTabs:momMode']?' (overlay)':''}: a sideways slide scrubs; the card follows and stays after lifting`,`${r.steps} different cards during the slide`);
  await ctx.close();}
 // Cups (HoverProvider), a sample
 if(want('extras')){const {p,ctx,errs}=await open(b,{"App:sectionId":"cups"});await p.evaluate(HELPERS);
  const r=await p.evaluate(SWEEP,['main',15]);report('Cups (HoverProvider, first 15 targets)',r,errs);await ctx.close();}
 // Mouse at 1440: unchanged
 if(want('extras'))for(const [tab,sel,f] of [['homeaway','main rect[data-tap=season]',0.5],['race','main svg rect[data-hv]',0.4]]){
  const {p,ctx,errs}=await open(b,{"App:sectionId":"league","League:activeTab":tab},false);
  const loc=p.locator(sel).nth(tab==='homeaway'?2:0);await loc.scrollIntoViewIfNeeded();const bb=await loc.boundingBox();const x=bb.x+bb.width*f,y=bb.y+bb.height/2;
  await p.mouse.move(x,y);await p.mouse.move(x+3,y+1);await p.waitForTimeout(150);const a=await p.evaluate(()=>window.__tap?null:document.querySelector('[data-hv-card]')?.textContent.replace(/\s+/g,' ').slice(0,60));
  await p.mouse.move(x,8);await p.waitForTimeout(150);const gone=await p.evaluate(()=>!document.querySelector('[data-hv-card]'));
  out(!!a&&gone&&errs.length===0,`1440 mouse, League ${tab}: hover shows the card, leaving hides it`,a);await ctx.close();}
 await b.close();
 console.log(failed?`${failed} check(s) failed`:'all tap checks passed');process.exit(failed?1:0);})();
