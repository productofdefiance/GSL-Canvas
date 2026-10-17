// Tiny CommonJS bundler: packs entry + test/out + node_modules into one script.
// d3 and lucide-react always come from test/stubs (real d3 is ESM-only and can't be bundled here).
const fs=require('fs'),path=require('path');
const STUBS=path.join(__dirname,'../stubs'),NM=[path.join(__dirname,'../node_modules')];
const mods={};let id=0;const ids={};
function resolveFile(p){for(const c of [p,p+'.js',path.join(p,'index.js')])if(fs.existsSync(c)&&fs.statSync(c).isFile())return c;
 if(fs.existsSync(path.join(p,'package.json'))){const pj=JSON.parse(fs.readFileSync(path.join(p,'package.json')));if(pj.main)return resolveFile(path.join(p,pj.main));}return null;}
function resolve(req,from){if(req.startsWith('.')||req.startsWith('/'))return resolveFile(path.resolve(path.dirname(from),req));
 const stub=resolveFile(path.join(STUBS,req));if(stub)return fs.realpathSync(stub);
 let dir=path.dirname(from);while(dir!=='/'){const r=resolveFile(path.join(dir,'node_modules',req));if(r)return fs.realpathSync(r);dir=path.dirname(dir);}
 for(const d of NM){const r=resolveFile(path.join(d,req));if(r)return fs.realpathSync(r);}throw new Error('cannot resolve '+req+' from '+from);}
function add(file){file=fs.realpathSync(file);if(file in ids)return ids[file];const my=ids[file]=id++;
 let src=fs.readFileSync(file,'utf8');const deps={};
 src.replace(/require\(\s*['"]([^'"]+)['"]\s*\)/g,(m,r)=>{deps[r]=add(resolve(r,file));return m;});
 mods[my]={src,deps};return my;}
const entry=add(path.resolve(process.argv[2]));
let out='(function(){var process={env:{NODE_ENV:"development"}};var M={'+Object.entries(mods).map(([k,m])=>k+':[function(require,module,exports){'+m.src+'\n},'+JSON.stringify(m.deps)+']').join(',')+'};var C={};function L(i){if(C[i])return C[i].exports;var m=C[i]={exports:{}};M[i][0](function(r){return L(M[i][1][r]);},m,m.exports);return m.exports;}L('+entry+');})();';
fs.writeFileSync(process.argv[3],out);console.log('bundled',Object.keys(mods).length,'modules',(out.length/1e6).toFixed(1)+'MB');
