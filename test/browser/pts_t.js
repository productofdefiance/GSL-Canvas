// v51.20 checks: Points on phones (Matchday benchmarks reader, Pace controls) and the Points [i].
// Usage (after npm run css and npm run bundle): node pts_t.js [shotDir]   (hard timeout: --max seconds, default 300)
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const SHOTS=process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:'.';
const MAX=Number((process.argv.indexOf('--max')>0&&process.argv[process.argv.indexOf('--max')+1])||300);
setTimeout(()=>{console.log(`TIMEOUT: hard limit of ${MAX}s reached`);process.exit(2);},MAX*1000).unref();
let failed=0;const out=(ok,name,info)=>{if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);};
const norm=(t)=>t.replace(/\s+/g,' ').trim();
// The section [i] blurbs doc, word for word
const TEXT={
 'Points race':"Your league points, matchday by matchday. Each line climbs as the results come in. Focus follows one season. Draws are rings, losses are filled dots. The dashed line is record pace: the best points-per-game set before this season, stretched over this season’s games. Compare puts every season on one chart, with your highest and average finishing totals as dashed lines. Pace shows how far each season ran ahead (above 0) or behind (below 0) a benchmark: your average, your record, or last season. How to use: pick a season in the strip to focus it, or tick seasons on and off in Compare and Pace (All / None for everything). The division pills narrow the seasons. Hover the chart, or drag a finger across it, to read any matchday; on a phone the card stays docked at the bottom until you tap elsewhere. Good to know: the matchday axis runs to the longest season you’ve played. Division 1 seasons have 38 games, so their lines stop early.",
 'Matchday benchmarks':"Every matchday number across your seasons: all your MD 1s together, all your MD 2s, and so on. Cards: your best and worst matchday by points per game (goal difference breaks ties), matchdays you’ve won every time, and how many games each matchday holds. Win rate by matchday: one bar per matchday, coloured by how often you won it. The ledger: one row per matchday with record, win rate, points per game, goals, clean sheets, a dot per season and your best win. How to use: filter by All seasons, Division 1, or the lower divisions. Sort the ledger by any column; open a row to see that matchday’s result in every season. Drag across the bars to read any matchday, and tap \"See in ledger\" to jump to its row. On a phone the ledger is folded under \"Show all matchdays\". Good to know: matchdays 39–46 exist only in the lower divisions, so they usually hold fewer games.",
 'Venue swing':"Where your points come from: home or away. The wide bar splits your whole career; the chart below shows each season’s swing. A bar above the line means home was stronger, below means away was stronger, and the number is the gap. How to use: switch between Points, Wins and Goals. Tap a season to see it in detail below; tap it again to go back to the whole career. Turn on Combine seasons to pool several, for example every Division 1 season.",
};
async function open(b,ov,{phone=true,dark=false}={}){
 const ctx=await b.newContext(phone?{...devices['iPhone 13']}:{viewport:{width:1440,height:900}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>localStorage.setItem('gsl-theme','${dark?'dark':'light'}');globalThis.__OV=${JSON.stringify(ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');
 await p.waitForSelector('main h3',{timeout:15000});
 await p.evaluate(()=>{const sleep=(ms)=>new Promise((r)=>setTimeout(r,ms));const frame=()=>new Promise((r)=>requestAnimationFrame(()=>r()));
  const poll=async(c,max=600)=>{const t0=performance.now();while(performance.now()-t0<max){if(c())return true;await frame();}return !!c();};
  const tap=async(el,fx=0.5)=>{const b=el.getBoundingClientRect(),x=b.left+b.width*fx,y=b.top+b.height/2,t=document.elementFromPoint(x,y);const o={bubbles:true,cancelable:true,composed:true,pointerType:'touch',pointerId:31,isPrimary:true,clientX:x,clientY:y,button:0};
   t.dispatchEvent(new PointerEvent('pointerdown',{...o,buttons:1}));await sleep(30);t.dispatchEvent(new PointerEvent('pointerup',{...o,buttons:0}));};
  const card=()=>document.querySelector('[data-hv-card]');
  const settle=async()=>{let l=null,n=0;await poll(()=>{const k=`${scrollX},${scrollY}`;n=k===l?n+1:0;l=k;return n>=3;},1200);};
  window.__t={sleep,poll,tap,card,settle};});
 return {p,ctx,errs};
}
const PTS={"App:sectionId":"league","League:activeTab":"race"};
(async()=>{const b=await chromium.launch();
 // ── 1. Ledger folded on load; the button; fold / unfold; no sideways scroll ──
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const {poll,settle}=window.__t;const cells=document.querySelectorAll('[data-md]').length;const rows0=document.querySelectorAll('[data-md-row]').length;
   const btn=[...document.querySelectorAll('main button')].find((x)=>/matchdays/.test(x.textContent));const t0=btn&&btn.textContent;const bb=btn&&btn.getBoundingClientRect();
   btn.click();await poll(()=>document.querySelectorAll('[data-md-row]').length>0);const rows1=document.querySelectorAll('[data-md-row]').length;const t1=btn.textContent;
   const ledTop=document.querySelector('[data-md-row]').getBoundingClientRect().top;const above=btn.getBoundingClientRect().bottom<=ledTop;
   btn.click();await poll(()=>document.querySelectorAll('[data-md-row]').length===0);const rows2=document.querySelectorAll('[data-md-row]').length;await settle();
   return {cells,rows0,t0,t1,rows1,rows2,above,h:bb&&Math.round(bb.height),sw:document.documentElement.scrollWidth,W:document.documentElement.clientWidth};});
  out(r.rows0===0&&r.t0===`Show all ${r.cells} matchdays ▾`&&r.t1==='Hide matchdays ▴'&&r.rows1===r.cells&&r.rows2===0&&r.above&&r.h===44&&r.sw===r.W,'1. 390: ledger folded on load; "Show all N matchdays ▾" from the data; unfolds above the ledger, folds again; no sideways scroll',`"${r.t0}" (${r.cells} cells), button ${r.h}px, open "${r.t1}" with ${r.rows1} rows, page ${r.sw}/${r.W}px`);
  out(errs.length===0,'1. no page errors',errs.join(' | '));await ctx.close();}
 // ── 2. Scrub across the strip; sideways page scroll; vertical swipe still scrolls ──
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const {settle,poll,card}=window.__t;const strip=document.querySelector('[data-md]').parentElement;strip.scrollIntoView({block:'center'});await settle();
   const b=strip.getBoundingClientRect(),y=b.top+b.height/2,o={bubbles:true,cancelable:true,composed:true,pointerType:'touch',pointerId:41,isPrimary:true,clientY:y};const t=document.elementFromPoint(b.left+4,y);
   const seen=new Set();t.dispatchEvent(new PointerEvent('pointerdown',{...o,clientX:b.left+4,buttons:1}));
   for(let i=1;i<=40;i++){const x=b.left+4+(b.width-8)*i/40;t.dispatchEvent(new PointerEvent('pointermove',{...o,clientX:x,buttons:1}));await new Promise((r)=>requestAnimationFrame(()=>requestAnimationFrame(r)));const c=card();if(c)seen.add(c.textContent.match(/MD \d+/)[0]);}
   t.dispatchEvent(new PointerEvent('pointerup',{...o,clientX:b.right-4,buttons:0}));await settle();
   return {cards:seen.size,after:!!card(),sx:scrollX,ta:getComputedStyle(strip).touchAction,y:Math.round(b.top+b.height/2),x:Math.round(b.left+b.width/2)};});
  // a finger swipe down on the strip, as raw touch events (Chromium scrolls the page from them).
  // Downward, because with the ledger folded the page is already at its end below the strip.
  const cdp=await ctx.newCDPSession(p);await p.evaluate(()=>{window.__t.card()&&window.scrollBy(0,1);});await p.waitForTimeout(150);
  const at=await p.evaluate(()=>{const b=document.querySelector('[data-md]').parentElement.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height/2};});
  const y0=await p.evaluate(()=>scrollY);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:at.x,y:at.y}]});
  for(let i=1;i<=10;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:at.x,y:at.y+20*i}]});await p.waitForTimeout(16);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(400);
  const y1=await p.evaluate(()=>scrollY);
  out(r.cards>=10&&r.after&&r.sx===0&&r.ta==='pan-y'&&Math.abs(y1-y0)>100,'2. scrub: a sideways slide reads every matchday it crosses; the page never scrolls sideways; an up-and-down swipe on the strip still scrolls',`${r.cards} different cards, card stays after lifting: ${r.after}, scrollX ${r.sx}, touch-action ${r.ta}, a 200px swipe on the strip scrolled the page ${Math.round(y0-y1)}px`);
  out(errs.length===0,'2. no page errors',errs.join(' | '));await ctx.close();}
 // ── 3. Card vs the ledger row, three matchdays (100%, 50–74%, under 25%) ──
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const {tap,poll,card,settle}=window.__t;
   const btn=[...document.querySelectorAll('main button')].find((x)=>/matchdays/.test(x.textContent));btn.click();await poll(()=>document.querySelectorAll('[data-md-row]').length>0);
   const rowOf=(md)=>{const r=document.querySelector(`[data-md-row="${md}"]`).children;const best=r[9];return {rec:r[2].textContent.replace(/\s/g,''),wp:r[3].textContent.trim(),ppg:r[4].textContent.trim(),gd:r[6].textContent.trim(),bestScore:best.querySelector('.tabular-nums')?.textContent.replace(/\s/g,'')||null,bestS:best.textContent.match(/S\d+/)?.[0]||null,bestFlag:best.querySelector('svg,img')?.outerHTML.slice(0,80)||null};};
   const bands={'100%':(w)=>w===1,'50–74%':(w)=>w>=0.5&&w<0.75,'<25%':(w)=>w<0.25};const res=[];
   for(const [band,ok] of Object.entries(bands)){
    const cells=[...document.querySelectorAll('[data-md]')];const row=(md)=>rowOf(md);
    const pick=cells.find((c)=>{const t=document.querySelector(`[data-md-row="${c.dataset.md}"]`).children[3].textContent;return ok(parseInt(t)/100);});if(!pick){res.push({band,none:true});continue;}
    const md=pick.dataset.md;pick.scrollIntoView({block:'center'});await settle();await tap(pick);await poll(()=>!!card());const c=card();
    const cols=[...c.querySelectorAll('.grid > div')].map((d)=>d.children[1]);const tag=c.querySelector('[data-wp-tag]');const best=c.querySelector('[data-best]');
    const cv={rec:cols[0].textContent.replace(/\s/g,''),wp:tag.textContent.trim(),ppg:cols[2].textContent.trim(),gd:cols[3].textContent.trim(),bestScore:best.querySelector('.tabular-nums')?.textContent.replace(/\s/g,'')||null,bestS:best.textContent.match(/S\d+/)?.[0]||null,bestFlag:best.querySelector('svg,img')?.outerHTML.slice(0,80)||null};
    const rv=row(md);const ts=getComputedStyle(tag);const cellBg=getComputedStyle(pick).backgroundColor;
    const head=c.querySelector('span').textContent;const flagText=/[\u{1F1E6}-\u{1F1FF}]/u.test(c.textContent);
    const noWin=!rv.bestScore;if(noWin){cv.noWin=/No wins yet/.test(best.textContent);rv.noWin=document.querySelector(`[data-md-row="${md}"]`).children[9].textContent.trim()==='–';}
    res.push({band,md,noWin,same:JSON.stringify(cv)===JSON.stringify(rv),cv,rv,tagBg:ts.backgroundColor,cellBg,tagColor:ts.color,tagFs:ts.fontSize,tagFw:ts.fontWeight,head,flagDrawn:!!cv.bestFlag&&!flagText,meta:c.querySelector('span:nth-child(2)')?.textContent});
    window.scrollBy(0,1);await poll(()=>!card());}
   return res;});
  for(const x of r){if(x.none){out(false,`3. card for a ${x.band} matchday`,'no matchday in that band');continue;}
   const white=x.band==='100%';const okCol=x.tagBg===x.cellBg&&x.tagColor===(white?'rgb(255, 255, 255)':'rgb(15, 23, 42)')&&x.tagFs==='14px'&&x.tagFw==='700';
   out(x.same&&okCol&&(x.noWin||x.flagDrawn)&&x.head===`MD ${x.md}`,`3. card for MD ${x.md} (${x.band}): record, win %, PPG, GD and best win equal its ledger row; the tag is the cell's heat colour with ${white?'white':'ink'} text; ${x.noWin?'no win on that matchday: "No wins yet" (ledger "–")':'the flag is drawn'}`,`card ${JSON.stringify({...x.cv,bestFlag:!!x.cv.bestFlag})} · tag ${x.tagBg} / ${x.tagColor}${x.same?'':' · ledger '+JSON.stringify(x.rv)}`);}
  out(errs.length===0,'3. no page errors',errs.join(' | '));await ctx.close();}
 // ── 4. "See in ledger" for MD 23 and MD 44 ──
 for(const md of [23,44]){const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async(md)=>{const {tap,poll,card,settle}=window.__t;const cell=document.querySelector(`[data-md="${md}"]`);if(!cell)return {none:true};cell.scrollIntoView({block:'center'});await settle();await tap(cell);await poll(()=>!!card());
   const link=[...card().querySelectorAll('button')].find((x)=>/See in ledger/.test(x.textContent));const lh=Math.round(link.getBoundingClientRect().height);link.click();
   await poll(()=>!!document.querySelector(`[data-md-row="${md}"]`));await settle();const row=document.querySelector(`[data-md-row="${md}"]`);const rb=row.getBoundingClientRect();
   const st=row.getAttribute('style')||'';const drawer=[...document.querySelectorAll('main div')].some((d)=>d.textContent===`Matchday ${md} in every season`);
   const atEnd=Math.abs(scrollY-(document.documentElement.scrollHeight-innerHeight))<=1;
   return {off:Math.round(Math.abs(rb.top+rb.height/2-innerHeight/2)),atEnd,marked:/background/.test(st)&&/(inset 3px|3px 0px 0px inset)/.test(st),st,drawer,cardOpen:!!card(),lh};},md);
  out(!r.none&&(r.off<=80||r.atEnd)&&r.marked&&!r.drawer&&!r.cardOpen&&r.lh>=44,`4. "See in ledger" for MD ${md}: the ledger unfolds; the row's centre is ${r.off}px from the screen's centre${r.off>80?' (the page is scrolled to its end: no room below to centre it)':''}; marked ${r.marked}; drawer open ${r.drawer}; card open ${r.cardOpen}`,`link tap area ${r.lh}px tall · row style "${r.st}"`);
  out(errs.length===0,`4. MD ${md}: no page errors`,errs.join(' | '));await ctx.close();}
 // ── 4b. The mark clears when another row opens, the ledger folds or the filter changes; a tap inside the card keeps it open ──
 {const {p,ctx,errs}=await open(b,PTS);
  const r=await p.evaluate(async()=>{const {tap,poll,card,settle}=window.__t;const marked=()=>[...document.querySelectorAll('[data-md-row]')].filter((x)=>/background/.test(x.getAttribute('style')||'')).map((x)=>x.dataset.mdRow);
   const mark=async(md)=>{const cell=document.querySelector(`[data-md="${md}"]`);cell.scrollIntoView({block:'center'});await settle();await tap(cell);await poll(()=>!!card());
    const c=card(),hd=c.querySelector('span');await tap(hd);await new Promise((r)=>setTimeout(r,250));const stays=!!card();
    [...card().querySelectorAll('button')].find((x)=>/See in ledger/.test(x.textContent)).click();await poll(()=>marked().length>0);await settle();return stays;};
   const res={};res.cardStays=await mark(5);res.m1=marked().join();
   document.querySelector('[data-md-row="7"]').click();await poll(()=>marked().length===0,400);res.afterOther=marked().join();
   document.querySelector('[data-md-row="7"]').click();
   await mark(5);const fold=[...document.querySelectorAll('main button')].find((x)=>/Hide matchdays/.test(x.textContent));fold.click();await poll(()=>!document.querySelector('[data-md-row]'));
   fold.click();await poll(()=>!!document.querySelector('[data-md-row]'));res.afterFold=marked().join();
   await mark(5);const sec=[...document.querySelectorAll('main h3')].find((h)=>h.textContent==='Matchday benchmarks').closest('.rounded-2xl');[...sec.querySelectorAll('button')].find((x)=>x.textContent==='Div 1').click();await poll(()=>marked().length===0,400);res.afterFilter=marked().join();
   return res;});
  out(r.cardStays&&r.m1==='5'&&r.afterOther===''&&r.afterFold===''&&r.afterFilter==='','4b. a tap inside the docked card keeps it open; the mark clears when another row opens, the ledger folds, or the filter changes',JSON.stringify(r));
  out(errs.length===0,'4b. no page errors',errs.join(' | '));await ctx.close();}
 // ── 5. Pace at 390: three control rows; baseline on one line; legend values ──
 {const {p,ctx,errs}=await open(b,{...PTS,'LeagueTabs:mode':'pace'});
  const r=await p.evaluate(async()=>{const {poll}=window.__t;const sec=[...document.querySelectorAll('main h3')].find((h)=>h.textContent==='Points race').closest('.rounded-2xl');
   const segs=[...sec.querySelectorAll('div.inline-flex.bg-slate-100')].slice(0,3);const tops=segs.map((s)=>Math.round(s.getBoundingClientRect().top));const base=segs[1];
   const baseH=Math.round(base.getBoundingClientRect().height),one=Math.round(segs[0].getBoundingClientRect().height);const labels=[...base.querySelectorAll('button')].map((x)=>x.textContent);
   const measured=/Measured against/.test(sec.textContent);const leg=[];
   for(const btn of base.querySelectorAll('button')){btn.click();await poll(()=>btn.className.includes('shadow'),300);await new Promise((r)=>setTimeout(r,60));const L=sec.querySelector('.flex.flex-wrap.gap-5');leg.push(L.textContent.replace(/\s+/g,' ').trim());}
   return {tops,distinct:new Set(tops).size,baseH,one,labels,measured,leg};});
  out(r.distinct===3&&r.baseH===r.one&&!r.measured&&r.labels.join('|')==='Average|Record|Last season','5. Pace at 390: mode, baseline and divisions on three rows; the baseline switch fits one line ("Average / Record / Last season"); no "Measured against"',`rows at ${r.tops.join(', ')}px; baseline switch ${r.baseH}px tall (one row ${r.one}px)`);
  out(/^Average · \d\.\d\d PPG/.test(r.leg[0])&&/^Record · \d\.\d\d PPG/.test(r.leg[1])&&/^Last season · \d\.\d\d PPG \(S\d+\)/.test(r.leg[2]),'5. the legend shows the chosen baseline with its value for each choice',r.leg.map((x)=>`"${x}"`).join(' · '));
  out(errs.length===0,'5. no page errors',errs.join(' | '));await ctx.close();}
 // ── 6 / 7. [i] at 390 and 1440: no subtitles; text word for word (Points, Home vs Away) ──
 for(const phone of [true,false])for(const [tab,titles] of [['race',['Points race','Matchday benchmarks']],['homeaway',['Venue swing']]]){
  const {p,ctx,errs}=await open(b,{"App:sectionId":"league","League:activeTab":tab},{phone});
  for(const t of titles){
   const r=await p.evaluate(async([t,phone])=>{const {poll,settle}=window.__t;const h=[...document.querySelectorAll('main h3')].find((x)=>x.textContent===t);const sub=!!h.parentElement.querySelector('p');
    const btn=document.querySelector(`main button[aria-label="About ${t}"]`);if(!btn)return {sub,info:false};btn.scrollIntoView({block:'center'});await settle();btn.click();
    await poll(()=>!!(phone?document.querySelector('.gsl-sheet'):btn.parentElement.querySelector('[role=dialog]')));
    const box=phone?document.querySelector('.gsl-sheet').children[1]:btn.parentElement.querySelector('[role=dialog]').children[1];
    const text=[...box.children].map((c)=>c.tagName==='UL'?[...c.children].map((li)=>li.textContent).join(' '):c.textContent).join(' ');
    if(phone)document.querySelector('.gsl-sheet button[aria-label=Close]').click();else btn.click();await poll(()=>!document.querySelector('.gsl-sheet')&&!document.querySelector('main [role=dialog]'));
    return {sub,info:true,text};},[t,phone]);
   const ok=!r.sub&&r.info&&norm(r.text)===norm(TEXT[t]);
   out(ok,`${tab==='race'?'6':'7'}. ${phone?390:1440} ${t}: no subtitle, has an [i], text matches the blurbs doc word for word`,ok?'':`got: ${r.text&&norm(r.text).slice(0,120)}`);}
  out(errs.length===0,`6/7. ${phone?390:1440} ${tab}: no page errors`,errs.join(' | '));await ctx.close();}
 // ── 8. Dark mode: open [i] icon contrast against its tint ──
 const lum=(c)=>{const v=c.map((x)=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4;});return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];};
 const rgb=(s)=>s.match(/[\d.]+/g).map(Number);
 for(const phone of [true,false]){const {p,ctx,errs}=await open(b,PTS,{phone,dark:true});
  const r=await p.evaluate(async()=>{const {poll,settle}=window.__t;const btn=document.querySelector('main button[aria-label="About Points race"]');btn.scrollIntoView({block:'center'});await settle();btn.click();await poll(()=>btn.getAttribute('aria-expanded')==='true');
   const sq=btn.querySelector('span');const icon=getComputedStyle(sq).color,tint=getComputedStyle(sq).backgroundColor,card=getComputedStyle(btn.closest('.rounded-2xl')).backgroundColor;return {icon,tint,card};});
  await p.screenshot({path:`${SHOTS}/v5120-${phone?390:1440}-dark-info.png`});
  const ic=rgb(r.icon),t=rgb(r.tint),cd=rgb(r.card),a=t[3]??1;const mix=[0,1,2].map((i)=>t[i]*a+cd[i]*(1-a));
  const L1=lum(ic),L2=lum(mix);const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
  out(ratio>=3,`8. ${phone?390:1440} dark: the open [i] icon against its tint, contrast ${ratio.toFixed(2)}:1`,`icon ${r.icon} on ${r.tint} over card ${r.card} (WCAG non-text minimum 3:1)`);
  out(errs.length===0,`8. ${phone?390:1440} dark: no page errors`,errs.join(' | '));await ctx.close();}
 await b.close();console.log(failed?`${failed} check(s) failed`:'all v51.20 checks passed');process.exit(failed?1:0);})();
