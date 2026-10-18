/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — index.js (entry point)
 *  Version:  Index v1
 *  Date:     2026-10-18, 04:30 UTC
 *  Latest:   Canvas v51.23: imports index.css (Tailwind, compiled ahead of time).
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */

import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App.js';
import { sheetData } from './sheetData.js';

render(
  <StrictMode>
    <App sheets={sheetData} />
  </StrictMode>,
  document.getElementById('root')
);
