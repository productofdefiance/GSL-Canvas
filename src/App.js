/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — App.js (the shell that holds every section)
 *  Version:  Canvas v51.22
 *  Date:     2026-10-18, 02:05 UTC
 *  Latest:   Canvas v51.22 code tidy: unused row shift removed; version line.
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */

import React, { Component, useState, useMemo, useEffect } from 'react';
import League from './League.js';
import Cups from './Cups.js';
import Pyramid from './Pyramid.js';
import Squad from './Squad.js';
import { ChevronUp, ChevronDown, Sun, Moon } from 'lucide-react';
import { PAGE_WIDTH, ChromeContext, LabBar, SHOW_LAB_BAR, registerClubSheets } from './ui.js';

// Footer: which version of each file is running, and when this Canvas
// version was published (v50: replaces the floating corner tag).
const VERSION_TAG = 'Canvas v51.22 • League v37 • LeagueTabs v14 • Cups v20 • Cups Lab v3 • Pyramid v31 • Squad v33 • UI v34';
const PUBLISHED = '18 Oct 2026, 02:05 UTC';

// Pages that have been converted to the design system, and so can go dark.
// The others stay light even when dark mode is on (one page at a time).
const DARK_READY = new Set(['league']);

// Sections: order, names, which sheet tab each one reads.
const SECTIONS = [
  { id: 'league', label: 'League', tab: 'League', component: League },
  { id: 'cups', label: 'Cups', tab: 'Cups', component: Cups },
  { id: 'pyramid', label: 'Pyramid', tab: 'Pyramid', component: Pyramid, extraTabs: ['Winners'] },
  { id: 'squad', label: 'Squad', tab: 'Squad', component: Squad, extraTabs: ['Pyramid', 'GSL Clubs'] },
];

// Stops a crash in one section from blanking the whole canvas.
class SectionBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('Section crashed:', this.props.name, error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="max-w-3xl mx-auto my-10 p-5 rounded-xl border border-rose-200 bg-rose-50 text-rose-900">
          <div className="text-sm font-bold">
            The {this.props.name} section hit an error.
          </div>
          <div className="mt-2 text-xs font-mono whitespace-pre-wrap">
            {String(this.state.error && this.state.error.message)}
          </div>
          <div className="mt-2 text-xs">
            The other sections still work. Copy this message and send it over.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App({ sheets = {} }) {
  const [sectionId, setSectionId] = useState('league');
  // v51.01: club colours for every page come from the sheet (ui.js clubHex).
  registerClubSheets(sheets);
  // The Top Bar's arrow folds the Title Row away (resets on each visit).
  // While folded the Top Bar stops sticking; only the Tab Bar sticks.
  const [headerFolded, setHeaderFolded] = useState(false);
  const section = SECTIONS.find((s) => s.id === sectionId) || SECTIONS[0];
  // v51.06: dark mode, remembered per device; applied only on converted pages.
  const [dark, setDark] = useState(() => {
    try { return typeof localStorage !== 'undefined' && localStorage.getItem('gsl-theme') === 'dark'; } catch (e) { return false; }
  });
  const darkHere = dark && DARK_READY.has(sectionId);
  const chrome = useMemo(() => ({ headerFolded, dark: darkHere }), [headerFolded, darkHere]);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('gsl-dark', darkHere);
  }, [darkHere]);
  const toggleDark = () => {
    setDark((d) => {
      try { localStorage.setItem('gsl-theme', d ? 'light' : 'dark'); } catch (e) { /* ignore */ }
      return !d;
    });
  };
  const SectionComponent = section.component;
  const rows = sheets[section.tab] || [];
  // Other tabs a section also reads (e.g. Pyramid reads Winners), by tab name
  const extra = {};
  (section.extraTabs || []).forEach((t) => { extra[t] = sheets[t] || []; });

  return (
    <ChromeContext.Provider value={chrome}>
    <div className="gsl-page min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar: section switcher, plus the arrow that folds the Header */}
      <nav className={`gsl-keep bg-pink-800 text-white z-40 ${headerFolded ? 'relative' : 'sticky top-0'}`}>
        <div className={`${PAGE_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4 h-11`}>
          <span className="text-xs font-black tracking-widest text-pink-200">
            GSL
          </span>
          <div className="flex items-center gap-1 min-w-0 overflow-x-auto [scrollbar-width:none]">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSectionId(s.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  s.id === sectionId
                    ? 'bg-white text-slate-900'
                    : 'text-pink-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? 'Light mode' : 'Dark mode'}
            title={DARK_READY.has(sectionId) ? (dark ? 'Light mode' : 'Dark mode') : 'Dark mode (this page stays light until it is converted)'}
            className="ml-auto w-9 h-10 sm:w-10 shrink-0 inline-flex items-center justify-center rounded-md text-pink-100 hover:text-white hover:bg-white/10"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => setHeaderFolded((f) => !f)}
            aria-label={headerFolded ? 'Show the header' : 'Hide the header'}
            className="-mr-2 w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-white/10"
          >
            {headerFolded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="flex-1">
        <SectionBoundary key={section.id} name={section.label}>
          <SectionComponent data={rows} extra={extra} />
        </SectionBoundary>
      </div>

      {/* Footer: versions, publish date, signature */}
      {/* v51 lab controls (sandbox): their own bar, above the Footer.
          Off since v51.18 (SHOW_LAB_BAR in ui.js); the code is kept. */}
      {SHOW_LAB_BAR && <LabBar />}

      <footer className="border-t border-slate-200 bg-white">
        <div className={`${PAGE_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-[11px] text-slate-400`}>
          <span className="font-semibold text-slate-500">{VERSION_TAG}</span>
          <span>Published {PUBLISHED} · Developed by Anish &amp; Claude</span>
        </div>
      </footer>
    </div>
    </ChromeContext.Provider>
  );
}
