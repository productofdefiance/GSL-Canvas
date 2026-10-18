# GSL test kit (in the repo from Canvas v51.16)

The harness Claude uses to check every build: syntax, a full server render of every page and tab,
a real browser (Playwright + Chromium) for interactions, light / dark, desktop / phone.
It reads the app straight from `../src` and `../public/index.html`; nothing is copied.
Test tools install into `test/node_modules` only: the app's own dependencies are untouched.

## Setup (once per session)

```
test/setup.sh        # npm install in test/; fetches Chromium only if the machine has none
```

Claude Code cloud sessions already have Chromium (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`);
`playwright` is pinned to the version that matches it (1.56.1).

## Every build

```
cd test
npm run check        # syntax, compile, build, rules, lint, render (every page x tab at 390 and 1440), empty save
npm run css          # Tailwind CSS from ../tailwind.config.js, prefixed with index.html's <style>; fails on a runtime class the build lacks
npm run bundle       # browser/app.bundle.js
npm run overflow     # phone overflow check on every League tab (scrollWidth must equal 390)
npm run tap -- --full <tabs the build changes>   # hover cards on touch at 390: full on those tabs, sample elsewhere (see below)
npm run tap -- --sample                          # sample on every tab (no build-specific full sweep)
cd browser && node shots6.js '[{"w":1440,"ov":{"App:sectionId":"league","League:activeTab":"spider"},"out":"x.png","dark":true}]'
```

`compile.js` (from v51.18) parses every file in `src/` with Babel's parser, the one react-scripts
compiles with. It fails on errors a plain syntax check misses, such as the same name imported twice. It also fails if
`public/index.html` has `<html…>` text inside a comment, because react-scripts injects its script there.

`render.js` prints any page with React errors or text under 11px, then a total, and (v51.22) compares the
sub-11px count of every page and tab (both widths, extra views included) with `baseline.json`. It fails on a
React error or a count that differs: a rise is a regression; after a drop, lower the baseline with
`node render.js snap --update`. The v51.22 baseline: 64 renders, 0 errors, 1,524 hits (1,514 in Pyramid
Progression, 10 in Home vs Away: the logged 10px spine label).

`rules.js` (v51.22, `npm run rules`) checks the CLAUDE.md code rules over the syntax tree of every file in `src/`
(comments never count): `window.innerWidth` / `innerHeight`, `(hover: none)`, a club's name or code as a string
(the list comes from the club directory in sheetData.js, through `clubs.js`; codes are matched in capitals only),
`useState('<club code>')`, typed-in counts (91 / 92, a loop or season-number cap to a fixed number, a
`GAMES_PER_SEASON`-style table) and plain `overflow-x-auto`. Each break prints its file and line. Exceptions live
in `rules-allow.json`, each with its kind and reason; an entry that matches nothing fails, and page debt (Cups,
Pyramid, Squad) is a count that may only go down. `node rules.js --list` prints every match.

`lint.js` (v51.22, `npm run lint`) runs ESLint (`eslint.config.js`: the react and react-hooks plugins, test-only
dependencies) and compares each file's finding count with `lint-baseline.json`: a rise fails; after a drop,
`node lint.js --update`. `--list` prints the findings. Hook dependency warnings are listed, never fixed
blindly: adding a dependency changes when a calculation re-runs.

`empty.js` (v51.22, `npm run empty`) renders every page and tab at 390 and 1440 against an empty workbook and a
headers-only one (each tab's rows before its first row with a number). It fails on a React error, a section crash,
or "NaN", "undefined", "null" or a club name in the visible text; allowed names are the `empty` list in
`rules-allow.json`.

`browser/pixel.js` (v51.22, `npm run pixel -- shoot <dir>` / `-- diff <dirA> <dirB>`) screenshots every page and
tab at 390 and 1440, light and dark (120 shots, footer hidden), and compares two sets pixel by pixel. For a build
that must not change the screen: shoot main's bundle first (`PX_BUNDLE`, `PX_CSS`), then the branch's, then diff.
Two runs of the same build come out identical, so any difference is real.

`browser/prod.js` and `browser/site.js` (v51.23): the pixel sweep against the real production build. `node prod.js
<ref | .> <outDir>` runs react-scripts build on a git ref (e.g. `origin/main`) or the working tree, with one test
hook (each `useState` reads `__OV` first, as build.js does, so every tab can be opened; ESLint off for that build).
`PX_SITE=<outDir> npm run pixel -- shoot <dir>` then shoots the served build. `PX_PLAYCDN=1` answers a build's play
CDN request (cdn.tailwindcss.com is unreachable from cloud sessions) with site.js's stand-in: it watches the page's
class names and keeps one style at the end of the head, compiled by Tailwind 3.4.17 with the page's own config, as
the play CDN does, and with `PX_CLASSES=<file>` writes every class the pages used. `PX_PLAYCDN=<that file>` answers
with the static stand-in instead (those classes compiled ahead, in place before the page draws): use it for the
"before" set, because the dynamic one's styles land after the page's first measurements (a season strip then
misses scrolling its chip into view). Either way it shows the CDN's styles, not its cost.
On production builds three views differ between two runs of the same build (squad-former and squad-contracts at
390 near y=127, pyramid-progression by 12–23 pixels); re-shoot them before calling a difference real.
`PX_DOCTYPE=1` (diagnosis) puts a doctype in front of a page that has none: the live page has no doctype and draws in
quirks mode, while the kit's own pages draw in standards mode (v51.23 found this; the doctype is a later build).

`browser/load.js` (v51.23): load numbers. `node prod.js <ref | .> <outDir> --plain` makes the build exactly as
Netlify does (no hook); `node load.js <outDir> [--playcdn]` loads it at 390 with 4x CPU slowdown, three runs, and
prints first paint, League drawn (the page's last change before 1.5s of quiet), bytes downloaded and CSS bytes,
and the middle run. With `--playcdn` the CDN's download and in-page compile are left out.

Output (`out/`, `snap*/`, `cssC.css`, `browser/app.bundle.js`, screenshots) is git-ignored.

## Stand-ins

`stubs/d3` and `stubs/lucide-react` replace the real libraries in tests (real d3 is ESM-only).
`stubs/index.js` routes the server render to them; `browser/bundle.js` always picks them first.
The lucide stand-in draws real Lucide shapes through `react-icons` (a test-only dependency).

## Forcing state

`build.js` rewrites `const [x, setX] = useState(init)` to read `globalThis.__OV['<FileStem>:x']` first,
so a test can open any tab or view: `{"App:sectionId":"league","League:activeTab":"race","LeagueTabs:mode":"compare"}`.
Tab ids: league overview, fixtures, clubs, race, analytics, homeaway, spider.

## Example interaction tests (browser/)

- `touch_t.js`: simulated finger drag on the Points race (PointerEvent with pointerType 'touch'); checks the docked card.
- `sp_t.js`: Spider Matrix: picker, typing focus, swap, quick picks, Group add / remove, table, dark, phone.
- `rv.js`: a review-fix pass: header alignment by measured positions, two-column list, hover cards, ledger switch.
- `tap_t.js` (v51.19, `npm run tap`): hover cards on touch, tapped the iPhone way: pointerdown + pointerup only
  (no pointermove, no click, as iPhone sends for blank space). Each `[data-hv]` target tapped at 390 must open its
  card (`[data-hv-card]`), switch when another target is tapped, close on a blank tap and close on scroll. Extras every
  run: an [i] closing an open card, the sideways scrub (Points race, Overlay), a Cups sample (HoverProvider), mouse
  hover at 1440.

  **Which depth, every build:**
  1. **Full sweep** (every target) on the tabs the build changes: `npm run tap -- --full race,homeaway`.
     Tab ids: overview, fixtures, clubs, race, analytics, homeaway, spider; single views like `race-pace`,
     `analytics-overlay`, `spider-group-seasons` work too.
  2. **Full sweep on every tab** whenever ui.js's hover or touch code changes (useHoverCard, useTapAway, useOverlay,
     useTouchCard, HoverProvider / useHover, usePointerTrack, useScrub, Sheet, SectionInfo): `npm run tap:full`.
  3. **Sample** (first, middle and last target of each chart) on every other tab: what `npm run tap` does to any
     tab not named in `--full`. This is the regression check, about 2 minutes.

  Scroll-to-close scrolls 40px down, or up when the page is already at its end (a short page, e.g. Points with its
  ledger folded); a page that can't scroll either way is a failure, not a pass.

  No fixed waits: each step polls (every frame, 500ms cap) until the card opens, changes or closes, or the page
  stops scrolling. Hard timeouts stay: `--max` seconds inside the script (exit 2) and `timeout` around it. The full
  sweep of every tab took ~5.5 minutes in v51.19 (Form & Margins has ~640 targets); if it outgrows the limit, split it:
  `node tap_t.js --full all --only analytics --max 550`, then `--only race,homeaway,spider,overview,fixtures,clubs,extras`.
  Known: 10 Spider Group dots sit on top of another dot with the same value and are reported as covered (v51.21's
  tap-to-rank replaces tapping single dots).
- `pts_t.js` (v51.20): Points on phones: the folded ledger and its button, the strip scrub (and a vertical swipe
  still scrolling, sent as raw touch events), the docked card against its ledger row, "See in ledger" (centred,
  marked, the mark clearing), the Pace control rows and legend, the [i] text word for word, the dark [i] contrast.
- `fade_t.js` (v51.21): every chip or switch row that scrolls sideways is a ScrollRow whose edge fades match the
  surface behind it, light and dark (Points season strip; Spider quick picks, Group chips, picker kinds), and no
  League tab has a plain sideways-scrolling box other than the wide tables.
- `spider_t.js` (v51.21): Spider on phones: the quick-picks row (one line, selected chip in view), verdict chips
  against the desktop column with their contrast in light and dark, Group tap-to-rank (order, ties, career row,
  bring forward, switch, close), dots not tappable, the [i] text word for word, and 44px tap areas in ten states
  (menus and the ranked card open). Known exceptions are reported, not failed.
- `strip_t.js` (v51.20): the Points race season strip keeps the focused season fully inside after late layout:
  a web font served 1.5s late (once with the cards sized to their text and ResizeObserver switched off, so only the
  `document.fonts` handlers can act), cards widening after render, Pace → Focus, Div 1 → All, and a user's own
  scroll not being undone. Prints each measurement (cell edges, strip edges, scroll position).
- `ha_t.js` (v51.19): Home vs Away on phones and the section [i]: popover / sheet, blurb text, ledger vs desktop, side-by-side bar widths, 44px tap areas, dark mode.
- `capsec.js`: captures each section of a tab as HTML for design inventories.

Habits: scope clicks to `main` (tab names repeat in the header); scroll an element into view before
screenshots; measure positions with `getBoundingClientRect` rather than judging from a cropped image.

## Design mocks (design/helpers.py)

Not yet adapted to the repo: it still reads `/home/claude/gsl/design/fm_data.json` (a chat-container path).

Python helpers for mock HTML (section, option frames, records, segmented controls). Mocks are rendered,
compiled with css.js-style Tailwind, screenshotted, then published to a Claude Design file as `.dc.html`
boards (`<script src="./support.js">`, stylesheet uploaded as an asset, board listed in `project/canvas.json`).
Read `canvas.json` right before publishing it.

## Blind spots

- The server render has no CSS: it can't judge layout, overflow or widths. Use the browser for those.
- The browser uses compiled Tailwind and the real fonts may not load (offline): pixel-perfect type checks
  belong to Anish's screens.
- Canvas design files can show stale pages to Anish after a publish; check the published file first.
