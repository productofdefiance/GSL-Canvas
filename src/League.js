/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — League.js (was App.js)
 *  Version:  League v36
 *  Date:     2026-10-17, 07:45 UTC
 * ════════════════════════════════════════════════════════════════════
 *
 *  CHANGELOG (newest first)
 *
 *  League v36 — 2026-10-17, 07:45 UTC — Canvas v51.18
 *   - Signed numbers (Seasons, Matchdays, Opponents: goal differences, points
 *     vs last season) use ui.js's shared signed(); the local copy is removed.
 *     Zero now shows no sign ("0 vs S3", "0 GD" instead of "+0").
 *
 *  League v35 — 2026-10-09, 11:00 UTC — Canvas v51.15
 *   - Campaigns ledger: on wide screens the column groups spread across the
 *     full width (space goes between groups; columns inside a group stay
 *     together), with roomier groups from 1536px.
 *
 *  League v34 — 2026-10-09, 09:00 UTC — Canvas v51.14 (Anish's League review)
 *   - Campaigns ledger: Home / Away labels are part of their header groups,
 *     so they always line up with their columns.
 *   - Matchdays list: two columns on very wide screens (1536px+).
 *   - Opponents: Highlights bar (Clubs faced, Most played, Best record,
 *     Toughest opponent, Never beaten by); nation chips carry flags.
 *
 *  League v33 — 2026-10-09, 05:00 UTC — Canvas v51.13 (Spider Matrix)
 *   - Spider Matrix now comes from LeagueTabs.js (SpiderTab). The club you
 *     manage is read from the sheet (name marked ✦, with its flag and colour)
 *     and passed in as ownClub.
 *   - Removed tab code no longer used since v51.08–v51.13: the old Spider
 *     Matrix, Matchday Benchmarks, Momentum Pulse, Points Race chart, Venue
 *     cards and Venue Divergence Tracker, and their helpers.
 *
 *  League v32 — 2026-10-09, 02:00 UTC — Canvas v51.12 (Home vs Away)
 *   - Home vs Away now comes from LeagueTabs.js (HomeAwayTab), built from the
 *     locked design. The old tab code is removed.
 *
 *  League v31 — 2026-10-08, 04:00 UTC — Canvas v51.11 (R11: every table sorts)
 *   - Sortable by their headers: the Matchdays list, the Campaigns ledger
 *     (the unstarted season stays last), the Opponents ledger (the control
 *     bar's sort stands until a header is clicked) and the Venue Ledger.
 *     Phone ledgers have no headers; they follow the desktop order.
 *
 *  League v30 — 2026-10-07, 18:00 UTC — Canvas v51.08 (Form & Margins + Points)
 *   - Form & Margins and Points now come from the new module LeagueTabs.js
 *     (designed in the v51 Palette Lab). The old tab code is removed.
 *
 *  League v29 — 2026-10-07, 01:30 UTC — Canvas v51.07 (Seasons and Opponents)
 *   - Seasons: Campaigns has a Cards / Ledger switch (remembered per device).
 *     · Cards: a header strip in the division colour ("S1 · 2024–25", "DIV 4");
 *       finish with a trophy for champions; points with the title margin;
 *       record and goals with GD; home / away split in the blue pair; a chip
 *       only when it adds information (Invincible). Unstarted seasons are a
 *       dashed card.
 *     · Ledger: season, division, finish, points, margin · GP, record, PPG,
 *       win % · goals, GD, clean sheets, failed to score · Home and Away
 *       blocks (GP, points, record, GD), tinted · status. Phones get a short
 *       ledger (season, finish, points over record, goals over GD).
 *     · Highlights bar: repeated bylines removed (R6): PPG shows total points
 *       instead of "Points Per Game"; Clean Sheets drops the games count.
 *   - Opponents: Cards / Ledger switch; sorted by average rank by default
 *     (clubs with no rank last).
 *     · Card: club colour edge, bigger flag and name (no code or country),
 *       average rank top right, the record as the hero with a results bar,
 *       goals with GD, points won, last 5 (most recent first).
 *     · Ledger: club with average rank in grey · GP, record, win % · goals,
 *       GD, clean sheets · points (25/30), PPG · current unbeaten run · last 5
 *       as score chips, biggest win (season, venue). Faint zebra rows; phones
 *       get a short ledger.
 *     · Goals, clean sheets, last 5, unbeaten run and biggest win are worked
 *       out from every league meeting.
 *
 *  League v28 — 2026-10-06, 21:00 UTC — Canvas v51.06 (foundations + Matchdays)
 *   - Matchdays redesigned (v51 design rounds 1–6):
 *     · Main bar in League indigo: "Season 8 · 2031–32" over "Division 1 · 1st"
 *       with a trophy for champions; arrows and a season row that keeps the
 *       chosen season in view (right-aligned on desktop, under the title on
 *       phones). Replaces the season card and the dark summary band.
 *     · Highlights bar (style 2): Record (full width on phones), Finish (chip
 *       only when it adds information; "Sealed MD 34" as text; movement or
 *       a division debut when there's no title), Points (+ clear of 2nd, vs
 *       last season in the same division), Goals (+GD), PPG (rank among
 *       your seasons).
 *     · One control row: result and venue filters, Cards / List switch
 *       (remembered per device), search, reset.
 *     · Cards: the opponent's club colour as the left edge, bigger flag and
 *       name, W / D / L chip beside a neutral score, GD in its result colour
 *       (a draw is a plain grey 0), running points.
 *     · List: one line per match (matchday, venue, colour mark, opponent,
 *       chip, score, GD, total); phones stack matchday over venue and GD
 *       under the total.
 *   - Points: Matchday Benchmarks headlines with section stat cards (R8)
 *     instead of a Highlights bar (R5).
 *   - Home and away use the blue pair: navy (home) and sky (away) on the
 *     Home vs Away tab, the venue filter and the Spider Matrix.
 *
 *  League v27 — 2026-10-05, 09:00 UTC — Canvas v51.05 (type system, whole page)
 *   - Every tab moves onto the v51 type system (Contrast profile): weights
 *     400 / 500 / 600 / 800 (black becomes 800, bold becomes 600, small text
 *     never above 600); capitalised labels at 11px, 600, 0.1em; section
 *     titles 22px; big numbers in the big-number font (.gsl-big) with the
 *     lab spacing; table, chart and supporting numbers in the small-number
 *     font (tabular-nums).
 *   - Records show numbers only (6 • 2 • 1, coloured win / draw / loss);
 *     the Highlights record is plain with a "W • D • L" hint in its label.
 *     Records inside sentences keep their letters.
 *   - Points tab: units no longer played down (the lab option is gone).
 *
 *  League v26 — 2026-10-05, 05:00 UTC — Canvas v51.04
 *   - Points tab (pilot): units played down (lab setting) on the Points Race
 *     card's "pts", the Win % and clean-sheet % in Matchday Benchmarks.
 *
 *  League v25 — 2026-10-05, 03:00 UTC — Canvas v51.03
 *   - Points tab (pilot): scorelines use the shared Score (spaced, played-down
 *     dash): Matchday Benchmarks' Goals column, results in an opened
 *     matchday, and the goals in the matchday card. W / D / L records use the
 *     shared WDLRecord (table and card).
 *
 *  League v24 — 2026-10-05, 01:30 UTC — Canvas v51.02 (type roles pilot)
 *   - Points tab is the v51 pilot: every title, label, chip, number and
 *     table on it uses the Contrast type roles (ui.js TYPE). Capitalised
 *     labels: 11px, 600, 0.1em spacing. Titles in title case ("Win Rate By
 *     Matchday"). Numbers that stand alone use the number font.
 *   - Points Race Select All / Clear All: built from the seasons in the data
 *     (was a typed-in 20).
 *   - Title case: "Wins By Margin", "Draws By Score", "Losses By Margin".
 *
 *  League v23 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)
 *   - Club colours come from the sheet (ui.js clubHex); the typed-in list of
 *     92 clubs is gone. Checked: all 90 matching codes had the same colour;
 *     ROMA and BODO now match the sheet's short names.
 *   - Season colours from ui.js (seasonColor): seasons after S8 get their own
 *     colour instead of repeating S1's.
 *   - Margin matrix tones from ui.js (MARGIN_TONES), shared with Cups.
 *
 *  League v22 — 2026-10-04, 02:54 UTC — Canvas v50.14
 *   - Home vs Away form card: its earlier design back (VenueFormCard)
 *     inside the shared card; docked on touch, 320px floating with a mouse.
 *     The old floating card's code is removed.
 *
 *  League v21 — 2026-10-04, 02:34 UTC — Canvas v50.13 (tablet pass)
 *   - Home vs Away split bar: the shared card (white), docked on every touch
 *     device; its own card guessed touch from the hover setting, which iPad
 *     Safari (desktop mode) reports wrongly, and floated, squeezed and left
 *     blank space on phones and iPad.
 *   - Outcomes bar: each segment shows its full label only when it fits,
 *     otherwise the percentage alone (any screen).
 *   - Plain labels everywhere: no nicknames for win margins; draws read
 *     "1-1 Draws", "2-2 Draws", "0-0 Draws", "3+ Draws"; "Highest-Scoring
 *     Draw"; Spider "Wins by 3+ goals".
 *   - Streak ledgers: PPG on one line. "Cross-Season" badges removed.
 *
 *  League v20 — 2026-10-03, 15:45 UTC — Canvas v50.06 (audit fixes)
 *   - A1 Home vs Away split bars: on touch screens the card docks at the
 *     bottom; a tap elsewhere closes it.
 *   - A2 Venue Swing: one column per season (no built-in 8); phones scroll
 *     sideways past 8 seasons.
 *   - A4 Spider: a tap toggles an axis highlight.
 *
 *  League v19 — 2026-10-03, 15:19 UTC — Canvas v50.05
 *   - Points Race: benchmark label at the left, "100 points".
 *   - Matchday Benchmarks: win rate strip scrubs (touch: tap or slide);
 *     Goals and Clean Sheets stay on one line; MD drawer on phones puts
 *     the scoreline right after the club name.
 *   - Stacked Visualizer: Show / Hide legend (hidden on phones); bars
 *     scrub; header on phones in two lines (Season · year · division /
 *     record · points / matches), one line from tablet up.
 *   - Streaks: start / end text printed code; now shows the values.
 *   - Home vs Away: venue chips' values shrink to fit; bylines as two short
 *     lines on phones. Venue Swing: chips one per row on phones; bar height
 *     capped so labels clear the season pill.
 *
 *  League v18 — 2026-10-03, 07:16 UTC — Canvas v50.03 (mobile phase 3a)
 *   - Points race and Momentum: measure their own box (not the window),
 *     no 300px plot floor (they spilled past the card on phones), ticks
 *     every 10 matchdays on narrow screens under a "Matchday" title.
 *     Touch: tap or slide along the chart; the card docks at the bottom of
 *     the screen; a tap elsewhere or a scroll closes it.
 *   - Browser tooltips that carried information now open the hover card on
 *     tap: Home vs Away bars (and the two that printed variable names
 *     instead of values are fixed), matchday dots, average rating, Spider
 *     edges. League sits inside ui.js's HoverProvider.
 *   - Spider Matrix: labels sized against the drawn width (11px or more).
 *   - Outcomes bar: percentage only on phones; full label from tablet up.
 *   - Biggest Wins / Defeats score boxes stay on one line.
 *   - Matchday table: "MD 1" stays on one line.
 *   - Score and season editors: full screen on phones.
 *   - 11px floor: 105 pieces of 9–10px text raised to 11px.
 *
 *  League v17 — 2026-10-03, 06:41 UTC — Canvas v50.01
 *   - Seasons highlights: Record first on every screen; full width on phones.
 *
 *  League v16 — 2026-09-27, 17:28 UTC — Wider canvas
 *   - Page width comes from ui.js (PAGE_WIDTH, now 1800px; was 1280px).
 *
 *  League v15 — 2026-09-26, 15:48 UTC — Standard search
 *   - Spider tab club choices (opponent, Club 1, Club 2) use the shared
 *     dropdown-first picker: flags, and a search box inside.
 *
 *  League v14 — 2026-09-26, 15:40 UTC — Drawn flags
 *   - Every flag emoji is now a drawn flag (ui.js Flag), sized to match
 *     the old emoji. Non-flag symbols (🪩, 🏴‍☠️) show as they are.
 *   - Dropdown options show club names only (browser dropdowns can't draw
 *     flags); labels no longer have flags glued into the text.
 *
 *  League v13 — 2026-09-25, 18:21 UTC — Hover cards
 *   - Matchday Benchmarks: hovering a cell in the win-rate strip shows a
 *     card (record, win %, points per game, goal difference, games).
 *   - Momentum Pulse, Overlay: the hover card lists each season as S1,
 *     S2..., its 5-game average, and that matchday's result (flag, club,
 *     score coloured by result).
 *
 *  League v12 — 2026-09-25, 17:47 UTC — Hover cards, two new dashboards
 *   Form & Margins
 *   - Outcomes: hover cards (count and share), same as Cups.
 *   - Margin Distribution, Stacked Visualizer: new shared hover cards,
 *     listing the matches (flag, club, matchday, score) when a segment
 *     has 8 or fewer. Match-by-match counts checked against the sheet's
 *     margin columns: identical in all 8 seasons.
 *   - New: Momentum Pulse (below Margin Distribution). Single season:
 *     a bar per match (goal difference, coloured by result) and a
 *     5-game average line, dashed until 5 games are in. Overlay: the
 *     average lines only, one per season. Hover for details.
 *   Points
 *   - New: Matchday Benchmarks (bottom of the tab). All / Div 1 / Lower
 *     divisions; highlights (best and worst matchday with ties shown,
 *     perfect matchdays, matchdays and games each); win-rate strip;
 *     sortable table. Click a matchday to see its results, one per season.
 *
 *  League v11 — 2026-09-25, 16:34 UTC — Icon
 *   - Form & Margins tab uses the pulse icon (same as Cups).
 *
 *  League v10 — 2026-09-25, 02:51 UTC — Uses the shared ui.js (no visual change)
 *   - Header, tab bar and Seasons highlights now come from ui.js
 *     (PageHeader, HighlightsBar, HighlightCard), so Cups and Pyramid can
 *     share them. Shared controls moved from this file to ui.js.
 *   - Checked: every League tab renders exactly as before.
 *
 *  League v9 (unchanged) — 2026-09-24, 22:52 UTC — moved into the combined project
 *   - File renamed from App.js to League.js. It now gets its data from
 *     App.js. Its own corner tag is switched off (App.js shows one tag
 *     for the whole project). No other changes.
 *
 *  Claude v9 — 2026-09-24, 19:11 UTC — Style guide and small cleanup
 *   - Added a style guide (below this header). No visual change.
 *   - Opponents: removed the spreadsheet cell reference "(IT7:PS7)" from
 *     the "Avg Rating" sort option and the card hover text.
 *   - Added a code note that club #92 (the user's own club) is left out
 *     on purpose.
 *
 *  Claude v8 — 2026-09-24, 18:56 UTC — Shorter section titles
 *   - Seasons: "Campaigns".  Points: "Points Race".
 *   - Form & Margins: "Wins by Margin", "Draws by Score", "Losses by
 *     Margin" (game total is now a coloured bubble on the right),
 *     "Margin Distribution", "Goal Fests", "Dropped Points Analysis".
 *   - Home vs Away: "Split", "Venue Ledger", "Venue Swing".
 *   - Spider Matrix: "Highs & Lows".
 *   - Titles not on the approved list were left as they were.
 *
 *  Claude v7 — 2026-09-24, 18:32 UTC — Cleanup, division filter, live stats
 *   - Header: removed the seasons / titles / matches / GD summary line.
 *   - Matchdays: removed the points / record / clean sheets subhead.
 *   - Points: new Division filter (All / Div 1 / Div 2 ...). Season pills
 *     and the chart only show seasons in that division; the x-axis fits
 *     the season length (MD 38 for Div 1). Subhead removed.
 *   - Streaks: Record Win Streak and Record Unbeaten Run shown as two
 *     tiles above the selectors (always career-wide).
 *   - Highs & Lows: every number is now calculated from the match data
 *     (biggest win / defeat / draw, goal fest, routs, losses, draws,
 *     average goals, clean-sheet ratio) and updates as results come in.
 *
 *  Claude v6 — 2026-09-24, 17:58 UTC — Content architecture
 *   - Tabs reordered and renamed: Seasons, Matchdays, Opponents, Points,
 *     Form & Margins, Home vs Away, Spider Matrix. Tab list now lives in
 *     one place (TABS, near the top) instead of seven copies.
 *   - Form & Margins:
 *       Outcomes: renamed; subhead removed; "320 Played" moved to sit with
 *       Won / Drawn / Lost.
 *       Margin Distribution: Stacked Visualizer now first (and default);
 *       "All 8 Campaigns" label removed; colour names removed from the
 *       legend; in the matrix the biggest tier in each group (wins, draws,
 *       losses) is highlighted in every season row and in Career Totals.
 *       Highs & Lows: renamed; "Matches Analyzed" label removed.
 *       Streaks: renamed; the two record badges beside the title removed.
 *
 *  Claude v5 — 2026-09-24, 17:35 UTC — Version tag
 *   - Small version label in the bottom-right corner of the canvas so you
 *     can tell which version is running. Hide it with SHOW_VERSION_TAG.
 *
 *  Claude v4 — 2026-09-24, 17:22 UTC — Record by PPG, metric switches
 *   - "Record season" is now judged by points per game everywhere (Spider
 *     preset and the Points Race record card), so 38- and 46-game seasons
 *     compare fairly.
 *   - Home vs Away: reverted to three separate Points/Wins/Goals switches,
 *     one per section, now in the standard switch style.
 *
 *  Claude v3 — 2026-09-24, 17:01 UTC — Cleanup & standardization
 *   - Home vs Away: removed the "Main" toggle and the hidden "Alt" view
 *     behind it (~540 lines of unreachable code). One Points/Wins/Goals
 *     switch now drives every chart on the tab (was three separate ones).
 *   - Standard controls used everywhere: view switches, season/nation
 *     filter pills, Reset buttons, search boxes and dropdowns now share
 *     one look and behaviour (see SHARED CONTROLS near the top).
 *   - Reset rule: rows with an "All" option have no separate reset link;
 *     panels with several filters (Fixtures, Clubs, Dropped Points,
 *     Spider Matrix) have one Reset button, always in the same place,
 *     greyed out when there is nothing to reset.
 *   - Season layer toggles (Points Race, Spider overlay) both use
 *     Select All / Clear All. Spider overlay no longer lists unplayed
 *     seasons 9–15.
 *   - Club nation filter is built from the data (previously a fixed list
 *     that hid Scotland, Greece, etc.).
 *   - Spider Reset now always restores the default comparison for the
 *     current view (was a mixed clear/restore toggle).
 *   - Removed unused code: an unused side-table parser and two memos
 *     that only fed the removed Alt view.
 *
 *  Claude v2 — 2026-09-24 — Speed
 *   - Hover tooltips move on their own instead of redrawing the whole tab
 *     on every mouse movement. Points Race and Spider hover state kept
 *     inside those charts.
 *
 *  Claude v1 — 2026-09-24 — Correctness
 *   - Titles counted from the sheet's position column, finished seasons
 *     only (Div 1 = 38 games, others = 46). In-progress season shown as
 *     "In Progress".
 *   - Removed fixed season numbers (Invincible, current season, presets,
 *     chart highlight). No jump back to latest season after data changes.
 *   - Fixed broken hover text on dropped-point matches.
 *   - Edit buttons hidden behind ENABLE_EDITING (off) until writes are
 *     verified safe on a copy of the sheet.
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
  ControlLabel,
  ResetButton,
  SearchInput,
  SELECT_CLASS,
  METRIC_OPTIONS,
  SegmentBar,
  Flag,
  ClubSelect,
  PAGE_WIDTH,
  HoverProvider,
  useHover,
  usePointerTrack,
  useWidth,
  Sheet,
  useLegendToggle,
  FitText,
  MARGIN_TONES,
  seasonColor,
  clubHex,
  TYPE,
  Score,
  WDLRecord,
  RecordKey,
  numberize,
  WDL_TONES,
  MainBar,
  ScopeStepper,
  useSort,
  ownClubInfo,
  ViewSwitch,
  useStored,
  SectionStats,
  HOME_HEX,
  AWAY_HEX,
  signed,
} from './ui.js';
import { FormMarginsTab, PointsTab, HomeAwayTab, SpiderTab } from './LeagueTabs.js';
import * as d3 from 'd3';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Shield,
  ShieldAlert,
  Target,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowUpDown,
  Layers,
  PieChart,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Edit3,
  Save,
  X,
  Sparkles,
  Flame,
  Zap,
  Users,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Hash,
  Home,
  Plane,
  RotateCcw,
  LayoutGrid,
  List,
  ArrowUp,
  ArrowDown,
  Globe,
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
// Games in a full season, by division. A season only counts as finished
// (and can only count as a title) once it reaches this many games played.
const GAMES_PER_SEASON = { 'DIV 1': 38 };
const DEFAULT_GAMES_PER_SEASON = 46; // Div 2, 3 and 4

// Column in the season row that holds the final (or current) league position.
const POSITION_COL = 4;

// EDITING SWITCH: set to true to turn the edit buttons back on.
// Off for now because saving rewrites the whole sheet row, which may replace
// formulas with fixed numbers. Only turn on after testing on a COPY of the sheet.
const ENABLE_EDITING = false;

// VERSION TAG: a small label in the bottom-right corner of the canvas so you
// can always tell which version you're looking at. Set to false to hide it.
// Keep APP_VERSION in step with the header comment at the top of this file.
const SHOW_VERSION_TAG = false; // the version tag now lives in App.js
const APP_VERSION = 'Claude v9 • 24 Sep 2026, 19:11 UTC';
// ─────────────────────────────────────────────────────────────────────

// Moves a floating tooltip with the cursor by editing its position directly.
// Previously every mouse movement updated React state, which redrew the whole
// tab dozens of times per second. Now only entering/leaving a bar redraws.
function moveFloatingTooltip(ref, e, minLeft, rightGap, flipY, gapBelow, gapAbove) {
  const el = ref.current;
  if (!el) return;
  const x = Math.max(minLeft, Math.min(window.innerWidth - rightGap, e.clientX));
  const below = e.clientY < flipY;
  el.style.left = `${x}px`;
  el.style.top = `${below ? e.clientY + gapBelow : e.clientY - gapAbove}px`;
  el.style.transform = below ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';
}

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

// Stacked Visualizer tiers, in bar order (same colours as before v12).
const LEAGUE_TIERS = [
  { key: 'won4', label: '4+ goal wins', cls: 'bg-emerald-800 text-white' },
  { key: 'won3', label: '3 goal wins', cls: 'bg-emerald-700 text-white' },
  { key: 'won2', label: '2 goal wins', cls: 'bg-emerald-600 text-white' },
  { key: 'won1', label: '1 goal wins', cls: 'bg-emerald-500 text-white' },
  { key: 'd00', label: '0-0 draws', cls: 'bg-slate-400 text-white' },
  { key: 'd11', label: '1-1 draws', cls: 'bg-amber-500 text-white' },
  { key: 'd22', label: '2-2 draws', cls: 'bg-amber-600 text-white' },
  { key: 'd3p', label: '3-3+ draws', cls: 'bg-amber-700 text-white' },
  { key: 'l1', label: '1 goal losses', cls: 'bg-rose-500 text-white' },
  { key: 'l2', label: '2 goal losses', cls: 'bg-rose-600 text-white' },
  { key: 'l3', label: '3 goal losses', cls: 'bg-rose-700 text-white' },
  { key: 'l4', label: '4+ goal losses', cls: 'bg-rose-800 text-white' },
];
function leagueTierKey(f) {
  const d = f.teamScore - f.oppScore;
  if (f.res === 'W') return d >= 4 ? 'won4' : d === 3 ? 'won3' : d === 2 ? 'won2' : 'won1';
  if (f.res === 'D') return f.teamScore >= 3 ? 'd3p' : f.teamScore === 2 ? 'd22' : f.teamScore === 1 ? 'd11' : 'd00';
  const x = -d;
  return x >= 4 ? 'l4' : x === 3 ? 'l3' : x === 2 ? 'l2' : 'l1';
}
// One season's stacked bar. Counts come from the sheet's margin columns;
// the hover card lists the matches (8 or fewer) from the match data.
function LeagueTierBar({ season: s, items }) {
  return (
    <SegmentBar
      accent="indigo"
      total={s.gp}
      unit="matches"
      chip={`S${s.num}`}
      context={`Season ${s.num} (${s.year}) • ${s.division}`}
      barClass="w-full h-6 rounded-lg bg-slate-200 overflow-hidden flex gap-0.5"
      segClass="h-full flex items-center justify-center text-[11px] font-semibold tabular-nums"
      segments={LEAGUE_TIERS.map((t) => ({
        key: t.key,
        n: s[t.key] || 0,
        label: t.label,
        cls: t.cls,
        swatch: t.cls.split(' ')[0],
        items: items ? items[t.key] : null,
        inner: () => s[t.key] || '',
      }))}
    />
  );
}

// One cell of the margin matrix. The biggest number in each group (wins,
// draws, losses) gets the highlight; ties all get it; zeros show as "-".
// MARGIN_TONES: from ui.js (v23).


function MarginCell({ value, max, tone, edge = false, footer = false }) {
  const t = MARGIN_TONES[tone];
  const isTop = value > 0 && value === max;
  const cell = footer
    ? `py-3 px-2 text-center font-extrabold ${t.foot}`
    : `py-2.5 px-2 text-center font-semibold ${t.row}`;
  const border = edge ? (footer ? t.footEdge : t.edge) : '';
  const pill = footer ? t.footPill : t.pill;
  return (
    <td className={`${cell} ${border}`}>
      {value > 0 || footer ? (
        isTop ? (
          <span className={`px-1.5 py-0.5 rounded font-extrabold ${pill}`}>
            {value}
          </span>
        ) : (
          value
        )
      ) : (
        <span className="text-slate-400">-</span>
      )}
    </td>
  );
}

// ─────────────────────────────────────────────────────────────────────

// Points per game. The only fair way to compare seasons of different lengths
// (46 games in Div 2-4, 38 in Div 1), so every "record season" uses it.
function seasonPpg(s) {
  return s && s.gp > 0 ? s.pts / s.gp : 0;
}

function expectedGamesFor(division) {
  const key = String(division || '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
  return GAMES_PER_SEASON[key] || DEFAULT_GAMES_PER_SEASON;
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

// Helper: Safely parse string values and eliminate formula errors
function cleanText(val, fallback = '') {
  if (val === null || val === undefined) return fallback;
  const str = String(val).trim();
  if (str.startsWith('#') || str.toUpperCase() === 'N/A') return fallback;
  return str;
}

// Helper: Format clearance display showing winning MD, clearance points, or both
function formatClearance(s) {
  if (!s) return '-';
  if (s.winningMd && s.clearancePts !== null && s.clearancePts !== undefined) {
    return `${s.winningMd} (+${s.clearancePts} pts)`;
  }
  if (s.winningMd) {
    return s.winningMd;
  }
  if (s.clearancePts !== null && s.clearancePts !== undefined) {
    return `+${s.clearancePts} pts`;
  }
  if (s.clearence && s.clearence !== '-' && s.clearence !== '-') {
    const num = parseFloat(String(s.clearence).replace(/[^0-9.-]/g, ''));
    return !isNaN(num) ? `+${num} pts` : s.clearence;
  }
  return '-';
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
function MatchdayCard({ f, onEdit }) {
  const oppColor = getClubColor(f.oppAbbr);
  return (
    <div onClick={onEdit} className={`relative bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden ${onEdit ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
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
function MatchdayRow({ f, onEdit }) {
  const oppColor = getClubColor(f.oppAbbr);
  return (
    <div onClick={onEdit} className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 bg-white border-b border-slate-100 last:border-b-0 ${onEdit ? 'cursor-pointer hover:bg-slate-50' : ''}`}>
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

// League v21.1: the Home vs Away form card (its v20 design), shown inside the shared card
function App({
  data = [],
  updateItem,
  deleteItem,
  insertItem,
  moveItem,
  followLink,
}) {
  // Hover card (ui.js): mouse hover or a tap on touch screens
  const hv = useHover();
  const [outBox, outW] = useWidth(800); // v20.1: Outcomes labels fit their segment
  // Stacked Visualizer legend: hidden on phones, shown from tablet up (v50.05)
  const [marginLegendOpen, MarginLegendToggle] = useLegendToggle();
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
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingSeason, setEditingSeason] = useState(null);
  const [raceDivisionFilter, setRaceDivisionFilter] = useState('all'); // 'all' or e.g. 'DIV 1'
  const [visibleChartSeasons, setVisibleChartSeasons] = useState(() => {
    const initial = {};
    for (let i = 1; i <= 15; i++) initial[i] = true;
    return initial;
  });

  // Form & Margins: Dropped Points Analysis Filters & State
  const [droppedSeasonFilter, setDroppedSeasonFilter] = useState('all'); // 'all', '1', '2', '3', '4', '5', '6', '7', '8'
  const [droppedTypeFilter, setDroppedTypeFilter] = useState('all'); // 'all', 'D', 'L'
  const [droppedSearch, setDroppedSearch] = useState('');
  const [droppedViewMode, setDroppedViewMode] = useState('teams'); // 'teams', 'seasons'
  const [expandedTeamAbbr, setExpandedTeamAbbr] = useState(null);

  // Form & Margins: Streaks Dashboard Filters & State
  const [streakCategory, setStreakCategory] = useState('win'); // 'win' or 'unbeaten'
  const [streakScope, setStreakScope] = useState('career'); // 'career' or 'season'
  const [streakSeasonFilter, setStreakSeasonFilter] = useState('all'); // 'all' or '1'..'8'
  const [streakMinLength, setStreakMinLength] = useState('all'); // 'all', '5+', '10+', '15+'
  const [expandedStreakId, setExpandedStreakId] = useState(null);

  // Form & Margins: Season Margins & Outliers State
  const [marginSeasonFilter, setMarginSeasonFilter] = useState('all'); // 'all' or '1'..'8'
  const [marginBreakdownView, setMarginBreakdownView] = useState('bars'); // 'bars' or 'matrix'
  const [outlierCategoryFilter, setOutlierCategoryFilter] = useState('all'); // 'all', 'wins', 'defeats', 'draws', 'extremes'

  // Home vs Away Tab State
  const [homeAwaySeasonFilter, setHomeAwaySeasonFilter] = useState('all'); // 'all' or '1'..'8'
  const [homeAwayBarMetric, setHomeAwayBarMetric] = useState('pts'); // 'pts', 'wins', 'goals'
  const [homeAwayHoverTooltip, setHomeAwayHoverTooltip] = useState(null);
  // A1 (v50.06): touch screens (no hover) dock the Home / Away card at the bottom; a tap elsewhere closes it
  const noHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches;
  useEffect(() => {
    if (!homeAwayHoverTooltip || !noHover || typeof document === 'undefined') return undefined;
    const out = (e) => { if (e.target && e.target.closest && e.target.closest('[data-ha-bar]')) return; setHomeAwayHoverTooltip(null); };
    document.addEventListener('click', out, true);
    return () => document.removeEventListener('click', out, true);
  }, [homeAwayHoverTooltip, noHover]);
  const homeAwayTooltipRef = useRef(null);
  const [ledgerMetric, setLedgerMetric] = useState('pts'); // 'pts', 'wins', 'goals'
  const [divergenceMetric, setDivergenceMetric] = useState('pts'); // 'pts', 'wins', 'goals'
  const [divergenceHoveredSeason, setDivergenceHoveredSeason] = useState(null);

  // Spider Matrix Tab State
  const [spiderMode, setSpiderMode] = useState('seasons'); // 'seasons', 'homeaway', 'clubVsCareer', 'clubVsClub', 'multiSeason'
  const [spiderSeasonA, setSpiderSeasonA] = useState('career'); // 'career' or '1'..'8'
  const [spiderSeasonB, setSpiderSeasonB] = useState('4'); // 'career' or '1'..'8'
  const [spiderHomeAwaySeason, setSpiderHomeAwaySeason] = useState('all'); // 'all' or '1'..'8'
  const [spiderClubA, setSpiderClubA] = useState('RMA');
  const [spiderClubB, setSpiderClubB] = useState('BAR');
  const [spiderClubCareerTarget, setSpiderClubCareerTarget] = useState('PSG');
  const [spiderClubPerspective, setSpiderClubPerspective] =
    useState('usVsClub'); // 'usVsClub' (default) or 'clubVsUs'
  const [spiderMultiSeasons, setSpiderMultiSeasons] = useState(() => {
    const initial = { career: true };
    for (let i = 1; i <= 15; i++) initial[i] = false;
    initial[4] = true;
    return initial;
  });

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

  // Dynamic Ingestion of exactly 91 European Opponent Clubs (Competitive Analysis table, IT7:PS7 avg rating)
  // The club you manage (name, flag, colour), from the Pyramid sheet's ✦ marker
  const ownClub = useMemo(() => ownClubInfo(), [rowsByIndex]);

  const clubs = useMemo(() => {
    const clubList = [];

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
        nameRaw.trim().toUpperCase() !== 'TEAM'
      ) {
        const clubName = nameRaw.trim();
        const numId =
          typeof row1[c] === 'number' ? row1[c] : clubList.length + 1;

        // Limit strictly to the 91 opponent clubs. Club #92 is the user's own
        // club, so it is left out on purpose.
        if (numId > 91) continue;

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

        if (clubList.length >= 91) break;
      }
    }
    return clubList;
  }, [rowsByIndex]);

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

    data.forEach((item) => {
      const r = item.row;
      if (!r) return;
      const sNum = typeof r[0] === 'number' ? r[0] : parseFloat(r[0]);
      const yearStr = r[1];
      const isYearFormat =
        typeof yearStr === 'string' && /\d{4}\s*-\s*\d{2}/.test(yearStr);

      if (sNum && sNum >= 1 && sNum <= 20 && isYearFormat) {
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

        for (let col = 32; col <= 212; col += 4) {
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
        const expectedGames = expectedGamesFor(division);
        const isComplete = gp > 0 && gp >= expectedGames;
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

  // Season-by-Season Dropped Points & Games Drawn/Lost Data (League!HJ:HK & League!IE:IO breakdown)
  const seasonDroppedData = useMemo(() => {
    return seasons
      .filter((s) => s.pts > 0)
      .map((s) => {
        const drawnMatches = s.fixtures
          .filter((f) => f.hasPlayed && f.res === 'D')
          .map((f) => ({
            ...f,
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            ptsDropped: 2,
          }));

        const lostMatches = s.fixtures
          .filter((f) => f.hasPlayed && f.res === 'L')
          .map((f) => ({
            ...f,
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            ptsDropped: 3,
          }));

        const ptsDroppedTotal = s.d * 2 + s.l * 3;
        const maxPossiblePts = s.gp * 3;

        // Group by opponent team for this specific season
        const teamMap = new Map();
        [...drawnMatches, ...lostMatches].forEach((m) => {
          const key = String(m.oppAbbr || 'TBD').toUpperCase();
          if (!teamMap.has(key)) {
            const clubMeta = clubByAbbr.get(key);
            teamMap.set(key, {
              abbr: m.oppAbbr || 'TBD',
              name: clubMeta ? clubMeta.name : m.oppName,
              flag: clubMeta ? clubMeta.flag : m.oppFlag,
              country: clubMeta ? clubMeta.country : 'Europe',
              avg: clubMeta ? clubMeta.avg : 0,
              p: 0,
              w: 0,
              d: 0,
              l: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              ptsGained: 0,
              ptsDropped: 0,
              drawnMatches: [],
              lostMatches: [],
              matches: [],
            });
          }
        });

        // Populate full head-to-head record against these clubs in this season
        s.fixtures.forEach((f) => {
          if (!f.hasPlayed) return;
          const key = String(f.oppAbbr || 'TBD').toUpperCase();
          if (teamMap.has(key)) {
            const t = teamMap.get(key);
            t.p += 1;
            const matchPtsDropped = f.res === 'D' ? 2 : f.res === 'L' ? 3 : 0;
            if (f.res === 'W') {
              t.w += 1;
              t.ptsGained += 3;
            } else if (f.res === 'D') {
              t.d += 1;
              t.ptsGained += 1;
              t.ptsDropped += 2;
              t.drawnMatches.push(f);
            } else if (f.res === 'L') {
              t.l += 1;
              t.ptsDropped += 3;
              t.lostMatches.push(f);
            }
            t.gf += f.teamScore;
            t.ga += f.oppScore;
            t.gd = t.gf - t.ga;
            t.matches.push({
              ...f,
              seasonNum: s.num,
              seasonYear: s.year,
              ptsDropped: matchPtsDropped,
            });
          }
        });

        const bogeyTeams = Array.from(teamMap.values()).sort(
          (a, b) => b.ptsDropped - a.ptsDropped || a.gd - b.gd
        );

        // Clean League!HJ:HK strings
        const rawDrawn = cleanText(s.performance.gamesDrawnList);
        const rawLost = cleanText(s.performance.gamesLostList);
        const cleanDrawnStr =
          rawDrawn === '-' || rawDrawn === '-' ? '' : rawDrawn;
        const cleanLostStr = rawLost === '-' || rawLost === '-' ? '' : rawLost;

        return {
          num: s.num,
          seasonNum: s.num,
          seasonYear: s.year,
          division: s.division,
          pts: s.pts,
          gp: s.gp,
          w: s.w,
          d: s.d,
          l: s.l,
          gf: s.gf,
          ga: s.ga,
          gd: s.gd,
          isComplete: s.isComplete,
          ptsDroppedTotal,
          maxPossiblePts,
          cleanDrawnStr,
          cleanLostStr,
          drawnMatches,
          lostMatches,
          allDroppedMatches: [...drawnMatches, ...lostMatches],
          bogeyTeams,
        };
      });
  }, [seasons, clubByAbbr]);

  // Comprehensive Career Dropped Points Breakdown by Opponent (Cross-referencing League!IE:IO)
  const careerDroppedTeams = useMemo(() => {
    const map = new Map();

    seasonDroppedData.forEach((s) => {
      s.allDroppedMatches.forEach((m) => {
        const key = String(m.oppAbbr || 'TBD').toUpperCase();
        if (!map.has(key)) {
          const clubMeta = clubByAbbr.get(key);
          map.set(key, {
            abbr: m.oppAbbr || 'TBD',
            name: clubMeta ? clubMeta.name : m.oppName,
            flag: clubMeta ? clubMeta.flag : m.oppFlag,
            country: clubMeta ? clubMeta.country : 'Europe',
            avg: clubMeta ? clubMeta.avg : 0,
            rank: clubMeta ? clubMeta.rank : 99,
            p: 0,
            w: 0,
            d: 0,
            l: 0,
            gf: 0,
            ga: 0,
            gd: 0,
            ptsGained: 0,
            ptsDropped: 0,
            seasonsInvolved: new Set(),
            matches: [],
            drawnMatches: [],
            lostMatches: [],
            bySeason: {},
          });
        }
        const team = map.get(key);
        team.seasonsInvolved.add(s.seasonNum);
        if (m.res === 'D') team.drawnMatches.push(m);
        else if (m.res === 'L') team.lostMatches.push(m);
      });
    });

    // Populate overall career stats against clubs where points were dropped
    seasons.forEach((s) => {
      if (s.pts === 0) return;
      s.fixtures.forEach((f) => {
        if (!f.hasPlayed) return;
        const key = String(f.oppAbbr || 'TBD').toUpperCase();
        if (map.has(key)) {
          const team = map.get(key);
          team.p += 1;
          const matchPtsDropped = f.res === 'D' ? 2 : f.res === 'L' ? 3 : 0;
          if (f.res === 'W') {
            team.w += 1;
            team.ptsGained += 3;
          } else if (f.res === 'D') {
            team.d += 1;
            team.ptsGained += 1;
            team.ptsDropped += 2;
          } else if (f.res === 'L') {
            team.l += 1;
            team.ptsDropped += 3;
          }
          team.gf += f.teamScore;
          team.ga += f.oppScore;
          team.gd = team.gf - team.ga;

          const matchObj = {
            ...f,
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            ptsDropped: matchPtsDropped,
          };
          team.matches.push(matchObj);

          if (!team.bySeason[s.num]) {
            team.bySeason[s.num] = {
              seasonNum: s.num,
              seasonYear: s.year,
              division: s.division,
              p: 0,
              w: 0,
              d: 0,
              l: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              ptsDropped: 0,
              ptsGained: 0,
              matches: [],
            };
          }
          const bs = team.bySeason[s.num];
          bs.p += 1;
          if (f.res === 'W') {
            bs.w += 1;
            bs.ptsGained += 3;
          } else if (f.res === 'D') {
            bs.d += 1;
            bs.ptsGained += 1;
            bs.ptsDropped += 2;
          } else if (f.res === 'L') {
            bs.l += 1;
            bs.ptsDropped += 3;
          }
          bs.gf += f.teamScore;
          bs.ga += f.oppScore;
          bs.gd = bs.gf - bs.ga;
          bs.matches.push(matchObj);
        }
      });
    });

    const list = Array.from(map.values()).map((t) => ({
      ...t,
      seasonsInvolved: Array.from(t.seasonsInvolved).sort((a, b) => a - b),
    }));

    return list.sort((a, b) => {
      if (b.ptsDropped !== a.ptsDropped) return b.ptsDropped - a.ptsDropped;
      if (b.l !== a.l) return b.l - a.l;
      return a.gd - b.gd;
    });
  }, [seasonDroppedData, seasons, clubByAbbr]);

  // Filtered Dropped Points View based on active season, outcome type, and search query
  const displayedDroppedTeams = useMemo(() => {
    let list = [];

    if (droppedSeasonFilter === 'all') {
      list = [...careerDroppedTeams];
    } else {
      const sNum = Number(droppedSeasonFilter);
      const sData = seasonDroppedData.find((s) => s.seasonNum === sNum);
      if (sData) {
        list = sData.bogeyTeams.map((t) => ({
          ...t,
          seasonsInvolved: [sNum],
          bySeason: { [sNum]: t },
        }));
      }
    }

    if (droppedTypeFilter === 'D') {
      list = list.filter((t) => t.d > 0);
    } else if (droppedTypeFilter === 'L') {
      list = list.filter((t) => t.l > 0);
    }

    if (droppedSearch.trim()) {
      const q = droppedSearch.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) || t.abbr.toLowerCase().includes(q)
      );
    }

    return list;
  }, [
    careerDroppedTeams,
    seasonDroppedData,
    droppedSeasonFilter,
    droppedTypeFilter,
    droppedSearch,
  ]);

  // Aggregate stats for Dropped Points Header KPIs
  const droppedSummaryKPIs = useMemo(() => {
    if (droppedSeasonFilter === 'all') {
      const totalDropped = seasonDroppedData.reduce(
        (acc, s) => acc + s.ptsDroppedTotal,
        0
      );
      const totalDraws = seasonDroppedData.reduce((acc, s) => acc + s.d, 0);
      const totalLosses = seasonDroppedData.reduce((acc, s) => acc + s.l, 0);
      const topBogey = careerDroppedTeams[0] || null;
      return {
        totalDropped,
        totalDraws,
        totalLosses,
        ptsFromDraws: totalDraws * 2,
        ptsFromLosses: totalLosses * 3,
        topBogey,
        teamsCount: careerDroppedTeams.length,
      };
    } else {
      const sNum = Number(droppedSeasonFilter);
      const sData = seasonDroppedData.find((s) => s.seasonNum === sNum);
      if (!sData)
        return {
          totalDropped: 0,
          totalDraws: 0,
          totalLosses: 0,
          ptsFromDraws: 0,
          ptsFromLosses: 0,
          topBogey: null,
          teamsCount: 0,
        };
      const topBogey = sData.bogeyTeams[0] || null;
      return {
        totalDropped: sData.ptsDroppedTotal,
        totalDraws: sData.d,
        totalLosses: sData.l,
        ptsFromDraws: sData.d * 2,
        ptsFromLosses: sData.l * 3,
        topBogey,
        teamsCount: sData.bogeyTeams.length,
      };
    }
  }, [seasonDroppedData, careerDroppedTeams, droppedSeasonFilter]);

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

  // Dynamically Computed Campaign Milestones
  const milestoneInsights = useMemo(() => {
    const completed = seasons.filter((s) => s.pts > 0);
    if (!completed.length) return null;

    const finished = seasons.filter((s) => s.isComplete);
    const recordSeason = [...finished].sort(
      (a, b) => seasonPpg(b) - seasonPpg(a)
    )[0];
    const invincible = finished.find((s) => s.isInvincible);
    const mdClinched = completed.filter(
      (s) =>
        s.winningMd ||
        (s.clearence && String(s.clearence).toLowerCase().includes('md'))
    );

    return {
      recordSeason,
      invincible,
      mdClinched,
    };
  }, [seasons]);

  // Dynamically Computed Career Home & Away Totals (Zero hardcoded numbers)
  const homeTotals = useMemo(() => {
    const completedSeasons = seasons.filter((s) => s.pts > 0);
    const gp = completedSeasons.reduce((acc, s) => acc + s.home.gp, 0);
    const pts = completedSeasons.reduce((acc, s) => acc + s.home.pts, 0);
    const w = completedSeasons.reduce((acc, s) => acc + s.home.w, 0);
    const d = completedSeasons.reduce((acc, s) => acc + s.home.d, 0);
    const l = completedSeasons.reduce((acc, s) => acc + s.home.l, 0);
    const gf = completedSeasons.reduce((acc, s) => acc + s.home.gf, 0);
    const ga = completedSeasons.reduce((acc, s) => acc + s.home.ga, 0);
    const gd = gf - ga;
    const winRate = gp > 0 ? (w / gp) * 100 : 0;
    return { gp, pts, w, d, l, gf, ga, gd, winRate };
  }, [seasons]);

  const awayTotals = useMemo(() => {
    const completedSeasons = seasons.filter((s) => s.pts > 0);
    const gp = completedSeasons.reduce((acc, s) => acc + s.away.gp, 0);
    const pts = completedSeasons.reduce((acc, s) => acc + s.away.pts, 0);
    const w = completedSeasons.reduce((acc, s) => acc + s.away.w, 0);
    const d = completedSeasons.reduce((acc, s) => acc + s.away.d, 0);
    const l = completedSeasons.reduce((acc, s) => acc + s.away.l, 0);
    const gf = completedSeasons.reduce((acc, s) => acc + s.away.gf, 0);
    const ga = completedSeasons.reduce((acc, s) => acc + s.away.ga, 0);
    const gd = gf - ga;
    const winRate = gp > 0 ? (w / gp) * 100 : 0;
    return { gp, pts, w, d, l, gf, ga, gd, winRate };
  }, [seasons]);

  // Matches behind each margin tier, per season (for the Stacked Visualizer
  // hover cards). Counts match the sheet's margin columns (checked in v12).
  const marginItemsBySeason = useMemo(() => {
    const map = new Map();
    seasons.forEach((s) => {
      const t = {};
      LEAGUE_TIERS.forEach((k) => { t[k.key] = []; });
      (s.fixtures || []).filter((f) => f.hasPlayed).forEach((f) => {
        const key = leagueTierKey(f);
        if (t[key]) t[key].push({ flag: f.oppFlag, name: f.oppName, score: `${f.teamScore}–${f.oppScore}`, tag: `MD${f.md}` });
      });
      map.set(s.num, t);
    });
    return map;
  }, [seasons]);

  // Dynamically Computed Form & Margin Breakdowns from raw data
  const marginTotals = useMemo(() => {
    const completedSeasons = seasons.filter((s) => s.pts > 0);

    const won1 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.wonBy1,
      0
    );
    const won2 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.wonBy2,
      0
    );
    const won3 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.wonBy3,
      0
    );
    const won4Plus = completedSeasons.reduce(
      (acc, s) => acc + s.performance.wonBy4Plus,
      0
    );
    const totalWins = won1 + won2 + won3 + won4Plus || careerTotals.totalW;

    const drawn00 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.drawn00,
      0
    );
    const drawn11 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.drawn11,
      0
    );
    const drawn22 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.drawn22,
      0
    );
    const drawn3Plus = completedSeasons.reduce(
      (acc, s) => acc + s.performance.drawn3Plus,
      0
    );
    const totalDraws =
      drawn00 + drawn11 + drawn22 + drawn3Plus || careerTotals.totalD;

    const lost1 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.lostBy1,
      0
    );
    const lost2 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.lostBy2,
      0
    );
    const lost3 = completedSeasons.reduce(
      (acc, s) => acc + s.performance.lostBy3,
      0
    );
    const lost4Plus = completedSeasons.reduce(
      (acc, s) => acc + s.performance.lostBy4Plus,
      0
    );
    const totalLosses =
      lost1 + lost2 + lost3 + lost4Plus || careerTotals.totalL;

    return {
      wins: {
        total: totalWins,
        by1: won1,
        by1Pct: totalWins > 0 ? (won1 / totalWins) * 100 : 0,
        by2: won2,
        by2Pct: totalWins > 0 ? (won2 / totalWins) * 100 : 0,
        by3: won3,
        by3Pct: totalWins > 0 ? (won3 / totalWins) * 100 : 0,
        by4Plus: won4Plus,
        by4PlusPct: totalWins > 0 ? (won4Plus / totalWins) * 100 : 0,
      },
      draws: {
        total: totalDraws,
        d00: drawn00,
        d00Pct: totalDraws > 0 ? (drawn00 / totalDraws) * 100 : 0,
        d11: drawn11,
        d11Pct: totalDraws > 0 ? (drawn11 / totalDraws) * 100 : 0,
        d22: drawn22,
        d22Pct: totalDraws > 0 ? (drawn22 / totalDraws) * 100 : 0,
        d3Plus: drawn3Plus,
        d3PlusPct: totalDraws > 0 ? (drawn3Plus / totalDraws) * 100 : 0,
      },
      losses: {
        total: totalLosses,
        by1: lost1,
        by1Pct: totalLosses > 0 ? (lost1 / totalLosses) * 100 : 0,
        by2: lost2,
        by2Pct: totalLosses > 0 ? (lost2 / totalLosses) * 100 : 0,
        by3: lost3,
        by3Pct: totalLosses > 0 ? (lost3 / totalLosses) * 100 : 0,
        by4Plus: lost4Plus,
        by4PlusPct: totalLosses > 0 ? (lost4Plus / totalLosses) * 100 : 0,
      },
    };
  }, [seasons, careerTotals]);

  // Chronological Match Stream Across All Completed Campaigns (for Career Streaks)
  const allChronologicalMatches = useMemo(() => {
    const list = [];
    const completedSeasons = seasons.filter((s) => s.pts > 0);
    completedSeasons.forEach((s) => {
      s.fixtures.forEach((f) => {
        if (f.hasPlayed) {
          list.push({
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            md: f.md,
            oppAbbr: f.oppAbbr,
            oppName: f.oppName,
            oppFlag: f.oppFlag,
            venue: f.venue,
            res: f.res,
            teamScore: f.teamScore,
            oppScore: f.oppScore,
            goalDiff: f.goalDiff,
            isCleanSheet: f.oppScore === 0,
            cumPts: f.cumPts,
          });
        }
      });
    });
    return list;
  }, [seasons]);

  // Home vs Away active dataset (either career totals or selected single season)
  const activeHomeAway = useMemo(() => {
    if (homeAwaySeasonFilter === 'all') {
      const h = homeTotals;
      const a = awayTotals;
      const totalPts = h.pts + a.pts;
      const totalGP = h.gp + a.gp;
      const totalW = h.w + a.w;
      const totalGF = h.gf + a.gf;
      const hCs = allChronologicalMatches.filter(
        (m) => m.venue === 'H' && m.oppScore === 0
      ).length;
      const aCs = allChronologicalMatches.filter(
        (m) => m.venue === 'A' && m.oppScore === 0
      ).length;
      const hFts = allChronologicalMatches.filter(
        (m) => m.venue === 'H' && m.teamScore === 0
      ).length;
      const aFts = allChronologicalMatches.filter(
        (m) => m.venue === 'A' && m.teamScore === 0
      ).length;

      return {
        label: `All ${careerTotals.seasonsPlayed} Seasons Combined`,
        seasonYear: 'All-Time Career',
        division: 'Divisions 1 - 4',
        seasonNum: null,
        home: {
          ...h,
          ppg: h.gp > 0 ? h.pts / h.gp : 0,
          gfPerGame: h.gp > 0 ? h.gf / h.gp : 0,
          gaPerGame: h.gp > 0 ? h.ga / h.gp : 0,
          cleanSheets: hCs,
          failedToScore: hFts,
          cleanSheetPct: h.gp > 0 ? (hCs / h.gp) * 100 : 0,
        },
        away: {
          ...a,
          ppg: a.gp > 0 ? a.pts / a.gp : 0,
          gfPerGame: a.gp > 0 ? a.gf / a.gp : 0,
          gaPerGame: a.gp > 0 ? a.ga / a.gp : 0,
          cleanSheets: aCs,
          failedToScore: aFts,
          cleanSheetPct: a.gp > 0 ? (aCs / a.gp) * 100 : 0,
        },
        totalPts,
        totalGP,
        totalW,
        totalGF,
        homePtsPct: totalPts > 0 ? (h.pts / totalPts) * 100 : 50,
        awayPtsPct: totalPts > 0 ? (a.pts / totalPts) * 100 : 50,
        homeWinsPct: totalW > 0 ? (h.w / totalW) * 100 : 50,
        awayWinsPct: totalW > 0 ? (a.w / totalW) * 100 : 50,
        homeGoalsPct: totalGF > 0 ? (h.gf / totalGF) * 100 : 50,
        awayGoalsPct: totalGF > 0 ? (a.gf / totalGF) * 100 : 50,
      };
    } else {
      const sNum = Number(homeAwaySeasonFilter);
      const s = seasons.find((x) => x.num === sNum);
      if (!s) return null;

      const h = s.home;
      const a = s.away;
      const hWinRate = h.gp > 0 ? (h.w / h.gp) * 100 : 0;
      const aWinRate = a.gp > 0 ? (a.w / a.gp) * 100 : 0;
      const totalPts = h.pts + a.pts;
      const totalGP = h.gp + a.gp;
      const totalW = h.w + a.w;
      const totalGF = h.gf + a.gf;

      const hMatches = s.fixtures.filter((m) => m.hasPlayed && m.venue === 'H');
      const aMatches = s.fixtures.filter((m) => m.hasPlayed && m.venue === 'A');
      const hCs = hMatches.filter((m) => m.oppScore === 0).length;
      const aCs = aMatches.filter((m) => m.oppScore === 0).length;
      const hFts = hMatches.filter((m) => m.teamScore === 0).length;
      const aFts = aMatches.filter((m) => m.teamScore === 0).length;

      return {
        label: `Season ${s.num}`,
        seasonYear: s.year,
        division: s.division,
        seasonNum: s.num,
        home: {
          ...h,
          winRate: hWinRate,
          ppg: h.gp > 0 ? h.pts / h.gp : 0,
          gfPerGame: h.gp > 0 ? h.gf / h.gp : 0,
          gaPerGame: h.gp > 0 ? h.ga / h.gp : 0,
          cleanSheets: hCs,
          failedToScore: hFts,
          cleanSheetPct: h.gp > 0 ? (hCs / h.gp) * 100 : 0,
        },
        away: {
          ...a,
          winRate: aWinRate,
          ppg: a.gp > 0 ? a.pts / a.gp : 0,
          gfPerGame: a.gp > 0 ? a.gf / a.gp : 0,
          gaPerGame: a.gp > 0 ? a.ga / a.gp : 0,
          cleanSheets: aCs,
          failedToScore: aFts,
          cleanSheetPct: a.gp > 0 ? (aCs / a.gp) * 100 : 0,
        },
        totalPts,
        totalGP,
        totalW,
        totalGF,
        homePtsPct: totalPts > 0 ? (h.pts / totalPts) * 100 : 50,
        awayPtsPct: totalPts > 0 ? (a.pts / totalPts) * 100 : 50,
        homeWinsPct: totalW > 0 ? (h.w / totalW) * 100 : 50,
        awayWinsPct: totalW > 0 ? (a.w / totalW) * 100 : 50,
        homeGoalsPct: totalGF > 0 ? (h.gf / totalGF) * 100 : 50,
        awayGoalsPct: totalGF > 0 ? (a.gf / totalGF) * 100 : 50,
      };
    }
  }, [
    homeAwaySeasonFilter,
    homeTotals,
    awayTotals,
    allChronologicalMatches,
    seasons,
  ]);

  // Season-by-Season Home vs Away Ledger list
  const seasonHomeAwayList = useMemo(() => {
    return seasons
      .filter((s) => s.pts > 0)
      .map((s) => {
        const h = s.home;
        const a = s.away;
        const hWinRate = h.gp > 0 ? (h.w / h.gp) * 100 : 0;
        const aWinRate = a.gp > 0 ? (a.w / a.gp) * 100 : 0;
        const sPts = s.pts;
        const homePtsPct = sPts > 0 ? (h.pts / sPts) * 100 : 50;
        const awayPtsPct = sPts > 0 ? (a.pts / sPts) * 100 : 50;

        return {
          num: s.num,
          year: s.year,
          division: s.division,
          pts: s.pts,
          gp: s.gp,
          w: s.w,
          gf: s.gf,
          home: { ...h, winRate: hWinRate, pct: homePtsPct },
          away: { ...a, winRate: aWinRate, pct: awayPtsPct },
          clearence: s.clearence,
          winningMd: s.winningMd,
        };
      });
  }, [seasons]);
  // R11: the Venue Ledger sorts by its headers
  const [venueRows, venueHead] = useSort(seasonHomeAwayList, null, 'desc', {
    num: (s) => s.num, div: (s) => String(s.division), hpts: (s) => s.home.pts, hw: (s) => s.home.w, hwin: (s) => (s.home.gp ? s.home.w / s.home.gp : 0), hgd: (s) => s.home.gd,
    ratio: (s) => (s.pts ? s.home.pts / s.pts : 0), apts: (s) => s.away.pts, aw: (s) => s.away.w, awin: (s) => (s.away.gp ? s.away.w / s.away.gp : 0), agd: (s) => s.away.gd,
  });

  // Season-by-Season Venue Swing & Divergence Data (Dynamic for Points, Wins, Goals)
  const venueDivergenceList = useMemo(() => {
    let runningCumGap = 0;
    return seasonHomeAwayList.map((s) => {
      let homeVal = s.home.pts;
      let awayVal = s.away.pts;
      let totalVal = s.pts;
      let unit = 'p';

      if (divergenceMetric === 'wins') {
        homeVal = s.home.w;
        awayVal = s.away.w;
        totalVal = s.w;
        unit = 'W';
      } else if (divergenceMetric === 'goals') {
        homeVal = s.home.gf;
        awayVal = s.away.gf;
        totalVal = s.gf;
        unit = 'G';
      }

      const delta = homeVal - awayVal; // positive = home advantage, negative = away advantage
      runningCumGap += delta;
      const isHomeDominant = delta > 0;
      const isAwayDominant = delta < 0;
      const isNeutral = delta === 0;
      const threshold =
        divergenceMetric === 'pts' ? 4 : divergenceMetric === 'wins' ? 2 : 5;

      return {
        num: s.num,
        year: s.year,
        division: s.division,
        pts: s.pts,
        homePts: s.home.pts,
        awayPts: s.away.pts,
        homeVal,
        awayVal,
        totalVal,
        unit,
        homeWinRate: s.home.winRate,
        awayWinRate: s.away.winRate,
        homeGd: s.home.gd,
        awayGd: s.away.gd,
        delta,
        cumGap: runningCumGap,
        isHomeDominant,
        isAwayDominant,
        isNeutral,
        divergenceType:
          delta >= threshold
            ? 'Home'
            : delta <= -threshold
            ? 'Road Warrior'
            : 'Balanced Venue',
      };
    });
  }, [seasonHomeAwayList, divergenceMetric]);

  const maxDivergenceDelta = useMemo(() => {
    const allAbs = venueDivergenceList.map((s) => Math.abs(s.delta));
    const highest = Math.max(...allAbs, 1);
    return Math.max(
      highest,
      divergenceMetric === 'pts' ? 8 : divergenceMetric === 'wins' ? 4 : 12
    );
  }, [venueDivergenceList, divergenceMetric]);

  // Season-by-Season Margin Distribution (Career Timeline)
  const seasonMargins = useMemo(() => {
    return seasons
      .filter((s) => s.pts > 0)
      .map((s) => {
        const p = s.performance;
        const won4 = p.wonBy4Plus || 0;
        const won3 = p.wonBy3 || 0;
        const won2 = p.wonBy2 || 0;
        const won1 = p.wonBy1 || 0;

        const d00 = p.drawn00 || 0;
        const d11 = p.drawn11 || 0;
        const d22 = p.drawn22 || 0;
        const d3p = p.drawn3Plus || 0;

        const l1 = p.lostBy1 || 0;
        const l2 = p.lostBy2 || 0;
        const l3 = p.lostBy3 || 0;
        const l4 = p.lostBy4Plus || 0;

        const dominantWinPct = s.w > 0 ? ((won4 + won3 + won2) / s.w) * 100 : 0;
        const blowoutPct = s.gp > 0 ? ((won4 + won3) / s.gp) * 100 : 0;

        return {
          num: s.num,
          seasonNum: s.num,
          year: s.year,
          division: s.division,
          gp: s.gp,
          w: s.w,
          d: s.d,
          l: s.l,
          pts: s.pts,
          gf: s.gf,
          ga: s.ga,
          gd: s.gd,
          won4,
          won3,
          won2,
          won1,
          d00,
          d11,
          d22,
          d3p,
          l1,
          l2,
          l3,
          l4,
          dominantWinPct,
          blowoutPct,
        };
      });
  }, [seasons]);

  // Highs & Lows / Outliers & Extremes Dashboard Metrics
  const outliersAndExtremes = useMemo(() => {
    if (!allChronologicalMatches || allChronologicalMatches.length === 0)
      return null;

    // 1. Biggest Wins (by goal difference, then by team goals)
    const winMatches = allChronologicalMatches.filter((m) => m.res === 'W');
    const sortedWinsByGD = [...winMatches].sort(
      (a, b) => b.goalDiff - a.goalDiff || b.teamScore - a.teamScore
    );
    const topWins = sortedWinsByGD.slice(0, 4);

    // Most goals scored in a match
    const sortedByGoalsScored = [...allChronologicalMatches].sort(
      (a, b) => b.teamScore - a.teamScore || b.goalDiff - a.goalDiff
    );
    const topGoalsScored = sortedByGoalsScored.slice(0, 4);

    // 2. Biggest Defeats (by most negative goal difference, then opponent score)
    const defeatMatches = allChronologicalMatches.filter((m) => m.res === 'L');
    const sortedDefeats = [...defeatMatches].sort(
      (a, b) => a.goalDiff - b.goalDiff || b.oppScore - a.oppScore
    );
    const topDefeats = sortedDefeats.slice(0, 4);

    // 3. Highest Scoring Draws
    const drawMatches = allChronologicalMatches.filter((m) => m.res === 'D');
    const sortedDraws = [...drawMatches].sort(
      (a, b) =>
        b.teamScore + b.oppScore - (a.teamScore + a.oppScore) ||
        b.teamScore - a.teamScore
    );
    const topDraws = sortedDraws.slice(0, 4);

    // 4. Most Common Scorelines across all {totalGames} games
    const scorelineCounts = new Map();
    allChronologicalMatches.forEach((m) => {
      const key = `${m.teamScore} - ${m.oppScore}`;
      if (!scorelineCounts.has(key)) {
        scorelineCounts.set(key, {
          scoreline: key,
          res: m.res,
          count: 0,
          matches: [],
        });
      }
      const entry = scorelineCounts.get(key);
      entry.count += 1;
      entry.matches.push(m);
    });
    const commonScorelines = Array.from(scorelineCounts.values()).sort(
      (a, b) => b.count - a.count
    );
    const topScorelines = commonScorelines.slice(0, 5);

    // 5. Highest Scoring Matches (Total match goals scored by both teams)
    const sortedByTotalGoals = [...allChronologicalMatches].sort(
      (a, b) => b.teamScore + b.oppScore - (a.teamScore + a.oppScore)
    );
    const highestScoringMatches = sortedByTotalGoals.slice(0, 4);

    // 6. Clean Sheets vs Failed to Score
    const cleanSheetsMatches = allChronologicalMatches.filter(
      (m) => m.oppScore === 0
    );
    const failedToScoreMatches = allChronologicalMatches.filter(
      (m) => m.teamScore === 0
    );
    const bttsMatches = allChronologicalMatches.filter(
      (m) => m.teamScore > 0 && m.oppScore > 0
    );
    const scorelessDraws = allChronologicalMatches.filter(
      (m) => m.teamScore === 0 && m.oppScore === 0
    );
    const cleanSheetWins = allChronologicalMatches.filter(
      (m) => m.res === 'W' && m.oppScore === 0
    );

    const csHome = cleanSheetsMatches.filter((m) => m.venue === 'H').length;
    const csAway = cleanSheetsMatches.filter((m) => m.venue === 'A').length;
    const ftsHome = failedToScoreMatches.filter((m) => m.venue === 'H').length;
    const ftsAway = failedToScoreMatches.filter((m) => m.venue === 'A').length;

    const totalGames = allChronologicalMatches.length;
    const totalGoals = allChronologicalMatches.reduce(
      (sum, m) => sum + (m.teamScore || 0) + (m.oppScore || 0),
      0
    );
    const topDraw = topDraws[0] || null;
    const topDrawTies = topDraw
      ? drawMatches.filter(
          (m) =>
            m.teamScore === topDraw.teamScore && m.oppScore === topDraw.oppScore
        )
      : [];

    return {
      routsCount: winMatches.filter((m) => m.goalDiff >= 4).length,
      lossesCount: defeatMatches.length,
      drawsCount: drawMatches.length,
      avgGoalsPerMatch: totalGames > 0 ? totalGoals / totalGames : 0,
      topDrawTies,
      topWins,
      topGoalsScored,
      topDefeats,
      topDraws,
      topScorelines,
      highestScoringMatches,
      cleanSheetsTotal: cleanSheetsMatches.length,
      cleanSheetsPct:
        totalGames > 0 ? (cleanSheetsMatches.length / totalGames) * 100 : 0,
      cleanSheetWinsTotal: cleanSheetWins.length,
      failedToScoreTotal: failedToScoreMatches.length,
      failedToScorePct:
        totalGames > 0 ? (failedToScoreMatches.length / totalGames) * 100 : 0,
      bttsCount: bttsMatches.length,
      bttsPct: totalGames > 0 ? (bttsMatches.length / totalGames) * 100 : 0,
      scorelessDrawsCount: scorelessDraws.length,
      csHome,
      csAway,
      ftsHome,
      ftsAway,
      csToFtsRatio:
        failedToScoreMatches.length > 0
          ? cleanSheetsMatches.length / failedToScoreMatches.length
          : cleanSheetsMatches.length,
      scoringGamesCount: totalGames - failedToScoreMatches.length,
      scoringGamesPct:
        totalGames > 0
          ? ((totalGames - failedToScoreMatches.length) / totalGames) * 100
          : 0,
    };
  }, [allChronologicalMatches]);

  // Dynamic Streak Extraction Algorithm (Handles both Win Streaks & Unbeaten Streaks)
  const extractStreaksFromList = (
    matchList,
    type = 'win',
    scopeLabel = 'Career'
  ) => {
    const streaks = [];
    let currentStreak = [];

    for (let i = 0; i < matchList.length; i++) {
      const m = matchList[i];
      const qualifies =
        type === 'win' ? m.res === 'W' : m.res === 'W' || m.res === 'D';

      if (qualifies) {
        currentStreak.push(m);
      } else {
        if (currentStreak.length >= 2) {
          const wCount = currentStreak.filter((x) => x.res === 'W').length;
          const dCount = currentStreak.filter((x) => x.res === 'D').length;
          const gf = currentStreak.reduce(
            (sum, x) => sum + (x.teamScore || 0),
            0
          );
          const ga = currentStreak.reduce(
            (sum, x) => sum + (x.oppScore || 0),
            0
          );
          const cs = currentStreak.filter((x) => x.isCleanSheet).length;
          const pts = wCount * 3 + dCount;

          streaks.push({
            id: `${type}-${scopeLabel}-${currentStreak[0].seasonNum}-${currentStreak[0].md}-${currentStreak.length}-${i}`,
            type,
            scopeLabel,
            length: currentStreak.length,
            w: wCount,
            d: dCount,
            points: pts,
            ppg: pts / currentStreak.length,
            gf,
            ga,
            gd: gf - ga,
            cleanSheets: cs,
            cleanSheetPct: (cs / currentStreak.length) * 100,
            start: currentStreak[0],
            end: currentStreak[currentStreak.length - 1],
            endedBy: {
              oppAbbr: m.oppAbbr,
              oppName: m.oppName,
              oppFlag: m.oppFlag,
              venue: m.venue,
              res: m.res,
              teamScore: m.teamScore,
              oppScore: m.oppScore,
              seasonNum: m.seasonNum,
              seasonYear: m.seasonYear,
              md: m.md,
            },
            isActive: false,
            crossSeason:
              currentStreak[0].seasonNum !==
              currentStreak[currentStreak.length - 1].seasonNum,
            matches: [...currentStreak],
          });
        }
        currentStreak = [];
      }
    }

    // Ongoing streak at latest played matchday
    if (currentStreak.length >= 1) {
      const wCount = currentStreak.filter((x) => x.res === 'W').length;
      const dCount = currentStreak.filter((x) => x.res === 'D').length;
      const gf = currentStreak.reduce((sum, x) => sum + (x.teamScore || 0), 0);
      const ga = currentStreak.reduce((sum, x) => sum + (x.oppScore || 0), 0);
      const cs = currentStreak.filter((x) => x.isCleanSheet).length;
      const pts = wCount * 3 + dCount;

      streaks.push({
        id: `${type}-${scopeLabel}-active-${currentStreak[0].seasonNum}-${currentStreak[0].md}-${currentStreak.length}`,
        type,
        scopeLabel,
        length: currentStreak.length,
        w: wCount,
        d: dCount,
        points: pts,
        ppg: pts / currentStreak.length,
        gf,
        ga,
        gd: gf - ga,
        cleanSheets: cs,
        cleanSheetPct: (cs / currentStreak.length) * 100,
        start: currentStreak[0],
        end: currentStreak[currentStreak.length - 1],
        endedBy: null,
        isActive: true,
        crossSeason:
          currentStreak[0].seasonNum !==
          currentStreak[currentStreak.length - 1].seasonNum,
        matches: [...currentStreak],
      });
    }

    return streaks;
  };

  // Career All-Time Streaks
  const careerWinStreaks = useMemo(() => {
    return extractStreaksFromList(
      allChronologicalMatches,
      'win',
      'Career'
    ).sort((a, b) => b.length - a.length || b.points - a.points);
  }, [allChronologicalMatches]);

  const careerUnbeatenStreaks = useMemo(() => {
    return extractStreaksFromList(
      allChronologicalMatches,
      'unbeaten',
      'Career'
    ).sort((a, b) => b.length - a.length || b.points - a.points);
  }, [allChronologicalMatches]);

  // Current Active Streaks (evaluated looking backward from latest played career match)
  const activeWinStreak = useMemo(() => {
    const matches = [];
    for (let i = allChronologicalMatches.length - 1; i >= 0; i--) {
      const m = allChronologicalMatches[i];
      if (m.res === 'W') {
        matches.unshift(m);
      } else {
        break;
      }
    }
    if (matches.length === 0) {
      const lastMatch =
        allChronologicalMatches[allChronologicalMatches.length - 1] || null;
      return {
        length: 0,
        isActive: false,
        points: 0,
        ppg: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        cleanSheets: 0,
        cleanSheetPct: 0,
        start: null,
        end: null,
        endedBy: lastMatch
          ? {
              oppAbbr: lastMatch.oppAbbr,
              oppName: lastMatch.oppName,
              oppFlag: lastMatch.oppFlag,
              venue: lastMatch.venue,
              res: lastMatch.res,
              teamScore: lastMatch.teamScore,
              oppScore: lastMatch.oppScore,
              seasonNum: lastMatch.seasonNum,
              seasonYear: lastMatch.seasonYear,
              md: lastMatch.md,
            }
          : null,
        matches: [],
      };
    }
    const gf = matches.reduce((sum, x) => sum + (x.teamScore || 0), 0);
    const ga = matches.reduce((sum, x) => sum + (x.oppScore || 0), 0);
    const cs = matches.filter((x) => x.isCleanSheet).length;
    return {
      length: matches.length,
      w: matches.length,
      d: 0,
      points: matches.length * 3,
      ppg: 3.0,
      gf,
      ga,
      gd: gf - ga,
      cleanSheets: cs,
      cleanSheetPct: (cs / matches.length) * 100,
      start: matches[0],
      end: matches[matches.length - 1],
      endedBy: null,
      isActive: true,
      crossSeason:
        matches[0].seasonNum !== matches[matches.length - 1].seasonNum,
      matches,
    };
  }, [allChronologicalMatches]);

  const activeUnbeatenStreak = useMemo(() => {
    const matches = [];
    for (let i = allChronologicalMatches.length - 1; i >= 0; i--) {
      const m = allChronologicalMatches[i];
      if (m.res === 'W' || m.res === 'D') {
        matches.unshift(m);
      } else {
        break;
      }
    }
    if (matches.length === 0) {
      const lastMatch =
        allChronologicalMatches[allChronologicalMatches.length - 1] || null;
      return {
        length: 0,
        isActive: false,
        points: 0,
        ppg: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        cleanSheets: 0,
        cleanSheetPct: 0,
        start: null,
        end: null,
        endedBy: lastMatch
          ? {
              oppAbbr: lastMatch.oppAbbr,
              oppName: lastMatch.oppName,
              oppFlag: lastMatch.oppFlag,
              venue: lastMatch.venue,
              res: lastMatch.res,
              teamScore: lastMatch.teamScore,
              oppScore: lastMatch.oppScore,
              seasonNum: lastMatch.seasonNum,
              seasonYear: lastMatch.seasonYear,
              md: lastMatch.md,
            }
          : null,
        matches: [],
      };
    }
    const w = matches.filter((x) => x.res === 'W').length;
    const d = matches.filter((x) => x.res === 'D').length;
    const pts = w * 3 + d;
    const gf = matches.reduce((sum, x) => sum + (x.teamScore || 0), 0);
    const ga = matches.reduce((sum, x) => sum + (x.oppScore || 0), 0);
    const cs = matches.filter((x) => x.isCleanSheet).length;
    return {
      length: matches.length,
      w,
      d,
      points: pts,
      ppg: pts / matches.length,
      gf,
      ga,
      gd: gf - ga,
      cleanSheets: cs,
      cleanSheetPct: (cs / matches.length) * 100,
      start: matches[0],
      end: matches[matches.length - 1],
      endedBy: null,
      isActive: true,
      crossSeason:
        matches[0].seasonNum !== matches[matches.length - 1].seasonNum,
      matches,
    };
  }, [allChronologicalMatches]);

  // Season-Specific Streaks Data (Campaign Isolated)
  const seasonStreaksData = useMemo(() => {
    const map = new Map();
    seasons
      .filter((s) => s.pts > 0)
      .forEach((s) => {
        const sMatches = s.fixtures
          .filter((f) => f.hasPlayed)
          .map((f) => ({
            seasonNum: s.num,
            seasonYear: s.year,
            division: s.division,
            md: f.md,
            oppAbbr: f.oppAbbr,
            oppName: f.oppName,
            oppFlag: f.oppFlag,
            venue: f.venue,
            res: f.res,
            teamScore: f.teamScore,
            oppScore: f.oppScore,
            goalDiff: f.goalDiff,
            isCleanSheet: f.oppScore === 0,
            cumPts: f.cumPts,
          }));

        const winStreaks = extractStreaksFromList(
          sMatches,
          'win',
          `Season ${s.num}`
        ).sort((a, b) => b.length - a.length || b.points - a.points);
        const unbeatenStreaks = extractStreaksFromList(
          sMatches,
          'unbeaten',
          `Season ${s.num}`
        ).sort((a, b) => b.length - a.length || b.points - a.points);

        map.set(s.num, {
          seasonNum: s.num,
          seasonYear: s.year,
          division: s.division,
          winStreaks,
          unbeatenStreaks,
          bestWinStreak: winStreaks[0] || null,
          bestUnbeatenStreak: unbeatenStreaks[0] || null,
        });
      });
    return map;
  }, [seasons]);

  // Displayed Streaks based on Scope, Category, Season Filter, and Min Length Filter
  const displayedStreaks = useMemo(() => {
    let list = [];

    if (streakScope === 'career') {
      list =
        streakCategory === 'win'
          ? [...careerWinStreaks]
          : [...careerUnbeatenStreaks];
    } else {
      if (streakSeasonFilter === 'all') {
        seasonStreaksData.forEach((sData) => {
          const sStreaks =
            streakCategory === 'win' ? sData.winStreaks : sData.unbeatenStreaks;
          list.push(...sStreaks);
        });
      } else {
        const sNum = Number(streakSeasonFilter);
        const sData = seasonStreaksData.get(sNum);
        if (sData) {
          list =
            streakCategory === 'win'
              ? [...sData.winStreaks]
              : [...sData.unbeatenStreaks];
        }
      }
    }

    if (streakMinLength === '5+') {
      list = list.filter((st) => st.length >= 5);
    } else if (streakMinLength === '10+') {
      list = list.filter((st) => st.length >= 10);
    } else if (streakMinLength === '15+') {
      list = list.filter((st) => st.length >= 15);
    }

    return list
      .sort((a, b) => b.length - a.length || b.points - a.points)
      .slice(0, 10);
  }, [
    streakScope,
    streakCategory,
    streakSeasonFilter,
    streakMinLength,
    careerWinStreaks,
    careerUnbeatenStreaks,
    seasonStreaksData,
  ]);

  // Top Record Streak in the active view
  const currentRecordStreak = useMemo(() => {
    if (streakScope === 'career') {
      return streakCategory === 'win'
        ? careerWinStreaks[0]
        : careerUnbeatenStreaks[0];
    } else {
      if (streakSeasonFilter !== 'all') {
        const sData = seasonStreaksData.get(Number(streakSeasonFilter));
        return sData
          ? streakCategory === 'win'
            ? sData.bestWinStreak
            : sData.bestUnbeatenStreak
          : null;
      }
      // In Season scope with all seasons combined, find the #1 single-season streak across all individual campaigns
      let best = null;
      seasonStreaksData.forEach((sData) => {
        const candidate =
          streakCategory === 'win'
            ? sData.bestWinStreak
            : sData.bestUnbeatenStreak;
        if (candidate) {
          if (
            !best ||
            candidate.length > best.length ||
            (candidate.length === best.length && candidate.points > best.points)
          ) {
            best = candidate;
          }
        }
      });
      return best;
    }
  }, [
    streakScope,
    streakCategory,
    streakSeasonFilter,
    careerWinStreaks,
    careerUnbeatenStreaks,
    seasonStreaksData,
  ]);

  // Active Streak corresponding to selected category
  const activeStreak = useMemo(() => {
    return streakCategory === 'win' ? activeWinStreak : activeUnbeatenStreak;
  }, [streakCategory, activeWinStreak, activeUnbeatenStreak]);

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

  // Filtered & Sorted Clubs Matrix (All 92 European Clubs)
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

  // Save updated match score
  const handleSaveMatchScore = (newResult, newTeamScore, newOppScore) => {
    if (!ENABLE_EDITING || !editingMatch || !currentSeason) return;

    const { colIndex } = editingMatch;
    const { scoreRowIndex, gdRowIndex } = currentSeason;

    const oldScoreRow = rowsByIndex.get(scoreRowIndex) || [];
    const oldGdRow = rowsByIndex.get(gdRowIndex) || [];

    const newScoreRow = [...oldScoreRow];
    const newGdRow = [...oldGdRow];

    newScoreRow[colIndex] = newResult;
    newScoreRow[colIndex + 1] = newTeamScore;
    newScoreRow[colIndex + 3] = newOppScore;

    const newGd = newTeamScore - newOppScore;
    newGdRow[colIndex + 1] = newGd;

    if (typeof updateItem === 'function') {
      updateItem(scoreRowIndex, newScoreRow);
      updateItem(gdRowIndex, newGdRow);
    }

    setEditingMatch(null);
  };

  // Save season overview update
  const handleSaveSeason = (updatedSeason) => {
    if (!ENABLE_EDITING || !editingSeason) return;
    const { seasonIndex } = editingSeason;
    const oldRow = rowsByIndex.get(seasonIndex) || [];
    const newRow = [...oldRow];

    newRow[5] = parseFloat(updatedSeason.pts) || 0;
    newRow[6] = updatedSeason.clearence;
    newRow[2] = updatedSeason.division;

    if (typeof updateItem === 'function') {
      updateItem(seasonIndex, newRow);
    }

    setEditingSeason(null);
  };

  // Toggle chart line
  const toggleChartSeason = (sNum) => {
    setVisibleChartSeasons((prev) => ({
      ...prev,
      [sNum]: !prev[sNum],
    }));
  };

  // Helper for rendering championship division badges (Loss of emoji and redundant '(1st place)', keeping '(Invincible)' for S4)
  const getBadgeDetails = (s) => {
    if (s.isInProgress) {
      return {
        label: s.position
          ? `In Progress • ${ordinal(s.position)}`
          : 'In Progress',
        badgeClass: 'bg-white text-slate-700 border-slate-300',
        icon: Activity,
        iconClass: 'text-slate-500',
      };
    }
    if (!s.isComplete) return null;
    if (!s.isChampion) {
      return {
        label: s.position ? `Finished ${ordinal(s.position)}` : 'Finished',
        badgeClass: 'bg-slate-50 text-slate-700 border-slate-300',
        icon: Medal,
        iconClass: 'text-slate-500',
      };
    }

    const div = (s.division || '').toUpperCase();
    const label = s.isInvincible ? 'Champions (Invincible)' : 'Champions';
    if (div.includes('DIV 4')) {
      return {
        label,
        badgeClass: 'bg-amber-50 text-amber-950 border-amber-300',
        icon: Trophy,
        iconClass: 'text-amber-600',
      };
    }
    if (div.includes('DIV 3')) {
      return {
        label,
        badgeClass: 'bg-slate-100 text-slate-900 border-slate-300',
        icon: Trophy,
        iconClass: 'text-slate-600',
      };
    }
    if (div.includes('DIV 2')) {
      return {
        label,
        badgeClass: 'bg-yellow-50 text-yellow-900 border-yellow-300',
        icon: Trophy,
        iconClass: 'text-yellow-600',
      };
    }
    return {
      label,
      badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      icon: Trophy,
      iconClass: 'text-indigo-600',
    };
  };

  // Points tab: division filter
  const normDiv = (d) =>
    String(d || '')
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();
  const raceDivisionOptions = Array.from(
    seasons
      .filter((s) => s.pts > 0)
      .reduce((m, s) => {
        const key = normDiv(s.division);
        m.set(key, (m.get(key) || 0) + 1);
        return m;
      }, new Map())
  )
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([div, n]) => ({
      value: div,
      label: div.replace('DIV', 'Div'),
      badge: `${n}`,
      title: `${n} season${n === 1 ? '' : 's'}`,
    }));
  const raceSeasons = seasons.filter(
    (s) =>
      s.pts > 0 &&
      (raceDivisionFilter === 'all' || normDiv(s.division) === raceDivisionFilter)
  );

  // Biggest tier in each group of the career totals row (for the matrix highlight)
  const careerMax = {
    win: Math.max(
      marginTotals.wins.by4Plus,
      marginTotals.wins.by3,
      marginTotals.wins.by2,
      marginTotals.wins.by1
    ),
    draw: Math.max(
      marginTotals.draws.d00,
      marginTotals.draws.d11,
      marginTotals.draws.d22,
      marginTotals.draws.d3Plus
    ),
    loss: Math.max(
      marginTotals.losses.by1,
      marginTotals.losses.by2,
      marginTotals.losses.by3,
      marginTotals.losses.by4Plus
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {SHOW_VERSION_TAG && (
        <div className="fixed bottom-2 right-2 z-40 pointer-events-none px-2 py-0.5 rounded-md bg-slate-900/70 text-white text-[11px] font-semibold tracking-wide">
          {APP_VERSION}
        </div>
      )}
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
                right={`${(careerTotals.totalGF / careerTotals.totalGP).toFixed(2)} G/M`}
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
                      <MatchdayRow key={f.md} f={f} onEdit={ENABLE_EDITING ? () => setEditingMatch(f) : undefined} />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {filteredFixtures.map((f) => (
                  <MatchdayCard key={f.md} f={f} onEdit={ENABLE_EDITING ? () => setEditingMatch(f) : undefined} />
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

        {/* TAB 4: EUROPEAN CLUB MATRIX (ALL 92 EUROPEAN CLUBS) */}
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

      {/* MODAL 1: MATCH SCORE & RESULT EDITOR */}
      {editingMatch && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-md p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setEditingMatch(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-[11px] uppercase mb-1 tracking-[0.1em]">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Season {currentSeason?.num} • Matchday {editingMatch.md}
              </span>
            </div>

            <h3 className="text-lg sm:text-[22px] leading-tight font-extrabold tracking-[-0.005em] text-slate-900">
              Edit Match Result
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              vs {editingMatch.oppName} ({editingMatch.oppAbbr}) •{' '}
              {editingMatch.venue === 'H' ? 'Home' : 'Away'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const tScore = parseInt(form.teamScore.value, 10);
                const oScore = parseInt(form.oppScore.value, 10);
                let res = 'W';
                if (tScore < oScore) res = 'L';
                else if (tScore === oScore) res = 'D';

                handleSaveMatchScore(res, tScore, oScore);
              }}
              className="mt-5 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Our Score
                  </label>
                  <input
                    type="number"
                    name="teamScore"
                    min="0"
                    max="20"
                    defaultValue={
                      editingMatch.teamScore !== null
                        ? editingMatch.teamScore
                        : 2
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Opponent Score
                  </label>
                  <input
                    type="number"
                    name="oppScore"
                    min="0"
                    max="20"
                    defaultValue={
                      editingMatch.oppScore !== null ? editingMatch.oppScore : 0
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">
                  Spreadsheet Sync:
                </span>{' '}
                Saves scores & recalculates goal difference directly into the
                shared spreadsheet rows.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMatch(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center space-x-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Match</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SEASON OVERVIEW EDITOR */}
      {editingSeason && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-md p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setEditingSeason(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg sm:text-[22px] leading-tight font-extrabold tracking-[-0.005em] text-slate-900">
              Edit Season {editingSeason.num} Overview
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Campaign {editingSeason.year} • Row Index #
              {editingSeason.seasonIndex}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                handleSaveSeason({
                  pts: form.pts.value,
                  clearence: form.clearence.value,
                  division: form.division.value,
                });
              }}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Division Name
                </label>
                <input
                  type="text"
                  name="division"
                  defaultValue={editingSeason.division}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Total Points
                  </label>
                  <input
                    type="number"
                    name="pts"
                    defaultValue={editingSeason.pts}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-extrabold text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Clearance Margin
                  </label>
                  <input
                    type="text"
                    name="clearence"
                    defaultValue={editingSeason.clearence}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingSeason(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center space-x-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                const isLoss = m.res === 'L';

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

// Subcomponent: Season-by-Season Venue Swing & Divergence Tracker with Dynamic Points, Wins, Goals Toggle
const MD_SCOPES = [
  { value: 'all', label: 'All Seasons' },
  { value: 'div1', label: 'Div 1' },
  { value: 'lower', label: 'Lower Divisions' },
];
const MD_SORTS = [
  { value: 'md', label: 'Matchday' },
  { value: 'ppg', label: 'Points per game' },
  { value: 'winPct', label: 'Win %' },
  { value: 'gd', label: 'Goal difference' },
  { value: 'cs', label: 'Clean sheets' },
];
// Win-rate colour bands (strip and table)
const PULSE_WINDOW = 5;
export default function LeagueSection(props) {
  return <HoverProvider><App {...props} /></HoverProvider>;
}
