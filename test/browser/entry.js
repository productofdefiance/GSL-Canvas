const React=require('react');const {createRoot}=require('react-dom/client');
const App=require('../out/App.js').default;const {sheetData}=require('../out/sheetData.js');
createRoot(document.getElementById('root')).render(React.createElement(App,{sheets:sheetData}));
