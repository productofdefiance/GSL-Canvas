function scaleLinear(){let d=[0,1],r=[0,1],cl=false;
 const s=x=>{let t=(x-d[0])/((d[1]-d[0])||1);if(cl)t=Math.max(0,Math.min(1,t));return r[0]+t*(r[1]-r[0]);};
 s.domain=v=>v?(d=v.map(Number),s):d.slice(); s.range=v=>v?(r=v.slice(),s):r.slice();
 s.invert=y=>d[0]+((y-r[0])/((r[1]-r[0])||1))*(d[1]-d[0]); s.clamp=v=>(v===undefined?cl:(cl=!!v,s));
 s.nice=()=>s; s.copy=()=>scaleLinear().domain(d).range(r).clamp(cl);
 s.ticks=(n=10)=>{const a=Math.min(...d),b=Math.max(...d);if(!isFinite(a)||!isFinite(b)||a===b)return [a];
  const raw=(b-a)/n,p=Math.pow(10,Math.floor(Math.log10(raw))),m=raw/p,st=(m>=5?10:m>=2?5:m>=1?2:1)*p;const out=[];for(let v=Math.ceil(a/st)*st;v<=b+1e-9;v+=st)out.push(+v.toFixed(10));return out;};
 s.tickFormat=()=>String; return s;}
function line(){let fx=d=>d[0],fy=d=>d[1],def=()=>true;
 const l=data=>{let o='',on=false;(data||[]).forEach((p,i)=>{if(!def(p,i,data)){on=false;return;}o+=(on?'L':'M')+fx(p,i,data)+','+fy(p,i,data);on=true;});return o||null;};
 l.x=f=>(f?(fx=typeof f==='function'?f:()=>f,l):fx);l.y=f=>(f?(fy=typeof f==='function'?f:()=>f,l):fy);
 l.defined=f=>(f?(def=f,l):def);l.curve=()=>l;return l;}
module.exports={scaleLinear,line,curveMonotoneX:{}};
