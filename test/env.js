// Minimal browser globals for server rendering at a given screen width.
module.exports=function setScreen(w){
  const mq=q=>{const max=/max-width:\s*(\d+)/.exec(q),min=/min-width:\s*(\d+)/.exec(q);let m=true;if(max)m=m&&w<=+max[1];if(min)m=m&&w>=+min[1];return {matches:m,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}};};
  const noop=()=>{};
  globalThis.window={innerWidth:w,innerHeight:900,matchMedia:mq,addEventListener:noop,removeEventListener:noop,getComputedStyle:()=>({fontSize:'24px'}),devicePixelRatio:2};
  globalThis.document={addEventListener:noop,removeEventListener:noop,documentElement:{style:{setProperty:noop}},body:{style:{}}};
  globalThis.navigator={maxTouchPoints:w<1024?5:0,userAgent:'test'};
};
