/*
 *  ═══════════════════════════════════════════════════════════════════════════
 *  GSL CANVAS: League · Form & Margins and Points tabs
 *  ═══════════════════════════════════════════════════════════════════════════
 *  Version:  LeagueTabs v10
 *  Date:     2026-10-17, 07:45 UTC
 *
 *  The two League tabs redesigned in the v51 Palette Lab (Form & Margins
 *  rounds 1–3, Points rounds 1–5), built as their own module so League.js
 *  only has to hand them the seasons and the clubs.
 *
 *  Everything is worked out here from each season's fixtures (matchday,
 *  venue, opponent, score, result), so no new sheet columns are needed.
 *  One known gap: the sheet records the matchday a title was sealed only
 *  for some seasons; Fastest Title Seal uses the seasons that have it.
 *
 *  Rules followed: R1 records, R2 scores, R5 Highlights bar first, R6 no
 *  repeats, R8 section cards neutral, R10 match order (flag, club, result,
 *  score), accents never colour data.
 *
 *  CHANGELOG (newest first)
 *
 *  LeagueTabs v10 — 2026-10-17, 07:45 UTC — Canvas v51.18 (quick fixes)
 *   - Minus signs: every signed number (axis labels, pace, deltas, GD, hover
 *     cards) goes through ui.js's signed(): true minus sign, no sign on zero.
 *   - Points: Best season's date sits on its own line under the Invincible
 *     chip on phones and never wraps. Perfect matchdays wraps to two lines at
 *     most, then ends with "+N" (ClampList); never "…". Heat legend "<25%",
 *     on one line at 390. The season strip scrolls (never the page) to keep
 *     the focused season in view, 16px in from the edge.
 *   - Points race on phones: the plot uses the full width (right margin =
 *     the longest end label + 6px) and the x-axis shows bare numbers; desktop
 *     keeps "MD 1". Ticks come from the data: 1, every 10, and each
 *     completed season's length (a multiple of 10 within 4 of one is dropped).
 *   - Home vs Away: on phones the Points card comes first at full width. The
 *     swing bar's away figures keep light mode's dark ink in dark mode.
 *   - Spider Matrix on phones: the radar fills its box and every pillar label
 *     sits inside it, 8px clear; side labels wrap to two lines and the web
 *     shrinks to fit. Desktop unchanged. Versus subtitle removed; Group's
 *     count line drops its hover hint; its subtitle is "Outlines only."
 *
 *  LeagueTabs v9 — 2026-10-17, 12:00 UTC — Canvas v51.17 (dark-mode fixes)
 *   - Spider Matrix: the Career layer colour (INK) is the ink token as a CSS
 *     variable, so its radar line and dots, scorecard bars, legend swatch,
 *     card swatch and top strip show in dark mode. The opponent clash check
 *     compares against the ink hex of the mode that is on (useDark).
 *   - Selected chips (Points season strip All / None, Home vs Away combine
 *     seasons, Spider Change ▾, Venue season scope, quick picks) use
 *     text-slate-50 instead of text-white, so they stay readable in dark mode.
 *
 *  LeagueTabs v8 — 2026-10-09, 11:00 UTC — Canvas v51.15
 *   - Momentum Overlay hover card: titled by matchday; shows the plotted
 *     value (5-game average GD), the change from the previous matchday,
 *     rank, and the result with the opponent's flag and code.
 *   - Highs & lows: "Biggest wins vs top teams", explainer text removed.
 *
 *  LeagueTabs v7 — 2026-10-09, 09:00 UTC — Canvas v51.14 (Anish's League review)
 *   - Points race: the compare card ranks on points, then goal difference,
 *     with a cumulative GD column; All / None is one compact control.
 *   - Matchday benchmarks: the drawer uses club codes, four columns, compact
 *     rows (as in Streaks).
 *   - Form & Margins: Margin distribution loses its Table view; Momentum
 *     pulse Overlay gets a hover card (each season's 5-game average, rank and
 *     that match's result); Biggest scalps becomes "Top-ranked clubs beaten",
 *     with each club's average rank labelled.
 *   - Home vs Away: spine labels sit lower (between the row top and the
 *     number); the Venue ledger's split follows its Points / Wins / Goals
 *     switch.
 *
 *  LeagueTabs v6 — 2026-10-09, 05:00 UTC — Canvas v51.13
 *   - New SpiderTab (locked design): Versus (two layer cards with R12 strips,
 *     picker anchored under Change: Career, Seasons, Venue with season scope,
 *     Opponents with search and the us / them toggle; swap; quick picks) and
 *     Group (seasons or clubs, up to 8 / 6, chips with remove and Add, outline
 *     radar with highlight, dot lines or a table). Pillar spec: more is
 *     better, shared scales (win 0–100%, conceded 2.5–0, clean sheets 0–70%,
 *     PPG 0–3, blowouts 0–70%, scored 0–4); off-scale values clamp on the web
 *     with an arrow and stretch only that row. Radar Option 1 (only each
 *     layer's lead is filled). Highs & lows by club (All, 5+, 10+, Top 10) or
 *     by season. Axis labels explain each pillar on hover.
 *
 *  LeagueTabs v5 — 2026-10-09, 02:00 UTC — Canvas v51.12
 *   - New HomeAwayTab (locked design): career Highlights bar with venue tags;
 *     Venue swing with the career split bar, Points / Wins / Goals, click a
 *     season, Combine seasons (plus Div 1 / lower-division shortcuts); the
 *     side-by-side for the selection (spine option E) with last-5 hover on
 *     Home / Away; Venue ledger mirrored around the points split, its own
 *     metric switch, sortable, rows select seasons.
 *   - Points race: magnifier removed; the hover card floats beside the cursor
 *     (flips sides) instead of the side panel; chart full width; Average and
 *     Record labels at the left; works by touch (drag to scrub).
 *   - Every hover in this file works by touch: on a phone the card shows
 *     fixed at the bottom of the screen and stays up after the finger lifts.
 *
 *  LeagueTabs v4 — 2026-10-08, 04:00 UTC — Canvas v51.11
 *   - Sorting now uses the shared useSort from ui.js (same behaviour).
 *
 *  LeagueTabs v3 — 2026-10-08, 02:00 UTC — Canvas v51.10
 *   - Points race: the hover card moves into a side panel beside the chart,
 *     so it never covers the magnifier; at rest it shows the season's end.
 *     Pace view gets the same panel (pace gap, rank, PPG) and a third
 *     baseline, last season's PPG. All / None for the season strip.
 *   - Streaks: headers never wrap (sorting by goals no longer breaks the
 *     row); more room between the first columns; Ended by uses club codes;
 *     the drawer's rows are compact, with wide gutters between columns.
 *   - Dropped points by season: Dropped shows the total with a draws /
 *     defeats split bar; clubs listed under Drawn with (amber) and Lost to
 *     (rose), ×2 when it happened twice.
 *
 *  LeagueTabs v2 — 2026-10-07, 22:00 UTC — Canvas v51.09 (Anish's v51.08 notes)
 *   - Hover cards back: Margin distribution segments (count, share, the
 *     matches) and Momentum pulse bars (fixture, GD, 5-game average). Hover
 *     cards now sit on the page (fixed), so no table can clip them.
 *   - Momentum pulse fills its card; One season / Overlay (each season's
 *     5-game average) restored.
 *   - Highs & lows: filter removed; six cards: Biggest wins, Heaviest defeats,
 *     Highest-scoring draws, Biggest scalps (wins over the best-ranked clubs),
 *     Most common scores, Clean sheets and blanks (now with longest runs and
 *     the best season).
 *   - Streaks: length filter removed (all runs of 2+, longest first); the
 *     drawer uses club codes and fits four columns.
 *   - Every table sorts by its headers (Streaks, Dropped points both views,
 *     Matchday benchmarks).
 *   - Dropped points by season lists every club points were dropped against
 *     (code, points, draws and defeats); the top card shows the club's flag.
 *   - Points race: fills its card; Focus has a hover card (points, fixture,
 *     against record pace); the record-pace label moves clear of the season
 *     label; the magnifier follows the cursor (rests on the run-in); the
 *     season strip's ticks show in dark mode; S1 is lime, not slate.
 *   - Matchday benchmarks: best and worst decided by PPG, then goal
 *     difference, then goals; the cards show GD; Perfect matchdays lists them.
 *
 *  LeagueTabs v1 — 2026-10-07, 18:00 UTC — Canvas v51.08
 *   - First version: FormMarginsTab, PointsTab.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Activity, Target, Zap, Star, Trophy, ChevronDown, ChevronUp, Search, Home, Plane, X, ArrowLeftRight, Calendar, Shield, Plus } from 'lucide-react';
import {
  TYPE,
  HighlightsBar,
  HighlightCard,
  SectionStats,
  Segmented,
  Score,
  WDLRecord,
  RecordKey,
  Flag,
  useSort,
  useDark,
  INK_HEX,
  useScreen,
  signed,
} from './ui.js';

// ─── SHARED ─────────────────────────────────────────────────────────
const EB = `${TYPE.eyebrow}`;
const SEASON_HEX = { 1: '#65a30d', 2: '#0284c7', 3: '#059669', 4: '#7c3aed', 5: '#db2777', 6: '#ea580c', 7: '#0891b2', 8: '#d97706', 9: '#65a30d', 10: '#9333ea', 11: '#0d9488', 12: '#e11d48' };
const seasonHex = (n) => SEASON_HEX[((n - 1) % 12) + 1];
const ORD = (n) => { const s = ['th', 'st', 'nd', 'rd']; const v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const divLabel = (d) => { const m = String(d || '').match(/(\d+)/); return m ? `Div ${m[1]}` : String(d || ''); };
const yearLabel = (y) => String(y || '').replace(/\s*-\s*/, '–');
const RES_CHIP = { W: 'bg-emerald-50 text-emerald-700 ring-emerald-200', D: 'bg-amber-50 text-amber-700 ring-amber-200', L: 'bg-rose-50 text-rose-700 ring-rose-200' };
function Chip({ r }) {
  return <span className={`w-6 h-6 shrink-0 rounded-md ring-1 inline-flex items-center justify-center text-[11px] font-semibold ${RES_CHIP[r] || ''}`}>{r}</span>;
}
// R10: flag, club, result chip, score (things can be left out, never reordered)
function MatchLine({ m, chip = true, when = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2 min-w-0 whitespace-nowrap ${className}`}>
      <Flag emoji={m.oppFlag} size={18} />
      <span className="text-[13px] font-medium text-slate-700 truncate">{String(m.oppName || '').toUpperCase()}</span>
      {chip && <Chip r={m.res} />}
      <span className="text-sm font-semibold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span>
      {when && <span className="text-xs text-slate-400">S{m.season} · MD{m.md}</span>}
    </span>
  );
}
function Section({ title, sub, right, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className={`${TYPE.section} text-slate-900`}>{title}</h3>
          {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
function Chev({ open }) {
  return <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />;
}


// Width of a box, so charts fill their container (SVGs with a fixed height
// otherwise keep their aspect ratio and come out narrower than the card).
function useWidth(initial = 1000, min = 320) {
  // Callback ref, so a chart that mounts later (or moves between views) is still measured
  const [el, setEl] = useState(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => setW(Math.max(min, Math.round(entries[0].contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, w];
}
// A list on at most `lines` lines, never cut off with "…": as many items as
// fit, then "+N" for the rest ("MD 10 · 16 · 34 +4"). Measured in the
// browser; re-measured when the box or the items change.
function ClampList({ items = [], prefix = '', lines = 2 }) {
  const box = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((es) => setW(Math.round(es[0].contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const sig = `${items.join(',')}|${w}`;
  const [fit, setFit] = useState({ sig, n: items.length });
  const n = fit.sig === sig ? fit.n : items.length;
  if (fit.sig !== sig) setFit({ sig, n: items.length });
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || n <= 1) return;
    const tops = new Set([...el.children].map((c) => Math.round(c.getBoundingClientRect().top)));
    if (tops.size > lines) setFit({ sig, n: n - 1 });
  });
  const rest = items.length - n;
  return (
    <span ref={box} className="min-w-0 flex-1 flex flex-wrap gap-x-[0.3em]">
      {items.slice(0, n).map((x, i) => <span key={x} className="whitespace-nowrap">{i ? '· ' : prefix}{x}</span>)}
      {rest > 0 && <span className="whitespace-nowrap">+{rest}</span>}
    </span>
  );
}
// A hover card fixed to the viewport, so no scrolling box can clip it.
function FloatCard({ at, width = 256, beside = false, children }) {
  if (!at) return null;
  if (at.touch) return <div className="fixed z-[70] left-2 right-2 bottom-3 pointer-events-none"><div className="bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 p-4 flex flex-col gap-2 text-left">{children}</div></div>;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  if (beside) {
    // Beside the cursor, flipping sides past the middle of the screen, never off the edges
    const left2 = at.x < vw / 2 ? at.x + 18 : at.x - width - 18;
    const top2 = Math.max(8, Math.min(at.y, vh - 8));
    return <div className="fixed z-[70] pointer-events-none" style={{ left: Math.max(8, Math.min(left2, vw - width - 8)), top: top2, width, transform: `translateY(-${top2 < vh / 3 ? 10 : top2 > (vh * 2) / 3 ? 90 : 50}%)` }}><div className="bg-white rounded-xl shadow-lg ring-1 ring-slate-200 p-3 flex flex-col gap-1.5 text-left">{children}</div></div>;
  }
  const left = Math.max(8, Math.min(at.x - width / 2, vw - width - 8));
  const top = at.y - 12;
  return <div className="fixed z-[70] pointer-events-none" style={{ left, top, width, transform: 'translateY(-100%)' }}><div className="bg-white rounded-xl shadow-lg ring-1 ring-slate-200 p-3 flex flex-col gap-1.5 text-left">{children}</div></div>;
}
const pointAt = (e) => ({ x: e.clientX, y: e.clientY, touch: e.pointerType === 'touch' });
// Leaving a chart clears its hover, except after a touch: on a phone the card stays
// up after the finger lifts, so it can be read, until the next touch elsewhere.
const leaveUnlessTouch = (set) => (e) => { if (e.pointerType !== 'touch') set(null); };
// Every played match, oldest first, with the fields the tabs need
function useMatches(seasons) {
  return useMemo(() => {
    const out = [];
    [...seasons].sort((a, b) => a.num - b.num).forEach((s) => {
      (s.fixtures || []).filter((f) => f.hasPlayed).sort((a, b) => a.md - b.md).forEach((f) => {
        out.push({ season: s.num, division: s.division, md: f.md, venue: f.venue === 'H' ? 'H' : 'A', opp: String(f.oppAbbr || '').toUpperCase(), oppName: f.oppName, oppFlag: f.oppFlag, f: f.teamScore, a: f.oppScore, res: f.res });
      });
    });
    return out;
  }, [seasons]);
}

// ═══ FORM & MARGINS ═════════════════════════════════════════════════
const TIERS = [
  ['w4', '4+ goal win', '#065f46', '#fff'], ['w3', '3 goal win', '#047857', '#fff'], ['w2', '2 goal win', '#10b981', '#fff'], ['w1', '1 goal win', '#6ee7b7', '#064e3b'],
  ['d3', '3–3 or more', '#b45309', '#fff'], ['d2', '2–2', '#d97706', '#fff'], ['d1', '1–1', '#fbbf24', '#451a03'], ['d0', '0–0', '#fde68a', '#451a03'],
  ['l1', '1 goal loss', '#fda4af', '#4c0519'], ['l2', '2 goal loss', '#fb7185', '#4c0519'], ['l3', '3 goal loss', '#e11d48', '#fff'], ['l4', '4+ goal loss', '#9f1239', '#fff'],
];
const tierOf = (m) => {
  const d = m.f - m.a;
  if (d > 0) return d >= 4 ? 'w4' : `w${d}`;
  if (d < 0) return -d >= 4 ? 'l4' : `l${-d}`;
  return m.f >= 3 ? 'd3' : `d${m.f}`;
};

function runsOf(matches, ok) {
  const out = [];
  let st = -1;
  for (let i = 0; i <= matches.length; i++) {
    const good = i < matches.length && ok(matches[i].res);
    if (good && st < 0) st = i;
    if (!good && st >= 0) { out.push({ list: matches.slice(st, i), end: i < matches.length ? matches[i] : null }); st = -1; }
  }
  return out;
}

function StreakCard({ title, current, record, color, track, line, recLine }) {
  const pct = record ? Math.min(100, (current / record) * 100) : 0;
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
      <div className={`${EB} text-slate-500`}>{title}</div>
      <div className="flex items-center gap-4">
        <div className="w-16"><div className="text-[11px] font-semibold text-slate-500">Current</div><div className={`text-4xl leading-none ${TYPE.big} text-slate-900`}>{current}</div></div>
        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: track }}><div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} /></div>
        <div className="w-16 text-right"><div className="text-[11px] font-semibold text-slate-500">Record</div><div className={`text-4xl leading-none ${TYPE.big} text-slate-900`}>{record}</div></div>
      </div>
      <div className="flex justify-between gap-3 text-xs font-medium text-slate-500"><span>{line}</span><span>{recLine}</span></div>
    </div>
  );
}

// The pulse: one column per match; green height = winning margin (cap 7), amber stub = draw
function Pulse({ list }) {
  const [hover, setHover] = useState(null);
  const PX = 5, CAP = 7, H = 40, top = 4, base = H - 2, u = (base - top) / CAP;
  const w = list.length * PX;
  const m = hover ? list[hover.i] : null;
  return (
    <span className="relative inline-block" style={{ touchAction: 'pan-y' }} onPointerLeave={leaveUnlessTouch(setHover)}>
      <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} className="block overflow-visible">
        <line x1="0" x2={w} y1={base} y2={base} stroke="rgb(var(--c-slate-200))" />
        <line x1="0" x2={w} y1={base - 3 * u} y2={base - 3 * u} stroke="rgb(var(--c-slate-300))" strokeDasharray="2 3" />
        {list.map((x, i) => {
          const g = x.f - x.a;
          const h = g > 0 ? Math.min(g, CAP) * u : 2.5;
          return (
            <g key={i} onPointerMove={(e) => setHover({ i, at: pointAt(e) })}>
              <rect x={i * PX} y={0} width={PX} height={H} fill="transparent" />
              <rect x={i * PX + 0.75} y={base - h} width={PX - 1.5} height={h} rx="0.5" fill={g > 0 ? '#10b981' : '#f59e0b'} opacity={!hover || hover.i === i ? 1 : 0.45} />
              {g > CAP && <rect x={i * PX + 0.25} y={top - 3} width={PX - 0.5} height="2" fill="#047857" />}
            </g>
          );
        })}
      </svg>
      {m && (
        <FloatCard at={hover.at}>
          <span className={`${EB} text-slate-500`}>S{m.season} · MD {m.md} · {m.venue === 'H' ? 'Home' : 'Away'}</span>
          <span className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 min-w-0"><Flag emoji={m.oppFlag} size={18} /><span className="text-sm font-semibold text-slate-900 truncate">{String(m.oppName || '').toUpperCase()}</span></span>
            <span className="flex items-center gap-2 shrink-0"><Chip r={m.res} /><span className="text-xl font-extrabold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span></span>
          </span>
          <span className="text-xs text-slate-500">Match {hover.i + 1} of the run</span>
        </FloatCard>
      )}
    </span>
  );
}

export function FormMarginsTab({ seasons = [], clubs = [], accent = 'indigo' }) {
  const matches = useMatches(seasons);
  const avgRank = useMemo(() => { const m = new Map(); clubs.forEach((c) => m.set(String(c.abbr || '').toUpperCase(), c.avg)); return m; }, [clubs]);
  const n = matches.length;
  const W = matches.filter((m) => m.res === 'W').length, D = matches.filter((m) => m.res === 'D').length, L = n - W - D;
  const pct = (x) => (n ? ((x / n) * 100).toFixed(1) : '0.0');
  const seasonsPlayed = seasons.filter((s) => s.gp > 0);

  // margins
  const lists = useMemo(() => {
    const c = (fn) => matches.filter(fn).length;
    const wins = [['1 goal', c((m) => m.f - m.a === 1)], ['2 goals', c((m) => m.f - m.a === 2)], ['3 goals', c((m) => m.f - m.a === 3)], ['4+ goals', c((m) => m.f - m.a >= 4)]];
    const draws = [['1–1', c((m) => m.res === 'D' && m.f === 1)], ['2–2', c((m) => m.res === 'D' && m.f === 2)], ['0–0', c((m) => m.res === 'D' && m.f === 0)], ['3–3 or more', c((m) => m.res === 'D' && m.f >= 3)]];
    const losses = [['1 goal', c((m) => m.a - m.f === 1)], ['2 goals', c((m) => m.a - m.f === 2)], ['3 goals', c((m) => m.a - m.f === 3)], ['4+ goals', c((m) => m.a - m.f >= 4)]];
    return { wins, draws, losses, max: Math.max(1, ...[...wins, ...draws, ...losses].map((x) => x[1])) };
  }, [matches]);

  // distribution
  const dist = useMemo(() => seasonsPlayed.map((s) => {
    const ms = matches.filter((m) => m.season === s.num);
    const counts = {}; ms.forEach((m) => { const k = tierOf(m); counts[k] = (counts[k] || 0) + 1; });
    return { s, counts, gp: ms.length, w: ms.filter((m) => m.res === 'W').length, d: ms.filter((m) => m.res === 'D').length, l: ms.filter((m) => m.res === 'L').length };
  }), [matches, seasonsPlayed]);

  // momentum
  const [momSeason, setMomSeason] = useState(null);
  const [momMode, setMomMode] = useState('single');
  const [momHover, setMomHover] = useState(null);
  const [ovHover, setOvHover] = useState(null);
  const [distHover, setDistHover] = useState(null);
  const [momRef, momW] = useWidth(1000);
  const momNum = momSeason || (seasonsPlayed.length ? seasonsPlayed[seasonsPlayed.length - 1].num : null);
  const momList = matches.filter((m) => m.season === momNum);

  // highs & lows
  const byMargin = (arr, key) => [...arr].sort(key);
  const wins = byMargin(matches.filter((m) => m.res === 'W'), (a, b) => (b.f - b.a) - (a.f - a.a) || b.f - a.f).slice(0, 4);
  const defeats = byMargin(matches.filter((m) => m.res === 'L'), (a, b) => (b.a - b.f) - (a.a - a.f) || b.a - a.a).slice(0, 4);
  const draws = byMargin(matches.filter((m) => m.res === 'D'), (a, b) => b.f - a.f).slice(0, 4);
    const scorelines = useMemo(() => { const c = {}; matches.forEach((m) => { const k = `${m.f}-${m.a}`; c[k] = (c[k] || 0) + 1; }); return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 4); }, [matches]);
  const cs = matches.filter((m) => m.a === 0).length, fts = matches.filter((m) => m.f === 0).length;
  const longestRun = (ok) => { let best = null, cur = []; matches.forEach((m) => { if (ok(m)) { cur.push(m); if (!best || cur.length > best.length) best = [...cur]; } else cur = []; }); return best || []; };
  const csRun = longestRun((m) => m.a === 0), ftsRun = longestRun((m) => m.f === 0);
  const csBySeason = seasonsPlayed.map((s) => ({ s, n: matches.filter((m) => m.season === s.num && m.a === 0).length })).sort((a, b) => b.n - a.n)[0];
  const runSpan = (l) => (l.length ? `S${l[0].season} MD${l[0].md} → S${l[l.length - 1].season} MD${l[l.length - 1].md}` : '');
  // Biggest scalps: wins over the best-ranked opponents (lowest average rank), then by margin
  const scalps = matches.filter((m) => m.res === 'W' && avgRank.get(m.opp) > 0).sort((a, b) => avgRank.get(a.opp) - avgRank.get(b.opp) || (b.f - b.a) - (a.f - a.a) || b.f - a.f).filter((m, i, arr) => arr.findIndex((x) => x.opp === m.opp) === i).slice(0, 4);

  // streaks
  const [streakType, setStreakType] = useState('unbeaten');
  const [openStreak, setOpenStreak] = useState(null);
  const winRuns = useMemo(() => runsOf(matches, (r) => r === 'W'), [matches]);
  const unbRuns = useMemo(() => runsOf(matches, (r) => r !== 'L'), [matches]);
  const lastRun = (runs) => { const last = runs[runs.length - 1]; return last && !last.end ? last.list.length : 0; };
  const best = (runs) => runs.reduce((b, r) => (!b || r.list.length > b.list.length ? r : b), null);
  const runRows = useMemo(() => (streakType === 'winning' ? winRuns : unbRuns).filter((r) => r.list.length >= 2).map((r, i) => {
    const L_ = r.list, w = L_.filter((m) => m.res === 'W').length;
    return { ...r, id: `${streakType}-${i}`, len: L_.length, w, d: L_.length - w, pts: w * 3 + (L_.length - w), gf: L_.reduce((t, m) => t + m.f, 0), ga: L_.reduce((t, m) => t + m.a, 0), cs: L_.filter((m) => m.a === 0).length, start: L_[0].season * 100 + L_[0].md };
  }), [streakType, winRuns, unbRuns]);
  const [runs, runHead] = useSort(runRows, 'len', 'desc', { gd: (r) => r.gf - r.ga });
  const span = (r) => `S${r.list[0].season} MD${r.list[0].md} → S${r.list[r.list.length - 1].season} MD${r.list[r.list.length - 1].md}`;

  // dropped points
  const [dropView, setDropView] = useState('opponent');
  const [dropSearch, setDropSearch] = useState('');
  const [dropAll, setDropAll] = useState(false);
  const dropped = useMemo(() => {
    const m = new Map();
    matches.forEach((x) => {
      if (!m.has(x.opp)) m.set(x.opp, { opp: x.opp, name: x.oppName, flag: x.oppFlag, gp: 0, w: 0, d: 0, l: 0, drop: 0, h: 0, a: 0, last: null, per: {} });
      const o = m.get(x.opp);
      o.gp++; o[x.res.toLowerCase()]++;
      const pts = x.res === 'D' ? 2 : x.res === 'L' ? 3 : 0;
      if (pts) { o.drop += pts; o[x.venue === 'H' ? 'h' : 'a'] += pts; o.last = x; o.per[x.season] = (o.per[x.season] || 0) + pts; }
    });
    return [...m.values()].filter((o) => o.drop > 0).sort((a, b) => b.drop - a.drop || a.name.localeCompare(b.name));
  }, [matches]);
  const totDrop = dropped.reduce((t, o) => t + o.drop, 0);
  const dropRows = dropped.filter((o) => !dropSearch || String(o.name).toLowerCase().includes(dropSearch.toLowerCase()));
  const bySeason = seasonsPlayed.map((s) => {
    const ms = matches.filter((m) => m.season === s.num);
    const dd = ms.filter((m) => m.res === 'D').length, ll = ms.filter((m) => m.res === 'L').length;
    const against = new Map();
    ms.filter((m) => m.res !== 'W').forEach((m) => { if (!against.has(m.opp)) against.set(m.opp, { m, pts: 0, d: 0, l: 0 }); const a = against.get(m.opp); a.pts += m.res === 'D' ? 2 : 3; a[m.res === 'D' ? 'd' : 'l']++; });
    return { s, num: s.num, drop: dd * 2 + ll * 3, d: dd, l: ll, max: ms.length * 3, against: [...against.values()].sort((a, b) => b.pts - a.pts || a.m.opp.localeCompare(b.m.opp)) };
  });
  const [dropSorted, dropHead] = useSort(dropRows, 'drop', 'desc', { name: (o) => String(o.name), pts: (o) => o.w * 3 + o.d });
  const [seasonSorted, seasonHead] = useSort(bySeason, 'num', 'asc');

  const recordCard = (title, hero, rest, res) => hero && (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
      <div className={`${EB} text-slate-500`}>{title}</div>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2"><Flag emoji={hero.oppFlag} size={22} /><span className="text-base font-semibold text-slate-900 truncate">{String(hero.oppName || '').toUpperCase()}</span></div>
          <div className="text-xs text-slate-500 mt-1">Season {hero.season} · MD {hero.md} · {hero.venue === 'H' ? 'Home' : 'Away'}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0"><Chip r={res} /><span className={`text-4xl leading-none ${TYPE.big} text-slate-900`}><Score a={hero.f} b={hero.a} /></span></div>
      </div>
      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
        {rest.map((m, i) => (
          <div key={i} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 min-w-0"><Flag emoji={m.oppFlag} size={18} /><span className="text-[13px] font-medium text-slate-700 truncate">{String(m.oppName || '').toUpperCase()}</span><span className="text-xs text-slate-400 whitespace-nowrap">S{m.season} · MD{m.md} · {m.venue}</span></span>
            <span className="font-semibold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span>
          </div>
        ))}
      </div>
    </div>
  );

  const rlist = (title, total, rows, cls) => (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between"><span className={`${TYPE.card} text-slate-900`}>{title}</span><span className="text-sm font-medium text-slate-500 tabular-nums">{total}</span></div>
      {rows.map(([lab, v]) => (
        <div key={lab} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm"><span className="font-medium text-slate-700">{lab}</span><span className="tabular-nums"><span className="font-semibold text-slate-900">{v}</span><span className="text-slate-500 ml-2">{total ? ((v / total) * 100).toFixed(1) : '0.0'}%</span></span></div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full rounded-full ${cls}`} style={{ width: `${(v / lists.max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );

  // momentum chart geometry
  const MW = 1000, MH = 220, mid = 130, msc = 18;
  const mn = momList.length || 1;
  const mavg = momList.map((_, i) => { const sl = momList.slice(Math.max(0, i - 4), i + 1); return sl.reduce((t, m) => t + (m.f - m.a), 0) / sl.length; });
  const mpts = mavg.map((a, i) => [(i * MW) / mn + MW / mn / 2, mid - a * msc]);

  return (
    <div className="space-y-6">
      {/* Outcomes as the tab's Highlights bar (R5) */}
      <HighlightsBar accent={accent} columns={4}>
        <HighlightCard label="Played" value={String(n)} valueClassName="text-2xl sm:text-3xl" left={`${seasonsPlayed.length} seasons`} />
        <HighlightCard label="Wins" value={String(W)} valueClassName="text-2xl sm:text-3xl" left={`${pct(W)}%`} leftClassName="text-emerald-700" />
        <HighlightCard label="Draws" value={String(D)} valueClassName="text-2xl sm:text-3xl" left={`${pct(D)}%`} leftClassName="text-amber-700" />
        <HighlightCard label="Losses" value={String(L)} valueClassName="text-2xl sm:text-3xl" left={`${pct(L)}%`} leftClassName="text-rose-700" />
        <div className="col-span-full h-2.5 rounded-full overflow-hidden flex" aria-hidden="true">
          <div className="bg-emerald-500" style={{ width: `${pct(W)}%` }} /><div className="bg-amber-400" style={{ width: `${pct(D)}%` }} /><div className="bg-rose-500" style={{ width: `${pct(L)}%` }} />
        </div>
      </HighlightsBar>

      {/* Margins: three lists on one scale (the largest row of all) */}
      <Section title="Margins" sub="How wins, draws and losses were decided.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rlist('Wins by margin', W, lists.wins, 'bg-emerald-500')}
          {rlist('Draws by score', D, lists.draws, 'bg-amber-400')}
          {rlist('Losses by margin', L, lists.losses, 'bg-rose-500')}
        </div>
      </Section>

      {/* Margin distribution: tonal stacked bars, GP and record per season */}
      <Section title="Margin distribution" sub="How each season’s results were decided, from the biggest wins to the heaviest losses."
>
        <div className="flex flex-wrap gap-6 text-xs">
          {[['Wins · 4+ → 1', ['w4', 'w3', 'w2', 'w1']], ['Draws · 3+ → 0–0', ['d3', 'd2', 'd1', 'd0']], ['Losses · 1 → 4+', ['l1', 'l2', 'l3', 'l4']]].map(([lab, keys]) => (
            <div key={lab} className="flex items-center gap-2"><span className={`${EB} text-slate-500`}>{lab}</span><span className="flex">{keys.map((k) => <span key={k} className="w-6 h-3" style={{ background: TIERS.find((t) => t[0] === k)[2] }} />)}</span></div>
          ))}
        </div>
        
          <div className="flex flex-col gap-2">
            <div className={`hidden sm:flex items-center gap-4 ${EB} text-slate-500`}><span className="w-24" /><span className="flex-1" /><span className="w-10 text-right">GP</span><span className="w-24">Record</span></div>
            {dist.map((r) => (
              <div key={r.s.num} className="flex items-center gap-3 sm:gap-4">
                <span className="w-16 sm:w-24 shrink-0 text-sm font-semibold text-slate-900">S{r.s.num} <span className="hidden sm:inline text-xs font-medium text-slate-500">{yearLabel(r.s.year)}</span></span>
                <div className="flex-1 h-6 rounded-md overflow-hidden flex">
                  {TIERS.filter((t) => r.counts[t[0]]).map((t) => (
                    <div key={t[0]} onPointerMove={(e) => setDistHover({ s: r.s.num, t, at: pointAt(e) })} onPointerLeave={leaveUnlessTouch(setDistHover)} className={`h-full flex items-center justify-center text-[11px] font-semibold cursor-default ${distHover && (distHover.s !== r.s.num || distHover.t[0] !== t[0]) ? 'opacity-60' : ''}`} style={{ width: `${(r.counts[t[0]] / r.gp) * 100}%`, background: t[2], color: t[3] }}>{r.counts[t[0]] >= 2 ? r.counts[t[0]] : ''}</div>
                  ))}
                </div>
                <span className="hidden sm:block w-10 text-right text-sm font-medium tabular-nums text-slate-500">{r.gp}</span>
                <span className="hidden sm:block w-24 text-sm font-semibold tabular-nums"><WDLRecord w={r.w} d={r.d} l={r.l} /></span>
              </div>
            ))}
          </div>

      </Section>

      {distHover && (() => { const list = matches.filter((m) => m.season === distHover.s && tierOf(m) === distHover.t[0]); const gp = matches.filter((m) => m.season === distHover.s).length; return (
        <FloatCard at={distHover.at} width={280}>
          <span className="flex items-center justify-between"><span className="text-sm font-extrabold text-slate-900">S{distHover.s} · {distHover.t[1]}</span><span className="w-3 h-3 rounded-sm" style={{ background: distHover.t[2] }} /></span>
          <span className="text-xs text-slate-500">{list.length} of {gp} matches · {((list.length / gp) * 100).toFixed(0)}%</span>
          <span className="flex flex-col gap-1 pt-1 border-t border-slate-100">{list.slice(0, 6).map((m, i) => <span key={i} className="flex items-center gap-2 text-xs"><span className="w-12 shrink-0 whitespace-nowrap font-semibold text-slate-400 tabular-nums">MD {m.md}</span><span className="w-3 text-slate-400">{m.venue}</span><Flag emoji={m.oppFlag} size={16} /><span className="flex-1 font-semibold text-slate-700 truncate">{String(m.oppName || '').toUpperCase()}</span><span className="font-extrabold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span></span>)}{list.length > 6 && <span className="text-[11px] text-slate-400">+{list.length - 6} more</span>}</span>
        </FloatCard>
      ); })()}

      {/* Momentum pulse: goal difference per match (one season) or each season's 5-game average (overlay) */}
      <Section title="Momentum pulse" sub={momMode === 'single' ? `Goal difference match by match, Season ${momNum || '–'}, with a 5-game average.` : 'Each season’s 5-game goal-difference average, laid over each other.'}
        right={<div className="flex flex-wrap items-center gap-2"><Segmented value={momMode} onChange={(v) => { setMomMode(v); setMomHover(null); setOvHover(null); }} options={[{ value: 'single', label: 'One season' }, { value: 'overlay', label: 'Overlay' }]} />{momMode === 'single' && <Segmented value={String(momNum)} onChange={(v) => setMomSeason(Number(v))} options={seasonsPlayed.map((s) => ({ value: String(s.num), label: `S${s.num}` }))} />}</div>}>
        {momMode === 'single' ? (
          <div className="flex flex-wrap gap-5 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500" />Win</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400" />Draw</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-rose-500" />Loss</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-5 border-t-2 border-slate-900" />5-game average</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">{seasonsPlayed.map((s) => <span key={s.num} className="inline-flex items-center gap-1.5"><span className="w-4 h-0.5 rounded" style={{ background: seasonHex(s.num) }} />S{s.num}</span>)}</div>
        )}
        <div ref={momRef} className="w-full">
          {(() => {
            const MW = Math.max(320, momW - 44), MH = 220, mid = 130, msc = 18;
            const avgOf = (list) => list.map((_, i) => { const sl = list.slice(Math.max(0, i - 4), i + 1); return sl.reduce((t, m) => t + (m.f - m.a), 0) / sl.length; });
            const grid = [-2, 0, 2, 4, 6].map((g) => <g key={g}><line x1="0" x2={MW} y1={mid - g * msc} y2={mid - g * msc} stroke="rgb(var(--c-slate-200))" strokeDasharray={g ? '3 3' : undefined} /><text x="-8" y={mid - g * msc + 4} fontSize="11" textAnchor="end" fill="rgb(var(--c-slate-500))">{signed(g)}</text></g>);
            if (momMode === 'overlay') {
              const maxN = Math.max(1, ...seasonsPlayed.map((s) => matches.filter((m) => m.season === s.num).length));
              const series = seasonsPlayed.map((s) => { const list = matches.filter((m) => m.season === s.num); return { s, list, av: avgOf(list) }; });
              const step = MW / maxN;
              return (
                <svg width={momW} height={MH} viewBox={`-34 0 ${MW + 44} ${MH}`} style={{ touchAction: 'pan-y' }}
                  onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * (MW + 44) - 34; const i = Math.max(0, Math.min(maxN - 1, Math.floor(x / step))); setOvHover({ i, at: pointAt(e), series }); }}
                  onPointerLeave={leaveUnlessTouch(setOvHover)}>
                  {grid}
                  {ovHover && <line x1={ovHover.i * step + step / 2} x2={ovHover.i * step + step / 2} y1="10" y2={MH - 10} stroke="rgb(var(--c-slate-900))" strokeOpacity="0.35" />}
                  {ovHover && series.filter((x) => x.av[ovHover.i] != null).map((x) => <circle key={x.s.num} cx={ovHover.i * step + step / 2} cy={mid - x.av[ovHover.i] * msc} r="3.5" fill={seasonHex(x.s.num)} stroke="#fff" strokeWidth="1.2" />)}
                  {seasonsPlayed.map((s) => { const list = matches.filter((m) => m.season === s.num); const av = avgOf(list); const pts = av.map((a, i) => `${(i * MW) / maxN + MW / maxN / 2},${mid - a * msc}`).join(' '); return <g key={s.num}><polyline points={pts} fill="none" stroke={seasonHex(s.num)} strokeWidth="2" strokeLinejoin="round" opacity="0.9" /><text x={((av.length - 1) * MW) / maxN + MW / maxN / 2 + 6} y={mid - av[av.length - 1] * msc + 4} fontSize="11" fontWeight="700" fill={seasonHex(s.num)}>S{s.num}</text></g>; })}
                </svg>
              );
            }
            const mn = momList.length || 1, mavg = avgOf(momList);
            const mpts = mavg.map((a, i) => [(i * MW) / mn + MW / mn / 2, mid - a * msc]);
            return (
              <svg width={momW} height={MH} viewBox={`-34 0 ${MW + 44} ${MH}`} style={{ touchAction: 'pan-y' }} onPointerLeave={leaveUnlessTouch(setMomHover)}>
                {grid}
                {momList.map((m, i) => {
                  const v = m.f - m.a, bw = (MW / mn) * 0.62;
                  return (
                    <g key={i} onPointerMove={(e) => setMomHover({ i, at: pointAt(e) })}>
                      <rect x={(i * MW) / mn} y="0" width={MW / mn} height={MH} fill="transparent" />
                      <rect x={(i * MW) / mn + (MW / mn - bw) / 2} y={v > 0 ? mid - v * msc : mid} width={bw} height={v ? Math.abs(v) * msc : 3} rx="2" fill={v > 0 ? '#10b981' : v < 0 ? '#f43f5e' : '#fbbf24'} opacity={!momHover || momHover.i === i ? 1 : 0.5} />
                    </g>
                  );
                })}
                {mpts.length > 1 && <polyline points={mpts.slice(0, 5).map((p) => p.join(',')).join(' ')} fill="none" stroke="rgb(var(--c-slate-900))" strokeWidth="2" strokeDasharray="4 4" pointerEvents="none" />}
                {mpts.length > 4 && <polyline points={mpts.slice(4).map((p) => p.join(',')).join(' ')} fill="none" stroke="rgb(var(--c-slate-900))" strokeWidth="2" strokeLinejoin="round" pointerEvents="none" />}
              </svg>
            );
          })()}
        </div>
        {momMode === 'overlay' && ovHover && (() => {
          const rows = ovHover.series.filter((x) => x.av[ovHover.i] != null).map((x) => ({ s: x.s, v: x.av[ovHover.i], prev: ovHover.i > 0 ? x.av[ovHover.i - 1] : null, m: x.list[ovHover.i] }));
          const order = rows.map((r) => r.v).sort((a, b) => b - a);
          const rk = (v) => `${order.filter((x) => Math.abs(x - v) < 1e-9).length > 1 ? '=' : ''}${ORD(order.findIndex((x) => Math.abs(x - v) < 1e-9) + 1)}`;
          const best = order[0];
          const fmt1 = (v) => signed(v, 1);
          return (
            <FloatCard at={ovHover.at} width={400} beside>
              <div className="flex items-baseline justify-between gap-3"><span className="text-sm font-extrabold text-slate-900">MD {ovHover.i + 1}</span><span className={`${EB} text-slate-400`}>Line · change · rank · result</span></div>
              {rows.map((r) => (
                <div key={r.s.num} className={`flex items-center gap-2 py-0.5 ${Math.abs(r.v - best) < 1e-9 ? 'bg-amber-50 -mx-2 px-2 rounded' : ''}`}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: seasonHex(r.s.num) }} /><span className="text-xs font-extrabold text-slate-900 w-6">S{r.s.num}</span>
                  <span className={`w-11 text-right text-sm font-extrabold tabular-nums ${r.v > 0 ? 'text-emerald-700' : r.v < 0 ? 'text-rose-700' : 'text-slate-500'}`}>{fmt1(r.v)}</span>
                  <span className="w-11 text-right text-[11px] font-semibold tabular-nums text-slate-400">{r.prev == null ? '' : `${r.v - r.prev >= 0 ? '▲' : '▼'}${Math.abs(r.v - r.prev).toFixed(1)}`}</span>
                  <span className="w-9 text-right text-[11px] font-semibold text-slate-600">{rk(r.v)}</span>
                  {r.m && <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap"><Flag emoji={r.m.oppFlag} size={16} /><span className="w-10 text-[11px] font-semibold text-slate-700">{r.m.opp}</span><Chip r={r.m.res} /><span className="w-9 text-right text-xs font-semibold tabular-nums"><Score a={r.m.f} b={r.m.a} /></span></span>}
                </div>
              ))}
              <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-500">Line: the 5-game average goal difference plotted on the chart at this matchday.</div>
            </FloatCard>
          );
        })()}
        {momMode === 'single' && momHover && momList[momHover.i] && (
          <FloatCard at={momHover.at}>
            <span className={`${EB} text-slate-500`}>S{momNum} · MD {momList[momHover.i].md} · {momList[momHover.i].venue === 'H' ? 'Home' : 'Away'}</span>
            <MatchLine m={momList[momHover.i]} className="justify-between" />
            <span className="flex justify-between text-xs text-slate-500"><span>GD {signed(momList[momHover.i].f - momList[momHover.i].a)}</span><span>5-game average {(() => { const sl = momList.slice(Math.max(0, momHover.i - 4), momHover.i + 1); const v = sl.reduce((t, m) => t + (m.f - m.a), 0) / sl.length; return signed(v, 1); })()}</span></span>
          </FloatCard>
        )}
      </Section>

      {/* Highs & lows: six neutral record cards, colour only in the result chip */}
      <Section title="Highs & lows" sub={`The extremes of ${n} league matches.`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {recordCard('Biggest wins', wins[0], wins.slice(1), 'W')}
          {recordCard('Heaviest defeats', defeats[0], defeats.slice(1), 'L')}
          {recordCard('Highest-scoring draws', draws[0], draws.slice(1), 'D')}
          {scalps.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
              <div className={`${EB} text-slate-500`}>Biggest wins vs top teams</div>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2"><Flag emoji={scalps[0].oppFlag} size={22} /><span className="text-base font-semibold text-slate-900 truncate">{String(scalps[0].oppName || '').toUpperCase()}</span><span className="text-[11px] font-semibold rounded px-1.5 py-0.5 bg-slate-100 text-slate-600 whitespace-nowrap">Avg rank {avgRank.get(scalps[0].opp).toFixed(1)}</span></div>
                  <div className="text-xs text-slate-500 mt-1">Season {scalps[0].season} · MD {scalps[0].md} · {scalps[0].venue === 'H' ? 'Home' : 'Away'}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0"><Chip r="W" /><span className={`text-4xl leading-none ${TYPE.big} text-slate-900`}><Score a={scalps[0].f} b={scalps[0].a} /></span></div>
              </div>
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                {scalps.slice(1).map((m, i) => <div key={i} className="flex items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2 min-w-0"><Flag emoji={m.oppFlag} size={18} /><span className="text-[13px] font-medium text-slate-700 truncate">{String(m.oppName || '').toUpperCase()}</span><span className="text-[11px] font-semibold text-slate-500 tabular-nums whitespace-nowrap">rank {avgRank.get(m.opp).toFixed(1)}</span></span><span className="font-semibold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span></div>)}
              </div>
            </div>
          )}
          {scorelines.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
              <div className={`${EB} text-slate-500`}>Most common scores</div>
              <div className="flex items-center justify-between"><span className={`text-4xl leading-none ${TYPE.big} text-slate-900`}><Score a={scorelines[0][0].split('-')[0]} b={scorelines[0][0].split('-')[1]} /></span><span className="text-sm font-semibold text-slate-900">{scorelines[0][1]} times · {((scorelines[0][1] / n) * 100).toFixed(1)}%</span></div>
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">{scorelines.slice(1).map(([k, v]) => <div key={k} className="flex justify-between text-sm"><span className="font-semibold tabular-nums text-slate-900"><Score a={k.split('-')[0]} b={k.split('-')[1]} /></span><span className="text-slate-500 tabular-nums">{v} times</span></div>)}</div>
            </div>
          )}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
            <div className={`${EB} text-slate-500`}>Clean sheets and blanks</div>
            <div className="flex items-end justify-between gap-3">
              <div><div className={`text-4xl leading-none ${TYPE.big} text-slate-900`}>{cs}</div><div className="text-xs text-slate-500 mt-1">clean sheets · {n ? ((cs / n) * 100).toFixed(1) : 0}%</div></div>
              <div className="text-right"><div className={`text-2xl leading-none ${TYPE.big} text-slate-900`}>{fts}</div><div className="text-xs text-slate-500 mt-1">failed to score · {n ? ((fts / n) * 100).toFixed(1) : 0}%</div></div>
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 text-sm">
              <div className="flex justify-between gap-3"><span className="text-slate-700">Longest run of clean sheets</span><span className="font-semibold tabular-nums text-slate-900">{csRun.length} <span className="text-xs font-medium text-slate-400">{runSpan(csRun)}</span></span></div>
              {csBySeason && <div className="flex justify-between gap-3"><span className="text-slate-700">Most in a season</span><span className="font-semibold tabular-nums text-slate-900">{csBySeason.n} <span className="text-xs font-medium text-slate-400">S{csBySeason.s.num}</span></span></div>}
              <div className="flex justify-between gap-3"><span className="text-slate-700">Longest run without scoring</span><span className="font-semibold tabular-nums text-slate-900">{ftsRun.length} <span className="text-xs font-medium text-slate-400">{runSpan(ftsRun)}</span></span></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Streaks: current and record on one card each; sortable table with pulse and drawer */}
      <Section title="Streaks" sub="Winning and unbeaten runs across all seasons, longest first.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(() => { const r = best(winRuns); return <StreakCard title="Winning streak" current={lastRun(winRuns)} record={r ? r.list.length : 0} color="#10b981" track="rgb(var(--c-emerald-100))" line={lastRun(winRuns) ? `${lastRun(winRuns)} in a row` : 'No win in the last match'} recLine={r ? span(r) : ''} />; })()}
          {(() => { const r = best(unbRuns); const c = lastRun(unbRuns); return <StreakCard title="Unbeaten run" current={c} record={r ? r.list.length : 0} color="#f59e0b" track="rgb(var(--c-amber-100))" line={c ? `Unbeaten in ${c}` : 'Lost the last match'} recLine={r ? span(r) : ''} />; })()}
        </div>
        <Segmented value={streakType} onChange={(v) => { setStreakType(v); setOpenStreak(null); }} options={[{ value: 'winning', label: 'Winning streaks', tone: 'win' }, { value: 'unbeaten', label: 'Unbeaten runs', tone: 'draw' }]} />
        <div className="rounded-xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[1240px]">
            <div className="grid grid-cols-[28px_84px_176px_104px_80px_118px_56px_150px_minmax(330px,1fr)_20px] gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200">
              <span className={`${EB} text-slate-500`}>#</span>{runHead('len', 'Length')}{runHead('start', 'From → to', 'left', 'asc')}<span className={`${EB} text-slate-500`}>Record</span>{runHead('pts', 'Points')}{runHead('gd', 'Goals · GD')}{runHead('cs', 'CS', 'center')}<span className={`${EB} text-slate-500`}>Ended by</span><span className={`${EB} text-slate-500`}>Pulse</span><span />
            </div>
            {runs.slice(0, 10).map((r, i) => {
              const L_ = r.list;
              const open = openStreak === r.id;
              return (
                <React.Fragment key={r.id}>
                  <div onClick={() => setOpenStreak(open ? null : r.id)} className={`grid grid-cols-[28px_84px_176px_104px_80px_118px_56px_150px_minmax(330px,1fr)_20px] items-center gap-4 px-4 py-3 border-b border-slate-100 cursor-pointer ${open ? 'bg-indigo-50/40' : 'bg-white even:bg-slate-50/50 hover:bg-slate-50'}`}>
                    <span className="text-sm font-semibold text-slate-400 tabular-nums">#{i + 1}</span>
                    <span className="flex items-baseline gap-1"><span className="text-lg font-extrabold tabular-nums text-slate-900">{r.len}</span><span className="text-xs text-slate-500">games</span></span>
                    <span className="text-sm text-slate-700 tabular-nums">{span(r)}</span>
                    <span className="text-sm font-semibold tabular-nums"><WDLRecord w={r.w} d={r.d} l={0} /></span>
                    <span className="text-sm tabular-nums text-slate-900">{r.pts}<span className="text-slate-400">/{r.len * 3}</span></span>
                    <span className="text-sm tabular-nums text-slate-900 whitespace-nowrap"><Score a={r.gf} b={r.ga} /> <span className="text-emerald-700 text-xs font-semibold">{signed(r.gf - r.ga)}</span></span>
                    <span className="text-sm tabular-nums text-slate-600 text-center">{r.cs}</span>
                    <span className="text-sm min-w-0">{r.end ? <span className="flex items-center gap-2 whitespace-nowrap" title={r.end.oppName}><Flag emoji={r.end.oppFlag} size={18} /><span className="w-10 text-[13px] font-semibold text-slate-700">{r.end.opp}</span><Chip r={r.end.res} /><span className="text-sm font-semibold tabular-nums text-slate-900"><Score a={r.end.f} b={r.end.a} /></span></span> : <span className="text-xs font-semibold text-emerald-700">Still going</span>}</span>
                    <span onClick={(e) => e.stopPropagation()}><Pulse list={L_} /></span>
                    <Chev open={open} />
                  </div>
                  {open && (
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                      <div className={`${EB} text-slate-500 mb-2`}>All {L_.length} matches · oldest first</div>
                      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-12">
                        {L_.map((m, k) => (
                          <React.Fragment key={k}>
                            {(k === 0 || L_[k - 1].season !== m.season) && (() => { const ss = L_.filter((x) => x.season === m.season); const sw = ss.filter((x) => x.res === 'W').length; return <div className="break-inside-avoid flex items-baseline justify-between pt-2 pb-1 w-[236px]"><span className="text-sm font-extrabold text-slate-900">Season {m.season}</span><span className="text-xs font-semibold tabular-nums"><WDLRecord w={sw} d={ss.length - sw} l={0} /></span></div>; })()}
                            <div className="break-inside-avoid flex items-center gap-2 py-1.5 border-b border-slate-100 w-[236px]" title={m.oppName}>
                              <span className="w-11 shrink-0 text-[11px] font-semibold text-slate-400 tabular-nums whitespace-nowrap">MD {m.md}</span>
                              <span className="w-3 shrink-0 text-[11px] font-medium text-slate-400">{m.venue}</span>
                              <span className="flex items-center gap-2 w-[76px] shrink-0"><Flag emoji={m.oppFlag} size={18} /><span className="text-[13px] font-semibold text-slate-700">{m.opp}</span></span>
                              <Chip r={m.res} />
                              <span className="w-10 text-right text-sm font-extrabold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Dropped points: neutral cards; sortable tables by opponent or by season */}
      <Section title="Dropped points" sub="Where the points went."
        right={<Segmented value={dropView} onChange={setDropView} options={[{ value: 'opponent', label: 'By opponent' }, { value: 'season', label: 'By season' }]} />}>
        <SectionStats columns={4} items={[
          { label: 'Points dropped', value: <>{totDrop} <span className="text-sm font-medium text-slate-500">of {n * 3}</span></>, line: <span>From {D + L} draws and defeats</span> },
          { label: 'From draws', value: <>{D * 2} <span className="text-sm font-medium text-slate-500">pts</span></>, line: <span>{D} draws, 2 each</span> },
          { label: 'From defeats', value: <>{L * 3} <span className="text-sm font-medium text-slate-500">pts</span></>, line: <span>{L} defeats, 3 each</span> },
          dropped[0] && { label: 'Most dropped against', value: <span className="inline-flex items-center gap-2"><Flag emoji={dropped[0].flag} size={22} />{String(dropped[0].name || '').toUpperCase()}</span>, valueClassName: 'text-slate-900 !text-xl', line: <span>{dropped[0].drop} pts dropped in {dropped[0].gp} matches</span> },
        ]} />
        {dropView === 'opponent' ? (
          <>
            <div className="relative max-w-xs"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={dropSearch} onChange={(e) => setDropSearch(e.target.value)} placeholder="Search opponent..." className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-sm" /></div>
            <div className="rounded-xl border border-slate-200 overflow-x-auto">
              <div className="min-w-[1180px]">
                <div className="grid grid-cols-[28px_minmax(190px,1.3fr)_32px_88px_60px_64px_64px_120px_minmax(150px,0.9fr)_minmax(150px,1.1fr)] gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <span className={`${EB} text-slate-500`}>#</span>{dropHead('name', 'Opponent · Avg rank', 'left', 'asc')}{dropHead('gp', 'GP', 'right')}<span className={`${EB} text-slate-500`}>Record</span>{dropHead('pts', 'Pts', 'right')}{dropHead('drop', 'Dropped', 'right')}<span className={`${EB} text-slate-500`}>How</span>{dropHead('h', 'Home · Away')}<span className={`${EB} text-slate-500`}>Last dropped</span><span className={`${EB} text-slate-500`}>By season</span>
                </div>
                {dropSorted.slice(0, dropAll || dropSearch ? dropSorted.length : 12).map((o, i) => {
                  const avg = avgRank.get(o.opp);
                  return (
                    <div key={o.opp} className="grid grid-cols-[28px_minmax(190px,1.3fr)_32px_88px_60px_64px_64px_120px_minmax(150px,0.9fr)_minmax(150px,1.1fr)] items-center gap-3 px-4 py-3 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0">
                      <span className="text-xs font-semibold text-slate-400 tabular-nums">#{i + 1}</span>
                      <span className="flex items-center gap-2.5 min-w-0"><Flag emoji={o.flag} size={22} /><span className="text-sm font-semibold text-slate-900 truncate">{String(o.name || '').toUpperCase()}</span>{avg > 0 && <span className="text-xs font-semibold text-slate-400 tabular-nums">{avg.toFixed(1)}</span>}</span>
                      <span className="text-sm text-slate-500 tabular-nums text-right">{o.gp}</span>
                      <span className="text-sm font-semibold tabular-nums"><WDLRecord w={o.w} d={o.d} l={o.l} /></span>
                      <span className="text-sm tabular-nums text-slate-900 text-right">{o.w * 3 + o.d}<span className="text-slate-400">/{o.gp * 3}</span></span>
                      <span className="text-sm font-semibold tabular-nums text-rose-700 text-right">−{o.drop}</span>
                      <span className="text-xs font-medium text-slate-500">{[o.d ? `${o.d} D` : '', o.l ? `${o.l} L` : ''].filter(Boolean).join(' · ')}</span>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold tabular-nums"><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[rgb(var(--c-home))]" />H −{o.h}</span><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[rgb(var(--c-away))]" />A −{o.a}</span></span>
                      <span className="flex items-center gap-2 whitespace-nowrap">{o.last && <><Chip r={o.last.res} /><span className="text-sm font-semibold tabular-nums"><Score a={o.last.f} b={o.last.a} /></span><span className="text-xs text-slate-400">S{o.last.season} MD{o.last.md} · {o.last.venue === 'H' ? 'Home' : 'Away'}</span></>}</span>
                      <span className="flex flex-wrap gap-1">{Object.entries(o.per).sort((a, b) => a[0] - b[0]).map(([s2, v]) => <span key={s2} className="text-[11px] font-semibold tabular-nums rounded px-1.5 py-0.5 bg-slate-100 text-slate-600 whitespace-nowrap">S{s2} <span className="text-rose-700">−{v}</span></span>)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {!dropSearch && dropRows.length > 12 && <button type="button" onClick={() => setDropAll(!dropAll)} className="self-start text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">{dropAll ? 'Show fewer' : `Show all ${dropRows.length} opponents`} <Chev open={dropAll} /></button>}
          </>
        ) : (
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[96px_200px_minmax(0,1fr)_minmax(0,1fr)] gap-6 px-4 py-2 bg-slate-50 border-b border-slate-200">
                {seasonHead('num', 'Season', 'left', 'asc')}{seasonHead('drop', 'Dropped')}{seasonHead('d', 'Drawn with')}{seasonHead('l', 'Lost to')}
              </div>
              {seasonSorted.map((r) => {
                const dPts = r.d * 2, lPts = r.l * 3;
                const chip = (a, kind) => (
                  <span key={a.m.opp + kind} title={a.m.oppName} className={`inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 ring-1 whitespace-nowrap ${kind === 'D' ? 'bg-amber-50 ring-amber-200' : 'bg-rose-50 ring-rose-200'}`}>
                    <Flag emoji={a.m.oppFlag} size={16} /><span className={`text-[11px] font-semibold ${kind === 'D' ? 'text-amber-900' : 'text-rose-900'}`}>{a.m.opp}</span>{(kind === 'D' ? a.d : a.l) > 1 && <span className={`text-[11px] font-semibold ${kind === 'D' ? 'text-amber-700' : 'text-rose-700'}`}>×{kind === 'D' ? a.d : a.l}</span>}
                  </span>
                );
                return (
                  <div key={r.s.num} className="grid grid-cols-[96px_200px_minmax(0,1fr)_minmax(0,1fr)] items-start gap-6 px-4 py-3 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0">
                    <span className="text-sm font-semibold text-slate-900">S{r.s.num} <span className="text-xs font-medium text-slate-500">{divLabel(r.s.division)}</span></span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold tabular-nums text-slate-900">−{r.drop} <span className="text-slate-400 font-medium">of {r.max}</span></span>
                      <span className="h-2 rounded-full overflow-hidden flex bg-slate-100">{r.drop > 0 && <><span className="bg-amber-400" style={{ width: `${(dPts / r.drop) * 100}%` }} /><span className="bg-rose-500" style={{ width: `${(lPts / r.drop) * 100}%` }} /></>}</span>
                      <span className="flex justify-between text-[11px] font-semibold tabular-nums"><span className="text-amber-700">−{dPts} draws</span><span className="text-rose-700">−{lPts} defeats</span></span>
                    </span>
                    <span className="flex flex-col gap-1.5"><span className="text-[11px] font-semibold text-amber-700">{r.d} draw{r.d === 1 ? '' : 's'}</span><span className="flex flex-wrap gap-1.5">{r.against.filter((a) => a.d).map((a) => chip(a, 'D'))}</span></span>
                    <span className="flex flex-col gap-1.5"><span className="text-[11px] font-semibold text-rose-700">{r.l} defeat{r.l === 1 ? '' : 's'}</span><span className="flex flex-wrap gap-1.5">{r.against.filter((a) => a.l).map((a) => chip(a, 'L'))}</span></span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

// ═══ POINTS ═════════════════════════════════════════════════════════
const HEAT = [[1, '#065f46', '100%'], [0.75, '#10b981', '75–99%'], [0.5, '#a7f3d0', '50–74%'], [0.25, '#fbbf24', '25–49%'], [0, '#f43f5e', '<25%']];
const heat = (wp) => (HEAT.find((h) => wp >= h[0] - 1e-9) || HEAT[HEAT.length - 1])[1];
const AVG_C = '#94a3b8', REC_C = '#475569';

export function PointsTab({ seasons = [], accent = 'indigo' }) {
  const matches = useMatches(seasons);
  const played = seasons.filter((s) => s.gp > 0);
  const cum = useMemo(() => {
    const m = {};
    played.forEach((s) => { let t = 0; let g = 0; m[s.num] = matches.filter((x) => x.season === s.num).map((x) => ({ ...x, pts: (t += x.res === 'W' ? 3 : x.res === 'D' ? 1 : 0), cgd: (g += x.f - x.a) })); });
    return m;
  }, [matches, played]);
  const ppg = (s) => (s.gp ? s.pts / s.gp : 0);
  const bestSeason = played.reduce((b, s) => (!b || ppg(s) > ppg(b) ? s : b), null);
  const div1 = played.filter((s) => /1$/.test(String(s.division).trim()));
  const mostDiv1 = div1.reduce((b, s) => (!b || s.pts > b.pts ? s : b), null);
  const mostPts = played.reduce((b, s) => (!b || s.pts > b.pts ? s : b), null);
  const seals = played.filter((s) => s.position === 1 && s.winningMd).map((s) => ({ s, spare: s.gp - Number(String(s.winningMd).replace(/\D/g, '')) })).filter((x) => x.spare >= 0);
  const fastest = seals.reduce((b, x) => (!b || x.spare > b.spare ? x : b), null);
  const fastestSeasons = fastest ? seals.filter((x) => x.spare === fastest.spare).map((x) => `S${x.s.num}`).join(', ') : '';
  const totalPts = played.reduce((t, s) => t + s.pts, 0), totalGp = played.reduce((t, s) => t + s.gp, 0);
  const AVG = totalGp ? totalPts / totalGp : 0;
  const REC = bestSeason ? ppg(bestSeason) : 0;
  const recPtsSeason = mostPts;
  const avgPts = played.length ? totalPts / played.length : 0;

  // chart state
  const [mode, setMode] = useState('focus');
  const [div, setDiv] = useState('all');
  const latest = played.length ? played[played.length - 1].num : null;
  const [focusNum, setFocusNum] = useState(null);
  const focus = focusNum || latest;
  const [shown, setShown] = useState(null);
  const inDiv = (s) => div === 'all' || divLabel(s.division) === `Div ${div}`;
  const pool = played.filter(inDiv);
  const shownSet = shown || new Set(pool.map((s) => s.num));
  const [base, setBase] = useState('avg');
  // Last season: the one before the latest, or the latest completed one if the latest is still running
  const lastSeason = (() => { const l = played[played.length - 1]; if (!l) return null; if (!l.isComplete) return [...played].reverse().find((s) => s.isComplete && s.num !== l.num) || null; return played.length > 1 ? played[played.length - 2] : null; })();
  const LAST = lastSeason ? ppg(lastSeason) : AVG;
  const baseVal = base === 'rec' ? REC : base === 'last' ? LAST : AVG;
  const [hoverMd, setHoverMd] = useState(null);
  const [hoverAt, setHoverAt] = useState(null);
  // Season strip: on load and when the focused season changes, scroll the
  // strip (never the page) so the focused cell is fully in view, 16px in
  // from the edge it was hidden behind.
  const stripRef = useRef(null);
  useEffect(() => {
    const strip = stripRef.current;
    const cell = strip && strip.querySelector(`[data-season="${focus}"]`);
    if (!cell) return;
    const sb = strip.getBoundingClientRect(), cb = cell.getBoundingClientRect();
    if (cb.right > sb.right) strip.scrollLeft += cb.right - sb.right + 16;
    else if (cb.left < sb.left) strip.scrollLeft -= sb.left - cb.left + 16;
  }, [focus]);

  const maxMd = Math.max(38, ...pool.map((s) => s.gp));
  const [raceRef, raceW] = useWidth(1250);
  const phone = useScreen() === 'phone';
  // Right margin: room for the end labels (S1, S12…). Phones keep only the
  // longest label plus 6px; desktop keeps its 60px.
  const RM = phone ? 6 + 8 * (1 + String(Math.max(1, ...pool.map((s) => s.num))).length) : 60;
  // Matchday ticks from the data: 1, every 10, and each completed season's
  // length (a multiple of 10 within 4 of a season length is dropped).
  const lens = [...new Set(pool.filter((s) => s.isComplete).map((s) => s.gp))];
  if (!lens.includes(maxMd)) lens.push(maxMd);
  const mdTicks = [...new Set([1, ...Array.from({ length: Math.floor(maxMd / 10) }, (_, i) => (i + 1) * 10).filter((m) => !lens.some((l) => l !== m && Math.abs(l - m) <= 4)), ...lens])].filter((m) => m <= maxMd).sort((a, b) => a - b);
  const mdLabel = (m) => (phone ? `${m}` : `MD ${m}`);
  const W_ = Math.max(320, raceW), H_ = 360, X0 = 40, Y0 = 20, maxP = Math.max(120, Math.ceil((Math.max(0, ...pool.map((s) => s.pts)) + 5) / 20) * 20);
  const sx = (md) => X0 + ((md - 1) / (maxMd - 1)) * (W_ - X0 - RM);
  const sy = (p) => Y0 + (1 - p / maxP) * (H_ - Y0 - 30);
  const linesFor = (list) => list.filter((s) => cum[s.num]);

  const toggleSeason = (n) => {
    if (mode === 'focus') { setFocusNum(n); return; }
    const next = new Set(shownSet); next.has(n) ? next.delete(n) : next.add(n); setShown(next);
  };

  const Cell = ({ s }) => {
    const on = mode === 'focus' ? s.num === focus : shownSet.has(s.num);
    const sel = mode === 'focus' && s.num === focus;
    return (
      <button type="button" data-season={s.num} onClick={() => toggleSeason(s.num)} className={`w-[108px] shrink-0 text-left rounded-lg px-2.5 py-1.5 transition ${on ? (sel ? 'bg-white ring-2 ring-slate-900' : 'bg-slate-50 ring-1 ring-slate-200') : 'bg-white ring-1 ring-slate-100 opacity-45'}`} style={{ boxShadow: `inset 0 3px 0 ${seasonHex(s.num)}` }} aria-pressed={on}>
        <div className="flex items-center justify-between gap-1"><span className="text-xs font-extrabold text-slate-900">S{s.num} <span className="font-semibold text-slate-400">· {divLabel(s.division)}</span></span><span className={`w-3.5 h-3.5 rounded-[4px] inline-flex items-center justify-center ${on ? 'bg-slate-900' : 'ring-1 ring-slate-300'}`}>{on && <svg className="w-2.5 h-2.5 text-slate-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12l5 5 9-10" /></svg>}</span></div>
        <div className="flex items-baseline justify-between mt-1"><span className="text-base font-extrabold tabular-nums text-slate-900">{s.pts}</span><span className={`text-[11px] font-semibold tabular-nums ${bestSeason && s.num === bestSeason.num ? 'rounded px-1 -mx-1 bg-amber-100 ring-1 ring-amber-400 text-amber-900' : 'text-slate-500'}`}>{ppg(s).toFixed(2)}</span></div>
      </button>
    );
  };

  const axes = (
    <>
      {Array.from({ length: maxP / 20 + 1 }, (_, i) => i * 20).map((v) => <g key={v}><line x1={X0} x2={W_ - RM} y1={sy(v)} y2={sy(v)} stroke="rgb(var(--c-slate-200))" /><text x={X0 - 8} y={sy(v) + 4} fontSize="11" textAnchor="end" fill="rgb(var(--c-slate-500))">{v}</text></g>)}
      {mdTicks.map((m) => <text key={m} x={sx(m)} y={H_ - 8} fontSize="11" textAnchor="middle" fill="rgb(var(--c-slate-500))">{mdLabel(m)}</text>)}
    </>
  );
  const endLabels = (list) => {
    const ends = list.map((s) => ({ s, y: sy(s.pts), x: sx(cum[s.num].length) })).sort((a, b) => a.y - b.y);
    let last = -1e9;
    return ends.map(({ s, y, x }) => { const yy = Math.max(y, last + 13); last = yy; return <g key={s.num}><line x1={x + 3} y1={y} x2={W_ - RM + 2} y2={yy} stroke={seasonHex(s.num)} strokeWidth="1" opacity="0.5" /><text x={W_ - RM + 6} y={yy + 4} fontSize="11" fontWeight="700" fill={seasonHex(s.num)}>S{s.num}</text></g>; });
  };
  const hoverLayer = () => (
    <rect x={X0} y={Y0} width={W_ - RM - X0} height={H_ - Y0 - 30} fill="transparent" style={{ touchAction: 'pan-y' }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const md = Math.round(1 + ((e.clientX - r.left) / r.width) * (maxMd - 1)); setHoverMd(Math.max(1, Math.min(maxMd, md))); setHoverAt(pointAt(e)); }}
      onPointerLeave={(e) => { if (e.pointerType !== 'touch') { setHoverMd(null); setHoverAt(null); } }} />
  );


  let chart = null;
  if (mode === 'focus' && focus && cum[focus]) {
    const fs = played.find((s) => s.num === focus);
    const prior = played.filter((s) => s.num < focus);
    const recBefore = prior.reduce((b, s) => (!b || ppg(s) > ppg(b) ? s : b), null);
    const n = cum[focus].length;
    const tgt = recBefore ? (Number.isInteger(ppg(recBefore) * fs.gp) ? ppg(recBefore) * fs.gp + 1 : Math.ceil(ppg(recBefore) * fs.gp)) : null;
    chart = (
      <svg viewBox={`0 0 ${W_} ${H_}`} width="100%" height={H_} >
        {axes}
        {played.filter((s) => s.num !== focus && cum[s.num]).map((s) => <polyline key={s.num} points={cum[s.num].map((x, i) => `${sx(i + 1)},${sy(x.pts)}`).join(' ')} fill="none" stroke="rgb(var(--c-slate-300))" strokeWidth="1.5" opacity="0.7" />)}
        {recBefore && (() => { const ry = sy(ppg(recBefore) * fs.gp) - 6; const ly = sy(cum[focus][n - 1].pts) + 16; const clash = Math.abs(ry - ly) < 16; return <><line x1={sx(1)} y1={sy(ppg(recBefore))} x2={sx(fs.gp)} y2={sy(ppg(recBefore) * fs.gp)} stroke="rgb(var(--c-slate-900))" strokeWidth="1.5" strokeDasharray="6 5" /><text x={sx(fs.gp) + 120 > W_ ? sx(fs.gp) - 6 : sx(fs.gp) + 6} textAnchor={sx(fs.gp) + 120 > W_ ? 'end' : 'start'} y={clash ? Math.min(ry, ly) - 16 : ry} fontSize="11" fontWeight="600" fill="rgb(var(--c-slate-900))">Record pace · {tgt}</text></>; })()}
        <polyline points={cum[focus].map((x, i) => `${sx(i + 1)},${sy(x.pts)}`).join(' ')} fill="none" stroke={seasonHex(focus)} strokeWidth="2.5" strokeLinejoin="round" />
        {cum[focus].map((x, i) => x.res === 'D' ? <circle key={i} cx={sx(i + 1)} cy={sy(x.pts)} r="4.5" fill="#ffffff" stroke="#b45309" strokeWidth="2.2"><title>{`MD ${x.md} · ${x.oppName} ${x.f}–${x.a}`}</title></circle> : x.res === 'L' ? <circle key={i} cx={sx(i + 1)} cy={sy(x.pts)} r="5" fill="#be123c" stroke="#ffffff" strokeWidth="2"><title>{`MD ${x.md} · ${x.oppName} ${x.f}–${x.a}`}</title></circle> : null)}
        <text x={sx(n) + 6} y={sy(cum[focus][n - 1].pts) + 16} fontSize="11" fontWeight="700" fill={seasonHex(focus)}>S{focus}</text>
        {hoverMd && cum[focus][hoverMd - 1] && <g pointerEvents="none"><line x1={sx(hoverMd)} x2={sx(hoverMd)} y1={Y0} y2={H_ - 30} stroke="rgb(var(--c-slate-900))" opacity="0.35" /><circle cx={sx(hoverMd)} cy={sy(cum[focus][hoverMd - 1].pts)} r="5" fill={seasonHex(focus)} stroke="#fff" strokeWidth="2" /></g>}
        {hoverLayer([fs])}
      </svg>
    );
  } else if (mode === 'compare') {
    const list = linesFor(pool.filter((s) => shownSet.has(s.num)));
    chart = (
      <svg viewBox={`0 0 ${W_} ${H_}`} width="100%" height={H_} >
        {axes}
        {[[avgPts, `Average · ${avgPts.toFixed(1)} pts`, AVG_C], [recPtsSeason ? recPtsSeason.pts : 0, `Record · ${recPtsSeason ? recPtsSeason.pts : 0} pts`, REC_C]].map(([v, lab, c]) => <g key={lab}><line x1={X0} x2={W_ - RM} y1={sy(v)} y2={sy(v)} stroke={c} strokeWidth="1.5" strokeDasharray="5 4" /><text x={X0 + 6} y={sy(v) - 5} fontSize="11" fontWeight="600" fill={c}>{lab}</text></g>)}
        {list.map((s) => <polyline key={s.num} points={cum[s.num].map((x, i) => `${sx(i + 1)},${sy(x.pts)}`).join(' ')} fill="none" stroke={seasonHex(s.num)} strokeWidth="2" strokeLinejoin="round" />)}
        {endLabels(list)}
        {hoverMd && <g><line x1={sx(hoverMd)} x2={sx(hoverMd)} y1={Y0} y2={H_ - 30} stroke="rgb(var(--c-slate-900))" opacity="0.35" />{list.filter((s) => cum[s.num][hoverMd - 1]).map((s) => <circle key={s.num} cx={sx(hoverMd)} cy={sy(cum[s.num][hoverMd - 1].pts)} r="3.5" fill={seasonHex(s.num)} stroke="#fff" strokeWidth="1.5" />)}</g>}
        {hoverLayer(list)}
      </svg>
    );
  } else if (mode === 'pace') {
    const list = linesFor(pool.filter((s) => shownSet.has(s.num)));
    const b = baseVal;
    const devs = list.flatMap((s) => cum[s.num].map((x, i) => x.pts - b * (i + 1)));
    const lim = Math.max(10, Math.ceil(Math.max(1, ...devs.map(Math.abs)) / 10) * 10);
    const sy2 = (v) => 30 + (1 - (v + lim) / (2 * lim)) * (H_ - 60);
    chart = (
      <svg viewBox={`0 0 ${W_} ${H_}`} width="100%" height={H_} >
        {Array.from({ length: 5 }, (_, i) => -lim + (i * lim) / 2).map((v) => <g key={v}><line x1={X0} x2={W_ - RM} y1={sy2(v)} y2={sy2(v)} stroke="rgb(var(--c-slate-200))" /><text x={X0 - 8} y={sy2(v) + 4} fontSize="11" textAnchor="end" fill="rgb(var(--c-slate-500))">{signed(v)}</text></g>)}
        {mdTicks.map((m) => <text key={m} x={sx(m)} y={H_ - 8} fontSize="11" textAnchor="middle" fill="rgb(var(--c-slate-500))">{mdLabel(m)}</text>)}
        <line x1={sx(1)} x2={sx(maxMd)} y1={sy2(AVG - b)} y2={sy2((AVG - b) * maxMd)} stroke={AVG_C} strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1={sx(1)} y1={sy2(REC - b)} x2={sx(maxMd)} y2={sy2((REC - b) * maxMd)} stroke={REC_C} strokeWidth="1.5" strokeDasharray="5 4" />
        {list.map((s) => { const c = cum[s.num]; return <g key={s.num}><polyline points={c.map((x, i) => `${sx(i + 1)},${sy2(x.pts - b * (i + 1))}`).join(' ')} fill="none" stroke={seasonHex(s.num)} strokeWidth="2" strokeLinejoin="round" /><text x={sx(c.length) + 6} y={sy2(c[c.length - 1].pts - b * c.length) + 4} fontSize="11" fontWeight="700" fill={seasonHex(s.num)}>S{s.num}</text></g>; })}
        {hoverMd && <g pointerEvents="none"><line x1={sx(hoverMd)} x2={sx(hoverMd)} y1={20} y2={H_ - 30} stroke="rgb(var(--c-slate-900))" opacity="0.35" />{list.filter((s) => cum[s.num][hoverMd - 1]).map((s) => <circle key={s.num} cx={sx(hoverMd)} cy={sy2(cum[s.num][hoverMd - 1].pts - b * hoverMd)} r="3.5" fill={seasonHex(s.num)} stroke="#fff" strokeWidth="1.5" />)}</g>}
        {hoverLayer(list)}
      </svg>
    );
  }

  // Side panel beside the chart (never over it): focus, compare and pace each show
  // the hovered matchday, or the season's end when nothing is hovered.
  let card = null;
  const panel = 'flex flex-col gap-2';
  if (mode === 'focus' && focus && cum[focus] && cum[focus].length) {
    const md = hoverMd && cum[focus][hoverMd - 1] ? hoverMd : cum[focus].length;
    const x = cum[focus][md - 1];
    const prior = played.filter((s) => s.num < focus);
    const rb = prior.reduce((b, s) => (!b || ppg(s) > ppg(b) ? s : b), null);
    const diff = rb ? x.pts - ppg(rb) * md : null;
    card = (
      <div className={panel}>
        <div className="flex items-baseline justify-between"><span className="text-sm font-extrabold text-slate-900">S{focus} · MD {md}</span><span className="text-xs text-slate-500">{hoverMd ? (x.venue === 'H' ? 'Home' : 'Away') : 'Last match'}</span></div>
        <MatchLine m={x} className="justify-between" />
        <div className="flex items-end justify-between pt-2 border-t border-slate-200">
          <div><div className={`${EB} text-slate-500`}>Points</div><div className={`text-2xl leading-none ${TYPE.big} text-slate-900`}>{x.pts}</div><div className="text-[11px] text-slate-500 mt-1">{(x.pts / md).toFixed(2)} PPG</div></div>
          {diff !== null && <div className="text-right"><div className={`${EB} text-slate-500`}>Record pace</div><div className={`text-lg leading-none font-extrabold tabular-nums ${diff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(diff, 1)}</div><div className="text-[11px] text-slate-500 mt-1">{diff >= 0 ? 'ahead of' : 'behind'} S{rb.num}</div></div>}
        </div>
      </div>
    );
  }
  if (mode === 'compare' || mode === 'pace') {
    const list = linesFor(pool.filter((s) => shownSet.has(s.num)));
    const rows = list.map((s) => { const c = cum[s.num]; const md = hoverMd || c.length; const x = c[md - 1]; return x ? { s, md, p: x.pts, gd: x.cgd, dev: x.pts - baseVal * md } : null; }).filter(Boolean);
    // Rank on points (or pace), goal difference breaks ties
    const key = (r) => (mode === 'pace' ? r.dev : r.p);
    const same = (a, b2) => Math.abs(key(a) - key(b2)) < 1e-9 && a.gd === b2.gd;
    const ranked = [...rows].sort((a, b2) => key(b2) - key(a) || b2.gd - a.gd);
    const rankOf = (r) => { const i = ranked.findIndex((x) => same(x, r)); return `${ranked.filter((x) => same(x, r)).length > 1 ? '=' : ''}${ORD(i + 1)}`; };
    const top = ranked[0];
    const isLead = (r) => top && same(r, top);
    const leaders = rows.filter(isLead).map((r) => `S${r.s.num}`).join(', ');
    const me = rows.find((r) => r.s.num === latest);
    const fmtDev = (v) => signed(v, 1);
    card = rows.length ? (
      <div className={panel}>
        <div className="flex items-baseline justify-between gap-3"><span className="text-sm font-extrabold text-slate-900">{hoverMd ? `After MD ${hoverMd}` : 'Final'}</span><span className={`${EB} text-slate-400`}>{mode === 'pace' ? 'Vs pace · GD · rank · PPG' : 'Pts · GD · rank · PPG'}</span></div>
        {rows.map((r) => (
          <div key={r.s.num} className={`flex items-center gap-2 py-1 ${isLead(r) ? 'bg-amber-50 -mx-2 px-2 rounded' : ''}`}>
            <span className="w-2 h-2 rounded-full" style={{ background: seasonHex(r.s.num) }} /><span className="text-xs font-extrabold text-slate-900 w-6">S{r.s.num}</span><span className="text-[11px] text-slate-400 w-10">{divLabel(r.s.division)}</span>
            <span className={`ml-auto text-sm font-extrabold tabular-nums ${mode === 'pace' ? (r.dev >= 0 ? 'text-emerald-700' : 'text-rose-700') : 'text-slate-900'}`}>{mode === 'pace' ? fmtDev(r.dev) : r.p}</span>
            <span className={`w-9 text-right text-[11px] font-semibold tabular-nums ${r.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(r.gd)}</span>
            <span className="w-10 text-right text-[11px] font-semibold tabular-nums text-slate-600">{rankOf(r)}</span><span className="w-10 text-right text-[11px] font-medium tabular-nums text-slate-500">{(r.p / r.md).toFixed(2)}</span>
          </div>
        ))}
        {me && <div className="mt-1 pt-2 border-t border-slate-200 text-xs text-slate-500">{isLead(me) ? `S${latest} leads ${hoverMd ? 'at this point' : 'them all'}.` : mode === 'pace' ? `S${latest} is ${rankOf(me)}, ${(key(top) - key(me)).toFixed(1)} behind the best pace (${leaders}).` : key(top) === me.p ? `S${latest} is ${rankOf(me)}: level on points with ${leaders}, behind on goal difference.` : `S${latest} is ${rankOf(me)}, ${key(top) - me.p} behind the leaders (${leaders}).`}</div>}
      </div>
    ) : null;
  }

  // benchmarks
  const [bScope, setBScope] = useState('all');
  const [openMd, setOpenMd] = useState(null);
  const [hoverCell, setHoverCell] = useState(null);
  const bMatches = matches.filter((m) => bScope === 'all' || (bScope === 'div1' ? /1$/.test(String(m.division).trim()) : !/1$/.test(String(m.division).trim())));
  const byMd = useMemo(() => {
    const g = {};
    bMatches.forEach((m) => { (g[m.md] = g[m.md] || []).push(m); });
    return Object.keys(g).map(Number).sort((a, b) => a - b).map((md) => {
      const l = g[md], w = l.filter((x) => x.res === 'W').length, d = l.filter((x) => x.res === 'D').length;
      const gf = l.reduce((t, x) => t + x.f, 0), ga = l.reduce((t, x) => t + x.a, 0);
      return { md, list: l, gp: l.length, w, d, l: l.length - w - d, pts: w * 3 + d, ppg: (w * 3 + d) / l.length, wp: w / l.length, gf, ga, gd: gf - ga, cs: l.filter((x) => x.a === 0).length, best: l.filter((x) => x.res === 'W').sort((a, b) => (b.f - b.a) - (a.f - a.a) || b.f - a.f)[0] };
    });
  }, [bMatches]);
  // Best / worst: PPG first, then goal difference, then goals scored
  const cmpMd = (a, b) => a.ppg - b.ppg || a.gd - b.gd || a.gf - b.gf;
  const bestMd = byMd.reduce((b, r) => (!b || cmpMd(r, b) > 0 ? r : b), null);
  const worstMd = byMd.reduce((b, r) => (!b || cmpMd(r, b) < 0 ? r : b), null);
  const perfectList = byMd.filter((r) => r.w === r.gp);
  const perfect = perfectList.length;
  const [mdSorted, mdHead] = useSort(byMd, 'md', 'asc');
  const ranked = [...byMd].sort(cmpMd);
  const RESDOT = { W: 'bg-emerald-500', D: 'bg-amber-400', L: 'bg-rose-500' };

  return (
    <div className="space-y-6">
      {/* Highlights bar (R5) */}
      <HighlightsBar accent={accent} columns={4}>
        <HighlightCard label="Best season" icon={Trophy} iconClassName="text-amber-600" value={bestSeason ? `S${bestSeason.num}` : '–'} valueClassName="text-2xl sm:text-3xl" left={bestSeason ? <span className="inline-flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">{bestSeason.isInvincible && <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-amber-100 text-amber-900 ring-1 ring-amber-300">Invincible</span>}<span className="whitespace-nowrap">{`${yearLabel(bestSeason.year)} · ${divLabel(bestSeason.division)}`}</span></span> : ''} />
        <HighlightCard label="Highest PPG" icon={Zap} iconClassName="text-sky-600" value={REC ? REC.toFixed(2) : '–'} valueClassName="text-2xl sm:text-3xl" left={bestSeason ? `S${bestSeason.num} · ${bestSeason.pts} pts in ${bestSeason.gp}` : ''} />
        <HighlightCard label={mostDiv1 ? 'Most Div 1 points' : 'Most points'} icon={Star} iconClassName="text-amber-600" value={String((mostDiv1 || mostPts || {}).pts || '–')} valueClassName="text-2xl sm:text-3xl" left={(mostDiv1 || mostPts) ? `S${(mostDiv1 || mostPts).num} · ${yearLabel((mostDiv1 || mostPts).year)}` : ''} />
        <HighlightCard label="Fastest title seal" icon={Target} iconClassName="text-indigo-600" value={fastest ? String(fastest.spare) : '–'} valueClassName="text-2xl sm:text-3xl" left={fastest ? `games to spare · ${fastestSeasons}` : 'Not recorded yet'} />
      </HighlightsBar>

      {/* Points race: Focus, Compare, Pace */}
      <Section title="Points race" sub={mode === 'focus' ? `Season ${focus}, point by point.` : mode === 'compare' ? 'Every season, point by point.' : `Every season against your ${base === 'rec' ? 'record' : 'average'} pace.`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Segmented value={mode} onChange={(v) => { setMode(v); setHoverMd(null); setHoverAt(null); }} options={[{ value: 'focus', label: 'Focus' }, { value: 'compare', label: 'Compare' }, { value: 'pace', label: 'Pace' }]} />
            {mode === 'pace' && <span className="flex items-center gap-2 text-xs font-medium text-slate-500">Measured against <Segmented value={base} onChange={setBase} options={[{ value: 'avg', label: `Your average (${AVG.toFixed(2)})` }, { value: 'rec', label: `Record (${REC.toFixed(2)})` }, ...(lastSeason ? [{ value: 'last', label: `Last season (S${lastSeason.num} · ${LAST.toFixed(2)})` }] : [])]} /></span>}
          </div>
          <Segmented value={div} onChange={(v) => { setDiv(v); setShown(null); }} options={[{ value: 'all', label: 'All' }, ...['1', '2', '3', '4'].filter((d) => played.some((s) => divLabel(s.division) === `Div ${d}`)).map((d) => ({ value: d, label: `Div ${d}` }))]} />
        </div>
        <div className="flex items-center gap-3"><div ref={stripRef} className="flex gap-1.5 overflow-x-auto pb-1 pr-4 sm:pr-0 min-w-0">{pool.map((s) => <Cell key={s.num} s={s} />)}</div>{mode !== 'focus' && <div className="shrink-0 self-stretch mb-1 flex flex-col rounded-lg ring-1 ring-slate-200 bg-slate-50 overflow-hidden text-[11px] font-semibold"><button type="button" onClick={() => setShown(new Set(pool.map((s) => s.num)))} className={`flex-1 px-3 ${shownSet.size === pool.length ? 'bg-slate-900 text-slate-50' : 'text-slate-600 hover:bg-slate-100'}`}>All</button><span className="h-px bg-slate-200" /><button type="button" onClick={() => setShown(new Set())} className={`flex-1 px-3 ${shownSet.size === 0 ? 'bg-slate-900 text-slate-50' : 'text-slate-600 hover:bg-slate-100'}`}>None</button></div>}</div>
        <div className="flex flex-wrap gap-5 text-xs font-medium text-slate-600">
          {mode === 'focus' ? (
            <>
              <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-white ring-2 ring-amber-700" />Draw</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-700 ring-2 ring-white shadow" />Loss</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-5 border-t-2 border-dashed border-slate-900" />Record pace</span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5"><svg width="24" height="4"><line x1="0" x2="24" y1="2" y2="2" stroke={AVG_C} strokeWidth="2" strokeDasharray="5 4" /></svg>Average</span>
              <span className="inline-flex items-center gap-1.5"><svg width="24" height="4"><line x1="0" x2="24" y1="2" y2="2" stroke={REC_C} strokeWidth="2" strokeDasharray="5 4" /></svg>Record</span>
            </>
          )}
        </div>
        <div ref={raceRef} className="relative">{chart}{hoverMd && card && <FloatCard at={hoverAt} width={300} beside>{card}</FloatCard>}</div>
      </Section>

      {/* Matchday benchmarks */}
      <Section title="Matchday benchmarks" sub="How each matchday has gone across seasons. Open one to see its results."
        right={<Segmented value={bScope} onChange={(v) => { setBScope(v); setOpenMd(null); }} options={[{ value: 'all', label: 'All seasons' }, { value: 'div1', label: 'Div 1' }, { value: 'lower', label: 'Lower divisions' }]} />}>
        {byMd.length > 0 && (
          <SectionStats columns={4} items={[
            { label: 'Best matchday', value: `MD ${bestMd.md}`, line: <><span>{bestMd.ppg.toFixed(2)} PPG</span><span>GD {signed(bestMd.gd)}</span></> },
            { label: 'Worst matchday', value: `MD ${worstMd.md}`, line: <><span>{worstMd.ppg.toFixed(2)} PPG</span><span>GD {signed(worstMd.gd)}</span></> },
            { label: 'Perfect matchdays', value: perfect, line: perfect ? <ClampList items={perfectList.map((r) => r.md)} prefix="MD " /> : <span>Won every time</span> },
            { label: 'Matchdays', value: byMd.length, line: <span>{Math.min(...byMd.map((r) => r.gp))}–{Math.max(...byMd.map((r) => r.gp))} games each</span> },
          ]} />
        )}
        <div className="relative flex flex-col gap-1.5" onPointerLeave={leaveUnlessTouch(setHoverCell)}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`${TYPE.card} text-slate-900`}>Win rate by matchday</span>
            <span className="flex flex-wrap gap-x-2 gap-y-3 sm:gap-3 text-xs text-slate-500">{HEAT.map((h) => <span key={h[2]} className="inline-flex items-center gap-1 whitespace-nowrap"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: h[1] }} />{h[2]}</span>)}</span>
          </div>
          <div className="flex gap-0.5">
            {byMd.map((r) => <span key={r.md} onPointerEnter={() => setHoverCell(r)} onClick={() => setOpenMd(r.md)} className={`h-7 flex-1 rounded-[3px] cursor-pointer ${hoverCell && hoverCell.md === r.md ? 'ring-2 ring-slate-900 ring-offset-1' : ''}`} style={{ background: heat(r.w / r.gp) }} />)}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400"><span>MD {byMd.length ? byMd[0].md : ''}</span><span>MD {byMd.length ? byMd[byMd.length - 1].md : ''}</span></div>
          {hoverCell && (
            <div className="absolute z-20 top-full mt-1 w-60 bg-white rounded-xl shadow-lg ring-1 ring-slate-200 p-3 flex flex-col gap-1.5 pointer-events-none" style={{ left: `${Math.min(80, ((hoverCell.md - 1) / Math.max(1, byMd.length - 1)) * 100)}%` }}>
              <div className="flex items-baseline justify-between"><span className="text-sm font-extrabold text-slate-900">MD {hoverCell.md}</span><span className="text-xs text-slate-500">{hoverCell.gp} seasons</span></div>
              <div className="flex items-center justify-between"><span className="text-sm font-semibold tabular-nums"><WDLRecord w={hoverCell.w} d={hoverCell.d} l={hoverCell.l} /></span><span className="text-sm font-semibold text-slate-900">{Math.round((hoverCell.w / hoverCell.gp) * 100)}% · {(hoverCell.pts / hoverCell.gp).toFixed(2)} PPG</span></div>
              <div className="text-xs text-slate-500">{(() => { const i = ranked.findIndex((r) => r.md === hoverCell.md); return i === 0 ? 'Your weakest matchday' : i === ranked.length - 1 ? 'Your strongest matchday' : `${ORD(ranked.length - i)} best of ${ranked.length}`; })()}</div>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="grid grid-cols-[70px_40px_88px_130px_48px_74px_44px_40px_minmax(0,1fr)_minmax(0,1fr)_20px] gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200">
              {mdHead('md', 'Matchday', 'left', 'asc')}{mdHead('gp', 'GP', 'right')}<span className={`${EB} text-slate-500`}>Record</span>{mdHead('wp', 'Win %')}{mdHead('ppg', 'PPG', 'right')}{mdHead('gf', 'Goals', 'right')}{mdHead('gd', 'GD', 'right')}{mdHead('cs', 'CS', 'center')}<span className={`${EB} text-slate-500`}>By season</span><span className={`${EB} text-slate-500`}>Best win</span><span /></div>
            {mdSorted.map((r) => {
              const open = openMd === r.md, wp = (r.w / r.gp) * 100;
              return (
                <React.Fragment key={r.md}>
                  <div onClick={() => setOpenMd(open ? null : r.md)} className={`grid grid-cols-[70px_40px_88px_130px_48px_74px_44px_40px_minmax(0,1fr)_minmax(0,1fr)_20px] items-center gap-3 px-4 py-2.5 border-b border-slate-100 cursor-pointer ${open ? 'bg-indigo-50/40' : 'bg-white even:bg-slate-50/50 hover:bg-slate-50'}`}>
                    <span className="text-sm font-semibold text-slate-900">MD {r.md}</span>
                    <span className="text-sm text-slate-500 tabular-nums text-right">{r.gp}</span>
                    <span className="text-sm font-semibold tabular-nums"><WDLRecord w={r.w} d={r.d} l={r.l} /></span>
                    <span className="flex items-center gap-2"><span className="w-9 text-sm font-semibold tabular-nums text-slate-900 text-right">{Math.round(wp)}%</span><span className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${wp}%`, background: heat(r.w / r.gp) }} /></span></span>
                    <span className="text-sm font-semibold tabular-nums text-slate-900 text-right">{(r.pts / r.gp).toFixed(2)}</span>
                    <span className="text-sm tabular-nums text-slate-900 text-right whitespace-nowrap"><Score a={r.gf} b={r.ga} /></span>
                    <span className={`text-sm font-semibold tabular-nums text-right ${r.gf - r.ga >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(r.gf - r.ga)}</span>
                    <span className="text-sm tabular-nums text-slate-600 text-center">{r.cs}</span>
                    <span className="flex gap-1 flex-wrap">{r.list.map((m) => <span key={m.season} className={`w-5 h-5 rounded ${RESDOT[m.res]} inline-flex items-center justify-center text-[11px] font-bold text-white`} title={`S${m.season}: ${m.res} ${m.f}–${m.a}`}>{m.season}</span>)}</span>
                    <span className="text-sm min-w-0">{r.best ? <span className="flex items-center gap-1.5 whitespace-nowrap min-w-0"><Flag emoji={r.best.oppFlag} size={18} /><span className="text-[13px] font-medium text-slate-700 truncate">{String(r.best.oppName || '').toUpperCase()}</span><span className="text-sm font-semibold tabular-nums ml-1"><Score a={r.best.f} b={r.best.a} /></span><span className="text-xs text-slate-400">S{r.best.season}</span></span> : <span className="text-slate-400">–</span>}</span>
                    <Chev open={open} />
                  </div>
                  {open && (
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                      <div className={`${EB} text-slate-500 mb-2`}>Matchday {r.md} in every season</div>
                      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-12">
                        {r.list.map((m) => (
                          <div key={m.season} className="break-inside-avoid flex items-center gap-2 py-1.5 border-b border-slate-100 w-[236px]" title={m.oppName}>
                            <span className="w-7 shrink-0 text-xs font-semibold text-slate-500">S{m.season}</span>
                            <span className="w-3 shrink-0 text-[11px] font-medium text-slate-400">{m.venue}</span>
                            <span className="flex items-center gap-2 w-[76px] shrink-0"><Flag emoji={m.oppFlag} size={18} /><span className="text-[13px] font-semibold text-slate-700">{m.opp}</span></span>
                            <Chip r={m.res} />
                            <span className="w-10 text-right text-sm font-extrabold tabular-nums text-slate-900"><Score a={m.f} b={m.a} /></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}


// ═══ HOME VS AWAY ═══════════════════════════════════════════════════
// Locked design (Home vs Away round 5 + spine option E): career Highlights bar;
// Venue swing (career split bar, metric switch, click a season, combine seasons);
// side-by-side for the selection; Venue ledger mirrored around the points split.
const HC = 'rgb(var(--c-home))', AC = 'rgb(var(--c-away))';
// Ink on the away (sky) colour: light mode's slate-900 in both modes, so the
// figures keep their contrast when dark mode swaps the slate scale.
const AWAY_INK = 'rgb(15 23 42)';
const venueStat = (list) => {
  const gp = list.length, w = list.filter((m) => m.res === 'W').length, d = list.filter((m) => m.res === 'D').length;
  const gf = list.reduce((t, m) => t + m.f, 0), ga = list.reduce((t, m) => t + m.a, 0);
  return { gp, w, d, l: gp - w - d, pts: w * 3 + d, gf, ga, gd: gf - ga, cs: list.filter((m) => m.a === 0).length, fts: list.filter((m) => m.f === 0).length, win: gp ? w / gp : 0, ppg: gp ? (w * 3 + d) / gp : 0, sc: gp ? gf / gp : 0, co: gp ? ga / gp : 0 };
};
const venueSplit = (list) => ({ H: venueStat(list.filter((m) => m.venue === 'H')), A: venueStat(list.filter((m) => m.venue === 'A')) });
const METRIC = { pts: { label: 'Points', get: (x) => x.pts, unit: 'pts' }, w: { label: 'Wins', get: (x) => x.w, unit: 'wins' }, gf: { label: 'Goals', get: (x) => x.gf, unit: 'goals' } };
function VenueTag({ side }) {
  if (!side) return <span className="text-[11px] font-semibold text-slate-400">Level</span>;
  const I = side === 'H' ? Home : Plane;
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap" style={{ color: side === 'H' ? HC : 'rgb(var(--c-sky-700))' }}><I className="w-3.5 h-3.5" />{side === 'H' ? 'Home ahead' : 'Away ahead'}</span>;
}

export function HomeAwayTab({ seasons = [], accent = 'indigo' }) {
  const matches = useMatches(seasons);
  const played = seasons.filter((s) => s.gp > 0);
  const career = useMemo(() => venueSplit(matches), [matches]);
  const bySeason = useMemo(() => played.map((s) => ({ s, num: s.num, ...venueSplit(matches.filter((m) => m.season === s.num)) })), [matches, played]);
  const [metric, setMetric] = useState('pts');
  const [sel, setSel] = useState([]);
  const [combine, setCombine] = useState(false);
  const [swingHover, setSwingHover] = useState(null);
  const [formHover, setFormHover] = useState(null);
  const [ledMetric, setLedMetric] = useState('pts');
  const [swRef, swW] = useWidth(1000);
  const M = METRIC[metric], LM = METRIC[ledMetric];

  // Highlights bar (career-wide): each card names the edge and the venue holding it
  const H = career.H, A = career.A;
  const edge = (h, a, lowerBetter = false) => (h === a ? null : (lowerBetter ? h < a : h > a) ? 'H' : 'A');
  const two = (hv, av, hl, al) => {
    const t = hv + av || 1;
    return (
      <div className="flex flex-col gap-1 mt-1">
        <div className="h-2 rounded-full overflow-hidden flex"><div style={{ width: `${(hv / t) * 100}%`, background: HC }} /><div style={{ width: `${(av / t) * 100}%`, background: AC }} /></div>
        <div className="flex justify-between text-xs font-semibold tabular-nums text-slate-700"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: HC }} />{hl}</span><span className="inline-flex items-center gap-1.5">{al}<span className="w-2 h-2 rounded-full" style={{ background: AC }} /></span></div>
      </div>
    );
  };
  const hcard = (label, value, side, body, wide) => (
    <div key={label} className={`bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200/80 flex flex-col gap-1${wide ? ' col-span-2 sm:col-span-1' : ''}`}>
      <div className="flex items-start justify-between gap-2"><span className={`${EB} text-slate-500`}>{label}</span><span className="hidden sm:inline"><VenueTag side={side} /></span></div>
      <div className={`text-2xl leading-none ${TYPE.big} text-slate-900 mt-1`}>{value}</div>
      <span className="sm:hidden"><VenueTag side={side} /></span>
      {body}
    </div>
  );
  const pct = (x) => `${(x * 100).toFixed(1)}%`;
  const plus = (n) => signed(n);

  // Selection: none = all seasons; one = clicked season; several = combined
  const toggleSeason = (n) => {
    if (combine) setSel(sel.includes(n) ? sel.filter((x) => x !== n) : [...sel, n].sort((a, b) => a - b));
    else setSel(sel.length === 1 && sel[0] === n ? [] : [n]);
  };
  const selList = sel.length ? matches.filter((m) => sel.includes(m.season)) : matches;
  const cur = useMemo(() => venueSplit(selList), [selList]);
  const selTitle = !sel.length ? 'All seasons' : sel.length === 1 ? `Season ${sel[0]}` : `Seasons ${sel.map((n) => `S${n}`).join(', ')} combined`;
  const selChip = sel.length ? (sel.length === 1 ? (() => { const s = played.find((x) => x.num === sel[0]); return s ? `S${s.num} · ${yearLabel(s.year)} · ${divLabel(s.division)}` : ''; })() : `${sel.length} seasons`) : null;

  // Venue swing chart geometry
  const SW = Math.max(300, swW), SH = 260, mid = SH / 2;
  const diffs = bySeason.map((r) => M.get(r.H) - M.get(r.A));
  const maxD = Math.max(3, ...diffs.map(Math.abs));
  const sc = (mid - 34) / maxD, colw = (SW - 40) / Math.max(1, bySeason.length);

  // Side-by-side rows (spine option E: small-capitals label at the top, the difference big below)
  const rows = [
    ['Wins', cur.H.w, cur.A.w, false, (d) => `${d}`],
    ['Draws', cur.H.d, cur.A.d, true, (d) => `${d}`],
    ['Losses', cur.H.l, cur.A.l, true, (d) => `${d}`],
    ['Win rate', cur.H.win, cur.A.win, false, (d) => pct(d), pct],
    ['Points per game', cur.H.ppg, cur.A.ppg, false, (d) => d.toFixed(2), (v) => v.toFixed(2)],
    ['Scored per game', cur.H.sc, cur.A.sc, false, (d) => d.toFixed(2), (v) => v.toFixed(2)],
    ['Conceded per game', cur.H.co, cur.A.co, true, (d) => d.toFixed(2), (v) => v.toFixed(2)],
    ['Goal difference', cur.H.gd, cur.A.gd, false, (d) => `${d}`, plus],
    ['Clean sheets', cur.H.cs, cur.A.cs, false, (d) => `${d}`],
    ['Failed to score', cur.H.fts, cur.A.fts, true, (d) => `${d}`],
  ];
  const formOf = (side) => selList.filter((m) => m.venue === side).slice(-5).reverse();

  // Ledger: mirrored around the points split; sortable (R11)
  const ledRows = bySeason.map((r) => ({ ...r, hm: LM.get(r.H), am: LM.get(r.A), share: (LM.get(r.H) + LM.get(r.A)) ? LM.get(r.H) / (LM.get(r.H) + LM.get(r.A)) : 0, total: r.H.pts + r.A.pts, mt: LM.get(r.H) + LM.get(r.A) }));
  const [ledSorted, lh] = useSort(ledRows, null, 'desc', { hgp: (r) => r.H.gp, hrec: (r) => r.H.w, hwin: (r) => r.H.win, hgd: (r) => r.H.gd, agp: (r) => r.A.gp, arec: (r) => r.A.w, awin: (r) => r.A.win, agd: (r) => r.A.gd });
  const LG = 'grid grid-cols-[120px_minmax(330px,1fr)_220px_minmax(330px,1fr)_96px]';
  const blockH = 'grid grid-cols-[32px_88px_52px_44px_40px] justify-between items-center self-stretch pl-2 pr-8 bg-[rgb(30_58_138/0.06)]';
  const blockA = 'grid grid-cols-[40px_44px_52px_88px_32px] justify-between items-center self-stretch pl-8 pr-2 bg-[rgb(56_189_248/0.10)]';

  return (
    <div className="space-y-6">
      <HighlightsBar accent={accent} columns={5}>
        {hcard('Points', `+${Math.abs(H.pts - A.pts)}`, edge(H.pts, A.pts), two(H.pts, A.pts, H.pts, A.pts), true)}
        {hcard('Win rate', `+${(Math.abs(H.win - A.win) * 100).toFixed(1)}%`, edge(H.win, A.win), two(H.win, A.win, pct(H.win), pct(A.win)))}
        {hcard('PPG', `+${Math.abs(H.ppg - A.ppg).toFixed(2)}`, edge(H.ppg, A.ppg), two(H.ppg, A.ppg, H.ppg.toFixed(2), A.ppg.toFixed(2)))}
        {hcard('Goal difference', `+${Math.abs(H.gd - A.gd)}`, edge(H.gd, A.gd), two(Math.max(0, H.gd), Math.max(0, A.gd), plus(H.gd), plus(A.gd)))}
        {hcard('Clean sheets', `+${Math.abs(H.cs - A.cs)}`, edge(H.cs, A.cs), two(H.cs, A.cs, H.cs, A.cs))}
      </HighlightsBar>

      {/* Venue swing: career split bar, then season by season; click to select, or combine */}
      <Section title="Venue swing" sub="Your career split, then season by season. Click a season to see it below; click it again to clear."
        right={<Segmented value={metric} onChange={setMetric} options={[{ value: 'pts', label: 'Points' }, { value: 'w', label: 'Wins' }, { value: 'gf', label: 'Goals' }]} />}>
        {(() => { const hv = M.get(H), av = M.get(A), t = hv + av || 1; return (
          <div className="flex flex-col gap-2">
            <div className="h-12 rounded-xl overflow-hidden flex">
              <div className="flex items-center justify-between px-3 sm:px-4 text-white min-w-0" style={{ width: `${(hv / t) * 100}%`, background: HC }}><span className="inline-flex items-center gap-2 text-sm font-semibold"><Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span></span><span className="tabular-nums inline-flex items-baseline gap-2"><span className="text-xs font-medium opacity-70">{((hv / t) * 100).toFixed(1)}%</span><span className="text-lg font-extrabold">{hv}</span></span></div>
              <div className="flex items-center justify-between px-3 sm:px-4 min-w-0" style={{ width: `${(av / t) * 100}%`, background: AC, color: AWAY_INK }}><span className="tabular-nums inline-flex items-baseline gap-2"><span className="text-lg font-extrabold">{av}</span><span className="text-xs font-medium opacity-60">{((av / t) * 100).toFixed(1)}%</span></span><span className="inline-flex items-center gap-2 text-sm font-semibold"><span className="hidden sm:inline">Away</span><Plane className="w-4 h-4" /></span></div>
            </div>
            <div className="text-xs text-slate-500">All seasons · {hv + av} {M.unit}</div>
          </div>
        ); })()}
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3 py-2">
          <button type="button" onClick={() => { setCombine(!combine); if (combine) setSel(sel.slice(0, 1)); }} className={`${EB} ${combine ? 'text-slate-900' : 'text-slate-500'} mr-1`}>Combine seasons {combine ? '·  on' : ''}</button>
          {combine && played.map((s) => <button key={s.num} type="button" onClick={() => toggleSeason(s.num)} className={`text-xs font-semibold rounded-md px-2 py-1 min-h-[32px] ${sel.includes(s.num) ? 'bg-slate-900 text-slate-50' : 'bg-white ring-1 ring-slate-200 text-slate-600'}`}>{sel.includes(s.num) ? '✓ ' : ''}S{s.num}</button>)}
          {combine && <>
            <button type="button" onClick={() => setSel(played.filter((s) => divLabel(s.division) === 'Div 1').map((s) => s.num))} className="text-xs font-semibold rounded-md px-2 py-1 bg-white ring-1 ring-slate-200 text-slate-600">Div 1 seasons</button>
            <button type="button" onClick={() => setSel(played.filter((s) => divLabel(s.division) !== 'Div 1').map((s) => s.num))} className="text-xs font-semibold rounded-md px-2 py-1 bg-white ring-1 ring-slate-200 text-slate-600">Lower divisions</button>
          </>}
          {sel.length > 0 && <button type="button" onClick={() => setSel([])} className="ml-auto text-xs font-semibold text-slate-500 hover:text-slate-900">Clear</button>}
        </div>
        <div ref={swRef} className="w-full">
          <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} style={{ touchAction: 'pan-y' }} onPointerLeave={leaveUnlessTouch(setSwingHover)}>
            <line x1="20" x2={SW - 20} y1={mid} y2={mid} stroke="rgb(var(--c-slate-400))" />
            <text x="20" y="16" fontSize="11" fontWeight="600" fill={HC}>▲ Home stronger</text>
            <text x="20" y={SH - 4} fontSize="11" fontWeight="600" fill="rgb(var(--c-sky-700))">▼ Away stronger</text>
            {bySeason.map((r, i) => {
              const d = diffs[i], x = 20 + colw * i + colw / 2, bw = Math.min(48, colw * 0.4);
              const on = !sel.length || sel.includes(r.num), op = on ? 1 : 0.35;
              return (
                <g key={r.num} className="cursor-pointer" onClick={() => toggleSeason(r.num)} onPointerMove={(e) => setSwingHover({ r, at: pointAt(e) })}>
                  <rect x={x - colw / 2 + 4} y="22" width={colw - 8} height={SH - 44} rx="10" fill={sel.includes(r.num) ? '#6366f1' : 'transparent'} fillOpacity="0.07" stroke={sel.includes(r.num) ? '#6366f1' : 'none'} strokeOpacity="0.5" />
                  {d > 0 && <rect x={x - bw / 2} y={mid - d * sc} width={bw} height={d * sc} rx="3" fill={HC} opacity={op} />}
                  {d < 0 && <rect x={x - bw / 2} y={mid} width={bw} height={-d * sc} rx="3" fill={AC} opacity={op} />}
                  {d === 0 && <rect x={x - bw / 2} y={mid - 1.5} width={bw} height="3" fill="rgb(var(--c-slate-400))" opacity={op} />}
                  <text x={x} y={d >= 0 ? mid - d * sc - 7 : mid - d * sc + 16} fontSize="12" fontWeight="800" textAnchor="middle" fill={d > 0 ? HC : d < 0 ? 'rgb(var(--c-sky-700))' : 'rgb(var(--c-slate-500))'} opacity={op}>{d === 0 ? '0' : `+${Math.abs(d)}`}</text>
                  <text x={x} y={d >= 0 ? mid + 15 : mid - 7} fontSize="11" fontWeight={sel.includes(r.num) ? 800 : 600} textAnchor="middle" fill="rgb(var(--c-slate-900))" opacity={on ? 1 : 0.6}>S{r.num}</text>
                </g>
              );
            })}
          </svg>
        </div>
        {swingHover && (
          <FloatCard at={swingHover.at} width={240}>
            <div className="flex items-baseline justify-between"><span className="text-sm font-extrabold text-slate-900">S{swingHover.r.num} · {yearLabel(swingHover.r.s.year)}</span><span className="text-xs text-slate-500">{divLabel(swingHover.r.s.division)}</span></div>
            <div className="flex justify-between text-sm"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: HC }} />Home</span><span className="font-extrabold tabular-nums">{M.get(swingHover.r.H)} {M.unit}</span></div>
            <div className="flex justify-between text-sm"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: AC }} />Away</span><span className="font-extrabold tabular-nums">{M.get(swingHover.r.A)} {M.unit}</span></div>
            {(() => { const d = M.get(swingHover.r.H) - M.get(swingHover.r.A); return <div className="text-xs font-semibold pt-1 border-t border-slate-100" style={{ color: d > 0 ? HC : d < 0 ? 'rgb(var(--c-sky-700))' : 'rgb(var(--c-slate-500))' }}>{d === 0 ? 'Level' : `${d > 0 ? 'Home' : 'Away'} stronger by ${Math.abs(d)}`}</div>; })()}
          </FloatCard>
        )}
      </Section>

      {/* Side-by-side for the selection */}
      <Section title={`${selTitle}, home and away`} sub="Both venues, the weaker side faded; the spine shows the difference, pointing at the stronger venue. Fewer draws, losses, goals conceded and blanks count as better."
        right={selChip && <button type="button" onClick={() => setSel([])} className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3 py-1 bg-slate-100 text-slate-700">{selChip}<X className="w-3.5 h-3.5 text-slate-400" /></button>}>
        <div>
          <div className="grid grid-cols-[52px_1fr_118px_1fr_52px] sm:grid-cols-[110px_1fr_200px_1fr_110px] gap-2 sm:gap-4 pb-2 border-b border-slate-200">
            <span className="text-right inline-flex items-center justify-end gap-1.5 text-sm font-extrabold text-slate-900 cursor-default" onPointerMove={(e) => setFormHover({ side: 'H', at: pointAt(e) })} onPointerLeave={leaveUnlessTouch(setFormHover)}><Home className="w-4 h-4" style={{ color: HC }} /><span className="hidden sm:inline">Home</span></span>
            <span />
            <span className="text-center text-xs text-slate-400">{cur.H.gp} · {cur.A.gp} matches</span>
            <span />
            <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-slate-900 cursor-default" onPointerMove={(e) => setFormHover({ side: 'A', at: pointAt(e) })} onPointerLeave={leaveUnlessTouch(setFormHover)}><span className="hidden sm:inline">Away</span><Plane className="w-4 h-4 text-sky-600" /></span>
          </div>
          {rows.map(([lab, hv, av, lb, fd, fv]) => {
            const better = hv === av ? null : (lb ? hv < av : hv > av) ? 'H' : 'A';
            const mx = Math.max(Math.abs(hv), Math.abs(av)) || 1;
            const show = fv || ((v) => `${v}`);
            return (
              <div key={lab} className="grid grid-cols-[52px_1fr_118px_1fr_52px] sm:grid-cols-[110px_1fr_200px_1fr_110px] items-center gap-2 sm:gap-4 border-b border-slate-100 last:border-b-0">
                <span className={`text-sm tabular-nums text-right ${better === 'H' ? 'font-extrabold text-slate-900' : 'font-medium text-slate-500'}`}>{show(hv)}</span>
                <div className="flex"><div className="h-2.5 rounded-l-full ml-auto" style={{ width: `${(Math.abs(hv) / mx) * 100}%`, background: HC, opacity: better === 'H' ? 1 : 0.3 }} /></div>
                <div className="relative h-16">
                  <span className="absolute top-[9px] inset-x-0 text-center text-[10px] leading-none font-semibold uppercase tracking-[0.1em] text-slate-500">{lab}</span>
                  <span className="absolute inset-x-0 top-[20px] bottom-0 flex items-center justify-center">
                    {better ? <span className="inline-flex items-center gap-1 tabular-nums font-extrabold leading-none" style={{ fontSize: 26, color: better === 'H' ? HC : 'rgb(var(--c-sky-700))' }}>{better === 'H' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 5 7 12l8 7z" /></svg>}{fd(Math.abs(hv - av))}{better === 'A' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 8 7-8 7z" /></svg>}</span> : <span className="text-xs font-semibold text-slate-400">Level</span>}
                  </span>
                </div>
                <div className="flex"><div className="h-2.5 rounded-r-full" style={{ width: `${(Math.abs(av) / mx) * 100}%`, background: AC, opacity: better === 'A' ? 1 : 0.35 }} /></div>
                <span className={`text-sm tabular-nums ${better === 'A' ? 'font-extrabold text-slate-900' : 'font-medium text-slate-500'}`}>{show(av)}</span>
              </div>
            );
          })}
        </div>
        {formHover && (
          <FloatCard at={formHover.at} width={280}>
            <span className={`${EB} text-slate-500`}>Last 5 {formHover.side === 'H' ? 'at home' : 'away'} · {selTitle}</span>
            {formOf(formHover.side).map((m, i) => <span key={i} className="flex items-center justify-between gap-2"><MatchLine m={m} /><span className="text-xs text-slate-400 whitespace-nowrap">S{m.season} MD{m.md}</span></span>)}
          </FloatCard>
        )}
      </Section>

      {/* Venue ledger: home and away mirrored around the points split */}
      <Section title="Venue ledger" sub="Every season, home and away, mirrored around the split. Click a season to show it above."
        right={<Segmented value={ledMetric} onChange={setLedMetric} options={[{ value: 'pts', label: 'Points' }, { value: 'w', label: 'Wins' }, { value: 'gf', label: 'Goals' }]} />}>
        <div className="rounded-xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[1120px]">
            <div className={`${LG} bg-slate-50 ${EB}`}><div /><div className="pr-8 pt-2 flex items-center justify-end gap-1.5 bg-[rgb(30_58_138/0.06)]"><span style={{ color: HC }}>Home</span><span className="w-2.5 h-2.5 rounded-full" style={{ background: HC }} /></div><div /><div className="pl-8 pt-2 flex items-center gap-1.5 bg-[rgb(56_189_248/0.10)]"><span className="w-2.5 h-2.5 rounded-full" style={{ background: AC }} /><span className="text-sky-700">Away</span></div><div /></div>
            <div className={`${LG} bg-slate-50 border-b border-slate-200`}>
              <div className="pl-3 py-2">{lh('num', 'Season', 'left', 'asc')}</div>
              <div className={`${blockH} py-2`}>{lh('hgp', 'GP', 'right')}{lh('hrec', 'Record', 'right')}{lh('hwin', 'Win %', 'right')}{lh('hgd', 'GD', 'right')}{lh('hm', LM.label === 'Points' ? 'Pts' : LM.label, 'right')}</div>
              <div className="px-8 py-2 flex justify-center">{lh('share', `${LM.label} split`, 'center')}</div>
              <div className={`${blockA} py-2`}>{lh('am', LM.label === 'Points' ? 'Pts' : LM.label)}{lh('agd', 'GD')}{lh('awin', 'Win %')}{lh('arec', 'Record')}{lh('agp', 'GP')}</div>
              <div className="pr-3 py-2">{lh('total', 'Total', 'right')}</div>
            </div>
            {ledSorted.map((r) => {
              const t = r.mt || 1, on = sel.includes(r.num);
              return (
                <div key={r.num} onClick={() => toggleSeason(r.num)} className={`${LG} items-stretch border-b border-slate-100 cursor-pointer ${on ? 'bg-indigo-50/60' : 'bg-white hover:bg-slate-50'}`}>
                  <div className="pl-3 pr-2 py-3 flex flex-col justify-center"><span className="text-sm font-semibold text-slate-900">S{r.num}</span><span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">{yearLabel(r.s.year)} · {divLabel(r.s.division)}</span></div>
                  <div className={blockH}><span className="text-sm tabular-nums text-right text-slate-500">{r.H.gp}</span><span className="text-sm font-semibold tabular-nums text-right"><WDLRecord w={r.H.w} d={r.H.d} l={r.H.l} /></span><span className="text-sm tabular-nums text-right text-slate-600">{Math.round(r.H.win * 100)}%</span><span className="text-sm font-semibold tabular-nums text-right text-emerald-700">{plus(r.H.gd)}</span><span className="text-base font-extrabold tabular-nums text-right text-slate-900">{r.hm}</span></div>
                  <div className="px-8 py-3 flex flex-col justify-center gap-1"><div className="h-2.5 rounded-full overflow-hidden flex"><div style={{ width: `${(r.hm / t) * 100}%`, background: HC }} /><div style={{ width: `${(r.am / t) * 100}%`, background: AC }} /></div><div className="flex justify-between text-[11px] font-semibold tabular-nums text-slate-500"><span>{Math.round((r.hm / t) * 100)}%</span><span>{Math.round((r.am / t) * 100)}%</span></div></div>
                  <div className={blockA}><span className="text-base font-extrabold tabular-nums text-slate-900">{r.am}</span><span className="text-sm font-semibold tabular-nums text-emerald-700">{plus(r.A.gd)}</span><span className="text-sm tabular-nums text-slate-600">{Math.round(r.A.win * 100)}%</span><span className="text-sm font-semibold tabular-nums"><WDLRecord w={r.A.w} d={r.A.d} l={r.A.l} /></span><span className="text-sm tabular-nums text-slate-500">{r.A.gp}</span></div>
                  <div className="pl-2 pr-3 py-3 flex flex-col justify-center items-end"><span className="text-sm font-extrabold tabular-nums text-slate-900">{r.total} <span className="text-[11px] font-medium text-slate-500">pts</span></span><span className="text-[11px] font-medium tabular-nums text-slate-500">{(r.total / ((r.H.gp + r.A.gp) || 1)).toFixed(2)} PPG</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}


// ═══ SPIDER MATRIX ══════════════════════════════════════════════════
// Locked design: Versus (A vs B, each layer any of Career, a season, a venue
// or an opponent) and Group (many seasons or many clubs). Pillar spec: more is
// better on every pillar; one scale per pillar shared by radar, scorecard and
// Group lines; out-of-range values clamp on the web (with a marker) and stretch
// that pillar's row on the scorecard.
const PILLARS = [
  { key: 'win', label: 'Win rate', sub: 'wins per game played', lo: 0, hi: 1, fmt: (v) => `${(v * 100).toFixed(1)}%`, gap: (d) => `${(d * 100).toFixed(1)}%` },
  { key: 'conc', label: 'Defensive steel', sub: 'conceded per game, lower is better', lo: 2.5, hi: 0, fmt: (v) => v.toFixed(2), gap: (d) => d.toFixed(2) },
  { key: 'cs', label: 'Clean sheets', sub: 'games without conceding', lo: 0, hi: 0.7, fmt: (v) => `${(v * 100).toFixed(1)}%`, gap: (d) => `${(d * 100).toFixed(1)}%` },
  { key: 'ppg', label: 'Points efficiency', sub: 'points per game', lo: 0, hi: 3, fmt: (v) => v.toFixed(2), gap: (d) => d.toFixed(2) },
  { key: 'blow', label: 'Blowout rate', sub: 'wins by 3 or more', lo: 0, hi: 0.7, fmt: (v) => `${(v * 100).toFixed(1)}%`, gap: (d) => `${(d * 100).toFixed(1)}%` },
  { key: 'att', label: 'Attacking output', sub: 'scored per game', lo: 0, hi: 4, fmt: (v) => v.toFixed(2), gap: (d) => d.toFixed(2) },
];
// 0..1 position on a pillar's scale (unclamped), "more is better" for every pillar
const pos = (p, v) => (v - p.lo) / (p.hi - p.lo);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const better = (p, a, b) => (a === b ? 0 : (p.hi > p.lo ? a > b : a < b) ? 1 : -1);
const profile = (list) => {
  const gp = list.length || 0, w = list.filter((m) => m.res === 'W').length, d = list.filter((m) => m.res === 'D').length;
  const gf = list.reduce((t, m) => t + m.f, 0), ga = list.reduce((t, m) => t + m.a, 0);
  const g = gp || 1;
  return { gp, w, d, l: gp - w - d, pts: w * 3 + d, gd: gf - ga, gf, ga, win: w / g, conc: ga / g, cs: list.filter((m) => m.a === 0).length / g, ppg: (w * 3 + d) / g, blow: list.filter((m) => m.f - m.a >= 3).length / g, att: gf / g };
};
const flipMatch = (m) => ({ ...m, f: m.a, a: m.f, res: m.res === 'W' ? 'L' : m.res === 'L' ? 'W' : 'D' });
const hexRgb = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || '').trim()); if (!m) return null; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const tooClose = (a, b) => { const x = hexRgb(a), y = hexRgb(b); if (!x || !y) return false; return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) < 70; };
// Career layer colour: the ink token as a CSS variable, so it swaps in dark
// mode. The clash check needs a hex, so it uses INK_HEX for the mode that is
// on (useDark).
const INK = 'rgb(var(--c-slate-900))';

export function SpiderTab({ seasons = [], clubs = [], ownClub = null, accent = 'indigo' }) {
  const matches = useMatches(seasons);
  const dark = useDark();
  const played = seasons.filter((s) => s.gp > 0);
  const own = ownClub || { name: 'Your club', flag: '', color: INK };
  const clubMap = useMemo(() => { const m = new Map(); clubs.forEach((c) => m.set(String(c.abbr || '').toUpperCase(), c)); return m; }, [clubs]);
  const oppGames = useMemo(() => { const m = new Map(); matches.forEach((x) => m.set(x.opp, (m.get(x.opp) || 0) + 1)); return m; }, [matches]);
  const clubsByGames = useMemo(() => [...oppGames.entries()].sort((a, b) => b[1] - a[1]).map(([abbr, n]) => ({ abbr, n, c: clubMap.get(abbr) || { name: abbr, flag: '', avg: 0, color: '#64748b' } })), [oppGames, clubMap]);
  const career = useMemo(() => profile(matches), [matches]);
  const seasonProf = useMemo(() => { const m = {}; played.forEach((s) => { m[s.num] = profile(matches.filter((x) => x.season === s.num)); }); return m; }, [matches, played]);
  const bestSeasonVal = (p) => { const vals = Object.values(seasonProf).map((x) => x[p.key]); return vals.length ? (p.hi > p.lo ? Math.max(...vals) : Math.min(...vals)) : null; };
  const bestPpgSeason = played.reduce((b, s) => (!b || seasonProf[s.num].ppg > seasonProf[b.num].ppg ? s : b), null);
  const latest = played[played.length - 1];

  // Layers: { kind: 'career' | 'season' | 'venue' | 'opp', key, scope, persp }
  const describe = (L) => {
    if (!L) return null;
    if (L.kind === 'career') return { us: true, title: `${own.name} · Career`, sub: `${played.length} seasons · ${career.gp} GP`, color: INK, prof: career, flag: own.flag };
    if (L.kind === 'season') { const s = played.find((x) => x.num === L.key); return { us: true, title: `${own.name} · S${L.key}`, sub: s ? `${yearLabel(s.year)} · ${divLabel(s.division)}${s.isInvincible && s.isComplete ? ' · Invincible' : ''}` : '', color: seasonHex(L.key), prof: seasonProf[L.key] || profile([]), flag: own.flag }; }
    if (L.kind === 'venue') { const list = matches.filter((x) => x.venue === L.key && (!L.scope || x.season === L.scope)); return { us: true, title: `${own.name} · ${L.key === 'H' ? 'Home' : 'Away'}`, sub: `${L.scope ? `Season ${L.scope}` : 'All seasons'} · ${list.length} GP`, color: L.key === 'H' ? '#1e3a8a' : '#38bdf8', prof: profile(list), flag: own.flag }; }
    const c = clubMap.get(L.key) || { name: L.key, flag: '', color: '#64748b' };
    let list = matches.filter((x) => x.opp === L.key); if (L.persp === 'them') list = list.map(flipMatch);
    return { us: false, title: String(c.name || L.key), sub: L.persp === 'them' ? `Their ${list.length} games against you` : `Your ${list.length} games against them`, color: c.color || '#64748b', prof: profile(list), flag: c.flag };
  };
  const defA = { kind: 'career' }, defB = bestPpgSeason ? { kind: 'season', key: bestPpgSeason.num } : { kind: 'career' };
  const [mode, setMode] = useState('versus');
  const [LA, setLA] = useState(defA);
  const [LB, setLB] = useState(defB);
  const [menu, setMenu] = useState(null); // 'A' | 'B' | 'add' | null
  const A = describe(LA), B = describe(LB);
  const ink = INK_HEX[dark ? 'dark' : 'light'];
  const hexOf = (c) => (c === INK ? ink : c);
  if (A && B && tooClose(hexOf(A.color), hexOf(B.color))) B.color = B.us ? '#64748b' : '#94a3b8';
  const quick = [
    { label: 'Home vs Away', a: { kind: 'venue', key: 'H' }, b: { kind: 'venue', key: 'A' } },
    bestPpgSeason && { label: `Career vs S${bestPpgSeason.num}${bestPpgSeason.isInvincible ? ' (Invincible)' : ''}`, a: { kind: 'career' }, b: { kind: 'season', key: bestPpgSeason.num } },
    bestPpgSeason && latest && bestPpgSeason.num !== latest.num && { label: `Record (S${bestPpgSeason.num}) vs Latest (S${latest.num})`, a: { kind: 'season', key: bestPpgSeason.num }, b: { kind: 'season', key: latest.num } },
    clubsByGames[0] && { label: `Career vs ${String(clubsByGames[0].c.name || '').toLowerCase().replace(/\b\w/g, (x) => x.toUpperCase())}`, a: { kind: 'career' }, b: { kind: 'opp', key: clubsByGames[0].abbr, persp: 'us' } },
  ].filter(Boolean);
  const isQuick = (q) => JSON.stringify(q.a) === JSON.stringify(LA) && JSON.stringify(q.b) === JSON.stringify(LB);

  // Group mode
  const [gKind, setGKind] = useState('seasons');
  const [gSeasons, setGSeasons] = useState(null);
  const [gClubs, setGClubs] = useState(null);
  const [hl, setHl] = useState(null);
  const [gTable, setGTable] = useState(false);
  const seasonsSel = gSeasons || played.map((s) => s.num);
  const clubsSel = gClubs || clubsByGames.filter((x) => x.n >= 5).slice(0, 6).map((x) => x.abbr);
  const gLayers = gKind === 'seasons'
    ? seasonsSel.map((n) => ({ id: `S${n}`, short: `S${n}`, name: `Season ${n}`, color: seasonHex(n), prof: seasonProf[n] || profile([]), us: true, flag: null, sub: (() => { const s = played.find((x) => x.num === n); return s ? divLabel(s.division) : ''; })() }))
    : clubsSel.map((abbr) => { const c = clubMap.get(abbr) || { name: abbr, color: '#64748b' }; return { id: abbr, short: abbr, name: String(c.name || abbr).toUpperCase(), color: c.color || '#64748b', prof: profile(matches.filter((x) => x.opp === abbr)), us: false, flag: c.flag, sub: `${oppGames.get(abbr) || 0} GP` }; });

  // Highs & lows
  const [hlBy, setHlBy] = useState('club');
  const [hlMin, setHlMin] = useState('5');
  const extremesPool = useMemo(() => {
    if (hlBy === 'season') return played.map((s) => ({ id: `S${s.num}`, name: `Season ${s.num}`, sub: divLabel(s.division), flag: null, prof: seasonProf[s.num] }));
    let list = clubsByGames;
    if (hlMin === '5') list = list.filter((x) => x.n >= 5);
    if (hlMin === '10') list = list.filter((x) => x.n >= 10);
    if (hlMin === 'top') list = [...list].filter((x) => x.c.avg > 0).sort((a, b) => a.c.avg - b.c.avg).slice(0, 10);
    return list.map((x) => ({ id: x.abbr, name: String(x.c.name || x.abbr).toUpperCase(), sub: `${x.n} GP`, flag: x.c.flag, prof: profile(matches.filter((m) => m.opp === x.abbr)) }));
  }, [hlBy, hlMin, clubsByGames, seasonProf, played, matches]);

  // ─── radar (shared) ───
  const [radRef, radW] = useWidth(520, 200);
  // Phones (v51.18): the radar fills its box and every label sits inside it,
  // 8px clear of the edges. Side labels wrap to two lines; the web takes the
  // room the labels leave. Label width is estimated from its letters
  // (0.62em each at 12px bold). Desktop keeps its fixed proportions.
  const radPhone = useScreen() === 'phone';
  const LBL = 12, LBL_EDGE = 8, LBL_GAP = 8, LBL_LINE = 14;
  const lblLines = (p, i) => (radPhone && i % 3 !== 0 ? p.label.split(' ').reduce((ls, w, k) => (k ? [ls[0], ls.slice(1).concat(w).join(' ')].filter(Boolean) : [w]), []) : [p.label]);
  const lblW = Math.max(...PILLARS.map((p, i) => (i % 3 !== 0 ? Math.max(...lblLines(p, i).map((l) => l.length * LBL * 0.62)) : 0)));
  const phoneR0 = Math.max(40, Math.min((radW / 2 - LBL_EDGE - lblW - LBL_GAP) / Math.cos(Math.PI / 6), radW * 0.4));
  const RW = radPhone ? radW : Math.min(520, Math.max(300, radW));
  const R0 = radPhone ? phoneR0 : Math.min(RW * 0.27, Math.round(RW * 0.8) * 0.36);
  const RH = radPhone ? Math.round(2 * R0 + 2 * (LBL_GAP + LBL + LBL_EDGE) + 8) : Math.round(RW * 0.8);
  const cx = RW / 2, cy = radPhone ? RH / 2 : RH / 2 + 4, PADX = 0;
  const ptAt = (i, f) => { const a = -Math.PI / 2 + (i * Math.PI) / 3; return [cx + R0 * f * Math.cos(a), cy + R0 * f * Math.sin(a)]; };
  const polyOf = (prof) => PILLARS.map((p, i) => ptAt(i, clamp01(pos(p, prof[p.key]))).map((v) => v.toFixed(1)).join(',')).join(' ');
  const [axisHover, setAxisHover] = useState(null);
  const grid = (
    <g>
      {[0.25, 0.5, 0.75, 1].map((f) => <polygon key={f} points={PILLARS.map((_, i) => ptAt(i, f).join(',')).join(' ')} fill="none" stroke="rgb(var(--c-slate-200))" />)}
      {PILLARS.map((_, i) => { const [x, y] = ptAt(i, 1); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgb(var(--c-slate-200))" />; })}
      {PILLARS.map((p, i) => {
        const hover = { className: 'cursor-default', onPointerMove: (e) => setAxisHover({ p, at: pointAt(e) }), onPointerLeave: leaveUnlessTouch(setAxisHover) };
        if (!radPhone) { const [x, y] = ptAt(i, 1.2); const anchor = Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end'; return <text key={p.key} x={x} y={y + 4} fontSize="12" fontWeight="700" textAnchor={anchor} fill="rgb(var(--c-slate-700))" {...hover}>{p.label}</text>; }
        // Phone: top and bottom labels centred just outside the rim, side labels beside it
        const [x, y] = ptAt(i, 1); const ls = lblLines(p, i);
        const anchor = i % 3 === 0 ? 'middle' : x > cx ? 'start' : 'end';
        const tx = anchor === 'middle' ? x : anchor === 'start' ? x + LBL_GAP : x - LBL_GAP;
        const y0 = i === 0 ? y - LBL_GAP - 3 : i === 3 ? y + LBL_GAP + LBL - 1 : y + 4 - ((ls.length - 1) * LBL_LINE) / 2;
        return <text key={p.key} x={tx} y={y0} fontSize={LBL} fontWeight="700" textAnchor={anchor} fill="rgb(var(--c-slate-700))" {...hover}>{ls.map((l, k) => <tspan key={k} x={tx} dy={k ? LBL_LINE : 0}>{l}</tspan>)}</text>;
      })}
    </g>
  );
  const marks = (prof, color) => PILLARS.map((p, i) => { const r = pos(p, prof[p.key]); if (r <= 1 && r >= 0) return null; const out = r > 1; const [x1, y1] = ptAt(i, out ? 1 : 0.0001); const a = -Math.PI / 2 + (i * Math.PI) / 3, k = out ? 1 : -1; const tip = [x1 + Math.cos(a) * 9 * k, y1 + Math.sin(a) * 9 * k]; const l = [x1 + Math.cos(a + Math.PI / 2) * 4, y1 + Math.sin(a + Math.PI / 2) * 4], rr = [x1 - Math.cos(a + Math.PI / 2) * 4, y1 - Math.sin(a + Math.PI / 2) * 4]; return out ? <polygon key={p.key} points={`${tip.join(',')} ${l.join(',')} ${rr.join(',')}`} fill={color}><title>{`${p.label}: ${p.fmt(prof[p.key])} (off the scale)`}</title></polygon> : null; });
  const dots = (prof, color, hollow) => PILLARS.map((p, i) => { const [x, y] = ptAt(i, clamp01(pos(p, prof[p.key]))); return hollow ? <circle key={p.key} cx={x} cy={y} r="4.5" fill="rgb(var(--c-white, 255 255 255))" className="fill-white" stroke={color} strokeWidth="2.2" /> : <circle key={p.key} cx={x} cy={y} r="4" fill={color} />; });

  // ─── layer card + picker ───
  const [pickKind, setPickKind] = useState('seasons');
  const [oppQuery, setOppQuery] = useState('');
  const [persp, setPersp] = useState('us');
  const [venueScope, setVenueScope] = useState(0);
  const choose = (L) => { if (menu === 'A') setLA(L); else if (menu === 'B') setLB(L); setMenu(null); };
  const renderPicker = (forLayer) => {
    const curL = forLayer === 'A' ? LA : LB;
    const kinds = [['career', 'Career', 'Your whole history', 1, Trophy], ['seasons', 'Seasons', 'One campaign', played.length, Calendar], ['venue', 'Venue', 'Home or away', 2, Home], ['opp', 'Opponents', 'Your record against a club', clubsByGames.length, Shield]];
    return (
      <div className="absolute z-40 top-full right-0 mt-2 w-[min(620px,calc(100vw-2rem))] bg-white rounded-xl shadow-xl ring-1 ring-slate-200 flex flex-col sm:flex-row text-left" onClick={(e) => e.stopPropagation()}>
        <div className="sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-100 p-2 flex sm:flex-col gap-1 overflow-x-auto">
          {kinds.map(([k, t, d, n, I]) => (
            <button key={k} type="button" onClick={() => (k === 'career' ? choose({ kind: 'career' }) : setPickKind(k))} className={`flex items-start gap-2 rounded-lg px-2 py-2 text-left shrink-0 ${pickKind === k ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
              <I className="w-4 h-4 text-slate-500 mt-0.5" /><span className="min-w-0"><span className="flex justify-between gap-2 text-sm font-semibold text-slate-900"><span>{t}</span><span className="text-xs font-medium text-slate-400">{n}</span></span><span className="hidden sm:block text-[11px] text-slate-500 leading-snug">{d}</span></span>
            </button>
          ))}
        </div>
        <div className="flex-1 p-2 max-h-[360px] overflow-y-auto">
          {pickKind === 'seasons' && <>
            <div className={`flex justify-between px-3 py-1 ${EB} text-slate-400`}><span>Season</span><span>PPG</span></div>
            {played.map((s) => { const pr = seasonProf[s.num]; const on = curL.kind === 'season' && curL.key === s.num; return (
              <button key={s.num} type="button" onClick={() => choose({ kind: 'season', key: s.num })} className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left ${on ? 'bg-slate-50 ring-1 ring-slate-300' : 'hover:bg-slate-50'}`} style={{ boxShadow: `inset 3px 0 0 ${seasonHex(s.num)}` }}>
                <span className="w-7 text-sm font-extrabold text-slate-900">S{s.num}</span><span className="w-16 text-xs text-slate-500">{yearLabel(s.year)}</span><span className="w-12 text-xs font-semibold text-slate-500">{divLabel(s.division)}</span><span className="hidden sm:inline text-xs font-semibold tabular-nums"><WDLRecord w={pr.w} d={pr.d} l={pr.l} /></span><span className="ml-auto text-sm font-semibold tabular-nums text-slate-900">{pr.ppg.toFixed(2)}</span><span className="w-3 text-xs font-bold">{on ? '✓' : ''}</span>
              </button>
            ); })}
          </>}
          {pickKind === 'venue' && <>
            <div className="flex flex-wrap gap-1 px-1 pb-2">{[0, ...played.map((s) => s.num)].map((n) => <button key={n} type="button" onClick={() => setVenueScope(n)} className={`text-xs font-semibold rounded-md px-2 py-1 ${venueScope === n ? 'bg-slate-900 text-slate-50' : 'bg-slate-100 text-slate-600'}`}>{n ? `S${n}` : 'All seasons'}</button>)}</div>
            {['H', 'A'].map((v) => { const list = matches.filter((x) => x.venue === v && (!venueScope || x.season === venueScope)); const pr = profile(list); const I = v === 'H' ? Home : Plane; return (
              <button key={v} type="button" onClick={() => choose({ kind: 'venue', key: v, scope: venueScope || undefined })} className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50"><I className="w-4 h-4" style={{ color: v === 'H' ? HC : 'rgb(var(--c-sky-600))' }} /><span className="text-sm font-semibold text-slate-900">{v === 'H' ? 'Home' : 'Away'}</span><span className="text-xs text-slate-500">{list.length} GP</span><span className="ml-auto text-xs font-semibold tabular-nums"><WDLRecord w={pr.w} d={pr.d} l={pr.l} /></span><span className="w-12 text-right text-sm font-semibold tabular-nums">{pr.ppg.toFixed(2)}</span></button>
            ); })}
          </>}
          {pickKind === 'opp' && <>
            <div className="flex flex-wrap items-center gap-2 px-1 pb-2"><input value={oppQuery} onChange={(e) => setOppQuery(e.target.value)} placeholder={`Search ${clubsByGames.length} clubs…`} className="flex-1 min-w-[140px] h-9 rounded-lg ring-1 ring-slate-200 px-3 text-sm bg-white" /><Segmented value={persp} onChange={setPersp} options={[{ value: 'us', label: 'Us vs them' }, { value: 'them', label: 'Them vs us' }]} /></div>
            <div className={`flex justify-between px-3 py-1 ${EB} text-slate-400`}><span>Most played · avg rank</span><span>Your record</span></div>
            {clubsByGames.filter((x) => !oppQuery || String(x.c.name).toLowerCase().includes(oppQuery.toLowerCase())).slice(0, 40).map((x) => { const pr = profile(matches.filter((m) => m.opp === x.abbr)); return (
              <button key={x.abbr} type="button" onClick={() => choose({ kind: 'opp', key: x.abbr, persp })} className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-slate-50"><Flag emoji={x.c.flag} size={18} /><span className="text-sm font-semibold text-slate-900 truncate">{String(x.c.name || x.abbr).toUpperCase()}</span>{x.c.avg > 0 && <span className="text-xs text-slate-400 tabular-nums">{x.c.avg.toFixed(1)}</span>}<span className="ml-auto text-xs font-semibold tabular-nums"><WDLRecord w={pr.w} d={pr.d} l={pr.l} /></span><span className="w-12 text-right text-xs text-slate-500">{x.n} GP</span></button>
            ); })}
          </>}
        </div>
      </div>
    );
  };
  const renderLayerCard = (d, which, hollow = false) => (
    <div className="relative flex-1 min-w-0 bg-slate-50 rounded-xl ring-1 ring-slate-200 p-3 sm:p-4 flex flex-col gap-2" style={{ boxShadow: d.us ? `inset 0 3px 0 ${d.color}` : `inset 4px 0 0 ${d.color}` }}>
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-2 min-w-0 flex-wrap">
          <svg width="28" height="12" className="shrink-0"><line x1="0" x2="28" y1="6" y2="6" stroke={d.color} strokeWidth="2.5" />{hollow ? <circle cx="14" cy="6" r="4" className="fill-white" fill="#fff" stroke={d.color} strokeWidth="2" /> : <circle cx="14" cy="6" r="4" fill={d.color} />}</svg>
          {d.flag && <Flag emoji={d.flag} size={20} />}
          <span className="text-base sm:text-lg font-extrabold text-slate-900 truncate">{d.title}</span>
          <span className="text-xs font-medium text-slate-500">{d.sub}</span>
        </span>
        <span className="relative shrink-0">
          <button type="button" onClick={(e) => { e.stopPropagation(); setPickKind(which === 'A' ? (LA.kind === 'career' ? 'seasons' : LA.kind === 'season' ? 'seasons' : LA.kind) : (LB.kind === 'career' ? 'seasons' : LB.kind === 'season' ? 'seasons' : LB.kind)); setMenu(menu === which ? null : which); }} className={`text-xs font-semibold rounded-md px-2 py-1 min-h-[32px] ${menu === which ? 'bg-slate-900 text-slate-50' : 'text-slate-600 ring-1 ring-slate-200 bg-white'}`}>Change ▾</button>
          {menu === which && renderPicker(which)}
        </span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1"><span><span className="text-2xl font-extrabold tabular-nums text-slate-900">{d.prof.pts}</span> <span className="text-xs text-slate-500">pts</span></span><span className="text-sm font-semibold tabular-nums"><WDLRecord w={d.prof.w} d={d.prof.d} l={d.prof.l} /></span><span className="text-sm font-semibold tabular-nums text-slate-900">{d.prof.ppg.toFixed(2)} <span className="text-xs font-medium text-slate-500">PPG</span></span><span className={`text-sm font-semibold tabular-nums ${d.prof.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(d.prof.gd)} GD</span></div>
    </div>
  );

  // Versus scorecard row: both bars from the left on the pillar's scale (stretched if a value is off it)
  const vsRow = (p) => {
    const va = A.prof[p.key], vb = B.prof[p.key];
    const raw = [pos(p, va), pos(p, vb)];
    const over = Math.max(1, ...raw); // only "more than the rim" can stretch a bar
    const stretchedMax = over > 1 ? (p.hi > p.lo ? Math.ceil((p.lo + (p.hi - p.lo) * over) * 10) / 10 : Math.ceil((p.lo + (p.hi - p.lo) * over) * 10) / 10) : null;
    const f = (v) => clamp01(pos(p, v) / over);
    const car = career[p.key], bst = bestSeasonVal(p);
    const lead = better(p, va, vb);
    const bar = (v, color) => (
      <div className="relative h-[9px] rounded-full bg-slate-100">
        <div className="absolute left-0 top-0 bottom-0 rounded-full" style={{ width: `${f(v) * 100}%`, background: color }} />
        <div className="absolute -top-1 -bottom-1 w-0.5 bg-slate-600" style={{ left: `${f(car) * 100}%` }} />
        {bst != null && <div className="absolute -top-1 -bottom-1 w-0.5" style={{ left: `${f(bst) * 100}%`, background: '#b45309' }} />}
      </div>
    );
    return (
      <div key={p.key} className="grid grid-cols-[minmax(0,1fr)_64px] sm:grid-cols-[140px_minmax(0,1fr)_72px_120px] items-center gap-x-4 gap-y-1 py-3 border-b border-slate-100 last:border-b-0">
        <div className="col-span-2 sm:col-span-1"><div className="text-sm font-semibold text-slate-900">{p.label}</div><div className="text-[11px] text-slate-500">{p.sub}{stretchedMax != null ? ` · scale to ${p.fmt(stretchedMax)}` : ''}</div></div>
        <div className="flex flex-col gap-2">{bar(va, A.color)}{bar(vb, B.color)}</div>
        <div className="flex flex-col gap-1.5 text-right"><span className={`text-sm tabular-nums ${lead > 0 ? 'font-extrabold text-slate-900' : 'font-medium text-slate-500'}`}>{p.fmt(va)}</span><span className={`text-sm tabular-nums ${lead < 0 ? 'font-extrabold text-slate-900' : 'font-medium text-slate-500'}`}>{p.fmt(vb)}</span></div>
        <span className="hidden sm:block text-xs font-semibold" style={{ color: lead > 0 ? A.color : lead < 0 ? B.color : undefined }}>{lead === 0 ? 'Level' : `${(lead > 0 ? A : B).title.split(' · ').pop()} by ${p.gap(Math.abs(va - vb))}`}</span>
      </div>
    );
  };

  // Group dot line for one pillar
  const [dotHover, setDotHover] = useState(null);
  const dotLine = (p) => {
    const vals = gLayers.map((L) => ({ L, v: L.prof[p.key], r: pos(p, L.prof[p.key]) }));
    if (!vals.length) return null;
    const over = Math.max(1, ...vals.map((x) => x.r));
    const f = (r) => clamp01(r / over);
    const sorted = [...vals].sort((a, b) => b.r - a.r);
    const best = sorted[0], worst = sorted[sorted.length - 1];
    const seen = {};
    return (
      <div key={p.key} className="grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] items-center gap-x-4 py-3 border-b border-slate-100 last:border-b-0">
        <div><div className="text-sm font-semibold text-slate-900">{p.label}</div><div className="text-[11px] text-slate-500">{p.sub}{over > 1 ? ' · scale stretched' : ''}</div></div>
        <div className="relative h-5 my-4 mx-2">
          <div className="absolute left-0 right-0 top-[9px] h-0.5 bg-slate-200" />
          <div className="absolute top-0.5 h-4 w-0.5 bg-slate-600" style={{ left: `${f(pos(p, career[p.key])) * 100}%` }} />
          {[...vals].sort((a, b) => (a.L.id === hl ? 1 : 0) - (b.L.id === hl ? 1 : 0)).map(({ L, v, r }) => { const k = Math.round(f(r) * 200); const n = seen[k] || 0; seen[k] = n + 1; const on = !hl || hl === L.id; return (
            <span key={L.id} onPointerMove={(e) => setDotHover({ L, p, v, at: pointAt(e) })} onPointerLeave={leaveUnlessTouch(setDotHover)} className="absolute top-[3px] w-3.5 h-3.5 rounded-full cursor-default" style={{ left: `calc(${f(r) * 100}% - 7px + ${n * 9}px)`, background: L.color, boxShadow: `0 0 0 2px #fff${hl === L.id ? `, 0 0 0 4px ${L.color}` : ''}`, opacity: on ? 1 : 0.3, zIndex: hl === L.id ? 2 : 1 }} />
          ); })}
          <span className="absolute -top-[18px] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-slate-700" style={{ left: `${f(best.r) * 100}%` }}>{best.L.short} {p.fmt(best.v)}</span>
          {worst !== best && <span className="absolute top-[22px] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-slate-700" style={{ left: `${f(worst.r) * 100}%` }}>{worst.L.short} {p.fmt(worst.v)}</span>}
        </div>
      </div>
    );
  };
  const maxG = gKind === 'seasons' ? 8 : 6;
  const addOptions = gKind === 'seasons' ? played.filter((s) => !seasonsSel.includes(s.num)) : clubsByGames.filter((x) => !clubsSel.includes(x.abbr));
  const [addQuery, setAddQuery] = useState('');

  return (
    <div className="space-y-6" onClick={() => menu && setMenu(null)}>
      <div className="flex items-center justify-between gap-3">
        <span className={`${EB} text-slate-500`}>Spider matrix</span>
        <Segmented value={mode} onChange={(v) => { setMode(v); setMenu(null); }} options={[{ value: 'versus', label: 'Versus' }, { value: 'group', label: 'Group' }]} />
      </div>

      {mode === 'versus' && A && B && <>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {renderLayerCard(A, 'A')}
          <button type="button" title="Swap sides" onClick={() => { const a = LA; setLA(LB); setLB(a); }} className="self-center w-10 h-10 shrink-0 rounded-full bg-white ring-1 ring-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900"><ArrowLeftRight className="w-4 h-4" /></button>
          {renderLayerCard(B, 'B', true)}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs"><span className="text-slate-500 font-semibold">Quick picks</span>{quick.map((q) => <button key={q.label} type="button" onClick={() => { setLA(q.a); setLB(q.b); }} className={`rounded-md px-2 py-1 font-semibold min-h-[32px] ${isQuick(q) ? 'bg-slate-900 text-slate-50' : 'bg-white ring-1 ring-slate-200 text-slate-600 hover:text-slate-900'}`}>{q.label}</button>)}</div>
        <Section title={`${A.title.split(' · ').pop()} vs ${B.title.split(' · ').pop()}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,520px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            <div ref={radRef} className="w-full">
              <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} className="max-w-full overflow-visible">
                <defs>
                  <mask id="sp-notB"><rect x="0" y="0" width={RW} height={RH} fill="white" /><polygon points={polyOf(B.prof)} fill="black" /></mask>
                  <mask id="sp-notA"><rect x="0" y="0" width={RW} height={RH} fill="white" /><polygon points={polyOf(A.prof)} fill="black" /></mask>
                </defs>
                {grid}
                <polygon points={polyOf(A.prof)} fill={A.color} fillOpacity="0.3" mask="url(#sp-notB)" />
                <polygon points={polyOf(B.prof)} fill={B.color} fillOpacity="0.3" mask="url(#sp-notA)" />
                <polygon points={polyOf(A.prof)} fill="none" stroke={A.color} strokeWidth="2.2" />
                <polygon points={polyOf(B.prof)} fill="none" stroke={B.color} strokeWidth="2.2" />
                {dots(A.prof, A.color, false)}{dots(B.prof, B.color, true)}
                {marks(A.prof, A.color)}{marks(B.prof, B.color)}
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-slate-600 pb-1">
                <span className="inline-flex items-center gap-1.5"><span className="w-5 h-2 rounded-full" style={{ background: A.color }} />{A.title.split(' · ').pop()} (top)</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-5 h-2 rounded-full" style={{ background: B.color }} />{B.title.split(' · ').pop()} (bottom)</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-0.5 h-3 bg-slate-600" />Career average</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-0.5 h-3" style={{ background: '#b45309' }} />Best season</span>
              </div>
              {PILLARS.map(vsRow)}
            </div>
          </div>
        </Section>
      </>}

      {mode === 'group' && <>
        <div className="flex flex-wrap items-center gap-3">
          <Segmented value={gKind} onChange={(v) => { setGKind(v); setHl(null); }} options={[{ value: 'seasons', label: 'Seasons' }, { value: 'clubs', label: 'Clubs' }]} />
          <span className="text-xs text-slate-500">{gLayers.length} of {maxG}{gKind === 'clubs' ? ' · your record against each' : ''}</span>
        </div>
        <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1">
          {gLayers.map((L) => (
            <div key={L.id} onPointerEnter={() => setHl(L.id)} onPointerLeave={() => setHl(null)} className={`w-[148px] shrink-0 rounded-lg px-2.5 py-1.5 ring-1 ${hl === L.id ? 'bg-white ring-slate-900' : 'bg-slate-50 ring-slate-200'}`} style={{ boxShadow: L.us ? `inset 0 3px 0 ${L.color}` : `inset 4px 0 0 ${L.color}` }}>
              <div className="flex items-center justify-between gap-1"><span className="flex items-center gap-1.5 min-w-0">{L.flag && <Flag emoji={L.flag} size={16} />}<span className="text-xs font-extrabold text-slate-900 truncate">{gKind === 'seasons' ? `${L.short} · ${L.sub}` : L.name}</span></span><button type="button" onClick={() => { if (gKind === 'seasons') setGSeasons(seasonsSel.filter((n) => `S${n}` !== L.id)); else setGClubs(clubsSel.filter((a) => a !== L.id)); }} className="text-slate-400 hover:text-slate-900 shrink-0"><X className="w-3.5 h-3.5" /></button></div>
              <div className="flex items-baseline justify-between mt-1"><span className="text-[11px] font-semibold tabular-nums"><WDLRecord w={L.prof.w} d={L.prof.d} l={L.prof.l} /></span><span className="text-[11px] font-semibold tabular-nums text-slate-500">{L.prof.ppg.toFixed(2)}</span></div>
            </div>
          ))}
          {gLayers.length < maxG && addOptions.length > 0 && (
            <span className="relative shrink-0">
              <button type="button" onClick={(e) => { e.stopPropagation(); setMenu(menu === 'add' ? null : 'add'); }} className="h-full min-h-[52px] w-[110px] rounded-lg ring-1 ring-dashed ring-slate-300 flex items-center justify-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"><Plus className="w-3.5 h-3.5" />Add {gKind === 'seasons' ? 'season' : 'club'}</button>
              {menu === 'add' && (
                <div className="absolute z-40 top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 p-2 max-h-80 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  {gKind === 'clubs' && <input value={addQuery} onChange={(e) => setAddQuery(e.target.value)} placeholder="Search clubs…" className="w-full h-9 rounded-lg ring-1 ring-slate-200 px-3 text-sm mb-1" />}
                  {gKind === 'seasons'
                    ? addOptions.map((s) => <button key={s.num} type="button" onClick={() => { setGSeasons([...seasonsSel, s.num].sort((a, b) => a - b)); setMenu(null); }} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-50" style={{ boxShadow: `inset 3px 0 0 ${seasonHex(s.num)}` }}><span className="text-sm font-extrabold">S{s.num}</span><span className="text-xs text-slate-500">{yearLabel(s.year)} · {divLabel(s.division)}</span></button>)
                    : addOptions.filter((x) => !addQuery || String(x.c.name).toLowerCase().includes(addQuery.toLowerCase())).slice(0, 30).map((x) => <button key={x.abbr} type="button" onClick={() => { setGClubs([...clubsSel, x.abbr]); setMenu(null); setAddQuery(''); }} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-50"><Flag emoji={x.c.flag} size={16} /><span className="text-sm font-semibold truncate">{String(x.c.name).toUpperCase()}</span><span className="ml-auto text-xs text-slate-500">{x.n} GP</span></button>)}
                </div>
              )}
            </span>
          )}
        </div>
        <Section title={gKind === 'seasons' ? 'Your seasons, side by side' : 'Your record against each club'} sub="Outlines only."
          right={<Segmented value={gTable ? 'table' : 'lines'} onChange={(v) => setGTable(v === 'table')} options={[{ value: 'lines', label: 'Lines' }, { value: 'table', label: 'Table' }]} />}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,520px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            <div ref={radRef} className="w-full">
              <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} className="max-w-full overflow-visible">
                {grid}
                {gLayers.filter((L) => L.id !== hl).map((L) => <polygon key={L.id} points={polyOf(L.prof)} fill="none" stroke={L.color} strokeWidth="1.6" strokeOpacity={hl ? 0.3 : 0.85} onPointerEnter={() => setHl(L.id)} onPointerLeave={() => setHl(null)} />)}
                {hl && gLayers.filter((L) => L.id === hl).map((L) => <g key={L.id}><polygon points={polyOf(L.prof)} fill="none" stroke={L.color} strokeWidth="3.2" />{dots(L.prof, L.color, false)}{marks(L.prof, L.color)}</g>)}
              </svg>
            </div>
            <div>
              {!gTable ? <>
                <div className="flex flex-wrap gap-x-5 text-xs font-medium text-slate-600 pb-1"><span className="inline-flex items-center gap-1.5"><span className="w-0.5 h-3 bg-slate-600" />Your career average</span><span>Best above the line, worst below</span></div>
                {PILLARS.map(dotLine)}
              </> : (
                <div className="rounded-xl border border-slate-200 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className={`${EB} text-slate-500 bg-slate-50`}><th className="text-left px-3 py-2">{gKind === 'seasons' ? 'Season' : 'Club'}</th>{PILLARS.map((p) => <th key={p.key} className="px-2 py-2 text-right whitespace-nowrap">{p.label}</th>)}</tr></thead>
                    <tbody>{gLayers.map((L) => <tr key={L.id} className="border-t border-slate-100" onPointerEnter={() => setHl(L.id)} onPointerLeave={() => setHl(null)}><td className="px-3 py-2 font-semibold text-slate-900 whitespace-nowrap"><span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: L.color }} />{gKind === 'seasons' ? L.short : L.name}</td>{PILLARS.map((p) => <td key={p.key} className="px-2 py-2 text-right tabular-nums text-slate-700">{p.fmt(L.prof[p.key])}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Section>
      </>}

      {/* Highs & lows: the best and worst at each pillar, career-wide */}
      <Section title="Highs & lows" sub={hlBy === 'club' ? 'The best and worst opponent in each pillar.' : 'Your best and worst season in each pillar.'}
        right={<div className="flex flex-wrap gap-2"><Segmented value={hlBy} onChange={setHlBy} options={[{ value: 'club', label: 'By club' }, { value: 'season', label: 'By season' }]} />{hlBy === 'club' && <Segmented value={hlMin} onChange={setHlMin} options={[{ value: 'all', label: 'All' }, { value: '5', label: '5+' }, { value: '10', label: '10+' }, { value: 'top', label: 'Top 10' }]} />}</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PILLARS.map((p) => {
            const pool = extremesPool.filter((x) => x.prof && x.prof.gp > 0);
            if (!pool.length) return null;
            const sorted = [...pool].sort((a, b) => pos(p, b.prof[p.key]) - pos(p, a.prof[p.key]));
            const row = (tag, x) => (
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 min-w-0"><span className={`${EB} w-12 text-slate-400`}>{tag}</span>{x.flag && <Flag emoji={x.flag} size={18} />}<span className="text-[13px] font-semibold text-slate-800 truncate">{x.name}</span><span className="text-xs text-slate-400 whitespace-nowrap">{x.sub}</span></span>
                <span className="text-sm font-extrabold tabular-nums text-slate-900">{p.fmt(x.prof[p.key])}</span>
              </div>
            );
            return <div key={p.key} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3"><div className={`${EB} text-slate-500`}>{p.label}</div>{row('Best', sorted[0])}{row('Worst', sorted[sorted.length - 1])}</div>;
          })}
        </div>
      </Section>

      {axisHover && (
        <FloatCard at={axisHover.at} width={260}>
          <span className="text-sm font-extrabold text-slate-900">{axisHover.p.label}</span>
          <span className="text-xs text-slate-500">{axisHover.p.sub}. Scale {axisHover.p.fmt(axisHover.p.lo)} at the centre to {axisHover.p.fmt(axisHover.p.hi)} at the rim.</span>
          {mode === 'versus' && A && B && <span className="flex justify-between text-sm pt-1 border-t border-slate-100"><span style={{ color: A.color }} className="font-semibold">{A.title.split(' · ').pop()} {axisHover.p.fmt(A.prof[axisHover.p.key])}</span><span style={{ color: B.color }} className="font-semibold">{B.title.split(' · ').pop()} {axisHover.p.fmt(B.prof[axisHover.p.key])}</span></span>}
        </FloatCard>
      )}
      {dotHover && (
        <FloatCard at={dotHover.at} width={220}>
          <span className="flex items-center gap-2">{dotHover.L.flag && <Flag emoji={dotHover.L.flag} size={16} />}<span className="text-sm font-extrabold text-slate-900">{gKind === 'seasons' ? dotHover.L.name : dotHover.L.name}</span></span>
          <span className="flex justify-between text-sm"><span className="text-slate-500">{dotHover.p.label}</span><span className="font-extrabold tabular-nums">{dotHover.p.fmt(dotHover.v)}</span></span>
        </FloatCard>
      )}
    </div>
  );
}
