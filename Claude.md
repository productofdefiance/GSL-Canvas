# GSL Canvas

A React dashboard that tells the story of Anish's EA FC25 career save (the GSL universe).
Owner: Anish (creative director, no coding background). Footer on every screen: "Developed by Anish & Claude".

**Read first:** the living handoff, https://claude.ai/code/artifact/cbb051f0-7e60-42d2-a83c-b0d8d7951145
(current state, rules R1–R13, conventions, open items, how Anish works). Keep it current as you work.

## Project layout

Standard React layout (StackBlitz's file panel shows it as one flat list, but these are the real folders):

| Path | What it is |
| --- | --- |
| package.json | Project settings |
| public/index.html | Tailwind CDN, Google Fonts, colour variables, division and dark-mode CSS |
| src/App.js | Shell: Top Bar, page switching, dark-mode switch, footer, `VERSION_TAG` / `PUBLISHED` |
| src/ui.js | Shared layer: controls, Highlights bar, hover provider, flags, `useSort`, `ownClubInfo`, club colours |
| src/League.js + src/LeagueTabs.js | League page shell + its redesigned tabs (convention C1) |
| src/Cups.js, src/CupsLab.js, src/Pyramid.js, src/Squad.js | Other pages |
| src/index.js, src/sheetData.js, src/style.css | Entry point; the exported workbook data; leftover stylesheet |
| test/ | Test kit (see test/README.md; written for a flat src/ with index.html beside it: adapt to read public/index.html) |
| CLAUDE.md | This file |

Any restructure is one deliberate step, agreed with Anish, checked in StackBlitz (his preview), then recorded
here and in the living handoff.

Libraries: React, d3, lucide-react only. Ask before adding anything.

## How work runs

- Nothing is built until Anish says so. Stress-test ideas first; push back plainly; no empty praise.
- Before replacing a component, list everything it does; check each item after the build.
- One branch and one pull request per build, titled with the canvas version (e.g. "Canvas v52.01: …").
- Every build bumps the canvas version in App.js (`VERSION_TAG`, `PUBLISHED`) and each changed file's own
  version, with a header and a changelog entry at the top of the file, newest first.
- The pull request description is the build message: what's in, what changed beyond the notes and why,
  checks run, known gaps.
- Ask before changing any convention (file structure, delivery, naming).

## Code rules

- No typed-in counts: seasons, clubs, divisions, matchdays come from the data.
- Never write a club name into code; the managed club comes from the sheet (`ownClubInfo()`, ✦ marker).
  Every page must render an empty save.
- Shared patterns go in ui.js; keep existing callers' behaviour and bump the UI version.
- Hooks before early returns; no components defined inside components when they hold inputs.
- `useScreen()` or Tailwind prefixes for screen size, never `window.innerWidth`; touch via `pointerType`.
- Text floor 11px (SVG too). R10 match order: flag, club, result chip, score. R11: tables sort by headers.
  R12: "us" cards get a top accent strip, "them" cards a left strip.

## Checks before every pull request

Syntax, a full render of every page and tab (phone 390 and desktop 1440), browser checks of the
interactions touched (click, hover, touch), dark mode, and no sideways overflow at phone width.
