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
npm run check        # syntax.js + build.js + render.js snap: every page x tab at 390 and 1440
npm run css          # Tailwind CSS for the browser, prefixed with public/index.html's <style>
npm run bundle       # browser/app.bundle.js
npm run overflow     # phone overflow check on every League tab (scrollWidth must equal 390)
cd browser && node shots6.js '[{"w":1440,"ov":{"App:sectionId":"league","League:activeTab":"spider"},"out":"x.png","dark":true}]'
```

`render.js` prints any page with React errors or text under 11px, then a total. The v51.15 baseline:
64 renders, 0 errors, 1,534 sub-11px hits (all in pages not yet converted, plus the logged 10px spine label).
A build should not raise the error count or the sub-11px count on a page it touches.

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
