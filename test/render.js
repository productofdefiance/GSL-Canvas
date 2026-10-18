// Render every page and tab at phone and desktop; record errors, small text, 5a figures; save HTML snapshots.
// v51.22: sub-11px counts per page and tab (both widths, extra views included) against baseline.json; exits 1 on
// a React error or on any count that differs (`node render.js snap --update` rewrites the baseline after a drop).
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');const fs=require('fs'),path=require('path');
require('./stubs');const setScreen=require('./env');const SNAP=process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:path.join(__dirname,'snap');fs.mkdirSync(SNAP,{recursive:true});
const {TABS,PAGEKEY}=require('./pages');const BASE=path.join(__dirname,'baseline.json');const perTab={};
const extra=[['pyramid','progression',{'Pyramid:chartViewMode':'compact'}],['pyramid','progression',{'Pyramid:chartViewMode':'expanded'}]];
const {sheetData}=require('./out/sheetData.js');let errs=0,small=0,n=0;const report=[];
const origErr=console.error;let caught=[];console.error=(...a)=>caught.push(a.map(String).join(' ').slice(0,200));console.warn=()=>{};
function run(page,tab,ov,w){
  setScreen(w);for(const k of Object.keys(require.cache))if(k.includes('/out/')&&!k.endsWith('sheetData.js'))delete require.cache[k];
  globalThis.__OV={'App:sectionId':page,[PAGEKEY[page]]:tab,...ov};caught=[];
  const App=require('./out/App.js').default;let html='';
  try{html=renderToStaticMarkup(React.createElement(App,{sheets:sheetData}));}catch(e){caught.push('THROW '+e.message);}
  const tag=`${page}-${tab}${Object.values(ov).map(v=>'-'+v).join('')}-${w<640?'phone':'desktop'}`;
  fs.writeFileSync(path.join(SNAP,tag+'.html'),html);n++;
  const sm=(html.match(/text-\[(\d+(?:\.\d+)?)px\]|font-size:\s*(\d+(?:\.\d+)?)px|fontSize="(\d+(?:\.\d+)?)"/g)||[]).filter(s=>parseFloat(s.match(/[\d.]+/)[0])<11);
  const real=caught.filter(c=>!/useLayoutEffect|act\(/.test(c));errs+=real.length?1:0;small+=sm.length;perTab[`${page}/${tab}`]=(perTab[`${page}/${tab}`]||0)+sm.length;
  report.push({tag,len:html.length,errors:real.slice(0,3),small:[...new Set(sm)].slice(0,5)});return html;}
let squadHtml='';
for(const w of [390,1440]){for(const p of Object.keys(TABS))for(const t of TABS[p]){const h=run(p,t,{},w);if(p==='squad'&&t==='roster'&&w===1440)squadHtml=h;}
 for(const [p,t,ov] of extra)run(p,t,ov,w);}
console.error=origErr;
report.filter(r=>r.errors.length||r.small.length||r.len<500).forEach(r=>console.log(r.tag,r.len,JSON.stringify(r.errors),JSON.stringify(r.small)));
console.log(`rendered ${n}; with errors ${errs}; sub-11px hits ${small}`);
fs.writeFileSync(path.join(SNAP,'_report.json'),JSON.stringify(report,null,1));
if(process.argv.includes('--update')){fs.writeFileSync(BASE,JSON.stringify({about:'Text under 11px per page and tab (render.js: both widths, extra views included). It may never rise; lower it when a page improves.',total:small,tabs:perTab},null,2)+'\n');console.log('baseline written');}
else{const base=JSON.parse(fs.readFileSync(BASE,'utf8')).tabs;const probs=[];
 for(const k of Object.keys({...base,...perTab})){const now=perTab[k]||0,was=base[k]||0;
  if(now>was)probs.push(`SMALL ${k}: ${now} sub-11px hits, baseline ${was} (up ${now-was})`);else if(now<was)probs.push(`SMALL ${k}: down to ${now} from ${was}: lower the baseline (node render.js snap --update)`);}
 probs.forEach(p=>console.log(p));console.log(`small text: ${probs.length?'differs from':'matches'} baseline.json`);if(probs.length||errs)process.exitCode=1;}
