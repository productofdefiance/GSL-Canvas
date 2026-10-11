import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { sheetData } from './sheetData.js';

render(
  <StrictMode>
    <App sheets={sheetData} />
  </StrictMode>,
  document.getElementById('root')
);
