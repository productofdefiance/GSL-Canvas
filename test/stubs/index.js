// Route d3 and lucide-react to the stand-ins in this folder for the server render,
// even when the project's own node_modules (real d3 is ESM-only) is installed.
const Module=require('module'),path=require('path');
const orig=Module._resolveFilename;
Module._resolveFilename=function(req,...rest){
  if(req==='d3'||req==='lucide-react')return path.join(__dirname,req,'index.js');
  return orig.call(this,req,...rest);
};
