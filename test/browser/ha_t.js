// v51.19 checks: Home vs Away on phones + the section [i].
// Usage (after npm run css and npm run bundle): node ha_t.js [shotDir]
// Prints one line per check, PASS or FAIL with the numbers behind it.
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const SHOTS=process.argv[2]||'.';
const OV={"App:sectionId":"league","League:activeTab":"homeaway"};
const TEXT={
 'Venue swing':"Where your points come from: home or away. The wide bar splits your whole career; the chart below shows each season’s swing. A bar above the line means home was stronger, below means away was stronger, and the number is the gap. How to use: switch between Points, Wins and Goals. Tap a season to see it in detail below; tap it again to go back to the whole career. Turn on Combine seasons to pool several, for example every Division 1 season.",
 'All seasons, home and away':"Ten measures, home on the left, away on the right. The number in the middle is the gap, and its arrow points at the stronger venue; the weaker side is faded. Good to know: for draws, losses, goals conceded and failing to score, fewer is better, so the arrow points at the side with fewer. The section follows whatever you picked in Venue swing: the whole career, one season, or a combined set.",
 'Venue ledger':"Every season with home and away side by side, mirrored around the bar that splits them. How to use: Points, Wins and Goals change what the bar splits. Tap a season to show it in Venue swing. On a desktop, sort by any column. On a phone each side shows one number, the one picked in the switch, with the split bar in the middle.",
};
const LOWER=['Draws','Losses','Conceded per game','Failed to score'];
const out=(ok,name,info)=>console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);
const norm=(t)=>t.replace(/\s+/g,' ').trim();
async function open(b,{phone,dark}){
 const ctx=await b.newContext(phone?{...devices['iPhone 13']}:{viewport:{width:1440,height:900}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>localStorage.setItem('gsl-theme','${dark?'dark':'light'}');globalThis.__OV=${JSON.stringify(OV)}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
 await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForTimeout(1000);
 return {p,ctx,errs};
}
// Section card of a title, its [i] button
const infoBtn=(p,t)=>p.locator(`main button[aria-label="About ${t}"]`);
const sectionOf=(t)=>`main h3:text-is("${t}")`;
async function headers(p,tag){
 const r=await p.evaluate((titles)=>titles.map((t)=>{const h=[...document.querySelectorAll('main h3')].find((x)=>x.textContent===t);if(!h)return {t,found:false};
  const head=h.closest('.flex.flex-col');const desc=h.parentElement.querySelector('p');const btn=document.querySelector(`main button[aria-label="About ${t}"]`);
  const card=h.closest('.rounded-2xl');const cb=card.getBoundingClientRect(),ib=btn&&btn.querySelector('svg').getBoundingClientRect();
  return {t,found:true,desc:!!desc,info:!!btn,iconRight:ib?Math.round(cb.right-ib.right):null,iconTop:ib?Math.round(ib.top-cb.top):null};}),Object.keys(TEXT));
 r.forEach((x)=>out(x.found&&!x.desc&&x.info,`${tag} ${x.t}: no description, has [i]`,`icon ${x.iconRight}px from card right, ${x.iconTop}px from top`));
}
(async()=>{const b=await chromium.launch();
 // ── Desktop 1440 ──
 {const {p,ctx,errs}=await open(b,{phone:false});
  await headers(p,'1440');
  for(const t of Object.keys(TEXT)){await infoBtn(p,t).click();await p.waitForTimeout(150);
   const r=await p.evaluate((t)=>{const btn=document.querySelector(`main button[aria-label="About ${t}"]`);const d=btn.parentElement.querySelector('[role=dialog]');if(!d)return null;
    const db=d.getBoundingClientRect(),ib=btn.querySelector('svg').getBoundingClientRect();const body=d.children[1];
    return {w:Math.round(db.width),below:Math.round(db.top-ib.bottom),rightGap:Math.round(db.right-ib.right),text:[...body.children].map((c)=>c.textContent).join(' '),exp:btn.getAttribute('aria-expanded'),eyebrow:d.children[0].textContent,fs:getComputedStyle(body).fontSize};},t);
   out(r&&r.w===330&&r.below>=0&&Math.abs(r.rightGap)<=1&&r.exp==='true'&&r.eyebrow==='About this section',`1440 ${t}: popover`,r&&`width ${r.w}, ${r.below}px under the icon, right edges ${r.rightGap}px apart, ${r.fs}`);
   out(r&&norm(r.text)===norm(TEXT[t]),`1440 ${t}: text matches the blurbs doc word for word`);
  }
  const count=async()=>p.locator('main [role=dialog]').count();
  out((await count())===1,'1440 one open at a time (opening each [i] in turn left one open)',`${await count()} open`);
  await p.mouse.click(700,40);await p.waitForTimeout(150);out((await count())===0,'1440 outside click closes');
  await infoBtn(p,'Venue swing').click();await p.waitForTimeout(100);await p.keyboard.press('Escape');await p.waitForTimeout(100);out((await count())===0,'1440 Esc closes');
  await infoBtn(p,'Venue swing').click();await p.waitForTimeout(100);await infoBtn(p,'Venue swing').click();await p.waitForTimeout(100);out((await count())===0,'1440 clicking the icon again closes');
  await infoBtn(p,'Venue ledger').scrollIntoViewIfNeeded();await infoBtn(p,'Venue ledger').click();await p.waitForTimeout(150);
  await p.screenshot({path:`${SHOTS}/v5119-1440-popover.png`});
  out(errs.length===0,'1440 no page errors',errs.join(' | '));await ctx.close();}

 // ── Phone 390 ──
 {const {p,ctx,errs}=await open(b,{phone:true});
  await headers(p,'390');
  for(const t of Object.keys(TEXT)){await infoBtn(p,t).scrollIntoViewIfNeeded();await infoBtn(p,t).click();await p.waitForTimeout(350);
   const r=await p.evaluate(()=>{const s=document.querySelector('.gsl-sheet');if(!s)return null;const h=s.querySelector('h3');const x=s.querySelector('button[aria-label=Close]').getBoundingClientRect();const body=s.children[1];const sb=s.getBoundingClientRect();
    return {title:h.textContent,tfs:getComputedStyle(h).fontSize,tfw:getComputedStyle(h).fontWeight,x:[Math.round(x.width),Math.round(x.height)],text:[...body.children].map((c)=>c.textContent).join(' '),fs:getComputedStyle(body).fontSize,lh:getComputedStyle(body).lineHeight,bottom:Math.round(window.innerHeight-sb.bottom),top:Math.round(sb.top)};});
   out(r&&r.title===t&&r.tfs==='16px'&&r.tfw==='800'&&r.x[0]>=44&&r.x[1]>=44&&r.fs==='14px'&&r.bottom===0,`390 ${t}: bottom sheet`,r&&`title "${r.title}" ${r.tfs}/${r.tfw}, ✕ ${r.x.join('×')}, text ${r.fs}/${r.lh}, top at ${r.top}px, bottom gap ${r.bottom}px`);
   out(r&&norm(r.text)===norm(TEXT[t]),`390 ${t}: text matches the blurbs doc word for word`);
   if(t==='Venue swing'){await p.screenshot({path:`${SHOTS}/v5119-390-sheet.png`});}
   await p.click('.gsl-sheet button[aria-label=Close]');await p.waitForTimeout(150);
   out((await p.locator('.gsl-sheet').count())===0,`390 ${t}: ✕ closes`);
  }
  // tap outside
  await infoBtn(p,'Venue ledger').click();await p.waitForTimeout(350);await p.mouse.click(195,30);await p.waitForTimeout(150);
  out((await p.locator('.gsl-sheet').count())===0,'390 tapping outside closes');
  // swipe down on the sheet's header (finger)
  await infoBtn(p,'Venue ledger').click();await p.waitForTimeout(350);
  await p.evaluate(async()=>{const g=document.querySelector('.gsl-sheet [data-sheet-grab]');const r=g.getBoundingClientRect();const x=r.left+40,y0=r.top+20;
   const fire=(type,y)=>g.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerType:'touch',pointerId:7,isPrimary:true,clientX:x,clientY:y}));
   fire('pointerdown',y0);for(let i=1;i<=12;i++){fire('pointermove',y0+i*12);await new Promise((r)=>setTimeout(r,16));}fire('pointerup',y0+144);});
  await p.waitForTimeout(200);out((await p.locator('.gsl-sheet').count())===0,'390 swipe down closes');
  // one open at a time on phones: the backdrop covers the page, so a second [i] can't be tapped while one is open
  // ── Venue ledger vs the desktop ledger, per metric ──
  const dsk=await open(b,{phone:false});
  for(const [i,m] of ['Points','Wins','Goals'].entries()){
   const ledSeg=(pp)=>pp.locator('main h3:text-is("Venue ledger")').locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]').getByRole("button",{name:m,exact:true});
   await ledSeg(p).click();await ledSeg(dsk.p).click();await p.waitForTimeout(150);await dsk.p.waitForTimeout(150);
   const ph=await p.evaluate(()=>[...document.querySelectorAll('[data-row=ledger]')].map((r)=>{const c=r.children;const sh=c[1].children[2].children;const v=(e)=>({t:e.textContent,w:getComputedStyle(e).fontWeight,c:getComputedStyle(e).color});
     return {s:c[1].children[0].children[0].textContent,h:v(c[0]),a:v(c[2]),hs:sh[0].textContent,as:sh[1].textContent,ht:Math.round(r.getBoundingClientRect().height)};}));
   const dk=await dsk.p.evaluate(()=>{const rows=[...document.querySelectorAll('main div.cursor-pointer')].filter((r)=>r.children.length===5&&/^S\d+$/.test(r.children[0].children[0]?.textContent||''));
     return rows.map((r)=>{const c=r.children;const sh=c[2].children[1].children;return {s:c[0].children[0].textContent,h:c[1].lastElementChild.textContent,a:c[3].firstElementChild.textContent,hs:sh[0].textContent,as:sh[1].textContent};});});
   let ok=ph.length===dk.length&&ph.length>0,bad=[];
   ph.forEach((r)=>{const d=dk.find((x)=>x.s===r.s);if(!d||d.h!==r.h.t||d.a!==r.a.t||d.hs!==r.hs||d.as!==r.as){ok=false;bad.push(r.s);}
     const hv=+r.h.t,av=+r.a.t;const strong=hv===av?null:hv>av?'h':'a';const ink='rgb(15, 23, 42)';
     const good=strong?(r[strong].w==='800'&&r[strong].c===ink&&r[strong==='h'?'a':'h'].w==='600'):(r.h.w==='700'&&r.a.w==='700'&&r.h.c===ink);if(!good){ok=false;bad.push(r.s+' weight');}
     if(r.ht<52){ok=false;bad.push(r.s+' '+r.ht+'px');}});
   out(ok,`390 Venue ledger ${m}: values and shares equal the desktop ledger; stronger side 800 ink; rows ≥ 52px`,`${ph.length} rows${bad.length?' · off: '+bad.join(', '):''} · e.g. ${ph[0]&&`${ph[0].s} ${ph[0].h.t} ${ph[0].hs} | ${ph[0].as} ${ph[0].a.t}`}`);
   if(i===0)await p.locator('[data-row=ledger]').first().scrollIntoViewIfNeeded();
  }
  await dsk.ctx.close();
  // ledger row tap selects the season in Venue swing
  await p.locator('[data-row=ledger]').nth(2).click();await p.waitForTimeout(150);
  out(await p.locator('main h3:text-is("Season 3, home and away")').count()===1,'390 tapping a ledger row shows that season');
  await p.locator('[data-row=ledger]').nth(2).click();await p.waitForTimeout(150);
  // ── Side-by-side ──
  const sbs=await p.evaluate((LOWER)=>[...document.querySelectorAll('[data-row=sbs]')].map((r)=>{const lab=r.children[0].children[1].textContent;const vals=[r.children[0].children[0],r.children[0].children[2]].map((e)=>({t:e.textContent,w:getComputedStyle(e).fontWeight}));
   const num=(t)=>parseFloat(t.replace('−','-').replace('+','').replace('%',''));const hv=num(vals[0].t),av=num(vals[1].t);
   const halves=[...r.querySelectorAll('[data-half]')].map((e)=>e.getBoundingClientRect().width),bars=[...r.querySelectorAll('[data-bar]')].map((e)=>e.getBoundingClientRect().width);
   const sp=r.querySelector('[data-spine]');const mx=Math.max(Math.abs(hv),Math.abs(av))||1;
   const exp=[Math.abs(hv)/mx*halves[0],Math.abs(av)/mx*halves[1]];
   return {lab,hv,av,vals,halves,bars,exp,spine:sp.textContent,spW:sp.getBoundingClientRect().width,spH:Math.round(sp.getBoundingClientRect().height),spFs:getComputedStyle(sp).fontSize,spOver:sp.scrollWidth>sp.clientWidth+0.5,lower:LOWER.includes(lab)};}),LOWER);
  let barOk=true,arrowOk=true,wrapOk=true;const notes=[];
  sbs.forEach((r)=>{if(Math.abs(r.bars[0]-r.exp[0])>1||Math.abs(r.bars[1]-r.exp[1])>1){barOk=false;notes.push(`${r.lab} bars ${r.bars.map(Math.round)} vs ${r.exp.map(Math.round)}`);}
   const better=r.hv===r.av?null:(r.lower?r.hv<r.av:r.hv>r.av)?'H':'A';const got=r.spine.includes('◂')?'H':r.spine.includes('▸')?'A':null;if(better!==got){arrowOk=false;notes.push(`${r.lab} arrow ${got} want ${better}`);}
   if(r.spH>30||r.spOver||Math.round(r.spW)!==86){wrapOk=false;notes.push(`${r.lab} spine ${r.spW}x${r.spH}`);}});
  out(barOk,'390 side-by-side: bar = value ÷ row max × half-row (±1px)',`${sbs.length} rows, half-row ${Math.round(sbs[0].halves[0])}px`);
  out(arrowOk,'390 side-by-side: arrows at the stronger side (fewer for the four lower-is-better rows)');
  out(wrapOk,'390 side-by-side: spine 86px, 22px, never wraps',`${sbs[0].spFs}; widest text ${sbs.map((r)=>r.spine).sort((a,b)=>b.length-a.length)[0]}`);
  if(notes.length)console.log('   ',notes.join(' | '));
  // ── Tap areas: combine on, one season picked ──
  const combine=p.locator('main button:has-text("Combine seasons")');await combine.click();await p.waitForTimeout(150);
  const tap=async(label)=>{const r=await p.evaluate(()=>{const tab=document.querySelector('main');const els=[...tab.querySelectorAll('button, [data-row=ledger], rect[data-tap]')].filter((e)=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&!e.closest('[role=tablist]')&&!e.closest('nav');});
    // only Home vs Away content (below the page tabs)
    const start=document.querySelector('main h3')?.closest('.space-y-6');const mine=els.filter((e)=>start&&start.contains(e));
    const box=(e)=>{const b=e.getBoundingClientRect();let x=b.left,y=b.top,w=b.width,h=b.height;if(e.classList.contains('gsl-tap')){const a=getComputedStyle(e,'::after');const aw=parseFloat(a.width),ah=parseFloat(a.height);if(aw){x=b.left+b.width/2-aw/2;y=b.top+b.height/2-ah/2;w=aw;h=ah;}}return {x,y:y+window.scrollY,w,h};};
    const name=(e)=>(e.getAttribute('aria-label')||e.textContent||e.tagName).replace(/\s+/g,' ').trim().slice(0,22)+(e.dataset.tap?` (season column)`:'');
    const list=mine.map((e)=>({n:name(e),...box(e)}));
    const small=list.filter((b)=>b.w<43.5||b.h<43.5).map((b)=>`${b.n} ${Math.round(b.w)}×${Math.round(b.h)}`);
    const over=[];for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){const a=list[i],c=list[j];const ox=Math.min(a.x+a.w,c.x+c.w)-Math.max(a.x,c.x),oy=Math.min(a.y+a.h,c.y+c.h)-Math.max(a.y,c.y);if(ox>0.5&&oy>0.5)over.push(`${a.n} / ${c.n} ${Math.round(ox)}×${Math.round(oy)}`);}
    return {n:list.length,small:[...new Set(small)],over};});
   out(r.small.length===0&&r.over.length===0,`390 tap areas ≥ 44 × 44px, none overlapping (${label})`,`${r.n} targets${r.small.length?' · under 44: '+r.small.join('; '):''}${r.over.length?' · overlaps: '+r.over.join('; '):''}`);};
  await tap('Combine seasons on');
  await p.locator('main button:has-text("Div 1 seasons")').click();await p.waitForTimeout(150);
  await tap('Combine on, Div 1 picked: chips, Clear and the selection chip');
  await combine.click();await p.waitForTimeout(150);
  await p.locator('main button:has-text("Clear")').click().catch(()=>{});await p.waitForTimeout(150);
  await tap('Combine off');
  // ── emoji flags as text ──
  const emo=await p.evaluate(()=>{const w=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);let n,c=0;while((n=w.nextNode()))if(/[\u{1F1E6}-\u{1F1FF}]/u.test(n.textContent))c++;return c;});
  out(emo===0,'390 no emoji flags rendered as text',`${emo} text nodes with regional-indicator letters`);
  out(errs.length===0,'390 no page errors',errs.join(' | '));
  await p.screenshot({path:`${SHOTS}/v5119-390.png`,fullPage:true});await ctx.close();}

 // ── Dark mode: [i] icon, popover and sheet ──
 for(const phone of [false,true]){const {p,ctx,errs}=await open(b,{phone,dark:true});
  const btn=infoBtn(p,'Venue swing');await btn.scrollIntoViewIfNeeded();
  const icon=await btn.evaluate((e)=>getComputedStyle(e.querySelector('svg')).color);
  await btn.click();await p.waitForTimeout(350);
  const r=await p.evaluate((phone)=>{const box=phone?document.querySelector('.gsl-sheet'):document.querySelector('main [role=dialog]');if(!box)return null;const body=box.children[1];const lead=body.querySelector('strong');
    return {bg:getComputedStyle(box).backgroundColor,text:getComputedStyle(body).color,lead:getComputedStyle(lead).color,dark:document.documentElement.classList.contains('gsl-dark')};},phone);
  out(r&&r.dark,`${phone?390:1440} dark: [i] ${phone?'sheet':'popover'} readable`,r&&`icon ${icon}; card ${r.bg}; text ${r.text}; bold ${r.lead}`);
  await p.screenshot({path:`${SHOTS}/v5119-${phone?390:1440}-dark-info.png`});
  out(errs.length===0,`${phone?390:1440} dark: no page errors`,errs.join(' | '));await ctx.close();}
 await b.close();})();
