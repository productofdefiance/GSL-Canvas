// Route d3 to the stand-in in this folder for the server render, even when the project's own
// node_modules (real d3 is ESM-only) is installed. v51.25: lucide-react is the real library (test/package.json
// pins the site's version; compile.js checks they match).
const Module=require('module'),path=require('path');
const orig=Module._resolveFilename;
Module._resolveFilename=function(req,...rest){
  if(req==='d3')return path.join(__dirname,req,'index.js');
  return orig.call(this,req,...rest);
};
