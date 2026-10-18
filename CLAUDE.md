# GSL Canvas

A React dashboard that tells the story of the user's EA FC25 career save (the GSL universe).
Owner: the user (creative director, no coding background). Footer on every screen: the "Developed by … & Claude"
credit (exact text in App.js; leave it as it is).

**Read first:** the living handoff, https://claude.ai/code/artifact/cbb051f0-7e60-42d2-a83c-b0d8d7951145
(current state, rules R1–R13, conventions, open items, how the user works). The design chat keeps it current.

## Project layout

Standard React layout (StackBlitz's file panel shows it as one flat list, but these are the real folders):

| Path | What it is |
| --- | --- |
| package.json | Project settings |
| netlify.toml | Netlify build for pull-request previews: `CI=false npm run build`, publishes `build/`, Node 20 |
| public/index.html | Tailwind CDN, Google Fonts, colour variables, division and dark-mode CSS |
| src/App.js | Shell: Top Bar, page switching, dark-mode switch, footer, `VERSION_TAG` / `PUBLISHED` |
| src/ui.js | Shared layer: controls, Highlights bar, hover provider, flags, `useSort`, `ownClubInfo`, club colours |
| src/League.js + src/LeagueTabs.js | League page shell + its redesigned tabs (convention C1) |
| src/Cups.js, src/CupsLab.js, src/Pyramid.js, src/Squad.js | Other pages |
| src/index.js, src/sheetData.js, src/style.css | Entry point; the exported workbook data; leftover stylesheet |
| test/ | Test kit: `test/setup.sh`, then `cd test && npm run check` (see test/README.md). Test-only dependencies live in test/package.json |
| briefs/ | One build brief per build (`v51.xx.md`), mock images in `briefs/img/`; `TEMPLATE.md` is the format |
| CHANGELOG.md | Every build's changes, newest first, grouped by canvas version (one entry per file) |
| CLAUDE.md | This file |

Any restructure is one deliberate step, agreed with the user, checked in StackBlitz (the user's preview), then recorded
here and in the living handoff.

Libraries: React, d3, lucide-react only. Ask before adding anything.

## How work runs

- Nothing is built until the user says so. Stress-test ideas first; push back plainly; no empty praise.
- Before replacing a component, list everything it does; check each item after the build.
- One branch and one pull request per build, titled with the canvas version (e.g. "Canvas v52.01: …").
- Every build bumps the canvas version in App.js (`VERSION_TAG`, `PUBLISHED`) and each changed file's own
  version. Each file keeps a short header (file name, version, date and time UTC, one line on its latest change,
  "History: CHANGELOG.md"); the build's entries go at the top of CHANGELOG.md, under its canvas version.
- The pull request description is the build message: what's in, what changed beyond the notes and why,
  checks run, known gaps.
- Ask before changing any convention (file structure, delivery, naming).
- The repo is public: no personal details (names, emails, private notes, screenshots) in files, commit
  messages or pull requests. Refer to the owner as "the user".

## Briefs (how a build starts)

Design happens in a separate claude.ai design chat. Its rounds, options and feedback stay there (private);
Code receives one brief per build, the locked decisions only.

- The brief follows `briefs/TEMPLATE.md`. The user starts a build session with the brief's claude.ai doc link
  (read it with the docs tools) or its pasted text. No brief and no clear ask: ask before building.
- Save a copy as `briefs/v51.xx.md` on the build branch, so the brief lands in the same pull request as the code.
  Mock images the user attaches go to `briefs/img/v51.xx-<n>.png`. The repo is public: mocks cropped to the
  canvas only, no names or personal screenshots in briefs or images.
- The Design System (https://claude.ai/artifact/3SAiTFvKEVFGsyrRhoksT9) is the source for tokens and component
  specs: read `project/README.md`, `project/tokens.json`, `project/components/<Name>/README.md`.
- claude.ai is read-only for Code. Code may read claude.ai artifacts and docs (the Design System, design
  files, the feedback doc, the handoff) but never edits, publishes, comments on or resolves anything there.
  They belong to the design chat.
- Before building, check the brief against this file, the Design System and the code. List conflicts, gaps and
  anything it would break; ask, don't guess. Build only on the user's go.
- Measure nothing from images: sizes, gaps and colours must be numbers in the brief or the Design System.
- One session per workstream (for example the League phone pass: Home vs Away, Points, Spider). Each build still
  gets its own branch (see Branches below) and its own pull request; start a build only after the previous one is
  merged. Start a fresh session for a new workstream, or when the session gets long.
- Branches: the first build in a session uses the session's assigned branch; each later build in the same session
  makes a new branch from an up-to-date main, named `claude/v51-xx-<short-name>`. If the session can't push a new
  branch, stop and tell the user to start a fresh session. Never build on a merged branch. Pull request title: from
  the brief.
- Report back in the pull request description (section 8 of the template). Every time a pull request is opened,
  give the user its link. The user gives the design chat the pull request link; it reads the description there.
- The pull request description always carries its Netlify preview link,
  `https://deploy-preview-<PR number>--gslcanvas1.netlify.app`.
- Where a brief and this file conflict, ask.

## Code rules

- No typed-in counts: seasons, clubs, divisions, matchdays come from the data.
- Never write a club name into code; the managed club comes from the sheet (`ownClubInfo()`, ✦ marker).
  Every page must render an empty save.
- Shared patterns go in ui.js; keep existing callers' behaviour and bump the UI version.
- Hooks before early returns; no components defined inside components when they hold inputs.
- `useScreen()` or Tailwind prefixes for screen size, never `window.innerWidth`; touch via `pointerType`.
- Hover cards never keep their own touch logic: every card uses the shared ui.js helpers (`useHoverCard`,
  `HoverProvider` / `useHover`, `useTouchCard`). On touch a card opens on a tap, switches on another tap, and closes
  on a tap anywhere else or on scroll; only one overlay (hover card, [i], sheet) is open at a time.
- Any chip or switch row that scrolls sideways uses ui.js `ScrollRow` (its edge fades where more is hidden; set
  `surface` to the card or page behind it); no plain `overflow-x-auto` rows. Wide tables (ledgers) are exempt.
- Flags are always drawn vectors (ui.js `Flag`, or `SvgFlag` inside charts), never emoji text, anywhere in the canvas.
- Text floor 11px (SVG too); the small-text baseline may never rise. R10 match order: flag, club, result chip, score. R11: tables sort by headers.
  R12: "us" cards get a top accent strip, "them" cards a left strip.

## Checks before every pull request

Run with the kit in test/ (commands in test/README.md). `npm run check` runs, and must pass:
- Syntax and compile; the **rules check** (`rules.js`: `window.innerWidth` / `innerHeight`, `(hover: none)`, club names
  or codes in code, `useState('<club code>')`, typed-in counts, plain `overflow-x-auto` rows); the **lint baseline**
  (`lint.js`: ESLint findings per file may not rise; lower `lint-baseline.json` when they fall); a full render of every
  page and tab (phone 390 and desktop 1440) with the **small-text baseline** (text under 11px per page and tab,
  `baseline.json`, may not rise); and the **empty-save check** (`empty.js`: every page and tab on an empty and a
  headers-only workbook, no React error, no "NaN", "undefined", "null" or club name on screen).
- Exceptions to the rules check and the empty-save check go only through `test/rules-allow.json`, each with its file,
  rule, kind and a reason. Kinds: where a rule is implemented, page debt (Cups, Pyramid, Squad: counts that only go
  down), not a club (same letters), wide table, standards review. A new kind or entry is agreed with the user first.

Then browser checks of the interactions touched (click, hover, touch), dark mode, no sideways overflow at phone width,
and the touch tap test (`npm run tap`, details in test/README.md): every hover target tapped at 390 must open, switch,
and close on a blank tap and on scroll.
- Full sweep (every target) on the tabs the build changes: `npm run tap -- --full <tabs>`.
- Full sweep on every tab whenever ui.js's hover or touch code changes: `npm run tap:full`.
- A sample (first, middle and last target of each chart) on every other tab, every build, as the regression check:
  any tab not named in `--full` (`npm run tap -- --sample` samples every tab).
- The test polls instead of waiting fixed times, every run keeps a hard timeout, and nothing is left running in
  the background.
