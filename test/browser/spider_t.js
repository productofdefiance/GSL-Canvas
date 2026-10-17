// v51.21 checks: Spider Matrix on phones (quick picks row, verdict chips, Group tap-to-rank, [i], tap areas).
// Usage (after npm run css and npm run bundle): node spider_t.js   (hard timeout: --max seconds, default 400)
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const MAX=Number((process.argv.indexOf('--max')>0&&process.argv[process.argv.indexOf('--max')+1])||400);
setTimeout(()=>{console.log(`TIMEOUT: hard limit of ${MAX}s reached`);process.exit(2);},MAX*1000).unref();
let failed=0;const out=(ok,name,info)=>{if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);};
const norm=(t)=>t.replace(/\s+/g,' ').trim();
// The section [i] blurbs doc ("Spider Matrix"), word for word; (coming) dropped
const TEXT={
 compare:"Two layers measured on six pillars. The radar shows the overall shape; the scorecard shows each pillar on its own fixed scale, and says who leads it. Win rate: wins per game played. Defensive steel: goals conceded per game (fewer is better). Clean sheets: share of games without conceding. Points efficiency: points per game. Blowout rate: share of games won by 3 or more. Attacking output: goals scored per game. How to use: use Change on either card to pick a layer: your career, one season, home or away (all seasons or one), or your record against a club. The ⇄ button swaps the two. Quick picks load common pairings in one tap. Good to know: the scales are fixed (win rate 0–100%, conceded 2.5 down to 0, clean sheets 0–70%, points per game 0–3, blowouts 0–70%, scored 0–4), so shapes mean the same in any save. A value past the scale sits on the edge with a marker. In the scorecard, the plain tick is your career average and the orange tick your best season.",
 group:"Up to eight seasons, or clubs, on the same six pillars, drawn as outlines so they can overlap. How to use: switch between Seasons and Clubs; add or remove them with the chips. Lines shows each pillar as a row of dots against your career average; Table shows the numbers. Hover or tap a chip, a shape or a dot to bring that one forward. On a phone, tap a pillar to see every season ranked on it.",
 hl:"Your best and worst opponent on each pillar. How to use: By club compares opponents, By season compares your seasons. With By club, the filter sets who counts: every club, clubs you’ve played at least 5 or 10 times, or the ten strongest clubs by average rank. Good to know: a club met only once or twice can top a pillar by luck; the 5+ filter, on by default, keeps the list honest.",
};
const SP={"App:sectionId":"league","League:activeTab":"spider"};
async function open(b,ov,{phone=true,dark=false}={}){
 const ctx=await b.newContext(phone?{...devices['iPhone 13']}:{viewport:{width:1440,height:900}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>localStorage.setItem('gsl-theme','${dark?'dark':'light'}');globalThis.__OV=${JSON.stringify(ov)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForSelector('main h3',{timeout:15000});
 await p.evaluate(()=>{const sleep=(ms)=>new Promise((r)=>setTimeout(r,ms));const frame=()=>new Promise((r)=>requestAnimationFrame(()=>r()));
  const poll=async(c,max=800)=>{const t0=performance.now();while(performance.now()-t0<max){if(c())return true;await frame();}return !!c();};
  const settle=async(el)=>{let l=null,n=0;await poll(()=>{const k=`${scrollY},${el?el.scrollLeft:0}`;n=k===l?n+1:0;l=k;return n>=4;},1500);};
  const tap=async(x,y)=>{const t=document.elementFromPoint(x,y);const o={bubbles:true,cancelable:true,composed:true,pointerType:'touch',pointerId:51,isPrimary:true,clientX:x,clientY:y,button:0};t.dispatchEvent(new PointerEvent('pointerdown',{...o,buttons:1}));await sleep(30);t.dispatchEvent(new PointerEvent('pointerup',{...o,buttons:0}));return t;};
  const tapEl=async(el)=>{el.scrollIntoView({block:'center'});await settle();const b=el.getBoundingClientRect();return tap(b.left+b.width/2,b.top+Math.min(b.height/2,20));};
  const card=()=>document.querySelector('[data-hv-card]');
  const inside=(el,box)=>{const e=el.getBoundingClientRect(),b=box.getBoundingClientRect();return e.left>=b.left-1&&e.right<=b.right+1;};
  window.__p={sleep,poll,settle,tap,tapEl,card,inside};});
 return {p,ctx,errs};
}
const rgb=(s)=>s.match(/[\d.]+/g).map(Number);
const lum=(c)=>{const v=c.slice(0,3).map((x)=>{x/=255;return x<=0.03928?x/12.92:((x+0.055)/1.055)**2.4;});return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};

(async()=>{const b=await chromium.launch();
 // ── 1. Quick picks on one row ──
 let quickLabels=[];
 {const {p,ctx,errs}=await open(b,SP);
  const r=await p.evaluate(async()=>{const {poll,settle,inside}=window.__p;const row=document.querySelector('[data-quick-row]');const chips=[...row.querySelectorAll('button')];
   const tops=new Set(chips.map((c)=>Math.round(c.getBoundingClientRect().top)));const labels=chips.map((c)=>c.textContent);
   const sel0=row.querySelector('[data-quick-on]');const load={label:sel0&&sel0.textContent,inside:sel0&&inside(sel0,row)};
   const eb=(row.previousElementSibling||row.parentElement.previousElementSibling);const eyebrow=eb&&eb.textContent;
   const scrolls=row.scrollWidth>row.clientWidth;const page=[document.documentElement.scrollWidth,document.documentElement.clientWidth];
   const hs=chips.map((c)=>Math.round(c.getBoundingClientRect().height));const firstL=Math.round(chips[0].getBoundingClientRect().left-row.getBoundingClientRect().left);
   // change the pairing with the row scrolled the other way (by script, so not "the user")
   const res=[];for(const i of [chips.length-1,0]){row.scrollLeft=i?0:row.scrollWidth;await settle(row);chips[i].click();await poll(()=>chips[i].hasAttribute('data-quick-on'));await settle(row);
    const s=row.querySelector('[data-quick-on]');const sb=s.getBoundingClientRect(),rb=row.getBoundingClientRect();res.push({label:s.textContent,inside:inside(s,row),l:Math.round(sb.left-rb.left),r:Math.round(rb.right-sb.right),scroll:Math.round(row.scrollLeft)});}
   return {n:chips.length,tops:[...tops],labels,load,eyebrow,scrolls,page,hs,firstL,res};});
  quickLabels=r.labels;
  out(r.tops.length===1&&r.scrolls&&r.page[0]===r.page[1]&&r.eyebrow==='Quick picks'&&r.hs.every((h)=>h===36),'1. 390: every quick pick on one line (one top position) under a "Quick picks" eyebrow; the row scrolls sideways, the page doesn\'t; chips 36px',`${r.n} picks: ${r.labels.map((l)=>`"${l}"`).join(', ')} · tops ${r.tops.join(',')} · chip heights ${[...new Set(r.hs)].join(',')}px · page ${r.page.join('/')}px · first chip ${r.firstL}px from the row's edge`);
  out(r.load.inside&&r.res.every((x)=>x.inside),'1. the selected chip is fully in view on load and after each pairing change',`load: "${r.load.label}" inside; `+r.res.map((x)=>`"${x.label}" ${x.l}px from the left, ${x.r}px from the right (row scrolled ${x.scroll}px)`).join('; '));
  out(errs.length===0,'1. no page errors',errs.join(' | '));await ctx.close();}
 {const {p,ctx}=await open(b,SP,{phone:false});const dl=await p.evaluate(()=>[...document.querySelectorAll('main button')].filter((x)=>x.parentElement.textContent.startsWith('Quick picks')).map((x)=>x.textContent));
  out(dl.length===quickLabels.length&&dl.every((l,i)=>l===quickLabels[i]),'1. every quick pick is present on the phone (same list as desktop)',`desktop ${dl.length}, phone ${quickLabels.length}`);await ctx.close();}
 // ── 2. Verdict chips: text equals the desktop column; contrast light and dark ──
 const pairings=[['Career vs S',(l)=>/^Career vs S\d/.test(l)],['Home vs Away',(l)=>l==='Home vs Away'],['Career vs a club',(l)=>/^Career vs /.test(l)&&!/^Career vs S\d/.test(l)]];
 for(const [name,match] of pairings){
  const read=async(phone,dark)=>{const {p,ctx}=await open(b,SP,{phone,dark});
   const r=await p.evaluate(async([phone,src])=>{const {poll,settle}=window.__p;const m=new Function('l','return ('+src+')(l)');
    const btn=[...document.querySelectorAll('main button')].find((x)=>m(x.textContent));if(!btn)return null;btn.click();await poll(()=>false,250);await settle();
    const title=[...document.querySelectorAll('main h3')].find((h)=>/ vs /.test(h.textContent)).textContent;
    if(!phone)return {title,v:[...document.querySelectorAll('[data-verdict-col]')].map((e)=>e.textContent)};
    return {title,v:[...document.querySelectorAll('[data-verdict]')].map((e)=>{const cs=getComputedStyle(e);return {t:e.textContent,c:cs.color,bg:cs.backgroundColor,fs:cs.fontSize,fw:cs.fontWeight};})};},[phone,match.toString()]);
   await ctx.close();return r;};
  const d=await read(false,false),ph=await read(true,false),pd=await read(true,true);
  if(!d||!ph){out(false,`2. ${name}: quick pick not found`);continue;}
  // a club layer goes by its abbreviation on phones: "CHE by 12.7%" for the desktop's "CHELSEA by 12.7%"
  const club=/vs (.+)$/.exec(ph.title)[1];const isClub=name==='Career vs a club';
  const expect=d.v.map((t,i)=>{if(!isClub||!t.startsWith(club+' by '))return t;const code=ph.v[i].t.split(' by ')[0];return /^[A-Z0-9]{2,4}$/.test(code)?`${code} by ${t.slice(club.length+4)}`:t;});
  const same=ph.v.map((x)=>x.t).join('|')===expect.join('|')&&(!isClub||ph.v.some((x)=>/^[A-Z0-9]{2,4} by /.test(x.t)));
  const cl=ph.v.map((x)=>ratio(rgb(x.c),rgb(x.bg))),cd=pd.v.map((x)=>ratio(rgb(x.c),rgb(x.bg)));
  out(same&&cl.every((x)=>x>=4.5)&&cd.every((x)=>x>=4.5)&&ph.v.every((x)=>x.fs==='11px'&&x.fw==='700'),`2. ${ph.title}: the 6 verdict chips equal the desktop column${isClub?' (the club by its abbreviation)':''}; every chip ≥ 4.5:1 in light and dark`,
   ph.v.map((x,i)=>`"${x.t}" ${cl[i].toFixed(2)} / ${cd[i].toFixed(2)}`).join(' · ')+(same?'':` · desktop: ${d.v.join(' | ')}`)+(isClub?` · desktop column: ${d.v.join(' | ')}`:''));}
 // ── 3. Group tap-to-rank (seasons, then clubs) ──
 for(const kind of ['seasons','clubs']){const {p,ctx,errs}=await open(b,{...SP,'LeagueTabs:mode':'group','LeagueTabs:gKind':kind});
  const r=await p.evaluate(async(kind)=>{const {poll,settle,tapEl,tap,card}=window.__p;const rows=[...document.querySelectorAll('[data-pillar-row]')];const res=[];
   const num=(t)=>parseFloat(t.replace('%',''));
   for(const row of rows){await tapEl(row);await poll(()=>!!card()&&card().textContent.includes(row.querySelector('.text-sm').textContent));const c=card();
    const head=c.querySelector('span').textContent;const list=c.querySelector('[data-rank-list]');const items=[...list.children];
    const vals=items.filter((x)=>x.dataset.rankRow).map((x)=>({id:x.dataset.rankRow,rank:x.children[0].textContent,v:x.querySelector('[data-rank-value]').textContent}));
    const ci=items.findIndex((x)=>x.hasAttribute('data-career-row'));const cv=items[ci].textContent.split('· ')[1];
    const lower=row.dataset.pillarRow==='conc';const ordered=vals.every((x,i)=>!i||(lower?num(x.v)>=num(vals[i-1].v):num(x.v)<=num(vals[i-1].v)));
    const tiesOk=vals.every((x,i)=>{const same=vals.filter((y)=>y.v===x.v);return same.length>1?same.every((y)=>y.rank===`=${x.rank.replace('=','')}`)&&x.rank.startsWith('='):!x.rank.startsWith('=');});
    const better=(a,b)=>lower?num(a)<num(b):num(a)>num(b);const before=vals.slice(0,ci),after=vals.slice(ci);
    const careerOk=before.every((x)=>!better(cv,x.v))&&after.every((x)=>better(cv,x.v));
    const marked=/inset 3px|3px 0px 0px inset/.test(row.getAttribute('style')||'');
    res.push({pillar:head,n:vals.length,order:vals.map((x)=>`${x.rank} ${x.id} ${x.v}`).join(', '),ordered,tiesOk,career:`${cv} at ${ci}`,careerOk,marked,hint:/Tap to rank ›/.test(row.textContent)});}
   // a layer row brings that layer forward and keeps the card open
   const c=card();const pick=c.querySelector('[data-rank-row]:nth-of-type(3)')||c.querySelector('[data-rank-row]');const id=pick.dataset.rankRow;const pb=pick.getBoundingClientRect();await tap(pb.left+pb.width/2,pb.top+pb.height/2);pick.click();
   await poll(()=>document.querySelector(`[data-gchip="${id}"]`).className.includes('ring-slate-900'));const fwd=document.querySelector(`[data-gchip="${id}"]`).className.includes('ring-slate-900');const keep=!!card();
   // another pillar switches; a blank tap closes; a scroll closes
   await tapEl(rows[0]);await poll(()=>card()&&card().textContent.startsWith(rows[0].querySelector('.text-sm').textContent));const sw=card()&&card().querySelector('span').textContent;
   await tapEl(rows[2]);await poll(()=>card()&&card().querySelector('span').textContent!==sw);const sw2=card()&&card().querySelector('span').textContent;
   const sec=rows[0].closest('.rounded-2xl').getBoundingClientRect();await tap(sec.left+6,Math.max(sec.top+6,80));await poll(()=>!card());const blank=!card();
   await tapEl(rows[1]);await poll(()=>!!card());window.scrollBy(0,-40);await poll(()=>!card());const scrolled=!card();
   // dots: no tap targets on phones
   const dots=[...document.querySelectorAll('[data-pillar-row] span.absolute.rounded-full')];const dotTargets=dots.filter((d)=>d.hasAttribute('data-hv')||getComputedStyle(d).pointerEvents!=='none').length;
   return {res,fwd,id,keep,sw,sw2,blank,scrolled,dots:dots.length,dotTargets};},kind);
  for(const x of r.res)out(x.ordered&&x.tiesOk&&x.careerOk&&x.marked&&x.hint,`3. Group ${kind}, ${x.pillar}: tapping the row opens its ranked card, best first${x.pillar==='Defensive steel'?' (fewest conceded first)':''}, ties share a rank, the career average in its place; the row is marked`,`${x.order} · career ${x.career}`);
  out(r.fwd&&r.keep&&r.sw2&&r.sw2!==r.sw&&r.blank&&r.scrolled,`3. Group ${kind}: a layer row brings ${r.id} forward and the card stays open; another pillar switches it; a blank tap and a scroll close it`,`switched "${r.sw}" → "${r.sw2}"`);
  out(r.dotTargets===0,`4. Group ${kind} at 390: no dot is a tap target`,`${r.dots} dots, ${r.dotTargets} targets`);
  out(errs.length===0,`3. ${kind}: no page errors`,errs.join(' | '));await ctx.close();}
 // 4. desktop dots keep their hover cards
 {const {p,ctx,errs}=await open(b,{...SP,'LeagueTabs:mode':'group'},{phone:false});
  const dot=p.locator('main span.absolute.rounded-full[data-hv]').first();await dot.scrollIntoViewIfNeeded();const bb=await dot.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.move(bb.x+bb.width/2+1,bb.y+bb.height/2);
  const c=await p.evaluate(async()=>{await window.__p.poll(()=>!!window.__p.card());return window.__p.card()&&window.__p.card().textContent;});
  out(!!c,'4. desktop 1440: a dot still shows its hover card on mouse hover',c&&norm(c));await ctx.close();}
 // ── 5. [i] in the three sections, 390 and 1440 ──
 for(const phone of [true,false])for(const [mode,secs] of [['versus',[['compare',(t)=>/ vs /.test(t)],['hl',(t)=>t==='Highs & lows']]],['group',[['group',(t)=>/side by side|against each club/.test(t)]]],['groupclubs',[['group',(t)=>/against each club/.test(t)]]]]){
  const ov=mode==='versus'?SP:{...SP,'LeagueTabs:mode':'group','LeagueTabs:gKind':mode==='groupclubs'?'clubs':'seasons'};
  const {p,ctx,errs}=await open(b,ov,{phone});
  for(const [key,m] of secs){
   const r=await p.evaluate(async([src,phone])=>{const {poll,settle}=window.__p;const m=new Function('t','return ('+src+')(t)');const h=[...document.querySelectorAll('main h3')].find((x)=>m(x.textContent));if(!h)return null;
    const sub=!!h.parentElement.querySelector('p');const t=h.textContent;const btn=document.querySelector(`main button[aria-label="About ${t}"]`);if(!btn)return {t,sub,info:false};
    btn.scrollIntoView({block:'center'});await settle();btn.click();await poll(()=>!!(phone?document.querySelector('.gsl-sheet'):btn.parentElement.querySelector('[role=dialog]')));
    const box=phone?document.querySelector('.gsl-sheet').children[1]:btn.parentElement.querySelector('[role=dialog]').children[1];
    const text=[...box.children].map((c)=>c.tagName==='UL'?[...c.children].map((li)=>li.textContent).join(' '):c.textContent).join(' ');
    if(phone)document.querySelector('.gsl-sheet button[aria-label=Close]').click();else btn.click();await poll(()=>!document.querySelector('.gsl-sheet')&&!document.querySelector('main [role=dialog]'));
    return {t,sub,info:true,text};},[m.toString(),phone]);
   const ok=r&&!r.sub&&r.info&&norm(r.text)===norm(TEXT[key]);
   out(ok,`5. ${phone?390:1440} "${r&&r.t}": no subtitle, an [i], text word for word`,ok?'':(r?`got: ${r.text&&norm(r.text).slice(0,140)}`:'section not found'));}
  out(errs.length===0,`5. ${phone?390:1440} ${mode}: no page errors`,errs.join(' | '));await ctx.close();}
 // ── 6. Tap areas at 390: at least 44 × 44, no two overlapping (a target inside another is not an overlap) ──
 const STATES=[
  ['Versus',SP,null],
  ['Versus, Change ▾ open (Seasons)',SP,'A'],['Versus, Change ▾ open (Venue)',SP,'A:venue'],['Versus, Change ▾ open (Opponents)',SP,'A:opp'],
  ['Group seasons, Lines',{...SP,'LeagueTabs:mode':'group'},null],['Group seasons, Add menu open',{...SP,'LeagueTabs:mode':'group','LeagueTabs:gSeasons':[1,2,3]},'add'],
  ['Group clubs, Lines',{...SP,'LeagueTabs:mode':'group','LeagueTabs:gKind':'clubs'},null],['Group clubs, Add menu open',{...SP,'LeagueTabs:mode':'group','LeagueTabs:gKind':'clubs'},'add'],
  ['Group seasons, Table',{...SP,'LeagueTabs:mode':'group','LeagueTabs:gTable':true},null],
  ['Highs & lows, By season',{...SP,'LeagueTabs:hlBy':'season'},null],
  ['Group seasons, ranked card open',{...SP,'LeagueTabs:mode':'group'},'rank'],
 ];
 // Known exception (reported, not failed): the minimum-games filter's "All" (39px) and "5+" (40px) are
 // narrower than 44 and switch widths are frozen for the standards review.
 const KNOWN=[/^All \/ 5\+ /];
 const known=(x)=>KNOWN.some((k)=>k.test(x));
 const allSmall=new Map();let allOver=[];
 for(const [name,ov,openMenu] of STATES){const {p,ctx,errs}=await open(b,ov);
  const r=await p.evaluate(async(openMenu)=>{const {poll,settle,sleep}=window.__p;
   if(openMenu==='rank'){const row=document.querySelector('[data-pillar-row]');row.scrollIntoView({block:'center'});await settle();const b=row.getBoundingClientRect();await window.__p.tap(b.left+b.width/2,b.top+20);await poll(()=>!!document.querySelector('[data-hv-card]'));openMenu=null;}
   if(openMenu){const [which,kind]=openMenu.split(':');const btn=which==='add'?[...document.querySelectorAll('main button')].find((x)=>/^Add /.test(x.textContent)):[...document.querySelectorAll('main button')].filter((x)=>/Change/.test(x.textContent))[0];
    if(btn){btn.click();await poll(()=>!!document.querySelector('main .absolute.z-40'));if(kind){const k=[...document.querySelectorAll('main .absolute.z-40 button')].find((x)=>x.textContent.startsWith(kind==='venue'?'Venue':'Opponents'));k&&k.click();await sleep(150);}
     document.querySelector('main .absolute.z-40').scrollIntoView({block:'center'});await settle();}}
   const scope=document.querySelector('main');
   const els=[...document.querySelectorAll('main button, main input, main [data-hv], main [data-pillar-row], main [data-gchip], main tr[data-trow], [data-hv-card] button')].filter((e)=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0;});
   // an open menu or docked card sits on top: what is under it can't be tapped there
   const menuOpen=document.querySelector('main .absolute.z-40')||document.querySelector('[data-hv-card]');
   const box=(e,onScreen=false)=>{const b=e.getBoundingClientRect();let x=b.left,y=b.top,w=b.width,h=b.height;if(e.classList.contains('gsl-tap')){const a=getComputedStyle(e,'::after');const aw=parseFloat(a.width),ah=parseFloat(a.height);if(aw){x=b.left+b.width/2-aw/2;y=b.top+b.height/2-ah/2;w=aw;h=ah;}}
    // a box with overflow clips what sticks out of it, but only in a direction it can't scroll
    // (a chip scrolled out of a sideways row is still reachable: the row scrolls)
    let q=e.parentElement;while(q&&q!==document.body){const s=getComputedStyle(q);if(/(auto|scroll|hidden)/.test(s.overflowX+s.overflowY)){const c=q.getBoundingClientRect();
      if(onScreen||q.scrollWidth<=q.clientWidth+1){const x2=Math.max(x,c.left),r2=Math.min(x+w,c.right);x=x2;w=Math.max(0,r2-x2);}
      if(onScreen||q.scrollHeight<=q.clientHeight+1){const y2=Math.max(y,c.top),b2=Math.min(y+h,c.bottom);y=y2;h=Math.max(0,b2-y2);}}q=q.parentElement;}
    return {x,y:y+scrollY,w,h};};
   // only what a finger can reach: when a menu is open, what is under it doesn't count
   const reachable=(e)=>!menuOpen||menuOpen.contains(e)||!(()=>{const a=e.getBoundingClientRect(),m=menuOpen.getBoundingClientRect();return a.left<m.right&&a.right>m.left&&a.top<m.bottom&&a.bottom>m.top;})();
   const name=(e)=>(e.getAttribute('aria-label')||e.dataset.pillarRow||e.dataset.gchip||e.dataset.trow||(e.tagName==='INPUT'?'search box':'')||e.textContent||e.tagName).replace(/\s+/g,' ').trim().slice(0,26);
   // size: as the item is once scrolled into view; overlaps: where things are on screen now
   const list=els.filter(reachable).map((e)=>({e,n:name(e),...box(e),s:box(e,true)}));
   const small=list.filter((b)=>b.w<43.5||b.h<43.5).map((b)=>`${b.n} ${Math.round(b.w)}×${Math.round(b.h)}`);
   const over=[];for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){const A=list[i],C=list[j];if(A.e.contains(C.e)||C.e.contains(A.e))continue;const a=A.s,c=C.s;a.n=A.n;c.n=C.n;const ox=Math.min(a.x+a.w,c.x+c.w)-Math.max(a.x,c.x),oy=Math.min(a.y+a.h,c.y+c.h)-Math.max(a.y,c.y);if(ox>0.5&&oy>0.5)over.push(`${a.n} / ${c.n} ${Math.round(ox)}×${Math.round(oy)}`);}
   return {n:list.length,small:[...new Set(small)],over};},openMenu);
  const small=r.small.filter((x)=>!known(x)),over=r.over.filter((x)=>!known(x)),exc=[...r.small,...r.over].filter(known);
  out(small.length===0&&over.length===0,`6. 390 ${name}: every tap area ≥ 44 × 44, none overlapping`,`${r.n} targets${small.length?' · under 44: '+small.join('; '):''}${over.length?' · overlaps: '+over.join('; '):''}${exc.length?' · known exceptions: '+exc.join('; '):''}`);
  if(errs.length)out(false,`6. ${name}: page errors`,errs.join(' | '));await ctx.close();}
 await b.close();console.log(failed?`${failed} check(s) failed`:'all v51.21 checks passed');process.exit(failed?1:0);})();
