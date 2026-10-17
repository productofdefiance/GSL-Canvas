/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — App.js (the shell that holds every section)
 *  Version:  Canvas v51.21
 *  Date:     2026-10-17, 23:30 UTC
 * ════════════════════════════════════════════════════════════════════
 *
 *  CHANGELOG (newest first)
 *
 *  Canvas v51.21 — 2026-10-17, 23:30 UTC — Spider Matrix on phones · LeagueTabs v13, UI v33
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.20 — 2026-10-17, 22:00 UTC — Points on phones · LeagueTabs v12, UI v32
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.19 — 2026-10-17, 20:00 UTC — Home vs Away on phones + section [i] · LeagueTabs v11, UI v31
 *   - Version line updated. No other changes to this file. Pyramid v30 and
 *     Squad v32 come in with the touch hover-card fix.
 *
 *  Canvas v51.18 — 2026-10-17, 07:45 UTC — Quick fixes
 *   - The Lab bar is rendered only while SHOW_LAB_BAR (ui.js) is true; it is
 *     false, so the bar is gone. Version line updated (Cups v19 too).
 *
 *  Canvas v51.17 — 2026-10-17, 12:00 UTC — Dark-mode fixes
 *   - ChromeContext also carries dark (the page is shown dark), read with
 *     ui.js's useDark(). Version line updated.
 *
 *  Canvas v51.16 — 2026-10-11, 12:00 UTC — GitHub pilot set-up (infrastructure only)
 *   - Version line updated. No other changes to this file. Repo tidy-ups:
 *     CLAUDE.md renamed, test kit moved into test/, .gitignore added.
 *
 *  Canvas v51.15 — 2026-10-09, 11:00 UTC — League locked · League v35, LeagueTabs v8
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.14 — 2026-10-09, 09:00 UTC — League review fixes · League v34, LeagueTabs v7, UI v28
 *   - Version line updated. No other changes to this file. public/index.html
 *     (v51.07) must be in place for division colours.
 *
 *  Canvas v51.13 — 2026-10-09, 05:00 UTC — Spider Matrix · League v33, LeagueTabs v6, UI v27
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.12 — 2026-10-09, 02:00 UTC — Home vs Away + Points race · League v32, LeagueTabs v5
 *   - Top Bar fits a phone again: the section links scroll instead of
 *     pushing the theme and fold buttons off-screen (a v51.06 regression).
 *
 *  Canvas v51.11 — 2026-10-08, 04:00 UTC — every League table sorts · League v31, LeagueTabs v4, UI v26
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.10 — 2026-10-08, 02:00 UTC — Points race panel, Streaks and Dropped points fixes · LeagueTabs v3
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.09 — 2026-10-07, 22:00 UTC — v51.08 fixes · LeagueTabs v2
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.08 — 2026-10-07, 18:00 UTC — Form & Margins + Points · League v30, LeagueTabs v1 (new file)
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.07 — 2026-10-07, 01:30 UTC — Seasons and Opponents · League v29, index.html
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.06 — 2026-10-06, 21:00 UTC — Foundations + Matchdays ·
 *  League v28, UI v25, Squad v31, index.html
 *   - Dark mode switch in the Top Bar (sun / moon), remembered per device.
 *     Only pages converted to the design system go dark (League for now);
 *     the others stay light even with dark mode on.
 *   - The page wrapper carries gsl-page (the dark page colour).
 *   - Version line updated.
 *
 *  Canvas v51.05 — 2026-10-05, 09:00 UTC — Type system on all of League ·
 *  League v27, Cups v18, UI v24, index.html
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.04 — 2026-10-05, 05:00 UTC — Lab bar, units, number fonts ·
 *  League v26, UI v23, index.html
 *   - The v51 lab controls move out of the Footer into their own bar above
 *     it (LabBar), opened and closed with a button.
 *   - Version line updated.
 *
 *  Canvas v51.03 — 2026-10-05, 03:00 UTC — Scorelines, spacing, sandbox bar ·
 *  League v25, UI v22, index.html
 *   - Top Bar is dark pink (pink-800) in the sandbox, so it can't be mistaken
 *     for the main project. GSL mark and inactive buttons in light pink.
 *   - Footer: LabSwitcher (fonts, score dash, big-number spacing).
 *   - Version line updated.
 *
 *  Canvas v51.02 — 2026-10-05, 01:30 UTC — Type roles pilot (sandbox) ·
 *  League v24, Pyramid v29, UI v21
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v51.01 — 2026-10-04, 23:30 UTC — Design tokens, step 1 (sandbox) ·
 *  League v23, Cups v17, Pyramid v28, Squad v30, UI v20, index.html
 *   - Footer: the v51 font switcher (text font, number font).
 *   - Registers the sheets for shared club colours (ui.js clubHex).
 *   - Version line updated.
 *
 *  Canvas v50.14 — 2026-10-04, 02:54 UTC — League v22, UI v19
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.13 — 2026-10-04, 02:34 UTC — Tablet pass: League · League v21, UI v18
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.12 — 2026-10-04, 01:30 UTC — Squad v29
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.11 — 2026-10-04, 00:20 UTC — Squad v28
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.10 — 2026-10-03, 21:40 UTC — Squad v27, Pyramid v27
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.09 — 2026-10-03, 20:58 UTC — Pyramid v26
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.08 — 2026-10-03, 20:40 UTC — Pyramid v25, UI v17
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.07 — 2026-10-03, 20:17 UTC — Pyramid v24 (Anish's Pyramid notes)
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.06 — 2026-10-03, 15:45 UTC — Mobile phase 4a (Pyramid) + audit fixes · Pyramid v23, UI v16, League v20, Cups v16
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.05 — 2026-10-03, 15:19 UTC — League v19, Cups v15, UI v15 (Anish's League notes)
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.04 — 2026-10-03, 07:43 UTC — Mobile phase 3b (Cups) · Cups v14, Cups Lab v2
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.03 — 2026-10-03, 07:16 UTC — Mobile phase 3a (League) · League v18, UI v14
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.02 — 2026-10-03, 06:53 UTC — Squad v26 (fix)
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50.01 — 2026-10-03, 06:41 UTC — Mobile phase 2 (Squad) · UI v13, Squad v25, League v17, Cups v13
 *   - Version line updated. No other changes to this file.
 *
 *  Canvas v50 — 2026-10-03, 05:34 UTC — Mobile phase 1 (foundation) · UI v12, Squad v24, Pyramid v22
 *   - Top Bar: an arrow at the right folds the Header's Title Row away
 *     (resets each visit). While folded the Top Bar stops sticking and only
 *     the Tab Bar sticks.
 *   - Footer on every page: the version line, this Canvas version's publish
 *     date and time, and "Developed by Anish & Claude". Replaces the
 *     floating version tag.
 *   - index.html gains the viewport tag (phones render at their real width).
 *
 *  Canvas v49.5 — 2026-10-03, 03:42 UTC — Squad v23
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49.4 — 2026-10-03, 03:21 UTC — Squad v22
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49.3 — 2026-10-03, 02:43 UTC — Squad v21
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49.2 — 2026-10-02, 23:45 UTC — Squad v20
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49.1 — 2026-10-02, 04:20 UTC — Squad v19
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49 (complete) — 2026-10-02, 01:41 UTC — Squad v18 (part 2 of 2)
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v49 — 2026-10-02, 01:01 UTC — Squad v17 (part 1 of 2)
 *   - Squad also reads the GSL Clubs tab (club directory).
 *   - Version numbering from here: whole numbers for bigger updates and new
 *     features, decimals (v49.1, v49.2...) for edits and smaller updates.
 *
 *  Canvas v48 — 2026-09-28, 16:08 UTC — Squad v16
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v47 — 2026-09-28, 15:34 UTC — Squad v15
 *   - Squad also reads the Pyramid tab (clubs players came from).
 *
 *  Canvas v46 — 2026-09-28, 14:13 UTC — Squad v14
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v45 — 2026-09-28, 03:39 UTC — Squad v13
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v44 — 2026-09-28, 03:29 UTC — Squad v12
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v43 — 2026-09-28, 03:19 UTC — Squad v11
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v42 — 2026-09-28, 03:06 UTC — Squad v10
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v41 — 2026-09-28, 02:58 UTC — Squad v9
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v40 — 2026-09-28, 02:25 UTC — Squad v8
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v39 — 2026-09-28, 02:20 UTC — Squad v7
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v38 — 2026-09-28, 02:17 UTC — Squad v6
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v37 — 2026-09-28, 02:05 UTC — Squad v5, UI v11
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v36 — 2026-09-28, 01:53 UTC — Squad v4
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v35 — 2026-09-28, 01:37 UTC — Squad v3
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v34 — 2026-09-28, 01:24 UTC — Squad v2
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v33 — 2026-09-28, 00:28 UTC — New section: Squad (Squad v1), UI v10
 *   - Squad added to the top bar (reads the Squad tab).
 *
 *  Canvas v32 — 2026-09-27, 23:39 UTC — Pyramid v21
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v31 — 2026-09-27, 21:34 UTC — Pyramid v20
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v30 — 2026-09-27, 21:11 UTC — Pyramid v19
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v29 — 2026-09-27, 17:37 UTC — Pyramid v18
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v28 — 2026-09-27, 17:28 UTC — Wider canvas (League v16, Cups v12, Pyramid v17, UI v9)
 *   - Top bar uses the shared page width (ui.js PAGE_WIDTH, 1800px).
 *
 *  Canvas v27 — 2026-09-27, 15:43 UTC — Pyramid v16
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v26 — 2026-09-27, 15:04 UTC — Pyramid v15
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v25 — 2026-09-26, 16:58 UTC — Pyramid v14
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v24 — 2026-09-26, 16:46 UTC — Pyramid v13, UI v8
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v23 — 2026-09-26, 15:48 UTC — League v15, Cups v11, Pyramid v12, UI v7
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v22 — 2026-09-26, 15:40 UTC — League v14, Cups v10, UI v6
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v21 — 2026-09-26, 15:25 UTC — Pyramid v11
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v20 — 2026-09-26, 05:38 UTC — Pyramid v10
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v19 — 2026-09-26, 04:30 UTC — Pyramid v9
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v18 — 2026-09-26, 04:25 UTC — Pyramid v8
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v17 — 2026-09-26, 04:04 UTC — Pyramid v7
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v16 — 2026-09-26, 03:46 UTC — Pyramid v6
 *   - A section can read extra tabs (extraTabs). Pyramid reads Winners.
 *
 *  Canvas v15 — 2026-09-26, 02:11 UTC — Pyramid v5, data copy
 *   - Version tag updated.
 *   - sheetData.js: Crystal Palace's short name is now PALACE (StackBlitz
 *     copy only; change cell AF in the Pyramid tab of the real sheet too).
 *
 *  Canvas v14 — 2026-09-26, 00:39 UTC — Cups v9, Cups Lab v1
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v13 — 2026-09-26, 00:30 UTC — Pyramid v4
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v12 — 2026-09-25, 21:53 UTC — Pyramid v3
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v11 — 2026-09-25, 21:15 UTC — Pyramid v2
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v10 — 2026-09-25, 20:41 UTC — Pyramid v1, UI v5
 *   - Pyramid now reads real sheet rows: its row shift is removed.
 *
 *  Canvas v9 — 2026-09-25, 18:21 UTC — League v13, Cups v8
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v8 — 2026-09-25, 17:47 UTC — League v12, Cups v7, UI v4
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v7 — 2026-09-25, 16:34 UTC — League v11, Cups v6, Pyramid v0.1, UI v3
 *   - The GSL section switcher (League | Cups | Pyramid) stays on screen
 *     when you scroll, with each section's header just below it.
 *
 *  Canvas v6 — 2026-09-25, 16:04 UTC — Cups v5
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v5 — 2026-09-25, 04:22 UTC — Cups v4
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v4 — 2026-09-25, 04:05 UTC — Cups v3 and UI v2
 *   - Version tag updated. No other changes to this file.
 *
 *  Canvas v3 — 2026-09-25, 02:51 UTC — Shared design kit
 *   - New file ui.js holds the pieces every section shares (header, tabs,
 *     highlights strip, controls). League v10 and Cups v2 use it.
 *
 *  Canvas v2 — 2026-09-24, 23:18 UTC — Cups v1
 *   - Cups now reads real sheet row numbers, so its row shift is removed.
 *
 *  Canvas v1 — 2026-09-24, 22:52 UTC — Combined project
 *   - One project for League, Cups and Pyramid, with a section switcher
 *     at the top. Each section is its own file.
 *   - Each section is protected: if one crashes, it shows an error box
 *     and the other sections keep working.
 *   - Data comes from sheetData.js (every tab, real sheet row numbers).
 *   - One version tag for the whole project (bottom-right corner).
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
const VERSION_TAG = 'Canvas v51.21 • League v36 • LeagueTabs v13 • Cups v19 • Cups Lab v2 • Pyramid v30 • Squad v32 • UI v33';
const PUBLISHED = '17 Oct 2026, 23:30 UTC';

// Pages that have been converted to the design system, and so can go dark.
// The others stay light even when dark mode is on (one page at a time).
const DARK_READY = new Set(['league']);

// Row shift: kept as a tool, but every section now reads real row numbers
// (Pyramid's shift was removed in Pyramid v1).
function shiftRows(rows, by) {
  if (!by) return rows || [];
  return (rows || []).map((r) => ({ index_: r.index_ + by, row: r.row }));
}

// Sections: order, names, which sheet tab each one reads.
const SECTIONS = [
  { id: 'league', label: 'League', tab: 'League', component: League, rowShift: 0 },
  { id: 'cups', label: 'Cups', tab: 'Cups', component: Cups, rowShift: 0 },
  { id: 'pyramid', label: 'Pyramid', tab: 'Pyramid', component: Pyramid, rowShift: 0, extraTabs: ['Winners'] },
  { id: 'squad', label: 'Squad', tab: 'Squad', component: Squad, rowShift: 0, extraTabs: ['Pyramid', 'GSL Clubs'] },
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
  const rows = shiftRows(sheets[section.tab], section.rowShift);
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
