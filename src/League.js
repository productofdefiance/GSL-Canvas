/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — League.js (League page shell: Seasons, Matchdays, Opponents)
 *  Version:  League v37
 *  Date:     2026-10-18, 02:05 UTC
 *  Latest:   Canvas v51.22 code tidy: leftovers removed; counts come from the sheet.
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */

/*
 * ════════════════════════════════════════════════════════════════════
 *  STYLE GUIDE
 *  Describes how the canvas already looks. Follow it for anything new
 *  so new features match. The same guide applies to every canvas.
 * ════════════════════════════════════════════════════════════════════
 *
 *  TEXT
 *   Section title ........ text-lg  font-extrabold  text-slate-900
 *   Card title ........... text-sm or text-base  font-bold / extrabold
 *   Subhead (if needed) .. text-xs  text-slate-600
 *   Big stat number ...... text-2xl or text-3xl  font-black
 *   Labels, buttons ...... text-xs  font-bold
 *   Small print .......... text-[11px]
 *   For new work: use font-bold for labels and keep font-black for big
 *   numbers. Don't go below 11px for anything that carries information.
 *
 *  COLOURS (each colour keeps the same meaning everywhere)
 *   emerald ... wins, positive results, clean sheets
 *   amber ..... draws, away
 *   rose ...... losses, negative results
 *   indigo .... home, selected items, main actions, links
 *   slate ..... everything neutral (text, borders, backgrounds)
 *   Season lines use SEASON_COLORS. Opponents use CLUB_COLORS.
 *   Division badges: Div 1 indigo, Div 2 yellow, Div 3 slate, Div 4 amber.
 *
 *  SHAPE
 *   Cards ................ white, rounded-xl or rounded-2xl, slate-200
 *                          border, shadow-xs, p-5 or p-6
 *   Buttons and inputs ... rounded-lg
 *   Pills and tags ....... rounded-full (pills), rounded-md (small tags)
 *   Page background ...... slate-50
 *
 *  SHARED CONTROLS (use these; don't build new ones)
 *   Segmented ..... pick one of a few options (view switches, metrics)
 *   FilterPills ... pick one from a longer list (seasons, nations)
 *   ControlLabel .. small label above a row of controls
 *   ResetButton ... Reset / Clear All / Select All (greys out when idle)
 *   SearchInput ... search box with a clear (x) button
 *   SELECT_CLASS .. dropdowns
 *   MarginCell .... one cell of the margin matrix
 *   TABS .......... tab names and order
 *   Rules: a row with an "All" pill gets no separate reset link. A panel
 *   with several filters gets one Reset button, always in the same place.
 *
 *  DATA RULES
 *   - Never type a stat, name or season number into on-screen text.
 *     Calculate it from the data so it updates on its own.
 *   - League rules (games per season, position column) live in the
 *     LEAGUE SETTINGS block near the top of the code.
 *   - The sheet is read by column position. Inserting or deleting a
 *     column in the sheet shifts everything.
 *   - Club #92 onward is ignored on purpose (that is the user's own club).
 *   - Seasons 1-15 are in use.
 *   - Editing stays off (ENABLE_EDITING) until saving is tested on a copy
 *     of the sheet.
 *
 *  BUILD RULES
 *   - Only React, d3 and lucide-react. No other libraries.
 *   - Hover state lives inside the chart or tooltip, not in App. If it
 *     lives in App, every mouse move redraws the whole tab.
 *   - No hidden or unused views. Try ideas in a forked copy instead.
 *   - Every delivered file gets a new version number, a changelog entry
 *     and an updated APP_VERSION (the corner tag).
 * ════════════════════════════════════════════════════════════════════
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  PageHeader,
  HighlightsBar,
  HighlightCard,
  Segmented,
  FilterPills,
  ResetButton,
  SearchInput,
  SELECT_CLASS,
  Flag,
  PAGE_WIDTH,
  HoverProvider,
  clubHex,
  TYPE,
  Score,
  WDLRecord,
  RecordKey,
  MainBar,
  ScopeStepper,
  useSort,
  ownClubInfo,
  ViewSwitch,
  useStored,
  signed,
  seasonGames,
} from './ui.js';
import { FormMarginsTab, PointsTab, HomeAwayTab, SpiderTab } from './LeagueTabs.js';
import {
  Trophy,
  TrendingUp,
  Calendar,
  Shield,
  Target,
  ChevronRight,
  Search,
  ArrowUpDown,
  Layers,
  X,
  Zap,
  Users,
  Activity,
  Home,
  LayoutGrid,
  List,
  Star,
} from 'lucide-react';

const COUNTRY_NAMES = {
  '🇫🇷': 'France',
  '🇪🇸': 'Spain',
  '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'England',
  '🇩🇪': 'Germany',
  '🇮🇹': 'Italy',
  '🇵🇹': 'Portugal',
  '🇳🇱': 'Netherlands',
  '🇹🇷': 'Turkey',
  '🏴󠁧󠁢󠁳󠁣󠁴󠁿': 'Scotland',
  '🇬🇷': 'Greece',
  '🇧🇪': 'Belgium',
  '🇨🇿': 'Czechia',
  '🇺🇦': 'Ukraine',
  '🇦🇹': 'Austria',
  '🇨🇭': 'Switzerland',
  '🇭🇷': 'Croatia',
  '🇩🇰': 'Denmark',
  '🇸🇪': 'Sweden',
  '🇳🇴': 'Norway',
  '🇷🇴': 'Romania',
  '🇵🇱': 'Poland',
};

// Season colours: ui.js seasonColor() (v23).

// Club colours: from the sheet, through ui.js clubHex() (v23).

// ─── GSL LEAGUE SETTINGS ─────────────────────────────────────────────
// Column in the season row that holds the final (or current) league position.
const POSITION_COL = 4;
// ─────────────────────────────────────────────────────────────────────

// Shared controls (Segmented, FilterPills, ...) now live in ui.js.

// Tab bar: order and names live here. To rename or reorder a tab, edit this list.
// (The 'id' must match the tab's content block further down; don't change ids.)
const TABS = [
  { id: 'overview', label: 'Seasons', icon: Layers },
  { id: 'fixtures', label: 'Matchdays', icon: Calendar },
  { id: 'clubs', label: 'Opponents', icon: Shield },
  { id: 'race', label: 'Points', icon: TrendingUp },
  { id: 'analytics', label: 'Form & Margins', icon: Activity },
  { id: 'homeaway', label: 'Home vs Away', icon: Home },
  { id: 'spider', label: 'Spider Matrix', icon: Target },
];

// ─────────────────────────────────────────────────────────────────────

// Points per game. The only fair way to compare seasons of different lengths
// (46 games in Div 2-4, 38 in Div 1), so every "record season" uses it.
function seasonPpg(s) {
  return s && s.gp > 0 ? s.pts / s.gp : 0;
}

function ordinal(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;
}

function getClubColor(abbr, fallback = '#4f46e5') {
  if (!abbr) return fallback;
  return clubHex(abbr) || fallback;
}

// Helper: Ensure optimal text contrast against any club background color (dark slate for yellow/bright, white for dark)
function getContrastTextColor(hexColor) {
  if (!hexColor || typeof hexColor !== 'string') return '#ffffff';
  const cleanHex = hexColor.replace('#', '');
  if (cleanHex.length !== 6) return '#ffffff';
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 155 ? '#0f172a' : '#ffffff';
}

// Helper: Safely parse numeric values and guard against formula errors (#VALUE!, #N/A, #REF!, NaN)
function safeNum(val, fallback = 0) {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (
      trimmed.startsWith('#') ||
      trimmed.toUpperCase() === 'N/A' ||
      trimmed === '-' ||
      trimmed === '-'
    ) {
      return fallback;
    }
    const parsed = parseFloat(trimmed);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
}

// ─── v51.06: MATCHDAYS PIECES ───────────────────────────────────────
// "2031 - 32" → "2031–32"; "DIV 1" → "Division 1"
function yearLabel(y) { return String(y || '').replace(/\s*-\s*/, '–'); }
function divisionLabel(d) { const m = String(d || '').match(/(\d+)/); return m ? `Division ${m[1]}` : String(d || ''); }
// An ordinal with a raised suffix, for big numbers (1st, 2nd …)
function OrdinalNum({ n }) {
  const t = ordinal(n);
  return <>{String(n)}<span className="text-[0.55em] align-[0.55em] ml-[1px]">{t.slice(String(n).length)}</span></>;
}
// W / D / L chip beside a score
const RESULT_CHIP = {
  W: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  D: 'bg-amber-50 text-amber-700 ring-amber-200',
  L: 'bg-rose-50 text-rose-700 ring-rose-200',
};
function ResultChip({ res }) {
  if (!RESULT_CHIP[res]) return null;
  return <span className={`w-6 h-6 shrink-0 rounded-md ring-1 inline-flex items-center justify-center text-[11px] font-semibold ${RESULT_CHIP[res]}`}>{res}</span>;
}
// GD for one match: a draw is a plain 0 in grey (no ± sign, no colour)
function MatchGd({ gd, suffix = '' }) {
  if (gd === null || gd === undefined) return <span className="text-slate-400">–</span>;
  const cls = gd > 0 ? 'text-emerald-700' : gd < 0 ? 'text-rose-700' : 'text-slate-500';
  return <span className={`tabular-nums ${cls}`}>{signed(gd)}{suffix}</span>;
}
// One matchday as a card (Cards view)
function MatchdayCard({ f }) {
  const oppColor = getClubColor(f.oppAbbr);
  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="gsl-edge absolute inset-y-0 left-0 w-1.5" style={{ background: oppColor }} />
      <div className="p-4 pl-5 flex flex-col gap-3">
        <div className={`flex items-center justify-between ${TYPE.eyebrow} text-slate-500`}>
          <span>MD {f.md}</span>
          <span>{f.venue === 'H' ? 'Home' : 'Away'}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Flag emoji={f.oppFlag} size={22} />
            <span className="text-base font-semibold text-slate-900 truncate">{f.oppName}</span>
          </div>
          {f.hasPlayed ? (
            <div className="flex items-center gap-2 shrink-0">
              <ResultChip res={f.res} />
              <span className={`text-3xl leading-none ${TYPE.big} text-slate-900`}><Score a={f.teamScore} b={f.oppScore} /></span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Scheduled</span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="tabular-nums">{f.cumPts !== null ? `${f.cumPts} pts` : '–'}</span>
          {f.hasPlayed && <MatchGd gd={f.goalDiff} suffix=" GD" />}
        </div>
      </div>
    </div>
  );
}
// One matchday as a row (List view). Phones stack matchday over venue.
function MatchdayRow({ f }) {
  const oppColor = getClubColor(f.oppAbbr);
  return (
    <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 bg-white border-b border-slate-100 last:border-b-0">
      <div className="w-11 sm:w-auto sm:flex sm:items-center sm:gap-3 shrink-0 leading-tight">
        <span className="block sm:w-14 text-[11px] font-semibold text-slate-500 tabular-nums">MD {f.md}</span>
        <span className="block sm:w-12 text-[11px] font-medium text-slate-400 sm:text-slate-500">{f.venue === 'H' ? 'Home' : 'Away'}</span>
      </div>
      <span className="gsl-edge w-1.5 h-6 rounded-full shrink-0" style={{ background: oppColor }} />
      <span className="flex-1 min-w-0 inline-flex items-center gap-2">
        <span className="hidden sm:inline-flex"><Flag emoji={f.oppFlag} size={16} /></span>
        <span className="text-sm font-medium text-slate-900 truncate">{f.oppName}</span>
      </span>
      {f.hasPlayed ? <ResultChip res={f.res} /> : <span className="w-6" />}
      <span className="w-12 sm:w-16 text-right text-base font-extrabold tabular-nums text-slate-900 whitespace-nowrap">{f.hasPlayed ? <Score a={f.teamScore} b={f.oppScore} /> : '–'}</span>
      <span className="hidden sm:block w-12 text-right text-xs font-medium">{f.hasPlayed ? <MatchGd gd={f.goalDiff} /> : ''}</span>
      <span className="w-11 sm:w-16 text-right text-xs font-medium tabular-nums text-slate-500 leading-tight">
        {f.cumPts !== null ? <>{f.cumPts}<span className="hidden sm:inline"> pts</span></> : '–'}
        <span className="block sm:hidden text-[11px]">{f.hasPlayed ? <MatchGd gd={f.goalDiff} /> : ''}</span>
      </span>
    </div>
  );
}
function MatchdayListHead({ head }) {
  return (
    <div className={`flex items-center gap-3 px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-200 ${TYPE.eyebrow} text-slate-500`}>
      <span className="w-11 sm:w-[124px] shrink-0">{head('md', 'MD', 'left', 'asc')}</span>
      <span className="w-1.5 shrink-0" />
      <span className="flex-1">{head('opp', 'Opponent', 'left', 'asc')}</span>
      <span className="w-6" />
      <span className="w-12 sm:w-16 text-right">{head('score', 'Score', 'right')}</span>
      <span className="hidden sm:block w-12 text-right">{head('gd', 'GD', 'right')}</span>
      <span className="w-11 sm:w-16 text-right">{head('total', 'Total', 'right')}</span>
    </div>
  );
}

// ─── v51.07: SEASONS AND OPPONENTS PIECES ───────────────────────────
// Division number from "DIV 1"; the colours come from CSS variables
// (--c-div1 … 4), so dark mode swaps them for their bright partners.
function divNum(d) { const m = String(d || '').match(/(\d+)/); return m ? Number(m[1]) : 0; }
function DivChip({ division }) {
  const n = divNum(division);
  return <span className="gsl-divchip shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] rounded px-1.5 py-0.5" style={{ '--d': `var(--c-div${n || 1})` }}>DIV {n || '–'}</span>;
}
// A season's status chip: only when it adds something (R6: a champion's trophy already says champions)
function seasonTag(s) { return s && s.isInvincible && s.isComplete ? 'Invincible' : null; }
function TagChip({ children }) {
  return <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-amber-100 text-amber-900 ring-1 ring-amber-300 whitespace-nowrap">{children}</span>;
}
function HomeAwaySplit({ home, away, labels = true }) {
  const t = (home || 0) + (away || 0);
  const hp = t > 0 ? (home / t) * 100 : 50;
  return (
    <div className="flex flex-col gap-1">
      {labels && <div className="flex justify-between text-[11px] font-medium text-slate-500 tabular-nums"><span>Home {home}</span><span>Away {away}</span></div>}
      <div className="h-1.5 rounded-full overflow-hidden flex bg-slate-100">
        <div className="bg-[rgb(var(--c-home))]" style={{ width: `${hp}%` }} />
        <div className="bg-[rgb(var(--c-away))]" style={{ width: `${100 - hp}%` }} />
      </div>
    </div>
  );
}
// One season as a card: division header, finish, points and margin, record, goals, home / away
function SeasonCard({ s, selected, onSelect, onFixtures }) {
  const n = divNum(s.division);
  const played = s.gp > 0;
  const champ = s.isComplete && s.position === 1;
  const tag = seasonTag(s);
  if (!played) {
    return (
      <div className="bg-white/60 rounded-xl border border-dashed border-slate-300 overflow-hidden">
        <div className={`px-5 py-2.5 flex justify-between bg-slate-100 text-slate-500 ${TYPE.eyebrow}`}><span>S{s.num} · {yearLabel(s.year)}</span><span>DIV {n || '–'}</span></div>
        <div className="p-5 text-sm font-medium text-slate-500">Not started.</div>
      </div>
    );
  }
  return (
    <div onClick={onSelect} className={`bg-white rounded-xl border shadow-xs overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${selected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'}`}>
      <div className={`gsl-divstrip px-5 py-2.5 flex items-center justify-between ${TYPE.eyebrow}`} style={{ '--d': `var(--c-div${n || 1})` }}>
        <span>S{s.num} · {yearLabel(s.year)}</span><span>DIV {n || '–'}</span>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-[40px] leading-none ${TYPE.big} text-slate-900`}>{s.position ? <OrdinalNum n={s.position} /> : '–'}</span>
            {champ && <Trophy className="w-6 h-6 text-amber-500" />}
          </div>
          <div className="text-right">
            <div className={`text-2xl leading-none ${TYPE.big} text-slate-900`}>{s.pts}</div>
            {champ && s.clearancePts !== null && s.clearancePts !== undefined && <div className="text-xs font-medium text-slate-500 mt-1 tabular-nums">+{s.clearancePts} pts</div>}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold tabular-nums"><WDLRecord w={s.w} d={s.d} l={s.l} /></span>
          <span className="font-semibold tabular-nums text-slate-900 whitespace-nowrap"><Score a={s.gf} b={s.ga} /> <span className={s.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}>{signed(s.gd)}</span></span>
        </div>
        <HomeAwaySplit home={s.home.pts} away={s.away.pts} />
        <div className="flex items-center justify-between min-h-[20px]">
          {tag ? <TagChip>{tag}</TagChip> : <span />}
          <button type="button" onClick={(e) => { e.stopPropagation(); onFixtures(); }} className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1">Fixtures <ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
// Campaigns ledger (desktop): groups with space between, home and away tinted
const CL = {
  season: 'w-[96px]', div: 'w-[54px]', finish: 'w-[44px]', pts: 'w-[36px] text-right', margin: 'w-[50px] text-right',
  gp: 'w-[24px] text-right', rec: 'w-[84px]', ppg: 'w-[36px] text-right', win: 'w-[48px] text-right whitespace-nowrap',
  goals: 'w-[60px] text-right', gd: 'w-[34px] text-right', cs: 'w-[24px] text-right', fts: 'w-[28px] text-right',
  hgp: 'w-[22px] text-right', hpts: 'w-[28px] text-right', hrec: 'w-[76px] pl-1', hgd: 'w-[32px] text-right',
  tag: 'w-[72px]', go: 'w-[16px]',
};
const HOME_TINT = 'bg-[rgb(var(--c-home)/0.06)]', AWAY_TINT = 'bg-[rgb(var(--c-away)/0.10)]';
function CampaignsLedger({ seasons, onOpen }) {
  // R11: sortable by its headers; the unstarted season always stays last
  const playedRows = seasons.filter((s) => s.gp > 0), restRows = seasons.filter((s) => !(s.gp > 0));
  const [sortedPlayed, sh] = useSort(playedRows, null, 'desc', {
    num: (s) => s.num, div: (s) => -divNum(s.division), position: (s) => s.position || 99, margin: (s) => (s.isComplete && s.position === 1 && s.clearancePts != null ? s.clearancePts : -99),
    ppg: (s) => seasonPpg(s), win: (s) => s.w / s.gp, gf: (s) => s.gf, cs: (s) => s.performance.cleanSheets, fts: (s) => s.performance.failedToScore,
    hgp: (s) => s.home.gp, hpts: (s) => s.home.pts, hw: (s) => s.home.w, hgd: (s) => s.home.gd, agp: (s) => s.away.gp, apts: (s) => s.away.pts, aw: (s) => s.away.w, agd: (s) => s.away.gd,
  });
  seasons = [...sortedPlayed, ...restRows];
  const num = (v, strong) => <span className={`text-sm tabular-nums ${strong ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'}`}>{v}</span>;
  const cell = (cls, c, k) => <div key={k} className={`${cls} shrink-0 overflow-visible`}>{c}</div>;
  const grp = (children, tint) => <div className={`flex items-center gap-3 2xl:gap-5 self-stretch py-2.5 ${tint ? `${tint} px-2.5 2xl:px-4` : ''}`}>{children}</div>;
  // Header: the Home / Away labels sit inside their own tinted groups, so they always line up
  const grpH = (children, tint, label) => (
    <div className={`flex flex-col justify-end self-stretch ${tint} px-2.5 2xl:px-4`}>
      <div className="pt-2 pb-1 flex items-center gap-1.5">{label}</div>
      <div className="flex items-center gap-3 2xl:gap-5 pb-2.5">{children}</div>
    </div>
  );
  const head = (
    <div className={`flex items-end justify-between gap-4 px-3 2xl:px-5 bg-slate-50 border-b border-slate-200 ${TYPE.eyebrow} text-slate-500`}>
      {grp([cell(CL.season, sh('num', 'Season', 'left', 'asc'), 1), cell(CL.div, sh('div', 'Div'), 2), cell(CL.finish, sh('position', 'Finish', 'left', 'asc'), 3)])}
      {grp([cell(CL.pts, sh('pts', 'Pts', 'right'), 1), cell(CL.margin, sh('margin', 'Margin', 'right'), 2)])}
      {grp([cell(CL.gp, sh('gp', 'GP', 'right'), 1), cell(CL.rec, sh('w', 'Record'), 2), cell(CL.ppg, sh('ppg', 'PPG', 'right'), 3), cell(CL.win, sh('win', 'Win %', 'right'), 4)])}
      {grp([cell(CL.goals, sh('gf', 'Goals', 'right'), 1), cell(CL.gd, sh('gd', 'GD', 'right'), 2), cell(CL.cs, sh('cs', 'CS', 'right'), 3), cell(CL.fts, sh('fts', 'FTS', 'right'), 4)])}
      {grpH([cell(CL.hgp, sh('hgp', 'GP', 'right'), 1), cell(CL.hpts, sh('hpts', 'Pts', 'right'), 2), cell(CL.hrec, sh('hw', 'Record'), 3), cell(CL.hgd, sh('hgd', 'GD', 'right'), 4)], HOME_TINT, <><span className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--c-home))]" /><span className="text-blue-900">Home</span></>)}
      {grpH([cell(CL.hgp, sh('agp', 'GP', 'right'), 1), cell(CL.hpts, sh('apts', 'Pts', 'right'), 2), cell(CL.hrec, sh('aw', 'Record'), 3), cell(CL.hgd, sh('agd', 'GD', 'right'), 4)], AWAY_TINT, <><span className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--c-away))]" /><span className="text-sky-700">Away</span></>)}
      {grp([cell(CL.tag, '', 1), cell(CL.go, '', 2)])}
    </div>
  );
  return (
    <div className="rounded-xl border border-slate-200 overflow-x-auto">
      <div className="min-w-max w-full py-0">
        {head}
        {seasons.map((s) => {
          if (!(s.gp > 0)) {
            return <div key={s.num} className="px-4 py-2.5 bg-slate-50/60 text-sm font-medium text-slate-400 border-b border-slate-100"><span className="font-semibold">S{s.num}</span> <span className="ml-1">{yearLabel(s.year)} · not started</span></div>;
          }
          const champ = s.isComplete && s.position === 1;
          const tag = seasonTag(s);
          return (
            <div key={s.num} onClick={() => onOpen(s)} className="flex items-stretch justify-between gap-4 px-3 2xl:px-5 bg-white border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50">
              {grp([
                cell(CL.season, <><span className="text-sm font-semibold text-slate-900">S{s.num}</span> <span className="text-xs font-medium text-slate-500 tabular-nums ml-1">{yearLabel(s.year)}</span></>, 1),
                cell(CL.div, <DivChip division={s.division} />, 2),
                cell(CL.finish, <span className="inline-flex items-center gap-1"><span className={`text-base ${TYPE.big} text-slate-900`}>{s.position ? <OrdinalNum n={s.position} /> : '–'}</span>{champ && <Trophy className="w-3.5 h-3.5 text-amber-500" />}</span>, 3),
              ])}
              {grp([cell(CL.pts, <span className="text-base font-extrabold tabular-nums text-slate-900">{s.pts}</span>, 1), cell(CL.margin, num(champ && s.clearancePts != null ? `+${s.clearancePts}` : '–'), 2)])}
              {grp([cell(CL.gp, num(s.gp), 1), cell(CL.rec, <span className="text-sm font-semibold tabular-nums"><WDLRecord w={s.w} d={s.d} l={s.l} /></span>, 2), cell(CL.ppg, num(seasonPpg(s).toFixed(2), true), 3), cell(CL.win, num(`${((s.w / s.gp) * 100).toFixed(0)}%`), 4)])}
              {grp([cell(CL.goals, <span className="text-sm font-semibold tabular-nums text-slate-900 whitespace-nowrap"><Score a={s.gf} b={s.ga} /></span>, 1), cell(CL.gd, <span className={`text-sm font-semibold tabular-nums ${s.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(s.gd)}</span>, 2), cell(CL.cs, num(s.performance.cleanSheets), 3), cell(CL.fts, num(s.performance.failedToScore), 4)])}
              {['home', 'away'].map((side) => grp([
                cell(CL.hgp, num(s[side].gp), 1),
                cell(CL.hpts, num(s[side].pts, true), 2),
                cell(CL.hrec, <span className="text-sm font-semibold tabular-nums"><WDLRecord w={s[side].w} d={s[side].d} l={s[side].l} /></span>, 3),
                cell(CL.hgd, <span className={`text-sm font-semibold tabular-nums ${s[side].gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(s[side].gd)}</span>, 4),
              ], side === 'home' ? HOME_TINT : AWAY_TINT))}
              {grp([cell(CL.tag, tag ? <TagChip>{tag}</TagChip> : null, 1), cell(CL.go, <ChevronRight className="w-4 h-4 text-indigo-700" />, 2)])}
            </div>
          );
        }).map((row, i) => <React.Fragment key={i}>{row}</React.Fragment>)}
      </div>
    </div>
  );
}
// Campaigns ledger (phones): season and division, finish, points over record, goals over GD
function CampaignsLedgerPhone({ seasons, onOpen }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className={`flex items-center gap-3 px-3 py-2 bg-slate-50 border-b border-slate-200 ${TYPE.eyebrow} text-slate-500`}>
        <span className="w-1.5" /><span className="w-14">Season</span><span className="w-14">Finish</span><span className="flex-1">Pts · Record</span><span className="text-right">Goals</span>
      </div>
      {seasons.filter((s) => s.gp > 0).map((s) => {
        const n = divNum(s.division);
        const champ = s.isComplete && s.position === 1;
        return (
          <div key={s.num} onClick={() => onOpen(s)} className="flex items-center gap-3 px-3 py-3 bg-white border-b border-slate-100 last:border-b-0 cursor-pointer">
            <span className="gsl-divbar w-1.5 self-stretch rounded-full" style={{ '--d': `var(--c-div${n || 1})` }} />
            <div className="w-14"><div className="text-sm font-semibold text-slate-900">S{s.num}</div><div className="gsl-divtext text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ '--d': `var(--c-div${n || 1})` }}>DIV {n || '–'}</div></div>
            <div className="w-14 flex items-center gap-1"><span className={`text-lg ${TYPE.big} text-slate-900`}>{s.position ? <OrdinalNum n={s.position} /> : '–'}</span>{champ && <Trophy className="w-3.5 h-3.5 text-amber-500" />}</div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-extrabold tabular-nums text-slate-900">{s.pts} {champ && s.clearancePts != null && <span className="text-xs font-medium text-slate-500">+{s.clearancePts} pts</span>}</div>
              <div className="text-xs font-semibold tabular-nums"><WDLRecord w={s.w} d={s.d} l={s.l} /></div>
            </div>
            <div className="text-right whitespace-nowrap">
              <div className="text-sm font-semibold tabular-nums text-slate-900"><Score a={s.gf} b={s.ga} /></div>
              <div className={`text-xs font-semibold tabular-nums ${s.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(s.gd)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// Opponents: last 5 (most recent first) as dots or score chips
const FORM_DOT = { W: 'bg-emerald-500', D: 'bg-amber-400', L: 'bg-rose-500' };
function FormDots({ form = [] }) {
  return <span className="inline-flex gap-1">{form.map((m, i) => <span key={i} className={`w-2 h-2 rounded-full ${FORM_DOT[m.res] || 'bg-slate-300'}`} title={`${m.res} ${m.f}–${m.a}`} />)}</span>;
}
function FormChips({ form = [] }) {
  return <span className="inline-flex gap-1">{form.map((m, i) => <span key={i} className={`text-[11px] font-semibold tabular-nums rounded px-1.5 py-0.5 ring-1 whitespace-nowrap ${RESULT_CHIP[m.res] || ''}`}>{m.f}–{m.a}</span>)}</span>;
}
function avgLabel(v) { return typeof v === 'number' && v > 0 ? v.toFixed(1) : '–'; }
// One opponent as a card: record as the hero, results bar, goals and GD, points won, last 5
function OpponentCard({ c, x, onOpen }) {
  const color = c.color || getClubColor(c.abbr);
  const gp = c.p || 0;
  const seg = (n, cls) => <div className={cls} style={{ width: `${gp ? (n / gp) * 100 : 0}%` }} />;
  return (
    <div onClick={onOpen} className="relative bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <div className="gsl-edge absolute inset-y-0 left-0 w-1.5" style={{ background: color }} />
      <div className="p-5 pl-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0"><Flag emoji={c.flag} size={28} /><span className="text-lg font-semibold text-slate-900 truncate">{c.name}</span></div>
          <div className="text-right shrink-0"><div className={`${TYPE.eyebrow} text-slate-500`}>Avg rank</div><div className="text-base font-extrabold tabular-nums text-slate-900">{avgLabel(c.avg)}</div></div>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2 min-w-0">
            <div className={`${TYPE.eyebrow} text-slate-500`}>Record <RecordKey /></div>
            <div className={`text-3xl leading-none ${TYPE.big} text-slate-900`}><WDLRecord w={c.w} d={c.d} l={c.l} plain /></div>
            <div className="h-1.5 w-[150px] max-w-full rounded-full overflow-hidden flex bg-slate-100">{seg(c.w, 'bg-emerald-500')}{seg(c.d, 'bg-amber-400')}{seg(c.l, 'bg-rose-500')}</div>
          </div>
          <div className="text-right flex flex-col gap-1 shrink-0">
            <div className={`${TYPE.eyebrow} text-slate-500`}>Goals</div>
            <div className={`text-xl leading-none ${TYPE.big} text-slate-900`}>{x ? <Score a={x.gf} b={x.ga} /> : '–'}</div>
            <div className={`text-xs font-semibold tabular-nums ${c.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(c.gd)} GD</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="tabular-nums">{c.ptsGained} of {gp * 3} pts won</span>
          <span className="inline-flex items-center gap-2">Last 5 <FormDots form={x ? x.last5 : []} /></span>
        </div>
      </div>
    </div>
  );
}
// Opponents ledger (desktop): grouped columns, two text weights, faint zebra
const OL = { gp: 'w-[28px] text-right', rec: 'w-[92px]', win: 'w-[52px] text-right', goals: 'w-[64px] text-right', gd: 'w-[40px] text-right', cs: 'w-[28px] text-right', pts: 'w-[56px] text-right', ppg: 'w-[44px] text-right', run: 'w-[44px] text-right', last5: 'w-[236px]', big: 'w-[110px]', go: 'w-[16px]' };
function OpponentsLedger({ clubs: clubsIn, extras, onOpen }) {
  // R11: sortable by its headers (until one is clicked, the control bar's sort order stands)
  const X = (c) => extras.get(String(c.abbr).toUpperCase()) || {};
  const [clubs, sh] = useSort(clubsIn, null, 'desc', {
    name: (c) => String(c.name), avg: (c) => (c.avg > 0 ? c.avg : 999), win: (c) => c.winPct, gf: (c) => X(c).gf ?? -1, cs: (c) => X(c).cs ?? -1,
    pts: (c) => c.ptsGained, ppg: (c) => (c.p ? c.ptsGained / c.p : -1), run: (c) => X(c).run ?? -1, big: (c) => (X(c).big ? X(c).big.f - X(c).big.a : -1),
  });
  const g = (k, ch) => <div key={k} className="flex items-center gap-4">{ch}</div>;
  const c_ = (cls, ch, k) => <div key={k} className={`${cls} shrink-0`}>{ch}</div>;
  return (
    <div className="rounded-xl border border-slate-200 overflow-x-auto">
      <div className="min-w-max">
        <div className={`flex items-center gap-7 px-5 py-2.5 bg-slate-50 border-b border-slate-200 ${TYPE.eyebrow} text-slate-500`}>
          <div className="flex-1 min-w-[220px] flex items-center gap-1">{sh('name', 'Club', 'left', 'asc')}<span>·</span>{sh('avg', 'Avg rank', 'left', 'asc')}</div>
          {g(1, [c_(OL.gp, sh('p', 'GP', 'right'), 1), c_(OL.rec, sh('w', 'Record'), 2), c_(OL.win, sh('win', 'Win %', 'right'), 3)])}
          {g(2, [c_(OL.goals, sh('gf', 'Goals', 'right'), 1), c_(OL.gd, sh('gd', 'GD', 'right'), 2), c_(OL.cs, sh('cs', 'CS', 'right'), 3)])}
          {g(3, [c_(OL.pts, sh('pts', 'Pts', 'right'), 1), c_(OL.ppg, sh('ppg', 'PPG', 'right'), 2)])}
          {g(4, [c_(OL.run, sh('run', 'Run', 'right'), 1)])}
          {g(5, [c_(OL.last5, 'Last 5', 1), c_(OL.big, sh('big', 'Biggest win'), 2), c_(OL.go, '', 3)])}
        </div>
        {clubs.map((c) => {
          const x = extras.get(String(c.abbr).toUpperCase());
          const color = c.color || getClubColor(c.abbr);
          const gp = c.p || 0;
          return (
            <div key={c.colIndex} onClick={() => onOpen(c)} className="flex items-center gap-7 px-5 py-3 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50">
              <div className="flex-1 min-w-[220px] flex items-center gap-3">
                <span className="gsl-edge w-1.5 h-7 rounded-full shrink-0" style={{ background: color }} />
                <Flag emoji={c.flag} size={24} />
                <span className="text-sm font-semibold text-slate-900 truncate">{c.name}</span>
                <span className="text-xs font-semibold text-slate-400 tabular-nums">{avgLabel(c.avg)}</span>
              </div>
              {g(1, [c_(OL.gp, <span className="text-sm font-medium tabular-nums text-slate-500">{gp}</span>, 1), c_(OL.rec, <span className="text-sm font-semibold tabular-nums"><WDLRecord w={c.w} d={c.d} l={c.l} /></span>, 2), c_(OL.win, <span className="text-sm font-medium tabular-nums text-slate-600">{c.winPct.toFixed(0)}%</span>, 3)])}
              {g(2, [c_(OL.goals, <span className="text-sm font-semibold tabular-nums text-slate-900 whitespace-nowrap">{x ? <Score a={x.gf} b={x.ga} /> : '–'}</span>, 1), c_(OL.gd, <span className={`text-sm font-semibold tabular-nums ${c.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(c.gd)}</span>, 2), c_(OL.cs, <span className="text-sm font-medium tabular-nums text-slate-600">{x ? x.cs : '–'}</span>, 3)])}
              {g(3, [c_(OL.pts, <span className="text-sm font-semibold tabular-nums text-slate-900">{c.ptsGained}<span className="text-slate-400 font-medium">/{gp * 3}</span></span>, 1), c_(OL.ppg, <span className="text-sm font-semibold tabular-nums text-slate-900">{gp ? (c.ptsGained / gp).toFixed(2) : '–'}</span>, 2)])}
              {g(4, [c_(OL.run, x && x.run ? <span className="text-sm font-semibold tabular-nums text-slate-900">{x.run}</span> : <span className="text-sm text-slate-400">–</span>, 1)])}
              {g(5, [c_(OL.last5, <FormChips form={x ? x.last5 : []} />, 1), c_(OL.big, x && x.big ? <span className="whitespace-nowrap"><span className="text-sm font-semibold tabular-nums text-slate-900"><Score a={x.big.f} b={x.big.a} /></span><span className="ml-2 text-xs font-medium text-slate-400">S{x.big.season} · {x.big.venue}</span></span> : <span className="text-sm text-slate-400">–</span>, 2), c_(OL.go, <ChevronRight className="w-4 h-4 text-indigo-700" />, 3)])}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// Opponents ledger (phones): club and avg rank; record over last 5; goals over GD
function OpponentsLedgerPhone({ clubs, extras, onOpen }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      {clubs.map((c) => {
        const x = extras.get(String(c.abbr).toUpperCase());
        const color = c.color || getClubColor(c.abbr);
        return (
          <div key={c.colIndex} onClick={() => onOpen(c)} className="flex items-center gap-3 px-3 py-3 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0 cursor-pointer">
            <span className="gsl-edge w-1.5 self-stretch rounded-full shrink-0" style={{ background: color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0"><Flag emoji={c.flag} size={20} /><span className="text-sm font-semibold text-slate-900 truncate">{c.name}</span><span className="text-[11px] font-semibold text-slate-400 tabular-nums">{avgLabel(c.avg)}</span></div>
              <div className="flex items-center gap-2 mt-1"><span className="text-xs font-semibold tabular-nums"><WDLRecord w={c.w} d={c.d} l={c.l} /></span><FormDots form={x ? x.last5 : []} /></div>
            </div>
            <div className="text-right whitespace-nowrap">
              <div className="text-sm font-semibold tabular-nums text-slate-900">{x ? <Score a={x.gf} b={x.ga} /> : '–'}</div>
              <div className={`text-xs font-semibold tabular-nums ${c.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{signed(c.gd)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App({ data = [] }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'homeaway', 'fixtures', 'race', 'clubs', 'analytics'
  const [selectedSeasonNum, setSelectedSeasonNum] = useState(1);
  const [fixtureView, setFixtureView] = useStored('gsl-league-matchdays-view', 'cards');
  const [campaignView, setCampaignView] = useStored('gsl-league-campaigns-view', 'cards');
  const [opponentView, setOpponentView] = useStored('gsl-league-opponents-view', 'cards');
  const [fixtureSearch, setFixtureSearch] = useState('');
  const [fixtureResultFilter, setFixtureResultFilter] = useState('all');
  const [fixtureVenueFilter, setFixtureVenueFilter] = useState('all');
  const [clubSearch, setClubSearch] = useState('');
  const [clubCountryFilter, setClubCountryFilter] = useState('all');
  const [clubSortBy, setClubSortBy] = useState('avg');
  const [clubSortOrder, setClubSortOrder] = useState('asc');
  const [selectedClub, setSelectedClub] = useState(null);

  // Fast row lookup map
  const rowsByIndex = useMemo(() => {
    const map = new Map();
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item && item.index_ !== undefined && item.row) {
          map.set(item.index_, item.row);
        }
      });
    }
    return map;
  }, [data]);

  // The club you manage (name, flag, colour), from the Pyramid sheet's ✦ marker
  const ownClub = useMemo(() => ownClubInfo(), [rowsByIndex]);

  const clubs = useMemo(() => {
    const clubList = [];
    const ownAbbr = ownClub && ownClub.abbr ? ownClub.abbr : null;

    const row1 = rowsByIndex.get(2) || []; // IDs
    const row2 = rowsByIndex.get(3) || []; // Names
    const row3 = rowsByIndex.get(4) || []; // Flags
    const row5 = rowsByIndex.get(6) || []; // Abbr
    const row6 = rowsByIndex.get(7) || []; // Avg rating
    const row7 = rowsByIndex.get(8) || []; // Rank
    const row8 = rowsByIndex.get(9) || []; // P
    const row9 = rowsByIndex.get(10) || []; // W
    const row10 = rowsByIndex.get(11) || []; // D
    const row11 = rowsByIndex.get(12) || []; // L
    const row12 = rowsByIndex.get(13) || []; // GD

    // Competitive Analysis opponent columns start at col index >= 220 (IT7 is index 253)
    for (let c = 250; c < row2.length; c++) {
      const nameRaw = row2[c];
      if (
        nameRaw &&
        typeof nameRaw === 'string' &&
        nameRaw.trim() &&
        nameRaw.trim().toUpperCase() !== 'TEAM' &&
        !nameRaw.trim().startsWith('#') // a sheet error (#N/A) is an empty slot, not a club
      ) {
        const clubName = nameRaw.trim();
        const numId =
          typeof row1[c] === 'number' ? row1[c] : clubList.length + 1;

        const flag = (
          row3[c] && typeof row3[c] === 'string'
            ? row3[c]
            : row3[c + 1] && typeof row3[c + 1] === 'string'
            ? row3[c + 1]
            : '⚽'
        ).trim();
        const rawAbbr = row5[c] || row5[c + 1];
        const abbr = (
          rawAbbr && typeof rawAbbr === 'string'
            ? rawAbbr
            : clubName.slice(0, 3)
        ).trim();
        // Opponents only: the club you manage (the Pyramid sheet's ✦) is left out.
        if (ownAbbr && abbr.toUpperCase() === ownAbbr) continue;

        // Avg rating from row index 6 (IT7:PS7 in sheet)
        const avg =
          typeof row6[c] === 'number' ? row6[c] : parseFloat(row6[c]) || 0;

        const rank = typeof row7[c] === 'number' ? row7[c] : numId;
        const rankDiff = typeof row7[c + 1] === 'number' ? row7[c + 1] : 0;

        const p =
          typeof row8[c] === 'number' ? row8[c] : parseFloat(row8[c]) || 0;
        const w =
          typeof row9[c] === 'number' ? row9[c] : parseFloat(row9[c]) || 0;
        const d =
          typeof row10[c] === 'number' ? row10[c] : parseFloat(row10[c]) || 0;
        const l =
          typeof row11[c] === 'number' ? row11[c] : parseFloat(row11[c]) || 0;
        const gd =
          typeof row12[c] === 'number' ? row12[c] : parseFloat(row12[c]) || 0;

        const ptsGained = w * 3 + d;
        const ptsDropped = p * 3 - ptsGained;
        const winPct = p > 0 ? (w / p) * 100 : 0;
        const country = COUNTRY_NAMES[flag] || 'Europe';
        const color = getClubColor(abbr);

        clubList.push({
          id: numId,
          colIndex: c,
          name: clubName,
          flag,
          country,
          abbr,
          color,
          avg,
          rank,
          rankDiff,
          p,
          w,
          d,
          l,
          gd,
          ptsGained,
          ptsDropped,
          winPct,
        });

      }
    }
    return clubList;
  }, [rowsByIndex, ownClub]);

  // Fast Abbreviation -> Club mapping
  const clubByAbbr = useMemo(() => {
    const map = new Map();
    clubs.forEach((c) => {
      if (c && c.abbr) {
        map.set(String(c.abbr).toUpperCase(), c);
      }
    });
    return map;
  }, [clubs]);

  // Extract Season Campaigns (Seasons 1 through 15)
  const seasons = useMemo(() => {
    const seasonList = [];
    if (!Array.isArray(data)) return seasonList;
    // Matchday columns: four per matchday, from MATCHDAY (col 32) up to the
    // next heading in the sheet's first row, so the count comes from the sheet.
    const head = rowsByIndex.get(1) || [];
    let mdEnd = head.length;
    for (let c = 33; c < head.length; c++) if (head[c] != null && head[c] !== '') { mdEnd = c; break; }

    data.forEach((item) => {
      const r = item.row;
      if (!r) return;
      const sNum = typeof r[0] === 'number' ? r[0] : parseFloat(r[0]);
      const yearStr = r[1];
      const isYearFormat =
        typeof yearStr === 'string' && /\d{4}\s*-\s*\d{2}/.test(yearStr);

      if (sNum && sNum >= 1 && isYearFormat) {
        const seasonIndex = item.index_;
        const scoreRow = rowsByIndex.get(seasonIndex + 1) || [];
        const gdRow = rowsByIndex.get(seasonIndex + 2) || [];

        const pts = typeof r[5] === 'number' ? r[5] : parseFloat(r[5]) || 0;
        const clearence = r[6] !== null && r[6] !== undefined ? r[6] : '-';

        // Parse clearance points and winning matchday from row and scoreRow
        let winningMd = null;
        let clearancePts = null;

        const checkClearanceVal = (val) => {
          if (val === null || val === undefined || val === '-' || val === '-')
            return;
          if (typeof val === 'number') {
            if (!isNaN(val)) clearancePts = val;
            return;
          }
          const str = String(val).trim();
          if (!str) return;

          const mdMatch = str.match(/MD\s*\d+/i);
          if (mdMatch) {
            winningMd = mdMatch[0].toUpperCase();
          }

          const remainder = str
            .replace(/MD\s*\d+/i, '')
            .replace(/[^0-9.-]/g, '');
          if (remainder !== '') {
            const parsed = parseFloat(remainder);
            if (!isNaN(parsed)) clearancePts = parsed;
          }
        };

        checkClearanceVal(r[6]);
        checkClearanceVal(scoreRow[6]);

        const gp = typeof r[7] === 'number' ? r[7] : parseFloat(r[7]) || 0;
        const w = typeof r[8] === 'number' ? r[8] : parseFloat(r[8]) || 0;
        const d = typeof r[9] === 'number' ? r[9] : parseFloat(r[9]) || 0;
        const l = typeof r[10] === 'number' ? r[10] : parseFloat(r[10]) || 0;
        const gf = typeof r[11] === 'number' ? r[11] : parseFloat(r[11]) || 0;
        const ga = typeof r[12] === 'number' ? r[12] : parseFloat(r[12]) || 0;
        const gd = typeof r[13] === 'number' ? r[13] : parseFloat(r[13]) || 0;

        // Home record
        const homePts = typeof scoreRow[15] === 'number' ? scoreRow[15] : 0;
        const homeW = typeof scoreRow[16] === 'number' ? scoreRow[16] : 0;
        const homeD = typeof scoreRow[17] === 'number' ? scoreRow[17] : 0;
        const homeL = typeof scoreRow[18] === 'number' ? scoreRow[18] : 0;
        const homeGf = typeof scoreRow[19] === 'number' ? scoreRow[19] : 0;
        const homeGa = typeof scoreRow[20] === 'number' ? scoreRow[20] : 0;
        const homeGd = typeof scoreRow[21] === 'number' ? scoreRow[21] : 0;
        const homeGp =
          typeof r[14] === 'number' ? r[14] : homeW + homeD + homeL;

        // Away record
        const awayPts = typeof scoreRow[23] === 'number' ? scoreRow[23] : 0;
        const awayW = typeof scoreRow[24] === 'number' ? scoreRow[24] : 0;
        const awayD = typeof scoreRow[25] === 'number' ? scoreRow[25] : 0;
        const awayL = typeof scoreRow[26] === 'number' ? scoreRow[26] : 0;
        const awayGf = typeof scoreRow[27] === 'number' ? scoreRow[27] : 0;
        const awayGa = typeof scoreRow[28] === 'number' ? scoreRow[28] : 0;
        const awayGd = typeof scoreRow[29] === 'number' ? scoreRow[29] : 0;
        const awayGp =
          typeof r[22] === 'number' ? r[22] : awayW + awayD + awayL;

        // Specific campaign performance stats (Correct columns: 220 = failed to score, 222 = clean sheets)
        const gamesDrawnList = r[216] || '';
        const gamesLostList = r[217] || '';
        const failedToScore =
          typeof r[220] === 'number' ? r[220] : parseFloat(r[220]) || 0;
        const cleanSheets =
          typeof r[222] === 'number' ? r[222] : parseFloat(r[222]) || 0;

        // Margins of victory, draws, and defeats (cols 225 to 236)
        const wonBy4Plus = typeof r[225] === 'number' ? r[225] : 0;
        const wonBy3 = typeof r[226] === 'number' ? r[226] : 0;
        const wonBy2 = typeof r[227] === 'number' ? r[227] : 0;
        const wonBy1 = typeof r[228] === 'number' ? r[228] : 0;
        const drawn00 = typeof r[229] === 'number' ? r[229] : 0;
        const drawn11 = typeof r[230] === 'number' ? r[230] : 0;
        const drawn22 = typeof r[231] === 'number' ? r[231] : 0;
        const drawn3Plus = typeof r[232] === 'number' ? r[232] : 0;
        const lostBy1 = typeof r[233] === 'number' ? r[233] : 0;
        const lostBy2 = typeof r[234] === 'number' ? r[234] : 0;
        const lostBy3 = typeof r[235] === 'number' ? r[235] : 0;
        const lostBy4Plus = typeof r[236] === 'number' ? r[236] : 0;

        // Fixtures timeline
        const fixtures = [];
        let runningPts = 0;
        const cumPtsArray = [];

        for (let col = 32; col + 3 < mdEnd; col += 4) {
          const mdNum = Math.floor((col - 32) / 4) + 1;
          const venue = r[col];
          const oppAbbr = r[col + 1];

          if (venue || oppAbbr) {
            let resRaw = scoreRow[col];
            let res = resRaw ? String(resRaw).trim().toUpperCase() : null;
            const tScore = scoreRow[col + 1];
            const oScore = scoreRow[col + 3];
            const goalDiff = gdRow[col + 1];

            const hasPlayed =
              tScore !== null &&
              tScore !== undefined &&
              typeof tScore === 'number';

            let matchPts = 0;
            if (hasPlayed) {
              if (res === 'W') matchPts = 3;
              else if (res === 'D') matchPts = 1;
              else if (res === 'L') matchPts = 0;
              else {
                if (tScore > oScore) {
                  res = 'W';
                  matchPts = 3;
                } else if (tScore === oScore) {
                  res = 'D';
                  matchPts = 1;
                } else {
                  res = 'L';
                  matchPts = 0;
                }
              }
              runningPts += matchPts;
              cumPtsArray.push({ md: mdNum, pts: runningPts });
            }

            const oppKey = oppAbbr ? String(oppAbbr).trim().toUpperCase() : '';
            const clubMeta = clubByAbbr.get(oppKey);

            fixtures.push({
              md: mdNum,
              colIndex: col,
              venue: venue || 'H',
              oppAbbr: (oppAbbr && String(oppAbbr).trim()) || 'TBD',
              oppName: clubMeta ? clubMeta.name : oppAbbr || 'Opponent',
              oppFlag: clubMeta ? clubMeta.flag : '⚽',
              res,
              teamScore: hasPlayed ? tScore : null,
              oppScore: hasPlayed ? oScore : null,
              goalDiff: hasPlayed
                ? typeof goalDiff === 'number'
                  ? goalDiff
                  : tScore - oScore
                : null,
              hasPlayed,
              cumPts: hasPlayed ? runningPts : null,
            });
          }
        }

        // Season status: finished / in progress / champion / invincible
        const division = (r[2] || 'DIV').trim();
        const positionRaw = safeNum(r[POSITION_COL], 0);
        const position = positionRaw > 0 ? positionRaw : null;
        // A season is finished once every game is played: 2 × (clubs − 1),
        // from the Pyramid sheet (ui.js seasonGames). Unknown division: not finished.
        const expectedGames = seasonGames(division);
        const isComplete = gp > 0 && expectedGames != null && gp >= expectedGames;
        const isInProgress = gp > 0 && !isComplete;
        const isChampion = isComplete && position === 1;
        const isInvincible = isComplete && l === 0;

        seasonList.push({
          num: sNum,
          year: yearStr.trim(),
          position,
          expectedGames,
          isComplete,
          isInProgress,
          isChampion,
          isInvincible,
          division: (r[2] || 'DIV').trim(),
          rawBadge: r[3] || '',
          pts,
          clearence,
          winningMd,
          clearancePts,
          gp,
          w,
          d,
          l,
          gf,
          ga,
          gd,
          home: {
            gp: homeGp,
            pts: homePts,
            w: homeW,
            d: homeD,
            l: homeL,
            gf: homeGf,
            ga: homeGa,
            gd: homeGd,
          },
          away: {
            gp: awayGp,
            pts: awayPts,
            w: awayW,
            d: awayD,
            l: awayL,
            gf: awayGf,
            ga: awayGa,
            gd: awayGd,
          },
          performance: {
            gamesDrawnList,
            gamesLostList,
            failedToScore,
            cleanSheets,
            wonBy4Plus,
            wonBy3,
            wonBy2,
            wonBy1,
            drawn00,
            drawn11,
            drawn22,
            drawn3Plus,
            lostBy1,
            lostBy2,
            lostBy3,
            lostBy4Plus,
          },
          fixtures,
          cumPtsArray,
          seasonIndex,
          scoreRowIndex: seasonIndex + 1,
          gdRowIndex: seasonIndex + 2,
        });
      }
    });

    return seasonList.sort((a, b) => a.num - b.num);
  }, [data, rowsByIndex, clubByAbbr]);

  // Auto-select the latest played season on FIRST load only
  // (previously this re-ran on every data change and yanked you back to the latest season)
  const hasAutoSelectedSeason = useRef(false);
  useEffect(() => {
    if (hasAutoSelectedSeason.current) return;
    const played = seasons.filter((s) => s.gp > 0);
    if (played.length > 0) {
      setSelectedSeasonNum(played[played.length - 1].num);
      hasAutoSelectedSeason.current = true;
    }
  }, [seasons]);

  // Dynamically Computed Career Summary Metrics (Clean Sheets = 149, Failed to Score = 26)
  const careerTotals = useMemo(() => {
    const completedSeasons = seasons.filter((s) => s.pts > 0);

    const totalPts = completedSeasons.reduce((acc, s) => acc + s.pts, 0);
    const totalGP = completedSeasons.reduce((acc, s) => acc + s.gp, 0);
    const totalW = completedSeasons.reduce((acc, s) => acc + s.w, 0);
    const totalD = completedSeasons.reduce((acc, s) => acc + s.d, 0);
    const totalL = completedSeasons.reduce((acc, s) => acc + s.l, 0);
    const totalGF = completedSeasons.reduce((acc, s) => acc + s.gf, 0);
    const totalGA = completedSeasons.reduce((acc, s) => acc + s.ga, 0);
    const totalGD = totalGF - totalGA;

    const cleanSheetsTotal = completedSeasons.reduce(
      (acc, s) => acc + s.performance.cleanSheets,
      0
    );
    const failedToScoreTotal = completedSeasons.reduce(
      (acc, s) => acc + s.performance.failedToScore,
      0
    );

    const winRate = totalGP > 0 ? (totalW / totalGP) * 100 : 0;
    const cleanSheetsPct = totalGP > 0 ? (cleanSheetsTotal / totalGP) * 100 : 0;
    const failedToScorePct =
      totalGP > 0 ? (failedToScoreTotal / totalGP) * 100 : 0;
    const ppg = totalGP > 0 ? totalPts / totalGP : 0;

    // Titles = finished seasons with a 1st-place finish (in-progress seasons don't count)
    const finishedSeasons = seasons.filter((s) => s.isComplete);
    const championSeasons = seasons.filter((s) => s.isChampion);
    const playedSeasons = seasons.filter((s) => s.gp > 0);
    const currentSeason = seasons.find((s) => s.isInProgress) || null;
    const latestSeasonNum = playedSeasons.length
      ? playedSeasons[playedSeasons.length - 1].num
      : null;
    const titleRate = finishedSeasons.length
      ? Math.round((championSeasons.length / finishedSeasons.length) * 100)
      : 0;

    const div1Titles = championSeasons.filter((s) =>
      s.division.includes('DIV 1')
    ).length;
    const div2Titles = championSeasons.filter((s) =>
      s.division.includes('DIV 2')
    ).length;
    const div3Titles = championSeasons.filter((s) =>
      s.division.includes('DIV 3')
    ).length;
    const div4Titles = championSeasons.filter((s) =>
      s.division.includes('DIV 4')
    ).length;
    const totalTitles = championSeasons.length;

    return {
      totalPts,
      totalGP,
      totalW,
      totalD,
      totalL,
      totalGF,
      totalGA,
      totalGD,
      cleanSheetsTotal,
      cleanSheetsPct,
      failedToScoreTotal,
      failedToScorePct,
      winRate,
      ppg,
      div1Titles,
      div2Titles,
      div3Titles,
      div4Titles,
      totalTitles,
      titleRate,
      seasonsPlayed: completedSeasons.length,
      seasonsCompleted: finishedSeasons.length,
      currentSeason,
      latestSeasonNum,
    };
  }, [seasons]);

  // Active Selected Season
  const currentSeason = useMemo(() => {
    return (
      seasons.find((s) => s.num === selectedSeasonNum) || seasons[0] || null
    );
  }, [seasons, selectedSeasonNum]);

  // Filtered Fixtures for Active Season
  const filteredFixtures = useMemo(() => {
    if (!currentSeason) return [];
    return currentSeason.fixtures.filter((f) => {
      if (fixtureVenueFilter !== 'all' && f.venue !== fixtureVenueFilter)
        return false;
      if (fixtureResultFilter !== 'all') {
        if (!f.hasPlayed && fixtureResultFilter !== 'unplayed') return false;
        if (f.hasPlayed && f.res !== fixtureResultFilter) return false;
      }
      if (fixtureSearch.trim()) {
        const query = fixtureSearch.toLowerCase();
        const matchesAbbr = f.oppAbbr.toLowerCase().includes(query);
        const matchesName = f.oppName.toLowerCase().includes(query);
        if (!matchesAbbr && !matchesName) return false;
      }
      return true;
    });
  }, [currentSeason, fixtureVenueFilter, fixtureResultFilter, fixtureSearch]);
  // On very wide screens (2xl, 1536px+) the Matchdays list splits into two columns
  const [wideList, setWideList] = useState(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 1536px)').matches);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(min-width: 1536px)');
    const on = () => setWideList(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, []);
  // R11: the Matchdays list sorts by its headers
  const [fixtureRows, fixtureHead] = useSort(filteredFixtures, 'md', 'asc', {
    opp: (f) => String(f.oppName), score: (f) => (f.hasPlayed ? f.teamScore * 100 - f.oppScore : -1e6), gd: (f) => (f.hasPlayed ? f.goalDiff : -1e6), total: (f) => f.cumPts ?? -1,
  });

  // Filtered & sorted opponents
  // v51.07: Campaigns shows every season played plus the next one only
  const campaignSeasons = useMemo(() => {
    const played = seasons.filter((s) => s.gp > 0);
    const next = seasons.find((s) => !(s.gp > 0) && s.num > (played.length ? played[played.length - 1].num : 0));
    return next ? [...played, next] : played;
  }, [seasons]);

  // v51.07: per-opponent figures from every league meeting (oldest first):
  // goals, clean sheets, last 5 (most recent first), current unbeaten run, biggest win
  const opponentExtras = useMemo(() => {
    const byClub = new Map();
    [...seasons].sort((a, b) => a.num - b.num).forEach((s) => {
      (s.fixtures || []).filter((m) => m.hasPlayed).sort((a, b) => a.md - b.md).forEach((m) => {
        const k = String(m.oppAbbr || '').toUpperCase();
        if (!byClub.has(k)) byClub.set(k, []);
        byClub.get(k).push({ season: s.num, venue: m.venue === 'H' ? 'H' : 'A', res: m.res, f: m.teamScore, a: m.oppScore });
      });
    });
    const out = new Map();
    byClub.forEach((list, k) => {
      let run = 0;
      for (let i = list.length - 1; i >= 0 && list[i].res !== 'L'; i--) run++;
      const wins = list.filter((m) => m.res === 'W');
      const big = wins.reduce((best, m) => (!best || m.f - m.a > best.f - best.a || (m.f - m.a === best.f - best.a && m.f > best.f) ? m : best), null);
      out.set(k, {
        gf: list.reduce((t, m) => t + m.f, 0),
        ga: list.reduce((t, m) => t + m.a, 0),
        cs: list.filter((m) => m.a === 0).length,
        last5: list.slice(-5).reverse(),
        run,
        big,
      });
    });
    return out;
  }, [seasons]);

  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    if (clubCountryFilter !== 'all') {
      result = result.filter(
        (c) => c.country.toLowerCase() === clubCountryFilter.toLowerCase()
      );
    }

    if (clubSearch.trim()) {
      const q = clubSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.abbr.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let valA = a[clubSortBy];
      let valB = b[clubSortBy];
      // v51.07: average rank 0 means no data; those clubs go last
      if (clubSortBy === 'avg') { valA = valA > 0 ? valA : 999; valB = valB > 0 ? valB : 999; }

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB || '').toLowerCase();
      }

      if (clubSortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    return result;
  }, [clubs, clubCountryFilter, clubSearch, clubSortBy, clubSortOrder]);

  // Head to Head history for a selected club
  const h2hMatches = useMemo(() => {
    if (!selectedClub || !selectedClub.abbr) return [];
    const targetAbbr = String(selectedClub.abbr).toUpperCase();
    const matches = [];

    seasons.forEach((s) => {
      s.fixtures.forEach((f) => {
        const fixtureAbbr = String(f.oppAbbr || '').toUpperCase();
        if (fixtureAbbr && fixtureAbbr === targetAbbr) {
          matches.push({
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            ...f,
          });
        }
      });
    });

    return matches.sort((a, b) => a.seasonNum - b.seasonNum || a.md - b.md);
  }, [selectedClub, seasons]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Bar */}
      <PageHeader
        accent="indigo"
        icon={Trophy}
        title="League Performance"
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className={`flex-1 ${PAGE_WIDTH} w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6`}>
        {/* TAB 1: CAREER OVERVIEW & SEASONS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* At-a-Glance High-Level Data Highlights Section */}
            <HighlightsBar accent="indigo">
              {/* Record first on every screen; full width on phones (v50.01) */}
              <HighlightCard
                label={<>Record <RecordKey /></>}
                phoneWide
                icon={Activity}
                iconClassName="text-emerald-400"
                value={`${careerTotals.totalW}W - ${careerTotals.totalD}D - ${careerTotals.totalL}L`}
                valueClassName="text-lg sm:text-xl font-extrabold text-white tracking-tight whitespace-nowrap"
                left={`${careerTotals.winRate.toFixed(1)}% Win Rate`}
                leftClassName="text-emerald-300 font-semibold"
                right={`${careerTotals.totalGP} GP`}
                rightClassName="text-slate-300 font-normal"
              />
              <HighlightCard
                label="Titles"
                icon={Trophy}
                iconClassName="text-amber-400"
                value={`${careerTotals.totalTitles} / ${careerTotals.seasonsCompleted}`}
                valueClassName="text-2xl sm:text-3xl font-extrabold text-amber-300 gsl-big tabular-nums tracking-[var(--big-track)]"
                left={`${careerTotals.titleRate}% 1st Place`}
                right={`${careerTotals.div1Titles}x Div 1`}
                rightClassName="text-amber-300 font-semibold"
              />
              <HighlightCard
                label="PPG"
                icon={Zap}
                iconClassName="text-sky-400"
                value={careerTotals.ppg.toFixed(2)}
                valueClassName="text-2xl sm:text-3xl font-extrabold text-sky-300 gsl-big tabular-nums tracking-[var(--big-track)]"
                left={`${careerTotals.totalPts} pts`}
                leftClassName="text-sky-700 font-semibold"
              />
              <HighlightCard
                label="Goals"
                icon={Target}
                iconClassName="text-indigo-400"
                value={`${careerTotals.totalGF} - ${careerTotals.totalGA}`}
                valueClassName="text-2xl sm:text-3xl font-extrabold text-white gsl-big tabular-nums tracking-[var(--big-track)]"
                left={`+${careerTotals.totalGD} GD`}
                leftClassName="text-indigo-300 font-semibold"
                right={`${careerTotals.totalGP ? (careerTotals.totalGF / careerTotals.totalGP).toFixed(2) : '—'} G/M`}
                rightClassName="text-slate-300 font-normal"
              />
              <HighlightCard
                label="Clean Sheets"
                icon={Shield}
                iconClassName="text-teal-400"
                value={careerTotals.cleanSheetsTotal}
                valueClassName="text-2xl sm:text-3xl font-extrabold text-teal-300 gsl-big tabular-nums tracking-[var(--big-track)]"
                left={`${careerTotals.cleanSheetsPct.toFixed(1)}% of matches`}
                leftClassName="text-teal-300 font-semibold"
              />
            </HighlightsBar>

            {/* v51.07: Campaigns: Cards (division-header season cards) or Ledger */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-lg sm:text-[22px] leading-tight font-extrabold tracking-[-0.005em] text-slate-900">Campaigns</h3>
                  <span className="text-sm font-medium text-slate-500">
                    {careerTotals.seasonsCompleted} completed
                    {careerTotals.currentSeason ? ` · S${careerTotals.currentSeason.num} in progress` : ''}
                  </span>
                </div>
                <ViewSwitch
                  value={campaignView}
                  onChange={setCampaignView}
                  options={[
                    { value: 'cards', label: 'Cards', icon: LayoutGrid },
                    { value: 'ledger', label: 'Ledger', icon: List },
                  ]}
                />
              </div>
              {campaignView === 'ledger' ? (
                <>
                  <div className="hidden lg:block">
                    <CampaignsLedger seasons={campaignSeasons} onOpen={(s) => { setSelectedSeasonNum(s.num); setActiveTab('fixtures'); }} />
                  </div>
                  <div className="lg:hidden">
                    <CampaignsLedgerPhone seasons={campaignSeasons} onOpen={(s) => { setSelectedSeasonNum(s.num); setActiveTab('fixtures'); }} />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {campaignSeasons.map((s) => (
                    <SeasonCard
                      key={s.num}
                      s={s}
                      selected={selectedSeasonNum === s.num}
                      onSelect={() => setSelectedSeasonNum(s.num)}
                      onFixtures={() => { setSelectedSeasonNum(s.num); setActiveTab('fixtures'); }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: HOME VS AWAY */}
        {activeTab === 'homeaway' && (
          <HomeAwayTab seasons={seasons} accent="indigo" />
        )}

        {/* TAB: SPIDER RADAR MATRIX (DEDICATED FULL-SCALE TAB) */}
        {activeTab === 'spider' && (
          <SpiderTab seasons={seasons} clubs={clubs} ownClub={ownClub} accent="indigo" />
        )}

        {/* TAB 2: FIXTURES & MATCHDAYS TIMELINE */}
        {activeTab === 'fixtures' && (() => {
          // v51.06: main bar (season scope) → Highlights bar → one control row → Cards or List
          const cs = currentSeason;
          const played = seasons.filter((s) => s.gp > 0);
          const prev = cs ? seasons.find((s) => s.num === cs.num - 1 && s.gp > 0) : null;
          const sameDiv = !!(prev && cs && prev.division === cs.division);
          const ppg = cs && cs.gp ? cs.pts / cs.gp : 0;
          const ppgRank = cs ? [...played].sort((x, y) => seasonPpg(y) - seasonPpg(x)).findIndex((s) => s.num === cs.num) + 1 : 0;
          const champ = !!(cs && cs.position === 1 && cs.isComplete);
          const finishChip = !cs ? null : cs.isInvincible && champ ? 'Invincible' : champ ? 'Champions' : null;
          const finishText = !cs ? '' : champ
            ? (cs.winningMd ? `Sealed ${String(cs.winningMd).replace(/^MD\s*/i, 'MD ')}` : '')
            : sameDiv && prev.position && cs.position
              ? (prev.position > cs.position ? `▲ ${prev.position - cs.position} on last season` : prev.position < cs.position ? `▼ ${cs.position - prev.position} on last season` : 'Same as last season')
              : `${divisionLabel(cs.division)} debut`;
          return (
          <div className="space-y-6">
            {cs && (
              <MainBar
                accent="indigo"
                eyebrow={`Season ${cs.num} · ${yearLabel(cs.year)}`}
                title={<>
                  <span>{divisionLabel(cs.division)}</span>
                  {cs.position ? <><span className="text-white/40">·</span><span className={`${TYPE.big} text-white`}><OrdinalNum n={cs.position} /></span></> : null}
                  {champ && <Trophy className="w-6 h-6 text-amber-300" />}
                </>}
                controls={<ScopeStepper options={played.map((s) => ({ value: s.num, label: `S${s.num}` }))} value={selectedSeasonNum} onChange={(v) => setSelectedSeasonNum(Number(v))} />}
              />
            )}

            {cs && (
              <HighlightsBar accent="indigo" columns={5}>
                <HighlightCard
                  phoneWide
                  label={<>Record <RecordKey /></>}
                  icon={Activity}
                  iconClassName="text-emerald-600"
                  value={<WDLRecord w={cs.w} d={cs.d} l={cs.l} plain />}
                  valueClassName="text-2xl sm:text-3xl"
                  left={`${cs.gp ? ((cs.w / cs.gp) * 100).toFixed(1) : '0.0'}% win rate`}
                  leftClassName="text-emerald-700"
                />
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between">
                  <div className={`flex items-center justify-between gap-2 text-slate-500 ${TYPE.eyebrow}`}>
                    <span>Finish</span>
                    {champ ? <Trophy className="w-4 h-4 text-amber-500" /> : <TrendingUp className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div className={`my-2 text-2xl sm:text-3xl leading-none ${TYPE.big} text-slate-900`}>{cs.position ? <OrdinalNum n={cs.position} /> : '–'}</div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {finishChip && <span className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 bg-amber-100 text-amber-900 ring-1 ring-amber-300">{finishChip}</span>}
                    {finishText && <span className="text-xs font-medium text-slate-500">{finishText}</span>}
                  </div>
                </div>
                <HighlightCard
                  label="Points"
                  icon={Star}
                  iconClassName="text-amber-600"
                  value={String(cs.pts)}
                  valueClassName="text-2xl sm:text-3xl"
                  left={champ && cs.clearancePts !== null && cs.clearancePts !== undefined ? `+${cs.clearancePts} clear of 2nd` : ''}
                  leftClassName="text-amber-700"
                  right={sameDiv ? `${signed(cs.pts - prev.pts)} vs S${prev.num}` : ''}
                />
                <HighlightCard
                  label="Goals"
                  icon={Target}
                  iconClassName="text-indigo-600"
                  value={`${cs.gf} - ${cs.ga}`}
                  valueClassName="text-2xl sm:text-3xl"
                  left={`${signed(cs.gd)} GD`}
                  leftClassName={cs.gd >= 0 ? 'text-emerald-700' : 'text-rose-700'}
                />
                <HighlightCard
                  label="PPG"
                  icon={Zap}
                  iconClassName="text-sky-600"
                  value={ppg.toFixed(2)}
                  valueClassName="text-2xl sm:text-3xl"
                  left={played.length > 1 ? `${ordinal(ppgRank)} best of ${played.length} seasons` : ''}
                />
              </HighlightsBar>
            )}

            {/* One control row: result and venue filters, the view switch, search */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Segmented
                  value={fixtureResultFilter}
                  onChange={setFixtureResultFilter}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'W', label: 'Wins', tone: 'win' },
                    { value: 'D', label: 'Draws', tone: 'draw' },
                    { value: 'L', label: 'Losses', tone: 'loss' },
                  ]}
                />
                <Segmented
                  value={fixtureVenueFilter}
                  onChange={setFixtureVenueFilter}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'H', label: 'Home', tone: 'home' },
                    { value: 'A', label: 'Away', tone: 'away' },
                  ]}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ViewSwitch
                  value={fixtureView}
                  onChange={setFixtureView}
                  options={[
                    { value: 'cards', label: 'Cards', icon: LayoutGrid },
                    { value: 'list', label: 'List', icon: List },
                  ]}
                />
                <SearchInput
                  className="min-w-[200px] flex-1"
                  value={fixtureSearch}
                  onChange={setFixtureSearch}
                  placeholder="Search opponent..."
                />
                <ResetButton
                  disabled={
                    fixtureResultFilter === 'all' &&
                    fixtureVenueFilter === 'all' &&
                    !fixtureSearch
                  }
                  onClick={() => {
                    setFixtureResultFilter('all');
                    setFixtureVenueFilter('all');
                    setFixtureSearch('');
                  }}
                />
              </div>
            </div>

            {filteredFixtures.length > 0 && (fixtureView === 'list' ? (
              <div className={`grid gap-4 ${wideList && fixtureRows.length > 8 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {(wideList && fixtureRows.length > 8 ? [fixtureRows.slice(0, Math.ceil(fixtureRows.length / 2)), fixtureRows.slice(Math.ceil(fixtureRows.length / 2))] : [fixtureRows]).map((part, k) => (
                  <div key={k} className="self-start bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <MatchdayListHead head={fixtureHead} />
                    {part.map((f) => (
                      <MatchdayRow key={f.md} f={f} />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {filteredFixtures.map((f) => (
                  <MatchdayCard key={f.md} f={f} />
                ))}
              </div>
            ))}

            {filteredFixtures.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  No match fixtures found
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try resetting your search query or filters.
                </p>
              </div>
            )}
          </div>
          );
        })()}

        {/* TAB 3: POINTS RACE CHART */}
        {activeTab === 'race' && (
          <PointsTab seasons={seasons} accent="indigo" />
        )}

        {/* TAB: OPPONENTS */}
        {activeTab === 'clubs' && (
          <div className="space-y-6">
            {/* Highlights bar (R5): who you've faced, most, best and worst, never beaten by */}
            {(() => {
              const met = clubs.filter((c) => c.p > 0);
              if (!met.length) return null;
              const countries = new Set(met.map((c) => c.country)).size;
              const most = [...met].sort((a, b) => b.p - a.p || a.name.localeCompare(b.name))[0];
              const five = met.filter((c) => c.p >= 5);
              const ppgOf = (c) => c.ptsGained / c.p;
              const bestC = five.length ? [...five].sort((a, b) => ppgOf(b) - ppgOf(a) || b.gd - a.gd)[0] : null;
              const worstC = five.length ? [...five].sort((a, b) => ppgOf(a) - ppgOf(b) || a.gd - b.gd)[0] : null;
              const three = met.filter((c) => c.p >= 3);
              const unbeaten = three.filter((c) => c.l === 0).length;
              const clubLine = (c) => <span className="inline-flex items-center gap-1.5 min-w-0"><Flag emoji={c.flag} size={18} /><span className="truncate">{String(c.name).toUpperCase()}</span></span>;
              return (
                <HighlightsBar accent="indigo" columns={5}>
                  <HighlightCard label="Clubs faced" value={String(met.length)} valueClassName="text-2xl sm:text-3xl" left={`from ${countries} nations`} />
                  <HighlightCard label="Most played" value={clubLine(most)} valueClassName="!text-lg sm:!text-xl" left={<span className="inline-flex items-center gap-2">{most.p} GP · <WDLRecord w={most.w} d={most.d} l={most.l} /></span>} />
                  {bestC && <HighlightCard label="Best record" value={clubLine(bestC)} valueClassName="!text-lg sm:!text-xl" left={`${ppgOf(bestC).toFixed(2)} PPG in ${bestC.p} (5+ games)`} />}
                  {worstC && <HighlightCard label="Toughest opponent" value={clubLine(worstC)} valueClassName="!text-lg sm:!text-xl" left={`${ppgOf(worstC).toFixed(2)} PPG in ${worstC.p} (5+ games)`} />}
                  <HighlightCard label="Never beaten by" value={String(unbeaten)} valueClassName="text-2xl sm:text-3xl" left={`of ${three.length} clubs met 3+ times`} />
                </HighlightsBar>
              );
            })()}
            {/* Search, Country Filter, and Sort Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <SearchInput
                  className="flex-1"
                  value={clubSearch}
                  onChange={setClubSearch}
                  placeholder={`Search ${clubs.length} clubs...`}
                />

                {/* Sort Controls */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                  <ViewSwitch
                    value={opponentView}
                    onChange={setOpponentView}
                    options={[
                      { value: 'cards', label: 'Cards', icon: LayoutGrid },
                      { value: 'ledger', label: 'Ledger', icon: List },
                    ]}
                  />
                  <span className="shrink-0 text-slate-600 font-semibold">
                    Sort by:
                  </span>
                  <select
                    value={clubSortBy}
                    onChange={(e) => setClubSortBy(e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="avg">Avg rank</option>
                    <option value="rank">ESL rank (latest)</option>
                    <option value="p">Matches Played</option>
                    <option value="winPct">Win Percentage</option>
                    <option value="gd">Goal Difference</option>
                    <option value="ptsDropped">Points Dropped</option>
                    <option value="ptsGained">Points Gained</option>
                  </select>

                  <button
                    onClick={() =>
                      setClubSortOrder((prev) =>
                        prev === 'asc' ? 'desc' : 'asc'
                      )
                    }
                    className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700"
                    title={`Sort direction: ${
                      clubSortOrder === 'asc' ? 'ascending' : 'descending'
                    }`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                  <ResetButton
                    disabled={
                      !clubSearch &&
                      clubCountryFilter === 'all' &&
                      clubSortBy === 'avg' &&
                      clubSortOrder === 'asc'
                    }
                    onClick={() => {
                      setClubSearch('');
                      setClubCountryFilter('all');
                      setClubSortBy('avg');
                      setClubSortOrder('asc');
                    }}
                  />
                </div>
              </div>

              {/* Nation filter (built from the club data, so every nation is reachable) */}
              <FilterPills
                value={clubCountryFilter}
                onChange={setClubCountryFilter}
                options={[
                  { value: 'all', label: 'All Nations', badge: clubs.length },
                  ...Object.entries(
                    clubs.reduce((acc, c) => {
                      acc[c.country] = (acc[c.country] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
                    .map(([c, n]) => { const fl = (clubs.find((x) => x.country === c) || {}).flag; return { value: c, label: c, badge: n, icon: fl ? <Flag emoji={fl} size={16} /> : null }; }),
                ]}
              />
            </div>

            {/* v51.07: Cards or Ledger */}
            {filteredClubs.length > 0 && (opponentView === 'ledger' ? (
              <>
                <div className="hidden lg:block"><OpponentsLedger clubs={filteredClubs} extras={opponentExtras} onOpen={setSelectedClub} /></div>
                <div className="lg:hidden"><OpponentsLedgerPhone clubs={filteredClubs} extras={opponentExtras} onOpen={setSelectedClub} /></div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {filteredClubs.map((c) => (
                  <OpponentCard key={c.colIndex} c={c} x={opponentExtras.get(String(c.abbr).toUpperCase())} onOpen={() => setSelectedClub(c)} />
                ))}
              </div>
            ))}

            {filteredClubs.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                <Users className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  No clubs found
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search query or nation filter.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: FORM, MARGINS & DROPPED POINTS ANALYTICS */}
        {activeTab === 'analytics' && (
          <FormMarginsTab seasons={seasons} clubs={clubs} accent="indigo" />
        )}
      </main>

      {/* DRAWER: HEAD-TO-HEAD HISTORY WITH AN OPPONENT */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col"
            style={{
              borderTop: `5px solid ${getClubColor(selectedClub.abbr)}`,
            }}
          >
            {/* Drawer Header */}
            <div
              className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50"
              style={{
                borderLeft: `5px solid ${getClubColor(selectedClub.abbr)}`,
              }}
            >
              <div className="flex items-center space-x-3">
                <Flag emoji={selectedClub.flag} size={30} className="shrink-0"/>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {selectedClub.name}
                    </h3>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded shadow-2xs"
                      style={{
                        backgroundColor: getClubColor(selectedClub.abbr),
                        color: getContrastTextColor(
                          getClubColor(selectedClub.abbr)
                        ),
                      }}
                    >
                      {selectedClub.abbr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    {selectedClub.country} • Rank #{selectedClub.rank || '-'} •
                    Avg Rating:{' '}
                    {selectedClub.avg % 1 === 0
                      ? selectedClub.avg
                      : Number(selectedClub.avg.toFixed(2))}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClub(null)}
                className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Aggregate Stats Bar & Summary */}
            <div
              className="p-4 border-b border-slate-100 bg-white space-y-2.5"
              style={{
                borderLeft: `5px solid ${getClubColor(selectedClub.abbr)}`,
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-2xs"
                    style={{ backgroundColor: getClubColor(selectedClub.abbr) }}
                  />
                  <span className="uppercase font-semibold text-slate-800 tracking-[0.1em]">
                    Head-to-Head Summary
                  </span>
                </span>
                <span
                  className="px-2 py-0.5 rounded font-semibold text-[11px] shadow-2xs"
                  style={{
                    backgroundColor: getClubColor(selectedClub.abbr),
                    color: getContrastTextColor(
                      getClubColor(selectedClub.abbr)
                    ),
                  }}
                >
                  {selectedClub.abbr} Record
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div
                  className="bg-slate-50 p-2 rounded-lg border border-slate-200"
                  style={{
                    borderTop: `2.5px solid ${getClubColor(selectedClub.abbr)}`,
                  }}
                >
                  <div className="font-extrabold text-slate-900">
                    {selectedClub.p}
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Played
                  </div>
                </div>
                <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <div className="font-extrabold text-emerald-800">
                    {selectedClub.w}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    Wins
                  </div>
                </div>
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <div className="font-extrabold text-amber-800">
                    {selectedClub.d}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold">
                    Draws
                  </div>
                </div>
                <div className="bg-rose-50 p-2 rounded-lg border border-rose-200">
                  <div className="font-extrabold text-rose-800">
                    {selectedClub.l}
                  </div>
                  <div className="text-[11px] text-rose-700 font-semibold">
                    Losses
                  </div>
                </div>
              </div>
            </div>

            {/* Match Log List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              <div className="text-[11px] font-semibold text-slate-700 uppercase mb-2 tracking-[0.1em]">
                All Matches Played ({h2hMatches.length})
              </div>

              {h2hMatches.map((m, i) => {
                const isWin = m.res === 'W';
                const isDraw = m.res === 'D';

                return (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-1.5 font-extrabold text-slate-900">
                        <span>Season {m.seasonNum}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-700">{m.seasonYear}</span>
                        <span className="text-slate-600 font-semibold">
                          ({m.division})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Matchday {m.md} •{' '}
                        <strong className="text-slate-800">
                          {m.venue === 'H' ? 'Home' : 'Away'}
                        </strong>
                      </div>
                    </div>

                    <div className="text-right">
                      {m.hasPlayed ? (
                        <span
                          className={`font-semibold text-xs px-2.5 py-1 rounded-md ${
                            isWin
                              ? 'bg-emerald-100 text-emerald-900'
                              : isDraw
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-rose-100 text-rose-900'
                          }`}
                        >
                          <Score a={m.teamScore} b={m.oppScore} />
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold">
                          TBD
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {h2hMatches.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-600">
                  No direct matches recorded in the completed campaigns.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeagueSection(props) {
  return <HoverProvider><App {...props} /></HoverProvider>;
}
