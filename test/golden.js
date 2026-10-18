// Golden numbers (v51.25): checks the values in golden.json against the rendered page (render.js's snapshots).
// golden: a change fails (exit 1); pinned: a change is reported for a look. See golden.json's "about".
// Usage: node golden.js [snapshotDir]   (default: snap; run after render.js)
const fs=require('fs'),path=require('path');
const SNAP=process.argv[2]||path.join(__dirname,'snap');
const {entries}=JSON.parse(fs.readFileSync(path.join(__dirname,'golden.json'),'utf8'));
const ENT={'&amp;':'&','&#x27;':"'",'&quot;':'"','&lt;':'<','&gt;':'>','&nbsp;':' '};
// The page's text pieces in order: what sits between tags, trimmed, empty ones dropped.
const pieces=(html)=>html.replace(/<(script|style)[\s\S]*?<\/\1>/g,'').split(/<[^>]+>/).map(t=>t.replace(/&[a-z#0-9]+;/g,(e)=>ENT[e]||e).trim()).filter(Boolean);
const cache={};
const view=(v)=>cache[v]||(cache[v]=pieces(fs.readFileSync(path.join(SNAP,v+'.html'),'utf8')));
function findAnchor(t,anchor){for(let i=0;i+anchor.length<=t.length;i++)if(anchor.every((a,j)=>t[i+j]===a))return i+anchor.length;return -1;}
// G20: every club card on Opponents shows "Record W • D • L w • d • l"; games = w + d + l.
function mostPlayed(t){const games=[];for(let i=0;i+10<t.length;i++)if(t[i]==='Record'&&t[i+1]==='W'&&t[i+5]==='L'&&t[i+7]==='•'&&t[i+9]==='•')games.push(+t[i+6]+ +t[i+8]+ +t[i+10]);
  const max=Math.max(...games);return {games:max,clubs:games.filter(g=>g===max).length,cards:games.length};}
let fail=0,look=0;
for(const e of entries){
  let got,ok;
  try{
    const t=view(e.view);
    if(e.count==='most-played'){const r=mostPlayed(t);got=`${r.games} games, ${r.clubs} clubs (of ${r.cards} cards)`;ok=r.games===e.expect.games&&r.clubs===e.expect.clubs;}
    else{const at=findAnchor(t,e.anchor);
      if(at<0){got=`anchor "${e.anchor.join(' | ')}" not on the page`;ok=false;}
      else{const seen=t.slice(at,at+e.expect.length);got=seen.join(' | ');ok=e.expect.every((x,j)=>x===null||seen[j]===x);}}
  }catch(err){got=err.message;ok=false;}
  if(ok)continue;
  if(e.kind==='golden')fail++;else look++;
  console.log(`${e.kind==='golden'?'GOLDEN FAIL':'PINNED CHANGED'} ${e.id} ${e.value} (${e.where}): page shows ${got}`);
}
console.log(`golden numbers: ${entries.filter(e=>e.kind==='golden').length} golden, ${fail} changed; ${entries.filter(e=>e.kind==='pinned').length} pinned, ${look} changed`);
process.exitCode=fail?1:0;
