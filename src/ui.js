/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — ui.js (shared building blocks for every section)
 *  Version:  UI v35
 *  Date:     2026-10-18, 04:30 UTC
 *  Latest:   Canvas v51.23 page build: LabBar loads Playfair Display itself.
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useMemo, useRef, useContext, createContext } from 'react';
import { Calendar, RotateCcw, Search, X, ChevronDown, Info } from 'lucide-react';

// ─── SECTION ACCENTS ─────────────────────────────────────────────────
export const ACCENTS = {
  indigo: {
    iconBox:
      'bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-indigo-100 ring-2 ring-indigo-50',
    tabActive: 'border-indigo-600 text-slate-900 font-semibold',
    hero: 'from-slate-900 via-indigo-950 to-slate-900',
    icon: 'text-indigo-600',
    edge: 'border-t-indigo-600',
    band: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
  },
  // v51.06: Squad's accent is violet for every club (the key keeps its old
  // name, "maroon", so Squad needs no edits). Losses stay rose everywhere.
  maroon: {
    iconBox:
      'bg-gradient-to-br from-violet-500 to-violet-700 text-white flex items-center justify-center shadow-md shadow-violet-100 ring-2 ring-violet-50',
    tabActive: 'border-violet-600 text-slate-900 font-semibold',
    hero: 'from-slate-900 via-violet-950 to-slate-900',
    icon: 'text-violet-600',
    edge: 'border-t-violet-600',
    band: 'bg-gradient-to-r from-violet-600 to-violet-700',
  },
  teal: {
    iconBox:
      'bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-100 ring-2 ring-teal-50',
    tabActive: 'border-teal-600 text-slate-900 font-semibold',
    hero: 'from-slate-900 via-teal-950 to-slate-900',
    icon: 'text-teal-700',
    edge: 'border-t-teal-700',
    band: 'bg-gradient-to-r from-teal-700 to-teal-800',
  },
  // v51.06: Cups is yellow-gold (one hue in both modes). Too light for text
  // on white, so the active tab's text stays ink and gold draws the marks.
  amber: {
    iconBox:
      'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white flex items-center justify-center shadow-md shadow-yellow-100 ring-2 ring-yellow-50',
    tabActive: 'border-yellow-500 text-slate-900 font-semibold',
    hero: 'from-slate-900 via-yellow-950 to-slate-900',
    icon: 'text-yellow-600',
    edge: 'border-t-yellow-500',
    band: 'bg-gradient-to-r from-yellow-600 to-yellow-700',
  },
};

// ─── DESIGN TOKENS (UI v20, Canvas v51.01) ───────────────────────────
// v51 step 1: colours that carry meaning, kept in one place. Fonts and the
// Tailwind colour scales are set in public/index.html (CSS variables), so a
// palette or font trial changes a few values instead of every page.

// Page accents as hex, for charts and inline styles. (The class versions
// are in ACCENTS above.) Squad's maroon becomes the user's club colour
// later in v51 (decision F13).
export const ACCENT_HEX = { indigo: '#4f46e5', teal: '#0f766e', maroon: '#7c3aed', amber: '#ca8a04' };
// The same accents a step lighter, for marks on dark surfaces (UI v32): the 400 shades.
export const ACCENT_HEX_LIGHT = { indigo: '#818cf8', teal: '#2dd4bf', maroon: '#a78bfa', amber: '#facc15' };

// v51.06: home and away, the provisional blue pair (navy / sky). Charts use
// the hex; classes use the CSS variables --c-home / --c-away, which dark
// mode swaps for their dark-mode pair.
export const HOME_HEX = '#1e3a8a';
export const AWAY_HEX = '#38bdf8';

// Win / draw / loss cell tones for margin matrices (League Wins by Margin,
// Cups Tier Matrix). One copy; keys: row, edge, pill (body cells), foot,
// footEdge, footPill (totals row), head, total, footTotal, headTotal.
export const MARGIN_TONES = {
  win: { row: 'text-emerald-900 bg-emerald-50/30', edge: 'border-l border-emerald-100', pill: 'bg-emerald-100/80 text-emerald-900', foot: 'text-emerald-950 bg-emerald-100/70', footEdge: 'border-l border-emerald-200', footPill: 'bg-emerald-300/60 text-emerald-950', head: 'bg-emerald-50/60 text-emerald-950', total: 'text-emerald-950 bg-emerald-100/50 border-r border-emerald-200', footTotal: 'text-emerald-950 bg-emerald-200/80 border-r border-emerald-300', headTotal: 'bg-emerald-100/70 text-emerald-950 border-r border-emerald-200' },
  draw: { row: 'text-amber-900 bg-amber-50/30', edge: 'border-l border-amber-100', pill: 'bg-amber-100/80 text-amber-950', foot: 'text-amber-950 bg-amber-100/70', footEdge: 'border-l border-amber-200', footPill: 'bg-amber-300/60 text-amber-950', head: 'bg-amber-50/60 text-amber-950', total: 'text-amber-950 bg-amber-100/50 border-r border-amber-200', footTotal: 'text-amber-950 bg-amber-200/80 border-r border-amber-300', headTotal: 'bg-amber-100/70 text-amber-950 border-r border-amber-200' },
  loss: { row: 'text-rose-900 bg-rose-50/30', edge: 'border-l border-rose-100', pill: 'bg-rose-100/90 text-rose-950', foot: 'text-rose-950 bg-rose-100/70', footEdge: 'border-l border-rose-200', footPill: 'bg-rose-300/60 text-rose-950', head: 'bg-rose-50/60 text-rose-950', total: 'text-rose-950 bg-rose-100/50 border-r border-rose-200', footTotal: 'text-rose-950 bg-rose-200/80 border-r border-rose-300', headTotal: 'bg-rose-100/70 text-rose-950 border-r border-rose-200' },
};

// Season colours: the first eight as before; later seasons get a generated
// colour (spread round the colour wheel) instead of repeating S1.
export const SEASON_COLORS = ['#475569', '#0284c7', '#059669', '#7c3aed', '#db2777', '#ea580c', '#0891b2', '#d97706'];
const hslHex = (h, s, l) => {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n) => { const k = (n + h / 30) % 12; const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return Math.round(c * 255).toString(16).padStart(2, '0'); };
  return `#${f(0)}${f(8)}${f(4)}`;
};
// Each new season takes the hue in the middle of the widest gap left on the
// colour wheel, so it never sits next to an existing season's colour.
const SEASON_HUES = [199, 161, 262, 330, 21, 192, 38]; // S2–S8 (S1 is grey)
const extraSeasons = [];
export function seasonColor(n) {
  const i = Math.max(1, Math.round(Number(n) || 1));
  if (i <= SEASON_COLORS.length) return SEASON_COLORS[i - 1];
  while (extraSeasons.length < i - SEASON_COLORS.length) {
    const hues = SEASON_HUES.concat(extraSeasons.map((x) => x.h)).sort((a, b) => a - b);
    let best = 0, at = 0;
    hues.forEach((h, k) => { const next = k + 1 < hues.length ? hues[k + 1] : hues[0] + 360; if (next - h > best) { best = next - h; at = (h + best / 2) % 360; } });
    extraSeasons.push({ h: Math.round(at), hex: hslHex(Math.round(at), 65, extraSeasons.length % 2 ? 38 : 45) });
  }
  return extraSeasons[i - SEASON_COLORS.length - 1].hex;
}

// Club colours, from the sheet only (decision F4). App.js registers the
// sheets once; clubHex('LIV') then returns the club's primary hex, or null.
// Columns are the ones Pyramid.js reads (its COL: hex 26, abbr 30, short
// name 31). Short names (ROMA) and an unambiguous first word of a short
// name (BODO for BODO/GLIMT) also match.
let CLUB_SHEETS = null;
let CLUB_MAP = null;
export function registerClubSheets(sheets) {
  if (sheets !== CLUB_SHEETS) { CLUB_SHEETS = sheets; CLUB_MAP = null; }
}
function buildClubMap() {
  const m = {};
  const firsts = {};
  const rows = (CLUB_SHEETS && CLUB_SHEETS.Pyramid) || [];
  rows.forEach((r) => {
    const row = r && r.row;
    if (!row) return;
    const raw = String(row[26] == null ? '' : row[26]).trim();
    if (!/^#?[0-9a-f]{6}$/i.test(raw)) return;
    const hex = raw[0] === '#' ? raw : `#${raw}`;
    const abbr = String(row[30] == null ? '' : row[30]).trim().toUpperCase();
    if (abbr) m[abbr] = hex;
    const short = String(row[31] == null ? '' : row[31]).trim().toUpperCase();
    if (short) {
      if (!(short in m)) m[short] = hex;
      const first = short.split(/[\s/]+/)[0];
      if (first && first !== short) (firsts[first] = firsts[first] || []).push(hex);
    }
  });
  Object.keys(firsts).forEach((k) => { if (firsts[k].length === 1 && !(k in m)) m[k] = firsts[k][0]; });
  return m;
}
// The club you manage: the Pyramid sheet marks its name with ✦ (col 31);
// colour (26), flag (29) and abbreviation (30) sit in the same row.
export function ownClubInfo() {
  const rows = (CLUB_SHEETS && CLUB_SHEETS.Pyramid) || [];
  for (const r of rows) {
    const row = r && r.row;
    if (!row || typeof row[31] !== 'string' || !/✦/.test(row[31])) continue;
    const name = row[31].replace(/✦/g, '').trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    const raw = String(row[26] == null ? '' : row[26]).trim();
    return { name, abbr: String(row[30] || '').trim().toUpperCase(), flag: String(row[29] || ''), color: /^#?[0-9a-f]{6}$/i.test(raw) ? (raw[0] === '#' ? raw : `#${raw}`) : '#0f172a' };
  }
  return null;
}
export function clubHex(abbr) {
  if (!abbr) return null;
  if (!CLUB_MAP) CLUB_MAP = buildClubMap();
  return CLUB_MAP[String(abbr).trim().toUpperCase()] || null;
}
// Games in a full league season, by division (UI v34): every club plays the
// others home and away, so 2 × (clubs − 1). Clubs per division come from the
// Pyramid sheet: a "DIVISION n" label in column A starts each block, and each
// row below it with an abbreviation (col 30) is one club. Null when the sheet
// doesn't list the division.
export function seasonGames(division) {
  const m = String(division || '').match(/(\d+)/);
  if (!m) return null;
  const rows = (CLUB_SHEETS && CLUB_SHEETS.Pyramid) || [];
  let cur = null, n = 0;
  for (const r of rows) {
    const row = r && r.row;
    if (!row) continue;
    const label = typeof row[0] === 'string' ? row[0].trim().toUpperCase() : '';
    if (/^DIVISION\s*\d+/.test(label)) cur = label.match(/(\d+)/)[1];
    if (cur === m[1] && typeof row[30] === 'string' && row[30].trim()) n++;
  }
  return n > 1 ? 2 * (n - 1) : null;
}

// ─── TYPE ROLES (UI v21, Canvas v51.02) ──────────────────────────────
// The Contrast profile ("Matchday broadcast"), decided in Claude Design
// Round 4. Text roles use the text font; roles with tabular-nums use the
// number font (index.html). Lexend weights 400 / 500 / 600 / 800.
export const TYPE = {
  page: 'gsl-title text-2xl sm:text-[30px] leading-tight font-extrabold tracking-[-0.01em]',
  section: 'text-lg sm:text-[22px] leading-tight font-extrabold tracking-[-0.005em]',
  card: 'text-[15px] font-extrabold',
  eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.1em]',
  body: 'text-sm font-normal',
  name: 'font-medium',
  meta: 'text-xs font-medium',
  chip: 'text-[11px] font-semibold',
  button: 'text-[13px] font-semibold',
  tab: 'text-xs sm:text-[13px] font-medium',
  big: 'gsl-big font-extrabold tabular-nums tracking-[var(--big-track)]',
  fig: 'font-medium tabular-nums',
  figStrong: 'font-semibold tabular-nums',
  score: 'font-extrabold tabular-nums',
  micro: 'text-[11px] font-medium tabular-nums',
};
// Swap a class string's weight and letter spacing for a role's (Tailwind
// can't override font-black by adding font-extrabold after it).
export function withRole(cls = '', role = '') {
  const kept = String(cls || '').split(/\s+/).filter((c) => c && !/^(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|tracking-)/.test(c));
  return [...kept, role].filter(Boolean).join(' ');
}

// ─── FONT SWITCHER (v51 lab) ─────────────────────────────────────────
// Sits in the Footer. Sets data-font-text / data-font-num on <html>; the
// font stacks for each choice are in public/index.html. Numbers: any
// element with lined-up digits (tabular-nums) uses the number font.
export const FONT_CHOICES = {
  text: [['lexend', 'Lexend'], ['atkinson', 'Atkinson'], ['device', 'Device font']],
  num: [['outfit', 'Outfit'], ['lexend', 'Lexend'], ['device', 'Device font']],
};
// v51 lab settings, each kept per device and applied as an attribute on
// <html> (index.html holds the CSS for each value).
export const LAB_CHOICES = {
  text: { label: 'Text', attr: 'data-font-text', def: 'lexend', options: [['lexend', 'Lexend'], ['atkinson', 'Atkinson'], ['device', 'Device font']] },
  title: { label: 'Page titles', attr: 'data-font-title', def: 'outfit', options: [['lexend', 'Lexend'], ['outfit', 'Outfit'], ['playfair', 'Playfair Display 600'], ['device', 'Device font']] },
  big: { label: 'Big numbers', attr: 'data-font-big', def: 'outfit', options: [['outfit', 'Outfit'], ['atkinson', 'Atkinson'], ['lexend', 'Lexend'], ['device', 'Device font']] },
  small: { label: 'Small numbers', attr: 'data-font-small', def: 'atkinson', options: [['atkinson', 'Atkinson'], ['outfit', 'Outfit'], ['lexend', 'Lexend'], ['device', 'Device font']] },
  track: { label: 'Big-number spacing', attr: 'data-big-track', def: 't2', options: [['m2', '−0.02em'], ['m1', '−0.01em'], ['t0', '0em'], ['t2', '+0.02em'], ['t4', '+0.04em'], ['t6', '+0.06em'], ['t10', '+0.1em']] },
};
const LAB_KEY = 'gsl-fonts';
// v51.18: the Lab bar is switched off and the font set is locked (each
// LAB_CHOICES def). While SHOW_LAB_BAR is false the locked values go on
// <html> on every load and any saved choice is ignored. Set it to true to
// bring the Lab back: LabBar then reads and keeps the saved choice again.
export const SHOW_LAB_BAR = false;
function applyLockedFonts() {
  try {
    const h = document.documentElement;
    Object.keys(LAB_CHOICES).forEach((k) => h.setAttribute(LAB_CHOICES[k].attr, LAB_CHOICES[k].def));
  } catch (e) { /* no page (server render): nothing to set */ }
}
if (!SHOW_LAB_BAR) applyLockedFonts();
function readLab() {
  const out = {};
  let saved = {};
  try { saved = JSON.parse(window.localStorage.getItem(LAB_KEY) || '{}') || {}; } catch (e) { saved = {}; }
  Object.keys(LAB_CHOICES).forEach((k) => {
    const c = LAB_CHOICES[k];
    out[k] = c.options.some(([id]) => id === saved[k]) ? saved[k] : c.def;
  });
  out.open = saved.open !== false;
  return out;
}
// v51.23: Playfair Display is only a Lab choice, so the page no longer downloads it;
// LabBar adds its stylesheet when it mounts (once, kept if the bar unmounts).
const PLAYFAIR_CSS = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap';
function loadPlayfair() {
  try {
    if (document.querySelector('link[data-gsl-playfair]')) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = PLAYFAIR_CSS;
    l.setAttribute('data-gsl-playfair', '');
    document.head.appendChild(l);
  } catch (e) { /* no page (server render): nothing to load */ }
}
// The lab bar: sits above the Footer; a button opens and closes it.
export function LabBar() {
  const [f, setF] = useState(readLab);
  useEffect(loadPlayfair, []);
  useEffect(() => {
    try {
      const h = document.documentElement;
      Object.keys(LAB_CHOICES).forEach((k) => h.setAttribute(LAB_CHOICES[k].attr, f[k]));
      window.localStorage.setItem(LAB_KEY, JSON.stringify(f));
    } catch (e) { /* storage blocked: the choice just isn't kept */ }
  }, [f]);
  const sel = 'h-10 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700';
  return (
    <div className="border-t border-pink-200 bg-pink-50/60">
      <div className={`${PAGE_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`}>
        <button type="button" onClick={() => setF((o) => ({ ...o, open: !o.open }))} aria-expanded={f.open}
          className="w-full h-11 flex items-center justify-between text-xs font-semibold text-pink-900">
          <span>v51 Lab controls</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${f.open ? 'rotate-180' : ''}`} />
        </button>
        {f.open && (
          <div className="pb-4 flex flex-wrap items-end gap-x-4 gap-y-3 text-xs text-slate-600">
            {Object.keys(LAB_CHOICES).map((k) => (
              <label key={k} className="inline-flex flex-col gap-1">
                <span className="font-semibold text-slate-500">{LAB_CHOICES[k].label}</span>
                <select className={sel} value={f[k]} onChange={(e) => { const v = e.target.value; setF((o) => ({ ...o, [k]: v })); }}>
                  {LAB_CHOICES[k].options.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                </select>
              </label>
            ))}
            <div className="inline-flex items-end gap-4 text-slate-800">
              <span className="inline-flex flex-col items-end leading-tight tabular-nums text-[13px] font-semibold" title="Alignment check: the digits should line up">
                <span>111.1</span>
                <span>888.8</span>
              </span>
              <span className="text-[13px] font-semibold tabular-nums"><Score a={2} b={1} /></span>
              <span className="text-[13px] font-semibold tabular-nums"><WDLRecord w={6} d={2} l={1} /></span>
              <span className={`text-2xl ${TYPE.big}`}>$4,055 M</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export const LabSwitcher = LabBar;

// ─── SIGNED NUMBERS (v51.18) ─────────────────────────────────────────
// Deltas, goal differences, pace values and axis labels: "+" for positive,
// the true minus sign U+2212 (−) for negative, no sign for zero. digits
// rounds first, so −0.04 at one digit reads "0.0", not "−0.0".
export const MINUS = '\u2212';
export function signed(n, digits) {
  const v = Number(n) || 0;
  const txt = digits == null ? String(Math.abs(v)) : Math.abs(v).toFixed(digits);
  const r = digits == null ? v : Number(v.toFixed(digits));
  return r > 0 ? `+${txt}` : r < 0 ? `${MINUS}${txt}` : txt;
}
export const FontSwitcher = LabBar;

// ─── SCORELINES AND RECORDS (UI v22) ─────────────────────────────────
// Score: "2 – 1" with the dash spaced and played down (index.html styles
// .gsl-dash from the lab setting). Pass the numbers; the caller sets size,
// weight and colour on a wrapper as usual.
export function Score({ a, b, className = '' }) {
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {a}<span className="gsl-dash">–</span>{b}
    </span>
  );
}
// WDLRecord (v24): numbers only, 6 • 2 • 1 (wins, draws, losses). Coloured
// win / draw / loss by default; plain keeps the caller's colour (pair it with
// a RecordKey in the label). Dots are faded and spaced.
export const WDL_TONES = ['text-emerald-700', 'text-amber-700', 'text-rose-700'];
export const WDL_TONES_DARK = ['text-emerald-300', 'text-amber-300', 'text-rose-300'];
export function WDLRecord({ w = 0, d = 0, l = 0, className = '', plain = false, tones = WDL_TONES }) {
  const t = plain ? ['', '', ''] : tones;
  return (
    <span className={`gsl-wdl whitespace-nowrap ${className}`}>
      <span className={t[0]}>{w}</span><span className="gsl-sep">•</span><span className={t[1]}>{d}</span><span className="gsl-sep">•</span><span className={t[2]}>{l}</span>
    </span>
  );
}
// RecordKey: the "W • D • L" hint that tells a plain record what it is.
export function RecordKey() {
  return <span className="whitespace-nowrap">W<span className="gsl-sep">•</span>D<span className="gsl-sep">•</span>L</span>;
}
// numberize: "245W - 52D - 31L" → a record; " - " between numbers → the score
// dash. Anything else is returned as it is.
const RECORD_RE = /^(.*?)(\d+)W\s*-?\s*(\d+)D\s*-?\s*(\d+)L(.*)$/;
export function numberize(value, { tones = null } = {}) {
  if (typeof value !== 'string' || !/\d/.test(value)) return value;
  const m = value.match(RECORD_RE);
  if (m) return <>{m[1]}<WDLRecord w={m[2]} d={m[3]} l={m[4]} plain={!tones} tones={tones || undefined} />{m[5]}</>;
  if (/\d\s+-\s+\d/.test(value)) {
    const parts = value.split(/(\s-\s)/);
    return parts.map((t, i) => (/^\s-\s$/.test(t) ? <span key={i} className="gsl-dash">–</span> : <React.Fragment key={i}>{t}</React.Fragment>));
  }
  return value;
}

// ─── PAGE WIDTH ──────────────────────────────────────────────────────
// How wide the canvas can get (top bar, headers and content all use it).
// Change it here to widen or narrow every section at once.
export const PAGE_WIDTH = 'max-w-[1800px]';

// ─── MOBILE FOUNDATION (UI v12) ──────────────────────────────────────
// Screen sizes: phone under 640px, tablet 640–1023px, desktop 1024px and
// up (Tailwind sm: / lg:). Styling uses those classes; these helpers are
// only for code that must know the size or measure a box.
// (UI v16: renamed from BREAKPOINTS, which clashed with the grid helper's own
// BREAKPOINTS further down this file.)
export const SCREEN_BREAKPOINTS = { tablet: 640, desktop: 1024 };
const screenOf = (w) => (w < SCREEN_BREAKPOINTS.tablet ? 'phone' : w < SCREEN_BREAKPOINTS.desktop ? 'tablet' : 'desktop');
// UI v16: measured with media queries, exactly like the CSS breakpoints. The
// window's own width changes when a phone pinch-zooms or a page overflows,
// which flipped phone layouts to desktop.
const MQ_PHONE = '(max-width: 639.98px)', MQ_TABLET = '(max-width: 1023.98px)';
export const screenNow = () => {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia) return window.matchMedia(MQ_PHONE).matches ? 'phone' : window.matchMedia(MQ_TABLET).matches ? 'tablet' : 'desktop';
  return viewport(0).w ? screenOf(viewport(0).w) : 'desktop';
};
// The window's size in pixels (UI v34), for placing fixed cards inside the
// screen. The one place the canvas reads window.innerWidth / innerHeight
// (the kit's rules check allows it here only). Screen size for layout comes
// from useScreen() or Tailwind prefixes, never from this.
export function viewport(fallbackW = 1440, fallbackH = 900) {
  if (typeof window === 'undefined') return { w: fallbackW, h: fallbackH };
  return { w: window.innerWidth, h: window.innerHeight };
}
export function useScreen() {
  const [scr, setScr] = useState(screenNow);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const on = () => setScr(screenNow());
    on();
    const mqs = window.matchMedia ? [window.matchMedia(MQ_PHONE), window.matchMedia(MQ_TABLET)] : [];
    mqs.forEach((m) => (m.addEventListener ? m.addEventListener('change', on) : m.addListener && m.addListener(on)));
    window.addEventListener('resize', on);
    return () => {
      mqs.forEach((m) => (m.removeEventListener ? m.removeEventListener('change', on) : m.removeListener && m.removeListener(on)));
      window.removeEventListener('resize', on);
    };
  }, []);
  return scr;
}
// Measure my box: const [ref, width] = useWidth(); put ref on the container.
// Charts draw at that width, so their text stays at real size.
export function useWidth(initial = 800) {
  const ref = useRef(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((es) => { const x = Math.floor(es[0].contentRect.width); if (x > 0) setW(x); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}
// Page chrome shared with the sections (App provides it).
// headerFolded: the Title Row is folded away and only the Tab Bar sticks.
// dark: the open page is shown dark (switch on and the page converted).
export const ChromeContext = createContext({ headerFolded: false, dark: false });
// For code that needs colour values per mode (clash checks, mixing);
// classes and CSS variables swap by themselves.
export function useDark() { return useContext(ChromeContext).dark === true; }
// The ink token (Design System) as hex, per mode.
export const INK_HEX = { light: '#0f172a', dark: '#f1f5f9' };
// A row that scrolls sideways, with a faded edge on any side that has more
// to see. The child marked data-active="true" scrolls into view when
// activeKey changes. fade = the background colour behind the row (a class).
// UI v33: surface = 'card' (a white card) or 'page' (the page behind the
// cards) gives the fade that surface's colour in light and dark, in place of
// fade. boxRef receives the scrolling box (for useKeepInView); other props
// go onto it too.
// card: a white card (dark mode's card colour in dark); page: the page's own
// bg-slate-50 layer (League's page wrapper), so its colour variable fits both modes.
const SURFACE_RGB = { card: ['255 255 255', '15 23 42'], page: ['var(--c-slate-50)', 'var(--c-slate-50)'] };
export function ScrollRow({ children, className = '', activeKey, fade = 'from-white', surface = null, boxRef = null, ...rest }) {
  const ref = useRef(null);
  const dark = useDark();
  const setRef = (el) => { ref.current = el; if (boxRef) boxRef.current = el; };
  const [edge, setEdge] = useState({ l: false, r: false });
  const check = () => {
    const el = ref.current;
    if (!el) return;
    const l = el.scrollLeft > 2, r = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setEdge((e) => (e.l === l && e.r === r ? e : { l, r }));
  };
  useEffect(() => {
    check();
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, []);
  useEffect(() => { check(); });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const a = el.querySelector('[data-active="true"]');
    if (a) {
      const l = a.offsetLeft, r = l + a.offsetWidth;
      if (l < el.scrollLeft) el.scrollLeft = Math.max(0, l - 24);
      else if (r > el.scrollLeft + el.clientWidth) el.scrollLeft = r - el.clientWidth + 24;
    }
    check();
  }, [activeKey]);
  return (
    <div className="relative min-w-0">
      <div ref={setRef} onScroll={check} {...rest} className={`relative overflow-x-auto ${className}`} style={{ scrollbarWidth: 'none' }}>{children}</div>
      {edge.l && (surface ? <div data-fade="l" className="pointer-events-none absolute inset-y-0 left-0 w-8" style={{ background: `linear-gradient(to right, rgb(${SURFACE_RGB[surface][dark ? 1 : 0]}), rgb(${SURFACE_RGB[surface][dark ? 1 : 0]} / 0))` }} /> : <div className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r ${fade} to-transparent`} />)}
      {edge.r && (surface ? <div data-fade="r" className="pointer-events-none absolute inset-y-0 right-0 w-8" style={{ background: `linear-gradient(to left, rgb(${SURFACE_RGB[surface][dark ? 1 : 0]}), rgb(${SURFACE_RGB[surface][dark ? 1 : 0]} / 0))` }} /> : <div className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l ${fade} to-transparent`} />)}
    </div>
  );
}
// A headline value that shrinks to fit its card (down to `min` px), and
// only wraps if it still doesn't fit. Values that already fit are untouched.
export function FitText({ children, className = '', min = 14 }) {
  const ref = useRef(null);
  const lastW = useRef(0);
  const fit = () => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    el.style.fontSize = '';
    el.style.whiteSpace = 'nowrap';
    if (el.scrollWidth <= el.clientWidth + 1) return;
    const base = parseFloat(window.getComputedStyle(el).fontSize) || 24;
    const next = Math.floor(base * (el.clientWidth / el.scrollWidth));
    el.style.fontSize = `${Math.max(min, next)}px`;
    if (next < min) el.style.whiteSpace = 'normal';
  };
  useEffect(() => {
    fit();
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((es) => { const w = Math.round(es[0].contentRect.width); if (w !== lastW.current) { lastW.current = w; fit(); } });
    ro.observe(el);
    return () => ro.disconnect();
  });
  return <div ref={ref} className={`min-w-0 ${className}`}>{children}</div>;
}

// ─── HOVER CARD (shared; moved here from Squad in UI v12) ────────────
// One dark card for every chart. Mouse: it follows the pointer. Touch: a
// clean tap opens it, docked at the bottom of the screen. Tapping another
// hover target switches the card; tapping the same one again, tapping
// anywhere else, or scrolling closes it. A swipe never opens it.
// Content: { title, rows: [[label, value], ...], note, action }.
// action = { label, run }: on touch, a tap opens the card instead of
// clicking through, and the card carries the action as a button
// (e.g. "Open profile ›"). Desktop clicks still act straight away.
// Spread hv(content) onto any element (HTML or SVG): <rect {...hv(c)}/>
const HoverCtx = createContext(null);
// ─── OVERLAYS ON TOUCH (UI v31, Canvas v51.19) ───────────────────────
// One set of rules for every hover card and the section [i], on every page.
// iPhone sends no pointermove for a plain tap and no click for a tap on
// something that isn't clickable (blank space, plain divs), so cards open,
// switch and close at the END of a tap (pointerup), never on touch-down
// (changing the page mid-tap makes iPhone drop the tap) and never on click.
//
// useOverlay(open, close): one overlay at a time. Returns announce(): call it
// when this overlay opens (a touch card, an [i]); every other open overlay
// closes. Mouse hover cards listen but don't announce.
const OVERLAY = 'gsl-overlay';
let overlaySeq = 0;
export function useOverlay(open, close) {
  const id = useRef(0);
  if (!id.current) id.current = ++overlaySeq;
  const cb = useRef(close);
  cb.current = close;
  useEffect(() => {
    if (!open || typeof window === 'undefined') return undefined;
    const other = (e) => { if (e.detail !== id.current) cb.current(); };
    window.addEventListener(OVERLAY, other);
    return () => window.removeEventListener(OVERLAY, other);
  }, [open]);
  const announce = useRef(() => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(OVERLAY, { detail: id.current })); });
  return announce.current;
}
// useTapAway(active, close, opts): while active, a finished tap (pointerup,
// moved less than 12px) anywhere outside closes, blank space included, and
// so does a scroll anywhere on the page. Taps inside `box` (a ref) or on
// anything matching `keep` (default: hover targets, [data-hv], and open
// cards, [data-hv-card], so a card can hold a button) are left to their own
// handlers. mouse: true also closes on a mouse press outside (the
// [i] popover); scroll: false keeps it open while the page scrolls.
export function useTapAway(active, close, { box = null, keep = '[data-hv], [data-hv-card]', mouse = false, scroll = true } = {}) {
  const cb = useRef(close);
  cb.current = close;
  useEffect(() => {
    if (!active || typeof document === 'undefined') return undefined;
    let start = null;
    const kept = (t) => !!t && ((box && box.current && box.current.contains(t)) || (keep && t.closest && t.closest(keep)));
    const down = (e) => {
      start = { x: e.clientX, y: e.clientY };
      if (mouse && e.pointerType === 'mouse' && !kept(e.target)) cb.current();
    };
    const up = (e) => {
      if (e.pointerType === 'mouse') return;
      const s = start;
      start = null;
      if (s && Math.abs(e.clientX - s.x) + Math.abs(e.clientY - s.y) > 12) return;
      if (!kept(e.target)) cb.current();
    };
    const sc = () => cb.current();
    document.addEventListener('pointerdown', down, true);
    document.addEventListener('pointerup', up, true);
    if (scroll) document.addEventListener('scroll', sc, { capture: true, passive: true });
    return () => {
      document.removeEventListener('pointerdown', down, true);
      document.removeEventListener('pointerup', up, true);
      if (scroll) document.removeEventListener('scroll', sc, { capture: true });
    };
  }, [active]);
}
// useTouchCard(open, close, opts): for a page's own docked touch card (Pyramid,
// Squad): useTapAway plus one-overlay-at-a-time, announced when it opens.
export function useTouchCard(open, close, opts) {
  const announce = useOverlay(open, close);
  useTapAway(open, close, opts);
  useEffect(() => { if (open) announce(); }, [open]);
}
// useHoverCard(): a card that follows a target (LeagueTabs' FloatCards).
//   const [hover, hc] = useHoverCard();
//   <g {...hc.on(key, (e) => ({ i }))} />   container: onPointerLeave={hc.leave}
//   {hover && <FloatCard at={hover.at}>…</FloatCard>}   (hover = make(e) + at)
// Mouse: shows on move, hides on leave, as before. Touch: a tap on a target
// opens its card or switches to it; tapping the same target again closes it;
// a tap anywhere else, or a scroll, closes it. scrub: true also lets a
// sideways slide update the card (key and make read the finger's position).
// key may be a function of the event (charts that pick a spot along x).
export function useHoverCard() {
  const [h, setH] = useState(null);
  const down = useRef(null);
  const close = useRef(() => setH(null)).current;
  const announce = useOverlay(!!h, close);
  useTapAway(!!(h && h.at.touch), close);
  const keyOf = (key, e) => (typeof key === 'function' ? key(e) : key);
  const at = (e, touch) => ({ x: e.clientX, y: e.clientY, touch });
  const on = (key, make, { scrub = false } = {}) => ({
    'data-hv': '',
    onPointerMove: (e) => {
      if (e.pointerType === 'mouse') { setH({ ...make(e), at: at(e, false), key: keyOf(key, e) }); return; }
      const d = down.current;
      if (!scrub || !d) return;
      if (!d.on) { const dx = Math.abs(e.clientX - d.x), dy = Math.abs(e.clientY - d.y); if (dx > 8 && dx > dy) { d.on = true; announce(); } else return; }
      setH({ ...make(e), at: at(e, true), key: keyOf(key, e) });
    },
    onPointerDown: (e) => { if (e.pointerType !== 'mouse') down.current = { x: e.clientX, y: e.clientY, key: keyOf(key, e), on: false }; },
    onPointerUp: (e) => {
      if (e.pointerType === 'mouse') return;
      const d = down.current;
      down.current = null;
      if (!d || d.on || Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 12) return;
      const k = keyOf(key, e);
      if (h && h.at.touch && h.key === k) { setH(null); return; }
      announce();
      setH({ ...make(e), at: at(e, true), key: k });
    },
    onPointerCancel: () => { down.current = null; },
  });
  const leave = (e) => { if (e.pointerType === 'mouse') setH(null); };
  return [h, { on, leave, close }];
}

export function HoverProvider({ children, light = false }) {
  // UI v17: light = white card (Pyramid's style); default dark
  const [h, setH] = useState(null);
  // UI v18: a card can ask for the light style itself (content.light), e.g. League's white cards
  const cardRef = useRef(null);
  const down = useRef(null);
  const openEl = useRef(null);
  const swallow = useRef(false);
  const announceRef = useRef(() => {});
  const api = useMemo(() => ({
    show: (e, c) => { openEl.current = null; setH({ x: e.clientX, y: e.clientY, c, docked: false }); },
    move: (e) => setH((o) => (o && !o.docked ? { ...o, x: e.clientX, y: e.clientY } : o)),
    hide: () => setH((o) => (o && o.docked ? o : null)),
    down: (e) => { down.current = { x: e.clientX, y: e.clientY, el: e.currentTarget }; },
    up: (e, c) => {
      const d = down.current;
      down.current = null;
      if (!d || d.el !== e.currentTarget || Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 12) return;
      // the click that follows this tap must not also open a profile / pin a line
      swallow.current = true;
      if (openEl.current === e.currentTarget) { openEl.current = null; setH(null); return; }
      openEl.current = e.currentTarget;
      announceRef.current();
      setH({ x: 0, y: 0, c, docked: true });
    },
    // scrub: show a docked card without a target element (finger sliding along a chart)
    dock: (c) => { openEl.current = null; setH((o) => { if (!(o && o.docked)) announceRef.current(); return o && o.docked && o.c === c ? o : { x: 0, y: 0, c, docked: true }; }); },
    takeSwallow: () => { const v = swallow.current; swallow.current = false; return v; },
    close: () => { openEl.current = null; setH(null); },
  }), []);
  // A docked card closes on a finished tap outside any hover target or the
  // card, or on scroll (UI v31: useTapAway listens for pointerup, since iPhone
  // sends no click for taps on blank space). Opening another overlay (an [i],
  // another card) closes it too.
  const docked = !!(h && h.docked);
  const closeAll = useRef(() => { openEl.current = null; setH(null); }).current;
  useTapAway(docked, closeAll, { box: cardRef });
  announceRef.current = useOverlay(!!h, closeAll);
  // UI v19: a card can bring its own layout (content.body), width (content.width) and height (content.height)
  const W = (h && h.c && h.c.width) || 300;
  const rich = !!(h && h.c && h.c.body);
  const { w: vw, h: vh } = viewport(1600, 900);
  const lightNow = light || !!(h && h.c && h.c.light);
  const body = h && h.c && (rich ? h.c.body : <>
    {h.c.title && <div className={`${TYPE.card} mb-1`}>{h.c.title}</div>}
    {(h.c.rows || []).filter(Boolean).map(([k, v], i) => (<div key={i} className="flex justify-between gap-3"><span className={`${lightNow ? 'text-slate-500' : 'text-slate-400'} whitespace-nowrap`}>{k}</span><span className="font-semibold text-right">{v}</span></div>))}
    {h.c.note && <div className={`mt-1 text-[11px] ${lightNow ? 'text-slate-500' : 'text-slate-400'}`}>{h.c.note}</div>}
  </>);
  const pad = rich ? 'rounded-2xl overflow-hidden' : '';
  return (<HoverCtx.Provider value={api}>{children}
    {body && (h.docked
      ? (<div ref={cardRef} data-hv-card="" className={`gsl-keep fixed z-[70] left-3 right-3 bottom-3 mx-auto max-w-sm ${rich ? pad : 'rounded-xl px-3.5 py-2.5 text-[12px] leading-snug'} ${lightNow ? 'bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900' : 'bg-slate-900 text-white'} shadow-2xl`}>
          {body}
          {h.c.action && (<button type="button" onClick={() => { const run = h.c.action.run; api.close(); run(); }} className={`${rich ? 'mx-4 mb-4 w-[calc(100%-2rem)]' : 'mt-2 w-full'} h-10 rounded-lg ${TYPE.button} ${lightNow ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-white/10 hover:bg-white/20 text-white'}`}>{h.c.action.label} ›</button>)}
        </div>)
      : (<div data-hv-card="" className={`gsl-keep fixed z-[70] pointer-events-none ${rich ? pad : 'rounded-lg px-3 py-2 text-[12px] leading-snug'} ${lightNow ? 'bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900' : 'bg-slate-900 text-white'} shadow-xl`} style={{ position: 'fixed', pointerEvents: 'none', width: W, left: Math.max(8, h.x + 16 + W > vw ? h.x - W - 12 : h.x + 16), top: Math.max(8, Math.min(h.y + 14, vh - ((h.c && h.c.height) || 160))) }}>{body}</div>))}
  </HoverCtx.Provider>);
}
// Fallback when no provider is around: the browser's own tooltip text
export const plainHover = (c) => (c ? [typeof c.title === 'string' ? c.title : '', ...(c.rows || []).filter(Boolean).map(([k, v]) => `${typeof k === 'string' ? k : ''}: ${typeof v === 'string' || typeof v === 'number' ? v : ''}`), c.note].filter(Boolean).join('\n') : '');
export function useHover() {
  const api = useContext(HoverCtx);
  return (c) => (api ? {
    'data-hv': '',
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') api.show(e, c); },
    onPointerMove: (e) => { if (e.pointerType === 'mouse') api.move(e); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') api.hide(); },
    onPointerDown: (e) => { if (e.pointerType !== 'mouse') api.down(e); },
    onPointerUp: (e) => { if (e.pointerType !== 'mouse') api.up(e, c); },
    // touch: the tap opened the card, so stop its click from reaching a row or the element's own action
    onClickCapture: (e) => { if (api.takeSwallow()) e.stopPropagation(); },
  } : { title: plainHover(c) });
}
// Scrub: press and slide sideways along a chart; the card follows the finger.
// pick(event) returns the card content for that spot (or null). Up-and-down
// swipes still scroll the page (touch-action: pan-y). Mouse is unaffected.
// Never use inside a box that scrolls sideways.
export function useScrub(pick) {
  const api = useContext(HoverCtx);
  const st = useRef(null);
  if (!api) return {};
  return {
    style: { touchAction: 'pan-y' },
    onPointerDown: (e) => { if (e.pointerType !== 'mouse') st.current = { x: e.clientX, y: e.clientY, on: false }; },
    onPointerMove: (e) => {
      const s = st.current;
      if (!s || e.pointerType === 'mouse') return;
      if (!s.on) { const dx = Math.abs(e.clientX - s.x), dy = Math.abs(e.clientY - s.y); if (dx > 8 && dx > dy) s.on = true; else return; }
      const c = pick(e);
      if (c) api.dock(c);
    },
    onPointerUp: () => { st.current = null; },
    onPointerCancel: () => { st.current = null; },
  };
}
// Charts that follow the pointer along their x axis (League's Points race and
// Momentum). Mouse: hover as before. Touch: a tap shows that spot and a
// sideways slide scrubs; up-and-down swipes still scroll; a tap elsewhere or a
// scroll clears it. Spread `props` on the chart box (boxRef). `touch` = the
// last input was a finger, so the chart docks its card at the bottom.
export function usePointerTrack(boxRef, onX, onClear) {
  const cb = useRef({ onX, onClear });
  cb.current = { onX, onClear };
  const st = useRef(null);
  const [touch, setTouch] = useState(false);
  // UI v31: a finished tap outside the box, a scroll, or another overlay clears it
  const clear = useRef(() => { setTouch(false); cb.current.onClear(); }).current;
  useTapAway(touch, clear, { box: boxRef });
  const announce = useOverlay(touch, clear);
  const props = {
    'data-hv': '',
    style: { touchAction: 'pan-y' },
    onPointerMove: (e) => {
      if (e.pointerType === 'mouse') { cb.current.onX(e.clientX); return; }
      const s = st.current;
      if (!s) return;
      if (!s.on) { const dx = Math.abs(e.clientX - s.x), dy = Math.abs(e.clientY - s.y); if (dx > 8 && dx > dy) { s.on = true; if (!touch) announce(); } else return; }
      setTouch(true);
      cb.current.onX(e.clientX);
    },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') cb.current.onClear(); },
    onPointerDown: (e) => { if (e.pointerType !== 'mouse') st.current = { x: e.clientX, y: e.clientY, on: false }; },
    onPointerUp: (e) => {
      if (e.pointerType === 'mouse') return;
      const s = st.current;
      st.current = null;
      if (s && !s.on && Math.abs(e.clientX - s.x) + Math.abs(e.clientY - s.y) < 12) { if (!touch) announce(); setTouch(true); cb.current.onX(e.clientX); }
    },
    onPointerCancel: () => { st.current = null; },
  };
  return { props, touch };
}
// Legend toggle (UI v15): legends start hidden on phones and shown from
// tablet up; the button flips them on any screen.
// const [legendOpen, LegendToggle] = useLegendToggle();  …  <LegendToggle/> {legendOpen && <Legend/>}
export function useLegendToggle() {
  const scr = useScreen();
  const [open, setOpen] = useState(null);
  const isOpen = open == null ? scr !== 'phone' : open;
  const Toggle = () => (
    <button type="button" onClick={() => setOpen(!isOpen)} aria-expanded={isOpen}
      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50">
      <span className="inline-flex gap-0.5" aria-hidden="true"><span className="w-1.5 h-3 rounded-sm bg-emerald-600" /><span className="w-1.5 h-3 rounded-sm bg-amber-500" /><span className="w-1.5 h-3 rounded-sm bg-rose-600" /></span>
      {isOpen ? 'Hide legend' : 'Show legend'}
    </button>
  );
  return [isOpen, Toggle];
}
// Sheet: a pop-up that fills a phone's screen and slides up from the bottom;
// centred with a margin from tablet up. Tap outside or Escape to close.
// fit (UI v31): on phones a bottom sheet as tall as its content (85% at most);
// a downward swipe that starts on anything marked data-sheet-grab closes it.
// z (UI v31): its layer; the [i] sheet sits above hover cards (z-[70]).
export function Sheet({ onClose, children, maxW = 'sm:max-w-5xl', fit = false, z = 'z-50' }) {
  const [drag, setDrag] = useState(0);
  const from = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  const swipe = fit ? {
    onPointerDown: (e) => { if (e.pointerType !== 'mouse' && e.target.closest && e.target.closest('[data-sheet-grab]')) from.current = e.clientY; },
    onPointerMove: (e) => { if (from.current !== null) setDrag(Math.max(0, e.clientY - from.current)); },
    onPointerUp: () => { if (from.current !== null && drag > 80) onClose(); from.current = null; setDrag(0); },
    onPointerCancel: () => { from.current = null; setDrag(0); },
  } : {};
  const box = fit
    ? `bg-white w-full ${maxW} max-h-[85dvh] sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl`
    : `bg-slate-50 w-full ${maxW} h-[100dvh] sm:h-auto sm:max-h-[94vh] sm:rounded-2xl`;
  return (
    <div className={`fixed inset-0 ${z} bg-slate-950/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-6 font-sans`} onClick={onClose}>
      <style>{'@keyframes gslSheetUp{from{transform:translateY(100%)}to{transform:none}}@media (max-width:639px){.gsl-sheet{animation:gslSheetUp 220ms ease-out}}'}</style>
      <div className={`gsl-sheet ${box} overflow-hidden shadow-2xl flex flex-col`} style={drag ? { transform: `translateY(${drag}px)` } : undefined} onClick={(e) => e.stopPropagation()} {...swipe}>
        {children}
      </div>
    </div>
  );
}

// ─── KEEP IN VIEW (UI v33, Canvas v51.21) ────────────────────────────
// A row that scrolls sideways (overflow-x-auto) with one selected item:
//   useKeepInView(rowRef, '[data-season="8"]', resetKey, contentKey)
// keeps that item fully in view, 16px in from the edge it was hidden behind,
// scrolling only the row, never the page. It runs when resetKey changes (the
// selection, a mode, a filter), after web fonts arrive, and when the row or
// its first child (a stable box holding the items) changes size. Once the user
// scrolls the row themselves (touch, pen or wheel on it) it stops until
// resetKey changes. contentKey: change it when the set of items changes, so the
// observers re-attach.
export function useKeepInView(boxRef, selector, resetKey, contentKey) {
  const user = useRef(false);
  const fit = useRef(() => {});
  fit.current = () => {
    const box = boxRef.current;
    const el = !user.current && box && selector && box.querySelector(selector);
    if (!el) return;
    const bb = box.getBoundingClientRect(), eb = el.getBoundingClientRect();
    if (eb.right > bb.right) box.scrollLeft += eb.right - bb.right + 16;
    else if (eb.left < bb.left) box.scrollLeft -= bb.left - eb.left + 16;
  };
  useEffect(() => { user.current = false; fit.current(); }, [resetKey]);
  useEffect(() => {
    const box = boxRef.current;
    if (!box || typeof window === 'undefined') return undefined;
    const run = () => fit.current();
    const mine = () => { user.current = true; };
    let live = true;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(run) : null;
    if (ro) { ro.observe(box); if (box.firstElementChild) ro.observe(box.firstElementChild); }
    const fonts = typeof document !== 'undefined' && document.fonts;
    if (fonts && fonts.ready) fonts.ready.then(() => { if (live) run(); });
    if (fonts && fonts.addEventListener) fonts.addEventListener('loadingdone', run);
    box.addEventListener('pointerdown', mine);
    box.addEventListener('wheel', mine, { passive: true });
    return () => {
      live = false;
      if (ro) ro.disconnect();
      if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', run);
      box.removeEventListener('pointerdown', mine);
      box.removeEventListener('wheel', mine);
    };
  }, [contentKey]);
}

// ─── TAP AREAS (UI v31, Canvas v51.19) ───────────────────────────────
// TAP (the gsl-tap class) gives a small control an invisible 44 × 44px tap
// area on phones, centred on it; the control looks the same. Leave enough
// gap between neighbours that their areas don't overlap. Render <TapStyle />
// once on any page that uses it.
export const TAP = 'gsl-tap';
export function TapStyle() {
  // hidden: inside a space-y-* stack, a plain <style> counts as the first item and pushes the
  // next one down by the gap (v33 fix; Home vs Away had an extra 24px at its top since v51.19)
  return <style hidden>{'@media (max-width:639.98px){.gsl-tap{position:relative}.gsl-tap::after{content:"";position:absolute;left:50%;top:50%;width:max(100%,44px);height:max(100%,44px);transform:translate(-50%,-50%)}}'}</style>;
}

// ─── SECTION [i] (UI v31, Canvas v51.19) ─────────────────────────────
// R14: a section's description lives in an [i] at the top right of its
// header, not under the title. Desktop: a 330px popover under the icon.
// Phones: the bottom Sheet, titled by the section. One open at a time across
// the page. children: the rich text (wrap it in nothing; INFO_TEXT styles
// paragraphs, lists and bold runs). Keep each section's text next to its code.
export const INFO_TEXT = 'flex flex-col gap-2 [&_strong]:font-bold [&_strong]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1';
export function SectionInfo({ title, accent = 'indigo', children }) {
  const phone = useScreen() === 'phone';
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const close = useRef(() => setOpen(false)).current;
  // UI v31: one overlay at a time (opening an [i] closes any hover card or
  // other [i]); the popover closes on a mouse press or a finished tap outside
  const announce = useOverlay(open, close);
  useTapAway(open && !phone, close, { box, keep: null, mouse: true, scroll: false });
  useEffect(() => {
    if (!open || phone || typeof window === 'undefined') return undefined;
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, phone]);
  const toggle = () => {
    if (!open) announce();
    setOpen(!open);
  };
  // UI v32: dark mode takes the lighter shade on a 15% tint, so the open icon keeps its contrast
  const dark = useDark();
  const hex = (dark ? ACCENT_HEX_LIGHT : ACCENT_HEX)[accent] || (dark ? ACCENT_HEX_LIGHT : ACCENT_HEX).indigo;
  return (
    <span ref={box} className="relative inline-flex shrink-0 -my-[13px] -mr-[13px]">
      <button type="button" onClick={toggle} aria-label={`About ${title}`} aria-expanded={open}
        className="w-11 h-11 inline-flex items-center justify-center">
        <span className="w-[26px] h-[26px] rounded-[10px] inline-flex items-center justify-center" style={open ? { color: hex, background: `${hex}${dark ? '26' : '1a'}` } : undefined}>
          <Info className={`w-[18px] h-[18px] ${open ? '' : 'text-slate-400'}`} />
        </span>
      </button>
      {open && !phone && (
        <div role="dialog" aria-label={`About ${title}`} className="absolute right-[13px] top-full mt-1 z-[80] w-[330px] max-h-[60vh] overflow-y-auto bg-white border border-slate-300 rounded-[14px] shadow-lg px-[18px] py-4 text-left">
          <div className={`${TYPE.eyebrow} text-slate-500 mb-2`}>About this section</div>
          <div className={`text-[13px] leading-[1.5] font-normal text-slate-700 ${INFO_TEXT}`}>{children}</div>
        </div>
      )}
      {open && phone && (
        <Sheet onClose={close} fit maxW="sm:max-w-md" z="z-[80]">
          <div data-sheet-grab className="shrink-0 pt-2 pl-5 pr-2 flex flex-col" style={{ touchAction: 'none' }}>
            <span className="self-center w-10 h-1 rounded-full bg-slate-300" aria-hidden="true" />
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[16px] font-extrabold text-slate-900">{title}</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="w-11 h-11 inline-flex items-center justify-center text-slate-500"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className={`overflow-y-auto px-5 pb-6 pt-1 text-[14px] leading-[1.5] font-normal text-slate-700 ${INFO_TEXT}`}>{children}</div>
        </Sheet>
      )}
    </span>
  );
}

// ─── PAGE HEADER (title + tab bar) ───────────────────────────────────
// tabs: [{ id, label, icon }]
// actions (optional): shown on the right of the title row, e.g. a search box
// Folding (UI v12): the Top Bar's arrow folds the Title Row away. While
// folded the Top Bar stops sticking and only the Tab Bar sticks, at the very
// top. The header publishes where pinned content should start as the CSS
// variable --gsl-sticky (Top Bar + Header, or Tab Bar alone when folded).
export function PageHeader({ accent = 'indigo', icon: Icon, title, tabs = [], activeTab, onTabChange, actions = null }) {
  const a = ACCENTS[accent] || ACCENTS.indigo;
  const { headerFolded } = useContext(ChromeContext);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof document === 'undefined') return undefined;
    const pub = () => document.documentElement.style.setProperty('--gsl-sticky', `${(headerFolded ? 0 : 44) + el.offsetHeight}px`);
    pub();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(pub);
    ro.observe(el);
    return () => ro.disconnect();
  }, [headerFolded]);
  return (
    <header ref={ref} className={`bg-white border-b border-slate-200 sticky ${headerFolded ? 'top-0' : 'top-11'} z-30 shadow-xs`}>
      <div className={`${PAGE_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`}>
        {!headerFolded && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${a.iconBox}`}>
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <div>
              <h1 className={`${TYPE.page} text-slate-900`}>
                {title}
              </h1>
            </div>
          </div>
          {actions && <div className="w-full sm:w-auto">{actions}</div>}
        </div>
        )}

        {/* Tab Bar: scrolls sideways on narrow screens, with a faded edge */}
        <ScrollRow activeKey={activeTab} className={`flex items-center space-x-1 sm:space-x-2 ${headerFolded ? '' : 'pt-1 border-t border-slate-100'}`}>
          {tabs.map((t) => {
            const TabIcon = t.icon;
            return (
              <button
                key={t.id}
                data-active={activeTab === t.id ? 'true' : 'false'}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 ${TYPE.tab} whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-t-md ${
                  activeTab === t.id
                    ? a.tabActive
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </ScrollRow>
      </div>
    </header>
  );
}

// ─── HIGHLIGHTS (the strip of headline numbers) ──────────────────────
// v51.06, style 2 "Minimal + accents": a white bar with the page accent as
// its top edge, light grey cards, numbers in ink. Colour only where it says
// something: the icon and the first byline. Pages still pass the colour
// classes they used on the old dark bar (e.g. text-amber-300); lightTone
// translates them, so every page moves to the new style at once.
const HIGHLIGHT_GRID = {
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};
const TONE_RE = /\b(text|bg|border|from|via|to)-(white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-(\d{2,3}))?(\/\d+)?\b/g;
// Old dark-bar colours → light-bar colours: bright text shades become their
// darker partner; white / grey text becomes muted grey.
export function lightTone(cls = '', { strip = false } = {}) {
  return String(cls || '').replace(TONE_RE, (m, kind, fam, shade) => {
    if (kind !== 'text') return strip ? '' : m;
    if (strip) return '';
    if (fam === 'white' || ['slate', 'gray', 'zinc', 'neutral', 'stone'].includes(fam)) return 'text-slate-500';
    const n = Number(shade || 500);
    return `text-${fam}-${n <= 400 ? 700 : n}`;
  }).replace(/\s+/g, ' ').trim();
}
export function HighlightsBar({ accent = 'indigo', columns = 5, children }) {
  const a = ACCENTS[accent] || ACCENTS.indigo;
  return (
    <div className={`relative bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-200 border-t-4 ${a.edge}`}>
      <div className={`grid ${HIGHLIGHT_GRID[columns] || HIGHLIGHT_GRID[5]} gap-3`}>
        {children}
      </div>
    </div>
  );
}

// One card. valueClassName sets the big number's size (its colour is
// dropped: numbers are ink). iconClassName / leftClassName / rightClassName
// keep their colour family. phoneWide: full width on phones (R7: put it first).
export function HighlightCard({
  label,
  icon: Icon,
  iconClassName = '',
  value,
  valueClassName,
  left,
  leftClassName,
  right,
  rightClassName,
  className = '',
  phoneWide = false,
}) {
  const iconCls = String(iconClassName || '').replace(TONE_RE, (m, kind, fam, shade) => (kind === 'text' ? `text-${fam}-${Number(shade || 500) <= 400 ? 600 : shade}` : m));
  return (
    <div className={`bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between${phoneWide ? ' col-span-2 sm:col-span-1' : ''}${className ? ' ' + className : ''}`}>
      <div className={`flex items-center justify-between gap-2 text-slate-500 ${TYPE.eyebrow}`}>
        <span>{label}</span>
        {Icon && <Icon className={`w-4 h-4 ${iconCls}`} />}
      </div>
      <div className="my-2 min-w-0">
        <FitText className={`${withRole(lightTone(valueClassName, { strip: true }), TYPE.big)} text-slate-900`}>{numberize(value)}</FitText>
      </div>
      {/* Bylines: each piece wraps as a whole onto its own line when the card is narrow */}
      <div className="text-xs font-medium text-slate-500 flex flex-wrap items-center justify-between gap-x-2">
        <span className={`shrink-0 max-w-full ${withRole(lightTone(leftClassName))}`}>{numberize(left, { tones: WDL_TONES })}</span>
        <span className={`shrink-0 max-w-full ${withRole(lightTone(rightClassName))}`}>{numberize(right, { tones: WDL_TONES })}</span>
      </div>
    </div>
  );
}

// ─── SECTION STAT CARDS (R8) ─────────────────────────────────────────
// Light grey cards that headline a section inside a tab: no accent, no
// icons (those set the Highlights bar apart). items: [{ label, value,
// line, valueClassName }]; valueClassName only for a meaning colour.
export function SectionStats({ items = [], columns = 4 }) {
  const cols = { 2: 'grid-cols-2', 3: 'grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4', 5: 'grid-cols-2 lg:grid-cols-5' }[columns] || 'grid-cols-2 lg:grid-cols-4';
  return (
    <div className={`grid ${cols} gap-3`}>
      {items.filter(Boolean).map((it, i) => (
        <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-1.5 min-w-0">
          <div className={`${TYPE.eyebrow} text-slate-500`}>{it.label}</div>
          <div className={`text-2xl leading-none ${TYPE.big} ${it.valueClassName || 'text-slate-900'}`}>{it.value}</div>
          {it.line && <div className="text-xs font-medium text-slate-500 flex justify-between gap-2">{it.line}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── VIEW SWITCH (Cards / List / Ledger) ─────────────────────────────
// options: [{ value, label, icon }]. Remember the choice with useStored.
export function ViewSwitch({ options = [], value, onChange }) {
  return (
    <div className="inline-flex items-center gap-0.5 bg-slate-100 p-1 rounded-lg" role="group" aria-label="View">
      {options.map((o) => {
        const Icon = o.icon;
        const active = value === o.value;
        return (
          <button key={o.value} type="button" onClick={() => onChange(o.value)} aria-pressed={active}
            className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-md ${TYPE.button} text-xs transition-colors ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
            {Icon && <Icon className="w-4 h-4" />}{o.label}
          </button>
        );
      })}
    </div>
  );
}
// ─── SORTABLE TABLES (R11: every table sorts by its headers) ─────────
// const [sorted, head] = useSort(rows, initialKey, initialDir, getters)
// head(key, label, align, firstDir) renders a header button; click to sort,
// click again to flip. initialKey null keeps the incoming order until a
// header is clicked. getters: { key: (row) => value } for computed columns.
export function useSort(rows, initialKey = null, initialDir = 'desc', get = {}) {
  const [key, setKey] = useState(initialKey);
  const [dir, setDir] = useState(initialDir);
  const sorted = useMemo(() => {
    if (!key) return rows;
    const f = get[key] || ((r) => r[key]);
    return [...rows].sort((a, b) => {
      const x = f(a), y = f(b);
      const c = typeof x === 'string' || typeof y === 'string' ? String(x ?? '').localeCompare(String(y ?? '')) : (x ?? -1e9) - (y ?? -1e9);
      return dir === 'asc' ? c : -c;
    });
  }, [rows, key, dir]);
  const head = (k, label, align = 'left', firstDir = 'desc') => (
    <button type="button" onClick={(e) => { e.stopPropagation(); if (k === key) setDir(dir === 'asc' ? 'desc' : 'asc'); else { setKey(k); setDir(firstDir); } }}
      className={`inline-flex items-center gap-1 whitespace-nowrap ${align === 'right' ? 'justify-end w-full' : align === 'center' ? 'justify-center w-full' : ''} ${TYPE.eyebrow} ${k === key ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}>
      {label}{k === key ? <ChevronDown className={`w-3 h-3 ${dir === 'asc' ? 'rotate-180' : ''}`} /> : null}
    </button>
  );
  return [sorted, head, key];
}

// A value kept per device (localStorage), e.g. a section's chosen view.
export function useStored(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = typeof localStorage !== 'undefined' && localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch (e) { return initial; }
  });
  const set = (x) => { setV(x); try { localStorage.setItem(key, JSON.stringify(x)); } catch (e) { /* ignore */ } };
  return [v, set];
}

// ─── MAIN BAR (a tab's scope: title + the control that changes the tab) ─
// The band in the page accent that sits above the Highlights bar (R5).
// eyebrow / title: text or nodes. controls: the scope control (season row).
// Desktop: controls right-aligned. Phones: controls under the title.
export function MainBar({ accent = 'indigo', eyebrow, title, controls }) {
  const a = ACCENTS[accent] || ACCENTS.indigo;
  return (
    <div className={`gsl-keep ${a.band} text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4`}>
      <div className="min-w-0">
        {eyebrow && <div className={`${TYPE.eyebrow} text-white/80`}>{eyebrow}</div>}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-2xl sm:text-[28px] leading-tight font-extrabold">{title}</div>
      </div>
      {controls && <div className="min-w-0 lg:shrink-0">{controls}</div>}
    </div>
  );
}
// The season row inside a main bar: arrows plus a scrolling row of seasons
// that keeps the chosen one in view (latest on the right).
export function ScopeStepper({ options = [], value, onChange }) {
  const idx = options.findIndex((o) => String(o.value) === String(value));
  const go = (d) => { const n = idx + d; if (n >= 0 && n < options.length) onChange(options[n].value); };
  const rowRef = useRef(null);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const el = row.querySelector('[data-active="true"]');
    if (el) row.scrollLeft = Math.max(0, el.offsetLeft - row.clientWidth / 2 + el.offsetWidth / 2);
  }, [value, options.length]);
  const btn = 'w-9 h-9 shrink-0 rounded-lg bg-white/15 hover:bg-white/25 disabled:opacity-40 text-white inline-flex items-center justify-center';
  return (
    <div className="flex items-center gap-2 min-w-0">
      <button type="button" className={btn} aria-label="Previous season" disabled={idx <= 0} onClick={() => go(-1)}><ChevronDown className="w-4 h-4 rotate-90" /></button>
      <button type="button" className={btn} aria-label="Next season" disabled={idx >= options.length - 1} onClick={() => go(1)}><ChevronDown className="w-4 h-4 -rotate-90" /></button>
      <div className="relative min-w-0 flex-1 lg:flex-none lg:w-[264px] rounded-xl bg-black/20">
        <div ref={rowRef} className="flex items-center gap-0.5 p-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
          {options.map((o) => {
            const active = String(o.value) === String(value);
            return (
              <button key={o.value} type="button" data-active={active ? 'true' : 'false'} onClick={() => onChange(o.value)}
                className={`h-9 shrink-0 min-w-[44px] px-3 rounded-md text-sm font-semibold tabular-nums transition-colors ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── CARD GRIDS WITH DRAWERS ─────────────────────────────────────────
// How many columns a grid shows at the current screen width. Pass the
// same numbers as the grid's Tailwind classes, e.g. for
// "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" use { base: 1, sm: 2, lg: 3 }.
// UI v34: measured with media queries, exactly like the Tailwind prefixes.
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
export function useGridColumns(spec) {
  const calc = () => {
    const at = (px) => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(`(min-width: ${px}px)`).matches : px <= 1280);
    let cols = spec.base || 1;
    ['sm', 'md', 'lg', 'xl', '2xl'].forEach((bp) => {
      if (spec[bp] && at(BREAKPOINTS[bp])) cols = spec[bp];
    });
    return cols;
  };
  const [cols, setCols] = useState(calc);
  useEffect(() => {
    const onResize = () => setCols(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return cols;
}
// Index of the last card in the open card's row: the drawer goes after it,
// so no card in that row gets pushed below the drawer.
export function drawerRowEnd(openIndex, cols, count) {
  if (openIndex < 0) return -1;
  return Math.min(count - 1, Math.floor(openIndex / cols) * cols + cols - 1);
}

// ─── SHARED CONTROLS ─────────────────────────────────────────────────
// Every toggle, filter row, reset button and search box in the app uses
// these, so they look and behave the same everywhere.

// Active colours. 'neutral' is for view switches. The others carry meaning
// (results: win / draw / loss, venue: home / away) and match the charts.
export const SEGMENT_TONES = {
  neutral: 'bg-white text-slate-900 shadow-sm',
  win: 'bg-emerald-600 text-white shadow-sm',
  draw: 'bg-amber-500 text-white shadow-sm',
  loss: 'bg-rose-600 text-white shadow-sm',
  home: 'bg-[rgb(var(--c-home))] text-white shadow-sm',
  away: 'bg-[rgb(var(--c-away))] text-[#0f172a] shadow-sm',
  gold: 'bg-amber-500 text-white shadow-sm',
  silver: 'bg-slate-400 text-white shadow-sm',
};

export const METRIC_OPTIONS = [
  { value: 'pts', label: 'Points' },
  { value: 'wins', label: 'Wins' },
  { value: 'goals', label: 'Goals' },
];

// Segmented switch: pick exactly one option from a short, fixed set.
// tap (UI v31): each button gets the invisible 44px phone tap area (TAP).
export function Segmented({ options, value, onChange, className = '', tap = false }) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-0.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 ${className}`}
    >
      {options.map((o) => {
        const active = value === o.value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`px-3 py-1 rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${tap ? `${TAP} ` : ''}${
              active
                ? SEGMENT_TONES[o.tone || 'neutral']
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Filter pills: pick one from a longer, data-driven list (seasons, nations).
const PILL_ACTIVE = {
  indigo: 'bg-indigo-600 text-white shadow-sm',
  amber: 'bg-yellow-500 text-[#0f172a] shadow-sm',
  teal: 'bg-teal-700 text-white shadow-sm',
  maroon: 'bg-violet-600 text-white shadow-sm',
};
export function FilterPills({ options, value, onChange, className = '', accent = 'indigo' }) {
  return (
    <ScrollRow activeKey={value} className={`flex items-center gap-1.5 pb-1 text-xs ${className}`}>
      {options.map((o) => {
        const active = String(value) === String(o.value);
        return (
          <button
            key={o.value}
            data-active={active ? 'true' : 'false'}
            type="button"
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 inline-flex items-center gap-1.5 ${
              active
                ? PILL_ACTIVE[accent] || PILL_ACTIVE.indigo
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {o.icon}
            <span>{o.label}</span>
            {o.badge !== undefined && o.badge !== null && (
              <span
                className={`text-[11px] px-1.5 rounded font-semibold ${
                  active ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                }`}
              >
                {o.badge}
              </span>
            )}
          </button>
        );
      })}
    </ScrollRow>
  );
}

// Small label that sits above a row of controls.
export function ControlLabel({ icon: Icon = Calendar, accent = 'indigo', children }) {
  const a = ACCENTS[accent] || ACCENTS.indigo;
  return (
    <span className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5">
      <Icon className={`w-3.5 h-3.5 ${a.icon}`} />
      <span>{children}</span>
    </span>
  );
}

// Reset: always shown in the same spot, greyed out when there's nothing to reset.
export function ResetButton({
  onClick,
  disabled = false,
  label = 'Reset',
  title,
  icon: Icon = RotateCcw,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition-colors shrink-0 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}

// Search box with a clear (x) button.
// ─── SEARCH: three standard types ────────────────────────────────────
// 1. SearchInput  - filter search: typing narrows what's already on the
//                   page (no dropdown). For tables and card lists.
// 2. ClubSelect   - dropdown first: shows the current choice (flag + name);
//                   click to open a list with a search box at the top.
//                   For "choose one club" where there's always a choice.
// 3. SearchPicker - search first: a search box; typing opens a dropdown of
//                   matches with flags; picking one calls onPick.
// items for 2 and 3: [{ value, label, flag (emoji) or code, meta }]
const FOCUS_RING = {
  indigo: 'focus:ring-indigo-500',
  amber: 'focus:ring-yellow-500',
  teal: 'focus:ring-teal-600',
  maroon: 'focus:ring-[#7c3aed]',
};
export function SearchInput({ value, onChange, placeholder, className = '', accent = 'indigo' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:bg-white ${FOCUS_RING[accent] || FOCUS_RING.indigo}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          title="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

const PICK_ACTIVE = {
  indigo: 'bg-indigo-50 font-extrabold text-indigo-900',
  amber: 'bg-yellow-50 font-extrabold text-yellow-900',
  teal: 'bg-teal-50 font-extrabold text-teal-900',
  maroon: 'bg-[#f5f3ff] font-extrabold text-[#6d28d9]',
};
// Close a dropdown when the user clicks or taps anywhere outside it
// (including on another dropdown), the usual behaviour for pickers.
function useClickOutside(ref, onOutside, active) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return undefined;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOutside(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [active]);
}
function matchItems(items, q) {
  const t = q.trim().toUpperCase();
  if (!t) return items;
  return items.filter((it) => (it.search != null ? String(it.search) : `${it.label} ${it.meta || ''} ${it.value}`).toUpperCase().includes(t));
}
function PickList({ items, value, accent, onPick }) {
  return (
    <div className="max-h-72 overflow-y-auto mt-1.5">
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(it)}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-left ${it.value === value ? PICK_ACTIVE[accent] || PICK_ACTIVE.indigo : 'hover:bg-slate-50 font-semibold text-slate-800'}`}
        >
          {(it.flag || it.code) && <Flag emoji={it.flag} code={it.code} size={18} />}
          <span className="truncate flex-1">{it.label}</span>
          {it.meta != null && <span className="text-[11px] text-slate-400 tabular-nums shrink-0">{it.meta}</span>}
        </button>
      ))}
      {!items.length && <div className="p-3 text-center text-xs text-slate-400">No match</div>}
    </div>
  );
}
// 2. Dropdown first
export function ClubSelect({ items, value, onChange, accent = 'indigo', width = 'w-64', placeholder = 'Search...' }) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const box = React.useRef(null);
  const close = () => { setOpen(false); setQ(''); };
  useClickOutside(box, close, open);
  const current = items.find((it) => it.value === value);
  const shown = matchItems(items, q);
  return (
    <div className="relative" ref={box} onKeyDown={(e) => { if (e.key === 'Escape') close(); }}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={`${width} flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-900`}>
        {current && (current.flag || current.code) && <Flag emoji={current.flag} code={current.code} size={18} />}
        <span className="truncate flex-1 text-left">{current ? current.label : 'Choose...'}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2">
          <SearchInput value={q} onChange={setQ} placeholder={placeholder} accent={accent} />
          <PickList items={shown} value={value} accent={accent} onPick={(it) => { onChange(it.value); setOpen(false); setQ(''); }} />
        </div>
      )}
    </div>
  );
}
// 3. Search first
// onSubmit (optional): adds a last line "submitLabel(count)" to the
// dropdown; clicking it or pressing Enter calls onSubmit(query) and closes
// the dropdown (e.g. to show all the matches somewhere). Esc closes it.
export function SearchPicker({ items, onPick, onSubmit, submitLabel, accent = 'indigo', placeholder = 'Search...', className = '' }) {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const box = React.useRef(null);
  // Clicking outside or Esc closes the list but keeps the text; clicking
  // back into the box reopens it
  useClickOutside(box, () => setOpen(false), open);
  const all = q.trim() ? matchItems(items, q) : [];
  const shown = all.slice(0, 12);
  const submit = () => { if (onSubmit && all.length) { onSubmit(q.trim()); setQ(''); setOpen(false); } };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
    if (e.key === 'Escape') setOpen(false);
  };
  return (
    <div className={`relative ${className}`} ref={box} onKeyDown={onKeyDown} onFocus={() => { if (q.trim()) setOpen(true); }}>
      <SearchInput value={q} onChange={(v) => { setQ(v); setOpen(!!v.trim()); }} placeholder={placeholder} accent={accent} />
      {open && q.trim() && (
        <div className="absolute z-40 right-0 mt-1 w-full min-w-[18rem] bg-white border border-slate-200 rounded-xl shadow-xl p-1.5">
          <PickList items={shown} value={null} accent={accent} onPick={(it) => { onPick(it.value); setQ(''); setOpen(false); }} />
          {all.length > shown.length && <div className="px-2 pt-1 text-[11px] text-slate-400">+{all.length - shown.length} more</div>}
          {onSubmit && all.length > 0 && (
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={submit} className={`w-full mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-bold hover:bg-slate-50 ${accent === 'teal' ? 'text-teal-800' : accent === 'amber' ? 'text-amber-800' : 'text-indigo-800'}`}>
              <span>{submitLabel ? submitLabel(all.length) : `Show all ${all.length}`}</span>
              <span className="text-[11px] font-semibold text-slate-400">Enter</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Standard dropdown style
export const SELECT_CLASS =
  'bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500';

// ─── FLAGS ───────────────────────────────────────────────────────────
// Small drawn flags (14 x 10). Flag emoji don't show on Windows (they
// appear as letter pairs like "FR"), so the canvas draws its own.
// The first 22 are Gemini's (from Pyramid.js); the other 16 were added in
// UI v4, so every country in the workbook has one.
// Unknown countries show a grey box.
const FLAG_ART = {
    WAL: (<g>
    <rect width="14" height="5" fill="#ffffff"/>
    <rect y="5" width="14" height="5" fill="#00ab63"/>
    <polygon points="7,2.8 9,7.2 7,6.1 5,7.2" fill="#d32929"/>
    </g>),
    ENG: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect x="5.5" width="3" height="10" fill="#ce1124"/>
    <rect y="3.6" width="14" height="2.8" fill="#ce1124"/>
    </g>),
    FRA: (<g>
    <rect width="4.7" height="10" fill="#002654"/>
    <rect x="4.7" width="4.6" height="10" fill="#ffffff"/>
    <rect x="9.3" width="4.7" height="10" fill="#ed2939"/>
    </g>),
    GER: (<g>
    <rect width="14" height="3.33" fill="#000000"/>
    <rect y="3.33" width="14" height="3.34" fill="#dd0000"/>
    <rect y="6.67" width="14" height="3.33" fill="#ffce00"/>
    </g>),
    ESP: (<g>
    <rect width="14" height="2.8" fill="#aa151b"/>
    <rect y="2.8" width="14" height="4.4" fill="#f1bf00"/>
    <rect y="7.2" width="14" height="2.8" fill="#aa151b"/>
    <circle cx="4.5" cy="5" r="1.1" fill="#aa151b"/>
    </g>),
    ITA: (<g>
    <rect width="4.7" height="10" fill="#008c45"/>
    <rect x="4.7" width="4.6" height="10" fill="#f4f5f0"/>
    <rect x="9.3" width="4.7" height="10" fill="#cd212a"/>
    </g>),
    POR: (<g>
    <rect width="5.5" height="10" fill="#046a38"/>
    <rect x="5.5" width="8.5" height="10" fill="#da291c"/>
    <circle cx="5.5" cy="5" r="1.7" fill="#ffdd00"/>
    </g>),
    NED: (<g>
    <rect width="14" height="3.33" fill="#ae1c28"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <rect y="6.67" width="14" height="3.33" fill="#21468b"/>
    </g>),
    SCO: (<g>
    <rect width="14" height="10" fill="#005eb8"/>
    <line x1="0" y1="0" x2="14" y2="10" stroke="#ffffff" strokeWidth="1.8"/>
    <line x1="14" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="1.8"/>
    </g>),
    TUR: (<g>
    <rect width="14" height="10" fill="#e30a17"/>
    <circle cx="5.5" cy="5" r="2.3" fill="#ffffff"/>
    <circle cx="6.2" cy="5" r="1.8" fill="#e30a17"/>
    <polygon points="8.2,5 9.7,4.4 9.1,5.6 9.7,6.2 8.6,5.6" fill="#ffffff"/>
    </g>),
    GRE: (<g>
    <rect width="14" height="10" fill="#0d5eaf"/>
    <rect y="1.1" width="14" height="1.1" fill="#ffffff"/>
    <rect y="3.3" width="14" height="1.1" fill="#ffffff"/>
    <rect y="5.5" width="14" height="1.1" fill="#ffffff"/>
    <rect y="7.7" width="14" height="1.1" fill="#ffffff"/>
    <rect width="5.5" height="5.5" fill="#0d5eaf"/>
    <rect x="2.1" width="1.3" height="5.5" fill="#ffffff"/>
    <rect y="2.1" width="5.5" height="1.3" fill="#ffffff"/>
    </g>),
    BEL: (<g>
    <rect width="4.7" height="10" fill="#000000"/>
    <rect x="4.7" width="4.6" height="10" fill="#ffd90c"/>
    <rect x="9.3" width="4.7" height="10" fill="#ef3340"/>
    </g>),
    UKR: (<g>
    <rect width="14" height="5" fill="#005bbb"/>
    <rect y="5" width="14" height="5" fill="#ffd500"/>
    </g>),
    CZE: (<g>
    <rect width="14" height="5" fill="#ffffff"/>
    <rect y="5" width="14" height="5" fill="#d7141a"/>
    <polygon points="0,0 6,5 0,10" fill="#11457e"/>
    </g>),
    AUT: (<g>
    <rect width="14" height="3.33" fill="#ed2939"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <rect y="6.67" width="14" height="3.33" fill="#ed2939"/>
    </g>),
    SUI: (<g>
    <rect width="14" height="10" fill="#d52b1e"/>
    <rect x="5.5" y="2.2" width="3" height="5.6" fill="#ffffff"/>
    <rect x="3.4" y="3.7" width="7.2" height="2.6" fill="#ffffff"/>
    </g>),
    SWE: (<g>
    <rect width="14" height="10" fill="#006aa7"/>
    <rect x="4.2" width="2.2" height="10" fill="#fecc00"/>
    <rect y="4" width="14" height="2" fill="#fecc00"/>
    </g>),
    DEN: (<g>
    <rect width="14" height="10" fill="#c60c30"/>
    <rect x="4.2" width="2" height="10" fill="#ffffff"/>
    <rect y="4" width="14" height="2" fill="#ffffff"/>
    </g>),
    ROU: (<g>
    <rect width="4.7" height="10" fill="#002b7f"/>
    <rect x="4.7" width="4.6" height="10" fill="#fcd116"/>
    <rect x="9.3" width="4.7" height="10" fill="#ce1126"/>
    </g>),
    NOR: (<g>
    <rect width="14" height="10" fill="#ba0c2f"/>
    <rect x="3.8" width="3" height="10" fill="#ffffff"/>
    <rect y="3.5" width="14" height="3" fill="#ffffff"/>
    <rect x="4.5" width="1.6" height="10" fill="#00205b"/>
    <rect y="4.2" width="14" height="1.6" fill="#00205b"/>
    </g>),
    POL: (<g>
    <rect width="14" height="5" fill="#ffffff"/>
    <rect y="5" width="14" height="5" fill="#dc143c"/>
    </g>),
    CRO: (<g>
    <rect width="14" height="3.33" fill="#ff0000"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <rect y="6.67" width="14" height="3.33" fill="#0000ff"/>
    <rect x="5.5" y="2.2" width="3" height="3.6" fill="#ff0000"/>
    </g>),
    // Added in UI v4 (simplified, same 14 x 10 grid)
    CYP: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <ellipse cx="7" cy="4.2" rx="3.3" ry="1.5" fill="#d57800"/>
    <path d="M4.6 7.2 Q7 8.4 9.4 7.2" stroke="#4e5b31" strokeWidth="0.8" fill="none"/>
    </g>),
    KOR: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <path d="M4.8 5 A2.2 2.2 0 0 1 9.2 5 Z" fill="#c60c30"/>
    <path d="M4.8 5 A2.2 2.2 0 0 0 9.2 5 Z" fill="#003478"/>
    <rect x="1.2" y="1.2" width="2" height="0.5" fill="#000000"/><rect x="1.2" y="2.1" width="2" height="0.5" fill="#000000"/>
    <rect x="10.8" y="1.2" width="2" height="0.5" fill="#000000"/><rect x="10.8" y="2.1" width="2" height="0.5" fill="#000000"/>
    <rect x="1.2" y="7.4" width="2" height="0.5" fill="#000000"/><rect x="1.2" y="8.3" width="2" height="0.5" fill="#000000"/>
    <rect x="10.8" y="7.4" width="2" height="0.5" fill="#000000"/><rect x="10.8" y="8.3" width="2" height="0.5" fill="#000000"/>
    </g>),
    ARG: (<g>
    <rect width="14" height="10" fill="#74acdf"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <circle cx="7" cy="5" r="1.1" fill="#f6b40e"/>
    </g>),
    IND: (<g>
    <rect width="14" height="3.33" fill="#ff9933"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <rect y="6.67" width="14" height="3.33" fill="#138808"/>
    <circle cx="7" cy="5" r="1.2" fill="none" stroke="#000080" strokeWidth="0.45"/>
    </g>),
    KSA: (<g>
    <rect width="14" height="10" fill="#006c35"/>
    <rect x="3" y="3" width="8" height="1.6" rx="0.4" fill="#ffffff"/>
    <rect x="3.5" y="6" width="7" height="0.6" fill="#ffffff"/>
    </g>),
    UAE: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect width="14" height="3.33" fill="#00732f"/>
    <rect y="6.67" width="14" height="3.33" fill="#000000"/>
    <rect width="3.5" height="10" fill="#ff0000"/>
    </g>),
    CAN: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect width="3.5" height="10" fill="#d52b1e"/>
    <rect x="10.5" width="3.5" height="10" fill="#d52b1e"/>
    <polygon points="7,2.2 7.8,3.8 9,3.4 8.5,5.4 9.4,5.6 7.3,7.2 7.3,8.2 6.7,8.2 6.7,7.2 4.6,5.6 5.5,5.4 5,3.4 6.2,3.8" fill="#d52b1e"/>
    </g>),
    AUS: (<g>
    <rect width="14" height="10" fill="#012169"/>
    <rect x="0" y="2" width="7" height="1" fill="#ffffff"/><rect x="3" y="0" width="1" height="5" fill="#ffffff"/>
    <rect x="0" y="2.2" width="7" height="0.6" fill="#c8102e"/><rect x="3.2" y="0" width="0.6" height="5" fill="#c8102e"/>
    <circle cx="3.5" cy="7.6" r="0.9" fill="#ffffff"/>
    <circle cx="10.5" cy="2.2" r="0.5" fill="#ffffff"/><circle cx="9" cy="4.8" r="0.5" fill="#ffffff"/>
    <circle cx="11.8" cy="4.4" r="0.4" fill="#ffffff"/><circle cx="10.5" cy="8" r="0.5" fill="#ffffff"/>
    </g>),
    USA: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect y="0" width="14" height="0.77" fill="#b22234"/><rect y="1.54" width="14" height="0.77" fill="#b22234"/>
    <rect y="3.08" width="14" height="0.77" fill="#b22234"/><rect y="4.62" width="14" height="0.77" fill="#b22234"/>
    <rect y="6.15" width="14" height="0.77" fill="#b22234"/><rect y="7.69" width="14" height="0.77" fill="#b22234"/>
    <rect y="9.23" width="14" height="0.77" fill="#b22234"/>
    <rect width="5.6" height="5.4" fill="#3c3b6e"/>
    </g>),
    HUN: (<g>
    <rect width="14" height="3.33" fill="#ce2939"/>
    <rect y="3.33" width="14" height="3.34" fill="#ffffff"/>
    <rect y="6.67" width="14" height="3.33" fill="#477050"/>
    </g>),
    AZE: (<g>
    <rect width="14" height="3.33" fill="#00b5e2"/>
    <rect y="3.33" width="14" height="3.34" fill="#ef3340"/>
    <rect y="6.67" width="14" height="3.33" fill="#509e2f"/>
    <circle cx="6.6" cy="5" r="1.1" fill="#ffffff"/><circle cx="6.95" cy="5" r="0.9" fill="#ef3340"/>
    </g>),
    COL: (<g>
    <rect width="14" height="5" fill="#fcd116"/>
    <rect y="5" width="14" height="2.5" fill="#003893"/>
    <rect y="7.5" width="14" height="2.5" fill="#ce1126"/>
    </g>),
    NZL: (<g>
    <rect width="14" height="10" fill="#012169"/>
    <rect x="0" y="2" width="7" height="1" fill="#ffffff"/><rect x="3" y="0" width="1" height="5" fill="#ffffff"/>
    <rect x="0" y="2.2" width="7" height="0.6" fill="#c8102e"/><rect x="3.2" y="0" width="0.6" height="5" fill="#c8102e"/>
    <circle cx="10.5" cy="2.4" r="0.55" fill="#c8102e"/><circle cx="9.2" cy="5" r="0.55" fill="#c8102e"/>
    <circle cx="11.8" cy="4.6" r="0.5" fill="#c8102e"/><circle cx="10.5" cy="7.8" r="0.6" fill="#c8102e"/>
    </g>),
    FIN: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect x="4" width="2.2" height="10" fill="#002f6c"/>
    <rect y="3.9" width="14" height="2.2" fill="#002f6c"/>
    </g>),
    IRL: (<g>
    <rect width="4.67" height="10" fill="#169b62"/>
    <rect x="4.67" width="4.66" height="10" fill="#ffffff"/>
    <rect x="9.33" width="4.67" height="10" fill="#ff883e"/>
    </g>),
    CHN: (<g>
    <rect width="14" height="10" fill="#ee1c25"/>
    <polygon points="3,1.2 3.5,2.7 5,2.7 3.8,3.6 4.2,5 3,4.1 1.8,5 2.2,3.6 1,2.7 2.5,2.7" fill="#ffff00"/>
    <circle cx="5.6" cy="1.3" r="0.35" fill="#ffff00"/><circle cx="6.3" cy="2.3" r="0.35" fill="#ffff00"/>
    <circle cx="6.3" cy="3.6" r="0.35" fill="#ffff00"/><circle cx="5.6" cy="4.6" r="0.35" fill="#ffff00"/>
    </g>),
    BRA: (<g>
    <rect width="14" height="10" fill="#009c3b"/>
    <polygon points="7,1.2 12.6,5 7,8.8 1.4,5" fill="#ffdf00"/>
    <circle cx="7" cy="5" r="2" fill="#002776"/>
    </g>),
    CHI: (<g>
    <rect width="14" height="5" fill="#ffffff"/>
    <rect y="5" width="14" height="5" fill="#d52b1e"/>
    <rect width="5" height="5" fill="#0039a6"/>
    <circle cx="2.5" cy="2.5" r="0.9" fill="#ffffff"/>
    </g>),
    JPN: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <circle cx="7" cy="5" r="2.8" fill="#bc002d"/>
    </g>),
    MEX: (<g>
    <rect width="4.67" height="10" fill="#006847"/>
    <rect x="4.67" width="4.66" height="10" fill="#ffffff"/>
    <rect x="9.33" width="4.67" height="10" fill="#ce1126"/>
    <circle cx="7" cy="5" r="1.1" fill="#8b5a2b"/>
    </g>),
    QAT: (<g>
    <rect width="14" height="10" fill="#8a1538"/>
    <rect width="4" height="10" fill="#ffffff"/>
    <polygon points="4,0 5.4,0.8 4,1.6 5.4,2.4 4,3.2 5.4,4 4,4.8 5.4,5.6 4,6.4 5.4,7.2 4,8 5.4,8.8 4,10" fill="#ffffff"/>
    </g>),
    SRB: (<g>
    <rect width="14" height="3.33" fill="#c6363c"/>
    <rect y="3.33" width="14" height="3.34" fill="#0c4076"/>
    <rect y="6.67" width="14" height="3.33" fill="#ffffff"/>
    </g>),
    URU: (<g>
    <rect width="14" height="10" fill="#ffffff"/>
    <rect y="1.11" width="14" height="1.11" fill="#0038a8"/><rect y="3.33" width="14" height="1.11" fill="#0038a8"/>
    <rect y="5.55" width="14" height="1.11" fill="#0038a8"/><rect y="7.77" width="14" height="1.11" fill="#0038a8"/>
    <rect width="5" height="5.55" fill="#ffffff"/>
    <circle cx="2.5" cy="2.7" r="1.3" fill="#fcd116"/>
    </g>),
    ECU: (<g>
    <rect width="14" height="5" fill="#ffdd00"/>
    <rect y="5" width="14" height="2.5" fill="#034ea2"/>
    <rect y="7.5" width="14" height="2.5" fill="#ed1c24"/>
    </g>),
    SVN: (<g>
    <rect width="14" height="3.33" fill="#ffffff"/>
    <rect y="3.33" width="14" height="3.34" fill="#0000ff"/>
    <rect y="6.67" width="14" height="3.33" fill="#ff0000"/>
    <path d="M3 2 L5.4 2 L5.4 4.6 Q4.2 5.8 3 4.6 Z" fill="#0000ff" stroke="#ff0000" strokeWidth="0.4"/>
    </g>),
    MAR: (<g>
    <rect width="14" height="10" fill="#c1272d"/>
    <polygon points="7.00,2.90 8.35,7.06 4.81,4.49 9.19,4.49 5.65,7.06" fill="none" stroke="#006233" strokeWidth="0.55"/>
    </g>),
    ISL: (<g>
    <rect width="14" height="10" fill="#02529c"/>
    <rect x="3.6" width="2.6" height="10" fill="#ffffff"/><rect y="3.7" width="14" height="2.6" fill="#ffffff"/>
    <rect x="4.3" width="1.2" height="10" fill="#dc1e35"/><rect y="4.4" width="14" height="1.2" fill="#dc1e35"/>
    </g>),
    GHA: (<g>
    <rect width="14" height="3.34" fill="#ce1126"/><rect y="3.33" width="14" height="3.34" fill="#fcd116"/><rect y="6.66" width="14" height="3.34" fill="#006b3f"/>
    <polygon points="7.00,3.60 7.34,4.64 8.43,4.64 7.54,5.28 7.88,6.31 7.00,5.67 6.12,6.31 6.46,5.28 5.57,4.64 6.66,4.64" fill="#000000"/>
    </g>),
    CIV: (<g>
    <rect width="4.67" height="10" fill="#f77f00"/><rect x="4.67" width="4.66" height="10" fill="#ffffff"/><rect x="9.33" width="4.67" height="10" fill="#009e60"/>
    </g>),
    BIH: (<g>
    <rect width="14" height="10" fill="#002395"/>
    <polygon points="3.6,0 10.4,0 10.4,10" fill="#fecb00"/>
    <circle cx="2.90" cy="0.70" r="0.42" fill="#ffffff"/><circle cx="4.25" cy="2.25" r="0.42" fill="#ffffff"/><circle cx="5.60" cy="3.80" r="0.42" fill="#ffffff"/><circle cx="6.95" cy="5.35" r="0.42" fill="#ffffff"/><circle cx="8.30" cy="6.90" r="0.42" fill="#ffffff"/><circle cx="9.65" cy="8.45" r="0.42" fill="#ffffff"/>
    </g>),
    MLI: (<g>
    <rect width="4.67" height="10" fill="#14b53a"/><rect x="4.67" width="4.66" height="10" fill="#fcd116"/><rect x="9.33" width="4.67" height="10" fill="#ce1126"/>
    </g>),
    EGY: (<g>
    <rect width="14" height="3.34" fill="#ce1126"/><rect y="3.33" width="14" height="3.34" fill="#ffffff"/><rect y="6.66" width="14" height="3.34" fill="#000000"/>
    <circle cx="7" cy="5" r="0.9" fill="#c09300"/>
    </g>),
    GAM: (<g>
    <rect width="14" height="3.2" fill="#ce1126"/><rect y="3.2" width="14" height="0.5" fill="#ffffff"/><rect y="3.7" width="14" height="2.6" fill="#0c1c8c"/><rect y="6.3" width="14" height="0.5" fill="#ffffff"/><rect y="6.8" width="14" height="3.2" fill="#3a7728"/>
    </g>),
    IRN: (<g>
    <rect width="14" height="3.34" fill="#239f40"/><rect y="3.33" width="14" height="3.34" fill="#ffffff"/><rect y="6.66" width="14" height="3.34" fill="#da0000"/>
    <circle cx="7" cy="5" r="0.9" fill="none" stroke="#da0000" strokeWidth="0.45"/>
    </g>),
    GAB: (<g>
    <rect width="14" height="3.34" fill="#009e60"/><rect y="3.33" width="14" height="3.34" fill="#fcd116"/><rect y="6.66" width="14" height="3.34" fill="#3a75c4"/>
    </g>),
    ALB: (<g>
    <rect width="14" height="10" fill="#e41e20"/>
    <path d="M7 2.2 L8.1 3.4 L9.8 2.8 L9.2 4.6 L10.4 5.6 L8.6 5.9 L8.2 7.8 L7 6.6 L5.8 7.8 L5.4 5.9 L3.6 5.6 L4.8 4.6 L4.2 2.8 L5.9 3.4 Z" fill="#000000"/>
    </g>),
    ALG: (<g>
    <rect width="7" height="10" fill="#006233"/><rect x="7" width="7" height="10" fill="#ffffff"/>
    <circle cx="7" cy="5" r="2.3" fill="#d21034"/><circle cx="7.6" cy="5" r="1.85" fill="#ffffff"/><rect x="7" width="0.01" height="0.01" fill="#ffffff"/>
    <polygon points="8.40,4.05 8.61,4.71 9.30,4.71 8.75,5.11 8.96,5.77 8.40,5.36 7.84,5.77 8.05,5.11 7.50,4.71 8.19,4.71" fill="#d21034"/>
    </g>),
    MNE: (<g>
    <rect width="14" height="10" fill="#c40308"/>
    <rect x="0.35" y="0.35" width="13.3" height="9.3" fill="none" stroke="#d3ae3b" strokeWidth="0.7"/>
    <circle cx="7" cy="5" r="1.6" fill="#d3ae3b"/>
    </g>),
};
// Two-letter country codes (from the flag emoji) -> the keys above.
const ISO2_TO_FLAG = {
  FR: 'FRA', ES: 'ESP', DE: 'GER', IT: 'ITA', PT: 'POR', NL: 'NED', TR: 'TUR',
  GR: 'GRE', BE: 'BEL', CZ: 'CZE', UA: 'UKR', AT: 'AUT', CH: 'SUI', HR: 'CRO',
  DK: 'DEN', SE: 'SWE', NO: 'NOR', RO: 'ROU', PL: 'POL', CY: 'CYP', KR: 'KOR',
  AR: 'ARG', IN: 'IND', SA: 'KSA', AE: 'UAE', CA: 'CAN', AU: 'AUS', US: 'USA',
  HU: 'HUN', AZ: 'AZE', CO: 'COL', NZ: 'NZL', FI: 'FIN', IE: 'IRL', CN: 'CHN',
  BR: 'BRA', CL: 'CHI', JP: 'JPN', MX: 'MEX', QA: 'QAT', RS: 'SRB', UY: 'URU', EC: 'ECU', SI: 'SVN',
  MA: 'MAR', IS: 'ISL', GH: 'GHA', CI: 'CIV', BA: 'BIH', ML: 'MLI', EG: 'EGY', GM: 'GAM', IR: 'IRN', GA: 'GAB', AL: 'ALB', DZ: 'ALG', ME: 'MNE',
};
const SUBDIVISION_TO_FLAG = { gbeng: 'ENG', gbsct: 'SCO', gbwls: 'WAL' };
export function flagKey(emoji) {
  const cps = Array.from(String(emoji || '')).map((ch) => ch.codePointAt(0));
  const ri = cps.filter((c) => c >= 0x1f1e6 && c <= 0x1f1ff);
  if (ri.length >= 2) {
    const iso = String.fromCharCode(ri[0] - 0x1f1e6 + 65, ri[1] - 0x1f1e6 + 65);
    return ISO2_TO_FLAG[iso] || null;
  }
  const tag = cps.filter((c) => c >= 0xe0061 && c <= 0xe007a).map((c) => String.fromCharCode(c - 0xe0000)).join('');
  return SUBDIVISION_TO_FLAG[tag] || null;
}
// The raw drawing for a flag code (14 x 10 units), or a grey box.
export function flagArt(code) {
  return (code && FLAG_ART[code]) || <rect width="14" height="10" fill="#cbd5e1" />;
}
// Several flags in a row, from a list or a string of flag emoji
// country flags first, then any other symbol (incl. joined ones like 🏴‍☠️)
const FLAG_EMOJI_RE = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]+\u{E007F}|\p{Extended_Pictographic}\u{FE0F}?(?:\u{200D}\p{Extended_Pictographic}\u{FE0F}?)*/gu;
export function splitFlags(v) {
  if (Array.isArray(v)) return v;
  return String(v || '').match(FLAG_EMOJI_RE) || [];
}
export function FlagList({ flags, size = 16, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {/* country flags are drawn; other symbols (e.g. 🪩 ESL) show as they are */}
      {splitFlags(flags).map((f, i) => (flagKey(f) ? <Flag key={i} emoji={f} size={size} /> : <span key={i} className="leading-none" style={{ fontSize: size * 0.9 }}>{f}</span>))}
    </span>
  );
}
// Inside an SVG chart: <SvgFlag code="FRA" x={..} y={..} width={14} height={10} />
// (rounded corners, thin border, same drawings as Flag).
export function SvgFlag({ code, emoji, x = 0, y = 0, width = 14, height = 10 }) {
  const key = code || flagKey(emoji);
  const art = key ? FLAG_ART[key] : null;
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 14 10" overflow="hidden">
      <rect width="14" height="10" rx="1.5" fill="#ffffff" />
      {art || <rect width="14" height="10" fill="#cbd5e1" />}
      <rect width="14" height="10" rx="1.5" fill="none" stroke="#cbd5e1" strokeWidth="0.6" />
    </svg>
  );
}
// <Flag emoji="🇫🇷" /> or <Flag code="FRA" size={22} />  (size = width in px)
export function Flag({ emoji, code, size = 14, className = '' }) {
  const key = code || flagKey(emoji);
  const art = key ? FLAG_ART[key] : null;
  const h = Math.round((size * 10) / 14);
  // Not a country flag (e.g. 🪩 for the ESL): show the symbol itself
  if (!art && !code && emoji && String(emoji).trim() && !flagKey(emoji)) {
    return <span className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`} style={{ fontSize: Math.round(size * 0.9), width: size, height: h }}>{emoji}</span>;
  }
  return (
    <span className={`inline-flex shrink-0 overflow-hidden rounded-[2px] ring-1 ring-slate-300/70 align-middle ${className}`} style={{ width: size, height: h }}>
      <svg viewBox="0 0 14 10" width={size} height={h} aria-hidden="true">
        {art || <rect width="14" height="10" fill="#cbd5e1" />}
      </svg>
    </span>
  );
}

// ─── BAR WITH HOVER CARD ─────────────────────────────────────────────
// A bar split into segments; hovering a segment shows a card (League and
// Cups share it).
// segments: [{ key, n, label, cls, style, inner, items }]
//   items (optional): the matches or ties in that segment, each
//   { flag, name, score, tag }. Listed one per line when there are
//   HOVER_LIST_MAX or fewer; above that the card shows only the count.
// context: line under the card title (e.g. "Season 3 (2026 - 27) • All matches")
// chip: small tag in the card's corner (e.g. "S3"). unit: "matches" or "ties".
// accent: 'indigo' (League) or 'amber' (Cups), for the corner tag.
const HOVER_LIST_MAX = 8;
const HOVER_CHIP = {
  indigo: 'text-indigo-800 bg-indigo-50 border-indigo-200',
  amber: 'text-amber-800 bg-amber-50 border-amber-200',
  maroon: 'text-[#6d28d9] bg-[#f5f3ff] border-[#f5c9d3]',
};
export function SegmentBar({ segments, total, context, chip, unit = 'matches', accent = 'indigo', barClass, segClass, minWidth = '6px' }) {
  const [hover, setHover] = React.useState(null);
  const cardRef = React.useRef(null);
  const barRef = React.useRef(null);
  const shown = segments.filter((s) => s.n > 0);
  // UI v15: the whole bar follows the pointer, so it scrubs: mouse as before;
  // touch: tap or slide sideways along the bar (card docked at the bottom)
  const pickAt = (clientX) => {
    const el = barRef.current;
    if (!el || !shown.length) return;
    const kids = Array.from(el.children);
    let i = kids.findIndex((k) => { const r = k.getBoundingClientRect(); return clientX >= r.left && clientX <= r.right; });
    if (i < 0) i = clientX < el.getBoundingClientRect().left ? 0 : kids.length - 1;
    const seg = shown[i];
    if (!seg) return;
    setHover((h) => (h && h.seg.key === seg.key && Math.abs(h.x - clientX) < 2 ? h : { seg, pct: (seg.n / total) * 100, x: clientX, y: el.getBoundingClientRect().top }));
  };
  const track = usePointerTrack(barRef, pickAt, () => setHover(null));
  if (!total || !shown.length) return <div className={`${barClass} bg-slate-100`} />;
  const one = unit.replace(/es$|s$/, '');
  return (
    <>
      <div ref={barRef} className={barClass} {...track.props}>
        {shown.map((s) => {
          const pct = (s.n / total) * 100;
          return (
            <div
              key={s.key}
              className={`${segClass} ${s.cls} cursor-pointer transition-all hover:brightness-110 ${hover && hover.seg.key === s.key ? 'brightness-110' : ''}`}
              style={{ ...(s.style || {}), width: `${pct}%`, minWidth }}
            >
              {s.inner ? s.inner(pct) : null}
            </div>
          );
        })}
      </div>
      {hover && (
        <div
          ref={cardRef}
          data-hv-card=""
          className={`fixed ${track.touch ? 'z-[70] left-3 right-3 bottom-3 mx-auto max-w-sm' : 'z-50 w-64'} pointer-events-none shadow-2xl rounded-xl p-3 text-xs bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900`}
          style={track.touch ? { position: 'fixed', pointerEvents: 'none' } : {
            position: 'fixed',
            pointerEvents: 'none',
            left: `${Math.max(140, Math.min(viewport(1000).w - 140, hover.x))}px`,
            top: `${hover.y < 180 ? hover.y + 16 : hover.y - 12}px`,
            transform: hover.y < 180 ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 gap-2">
            <div className="flex items-center space-x-1.5 min-w-0">
              <span className={`w-3 h-3 rounded-xs shrink-0 ${hover.seg.swatch || ''}`} style={hover.seg.style || undefined} />
              <span className="font-extrabold text-slate-900 truncate">{hover.seg.label}</span>
            </div>
            {chip && (
              <span className={`text-[11px] font-bold border px-1.5 rounded shrink-0 ${HOVER_CHIP[accent] || HOVER_CHIP.indigo}`}>{chip}</span>
            )}
          </div>
          {context && <div className="text-[11px] text-slate-500 font-medium mb-2">{context}</div>}
          <div className="space-y-1.5 bg-slate-50 rounded-lg p-2 border border-slate-100">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600 font-medium">Count</span>
              <span className="font-black text-slate-900 text-sm tabular-nums">
                {hover.seg.n} <span className="text-xs font-semibold text-slate-500">/ {total} {total === 1 ? one : unit}</span>
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600 font-medium">Share</span>
              <span className="font-black text-slate-900 text-sm tabular-nums">{hover.pct.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${hover.seg.swatch || ''}`} style={{ ...(hover.seg.style || {}), width: `${hover.pct}%` }} />
            </div>
          </div>
          {hover.seg.items && hover.seg.items.length > 0 && hover.seg.items.length <= HOVER_LIST_MAX && (
            <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
              {hover.seg.items.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5 min-w-0">
                  <Flag emoji={m.flag} />
                  <span className="font-bold text-slate-800 truncate flex-1 min-w-0" title={m.name}>{m.name}</span>
                  {m.tag && <span className="text-[11px] font-semibold text-slate-400 shrink-0">{m.tag}</span>}
                  <span className="text-[11px] font-black tabular-nums text-slate-600 bg-slate-100 border border-slate-200 rounded px-1.5 shrink-0">{m.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

