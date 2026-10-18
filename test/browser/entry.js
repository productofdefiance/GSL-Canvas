const React=require('react');const {createRoot}=require('react-dom/client');
const App=require('../out/App.js').default;const {sheetData}=require('../out/sheetData.js');
// v51.22: a test can hand in its own workbook (globalThis.__SHEETS, e.g. {} for an empty save)
createRoot(document.getElementById('root')).render(React.createElement(App,{sheets:globalThis.__SHEETS||sheetData}));
