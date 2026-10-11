// Test stand-in for lucide-react: real Lucide shapes from react-icons/lu when
// available, else a plain circle. Keeps data-icon for tests.
const React=require('react');let LU={};try{LU=require('react-icons/lu');}catch(e){}
const ALIAS={BarChart2:'ChartColumn',BarChart3:'ChartColumnBig',Edit2:'Pencil',Edit3:'PenLine',CheckCircle2:'CircleCheck',XCircle:'CircleX',MinusCircle:'CircleMinus',Grid3x3:'Grid3X3',ArrowUpDown:'ArrowUpDown',Maximize2:'Maximize2',Minimize2:'Minimize2',PieChart:'ChartPie',Home:'House'};
const make=name=>{const Real=LU['Lu'+name]||LU['Lu'+(ALIAS[name]||'')];
 const C=(p={})=>Real?React.createElement('span',{'data-icon':name,style:{display:'contents'}},React.createElement(Real,{className:p.className,size:p.size||'1em',strokeWidth:p.strokeWidth||2,style:p.style})):React.createElement('svg',{'data-icon':name,className:p.className,width:p.size||'1em',height:p.size||'1em',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2},React.createElement('circle',{cx:12,cy:12,r:8}));C.displayName=name;return C;};
const cache={};
module.exports=new Proxy({__esModule:true},{get:(t,k)=>{if(k==='__esModule')return true;if(typeof k!=='string')return undefined;return cache[k]||(cache[k]=make(k));}});
