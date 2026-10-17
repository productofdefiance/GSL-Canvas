// v51.21: every chip or switch row that scrolls sideways is a ui.js ScrollRow, and its edge fade has the
// colour of the surface behind it, in light and dark. At 390 (iPhone 13), for each row: scroll it to the
// middle so both fades show, read each fade's starting colour, and compare it with the first opaque
// background behind the row.
// Rows: Points season strip; Spider quick picks, Group chips (seasons, clubs), layer picker kinds.
// Also lists any element in main with overflow-x auto/scroll that is not a ScrollRow (tables excepted).
// Usage (after npm run css and npm run bundle): node fade_t.js   (hard timeout: --max seconds, default 200)
const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('../cssC.css','utf8');const bundle=fs.readFileSync('app.bundle.js','utf8');
const MAX=Number((process.argv.indexOf('--max')>0&&process.argv[process.argv.indexOf('--max')+1])||200);
setTimeout(()=>{console.log(`TIMEOUT: hard limit of ${MAX}s reached`);process.exit(2);},MAX*1000).unref();
let failed=0;const out=(ok,name,info)=>{if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} ${name}${info?' · '+info:''}`);};
const CASES=[
 ['Points season strip',{"League:activeTab":"race"},'[data-strip-row]',null],
 ['Spider quick picks',{"League:activeTab":"spider"},'[data-quick-row] > div',null],
 ['Spider Group chips (seasons)',{"League:activeTab":"spider","LeagueTabs:mode":"group"},'[data-gchip]',null],
 ['Spider Group chips (clubs)',{"League:activeTab":"spider","LeagueTabs:mode":"group","LeagueTabs:gKind":"clubs"},'[data-gchip]',null],
 ['Spider layer picker kinds',{"League:activeTab":"spider"},'.absolute.z-40 button',"change"],
];
(async()=>{const b=await chromium.launch();
 for(const dark of [false,true])for(const [name,ov,sel,act] of CASES){
  const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>localStorage.setItem('gsl-theme','${dark?'dark':'light'}');globalThis.__OV=${JSON.stringify({"App:sectionId":"league",...ov})}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
  await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForSelector('main h3',{timeout:15000});
  const r=await p.evaluate(async([sel,act])=>{const frame=()=>new Promise((res)=>requestAnimationFrame(()=>res()));const wait=async(n=8)=>{for(let i=0;i<n;i++)await frame();};
   if(act==='change'){[...document.querySelectorAll('main button')].find((x)=>/Change/.test(x.textContent)).click();await wait();}
   const item=document.querySelector(`main ${sel}`);if(!item)return {missing:true};const box=item.closest('.overflow-x-auto');
   box.scrollIntoView({block:'center'});box.scrollLeft=(box.scrollWidth-box.clientWidth)/2;box.dispatchEvent(new Event('scroll'));await wait(10);
   const wrap=box.parentElement;const fades=[...wrap.querySelectorAll(':scope > [data-fade]')].map((f)=>({side:f.dataset.fade,bg:getComputedStyle(f).backgroundImage}));
   // the surface: the first ancestor of the row with an opaque background
   let q=wrap.parentElement,surface=null;while(q){const c=getComputedStyle(q).backgroundColor;const m=c.match(/[\d.]+/g);if(m&&(m.length<4||Number(m[3])>0.99)){surface=c;break;}q=q.parentElement;}
   return {fades,surface,scrolls:box.scrollWidth>box.clientWidth,isScrollRow:wrap.className.includes('relative min-w-0')};},[sel,act]);
  if(r.missing){out(false,`${dark?'dark':'light'} ${name}: row not found`);await ctx.close();continue;}
  const start=(g)=>{const m=g.match(/rgb\(([^)]+)\)/);return m?`rgb(${m[1].replace(/ \/ .*/,'').replace(/ /g,', ').replace(/,,/g,',')})`:null;};
  const norm=(c)=>c&&c.replace(/\s+/g,'').replace(/rgba?\(([\d.]+),([\d.]+),([\d.]+)(,[\d.]+)?\)/,'$1,$2,$3');
  const ok=r.isScrollRow&&r.scrolls&&r.fades.length===2&&r.fades.every((f)=>norm(start(f.bg))===norm(r.surface));
  out(ok&&errs.length===0,`${dark?'dark':'light'} 390 ${name}: a ScrollRow; both edge fades match the surface behind it`,`surface ${r.surface}; fades ${r.fades.map((f)=>`${f.side}: ${start(f.bg)}`).join(', ')}${r.scrolls?'':' · row does not overflow'}${errs.length?' · errors: '+errs.join(' | '):''}`);
  await ctx.close();}
 // any other sideways-scrolling box in League tabs that isn't a ScrollRow or a table
 for(const tab of ['overview','fixtures','clubs','race','analytics','homeaway','spider']){
  const ctx=await b.newContext({...devices['iPhone 13']});const p=await ctx.newPage();
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>globalThis.__OV=${JSON.stringify({"App:sectionId":"league","League:activeTab":tab})}</script></head><body><div id="root"></div><script>${bundle}</script></body></html>`;
  await p.route('http://gsl.test/',r=>r.fulfill({body:html,contentType:'text/html; charset=utf-8'}));await p.goto('http://gsl.test/');await p.waitForSelector('main',{timeout:15000});await p.waitForTimeout(600);
  const r=await p.evaluate(()=>[...document.querySelectorAll('main *')].filter((e)=>{const s=getComputedStyle(e);return /(auto|scroll)/.test(s.overflowX)&&e.scrollWidth>e.clientWidth+1;}).map((e)=>{const isRow=e.parentElement.className.includes('relative min-w-0');const table=!!e.querySelector('table')||/min-w-\[/.test(e.innerHTML.slice(0,300))||/rounded-xl border/.test(e.className);return {cls:String(e.className).slice(0,60),isRow,table};}));
  const plain=r.filter((x)=>!x.isRow&&!x.table);
  out(plain.length===0,`390 League ${tab}: every sideways-scrolling box is a ScrollRow or a wide table`,`${r.filter((x)=>x.isRow).length} ScrollRows, ${r.filter((x)=>x.table).length} wide tables${plain.length?' · plain: '+plain.map((x)=>x.cls).join('; '):''}`);
  await ctx.close();}
 await b.close();console.log(failed?`${failed} check(s) failed`:'all fade checks passed');process.exit(failed?1:0);})();
