# Canvas v51.xx: <short name>

<!-- One brief per build. Written by the design chat as a claude.ai doc. The user starts a fresh Code session with
     the doc link (or the pasted text); Code saves a copy as briefs/v51.xx.md on the build branch.
     Code can read claude.ai docs and the Design System but changes nothing there. Mock images the user attaches
     are saved to briefs/img/. The repo is public: no names or personal screenshots. -->

- **Date:** YYYY-MM-DD
- **Goal (one line):** …
- **Branch:** the first build in a session uses the session's assigned branch; each later build in the same session
  makes a new branch from an up-to-date main, named `claude/v51-xx-<short-name>` (if the session can't push one, Code
  stops and asks for a fresh session). Never a merged branch.
- **Pull request title:** `Canvas v51.xx: <short name>`

## 1. Context

Two or three sentences: why this build exists, and what the user should see afterwards.

## 2. Scope

- Pages and tabs touched: …
- Screen sizes: desktop 1440 · tablet 810 / 1080 · phone 390 (say which apply)

## 3. What to build

Numbered items. Exact behaviour, sizes, colours and wording as locked. Numbers, not adjectives.
Each item names its mock image and the design-file page it came from (for the record).

1. **<item>** — … (mock: `briefs/img/v51.xx-1.png`; design file page: "…")
2. …

## 4. Rules that apply

One line each, written out (Code reads CLAUDE.md too, but restate what this build depends on).

- R10 · Match order: flag → club → result chip → score; leave things out, never reorder.
- …
- Any locked spec this build relies on (e.g. the Spider pillar scales), written out in full.

## 5. Must not change

Everything that already works and must still work exactly the same afterwards. List features, hovers,
toggles, filters, columns, drawers, sorting, empty states.

- …

## 6. Checks before the pull request

- Test kit: syntax, full render (every page × tab at 390 and 1440), CSS, browser bundle.
- Named interaction checks, e.g. "drag across the Points race at 390: the card docks at the bottom and stays after lifting".
- Dark mode on every tab touched; no sideways overflow at 390 (`ow.js`).

## 7. Updates in the repo

- Each changed file: version bump, header date, changelog entry at the top (newest first).
- App.js: `VERSION_TAG` and `PUBLISHED`.
- CLAUDE.md: only if a rule or convention changed in this build.

## 8. Report back (the pull request description)

The pull request description is the report: what's in · anything beyond this brief and why · checks run and
their results · the Netlify preview link (`https://deploy-preview-<PR number>--gslcanvas1.netlify.app`) · known gaps. Code gives the user the pull request link; the user passes the link to the design chat,
which reads the description there and logs it.
