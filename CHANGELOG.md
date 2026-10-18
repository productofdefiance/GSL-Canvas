# Changelog

Every build's changes, newest first, grouped by canvas version. Each entry names its file and keeps its wording.
Until Canvas v51.21 these lived at the top of each file; v51.22 moved them here (the owner is written as "the user"),
and each file now keeps a short header (version, date, latest change). From v51.22 on, each build adds its entry here.

<!-- NEW ENTRIES GO BELOW THIS LINE -->

## Canvas v51.23

### App.js: Canvas v51.23 — 2026-10-18, 04:30 UTC — Page build · UI v35, Index v1, Config v1, CSS v1

- Version line updated. No other changes to this file.

### public/index.html: Canvas v51.23 — 2026-10-18, 04:30 UTC — Page build

- The page written out: `html lang="en"`, a head (charset, the header comment, viewport, title "GSL Canvas", the font
  preconnects and stylesheet, the existing style block) and a body holding the root div. Until now the file had none
  of these; the browser and react-scripts filled them in.
- No doctype yet (the user's call, 18 Oct): without one, browsers draw the page in quirks mode, and adding it
  (standards mode, which the test kit has always used) moves 72 of 120 views: icon and emoji rows take their full
  line height, table rows grow from 29px to 31.5px, table text turns from black to slate-900. The doctype gets its
  own build, with those views reviewed.
- The Tailwind play CDN and its inline config are removed: Tailwind is compiled ahead of time (tailwind.config.js,
  src/index.css). The compiled stylesheet still loads after the style block, as the CDN's styles did.
- Playfair Display is no longer in the font download (only the hidden Lab bar offers it). Lexend, Outfit and
  Atkinson Hyperlegible Next load as before.

### tailwind.config.js: Config v1 — 2026-10-18, 04:30 UTC — Canvas v51.23 (new)

- What the inline config did: every colour family and shade as `rgb(var(--c-<family>-<shade>) / <alpha-value>)`, and
  `fontFamily.sans: ['var(--font-text)']`. Content: `./src/**/*.js` and `./public/index.html`.
- Safelist: `text-<colour>-600` and `text-<colour>-700` for every colour family, the classes ui.js builds at runtime
  (lightTone turns a light text shade into its -700, HighlightCard's icon tone into its -600).

### src/index.css: CSS v1 · src/index.js: Index v1 — 2026-10-18, 04:30 UTC — Canvas v51.23 (new)

- index.css holds the three `@tailwind` lines; index.js imports it once and gets a short header.

### ui.js: UI v35 — 2026-10-18, 04:30 UTC — Canvas v51.23 (page build)

- LabBar adds the Playfair Display stylesheet when it mounts (once), so the Lab's "Playfair Display 600" choice still
  works if SHOW_LAB_BAR is switched back on. Nothing else changes.

### package.json — Canvas v51.23

- `tailwindcss` 3.4.17 (exact pin, devDependencies), which react-scripts 5 runs through PostCSS because
  tailwind.config.js exists.

### Test kit and repo — Canvas v51.23

- css.js builds from ../tailwind.config.js (the site's own file) instead of its own copy of the config. With a
  snapshot folder it also fails if a rendered page uses a class the build lacks (a class name built at runtime).
- Known: the kit's own pages (render, bundle, pixel.js without PX_SITE) carry a doctype, so they draw in standards
  mode while the live page draws in quirks mode, until the doctype build.
- New browser/prod.js (production builds of a git ref or the working tree, with the `__OV` test hook or `--plain`),
  browser/site.js (serves a build; a stand-in for the play CDN, which cloud sessions can't reach) and browser/load.js
  (load numbers at 390 with 4x CPU slowdown). pixel.js shoots a production build with `PX_SITE` (and `PX_PLAYCDN`).
- CLAUDE.md: Tailwind is compiled ahead of time; class names written whole or safelisted with a reason; one config
  for the kit and the site; the layout lists tailwind.config.js and src/index.css. README.md lists them too.
- Brief saved as briefs/v51.23.md.

## Canvas v51.22

### App.js: Canvas v51.22 — 2026-10-18, 02:05 UTC — Code tidy · League v37, LeagueTabs v14, UI v34, Cups v20, Cups Lab v3, Pyramid v31, Squad v33

- The unused row shift (shiftRows, rowShift: 0 on every page) is removed; each page reads its sheet as before.
- Version line updated. The long header changelog moved here; the file keeps a short header.

### League.js: League v37 — 2026-10-18, 02:05 UTC — Canvas v51.22 (code tidy)

- Removed everything no live code read: the state, memos and helpers left behind when Form & Margins, Points, Home vs Away and Spider moved to LeagueTabs.js (among them outliersAndExtremes, activeHomeAway, seasonMargins, getBadgeDetails, droppedSummaryKPIs, moveFloatingTooltip, LeagueTierBar, MarginCell, formatClearance, MD_SCOPES, MD_SORTS, PULSE_WINDOW, the club defaults of the old Spider state), the switched-off editing (ENABLE_EDITING, its two forms and save handlers), the hidden corner version tag and the old Home / Away tap state (it decided touch from (hover: none)). 4,179 lines to 1,875 (the header move included).
- Kept, because live code reads them: rowsByIndex, seasons (all four LeagueTabs tabs and the three tabs here) and clubs (Form & Margins, Spider, Opponents).
- Counts from the sheet: a season is finished at 2 × (clubs in its division − 1) games, from the Pyramid sheet (ui.js seasonGames), not a typed-in 38 / 46; the opponents are every club column except the managed club (✦) and sheet errors (#N/A), not the first 91; matchdays run to the sheet's next heading, not column 212; no season-number cap (was 20). Same results on today's data (compared field by field).
- Seasons' Highlights bar shows "— G/M" with no matches (was "NaN G/M").

### LeagueTabs.js: LeagueTabs v14 — 2026-10-18, 02:05 UTC — Canvas v51.22 (code tidy)

- FloatCard places itself with ui.js viewport() instead of reading window.innerWidth / innerHeight (same numbers).
- Unused names removed (Activity, ChevronUp, RecordKey, an old momentum-chart geometry block, PADX); an inert overflow-x-auto removed from the Spider picker's desktop column (it never scrolls sideways).
- The v12 heading in this file's changelog, broken in v51.21, is restored (above, under Canvas v51.20).

### ui.js: UI v34 — 2026-10-18, 02:05 UTC — Canvas v51.22 (code tidy)

- viewport(): the window's size in pixels for placing fixed cards, the one place the canvas reads window.innerWidth / innerHeight; HoverProvider's card, SegmentBar's card and screenNow's fallback use it.
- seasonGames(division): games in a full league season, 2 × (clubs − 1), clubs counted from the Pyramid sheet.
- useGridColumns measures with media queries (as useScreen does) instead of window.innerWidth; same columns at every width.

### Cups.js, CupsLab.js, Pyramid.js, Squad.js: Cups v20, Cups Lab v3, Pyramid v31, Squad v33 — 2026-10-18, 02:05 UTC — Canvas v51.22 (code tidy)

- Unused imports, functions, state and values removed (ESLint's list); nothing on screen changes. Their rule breaks are listed as page debt in test/rules-allow.json.

### Test kit and repo — Canvas v51.22

- npm run check now runs syntax, compile, build, rules (rules.js + rules-allow.json), lint (ESLint, lint-baseline.json), render (sub-11px per page and tab, baseline.json) and the empty-save check (empty.js). New: browser/pixel.js (before / after screenshots compared pixel by pixel), clubs.js, pages.js.
- CHANGELOG.md (this file) holds every file's history; file headers are short.

## Canvas v51.21

### App.js: Canvas v51.21 — 2026-10-17, 23:30 UTC — Spider Matrix on phones · LeagueTabs v13, UI v33

- Version line updated. No other changes to this file.

### LeagueTabs.js: LeagueTabs v13 — 2026-10-17, 23:30 UTC — Canvas v51.21 (Spider Matrix on phones)

- Versus on phones: a "Quick picks" eyebrow, then every quick pick on one row that scrolls sideways (36px chips, 44px tap areas); the selected one kept in view (ui.js useKeepInView). Each scorecard pillar gets a verdict chip on its header line (the desktop column's words; the leading layer's colour on its 10% / 15% tint, or ink where that colour can't reach 4.5:1), in place of the desktop column. Desktop unchanged.
- Group on phones, Lines: the pillar row is the tap target ("Tap to rank ›") and opens a docked ranked card (best first, ties share a rank, the career average as a divider row; a layer row brings it forward). The tapped row is marked (accent tint, 3px bar); dots are no longer tap targets on phones. Desktop dots keep their hover cards.
- Group: a finished tap on a chip, an outline or a table row brings that layer forward (toggles); mouse hover as before.
- [i] on the comparison, Group and Highs & lows; "Outlines only." and both Highs & lows subtitles removed.
- 44px tap areas on phones: Versus / Group, Change ▾, ⇄, quick picks, the picker's kinds, rows, venue chips, search and Us / Them switch, Seasons / Clubs, Lines / Table, chip ✕, Add menu rows, table rows, By club / By season, the minimum-games filter, the radar's pillar labels.
- Points race season strip: its keep-in-view logic moved to ui.js (useKeepInView); same behaviour.
- Sideways rows use ui.js ScrollRow, so an edge fades where more is hidden: the Points season strip and the picker's kinds on phones (white card), the quick picks and the Group chips (page background), in light and dark. Ranked card rows are 44px tall. Verdict chips name a club layer by its abbreviation ("CHE by 12.7%").

### ui.js: UI v33 — 2026-10-17, 23:30 UTC — Canvas v51.21

- useKeepInView: keeps the selected item of a sideways-scrolling row fully in view (16px in from the edge it was hidden behind), scrolling only the row. Runs when its reset key changes, after web fonts arrive and when the row or its content resizes; stops once the user scrolls the row (touch, pen or wheel) until the key changes. Moved here from the Points season strip (v51.20) so Spider's quick picks share it.
- ScrollRow: surface ('card' or 'page') gives the edge fade the colour of the surface behind the row in light and dark; boxRef hands over the scrolling box (useKeepInView); other props go onto it; the fades update when the row's content resizes. Existing callers unchanged.
- TapStyle renders a hidden <style>: inside a space-y-* stack the plain one counted as an item and added a gap above the next (Home vs Away's top sat 24px low from v51.19).

## Canvas v51.20

### App.js: Canvas v51.20 — 2026-10-17, 22:00 UTC — Points on phones · LeagueTabs v12, UI v32

- Version line updated. No other changes to this file.

### LeagueTabs.js: LeagueTabs v12 — 2026-10-17, 22:00 UTC — Canvas v51.20 (Points on phones)

- Points race and Matchday benchmarks: subtitles removed; their words (from the section [i] blurbs) live in each section's [i].
- Matchday benchmarks on phones: the ledger starts folded under "Show all N matchdays ▾" (N from the data). The strip scrubs: a sideways slide reads the matchday under the finger (cellAt); a tap opens or switches a cell's card. The open cell gets a 2px ink outline 2px out, the rest drop to 35%; a hint shows while no card is open (hidden, not removed, so the page never shrinks and scrolls). The docked card: MD, games and season range, Record, Win % (a tag in the cell's heat colour), PPG, GD, the rank line, Best win (drawn flag, club code, score, season) and "See in ledger →", which unfolds the ledger, scrolls the row to the middle and marks it (accent tint, 3px accent bar) until another row opens, the ledger folds or the filter changes. On phones a tap on a cell no longer opens its row. Desktop unchanged.
- Pace on phones (option A): mode, baseline and division switches on three rows; the baseline switch reads Average / Record / Last season and the legend carries its value ("Average · 2.40 PPG"); "Measured against" goes. Desktop unchanged.
- Points race season strip: the focused season is kept in view whenever the layout can have moved (focus, mode or division change, web fonts arriving, the strip or a cell resizing), not only when focus changes; once the user scrolls the strip, it leaves it alone until focus, mode or division changes.
- Home vs Away: Venue swing's [i] uses a curly apostrophe (season’s).
- [i] text: the two "Good to know" lines no longer name season lengths (corrected in the blurbs doc), so they hold for any save.

### ui.js: UI v32 — 2026-10-17, 22:00 UTC — Canvas v51.20

- useTapAway: a tap inside any open card ([data-hv-card]) no longer closes it, so a docked card can hold a button (Matchday benchmarks' "See in ledger"). Taps on hover targets ([data-hv]) are left to them, as before.
- SectionInfo: the open icon in dark mode uses the accent's lighter shade (ACCENT_HEX_LIGHT: indigo-400 for League) on a 15% tint; light mode as before.

## Canvas v51.19

### App.js: Canvas v51.19 — 2026-10-17, 20:00 UTC — Home vs Away on phones + section [i] · LeagueTabs v11, UI v31

- Version line updated. No other changes to this file. Pyramid v30 and Squad v32 come in with the touch hover-card fix.

### LeagueTabs.js: LeagueTabs v11 — 2026-10-17, 20:00 UTC — Canvas v51.19 (Home vs Away on phones + section [i])

- Section takes info: the section's [i] (ui.js SectionInfo, R14) at the top right of its header; on desktop it follows the header's controls.
- Home vs Away: Venue swing, the side-by-side and Venue ledger lose their descriptions; the words (from the section [i] blurbs) live in their [i].
- Venue ledger on phones: one value a side (the metric in the switch), the season, its division and the split bar with both shares in the middle; the stronger side in ink, the weaker faded. Rows still select.
- Side-by-side on phones: values on a top line with the label centred; bars grow out from an 86px spine holding the gap (22px, ◂ / ▸ at the stronger venue). Bar = value ÷ the row's larger value × half the row.
- Tap targets on phones: metric switches, Combine seasons, its chips and shortcuts, Clear, the selection chip and the swing chart's season columns get 44px tap areas (TAP); ledger rows are 52px tall.
- Desktop unchanged apart from the three descriptions.
- Every hover card (Points race, Matchday benchmarks heat, Margin distribution, Momentum pulse and Overlay, streak pulses, Venue swing, last-5 form, Spider axis labels and Group dots) runs on ui.js's useHoverCard: a tap opens or switches it, a second tap, a tap anywhere else or a scroll closes it; the Points race and Overlay still scrub with a sideways slide. Mouse unchanged. pointAt and leaveUnlessTouch removed.

### ui.js: UI v31 — 2026-10-17, 20:00 UTC — Canvas v51.19

- SectionInfo (R14): a section's description in an [i] at the top right of its header. Lucide Info, 18px, slate-400, in a 44px tap area; the page accent on a 10% tint while open. Desktop: a 330px popover under the icon (closes on outside click, Esc or the icon). Phones: the bottom Sheet titled by the section (closes on ✕, swipe down, tap outside). One open at a time across the page. INFO_TEXT styles the rich text (bold lead, paragraphs, lists, bold labels).
- Sheet: new fit option: on phones a bottom sheet as tall as its content (at most 85% of the screen) that closes on a downward swipe of any part marked data-sheet-grab. Existing callers (no fit) are unchanged.
- TapStyle + TAP: the gsl-tap class gives a small control an invisible 44 × 44px tap area on phones; the control's look doesn't change. Segmented takes tap to use it on its buttons; existing callers unchanged.
- Hover cards on touch, one set of rules for every page (iPhone sends no pointermove for a plain tap, and no click for a tap on blank space): useHoverCard (a card that follows a target: opens on a tap, switches on another, closes on a second tap, a tap anywhere else or a scroll; a sideways slide scrubs where asked), useTapAway (close on a finished tap outside, pointerup, never touch-down or click; and on scroll), useOverlay (one overlay at a time: an opening card or [i] closes the rest) and useTouchCard (both, for a page's own docked card). HoverProvider and usePointerTrack close through useTapAway instead of a document click. The [i] popover and sheet sit above hover cards (z 80; Sheet takes z). Cards carry data-hv-card for the kit's tap test.

### Pyramid.js: Pyramid v30 — 2026-10-17, 20:00 UTC — Canvas v51.19 (touch hover cards)

- Progression's touch scrub, the European positions card and Staying power's card close through ui.js's useTouchCard: a finished tap anywhere else (iPhone sends no click for blank space), a scroll, or another card or [i] opening. They used to wait for a click.

### Squad.js: Squad v32 — 2026-10-17, 20:00 UTC — Canvas v51.19 (touch hover cards)

- Growth by age: the touch scrub ends through ui.js's useTouchCard: a finished tap anywhere else (iPhone sends no click for blank space), a scroll, or another card or [i] opening. It used to wait for a click.

## Canvas v51.18

### App.js: Canvas v51.18 — 2026-10-17, 07:45 UTC — Quick fixes

- The Lab bar is rendered only while SHOW_LAB_BAR (ui.js) is true; it is false, so the bar is gone. Version line updated (Cups v19 too).

### League.js: League v36 — 2026-10-17, 07:45 UTC — Canvas v51.18

- Signed numbers (Seasons, Matchdays, Opponents: goal differences, points vs last season) use ui.js's shared signed(); the local copy is removed. Zero now shows no sign ("0 vs S3", "0 GD" instead of "+0").

### LeagueTabs.js: LeagueTabs v10 — 2026-10-17, 07:45 UTC — Canvas v51.18 (quick fixes)

- Minus signs: every signed number (axis labels, pace, deltas, GD, hover cards) goes through ui.js's signed(): true minus sign, no sign on zero.
- Points: Best season's date sits on its own line under the Invincible chip on phones and never wraps. Perfect matchdays wraps to two lines at most, then ends with "+N" (ClampList); never "…". Heat legend "<25%", on one line at 390. The season strip scrolls (never the page) to keep the focused season in view, 16px in from the edge.
- Points race on phones: the plot uses the full width (right margin = the longest end label + 6px) and the x-axis shows bare numbers; desktop keeps "MD 1". Ticks come from the data: 1, every 10, and each completed season's length (a multiple of 10 within 4 of one is dropped).
- Home vs Away: on phones the Points card comes first at full width. The swing bar's away figures keep light mode's dark ink in dark mode.
- Spider Matrix on phones: the radar fills its box and every pillar label sits inside it, 8px clear; side labels wrap to two lines and the web shrinks to fit. Desktop unchanged. Versus subtitle removed; Group's count line drops its hover hint; its subtitle is "Outlines only."

### ui.js: UI v30 — 2026-10-17, 07:45 UTC — Canvas v51.18

- Fonts locked: page titles default to Outfit (LAB_CHOICES.title.def). SHOW_LAB_BAR = false: App doesn't render LabBar, and the locked set (every LAB_CHOICES def) goes on <html> on every load; a saved gsl-fonts choice is ignored. LabBar, LAB_CHOICES and the CSS are kept; true brings the Lab back as before.
- signed(n, digits) and MINUS: the shared formatter for signed numbers ("+" positive, the minus sign U+2212 negative, no sign for zero).

### Cups.js: Cups v19 — 2026-10-17, 07:45 UTC — Canvas v51.18

- Removed Flag from the lucide-react import: it clashed with ui.js's Flag (a duplicate import that stops react-scripts compiling). Every use is ui.js's <Flag emoji=…>, so nothing on the page changes.

## Canvas v51.17

### App.js: Canvas v51.17 — 2026-10-17, 12:00 UTC — Dark-mode fixes

- ChromeContext also carries dark (the page is shown dark), read with ui.js's useDark(). Version line updated.

### LeagueTabs.js: LeagueTabs v9 — 2026-10-17, 12:00 UTC — Canvas v51.17 (dark-mode fixes)

- Spider Matrix: the Career layer colour (INK) is the ink token as a CSS variable, so its radar line and dots, scorecard bars, legend swatch, card swatch and top strip show in dark mode. The opponent clash check compares against the ink hex of the mode that is on (useDark).
- Selected chips (Points season strip All / None, Home vs Away combine seasons, Spider Change ▾, Venue season scope, quick picks) use text-slate-50 instead of text-white, so they stay readable in dark mode.

### ui.js: UI v29 — 2026-10-17, 12:00 UTC — Canvas v51.17

- useDark(): true while the open page is shown dark (the switch is on and the page is converted). App passes it in ChromeContext. Only for code that works with colour values (e.g. clash checks); classes and CSS variables already swap by themselves.
- INK_HEX: the ink token as hex, { light: '#0f172a', dark: '#f1f5f9' }.

## Canvas v51.16

### App.js: Canvas v51.16 — 2026-10-11, 12:00 UTC — GitHub pilot set-up (infrastructure only)

- Version line updated. No other changes to this file. Repo tidy-ups: CLAUDE.md renamed, test kit moved into test/, .gitignore added.

## Canvas v51.15

### App.js: Canvas v51.15 — 2026-10-09, 11:00 UTC — League locked · League v35, LeagueTabs v8

- Version line updated. No other changes to this file.

### League.js: League v35 — 2026-10-09, 11:00 UTC — Canvas v51.15

- Campaigns ledger: on wide screens the column groups spread across the full width (space goes between groups; columns inside a group stay together), with roomier groups from 1536px.

### LeagueTabs.js: LeagueTabs v8 — 2026-10-09, 11:00 UTC — Canvas v51.15

- Momentum Overlay hover card: titled by matchday; shows the plotted value (5-game average GD), the change from the previous matchday, rank, and the result with the opponent's flag and code.
- Highs & lows: "Biggest wins vs top teams", explainer text removed.

## Canvas v51.14

### App.js: Canvas v51.14 — 2026-10-09, 09:00 UTC — League review fixes · League v34, LeagueTabs v7, UI v28

- Version line updated. No other changes to this file. public/index.html (v51.07) must be in place for division colours.

### League.js: League v34 — 2026-10-09, 09:00 UTC — Canvas v51.14 (the user's League review)

- Campaigns ledger: Home / Away labels are part of their header groups, so they always line up with their columns.
- Matchdays list: two columns on very wide screens (1536px+).
- Opponents: Highlights bar (Clubs faced, Most played, Best record, Toughest opponent, Never beaten by); nation chips carry flags.

### LeagueTabs.js: LeagueTabs v7 — 2026-10-09, 09:00 UTC — Canvas v51.14 (the user's League review)

- Points race: the compare card ranks on points, then goal difference, with a cumulative GD column; All / None is one compact control.
- Matchday benchmarks: the drawer uses club codes, four columns, compact rows (as in Streaks).
- Form & Margins: Margin distribution loses its Table view; Momentum pulse Overlay gets a hover card (each season's 5-game average, rank and that match's result); Biggest scalps becomes "Top-ranked clubs beaten", with each club's average rank labelled.
- Home vs Away: spine labels sit lower (between the row top and the number); the Venue ledger's split follows its Points / Wins / Goals switch.

### ui.js: UI v28 — 2026-10-09, 09:00 UTC — Canvas v51.14

- FilterPills: optional icon before the label (Opponents nation flags).

## Canvas v51.13

### App.js: Canvas v51.13 — 2026-10-09, 05:00 UTC — Spider Matrix · League v33, LeagueTabs v6, UI v27

- Version line updated. No other changes to this file.

### League.js: League v33 — 2026-10-09, 05:00 UTC — Canvas v51.13 (Spider Matrix)

- Spider Matrix now comes from LeagueTabs.js (SpiderTab). The club you manage is read from the sheet (name marked ✦, with its flag and colour) and passed in as ownClub.
- Removed tab code no longer used since v51.08–v51.13: the old Spider Matrix, Matchday Benchmarks, Momentum Pulse, Points Race chart, Venue cards and Venue Divergence Tracker, and their helpers.

### LeagueTabs.js: LeagueTabs v6 — 2026-10-09, 05:00 UTC — Canvas v51.13

- New SpiderTab (locked design): Versus (two layer cards with R12 strips, picker anchored under Change: Career, Seasons, Venue with season scope, Opponents with search and the us / them toggle; swap; quick picks) and Group (seasons or clubs, up to 8 / 6, chips with remove and Add, outline radar with highlight, dot lines or a table). Pillar spec: more is better, shared scales (win 0–100%, conceded 2.5–0, clean sheets 0–70%, PPG 0–3, blowouts 0–70%, scored 0–4); off-scale values clamp on the web with an arrow and stretch only that row. Radar Option 1 (only each layer's lead is filled). Highs & lows by club (All, 5+, 10+, Top 10) or by season. Axis labels explain each pillar on hover.

### ui.js: UI v27 — 2026-10-09, 05:00 UTC — Canvas v51.13

- ownClubInfo(): the club you manage (name, abbreviation, flag, colour), read from the Pyramid sheet's ✦ marker. Used by the Spider Matrix.

## Canvas v51.12

### App.js: Canvas v51.12 — 2026-10-09, 02:00 UTC — Home vs Away + Points race · League v32, LeagueTabs v5

- Top Bar fits a phone again: the section links scroll instead of pushing the theme and fold buttons off-screen (a v51.06 regression).

### League.js: League v32 — 2026-10-09, 02:00 UTC — Canvas v51.12 (Home vs Away)

- Home vs Away now comes from LeagueTabs.js (HomeAwayTab), built from the locked design. The old tab code is removed.

### LeagueTabs.js: LeagueTabs v5 — 2026-10-09, 02:00 UTC — Canvas v51.12

- New HomeAwayTab (locked design): career Highlights bar with venue tags; Venue swing with the career split bar, Points / Wins / Goals, click a season, Combine seasons (plus Div 1 / lower-division shortcuts); the side-by-side for the selection (spine option E) with last-5 hover on Home / Away; Venue ledger mirrored around the points split, its own metric switch, sortable, rows select seasons.
- Points race: magnifier removed; the hover card floats beside the cursor (flips sides) instead of the side panel; chart full width; Average and Record labels at the left; works by touch (drag to scrub).
- Every hover in this file works by touch: on a phone the card shows fixed at the bottom of the screen and stays up after the finger lifts.

## Canvas v51.11

### App.js: Canvas v51.11 — 2026-10-08, 04:00 UTC — every League table sorts · League v31, LeagueTabs v4, UI v26

- Version line updated. No other changes to this file.

### League.js: League v31 — 2026-10-08, 04:00 UTC — Canvas v51.11 (R11: every table sorts)

- Sortable by their headers: the Matchdays list, the Campaigns ledger (the unstarted season stays last), the Opponents ledger (the control bar's sort stands until a header is clicked) and the Venue Ledger. Phone ledgers have no headers; they follow the desktop order.

### LeagueTabs.js: LeagueTabs v4 — 2026-10-08, 04:00 UTC — Canvas v51.11

- Sorting now uses the shared useSort from ui.js (same behaviour).

### ui.js: UI v26 — 2026-10-08, 04:00 UTC — Canvas v51.11

- useSort: the shared sortable-table hook (R11, every table sorts by its headers). LeagueTabs and League both use it.

## Canvas v51.10

### App.js: Canvas v51.10 — 2026-10-08, 02:00 UTC — Points race panel, Streaks and Dropped points fixes · LeagueTabs v3

- Version line updated. No other changes to this file.

### LeagueTabs.js: LeagueTabs v3 — 2026-10-08, 02:00 UTC — Canvas v51.10

- Points race: the hover card moves into a side panel beside the chart, so it never covers the magnifier; at rest it shows the season's end. Pace view gets the same panel (pace gap, rank, PPG) and a third baseline, last season's PPG. All / None for the season strip.
- Streaks: headers never wrap (sorting by goals no longer breaks the row); more room between the first columns; Ended by uses club codes; the drawer's rows are compact, with wide gutters between columns.
- Dropped points by season: Dropped shows the total with a draws / defeats split bar; clubs listed under Drawn with (amber) and Lost to (rose), ×2 when it happened twice.

## Canvas v51.09

### App.js: Canvas v51.09 — 2026-10-07, 22:00 UTC — v51.08 fixes · LeagueTabs v2

- Version line updated. No other changes to this file.

### LeagueTabs.js: LeagueTabs v2 — 2026-10-07, 22:00 UTC — Canvas v51.09 (the user's v51.08 notes)

- Hover cards back: Margin distribution segments (count, share, the matches) and Momentum pulse bars (fixture, GD, 5-game average). Hover cards now sit on the page (fixed), so no table can clip them.
- Momentum pulse fills its card; One season / Overlay (each season's 5-game average) restored.
- Highs & lows: filter removed; six cards: Biggest wins, Heaviest defeats, Highest-scoring draws, Biggest scalps (wins over the best-ranked clubs), Most common scores, Clean sheets and blanks (now with longest runs and the best season).
- Streaks: length filter removed (all runs of 2+, longest first); the drawer uses club codes and fits four columns.
- Every table sorts by its headers (Streaks, Dropped points both views, Matchday benchmarks).
- Dropped points by season lists every club points were dropped against (code, points, draws and defeats); the top card shows the club's flag.
- Points race: fills its card; Focus has a hover card (points, fixture, against record pace); the record-pace label moves clear of the season label; the magnifier follows the cursor (rests on the run-in); the season strip's ticks show in dark mode; S1 is lime, not slate.
- Matchday benchmarks: best and worst decided by PPG, then goal difference, then goals; the cards show GD; Perfect matchdays lists them.

## Canvas v51.08

### App.js: Canvas v51.08 — 2026-10-07, 18:00 UTC — Form & Margins + Points · League v30, LeagueTabs v1 (new file)

- Version line updated. No other changes to this file.

### League.js: League v30 — 2026-10-07, 18:00 UTC — Canvas v51.08 (Form & Margins + Points)

- Form & Margins and Points now come from the new module LeagueTabs.js (designed in the v51 Palette Lab). The old tab code is removed.

### LeagueTabs.js: LeagueTabs v1 — 2026-10-07, 18:00 UTC — Canvas v51.08

- First version: FormMarginsTab, PointsTab. /

## Canvas v51.07

### App.js: Canvas v51.07 — 2026-10-07, 01:30 UTC — Seasons and Opponents · League v29, index.html

- Version line updated. No other changes to this file.

### League.js: League v29 — 2026-10-07, 01:30 UTC — Canvas v51.07 (Seasons and Opponents)

- Seasons: Campaigns has a Cards / Ledger switch (remembered per device). · Cards: a header strip in the division colour ("S1 · 2024–25", "DIV 4"); finish with a trophy for champions; points with the title margin; record and goals with GD; home / away split in the blue pair; a chip only when it adds information (Invincible). Unstarted seasons are a dashed card. · Ledger: season, division, finish, points, margin · GP, record, PPG, win % · goals, GD, clean sheets, failed to score · Home and Away blocks (GP, points, record, GD), tinted · status. Phones get a short ledger (season, finish, points over record, goals over GD). · Highlights bar: repeated bylines removed (R6): PPG shows total points instead of "Points Per Game"; Clean Sheets drops the games count.
- Opponents: Cards / Ledger switch; sorted by average rank by default (clubs with no rank last). · Card: club colour edge, bigger flag and name (no code or country), average rank top right, the record as the hero with a results bar, goals with GD, points won, last 5 (most recent first). · Ledger: club with average rank in grey · GP, record, win % · goals, GD, clean sheets · points (25/30), PPG · current unbeaten run · last 5 as score chips, biggest win (season, venue). Faint zebra rows; phones get a short ledger. · Goals, clean sheets, last 5, unbeaten run and biggest win are worked out from every league meeting.

## Canvas v51.06

### App.js: Canvas v51.06 — 2026-10-06, 21:00 UTC — Foundations + Matchdays · League v28, UI v25, Squad v31, index.html

- Dark mode switch in the Top Bar (sun / moon), remembered per device. Only pages converted to the design system go dark (League for now); the others stay light even with dark mode on.
- The page wrapper carries gsl-page (the dark page colour).
- Version line updated.

### League.js: League v28 — 2026-10-06, 21:00 UTC — Canvas v51.06 (foundations + Matchdays)

- Matchdays redesigned (v51 design rounds 1–6): · Main bar in League indigo: "Season 8 · 2031–32" over "Division 1 · 1st" with a trophy for champions; arrows and a season row that keeps the chosen season in view (right-aligned on desktop, under the title on phones). Replaces the season card and the dark summary band. · Highlights bar (style 2): Record (full width on phones), Finish (chip only when it adds information; "Sealed MD 34" as text; movement or a division debut when there's no title), Points (+ clear of 2nd, vs last season in the same division), Goals (+GD), PPG (rank among your seasons). · One control row: result and venue filters, Cards / List switch (remembered per device), search, reset. · Cards: the opponent's club colour as the left edge, bigger flag and name, W / D / L chip beside a neutral score, GD in its result colour (a draw is a plain grey 0), running points. · List: one line per match (matchday, venue, colour mark, opponent, chip, score, GD, total); phones stack matchday over venue and GD under the total.
- Points: Matchday Benchmarks headlines with section stat cards (R8) instead of a Highlights bar (R5).
- Home and away use the blue pair: navy (home) and sky (away) on the Home vs Away tab, the venue filter and the Spider Matrix.

### ui.js: UI v25 — 2026-10-06, 21:00 UTC — Canvas v51.06 (foundations)

- Highlights bar style 2 ("Minimal + accents"): a white bar with the page accent as its top edge; cards light grey; numbers in ink; colour only in icons and the first byline. Old colour classes passed in by pages are translated (e.g. text-amber-300 → text-amber-700).
- Page accents: Cups' "amber" becomes yellow-gold, Squad's "maroon" becomes violet (the key names stay, so pages need no edits).
- New: SectionStats (light grey section stat cards, R8), ViewSwitch (Cards / List / Ledger), MainBar (a tab's scope band: title + control), HOME_HEX / AWAY_HEX (navy / sky), Segmented home / away tones.
- Hover cards carry gsl-keep, so dark mode leaves them as they are.

### Squad.js: Squad v31 — 2026-10-06, 21:00 UTC — Canvas v51.06

- Accent: maroon becomes violet (#7c3aed), the same for every club (v51 palette).

## Canvas v51.05

### App.js: Canvas v51.05 — 2026-10-05, 09:00 UTC — Type system on all of League · League v27, Cups v18, UI v24, index.html

- Version line updated. No other changes to this file.

### League.js: League v27 — 2026-10-05, 09:00 UTC — Canvas v51.05 (type system, whole page)

- Every tab moves onto the v51 type system (Contrast profile): weights 400 / 500 / 600 / 800 (black becomes 800, bold becomes 600, small text never above 600); capitalised labels at 11px, 600, 0.1em; section titles 22px; big numbers in the big-number font (.gsl-big) with the lab spacing; table, chart and supporting numbers in the small-number font (tabular-nums).
- Records show numbers only (6 • 2 • 1, coloured win / draw / loss); the Highlights record is plain with a "W • D • L" hint in its label. Records inside sentences keep their letters.
- Points tab: units no longer played down (the lab option is gone).

### ui.js: UI v24 — 2026-10-05, 09:00 UTC — Canvas v51.05 (type system)

- Four font roles, each with a lab switch: Text, Titles (page titles only: .gsl-title), Big numbers (.gsl-big: Outfit by default) and Small numbers (tabular-nums: Atkinson by default). TYPE.big is the only big number role; scores and table figures are small numbers.
- Records show numbers only: WDLRecord renders 6 • 2 • 1 (coloured, or plain), RecordKey renders the "W • D • L" hint for a label. numberize() turns "245W - 52D - 31L" into a record and " - " into the score dash; HighlightCard uses it on values and bylines.
- Units played down: removed (Unit and unitize are gone). Big-number spacing options −0.02 to +0.1em.

### Cups.js: Cups v18 — 2026-10-05, 09:00 UTC — Canvas v51.05

- Highlights records now show numbers only (shared change), so their labels carry the "W • D • L" hint: both Record cards and the Domestic, Continental and Super Cups records (Competitions).

## Canvas v51.04

### App.js: Canvas v51.04 — 2026-10-05, 05:00 UTC — Lab bar, units, number fonts · League v26, UI v23, index.html

- The v51 lab controls move out of the Footer into their own bar above it (LabBar), opened and closed with a button.
- Version line updated.

### League.js: League v26 — 2026-10-05, 05:00 UTC — Canvas v51.04

- Points tab (pilot): units played down (lab setting) on the Points Race card's "pts", the Win % and clean-sheet % in Matchday Benchmarks.

### ui.js: UI v23 — 2026-10-05, 05:00 UTC — Canvas v51.04

- LabBar: the v51 lab controls move out of the Footer into their own bar above it, opened and closed with a button (kept per device). Numbers can now be Outfit, Lexend, Atkinson or League Spartan; big-number spacing 0 / +0.02 / +0.04 / +0.06em; Units: played down or normal.
- Score dash: lighter weight only (300), no fade (the user's pick). The colour option is gone.
- Unit: plays down a number's unit (pts, W / D / L, %, $ and M / K, GP, MD...). unitize() does it for a whole value string; HighlightCard uses it on every page, and also turns " - " between numbers into the score dash.
- WDLRecord letters are Units now (they follow the Units setting).

## Canvas v51.03

### App.js: Canvas v51.03 — 2026-10-05, 03:00 UTC — Scorelines, spacing, sandbox bar · League v25, UI v22, index.html

- Top Bar is dark pink (pink-800) in the sandbox, so it can't be mistaken for the main project. GSL mark and inactive buttons in light pink.
- Footer: LabSwitcher (fonts, score dash, big-number spacing).
- Version line updated.

### League.js: League v25 — 2026-10-05, 03:00 UTC — Canvas v51.03

- Points tab (pilot): scorelines use the shared Score (spaced, played-down dash): Matchday Benchmarks' Goals column, results in an opened matchday, and the goals in the matchday card. W / D / L records use the shared WDLRecord (table and card).

### ui.js: UI v22 — 2026-10-05, 03:00 UTC — Canvas v51.03

- Score: a scoreline with an en dash that is spaced and played down (lab switch: lighter weight, lighter colour, or both).
- WDLRecord: 7W • 0D • 1L with the letters a step lighter than the digits and the dots played down like the score dash.
- Big numbers: letter spacing from a lab switch (0 or +0.01em) instead of −0.01em, which made Outfit's heavy digits touch.
- The Footer lab control (LabSwitcher) now holds fonts, the dash and the big-number spacing. FontSwitcher stays as its old name.

## Canvas v51.02

### App.js: Canvas v51.02 — 2026-10-05, 01:30 UTC — Type roles pilot (sandbox) · League v24, Pyramid v29, UI v21

- Version line updated. No other changes to this file.

### League.js: League v24 — 2026-10-05, 01:30 UTC — Canvas v51.02 (type roles pilot)

- Points tab is the v51 pilot: every title, label, chip, number and table on it uses the Contrast type roles (ui.js TYPE). Capitalised labels: 11px, 600, 0.1em spacing. Titles in title case ("Win Rate By Matchday"). Numbers that stand alone use the number font.
- Points Race Select All / Clear All: built from the seasons in the data (was a typed-in 20).
- Title case: "Wins By Margin", "Draws By Score", "Losses By Margin".

### ui.js: UI v21 — 2026-10-05, 01:30 UTC — Canvas v51.02 (type roles pilot)

- TYPE: the Contrast ("Matchday broadcast") type roles, one class string per job (page, section, card, eyebrow, body, name, meta, chip, button, tab, big, fig, figStrong, score, micro). withRole() swaps a class string's weight and letter spacing for a role's.
- Shared pieces moved onto the roles (every page): Title Row title, Tab Bar (active tab 600), Highlights cards (capitalised 11px labels, big numbers 800 in the number font), shared hover card title, controls (Segmented, FilterPills, ControlLabel, ResetButton, selects) at 600.

### Pyramid.js: Pyramid v29 — 2026-10-05, 01:30 UTC — Canvas v51.02

- Title case: "Finishes Over Time", "Records Side By Side" (Head to Head).

## Canvas v51.01

### App.js: Canvas v51.01 — 2026-10-04, 23:30 UTC — Design tokens, step 1 (sandbox) · League v23, Cups v17, Pyramid v28, Squad v30, UI v20, index.html

- Footer: the v51 font switcher (text font, number font).
- Registers the sheets for shared club colours (ui.js clubHex).
- Version line updated.

### League.js: League v23 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)

- Club colours come from the sheet (ui.js clubHex); the typed-in list of 92 clubs is gone. Checked: all 90 matching codes had the same colour; ROMA and BODO now match the sheet's short names.
- Season colours from ui.js (seasonColor): seasons after S8 get their own colour instead of repeating S1's.
- Margin matrix tones from ui.js (MARGIN_TONES), shared with Cups.

### ui.js: UI v20 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)

- Shared data colours: MARGIN_TONES (win / draw / loss cells; was kept twice, in League and Cups), SEASON_COLORS + seasonColor() (no limit: seasons after S8 get their own colour instead of repeating S1), ACCENT_HEX (Pyramid teal and Squad maroon as hex, for charts).
- Club colours from the sheet: registerClubSheets() + clubHex(). Reads the Pyramid tab's colour and code columns; short names (e.g. ROMA) work too. Replaces League's typed-in list of 92.
- FontSwitcher: the v51 lab control in the Footer (text font, number font). Choice is kept per device. Fonts and colour scales themselves live in public/index.html.

### Cups.js: Cups v17 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)

- Tier Matrix tones come from ui.js (MARGIN_TONES, shared with League); the local copy is gone. Same colours.

### Pyramid.js: Pyramid v28 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)

- PYRAMID_ACCENT now comes from ui.js (ACCENT_HEX.teal). Same colour.
- Where you land: cell numbers never below 11px (narrow cells dropped to 10px, column headers to 9.5px).

### Squad.js: Squad v30 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)

- SQUAD_ACCENT now comes from ui.js (ACCENT_HEX.maroon). Same colour.

## Canvas v50.14

### App.js: Canvas v50.14 — 2026-10-04, 02:54 UTC — League v22, UI v19

- Version line updated. No other changes to this file.

### League.js: League v22 — 2026-10-04, 02:54 UTC — Canvas v50.14

- Home vs Away form card: its earlier design back (VenueFormCard) inside the shared card; docked on touch, 320px floating with a mouse. The old floating card's code is removed.

### ui.js: UI v19 — 2026-10-04, 02:54 UTC — Canvas v50.14

- Shared card: a card can bring its own layout (content.body), width (content.width) and height (content.height); tall cards stay on screen with a mouse.

## Canvas v50.13

### App.js: Canvas v50.13 — 2026-10-04, 02:34 UTC — Tablet pass: League · League v21, UI v18

- Version line updated. No other changes to this file.

### League.js: League v21 — 2026-10-04, 02:34 UTC — Canvas v50.13 (tablet pass)

- Home vs Away split bar: the shared card (white), docked on every touch device; its own card guessed touch from the hover setting, which iPad Safari (desktop mode) reports wrongly, and floated, squeezed and left blank space on phones and iPad.
- Outcomes bar: each segment shows its full label only when it fits, otherwise the percentage alone (any screen).
- Plain labels everywhere: no nicknames for win margins; draws read "1-1 Draws", "2-2 Draws", "0-0 Draws", "3+ Draws"; "Highest-Scoring Draw"; Spider "Wins by 3+ goals".
- Streak ledgers: PPG on one line. "Cross-Season" badges removed.

### ui.js: UI v18 — 2026-10-04, 02:34 UTC — Canvas v50.13

- Shared card: a card can ask for the light style itself (content.light).

## Canvas v50.12

### App.js: Canvas v50.12 — 2026-10-04, 01:30 UTC — Squad v29

- Version line updated. No other changes to this file.

### Squad.js: Squad v29 — 2026-10-04, 01:30 UTC — Canvas v50.12

- Phones: 4-2-3-1 (CDMs side by side) and 4-4-2 (STs side by side) layouts; all seven formations clear of overlaps on a 390px phone.
- Depth Chart: alt positions removed on every screen.
- Potential: the bar's cell is at least 180px on phones.
- Heatmap: season headers as numbers; season squares as wide as Now.
- Squad By Season (phones, Value): numbers only, "$ M" in the title; columns may shrink so the page never widens.
- Growth By Age: Team filter at the top; Clear leaves no players selected; search in Pick players.

## Canvas v50.11

### App.js: Canvas v50.11 — 2026-10-04, 00:20 UTC — Squad v28

- Version line updated. No other changes to this file.

### Squad.js: Squad v28 — 2026-10-04, 00:20 UTC — Canvas v50.11

- Phones only: hand-set pitch layouts for 3-5-2, 4-2-2-2, 4-2-4 and 5-2-3 (PHONE_LAYOUTS): pairs side by side, three-wide lines, defenders stepped as the user set out; wide players at least 16% from the edge. Tablet and desktop unchanged. Other formations keep the automatic stagger.

## Canvas v50.10

### App.js: Canvas v50.10 — 2026-10-03, 21:40 UTC — Squad v27, Pyramid v27

- Version line updated. No other changes to this file.

### Pyramid.js: Pyramid v27 — 2026-10-03, 21:40 UTC — Canvas v50.10

- Expanded sheet (phones): 6 columns (season, crown, rank, division, change, tags); the crown sits just left of the rank; tags side by side as P / R.

### Squad.js: Squad v27 — 2026-10-03, 21:40 UTC — Canvas v50.10

- Pitch (phones): chips are the bench chip (same size and content, flag and initial); crowded lines stagger so no chip covers another.
- Touch bar: name + OVR, then all positions, on the left; icons on the right: Bench (a drawn bench; greyed when full), Remove, Cancel (subdued). Pitch players get all three; bench players Remove + Cancel.
- Depth Chart (phones): header reads "90.8 OVR · 22.8 yrs".
- Growth By Age (option A): touch screens tap to scrub (nearest point; a bar above shows player, age, season and OVR, with view / pin / stop icons); Pick players list grouped by position. Mouse unchanged.
- Squad By Season (was Squad OVR By Season): OVR / Age / Value / Number; bar height = the number shown (OVR from 50, Age from 15, Value and Number from 0); Legacy column first. Desktop: pins below the page header (its top half was hidden).
- Sale Fee chart (phones): title on its own line, control on one row.
- Former Players and Contracts ledgers: header pins under the Tab Bar.

## Canvas v50.09

### App.js: Canvas v50.09 — 2026-10-03, 20:58 UTC — Pyramid v26

- Version line updated. No other changes to this file.

### Pyramid.js: Pyramid v26 — 2026-10-03, 20:58 UTC — Canvas v50.09

- Touch rule on every touch screen (phones and tablets): in Compact and Standard a tap scrubs; pin and profile come from the club bar.
- Pinned chips: 3-letter codes on phones and tablets, short names on desktop.
- Expanded sheet (phones): season rows in 5 even columns (tags share the last, stacked).
- Staying power: tap-first on touch (card with Open profile); a mouse click still opens the profile.
- Head to Head: each season's trophies stack in their own column (up to 3, then +N); tap or hover lists them by name.

## Canvas v50.08

### App.js: Canvas v50.08 — 2026-10-03, 20:40 UTC — Pyramid v25, UI v17

- Version line updated. No other changes to this file.

### ui.js: UI v17 — 2026-10-03, 20:40 UTC — Canvas v50.08

- HoverProvider light: a white card (Pyramid's style); dark stays the default.

### Pyramid.js: Pyramid v25 — 2026-10-03, 20:40 UTC — Canvas v50.08

- Progression (phones): hover card gone; the club bar shows the scrubbed season (S2 · 23 (Div 2) ▲4); View profile, Pin club and close as icons stacked on the right; bar shorter (112px).
- Expanded: taps focus again, so the focus sheet opens (v24 broke it).
- Range: light hover card; button label fixed (one ›).
- European Qualification: on touch a tap shows the card first, with Open profile; a mouse click still opens the profile.
- Biggest Risers & Fallers: short names on every screen. Yo-Yo Clubs: 3-letter codes on phones.
- Pyramid's hover cards use the light style (HoverProvider light).

## Canvas v50.07

### App.js: Canvas v50.07 — 2026-10-03, 20:17 UTC — Pyramid v24 (the user's Pyramid notes)

- Version line updated. No other changes to this file.

### Pyramid.js: Pyramid v24 — 2026-10-03, 20:17 UTC — Canvas v50.07

- Progression: compare up to 5 clubs (was 3). Phones: Compact uses the width (no left pin tags; right room only while pinned); tap the chart to scrub (drag follows the nearest line, page held; tap outside stops), taps no longer pin; card docked at the bottom; club bar taller with View Profile and Pin club.
- Expanded sheet: crowns on title seasons, tags right after the rank change, buttons pinned to the bottom.
- European Qualification (phones): no 300px floor, Div 1 about half the line so Div 2–4 come into view, fewer place ticks.
- Where you land (phones): band names hidden; range, colour and count pinned left while the grid scrolls.
- Staying power: solid header; phones show 3-letter codes, season numbers without S, outcomes like "3 ▼".
- Range: hover / tap card (finishes, best, worst, range, average, now). Pyramid sits inside ui.js's HoverProvider.
- National Power Index and every Pyramid pill row: control groups can shrink (they widened the page). Drawer: movement right after the name on phones.
- Div 1 Royalty, Mainstay, Yo-Yo: 3-letter codes on phones, short names on desktop.
- Trophies: table scrolls in its own box with its header pinned.
- Head to Head (phones): both clubs on one row, the score underneath.

## Canvas v50.06

### App.js: Canvas v50.06 — 2026-10-03, 15:45 UTC — Mobile phase 4a (Pyramid) + audit fixes · Pyramid v23, UI v16, League v20, Cups v16

- Version line updated. No other changes to this file.

### League.js: League v20 — 2026-10-03, 15:45 UTC — Canvas v50.06 (audit fixes)

- A1 Home vs Away split bars: on touch screens the card docks at the bottom; a tap elsewhere closes it.
- A2 Venue Swing: one column per season (no built-in 8); phones scroll sideways past 8 seasons.
- A4 Spider: a tap toggles an axis highlight.

### ui.js: UI v16 — 2026-10-03, 15:45 UTC — Canvas v50.06

- useScreen now uses media queries (like the CSS breakpoints). It used the window's width, which grows when a phone pinch-zooms or a page overflows, and that flipped phone layouts to desktop. screenNow() exported for one-off checks.
- BREAKPOINTS (screen sizes) renamed SCREEN_BREAKPOINTS: it clashed with the grid helper's own BREAKPOINTS in this file.

### Cups.js: Cups v16 — 2026-10-03, 15:45 UTC — Canvas v50.06 (audit fix)

- A3 Competitions trajectory: one column per season (no built-in 10).

### Pyramid.js: Pyramid v23 — 2026-10-03, 15:45 UTC — Canvas v50.06 (mobile phase 4a)

- Progression on phones: opens in Compact; every view fits the screen (3-letter club codes, no right-hand labels, no 240px plot floor). Desktop unchanged.
- Expanded: a club's focus panel opens as a Sheet on phones.
- Club viewer and club editor: full screen on phones.
- Analytics: Staying Power and Range rows use narrower name columns on phones.
- 11px floor: 61 pieces of smaller text raised to 11px.
- Division champions tooltip: one string (React warned about it).

## Canvas v50.05

### App.js: Canvas v50.05 — 2026-10-03, 15:19 UTC — League v19, Cups v15, UI v15 (the user's League notes)

- Version line updated. No other changes to this file.

### League.js: League v19 — 2026-10-03, 15:19 UTC — Canvas v50.05

- Points Race: benchmark label at the left, "100 points".
- Matchday Benchmarks: win rate strip scrubs (touch: tap or slide); Goals and Clean Sheets stay on one line; MD drawer on phones puts the scoreline right after the club name.
- Stacked Visualizer: Show / Hide legend (hidden on phones); bars scrub; header on phones in two lines (Season · year · division / record · points / matches), one line from tablet up.
- Streaks: start / end text printed code; now shows the values.
- Home vs Away: venue chips' values shrink to fit; bylines as two short lines on phones. Venue Swing: chips one per row on phones; bar height capped so labels clear the season pill.

### ui.js: UI v15 — 2026-10-03, 15:19 UTC — Canvas v50.05

- SegmentBar scrubs: the whole bar follows the pointer (mouse as before; touch: tap or slide, card docked at the bottom).
- useLegendToggle: legends hidden on phones, shown from tablet up; a "Show / Hide legend" button flips them on any screen.

### Cups.js: Cups v15 — 2026-10-03, 15:19 UTC — Canvas v50.05

- Stacked Visualizer and Two-Leg Ties: Show / Hide legend (hidden on phones); bars scrub; season header on phones in two lines (Season · year / record · matches).

## Canvas v50.04

### App.js: Canvas v50.04 — 2026-10-03, 07:43 UTC — Mobile phase 3b (Cups) · Cups v14, Cups Lab v2

- Version line updated. No other changes to this file.

### Cups.js: Cups v14 — 2026-10-03, 07:43 UTC — Canvas v50.04 (mobile phase 3b)

- 21 browser tooltips that carried numbers now open the hover card on tap (W/D/L splits on Rivalries, Leagues and Competitions bars, shootouts won/lost, margin labels, average opponent rank, campaign progress). Cups sits inside ui.js's HoverProvider. Full names of truncated clubs and cups stay as browser tooltips (the drawers show them on tap).
- Form & Margins highlights: Record full width on phones (it already leads), like Campaigns.
- Campaign, match and group editors: full screen on phones (the small delete confirmation stays centred).
- 11px floor: 111 pieces of 9–10px text raised to 11px.

### CupsLab.js: Cups Lab v2 — 2026-10-03, 07:43 UTC — Canvas v50.04

- 11px floor: the last 3 pieces of 10px text.

## Canvas v50.03

### App.js: Canvas v50.03 — 2026-10-03, 07:16 UTC — Mobile phase 3a (League) · League v18, UI v14

- Version line updated. No other changes to this file.

### League.js: League v18 — 2026-10-03, 07:16 UTC — Canvas v50.03 (mobile phase 3a)

- Points race and Momentum: measure their own box (not the window), no 300px plot floor (they spilled past the card on phones), ticks every 10 matchdays on narrow screens under a "Matchday" title. Touch: tap or slide along the chart; the card docks at the bottom of the screen; a tap elsewhere or a scroll closes it.
- Browser tooltips that carried information now open the hover card on tap: Home vs Away bars (and the two that printed variable names instead of values are fixed), matchday dots, average rating, Spider edges. League sits inside ui.js's HoverProvider.
- Spider Matrix: labels sized against the drawn width (11px or more).
- Outcomes bar: percentage only on phones; full label from tablet up.
- Biggest Wins / Defeats score boxes stay on one line.
- Matchday table: "MD 1" stays on one line.
- Score and season editors: full screen on phones.
- 11px floor: 105 pieces of 9–10px text raised to 11px.

### ui.js: UI v14 — 2026-10-03, 07:16 UTC — Canvas v50.03

- usePointerTrack: charts that follow the pointer along x. Mouse as before; touch: tap or slide sideways (up-and-down still scrolls); a tap elsewhere or a scroll clears it.

## Canvas v50.02

### App.js: Canvas v50.02 — 2026-10-03, 06:53 UTC — Squad v26 (fix)

- Version line updated. No other changes to this file.

### Squad.js: Squad v26 — 2026-10-03, 06:53 UTC — Canvas v50.02 (fix)

- Phones: pill rows (Contracts Team, Transfers Season, Former Players Left in, Roster Team, Development Season, Depth Chart Status) no longer widen the page. Their control groups may now shrink, so the pills scroll sideways inside the group instead.

## Canvas v50.01

### App.js: Canvas v50.01 — 2026-10-03, 06:41 UTC — Mobile phase 2 (Squad) · UI v13, Squad v25, League v17, Cups v13

- Version line updated. No other changes to this file.

### League.js: League v17 — 2026-10-03, 06:41 UTC — Canvas v50.01

- Seasons highlights: Record first on every screen; full width on phones.

### ui.js: UI v13 — 2026-10-03, 06:41 UTC — Canvas v50.01

- Hover card on touch: closes at the END of a tap outside any hover target (closing on touch-down made iPhone drop the tap, so a second column never opened); tapping another target switches the card. A tap that opens a card no longer clicks through to a row or the element's own action; cards can carry an action button (content.action = { label, run }), e.g. "Open profile ›".
- useScrub: press and slide sideways along a chart; the docked card follows the finger; up-and-down swipes still scroll.
- Sheet: full screen and sliding up on phones, centred from tablet up.
- HighlightCard phoneWide: full width on phones (one row elsewhere).

### Cups.js: Cups v13 — 2026-10-03, 06:41 UTC — Canvas v50.01

- Campaigns highlights: Record first on every screen; full width on phones.

### Squad.js: Squad v25 — 2026-10-03, 06:41 UTC — Canvas v50.01 (mobile phase 2)

Squad tab
- Tap-to-swap on every screen: tap a player to select him, tap another player to swap or an empty spot to move him; a bar at the bottom of the screen offers To bench (or "Bench full") / Remove, and Cancel. Taps only select (no profile from this tab); mouse drag still works.
- Phones: compact pitch cards (position, OVR, foot, surname), bench 3 across, pool as one-line rows (position · OVR · flag · name · team · role) in a shorter scroll box. Roster: table header stays under the page header; Pos / Player pinned on tablet and desktop only. Depth Chart (phones): narrow columns; alt positions under the name. Development: Growth By Age has no minimum width on phones and no end labels there (the tray names the lines); the Average label joins the overlap nudging. Heatmap and Growth By Age cards carry "Open profile" / "Show in colour" buttons on touch. Contracts: boards put position · age under the name on phones; expiry rows scroll sideways inside each year on phones; Fair Wage draws at real size, scrubs by OVR on touch, "Open profile" on cards. Transfers: Income & Spending on phones as sideways bars, one row per season, net at the end; Signed From / Sold To stack count and fee. Former Players: How They Left keeps How, Players (bar) and Share only; Sale Fee scatter at real size, scrub by its x axis, "Open profile". Profile: opens as a Sheet (full screen on phones); positions below the name and a smaller OVR box on phones; chart has no minimum width, hides bar labels when bars are narrow, start label above its dot; Vs Other strip scrubs on touch.

## Canvas v50

### App.js: Canvas v50 — 2026-10-03, 05:34 UTC — Mobile phase 1 (foundation) · UI v12, Squad v24, Pyramid v22

- Top Bar: an arrow at the right folds the Header's Title Row away (resets each visit). While folded the Top Bar stops sticking and only the Tab Bar sticks.
- Footer on every page: the version line, this Canvas version's publish date and time, and "Developed by the user & Claude". Replaces the floating version tag.
- index.html gains the viewport tag (phones render at their real width).

### ui.js: UI v12 — 2026-10-03, 05:34 UTC — Mobile foundation (Canvas v50)

- New shared pieces: useScreen (phone / tablet / desktop), useWidth (measure a box), ChromeContext (header folded or not), ScrollRow (sideways row with faded edges; active item scrolls into view), FitText (headline values shrink to fit before wrapping).
- Hover card moved here from Squad (HoverProvider / useHover). Mouse: follows the pointer, as before. Touch: a clean tap opens it docked at the bottom of the screen; tapping elsewhere, tapping the same thing again or scrolling closes it; a swipe never opens it.
- PageHeader: Title Row folds away when the header is folded; the Tab Bar then sticks at the top. Tab Bar scrolls with a faded edge. The header publishes --gsl-sticky (where pinned content should start).
- FilterPills scroll with a faded edge; the active pill scrolls into view.
- HighlightCard: values shrink to fit narrow cards; bylines wrap as whole pieces instead of breaking mid-phrase.
- 11px floor: the last 10px text in ui.js (pill badges, picker meta).

### Pyramid.js: Pyramid v22 — 2026-10-03, 05:34 UTC — Canvas v50 (mobile foundation)

- Progression's pinned season strip and the compare header follow the folded / unfolded header (no gap when the Title Row is folded).

### Squad.js: Squad v24 — 2026-10-03, 05:34 UTC — Canvas v50 (mobile foundation)

- Hover card now comes from ui.js (same look on desktop; tap support on touch screens). Growth By Age and the profile chart measure their box with ui.js's useWidth.

## Canvas v49.5

### App.js: Canvas v49.5 — 2026-10-03, 03:42 UTC — Squad v23

- Version tag updated. No other changes to this file.

### Squad.js: Squad v23 — 2026-10-03, 03:42 UTC — Canvas v49.5 (edits, player profile)

- Transfers moved under Contracts: In (Joined, From, Fee) on the left, Out (Left, To, Fee, P/L) on the right; players still here read "Still at the club · Contract to 2036". Joined is back in Transfers.
- Injury History placeholder under Interactions (space held).
- Squad order back to one line ("1st of 7").
- Vs other players: one dot per OVR; its hover lists everyone at that OVR, name and OVR on one line (former marked). His own dot keeps the fuller card.

## Canvas v49.4

### App.js: Canvas v49.4 — 2026-10-03, 03:21 UTC — Squad v22

- Version tag updated. No other changes to this file.

### Squad.js: Squad v22 — 2026-10-03, 03:21 UTC — Canvas v49.4 (edits, player profile)

- Highlights: plain white / grey bubbles (the dark bar stays on the main tabs). Team bubble has no byline (squad order lives in Squad).
- Squad section: positions, Joined, Tenure, playstyles and the full squad order at his position (him highlighted). Joined and tenure moved here from Transfers.
- Development: per-season change numbers above the Growth bar. "Vs other CBs" (his position) replaces Ahead of the Curve: current players at their OVR now, former at their last OVR here (faded); the average is current players only; hidden under 2 current peers.
- Interactions above Transfers; value for money removed from the profile's Contracts section.

## Canvas v49.3

### App.js: Canvas v49.3 — 2026-10-03, 02:43 UTC — Squad v21

- Version tag updated. No other changes to this file.

### Squad.js: Squad v21 — 2026-10-03, 02:43 UTC — Canvas v49.3 (edits)

Overall
- Zero reads "$0 M"; zeros in table columns are light grey.
- Axis ticks drop decimals when every tick is whole ($0 / $50 / $100 M).
- Section titles: every word capitalised.
- Per appearance and per goal + assist in $ M ($ K = weekly wages only).
- Hover cards use the dark-card scale C (vivid) for good.
- "Start of the save" is "Legacy" everywhere. Development
- Heatmap back to one column, a little more space after Age, and a "Squad OVR By Season" chart beside it (everyone at the club each season by OVR band; average OVR on top; Now = today's squad). Contracts
- Contract expiry schedule: year blocks wrap onto rows so names fit. Transfers
- Income & Spending hover: net next to the season, at title size; summer / winter / biggest deals lighter than the totals. Former Players
- Ledger: To is blank for players not renewed or retired.
- How They Left: a compact table (players with share bar, share, fees, average age when they left, average seasons); lighter colours.
- Departures By Season: lighter colours; bars use the full card height. Player profile
- Header: position chip beside the name; OVR box only.
- Highlights bar: Age (joined at), Foot, Team (rank at position), Role, Potential (above / to go).
- Chart: drawn at real size; value inside each bar, % change between bars, no red outline; OVR above its point; ▲▼ smaller and lighter; potential label at the left; start point labelled "Joined 82".
- Sections: Squad (positions, rank at position, playstyles) | Stats (career and last season) | Development (growth, potential, Ahead of the Curve), then Contracts across two columns | Transfers + Interactions. Squad rank line and "Value since joining" removed. Labs
- Hover-colour experiment removed; the tab stays, empty.

## Canvas v49.2

### App.js: Canvas v49.2 — 2026-10-02, 23:45 UTC — Squad v20

- Version tag updated. No other changes to this file.

### Squad.js: Squad v20 — 2026-10-02, 23:45 UTC — Canvas v49.2 (edits)

Money format (everywhere in Squad)
- Always "$X M"; size sets the decimals: under $1 M 3, $1–10 M 2, $10–999 M 1, $1,000 M+ none (sign ignored). Weekly wages stay in $ K with the same bands; annual and total wages in $ M.
- Sets read together (axes, bar labels, boards, hover splits, cost → sale pairs, highlight strips) take the largest number's decimals.
- Table columns keep each number's decimals, padded with fixed-width spaces so decimal points line up.
- Zero guard: a non-zero number never shows as $0.
- Money axes use round ticks (fair-wage chart, sale-fee scatter, profile chart). Hover cards
- OVR and potential in a dark-background OVR scale; gains green, losses red. Four scales (A sheet, B tints, C vivid, D soft); B is the default; Labs switches all Squad hover cards for the session.
- Card 300px wide; labels never wrap. Squad tab
- Bylines: "Best player: Name OVR" and "Youngest player: Name, age".
- Lineup summary sits next to the Squad header; drag hint removed.
- Tiles: 4th and 5th positions on a second line; past 5, "…". Depth Chart
- Header numbers sit over the OVR and Age columns (no "Avg" words).
- More space between main and alt positions; flag + name moved right (foot column unchanged).
- Loan icon rule: where ❶ ❷ ❸ are icons, loan is the → icon. Development
- Growth hover: goalkeepers show clean sheets in place of goals.
- Biggest value rise byline: "$17.0 M → $261.0 M".
- "OVR heatmap" is "Heatmap": current age column; groups in two side-by-side columns (one when seasons outgrow the width).
- Growth by age rebuilt: real pixel size, grey lines, 5 in colour with name + OVR end labels (top OVR by default, click to pick), average line, faint former players, tray with unpin / Clear. Contracts
- Fair-wage hover: role on the name line; "Year signed" (year joined for now). Transfers
- Income & Spending hover: summer and winter on their own lines. A season after the last full one reads "S8 (so far)". Club tags
- League code as plain grey text (no box). Labs (new tab)
- Dark-card scale swatches with contrast numbers, a dummy chart, and "Use in all hover cards".

## Canvas v49.1

### App.js: Canvas v49.1 — 2026-10-02, 04:20 UTC — Squad v19

- Version tag updated. No other changes to this file.

### Squad.js: Squad v19 — 2026-10-02, 04:20 UTC — Canvas v49.1 (edits + design pass)

- Design pass: one hover card for every chart and bar (replaces the browser tooltip); nothing under 11px; role as coloured text and the development tag as plain text in dense tables (chips stay on tiles, boards and the profile).
- Position order everywhere: GK, LB, CB, RB, CDM, LM, CM, RM, CAM, LW, RW, ST.
- Squad tab: "Lineup cohesion" with "# in alt position · # out of position"; no SUB tag on bench tiles; tiles 20% wider; 5-2-3 uses LB and RB.
- Roster: averages row leaves Apps blank; position filter GK / DEF / MID / ATT.
- Depth Chart: header bar per position (average OVR, average age, players); roomier columns, foot / OVR / age closer to the name.
- Development: Growth gets the Potential sorts and Show filter, a Seasons column and Best season; season hover cards (season + years, age, change, stats); Potential gets a Growth column and more room before the tag.
- Contracts: one-line leaderboard rows with OVR in its own column; hover cards on fair wage, wage bill and value at risk (taller); "Contract expiry schedule" with wider columns, year dividers and a cumulative Years left filter.
- Transfers: hover card on Income & Spending; profit boards show cost → sale under the profit; one season filter for both ledgers.
- Former Players: Role column removed; How they left, Departures by season and Sale fee scatter (vs OVR / value / age at sale).

## Canvas v49

### App.js: Canvas v49 (complete) — 2026-10-02, 01:41 UTC — Squad v18 (part 2 of 2)

- Version tag updated. No other changes to this file.

### App.js: Canvas v49 — 2026-10-02, 01:01 UTC — Squad v17 (part 1 of 2)

- Squad also reads the GSL Clubs tab (club directory).
- Version numbering from here: whole numbers for bigger updates and new features, decimals (v49.1, v49.2...) for edits and smaller updates.

### Squad.js: Squad v18 — 2026-10-02, 01:41 UTC — Canvas v49, part 2 of 2

- Development rebuilt: Growth (segmented bar, one segment per season, green / red / grey; season selector), Potential (bar: growth, room, beyond potential; signed remaining; sorts and filters), Value growth, OVR heatmap (by position or team), Growth by age (position and route filters, former players toggle), Teams (comparison table + squad strength, static for now). The age curve is gone.
- Contracts (new tab): top valuations and top total costs; fair-wage scatter; wage bill breakdown (team, position); value at risk by contract end; the expiry schedule (moved from Transfers); a contracts database with cost vs OVR, vs value (colour key vs the squad median), per appearance (+ index), per goal + assist / clean sheet, and a value-for-money score.
- Transfers (was "Transfers & Money"): Transfer Income & Spending (hover: summer / winter split, biggest deals); four top-5 leaderboards; top clubs (by players or fees); Transfers In and Out side by side (season + window, figures at the time, club, type, fee; type / sell-on / terms await New Squad); sorts and name search.
- Former Players rebuilt on the Roster's layout: how and when he left, both transfers, career stats, P/L; sticky header.
- Player profile rebuilt: centred pop-up with a header (OVR, potential, remaining), one combined chart (OVR line, potential, value bars, age per season) and a snapshot from each tab.

### Squad.js: Squad v17 — 2026-10-02, 01:01 UTC — Canvas v49, part 1 of 2

- Data from GSL_R3_Offline_v7; club directory from the "GSL Clubs" tab (Pyramid as fallback): flag, short name in capitals, league code.
- Everywhere: money as "$4,055.0 M", weekly wages "$55.0 K" (header says /wk); "❶ First / ❷ Second / ❸ Reserves"; "Available / Everyone"; role colours (IMP blue, ROT grey + black, SPO grey + dark grey, PRO light grey); source icons 🎓 academy, 🖊️ free agent, 📜 start of the save.
- Squad tab: settings survive switching tabs; bench (7 / 9 switch, auto-filled from the same pool, drag in / out / between); team sheets (save the lineup with a name, load, delete; up to 5; session only; a 9-sub sheet flips the switch to 9); Lineup Cohesion replaces "Out of position"; GK / DEF / MID / ATT filter on the tiles.
- Roster: Career stats by default; age filter; source breakdown (academy / bought / free / start of the save, with value now); sticky header and first columns; averages row; contract warning (1 year or less); potential in OVR colours; club or source in "From".
- Depth Chart: order team → OVR → role → age (older first); columns position (+alt), flag + name, foot, OVR, age, role, team.

## Canvas v48

### App.js: Canvas v48 — 2026-09-28, 16:08 UTC — Squad v16

- Version tag updated. No other changes to this file.

### Squad.js: Squad v16 — 2026-09-28, 16:08 UTC — Interactions (test version)

- New Interactions tab (phone-first): every current player (position, flag, name, team), a green row and a red row of 🪷 🤝 📣 🤬 👏; tap to light one up, tap again to turn it off; no maximum, no locking; "last updated" date stamped on change; team filter and search.
- Roster's Pos / Neg columns show the lit emoji (green / red), with the date on hover.
- Test version: kept for the session only; saving to the sheet comes with the next Sheets build.

## Canvas v47

### App.js: Canvas v47 — 2026-09-28, 15:34 UTC — Squad v15

- Squad also reads the Pyramid tab (clubs players came from).

### Squad.js: Squad v15 — 2026-09-28, 15:34 UTC — Roster groups, OVR colours

- OVR (not "rating") everywhere, coloured with the sheet's scale: red 40s, orange 50s, yellow 60s, dark green 70s, green 80s, bright green 90-94, blue 95+.
- Roster: group header row (Details, Attributes, Contract, Stats, Interactions, Transfer, Tenure) with short column labels; columns spread across the full width. Details: Pos, Player, Ft, Sq (status icon). Contract: Role, Value, Wage, Yrs rem. Interactions: Pos / Neg (placeholders until the Interactions page exists). Transfer (in): season + year, from (flag, short name, league for Pyramid clubs; academy / free agent / start of the save), fee ($0.0 M for academy and free agents). Tenure: Yrs, OVR ±, Value ±.
- Reads the Pyramid tab too, for the clubs players came from.

## Canvas v46

### App.js: Canvas v46 — 2026-09-28, 14:13 UTC — Squad v14

- Version tag updated. No other changes to this file.

### Squad.js: Squad v14 — 2026-09-28, 14:13 UTC — Roster redesign

- Columns grouped (who | now | style | money | stats | tenure) with faint dividers; columns fit their content, spare width sits before the money group; more room between main and alternative positions.
- Status: icon + word (❶ First, ❷ Second, ❸ Reserves, → On loan, ← Loaned in).
- Rating, +/- and Potential narrower and closer; development type sits beside the potential. With no potential in the sheet, a growth type implies its top end (PTBS 94, AEP 89, SGP 84), shown in grey italics; this also feeds Development's "Room to grow".
- Playstyles as ◆ marks.
- Value always one decimal with a space ("$130.0 M") so it lines up.
- New tenure group: seasons at the club, rating since joining (the sheet's Tenure +/-), value since joining (from value at signing, or at the end of his first season when that isn't recorded); sortable.

## Canvas v45

### App.js: Canvas v45 — 2026-09-28, 03:39 UTC — Squad v13

- Version tag updated. No other changes to this file.

### Squad.js: Squad v13 — 2026-09-28, 03:39 UTC — Squad tab controls

- Position-colour key removed; more space between the control groups.

## Canvas v44

### App.js: Canvas v44 — 2026-09-28, 03:29 UTC — Squad v12

- Version tag updated. No other changes to this file.

### Squad.js: Squad v12 — 2026-09-28, 03:29 UTC — Blank lineup, age filter, one pool

- Lineup: new "Blank" (every position empty; drag players in).
- Age: All / U23 / U21 / U19 (under N = younger than N).
- Players: "Available" / "Everyone" (was Not on loan / Include on loan).
- Lineup, Age and Players now set one pool used by both the pitch and the tiles (the tiles' own team filter is gone). Changing any of them starts the lineup fresh.

## Canvas v43

### App.js: Canvas v43 — 2026-09-28, 03:19 UTC — Squad v11

- Version tag updated. No other changes to this file.

### Squad.js: Squad v11 — 2026-09-28, 03:19 UTC — Foot on the pitch, on-loan option

- Foot shown as L / R on tiles, and on pitch cards (top-right, in place of the team number).
- "Players: Not on loan / Include on loan" (off by default, like the Depth Chart): when on, loan players appear as tiles (with an On loan filter), can be dragged onto the pitch and can be picked for the Best XI. Switching starts the lineup fresh.

## Canvas v42

### App.js: Canvas v42 — 2026-09-28, 03:06 UTC — Squad v10

- Version tag updated. No other changes to this file.

### Squad.js: Squad v10 — 2026-09-28, 03:06 UTC — Smarter lineups, tiles with foot

- Lineups are chosen as a whole (best total fit, Hungarian method) instead of one slot at a time: main position > alternative > close fit; a player from the wrong area is heavily penalised; keepers and outfield players never swap (the slot stays empty instead).
- Tiles: all positions top-left (main first, the one he's playing underlined), rating middle, team right; flag + name; foot, age and role along the bottom. No hover text on the short roles.

## Canvas v41

### App.js: Canvas v41 — 2026-09-28, 02:58 UTC — Squad v9

- Version tag updated. No other changes to this file.

### Squad.js: Squad v9 — 2026-09-28, 02:58 UTC — Short squad roles

- Squad roles have 3-letter forms (CRU, IMP, ROT, SPO, PRO) for tight spaces; the sidebar tiles use them (full name on hover).

## Canvas v40

### App.js: Canvas v40 — 2026-09-28, 02:25 UTC — Squad v8

- Version tag updated. No other changes to this file.

### Squad.js: Squad v8 — 2026-09-28, 02:25 UTC — Formations

- 3-5-2: the wing-backs are now LM and RM.
- New: 4-2-2-2, 4-2-4 and 5-2-3 (seven formations in all).

## Canvas v39

### App.js: Canvas v39 — 2026-09-28, 02:20 UTC — Squad v7

- Version tag updated. No other changes to this file.

### Squad.js: Squad v7 — 2026-09-28, 02:20 UTC — Sidebar tiles

- Top-left is blank for players not on the pitch (their main position is already shown bottom-left).

## Canvas v38

### App.js: Canvas v38 — 2026-09-28, 02:17 UTC — Squad v6

- Version tag updated. No other changes to this file.

### Squad.js: Squad v6 — 2026-09-28, 02:17 UTC — Sidebar tile tweaks

- Top-left shows the position he's playing on the pitch (coloured by fit), or his main position if he isn't on the pitch; the label on the tile's edge is gone (it was cut off). Outline kept.
- Bottom-left: main position, then alternative positions.
- Bottom-right: age and squad role (Crucial, Important, Rotation, Sporadic, Prospect) instead of the development type.

## Canvas v37

### App.js: Canvas v37 — 2026-09-28, 02:05 UTC — Squad v5, UI v11

- Version tag updated. No other changes to this file.

### ui.js: UI v11 — 2026-09-28, 02:04 UTC

- 13 more drawn flags (Morocco, Iceland, Ghana, Ivory Coast, Bosnia, Mali, Egypt, Gambia, Iran, Gabon, Albania, Algeria, Montenegro): 60 in total, covering every country in the workbook.

### Squad.js: Squad v5 — 2026-09-28, 02:05 UTC — Squad sidebar as tiles

- The squad beside the pitch is now tiles, like the pitch cards with a bit more: position, rating, team number; flag + name; alternative positions, age and development type. Players on the pitch get a maroon outline and their slot. Tiles fill the column (as many per row as fit) and still drag onto the pitch.
- All flags are drawn (13 more countries in ui.js).

## Canvas v36

### App.js: Canvas v36 — 2026-09-28, 01:53 UTC — Squad v4

- Version tag updated. No other changes to this file.

### Squad.js: Squad v4 — 2026-09-28, 01:53 UTC — Transfers & Money, Former Players (part 3 of 3)

- Controls: every label sits above its control (consistent alignment).
- Squad tab: list beside the pitch, wider and as tall as the pitch; on-loan players removed from it (they stay in Roster); Reset always shown (greyed until you change the lineup).
- Depth Chart: main positions only, grouped Attack (LW/LM, ST, RW/RM), Midfield (CAM, CM, CDM), Defence (LB, CB, RB), Goalkeeper.
- Development: "All time" (start of his first season at the club to the end of his latest), now the default, plus each season.
- Transfers & Money (new): spent / received / net / wage bill; money per season; best sales and sales at a loss; contracts by expiry year; full transfer ledger (arrivals and sales, by season, by fee).
- Former Players (new): directory of every former player, filter by season left and how they left, search, sort; fee, joined, seasons at the club, rating then and at departure, apps, profit.

## Canvas v35

### App.js: Canvas v35 — 2026-09-28, 01:37 UTC — Squad v3

- Version tag updated. No other changes to this file.

### Squad.js: Squad v3 — 2026-09-28, 01:37 UTC — Pitch: presets, drag and drop, new cards

- Pitch lines back on the green gradient.
- Bigger cards: position top-left (coloured by fit), rating top-middle (bigger), team number top-right, flag + name underneath.
- Lineup presets: Best XI, Team 1, Team 2, Team 3 (each picks from its own players; slots nobody fits get the best remaining player, shown out of position). Drag players from the list onto the pitch, swap slots by dragging, drag back to the list to empty a slot; "Custom lineup" with Reset. On-loan players can't be dragged in.
- Slimmer squad list: position, alt, flag, name, rating, development type, team number; players on the pitch marked with a maroon edge.

## Canvas v34

### App.js: Canvas v34 — 2026-09-28, 01:24 UTC — Squad v2

- Version tag updated. No other changes to this file.

### Squad.js: Squad v2 — 2026-09-28, 01:23 UTC — Squad tab, Depth Chart, Development (part 2 of 3)

- The Pitch tab is now "Squad": plain green-gradient pitch (no stripes or lines); new player cards (flag top-left, position top-centre coloured by fit, rating top-right, name in the middle); best XI from everyone not on loan ("Pick from" removed); the full squad listed on the right (All / Team 1 / 2 / 3 / On loan), players on the pitch first, marked with their position.
- Depth Chart (new): every position laid out like a pitch, natural options then those who can cover, with Thin (under 2 natural) and Ageing (top two average 30+) warnings; on-loan players optional.
- Development (new): Growth (rating change in a chosen season), Room to grow (potential minus rating, with development types), Age curve (age against rating, line up to potential).

## Canvas v33

### App.js: Canvas v33 — 2026-09-28, 00:28 UTC — New section: Squad (Squad v1), UI v10

- Squad added to the top bar (reads the Squad tab).

### ui.js: UI v10 — 2026-09-28, 00:22 UTC

- New accent: maroon (Squad), across headers, pills, search and cards.

### Squad.js: Squad v1 — 2026-09-28, 00:26 UTC — First build (part 1 of 3)

- Pitch: formation picker (4-3-3, 4-2-3-1, 3-5-2, 4-4-2); best XI picked automatically by rating for each position (main position first, then alternatives, then close fits); bench of the next best. Choose who's eligible (all available / first team / first + second). Striped grass pitch with thin markings.
- Roster: the current squad, filterable by tier (❶ ❷ ❸, on loan, loaned in), position group and name; sortable columns; this season or career stats.
- Player profile: identity, development type, playstyles, contract, rating and value season by season, stats, how he joined (and left).
- Data: everything read by column labels (so new season blocks, e.g. S8, are picked up automatically). "As of the end of S7" comes from the data, not typed in. Coming next: Depth Chart, Development; then Transfers & Money, Former Players. /

## Canvas v32

### App.js: Canvas v32 — 2026-09-27, 23:39 UTC — Pyramid v21

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v21 — 2026-09-27, 23:39 UTC — National Power Index layout

- "Divisions now" strip fills its column, with D1-D4 labels where there's room and a hover count per division.
- "Average finish" (renamed): taller line (60px) with a hover guide showing the season, the average and its division.
- Drawer: clubs in two columns on the left half, the division grid on the right half.

## Canvas v31

### App.js: Canvas v31 — 2026-09-27, 21:34 UTC — Pyramid v20

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v20 — 2026-09-27, 21:34 UTC — National Power Index refinements

- Sizes: Big 7+ clubs (France joins), Medium 3-6, Small 1-2.
- New columns: best and worst season average (with the season).
- The season-by-season column is now a line of the nation's average finish on division bands (one shared scale for all rows). Clicking a nation shows a division grid (Div 1-4 x seasons, number of its clubs in each) above its club list.

## Canvas v30

### App.js: Canvas v30 — 2026-09-27, 21:11 UTC — Pyramid v19

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v19 — 2026-09-27, 21:11 UTC — National Power Index

- New in Analytics (under Range): the Pyramid by country. Highlights: nations, most Div 1 clubs, biggest riser and faller. Table: clubs, average finish in S1 and now, trajectory, Div 1 clubs now, current division footprint, and a season-by-season footprint (migration). Filter by nation size (Big 8+, Medium 3-7, Small 1-2 clubs; every country kept); sort by clubs, average now, rise, or Div 1 clubs. Click a nation for its clubs (S1 finish -> now). Baseline is the S1 finish, never the pre-S1 seeding.

## Canvas v29

### App.js: Canvas v29 — 2026-09-27, 17:37 UTC — Pyramid v18

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v18 — 2026-09-27, 17:37 UTC — Movement grid fills the width

- Squares grow to fill the room left after the labels and the club list (40-76px wide); height and text size grow with them. The list stays beside the grid when 40px squares still fit, else goes below.

## Canvas v28

### App.js: Canvas v28 — 2026-09-27, 17:28 UTC — Wider canvas (League v16, Cups v12, Pyramid v17, UI v9)

- Top bar uses the shared page width (ui.js PAGE_WIDTH, 1800px).

### League.js: League v16 — 2026-09-27, 17:28 UTC — Wider canvas

- Page width comes from ui.js (PAGE_WIDTH, now 1800px; was 1280px).

### ui.js: UI v9 — 2026-09-27, 17:28 UTC — Wider canvas

- PAGE_WIDTH: one setting for how wide every section gets (1800px).

### Cups.js: Cups v12 — 2026-09-27, 17:28 UTC — Wider canvas

- Page width comes from ui.js (PAGE_WIDTH, now 1800px; was 1280px).

### Pyramid.js: Pyramid v17 — 2026-09-27, 17:28 UTC — Wider canvas

- Page width comes from ui.js (PAGE_WIDTH, now 1800px; was 1280px).
- Movement grid: the club list sits beside the grid only when all 20 columns fit (measured), and is then as tall as the grid; otherwise it goes underneath. Fixes Div 4's columns being pushed off-screen.

## Canvas v27

### App.js: Canvas v27 — 2026-09-27, 15:43 UTC — Pyramid v16

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v16 — 2026-09-27, 15:43 UTC — Movement rebuilt

Where you land
- 20 zones of finishing PLACES (not outcomes), 5 per division: top places (champion, top 4 / automatic promotion), play-offs (4 places, PLAYOFF_PLACES), rest of the top half, bottom half, drop zone. Div 4 (no drop zone) splits its bottom half in two. Built from the sheet's division boundaries and the league-rule settings.
- Squares take the colour of the division clubs ended up in, stronger for more clubs. Division bands across the top, place ranges on both axes, short names down the side. Clicked square lists its clubs on the right (with promoted / relegated markers); stability by division moved under the grid. Staying power
- Lifelines replace the curves: one bar per promotion (or relegation), each season a block in its division's colour showing the finish, ending in relegated / promoted again / back up / still there. Grouped by division with straight-back, 2+ seasons and still-there counts. Hover for the season-by-season story; click for the profile.

## Canvas v26

### App.js: Canvas v26 — 2026-09-27, 15:04 UTC — Pyramid v15

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v15 — 2026-09-27, 15:04 UTC — Analytics: Movement and Range

- Movement (new): how clubs move season to season. Highlights: most stable and most fluid division, and bounce-back (after a rise, how often a club fell back; after a fall, how often it recovered). Where you land: zone-to-zone grid (13 zones from the league's rules; each row adds up to 100%; click a square for the clubs), plus stability by division. Staying power: survival lines after promotion (still there after N seasons) or relegation (back up after N seasons), per division, with straight-back / still-there counts.
- Range (new): one row per club; a dot for every finish, a bar from best to worst, a ring for now, a tick for the average. Filter by current division; sort by range, average, current rank or distance from peak.
- Promotion Survival cards removed (Staying power covers them).

## Canvas v25

### App.js: Canvas v25 — 2026-09-26, 16:58 UTC — Pyramid v14

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v14 — 2026-09-26, 16:58 UTC — Profiles stay on the tab

- Opening a club profile from Analytics or Trophies no longer switches to Progression behind it; closing it returns you to the same tab. (The profile's "Highlight on Chart" button still goes there.)

## Canvas v24

### App.js: Canvas v24 — 2026-09-26, 16:46 UTC — Pyramid v13, UI v8

- Version tag updated. No other changes to this file.

### ui.js: UI v8 — 2026-09-26, 16:37 UTC

- PageHeader takes optional actions (right of the title row).
- SearchPicker: optional "show all matches" line (onSubmit), Enter to use it, Esc to close; "+N more" when the list is cut.
- ClubSelect and SearchPicker close when you click or tap outside them (so opening another dropdown closes the first) and on Esc. Items can carry their own search text.

### Pyramid.js: Pyramid v13 — 2026-09-26, 16:46 UTC — Find a club

- "Find a club" in the Pyramid header (every tab): type to see matching clubs with flags; click one to open its profile. The last line (or Enter) shows all the matches on the Progression chart instead. Matching is the same as the chart's search. Click outside or Esc closes it.

## Canvas v23

### App.js: Canvas v23 — 2026-09-26, 15:48 UTC — League v15, Cups v11, Pyramid v12, UI v7

- Version tag updated. No other changes to this file.

### League.js: League v15 — 2026-09-26, 15:48 UTC — Standard search

- Spider tab club choices (opponent, Club 1, Club 2) use the shared dropdown-first picker: flags, and a search box inside.

### ui.js: UI v7 — 2026-09-26, 15:47 UTC

- Search standardised into three types: SearchInput (filter; now takes an accent for its focus colour), ClubSelect (dropdown first, search inside) and SearchPicker (search first, dropdown of matches). Club lists show drawn flags.

### Cups.js: Cups v11 — 2026-09-26, 15:48 UTC — Standard search

- Search boxes use the Cups gold focus colour.

### Pyramid.js: Pyramid v12 — 2026-09-26, 15:48 UTC — Standard search

- Head to Head uses the shared dropdown-first picker (ui.js).
- Standings search uses the shared filter search; search boxes use the Pyramid teal focus colour. Progression highlight stays a filter.

## Canvas v22

### App.js: Canvas v22 — 2026-09-26, 15:40 UTC — League v14, Cups v10, UI v6

- Version tag updated. No other changes to this file.

### League.js: League v14 — 2026-09-26, 15:40 UTC — Drawn flags

- Every flag emoji is now a drawn flag (ui.js Flag), sized to match the old emoji. Non-flag symbols (🪩, 🏴‍☠️) show as they are.
- Dropdown options show club names only (browser dropdowns can't draw flags); labels no longer have flags glued into the text.

### ui.js: UI v6 — 2026-09-26, 15:37 UTC

- Flag takes a size (width in px). FlagList / splitFlags show several flags from a list or a string of flag emoji. Symbols that aren't country flags (🪩, 🏴‍☠️) show as they are.
- 9 more drawn flags (Brazil, Chile, Japan, Mexico, Qatar, Serbia, Uruguay, Ecuador, Slovenia): 47 in total.

### Cups.js: Cups v10 — 2026-09-26, 15:40 UTC — Drawn flags

- Every flag emoji is now a drawn flag (ui.js Flag), sized to match the old emoji. Non-flag symbols (🪩, 🏴‍☠️) show as they are.
- Dropdown options show club names only (browser dropdowns can't draw flags); labels no longer have flags glued into the text.

## Canvas v21

### App.js: Canvas v21 — 2026-09-26, 15:25 UTC — Pyramid v11

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v11 — 2026-09-26, 15:25 UTC — Roll of Honour, Head to Head refinements

- Roll of Honour flipped: seasons down, trophies across. Bigger tiles: club colour on top, larger flag, name, and a corner tag with the club's division and finish that season (league code for clubs from outside the Pyramid). Outside clubs greyed, not italic.
- Division markers use division colours; 🌕🥇🥈🥉 only mean titles won.
- Head to Head: club picker with search and flags; finishes chart right under the headline, labels kept clear (higher finisher above its point, the other below); trophy strip under the chart (each club's trophies per season); records side by side below. Season by season table removed (the chart shows it).

## Canvas v20

### App.js: Canvas v20 — 2026-09-26, 05:38 UTC — Pyramid v10

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v10 — 2026-09-26, 05:38 UTC — Club viewer, Trophies, Head to Head

Club viewer (redesigned, same data)
- Performance tiles: Current, Average, Peak, Low, Net trajectory (from the S1 finish). "Tier 1" is now the division; "yrs" is now "seasons"; no fixed season counts in labels.
- Trophy cabinet with the sheet's symbols: 🌕🥇🥈🥉 league titles, 🏆 FA Cup and Carabao Cup, 🛡️ Community Shield and Super Cup, 🔵🟠🟢 UCL/UEL/UECL. Stray coins removed.
- Promotions/relegations from the ranks (Wrexham now shows 3); yo-yos added. Footer sentence and "Start Rank" removed.
- Historical Finishes: fixed rows (rank, movement, division, labels) so they line up; no movement in S1; European label before P/R; green ▲ / red ▼. Trophies (rebuilt)
- Highlights, then a Trophy Cabinet with two views: By Club (a count per trophy, filter League / Domestic / Continental) and Roll of Honour (who won what each season, from the Winners tab; division champions from the Pyramid). Winners from outside the Pyramid shown in italics. Head to Head (rebuilt)
- Seasons finished above the other, current run, same-division seasons; records side by side (better side marked); season-by-season duel with the gap; two-line finishes chart; closest rivals by average finish. The club viewer's button compares with your club. Movement never starts from the pre-S1 "start rank" (alphabetical seeding): Risers & Fallers has no Season 1 view; the Progression focus panel shows the S1 finish; Standings shows the start rating only. Wording: "Peak" / "Low" everywhere; Mainstay column "Division". UCL tag icon is 🔵 (was ⭐).

## Canvas v19

### App.js: Canvas v19 — 2026-09-26, 04:30 UTC — Pyramid v9

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v9 — 2026-09-26, 04:30 UTC — Yo-Yo Clubs definition

- Yo-Yo Clubs table uses the same definition as the Progression preset: promoted then relegated in successive seasons, or the reverse. Ranked by number of yo-yos (then total moves, then average finish). Clubs that only climbed or only fell are not listed. "P + R" column is now "Yo-yos".

## Canvas v18

### App.js: Canvas v18 — 2026-09-26, 04:25 UTC — Pyramid v8

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v8 — 2026-09-26, 04:25 UTC — Analytics tidy-up

- European Ledger: cup-route badges keep the ring, lose the dot.
- Div 1 Royalty, Mainstay Clubs, Yo-Yo Clubs, Favorite Rank, Biggest Risers & Fallers: drawn flags everywhere (bigger), no abbreviation after names, no header badges. Mainstay table: country code gone. Risers & Fallers: UCL/P/R tags gone.
- Favorite Rank is now calculated (was a typed-in list; the top 10 it produces today is the same). Rows open the club profile.
- Yo-Yo Clubs counts promotions and relegations from the ranks (the sheet's tags missed Wrexham's 3 promotions and 3 blank relegations).

## Canvas v17

### App.js: Canvas v17 — 2026-09-26, 04:04 UTC — Pyramid v7

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v7 — 2026-09-26, 04:04 UTC — European Qualification: Positions refinements

- Axis: Division 1 gets 70% of the line on a smooth curve (each place a little less room than the one above; no sudden jumps at 5/10/20). Divisions 2, 3 and 4 get 10% each. Rank 1 sits in from the edge.
- Each division shaded very lightly in its own colour, and labelled.
- Domestic cup routes get dotted rings: red for the FA Cup, lime for the Carabao Cup (also in the Ledger).
- Explanatory note under the legend removed. Dots slightly larger.

## Canvas v16

### App.js: Canvas v16 — 2026-09-26, 03:46 UTC — Pyramid v6

- A section can read extra tabs (extraTabs). Pyramid reads Winners.

### Pyramid.js: Pyramid v6 — 2026-09-26, 03:46 UTC — Analytics: European Qualification rebuilt

- One dashboard, three views of the same qualifications: Positions: a dot per qualification at the club's finish, stacked when clubs share a rank, one row per competition. The axis is stretched: ranks 1-5 get 35% of the line, 6-10 20%, 11-20 25%, Divisions 2-4 20%. Dots in club colours; cup routes ringed. Ledger: every club that has qualified, by season (UCL/UEL/UECL). Europe Tax: each qualification's finish vs the next season, with higher / same / lower bars per competition. "How far they got" column waits for European run data.
- Routes (league place, UCL/UEL/UECL winner, FA Cup, Carabao Cup) worked out from the league's rules and the Winners tab. They match the sheet's tags for every qualification.
- The separate Europe Tax cards are folded into the Europe Tax view.

## Canvas v15

### App.js: Canvas v15 — 2026-09-26, 02:11 UTC — Pyramid v5, data copy

- Version tag updated.
- sheetData.js: Crystal Palace's short name is now PALACE (StackBlitz copy only; change cell AF in the Pyramid tab of the real sheet too).

### Pyramid.js: Pyramid v5 — 2026-09-26, 02:11 UTC — Progression labels, Standings

Progression
- "View" label removed from the view switcher.
- Season labels above the chart are plain text (S1, S2...), like the ones below it.
- Compact: rank ticks every 5 places skip any within 2 of a division edge (no more 44/45, 68/70, 90/92 pairs).
- Standard: left labels read name, flag, rank (rank next to the chart, in the same dark colour as the right side).
- Expanded: no rank numbers beside the chart (every point shows it). Standings
- Drawn flag, bigger; country code in brackets removed.
- Season columns (S1, S2...) sort by that season's finish.
- Actions column hidden while editing is off.

## Canvas v14

### App.js: Canvas v14 — 2026-09-26, 00:39 UTC — Cups v9, Cups Lab v1

- Version tag updated. No other changes to this file.

### Cups.js: Cups v9 — 2026-09-26, 00:39 UTC — Lab tab, path difficulty

- New last tab: Lab (CupsLab.js), with its own crash protection. SHOW_LAB = false hides it.
- Campaign cards show the average opponent rank ("Opp 29.0"), coloured by how tough the path was compared with all campaigns (quarters: toughest, tougher, easier, easiest).
- Campaign drawer: "My rank • Opp rank • RSI" (RSI as the sheet has it: my rank minus average opponent rank).
- The "#" before average opponent ranks is gone everywhere.
- openRivalry(): jumps to a club in Rivalries (used by the Lab).

### CupsLab.js: Cups Lab v1 — 2026-09-26, 00:39 UTC

- Round Survival Funnel: per competition, how many runs reached each round and where they ended. One-match cups left out.
- Cups Passport: tile map of every country faced, All / ESL / GSL. Click a country for its clubs.
- Rivalry Rematch Grid: clubs met 2+ times, by competition or season, shaded by win %. Click a club to open it in Rivalries.
- Margin Extremes Wall: 8 record cards (biggest win, heaviest loss, highest-scoring, biggest aggregate win, biggest comeback, tightest final win, signature scoreline, biggest upset suffered). Data: every match counts each leg separately, as in the rest of Cups. /

## Canvas v13

### App.js: Canvas v13 — 2026-09-26, 00:30 UTC — Pyramid v4

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v4 — 2026-09-26, 00:30 UTC — Progression label fixes

- Expanded: more room above rank 1, so title crowns aren't cut off.
- Standard and Expanded: name labels are sized to the longest club name (was a fixed width with dead space).
- Left labels mirror the right: rank on the outside, then the name and flag against the chart, so every name sits next to its line.

## Canvas v12

### App.js: Canvas v12 — 2026-09-25, 21:53 UTC — Pyramid v3

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v3 — 2026-09-25, 21:53 UTC — Progression: Compact compare, Expanded extras

Compact
- Lines are grey; your club in colour. Click lines to pin up to 3 clubs (MAX_PINNED) to compare: pinned clubs draw in colour with their abbreviation at both ends; a tray above the chart lists them (x to unpin, Clear). With clubs pinned, only they are in colour. Expanded
- Division champions header removed.
- Rows taller (34px), points and rank numbers bigger.
- Crown on every point where a club won its division.
- Automatic promotion zones (top 2 of Div 2 and 3, top 3 of Div 4) and relegation zones (bottom 3 / 3 / 4 of Div 1 / 2 / 3) shaded. Sizes in AUTO_PROMOTION_PLACES and RELEGATION_PLACES.
- European labels read UCL / UEL / UECL. Markers bigger, and bigger again on the point you hover.
- Focus panel adds best and worst season, average finish, yo-yo bounces and a trophy breakdown.

## Canvas v11

### App.js: Canvas v11 — 2026-09-25, 21:15 UTC — Pyramid v2

- Version tag updated. No other changes to this file.

### Pyramid.js: Pyramid v2 — 2026-09-25, 21:15 UTC — Progression chart: three views

- Compact: the whole pyramid fits one screen. Thin lines, grey except your club, the highlighted club and any filter/preset results. Rank ticks on the left, no name labels.
- Standard: full page width, the page scrolls (no inner window). Flags and names on both sides, club colours.
- Expanded: taller rows, rank on every point, P/R and CL/EL/ECL markers, each season's division champions in its header. Clicking a club puts it in focus: others dim, and a side panel tells its season-by-season story.
- Status bar and season headers stay on screen while scrolling (a sticky strip under the page header). Same size whether or not a club is highlighted.
- Light hover card (like League and Cups) replaces Gemini's dark one.
- Division titles centred in their rail boxes.
- Legend footer removed.
- The chart draws at the page's real width, so text stays one size.

## Canvas v10

### App.js: Canvas v10 — 2026-09-25, 20:41 UTC — Pyramid v1, UI v5

- Pyramid now reads real sheet rows: its row shift is removed.

### ui.js: UI v5 — 2026-09-25, 20:34 UTC

- New accent: teal (Pyramid), for PageHeader, HighlightsBar, FilterPills and ControlLabel.
- SvgFlag and flagArt: the same drawn flags, for use inside SVG charts.

### Pyramid.js: Pyramid v1 — 2026-09-25, 20:41 UTC — Correctness pass + shared kit

Correctness
- Reads the real sheet rows (clubs on rows 6-97). App.js no longer shifts rows for Pyramid.
- Seasons: however many the sheet's "COMPLETED SEASONS" cell says (was fixed at 8). Chart axes, tables, selectors and labels follow.
- Division boundaries come from the sheet's "DIVISION n" rows (were typed in as 20/44/68).
- Promotion / relegation worked out from the next season's rank. The sheet's tag holds one value, so a European place hid Wrexham's 3 promotions, and 3 relegations after S7 have a blank tag (CLUB, VFB, SHA). The latest season still uses the tag.
- Presets are rules: Div 1 Elite = Div 1 every season; Yo-Yo Clubs = promoted then relegated in successive seasons (or the reverse) at least once; Top Risers = climbed 15+ places; your club from a setting.
- Typed-in numbers replaced by calculations: Europe Tax card, Promotion Survival, European "Historical avg" figures, qualification count, division ranges in the club profile, "8 seasons" labels.
- Club colours: spaces around hex codes are trimmed.
- Club editing switched off (ENABLE_EDITING). Look
- Shared header and tabs (ui.js), in the Pyramid's teal. Gemini's purple accent is now teal; purple stays only where it means Div 1. Division colours unchanged.
- Progression controls use the shared kit (division pills, presets with counts, view switch, search, Reset).
- Status bar above the chart always keeps its space, so hovering a club no longer pushes the chart down. Light grey, so flags show.
- Flags come from ui.js (one shared set). Not yet: the three Progression views (Pyramid v2).

## Canvas v9

### App.js: Canvas v9 — 2026-09-25, 18:21 UTC — League v13, Cups v8

- Version tag updated. No other changes to this file.

### League.js: League v13 — 2026-09-25, 18:21 UTC — Hover cards

- Matchday Benchmarks: hovering a cell in the win-rate strip shows a card (record, win %, points per game, goal difference, games).
- Momentum Pulse, Overlay: the hover card lists each season as S1, S2..., its 5-game average, and that matchday's result (flag, club, score coloured by result).

### Cups.js: Cups v8 — 2026-09-25, 18:21 UTC — Hover card lists

- Margin Distribution hover lists show the competition (short name: UCL, UEL, FAC, CAC, BSM, SC, CS) instead of the season, which the card already shows. Two-Leg aggregate lists show both (e.g. "S8 UCL"), since they can span seasons.
- Card subtitle says "All matches" instead of "All".

## Canvas v8

### App.js: Canvas v8 — 2026-09-25, 17:47 UTC — League v12, Cups v7, UI v4

- Version tag updated. No other changes to this file.

### League.js: League v12 — 2026-09-25, 17:47 UTC — Hover cards, two new dashboards

Form & Margins
- Outcomes: hover cards (count and share), same as Cups.
- Margin Distribution, Stacked Visualizer: new shared hover cards, listing the matches (flag, club, matchday, score) when a segment has 8 or fewer. Match-by-match counts checked against the sheet's margin columns: identical in all 8 seasons.
- New: Momentum Pulse (below Margin Distribution). Single season: a bar per match (goal difference, coloured by result) and a 5-game average line, dashed until 5 games are in. Overlay: the average lines only, one per season. Hover for details. Points
- New: Matchday Benchmarks (bottom of the tab). All / Div 1 / Lower divisions; highlights (best and worst matchday with ties shown, perfect matchdays, matchdays and games each); win-rate strip; sortable table. Click a matchday to see its results, one per season.

### ui.js: UI v4 — 2026-09-25, 17:43 UTC

- Flag: 38 small drawn flags (Gemini's 22 from Pyramid + 16 more: every country in the workbook). Works on Windows, where flag emoji don't show.
- SegmentBar moved here from Cups, so League uses it too. Hover card lists show one line per match (flag, name, season, score), only when 8 or fewer; above that, just the count.

### Cups.js: Cups v7 — 2026-09-25, 17:43 UTC — Hover cards, tag rename

- Hover cards now come from ui.js (shared with League). Match lists are one line each (flag, club, season, score) and only appear when a segment has 8 or fewer; above that, just the count.
- Outcomes hover cards: no match list.
- Two-leg tag "Won it in leg 2" renamed "Decider".

## Canvas v7

### App.js: Canvas v7 — 2026-09-25, 16:34 UTC — League v11, Cups v6, Pyramid v0.1, UI v3

- The GSL section switcher (League | Cups | Pyramid) stays on screen when you scroll, with each section's header just below it.

### League.js: League v11 — 2026-09-25, 16:34 UTC — Icon

- Form & Margins tab uses the pulse icon (same as Cups).

### ui.js: UI v3 — 2026-09-25, 16:34 UTC

- ControlLabel takes an accent, so its icon matches the section (League indigo, Cups gold). Default stays indigo.
- PageHeader sits just below the GSL section switcher (which now stays on screen), instead of at the very top.

### Cups.js: Cups v6 — 2026-09-25, 16:37 UTC — Review fixes

- Control icons (Season, Competition, Matches, Tags, Split by) are Cups gold instead of League purple, on every tab.
- Form & Margins: every bar has a hover card (like League's): count, share, and the matches or ties behind it when there are 8 or fewer.
- Margin Distribution and Two-Leg Ties: new Competition filter.
- Two-Leg Ties: game states are now 14 tags; a tie can have several. Slimmer tag chips; tap one to filter. Tie cards show their tags (the "after leg 1 -> final" line is gone). New tags: Merciless, Clean, Nailbiter, Heavyweight (ESL top 10 that season), Deadlocked, Gasp, Humiliated. "Knocked out" now means any lost tie.

### Pyramid.js: Pyramid v0.1 — 2026-09-25, 16:30 UTC — Header sits below the sticky

switcher.

## Canvas v6

### App.js: Canvas v6 — 2026-09-25, 16:04 UTC — Cups v5

- Version tag updated. No other changes to this file.

### Cups.js: Cups v5 — 2026-09-25, 16:04 UTC — New tab: Form & Margins

- New tab after Eliminations, with four dashboards, top to bottom: 1. Outcomes: every match (each leg of a two-leg tie counts as one). Wins and losses on pens have their own striped colours. 2. Margin Distribution: Stacked Visualizer and Tier Matrix (as in League), filtered by season and match type (All / Group Stage / One-Leg Ties / Two-Leg Ties, each leg). Pens get their own tiers. 3. Two-Leg Ties: game states (tap one to filter), aggregate margins, and every tie with its legs and aggregate. The tie is the unit. 4. Shootouts: key numbers, a split (competition / round / season / score before pens), and every shootout.
- Opens with the shared highlights strip. Everything is calculated.
- Pens colours, game-state names and the Coast threshold live in the "FORM & MARGINS" block (PEN_WIN_STYLE, TIE_TAGS, COAST_LEG1_MARGIN).
- No changes to any other tab.

## Canvas v5

### App.js: Canvas v5 — 2026-09-25, 04:22 UTC — Cups v4

- Version tag updated. No other changes to this file.

### Cups.js: Cups v4 — 2026-09-25, 04:22 UTC — Card layout tweaks

- Campaigns: the result badge moved down to the season line (right side, just above the end of the progress bar), so competition names get the full width.
- Rivalries: competition tags removed; the record (MP, W, D, L, PKs) and goal difference now sit below the bar, as in Leagues.
- Leagues: the EA FC league handle (e.g. BEL) is back, small and grey, next to the flags on each card and in the drawer title.
- Fixed broken hover text on the win/loss bars (Rivalries, Leagues).

## Canvas v4

### App.js: Canvas v4 — 2026-09-25, 04:05 UTC — Cups v3 and UI v2

- Version tag updated. No other changes to this file.

### ui.js: UI v2 — 2026-09-25, 04:01 UTC

- Tabs: no more browser outline box after clicking a tab (keyboard users still get a soft ring).
- FilterPills take an accent (League indigo, Cups gold).
- Segmented has 'gold' and 'silver' tones (cup champions / finalists).
- HighlightsBar takes a column count (3, 4, 5 or 6 cards).
- useGridColumns + drawerRowEnd: lets a card's drawer open below its whole row, so the other cards in that row stay where they are.

### Cups.js: Cups v3 — 2026-09-25, 04:04 UTC — Review fixes and tab-by-tab design pass

Everywhere
- Unplayed seasons (nothing played yet, e.g. Season 10) are hidden.
- Opening a card's drawer (Campaigns, Rivalries, Leagues) no longer pushes the other cards in its row below the drawer.
- Round names read naturally ("Round of 16", "Quarter-Final").
- Cup colours: Champions gold, Finalists silver, Exits red.
- Season pills in Cups gold. Campaigns
- Campaign card redesigned: one result badge instead of "WON" + "CHAMPIONS"; competition and season on the left.
- Campaign banner reworked: title and result on top, then one row of six stats (record, goals, goal difference, entered, avg opponent rank, winner).
- Bracket arrows point right-to-left (Final on the left). Finals
- Competition switch; the stats, foes and archive follow it.
- Stats in the shared highlights strip. "vs" removed from cards. Runner-up badges silver. "(ESL Foes from Archive)" removed. Eliminations
- Exit rate counts only played cup runs. "Nemesis" line removed. Rivalries
- Stats in the shared highlights strip; filters use shared controls.
- "ESL Only" badge and rules text removed.
- A club's matches open as chips (like Campaigns), not a list. Leagues
- Matches open as chips. League names no longer cut off.
- League slot codes (BEL, ROM, ...) hidden. Competitions
- Banner replaced by the shared highlights strip (removes the "Cups!HS:LX" note). Controls use the shared switches and search. "1 Cups" fixed to "1 Cup". Made-up "71.1%" fallback removed. Trophies
- Banner replaced by the shared highlights strip. Filters use the shared controls. "Quintuple Era (S6-S8)" now calculated.

## Canvas v3

### App.js: Canvas v3 — 2026-09-25, 02:51 UTC — Shared design kit

- New file ui.js holds the pieces every section shares (header, tabs, highlights strip, controls). League v10 and Cups v2 use it.

## Canvas v2

### App.js: Canvas v2 — 2026-09-24, 23:18 UTC — Cups v1

- Cups now reads real sheet row numbers, so its row shift is removed.

### Cups.js: Cups v1 — 2026-09-24, 23:19 UTC — Correctness pass (no visual changes)

- Two-legged ties now count as two matches, each leg with its own score and result, as the sheet's match totals count them. Affects club records (Rivalries) and the matches log. The Leagues tab still counts a tie once, because the sheet's league table does. Rivalries labels now explain this ("Each leg counts as a match").
- Finals and Eliminations lists no longer stop at 33 and 5 entries (the counts on the day they were built). New finals now show up; empty numbered slots in the sheet are ignored.
- Removed made-up fallback numbers (218 played, GF 479, 81.8% finals win rate, "Man City 6x"...). Blank sheet values now show as 0.
- Removed out-of-date fallback column positions. If a header the canvas looks for is missing, a yellow warning explains what's wrong instead of silently reading the wrong columns.
- Reads real sheet row numbers (App.js no longer shifts the rows).
- Typed-in text now calculated from the data: season counts and ranges, Quintuple Era seasons, finals record, finals goals and clean sheets, trophy breakdowns, number of leagues. Our club's name is set once in CUPS SETTINGS.
- Editing switched off (ENABLE_EDITING); edit buttons hidden.
- Faster: rows are looked up by number instead of searching all rows.

## Canvas v1

### App.js: Canvas v1 — 2026-09-24, 22:52 UTC — Combined project

- One project for League, Cups and Pyramid, with a section switcher at the top. Each section is its own file.
- Each section is protected: if one crashes, it shows an error box and the other sections keep working.
- Data comes from sheetData.js (every tab, real sheet row numbers).
- One version tag for the whole project (bottom-right corner). /

## Earlier (no canvas version recorded)

### Cups.js: Cups v2 — 2026-09-25, 02:51 UTC — Design pass: in line with League

- Header and tab bar now use the shared PageHeader (same layout, spacing and full-size tabs as League), in Cups gold.
- Removed the "Synced to Cups Sheet" badge and the three header stats (Trophies, Finals Win %, Total Matches).
- New highlights strip at the top of Campaigns, built like League's: Trophies, Record, Finals, Goals, Shootouts.
- Campaigns filters use the shared controls: season pills, a standard dropdown for competition, a result switch (Champions / Finalists / Exits), the shared search box and a Reset button.
- Section titles use League's section-title style (Finals archive, Leagues, Silverware collection).
- Smallest text raised from 8-9px to 10px (League's smallest size).
- Page font and content spacing now match League.
- Removed developer notes from titles ("Cups!HS:LX Grounded", "Computed from Log").

### League.js: League v10 — 2026-09-25, 02:51 UTC — Uses the shared ui.js (no visual change)

- Header, tab bar and Seasons highlights now come from ui.js (PageHeader, HighlightsBar, HighlightCard), so Cups and Pyramid can share them. Shared controls moved from this file to ui.js.
- Checked: every League tab renders exactly as before.

### ui.js: UI v1 — 2026-09-25, 02:49 UTC — first version: controls moved out of League.js;

PageHeader, HighlightsBar and HighlightCard added (copied from League's header and Seasons highlights, with an accent option). /

### League.js: League v9 (unchanged) — 2026-09-24, 22:52 UTC — moved into the combined project

- File renamed from App.js to League.js. It now gets its data from App.js. Its own corner tag is switched off (App.js shows one tag for the whole project). No other changes.
Claude v9 — 2026-09-24, 19:11 UTC — Style guide and small cleanup
- Added a style guide (below this header). No visual change.
- Opponents: removed the spreadsheet cell reference "(IT7:PS7)" from the "Avg Rating" sort option and the card hover text.
- Added a code note that club #92 (the user's own club) is left out on purpose.
Claude v8 — 2026-09-24, 18:56 UTC — Shorter section titles
- Seasons: "Campaigns".  Points: "Points Race".
- Form & Margins: "Wins by Margin", "Draws by Score", "Losses by Margin" (game total is now a coloured bubble on the right), "Margin Distribution", "Goal Fests", "Dropped Points Analysis".
- Home vs Away: "Split", "Venue Ledger", "Venue Swing".
- Spider Matrix: "Highs & Lows".
- Titles not on the approved list were left as they were.
Claude v7 — 2026-09-24, 18:32 UTC — Cleanup, division filter, live stats
- Header: removed the seasons / titles / matches / GD summary line.
- Matchdays: removed the points / record / clean sheets subhead.
- Points: new Division filter (All / Div 1 / Div 2 ...). Season pills and the chart only show seasons in that division; the x-axis fits the season length (MD 38 for Div 1). Subhead removed.
- Streaks: Record Win Streak and Record Unbeaten Run shown as two tiles above the selectors (always career-wide).
- Highs & Lows: every number is now calculated from the match data (biggest win / defeat / draw, goal fest, routs, losses, draws, average goals, clean-sheet ratio) and updates as results come in.
Claude v6 — 2026-09-24, 17:58 UTC — Content architecture
- Tabs reordered and renamed: Seasons, Matchdays, Opponents, Points, Form & Margins, Home vs Away, Spider Matrix. Tab list now lives in one place (TABS, near the top) instead of seven copies.
- Form & Margins: Outcomes: renamed; subhead removed; "320 Played" moved to sit with Won / Drawn / Lost. Margin Distribution: Stacked Visualizer now first (and default); "All 8 Campaigns" label removed; colour names removed from the legend; in the matrix the biggest tier in each group (wins, draws, losses) is highlighted in every season row and in Career Totals. Highs & Lows: renamed; "Matches Analyzed" label removed. Streaks: renamed; the two record badges beside the title removed.
Claude v5 — 2026-09-24, 17:35 UTC — Version tag
- Small version label in the bottom-right corner of the canvas so you can tell which version is running. Hide it with SHOW_VERSION_TAG.
Claude v4 — 2026-09-24, 17:22 UTC — Record by PPG, metric switches
- "Record season" is now judged by points per game everywhere (Spider preset and the Points Race record card), so 38- and 46-game seasons compare fairly.
- Home vs Away: reverted to three separate Points/Wins/Goals switches, one per section, now in the standard switch style.
Claude v3 — 2026-09-24, 17:01 UTC — Cleanup & standardization
- Home vs Away: removed the "Main" toggle and the hidden "Alt" view behind it (~540 lines of unreachable code). One Points/Wins/Goals switch now drives every chart on the tab (was three separate ones).
- Standard controls used everywhere: view switches, season/nation filter pills, Reset buttons, search boxes and dropdowns now share one look and behaviour (see SHARED CONTROLS near the top).
- Reset rule: rows with an "All" option have no separate reset link; panels with several filters (Fixtures, Clubs, Dropped Points, Spider Matrix) have one Reset button, always in the same place, greyed out when there is nothing to reset.
- Season layer toggles (Points Race, Spider overlay) both use Select All / Clear All. Spider overlay no longer lists unplayed seasons 9–15.
- Club nation filter is built from the data (previously a fixed list that hid Scotland, Greece, etc.).
- Spider Reset now always restores the default comparison for the current view (was a mixed clear/restore toggle).
- Removed unused code: an unused side-table parser and two memos that only fed the removed Alt view.
Claude v2 — 2026-09-24 — Speed
- Hover tooltips move on their own instead of redrawing the whole tab on every mouse movement. Points Race and Spider hover state kept inside those charts.
Claude v1 — 2026-09-24 — Correctness
- Titles counted from the sheet's position column, finished seasons only (Div 1 = 38 games, others = 46). In-progress season shown as "In Progress".
- Removed fixed season numbers (Invincible, current season, presets, chart highlight). No jump back to latest season after data changes.
- Fixed broken hover text on dropped-point matches.
- Edit buttons hidden behind ENABLE_EDITING (off) until writes are verified safe on a copy of the sheet. /

### Cups.js: Cups v0 — the code as built in Google Sheets (Gemini), re-indented,

with "export default App" added so StackBlitz can load it. /

### Pyramid.js: Pyramid v0 — Gemini's code as built in Google Sheets.

/

## File notes (from the old headers)

What each file said about itself above its changelog, kept as it was.

### LeagueTabs.js

```
  The two League tabs redesigned in the v51 Palette Lab (Form & Margins
  rounds 1–3, Points rounds 1–5), built as their own module so League.js
  only has to hand them the seasons and the clubs.

  Everything is worked out here from each season's fixtures (matchday,
  venue, opponent, score, result), so no new sheet columns are needed.
  One known gap: the sheet records the matchday a title was sealed only
  for some seasons; Fastest Title Seal uses the seasons that have it.

  Rules followed: R1 records, R2 scores, R5 Highlights bar first, R6 no
  repeats, R8 section cards neutral, R10 match order (flag, club, result,
  score), accents never colour data.
```

### ui.js

```
  Everything here is shared by League, Cups and Pyramid, so the sections
  look and behave the same. Change it here and it changes everywhere.

  ACCENTS ......... each section's signature colour (League indigo,
                    Cups gold). Used by the header, tabs and highlights.
  PageHeader ...... title + icon + tab bar (the top of every section)
  useGridColumns,
  drawerRowEnd .... open a card's drawer under its whole row
  HighlightsBar ... the dark strip of headline numbers
  HighlightCard ... one card in that strip
  Segmented, FilterPills, ControlLabel, ResetButton, SearchInput,
  SELECT_CLASS .... controls (moved here from League.js, unchanged)
  Flag ............ small drawn country flag (from a flag emoji)
  SegmentBar ...... a bar split into segments, with a hover card
  SectionInfo ..... a section's [i]: popover on desktop, bottom sheet on phones
```

### Cups.js

```
  Reads the "Cups" tab (passed in by App.js), using real sheet row numbers.
```

### CupsLab.js

```
  Experiments for the Cups section. Shown as the last tab of Cups
  (tagged "Lab"), with its own crash protection: if an experiment
  breaks, only this tab goes blank. Switch it off with SHOW_LAB in
  Cups.js. Not part of the Google Sheets build.
  Graduating an experiment = moving its component into Cups.js.
```

### Pyramid.js

```
  Reads the "Pyramid" tab, plus "Winners" for European routes
  (both passed in by App.js).

  SETTINGS (top of the file): CLUB_ABBR, CLUB_DISPLAY_NAME,
  ENABLE_EDITING (off), TOP_RISER_PLACES, PYRAMID_ACCENT.
```

### Squad.js

```
  Reads the "Squad" tab (passed in by App.js).
```
