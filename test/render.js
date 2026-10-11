// Render every page and tab at phone and desktop; record errors, small text, 5a figures; save HTML snapshots.
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');const fs=require('fs'),path=require('path');
require('./stubs');const setScreen=require('./env');const SNAP=process.argv[2]||path.join(__dirname,'snap');fs.mkdirSync(SNAP,{recursive:true});
const TABS={league:['overview','fixtures','clubs','race','analytics','homeaway','spider'],cups:['campaigns','finals','eliminations','form','rivalries','leagues','competitions','timeline','lab'],
 pyramid:['progression','standings','analytics','trophies','h2h'],squad:['squad','roster','depth','development','contracts','transfers','former','interactions','labs']};
const PAGEKEY={league:'League:activeTab',cups:'Cups:activeTab',pyramid:'Pyramid:activeTab',squad:'Squad:activeTab'};
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
  const real=caught.filter(c=>!/useLayoutEffect|act\(/.test(c));errs+=real.length?1:0;small+=sm.length;
  report.push({tag,len:html.length,errors:real.slice(0,3),small:[...new Set(sm)].slice(0,5)});return html;}
let squadHtml='';
for(const w of [390,1440]){for(const p of Object.keys(TABS))for(const t of TABS[p]){const h=run(p,t,{},w);if(p==='squad'&&t==='roster'&&w===1440)squadHtml=h;}
 for(const [p,t,ov] of extra)run(p,t,ov,w);}
console.error=origErr;
report.filter(r=>r.errors.length||r.small.length||r.len<500).forEach(r=>console.log(r.tag,r.len,JSON.stringify(r.errors),JSON.stringify(r.small)));
console.log(`rendered ${n}; with errors ${errs}; sub-11px hits ${small}`);
fs.writeFileSync(path.join(SNAP,'_report.json'),JSON.stringify(report,null,1));
