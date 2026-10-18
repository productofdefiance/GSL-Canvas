# Flags

Review layer 1 (from Canvas v51.25): everything Code, the design chat, the user or an eval notices that isn't fixed in
the build where it was found. Kept by Code. Newest first. The design chat's flags arrive in a brief's "Carry-over flags"
section and Code copies them in; every pull request lists the flags it opened, closed or touched.

Each entry: number and title · raised by (Code / design chat / the user / eval) · date · status (open, fixed, accepted,
rolled back) · where it was resolved (pull request or version). The repo is public: no secrets or personal details.

---

### F18 · League Spider, phone, Safari engine: a ResizeObserver loop
- **Raised by:** Code (v51.25 Safari engine check) · **Date:** 2026-10-18 · **Status:** open
- At 390 in WebKit, League → Spider reports "ResizeObserver loop completed with undelivered notifications": a
  size-watcher there changes the size it watches within one frame. Nothing visible breaks and Chromium doesn't report
  it. webkit.js prints these as notes, not failures, so each new one is seen; this flag stays open until the loop is
  traced (likely a ScrollRow or useKeepInView observer on the phone layout).

### F17 · Pyramid Progression, desktop: a long name runs into its change figure
- **Raised by:** Code (v51.25 future-save check) · **Date:** 2026-10-18 · **Status:** open
- In the ranked list to the right of the chart (1440), "WOLVERHAMPTON W…" overlaps its change figure ("+16"). Seen
  with the future save's full names ("WOLVERHAMPTON WANDERERS FC"); today's short names fit.

### F16 · Pyramid Progression, phone: season labels run together after S9
- **Raised by:** Code (v51.25 future-save check) · **Date:** 2026-10-18 · **Status:** open
- With 14 completed seasons at 390, the labels above and below the chart touch: "S9S10S11S12S13S14".

### F15 · Home vs Away Venue swing, phone: 15 seasons crowd the columns
- **Raised by:** Code (v51.25 future-save check) · **Date:** 2026-10-18 · **Status:** open
- At 15 seasons each season column is about 23px wide at 390 and neighbouring labels touch ("S9S10"). Makes F4 worse
  as the save grows.

### F14 · The kit drew icons with a stand-in, not the real icon library
- **Raised by:** Code (v51.24) · **Date:** 2026-10-18 · **Status:** fixed · **Resolved:** Canvas v51.25
- The kit now uses the real lucide-react at the site's pinned version (compile.js fails if they differ).

### F13 · HighlightCard turns `text-white…` into `text-white-undefined`
- **Raised by:** Code (v51.23) · **Date:** 2026-10-18 · **Status:** open
- Not a class; the icon falls back to the inherited grey. Fixing it changes the screen, so it waits for a brief.

### F12 · Sideways rows without edge fades (standards review)
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- The Top Bar page links and the Matchdays season row scroll sideways without ScrollRow's edge fades.

### F11 · Two 1px leftovers from the doctype build
- **Raised by:** Code (v51.24) · **Date:** 2026-10-18 · **Status:** accepted · **Resolved:** Canvas v51.24
- The two "ESP" chips on Cups Finals sit up to 1px off their quirks-mode place; Cups Competitions' right column is 1px
  lower.

### F10 · 22 hook dependency warnings in the lint baseline
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- Listed (`node lint.js --list`), never checked one by one; adding a dependency changes when a calculation re-runs.

### F9 · StackBlitz may show branches unstyled since v51.23
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** accepted
- Tailwind is compiled by the build since v51.23; previews run on Netlify.

### F8 · Emoji as controls in Squad Interactions
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** accepted (exception)
- A vector redraw is preferred later, and the coming squad role system.

### F7 · Black or navy club colours vanish on the dark card
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- Spurs, Juventus, Leverkusen: the secondary-colour pass.

### F6 · "See in ledger" can't centre the last ledger rows
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** accepted

### F5 · Points heat-strip cells are about 5px wide
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** accepted
- Read by sliding.

### F4 · Venue swing season columns are under 44px wide on phones
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- About 35 × 260px at 390 with 8 seasons (ha_t's three known exceptions); decision pending. See F15.

### F3 · Home vs Away has two Points / Wins / Goals switches that don't follow each other
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- Venue swing and Venue ledger each keep their own; decision pending.

### F2 · "Best record" and "Toughest opponent" break ties silently
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- By goal difference, without saying so.

### F1 · Opponents "Most played" names one club when 14 tie
- **Raised by:** design chat · **Date:** 2026-10-17/18 · **Status:** open
- "Most played: Arsenal" while 14 clubs share 10 games; the tie is broken alphabetically, silently (League.js,
  Opponents highlights). Design decision pending. The golden check tests the count (10 games, 14 clubs), not the label.
