/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — Cups.js
 *  Version:  Cups v19
 *  Date:     2026-10-17, 07:45 UTC
 *  Reads the "Cups" tab (passed in by App.js), using real sheet row numbers.
 * ════════════════════════════════════════════════════════════════════
 *
 *  CHANGELOG (newest first)
 *
 *  Cups v19 — 2026-10-17, 07:45 UTC — Canvas v51.18
 *   - Removed Flag from the lucide-react import: it clashed with ui.js's
 *     Flag (a duplicate import that stops react-scripts compiling). Every
 *     use is ui.js's <Flag emoji=…>, so nothing on the page changes.
 *
 *  Cups v18 — 2026-10-05, 09:00 UTC — Canvas v51.05
 *   - Highlights records now show numbers only (shared change), so their
 *     labels carry the "W • D • L" hint: both Record cards and the
 *     Domestic, Continental and Super Cups records (Competitions).
 *
 *  Cups v17 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)
 *   - Tier Matrix tones come from ui.js (MARGIN_TONES, shared with League);
 *     the local copy is gone. Same colours.
 *
 *  Cups v16 — 2026-10-03, 15:45 UTC — Canvas v50.06 (audit fix)
 *   - A3 Competitions trajectory: one column per season (no built-in 10).
 *
 *  Cups v15 — 2026-10-03, 15:19 UTC — Canvas v50.05
 *   - Stacked Visualizer and Two-Leg Ties: Show / Hide legend (hidden on
 *     phones); bars scrub; season header on phones in two lines (Season ·
 *     year / record · matches).
 *
 *  Cups v14 — 2026-10-03, 07:43 UTC — Canvas v50.04 (mobile phase 3b)
 *   - 21 browser tooltips that carried numbers now open the hover card on
 *     tap (W/D/L splits on Rivalries, Leagues and Competitions bars,
 *     shootouts won/lost, margin labels, average opponent rank, campaign
 *     progress). Cups sits inside ui.js's HoverProvider. Full names of
 *     truncated clubs and cups stay as browser tooltips (the drawers show
 *     them on tap).
 *   - Form & Margins highlights: Record full width on phones (it already
 *     leads), like Campaigns.
 *   - Campaign, match and group editors: full screen on phones (the small
 *     delete confirmation stays centred).
 *   - 11px floor: 111 pieces of 9–10px text raised to 11px.
 *
 *  Cups v13 — 2026-10-03, 06:41 UTC — Canvas v50.01
 *   - Campaigns highlights: Record first on every screen; full width on phones.
 *
 *  Cups v12 — 2026-09-27, 17:28 UTC — Wider canvas
 *   - Page width comes from ui.js (PAGE_WIDTH, now 1800px; was 1280px).
 *
 *  Cups v11 — 2026-09-26, 15:48 UTC — Standard search
 *   - Search boxes use the Cups gold focus colour.
 *
 *  Cups v10 — 2026-09-26, 15:40 UTC — Drawn flags
 *   - Every flag emoji is now a drawn flag (ui.js Flag), sized to match
 *     the old emoji. Non-flag symbols (🪩, 🏴‍☠️) show as they are.
 *   - Dropdown options show club names only (browser dropdowns can't draw
 *     flags); labels no longer have flags glued into the text.
 *
 *  Cups v9 — 2026-09-26, 00:39 UTC — Lab tab, path difficulty
 *   - New last tab: Lab (CupsLab.js), with its own crash protection.
 *     SHOW_LAB = false hides it.
 *   - Campaign cards show the average opponent rank ("Opp 29.0"),
 *     coloured by how tough the path was compared with all campaigns
 *     (quarters: toughest, tougher, easier, easiest).
 *   - Campaign drawer: "My rank • Opp rank • RSI" (RSI as the sheet has
 *     it: my rank minus average opponent rank).
 *   - The "#" before average opponent ranks is gone everywhere.
 *   - openRivalry(): jumps to a club in Rivalries (used by the Lab).
 *
 *  Cups v8 — 2026-09-25, 18:21 UTC — Hover card lists
 *   - Margin Distribution hover lists show the competition (short name:
 *     UCL, UEL, FAC, CAC, BSM, SC, CS) instead of the season, which the
 *     card already shows. Two-Leg aggregate lists show both (e.g. "S8
 *     UCL"), since they can span seasons.
 *   - Card subtitle says "All matches" instead of "All".
 *
 *  Cups v7 — 2026-09-25, 17:43 UTC — Hover cards, tag rename
 *   - Hover cards now come from ui.js (shared with League). Match lists
 *     are one line each (flag, club, season, score) and only appear
 *     when a segment has 8 or fewer; above that, just the count.
 *   - Outcomes hover cards: no match list.
 *   - Two-leg tag "Won it in leg 2" renamed "Decider".
 *
 *  Cups v6 — 2026-09-25, 16:37 UTC — Review fixes
 *   - Control icons (Season, Competition, Matches, Tags, Split by) are
 *     Cups gold instead of League purple, on every tab.
 *   - Form & Margins: every bar has a hover card (like League's): count,
 *     share, and the matches or ties behind it when there are 8 or fewer.
 *   - Margin Distribution and Two-Leg Ties: new Competition filter.
 *   - Two-Leg Ties: game states are now 14 tags; a tie can have several.
 *     Slimmer tag chips; tap one to filter. Tie cards show their tags
 *     (the "after leg 1 -> final" line is gone). New tags: Merciless,
 *     Clean, Nailbiter, Heavyweight (ESL top 10 that season), Deadlocked,
 *     Gasp, Humiliated. "Knocked out" now means any lost tie.
 *
 *  Cups v5 — 2026-09-25, 16:04 UTC — New tab: Form & Margins
 *   - New tab after Eliminations, with four dashboards, top to bottom:
 *     1. Outcomes: every match (each leg of a two-leg tie counts as one).
 *        Wins and losses on pens have their own striped colours.
 *     2. Margin Distribution: Stacked Visualizer and Tier Matrix (as in
 *        League), filtered by season and match type (All / Group Stage /
 *        One-Leg Ties / Two-Leg Ties, each leg). Pens get their own tiers.
 *     3. Two-Leg Ties: game states (tap one to filter), aggregate margins,
 *        and every tie with its legs and aggregate. The tie is the unit.
 *     4. Shootouts: key numbers, a split (competition / round / season /
 *        score before pens), and every shootout.
 *   - Opens with the shared highlights strip. Everything is calculated.
 *   - Pens colours, game-state names and the Coast threshold live in the
 *     "FORM & MARGINS" block (PEN_WIN_STYLE, TIE_TAGS, COAST_LEG1_MARGIN).
 *   - No changes to any other tab.
 *
 *  Cups v4 — 2026-09-25, 04:22 UTC — Card layout tweaks
 *   - Campaigns: the result badge moved down to the season line (right
 *     side, just above the end of the progress bar), so competition names
 *     get the full width.
 *   - Rivalries: competition tags removed; the record (MP, W, D, L, PKs)
 *     and goal difference now sit below the bar, as in Leagues.
 *   - Leagues: the EA FC league handle (e.g. BEL) is back, small and grey,
 *     next to the flags on each card and in the drawer title.
 *   - Fixed broken hover text on the win/loss bars (Rivalries, Leagues).
 *
 *  Cups v3 — 2026-09-25, 04:04 UTC — Review fixes and tab-by-tab design pass
 *   Everywhere
 *   - Unplayed seasons (nothing played yet, e.g. Season 10) are hidden.
 *   - Opening a card's drawer (Campaigns, Rivalries, Leagues) no longer
 *     pushes the other cards in its row below the drawer.
 *   - Round names read naturally ("Round of 16", "Quarter-Final").
 *   - Cup colours: Champions gold, Finalists silver, Exits red.
 *   - Season pills in Cups gold.
 *   Campaigns
 *   - Campaign card redesigned: one result badge instead of "WON" +
 *     "CHAMPIONS"; competition and season on the left.
 *   - Campaign banner reworked: title and result on top, then one row of
 *     six stats (record, goals, goal difference, entered, avg opponent
 *     rank, winner).
 *   - Bracket arrows point right-to-left (Final on the left).
 *   Finals
 *   - Competition switch; the stats, foes and archive follow it.
 *   - Stats in the shared highlights strip. "vs" removed from cards.
 *     Runner-up badges silver. "(ESL Foes from Archive)" removed.
 *   Eliminations
 *   - Exit rate counts only played cup runs. "Nemesis" line removed.
 *   Rivalries
 *   - Stats in the shared highlights strip; filters use shared controls.
 *   - "ESL Only" badge and rules text removed.
 *   - A club's matches open as chips (like Campaigns), not a list.
 *   Leagues
 *   - Matches open as chips. League names no longer cut off.
 *   - League slot codes (BEL, ROM, ...) hidden.
 *   Competitions
 *   - Banner replaced by the shared highlights strip (removes the
 *     "Cups!HS:LX" note). Controls use the shared switches and search.
 *     "1 Cups" fixed to "1 Cup". Made-up "71.1%" fallback removed.
 *   Trophies
 *   - Banner replaced by the shared highlights strip. Filters use the
 *     shared controls. "Quintuple Era (S6-S8)" now calculated.
 *
 *  Cups v2 — 2026-09-25, 02:51 UTC — Design pass: in line with League
 *   - Header and tab bar now use the shared PageHeader (same layout,
 *     spacing and full-size tabs as League), in Cups gold.
 *   - Removed the "Synced to Cups Sheet" badge and the three header stats
 *     (Trophies, Finals Win %, Total Matches).
 *   - New highlights strip at the top of Campaigns, built like League's:
 *     Trophies, Record, Finals, Goals, Shootouts.
 *   - Campaigns filters use the shared controls: season pills, a standard
 *     dropdown for competition, a result switch (Champions / Finalists /
 *     Exits), the shared search box and a Reset button.
 *   - Section titles use League's section-title style (Finals archive,
 *     Leagues, Silverware collection).
 *   - Smallest text raised from 8-9px to 10px (League's smallest size).
 *   - Page font and content spacing now match League.
 *   - Removed developer notes from titles ("Cups!HS:LX Grounded",
 *     "Computed from Log").
 *
 *  Cups v1 — 2026-09-24, 23:19 UTC — Correctness pass (no visual changes)
 *   - Two-legged ties now count as two matches, each leg with its own
 *     score and result, as the sheet's match totals count them. Affects
 *     club records (Rivalries) and the matches log. The Leagues tab still
 *     counts a tie once, because the sheet's league table does. Rivalries
 *     labels now explain this ("Each leg counts as a match").
 *   - Finals and Eliminations lists no longer stop at 33 and 5 entries
 *     (the counts on the day they were built). New finals now show up;
 *     empty numbered slots in the sheet are ignored.
 *   - Removed made-up fallback numbers (218 played, GF 479, 81.8% finals
 *     win rate, "Man City 6x"...). Blank sheet values now show as 0.
 *   - Removed out-of-date fallback column positions. If a header the
 *     canvas looks for is missing, a yellow warning explains what's wrong
 *     instead of silently reading the wrong columns.
 *   - Reads real sheet row numbers (App.js no longer shifts the rows).
 *   - Typed-in text now calculated from the data: season counts and
 *     ranges, Quintuple Era seasons, finals record, finals goals and
 *     clean sheets, trophy breakdowns, number of leagues. Our club's name
 *     is set once in CUPS SETTINGS.
 *   - Editing switched off (ENABLE_EDITING); edit buttons hidden.
 *   - Faster: rows are looked up by number instead of searching all rows.
 *
 *  Cups v0 — the code as built in Google Sheets (Gemini), re-indented,
 *   with "export default App" added so StackBlitz can load it.
 * ════════════════════════════════════════════════════════════════════
 */

import React, { useState, useMemo } from 'react';
import {
  PageHeader,
  HighlightsBar,
  HighlightCard,
  Segmented,
  FilterPills,
  ControlLabel,
  ResetButton,
  SearchInput,
  SELECT_CLASS,
  useGridColumns,
  drawerRowEnd,
  SegmentBar,
  Flag,
  FlagList,
  PAGE_WIDTH,
  HoverProvider,
  useHover,
  useLegendToggle,
  MARGIN_TONES,
  RecordKey,
} from './ui.js';
import * as d3 from 'd3';
import { Trophy, Medal, Shield, Award, Calendar, Flame, TrendingUp, Search, Filter, CheckCircle2, XCircle, Edit3, Plus, Trash2, ChevronLeft, ChevronRight, ChevronDown, BarChart3, Layers, Globe, Target, Users, ArrowUpRight, Activity, Sparkles, RefreshCw, Star, X, Check, Zap, Clock, Swords, History, ArrowUpDown, MinusCircle, Hash, FlaskConical } from 'lucide-react';
import CupsLab from './CupsLab.js';
// Tab bar: order and names. (The 'id' must match the tab's content block.)
const CUPS_TABS = [
  { id: 'campaigns', label: 'Campaigns', icon: Layers },
  { id: 'finals', label: 'Finals', icon: Trophy },
  { id: 'eliminations', label: 'Eliminations', icon: Swords },
  { id: 'form', label: 'Form & Margins', icon: Activity },
  { id: 'rivalries', label: 'Rivalries', icon: Users },
  { id: 'leagues', label: 'Leagues', icon: Globe },
  { id: 'competitions', label: 'Competitions', icon: BarChart3 },
  { id: 'timeline', label: 'Trophies', icon: Trophy },
];
// LAB: experiments live in CupsLab.js, shown as the last tab. false hides it.
const SHOW_LAB = true;
const TABS_SHOWN = SHOW_LAB ? [...CUPS_TABS, { id: 'lab', label: 'Lab', icon: FlaskConical }] : CUPS_TABS;
// Crash protection for the Lab tab only: a broken experiment blanks the
// Lab, not the rest of Cups.
class LabBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (<div className="p-6 rounded-xl border border-rose-200 bg-rose-50 text-sm text-rose-900">
        <div className="font-extrabold">A Lab experiment crashed.</div>
        <div className="text-xs mt-1 font-mono">{String(this.state.error && this.state.error.message)}</div>
        <div className="text-xs mt-2">The rest of Cups is unaffected.</div>
      </div>);
    }
    return this.props.children;
  }
}

// ─── CUPS SETTINGS ───────────────────────────────────────────────────
// Our club: as written in the sheet's "winner" column, and as shown on screen.
const CLUB_NAME_IN_SHEET = 'WREXHAM';
const CLUB_DISPLAY_NAME = 'Wrexham';

// EDITING SWITCH: off until saving from the canvas is tested on a COPY of
// the sheet. Edit buttons are hidden while this is false.
const ENABLE_EDITING = false;

// Where things live in the Cups tab (real sheet row numbers).
const CUPS_ROWS = {
  GRAND_TOTALS: 9, // "GRAND TOTALS" row
  LEAGUE_CODES: 9, // league codes (ESL, ...) further right on the same row
  LEAGUE_NAMES: 10,
  LEAGUE_NUMBERS: 11,
  LEAGUE_GD: 12,
  COMP_HEADERS: 10, // competition names (FA CUP, CARABAO CUP, ...)
  COMP_MILESTONES: 13,
  HEADERS: 18, // "COMP NAME", "F#", "E#" header row
  FIRST_CAMPAIGN: 21, // first campaign row
};

// A cell counts as a number only if it really holds one (0 included).
function sheetNum(v) {
  if (v === null || v === undefined || v === '') return 0;
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

// A two-legged tie is two matches (the sheet counts each leg). Returns one
// entry per match: two for a two-legged tie (each leg with its own score
// and result), one for a single match. Penalty shootouts decide the
// result of a level tie, the same way the sheet counts them.
function expandTie(rnd) {
  const hasLegs =
    rnd.isTwoLegs &&
    [rnd.l1_w, rnd.l1_o, rnd.l2_w, rnd.l2_o].every((v) => v != null && !isNaN(Number(v)));
  if (!hasLegs) {
    return [{ legLabel: '', gf: rnd.gf, ga: rnd.ga, isWin: rnd.isWin, isDraw: !!rnd.isDraw, isLoss: rnd.isLoss, penScore: rnd.penScore, fromLeg: false }];
  }
  const decidedOnPens = rnd.penScore && rnd.gf != null && rnd.gf === rnd.ga;
  return [
    [1, Number(rnd.l1_w), Number(rnd.l1_o)],
    [2, Number(rnd.l2_w), Number(rnd.l2_o)],
  ].map(([leg, gf, ga]) => {
    let isWin = gf > ga;
    let isLoss = gf < ga;
    let isDraw = gf === ga;
    let penScore = null;
    if (leg === 2 && decidedOnPens && isDraw) {
      isWin = !!rnd.isWin;
      isLoss = !rnd.isWin;
      isDraw = false;
      penScore = rnd.penScore;
    }
    return { legLabel: ` (Leg ${leg})`, gf, ga, isWin, isDraw, isLoss, penScore, fromLeg: true };
  });
}

// Round names as the sheet writes them ("RO - 16") -> as people say them.
function prettyStage(raw) {
  const t = String(raw || '').trim();
  if (!t) return '';
  const u = t.toUpperCase().replace(/\s+/g, ' ');
  let m = u.match(/^RO\s*-\s*(\d+)$/);
  if (m) return `Round of ${m[1]}`;
  if (/^QTR\s*-\s*FINAL$/.test(u) || /^QUARTER\s*-\s*FINAL$/.test(u)) return 'Quarter-Final';
  if (/^SEMI\s*-\s*FINAL$/.test(u)) return 'Semi-Final';
  m = u.match(/^QUALIFIER\s*(\d+)$/);
  if (m) return `Qualifier ${m[1]}`;
  // Anything else: "GROUP STAGE" -> "Group Stage"; keeps "Round of 16 (Leg 1)" as is
  if (t === u) return t.toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase()).replace(/\s*-\s*/g, '-');
  return t;
}

// Display names for competitions (the sheet writes them in capitals).
const COMP_DISPLAY_NAMES = {
  'FA CUP': 'FA Cup',
  'CARABAO CUP': 'Carabao Cup',
  'BSM TROPHY': 'BSM Trophy',
  'COMMUNITY SHIELD': 'Community Shield',
  'SUPER CUP': 'UEFA Super Cup',
  'CHAMPIONS LEAGUE': 'Champions League',
  'EUROPA LEAGUE': 'Europa League',
  'CONFERENCE LEAGUE': 'Conference League',
};
function compName(raw) {
  const u = String(raw || '').trim().toUpperCase();
  return COMP_DISPLAY_NAMES[u] || raw;
}
// Short competition names, for tight spaces (hover card lists).
const COMP_SHORT_NAMES = {
  'CHAMPIONS LEAGUE': 'UCL',
  'EUROPA LEAGUE': 'UEL',
  'CONFERENCE LEAGUE': 'UECL',
  'FA CUP': 'FAC',
  'CARABAO CUP': 'CAC',
  'BSM TROPHY': 'BSM',
  'SUPER CUP': 'SC',
  'COMMUNITY SHIELD': 'CS',
};
function compShort(raw) {
  const u = String(raw || '').trim().toUpperCase();
  return COMP_SHORT_NAMES[u] || u.split(/\s+/).map((w) => w[0]).join('');
}

// How a whole cup run ended, with its colours.
// Champions = gold, Finalists = silver, Exits = red, not played yet = grey.
function campaignTone(camp) {
  const res = String(camp.result || '').trim().toUpperCase();
  if (camp.isWrexhamWon) {
    return { key: 'champion', label: 'Champions', icon: '🏆 ', pill: 'bg-amber-100 text-amber-900 border-amber-300', bar: 'bg-amber-500', dark: 'bg-amber-400 text-slate-950 border-amber-300' };
  }
  if (res === 'FINAL') {
    return { key: 'finalist', label: 'Finalists', icon: '', pill: 'bg-slate-200 text-slate-800 border-slate-300', bar: 'bg-slate-400', dark: 'bg-slate-300 text-slate-900 border-slate-200' };
  }
  if (!res || res === 'SCHEDULED' || getCompProgress(camp).label === 'Scheduled') {
    return { key: 'scheduled', label: 'Scheduled', icon: '', pill: 'bg-white text-slate-500 border-slate-200 border-dashed', bar: 'bg-slate-300', dark: 'bg-white/10 text-slate-300 border-white/20' };
  }
  return { key: 'exit', label: prettyStage(camp.result), icon: '', pill: 'bg-rose-50 text-rose-700 border-rose-200', bar: 'bg-rose-400', dark: 'bg-rose-500/20 text-rose-200 border-rose-400/40' };
}

// One match as a chip (same look as the Campaigns bracket cards).
// showOpponent: true in Leagues (many opponents), false in Rivalries (one club).
function MatchChip({ m, showOpponent }) {
  const isFinalWon = m.status === 'CHAMPION';
  const isAgg = m.isTwoLegs && !/\(Leg \d\)/.test(String(m.stage || ''));
  const tone = isFinalWon
    ? { card: 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400/30', badge: 'bg-amber-500 text-white', label: 'WINNER' }
    : m.isWin
      ? { card: 'bg-emerald-50/60 border-emerald-200', badge: 'bg-emerald-600 text-white', label: 'WIN' }
      : m.isDraw
        ? { card: 'bg-white border-slate-200', badge: 'bg-amber-500 text-white', label: 'DRAW' }
        : { card: 'bg-rose-50/70 border-rose-200', badge: 'bg-rose-600 text-white', label: 'LOSS' };
  const venue = m.homeAway ? (String(m.homeAway).toUpperCase().includes('H') ? 'Home' : 'Away') : null;
  return (<div className={`p-3 rounded-xl border flex flex-col justify-between ${tone.card}`}>
      <div>
        <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          <span className="truncate" title={compName(m.competition)}>{compName(m.competition)}</span>
          <span className={`px-1.5 rounded font-black shrink-0 ${tone.badge}`}>{tone.label}</span>
        </div>
        {showOpponent && (<div className="flex items-center space-x-2 my-1">
            <Flag emoji={m.flag} size={22} className="shrink-0"/>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 truncate" title={m.opponent}>{m.opponent}</div>
              {m.isEsl && m.eslRank != null && (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{m.eslRank}</span>)}
            </div>
          </div>)}
        <div className="text-[11px] font-semibold text-slate-700">
          {prettyStage(m.stage)}{venue ? ` • ${venue}` : ''}
        </div>
        <div className="text-[11px] font-medium tabular-nums text-slate-500">S{m.season} • {m.year}</div>
      </div>
      <div className="mt-2 pt-1.5 border-t border-slate-200/60">
        <div className="flex items-center justify-between gap-1.5">
          <span className="tabular-nums text-sm font-black text-slate-900">{m.score}</span>
          <div className="flex items-center gap-1">
            {m.penScore && (<span className="text-[11px] tabular-nums font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">pens {String(m.penScore).replace(/[()]/g, '')}</span>)}
            {isAgg && (<span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/80">AGG</span>)}
          </div>
        </div>
        {isAgg && m.leg1 && m.leg2 && (<div className="text-[11px] tabular-nums text-slate-500 mt-1">
            Leg 1 <span className="font-bold text-slate-700">{m.leg1}</span> • Leg 2 <span className="font-bold text-slate-700">{m.leg2}</span>
          </div>)}
      </div>
    </div>);
}

// "S6, S7 & S8"
function seasonListText(list) {
  const names = list.map((s) => `S${s}`);
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}

// ─── FORM & MARGINS (Cups v5) ────────────────────────────────────────
// Every played cup match, one entry per game: group games, one-leg ties
// and each leg of a two-leg tie. Shootouts count as wins or losses (as the
// sheet counts them) and are flagged so they get their own colours.
// Also returns the two-leg ties as ties (for the Two-Leg dashboard) and the
// shootouts (for the Shootouts dashboard).
function buildFormData(campaigns) {
  const matches = [];
  const ties = [];
  const shootouts = [];
  const num = (v) => (v != null && v !== '' && !isNaN(Number(v)) ? Number(v) : null);
  (campaigns || []).forEach((camp) => {
    const base = { season: camp.season, year: camp.year, competition: camp.competition };
    if (camp.groupStage && Array.isArray(camp.groupStage.matchdays)) {
      camp.groupStage.matchdays.forEach((md) => {
        if (md.gf == null || md.ga == null) return; // not played yet
        matches.push({
          ...base, type: 'group', stage: `Group MD ${md.md}`,
          opponent: md.opponent, flag: md.flag, isEsl: md.isEsl, eslRank: md.eslRank,
          gf: md.gf, ga: md.ga,
          result: md.isWin ? 'W' : md.isDraw ? 'D' : 'L', pens: false,
        });
      });
    }
    (camp.rounds || []).forEach((rnd) => {
      if (rnd.gf == null || rnd.ga == null) return; // not played yet
      const opp = { opponent: rnd.opponent, flag: rnd.flag, isEsl: rnd.isEsl, eslRank: rnd.eslRank, leagueCode: rnd.leagueCode };
      const legs = expandTie(rnd);
      const isTwo = legs.length === 2;
      legs.forEach((m) => {
        matches.push({
          ...base, ...opp, type: isTwo ? 'two' : 'one',
          stage: prettyStage(rnd.name) + m.legLabel,
          gf: m.gf, ga: m.ga,
          result: m.isWin ? 'W' : m.isDraw ? 'D' : 'L',
          pens: !!m.penScore,
        });
      });
      const penL = num(rnd.penLeft);
      const penR = num(rnd.penRight);
      if (rnd.penScore && penL != null && penR != null) {
        shootouts.push({
          ...base, ...opp, stage: prettyStage(rnd.name), roundKey: rnd.key,
          gf: rnd.gf, ga: rnd.ga, penFor: penL, penAgainst: penR,
          isWin: !!rnd.isWin, twoLegs: isTwo,
        });
      }
      if (isTwo) {
        const [l1, l2] = legs;
        ties.push({
          ...base, ...opp, stage: prettyStage(rnd.name), roundKey: rnd.key,
          l1: { gf: l1.gf, ga: l1.ga }, l2: { gf: l2.gf, ga: l2.ga },
          gf: rnd.gf, ga: rnd.ga, isWin: !!rnd.isWin, penScore: rnd.penScore || null,
        });
      }
    });
  });
  matches.forEach((m) => {
    m.tier = marginTier(m.gf, m.ga, m.result, m.pens);
    m.name = m.opponent; // hover card row: flag, name, season, score
    m.score = `${m.gf}–${m.ga}`;
    m.tag = compShort(m.competition);
  });
  ties.forEach((t) => {
    t.tags = tieTags(t);
    t.name = t.opponent;
    t.score = `${t.gf}–${t.ga}`;
    t.tag = `S${t.season} ${compShort(t.competition)}`; // this list can span seasons
    t.tier = marginTier(t.gf, t.ga, t.isWin ? 'W' : 'L', !!t.penScore);
  });
  return { matches, ties, shootouts };
}

// Margin tier of one result. Draw tiers go by the score (0-0, 1-1, 2-2, 3+).
function marginTier(gf, ga, result, pens) {
  if (result === 'W') {
    if (pens || gf === ga) return 'wp';
    const d = gf - ga;
    return d >= 4 ? 'w4' : d === 3 ? 'w3' : d === 2 ? 'w2' : 'w1';
  }
  if (result === 'L') {
    if (pens || gf === ga) return 'lp';
    const d = ga - gf;
    return d >= 4 ? 'l4' : d === 3 ? 'l3' : d === 2 ? 'l2' : 'l1';
  }
  return gf >= 3 ? 'd3' : gf === 2 ? 'd2' : gf === 1 ? 'd1' : 'd0';
}

// Shootout colours: pale green (won on pens) and pale red (lost on pens),
// striped so they read apart from ordinary wins and losses. Change them here.
const PEN_WIN_STYLE = { backgroundImage: 'repeating-linear-gradient(135deg, #a7f3d0 0 5px, #d1fae5 5px 10px)' };
const PEN_LOSS_STYLE = { backgroundImage: 'repeating-linear-gradient(135deg, #fecdd3 0 5px, #ffe4e6 5px 10px)' };

// The margin tiers, in bar order (biggest wins first, heaviest losses last).
const CUP_TIERS = [
  { key: 'w4', group: 'win', label: '4+ goal wins', short: '4+ W', cls: 'bg-emerald-800 text-white' },
  { key: 'w3', group: 'win', label: '3 goal wins', short: '3 W', cls: 'bg-emerald-700 text-white' },
  { key: 'w2', group: 'win', label: '2 goal wins', short: '2 W', cls: 'bg-emerald-600 text-white' },
  { key: 'w1', group: 'win', label: '1 goal wins', short: '1 W', cls: 'bg-emerald-500 text-white' },
  { key: 'wp', group: 'win', label: 'Won on pens', short: 'Pens W', cls: 'text-emerald-900', style: PEN_WIN_STYLE },
  { key: 'd0', group: 'draw', label: '0-0 draws', short: '0-0', cls: 'bg-slate-400 text-white' },
  { key: 'd1', group: 'draw', label: '1-1 draws', short: '1-1', cls: 'bg-amber-500 text-white' },
  { key: 'd2', group: 'draw', label: '2-2 draws', short: '2-2', cls: 'bg-amber-600 text-white' },
  { key: 'd3', group: 'draw', label: '3-3+ draws', short: '3+ D', cls: 'bg-amber-700 text-white' },
  { key: 'lp', group: 'loss', label: 'Lost on pens', short: 'Pens L', cls: 'text-rose-900', style: PEN_LOSS_STYLE },
  { key: 'l1', group: 'loss', label: '1 goal losses', short: '1 L', cls: 'bg-rose-500 text-white' },
  { key: 'l2', group: 'loss', label: '2 goal losses', short: '2 L', cls: 'bg-rose-600 text-white' },
  { key: 'l3', group: 'loss', label: '3 goal losses', short: '3 L', cls: 'bg-rose-700 text-white' },
  { key: 'l4', group: 'loss', label: '4+ goal losses', short: '4+ L', cls: 'bg-rose-800 text-white' },
];
const TIER_GROUPS = [
  { key: 'win', total: 'Total W' },
  { key: 'draw', total: 'Total D' },
  { key: 'loss', total: 'Total L' },
];

// Count a list of { tier } into { w4: n, ..., win, draw, loss, total }.
function countTiers(list) {
  const c = { win: 0, draw: 0, loss: 0, total: 0, items: {} };
  CUP_TIERS.forEach((t) => { c[t.key] = 0; c.items[t.key] = []; });
  list.forEach((x) => {
    const t = CUP_TIERS.find((k) => k.key === x.tier);
    if (!t) return;
    c[t.key] += 1;
    c[t.group] += 1;
    c.total += 1;
    c.items[t.key].push(x);
  });
  return c;
}

// Matrix cell tones (same as League's Tier Matrix).
// Tier Matrix tones: ui.js MARGIN_TONES (v17).


// One row (or the totals row) of the Tier Matrix: every tier, grouped,
// with the biggest tier in each group highlighted.
function TierCells({ counts, footer = false }) {
  const cells = [];
  TIER_GROUPS.forEach((g) => {
    const tiers = CUP_TIERS.filter((t) => t.group === g.key);
    const max = Math.max(...tiers.map((t) => counts[t.key]));
    const tone = MARGIN_TONES[g.key];
    tiers.forEach((t, i) => {
      const v = counts[t.key];
      const isTop = v > 0 && v === max;
      const cls = `${footer ? 'py-3' : 'py-2.5'} px-2 text-center ${footer ? 'font-black ' + tone.foot : 'font-bold ' + tone.row} ${i === 0 ? (footer ? tone.footEdge : tone.edge) : ''}`;
      cells.push(
        <td key={t.key} className={cls}>
          {v > 0 || footer ? (
            isTop ? <span className={`px-1.5 py-0.5 rounded font-black ${footer ? tone.footPill : tone.pill}`}>{v}</span> : v
          ) : (
            <span className="text-slate-400">-</span>
          )}
        </td>
      );
    });
    cells.push(
      <td key={`${g.key}-total`} className={`${footer ? 'py-3' : 'py-2.5'} px-2 text-center font-black ${footer ? tone.footTotal : tone.total}`}>
        {counts[g.key]}
      </td>
    );
  });
  return cells;
}

// A stacked bar of margin tiers (Margin Distribution, Two-Leg aggregates).
function TierBar({ counts, height = 'h-6', context, chip, unit = 'matches' }) {
  return (
    <SegmentBar
      accent="amber"
      total={counts.total || 0}
      context={context}
      chip={chip}
      unit={unit}
      barClass={`w-full ${height} rounded-lg bg-slate-200 overflow-hidden flex gap-0.5`}
      segClass="h-full flex items-center justify-center text-[11px] font-black tabular-nums"
      segments={CUP_TIERS.map((t) => ({
        key: t.key,
        n: counts[t.key] || 0,
        label: t.label,
        cls: t.cls,
        swatch: t.style ? '' : t.cls.split(' ')[0],
        style: t.style,
        items: counts.items ? counts.items[t.key] : null,
        inner: (pct) => (pct >= 3 ? counts[t.key] : ''),
      }))}
    />
  );
}

// Colour key for the tiers (only the ones in use, when a list is given).
function TierLegend({ counts }) {
  const shown = counts ? CUP_TIERS.filter((t) => counts[t.key] > 0) : CUP_TIERS;
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
      {shown.map((t) => (
        <div key={t.key} className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
          <span className={`w-3 h-3 rounded-xs shrink-0 ${t.style ? 'border border-slate-300' : t.cls.split(' ')[0]}`} style={t.style || undefined} />
          <span className="text-slate-900 font-bold">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// Two-leg tags. A tie can have several; tap one to filter the ties.
// Change names, rules or order here.
const COAST_LEG1_MARGIN = 3; // "Coast": won leg 1 by at least this many
const HEAVYWEIGHT_RANK = 10; // "Heavyweight": opponent's ESL rank that season, this or better
const TIE_TAGS = [
  { key: 'control', label: 'In control', desc: "Won leg 1, didn't lose leg 2", dot: 'bg-emerald-600', test: (t) => t.isWin && t.m1 > 0 && t.m2 >= 0 },
  { key: 'merciless', label: 'Merciless', desc: 'Won both legs by 3+', dot: 'bg-emerald-800', test: (t) => t.m1 >= 3 && t.m2 >= 3 },
  { key: 'coast', label: 'Coast', desc: `Won leg 1 by ${COAST_LEG1_MARGIN}+, then leg 2 within one goal`, dot: 'bg-sky-500', test: (t) => t.m1 >= COAST_LEG1_MARGIN && Math.abs(t.m2) <= 1 },
  { key: 'clean', label: 'Clean', desc: 'No goals conceded in the tie', dot: 'bg-teal-500', test: (t) => t.ga === 0 },
  { key: 'nailbiter', label: 'Nailbiter', desc: 'Won the tie by 1 goal', dot: 'bg-amber-500', test: (t) => t.isWin && t.gf - t.ga === 1 },
  { key: 'leg2', label: 'Decider', desc: 'Drew leg 1, won the tie', dot: 'bg-cyan-500', test: (t) => t.isWin && t.m1 === 0 },
  { key: 'comeback', label: 'Comeback', desc: 'Lost leg 1, won the tie', dot: 'bg-lime-600', test: (t) => t.isWin && t.m1 < 0 },
  { key: 'scare', label: 'Scare', desc: 'Won leg 1, lost leg 2, still went through', dot: 'bg-orange-500', test: (t) => t.isWin && t.m1 > 0 && t.m2 < 0 },
  { key: 'heavyweight', label: 'Heavyweight', desc: `Opponent ranked ESL top ${HEAVYWEIGHT_RANK} that season`, dot: 'bg-violet-500', test: (t) => t.isEsl && t.eslRank != null && t.eslRank <= HEAVYWEIGHT_RANK },
  { key: 'deadlocked', label: 'Deadlocked', desc: 'Level on aggregate, settled on pens', dot: 'bg-slate-500', test: (t) => t.gf === t.ga },
  { key: 'collapse', label: 'Collapse', desc: 'Won leg 1, lost the tie', dot: 'bg-rose-400', test: (t) => !t.isWin && t.m1 > 0 },
  { key: 'gasp', label: 'Gasp', desc: 'Lost leg 1, won leg 2, lost the tie', dot: 'bg-pink-500', test: (t) => !t.isWin && t.m1 < 0 && t.m2 > 0 },
  { key: 'out', label: 'Knocked out', desc: 'Lost the tie', dot: 'bg-rose-600', test: (t) => !t.isWin },
  { key: 'humiliated', label: 'Humiliated', desc: 'Lost both legs by 2+', dot: 'bg-rose-800', test: (t) => t.m1 <= -2 && t.m2 <= -2 },
];
function tieTags(t) {
  const x = { ...t, m1: t.l1.gf - t.l1.ga, m2: t.l2.gf - t.l2.ga };
  return TIE_TAGS.filter((g) => g.test(x)).map((g) => g.key);
}

// Card header used by every Form & Margins dashboard (League's section style, Cups gold).
function FormSectionHeader({ icon: Icon, title, sub, right }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
          {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function FormEmpty({ children }) {
  return (
    <div className="p-6 text-center text-xs font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
      {children}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────

const KNOCKOUT_ROUNDS = [
    { name: 'Final', key: 'F', col: 30 },
    { name: 'Semi-Final', key: 'SF', col: 41 },
    { name: 'Quarter-Final', key: 'QF', col: 52 },
    { name: 'Round of 16', key: 'R16', col: 63 },
    { name: 'Round of 32', key: 'R32', col: 74 },
    { name: 'Round of 64', key: 'R64', col: 85 },
    { name: 'Qualifier 1', key: 'Q1', col: 96 },
    { name: 'Qualifier 2', key: 'Q2', col: 107 }
];
const CUP_METADATA = {
    'FA CUP': { color: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', tag: 'Domestic Major', type: 'Domestic' },
    'CARABAO CUP': { color: 'bg-teal-600', text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', tag: 'Domestic League Cup', type: 'Domestic' },
    'CHAMPIONS LEAGUE': { color: 'bg-blue-700', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', tag: 'European Elite', type: 'International' },
    'EUROPA LEAGUE': { color: 'bg-amber-600', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', tag: 'European Secondary', type: 'International' },
    'COMMUNITY SHIELD': { color: 'bg-rose-600', text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', tag: 'Super Cup', type: 'One-Off' },
    'SUPER CUP': { color: 'bg-indigo-600', text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', tag: 'UEFA Super Cup', type: 'One-Off' },
    'BSM TROPHY': { color: 'bg-slate-700', text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', tag: 'Lower League Trophy', type: 'Domestic' }
};
const DEFAULT_CLUBS = [
    { code: 'PSG', name: 'PSG', flag: '🇫🇷', rank: 3.625 },
    { code: 'MCI', name: 'MAN CITY', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 5.5 },
    { code: 'RMA', name: 'REAL MADRID', flag: '🇪🇸', rank: 4.5 },
    { code: 'B04', name: 'LEVERKUSEN', flag: '🇩🇪', rank: 6.75 },
    { code: 'JUV', name: 'JUVENTUS', flag: '🇮🇹', rank: 10.625 },
    { code: 'BAR', name: 'BARCELONA', flag: '🇪🇸', rank: 5.5 },
    { code: 'LOM', name: 'LOMBARDIA', flag: '🇮🇹', rank: 7.75 },
    { code: 'BAY', name: 'BAYERN', flag: '🇩🇪', rank: 8.375 },
    { code: 'MIL', name: 'MILAN', flag: '🇮🇹', rank: 9.0 },
    { code: 'ATH', name: 'ATHLETIC CLUB', flag: '🇪🇸', rank: 15.25 },
    { code: 'NAP', name: 'NAPOLI', flag: '🇮🇹', rank: 17.25 },
    { code: 'ARS', name: 'ARSENAL', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 7.25 },
    { code: 'ATM', name: 'ATLETICO', flag: '🇪🇸', rank: 14.75 },
    { code: 'MLL', name: 'MALLORCA', flag: '🇪🇸', rank: 74.375 },
    { code: 'BVB', name: 'DORTMUND', flag: '🇩🇪', rank: 12.375 },
    { code: 'SPO', name: 'SPORTING', flag: '🇵🇹', rank: 20.375 },
    { code: 'ASR', name: 'ROMA', flag: '🇮🇹', rank: 25.0 },
    { code: 'LAZ', name: 'LATIUM', flag: '🇮🇹', rank: 29.875 },
    { code: 'GAL', name: 'GALATASARAY', flag: '🇹🇷', rank: 30.0 },
    { code: 'VIL', name: 'VILLAREAL', flag: '🇪🇸', rank: 35.375 },
    { code: 'BHA', name: 'BRIGHTON', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 35.75 },
    { code: 'OL', name: 'LYON', flag: '🇫🇷', rank: 37.125 },
    { code: 'VFB', name: 'STUTTGART', flag: '🇩🇪', rank: 44.125 },
    { code: 'NICE', name: 'NICE', flag: '🇫🇷', rank: 55.625 },
    { code: 'SCB', name: 'BRAGA', flag: '🇵🇹', rank: 67.625 }
];
const H2H_COMPS = [
    { offset: 0, key: 'FA CUP', short: 'FAC', name: 'FA Cup' },
    { offset: 1, key: 'CARABAO CUP', short: 'CAC', name: 'Carabao Cup' },
    { offset: 2, key: 'CHAMPIONS LEAGUE', short: 'UCL', name: 'Champions League' },
    { offset: 3, key: 'EUROPA LEAGUE', short: 'UEL', name: 'Europa League' },
    { offset: 4, key: 'CONFERENCE LEAGUE', short: 'UE CL', name: 'Conference League' },
    { offset: 6, key: 'COMMUNITY SHIELD', short: 'CS', name: 'Community Shield' },
    { offset: 7, key: 'SUPER CUP', short: 'SC', name: 'UEFA Super Cup' }
];
const LEAGUE_MAPPING_RULES = {
    BEL: {
        flags: ['🇸🇦', '🇦🇪', '🇶🇦'],
        clubs: ['AL NASSR', 'AL HILAL', 'AL AHLI', 'AL ITTIHAD', 'AL AIN', 'ETTIFAQ FC', 'ETTIFAQ']
    },
    GER: {
        flags: ['🇩🇪', '🇦🇹', '🇵🇱'],
        clubs: ['HERTHA BSC', 'HERTHA', 'FC AUGSBURG', 'AUGSBURG', 'DARMSTADT', 'FC KOLN', 'KOLN', 'FSV MAINZ 05', 'MAINZ', 'HOFFENHEIM', 'HAMBURGER SV', 'HAMBURG', 'RB SALZBURG', 'SALZBURG', 'SC FREIBURG', 'FREIBURG']
    },
    ITA: {
        flags: ['🇮🇹', '🇨🇭'],
        clubs: ['SAMPDORIA', 'PARMA', 'GENOA', 'BOLOGNA', 'FIORENTINA', 'PALERMO', 'TORINO', 'FC BASEL', 'BASEL', 'YOUNG BOYS', 'VENEZIA', 'UDINESE']
    },
    FRA: {
        flags: ['🇫🇷', '🇷🇴'],
        clubs: ['MONTPELLIER', 'FC LORIENT', 'LORIENT', 'STADE RENNAIS', 'RENNES', 'CLERMONT', 'LENS', 'NANTES', 'MONACO']
    },
    TUR: {
        flags: ['🇹🇷', '🇨🇾', '🇭🇺', '🇬🇷', '🇦🇿'],
        clubs: ['PAOK', 'APOEL FC', 'APOEL', 'BESIKTAS', 'GALATASARAY', 'FENERBACHE', 'TRABZONSPOR']
    },
    ESP: {
        flags: ['🇪🇸', '🇵🇹'],
        clubs: ['RAYO VALLECANO', 'RAYO', 'LEVANTE UD', 'LEVANTE', 'ESPANYOL', 'GIRONA', 'VALENCIA', 'SEVILLA', 'UD ALMERIA', 'ALMERIA', 'LEGANES']
    },
    POR: {
        flags: ['🇦🇷', '🇨🇴', '🇧🇷', '🇺🇾', '🇨🇱'],
        clubs: ['RIVER PLATE', 'BOCA JUNIORS', 'BOCA', 'SAN LORENZO']
    },
    ROW: {
        flags: ['🏴‍☠️', '🇺🇦', '🇭🇷', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇷🇸'],
        clubs: ['SHAKTAR', 'SHAKHTAR', 'DINAMO ZAGREB', 'ZAGREB', 'RANGERS', 'DYNAMO KYIV', 'KYIV', 'VANCOUVER WHITECAPS', 'VANCOUVER']
    },
    DEN: {
        flags: ['🇰🇷', '🇯🇵', '🇨🇳'],
        clubs: ['POHANG STEELERS', 'POHANG', 'ULSAN HD', 'ULSAN']
    },
    ROM: {
        flags: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿'],
        clubs: ['FULHAM', 'BURNLEY', 'HUDDERSFIELD TOWN', 'HUDDERSFIELD']
    },
    POL: {
        flags: ['🇺🇸', '🇨🇦', '🇲🇽'],
        clubs: ['INTER MIAMI', 'MIAMI', 'LAFC']
    },
    AUT: {
        flags: ['🇦🇺', '🇳🇿'],
        clubs: ['MELBOURNE V', 'MELBOURNE']
    },
    IRE: {
        flags: ['🇮🇳'],
        clubs: ['ODISHA FC', 'ODISHA']
    },
    NED: {
        flags: ['🇧🇪', '🇳🇱'],
        clubs: ['GENK', 'SP. CHARLEROI', 'CHARLEROI']
    },
    SWE: {
        flags: ['🇩🇰', '🇸🇪', '🇳🇴', '🇫🇮'],
        clubs: ['HAMMARBY IF', 'HAMMARBY', 'MIDTJYLLAND']
    }
};
// ESL teams have a number 1-92 under their flag; non-ESL teams have a league acronym like FRA/ITA/ESP
function isEslTeam(rankVal) {
    if (rankVal == null)
        return false;
    if (typeof rankVal === 'string') {
        const trimmed = rankVal.trim();
        if (/^[A-Za-z]+$/.test(trimmed))
            return false; // League acronym like FRA, ITA, ESP, TUR, BEL, etc.
        const num = Number(trimmed);
        return !isNaN(num) && num >= 1 && num <= 92;
    }
    if (typeof rankVal === 'number') {
        return !isNaN(rankVal) && rankVal >= 1 && rankVal <= 92;
    }
    return false;
}
function parseTeamRankOrLeague(rankVal, oppName = '') {
    if (rankVal != null) {
        const str = String(rankVal).trim();
        if (str) {
            const num = Number(str);
            if (!isNaN(num) && num >= 1 && num <= 92) {
                return { isEsl: true, eslRank: num, leagueCode: null };
            }
            if (/^[A-Za-z]+$/.test(str)) {
                return { isEsl: false, eslRank: null, leagueCode: str.toUpperCase() };
            }
        }
    }
    if (oppName) {
        const norm = normalizeClubName(oppName);
        const found = DEFAULT_CLUBS.find(c => normalizeClubName(c.name) === norm || normalizeClubName(c.code) === norm);
        if (found) {
            return { isEsl: true, eslRank: found.rank, leagueCode: null };
        }
    }
    return { isEsl: false, eslRank: null, leagueCode: rankVal ? String(rankVal).trim().toUpperCase() : null };
}
function normalizeClubName(name) {
    if (!name)
        return '';
    const s = String(name).trim().toUpperCase();
    if (s.includes('MAN CITY') || s.includes('MANCHESTER CITY') || s === 'MCI')
        return 'MAN CITY';
    if (s.includes('REAL MADRID') || s === 'RMA')
        return 'REAL MADRID';
    if (s.includes('LEVERKUSEN') || s.includes('BAYER') || s === 'B04')
        return 'LEVERKUSEN';
    if (s.includes('JUVENTUS') || s === 'JUV')
        return 'JUVENTUS';
    if (s.includes('BARCELONA') || s === 'BAR')
        return 'BARCELONA';
    if (s.includes('LOMBARDIA') || s === 'LOM')
        return 'LOMBARDIA';
    if (s.includes('BAYERN') || s === 'BAY')
        return 'BAYERN';
    if (s.includes('AC MILAN') || s === 'MILAN' || s === 'MIL')
        return 'MILAN';
    if (s.includes('ATHLETIC') || s === 'ATH')
        return 'ATHLETIC CLUB';
    if (s.includes('NAPOLI') || s === 'NAP')
        return 'NAPOLI';
    if (s.includes('ARSENAL') || s === 'ARS')
        return 'ARSENAL';
    if (s.includes('ATLETICO') || s.includes('ATLÉTICO') || s === 'ATM')
        return 'ATLETICO';
    if (s.includes('MALLORCA') || s === 'MLL')
        return 'MALLORCA';
    if (s.includes('DORTMUND') || s.includes('BVB'))
        return 'DORTMUND';
    if (s.includes('SPORTING') || s === 'SPO')
        return 'SPORTING';
    if (s.includes('AS ROMA') || s === 'ROMA' || s === 'ASR')
        return 'ROMA';
    if (s.includes('LATIUM') || s.includes('LAZIO') || s === 'LAZ')
        return 'LATIUM';
    if (s.includes('GALATASARAY') || s === 'GAL')
        return 'GALATASARAY';
    if (s.includes('VILLAREAL') || s.includes('VILLARREAL') || s === 'VIL')
        return 'VILLAREAL';
    if (s.includes('BRIGHTON') || s === 'BHA')
        return 'BRIGHTON';
    if (s.includes('LYON') || s.includes('OLYMPIQUE LYONNAIS') || s === 'OL')
        return 'LYON';
    if (s.includes('STUTTGART') || s === 'VFB')
        return 'STUTTGART';
    if (s.includes('NICE') || s.includes('OGC NICE'))
        return 'NICE';
    if (s.includes('BRAGA') || s === 'SCB')
        return 'BRAGA';
    return s;
}
function matchesClub(opponentName, club) {
    if (!opponentName || !club)
        return false;
    const normOp = normalizeClubName(opponentName);
    const normClub = normalizeClubName(club.name || club.code);
    if (normOp === normClub)
        return true;
    const op = String(opponentName).trim().toUpperCase();
    const cCode = String(club.code || '').trim().toUpperCase();
    const cName = String(club.name || '').trim().toUpperCase();
    return op === cCode || op === cName;
}
// W/L/D logic: left score is Wrexham and right score is opponent (left > right is win, right > left is loss)
// Knockout games: tied scores resolved via penalty shootout (penLeft vs penRight) into win or loss.
// Group stage games: tied scores must be tagged as draws (D).
function getMatchOutcome(gf, ga, penLeft, penRight, rawStatus, isKnockout = true) {
    let isWin = false;
    let isLoss = false;
    let isDraw = false;
    if (gf != null && ga != null) {
        if (gf > ga) {
            isWin = true;
        }
        else if (ga > gf) {
            isLoss = true;
        }
        else {
            // Score is tied
            if (isKnockout) {
                // Only knockout games that go to penalty shootouts should have tied scores resolved as wins or losses
                if (penLeft != null && penRight != null) {
                    if (penLeft > penRight) {
                        isWin = true;
                    }
                    else if (penRight > penLeft) {
                        isLoss = true;
                    }
                    else {
                        isWin = rawStatus === 'W' || rawStatus === 'C';
                        isLoss = !isWin;
                    }
                }
                else {
                    isWin = rawStatus === 'W' || rawStatus === 'C';
                    isLoss = rawStatus === 'L' || !isWin;
                }
            }
            else {
                // Group stage matches with tied scores must be tagged as draws (D)
                isDraw = true;
            }
        }
    }
    else {
        const s = String(rawStatus || '').toUpperCase();
        if (s === 'W' || s === 'C') {
            isWin = true;
        }
        else if (s === 'D') {
            isDraw = true;
        }
        else if (s === 'L') {
            isLoss = true;
        }
        else {
            if (isKnockout) {
                isLoss = true;
            }
            else {
                isDraw = true;
            }
        }
    }
    let statusText = 'LOSS';
    if (isWin) {
        statusText = rawStatus === 'C' ? 'CHAMPION' : 'WIN';
    }
    else if (isDraw) {
        statusText = 'DRAW';
    }
    else {
        statusText = 'LOSS';
    }
    return {
        isWin,
        isLoss,
        isDraw,
        statusText
    };
}
const formatGoals = (val) => {
    if (val == null || isNaN(val))
        return '0';
    const n = Number(val);
    return Number.isInteger(n) ? n.toString() : n.toFixed(1);
};
function getCompProgress(camp) {
    if (camp.isWrexhamWon) {
        return { pct: 100, label: 'Champions' };
    }
    const res = (camp.result || '').toUpperCase();
    if (res.includes('CHAMPION'))
        return { pct: 100, label: 'Champions' };
    if (res === 'FINAL')
        return { pct: 88, label: 'Finalist' };
    if (res.includes('SEMI'))
        return { pct: 75, label: 'Semi-Final' };
    if (res.includes('QTR') || res.includes('QUARTER'))
        return { pct: 55, label: 'Quarter-Final' };
    if (res.includes('16'))
        return { pct: 40, label: 'Round of 16' };
    if (res.includes('32'))
        return { pct: 25, label: 'Round of 32' };
    if (res.includes('64'))
        return { pct: 15, label: 'Round of 64' };
    if (res.includes('QUALIFIER 1') || res.includes('QF1'))
        return { pct: 12, label: 'Qualifier 1' };
    if (res.includes('QUALIFIER 2') || res.includes('QF2'))
        return { pct: 6, label: 'Qualifier 2' };
    if (camp.totalRounds && camp.roundsCompleted) {
        const pct = Math.min(100, Math.max(10, Math.round((camp.roundsCompleted / camp.totalRounds) * 100)));
        return { pct, label: camp.result || `${pct}% Reached` };
    }
    if (camp.played > 0)
        return { pct: 30, label: camp.result || 'In Progress' };
    return { pct: 0, label: 'Scheduled' };
}
function App({ data = [], updateItem, deleteItem, insertItem, moveItem, followLink }) {
  // Hover card (ui.js): mouse hover or a tap on touch screens (v50.04)
  const hv = useHover();
  // Stacked Visualizer and Two-Leg Ties legends: hidden on phones, shown from tablet up (v50.05)
  const [formLegendOpen, FormLegendToggle] = useLegendToggle();
  const [tieLegendOpen, TieLegendToggle] = useLegendToggle();
    const [activeTab, setActiveTab] = useState('campaigns'); // 'campaigns' | 'finals' | 'eliminations' | 'rivalries' | 'leagues' | 'timeline'
    const [selectedSeason, setSelectedSeason] = useState('ALL');
    const [selectedCompetition, setSelectedCompetition] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'CHAMPIONS' | 'FINAL' | 'ELIMINATED'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(null);
    // Column counts of the three card grids (used to open drawers under the whole row)
    const campaignCols = useGridColumns({ base: 1, sm: 2, lg: 3, xl: 4 });
    const rivalryCols = useGridColumns({ base: 1, md: 2, lg: 3 });
    const leagueCols = useGridColumns({ base: 1, sm: 2, lg: 4 });
    const [finalsCompFilter, setFinalsCompFilter] = useState('ALL');
    // Trophy Cabinet filter states
    const [cabinetCategoryFilter, setCabinetCategoryFilter] = useState('ALL'); // 'ALL' | 'CONTINENTAL' | 'DOMESTIC' | 'SUPERCUP' | 'QUINTUPLE'
    const [cabinetSeasonFilter, setCabinetSeasonFilter] = useState('ALL');
    const [cabinetSearchQuery, setCabinetSearchQuery] = useState('');
    // Head-to-Head Club details modal state
    const [selectedClubCode, setSelectedClubCode] = useState(null);
    const [clubModalTab, setClubModalTab] = useState('matches'); // 'matches' | 'competitions'
    const [clubSearchQuery, setClubSearchQuery] = useState('');
    const [clubFilter, setClubFilter] = useState('ALL'); // 'ALL' | 'DOMINANT' | 'FREQUENT' | 'TOP10'
    // Standalone H2H Dashboard exact layout & interactive state
    const [h2hSubTab, setH2hSubTab] = useState('byClub'); // 'byClub' | 'allMatches' | 'tournaments'
    const [h2hSearch, setH2hSearch] = useState('');
    const [h2hTournamentFilter, setH2hTournamentFilter] = useState('ALL');
    const [h2hOutcomeFilter, setH2hOutcomeFilter] = useState('ALL'); // 'ALL' | '100W' | 'HAS_L' | 'PENS'
    const [h2hSortBy, setH2hSortBy] = useState('mostPlayed'); // 'mostPlayed' | 'winRate' | 'mostWins' | 'goalDiff' | 'alpha'
    const [h2hSortAsc, setH2hSortAsc] = useState(false);
    const [expandedClubCode, setExpandedClubCode] = useState(null);
    const [expandedLeagueCode, setExpandedLeagueCode] = useState(null);
    // Competitions Breakdown tab states
    const [compViewMode, setCompViewMode] = useState('cards'); // 'cards' | 'matrix' | 'trajectory'
    const [compCategoryFilter, setCompCategoryFilter] = useState('ALL'); // 'ALL' | 'Domestic' | 'International' | 'One-Off'
    const [compSearch, setCompSearch] = useState('');
    const [compSortBy, setCompSortBy] = useState('trophies'); // 'trophies' | 'winRate' | 'played' | 'gd' | 'finals'
    const [compSortAsc, setCompSortAsc] = useState(false);
    const [expandedCompKey, setExpandedCompKey] = useState(null);
    // Form & Margins controls
    const [formMarginView, setFormMarginView] = useState('bars'); // 'bars' | 'matrix'
    const [formSeason, setFormSeason] = useState('all');
    const [formType, setFormType] = useState('all'); // 'all' | 'group' | 'one' | 'two'
    const [formComp, setFormComp] = useState('all');
    const [tieSeason, setTieSeason] = useState('all');
    const [tieComp, setTieComp] = useState('all');
    const [tieTagFilter, setTieTagFilter] = useState('all');
    const [shootSplit, setShootSplit] = useState('comp'); // 'comp' | 'round' | 'season' | 'score'
    // Edit / Add modal states
    const [editingCampaign, setEditingCampaignState] = useState(null);
    const setEditingCampaign = (v) => { if (ENABLE_EDITING || v === null) setEditingCampaignState(v); };
    const [editingMatch, setEditingMatchState] = useState(null);
    const setEditingMatch = (v) => { if (ENABLE_EDITING || v === null) setEditingMatchState(v); };
    const [isAddingCampaign, setIsAddingCampaign] = useState(false);
    const [deleteConfirmIndex, setDeleteConfirmIndexState] = useState(null);
    const setDeleteConfirmIndex = (v) => { if (ENABLE_EDITING || v === null) setDeleteConfirmIndexState(v); };
    // Rows by real sheet row number (fast lookups instead of searching every row)
    const rowMap = useMemo(() => new Map((Array.isArray(data) ? data : []).map(d => [d.index_, d.row])), [data]);
    const rowAt = (i) => rowMap.get(i) || [];
    // 1. DATA EXTRACTION & DYNAMIC COLUMN MAPPING
    const parsedData = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) {
            return {
                grandTotals: { played: 0, trueW: 0, trueD: 0, trueL: 0, gf: 0, ga: 0, gd: 0, penW: 0, penL: 0 },
                dataWarnings: [],
                campaigns: [],
                finals: [],
                eliminations: [],
                clubsH2H: [],
                leaguesBreakdown: [],
                trophyCounts: {},
                seasonsList: []
            };
        }
        const dataWarnings = [];
        // Grand totals (the GRAND TOTALS row)
        const grandTotalsRow = rowAt(CUPS_ROWS.GRAND_TOTALS);
        if (String(grandTotalsRow[3] || '').trim().toUpperCase() !== 'GRAND TOTALS') {
            dataWarnings.push(`Row ${CUPS_ROWS.GRAND_TOTALS} of the Cups tab should be the GRAND TOTALS row, but isn't. The top totals may be wrong.`);
        }
        const grandTotals = {
            played: sheetNum(grandTotalsRow[8]),
            trueW: sheetNum(grandTotalsRow[11]),
            trueD: sheetNum(grandTotalsRow[13]),
            trueL: sheetNum(grandTotalsRow[15]),
            gf: sheetNum(grandTotalsRow[16]),
            ga: sheetNum(grandTotalsRow[17]),
            gd: sheetNum(grandTotalsRow[18]),
            penW: sheetNum(grandTotalsRow[19]),
            penL: sheetNum(grandTotalsRow[20])
        };
        // Locate header row for Finals ("F#") and Eliminations ("E#")
        const row17 = rowAt(CUPS_ROWS.HEADERS);
        const fCol = row17.indexOf('F#');
        const eCol = row17.indexOf('E#');
        if (fCol === -1) dataWarnings.push(`Couldn't find the "F#" header on row ${CUPS_ROWS.HEADERS} of the Cups tab, so the Finals list is empty.`);
        if (eCol === -1) dataWarnings.push(`Couldn't find the "E#" header on row ${CUPS_ROWS.HEADERS} of the Cups tab, so the Eliminations list is empty.`);
        const maxRowIndex = Math.max(0, ...data.map(d => d.index_));
        // Parse Campaigns
        const campaigns = [];
        let currentYear = '2024 - 25';
        let currentSeason = 1;
        for (let i = CUPS_ROWS.FIRST_CAMPAIGN; i <= maxRowIndex; i++) {
            const item = rowMap.has(i) ? { index_: i, row: rowMap.get(i) } : null;
            if (!item || !item.row)
                continue;
            const r = item.row;
            // Update current season and year if present
            if (r[1] && typeof r[1] === 'string' && r[1].includes('-')) {
                currentYear = r[1];
            }
            if (r[2] != null && !isNaN(Number(r[2]))) {
                currentSeason = Number(r[2]);
            }
            const compName = r[3];
            if (!compName || typeof compName !== 'string')
                continue;
            if (['COMP NAME', 'GRAND TOTALS', 'DOMESTIC COMP', 'INTL COMP', 'ONE-OFF FINALS', 'SUBTOTALS'].includes(compName))
                continue;
            // Find subrows (r+1 and r+2)
            const subrow1 = rowAt(i + 1);
            const subrow2 = rowAt(i + 2);
            // Knockout stages matches
            const rounds = [];
            KNOCKOUT_ROUNDS.forEach(rnd => {
                const status = r[rnd.col];
                // Omit unplayed matches and skip BYE / skipped rounds entirely (no BYE nodes)
                if (!status || status === 'x' || status === 'X' || status === 's' || status === 'S')
                    return;
                let isTwoLegs = false;
                let leg1 = null;
                let leg2 = null;
                let l1_w = null;
                let l1_o = null;
                let l2_w = null;
                let l2_o = null;
                let d1 = null;
                let d2 = null;
                let hasAgg = false;
                for (let c = rnd.col + 6; c <= rnd.col + 11; c++) {
                    if (String(subrow1[c] || '').trim().toUpperCase() === 'AGG.') {
                        hasAgg = true;
                        break;
                    }
                }
                if (hasAgg) {
                    isTwoLegs = true;
                    const fmtLeg = (n) => (n != null && !isNaN(Number(n)) ? (Number.isInteger(Number(n)) ? Number(n).toString() : Number(n).toFixed(1)) : '0');
                    // Locate the two score separator dashes in subrow1 between rnd.col and rnd.col + 10
                    const dashes = [];
                    for (let c = rnd.col + 1; c <= rnd.col + 10; c++) {
                        const v = String(subrow1[c] || '').trim();
                        if (v === '–' || v === '-' || v === ':') {
                            dashes.push(c);
                        }
                    }
                    if (dashes.length >= 2) {
                        d1 = dashes[0];
                        d2 = dashes[1];
                        const raw_l1_w = subrow1[d1 - 1];
                        const raw_l1_o = subrow1[d1 + 1];
                        const raw_l2_w = subrow1[d2 - 1];
                        const raw_l2_o = subrow1[d2 + 1];
                        if (raw_l1_w != null && raw_l1_o != null && !isNaN(Number(raw_l1_w)) && !isNaN(Number(raw_l1_o))) {
                            l1_w = Number(raw_l1_w);
                            l1_o = Number(raw_l1_o);
                            leg1 = `${fmtLeg(l1_w)} – ${fmtLeg(l1_o)}`;
                        }
                        if (raw_l2_w != null && raw_l2_o != null && !isNaN(Number(raw_l2_w)) && !isNaN(Number(raw_l2_o))) {
                            l2_w = Number(raw_l2_w);
                            l2_o = Number(raw_l2_o);
                            leg2 = `${fmtLeg(l2_w)} – ${fmtLeg(l2_o)}`;
                        }
                    }
                    else {
                        // Fallback for non-dash formats
                        const nums = [];
                        for (let cOffset = 1; cOffset <= 8; cOffset++) {
                            const val = subrow1[rnd.col + cOffset];
                            if (val != null && !isNaN(Number(val)) && typeof val !== 'boolean') {
                                nums.push(Number(val));
                            }
                        }
                        if (nums.length >= 5) {
                            l1_w = nums[1];
                            l1_o = nums[2];
                            l2_w = nums[3];
                            l2_o = nums[4];
                            leg1 = `${fmtLeg(l1_w)} – ${fmtLeg(l1_o)}`;
                            leg2 = `${fmtLeg(l2_w)} – ${fmtLeg(l2_o)}`;
                        }
                        else if (nums.length === 4) {
                            l1_w = nums[0];
                            l1_o = nums[1];
                            l2_w = nums[2];
                            l2_o = nums[3];
                            leg1 = `${fmtLeg(l1_w)} – ${fmtLeg(l1_o)}`;
                            leg2 = `${fmtLeg(l2_w)} – ${fmtLeg(l2_o)}`;
                        }
                    }
                }
                const flag = r[rnd.col + 1] || (!hasAgg ? subrow1[rnd.col + 1] : '') || '';
                const opponent = r[rnd.col + 2] || (!hasAgg ? subrow1[rnd.col + 2] : '') || 'TBD';
                // In 2-legged ties, the opponent's rank or league code sits at d1 - 2, or subrow1[rnd.col], or subrow1[rnd.col + 1]
                let rankVal = null;
                if (hasAgg) {
                    if (d1 != null && subrow1[d1 - 2] != null && String(subrow1[d1 - 2]).trim() !== '') {
                        rankVal = subrow1[d1 - 2];
                    }
                    else if (subrow1[rnd.col] != null && String(subrow1[rnd.col]).trim() !== '') {
                        rankVal = subrow1[rnd.col];
                    }
                    else if (subrow1[rnd.col + 1] != null && String(subrow1[rnd.col + 1]).trim() !== '') {
                        rankVal = subrow1[rnd.col + 1];
                    }
                }
                else {
                    rankVal = subrow1[rnd.col + 1] != null ? subrow1[rnd.col + 1] : subrow1[rnd.col];
                }
                const teamInfo = parseTeamRankOrLeague(rankVal, opponent);
                const isEsl = teamInfo.isEsl;
                const eslRank = teamInfo.eslRank;
                const leagueCode = teamInfo.leagueCode;
                const gf = r[rnd.col + 8] != null && !isNaN(Number(r[rnd.col + 8])) ? Number(r[rnd.col + 8]) : null;
                const ga = r[rnd.col + 10] != null && !isNaN(Number(r[rnd.col + 10])) ? Number(r[rnd.col + 10]) : null;
                let penLeft = null;
                let penRight = null;
                let penScore = null;
                if (gf != null && ga != null && gf === ga) {
                    if (subrow1[rnd.col + 8] != null && subrow1[rnd.col + 10] != null && !isNaN(Number(subrow1[rnd.col + 8]))) {
                        penLeft = Number(subrow1[rnd.col + 8]);
                        penRight = Number(subrow1[rnd.col + 10]);
                        penScore = `(${penLeft} - ${penRight})`;
                    }
                }
                // Apply Left = Wrexham, Right = Opponent, tied -> penalty score in parentheses below
                const outcome = getMatchOutcome(gf, ga, penLeft, penRight, status, true);
                rounds.push({
                    name: rnd.name,
                    key: rnd.key,
                    col: rnd.col,
                    status: outcome.statusText,
                    rawStatus: outcome.isWin ? (outcome.statusText === 'CHAMPION' ? 'C' : 'W') : outcome.isDraw ? 'D' : 'L',
                    isWin: outcome.isWin,
                    isLoss: outcome.isLoss,
                    isDraw: outcome.isDraw,
                    flag,
                    opponent,
                    isEsl,
                    eslRank,
                    leagueCode,
                    gf,
                    ga,
                    isTwoLegs,
                    leg1,
                    leg2,
                    l1_w,
                    l1_o,
                    l2_w,
                    l2_o,
                    d1,
                    d2,
                    penLeft,
                    penRight,
                    penScore
                });
            });
            // Group stage if present (columns 131-139 for table, 142+ base for fixtures)
            let groupStage = null;
            const posVal = Number(r[131]);
            const ptsVal = Number(r[132]);
            const gpVal = Number(r[133]);
            const isGroupStageComp = (r[25] && String(r[25]).toUpperCase().includes('GROUP')) || gpVal > 0 || ptsVal > 0 || (!isNaN(posVal) && posVal > 0);
            if (isGroupStageComp) {
                const matchdays = [];
                const mdStartCols = [142, 148, 154, 160, 166, 172, 178, 184];
                mdStartCols.forEach((startCol, idx) => {
                    let statusCol = null;
                    let rawStatus = null;
                    const s0 = String(r[startCol] || '').trim().toUpperCase();
                    const s1 = String(r[startCol + 1] || '').trim().toUpperCase();
                    if (['W', 'D', 'L', 'C'].includes(s0)) {
                        statusCol = startCol;
                        rawStatus = s0;
                    }
                    else if (['W', 'D', 'L', 'C'].includes(s1)) {
                        statusCol = startCol + 1;
                        rawStatus = s1;
                    }
                    else if (s0 === 'X' || s0 === 'S' || s1 === 'X' || s1 === 'S') {
                        return;
                    }
                    if (statusCol == null)
                        return;
                    let flag = r[statusCol + 1] || '';
                    let oppName = r[statusCol + 2] || '';
                    if (!oppName || oppName === 'W' || oppName === 'D' || oppName === 'L') {
                        for (let c = startCol; c <= startCol + 4; c++) {
                            const v = r[c];
                            if (v && typeof v === 'string' && v.length > 1 && !['W', 'D', 'L', 'C', 'X', 'S'].includes(v.trim().toUpperCase()) && !v.includes('–')) {
                                oppName = v;
                                break;
                            }
                        }
                    }
                    if (!oppName)
                        return;
                    let homeAway = '';
                    for (let c = startCol; c <= startCol + 2; c++) {
                        const v = String(subrow1[c] || '').trim().toUpperCase();
                        if (v === 'H' || v === 'A' || v === '(H)' || v === '(A)' || v === 'HOME' || v === 'AWAY') {
                            homeAway = v.replace(/[()]/g, '');
                            break;
                        }
                    }
                    if (!homeAway && subrow1[startCol + 1] != null) {
                        homeAway = String(subrow1[startCol + 1]).trim().replace(/[()]/g, '').toUpperCase();
                    }
                    if (!homeAway)
                        homeAway = 'H';
                    let gf = null;
                    let ga = null;
                    for (let c = startCol + 1; c <= startCol + 5; c++) {
                        const val = String(subrow1[c] || '').trim();
                        if (val === '–' || val === '-' || val === ':') {
                            const leftVal = subrow1[c - 1];
                            const rightVal = subrow1[c + 1];
                            if (leftVal != null && !isNaN(Number(leftVal)))
                                gf = Number(leftVal);
                            if (rightVal != null && !isNaN(Number(rightVal)))
                                ga = Number(rightVal);
                            break;
                        }
                    }
                    if (gf == null && subrow1[startCol + 2] != null && !isNaN(Number(subrow1[startCol + 2]))) {
                        gf = Number(subrow1[startCol + 2]);
                    }
                    if (ga == null && subrow1[startCol + 4] != null && !isNaN(Number(subrow1[startCol + 4]))) {
                        ga = Number(subrow1[startCol + 4]);
                    }
                    let rankVal = subrow1[startCol];
                    if (rankVal == null || rankVal === '' || String(rankVal).toUpperCase() === homeAway) {
                        rankVal = subrow1[startCol + 1] !== homeAway ? subrow1[startCol + 1] : null;
                    }
                    const teamInfo = parseTeamRankOrLeague(rankVal, oppName);
                    const outcome = getMatchOutcome(gf, ga, null, null, rawStatus, false);
                    matchdays.push({
                        md: idx + 1,
                        startCol,
                        statusCol,
                        colIdx: startCol,
                        status: outcome.statusText,
                        rawStatus: outcome.isWin ? 'W' : outcome.isDraw ? 'D' : 'L',
                        isWin: outcome.isWin,
                        isLoss: outcome.isLoss,
                        isDraw: outcome.isDraw,
                        flag,
                        opponent: oppName,
                        homeAway,
                        isEsl: teamInfo.isEsl,
                        eslRank: teamInfo.eslRank,
                        leagueCode: teamInfo.leagueCode,
                        gf,
                        ga,
                        score: gf != null && ga != null ? `${formatGoals(gf)} – ${formatGoals(ga)}` : 'vs'
                    });
                });
                const posNum = Number(r[131]);
                const posText = posNum === 1 ? '1st' : posNum === 2 ? '2nd' : posNum === 3 ? '3rd' : (posNum ? `${posNum}th` : '1st');
                groupStage = {
                    position: posText,
                    points: Number(r[132]) || 0,
                    gp: Number(r[133]) || 0,
                    w: Number(r[134]) || 0,
                    d: Number(r[135]) || 0,
                    l: Number(r[136]) || 0,
                    gf: Number(r[137]) || 0,
                    ga: Number(r[138]) || 0,
                    gd: Number(r[139]) || 0,
                    matchdays
                };
            }
            const isWon = r[4] === '🏆' || r[4] === '🛡️' || String(r[5] || '').toUpperCase().includes(CLUB_NAME_IN_SHEET) || r[29] === 'CHAMPIONS';
            campaigns.push({
                rowIndex: i,
                year: currentYear,
                season: currentSeason,
                competition: compName,
                trophyIcon: r[4] || (isWon ? '🏆' : null),
                winner: r[5] || (isWon ? `${CLUB_NAME_IN_SHEET} ✦` : 'TBD'),
                isWrexhamWon: isWon,
                played: Number(r[8]) || 0,
                trueW: Number(r[11]) || 0,
                trueD: Number(r[13]) || 0,
                trueL: Number(r[15]) || 0,
                gf: Number(r[16]) || 0,
                ga: Number(r[17]) || 0,
                gd: Number(r[18]) || 0,
                penW: Number(r[19]) || 0,
                penL: Number(r[20]) || 0,
                myRank: r[21] != null ? Number(r[21]) : null,
                avgOppRank: r[23] != null ? Number(r[23]) : null,
                rsi: r[24] != null && !isNaN(Number(r[24])) ? Number(r[24]) : null, // sheet: my rank minus avg opp rank
                roundEntered: r[25] || 'RO - 64',
                roundsCompleted: r[26] != null && !isNaN(Number(r[26])) ? Number(r[26]) : null,
                totalRounds: r[28] != null && !isNaN(Number(r[28])) ? Number(r[28]) : null,
                result: r[29] || (Number(r[8]) > 0 ? (isWon ? 'CHAMPIONS' : 'FINAL') : 'SCHEDULED'),
                rounds,
                groupStage
            });
        }
        // Parse Finals Log (column found from the "F#" header)
        const finals = [];
        data.forEach(d => {
            const r = d.row;
            if (!r)
                return;
            if (fCol === -1)
                return;
            const fNum = r[fCol];
            // The sheet numbers empty slots ahead of time; only rows with a competition filled in are real
            if (fNum != null && !isNaN(Number(fNum)) && Number(fNum) >= 1 && String(r[fCol + 3] || '').trim() !== '') {
                const nextRow = rowAt(d.index_ + 1);
                const rankVal = nextRow[fCol + 4];
                const teamInfo = parseTeamRankOrLeague(rankVal);
                const gf = Number(r[fCol + 7]) || 0;
                const ga = Number(r[fCol + 9]) || 0;
                const isWon = r[fCol + 10] === 'C' || r[fCol + 11] === 'CHAMPIONS' || gf > ga;
                finals.push({
                    fNum: Number(fNum),
                    year: r[fCol + 1] || '',
                    season: Number(r[fCol + 2]) || 1,
                    comp: r[fCol + 3] || '',
                    flag: r[fCol + 4] || '',
                    opponent: r[fCol + 5] || '',
                    isEsl: teamInfo.isEsl,
                    eslRank: teamInfo.eslRank,
                    leagueCode: teamInfo.leagueCode,
                    gf,
                    ga,
                    score: `${gf} – ${ga}`,
                    resCode: isWon ? 'C' : 'L',
                    result: isWon ? 'CHAMPIONS' : 'FINAL',
                    isWon
                });
            }
        });
        // Parse Eliminations Log (column found from the "E#" header)
        const eliminations = [];
        data.forEach(d => {
            const r = d.row;
            if (!r)
                return;
            if (eCol === -1)
                return;
            const eNum = r[eCol];
            // The sheet numbers empty slots ahead of time; only rows with a competition filled in are real
            if (eNum != null && !isNaN(Number(eNum)) && Number(eNum) >= 1 && String(r[eCol + 3] || '').trim() !== '') {
                const nextRow = rowAt(d.index_ + 1);
                const rankVal = nextRow[eCol + 4];
                const teamInfo = parseTeamRankOrLeague(rankVal);
                const gf = Number(r[eCol + 7]) || 0;
                const ga = Number(r[eCol + 9]) || 0;
                eliminations.push({
                    eNum: Number(eNum),
                    year: r[eCol + 1] || '',
                    season: Number(r[eCol + 2]) || 1,
                    comp: r[eCol + 3] || '',
                    flag: r[eCol + 4] || '',
                    opponent: r[eCol + 5] || '',
                    isEsl: teamInfo.isEsl,
                    eslRank: teamInfo.eslRank,
                    leagueCode: teamInfo.leagueCode,
                    gf,
                    ga,
                    score: `${gf} – ${ga}`,
                    round: r[eCol + 11] || 'KNOCKOUT'
                });
            }
        });
        // PARSE HEAD-TO-HEAD RECORDS AGAINST ESL CLUBS ONLY (FILTER OUT NON-ESL CLUBS)
        // Gather all matches played against ESL clubs only:
        const eslMatchesByClub = {};
        campaigns.forEach(camp => {
            // Knockout rounds
            camp.rounds.forEach(rnd => {
                if (rnd.skipped || !rnd.opponent || rnd.opponent === 'TBD')
                    return;
                // Filter out non-ESL clubs
                if (!rnd.isEsl)
                    return;
                const clubKey = normalizeClubName(rnd.opponent);
                if (!eslMatchesByClub[clubKey]) {
                    eslMatchesByClub[clubKey] = {
                        rawName: rnd.opponent,
                        normalizedName: clubKey,
                        flag: rnd.flag,
                        rank: rnd.eslRank,
                        matches: []
                    };
                }
                if (rnd.eslRank != null && !eslMatchesByClub[clubKey].rank) {
                    eslMatchesByClub[clubKey].rank = rnd.eslRank;
                }
                expandTie(rnd).forEach(m => {
                    eslMatchesByClub[clubKey].matches.push({
                        season: camp.season,
                        year: camp.year,
                        competition: camp.competition,
                        stage: rnd.name + m.legLabel,
                        opponent: rnd.opponent,
                        flag: rnd.flag,
                        status: m.fromLeg
                            ? (m.isWin ? 'WIN' : m.isDraw ? 'DRAW' : 'LOSS')
                            : (rnd.status === 'CHAMPION' ? 'CHAMPION' : m.isWin ? 'WIN' : 'LOSS'),
                        rawStatus: m.isWin ? 'W' : m.isDraw ? 'D' : 'L',
                        isWin: m.isWin,
                        isLoss: m.isLoss,
                        isDraw: m.isDraw,
                        gf: m.gf,
                        ga: m.ga,
                        score: m.gf != null && m.ga != null ? `${m.gf} – ${m.ga}` : 'vs',
                        isTwoLegs: rnd.isTwoLegs,
                        leg1: rnd.leg1,
                        leg2: rnd.leg2,
                        penScore: m.penScore,
                        type: 'Knockout'
                    });
                });
            });
            // Group stage
            if (camp.groupStage && camp.groupStage.matchdays) {
                camp.groupStage.matchdays.forEach(md => {
                    if (!md.opponent || !md.isEsl)
                        return; // Filter out non-ESL clubs
                    const clubKey = normalizeClubName(md.opponent);
                    if (!eslMatchesByClub[clubKey]) {
                        eslMatchesByClub[clubKey] = {
                            rawName: md.opponent,
                            normalizedName: clubKey,
                            flag: md.flag,
                            rank: md.eslRank,
                            matches: []
                        };
                    }
                    if (md.eslRank != null && !eslMatchesByClub[clubKey].rank) {
                        eslMatchesByClub[clubKey].rank = md.eslRank;
                    }
                    eslMatchesByClub[clubKey].matches.push({
                        season: camp.season,
                        year: camp.year,
                        competition: camp.competition,
                        stage: `Group Stage (MD ${md.md})`,
                        opponent: md.opponent,
                        flag: md.flag,
                        status: md.isWin ? 'WIN' : md.isDraw ? 'DRAW' : 'LOSS',
                        rawStatus: md.isWin ? 'W' : md.isDraw ? 'D' : 'L',
                        isWin: md.isWin,
                        isLoss: md.isLoss,
                        isDraw: md.isDraw,
                        gf: md.gf,
                        ga: md.ga,
                        score: md.gf != null && md.ga != null ? `${md.gf} – ${md.ga}` : 'vs',
                        homeAway: md.homeAway,
                        type: 'Group Stage'
                    });
                });
            }
        });
        // Add any finals against ESL clubs that might not have been captured
        finals.forEach(fin => {
            if (!fin.opponent || !fin.isEsl)
                return; // Filter out non-ESL clubs
            const clubKey = normalizeClubName(fin.opponent);
            if (!eslMatchesByClub[clubKey]) {
                eslMatchesByClub[clubKey] = {
                    rawName: fin.opponent,
                    normalizedName: clubKey,
                    flag: fin.flag,
                    rank: fin.eslRank,
                    matches: []
                };
            }
            const alreadyHas = eslMatchesByClub[clubKey].matches.some(m => m.season === fin.season && m.competition.toLowerCase().includes(fin.comp.toLowerCase()) && m.stage === 'Final');
            if (!alreadyHas) {
                eslMatchesByClub[clubKey].matches.push({
                    season: fin.season,
                    year: fin.year,
                    competition: fin.comp,
                    stage: 'Final',
                    opponent: fin.opponent,
                    flag: fin.flag,
                    status: fin.isWon ? 'CHAMPION' : 'LOSS',
                    rawStatus: fin.isWon ? 'W' : 'L',
                    isWin: fin.isWon,
                    isLoss: !fin.isWon,
                    gf: fin.gf,
                    ga: fin.ga,
                    score: fin.score,
                    type: 'Finals'
                });
            }
        });
        // Add any eliminations against ESL clubs
        eliminations.forEach(elm => {
            if (!elm.opponent || !elm.isEsl)
                return; // Filter out non-ESL clubs
            const clubKey = normalizeClubName(elm.opponent);
            if (!eslMatchesByClub[clubKey]) {
                eslMatchesByClub[clubKey] = {
                    rawName: elm.opponent,
                    normalizedName: clubKey,
                    flag: elm.flag,
                    rank: elm.eslRank,
                    matches: []
                };
            }
            const alreadyHas = eslMatchesByClub[clubKey].matches.some(m => m.season === elm.season && m.competition.toLowerCase().includes(elm.comp.toLowerCase()));
            if (!alreadyHas) {
                eslMatchesByClub[clubKey].matches.push({
                    season: elm.season,
                    year: elm.year,
                    competition: elm.comp,
                    stage: elm.round,
                    opponent: elm.opponent,
                    flag: elm.flag,
                    status: 'LOSS',
                    rawStatus: 'L',
                    isWin: false,
                    isLoss: true,
                    gf: elm.gf,
                    ga: elm.ga,
                    score: elm.score,
                    type: 'Elimination'
                });
            }
        });
        // Build the ESL clubs H2H array:
        // Start with canonical 25 ESL clubs and merge any other ESL clubs encountered
        const allEslKeys = Array.from(new Set([...DEFAULT_CLUBS.map(c => normalizeClubName(c.name)), ...Object.keys(eslMatchesByClub)]));
        const clubsH2H = allEslKeys.map(clubKey => {
            const defaultInfo = DEFAULT_CLUBS.find(c => normalizeClubName(c.name) === clubKey || normalizeClubName(c.code) === clubKey);
            const matchGroup = eslMatchesByClub[clubKey] || { matches: [], flag: defaultInfo?.flag || '🏳️', rank: defaultInfo?.rank || null };
            const name = defaultInfo?.name || matchGroup.rawName || clubKey;
            const code = defaultInfo?.code || (name.length <= 4 ? name : name.slice(0, 3).toUpperCase());
            const flag = matchGroup.flag || defaultInfo?.flag || '🏳️';
            const rank = defaultInfo?.rank ?? matchGroup.rank;
            const matches = [...matchGroup.matches];
            matches.sort((a, b) => a.season - b.season);
            // W/L/D Logic: group ties tagged as draws (D), knockout ties resolved via shootouts
            const won = matches.filter(m => m.isWin).length;
            const drawn = matches.filter(m => m.isDraw).length;
            const lost = matches.filter(m => m.isLoss).length;
            const played = won + drawn + lost;
            const goalsFor = matches.reduce((sum, m) => sum + (m.gf != null ? m.gf : 0), 0);
            const goalsAgainst = matches.reduce((sum, m) => sum + (m.ga != null ? m.ga : 0), 0);
            const gd = goalsFor - goalsAgainst;
            const winRate = played > 0 ? (won / played) * 100 : 0;
            const cleanSheets = matches.filter(m => m.ga === 0 && m.gf != null).length;
            const finalsCount = matches.filter(m => m.stage === 'Final' || m.status === 'CHAMPION').length;
            const finalsWon = matches.filter(m => (m.stage === 'Final' && m.isWin) || m.status === 'CHAMPION').length;
            // Competition breakdown
            const compBreakdown = H2H_COMPS.map(cmp => {
                const cmpMatches = matches.filter(m => m.competition.toLowerCase().includes(cmp.key.toLowerCase()) || cmp.name.toLowerCase().includes(m.competition.toLowerCase()));
                const cWon = cmpMatches.filter(m => m.isWin).length;
                const cDrawn = cmpMatches.filter(m => m.isDraw).length;
                const cLost = cmpMatches.filter(m => m.isLoss).length;
                const cPlayed = cWon + cDrawn + cLost;
                const cGf = cmpMatches.reduce((sum, m) => sum + (m.gf != null ? m.gf : 0), 0);
                const cGa = cmpMatches.reduce((sum, m) => sum + (m.ga != null ? m.ga : 0), 0);
                const cGd = cGf - cGa;
                return {
                    ...cmp,
                    p: cPlayed,
                    w: cWon,
                    d: cDrawn,
                    l: cLost,
                    gd: cGd,
                    winRate: cPlayed > 0 ? (cWon / cPlayed) * 100 : 0
                };
            });
            return {
                code,
                name,
                rank,
                flag,
                played,
                won,
                drawn,
                lost,
                gd,
                winRate,
                compBreakdown,
                matches,
                goalsFor,
                goalsAgainst,
                cleanSheets,
                finalsCount,
                finalsWon
            };
        }).filter(c => c.played > 0 || DEFAULT_CLUBS.some(dc => dc.code === c.code));
        // Sort clubs by matches played descending, then win rate descending
        clubsH2H.sort((a, b) => b.played - a.played || b.winRate - a.winRate);
        // Parse Competitive Analysis - Leagues (all 16 leagues starting with ESL)
        const row8 = rowAt(CUPS_ROWS.LEAGUE_CODES);
        const row9 = rowAt(CUPS_ROWS.LEAGUE_NAMES);
        const row10 = rowAt(CUPS_ROWS.LEAGUE_NUMBERS);
        const row11 = rowAt(CUPS_ROWS.LEAGUE_GD);
        const eslCol = row8.indexOf('ESL');
        if (eslCol === -1) dataWarnings.push(`Couldn't find the "ESL" league header on row ${CUPS_ROWS.LEAGUE_CODES} of the Cups tab, so the Leagues tab is empty.`);
        const leaguesBreakdown = [];
        for (let i = 0; eslCol !== -1 && i < 16; i++) {
            const c = eslCol + i * 6;
            const code = row8[c];
            const flags = row8[c + 1] || '';
            const name = row9[c] || code;
            if (!code && !name)
                continue;
            const nums = [];
            for (let k = 0; k < 6; k++) {
                if (row10[c + k] != null && !isNaN(Number(row10[c + k]))) {
                    nums.push(Number(row10[c + k]));
                }
            }
            const played = nums[0] || 0;
            const won = nums[1] || 0;
            const drawn = nums[2] || 0;
            const lost = nums[3] || 0;
            const gd = Number(row11[c]) || 0;
            leaguesBreakdown.push({
                code,
                flags,
                name,
                played,
                won,
                drawn,
                lost,
                gd,
                winRate: played > 0 ? (won / played) * 100 : 0,
                matches: []
            });
        }
        // Collect matches across continental and international campaigns for the League Battleground
        const allCampaignMatches = [];
        const INTL_COMPS = ['CHAMPIONS LEAGUE', 'EUROPA LEAGUE', 'CONFERENCE LEAGUE', 'SUPER CUP'];
        campaigns.forEach(camp => {
            const compUpper = String(camp.competition || '').toUpperCase();
            const isIntlComp = INTL_COMPS.some(c => compUpper.includes(c));
            if (!isIntlComp)
                return;
            camp.rounds.forEach(rnd => {
                if (rnd.skipped || !rnd.opponent || rnd.opponent === 'TBD')
                    return;
                allCampaignMatches.push({
                    season: camp.season,
                    year: camp.year,
                    competition: camp.competition,
                    stage: rnd.name,
                    opponent: rnd.opponent,
                    flag: rnd.flag,
                    status: rnd.status === 'CHAMPION' ? 'CHAMPION' : rnd.isWin ? 'WIN' : rnd.isDraw ? 'DRAW' : 'LOSS',
                    rawStatus: rnd.rawStatus || (rnd.isWin ? 'W' : rnd.isDraw ? 'D' : 'L'),
                    isWin: rnd.isWin,
                    isLoss: rnd.isLoss,
                    isDraw: rnd.isDraw,
                    gf: rnd.gf,
                    ga: rnd.ga,
                    score: rnd.gf != null && rnd.ga != null ? `${formatGoals(rnd.gf)} – ${formatGoals(rnd.ga)}` : 'vs',
                    isTwoLegs: rnd.isTwoLegs,
                    leg1: rnd.leg1,
                    leg2: rnd.leg2,
                    penScore: rnd.penScore,
                    homeAway: null,
                    type: 'Knockout',
                    isEsl: rnd.isEsl,
                    eslRank: rnd.eslRank,
                    leagueCode: rnd.leagueCode,
                    matchDataForEdit: {
                        isGroupStage: false,
                        name: rnd.name,
                        campaignRowIndex: camp.rowIndex,
                        col: rnd.col,
                        status: rnd.rawStatus || (rnd.isWin ? 'W' : 'L'),
                        flag: rnd.flag || '',
                        opponent: rnd.opponent || '',
                        gf: rnd.gf,
                        ga: rnd.ga,
                        isTwoLegs: rnd.isTwoLegs,
                        leg1: rnd.leg1,
                        leg2: rnd.leg2,
                        l1_w: rnd.l1_w,
                        l1_o: rnd.l1_o,
                        l2_w: rnd.l2_w,
                        l2_o: rnd.l2_o,
                        d1: rnd.d1,
                        d2: rnd.d2
                    }
                });
            });
            if (camp.groupStage && camp.groupStage.matchdays) {
                camp.groupStage.matchdays.forEach(md => {
                    if (!md.opponent)
                        return;
                    allCampaignMatches.push({
                        season: camp.season,
                        year: camp.year,
                        competition: camp.competition,
                        stage: `Group Stage (MD ${md.md})`,
                        opponent: md.opponent,
                        flag: md.flag,
                        status: md.isWin ? 'WIN' : md.isDraw ? 'DRAW' : 'LOSS',
                        rawStatus: md.rawStatus || (md.isWin ? 'W' : md.isDraw ? 'D' : 'L'),
                        isWin: md.isWin,
                        isLoss: md.isLoss,
                        isDraw: md.isDraw,
                        gf: md.gf,
                        ga: md.ga,
                        score: md.gf != null && md.ga != null ? `${formatGoals(md.gf)} – ${formatGoals(md.ga)}` : 'vs',
                        homeAway: md.homeAway,
                        type: 'Group Stage',
                        isEsl: md.isEsl,
                        eslRank: md.eslRank,
                        leagueCode: md.leagueCode,
                        matchDataForEdit: {
                            isGroupStage: true,
                            name: `Group Stage (MD ${md.md})`,
                            campaignRowIndex: camp.rowIndex,
                            startCol: md.startCol,
                            statusCol: md.statusCol,
                            colIdx: md.startCol,
                            status: md.rawStatus || (md.isWin ? 'W' : md.isDraw ? 'D' : 'L'),
                            flag: md.flag || '',
                            opponent: md.opponent || '',
                            homeAway: md.homeAway || 'H',
                            gf: md.gf,
                            ga: md.ga
                        }
                    });
                });
            }
        });
        const resolveMatchLeague = (m) => {
            if (m.isEsl)
                return 'ESL';
            if (m.leagueCode) {
                const codeUpper = String(m.leagueCode).trim().toUpperCase();
                if (leaguesBreakdown.some(l => l.code === codeUpper)) {
                    return codeUpper;
                }
            }
            const normOpp = (m.opponent || '').toUpperCase();
            for (const [lCode, rule] of Object.entries(LEAGUE_MAPPING_RULES)) {
                if (rule.clubs.some(c => normOpp.includes(c))) {
                    return lCode;
                }
            }
            if (m.flag) {
                const flag = String(m.flag).trim();
                for (const [lCode, rule] of Object.entries(LEAGUE_MAPPING_RULES)) {
                    if (rule.flags.includes(flag)) {
                        return lCode;
                    }
                }
                const leagueByRowFlag = leaguesBreakdown.find(l => l.code !== 'ESL' && l.flags && l.flags.includes(flag));
                if (leagueByRowFlag)
                    return leagueByRowFlag.code;
            }
            return 'ESL';
        };
        allCampaignMatches.forEach(m => {
            const assignedLeagueCode = resolveMatchLeague(m);
            const targetLeague = leaguesBreakdown.find(l => l.code === assignedLeagueCode);
            if (targetLeague) {
                targetLeague.matches.push(m);
            }
        });
        leaguesBreakdown.forEach(l => {
            l.matches.sort((a, b) => a.season - b.season);
            if (l.played > 0 && l.matches.length > l.played) {
                l.matches = l.matches.slice(0, l.played);
            }
        });
        // Trophy counts
        const trophyCounts = {};
        campaigns.forEach(c => {
            if (c.isWrexhamWon) {
                trophyCounts[c.competition] = (trophyCounts[c.competition] || 0) + 1;
            }
        });
        // Seasons with nothing played yet (e.g. a placeholder Season 10) are left out entirely
        const activeSeasons = new Set(campaigns.filter(c => getCompProgress(c).label !== 'Scheduled').map(c => c.season));
        for (let k = campaigns.length - 1; k >= 0; k--) {
            if (!activeSeasons.has(campaigns[k].season)) campaigns.splice(k, 1);
        }
        const seasonsList = Array.from(new Set(campaigns.map(c => c.season))).sort((a, b) => a - b);
        return {
            grandTotals,
            dataWarnings,
            campaigns,
            finals,
            eliminations,
            clubsH2H,
            leaguesBreakdown,
            trophyCounts,
            seasonsList
        };
    }, [data]);
    // Parse Competitions Breakdown (grounded in Cups!HS:LX and enriched with live campaigns)
    const competitionsBreakdownData = useMemo(() => {
        const compHeadersRow = rowAt(CUPS_ROWS.COMP_HEADERS);
        const compMilestonesRow = rowAt(CUPS_ROWS.COMP_MILESTONES);
        const compTotalsRow = rowAt(CUPS_ROWS.HEADERS);
        const KNOWN_COMPETITIONS = [
            { key: 'FA CUP', name: 'FA Cup', type: 'Domestic', category: 'Domestic Major', icon: '🏆', defaultCol: 228, desc: 'Historic English FA Cup' },
            { key: 'CARABAO CUP', name: 'Carabao Cup', type: 'Domestic', category: 'Domestic League Cup', icon: '🏆', defaultCol: 240, desc: 'EFL League Cup Competition' },
            { key: 'CHAMPIONS LEAGUE', name: 'Champions League', type: 'International', category: 'European Elite', icon: '🏆', defaultCol: 276, desc: 'UEFA European Elite Tournament' },
            { key: 'EUROPA LEAGUE', name: 'Europa League', type: 'International', category: 'European Secondary', icon: '🏆', defaultCol: 288, desc: 'UEFA Secondary Continental Trophy' },
            { key: 'COMMUNITY SHIELD', name: 'Community Shield', type: 'One-Off', category: 'Super Cup', icon: '🛡️', defaultCol: 264, desc: 'English Domestic Season Opener' },
            { key: 'SUPER CUP', name: 'UEFA Super Cup', type: 'One-Off', category: 'European Super Cup', icon: '🛡️', defaultCol: 312, desc: 'UEFA Continental Super Cup' },
            { key: 'BSM TROPHY', name: 'BSM Trophy', type: 'Domestic', category: 'Lower League Trophy', icon: '🏆', defaultCol: 252, desc: 'EFL Lower Division Trophy' },
            { key: 'CONFERENCE LEAGUE', name: 'Conference League', type: 'International', category: 'European Tertiary', icon: '🏆', defaultCol: 300, desc: 'UEFA Tertiary Club Championship' }
        ];
        const competitions = KNOWN_COMPETITIONS.map(comp => {
            let c = -1;
            for (let col = 0; col < compHeadersRow.length; col++) {
                const val = String(compHeadersRow[col] || '').trim().toUpperCase();
                if (val === comp.key) {
                    c = col;
                    break;
                }
            }
            if (c === -1)
                c = -100000; // not in the sheet: every lookup below reads blank, so its sheet stats show 0
            const sheetWins = compMilestonesRow[c] != null && !isNaN(Number(compMilestonesRow[c])) ? Number(compMilestonesRow[c]) : 0;
            const sheetFinals = compMilestonesRow[c + 1] != null && !isNaN(Number(compMilestonesRow[c + 1])) ? Number(compMilestonesRow[c + 1]) : 0;
            const sheetKOs = compMilestonesRow[c + 2] != null && !isNaN(Number(compMilestonesRow[c + 2])) ? Number(compMilestonesRow[c + 2]) : 0;
            const sheetApps = compMilestonesRow[c + 3] != null && !isNaN(Number(compMilestonesRow[c + 3])) ? Number(compMilestonesRow[c + 3]) : 0;
            const sheetFirstApp = compMilestonesRow[c + 4] != null ? compMilestonesRow[c + 4] : null;
            const sheetFirstWin = compMilestonesRow[c + 6] != null ? compMilestonesRow[c + 6] : null;
            const sheetBest = compMilestonesRow[c + 8] != null ? compMilestonesRow[c + 8] : null;
            const sheetWorst = compMilestonesRow[c + 10] != null ? compMilestonesRow[c + 10] : null;
            // In row 17 of Cups!HS:LX, stats start at c + 3 (GP=c+3, W=c+4, D=c+5, L=c+6, GF=c+7, GA=c+8, GD=c+9, P-W=c+10, P-L=c+11)
            const sheetAvgOppRank = compTotalsRow[c + 2] != null && !isNaN(Number(compTotalsRow[c + 2])) ? Number(compTotalsRow[c + 2]) : null;
            const sheetGP = compTotalsRow[c + 3] != null && !isNaN(Number(compTotalsRow[c + 3])) ? Number(compTotalsRow[c + 3]) : 0;
            const sheetW = compTotalsRow[c + 4] != null && !isNaN(Number(compTotalsRow[c + 4])) ? Number(compTotalsRow[c + 4]) : 0;
            const sheetD = compTotalsRow[c + 5] != null && !isNaN(Number(compTotalsRow[c + 5])) ? Number(compTotalsRow[c + 5]) : 0;
            const sheetL = compTotalsRow[c + 6] != null && !isNaN(Number(compTotalsRow[c + 6])) ? Number(compTotalsRow[c + 6]) : 0;
            const sheetGF = compTotalsRow[c + 7] != null && !isNaN(Number(compTotalsRow[c + 7])) ? Number(compTotalsRow[c + 7]) : 0;
            const sheetGA = compTotalsRow[c + 8] != null && !isNaN(Number(compTotalsRow[c + 8])) ? Number(compTotalsRow[c + 8]) : 0;
            const sheetGD = compTotalsRow[c + 9] != null && !isNaN(Number(compTotalsRow[c + 9])) ? Number(compTotalsRow[c + 9]) : (sheetGF - sheetGA);
            const sheetPenW = compTotalsRow[c + 10] != null && !isNaN(Number(compTotalsRow[c + 10])) ? Number(compTotalsRow[c + 10]) : 0;
            const sheetPenL = compTotalsRow[c + 11] != null && !isNaN(Number(compTotalsRow[c + 11])) ? Number(compTotalsRow[c + 11]) : 0;
            // Campaigns and matches associated with this tournament
            const compCampaigns = parsedData.campaigns.filter(c => c.competition.toUpperCase().includes(comp.key) || comp.key.includes(c.competition.toUpperCase()));
            const compFinals = parsedData.finals.filter(f => f.comp.toUpperCase().includes(comp.key) || comp.key.includes(f.comp.toUpperCase()));
            const compElims = parsedData.eliminations.filter(e => e.comp.toUpperCase().includes(comp.key) || comp.key.includes(e.comp.toUpperCase()));
            const dynWins = compCampaigns.filter(c => c.isWrexhamWon).length;
            const dynFinals = compFinals.length;
            const dynApps = compCampaigns.filter(c => c.played > 0).length;
            const dynGP = compCampaigns.reduce((sum, c) => sum + (c.played || 0), 0);
            const dynW = compCampaigns.reduce((sum, c) => sum + (c.trueW || 0), 0);
            const dynD = compCampaigns.reduce((sum, c) => sum + (c.trueD || 0), 0);
            const dynL = compCampaigns.reduce((sum, c) => sum + (c.trueL || 0), 0);
            const dynGF = compCampaigns.reduce((sum, c) => sum + (c.gf || 0), 0);
            const dynGA = compCampaigns.reduce((sum, c) => sum + (c.ga || 0), 0);
            const dynGD = dynGF - dynGA;
            const dynPenW = compCampaigns.reduce((sum, c) => sum + (c.penW || 0), 0);
            const dynPenL = compCampaigns.reduce((sum, c) => sum + (c.penL || 0), 0);
            const hasLiveCampaigns = dynGP > 0;
            const titles = dynWins > 0 ? dynWins : sheetWins;
            const finalsCount = dynFinals > 0 ? dynFinals : sheetFinals;
            const appearances = dynApps > 0 ? dynApps : sheetApps;
            const knockoutExits = sheetKOs || compElims.length;
            const played = hasLiveCampaigns ? dynGP : sheetGP;
            const won = hasLiveCampaigns ? dynW : sheetW;
            const drawn = hasLiveCampaigns ? dynD : sheetD;
            const lost = hasLiveCampaigns ? dynL : sheetL;
            const gf = hasLiveCampaigns ? dynGF : sheetGF;
            const ga = hasLiveCampaigns ? dynGA : sheetGA;
            const gd = hasLiveCampaigns ? dynGD : sheetGD;
            const penW = hasLiveCampaigns ? dynPenW : sheetPenW;
            const penL = hasLiveCampaigns ? dynPenL : sheetPenL;
            const winRate = played > 0 ? (won / played) * 100 : 0;
            const finalWinRate = finalsCount > 0 ? (titles / finalsCount) * 100 : 0;
            const titleConvRate = appearances > 0 ? (titles / appearances) * 100 : 0;
            const firstApp = sheetFirstApp != null && sheetFirstApp !== 'N/A' ? `Season ${sheetFirstApp}` : (compCampaigns[0] ? `Season ${compCampaigns[0].season}` : '—');
            const firstWin = sheetFirstWin != null && sheetFirstWin !== 'N/A' ? `Season ${sheetFirstWin}` : (compCampaigns.find(c => c.isWrexhamWon) ? `Season ${compCampaigns.find(c => c.isWrexhamWon).season}` : '—');
            const bestSeason = sheetBest != null && sheetBest !== 'N/A' ? `Season ${sheetBest}` : (titles > 0 ? 'Champions' : (finalsCount > 0 ? 'Finalist' : '—'));
            const worstSeason = sheetWorst != null && sheetWorst !== 'N/A' ? `Season ${sheetWorst}` : (compElims[0] ? `Season ${compElims[0].season} (${compElims[0].round})` : '—');
            const avgOppRank = sheetAvgOppRank != null ? sheetAvgOppRank : (compCampaigns.length > 0 && compCampaigns[0].avgOppRank != null ? compCampaigns[0].avgOppRank : null);
            const meta = CUP_METADATA[comp.key] || { color: 'bg-slate-700', text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' };
            const trajectory = parsedData.seasonsList.map(s => {
                const c = compCampaigns.find(x => x.season === s);
                if (!c || c.played === 0) {
                    return { season: s, played: false, status: '—', isWon: false };
                }
                return {
                    season: s,
                    year: c.year,
                    played: true,
                    result: c.result || (c.isWrexhamWon ? 'CHAMPIONS' : 'FINAL'),
                    isWon: c.isWrexhamWon,
                    winner: c.winner,
                    score: `${c.gf}–${c.ga}`,
                    record: `${c.trueW}W ${c.trueD}D ${c.trueL}L`,
                    campaign: c
                };
            });
            return {
                ...comp,
                ...meta,
                titles,
                finalsCount,
                appearances,
                knockoutExits,
                played,
                won,
                drawn,
                lost,
                gf,
                ga,
                gd,
                penW,
                penL,
                winRate,
                finalWinRate,
                titleConvRate,
                firstApp,
                firstWin,
                bestSeason,
                worstSeason,
                avgOppRank,
                campaigns: compCampaigns,
                finals: compFinals,
                eliminations: compElims,
                trajectory
            };
        });
        const domComps = competitions.filter(c => c.type === 'Domestic');
        const intlComps = competitions.filter(c => c.type === 'International');
        const superComps = competitions.filter(c => c.type === 'One-Off');
        const categorySummaries = {
            domestic: {
                title: 'Domestic Major & League',
                trophies: domComps.reduce((sum, c) => sum + c.titles, 0),
                played: domComps.reduce((sum, c) => sum + c.played, 0),
                won: domComps.reduce((sum, c) => sum + c.won, 0),
                drawn: domComps.reduce((sum, c) => sum + c.drawn, 0),
                lost: domComps.reduce((sum, c) => sum + c.lost, 0),
                gf: domComps.reduce((sum, c) => sum + c.gf, 0),
                ga: domComps.reduce((sum, c) => sum + c.ga, 0),
                gd: domComps.reduce((sum, c) => sum + c.gd, 0),
                penW: domComps.reduce((sum, c) => sum + c.penW, 0),
                penL: domComps.reduce((sum, c) => sum + c.penL, 0)
            },
            international: {
                title: 'European & Continental',
                trophies: intlComps.reduce((sum, c) => sum + c.titles, 0),
                played: intlComps.reduce((sum, c) => sum + c.played, 0),
                won: intlComps.reduce((sum, c) => sum + c.won, 0),
                drawn: intlComps.reduce((sum, c) => sum + c.drawn, 0),
                lost: intlComps.reduce((sum, c) => sum + c.lost, 0),
                gf: intlComps.reduce((sum, c) => sum + c.gf, 0),
                ga: intlComps.reduce((sum, c) => sum + c.ga, 0),
                gd: intlComps.reduce((sum, c) => sum + c.gd, 0),
                penW: intlComps.reduce((sum, c) => sum + c.penW, 0),
                penL: intlComps.reduce((sum, c) => sum + c.penL, 0)
            },
            superCups: {
                title: 'Super Cups / One-Offs',
                trophies: superComps.reduce((sum, c) => sum + c.titles, 0),
                played: superComps.reduce((sum, c) => sum + c.played, 0),
                won: superComps.reduce((sum, c) => sum + c.won, 0),
                drawn: superComps.reduce((sum, c) => sum + c.drawn, 0),
                lost: superComps.reduce((sum, c) => sum + c.lost, 0),
                gf: superComps.reduce((sum, c) => sum + c.gf, 0),
                ga: superComps.reduce((sum, c) => sum + c.ga, 0),
                gd: superComps.reduce((sum, c) => sum + c.gd, 0),
                penW: superComps.reduce((sum, c) => sum + c.penW, 0),
                penL: superComps.reduce((sum, c) => sum + c.penL, 0)
            }
        };
        return {
            competitions,
            categorySummaries
        };
    }, [data, parsedData]);
    const { grandTotals, campaigns, finals, eliminations, clubsH2H, leaguesBreakdown, trophyCounts, seasonsList } = parsedData;

    // ─── Form & Margins (Cups v5) ────────────────────────────────────
    const formData = useMemo(() => buildFormData(campaigns), [campaigns]);
    // Jump to a club in the Rivalries tab (used by the Lab's Rematch Grid)
    const openRivalry = (name) => {
        const club = (clubsH2H || []).find(c => c.name === name);
        setH2hSearch(name);
        if (club) setExpandedClubCode(club.code);
        setActiveTab('rivalries');
    };
    // Path difficulty: split campaigns into quarters by average opponent rank
    // (lower = tougher opponents). Colours the rank on each campaign card.
    const oppRankTier = useMemo(() => {
        const vals = campaigns.map(c => c.avgOppRank).filter(v => v != null && !isNaN(v)).sort((a, b) => a - b);
        const q = (p) => (vals.length ? vals[Math.min(vals.length - 1, Math.floor(p * (vals.length - 1)))] : null);
        const q1 = q(0.25), q2 = q(0.5), q3 = q(0.75);
        return (v) => {
            if (v == null || isNaN(v) || !vals.length) return null;
            if (v <= q1) return { label: 'Toughest quarter of all paths', cls: 'bg-rose-50 text-rose-800 border-rose-300' };
            if (v <= q2) return { label: 'Tougher than average path', cls: 'bg-orange-50 text-orange-800 border-orange-300' };
            if (v <= q3) return { label: 'Easier than average path', cls: 'bg-yellow-50 text-yellow-800 border-yellow-300' };
            return { label: 'Easiest quarter of all paths', cls: 'bg-slate-50 text-slate-600 border-slate-300' };
        };
    }, [campaigns]);
    const formTotals = useMemo(() => {
        const ms = formData.matches;
        const c = countTiers(ms);
        const gf = ms.reduce((a, m) => a + m.gf, 0);
        const ga = ms.reduce((a, m) => a + m.ga, 0);
        const penW = ms.filter(m => m.result === 'W' && m.pens).length;
        const penL = ms.filter(m => m.result === 'L' && m.pens).length;
        const multiGoalWins = c.w4 + c.w3 + c.w2;
        const tieW = formData.ties.filter(t => t.isWin).length;
        const shootW = formData.shootouts.filter(s => s.isWin).length;
        return {
            played: ms.length, w: c.win, d: c.draw, l: c.loss, penW, penL,
            regW: c.win - penW, regL: c.loss - penL, gf, ga, counts: c, multiGoalWins,
            ties: formData.ties.length, tieW, tieL: formData.ties.length - tieW,
            comebacks: formData.ties.filter(t => t.tags.includes('comeback')).length,
            shoots: formData.shootouts.length, shootW, shootL: formData.shootouts.length - shootW,
        };
    }, [formData]);
    // Margin Distribution: season x match type (every entry is one match)
    const FORM_TYPES = [
        { value: 'all', label: 'All' },
        { value: 'group', label: 'Group Stage' },
        { value: 'one', label: 'One-Leg Ties' },
        { value: 'two', label: 'Two-Leg Ties (each leg)' },
    ];
    const formTypeOnly = useMemo(() => (formType === 'all' ? formData.matches : formData.matches.filter(m => m.type === formType)), [formData, formType]);
    const formTypeMatches = useMemo(() => (formComp === 'all' ? formTypeOnly : formTypeOnly.filter(m => m.competition === formComp)), [formTypeOnly, formComp]);
    // Competition dropdown: every cup with matches, counted under the match-type filter
    const formCompOptions = useMemo(() => {
        const all = Array.from(new Set(formData.matches.map(m => m.competition)));
        return all.map(c => ({ value: c, label: compName(c), n: formTypeOnly.filter(m => m.competition === c).length }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [formData, formTypeOnly]);
    const formSeasonRows = useMemo(() => seasonsList.map(sNum => {
        const list = formTypeMatches.filter(m => m.season === sNum);
        const camp = campaigns.find(c => c.season === sNum);
        return { season: sNum, year: camp ? camp.year : '', counts: countTiers(list) };
    }), [seasonsList, formTypeMatches, campaigns]);
    const formVisibleRows = formSeasonRows.filter(r => (formSeason === 'all' || String(r.season) === String(formSeason)) && r.counts.total > 0);
    const formTypeTotals = useMemo(() => countTiers(formTypeMatches), [formTypeMatches]);
    const formTypeLabel = (FORM_TYPES.find(t => t.value === formType) || FORM_TYPES[0]).label;
    // Two-leg ties (season + competition, then a tag)
    const tiesInComp = useMemo(() => formData.ties.filter(t => tieComp === 'all' || t.competition === tieComp), [formData, tieComp]);
    const tieSeasonOptions = useMemo(() => seasonsList.filter(s => formData.ties.some(t => t.season === s)), [seasonsList, formData]);
    const tieCompOptions = useMemo(() => Array.from(new Set(formData.ties.map(t => t.competition)))
        .map(c => ({ value: c, label: compName(c), n: formData.ties.filter(t => t.competition === c && (tieSeason === 'all' || String(t.season) === String(tieSeason))).length }))
        .sort((a, b) => a.label.localeCompare(b.label)), [formData, tieSeason]);
    const tiesInSeason = useMemo(() => tiesInComp.filter(t => tieSeason === 'all' || String(t.season) === String(tieSeason)), [tiesInComp, tieSeason]);
    const tieTagCounts = useMemo(() => {
        const c = {};
        TIE_TAGS.forEach(g => { c[g.key] = 0; });
        tiesInSeason.forEach(t => t.tags.forEach(k => { c[k] = (c[k] || 0) + 1; }));
        return c;
    }, [tiesInSeason]);
    const tiesShown = useMemo(() => tiesInSeason.filter(t => tieTagFilter === 'all' || t.tags.includes(tieTagFilter)), [tiesInSeason, tieTagFilter]);
    const tieAggCounts = useMemo(() => countTiers(tiesShown), [tiesShown]);
    // Shootouts
    const shootStats = useMemo(() => {
        const list = formData.shootouts;
        const w = list.filter(s => s.isWin).length;
        const kicksFor = list.reduce((a, s) => a + s.penFor, 0);
        const kicksAgainst = list.reduce((a, s) => a + s.penAgainst, 0);
        const sudden = list.filter(s => Math.max(s.penFor, s.penAgainst) > 5);
        const ranked = list.filter(s => s.isEsl && s.eslRank != null);
        const avgRank = ranked.length ? ranked.reduce((a, s) => a + s.eslRank, 0) / ranked.length : null;
        const roundOrder = (key) => { const i = KNOCKOUT_ROUNDS.findIndex(r => r.key === key); return i === -1 ? 99 : i; };
        const group = (keyFn, labelFn, sortFn) => {
            const map = new Map();
            list.forEach(s => {
                const k = keyFn(s);
                if (!map.has(k)) map.set(k, { key: k, label: labelFn(s), w: 0, l: 0, sample: s });
                const g = map.get(k);
                if (s.isWin) g.w += 1; else g.l += 1;
            });
            return Array.from(map.values()).sort(sortFn);
        };
        const byCount = (a, b) => (b.w + b.l) - (a.w + a.l) || b.w - a.w;
        return {
            played: list.length, w, l: list.length - w, kicksFor, kicksAgainst,
            sudden: sudden.length, suddenW: sudden.filter(s => s.isWin).length, avgRank, rankedCount: ranked.length,
            splits: {
                comp: group(s => s.competition, s => compName(s.competition), byCount),
                round: group(s => s.roundKey, s => s.stage, (a, b) => roundOrder(a.sample.roundKey) - roundOrder(b.sample.roundKey)),
                season: group(s => s.season, s => `Season ${s.season}`, (a, b) => a.sample.season - b.sample.season),
                score: group(s => s.gf, s => `Level at ${s.gf}-${s.ga}`, (a, b) => a.sample.gf - b.sample.gf),
            },
        };
    }, [formData]);
    const totalCupsWon = useMemo(() => {
        return Object.values(trophyCounts).reduce((acc, v) => acc + v, 0);
    }, [trophyCounts]);
    // Dynamically computed finals foes distribution (ESL finals only)
    const dynamicFinalsFoes = useMemo(() => {
        const foesMap = {};
        finals.forEach(f => {
            if (!f.opponent || !f.isEsl)
                return;
            if (!foesMap[f.opponent]) {
                foesMap[f.opponent] = { name: f.opponent, flag: f.flag, p: 0, w: 0, l: 0 };
            }
            foesMap[f.opponent].p += 1;
            if (f.isWon)
                foesMap[f.opponent].w += 1;
            else
                foesMap[f.opponent].l += 1;
        });
        return Object.values(foesMap).sort((a, b) => b.p - a.p || b.w - a.w).slice(0, 6);
    }, [finals]);
    // Dynamically computed elimination stage breakdown
    const dynamicEliminationStages = useMemo(() => {
        const stagesMap = {};
        eliminations.forEach(e => {
            const stage = e.round || 'Knockout';
            stagesMap[stage] = (stagesMap[stage] || 0) + 1;
        });
        return Object.entries(stagesMap).map(([round, count]) => ({ round, count }));
    }, [eliminations]);
    // Filtered Campaigns
    const filteredCampaigns = useMemo(() => {
        return campaigns.filter(c => {
            if (selectedSeason !== 'ALL' && c.season !== Number(selectedSeason))
                return false;
            if (selectedCompetition !== 'ALL' && c.competition !== selectedCompetition)
                return false;
            if (statusFilter === 'CHAMPIONS' && !c.isWrexhamWon)
                return false;
            if (statusFilter === 'FINAL' && (c.isWrexhamWon || c.result !== 'FINAL'))
                return false;
            if (statusFilter === 'ELIMINATED' && (c.isWrexhamWon || c.result === 'FINAL'))
                return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matchComp = c.competition.toLowerCase().includes(q);
                const matchYear = c.year.toLowerCase().includes(q);
                const matchWinner = c.winner.toLowerCase().includes(q);
                const matchRounds = c.rounds.some(r => r.opponent?.toLowerCase().includes(q));
                if (!matchComp && !matchYear && !matchWinner && !matchRounds)
                    return false;
            }
            return true;
        });
    }, [campaigns, selectedSeason, selectedCompetition, statusFilter, searchQuery]);
    // Group Filtered Campaigns by Season for subheaders
    const campaignsBySeason = useMemo(() => {
        const map = new Map();
        filteredCampaigns.forEach(camp => {
            if (!map.has(camp.season)) {
                map.set(camp.season, {
                    season: camp.season,
                    year: camp.year,
                    campaigns: []
                });
            }
            map.get(camp.season).campaigns.push(camp);
        });
        return Array.from(map.values()).sort((a, b) => a.season - b.season);
    }, [filteredCampaigns]);
    // Selected Campaign Details (for editing modal)
    const activeCampaign = useMemo(() => {
        if (selectedCampaignIndex != null) {
            return campaigns.find(c => c.rowIndex === selectedCampaignIndex) || null;
        }
        return null;
    }, [selectedCampaignIndex, campaigns]);
    // MUTATION HANDLERS (Bi-directional Sync)
    const handleSaveCampaign = (updatedCampaign) => {
        if (!updateItem || !updatedCampaign)
            return;
        const targetRow = data.find(d => d.index_ === updatedCampaign.rowIndex)?.row;
        if (!targetRow)
            return;
        const newRow = [...targetRow];
        newRow[3] = updatedCampaign.competition;
        newRow[4] = updatedCampaign.isWrexhamWon ? '🏆' : null;
        newRow[5] = updatedCampaign.winner;
        newRow[8] = updatedCampaign.played;
        newRow[11] = updatedCampaign.trueW;
        newRow[13] = updatedCampaign.trueD;
        newRow[15] = updatedCampaign.trueL;
        newRow[16] = updatedCampaign.gf;
        newRow[17] = updatedCampaign.ga;
        newRow[18] = updatedCampaign.gf - updatedCampaign.ga;
        newRow[29] = updatedCampaign.result;
        updateItem(updatedCampaign.rowIndex, newRow);
        setEditingCampaign(null);
    };
    const handleSaveMatch = (campaignRowIndex, matchData) => {
        if (!updateItem)
            return;
        const targetRow = data.find(d => d.index_ === campaignRowIndex)?.row;
        if (!targetRow)
            return;
        if (matchData.isGroupStage) {
            const startCol = matchData.startCol ?? matchData.colIdx ?? 142;
            const statusCol = matchData.statusCol ?? startCol;
            const newRow = [...targetRow];
            newRow[statusCol] = matchData.status;
            newRow[statusCol + 1] = matchData.flag;
            newRow[statusCol + 2] = matchData.opponent;
            updateItem(campaignRowIndex, newRow);
            const subrow1Item = data.find(d => d.index_ === campaignRowIndex + 1);
            if (subrow1Item && subrow1Item.row) {
                const newSubrow1 = [...subrow1Item.row];
                if (matchData.homeAway)
                    newSubrow1[startCol + 1] = matchData.homeAway;
                if (matchData.gf != null)
                    newSubrow1[startCol + 2] = matchData.gf;
                newSubrow1[startCol + 3] = '–';
                if (matchData.ga != null)
                    newSubrow1[startCol + 4] = matchData.ga;
                updateItem(campaignRowIndex + 1, newSubrow1);
            }
        }
        else {
            const newRow = [...targetRow];
            const c = matchData.col;
            newRow[c] = matchData.status;
            newRow[c + 1] = matchData.flag;
            newRow[c + 2] = matchData.opponent;
            newRow[c + 8] = matchData.gf;
            newRow[c + 10] = matchData.ga;
            updateItem(campaignRowIndex, newRow);
            if (matchData.isTwoLegs && matchData.d1 != null && matchData.d2 != null) {
                const subrow1Item = data.find(d => d.index_ === campaignRowIndex + 1);
                if (subrow1Item && subrow1Item.row) {
                    const newSubrow1 = [...subrow1Item.row];
                    if (matchData.l1_w != null)
                        newSubrow1[matchData.d1 - 1] = matchData.l1_w;
                    if (matchData.l1_o != null)
                        newSubrow1[matchData.d1 + 1] = matchData.l1_o;
                    if (matchData.l2_w != null)
                        newSubrow1[matchData.d2 - 1] = matchData.l2_w;
                    if (matchData.l2_o != null)
                        newSubrow1[matchData.d2 + 1] = matchData.l2_o;
                    updateItem(campaignRowIndex + 1, newSubrow1);
                }
            }
        }
        setEditingMatch(null);
    };
    const handleDeleteCampaign = (rowIndex) => {
        if (!deleteItem)
            return;
        deleteItem(rowIndex);
        setDeleteConfirmIndex(null);
        if (selectedCampaignIndex === rowIndex) {
            setSelectedCampaignIndex(null);
        }
    };
    const handleCreateCampaign = (newCamp) => {
        if (!insertItem)
            return;
        const newRow = Array(200).fill(null);
        newRow[0] = 5.0;
        newRow[1] = newCamp.year;
        newRow[2] = Number(newCamp.season);
        newRow[3] = newCamp.competition;
        newRow[4] = newCamp.isWrexhamWon ? '🏆' : null;
        newRow[5] = newCamp.winner || (newCamp.isWrexhamWon ? 'WREXHAM ✦' : '');
        newRow[8] = Number(newCamp.played) || 0;
        newRow[11] = Number(newCamp.trueW) || 0;
        newRow[13] = Number(newCamp.trueD) || 0;
        newRow[15] = Number(newCamp.trueL) || 0;
        newRow[16] = Number(newCamp.gf) || 0;
        newRow[17] = Number(newCamp.ga) || 0;
        newRow[18] = (Number(newCamp.gf) || 0) - (Number(newCamp.ga) || 0);
        newRow[25] = 'RO - 64';
        newRow[29] = newCamp.result || 'SCHEDULED';
        insertItem(undefined, newRow);
        setIsAddingCampaign(false);
    };
    // Finals record, goals and clean sheets (calculated from the finals list)
    const finalsStats = useMemo(() => ({
        won: finals.filter(f => f.isWon).length,
        lost: finals.filter(f => !f.isWon).length,
        gf: finals.reduce((a, f) => a + (Number(f.gf) || 0), 0),
        ga: finals.reduce((a, f) => a + (Number(f.ga) || 0), 0),
        cleanSheets: finals.filter(f => Number(f.ga) === 0).length,
        failedToScore: finals.filter(f => Number(f.gf) === 0).length,
    }), [finals]);
    // Finals tab: the competition switch filters stats, foes and archive
    const finalsCompOptions = useMemo(() => {
        const counts = {};
        finals.forEach(f => { const k = String(f.comp).toUpperCase(); counts[k] = (counts[k] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ value: k, label: compName(k), badge: n }));
    }, [finals]);
    const finalsView = useMemo(() => (finalsCompFilter === 'ALL' ? finals : finals.filter(f => String(f.comp).toUpperCase() === finalsCompFilter)), [finals, finalsCompFilter]);
    const finalsViewStats = useMemo(() => {
        const won = finalsView.filter(f => f.isWon).length;
        const gf = finalsView.reduce((a, f) => a + (Number(f.gf) || 0), 0);
        const ga = finalsView.reduce((a, f) => a + (Number(f.ga) || 0), 0);
        const foesMap = {};
        finalsView.forEach(f => {
            if (!f.opponent || !f.isEsl) return;
            if (!foesMap[f.opponent]) foesMap[f.opponent] = { name: f.opponent, flag: f.flag, p: 0, w: 0, l: 0 };
            foesMap[f.opponent].p += 1;
            if (f.isWon) foesMap[f.opponent].w += 1; else foesMap[f.opponent].l += 1;
        });
        return {
            played: finalsView.length, won, lost: finalsView.length - won,
            winPct: finalsView.length ? ((won / finalsView.length) * 100).toFixed(1) : '0.0',
            gf, ga, gd: gf - ga,
            cleanSheets: finalsView.filter(f => Number(f.ga) === 0).length,
            failedToScore: finalsView.filter(f => Number(f.gf) === 0).length,
            foes: Object.values(foesMap).sort((a, b) => b.p - a.p || b.w - a.w).slice(0, 6),
        };
    }, [finalsView]);
    // Seasons with at least one match played (placeholder seasons don't count)
    const playedSeasons = useMemo(() => seasonsList.filter(sn => campaigns.some(c => c.season === sn && getCompProgress(c).label !== 'Scheduled')), [seasonsList, campaigns]);
    // Seasons where every cup entered was won (5 or more trophies)
    const gridQuintupleSeasons = useMemo(() => seasonsList.filter(sn => campaigns.filter(c => c.season === sn && c.isWrexhamWon).length >= 5), [seasonsList, campaigns]);
    // Headline numbers for the highlights strip (all from the sheet or the parsed data)
    const cupsHighlights = useMemo(() => {
        const decided = campaigns.filter(c => getCompProgress(c).label !== 'Scheduled').length;
        const pens = (grandTotals.penW || 0) + (grandTotals.penL || 0);
        return {
            trophies: totalCupsWon,
            decided,
            trophyRate: decided > 0 ? Math.round((totalCupsWon / decided) * 100) : 0,
            uclTitles: trophyCounts['CHAMPIONS LEAGUE'] || 0,
            winRate: grandTotals.played > 0 ? (grandTotals.trueW / grandTotals.played) * 100 : 0,
            goalsPerMatch: grandTotals.played > 0 ? grandTotals.gf / grandTotals.played : 0,
            pens,
            penRate: pens > 0 ? Math.round((grandTotals.penW / pens) * 100) : 0,
        };
    }, [campaigns, grandTotals, totalCupsWon, trophyCounts]);
    const finalsWinPercent = useMemo(() => {
        if (!finals.length)
            return '0.0';
        const wonCount = finals.filter(f => f.isWon).length;
        return ((wonCount / finals.length) * 100).toFixed(1);
    }, [finals]);
    return (<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Header + tabs (shared with League, in Cups gold) */}
      <PageHeader accent="amber" icon={Trophy} title="Cup Performance" tabs={TABS_SHOWN} activeTab={activeTab} onTabChange={setActiveTab}/>
      {/* 3. MAIN CONTENT BODY */}
      <main className={`flex-1 ${PAGE_WIDTH} w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6`}>
        {parsedData.dataWarnings && parsedData.dataWarnings.length > 0 && (<div className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs space-y-1">
            <div className="font-bold">Some Cups data couldn't be read:</div>
            {parsedData.dataWarnings.map((w, i) => (<div key={i}>• {w}</div>))}
          </div>)}
        {/* VIEW 1: CAMPAIGNS & BRACKETS */}
        {activeTab === 'campaigns' && (<div className="space-y-6">
            {/* Highlights (same build as League's) */}
            <HighlightsBar accent="amber">
              {/* Record first on every screen; full width on phones (v50.01) */}
              <HighlightCard phoneWide label={<>Record <RecordKey /></>} icon={Activity} iconClassName="text-emerald-400" value={`${grandTotals.trueW}W - ${grandTotals.trueD}D - ${grandTotals.trueL}L`} valueClassName="text-lg sm:text-xl font-black text-white tracking-tight whitespace-nowrap" left={`${cupsHighlights.winRate.toFixed(1)}% Win Rate`} leftClassName="text-emerald-300 font-bold" right={`${grandTotals.played} GP`} rightClassName="text-slate-300 font-normal"/>
              <HighlightCard label="Trophies" icon={Trophy} iconClassName="text-amber-400" value={`${cupsHighlights.trophies} / ${cupsHighlights.decided}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight" left={`${cupsHighlights.trophyRate}% of Campaigns`} right={`${cupsHighlights.uclTitles}x UCL`} rightClassName="text-amber-300 font-bold"/>
              <HighlightCard label="Finals" icon={Medal} iconClassName="text-sky-400" value={`${finalsStats.won} - ${finalsStats.lost}`} valueClassName="text-2xl sm:text-3xl font-black text-sky-300 tracking-tight" left={`${finalsWinPercent}% Won`} right={`${finals.length} Finals`} rightClassName="text-sky-200 font-bold"/>
              <HighlightCard label="Goals" icon={Target} iconClassName="text-indigo-400" value={`${formatGoals(grandTotals.gf)} - ${formatGoals(grandTotals.ga)}`} valueClassName="text-2xl sm:text-3xl font-black text-white tracking-tight" left={`${grandTotals.gd >= 0 ? '+' : ''}${formatGoals(grandTotals.gd)} GD`} leftClassName="text-indigo-300 font-bold" right={`${cupsHighlights.goalsPerMatch.toFixed(2)} G/M`} rightClassName="text-slate-300 font-normal"/>
              <HighlightCard label="Shootouts" icon={Shield} iconClassName="text-teal-400" value={`${grandTotals.penW} - ${grandTotals.penL}`} valueClassName="text-2xl sm:text-3xl font-black text-teal-300 tracking-tight" left={`${cupsHighlights.penRate}% Won`} leftClassName="text-teal-300 font-bold" right={`${cupsHighlights.pens} Shootouts`} rightClassName="text-slate-300 font-normal"/>
            </HighlightsBar>

            {/* Filter Bar (shared controls, same as League) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="space-y-1.5">
                <ControlLabel accent="amber">Season</ControlLabel>
                <FilterPills accent="amber" value={selectedSeason} onChange={setSelectedSeason} options={[
                  { value: 'ALL', label: 'All Seasons' },
                  ...seasonsList.map(sn => ({ value: String(sn), label: `S${sn}` })),
                ]}/>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select value={selectedCompetition} onChange={e => setSelectedCompetition(e.target.value)} className={SELECT_CLASS}>
                    <option value="ALL">All Cups</option>
                    {Object.keys(CUP_METADATA).map(comp => (<option key={comp} value={comp}>{comp}</option>))}
                  </select>
                  <Segmented value={statusFilter} onChange={setStatusFilter} options={[
                    { value: 'ALL', label: 'All' },
                    { value: 'CHAMPIONS', label: 'Champions', tone: 'gold' },
                    { value: 'FINAL', label: 'Finalists', tone: 'silver' },
                    { value: 'ELIMINATED', label: 'Exits', tone: 'loss' },
                  ]}/>
                </div>
                <div className="flex items-center gap-2">
                  <SearchInput accent="amber" className="min-w-[220px] flex-1" value={searchQuery} onChange={setSearchQuery} placeholder="Search club, year, opponent..."/>
                  <ResetButton disabled={selectedSeason === 'ALL' && selectedCompetition === 'ALL' && statusFilter === 'ALL' && !searchQuery} onClick={() => {
                    setSelectedSeason('ALL');
                    setSelectedCompetition('ALL');
                    setStatusFilter('ALL');
                    setSearchQuery('');
                  }}/>
                </div>
              </div>
            </div>
            {/* Grouped by Season with Subheaders & In-Place Accordion Sections */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Showing {filteredCampaigns.length} Cup Runs across {campaignsBySeason.length} Season{campaignsBySeason.length !== 1 ? 's' : ''}:
                </span>
                <span className="text-xs text-slate-500">
                  Click any competition to expand its games & stats directly underneath
                </span>
              </div>
              {campaignsBySeason.length === 0 ? (<div className="py-12 text-center bg-white rounded-2xl border border-slate-200">
                  <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2"/>
                  <p className="text-sm font-bold text-slate-800">No cup campaigns match the current filters</p>
                  <p className="text-xs text-slate-500 mt-1">Try selecting "All Seasons" or "All Cups".</p>
                </div>) : (campaignsBySeason.map((grp) => {
                const trophiesInGroup = grp.campaigns.filter(c => c.isWrexhamWon).length;
                return (<div key={grp.season} className="space-y-3">
                      {/* 1. SEASON SUBHEADER */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 pt-1">
                        <div className="flex items-center space-x-2.5">
                          <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-bold tabular-nums text-xs shadow-2xs">
                            Season {grp.season}
                          </span>
                          <span className="text-xs font-semibold tabular-nums text-slate-600">
                            {grp.year}
                          </span>
                          {trophiesInGroup > 0 && (<span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <span className="tabular-nums">{trophiesInGroup}</span>
                              <span>🏆</span>
                              <span className="hidden sm:inline">Won</span>
                            </span>)}
                        </div>
                        <span className="text-[11px] font-medium tabular-nums text-slate-500">
                          {grp.campaigns.length} Competition{grp.campaigns.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {/* 2. COMPETITIONS GRID WITH IN-PLACE EXPAND (H2H-STYLE) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {grp.campaigns.map((camp, campIdx) => {
                        const isExpanded = selectedCampaignIndex === camp.rowIndex;
                        const prog = getCompProgress(camp);
                        const tone = campaignTone(camp);
                        const openIdx = grp.campaigns.findIndex(c => c.rowIndex === selectedCampaignIndex);
                        const drawerHere = campIdx === drawerRowEnd(openIdx, campaignCols, grp.campaigns.length);
                        return (<React.Fragment key={camp.rowIndex}>
                              {/* Competition Card */}
                              <div onClick={() => setSelectedCampaignIndex(isExpanded ? null : camp.rowIndex)} className={`relative p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-3 group ${isExpanded
                                ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'}`}>
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-amber-700 transition-colors" title={camp.competition}>
                                      {camp.competition}
                                    </h3>
                                    {camp.avgOppRank != null && oppRankTier(camp.avgOppRank) && (<span className={`ml-auto shrink-0 text-[11px] font-black tabular-nums px-1.5 py-0.5 rounded border ${oppRankTier(camp.avgOppRank).cls}`} {...hv({ title: `Average opponent rank ${camp.avgOppRank.toFixed(1)}: ${oppRankTier(camp.avgOppRank).label}` })}>
                                        Opp {camp.avgOppRank.toFixed(1)}
                                      </span>)}
                                    <ChevronDown className={`w-3.5 h-3.5 mt-0.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-amber-600' : ''}`}/>
                                  </div>
                                  <div className="flex items-center justify-between gap-2 mt-1">
                                    <span className="text-[11px] font-semibold tabular-nums text-slate-500 whitespace-nowrap">
                                      S{camp.season} • {camp.year}
                                    </span>
                                    <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${tone.pill}`}>
                                      {tone.icon}{tone.label}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex" {...hv({ title: `${prog.label} (${prog.pct}%)` })}>
                                  <div style={{ width: `${prog.pct}%` }} className={`h-full rounded-full transition-all ${tone.bar}`}/>
                                </div>
                                {/* Card Footer Stats */}
                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                                  <div className="flex items-center space-x-1 whitespace-nowrap text-slate-600 shrink-0 tabular-nums text-xs">
                                    <span className="font-bold text-slate-900 whitespace-nowrap">{camp.played}&nbsp;<span className="text-[11px] font-semibold text-slate-500">MP</span></span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-emerald-700 font-bold whitespace-nowrap">{camp.trueW}<span className="text-[11px] font-semibold">W</span></span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 font-medium whitespace-nowrap">{camp.trueD}<span className="text-[11px] font-semibold">D</span></span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-rose-600 font-bold whitespace-nowrap">{camp.trueL}<span className="text-[11px] font-semibold">L</span></span>
                                  </div>
                                  <div className="tabular-nums text-[11px] font-bold text-slate-600 whitespace-nowrap shrink-0 text-right">
                                    {formatGoals(camp.gf)}–{formatGoals(camp.ga)} <span className="text-[11px] text-slate-500 font-medium">({camp.gd > 0 ? `+${formatGoals(camp.gd)}` : formatGoals(camp.gd)})</span>
                                  </div>
                                </div>
                              </div>
                              {/* 3. IN-PLACE ACCORDION SECTION (H2H STYLE, OPENS DIRECTLY UNDERNEATH) */}
                              {drawerHere && ((camp) => (<div className="col-span-full bg-white rounded-2xl border border-amber-400/90 shadow-md overflow-hidden my-1 animate-in fade-in duration-150">
                                  {/* Banner Header */}
                                  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-5 space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="min-w-0">
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 tabular-nums">
                                          Season {camp.season} • {camp.year}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 flex-wrap mt-0.5">
                                          <span>{camp.competition}</span>
                                          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${campaignTone(camp).dark}`}>
                                            {campaignTone(camp).icon}{campaignTone(camp).label}
                                          </span>
                                        </h2>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        {ENABLE_EDITING && (<button onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCampaign(camp);
                                }} className="p-2 bg-white/15 hover:bg-white/25 rounded-lg text-white transition-colors cursor-pointer" title="Edit campaign data">
                                          <Edit3 className="w-3.5 h-3.5"/>
                                        </button>)}
                                        {ENABLE_EDITING && (<button onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmIndex(camp.rowIndex);
                                }} className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg transition-colors cursor-pointer" title="Delete campaign">
                                          <Trash2 className="w-3.5 h-3.5"/>
                                        </button>)}
                                        <button onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCampaignIndex(null);
                                }} className="p-2 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer" title="Collapse details">
                                          <X className="w-3.5 h-3.5"/>
                                        </button>
                                      </div>
                                    </div>
                                    {/* One row of stats across the full width */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                      {[
                                    { label: 'Record', value: `${camp.trueW}W - ${camp.trueD}D - ${camp.trueL}L`, cls: 'text-white' },
                                    { label: 'Goals', value: `${formatGoals(camp.gf)} : ${formatGoals(camp.ga)}`, cls: 'text-amber-300' },
                                    { label: 'Goal Diff', value: `${camp.gd > 0 ? '+' : ''}${formatGoals(camp.gd)}`, cls: camp.gd >= 0 ? 'text-emerald-300' : 'text-rose-300' },
                                    { label: 'Entered', value: prettyStage(camp.roundEntered) || '–', cls: 'text-white' },
                                    { label: 'My rank • Opp rank • RSI', value: `${camp.myRank != null ? camp.myRank : '–'} • ${camp.avgOppRank != null ? camp.avgOppRank.toFixed(1) : '–'} • ${camp.rsi != null ? (camp.rsi > 0 ? '+' : '') + Number(camp.rsi.toFixed(1)) : '–'}`, cls: 'text-white' },
                                    { label: 'Winner', value: camp.winner || '–', cls: camp.isWrexhamWon ? 'text-amber-300' : 'text-white' },
                                ].map(cell => (<div key={cell.label} className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 min-w-0">
                                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{cell.label}</div>
                                          <div className={`text-sm font-black tabular-nums mt-0.5 truncate ${cell.cls}`} title={String(cell.value)}>{cell.value}</div>
                                        </div>))}
                                    </div>
                                  </div>
                                  {/* 4. GROUP STAGE STATS AND GAMES (IF PRESENT) */}
                                  {camp.groupStage && (<div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
                                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                        <div className="flex items-center space-x-2">
                                          <Globe className="w-4 h-4 text-blue-600"/>
                                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                            Group Stage Standings & Matchdays
                                          </h4>
                                        </div>
                                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 flex-wrap">
                                          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                                            Finished: <strong className="text-slate-900 tabular-nums">{camp.groupStage.position}</strong>
                                          </span>
                                          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs tabular-nums">
                                            {camp.groupStage.points} PTS ({camp.groupStage.w}W {camp.groupStage.d}D {camp.groupStage.l}L)
                                          </span>
                                          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs tabular-nums">
                                            {camp.groupStage.gf} GF - {camp.groupStage.ga} GA ({camp.groupStage.gd > 0 ? `+${camp.groupStage.gd}` : camp.groupStage.gd} GD)
                                          </span>
                                        </div>
                                      </div>
                                      {/* Group Stage Matchday Fixtures */}
                                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                                        {camp.groupStage.matchdays.map((md, mdIdx) => {
                                        const isWin = md.isWin;
                                        const isDraw = md.isDraw;
                                        const haStr = md.homeAway != null ? String(md.homeAway).trim() : '';
                                        const haLabel = haStr
                                            ? (haStr.includes('(') ? haStr : `(${haStr})`)
                                            : '(H)';
                                        return (<div key={mdIdx} onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingMatch({
                                                    isGroupStage: true,
                                                    name: `Group Stage (MD ${md.md})`,
                                                    campaignRowIndex: camp.rowIndex,
                                                    startCol: md.startCol,
                                                    statusCol: md.statusCol,
                                                    colIdx: md.startCol,
                                                    status: md.rawStatus || 'W',
                                                    flag: md.flag || '',
                                                    opponent: md.opponent || '',
                                                    homeAway: md.homeAway || 'H',
                                                    gf: md.gf,
                                                    ga: md.ga
                                                });
                                            }} className={`p-2.5 rounded-xl border text-center transition-all shadow-2xs flex flex-col justify-between cursor-pointer hover:shadow-xs group/md ${isWin
                                                ? 'bg-white border-slate-200 hover:border-emerald-300'
                                                : isDraw
                                                    ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/25'
                                                    : 'bg-white border-slate-200 hover:border-rose-300'}`} title="Click to edit group match score">
                                              {/* Top Bar: (H) or (A) in top left, MD # in top center, and Win/Draw/Loss badge in top right */}
                                              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-1.5">
                                                <span className="text-slate-600 font-black">
                                                  {haLabel}
                                                </span>
                                                <span className="text-slate-500 font-extrabold tracking-normal">
                                                  MD {md.md}
                                                </span>
                                                <span className={`px-1.5 py-0.5 rounded font-black text-[11px] text-white leading-none ${isWin
                                                ? 'bg-emerald-600'
                                                : isDraw
                                                    ? 'bg-amber-500'
                                                    : 'bg-rose-600'}`}>
                                                  {isWin ? 'WIN' : isDraw ? 'DRAW' : 'LOSS'}
                                                </span>
                                              </div>
                                              {/* Opponent Flag, Name, and ESL # or 3-letter League Code */}
                                              <div className="my-1.5 text-center">
                                                <Flag emoji={md.flag} size={22}/>
                                                <div className="text-[11px] font-bold text-slate-900 truncate mt-1" title={md.opponent}>
                                                  {md.opponent}
                                                </div>
                                                <div className="mt-0.5 min-h-[14px] flex items-center justify-center">
                                                  {md.isEsl && md.eslRank != null ? (<span className="text-[11px] font-medium tabular-nums text-slate-500">
                                                      ESL #{md.eslRank}
                                                    </span>) : md.leagueCode ? (<span className="text-[11px] font-medium tracking-wider text-slate-400">
                                                      {md.leagueCode}
                                                    </span>) : null}
                                                </div>
                                              </div>
                                              {/* Match Score Prominent: Same font size & weight as Knockout agg score */}
                                              <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-center">
                                                <span className="tabular-nums text-sm font-black text-slate-900 bg-slate-100/90 px-2 py-0.5 rounded border border-slate-200/60 group-hover/md:border-amber-400 transition-colors">
                                                  {md.gf != null && md.ga != null ? `${formatGoals(md.gf)} – ${formatGoals(md.ga)}` : '—'}
                                                </span>
                                              </div>
                                            </div>);
                                    })}
                                      </div>
                                    </div>)}
                                  {/* 5. CONTESTED KNOCKOUT TOURNAMENT PATH (NO BYE/SKIPPED ROUNDS) */}
                                  <div className="p-4 sm:p-5">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                                        <Zap className="w-4 h-4 text-amber-500"/>
                                        <span>Knockout Bracket Path ({camp.rounds.filter(r => !r.skipped).length} Contested Rounds)</span>
                                      </h4>
                                      {ENABLE_EDITING && (<span className="text-[11px] text-slate-400">Click any match to edit score</span>)}
                                    </div>
                                    {camp.rounds.filter(r => !r.skipped).length === 0 ? (<div className="py-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
                                        No contested knockout matches recorded for this campaign (or entered directly at group stage).
                                      </div>) : (<div className="flex items-stretch gap-2.5 overflow-x-auto pb-2 pt-1">
                                        {[...camp.rounds.filter(r => !r.skipped)].map((round, rIdx) => {
                                        const isWin = round.isWin;
                                        const isChampion = round.status === 'CHAMPION';
                                        const isLoss = round.isLoss;
                                        return (<div key={rIdx} className="flex items-center gap-2 shrink-0">
                                              {rIdx > 0 && (<ChevronLeft className="w-4 h-4 text-slate-300 shrink-0"/>)}
                                              <div onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingMatch({ ...round, campaignRowIndex: camp.rowIndex });
                                            }} className={`w-[180px] sm:w-[200px] p-3 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${isChampion
                                                ? 'bg-amber-50/90 border-amber-300 shadow-xs ring-1 ring-amber-400/30'
                                                : isWin
                                                    ? 'bg-emerald-50/60 border-emerald-200'
                                                    : isLoss
                                                        ? 'bg-rose-50/70 border-rose-200'
                                                        : 'bg-white border-slate-200'}`}>
                                                <div>
                                                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                                    <span>{round.name}</span>
                                                    <span className={`px-1.5 py-0.2 rounded font-black ${isChampion
                                                ? 'bg-amber-500 text-white'
                                                : isWin
                                                    ? 'bg-emerald-600 text-white'
                                                    : isLoss
                                                        ? 'bg-rose-600 text-white'
                                                        : 'bg-slate-200 text-slate-700'}`}>
                                                      {isChampion ? 'WINNER' : isWin ? 'WIN' : 'LOSS'}
                                                    </span>
                                                  </div>
                                                  <div className="flex items-center space-x-2 my-1">
                                                    <Flag emoji={round.flag} size={22} className="shrink-0"/>
                                                    <div className="truncate">
                                                      <div className="font-bold text-xs text-slate-900 truncate" title={round.opponent}>
                                                        {round.opponent || 'TBD'}
                                                      </div>
                                                      {round.isEsl && round.eslRank != null ? (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{round.eslRank}</span>) : round.leagueCode ? (<span className="text-[11px] font-semibold tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                                                          {round.leagueCode}
                                                        </span>) : null}
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* Score section with redesigned 2-legged ties */}
                                                <div className="mt-2 pt-1.5 border-t border-slate-200/60">
                                                  {round.isTwoLegs && round.leg1 && round.leg2 ? (<div className="bg-white/90 rounded-lg p-2 border border-slate-200 shadow-2xs">
                                                      {/* Aggregate Header & Score */}
                                                      <div className="flex items-center justify-between">
                                                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/80">
                                                          AGG
                                                        </span>
                                                        <div className="flex items-center space-x-1.5">
                                                          <span className="tabular-nums text-sm font-black text-slate-900">
                                                            {round.gf != null && round.ga != null ? `${round.gf} – ${round.ga}` : 'vs'}
                                                          </span>
                                                          {round.penScore && (<span className="text-[11px] tabular-nums font-bold text-amber-700 bg-amber-100 px-1 py-0.5 rounded">
                                                              {round.penScore}
                                                            </span>)}
                                                        </div>
                                                      </div>
                                                      {/* Visual Connector Bracket */}
                                                      <div className="relative my-1.5">
                                                        <div className="absolute inset-0 flex items-center">
                                                          <div className="w-full border-t border-dashed border-blue-300"></div>
                                                        </div>
                                                        <div className="relative flex justify-center">
                                                          <span className="bg-white px-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-600">
                                                            2 LEGS
                                                          </span>
                                                        </div>
                                                      </div>
                                                      {/* Leg 1 and Leg 2 Scores */}
                                                      <div className="grid grid-cols-2 gap-1 text-center">
                                                        <div className="bg-slate-50 rounded px-1 py-1 border border-slate-200/80">
                                                          <div className="text-[11px] font-bold uppercase text-slate-400 leading-none mb-0.5">Leg 1</div>
                                                          <div className="text-xs font-black tabular-nums text-slate-800">{round.leg1}</div>
                                                        </div>
                                                        <div className="bg-slate-50 rounded px-1 py-1 border border-slate-200/80">
                                                          <div className="text-[11px] font-bold uppercase text-slate-400 leading-none mb-0.5">Leg 2</div>
                                                          <div className="text-xs font-black tabular-nums text-slate-800">{round.leg2}</div>
                                                        </div>
                                                      </div>
                                                    </div>) : (<div className="flex items-center justify-between">
                                                      <div className="flex items-baseline space-x-1.5">
                                                        <span className="tabular-nums text-sm font-black text-slate-800">
                                                          {round.gf != null && round.ga != null ? `${round.gf} – ${round.ga}` : 'vs'}
                                                        </span>
                                                      </div>
                                                      {round.penScore && (<span className="text-[11px] tabular-nums font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded" title={`Penalty shootout (${CLUB_DISPLAY_NAME} left, Opponent right)`}>
                                                          {round.penScore}
                                                        </span>)}
                                                    </div>)}
                                                </div>
                                              </div>
                                            </div>);
                                    })}
                                      </div>)}
                                  </div>
                                </div>))(grp.campaigns[openIdx])}
                            </React.Fragment>);
                    })}
                      </div>
                    </div>);
            }))}
            </div>
          </div>)}
        {/* VIEW 2: FINALS ARCHIVE */}
        {activeTab === 'finals' && (<div className="space-y-6">
            {/* Competition switch (drives everything on this tab) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <ControlLabel accent="amber" icon={Trophy}>Competition</ControlLabel>
              <FilterPills accent="amber" value={finalsCompFilter} onChange={setFinalsCompFilter} options={[
                { value: 'ALL', label: 'All Competitions', badge: finals.length },
                ...finalsCompOptions,
              ]}/>
            </div>
            {/* Highlights (shared strip) */}
            <HighlightsBar accent="amber" columns={4}>
              <HighlightCard label="Finals Record" icon={Trophy} iconClassName="text-amber-400" value={`${finalsViewStats.won} - ${finalsViewStats.lost}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight" left={`${finalsViewStats.winPct}% Won`} right={`${finalsViewStats.played} Finals`} rightClassName="text-amber-300 font-bold"/>
              <HighlightCard label="Finals Goals" icon={Target} iconClassName="text-indigo-400" value={`${finalsViewStats.gf} - ${finalsViewStats.ga}`} valueClassName="text-2xl sm:text-3xl font-black text-white tracking-tight" left={`${finalsViewStats.gd >= 0 ? '+' : ''}${finalsViewStats.gd} GD`} leftClassName="text-indigo-300 font-bold" right={`${finalsViewStats.played ? (finalsViewStats.gf / finalsViewStats.played).toFixed(2) : '0.00'} G/M`} rightClassName="text-slate-300 font-normal"/>
              <HighlightCard label="Clean Sheets" icon={Shield} iconClassName="text-teal-400" value={finalsViewStats.cleanSheets} valueClassName="text-2xl sm:text-3xl font-black text-teal-300 tracking-tight" left={`${finalsViewStats.failedToScore} Failed to Score`} leftClassName="text-teal-300 font-bold" right={`${finalsViewStats.played} Finals`} rightClassName="text-slate-300 font-normal"/>
              <HighlightCard label="Top Finals Foe" icon={Swords} iconClassName="text-sky-400" value={finalsViewStats.foes[0] ? finalsViewStats.foes[0].name : '–'} valueClassName="text-lg sm:text-xl font-black text-sky-300 tracking-tight truncate" left={finalsViewStats.foes[0] ? `${finalsViewStats.foes[0].p}x Met` : ''} right={finalsViewStats.foes[0] ? `${finalsViewStats.foes[0].w}W - ${finalsViewStats.foes[0].l}L` : ''} rightClassName="text-sky-200 font-bold"/>
            </HighlightsBar>
            {/* Dynamic Most Frequent Finals Foes Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
                Most Frequent Finals Foes
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {finalsViewStats.foes.map((foe, i) => (<div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <Flag emoji={foe.flag} size={22}/>
                    <div className="text-xs font-bold text-slate-900 mt-1 truncate">{foe.name}</div>
                    <div className="text-[11px] text-slate-600 font-medium tabular-nums mt-0.5">
                      {foe.w}W - {foe.l}L ({foe.p > 0 ? ((foe.w / foe.p) * 100).toFixed(0) : 0}%)
                    </div>
                  </div>))}
              </div>
            </div>
            {/* All Finals Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Chronological Finals Archive (<span className="tabular-nums">{finalsView.length}</span> Played: <span className="tabular-nums text-emerald-700">{finalsView.filter(f => f.isWon).length} Wins</span>, <span className="tabular-nums text-rose-600">{finalsView.filter(f => !f.isWon).length} Losses</span>)
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {finalsView.map((fin) => (<div key={fin.fNum} className={`p-4 rounded-xl border transition-all relative ${fin.isWon
                    ? 'bg-white border-amber-300 shadow-xs ring-1 ring-amber-400/10'
                    : 'bg-slate-50/70 border-slate-200 opacity-90'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold tabular-nums text-slate-500">#{fin.fNum}</span>
                        <span className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {fin.year} (S{fin.season})
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${fin.isWon ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
                        {fin.isWon ? '🏆 CHAMPIONS' : 'RUNNER-UP'}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-slate-600 uppercase tracking-wide">
                      {fin.comp}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Flag emoji={fin.flag} size={26}/>
                        <div>
                          <div className="text-sm font-black text-slate-900">{fin.opponent}</div>
                          {fin.isEsl && fin.eslRank != null ? (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{fin.eslRank}</span>) : fin.leagueCode ? (<span className="text-[11px] font-semibold tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">{fin.leagueCode}</span>) : null}
                        </div>
                      </div>
                      <div className="tabular-nums text-xl font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                        {fin.score}
                      </div>
                    </div>
                  </div>))}
              </div>
            </div>
          </div>)}
        {/* VIEW 3: ELIMINATIONS WALL */}
        {activeTab === 'eliminations' && (<div className="space-y-6">
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black tabular-nums text-base">
                  {eliminations.length}
                </div>
                <div>
                  <h3 className="font-black text-sm text-rose-900">Total Career Cup Eliminations</h3>
                  <p className="text-xs text-rose-700 font-medium">
                    Across <span className="tabular-nums font-bold">{grandTotals.played}</span> cup fixtures in <span className="tabular-nums font-bold">{playedSeasons.length}</span> seasons, {CLUB_DISPLAY_NAME} has only been knocked out <span className="tabular-nums font-bold">{eliminations.length}</span> times.
                  </p>
                </div>
              </div>
              <div className="text-xs font-bold text-rose-800 bg-white/80 px-3 py-1.5 rounded-lg border border-rose-200">
                Exit Rate: <span className="tabular-nums font-bold">{cupsHighlights.decided > 0 ? ((eliminations.length / cupsHighlights.decided) * 100).toFixed(1) : '0.0'}%</span> of Cup Runs
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eliminations.map((elm) => (<div key={elm.eNum} className="bg-white p-4 rounded-xl border border-rose-200/80 shadow-xs relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tabular-nums text-rose-600">Elimination #{elm.eNum}</span>
                    <span className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {elm.year} (S{elm.season})
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-600 uppercase">
                    {elm.comp}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Flag emoji={elm.flag} size={26}/>
                      <div>
                        <div className="text-[11px] font-semibold text-rose-600">{prettyStage(elm.round)}</div>
                        <div className="text-sm font-black text-slate-900">{elm.opponent}</div>
                        {elm.isEsl && elm.eslRank != null ? (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{elm.eslRank}</span>) : elm.leagueCode ? (<span className="text-[11px] font-semibold tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">{elm.leagueCode}</span>) : null}
                      </div>
                    </div>
                    <div className="tabular-nums text-lg font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg">
                      {elm.score}
                    </div>
                  </div>
                </div>))}
            </div>
            {/* Dynamic Exit Round Distribution */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
                Elimination by Stage
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {dynamicEliminationStages.map((st, i) => (<div key={i} className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                    <div className="text-lg font-black tabular-nums text-slate-800">{st.count}</div>
                    <div className="text-[11px] font-semibold text-slate-600">{prettyStage(st.round)}</div>
                  </div>))}
              </div>
            </div>
          </div>)}
        {/* VIEW 4: CLUB RIVALRIES & H2H (ESL CLUBS ONLY) */}
        {/* VIEW: FORM & MARGINS (Cups v5) */}
        {activeTab === 'form' && (() => {
            const T = formTotals;
            const pct = (n, d) => (d > 0 ? (n / d) * 100 : 0);
            const outcomeSegments = [
                { key: 'regW', n: T.regW, label: 'Wins', full: 'Wins (no pens)', cls: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white', swatch: 'bg-emerald-600' },
                { key: 'penW', n: T.penW, label: 'Pens W', full: 'Won on pens', cls: 'text-emerald-900', style: PEN_WIN_STYLE },
                { key: 'd', n: T.d, label: 'Draws', full: 'Draws', cls: 'bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950', swatch: 'bg-amber-500' },
                { key: 'penL', n: T.penL, label: 'Pens L', full: 'Lost on pens', cls: 'text-rose-900', style: PEN_LOSS_STYLE },
                { key: 'regL', n: T.regL, label: 'Losses', full: 'Losses (no pens)', cls: 'bg-gradient-to-r from-rose-600 to-rose-500 text-white', swatch: 'bg-rose-600' },
            ];
            const formFiltersActive = formSeason !== 'all' || formType !== 'all' || formComp !== 'all';
            const formCompLabel = formComp === 'all' ? '' : compName(formComp);
            const formContext = (r) => [r ? `Season ${r.season} (${r.year})` : 'All seasons', formType === 'all' ? 'All matches' : formTypeLabel, formCompLabel || 'All competitions'].join(' • ');
            const tieFiltersActive = tieSeason !== 'all' || tieComp !== 'all' || tieTagFilter !== 'all';
            const activeTag = TIE_TAGS.find(g => g.key === tieTagFilter);
            const shootMaxRow = Math.max(1, ...shootStats.splits[shootSplit].map(g => g.w + g.l));
            return (<div className="space-y-6">
              {/* Highlights (shared strip) */}
              <HighlightsBar accent="amber" columns={5}>
                <HighlightCard phoneWide label={<>Record <RecordKey /></>} icon={Activity} iconClassName="text-amber-400" value={`${T.w}-${T.d}-${T.l}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight tabular-nums" left={`${T.played} Matches`} right={`${pct(T.w, T.played).toFixed(1)}% Won`} rightClassName="text-amber-300 font-bold"/>
                <HighlightCard label="Goals" icon={Target} iconClassName="text-indigo-400" value={`${T.gf} - ${T.ga}`} valueClassName="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums" left={`${T.gf - T.ga >= 0 ? '+' : ''}${T.gf - T.ga} GD`} leftClassName="text-indigo-300 font-bold" right={`${T.played ? (T.gf / T.played).toFixed(2) : '0.00'} G/M`} rightClassName="text-slate-300 font-normal"/>
                <HighlightCard label="Won by 2+" icon={TrendingUp} iconClassName="text-emerald-400" value={`${pct(T.multiGoalWins, T.w).toFixed(1)}%`} valueClassName="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight tabular-nums" left={`${T.multiGoalWins} of ${T.w} wins`} right=""/>
                <HighlightCard label="Two-Leg Ties" icon={Layers} iconClassName="text-sky-400" value={`${T.tieW} - ${T.tieL}`} valueClassName="text-2xl sm:text-3xl font-black text-sky-300 tracking-tight tabular-nums" left={`${T.ties} Ties`} right={`${T.comebacks} Comeback${T.comebacks === 1 ? '' : 's'}`} rightClassName="text-sky-200 font-bold"/>
                <HighlightCard label="Shootouts" icon={Target} iconClassName="text-teal-400" value={`${T.shootW} - ${T.shootL}`} valueClassName="text-2xl sm:text-3xl font-black text-teal-300 tracking-tight tabular-nums" left={`${T.shoots} Shootouts`} right={`${pct(T.shootW, T.shoots).toFixed(0)}% Won`} rightClassName="text-teal-200 font-bold"/>
              </HighlightsBar>

              {/* 1. OUTCOMES: every match, each leg of a two-leg tie counted */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
                      <BarChart3 className="w-5 h-5"/>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Outcomes</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Every match. Each leg of a two-leg tie counts as one.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold self-start sm:self-auto">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      <Hash className="w-3.5 h-3.5 text-slate-500"/>
                      <span className="tabular-nums">{T.played} Played</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600"/>
                      <span className="tabular-nums">{T.w} Won{T.penW > 0 ? ` (${T.penW} on pens)` : ''}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      <MinusCircle className="w-3.5 h-3.5 text-amber-600"/>
                      <span className="tabular-nums">{T.d} Drawn</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
                      <XCircle className="w-3.5 h-3.5 text-rose-600"/>
                      <span className="tabular-nums">{T.l} Lost{T.penL > 0 ? ` (${T.penL} on pens)` : ''}</span>
                    </span>
                  </div>
                </div>
                <SegmentBar accent="amber" total={T.played} unit="matches" chip="All seasons" context="Every cup match. Each leg of a two-leg tie counts as one." barClass="w-full h-8 sm:h-9 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner p-1 gap-1" segClass="h-full rounded-lg flex items-center justify-center px-2 text-xs font-black" minWidth="8px" segments={outcomeSegments.map(o => ({
                    ...o,
                    label: o.full,
                    inner: (p) => (p >= 8 ? <span className="truncate tabular-nums">{o.label} {p.toFixed(1)}%</span> : null),
                }))}/>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs border border-emerald-200" style={PEN_WIN_STYLE}/>Won on pens</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs border border-rose-200" style={PEN_LOSS_STYLE}/>Lost on pens</span>
                </div>
              </div>

              {/* 2. MARGIN DISTRIBUTION: every match, by season and match type */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
                <FormSectionHeader icon={Layers} title="Margin Distribution" sub="How wide the wins, draws and losses were, season by season." right={<Segmented className="self-start lg:self-auto" value={formMarginView} onChange={setFormMarginView} options={[
                    { value: 'bars', label: 'Stacked Visualizer' },
                    { value: 'matrix', label: 'Tier Matrix Table' },
                ]}/>}/>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <ControlLabel accent="amber" icon={Calendar}>Season</ControlLabel>
                    <FilterPills accent="amber" value={formSeason} onChange={setFormSeason} options={[
                        { value: 'all', label: 'All Seasons', badge: formTypeMatches.length },
                        ...formSeasonRows.map(r => ({ value: String(r.season), label: `S${r.season}`, badge: r.counts.total })),
                    ]}/>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="space-y-1.5">
                        <ControlLabel accent="amber" icon={Filter}>Matches</ControlLabel>
                        <Segmented value={formType} onChange={setFormType} options={FORM_TYPES}/>
                      </div>
                      <div className="space-y-1.5 flex flex-col">
                        <ControlLabel accent="amber" icon={Trophy}>Competition</ControlLabel>
                        <select className={SELECT_CLASS} value={formComp} onChange={(e) => setFormComp(e.target.value)}>
                          <option value="all">All competitions ({formTypeOnly.length})</option>
                          {formCompOptions.map(o => (<option key={o.value} value={o.value} disabled={o.n === 0 && o.value !== formComp}>{o.label} ({o.n})</option>))}
                        </select>
                      </div>
                    </div>
                    <ResetButton onClick={() => { setFormSeason('all'); setFormType('all'); setFormComp('all'); }} disabled={!formFiltersActive}/>
                  </div>
                </div>

                {formVisibleRows.length === 0 ? (<FormEmpty>
                    No {formType === 'all' ? '' : formTypeLabel.toLowerCase() + ' '}matches{formCompLabel ? ` in the ${formCompLabel}` : ''}{formSeason === 'all' ? '' : ` in Season ${formSeason}`}. Try another season, match type or competition.
                  </FormEmpty>) : formMarginView === 'matrix' ? (<div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/50">
                          <th className="py-2.5 px-3">Season</th>
                          <th className="py-2.5 px-2 text-center">Record</th>
                          {TIER_GROUPS.map(g => {
                            const tone = MARGIN_TONES[g.key];
                            return [
                                ...CUP_TIERS.filter(t => t.group === g.key).map((t, i) => (<th key={t.key} className={`py-2.5 px-2 text-center font-black whitespace-nowrap ${tone.head} ${i === 0 ? tone.edge : ''}`} {...hv({ title: t.label })}>
                                    {t.style ? (<span className="px-1 rounded" style={t.style}>{t.short}</span>) : t.short}
                                  </th>)),
                                <th key={`${g.key}-t`} className={`py-2.5 px-2 text-center font-black whitespace-nowrap ${tone.headTotal}`}>{g.total}</th>,
                            ];
                          })}
                          <th className="py-2.5 px-3 text-center whitespace-nowrap" {...hv({ title: "Share of wins by two goals or more" })}>Won by 2+</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {formVisibleRows.map(r => {
                          const c = r.counts;
                          const multi = c.w4 + c.w3 + c.w2;
                          return (<tr key={r.season} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3">
                                <div className="font-extrabold text-slate-900 flex items-center space-x-1.5 whitespace-nowrap">
                                  <span>Season {r.season}</span>
                                  <span className="text-[11px] text-slate-500 font-normal">({r.year})</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2 text-center font-bold text-slate-900 whitespace-nowrap tabular-nums">
                                <span className="text-emerald-700">{c.win}W</span> • <span className="text-amber-700">{c.draw}D</span> • <span className="text-rose-700">{c.loss}L</span>
                              </td>
                              <TierCells counts={c}/>
                              <td className="py-2.5 px-3 text-center font-extrabold text-slate-700 tabular-nums">
                                {c.win > 0 ? `${pct(multi, c.win).toFixed(1)}%` : <span className="text-slate-400">-</span>}
                              </td>
                            </tr>);
                        })}
                      </tbody>
                      {formSeason === 'all' && (<tfoot>
                          <tr className="border-t-2 border-slate-300 font-black text-slate-900 bg-slate-50">
                            <td className="py-3 px-3 text-[11px] whitespace-nowrap" colSpan="2">
                              Career totals (<span className="tabular-nums">{formTypeTotals.total}</span> matches)
                            </td>
                            <TierCells counts={formTypeTotals} footer/>
                            <td className="py-3 px-3 text-center text-emerald-800 tabular-nums">
                              {formTypeTotals.win > 0 ? `${pct(formTypeTotals.w4 + formTypeTotals.w3 + formTypeTotals.w2, formTypeTotals.win).toFixed(1)}%` : '-'}
                            </td>
                          </tr>
                        </tfoot>)}
                    </table>
                  </div>) : (<div className="space-y-4">
                    <div className="flex justify-end"><FormLegendToggle/></div>
                    {formLegendOpen && <TierLegend/>}
                    {formVisibleRows.map(r => {
                      const c = r.counts;
                      return (<div key={r.season} className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200 space-y-2">
                          {/* Phones: two lines (Season · year / record · matches); one line from tablet up */}
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between text-xs">
                            <div className="whitespace-nowrap">
                              <span className="font-extrabold text-slate-900">Season {r.season}</span>
                              <span className="text-slate-500 font-semibold"> · {String(r.year).replace(/\s*-\s*/, '–')}</span>
                            </div>
                            <div className="font-bold text-slate-700 tabular-nums whitespace-nowrap">
                              <span className="text-emerald-700 font-black">{c.win}W</span> · <span className="text-amber-700 font-black">{c.draw}D</span> · <span className="text-rose-700 font-black">{c.loss}L</span>{' '}
                              <span className="text-slate-500 font-medium"> · {c.total} {c.total === 1 ? 'match' : 'matches'}</span>
                            </div>
                          </div>
                          <TierBar counts={c} chip={`S${r.season}`} context={formContext(r)}/>
                        </div>);
                    })}
                  </div>)}
              </div>

              {/* 3. TWO-LEG TIES: the tie is the unit here */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
                <FormSectionHeader icon={Swords} title="Two-Leg Ties" sub="How each tie played out across its two legs, and the final aggregate." right={<span className="self-start lg:self-auto text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 tabular-nums">
                    {tiesInSeason.length} {tiesInSeason.length === 1 ? 'Tie' : 'Ties'} • {tiesInSeason.filter(t => t.isWin).length}W - {tiesInSeason.filter(t => !t.isWin).length}L
                  </span>}/>
                {formData.ties.length === 0 ? (<FormEmpty>No two-leg ties played yet.</FormEmpty>) : (<>
                  <div className="space-y-3">
                    <div className="space-y-1.5 min-w-0">
                      <ControlLabel accent="amber" icon={Calendar}>Season</ControlLabel>
                      <FilterPills accent="amber" value={tieSeason} onChange={setTieSeason} options={[
                          { value: 'all', label: 'All Seasons', badge: tiesInComp.length },
                          ...tieSeasonOptions.map(s => ({ value: String(s), label: `S${s}`, badge: tiesInComp.filter(t => t.season === s).length })),
                      ]}/>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div className="space-y-1.5 flex flex-col">
                        <ControlLabel accent="amber" icon={Trophy}>Competition</ControlLabel>
                        <select className={SELECT_CLASS} value={tieComp} onChange={(e) => setTieComp(e.target.value)}>
                          <option value="all">All competitions</option>
                          {tieCompOptions.map(o => (<option key={o.value} value={o.value} disabled={o.n === 0 && o.value !== tieComp}>{o.label} ({o.n})</option>))}
                        </select>
                      </div>
                      <ResetButton onClick={() => { setTieSeason('all'); setTieComp('all'); setTieTagFilter('all'); }} disabled={!tieFiltersActive}/>
                    </div>
                  </div>

                  {/* Tags: a tie can have several. Tap one to filter the ties below. */}
                  <div className="space-y-2">
                    <ControlLabel accent="amber" icon={Activity}>Tags</ControlLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {TIE_TAGS.map(g => {
                        const n = tieTagCounts[g.key] || 0;
                        const active = tieTagFilter === g.key;
                        return (<button key={g.key} type="button" {...hv({ title: g.desc })} disabled={n === 0 && !active} onClick={() => setTieTagFilter(active ? 'all' : g.key)} className={`inline-flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-full border text-xs font-bold transition-colors ${active ? 'bg-amber-500 border-amber-500 text-white' : n === 0 ? 'bg-white border-dashed border-slate-200 text-slate-400 cursor-default' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}>
                            <span className={`w-2 h-2 rounded-full ${n === 0 && !active ? 'bg-slate-300' : g.dot}`}/>
                            <span>{g.label}</span>
                            <span className={`text-[11px] font-extrabold tabular-nums px-1.5 rounded-full ${active ? 'bg-white/25 text-white' : n === 0 ? 'bg-slate-50 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{n}</span>
                          </button>);
                      })}
                    </div>
                    <p className="text-[11px] font-medium text-slate-500">
                      {activeTag ? (<><span className="font-bold text-slate-700">{activeTag.label}:</span> {activeTag.desc}.</>) : 'A tie can have several tags. Tap one to see those ties; hover for what it means.'}
                    </p>
                  </div>

                  {/* Aggregate margins of the ties shown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">Aggregate margins</span>
                      <span className="font-bold text-slate-600 tabular-nums">{tiesShown.length} {tiesShown.length === 1 ? 'tie' : 'ties'}</span>
                    </div>
                    <TierBar counts={tieAggCounts} height="h-7" unit="ties" chip={tieSeason === 'all' ? 'All seasons' : `S${tieSeason}`} context={['Aggregate score', tieComp === 'all' ? 'All competitions' : compName(tieComp), activeTag ? activeTag.label : null].filter(Boolean).join(' • ')}/>
                    <div className="flex justify-end"><TieLegendToggle/></div>
                    {tieLegendOpen && <TierLegend counts={tieAggCounts}/>}
                  </div>

                  {/* The ties */}
                  {tiesShown.length === 0 ? (<FormEmpty>No ties match these filters. Try another season, competition or tag.</FormEmpty>) : (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {tiesShown.map((t, i) => {
                        const legChip = (leg, label) => {
                          const d = leg.gf - leg.ga;
                          const tone = d > 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : d < 0 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-amber-50 border-amber-200 text-amber-900';
                          return (<div className={`flex-1 px-2 py-1.5 rounded-lg border text-center ${tone}`}>
                              <div className="text-[11px] font-bold opacity-70">{label}</div>
                              <div className="text-sm font-black tabular-nums">{leg.gf} – {leg.ga}</div>
                            </div>);
                        };
                        return (<div key={`${t.season}-${t.competition}-${t.stage}-${i}`} className={`p-3.5 rounded-xl border bg-white ${t.isWin ? 'border-slate-200' : 'border-rose-200 bg-rose-50/40'}`}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-600 truncate">{compName(t.competition)} • {t.stage}</span>
                              <span className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">S{t.season}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Flag emoji={t.flag} size={22} className="shrink-0"/>
                              <div className="min-w-0">
                                <div className="text-sm font-black text-slate-900 truncate" title={t.opponent}>{t.opponent}</div>
                                {t.isEsl && t.eslRank != null ? (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{t.eslRank}</span>) : t.leagueCode ? (<span className="text-[11px] font-semibold text-slate-500">{t.leagueCode}</span>) : null}
                              </div>
                            </div>
                            <div className="flex items-stretch gap-1.5 mt-2.5">
                              {legChip(t.l1, 'Leg 1')}
                              {legChip(t.l2, 'Leg 2')}
                              <div className={`flex-1 px-2 py-1.5 rounded-lg border text-center ${t.isWin ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-rose-600 border-rose-700 text-white'}`}>
                                <div className="text-[11px] font-bold opacity-80">Aggregate</div>
                                <div className="text-sm font-black tabular-nums">{t.gf} – {t.ga}</div>
                              </div>
                            </div>
                            {t.tags.length > 0 && (<div className="flex flex-wrap gap-1 mt-2.5">
                                {t.tags.map(k => {
                                  const g = TIE_TAGS.find(x => x.key === k);
                                  return (<span key={k} {...hv({ title: g.desc })} className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[11px] font-bold ${tieTagFilter === k ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${g.dot}`}/>{g.label}
                                    </span>);
                                })}
                              </div>)}
                            {t.penScore && (<div className="text-[11px] font-bold text-slate-500 mt-1.5 tabular-nums">Pens {String(t.penScore).replace(/[()]/g, '')}</div>)}
                          </div>);
                      })}
                    </div>)}
                </>)}
              </div>

              {/* 4. SHOOTOUTS */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
                <FormSectionHeader icon={Target} title="Shootouts" sub="Every tie decided on penalties." right={<span className="self-start lg:self-auto text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 tabular-nums">
                    {shootStats.played} {shootStats.played === 1 ? 'Shootout' : 'Shootouts'} • {shootStats.w}W - {shootStats.l}L
                  </span>}/>
                {shootStats.played === 0 ? (<FormEmpty>No shootouts yet.</FormEmpty>) : (<>
                  {/* Key numbers */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { label: 'Won', value: `${pct(shootStats.w, shootStats.played).toFixed(0)}%`, sub: `${shootStats.w} of ${shootStats.played}` },
                        { label: 'Penalties scored', value: `${shootStats.kicksFor} - ${shootStats.kicksAgainst}`, sub: `${(shootStats.kicksFor / shootStats.played).toFixed(1)} per shootout` },
                        { label: 'Sudden death', value: shootStats.sudden, sub: shootStats.sudden > 0 ? `${shootStats.suddenW}W - ${shootStats.sudden - shootStats.suddenW}L (past 5 kicks each)` : 'None went past 5 kicks each' },
                        { label: 'Avg opponent ESL rank', value: shootStats.avgRank != null ? `#${Math.round(shootStats.avgRank)}` : '–', sub: shootStats.rankedCount < shootStats.played ? `${shootStats.rankedCount} of ${shootStats.played} opponents ranked` : 'All opponents ranked' },
                    ].map(k => (<div key={k.label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-semibold text-slate-600">{k.label}</div>
                        <div className="text-2xl font-black text-slate-900 tabular-nums mt-1">{k.value}</div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5">{k.sub}</div>
                      </div>))}
                  </div>

                  {/* Split */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <ControlLabel accent="amber" icon={BarChart3}>Split by</ControlLabel>
                      <Segmented value={shootSplit} onChange={setShootSplit} options={[
                          { value: 'comp', label: 'Competition' },
                          { value: 'round', label: 'Round' },
                          { value: 'season', label: 'Season' },
                          { value: 'score', label: 'Score before pens' },
                      ]}/>
                    </div>
                    <div className="space-y-2">
                      {shootStats.splits[shootSplit].map(g => (<div key={String(g.key)} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-3 text-xs">
                          <span className="font-bold text-slate-800 truncate" {...hv({ title: g.label })}>{g.label}</span>
                          <div className="h-5 flex gap-0.5" style={{ width: `${((g.w + g.l) / shootMaxRow) * 100}%` }}>
                            {g.w > 0 && <div className="h-full rounded-md border border-emerald-200 flex items-center justify-center text-[11px] font-black text-emerald-900 tabular-nums" style={{ ...PEN_WIN_STYLE, flex: g.w }} {...hv({ title: `${g.w} won on pens` })}>{g.w}</div>}
                            {g.l > 0 && <div className="h-full rounded-md border border-rose-200 flex items-center justify-center text-[11px] font-black text-rose-900 tabular-nums" style={{ ...PEN_LOSS_STYLE, flex: g.l }} {...hv({ title: `${g.l} lost on pens` })}>{g.l}</div>}
                          </div>
                          <span className="font-black text-slate-700 tabular-nums whitespace-nowrap">{g.w}W - {g.l}L</span>
                        </div>))}
                    </div>
                  </div>

                  {/* Every shootout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {formData.shootouts.map((s, i) => {
                      const sd = Math.max(s.penFor, s.penAgainst) > 5;
                      return (<div key={`${s.season}-${s.competition}-${s.stage}-${i}`} className={`p-3 rounded-xl border ${s.isWin ? 'border-emerald-200' : 'border-rose-200'}`} style={s.isWin ? { backgroundColor: '#f0fdf4' } : { backgroundColor: '#fff1f2' }}>
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-slate-600">
                            <span className="truncate">{compName(s.competition)}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[11px] font-black shrink-0 border ${s.isWin ? 'text-emerald-900 border-emerald-300' : 'text-rose-900 border-rose-300'}`} style={s.isWin ? PEN_WIN_STYLE : PEN_LOSS_STYLE}>
                              {s.isWin ? 'Won on pens' : 'Lost on pens'}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-slate-600 mt-0.5 tabular-nums">{s.stage} • S{s.season}</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Flag emoji={s.flag} size={22} className="shrink-0"/>
                            <div className="min-w-0">
                              <div className="text-sm font-black text-slate-900 truncate" title={s.opponent}>{s.opponent}</div>
                              {s.isEsl && s.eslRank != null ? (<span className="text-[11px] font-semibold tabular-nums text-emerald-700">ESL #{s.eslRank}</span>) : s.leagueCode ? (<span className="text-[11px] font-semibold text-slate-500">{s.leagueCode}</span>) : null}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/70">
                            <span className="text-xs font-bold text-slate-600 tabular-nums">{s.gf} – {s.ga}{s.twoLegs ? ' agg' : ''}</span>
                            <span className="flex items-center gap-1.5">
                              {sd && <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white" {...hv({ title: "Went past five kicks each" })}>Sudden death</span>}
                              <span className="text-sm font-black text-slate-900 tabular-nums">Pens {s.penFor} – {s.penAgainst}</span>
                            </span>
                          </div>
                        </div>);
                    })}
                  </div>
                </>)}
              </div>
            </div>);
        })()}
        {activeTab === 'rivalries' && (() => {
            // Flatten all ESL matches across all tracked clubs for aggregations
            const allEslMatches = [];
            clubsH2H.forEach(club => {
                club.matches.forEach(m => {
                    allEslMatches.push({
                        ...m,
                        clubCode: club.code,
                        clubName: club.name,
                        clubFlag: club.flag,
                        clubRank: club.rank
                    });
                });
            });
            // Top KPI Strip calculations for ESL fixtures
            const totalEslMatches = allEslMatches.length;
            const totalEslWins = allEslMatches.filter(m => m.isWin).length;
            const totalEslDraws = allEslMatches.filter(m => m.isDraw).length;
            const totalEslLosses = allEslMatches.filter(m => m.isLoss).length;
            const eslWinPct = totalEslMatches > 0 ? ((totalEslWins / totalEslMatches) * 100).toFixed(1) : '0.0';
            const eslLossPct = totalEslMatches > 0 ? ((totalEslLosses / totalEslMatches) * 100).toFixed(1) : '0.0';
            const penMatches = allEslMatches.filter(m => m.penScore);
            const penWins = penMatches.filter(m => m.isWin).length;
            const penLosses = penMatches.filter(m => m.isLoss).length;
            const totalGf = allEslMatches.reduce((acc, m) => acc + (m.gf || 0), 0);
            const totalGa = allEslMatches.reduce((acc, m) => acc + (m.ga || 0), 0);
            const totalGd = totalGf - totalGa;
            const uniqueEslClubsCount = clubsH2H.filter(c => c.played > 0).length;
            // Distinct Tournament List from ESL matches
            const distinctTournaments = Array.from(new Set(allEslMatches.map(m => m.competition).filter(Boolean)));
            // Filter and Sort Clubs for H2H by Club Card view
            const filteredClubs = clubsH2H.filter(club => {
                if (club.played === 0)
                    return false;
                // Search Filter
                if (h2hSearch.trim()) {
                    const q = h2hSearch.toLowerCase();
                    const matchName = club.name.toLowerCase().includes(q);
                    const matchCode = club.code.toLowerCase().includes(q);
                    if (!matchName && !matchCode)
                        return false;
                }
                // Tournament Filter
                if (h2hTournamentFilter !== 'ALL') {
                    const hasTourn = club.matches.some(m => m.competition.toLowerCase().includes(h2hTournamentFilter.toLowerCase()));
                    if (!hasTourn)
                        return false;
                }
                // Outcome Filter
                if (h2hOutcomeFilter === '100W' && !(club.played > 0 && club.lost === 0 && club.drawn === 0))
                    return false;
                if (h2hOutcomeFilter === 'HAS_D' && club.drawn === 0)
                    return false;
                if (h2hOutcomeFilter === 'HAS_L' && club.lost === 0)
                    return false;
                if (h2hOutcomeFilter === 'PENS' && !club.matches.some(m => m.penScore))
                    return false;
                return true;
            });
            filteredClubs.sort((a, b) => {
                let res = 0;
                if (h2hSortBy === 'mostPlayed') {
                    res = b.played - a.played || b.winRate - a.winRate;
                }
                else if (h2hSortBy === 'winRate') {
                    res = b.winRate - a.winRate || b.played - a.played;
                }
                else if (h2hSortBy === 'mostWins') {
                    res = b.won - a.won || b.winRate - a.winRate;
                }
                else if (h2hSortBy === 'goalDiff') {
                    res = b.gd - a.gd || b.won - a.won;
                }
                else if (h2hSortBy === 'alpha') {
                    res = a.name.localeCompare(b.name);
                }
                return h2hSortAsc ? -res : res;
            });
            // All Matches Log filtering
            const filteredAllMatches = allEslMatches.filter(m => {
                if (h2hSearch.trim()) {
                    const q = h2hSearch.toLowerCase();
                    const matchOpp = m.opponent.toLowerCase().includes(q);
                    const matchClub = m.clubName.toLowerCase().includes(q);
                    const matchComp = m.competition.toLowerCase().includes(q);
                    if (!matchOpp && !matchClub && !matchComp)
                        return false;
                }
                if (h2hTournamentFilter !== 'ALL' && !m.competition.toLowerCase().includes(h2hTournamentFilter.toLowerCase())) {
                    return false;
                }
                if (h2hOutcomeFilter === '100W' && !m.isWin)
                    return false;
                if (h2hOutcomeFilter === 'HAS_D' && !m.isDraw)
                    return false;
                if (h2hOutcomeFilter === 'HAS_L' && !m.isLoss)
                    return false;
                if (h2hOutcomeFilter === 'PENS' && !m.penScore)
                    return false;
                return true;
            }).sort((a, b) => (h2hSortAsc ? a.season - b.season : b.season - a.season));
            return (<div className="space-y-5">
              {/* 1. HIGHLIGHTS (shared strip) */}
              <HighlightsBar accent="amber" columns={6}>
                <HighlightCard label="ESL Matches" icon={Swords} iconClassName="text-slate-300" value={totalEslMatches} valueClassName="text-2xl sm:text-3xl font-black text-white tracking-tight" left="vs ranked clubs" right={`${uniqueEslClubsCount} Clubs`} rightClassName="text-slate-300 font-normal"/>
                <HighlightCard label="Wins" icon={Activity} iconClassName="text-emerald-400" value={`${totalEslWins}W`} valueClassName="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight" left={`${eslWinPct}% Win Rate`} leftClassName="text-emerald-300 font-bold"/>
                <HighlightCard label="Draws & Losses" icon={XCircle} iconClassName="text-rose-400" value={`${totalEslDraws}D - ${totalEslLosses}L`} valueClassName="text-2xl sm:text-3xl font-black text-rose-300 tracking-tight" left={`${eslLossPct}% Lost`} leftClassName="text-rose-300 font-bold"/>
                <HighlightCard label="Shootouts" icon={Shield} iconClassName="text-teal-400" value={`${penWins} - ${penLosses}`} valueClassName="text-2xl sm:text-3xl font-black text-teal-300 tracking-tight" left={`${penMatches.length} Shootouts`} leftClassName="text-teal-300 font-bold"/>
                <HighlightCard label="Goals" icon={Target} iconClassName="text-indigo-400" value={`${totalGf} - ${totalGa}`} valueClassName="text-2xl sm:text-3xl font-black text-white tracking-tight" left={`${totalGd > 0 ? '+' : ''}${totalGd} GD`} leftClassName="text-indigo-300 font-bold"/>
                <HighlightCard label="Foes Faced" icon={Users} iconClassName="text-amber-400" value={uniqueEslClubsCount} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight" left="Ranked clubs" right="ESL 1–92" rightClassName="text-amber-300 font-bold"/>
              </HighlightsBar>
              {/* 2. SUB-TAB NAVIGATION & EXPLANATION BANNER */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 pt-3 border-b border-slate-200 gap-2">
                  {/* Sub-views */}
                  <div className="pb-2 sm:pb-0">
                    <Segmented value={h2hSubTab} onChange={setH2hSubTab} options={[
                    { value: 'byClub', label: `H2H by Club (${filteredClubs.length})`, icon: Users },
                    { value: 'allMatches', label: `All Matches Log (${filteredAllMatches.length})`, icon: Swords },
                    { value: 'tournaments', label: `Tournament Breakdown (${distinctTournaments.length})`, icon: Trophy },
                ]}/>
                  </div>
                </div>
                {/* 3. SEARCH & FILTER CONTROLS BAR (shared controls) */}
                <div className="p-3 bg-slate-50/70 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <SearchInput accent="amber" className="min-w-[220px]" value={h2hSearch} onChange={setH2hSearch} placeholder="Search club, country, opponent..."/>
                    <select value={h2hTournamentFilter} onChange={e => setH2hTournamentFilter(e.target.value)} className={SELECT_CLASS}>
                      <option value="ALL">All Tournaments</option>
                      {Object.keys(CUP_METADATA).map(comp => (<option key={comp} value={comp}>{compName(comp)}</option>))}
                    </select>
                    <select value={h2hOutcomeFilter} onChange={e => setH2hOutcomeFilter(e.target.value)} className={SELECT_CLASS}>
                      <option value="ALL">All Outcomes</option>
                      <option value="100W">100% Wins Only</option>
                      <option value="HAS_D">Has Draws</option>
                      <option value="HAS_L">Has Losses</option>
                      <option value="PENS">Went to Penalties</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={h2hSortBy} onChange={e => setH2hSortBy(e.target.value)} className={SELECT_CLASS}>
                      <option value="mostPlayed">Sort: Most Played</option>
                      <option value="winRate">Sort: Win %</option>
                      <option value="mostWins">Sort: Most Wins</option>
                      <option value="goalDiff">Sort: Goal Diff</option>
                      <option value="alpha">Sort: A to Z</option>
                    </select>
                    <button onClick={() => setH2hSortAsc(!h2hSortAsc)} className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700" title={`Sort direction: ${h2hSortAsc ? 'ascending' : 'descending'}`}>
                      <ArrowUpDown className="w-3.5 h-3.5"/>
                    </button>
                    <ResetButton disabled={!h2hSearch && h2hTournamentFilter === 'ALL' && h2hOutcomeFilter === 'ALL' && h2hSortBy === 'mostPlayed' && !h2hSortAsc} onClick={() => {
                    setH2hSearch('');
                    setH2hTournamentFilter('ALL');
                    setH2hOutcomeFilter('ALL');
                    setH2hSortBy('mostPlayed');
                    setH2hSortAsc(false);
                }}/>
                  </div>
                </div>
              </div>
              {/* 4. SUB-TAB VIEW A: H2H BY CLUB (Cards with Dual-Color Ratio Bar & In-Place Accordion Expand) */}
              {h2hSubTab === 'byClub' && (<div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredClubs.length === 0 ? (<div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
                        <Users className="w-8 h-8 text-slate-400 mx-auto mb-2"/>
                        <p className="text-sm font-bold text-slate-800">No ESL club records match your filter criteria</p>
                        <p className="text-xs text-slate-500 mt-1">Try resetting the outcome or tournament dropdown filter.</p>
                      </div>) : (filteredClubs.map((club, clubIdx) => {
                        const isExpanded = expandedClubCode === club.code;
                        const openClubIdx = filteredClubs.findIndex(c => c.code === expandedClubCode);
                        const clubDrawerHere = clubIdx === drawerRowEnd(openClubIdx, rivalryCols, filteredClubs.length);
                        const pensInClub = club.matches.filter(m => m.penScore).length;
                        const clubTournaments = Array.from(new Set(club.matches.map(m => m.competition)));
                        // Ratio bar percentages
                        const winPctBar = club.played > 0 ? (club.won / club.played) * 100 : 0;
                        const drawPctBar = club.played > 0 ? (club.drawn / club.played) * 100 : 0;
                        const lossPctBar = club.played > 0 ? (club.lost / club.played) * 100 : 0;
                        return (<React.Fragment key={club.code}>
                            {/* Main Club Card */}
                            <div onClick={() => setExpandedClubCode(isExpanded ? null : club.code)} className={`bg-white rounded-xl border transition-all cursor-pointer p-4 flex flex-col justify-between group ${isExpanded
                                ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                                : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
                              <div>
                                {/* Header Row */}
                                <div className="flex items-center justify-between gap-2.5">
                                  <div className="flex items-center space-x-2.5 min-w-0">
                                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                      <Flag emoji={club.flag} size={16}/>
                                    </span>
                                    <div className="min-w-0">
                                      <div className="flex items-center space-x-1.5 flex-wrap">
                                        <h4 className="font-black text-sm text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                                          {club.name}
                                        </h4>
                                        <span className="text-[11px] tabular-nums font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                          #{club.rank != null ? (Number.isInteger(club.rank) ? club.rank : club.rank.toFixed(1)) : 'ESL'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Right Side Stat Pill & Chevron */}
                                  <div className="flex items-center space-x-1.5 shrink-0">
                                    <span className="text-xs font-black tabular-nums px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                                      {club.winRate.toFixed(0)}% Win
                                    </span>
                                    <div className={`p-1 rounded-lg text-slate-400 group-hover:text-slate-700 transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-amber-600' : ''}`}>
                                      <ChevronDown className="w-4 h-4"/>
                                    </div>
                                  </div>
                                </div>
                                {/* Dual-Color Ratio Bar Directly Below Header */}
                                <div className="mt-3 w-full h-2 rounded-full overflow-hidden bg-slate-100 flex">
                                  {winPctBar > 0 && (<div style={{ width: `${winPctBar}%` }} className="h-full bg-emerald-600 transition-all" {...hv({ title: `${club.won} Wins (${winPctBar.toFixed(0)}%)` })}/>)}
                                  {drawPctBar > 0 && (<div style={{ width: `${drawPctBar}%` }} className="h-full bg-amber-400 transition-all" {...hv({ title: `${club.drawn} Draws (${drawPctBar.toFixed(0)}%)` })}/>)}
                                  {lossPctBar > 0 && (<div style={{ width: `${lossPctBar}%` }} className="h-full bg-rose-500 transition-all" {...hv({ title: `${club.lost} Losses (${lossPctBar.toFixed(0)}%)` })}/>)}
                                </div>
                              </div>
                              {/* Record + GD (same layout as Leagues) */}
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div className="tabular-nums flex items-center space-x-1 text-slate-600">
                                  <span className="font-bold text-slate-900">{club.played}&nbsp;<span className="text-[11px] font-semibold text-slate-500">MP</span></span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-emerald-700 font-bold">{club.won}<span className="text-[11px] font-semibold">W</span></span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-slate-500 font-medium">{club.drawn}<span className="text-[11px] font-semibold">D</span></span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-rose-600 font-bold">{club.lost}<span className="text-[11px] font-semibold">L</span></span>
                                  {pensInClub > 0 && (<span className="ml-1 text-[11px] font-bold tabular-nums px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                                      {pensInClub} PK{pensInClub > 1 ? 's' : ''}
                                    </span>)}
                                </div>
                                <div className="tabular-nums font-bold text-slate-700 text-[11px]">
                                  {club.gd > 0 ? `+${club.gd}` : club.gd} GD
                                </div>
                              </div>
                              {/* Card Footer Callout */}
                              <div className="mt-2 pt-1.5 border-t border-slate-100/60 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400 font-medium">
                                  {isExpanded ? 'Click to collapse history' : 'Click to expand encounters'}
                                </span>
                                <span className="font-bold text-amber-700 group-hover:text-amber-800 flex items-center space-x-0.5">
                                  <span>{isExpanded ? 'Hide Matches' : 'View History'}</span>
                                  <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}/>
                                </span>
                              </div>
                            </div>
                            {/* In-Place Accordion Expand: Full Encounter History vs that club */}
                            {clubDrawerHere && ((club) => (<div className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-50 rounded-2xl border border-amber-300/80 p-4 sm:p-5 shadow-xs space-y-3 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-3">
                                  <div className="flex items-center space-x-2">
                                    <Swords className="w-4 h-4 text-amber-600"/>
                                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-900">
                                      Encounter History vs {club.name} ({club.matches.length} Match{club.matches.length !== 1 ? 'es' : ''})
                                    </h5>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                                  {club.matches.map((m, mIdx) => (<MatchChip key={mIdx} m={m} showOpponent={false}/>))}
                                </div>
                              </div>))(filteredClubs[openClubIdx])}
                          </React.Fragment>);
                    }))}
                  </div>
                </div>)}
              {/* 5. SUB-TAB VIEW B: ALL MATCHES LOG */}
              {h2hSubTab === 'allMatches' && (<div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm text-slate-900">
                        Complete ESL Matches Log ({filteredAllMatches.length} Fixtures)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Every cup match contested against ESL-ranked opposition (numbers 1–92).
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <tr>
                          <th className="px-4 py-3 text-center">Result</th>
                          <th className="px-3 py-3">Season & Year</th>
                          <th className="px-3 py-3">Tournament</th>
                          <th className="px-3 py-3">Stage</th>
                          <th className="px-4 py-3">Opponent Club</th>
                          <th className="px-3 py-3 text-center">Score (WXM – OPP)</th>
                          <th className="px-3 py-3 text-center">Shootout</th>
                          <th className="px-3 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {filteredAllMatches.map((m, idx) => (<tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-2.5 text-center">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-black text-xs text-white ${m.isWin ? 'bg-emerald-600' : m.isDraw ? 'bg-amber-500' : 'bg-rose-600'}`}>
                                {m.isWin ? 'W' : m.isDraw ? 'D' : 'L'}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 font-bold tabular-nums text-slate-800 whitespace-nowrap">
                              Season {m.season} <span className="text-[11px] font-normal text-slate-500">({m.year})</span>
                            </td>
                            <td className="px-3 py-2.5 font-bold text-slate-900 whitespace-nowrap">
                              {m.competition}
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                {m.stage}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Flag emoji={m.clubFlag} size={18}/>
                                <span>{m.opponent}</span>
                                <span className="text-[11px] text-slate-400 tabular-nums font-semibold">
                                  #{m.clubRank != null ? (Number.isInteger(m.clubRank) ? m.clubRank : m.clubRank.toFixed(1)) : ''}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-center tabular-nums font-black text-sm text-slate-900 whitespace-nowrap">
                              {m.score}
                            </td>
                            <td className="px-3 py-2.5 text-center whitespace-nowrap">
                              {m.penScore ? (<span className="px-2 py-0.5 rounded-full text-[11px] tabular-nums font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  pens {m.penScore.replace(/[()]/g, '')}
                                </span>) : (<span className="text-slate-300 tabular-nums">—</span>)}
                            </td>
                            <td className="px-3 py-2.5 text-right whitespace-nowrap">
                              {ENABLE_EDITING && (<button onClick={() => {
                            const foundCamp = campaigns.find(c => c.season === m.season && c.competition.toLowerCase() === m.competition.toLowerCase());
                            if (m.type === 'Group Stage') {
                                const mdNum = parseInt(m.stage.match(/\d+/)?.[0] || '1', 10);
                                const foundMd = foundCamp?.groupStage?.matchdays.find(x => x.md === mdNum);
                                setEditingMatch({
                                    isGroupStage: true,
                                    name: m.stage,
                                    campaignRowIndex: foundCamp ? foundCamp.rowIndex : 20,
                                    startCol: foundMd ? foundMd.startCol : 142,
                                    statusCol: foundMd ? foundMd.statusCol : 142,
                                    colIdx: foundMd ? foundMd.startCol : 142,
                                    status: m.isWin ? 'W' : m.isDraw ? 'D' : 'L',
                                    flag: m.clubFlag || '🏳️',
                                    opponent: m.opponent,
                                    homeAway: m.homeAway || 'H',
                                    gf: m.gf,
                                    ga: m.ga
                                });
                            }
                            else {
                                const foundRnd = foundCamp?.rounds.find(r => r.name === m.stage);
                                setEditingMatch({
                                    isGroupStage: false,
                                    name: m.stage,
                                    campaignRowIndex: foundCamp ? foundCamp.rowIndex : 20,
                                    col: foundRnd ? foundRnd.col : 30,
                                    status: m.isWin ? 'W' : 'L',
                                    flag: m.clubFlag || '🏳️',
                                    opponent: m.opponent,
                                    gf: m.gf,
                                    ga: m.ga
                                });
                            }
                        }} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-bold transition-colors cursor-pointer">
                                Edit
                              </button>)}
                            </td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>)}
              {/* 6. SUB-TAB VIEW C: TOURNAMENT BREAKDOWN CARDS */}
              {h2hSubTab === 'tournaments' && (() => {
                    // Sort tournaments by total ESL matches played descending
                    const sortedTournaments = [...distinctTournaments].sort((a, b) => {
                        const countA = allEslMatches.filter(m => m.competition.toLowerCase() === a.toLowerCase()).length;
                        const countB = allEslMatches.filter(m => m.competition.toLowerCase() === b.toLowerCase()).length;
                        return countB - countA;
                    });
                    return (<div className="space-y-4">
                    {/* Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                          <Trophy className="w-5 h-5"/>
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-slate-900 flex items-center space-x-2">
                            <span>ESL Tournament Breakdown</span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {sortedTournaments.length} Tournaments Active
                            </span>
                          </h4>
                          <p className="text-xs text-slate-500">
                            Performance metrics vs ESL clubs (ranks 1–92). Each leg of a two-legged tie counts as a match; one-off knockout ties are decided on penalties.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-600 shrink-0 tabular-nums">
                        <span className="font-bold text-slate-800">{totalEslMatches} <span className="font-semibold text-slate-500">Matches</span></span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-emerald-700">{totalEslWins}<span className="font-semibold">W</span></span>
                        {totalEslDraws > 0 && (<>
                            <span className="text-slate-300">•</span>
                            <span className="font-bold text-amber-700">{totalEslDraws}<span className="font-semibold">D</span></span>
                          </>)}
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-rose-600">{totalEslLosses}<span className="font-semibold">L</span></span>
                        <span className="text-slate-300">•</span>
                        <span className="font-black text-amber-700">{eslWinPct}% <span className="text-[11px] font-semibold text-slate-500">Overall</span></span>
                      </div>
                    </div>
                    {/* Tournament Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {sortedTournaments.map(compName => {
                            const compMatches = allEslMatches.filter(m => m.competition.toLowerCase() === compName.toLowerCase());
                            const cWon = compMatches.filter(m => m.isWin).length;
                            const cDrawn = compMatches.filter(m => m.isDraw).length;
                            const cLost = compMatches.filter(m => m.isLoss).length;
                            const cPlayed = compMatches.length;
                            const cWinRate = cPlayed > 0 ? (cWon / cPlayed) * 100 : 0;
                            const winPctBar = cPlayed > 0 ? (cWon / cPlayed) * 100 : 0;
                            const drawPctBar = cPlayed > 0 ? (cDrawn / cPlayed) * 100 : 0;
                            const lossPctBar = cPlayed > 0 ? (cLost / cPlayed) * 100 : 0;
                            const cGf = compMatches.reduce((acc, m) => acc + (m.gf || 0), 0);
                            const cGa = compMatches.reduce((acc, m) => acc + (m.ga || 0), 0);
                            const cGd = cGf - cGa;
                            const meta = CUP_METADATA[compName.toUpperCase()] || {
                                color: 'bg-slate-700',
                                text: 'text-slate-700',
                                bg: 'bg-slate-50',
                                border: 'border-slate-200',
                                tag: 'Cup Tournament'
                            };
                            const titlesWon = trophyCounts[compName.toUpperCase()] || trophyCounts[compName] || 0;
                            const pensInComp = compMatches.filter(m => m.penScore).length;
                            const penWinsInComp = compMatches.filter(m => m.penScore && m.isWin).length;
                            const penLossesInComp = compMatches.filter(m => m.penScore && m.isLoss).length;
                            return (<div key={compName} className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all p-5 flex flex-col justify-between group">
                            <div>
                              {/* Header: Trophy Icon Badge, Name, Tier Tag, Win Rate Pill */}
                              <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div className={`w-10 h-10 rounded-xl ${meta.bg || 'bg-amber-50'} border ${meta.border || 'border-amber-200'} flex items-center justify-center ${meta.text || 'text-amber-700'} shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                                    <Trophy className="w-5 h-5"/>
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                                      <h4 className="font-black text-sm text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                                        {compName}
                                      </h4>
                                      {titlesWon > 0 && (<span className="inline-flex items-center tabular-nums text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                                          {titlesWon} 🏆
                                        </span>)}
                                      {pensInComp > 0 && (<span className="inline-flex items-center tabular-nums text-[11px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0" title="Penalties contested">
                                          {pensInComp} PK{pensInComp > 1 ? 's' : ''} ({penWinsInComp}W–{penLossesInComp}L)
                                        </span>)}
                                    </div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5">
                                      {meta.tag || 'Tournament'}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="inline-block text-xs font-black tabular-nums px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                                    {cWinRate.toFixed(0)}% Win
                                  </span>
                                </div>
                              </div>
                              {/* Ratio Bar (Win, Draw, Loss) */}
                              <div className="mt-4 w-full h-2 rounded-full overflow-hidden bg-slate-100 flex" {...hv({ title: `${cWon}W - ${cDrawn}D - ${cLost}L` })}>
                                {winPctBar > 0 && (<div style={{ width: `${winPctBar}%` }} className="h-full bg-emerald-600 transition-all"/>)}
                                {drawPctBar > 0 && (<div style={{ width: `${drawPctBar}%` }} className="h-full bg-amber-400 transition-all"/>)}
                                {lossPctBar > 0 && (<div style={{ width: `${lossPctBar}%` }} className="h-full bg-rose-500 transition-all"/>)}
                              </div>
                              {/* Distinct Played / Won / Drawn / Lost Stat Blocks with breathing room */}
                              <div className="grid grid-cols-4 gap-2 mt-4">
                                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Played</span>
                                  <span className="text-base font-black tabular-nums text-slate-900 leading-tight mt-0.5 block">{cPlayed}</span>
                                </div>
                                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-2.5 text-center">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Won</span>
                                  <span className="text-base font-black tabular-nums text-emerald-700 leading-tight mt-0.5 block">{cWon}</span>
                                </div>
                                <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-2.5 text-center">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">Drawn</span>
                                  <span className="text-base font-black tabular-nums text-amber-700 leading-tight mt-0.5 block">{cDrawn}</span>
                                </div>
                                <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-2.5 text-center">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Lost</span>
                                  <span className="text-base font-black tabular-nums text-rose-600 leading-tight mt-0.5 block">{cLost}</span>
                                </div>
                              </div>
                              {/* Goals Scored & Conceded Summary Box */}
                              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-3.5">
                                  <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Scored</span>
                                    <span className="tabular-nums font-black text-slate-800 text-sm mt-0.5 block">{cGf} <span className="text-[11px] font-semibold text-slate-500">GF</span></span>
                                  </div>
                                  <div className="h-7 w-px bg-slate-200"/>
                                  <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Conceded</span>
                                    <span className="tabular-nums font-black text-slate-800 text-sm mt-0.5 block">{cGa} <span className="text-[11px] font-semibold text-slate-500">GA</span></span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Goal Diff</span>
                                  <span className={`tabular-nums font-black text-sm mt-0.5 block ${cGd >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                                    {cGd > 0 ? `+${cGd}` : cGd}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* Card Footer Quick Filter Links */}
                            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                              <button onClick={() => {
                                    setH2hTournamentFilter(compName);
                                    setH2hSubTab('byClub');
                                }} className="inline-flex items-center space-x-1 font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer text-xs">
                                <span>Filter {compName} Clubs</span>
                                <ChevronRight className="w-3.5 h-3.5"/>
                              </button>
                              <button onClick={() => {
                                    setH2hTournamentFilter(compName);
                                    setH2hSubTab('allMatches');
                                }} className="inline-flex items-center space-x-1 font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-[11px]">
                                <span>Matches Log (<span className="tabular-nums">{cPlayed}</span>)</span>
                                <ArrowUpRight className="w-3.5 h-3.5"/>
                              </button>
                            </div>
                          </div>);
                        })}
                    </div>
                  </div>);
                })()}
            </div>);
        })()}
        {/* VIEW 5: LEAGUES BATTLEGROUND */}
        {activeTab === 'leagues' && (<div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  League & Regional Dominance ({leaguesBreakdown.length} Leagues Tracked)
                </h3>
                <p className="text-xs text-slate-600">Complete performance records when facing clubs across all {leaguesBreakdown.length} international league systems</p>
              </div>
              <span className="text-xs text-slate-500">
                Click any league card to expand matches & fixture details underneath
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {leaguesBreakdown.map((lg, lgIdx) => {
                const isExpanded = expandedLeagueCode === lg.code;
                const openLgIdx = leaguesBreakdown.findIndex(x => x.code === expandedLeagueCode);
                const lgDrawerHere = lgIdx === drawerRowEnd(openLgIdx, leagueCols, leaguesBreakdown.length);
                const winPctBar = lg.played > 0 ? (lg.won / lg.played) * 100 : 0;
                const drawPctBar = lg.played > 0 ? (lg.drawn / lg.played) * 100 : 0;
                const lossPctBar = lg.played > 0 ? (lg.lost / lg.played) * 100 : 0;
                return (<React.Fragment key={lg.code}>
                    {/* League Card */}
                    <div onClick={() => setExpandedLeagueCode(isExpanded ? null : lg.code)} className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${isExpanded
                        ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'}`}>
                      <div>
                        {/* Header: Name, Code, Flags, Win Rate, Chevron */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center space-x-1.5 flex-wrap">
                              <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                                {lg.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <FlagList flags={lg.flags} size={18}/>
                              {lg.code && (<span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase" title="EA FC league slot">{lg.code}</span>)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5 shrink-0">
                            <span className="text-xs font-black tabular-nums px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                              {lg.winRate.toFixed(0)}% Win
                            </span>
                            <div className={`p-1 rounded-lg text-slate-400 group-hover:text-slate-700 transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-amber-600' : ''}`}>
                              <ChevronDown className="w-4 h-4"/>
                            </div>
                          </div>
                        </div>
                        {/* Ratio Bar */}
                        <div className="mt-3 w-full h-2 rounded-full overflow-hidden bg-slate-100 flex">
                          {winPctBar > 0 && (<div style={{ width: `${winPctBar}%` }} className="h-full bg-emerald-600 transition-all" {...hv({ title: `${lg.won} Wins (${winPctBar.toFixed(0)}%)` })}/>)}
                          {drawPctBar > 0 && (<div style={{ width: `${drawPctBar}%` }} className="h-full bg-amber-400 transition-all" {...hv({ title: `${lg.drawn} Draws (${drawPctBar.toFixed(0)}%)` })}/>)}
                          {lossPctBar > 0 && (<div style={{ width: `${lossPctBar}%` }} className="h-full bg-rose-500 transition-all" {...hv({ title: `${lg.lost} Losses (${lossPctBar.toFixed(0)}%)` })}/>)}
                        </div>
                      </div>
                      {/* Card Stats Footer */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="tabular-nums flex items-center space-x-1 text-slate-600">
                          <span className="font-bold text-slate-900">{lg.played}&nbsp;<span className="text-[11px] font-semibold text-slate-500">MP</span></span>
                          <span className="text-slate-300">•</span>
                          <span className="text-emerald-700 font-bold">{lg.won}<span className="text-[11px] font-semibold">W</span></span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 font-medium">{lg.drawn}<span className="text-[11px] font-semibold">D</span></span>
                          <span className="text-slate-300">•</span>
                          <span className="text-rose-600 font-bold">{lg.lost}<span className="text-[11px] font-semibold">L</span></span>
                        </div>
                        <div className="tabular-nums font-bold text-slate-700 text-[11px]">
                          {lg.gd > 0 ? `+${lg.gd}` : lg.gd} GD
                        </div>
                      </div>
                      {/* Interactive Expand Callout */}
                      <div className="mt-2 pt-1.5 border-t border-slate-100/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">
                          {isExpanded ? 'Click to collapse history' : 'Click to view matches'}
                        </span>
                        <span className="font-bold text-amber-700 group-hover:text-amber-800 flex items-center space-x-0.5">
                          <span>{isExpanded ? 'Hide Games' : `View ${lg.matches.length || lg.played} Games`}</span>
                          <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}/>
                        </span>
                      </div>
                    </div>
                    {/* In-Place Accordion Dropdown Section Underneath */}
                    {lgDrawerHere && ((lg) => (<div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-slate-50 rounded-2xl border border-amber-300/80 p-4 sm:p-5 shadow-xs space-y-3 animate-in fade-in duration-150">
                        {/* Dropdown Banner Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-3">
                          <div className="flex items-center space-x-2">
                            <Swords className="w-4 h-4 text-amber-600"/>
                            <h5 className="text-xs font-black uppercase tracking-wider text-slate-900">
                              Encounter History in {lg.name} <span className="text-slate-400 font-semibold">({lg.code})</span> • {lg.matches.length} Match{lg.matches.length !== 1 ? 'es' : ''}
                            </h5>
                          </div>
                          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              {lg.won}W - {lg.drawn}D - {lg.lost}L
                            </span>
                            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              GD: {lg.gd > 0 ? `+${lg.gd}` : lg.gd}
                            </span>
                            <button onClick={(e) => {
                            e.stopPropagation();
                            setExpandedLeagueCode(null);
                        }} className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer" title="Collapse details">
                              <X className="w-3.5 h-3.5"/>
                            </button>
                          </div>
                        </div>
                        {/* Matches List */}
                        {lg.matches.length === 0 ? (<div className="py-6 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                            No individual fixture rows found for this league.
                          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                            {lg.matches.map((m, mIdx) => (<MatchChip key={mIdx} m={m} showOpponent={true}/>))}
                          </div>)}
                      </div>))(leaguesBreakdown[openLgIdx])}
                  </React.Fragment>);
            })}
            </div>
          </div>)}
        {/* VIEW: COMPETITIONS BREAKDOWN (GROUNDED IN CUPS!HS:LX) */}
        {activeTab === 'competitions' && (() => {
            const { competitions, categorySummaries } = competitionsBreakdownData;
            // Filter competitions
            const filteredComps = competitions.filter(comp => {
                if (compCategoryFilter === 'Domestic' && comp.type !== 'Domestic')
                    return false;
                if (compCategoryFilter === 'International' && comp.type !== 'International')
                    return false;
                if (compCategoryFilter === 'One-Off' && comp.type !== 'One-Off')
                    return false;
                if (compSearch.trim()) {
                    const q = compSearch.toLowerCase();
                    const matchName = comp.name.toLowerCase().includes(q);
                    const matchKey = comp.key.toLowerCase().includes(q);
                    const matchCat = comp.category.toLowerCase().includes(q);
                    if (!matchName && !matchKey && !matchCat)
                        return false;
                }
                return true;
            });
            // Sort competitions
            filteredComps.sort((a, b) => {
                let res = 0;
                if (compSortBy === 'trophies') {
                    res = b.titles - a.titles || b.finalsCount - a.finalsCount || b.winRate - a.winRate;
                }
                else if (compSortBy === 'winRate') {
                    res = b.winRate - a.winRate || b.played - a.played;
                }
                else if (compSortBy === 'played') {
                    res = b.played - a.played || b.won - a.won;
                }
                else if (compSortBy === 'gd') {
                    res = b.gd - a.gd || b.gf - a.gf;
                }
                else if (compSortBy === 'finals') {
                    res = b.finalsCount - a.finalsCount || b.titles - a.titles;
                }
                return compSortAsc ? -res : res;
            });
            const activeContestedComps = competitions.filter(c => c.played > 0);
            const totalTitlesAll = competitions.reduce((sum, c) => sum + c.titles, 0);
            const totalFinalsAll = competitions.reduce((sum, c) => sum + c.finalsCount, 0);
            const totalAppsAll = competitions.reduce((sum, c) => sum + c.appearances, 0);
            const conversionRate = totalFinalsAll > 0 ? ((totalTitlesAll / totalFinalsAll) * 100).toFixed(1) : '0.0';
            return (<div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. HIGHLIGHTS (shared strip) */}
              <HighlightsBar accent="amber">
                <HighlightCard label="Titles / Finals" icon={Trophy} iconClassName="text-amber-400" value={`${totalTitlesAll} / ${totalFinalsAll}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight" left={`${conversionRate}% Finals Won`} right={`${activeContestedComps.length} Cups`} rightClassName="text-amber-300 font-bold"/>
                <HighlightCard label="Cup Runs" icon={Layers} iconClassName="text-sky-400" value={totalAppsAll} valueClassName="text-2xl sm:text-3xl font-black text-sky-300 tracking-tight" left={`${totalAppsAll > 0 ? ((totalTitlesAll / totalAppsAll) * 100).toFixed(1) : '0.0'}% Won`} leftClassName="text-sky-200 font-bold"/>
                <HighlightCard label={<>Domestic <RecordKey /></>} icon={Shield} iconClassName="text-emerald-400" value={`${categorySummaries.domestic.won}W - ${categorySummaries.domestic.drawn}D - ${categorySummaries.domestic.lost}L`} valueClassName="text-lg sm:text-xl font-black text-white tracking-tight whitespace-nowrap" left={`${categorySummaries.domestic.trophies} Trophies`} leftClassName="text-emerald-300 font-bold" right={`${categorySummaries.domestic.played} GP`} rightClassName="text-slate-300 font-normal"/>
                <HighlightCard label={<>Continental <RecordKey /></>} icon={Globe} iconClassName="text-blue-400" value={`${categorySummaries.international.won}W - ${categorySummaries.international.drawn}D - ${categorySummaries.international.lost}L`} valueClassName="text-lg sm:text-xl font-black text-white tracking-tight whitespace-nowrap" left={`${categorySummaries.international.trophies} Trophies`} leftClassName="text-blue-300 font-bold" right={`${categorySummaries.international.played} GP`} rightClassName="text-slate-300 font-normal"/>
                <HighlightCard label={<>Super Cups <RecordKey /></>} icon={Medal} iconClassName="text-rose-400" value={`${categorySummaries.superCups.won}W - ${categorySummaries.superCups.drawn}D - ${categorySummaries.superCups.lost}L`} valueClassName="text-lg sm:text-xl font-black text-white tracking-tight whitespace-nowrap" left={`${categorySummaries.superCups.trophies} Trophies`} leftClassName="text-rose-300 font-bold" right={`${categorySummaries.superCups.played} GP`} rightClassName="text-slate-300 font-normal" className="col-span-2 sm:col-span-1"/>
              </HighlightsBar>
              {/* 2. SUB-VIEW SELECTOR & FILTERS BAR (shared controls) */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Segmented value={compViewMode} onChange={setCompViewMode} options={[
                    { value: 'cards', label: 'Cards & Ribbons', icon: Layers },
                    { value: 'matrix', label: 'Comparison Matrix', icon: BarChart3 },
                    { value: 'trajectory', label: 'Season Trajectory', icon: History },
                ]}/>
                  <div className="text-xs text-slate-500 font-medium">
                    Showing <strong className="text-slate-800 tabular-nums">{filteredComps.length}</strong> Competitions
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <SearchInput accent="amber" className="min-w-[220px]" value={compSearch} onChange={setCompSearch} placeholder="Search tournament name..."/>
                    <Segmented value={compCategoryFilter} onChange={setCompCategoryFilter} options={[
                    { value: 'ALL', label: 'All' },
                    { value: 'Domestic', label: 'Domestic' },
                    { value: 'International', label: 'Continental' },
                    { value: 'One-Off', label: 'Super Cups' },
                ]}/>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={compSortBy} onChange={e => setCompSortBy(e.target.value)} className={SELECT_CLASS}>
                      <option value="trophies">Sort: Most Titles</option>
                      <option value="winRate">Sort: Win Rate %</option>
                      <option value="played">Sort: Matches Played</option>
                      <option value="gd">Sort: Goal Difference</option>
                      <option value="finals">Sort: Finals Reached</option>
                    </select>
                    <button onClick={() => setCompSortAsc(!compSortAsc)} className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700" title={`Sort direction: ${compSortAsc ? 'ascending' : 'descending'}`}>
                      <ArrowUpDown className="w-3.5 h-3.5"/>
                    </button>
                    <ResetButton disabled={!compSearch && compCategoryFilter === 'ALL' && compSortBy === 'trophies' && !compSortAsc} onClick={() => {
                    setCompSearch('');
                    setCompCategoryFilter('ALL');
                    setCompSortBy('trophies');
                    setCompSortAsc(false);
                }}/>
                  </div>
                </div>
              </div>
              {/* 3. SUB-VIEW A: COMPETITION CARDS WITH TRAJECTORY RIBBONS */}
              {compViewMode === 'cards' && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredComps.map(comp => {
                        const isExpanded = expandedCompKey === comp.key;
                        const winPctBar = comp.played > 0 ? (comp.won / comp.played) * 100 : 0;
                        const drawPctBar = comp.played > 0 ? (comp.drawn / comp.played) * 100 : 0;
                        const lossPctBar = comp.played > 0 ? (comp.lost / comp.played) * 100 : 0;
                        return (<div key={comp.key} className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-xs ${isExpanded
                                ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                                : 'border-slate-200 hover:border-slate-300'}`}>
                        <div>
                          {/* Card Top: Crest, Name, Category Pill, Win Rate Pill */}
                          <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                            <div className="flex items-center space-x-3 min-w-0">
                              <div className={`w-11 h-11 rounded-xl ${comp.bg || 'bg-amber-50'} border ${comp.border || 'border-amber-200'} flex items-center justify-center text-2xl shrink-0 shadow-2xs`}>
                                {comp.icon}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center space-x-2 flex-wrap">
                                  <h4 className="font-black text-base text-slate-900 truncate">
                                    {comp.name}
                                  </h4>
                                  <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                    {comp.category}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">
                                  {comp.desc}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="inline-block text-xs font-black tabular-nums px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {comp.winRate.toFixed(1)}% Win Rate
                              </span>
                              <div className="text-[11px] font-bold text-slate-400 mt-1">
                                {comp.titleConvRate.toFixed(0)}% Title Conversion
                              </div>
                            </div>
                          </div>
                          {/* 4-Metric Grid from Cups!HS:LX: Titles, Finals, Apps, KO Exits */}
                          <div className="grid grid-cols-4 gap-2.5 mt-4">
                            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">Titles Won</span>
                              <span className="text-xl font-black tabular-nums text-amber-900 leading-tight mt-0.5 block">{comp.titles} 🏆</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Finals</span>
                              <span className="text-xl font-black tabular-nums text-slate-900 leading-tight mt-0.5 block">{comp.finalsCount}</span>
                              <span className="text-[11px] text-slate-400 font-semibold">{comp.finalWinRate.toFixed(0)}% W</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Campaigns</span>
                              <span className="text-xl font-black tabular-nums text-slate-900 leading-tight mt-0.5 block">{comp.appearances}</span>
                              <span className="text-[11px] text-slate-400 font-semibold">Runs</span>
                            </div>
                            <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">KO Exits</span>
                              <span className="text-xl font-black tabular-nums text-rose-700 leading-tight mt-0.5 block">{comp.knockoutExits}</span>
                              <span className="text-[11px] text-rose-500 font-semibold">Exits</span>
                            </div>
                          </div>
                          {/* Record Strip & Tri-Color Ratio Bar */}
                          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1.5 tabular-nums text-slate-700">
                                <span className="font-bold text-slate-900">{comp.played} MP</span>
                                <span>•</span>
                                <span className="font-bold text-emerald-700">{comp.won}W</span>
                                <span>•</span>
                                <span className="font-medium text-amber-700">{comp.drawn}D</span>
                                <span>•</span>
                                <span className="font-bold text-rose-600">{comp.lost}L</span>
                              </div>
                              <div className="tabular-nums font-bold text-slate-700">
                                {comp.gf} GF - {comp.ga} GA (<span className={comp.gd >= 0 ? 'text-emerald-700' : 'text-rose-600'}>{comp.gd > 0 ? `+${comp.gd}` : comp.gd} GD</span>)
                              </div>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 flex">
                              {winPctBar > 0 && <div style={{ width: `${winPctBar}%` }} className="h-full bg-emerald-600 transition-all" {...hv({ title: `${comp.won} Wins` })}/>}
                              {drawPctBar > 0 && <div style={{ width: `${drawPctBar}%` }} className="h-full bg-amber-400 transition-all" {...hv({ title: `${comp.drawn} Draws` })}/>}
                              {lossPctBar > 0 && <div style={{ width: `${lossPctBar}%` }} className="h-full bg-rose-500 transition-all" {...hv({ title: `${comp.lost} Losses` })}/>}
                            </div>
                            {comp.penW > 0 || comp.penL > 0 ? (<div className="text-[11px] text-indigo-700 font-bold flex items-center justify-between pt-0.5">
                                <span>Penalty Shootouts:</span>
                                <span className="tabular-nums">{comp.penW} Wins – {comp.penL} Losses</span>
                              </div>) : comp.played > 0 ? (<div className="text-[11px] text-slate-400 font-medium flex items-center justify-between pt-0.5">
                                <span>Penalty Shootouts:</span>
                                <span>None (100% Regulation)</span>
                              </div>) : null}
                          </div>
                          {/* Heritage Milestones (Row 12 grounded) */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                            <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">First App</span>
                              <span className="font-bold text-slate-800 text-[11px] truncate block">{comp.firstApp}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">First Trophy</span>
                              <span className="font-bold text-amber-800 text-[11px] truncate block">{comp.firstWin}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Best Season</span>
                              <span className="font-bold text-slate-800 text-[11px] truncate block">{comp.bestSeason}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Avg Opp Rank</span>
                              <span className="font-bold text-slate-800 text-[11px] truncate block">
                                {comp.avgOppRank != null ? Number(comp.avgOppRank).toFixed(1) : '—'}
                              </span>
                            </div>
                          </div>
                          {/* Season-by-Season Trajectory Ribbon */}
                          <div className="mt-3.5 pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                                <History className="w-3 h-3 text-slate-400"/>
                                <span>{seasonsList.length}-Season Trajectory Ribbon</span>
                              </span>
                              <span className="text-[11px] text-slate-400">{seasonsList.length ? `S${seasonsList[0]} through S${seasonsList[seasonsList.length - 1]}` : ''}</span>
                            </div>
                            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(1, comp.trajectory.length)}, minmax(0, 1fr))` }}>
                              {comp.trajectory.map(item => {
                                const isChamp = item.isWon;
                                const isFinal = item.result === 'FINAL';
                                const isSemi = (item.result || '').includes('SEMI');
                                const isExit = item.played && !isChamp && !isFinal && !isSemi;
                                return (<div key={item.season} className={`py-1 px-0.5 rounded text-center text-[11px] font-bold transition-all ${!item.played
                                        ? 'bg-slate-100 text-slate-400'
                                        : isChamp
                                            ? 'bg-amber-400 text-slate-950 ring-1 ring-amber-500 font-black'
                                            : isFinal
                                                ? 'bg-slate-300 text-slate-800 font-bold'
                                                : isSemi
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : isExit
                                                        ? 'bg-rose-100 text-rose-800'
                                                        : 'bg-slate-200 text-slate-700'}`} {...hv({ title: item.played ? `Season ${item.season}: item.result({item.record})` : `Season ${item.season}: Not Entered` })}>
                                    <div className="text-[11px] opacity-75 leading-none">S{item.season}</div>
                                    <div className="leading-tight mt-0.5">
                                      {item.isWon ? '🏆' : item.played ? (isFinal ? '🥈' : isSemi ? 'SF' : 'KO') : '—'}
                                    </div>
                                  </div>);
                            })}
                            </div>
                          </div>
                        </div>
                        {/* Card Footer & Accordion Toggle */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button onClick={() => {
                                setSelectedCompetition(comp.key);
                                setActiveTab('campaigns');
                            }} className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                            <span>Inspect Campaigns</span>
                            <ArrowUpRight className="w-3.5 h-3.5"/>
                          </button>
                          <button onClick={() => setExpandedCompKey(isExpanded ? null : comp.key)} className="inline-flex items-center space-x-1 text-xs font-black text-amber-700 hover:text-amber-800 transition-colors cursor-pointer">
                            <span>{isExpanded ? 'Hide Details' : `View ${comp.campaigns.length} Runs`}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                          </button>
                        </div>
                        {/* In-Place Expanded Details (Campaigns, Finals, Nemeses) */}
                        {isExpanded && (<div className="mt-4 pt-3 border-t border-amber-300/80 space-y-3 animate-in fade-in duration-150">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-black uppercase tracking-wider text-slate-900">
                                Complete {comp.name} Campaign Log ({comp.campaigns.length} Season Runs)
                              </h5>
                              <span className="text-[11px] text-slate-500 font-medium">Click a campaign to inspect match bracket</span>
                            </div>
                            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                              {comp.campaigns.map(camp => (<div key={camp.rowIndex} onClick={() => {
                                        setSelectedCampaignIndex(camp.rowIndex);
                                        setActiveTab('campaigns');
                                    }} className="p-2.5 rounded-xl border bg-slate-50 hover:bg-white hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between text-xs">
                                  <div className="flex items-center space-x-2.5">
                                    <span className={`px-2 py-0.5 rounded text-[11px] font-black ${camp.isWrexhamWon ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-800'}`}>
                                      Season {camp.season}
                                    </span>
                                    <div>
                                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                                        <span>{camp.result}</span>
                                        {camp.isWrexhamWon && <span>🏆</span>}
                                      </div>
                                      <div className="text-[11px] text-slate-500">
                                        Winner: {camp.winner} • Entered: {camp.roundEntered}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold tabular-nums text-slate-800">
                                      {camp.trueW}W - {camp.trueD}D - {camp.trueL}L
                                    </div>
                                    <div className="text-[11px] text-slate-500 tabular-nums">
                                      {formatGoals(camp.gf)}:{formatGoals(camp.ga)} ({camp.gd > 0 ? `+${formatGoals(camp.gd)}` : formatGoals(camp.gd)})
                                    </div>
                                  </div>
                                </div>))}
                            </div>
                            {/* Finals in this competition */}
                            {comp.finals.length > 0 && (<div className="mt-3 pt-2.5 border-t border-slate-100">
                                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                                  Contested Finals in {comp.name} ({comp.finals.length})
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {comp.finals.map(fin => (<div key={fin.fNum} className={`p-2 rounded-lg border text-xs flex items-center justify-between ${fin.isWon ? 'bg-amber-50/70 border-amber-300' : 'bg-rose-50/70 border-rose-200'}`}>
                                      <div className="flex items-center space-x-2">
                                        <Flag emoji={fin.flag} size={20}/>
                                        <div>
                                          <div className="font-bold text-slate-900">{fin.opponent}</div>
                                          <div className="text-[11px] text-slate-500">S{fin.season} ({fin.year})</div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <span className="tabular-nums font-black text-slate-900">{fin.score}</span>
                                        <div className={`text-[11px] font-black uppercase ${fin.isWon ? 'text-amber-800' : 'text-rose-700'}`}>
                                          {fin.isWon ? 'CHAMPIONS 🏆' : 'RUNNER-UP'}
                                        </div>
                                      </div>
                                    </div>))}
                                </div>
                              </div>)}
                          </div>)}
                      </div>);
                    })}
                </div>)}
              {/* 4. SUB-VIEW B: COMPARATIVE MATRIX TABLE */}
              {compViewMode === 'matrix' && (<div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-black text-sm text-slate-900">
                        Tournament Performance Matrix
                      </h4>
                      <p className="text-xs text-slate-500">
                        Cross-comparison of all competitions across titles, finals, win rates, goal metrics, and records.
                      </p>
                    </div>
                    <div className="text-xs text-slate-500">
                      Click any row to jump into that competition
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Tournament</th>
                          <th className="px-3 py-3">Type</th>
                          <th className="px-3 py-3 text-center">Titles</th>
                          <th className="px-3 py-3 text-center">Finals</th>
                          <th className="px-3 py-3 text-center">Apps</th>
                          <th className="px-3 py-3 text-center">Win Rate</th>
                          <th className="px-3 py-3 text-center">Record (W-D-L)</th>
                          <th className="px-3 py-3 text-center">Goals (GF:GA)</th>
                          <th className="px-3 py-3 text-center">GD</th>
                          <th className="px-3 py-3 text-center">Shootouts</th>
                          <th className="px-3 py-3 text-center">First Title</th>
                          <th className="px-3 py-3 text-center">Best Season</th>
                          <th className="px-3 py-3 text-center">Avg Opp Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {filteredComps.map(comp => (<tr key={comp.key} onClick={() => {
                            setSelectedCompetition(comp.key);
                            setActiveTab('campaigns');
                        }} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                            <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-base">{comp.icon}</span>
                                <span>{comp.name}</span>
                              </div>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                {comp.type}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 tabular-nums">
                                {comp.titles} 🏆
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-800 whitespace-nowrap">
                              {comp.finalsCount}
                            </td>
                            <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-700 whitespace-nowrap">
                              {comp.appearances}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 tabular-nums">
                                {comp.winRate.toFixed(0)}%
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-800 whitespace-nowrap">
                              {comp.won}W - {comp.drawn}D - {comp.lost}L
                            </td>
                            <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-700 whitespace-nowrap">
                              {comp.gf} : {comp.ga}
                            </td>
                            <td className="px-3 py-3 text-center font-black tabular-nums whitespace-nowrap">
                              <span className={comp.gd >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                                {comp.gd > 0 ? `+${comp.gd}` : comp.gd}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                              {comp.penW > 0 || comp.penL > 0 ? (<span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 tabular-nums">
                                  {comp.penW}W – {comp.penL}L
                                </span>) : (<span className="text-slate-300">—</span>)}
                            </td>
                            <td className="px-3 py-3 text-center text-slate-700 font-semibold whitespace-nowrap">
                              {comp.firstWin}
                            </td>
                            <td className="px-3 py-3 text-center text-slate-700 font-semibold whitespace-nowrap">
                              {comp.bestSeason}
                            </td>
                            <td className="px-3 py-3 text-center font-bold tabular-nums text-slate-600 whitespace-nowrap">
                              {comp.avgOppRank != null ? Number(comp.avgOppRank).toFixed(1) : '—'}
                            </td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>)}
              {/* 5. SUB-VIEW C: DYNASTY TRAJECTORY CROSS-GRID (SEASON BY TOURNAMENT) */}
              {compViewMode === 'trajectory' && (<div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-black text-sm text-slate-900">
                        Dynasty Tournament Trajectory Grid ({seasonsList.length ? `Seasons ${seasonsList[0]}–${seasonsList[seasonsList.length - 1]}` : 'No seasons yet'})
                      </h4>
                      <p className="text-xs text-slate-500">
                        Visual finish for every cup in every season{gridQuintupleSeasons.length ? `, highlighting the Quintuple Era (${seasonListText(gridQuintupleSeasons)})` : ''}.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-semibold">
                      <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span><span>Champion</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-slate-300"></span><span>Finalist</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-blue-200"></span><span>Semi</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-rose-200"></span><span>Exit</span></span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Season</th>
                          {competitions.filter(c => c.played > 0).map(c => (<th key={c.key} className="px-3 py-3 text-center">
                              {c.name}
                            </th>))}
                          <th className="px-4 py-3 text-right">Season Trophies</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {seasonsList.map(s => {
                        const sCampaigns = campaigns.filter(c => c.season === s);
                        const sTrophies = sCampaigns.filter(c => c.isWrexhamWon).length;
                        const isQuintuple = sTrophies >= 5;
                        return (<tr key={s} onClick={() => {
                                setSelectedSeason(String(s));
                                setActiveTab('campaigns');
                            }} className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${isQuintuple ? 'bg-amber-50/40' : ''}`}>
                              <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-0.5 rounded text-[11px] font-black ${isQuintuple ? 'bg-amber-400 text-slate-950 shadow-2xs' : 'bg-slate-900 text-white'}`}>
                                    Season {s}
                                  </span>
                                  <span className="text-[11px] text-slate-500 font-normal">
                                    {sCampaigns[0]?.year}
                                  </span>
                                </div>
                              </td>
                              {competitions.filter(c => c.played > 0).map(comp => {
                                const tr = comp.trajectory.find(t => t.season === s);
                                if (!tr || !tr.played) {
                                    return (<td key={comp.key} className="px-3 py-3 text-center text-slate-300">
                                      —
                                    </td>);
                                }
                                const isWon = tr.isWon;
                                const isFinal = tr.result === 'FINAL';
                                const isSemi = (tr.result || '').includes('SEMI');
                                return (<td key={comp.key} className="px-3 py-3 text-center whitespace-nowrap">
                                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-black ${isWon
                                        ? 'bg-amber-400 text-slate-950 ring-1 ring-amber-500 shadow-2xs'
                                        : isFinal
                                            ? 'bg-slate-200 text-slate-800'
                                            : isSemi
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                                      {isWon && <span>🏆</span>}
                                      <span>{isWon ? 'WON' : tr.result}</span>
                                    </span>
                                  </td>);
                            })}
                              <td className="px-4 py-3 text-right whitespace-nowrap">
                                {sTrophies > 0 ? (<span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-black tabular-nums ${isQuintuple
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xs'
                                    : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                                    <span>{sTrophies} Cup{sTrophies === 1 ? '' : 's'}</span>
                                    {isQuintuple && <span>👑</span>}
                                  </span>) : (<span className="text-slate-400 text-xs">0 Cups</span>)}
                              </td>
                            </tr>);
                    })}
                      </tbody>
                    </table>
                  </div>
                </div>)}
            </div>);
        })()}
        {/* VIEW 6: TROPHY CABINET */}
        {SHOW_LAB && activeTab === 'lab' && (<LabBoundary>
            <CupsLab campaigns={campaigns} formData={formData} rounds={KNOCKOUT_ROUNDS} helpers={{ compName, compShort, openRivalry }}/>
          </LabBoundary>)}
        {activeTab === 'timeline' && (() => {
            // Winning campaigns list
            const winningCampaigns = campaigns.filter(c => c.isWrexhamWon);
            // Calculate category totals
            const continentalTrophies = winningCampaigns.filter(c => ['CHAMPIONS LEAGUE', 'EUROPA LEAGUE', 'CONFERENCE LEAGUE'].some(x => c.competition.toUpperCase().includes(x))).length;
            const domesticMajorTrophies = winningCampaigns.filter(c => ['FA CUP', 'CARABAO CUP', 'BSM TROPHY'].some(x => c.competition.toUpperCase().includes(x))).length;
            const superCupTrophies = winningCampaigns.filter(c => ['COMMUNITY SHIELD', 'SUPER CUP'].some(x => c.competition.toUpperCase().includes(x))).length;
            // Quintuple seasons (Seasons with 5 trophies)
            const quintupleSeasons = seasonsList.filter(s => {
                return campaigns.filter(c => c.season === s && c.isWrexhamWon).length >= 5;
            });
            const quintupleTrophyCount = campaigns.filter(c => quintupleSeasons.includes(c.season) && c.isWrexhamWon).length;
            // "4x UCL • 2x Europa League" from the trophy counts (only cups actually won)
            const trophyBreakdownText = (pairs) => pairs
                .map(([key, label]) => [winningCampaigns.filter(c => String(c.competition).toUpperCase().includes(key)).length, label])
                .filter(([n]) => n > 0)
                .map(([n, label]) => `${n}x ${label}`)
                .join(' • ') || 'None yet';
            // Aggregate total goals scored in trophy winning campaigns
            const winningCampaignsGf = winningCampaigns.reduce((acc, c) => acc + (c.gf || 0), 0);
            const winningCampaignsGa = winningCampaigns.reduce((acc, c) => acc + (c.ga || 0), 0);
            // Unique trophies aggregated by Competition for Silverware Hall
            const distinctTrophyTypes = [
                { key: 'FA CUP', name: 'FA Cup', type: 'Domestic Major', icon: '🏆', border: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-800', desc: 'Historic English Cup' },
                { key: 'CARABAO CUP', name: 'Carabao Cup', type: 'Domestic League Cup', icon: '🏆', border: 'border-teal-300', bg: 'bg-teal-50', text: 'text-teal-800', desc: 'EFL League Cup' },
                { key: 'COMMUNITY SHIELD', name: 'Community Shield', type: 'Super Cup', icon: '🛡️', border: 'border-rose-300', bg: 'bg-rose-50', text: 'text-rose-800', desc: 'English Season Opener' },
                { key: 'CHAMPIONS LEAGUE', name: 'Champions League', type: 'European Elite', icon: '🏆', border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-800', desc: 'European Pinnacle' },
                { key: 'SUPER CUP', name: 'UEFA Super Cup', type: 'European Super Cup', icon: '🛡️', border: 'border-indigo-300', bg: 'bg-indigo-50', text: 'text-indigo-800', desc: 'UEFA Continental Super Cup' },
                { key: 'EUROPA LEAGUE', name: 'Europa League', type: 'European Secondary', icon: '🏆', border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-800', desc: 'UEFA Secondary Cup' },
                { key: 'BSM TROPHY', name: 'BSM Trophy', type: 'Lower League Trophy', icon: '🏆', border: 'border-slate-300', bg: 'bg-slate-100', text: 'text-slate-800', desc: 'EFL Trophy' }
            ].map(cup => {
                const wins = winningCampaigns.filter(c => c.competition.toUpperCase().includes(cup.key));
                const wonSeasons = wins.map(w => w.season).sort((a, b) => a - b);
                const compFinals = finals.filter(f => f.comp.toUpperCase().includes(cup.key));
                const finalsW = compFinals.filter(f => f.isWon).length;
                const finalsL = compFinals.filter(f => !f.isWon).length;
                return {
                    ...cup,
                    count: wins.length,
                    seasons: wonSeasons,
                    finalsPlayed: compFinals.length,
                    finalsW,
                    finalsL
                };
            }).filter(cup => cup.count > 0);
            // Build season-by-season shelves
            const seasonShelves = seasonsList.map(s => {
                const sCamps = campaigns.filter(c => c.season === s);
                const trophies = sCamps.filter(c => c.isWrexhamWon);
                const year = sCamps[0]?.year || `Season ${s}`;
                const sPlayed = sCamps.reduce((acc, c) => acc + (c.played || 0), 0);
                const sWon = sCamps.reduce((acc, c) => acc + (c.trueW || 0), 0);
                const sDrawn = sCamps.reduce((acc, c) => acc + (c.trueD || 0), 0);
                const sLost = sCamps.reduce((acc, c) => acc + (c.trueL || 0), 0);
                const sGf = sCamps.reduce((acc, c) => acc + (c.gf || 0), 0);
                const sGa = sCamps.reduce((acc, c) => acc + (c.ga || 0), 0);
                let haulBadge = null;
                if (trophies.length === 5) {
                    haulBadge = { text: '👑 THE QUINTUPLE (5 TROPHIES)', bg: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xs' };
                }
                else if (trophies.length === 3) {
                    haulBadge = { text: '🏆 THE TREBLE (3 TROPHIES)', bg: 'bg-amber-100 text-amber-900 border border-amber-300' };
                }
                else if (trophies.length === 2) {
                    haulBadge = { text: '🏆 THE DOUBLE (2 TROPHIES)', bg: 'bg-emerald-100 text-emerald-900 border border-emerald-300' };
                }
                else if (trophies.length === 1) {
                    haulBadge = { text: '🏆 1 TROPHY WON', bg: 'bg-slate-200 text-slate-800' };
                }
                // Map each trophy to its final match details
                const trophyDetails = trophies.map(camp => {
                    const compKey = camp.competition.toUpperCase();
                    const finalMatch = finals.find(f => f.season === camp.season && (f.comp.toUpperCase() === compKey || compKey.includes(f.comp.toUpperCase())));
                    const finalRnd = camp.rounds.find(r => r.key === 'F' || r.name.toLowerCase().includes('final'));
                    const opponent = finalMatch?.opponent || finalRnd?.opponent || camp.winner || 'Opponent';
                    const flag = finalMatch?.flag || finalRnd?.flag || '🏳️';
                    const score = finalMatch?.score || (finalRnd?.gf != null && finalRnd?.ga != null ? `${finalRnd.gf} – ${finalRnd.ga}` : 'WIN');
                    const cleanSheet = (finalMatch?.ga === 0) || (finalRnd?.ga === 0);
                    const penScore = finalMatch ? null : finalRnd?.penScore;
                    const meta = CUP_METADATA[compKey] || { type: 'Cup' };
                    return {
                        campaign: camp,
                        competition: camp.competition,
                        trophyIcon: camp.trophyIcon || (compKey.includes('SHIELD') || compKey.includes('SUPER CUP') ? '🛡️' : '🏆'),
                        opponent,
                        flag,
                        score,
                        cleanSheet,
                        penScore,
                        type: meta.type,
                        record: `${camp.trueW}W ${camp.trueD}D ${camp.trueL}L`,
                        goals: `${formatGoals(camp.gf)}–${formatGoals(camp.ga)}`
                    };
                });
                return {
                    season: s,
                    year,
                    trophies: trophyDetails,
                    haulBadge,
                    stats: {
                        played: sPlayed,
                        won: sWon,
                        drawn: sDrawn,
                        lost: sLost,
                        gf: sGf,
                        ga: sGa
                    }
                };
            });
            // Filter shelves
            const filteredShelves = seasonShelves.filter(shelf => {
                if (cabinetSeasonFilter !== 'ALL' && shelf.season !== Number(cabinetSeasonFilter))
                    return false;
                if (cabinetCategoryFilter === 'QUINTUPLE' && shelf.trophies.length < 5)
                    return false;
                if (cabinetCategoryFilter === 'CONTINENTAL' && !shelf.trophies.some(t => t.type === 'International'))
                    return false;
                if (cabinetCategoryFilter === 'DOMESTIC' && !shelf.trophies.some(t => t.type === 'Domestic'))
                    return false;
                if (cabinetCategoryFilter === 'SUPERCUP' && !shelf.trophies.some(t => t.type === 'One-Off'))
                    return false;
                if (cabinetSearchQuery.trim()) {
                    const q = cabinetSearchQuery.toLowerCase();
                    const matchSeason = shelf.year.toLowerCase().includes(q) || `season ${shelf.season}`.includes(q);
                    const matchTrophy = shelf.trophies.some(t => t.competition.toLowerCase().includes(q) || t.opponent.toLowerCase().includes(q));
                    if (!matchSeason && !matchTrophy)
                        return false;
                }
                return true;
            });
            return (<div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. HIGHLIGHTS (shared strip) */}
              <HighlightsBar accent="amber">
                <HighlightCard label="Total Silverware" icon={Trophy} iconClassName="text-amber-400" value={totalCupsWon} valueClassName="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight" left={`${playedSeasons.length} Season${playedSeasons.length === 1 ? '' : 's'}`} right={`${finalsStats.won}/${finals.length} Finals Won`} rightClassName="text-amber-300 font-bold"/>
                <HighlightCard label="Quintuple Seasons" icon={Sparkles} iconClassName="text-yellow-300" value={`${quintupleSeasons.length}x`} valueClassName="text-2xl sm:text-3xl font-black text-yellow-200 tracking-tight" left={quintupleSeasons.length ? quintupleSeasons.map(sn => 'S' + sn).join(', ') : 'None yet'} leftClassName="text-yellow-200 font-bold" right={`${quintupleTrophyCount} Trophies`} rightClassName="text-slate-300 font-normal"/>
                <HighlightCard label="European" icon={Globe} iconClassName="text-blue-400" value={continentalTrophies} valueClassName="text-2xl sm:text-3xl font-black text-blue-200 tracking-tight" left={trophyBreakdownText([['CHAMPIONS LEAGUE', 'UCL'], ['EUROPA LEAGUE', 'UEL'], ['CONFERENCE LEAGUE', 'UECL']])} leftClassName="text-blue-200 font-bold"/>
                <HighlightCard label="Domestic" icon={Shield} iconClassName="text-emerald-400" value={domesticMajorTrophies} valueClassName="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight" left={trophyBreakdownText([['FA CUP', 'FA'], ['CARABAO CUP', 'Carabao'], ['BSM TROPHY', 'BSM']])} leftClassName="text-emerald-300 font-bold"/>
                <HighlightCard label="Super Cups" icon={Medal} iconClassName="text-rose-400" value={superCupTrophies} valueClassName="text-2xl sm:text-3xl font-black text-rose-300 tracking-tight" left={trophyBreakdownText([['COMMUNITY SHIELD', 'Shield'], ['SUPER CUP', 'UEFA Super']])} leftClassName="text-rose-300 font-bold" className="col-span-2 sm:col-span-1"/>
              </HighlightsBar>
              {/* 2. THE SILVERWARE COLLECTION BY COMPETITION (HALL OF CUPS) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-amber-600"/>
                      <span>Silverware Collection by Competition</span>
                    </h3>
                    <p className="text-xs text-slate-500">Every cup lifted by {CLUB_DISPLAY_NAME} and its championship pedigree</p>
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    {distinctTrophyTypes.length} Distinct Competitions Won
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                  {distinctTrophyTypes.map(cup => (<div key={cup.key} className={`p-3.5 rounded-xl border ${cup.border} ${cup.bg} flex flex-col justify-between transition-all hover:shadow-xs group`}>
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {cup.icon}
                          </span>
                          <span className={`text-xs font-black tabular-nums px-2 py-0.5 rounded-full bg-white shadow-2xs ${cup.text}`}>
                            {cup.count}x
                          </span>
                        </div>
                        <h4 className="font-black text-xs text-slate-900 mt-2 truncate" title={cup.name}>
                          {cup.name}
                        </h4>
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {cup.type}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/60">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Seasons Won
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cup.seasons.map(s => (<span key={s} className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-200/80 shadow-2xs tabular-nums">
                              S{s}
                            </span>))}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                          Finals: <strong className="text-slate-800 tabular-nums">{cup.finalsW}W - {cup.finalsL}L</strong>
                        </div>
                      </div>
                    </div>))}
                </div>
              </div>
              {/* 3. CABINET FILTER CONTROLS BAR (shared controls) */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Segmented value={cabinetCategoryFilter} onChange={setCabinetCategoryFilter} options={[
                    { value: 'ALL', label: `All (${totalCupsWon})` },
                    ...(quintupleSeasons.length ? [{ value: 'QUINTUPLE', label: `Quintuple Era (${quintupleSeasons.map(sn => 'S' + sn).join(', ')})` }] : []),
                    { value: 'CONTINENTAL', label: `European (${continentalTrophies})` },
                    { value: 'DOMESTIC', label: `Domestic (${domesticMajorTrophies})` },
                    { value: 'SUPERCUP', label: `Super Cups (${superCupTrophies})` },
                ]}/>
                  <select value={cabinetSeasonFilter} onChange={e => setCabinetSeasonFilter(e.target.value)} className={SELECT_CLASS}>
                    <option value="ALL">All Seasons</option>
                    {seasonsList.map(sn => (<option key={sn} value={sn}>Season {sn}</option>))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <SearchInput accent="amber" className="min-w-[220px]" value={cabinetSearchQuery} onChange={setCabinetSearchQuery} placeholder="Search trophy or opponent..."/>
                  <ResetButton disabled={cabinetCategoryFilter === 'ALL' && cabinetSeasonFilter === 'ALL' && !cabinetSearchQuery} onClick={() => {
                    setCabinetCategoryFilter('ALL');
                    setCabinetSeasonFilter('ALL');
                    setCabinetSearchQuery('');
                }}/>
                </div>
              </div>
              {/* 4. SEASON-BY-SEASON TROPHY SHELVES */}
              <div className="space-y-6">
                {filteredShelves.length === 0 ? (<div className="py-12 text-center bg-white rounded-2xl border border-slate-200">
                    <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2"/>
                    <p className="text-sm font-bold text-slate-800">No trophies match your current filters</p>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the category filter to "All Silverware".</p>
                  </div>) : (filteredShelves.map(shelf => {
                    const hasTrophies = shelf.trophies.length > 0;
                    return (<div key={shelf.season} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                        {/* Shelf Header Bar */}
                        <div className="px-5 py-3 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800">
                          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black tabular-nums text-xs">
                              Season {shelf.season}
                            </span>
                            <span className="text-xs font-semibold tabular-nums text-slate-300">
                              {shelf.year}
                            </span>
                            {shelf.haulBadge && (<span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${shelf.haulBadge.bg}`}>
                                {shelf.haulBadge.text}
                              </span>)}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-slate-400 tabular-nums">
                            <span>
                              Season Record: <strong className="text-white">{shelf.stats.won}W - {shelf.stats.drawn}D - {shelf.stats.lost}L</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Goals: <strong className="text-amber-300">{formatGoals(shelf.stats.gf)}:{formatGoals(shelf.stats.ga)}</strong>
                            </span>
                          </div>
                        </div>
                        {/* Shelf Surface (Trophies Display) */}
                        <div className="p-5 bg-gradient-to-b from-slate-50 to-amber-50/20">
                          {!hasTrophies ? (<div className="py-6 text-center text-xs text-slate-400 italic">
                              No cup silverware won in Season {shelf.season}.
                            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
                              {shelf.trophies.map((trophy, tIdx) => (<div key={tIdx} onClick={() => {
                                    setSelectedCampaignIndex(trophy.campaign.rowIndex);
                                    setActiveTab('campaigns');
                                }} className="bg-white rounded-xl border border-amber-300/80 hover:border-amber-500 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden" title="Click to inspect this cup campaign run">
                                  {/* Top accent glow */}
                                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"/>
                                  <div>
                                    {/* Cup Crest and Tier */}
                                    <div className="flex items-start justify-between">
                                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-2xs">
                                        {trophy.trophyIcon}
                                      </div>
                                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                        CHAMPION
                                      </span>
                                    </div>
                                    {/* Competition Name */}
                                    <h4 className="font-black text-sm text-slate-900 mt-2.5 group-hover:text-amber-700 transition-colors leading-snug">
                                      {trophy.competition}
                                    </h4>
                                    <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                                      {trophy.type}
                                    </span>
                                    {/* Final Match Details */}
                                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                                        <span>The Final Match</span>
                                        {trophy.cleanSheet && (<span className="text-emerald-700 font-black">Clean Sheet</span>)}
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Flag emoji={trophy.flag} size={22}/>
                                        <div className="min-w-0 flex-1">
                                          <div className="font-black text-slate-900 truncate" title={trophy.opponent}>
                                            {trophy.opponent}
                                          </div>
                                        </div>
                                        <div className="tabular-nums font-black text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs shrink-0">
                                          {trophy.score}
                                        </div>
                                      </div>
                                      {trophy.penScore && (<div className="mt-1 text-[11px] tabular-nums font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-center">
                                          pens {trophy.penScore}
                                        </div>)}
                                    </div>
                                  </div>
                                  {/* Card Footer: Campaign Stats & Inspect Action */}
                                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                                    <span className="text-slate-500 tabular-nums font-semibold">
                                      Run: <strong className="text-slate-800">{trophy.record}</strong>
                                    </span>
                                    <span className="font-bold text-amber-700 group-hover:text-amber-800 flex items-center space-x-0.5">
                                      <span>Inspect</span>
                                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"/>
                                    </span>
                                  </div>
                                </div>))}
                            </div>)}
                        </div>
                      </div>);
                }))}
              </div>
            </div>);
        })()}
      </main>
      {/* 4. MODAL: EDIT CAMPAIGN DIALOG */}
      {editingCampaign && (<div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-lg p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-amber-500"/>
                <span>Edit Campaign: {editingCampaign.competition}</span>
              </h3>
              <button onClick={() => setEditingCampaign(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveCampaign(editingCampaign);
            }} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Competition Name</label>
                  <input type="text" value={editingCampaign.competition} onChange={e => setEditingCampaign({ ...editingCampaign, competition: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800" required/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Result</label>
                  <select value={editingCampaign.result} onChange={e => setEditingCampaign({ ...editingCampaign, result: e.target.value, isWrexhamWon: e.target.value === 'CHAMPIONS' })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800">
                    <option value="CHAMPIONS">CHAMPIONS</option>
                    <option value="FINAL">FINAL</option>
                    <option value="SEMI - FINAL">SEMI - FINAL</option>
                    <option value="QTR - FINAL">QTR - FINAL</option>
                    <option value="RO - 16">RO - 16</option>
                    <option value="RO - 32">RO - 32</option>
                    <option value="QUALIFIER 1">QUALIFIER 1</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Winner</label>
                  <input type="text" value={editingCampaign.winner} onChange={e => setEditingCampaign({ ...editingCampaign, winner: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Matches Played</label>
                  <input type="number" value={editingCampaign.played} onChange={e => setEditingCampaign({ ...editingCampaign, played: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Wins</label>
                  <input type="number" value={editingCampaign.trueW} onChange={e => setEditingCampaign({ ...editingCampaign, trueW: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Draws</label>
                  <input type="number" value={editingCampaign.trueD} onChange={e => setEditingCampaign({ ...editingCampaign, trueD: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Losses</label>
                  <input type="number" value={editingCampaign.trueL} onChange={e => setEditingCampaign({ ...editingCampaign, trueL: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Goals For (GF)</label>
                  <input type="number" value={editingCampaign.gf} onChange={e => setEditingCampaign({ ...editingCampaign, gf: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Goals Against (GA)</label>
                  <input type="number" value={editingCampaign.ga} onChange={e => setEditingCampaign({ ...editingCampaign, ga: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingCampaign(null)} className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>)}
      {/* 5. MODAL: EDIT MATCH DIALOG */}
      {editingMatch && (<div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-md p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500"/>
                <span>Edit Match: {editingMatch.name}</span>
              </h3>
              <button onClick={() => setEditingMatch(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveMatch(editingMatch.campaignRowIndex, editingMatch);
            }} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Result Status</label>
                  <select value={editingMatch.status} onChange={e => setEditingMatch({ ...editingMatch, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800">
                    <option value="W">W (Win)</option>
                    <option value="C">C (Champions / Won Final)</option>
                    <option value="L">L (Loss)</option>
                    <option value="D">D (Draw)</option>
                    <option value="x">x (Unplayed / N/A)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Opponent Flag</label>
                  <input type="text" value={editingMatch.flag} onChange={e => setEditingMatch({ ...editingMatch, flag: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800 text-center text-base" placeholder="🇪🇸"/>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Opponent Name</label>
                <input type="text" value={editingMatch.opponent} onChange={e => setEditingMatch({ ...editingMatch, opponent: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800" placeholder="e.g. REAL MADRID" required/>
              </div>
              {editingMatch.isGroupStage && (<div>
                  <label className="font-bold text-slate-700 block mb-1">Fixture Venue (Home / Away)</label>
                  <select value={editingMatch.homeAway || 'H'} onChange={e => setEditingMatch({ ...editingMatch, homeAway: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800">
                    <option value="H">Home (H)</option>
                    <option value="A">Away (A)</option>
                  </select>
                </div>)}
              {editingMatch.isTwoLegs ? (<div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                    <span>2-Legged Tie Scores</span>
                    <span className="text-blue-600 font-black">AGG: {editingMatch.gf ?? 0} – {editingMatch.ga ?? 0}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-600 block mb-0.5 text-[11px] uppercase">Leg 1 (Wrexham)</label>
                      <input type="number" value={editingMatch.l1_w ?? ''} onChange={e => {
                    const val = e.target.value === '' ? null : Number(e.target.value);
                    const newL1W = val;
                    const newAgg = (newL1W ?? 0) + (editingMatch.l2_w ?? 0);
                    setEditingMatch({ ...editingMatch, l1_w: newL1W, gf: newAgg });
                }} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800"/>
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-0.5 text-[11px] uppercase">Leg 1 (Opponent)</label>
                      <input type="number" value={editingMatch.l1_o ?? ''} onChange={e => {
                    const val = e.target.value === '' ? null : Number(e.target.value);
                    const newL1O = val;
                    const newAgg = (newL1O ?? 0) + (editingMatch.l2_o ?? 0);
                    setEditingMatch({ ...editingMatch, l1_o: newL1O, ga: newAgg });
                }} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-600 block mb-0.5 text-[11px] uppercase">Leg 2 (Wrexham)</label>
                      <input type="number" value={editingMatch.l2_w ?? ''} onChange={e => {
                    const val = e.target.value === '' ? null : Number(e.target.value);
                    const newL2W = val;
                    const newAgg = (editingMatch.l1_w ?? 0) + (newL2W ?? 0);
                    setEditingMatch({ ...editingMatch, l2_w: newL2W, gf: newAgg });
                }} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800"/>
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-0.5 text-[11px] uppercase">Leg 2 (Opponent)</label>
                      <input type="number" value={editingMatch.l2_o ?? ''} onChange={e => {
                    const val = e.target.value === '' ? null : Number(e.target.value);
                    const newL2O = val;
                    const newAgg = (editingMatch.l1_o ?? 0) + (newL2O ?? 0);
                    setEditingMatch({ ...editingMatch, l2_o: newL2O, ga: newAgg });
                }} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800"/>
                    </div>
                  </div>
                </div>) : (<div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Wrexham Goals</label>
                    <input type="number" value={editingMatch.gf ?? ''} onChange={e => setEditingMatch({ ...editingMatch, gf: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Opponent Goals</label>
                    <input type="number" value={editingMatch.ga ?? ''} onChange={e => setEditingMatch({ ...editingMatch, ga: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
                  </div>
                </div>)}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingMatch(null)} className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer">
                  Save Match
                </button>
              </div>
            </form>
          </div>
        </div>)}
      {/* 6. MODAL: ADD CAMPAIGN DIALOG */}
      {isAddingCampaign && (<div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-lg p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center space-x-2">
                <Plus className="w-4 h-4 text-emerald-600"/>
                <span>Record New Cup Campaign</span>
              </h3>
              <button onClick={() => setIsAddingCampaign(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                handleCreateCampaign({
                    year: form.year.value,
                    season: form.season.value,
                    competition: form.competition.value,
                    winner: form.winner.value,
                    isWrexhamWon: form.result.value === 'CHAMPIONS',
                    result: form.result.value,
                    played: form.played.value,
                    trueW: form.trueW.value,
                    trueD: form.trueD.value,
                    trueL: form.trueL.value,
                    gf: form.gf.value,
                    ga: form.ga.value
                });
            }} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Year / Season</label>
                  <input name="year" type="text" defaultValue="2033 - 34" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800" required/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Season #</label>
                  <input name="season" type="number" defaultValue={10} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800" required/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Competition</label>
                  <select name="competition" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800">
                    {Object.keys(CUP_METADATA).map(comp => (<option key={comp} value={comp}>{comp}</option>))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Outcome / Result</label>
                  <select name="result" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800">
                    <option value="CHAMPIONS">CHAMPIONS 🏆</option>
                    <option value="FINAL">FINAL</option>
                    <option value="SEMI - FINAL">SEMI - FINAL</option>
                    <option value="QTR - FINAL">QTR - FINAL</option>
                    <option value="RO - 16">RO - 16</option>
                    <option value="SCHEDULED">SCHEDULED (0 MP)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Winner</label>
                <input name="winner" type="text" defaultValue="WREXHAM ✦" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-800"/>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MP</label>
                  <input name="played" type="number" defaultValue={6} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-semibold"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">W</label>
                  <input name="trueW" type="number" defaultValue={6} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-semibold"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">D</label>
                  <input name="trueD" type="number" defaultValue={0} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-semibold"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">L</label>
                  <input name="trueL" type="number" defaultValue={0} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-semibold"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Goals For (GF)</label>
                  <input name="gf" type="number" defaultValue={18} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 font-semibold"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Goals Against (GA)</label>
                  <input name="ga" type="number" defaultValue={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 font-semibold"/>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddingCampaign(false)} className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer">
                  Insert Campaign
                </button>
              </div>
            </form>
          </div>
        </div>)}
      {/* 7. MODAL: DELETE CONFIRMATION OVERLAY */}
      {deleteConfirmIndex != null && (<div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6"/>
            </div>
            <h3 className="font-black text-base text-slate-900">Delete Cup Campaign?</h3>
            <p className="text-xs text-slate-600 mt-1">
              Are you sure you want to remove this campaign? This action will permanently remove row #{deleteConfirmIndex} from your sheet.
            </p>
            <div className="flex items-center justify-center space-x-2 mt-5">
              <button onClick={() => setDeleteConfirmIndex(null)} className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDeleteCampaign(deleteConfirmIndex)} className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs cursor-pointer">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>)}
    </div>);
}

export default function CupsSection(props) {
  return <HoverProvider><App {...props} /></HoverProvider>;
}
