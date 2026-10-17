/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — Squad.js
 *  Version:  Squad v32
 *  Date:     2026-10-17, 20:00 UTC
 *  Reads the "Squad" tab (passed in by App.js).
 * ════════════════════════════════════════════════════════════════════
 *
 *  CHANGELOG (newest first)
 *
 *  Squad v32 — 2026-10-17, 20:00 UTC — Canvas v51.19 (touch hover cards)
 *   - Growth by age: the touch scrub ends through ui.js's useTouchCard: a
 *     finished tap anywhere else (iPhone sends no click for blank space), a
 *     scroll, or another card or [i] opening. It used to wait for a click.
 *
 *  Squad v31 — 2026-10-06, 21:00 UTC — Canvas v51.06
 *   - Accent: maroon becomes violet (#7c3aed), the same for every club (v51 palette).
 *
 *  Squad v30 — 2026-10-04, 23:30 UTC — Canvas v51.01 (design tokens, step 1)
 *   - SQUAD_ACCENT now comes from ui.js (ACCENT_HEX.maroon). Same colour.
 *
 *  Squad v29 — 2026-10-04, 01:30 UTC — Canvas v50.12
 *   - Phones: 4-2-3-1 (CDMs side by side) and 4-4-2 (STs side by side)
 *     layouts; all seven formations clear of overlaps on a 390px phone.
 *   - Depth Chart: alt positions removed on every screen.
 *   - Potential: the bar's cell is at least 180px on phones.
 *   - Heatmap: season headers as numbers; season squares as wide as Now.
 *   - Squad By Season (phones, Value): numbers only, "$ M" in the title;
 *     columns may shrink so the page never widens.
 *   - Growth By Age: Team filter at the top; Clear leaves no players
 *     selected; search in Pick players.
 *
 *  Squad v28 — 2026-10-04, 00:20 UTC — Canvas v50.11
 *   - Phones only: hand-set pitch layouts for 3-5-2, 4-2-2-2, 4-2-4 and
 *     5-2-3 (PHONE_LAYOUTS): pairs side by side, three-wide lines, defenders
 *     stepped as Anish set out; wide players at least 16% from the edge.
 *     Tablet and desktop unchanged. Other formations keep the automatic
 *     stagger.
 *
 *  Squad v27 — 2026-10-03, 21:40 UTC — Canvas v50.10
 *   - Pitch (phones): chips are the bench chip (same size and content, flag
 *     and initial); crowded lines stagger so no chip covers another.
 *   - Touch bar: name + OVR, then all positions, on the left; icons on the
 *     right: Bench (a drawn bench; greyed when full), Remove, Cancel
 *     (subdued). Pitch players get all three; bench players Remove + Cancel.
 *   - Depth Chart (phones): header reads "90.8 OVR · 22.8 yrs".
 *   - Growth By Age (option A): touch screens tap to scrub (nearest point;
 *     a bar above shows player, age, season and OVR, with view / pin / stop
 *     icons); Pick players list grouped by position. Mouse unchanged.
 *   - Squad By Season (was Squad OVR By Season): OVR / Age / Value / Number;
 *     bar height = the number shown (OVR from 50, Age from 15, Value and
 *     Number from 0); Legacy column first. Desktop: pins below the page
 *     header (its top half was hidden).
 *   - Sale Fee chart (phones): title on its own line, control on one row.
 *   - Former Players and Contracts ledgers: header pins under the Tab Bar.
 *
 *  Squad v26 — 2026-10-03, 06:53 UTC — Canvas v50.02 (fix)
 *   - Phones: pill rows (Contracts Team, Transfers Season, Former Players
 *     Left in, Roster Team, Development Season, Depth Chart Status) no
 *     longer widen the page. Their control groups may now shrink, so the
 *     pills scroll sideways inside the group instead.
 *
 *  Squad v25 — 2026-10-03, 06:41 UTC — Canvas v50.01 (mobile phase 2)
 *   Squad tab
 *   - Tap-to-swap on every screen: tap a player to select him, tap another
 *     player to swap or an empty spot to move him; a bar at the bottom of
 *     the screen offers To bench (or "Bench full") / Remove, and Cancel.
 *     Taps only select (no profile from this tab); mouse drag still works.
 *   - Phones: compact pitch cards (position, OVR, foot, surname), bench 3
 *     across, pool as one-line rows (position · OVR · flag · name · team ·
 *     role) in a shorter scroll box.
 *   Roster: table header stays under the page header; Pos / Player pinned
 *     on tablet and desktop only.
 *   Depth Chart (phones): narrow columns; alt positions under the name.
 *   Development: Growth By Age has no minimum width on phones and no end
 *     labels there (the tray names the lines); the Average label joins the
 *     overlap nudging. Heatmap and Growth By Age cards carry "Open profile"
 *     / "Show in colour" buttons on touch.
 *   Contracts: boards put position · age under the name on phones;
 *     expiry rows scroll sideways inside each year on phones; Fair Wage
 *     draws at real size, scrubs by OVR on touch, "Open profile" on cards.
 *   Transfers: Income & Spending on phones as sideways bars, one row per
 *     season, net at the end; Signed From / Sold To stack count and fee.
 *   Former Players: How They Left keeps How, Players (bar) and Share only;
 *     Sale Fee scatter at real size, scrub by its x axis, "Open profile".
 *   Profile: opens as a Sheet (full screen on phones); positions below the
 *     name and a smaller OVR box on phones; chart has no minimum width,
 *     hides bar labels when bars are narrow, start label above its dot;
 *     Vs Other strip scrubs on touch.
 *
 *  Squad v24 — 2026-10-03, 05:34 UTC — Canvas v50 (mobile foundation)
 *   - Hover card now comes from ui.js (same look on desktop; tap support
 *     on touch screens). Growth By Age and the profile chart measure their
 *     box with ui.js's useWidth.
 *
 *  Squad v23 — 2026-10-03, 03:42 UTC — Canvas v49.5 (edits, player profile)
 *   - Transfers moved under Contracts: In (Joined, From, Fee) on the left,
 *     Out (Left, To, Fee, P/L) on the right; players still here read
 *     "Still at the club · Contract to 2036". Joined is back in Transfers.
 *   - Injury History placeholder under Interactions (space held).
 *   - Squad order back to one line ("1st of 7").
 *   - Vs other players: one dot per OVR; its hover lists everyone at that
 *     OVR, name and OVR on one line (former marked). His own dot keeps
 *     the fuller card.
 *
 *  Squad v22 — 2026-10-03, 03:21 UTC — Canvas v49.4 (edits, player profile)
 *   - Highlights: plain white / grey bubbles (the dark bar stays on the
 *     main tabs). Team bubble has no byline (squad order lives in Squad).
 *   - Squad section: positions, Joined, Tenure, playstyles and the full
 *     squad order at his position (him highlighted). Joined and tenure
 *     moved here from Transfers.
 *   - Development: per-season change numbers above the Growth bar.
 *     "Vs other CBs" (his position) replaces Ahead of the Curve: current
 *     players at their OVR now, former at their last OVR here (faded);
 *     the average is current players only; hidden under 2 current peers.
 *   - Interactions above Transfers; value for money removed from the
 *     profile's Contracts section.
 *
 *  Squad v21 — 2026-10-03, 02:43 UTC — Canvas v49.3 (edits)
 *   Overall
 *   - Zero reads "$0 M"; zeros in table columns are light grey.
 *   - Axis ticks drop decimals when every tick is whole ($0 / $50 / $100 M).
 *   - Section titles: every word capitalised.
 *   - Per appearance and per goal + assist in $ M ($ K = weekly wages only).
 *   - Hover cards use the dark-card scale C (vivid) for good.
 *   - "Start of the save" is "Legacy" everywhere.
 *   Development
 *   - Heatmap back to one column, a little more space after Age, and a
 *     "Squad OVR By Season" chart beside it (everyone at the club each
 *     season by OVR band; average OVR on top; Now = today's squad).
 *   Contracts
 *   - Contract expiry schedule: year blocks wrap onto rows so names fit.
 *   Transfers
 *   - Income & Spending hover: net next to the season, at title size;
 *     summer / winter / biggest deals lighter than the totals.
 *   Former Players
 *   - Ledger: To is blank for players not renewed or retired.
 *   - How They Left: a compact table (players with share bar, share, fees,
 *     average age when they left, average seasons); lighter colours.
 *   - Departures By Season: lighter colours; bars use the full card height.
 *   Player profile
 *   - Header: position chip beside the name; OVR box only.
 *   - Highlights bar: Age (joined at), Foot, Team (rank at position), Role,
 *     Potential (above / to go).
 *   - Chart: drawn at real size; value inside each bar, % change between
 *     bars, no red outline; OVR above its point; ▲▼ smaller and lighter;
 *     potential label at the left; start point labelled "Joined 82".
 *   - Sections: Squad (positions, rank at position, playstyles) | Stats
 *     (career and last season) | Development (growth, potential, Ahead of
 *     the Curve), then Contracts across two columns | Transfers +
 *     Interactions. Squad rank line and "Value since joining" removed.
 *   Labs
 *   - Hover-colour experiment removed; the tab stays, empty.
 *
 *  Squad v20 — 2026-10-02, 23:45 UTC — Canvas v49.2 (edits)
 *   Money format (everywhere in Squad)
 *   - Always "$X M"; size sets the decimals: under $1 M 3, $1–10 M 2,
 *     $10–999 M 1, $1,000 M+ none (sign ignored). Weekly wages stay in $ K
 *     with the same bands; annual and total wages in $ M.
 *   - Sets read together (axes, bar labels, boards, hover splits, cost →
 *     sale pairs, highlight strips) take the largest number's decimals.
 *   - Table columns keep each number's decimals, padded with fixed-width
 *     spaces so decimal points line up.
 *   - Zero guard: a non-zero number never shows as $0.
 *   - Money axes use round ticks (fair-wage chart, sale-fee scatter,
 *     profile chart).
 *   Hover cards
 *   - OVR and potential in a dark-background OVR scale; gains green,
 *     losses red. Four scales (A sheet, B tints, C vivid, D soft); B is the
 *     default; Labs switches all Squad hover cards for the session.
 *   - Card 300px wide; labels never wrap.
 *   Squad tab
 *   - Bylines: "Best player: Name OVR" and "Youngest player: Name, age".
 *   - Lineup summary sits next to the Squad header; drag hint removed.
 *   - Tiles: 4th and 5th positions on a second line; past 5, "…".
 *   Depth Chart
 *   - Header numbers sit over the OVR and Age columns (no "Avg" words).
 *   - More space between main and alt positions; flag + name moved right
 *     (foot column unchanged).
 *   - Loan icon rule: where ❶ ❷ ❸ are icons, loan is the → icon.
 *   Development
 *   - Growth hover: goalkeepers show clean sheets in place of goals.
 *   - Biggest value rise byline: "$17.0 M → $261.0 M".
 *   - "OVR heatmap" is "Heatmap": current age column; groups in two
 *     side-by-side columns (one when seasons outgrow the width).
 *   - Growth by age rebuilt: real pixel size, grey lines, 5 in colour with
 *     name + OVR end labels (top OVR by default, click to pick), average
 *     line, faint former players, tray with unpin / Clear.
 *   Contracts
 *   - Fair-wage hover: role on the name line; "Year signed" (year joined
 *     for now).
 *   Transfers
 *   - Income & Spending hover: summer and winter on their own lines. A
 *     season after the last full one reads "S8 (so far)".
 *   Club tags
 *   - League code as plain grey text (no box).
 *   Labs (new tab)
 *   - Dark-card scale swatches with contrast numbers, a dummy chart, and
 *     "Use in all hover cards".
 *
 *  Squad v19 — 2026-10-02, 04:20 UTC — Canvas v49.1 (edits + design pass)
 *   - Design pass: one hover card for every chart and bar (replaces the
 *     browser tooltip); nothing under 11px; role as coloured text and the
 *     development tag as plain text in dense tables (chips stay on tiles,
 *     boards and the profile).
 *   - Position order everywhere: GK, LB, CB, RB, CDM, LM, CM, RM, CAM, LW,
 *     RW, ST.
 *   - Squad tab: "Lineup cohesion" with "# in alt position · # out of
 *     position"; no SUB tag on bench tiles; tiles 20% wider; 5-2-3 uses LB
 *     and RB.
 *   - Roster: averages row leaves Apps blank; position filter GK / DEF /
 *     MID / ATT.
 *   - Depth Chart: header bar per position (average OVR, average age,
 *     players); roomier columns, foot / OVR / age closer to the name.
 *   - Development: Growth gets the Potential sorts and Show filter, a
 *     Seasons column and Best season; season hover cards (season + years,
 *     age, change, stats); Potential gets a Growth column and more room
 *     before the tag.
 *   - Contracts: one-line leaderboard rows with OVR in its own column;
 *     hover cards on fair wage, wage bill and value at risk (taller);
 *     "Contract expiry schedule" with wider columns, year dividers and a
 *     cumulative Years left filter.
 *   - Transfers: hover card on Income & Spending; profit boards show cost →
 *     sale under the profit; one season filter for both ledgers.
 *   - Former Players: Role column removed; How they left, Departures by
 *     season and Sale fee scatter (vs OVR / value / age at sale).
 *
 *  Squad v18 — 2026-10-02, 01:41 UTC — Canvas v49, part 2 of 2
 *   - Development rebuilt: Growth (segmented bar, one segment per season,
 *     green / red / grey; season selector), Potential (bar: growth, room,
 *     beyond potential; signed remaining; sorts and filters), Value growth,
 *     OVR heatmap (by position or team), Growth by age (position and route
 *     filters, former players toggle), Teams (comparison table + squad
 *     strength, static for now). The age curve is gone.
 *   - Contracts (new tab): top valuations and top total costs; fair-wage
 *     scatter; wage bill breakdown (team, position); value at risk by
 *     contract end; the expiry schedule (moved from Transfers); a contracts
 *     database with cost vs OVR, vs value (colour key vs the squad median),
 *     per appearance (+ index), per goal + assist / clean sheet, and a
 *     value-for-money score.
 *   - Transfers (was "Transfers & Money"): Transfer Income & Spending
 *     (hover: summer / winter split, biggest deals); four top-5
 *     leaderboards; top clubs (by players or fees); Transfers In and Out
 *     side by side (season + window, figures at the time, club, type, fee;
 *     type / sell-on / terms await New Squad); sorts and name search.
 *   - Former Players rebuilt on the Roster's layout: how and when he left,
 *     both transfers, career stats, P/L; sticky header.
 *   - Player profile rebuilt: centred pop-up with a header (OVR, potential,
 *     remaining), one combined chart (OVR line, potential, value bars, age
 *     per season) and a snapshot from each tab.
 *
 *  Squad v17 — 2026-10-02, 01:01 UTC — Canvas v49, part 1 of 2
 *   - Data from GSL_R3_Offline_v7; club directory from the "GSL Clubs" tab
 *     (Pyramid as fallback): flag, short name in capitals, league code.
 *   - Everywhere: money as "$4,055.0 M", weekly wages "$55.0 K" (header
 *     says /wk); "❶ First / ❷ Second / ❸ Reserves"; "Available /
 *     Everyone"; role colours (IMP blue, ROT grey + black, SPO grey + dark
 *     grey, PRO light grey); source icons 🎓 academy, 🖊️ free agent,
 *     📜 start of the save.
 *   - Squad tab: settings survive switching tabs; bench (7 / 9 switch,
 *     auto-filled from the same pool, drag in / out / between); team sheets
 *     (save the lineup with a name, load, delete; up to 5; session only;
 *     a 9-sub sheet flips the switch to 9); Lineup Cohesion replaces "Out
 *     of position"; GK / DEF / MID / ATT filter on the tiles.
 *   - Roster: Career stats by default; age filter; source breakdown (academy
 *     / bought / free / start of the save, with value now); sticky header
 *     and first columns; averages row; contract warning (1 year or less);
 *     potential in OVR colours; club or source in "From".
 *   - Depth Chart: order team → OVR → role → age (older first); columns
 *     position (+alt), flag + name, foot, OVR, age, role, team.
 *
 *  Squad v16 — 2026-09-28, 16:08 UTC — Interactions (test version)
 *   - New Interactions tab (phone-first): every current player (position,
 *     flag, name, team), a green row and a red row of 🪷 🤝 📣 🤬 👏; tap
 *     to light one up, tap again to turn it off; no maximum, no locking;
 *     "last updated" date stamped on change; team filter and search.
 *   - Roster's Pos / Neg columns show the lit emoji (green / red), with
 *     the date on hover.
 *   - Test version: kept for the session only; saving to the sheet comes
 *     with the next Sheets build.
 *
 *  Squad v15 — 2026-09-28, 15:34 UTC — Roster groups, OVR colours
 *   - OVR (not "rating") everywhere, coloured with the sheet's scale: red
 *     40s, orange 50s, yellow 60s, dark green 70s, green 80s, bright green
 *     90-94, blue 95+.
 *   - Roster: group header row (Details, Attributes, Contract, Stats,
 *     Interactions, Transfer, Tenure) with short column labels; columns
 *     spread across the full width. Details: Pos, Player, Ft, Sq (status
 *     icon). Contract: Role, Value, Wage, Yrs rem. Interactions: Pos / Neg
 *     (placeholders until the Interactions page exists). Transfer (in):
 *     season + year, from (flag, short name, league for Pyramid clubs;
 *     academy / free agent / start of the save), fee ($0.0 M for academy
 *     and free agents). Tenure: Yrs, OVR ±, Value ±.
 *   - Reads the Pyramid tab too, for the clubs players came from.
 *
 *  Squad v14 — 2026-09-28, 14:13 UTC — Roster redesign
 *   - Columns grouped (who | now | style | money | stats | tenure) with
 *     faint dividers; columns fit their content, spare width sits before
 *     the money group; more room between main and alternative positions.
 *   - Status: icon + word (❶ First, ❷ Second, ❸ Reserves, → On loan,
 *     ← Loaned in).
 *   - Rating, +/- and Potential narrower and closer; development type sits
 *     beside the potential. With no potential in the sheet, a growth type
 *     implies its top end (PTBS 94, AEP 89, SGP 84), shown in grey
 *     italics; this also feeds Development's "Room to grow".
 *   - Playstyles as ◆ marks.
 *   - Value always one decimal with a space ("$130.0 M") so it lines up.
 *   - New tenure group: seasons at the club, rating since joining (the
 *     sheet's Tenure +/-), value since joining (from value at signing, or
 *     at the end of his first season when that isn't recorded); sortable.
 *
 *  Squad v13 — 2026-09-28, 03:39 UTC — Squad tab controls
 *   - Position-colour key removed; more space between the control groups.
 *
 *  Squad v12 — 2026-09-28, 03:29 UTC — Blank lineup, age filter, one pool
 *   - Lineup: new "Blank" (every position empty; drag players in).
 *   - Age: All / U23 / U21 / U19 (under N = younger than N).
 *   - Players: "Available" / "Everyone" (was Not on loan / Include on loan).
 *   - Lineup, Age and Players now set one pool used by both the pitch and
 *     the tiles (the tiles' own team filter is gone). Changing any of them
 *     starts the lineup fresh.
 *
 *  Squad v11 — 2026-09-28, 03:19 UTC — Foot on the pitch, on-loan option
 *   - Foot shown as L / R on tiles, and on pitch cards (top-right, in
 *     place of the team number).
 *   - "Players: Not on loan / Include on loan" (off by default, like the
 *     Depth Chart): when on, loan players appear as tiles (with an On loan
 *     filter), can be dragged onto the pitch and can be picked for the
 *     Best XI. Switching starts the lineup fresh.
 *
 *  Squad v10 — 2026-09-28, 03:06 UTC — Smarter lineups, tiles with foot
 *   - Lineups are chosen as a whole (best total fit, Hungarian method)
 *     instead of one slot at a time: main position > alternative > close
 *     fit; a player from the wrong area is heavily penalised; keepers and
 *     outfield players never swap (the slot stays empty instead).
 *   - Tiles: all positions top-left (main first, the one he's playing
 *     underlined), rating middle, team right; flag + name; foot, age and
 *     role along the bottom. No hover text on the short roles.
 *
 *  Squad v9 — 2026-09-28, 02:58 UTC — Short squad roles
 *   - Squad roles have 3-letter forms (CRU, IMP, ROT, SPO, PRO) for tight
 *     spaces; the sidebar tiles use them (full name on hover).
 *
 *  Squad v8 — 2026-09-28, 02:25 UTC — Formations
 *   - 3-5-2: the wing-backs are now LM and RM.
 *   - New: 4-2-2-2, 4-2-4 and 5-2-3 (seven formations in all).
 *
 *  Squad v7 — 2026-09-28, 02:20 UTC — Sidebar tiles
 *   - Top-left is blank for players not on the pitch (their main position
 *     is already shown bottom-left).
 *
 *  Squad v6 — 2026-09-28, 02:17 UTC — Sidebar tile tweaks
 *   - Top-left shows the position he's playing on the pitch (coloured by
 *     fit), or his main position if he isn't on the pitch; the label on
 *     the tile's edge is gone (it was cut off). Outline kept.
 *   - Bottom-left: main position, then alternative positions.
 *   - Bottom-right: age and squad role (Crucial, Important, Rotation,
 *     Sporadic, Prospect) instead of the development type.
 *
 *  Squad v5 — 2026-09-28, 02:05 UTC — Squad sidebar as tiles
 *   - The squad beside the pitch is now tiles, like the pitch cards with a
 *     bit more: position, rating, team number; flag + name; alternative
 *     positions, age and development type. Players on the pitch get a
 *     maroon outline and their slot. Tiles fill the column (as many per
 *     row as fit) and still drag onto the pitch.
 *   - All flags are drawn (13 more countries in ui.js).
 *
 *  Squad v4 — 2026-09-28, 01:53 UTC — Transfers & Money, Former Players (part 3 of 3)
 *   - Controls: every label sits above its control (consistent alignment).
 *   - Squad tab: list beside the pitch, wider and as tall as the pitch;
 *     on-loan players removed from it (they stay in Roster); Reset always
 *     shown (greyed until you change the lineup).
 *   - Depth Chart: main positions only, grouped Attack (LW/LM, ST, RW/RM),
 *     Midfield (CAM, CM, CDM), Defence (LB, CB, RB), Goalkeeper.
 *   - Development: "All time" (start of his first season at the club to
 *     the end of his latest), now the default, plus each season.
 *   - Transfers & Money (new): spent / received / net / wage bill; money
 *     per season; best sales and sales at a loss; contracts by expiry
 *     year; full transfer ledger (arrivals and sales, by season, by fee).
 *   - Former Players (new): directory of every former player, filter by
 *     season left and how they left, search, sort; fee, joined, seasons
 *     at the club, rating then and at departure, apps, profit.
 *
 *  Squad v3 — 2026-09-28, 01:37 UTC — Pitch: presets, drag and drop, new cards
 *   - Pitch lines back on the green gradient.
 *   - Bigger cards: position top-left (coloured by fit), rating top-middle
 *     (bigger), team number top-right, flag + name underneath.
 *   - Lineup presets: Best XI, Team 1, Team 2, Team 3 (each picks from its
 *     own players; slots nobody fits get the best remaining player, shown
 *     out of position). Drag players from the list onto the pitch, swap slots
 *     by dragging, drag back to the list to empty a slot; "Custom lineup"
 *     with Reset. On-loan players can't be dragged in.
 *   - Slimmer squad list: position, alt, flag, name, rating, development
 *     type, team number; players on the pitch marked with a maroon edge.
 *
 *  Squad v2 — 2026-09-28, 01:23 UTC — Squad tab, Depth Chart, Development (part 2 of 3)
 *   - The Pitch tab is now "Squad": plain green-gradient pitch (no stripes
 *     or lines); new player cards (flag top-left, position top-centre
 *     coloured by fit, rating top-right, name in the middle); best XI from
 *     everyone not on loan ("Pick from" removed); the full squad listed on
 *     the right (All / Team 1 / 2 / 3 / On loan), players on the pitch
 *     first, marked with their position.
 *   - Depth Chart (new): every position laid out like a pitch, natural
 *     options then those who can cover, with Thin (under 2 natural) and
 *     Ageing (top two average 30+) warnings; on-loan players optional.
 *   - Development (new): Growth (rating change in a chosen season),
 *     Room to grow (potential minus rating, with development types), Age
 *     curve (age against rating, line up to potential).
 *
 *  Squad v1 — 2026-09-28, 00:26 UTC — First build (part 1 of 3)
 *   - Pitch: formation picker (4-3-3, 4-2-3-1, 3-5-2, 4-4-2); best XI
 *     picked automatically by rating for each position (main position
 *     first, then alternatives, then close fits); bench of the next best.
 *     Choose who's eligible (all available / first team / first + second).
 *     Striped grass pitch with thin markings.
 *   - Roster: the current squad, filterable by tier (❶ ❷ ❸, on loan,
 *     loaned in), position group and name; sortable columns; this season
 *     or career stats.
 *   - Player profile: identity, development type, playstyles, contract,
 *     rating and value season by season, stats, how he joined (and left).
 *   - Data: everything read by column labels (so new season blocks, e.g.
 *     S8, are picked up automatically). "As of the end of S7" comes from
 *     the data, not typed in.
 *   Coming next: Depth Chart, Development; then Transfers & Money, Former
 *   Players.
 * ════════════════════════════════════════════════════════════════════
 */
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Users, LayoutGrid, List, TrendingUp, Star, Clock, Calendar, Filter, Sparkles, X, ChevronLeft, ChevronRight, Shield, ArrowRight, ArrowLeft, FlaskConical, UserMinus, Eye, Pin, X as CloseIcon } from 'lucide-react';
import { PAGE_WIDTH, PageHeader, HighlightsBar, HighlightCard, Segmented, FilterPills, ControlLabel, ResetButton, SearchInput, Flag, SvgFlag, HoverProvider, useHover, useTouchCard, useWidth, useScreen, useScrub, Sheet, usePointerTrack, ACCENT_HEX } from './ui.js';

// ─── SETTINGS ────────────────────────────────────────────────────────
const SQUAD_ACCENT = ACCENT_HEX.maroon; // Squad's colour (to become the user's club colour, v51 F13)

// Tiers and statuses from the TAG column. Shown as ❶ ❷ ❸ on the page.
const TAGS = {
    '🥇': { key: 1, label: 'First', badge: '❶' },
    '🥈': { key: 2, label: 'Second', badge: '❷' },
    '🥉': { key: 3, label: 'Reserves', badge: '❸' },
    '➡️': { key: 'loan', label: 'On loan', badge: 'On loan' },
    '⬅️': { key: 'loanIn', label: 'Loaned in', badge: 'Loaned in' },
    '🙌': { key: 'retired', label: 'Retired', badge: 'Retired' },
    '🚫': { key: 'former', label: 'Former player', badge: 'Former' },
};
// Development types (column after POTENTIAL)
const DEV_TYPES = {
    OWB: { label: "One of the World's Best", note: 'OVR 90+', cls: 'bg-amber-50 text-amber-800 border-amber-300' },
    PTBS: { label: 'Potential To Be Special', note: 'Potential 90+', cls: 'bg-violet-50 text-violet-800 border-violet-300' },
    AEP: { label: 'An Exciting Prospect', note: 'Potential 85–90', cls: 'bg-sky-50 text-sky-800 border-sky-300' },
    SGP: { label: 'Showing Great Potential', note: 'Potential 80–85', cls: 'bg-cyan-50 text-cyan-800 border-cyan-300' },
    HTSS: { label: 'Has That Something Special', note: 'Plays better than his OVR', cls: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-300' },
    SET: { label: 'Set', note: 'OVR no longer grows fast', cls: 'bg-slate-50 text-slate-600 border-slate-300' },
};
// OVR colours, as in the sheet: red 40s, orange 50s, yellow 60s, dark green
// 70s, green 80s, bright green 90-94, blue 95+ (yellow darkened a touch so
// it stays readable on white). Used wherever an OVR is shown.
const OVR_BANDS = [[95, '#2f6fdb'], [90, '#15a04a'], [80, '#43a047'], [70, '#3d7a1e'], [60, '#d4a106'], [50, '#e8710a'], [0, '#d93025']];
// Dark-background OVR scale (hover cards): scale C "vivid", picked in v49.3.
// Same order as OVR_BANDS: 95+, 90–94, 80s, 70s, 60s, 50s, 40s. up/down = gains and losses.
const DARK_SCALE = { colors: ['#5b9dff', '#00e676', '#76d65a', '#b7e08a', '#ffd54f', '#ffa040', '#ff6e6e'], up: '#00e676', down: '#ff6e6e' };
const darkOvrColor = (v) => { if (v == null) return undefined; const i = OVR_BANDS.findIndex(([min]) => v >= min); return DARK_SCALE.colors[i < 0 ? DARK_SCALE.colors.length - 1 : i]; };
const ovrColor = (v) => { if (v == null) return undefined; for (const [min, c] of OVR_BANDS) if (v >= min) return c; return '#d93025'; };
// When the sheet has no potential, a growth type implies its top end.
// (SET, OWB and HTSS describe the current rating, not growth room.)
const IMPLIED_CAP = { PTBS: 94, AEP: 89, SGP: 84 };
const POS_ORDER = ['GK', 'LB', 'CB', 'RB', 'CDM', 'LM', 'CM', 'RM', 'CAM', 'LW', 'RW', 'ST', 'LWB', 'RWB', 'CF'];
const POS_GROUPS = {
    GK: ['GK'],
    DEF: ['RB', 'RWB', 'CB', 'LB', 'LWB'],
    MID: ['CDM', 'CM', 'CAM', 'RM', 'LM'],
    ATT: ['RW', 'LW', 'CF', 'ST'],
};
const groupOf = (pos) => Object.keys(POS_GROUPS).find(g => POS_GROUPS[g].includes(pos)) || 'MID';

// ─── READING THE SQUAD TAB ───────────────────────────────────────────
// Columns are found by their header labels (rows 1-2), so the reader
// survives new columns and new season blocks.
function parseSquad(data) {
    const empty = { current: [], former: [], seasons: [], lastSeason: null };
    if (!Array.isArray(data) || !data.length) return empty;
    const str = (v) => (v == null ? '' : String(v).trim());
    const num = (v) => (v !== null && v !== undefined && v !== '' && !isNaN(Number(v)) ? Number(v) : null);
    const h1i = data.findIndex(d => (d.row || []).some(c => str(c) === 'NAME'));
    if (h1i < 0) return empty;
    const h1 = data[h1i].row || [], h2 = (data[h1i + 1] || {}).row || [];
    const col1 = (label, nth = 1) => { let k = 0; for (let i = 0; i < h1.length; i++) if (str(h1[i]).replace(/\s+/g, ' ') === label && ++k === nth) return i; return -1; };
    const col2 = (label, from = 0, to = h2.length) => { for (let i = from; i < to; i++) if (str(h2[i]) === label) return i; return -1; };
    const C = {
        num: col1('#'), pos: col1('POS.'), alt: col1('ALT.'), flag: col1('🌍'), name: col1('NAME'), tag: col1('TAG'), foot: col1('FT'),
        age: col1('AGE'), ovr: col1('OVR'), pot: col1('POTENTIAL'), ps: col1('PS'), role: col1('ROLE'),
        value: col1('VALUE ($M)'), wage: col1('WEEKLY WAGE ($K)'), annual: col1('ANNUAL WAGE ($M)'), signBonus: col1('SIGNING BONUSES'),
        perfBonus: col1('PERF BONUSES'), totalWages: col1('TOTAL WAGES'), contract: col1('CONTRACT'), rem: col1('REM'),
        app: col1('APP', 1), careerApp: col1('APP', 2),
    };
    C.dev = C.pot + 1; // development type sits right after POTENTIAL (no label)
    const tIn = h1.findIndex(c => /TRANSFER IN/i.test(str(c)));
    const tOut = h1.findIndex(c => /TRANSFER OUT/i.test(str(c)));
    const atSign = h1.findIndex(c => /AT SIGNING/i.test(str(c)));
    const tenure = h1.findIndex(c => /TENURE/i.test(str(c)));
    // Season blocks: "S1", "S2"... in row 1; labels inside each block in row 2
    const blocks = [];
    h1.forEach((c, i) => { const m = str(c).match(/^S(\d+)$/); if (m) blocks.push({ s: Number(m[1]), col: i }); });
    blocks.forEach((b, k) => {
        const end = k + 1 < blocks.length ? blocks[k + 1].col : h2.length;
        const start = col2('START OVR', b.col, end);
        b.age = col2('AGE', b.col, end);
        b.start = start;
        b.change = start >= 0 ? col2('+ / -', start, end) : -1;
        b.end = col2('END OVR', b.col, end);
        b.app = col2('APP', b.col, end); b.g = col2('G', b.col, end); b.a = col2('A', b.col, end); b.cs = col2('CS', b.col, end);
        b.value = col2('VALUE', b.col, end);
        b.valueChange = b.value >= 0 ? col2('+ / -', b.value + 1, end) : -1;
        b.year = str(h1[b.col + 2]); // e.g. "2024 - 25"
    });
    const seasonYear = {}; blocks.forEach(b => { const m = b.year.match(/^(\d{4})/); if (m) seasonYear[b.s] = Number(m[1]); });
    const s1Year = seasonYear[1] || null;
    const seasonOfYearLabel = (label) => { const m = str(label).match(/^(\d{4})\s*-\s*\d{2}/); return m && s1Year ? Number(m[1]) - s1Year + 1 : null; };
    // Section boundaries
    const curIdx = data.findIndex(d => (d.row || []).some(c => str(c) === 'CURRENT SQUAD'));
    const formerIdx = data.findIndex(d => (d.row || []).some(c => str(c) === 'FORMER PLAYERS'));
    const toPlayer = (d, departedSeason) => {
        const r = d.row;
        const g = (i) => (i >= 0 ? r[i] : null);
        const tagInfo = TAGS[str(g(C.tag))] || null;
        const seasons = blocks.map(b => {
            const end = num(g(b.end)), start = num(g(b.start));
            if (end == null && start == null) return null;
            return {
                s: b.s, age: num(g(b.age)), start, end, change: num(g(b.change)) ?? (end != null && start != null ? end - start : null),
                value: num(g(b.value)), valueChange: num(g(b.valueChange)),
                app: num(g(b.app)), g: num(g(b.g)), a: num(g(b.a)), cs: num(g(b.cs)),
            };
        }).filter(x => x && (x.end || x.start));
        // Transfer years like 2024.5 are winter windows: same season as 2024
        const inYear = tIn >= 0 ? num(r[tIn]) : null;
        const outYear = tOut >= 0 ? num(r[tOut]) : null;
        return {
            id: d.index_, num: num(g(C.num)), pos: str(g(C.pos)), alt: str(g(C.alt)).split(',').map(x => x.trim()).filter(Boolean),
            flag: str(g(C.flag)), name: str(g(C.name)), tag: tagInfo, tier: tagInfo ? tagInfo.key : null, foot: str(g(C.foot)),
            age: num(g(C.age)), ovr: num(g(C.ovr)), potential: num(g(C.pot)), dev: str(g(C.dev)) || null, ps: num(g(C.ps)) || 0,
            role: str(g(C.role)), value: num(g(C.value)), wage: num(g(C.wage)), annualWage: num(g(C.annual)),
            signBonus: num(g(C.signBonus)), perfBonus: num(g(C.perfBonus)), totalWages: num(g(C.totalWages)),
            contract: num(g(C.contract)), rem: num(g(C.rem)),
            season: { app: num(g(C.app)), g: num(g(C.app + 1)), a: num(g(C.app + 2)), cs: num(g(C.app + 3)) },
            career: { app: num(g(C.careerApp)), g: num(g(C.careerApp + 1)), a: num(g(C.careerApp + 2)), cs: num(g(C.careerApp + 3)) },
            joined: { year: inYear, season: inYear && s1Year ? Math.floor(inYear - s1Year) + 1 : null, from: tIn >= 0 ? str(r[tIn + 1]) : '', fee: tIn >= 0 ? num(r[tIn + 2]) : null },
            left: outYear || (tOut >= 0 && str(r[tOut + 1])) ? { year: outYear, to: tOut >= 0 ? str(r[tOut + 1]) : '', fee: tOut >= 0 ? num(r[tOut + 2]) : null } : null,
            atSigning: atSign >= 0 ? { ovr: num(r[atSign]), value: num(r[atSign + 2]) } : null,
            tenure: tenure >= 0 ? { years: num(r[tenure]), ovrChange: num(r[tenure + 1]), pl: num(r[tenure + 2]) } : null,
            seasons,
            departedSeason: departedSeason || null,
        };
    };
    const withCap = (p) => {
        if (p.potential == null && IMPLIED_CAP[p.dev]) { p.potential = IMPLIED_CAP[p.dev]; p.potentialImplied = true; }
        return p;
    };
    const isPlayer = (d) => d.row && str(d.row[C.pos]) && str(d.row[C.name]) && str(d.row[C.name]) !== 'P. Name' && str(d.row[C.pos]) !== 'POS.';
    const current = [], former = [];
    let group = null;
    data.forEach((d, i) => {
        if (i <= h1i + 1 || !d.row) return;
        const label = str(d.row[C.alt]);
        if (formerIdx >= 0 && i > formerIdx && /^\d{4}\s*-\s*\d{2}$/.test(label)) { group = seasonOfYearLabel(label); return; }
        if (!isPlayer(d)) return;
        if (formerIdx >= 0 && i > formerIdx) former.push(withCap(toPlayer(d, group)));
        else if (curIdx >= 0 && i > curIdx) current.push(withCap(toPlayer(d, null)));
    });
    const seasons = blocks.map(b => b.s);
    // Latest season with data (e.g. S7 until the S8 block is filled in)
    const lastSeason = Math.max(0, ...current.flatMap(p => p.seasons.filter(x => x.end != null).map(x => x.s))) || null;
    return { current, former, seasons, lastSeason, s1Year };
}

// Hover card: HoverProvider / useHover now live in ui.js (UI v12), with tap support.

// ─── SHARED BITS ─────────────────────────────────────────────────────
// Money (v49.2): always "$X M"; the size sets the decimals: under $1 M → 3,
// $1–10 M → 2, $10–999 M → 1, $1,000 M and up → 0 (the sign is ignored).
// Weekly wages use the same bands in $ K ("$55.0 K", "$2,631 K").
//  - money(m): one number on its own (its own decimals)
//  - moneySet(values): numbers read together (axes, bar labels, boards,
//    hover splits, pairs, strips): the largest number sets the decimals
//  - moneyCol(values): table columns: each number keeps its own decimals,
//    padded with fixed-width spaces so the decimal points line up
//  - Zero guard: a non-zero number never shows as $0.
// Section titles: every word capitalised
const tcWords = (t) => String(t).replace(/(^|[\s(:/])([a-z])/g, (m, a, b) => a + b.toUpperCase());
const fmt1 = (x) => Number(x).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const numFmt = (x, d) => Number(x).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const bandDec = (a) => (a >= 1000 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3);
// Checked again after rounding, so 9.996 reads "10.0", not "10.00"
const ownDec = (x) => { const a = Math.abs(Number(x) || 0); if (a === 0) return 0; const d = bandDec(a); return Math.min(d, bandDec(Number(a.toFixed(d)))); };
const okNum = (m) => m != null && m !== '' && isFinite(m);
const unitFmt = (m, d, unit, signed, pad = '') => `${signed ? (m >= 0 ? '+' : '−') : m < 0 ? '−' : ''}$${numFmt(Math.abs(m), d)}${pad} ${unit}`;
const money = (m, signed = false) => (okNum(m) ? unitFmt(Number(m), ownDec(m), 'M', signed) : '–');
const money1 = money;
const signedMoney1 = (m) => (okNum(m) ? money(m, true) : '');
const wageTxt = (k) => (okNum(k) ? unitFmt(Number(k), ownDec(k), 'K', false) : '–'); // weekly; headers say /wk
const guardDec = (m, d) => (m !== 0 && Number(Math.abs(m).toFixed(d)) === 0 ? ownDec(m) : d);
const moneySet = (vals, unit = 'M') => {
    const xs = vals.filter(okNum).map(v => Math.abs(v));
    const d = xs.length ? ownDec(Math.max(...xs)) : 1;
    return (m, signed = false) => (okNum(m) ? unitFmt(Number(m), Number(m) === 0 ? 0 : guardDec(Number(m), d), unit, signed) : '–');
};
// Axis ticks: no decimals when every tick is a whole number ($0 / $50 / $100 M)
const tickFmt = (ticks, unit = 'M') => (ticks.every(t => Number.isInteger(t)) ? (m) => unitFmt(m, 0, unit, false) : moneySet(ticks, unit));
const FIG_SP = '\u2007', DOT_SP = '\u2008';
const moneyCol = (vals, unit = 'M') => {
    const maxD = Math.max(0, ...vals.filter(okNum).map(ownDec));
    return (m, signed = false) => {
        if (!okNum(m)) return '–';
        const d = ownDec(m);
        const txt = unitFmt(Number(m), d, unit, signed, (d === 0 && maxD > 0 ? DOT_SP : '') + FIG_SP.repeat(maxD - d));
        return Number(m) === 0 ? <span className="text-slate-400 font-normal">{txt}</span> : txt;
    };
};
// Round axis ticks from 0 to a round top, in steps of 1 / 2 / 2.5 / 5 x 10^k
const niceTicks = (hi, n = 4) => {
    const raw = Math.max(hi, 1e-9) / n, p = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map(k => k * p).find(x => x >= raw - 1e-12);
    const top = Math.ceil(hi / step - 1e-9) * step;
    return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => Number((i * step).toFixed(6)));
};
function TierBadge({ p, size = 'sm' }) {
    if (!p.tag) return null;
    const t = p.tag.key;
    if (t === 1 || t === 2 || t === 3) {
        const col = t === 1 ? SQUAD_ACCENT : t === 2 ? '#475569' : '#94a3b8';
        return <span className={`${size === 'lg' ? 'text-lg' : 'text-sm'} font-black leading-none`} style={{ color: col }} title={p.tag.label}>{p.tag.badge}</span>;
    }
    // Loan icon rule: where ❶ ❷ ❸ are icons, loan is the → icon too
    if (t === 'loan') return <span title="On loan" className="inline-flex"><ArrowRight className={`${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} text-sky-700`}/></span>;
    const cls = t === 'loanIn' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200';
    return <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${cls}`}>{p.tag.badge}</span>;
}
function DevChip({ code }) {
    const d = DEV_TYPES[code];
    if (!d) return null;
    return <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded border ${d.cls}`} title={`${d.label} (${d.note})`}>{code}</span>;
}
// Status as icon + word (Roster)
function StatusTag({ p }) {
    const t = p.tier;
    if (t === 1 || t === 2 || t === 3) {
        const col = t === 1 ? SQUAD_ACCENT : t === 2 ? '#475569' : '#94a3b8';
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap" style={{ color: col }}><span className="text-sm leading-none">{p.tag.badge}</span>{t === 1 ? 'First' : t === 2 ? 'Second' : 'Reserves'}</span>;
    }
    if (t === 'loan') return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 whitespace-nowrap"><ArrowRight className="w-3.5 h-3.5"/>On loan</span>;
    if (t === 'loanIn') return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 whitespace-nowrap"><ArrowLeft className="w-3.5 h-3.5"/>Loaned in</span>;
    return p.tag ? <span className="text-[11px] text-slate-500">{p.tag.label}</span> : null;
}
// Clubs from the Pyramid tab: flag, short name, league ("ESL")
// Club directory. "GSL Clubs" tab: league (M), flag (Q), abbreviation (S),
// short / medium / full name (T / U / V), EA team name (W). Falls back to
// the Pyramid tab's clubs (league "ESL") if the directory isn't there.
const clubKey = (x) => String(x || '').replace('✦', '').toUpperCase().replace(/[^A-Z0-9]/g, '');
function clubDirectory(gslRows, pyramidRows) {
    const out = {};
    const add = (c) => [c.abbr, c.short, c.medium, c.name, c.team].forEach(k => { const key = clubKey(k); if (key && !out[key]) out[key] = c; });
    const str = (v) => (v == null ? '' : String(v).trim());
    (gslRows || []).forEach(d => {
        const r = d.row || [];
        const c = { league: str(r[12]), flag: str(r[16]), abbr: str(r[18]), short: str(r[19]).replace('✦', '').trim(), medium: str(r[20]), name: str(r[21]), team: str(r[22]) };
        if (d.index_ >= 4 && c.abbr && c.short && c.flag) add(c);
    });
    (pyramidRows || []).forEach(d => {
        const r = d.row || [];
        const c = { league: 'ESL', flag: str(r[29]), abbr: str(r[30]).toUpperCase(), short: str(r[31]).replace('✦', '').trim(), medium: '', name: str(r[33]), team: '' };
        if (c.abbr && c.abbr.length <= 5 && c.short && c.flag) add(c);
    });
    return (club) => out[clubKey(club)] || null;
}
// Where a player came from when it isn't a club
const SPECIAL_SOURCES = { LEGACY: 'Legacy', 'YOUTH ACADEMY': 'Youth academy', 'FREE AGENT': 'Free agent' };
const SOURCE_ICON = { 'YOUTH ACADEMY': '🎓', 'FREE AGENT': '🖊️', LEGACY: '📜' };
const titleCase = (x) => String(x || '').toLowerCase().replace(/\b\w/g, ch => ch.toUpperCase());
// A club (flag, short name in bold capitals, league code) or a source (icon + words)
function ClubTag({ name, clubOf, compact = false }) {
    if (!name) return <span className="text-slate-300">–</span>;
    const key = String(name).trim().toUpperCase();
    if (SPECIAL_SOURCES[key]) return <span className="inline-flex items-center gap-1 text-slate-600 whitespace-nowrap"><span className="leading-none">{SOURCE_ICON[key]}</span>{compact ? null : SPECIAL_SOURCES[key]}</span>;
    const c = clubOf ? clubOf(name) : null;
    if (!c) return <span className="font-bold text-slate-800 uppercase whitespace-nowrap">{String(name).trim()}</span>;
    return <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Flag emoji={c.flag} size={16}/><span className="font-bold text-slate-800 uppercase">{c.short}</span>{c.league && <span className="text-[11px] font-semibold text-slate-400" title="EA FC league mapping">{c.league}</span>}</span>;
}
function StatusIcon({ p }) {
    const t = p.tier;
    if (t === 1 || t === 2 || t === 3) return <span className="text-sm font-black leading-none" style={{ color: t === 1 ? SQUAD_ACCENT : t === 2 ? '#475569' : '#94a3b8' }} title={p.tag.label}>{p.tag.badge}</span>;
    if (t === 'loan') return <span title="On loan"><ArrowRight className="w-4 h-4 text-sky-700"/></span>;
    if (t === 'loanIn') return <span title="Loaned in"><ArrowLeft className="w-4 h-4 text-emerald-700"/></span>;
    return null;
}
// Squad role (ROLE column) as a small chip
const ROLE_STYLE = {
    CRUCIAL: { label: 'Crucial', short: 'CRU', cls: 'bg-[#f5f3ff] text-[#7c3aed] border-[#f5c9d3]' },
    IMPORTANT: { label: 'Important', short: 'IMP', cls: 'bg-sky-50 text-sky-800 border-sky-200' },
    ROTATION: { label: 'Rotation', short: 'ROT', cls: 'bg-slate-100 text-slate-900 border-slate-300' },
    SPORADIC: { label: 'Sporadic', short: 'SPO', cls: 'bg-slate-100 text-slate-600 border-slate-200' },
    PROSPECT: { label: 'Prospect', short: 'PRO', cls: 'bg-slate-50 text-slate-400 border-slate-200' },
};
const ROLE_ORDER = ['CRUCIAL', 'IMPORTANT', 'ROTATION', 'SPORADIC', 'PROSPECT'];
// short: the 3-letter form (CRU, IMP, ROT, SPO, PRO) for tight spaces
function RoleChip({ role, short = false }) {
    const r = ROLE_STYLE[role];
    if (!r) return role ? <span className="text-[11px] text-slate-400">{role.charAt(0) + role.slice(1).toLowerCase()}</span> : null;
    return <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${r.cls}`}>{short ? r.short : r.label}</span>;
}
// Since joining: rating change from the sheet's Tenure block (or at-signing
// rating if present); value from at-signing value if present, else his value
// at the end of his first season at the club (the earliest recorded).
const ovrSinceJoining = (p) => (p.tenure && p.tenure.ovrChange != null ? p.tenure.ovrChange : p.atSigning && p.atSigning.ovr != null && p.ovr != null ? p.ovr - p.atSigning.ovr : null);
const baseValue = (p) => { if (p.atSigning && p.atSigning.value != null) return { v: p.atSigning.value, from: 'at signing' }; const f = p.seasons.find(x => x.value != null); return f ? { v: f.value, from: `end of S${f.s}` } : null; };
const valueSinceJoining = (p) => { const b = baseValue(p); return b && p.value != null ? { d: p.value - b.v, b } : null; };
// Dense tables: role as coloured text, development tag as plain grey text
const ROLE_TEXT = { CRUCIAL: 'text-[#7c3aed] font-black', IMPORTANT: 'text-sky-700 font-bold', ROTATION: 'text-slate-900 font-bold', SPORADIC: 'text-slate-600 font-semibold', PROSPECT: 'text-slate-400 font-semibold' };
function RoleText({ role, short = false }) {
    const r = ROLE_STYLE[role];
    if (!r) return role ? <span className="text-slate-400">{role.charAt(0) + role.slice(1).toLowerCase()}</span> : null;
    return <span className={`${ROLE_TEXT[role]} whitespace-nowrap`}>{short ? r.short : r.label}</span>;
}
const DevText = ({ code }) => (code ? <span className="text-[11px] font-semibold tracking-wide text-slate-400" title={(DEV_TYPES[code] || {}).note || ''}>{code}</span> : null);
const lastChange = (p) => { const s = [...p.seasons].reverse().find(x => x.change != null); return s ? s.change : null; };

// ─── PITCH ───────────────────────────────────────────────────────────
// Each slot lists the positions that can play it, best fit first.
const FORMATIONS = {
    '4-3-3': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 15, y: 71 }, { id: 'lcb', label: 'CB', fits: ['CB', 'CDM'], x: 37, y: 75 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'CDM'], x: 63, y: 75 }, { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 85, y: 71 },
        { id: 'lcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 30, y: 52 }, { id: 'rcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 70, y: 52 },
        { id: 'cam', label: 'CAM', fits: ['CAM', 'CM', 'CF'], x: 50, y: 40 },
        { id: 'lw', label: 'LW', fits: ['LW', 'LM', 'ST'], x: 18, y: 22 }, { id: 'st', label: 'ST', fits: ['ST', 'CF'], x: 50, y: 15 },
        { id: 'rw', label: 'RW', fits: ['RW', 'RM', 'ST'], x: 82, y: 22 },
    ],
    '4-2-3-1': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 15, y: 71 }, { id: 'lcb', label: 'CB', fits: ['CB', 'CDM'], x: 37, y: 75 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'CDM'], x: 63, y: 75 }, { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 85, y: 71 },
        { id: 'ldm', label: 'CDM', fits: ['CDM', 'CM'], x: 36, y: 56 }, { id: 'rdm', label: 'CDM', fits: ['CDM', 'CM'], x: 64, y: 56 },
        { id: 'lam', label: 'LM', fits: ['LM', 'LW', 'CAM'], x: 20, y: 36 }, { id: 'cam', label: 'CAM', fits: ['CAM', 'CM', 'CF'], x: 50, y: 37 },
        { id: 'ram', label: 'RM', fits: ['RM', 'RW', 'CAM'], x: 80, y: 36 }, { id: 'st', label: 'ST', fits: ['ST', 'CF'], x: 50, y: 15 },
    ],
    '3-5-2': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lcb', label: 'CB', fits: ['CB', 'LB'], x: 27, y: 74 }, { id: 'cb', label: 'CB', fits: ['CB', 'CDM'], x: 50, y: 76 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'RB'], x: 73, y: 74 },
        { id: 'lm', label: 'LM', fits: ['LM', 'LW', 'LWB', 'LB'], x: 12, y: 48 }, { id: 'ldm', label: 'CDM', fits: ['CDM', 'CM'], x: 36, y: 56 },
        { id: 'rdm', label: 'CM', fits: ['CM', 'CDM'], x: 64, y: 56 }, { id: 'rm', label: 'RM', fits: ['RM', 'RW', 'RWB', 'RB'], x: 88, y: 48 },
        { id: 'cam', label: 'CAM', fits: ['CAM', 'CM'], x: 50, y: 37 },
        { id: 'lst', label: 'ST', fits: ['ST', 'CF', 'LW'], x: 37, y: 16 }, { id: 'rst', label: 'ST', fits: ['ST', 'CF', 'RW'], x: 63, y: 16 },
    ],
    '4-4-2': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 15, y: 71 }, { id: 'lcb', label: 'CB', fits: ['CB', 'CDM'], x: 37, y: 75 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'CDM'], x: 63, y: 75 }, { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 85, y: 71 },
        { id: 'lm', label: 'LM', fits: ['LM', 'LW'], x: 16, y: 46 }, { id: 'lcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 38, y: 50 },
        { id: 'rcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 62, y: 50 }, { id: 'rm', label: 'RM', fits: ['RM', 'RW'], x: 84, y: 46 },
        { id: 'lst', label: 'ST', fits: ['ST', 'CF'], x: 37, y: 16 }, { id: 'rst', label: 'ST', fits: ['ST', 'CF'], x: 63, y: 16 },
    ],
    '4-2-2-2': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 15, y: 71 }, { id: 'lcb', label: 'CB', fits: ['CB', 'CDM'], x: 37, y: 75 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'CDM'], x: 63, y: 75 }, { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 85, y: 71 },
        { id: 'ldm', label: 'CDM', fits: ['CDM', 'CM'], x: 36, y: 57 }, { id: 'rdm', label: 'CDM', fits: ['CDM', 'CM'], x: 64, y: 57 },
        { id: 'lam', label: 'CAM', fits: ['CAM', 'CM', 'LW', 'LM'], x: 28, y: 36 }, { id: 'ram', label: 'CAM', fits: ['CAM', 'CM', 'RW', 'RM'], x: 72, y: 36 },
        { id: 'lst', label: 'ST', fits: ['ST', 'CF'], x: 37, y: 16 }, { id: 'rst', label: 'ST', fits: ['ST', 'CF'], x: 63, y: 16 },
    ],
    '4-2-4': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 15, y: 71 }, { id: 'lcb', label: 'CB', fits: ['CB', 'CDM'], x: 37, y: 75 },
        { id: 'rcb', label: 'CB', fits: ['CB', 'CDM'], x: 63, y: 75 }, { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 85, y: 71 },
        { id: 'lcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 36, y: 52 }, { id: 'rcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 64, y: 52 },
        { id: 'lw', label: 'LW', fits: ['LW', 'LM', 'ST'], x: 13, y: 24 }, { id: 'lst', label: 'ST', fits: ['ST', 'CF'], x: 37, y: 15 },
        { id: 'rst', label: 'ST', fits: ['ST', 'CF'], x: 63, y: 15 }, { id: 'rw', label: 'RW', fits: ['RW', 'RM', 'ST'], x: 87, y: 24 },
    ],
    '5-2-3': [
        { id: 'gk', label: 'GK', fits: ['GK'], x: 50, y: 90 },
        { id: 'lb', label: 'LB', fits: ['LB', 'LWB', 'LM'], x: 11, y: 62 }, { id: 'lcb', label: 'CB', fits: ['CB', 'LB'], x: 30, y: 74 },
        { id: 'cb', label: 'CB', fits: ['CB', 'CDM'], x: 50, y: 77 }, { id: 'rcb', label: 'CB', fits: ['CB', 'RB'], x: 70, y: 74 },
        { id: 'rb', label: 'RB', fits: ['RB', 'RWB', 'RM'], x: 89, y: 62 },
        { id: 'lcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 36, y: 48 }, { id: 'rcm', label: 'CM', fits: ['CM', 'CDM', 'CAM'], x: 64, y: 48 },
        { id: 'lw', label: 'LW', fits: ['LW', 'LM', 'ST'], x: 18, y: 24 }, { id: 'st', label: 'ST', fits: ['ST', 'CF'], x: 50, y: 15 },
        { id: 'rw', label: 'RW', fits: ['RW', 'RM', 'ST'], x: 82, y: 24 },
    ],
};
// How well a player fits a slot: his main position is best, then his
// alternative positions, then a close fit; a small penalty for each step
// so a slightly better-rated player in the wrong spot doesn't win.
function fitScore(p, slot) {
    if (p.ovr == null) return null;
    const i = slot.fits.indexOf(p.pos);
    if (i === 0) return p.ovr;
    const a = slot.fits.findIndex(f => p.alt.includes(f));
    if (a === 0) return p.ovr - 1;
    if (i > 0) return p.ovr - 2 - i;
    if (a > 0) return p.ovr - 3 - a;
    return null;
}
// How good a player is in a slot, for choosing the whole XI: main
// position > alternative > close fit (fitScore); a player from the wrong
// area is heavily penalised; keepers and outfield players never swap.
const AREA = { GK: 0, DEF: 1, MID: 2, ATT: 3 };
function slotScore(p, slot) {
    if (p.ovr == null) return null;
    const slotGK = slot.fits[0] === 'GK', playerGK = p.pos === 'GK';
    if (slotGK !== playerGK) return null; // never
    const f = fitScore(p, slot);
    if (f != null) return f;
    return p.ovr - 10 - 8 * Math.abs(AREA[groupOf(p.pos)] - AREA[groupOf(slot.fits[0])]);
}
// Hungarian algorithm (minimum-cost assignment) on a square cost matrix
function hungarian(cost) {
    const n = cost.length, INF = 1e12;
    const u = new Array(n + 1).fill(0), v = new Array(n + 1).fill(0), pp = new Array(n + 1).fill(0), way = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        pp[0] = i; let j0 = 0;
        const minv = new Array(n + 1).fill(INF), used = new Array(n + 1).fill(false);
        do {
            used[j0] = true; const i0 = pp[j0]; let delta = INF, j1 = 0;
            for (let j = 1; j <= n; j++) if (!used[j]) {
                const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
                if (minv[j] < delta) { delta = minv[j]; j1 = j; }
            }
            for (let j = 0; j <= n; j++) { if (used[j]) { u[pp[j]] += delta; v[j] -= delta; } else minv[j] -= delta; }
            j0 = j1;
        } while (pp[j0] !== 0);
        do { const j1 = way[j0]; pp[j0] = pp[j1]; j0 = j1; } while (j0);
    }
    const rowToCol = new Array(n).fill(-1);
    for (let j = 1; j <= n; j++) if (pp[j]) rowToCol[pp[j] - 1] = j - 1;
    return rowToCol;
}
// Pick the XI with the best total fit. Rows: players, then one "nobody"
// per slot (so a slot can stay empty rather than take an impossible fit).
// Columns: slots, then bench places.
function pickXI(players, slots) {
    const P = players.filter(p => p.ovr != null);
    const rows = P.length + slots.length, n = Math.max(rows, slots.length);
    const BIG = 10000;
    const cost = [];
    for (let r = 0; r < n; r++) {
        const row = [];
        for (let c = 0; c < n; c++) {
            if (c >= slots.length) { row.push(r < P.length ? BIG - 0 : BIG); continue; } // bench / unused
            if (r >= P.length) { row.push(BIG); continue; } // "nobody" in this slot
            const sc = slotScore(P[r], slots[c]);
            row.push(sc == null ? BIG * 10 : BIG - sc);
        }
        cost.push(row);
    }
    const assign = hungarian(cost);
    const xi = {};
    P.forEach((p, r) => {
        const c = assign[r];
        if (c != null && c >= 0 && c < slots.length && cost[r][c] < BIG) { const slot = slots[c]; xi[slot.id] = { p, fit: fitOf(p, slot) }; }
    });
    const inXI = new Set(Object.values(xi).map(x => x.p.id));
    const bench = players.filter(p => !inXI.has(p.id)).sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    return { xi, bench };
}
// The Squad tab: the pitch with the full squad list beside it. Presets
// pick a lineup automatically (Best XI, Team 1, Team 2, Team 3); players can
// then be dragged in from the list, swapped between slots, or dragged back
// to the list to empty a slot. On-loan players can't play.
const FIT_COLOR = { main: SQUAD_ACCENT, alt: '#b45309', close: '#e11d48', none: '#64748b' };
function fitOf(p, slot) {
    if (!p) return null;
    if (p.pos === slot.fits[0]) return 'main';
    if (slot.fits.includes(p.pos) || p.alt.includes(slot.fits[0])) return 'alt';
    return fitScore(p, slot) != null ? 'close' : 'none';
}
function PitchLines() {
    // Real proportions (68 x 105), thin translucent white
    const L = { stroke: 'rgba(255,255,255,0.5)', strokeWidth: 0.3, fill: 'none' };
    return (<svg viewBox="0 0 68 105" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
        <rect x="2" y="2" width="64" height="101" {...L}/>
        <line x1="2" y1="52.5" x2="66" y2="52.5" {...L}/>
        <circle cx="34" cy="52.5" r="9.15" {...L}/>
        <circle cx="34" cy="52.5" r="0.5" fill="rgba(255,255,255,0.55)"/>
        {[2, 103].map((y, i) => { const dir = i === 0 ? 1 : -1; return (<g key={y}>
            <rect x={34 - 20.15} y={i === 0 ? y : y - 16.5} width="40.3" height="16.5" {...L}/>
            <rect x={34 - 9.15} y={i === 0 ? y : y - 5.5} width="18.3" height="5.5" {...L}/>
            <circle cx="34" cy={y + dir * 11} r="0.45" fill="rgba(255,255,255,0.55)"/>
            <path d={`M ${34 - 7.3} ${y + dir * 16.5} A 9.15 9.15 0 0 ${i === 0 ? 0 : 1} ${34 + 7.3} ${y + dir * 16.5}`} {...L}/>
            </g>); })}
    </svg>);
}
function TeamNumber({ p }) {
    const t = p.tier;
    if (t === 'loan') return <span title="On loan" className="inline-flex"><ArrowRight className="w-4 h-4 text-sky-700"/></span>;
    if (t !== 1 && t !== 2 && t !== 3) return <span/>;
    return <span className="text-sm font-black leading-none" style={{ color: t === 1 ? SQUAD_ACCENT : t === 2 ? '#475569' : '#94a3b8' }} title={p.tag.label}>{p.tag.badge}</span>;
}
// Surname for the compact phone cards ("J. Durand" → "Durand")
const surname = (n) => String(n || '').replace(/^[A-Z]\.\s*/, '');
// One player card for the pitch and the bench. A tap or click selects him
// (tap-to-swap); drag and drop still works with a mouse. compact = phones:
// position, OVR and foot on top, surname under.
// v27: a simple bench (flat seat on two legs), drawn to Anish's reference
function BenchIcon({ className = 'w-4 h-4' }) {
    return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="8" width="20" height="3.5" rx="1.5"/><path d="M6 11.5v5M18 11.5v5M4.5 16.5h3M16.5 16.5h3"/>
    </svg>);
}
// v28 phones: hand-set layouts (Anish, v50.11). A phone pitch fits 3 chips across; chips that overlap
// sideways sit at least a chip-height (about 9%) apart. Positions are % of the pitch (x across, y down).
const PHONE_LAYOUTS = {
    '3-5-2': { gk: [50, 91], lcb: [18, 76], cb: [50, 81], rcb: [82, 76], ldm: [33, 62], rdm: [67, 62], lm: [16, 46], cam: [50, 43], rm: [84, 46], lst: [33, 22], rst: [67, 22] },
    '4-2-2-2': { ldm: [33, 52], rdm: [67, 52], lam: [25, 35], ram: [75, 35], lst: [33, 18], rst: [67, 18] },
    '4-2-4': { lcm: [33, 52], rcm: [67, 52], lw: [16, 24], rw: [84, 24], lst: [33, 12], rst: [67, 12] },
    '4-2-3-1': { ldm: [33, 52], rdm: [67, 52], lam: [16, 35], cam: [50, 35], ram: [84, 35], st: [50, 15] },
    '4-4-2': { lst: [33, 16], rst: [67, 16] },
    '5-2-3': { gk: [50, 92.5], lcb: [33, 82], rcb: [67, 82], cb: [50, 72], lb: [16, 68], rb: [84, 68], lcm: [33, 54], rcm: [67, 54], lw: [18, 24], st: [50, 15], rw: [82, 24] },
};
// v27 phones: crowded lines (chips overlap sideways) are staggered so no chip covers another's details
function phoneSlots(slots, chipPct, formation) {
    const fixed = PHONE_LAYOUTS[formation] || {};
    const out = slots.map(sl => (fixed[sl.id] ? { ...sl, x: fixed[sl.id][0], y: fixed[sl.id][1] } : { ...sl }));
    const lines = [];
    [...out].sort((a, b) => a.y - b.y).forEach(sl => { const L = lines.find(l => Math.abs(l.y - sl.y) <= 4); if (L) L.ss.push(sl); else lines.push({ y: sl.y, ss: [sl] }); });
    lines.forEach(L => {
        const ss = L.ss.sort((a, b) => a.x - b.x);
        const tight = ss.some((sl, i) => i && sl.x - ss[i - 1].x < chipPct + 1);
        if (!tight || ss.length < 2) return;
        if (ss.length === 4) {
            ss[0].y -= 9; ss[3].y -= 9; // wide pair higher
            ss[1].x = Math.min(ss[1].x, 50 - (chipPct / 2 + 1)); ss[2].x = Math.max(ss[2].x, 50 + (chipPct / 2 + 1)); // middle pair apart
        } else ss.forEach((sl, i) => { if (i % 2 === 0) sl.y -= 9; });
    });
    return out;
}
function PitchCard({ slot, label, p, onTap, dragProps = {}, selected = false, compact = false, width }) {
    const w = width || (compact ? 66 : 128);
    const ring = selected ? 'ring-4 ring-amber-300' : 'ring-1 ring-black/10';
    if (!p) return (<button type="button" onClick={onTap} style={{ width: w }} className={`${compact ? 'h-[50px] text-[11px]' : 'h-[62px] text-xs'} rounded-lg border-2 border-dashed border-white/70 flex items-center justify-center font-bold text-white/90 bg-white/5`}>{label || (slot && slot.label)}</button>);
    const fit = slot ? fitOf(p, slot) : 'main';
    const posTxt = slot ? slot.label : p.pos;
    if (compact) return (<button type="button" onClick={onTap} {...dragProps} style={{ width: w }} className={`rounded-lg bg-white/95 px-2 py-1.5 text-left shadow-lg ${ring} transition`}>
        <div className="grid grid-cols-3 items-center"><span className="text-[11px] font-black" style={{ color: slot ? FIT_COLOR[fit] : '#64748b' }}>{posTxt}</span><span className="text-sm font-black tabular-nums text-center leading-none" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span><span className="text-right text-[11px] font-black text-slate-400">{p.foot}</span></div>
        <div className="mt-1 flex items-center justify-center gap-1 min-w-0"><Flag emoji={p.flag} size={14}/><span className="text-[11px] font-extrabold text-slate-900 truncate">{p.name}</span></div>
    </button>);
    return (<button type="button" onClick={onTap} {...dragProps} style={{ width: w }} title={`${p.name} · ${p.pos}${p.alt.length ? ' (' + p.alt.join(', ') + ')' : ''}`}
        className={`rounded-lg bg-white/95 shadow-lg ${ring} ${compact ? 'px-1 pt-1 pb-1' : 'px-2 pt-1.5 pb-2'} transition text-left cursor-grab active:cursor-grabbing`}>
        <div className={`flex items-center ${compact ? 'justify-between gap-0.5' : 'justify-between'}`}>
        <span className="text-[11px] font-black tracking-wide" style={{ color: slot ? FIT_COLOR[fit] : '#64748b' }}>{posTxt}</span>
        <span className={`${compact ? 'text-[13px]' : 'text-xl'} font-black tabular-nums leading-none`} style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span>
        <span className="text-[11px] font-black text-slate-400" title={p.foot === 'L' ? 'Left-footed' : p.foot === 'R' ? 'Right-footed' : ''}>{p.foot}</span>
        </div>
        <div className={`${compact ? 'mt-0.5' : 'mt-1.5'} flex items-center justify-center gap-1 min-w-0`}>
        {!compact && <Flag emoji={p.flag} size={16}/>}
        <span className={`${compact ? 'text-[11px]' : 'text-[12px]'} font-extrabold text-slate-900 truncate`}>{compact ? surname(p.name) : p.name}</span>
        </div>
    </button>);
}
// Pool on phones: one line per player (position · OVR · flag · name · team · role)
function PoolRow({ p, on, sub, fit, selected, onTap }) {
    return (<button type="button" onClick={onTap} className={`w-full grid grid-cols-[38px_26px_18px_minmax(0,1fr)_20px_34px] gap-x-1.5 items-center rounded-lg border px-2 h-11 text-left bg-white ${on ? 'border-[#7c3aed] border-2' : sub ? 'border-dashed border-2 border-[#7c3aed]' : 'border-slate-200'} ${selected ? 'outline outline-4 outline-amber-300' : ''}`}>
        <span className="text-[11px] font-black text-slate-900 truncate">{on ? <span style={{ color: FIT_COLOR[fit] }}>{on.label}</span> : p.pos}</span>
        <span className="text-[13px] font-black tabular-nums" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span>
        <Flag emoji={p.flag} size={14}/>
        <span className="text-[12px] font-bold text-slate-900 truncate">{p.name}</span>
        <span className="flex justify-center"><TeamNumber p={p}/></span>
        <span className="flex justify-end"><RoleText role={p.role} short/></span>
    </button>);
}
const AGE_FILTERS = [
    { value: 'all', label: 'All', max: Infinity },
    { value: 'u23', label: 'U23', max: 23 },
    { value: 'u21', label: 'U21', max: 21 },
    { value: 'u19', label: 'U19', max: 19 },
];
function SquadTab({ squad, onOpen, ui, setUI }) {
    // Settings live in the section (App) so they survive switching tabs
    const set = (k) => (v) => setUI(u => ({ ...u, [k]: v }));
    const { formation, preset, age, withLoans, custom, benchSize, sheets, activeSheet, tileGroup } = ui;
    const [over, setOver] = useState(null); // drop target being dragged over
    const [naming, setNaming] = useState(null); // name being typed for a new team sheet
    // Tap-to-swap (v50.01): the selected player; the bar at the bottom of the screen offers To bench / Remove / Cancel
    const [pitchBox, pitchW] = useWidth(360); // v27: phones size pitch chips like bench chips
    const [sel, setSel] = useState(null);
    const phone = useScreen() === 'phone';
    // One pool drives the pitch, the bench and the tiles: players (available /
    // everyone) x age x the lineup's team
    const ageMax = (AGE_FILTERS.find(a => a.value === age) || AGE_FILTERS[0]).max;
    const available = squad.current.filter(p => (withLoans || p.tier !== 'loan') && (p.age == null || p.age < ageMax));
    const presetDef = LINEUP_PRESETS.find(x => x.value === preset) || LINEUP_PRESETS[0];
    const pool = available.filter(presetDef.pool);
    const byId = useMemo(() => { const m = {}; squad.current.forEach(p => { m[p.id] = p; }); return m; }, [squad]);
    const slots = FORMATIONS[formation];
    const presetLineup = useMemo(() => {
        const out = {};
        if (presetDef.empty) { slots.forEach(s => { out[s.id] = null; }); return out; }
        const { xi } = pickXI(pool, slots);
        slots.forEach(s => { out[s.id] = xi[s.id] ? xi[s.id].p.id : null; });
        return out;
    }, [formation, preset, squad, withLoans, age]);
    const lineup = (custom && custom.lineup) || presetLineup;
    // Bench: auto-filled with the best of the pool not in the XI (up to 9 kept;
    // the 7 / 9 switch decides how many show). Empty slots stay empty.
    const presetBench = useMemo(() => {
        if (presetDef.empty) return Array(9).fill(null);
        const inXI = new Set(Object.values(presetLineup).filter(Boolean));
        const rest = pool.filter(p => !inXI.has(p.id)).sort((a, b) => (b.ovr || 0) - (a.ovr || 0)).slice(0, 9).map(p => p.id);
        return [...rest, ...Array(9 - rest.length).fill(null)];
    }, [presetLineup, formation, preset, squad, withLoans, age]);
    const bench = (custom && custom.bench) || presetBench;
    const shownBench = bench.slice(0, benchSize);
    const reset = (patch) => { setSel(null); setUI(u => ({ ...u, ...patch, custom: null, activeSheet: null })); };
    // Drag and drop: tiles, pitch slots and bench slots
    const dragStart = (id) => (e) => { e.dataTransfer.setData('text/plain', String(id)); e.dataTransfer.effectAllowed = 'move'; };
    const move = (id, target) => {
        const p = byId[id];
        if (!p || (p.tier === 'loan' && !withLoans)) return;
        const L = { ...lineup }, B = [...bench];
        const fromSlot = Object.keys(L).find(k => L[k] === id);
        const fromBench = B.indexOf(id);
        if (target.type === 'list') {
            if (fromSlot) L[fromSlot] = null;
            if (fromBench >= 0) B[fromBench] = null;
        } else {
            const prev = target.type === 'slot' ? L[target.id] : B[target.i];
            if (prev === id) return;
            if (target.type === 'slot') L[target.id] = id; else B[target.i] = id;
            // a player who came from the pitch or bench swaps places with whoever was here
            if (fromSlot && !(target.type === 'slot' && target.id === fromSlot)) L[fromSlot] = prev || null;
            if (fromBench >= 0 && !(target.type === 'bench' && target.i === fromBench)) B[fromBench] = prev || null;
        }
        setUI(u => ({ ...u, custom: { lineup: L, bench: B } }));
    };
    const drop = (target) => (e) => { e.preventDefault(); setOver(null); move(Number(e.dataTransfer.getData('text/plain')), target); };
    const overProps = (key) => ({ onDragOver: (e) => { e.preventDefault(); if (over !== key) setOver(key); }, onDragLeave: () => setOver(null) });
    // Team sheets (this session only until saving to the sheet is enabled)
    const saveSheet = () => {
        const name = (naming || '').trim() || `Team sheet ${sheets.length + 1}`;
        const sheet = { id: Date.now(), name, formation, lineup: { ...lineup }, bench: bench.slice(0, benchSize) };
        setUI(u => ({ ...u, sheets: [...u.sheets, sheet].slice(0, 5), activeSheet: sheet.id, custom: { lineup: sheet.lineup, bench: [...sheet.bench, ...Array(9 - sheet.bench.length).fill(null)] } }));
        setNaming(null);
    };
    const loadSheet = (sh) => { setSel(null); setUI(u => ({
        ...u, formation: sh.formation, activeSheet: sh.id,
        // a sheet saved with 9 subs flips the switch to 9
        benchSize: sh.bench.filter(Boolean).length > 7 ? 9 : u.benchSize,
        custom: { lineup: { ...sh.lineup }, bench: [...sh.bench, ...Array(9 - sh.bench.length).fill(null)] },
    })); };
    // Tap-to-swap: tap a player to select him; tap another player to swap, or
    // an empty spot to move him there; tap him again (or Cancel) to let go.
    const placeOf = (id) => { const k = Object.keys(lineup).find(x => lineup[x] === id); if (k) return { type: 'slot', id: k }; const i = bench.indexOf(id); return i >= 0 && i < benchSize ? { type: 'bench', i } : null; };
    const tap = (target) => {
        const occupant = target.type === 'slot' ? lineup[target.id] : target.type === 'bench' ? bench[target.i] : target.id;
        if (sel == null) { if (occupant != null) setSel(occupant); return; }
        if (occupant === sel) { setSel(null); return; }
        if (target.type === 'player') {
            const there = placeOf(occupant), mine = placeOf(sel);
            if (there) move(sel, there);
            else if (mine) move(occupant, mine);
            else { setSel(occupant); return; }
        } else move(sel, target);
        setSel(null);
    };
    const selP = sel != null ? byId[sel] : null;
    const selPlace = sel != null ? placeOf(sel) : null;
    const freeBench = shownBench.findIndex(x => x == null);
    const deleteSheet = (id) => setUI(u => ({ ...u, sheets: u.sheets.filter(x => x.id !== id), activeSheet: u.activeSheet === id ? null : u.activeSheet }));
    // Figures
    const onPitch = {}; slots.forEach(s => { if (lineup[s.id] != null) onPitch[lineup[s.id]] = s; });
    const benchSet = new Set(shownBench.filter(Boolean));
    const picked = slots.map(s => byId[lineup[s.id]]).filter(Boolean);
    // Bylines: best player (ties: younger) and youngest player (ties: higher OVR)
    const bestP = [...picked].sort((a, b) => (b.ovr || 0) - (a.ovr || 0) || (a.age ?? 99) - (b.age ?? 99))[0];
    const youngP = [...picked].filter(p => p.age != null).sort((a, b) => a.age - b.age || (b.ovr || 0) - (a.ovr || 0))[0];
    const avg = (f) => (picked.length ? picked.reduce((a, p) => a + (f(p) || 0), 0) / picked.length : 0);
    // Lineup Cohesion: each outfield player 1 (main position), 0.5 (an
    // alternative position) or 0 (anything else); empty slots 0; out of 10
    const cohesion = slots.filter(s => s.fits[0] !== 'GK').reduce((a, s) => {
        const p = byId[lineup[s.id]];
        if (!p) return a;
        return a + (p.pos === s.fits[0] ? 1 : p.alt.includes(s.fits[0]) ? 0.5 : 0);
    }, 0);
    const outfield = slots.filter(s => s.fits[0] !== 'GK').length;
    const fitCount = (kind) => slots.filter(s => s.fits[0] !== 'GK').filter(s => { const p = byId[lineup[s.id]]; if (!p) return false; const main = p.pos === s.fits[0], alt = !main && p.alt.includes(s.fits[0]); return kind === 'alt' ? alt : !main && !alt; }).length;
    const list = pool.filter(p => tileGroup === 'all' || groupOf(p.pos) === tileGroup)
        .sort((a, b) => POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b.pos) || (b.ovr || 0) - (a.ovr || 0));
    const sheetName = activeSheet ? (sheets.find(x => x.id === activeSheet) || {}).name : null;
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Lineup OVR" icon={Star} iconClassName="text-amber-300" value={picked.length ? avg(p => p.ovr).toFixed(1) : '–'} valueClassName="text-2xl sm:text-3xl font-black text-white" left={bestP ? `Best player: ${bestP.name} ${bestP.ovr}` : ''} right=""/>
    <HighlightCard label="Average age" icon={Clock} iconClassName="text-sky-300" value={picked.length ? avg(p => p.age).toFixed(1) : '–'} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={youngP ? `Youngest player: ${youngP.name}, ${youngP.age}` : ''} right=""/>
    <HighlightCard label="Lineup value" icon={TrendingUp} iconClassName="text-emerald-300" value={money(picked.reduce((a, p) => a + (p.value || 0), 0))} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left="Market value" right=""/>
    <HighlightCard label="Lineup cohesion" icon={Shield} iconClassName="text-rose-200" value={`${cohesion % 1 ? cohesion.toFixed(1) : cohesion} / ${outfield}`} valueClassName="text-2xl sm:text-3xl font-black text-rose-100" left={`${fitCount('alt')} in alt position · ${fitCount('out')} out of position`} right=""/>
    </HighlightsBar>
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={LayoutGrid}>Formation</ControlLabel>
    <Segmented value={formation} onChange={(v) => reset({ formation: v })} options={Object.keys(FORMATIONS).map(f => ({ value: f, label: f }))}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>Lineup</ControlLabel>
    <Segmented value={activeSheet ? '' : preset} onChange={(v) => reset({ preset: v })} options={LINEUP_PRESETS.map(x => ({ value: x.value, label: x.label }))}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Clock}>Age</ControlLabel>
    <Segmented value={age} onChange={(v) => reset({ age: v })} options={AGE_FILTERS.map(a => ({ value: a.value, label: a.label }))}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>Players</ControlLabel>
    <Segmented value={withLoans ? 'yes' : 'no'} onChange={(v) => reset({ withLoans: v === 'yes' })} options={[{ value: 'no', label: 'Available' }, { value: 'yes', label: 'Everyone' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>{custom ? 'Custom lineup' : 'Your changes'}</ControlLabel>
    <ResetButton disabled={!custom} onClick={() => reset({})}/></div>
    </div>
    {/* Team sheets */}
    <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2">
    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mr-1">Team sheets</span>
        {sheets.map(sh => (<span key={sh.id} className={`inline-flex items-center rounded-lg border text-xs font-bold ${activeSheet === sh.id ? 'text-white border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}`} style={activeSheet === sh.id ? { backgroundColor: SQUAD_ACCENT } : undefined}>
        <button type="button" onClick={() => loadSheet(sh)} className="px-2.5 py-1" title={`${sh.formation} · ${sh.bench.filter(Boolean).length} subs`}>{sh.name}</button>
        <button type="button" onClick={() => deleteSheet(sh.id)} className={`px-1.5 py-1 ${activeSheet === sh.id ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-rose-600'}`} title="Delete"><X className="w-3 h-3"/></button>
        </span>))}
        {naming != null ? (<span className="inline-flex items-center gap-1">
        <input autoFocus value={naming} onChange={(e) => setNaming(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') saveSheet(); if (e.key === 'Escape') setNaming(null); }} placeholder={`Team sheet ${sheets.length + 1}`} className="w-40 px-2 py-1 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"/>
        <button type="button" onClick={saveSheet} className="px-2.5 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: SQUAD_ACCENT }}>Save</button>
        <button type="button" onClick={() => setNaming(null)} className="px-2 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800">Cancel</button>
        </span>) : (<button type="button" disabled={sheets.length >= 5} onClick={() => setNaming('')} className="px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-xs font-bold text-slate-600 hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed">+ Save this lineup{sheets.length >= 5 ? ' (5 max)' : ''}</button>)}
    <span className="ml-auto text-[11px] text-slate-400">This session only, until saving to the sheet is enabled.</span>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,700px)_minmax(0,1fr)] gap-5 items-stretch">
    <div className="space-y-3">
    {/* The pitch */}
    <div ref={pitchBox} className="relative w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/10" style={{ aspectRatio: '68 / 105', background: 'linear-gradient(180deg, #3f9a5d 0%, #2f8350 45%, #256b41 100%)' }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.14), rgba(0,0,0,0) 65%)' }}/>
    <PitchLines/>
        {(phone ? phoneSlots(slots, Math.round(((pitchW - 40) / 3) / Math.max(1, pitchW) * 100), formation) : slots).map(slot => { const p = byId[lineup[slot.id]]; return (<div key={slot.id} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl transition ${over === slot.id ? 'ring-4 ring-amber-300/80' : ''}`} style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            {...overProps(slot.id)} onDrop={drop({ type: 'slot', id: slot.id })}>
            <PitchCard slot={slot} p={p} compact={phone} width={phone ? Math.floor((pitchW - 40) / 3) : undefined} selected={!!p && p.id === sel} onTap={() => tap({ type: 'slot', id: slot.id })} dragProps={p ? { draggable: true, onDragStart: dragStart(p.id), onDragEnd: () => setOver(null) } : {}}/>
            </div>); })}
    </div>
    {/* The bench */}
    <div className="rounded-2xl p-3 ring-1 ring-black/10" style={{ background: 'linear-gradient(180deg, #2a5f3f, #224d34)' }}>
    <div className="flex items-center justify-between mb-2">
    <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/85">Bench</span>
    <Segmented value={String(benchSize)} onChange={(v) => setUI(u => ({ ...u, benchSize: Number(v) }))} options={[{ value: '7', label: '7 subs' }, { value: '9', label: '9 subs' }]}/>
    </div>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${phone ? 3 : benchSize === 9 ? 5 : 4}, minmax(0, 1fr))` }}>
        {shownBench.map((id, i) => { const p = byId[id]; const key = `b${i}`; return (<div key={key} {...overProps(key)} onDrop={drop({ type: 'bench', i })} className={`rounded-lg transition ${over === key ? 'ring-4 ring-amber-300/80' : ''}`}>
            {p ? (<button type="button" draggable onDragStart={dragStart(p.id)} onDragEnd={() => setOver(null)} onClick={() => tap({ type: 'bench', i })} className={`w-full rounded-lg bg-white/95 px-2 py-1.5 text-left shadow cursor-grab active:cursor-grabbing ${sel === p.id ? 'outline outline-4 outline-amber-300' : ''}`}>
            <div className="grid grid-cols-3 items-center"><span className="text-[11px] font-black text-slate-500">{p.pos}</span><span className="text-sm font-black tabular-nums text-center leading-none" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span><span className="text-right text-[11px] font-black text-slate-400">{p.foot}</span></div>
            <div className="mt-1 flex items-center justify-center gap-1 min-w-0"><Flag emoji={p.flag} size={14}/><span className="text-[11px] font-extrabold text-slate-900 truncate">{p.name}</span></div>
            </button>) : (<button type="button" onClick={() => tap({ type: 'bench', i })} className="w-full h-[50px] rounded-lg border-2 border-dashed border-white/40 flex items-center justify-center text-[11px] font-bold text-white/70">Sub {i + 1}</button>)}
            </div>); })}
    </div>
    </div>
    </div>
    {/* The squad (drop a pitch or bench player here to take him off) */}
    <div className="relative">
    <div className="flex flex-col gap-3 h-[60vh] sm:h-[680px] xl:h-auto xl:absolute xl:inset-0 bg-white rounded-xl border border-slate-200 p-4" {...overProps('list')} onDrop={drop({ type: 'list' })}>
    <div className="flex items-center justify-between gap-2 flex-wrap"><div className="min-w-0 flex items-baseline gap-x-2 flex-wrap"><span className="text-sm font-extrabold text-slate-900">Squad</span><span className="text-[11px] font-semibold text-slate-500">{activeSheet ? sheetName : presetDef.empty ? 'Everyone in the filters above' : presetDef.label}{age !== 'all' ? ` · ${AGE_FILTERS.find(a => a.value === age).label}` : ''}{withLoans ? ' · including on loan' : ''} · {Object.keys(onPitch).length} on the pitch · {benchSet.size} on the bench · {pool.length} players</span></div>
    <Segmented value={tileGroup} onChange={set('tileGroup')} options={[{ value: 'all', label: 'All' }, { value: 'GK', label: 'GK' }, { value: 'DEF', label: 'DEF' }, { value: 'MID', label: 'MID' }, { value: 'ATT', label: 'ATT' }]}/>
    </div>
    {/* Tiles: like the pitch cards, with a little more detail */}
    <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 pt-1">
    <div className={`grid ${phone ? 'gap-1' : 'gap-2'}`} style={{ gridTemplateColumns: phone ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(192px, 1fr))' }}>
        {list.map(p => { const on = onPitch[p.id]; const sub = benchSet.has(p.id); const fit = on ? fitOf(p, on) : null; return phone ? (<PoolRow key={p.id} p={p} on={on} sub={sub} fit={fit} selected={sel === p.id} onTap={() => tap({ type: 'player', id: p.id })}/>) : (<div key={p.id} draggable onDragStart={dragStart(p.id)} onClick={() => tap({ type: 'player', id: p.id })}
            className={`rounded-lg border bg-white px-2.5 pt-2 pb-2 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-px transition ${on ? 'ring-2 ring-offset-1' : sub ? 'border-dashed border-2' : 'border-slate-200'} ${sel === p.id ? 'outline outline-4 outline-amber-300' : ''}`}
            style={on ? { borderColor: SQUAD_ACCENT, '--tw-ring-color': SQUAD_ACCENT } : sub ? { borderColor: SQUAD_ACCENT } : undefined} title={on ? `On the pitch at ${on.label}` : sub ? 'On the bench' : 'Drag onto the pitch or bench'}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1">
            {/* His positions (main first); the one he's playing on the pitch is underlined */}
            <span className="text-[11px] font-bold text-slate-500 min-w-0 leading-tight" title={[p.pos, ...p.alt].join(', ')}>
                {(() => {
                    const ps = [p.pos, ...p.alt], off = on && !ps.includes(on.label);
                    const posSpan = (x, k, sep) => (<React.Fragment key={x}>{sep && <span className="text-slate-300"> · </span>}<span className={`${k === 0 ? 'font-black text-slate-900' : ''} ${on && on.label === x ? 'underline decoration-2 underline-offset-2' : ''}`} style={on && on.label === x ? { textDecorationColor: SQUAD_ACCENT } : undefined}>{x}</span></React.Fragment>);
                    const offSpan = off ? <><span className="text-slate-300"> · </span><span className="font-black underline decoration-2 underline-offset-2" style={{ color: FIT_COLOR[fit] }}>{on.label}</span></> : null;
                    const l1 = ps.slice(0, 3), l2 = ps.slice(3, 5), more = ps.length > 5;
                    return (<>
                        <span className="block whitespace-nowrap">{l1.map((x, k) => posSpan(x, k, k > 0))}{!l2.length && offSpan}</span>
                        {l2.length > 0 && <span className="block whitespace-nowrap">{l2.map((x, k) => posSpan(x, k + 3, k > 0))}{more && <span className="text-slate-400"> …</span>}{offSpan}</span>}
                    </>);
                })()}
            </span>
            <span className="text-lg font-black tabular-nums leading-none text-center" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span>
            <span className="flex justify-end"><TeamNumber p={p}/></span>
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-1.5 min-w-0">
            <Flag emoji={p.flag} size={16}/>
            <span className="text-[12px] font-extrabold text-slate-900 truncate">{p.name}</span>
            </div>
            <div className="mt-1.5 grid grid-cols-3 items-center text-[11px]">
            <span className="font-black text-slate-600">{p.foot}</span>
            <span className="text-center tabular-nums text-slate-500">{p.age}</span>
            <span className="flex justify-end"><RoleChip role={p.role} short/></span>
            </div>
            </div>); })}
    </div>
        {!list.length && <div className="p-4 text-center text-xs text-slate-400">No players here.</div>}
    </div>
    </div>
    </div>
    </div>
    {/* Tap-to-swap bar: fixed to the bottom of the screen while a player is selected */}
    {selP && (() => {
        const onSlot = selPlace && selPlace.type === 'slot', onBench = selPlace && selPlace.type === 'bench';
        const canBench = !onBench; // pool and pitch players can go to the bench
        const ib = 'w-10 h-10 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-35';
        return (<div className="fixed z-[60] left-3 right-3 bottom-3 mx-auto max-w-md rounded-xl bg-slate-900 text-white shadow-2xl px-3.5 py-2.5 flex items-center gap-3">
        <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold truncate">{selP.name} <span style={{ color: '#76d65a' }}>{selP.ovr}</span></div>
        <div className="text-[11px] text-slate-300 truncate">{[selP.pos, ...(selP.alt || [])].join(' · ')}</div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
        {canBench && <button type="button" aria-label={freeBench < 0 ? 'Bench full' : 'To bench'} title={freeBench < 0 ? 'Bench full' : 'To bench'} disabled={freeBench < 0} onClick={() => { move(sel, { type: 'bench', i: freeBench }); setSel(null); }} className={ib}><BenchIcon className="w-5 h-5"/></button>}
        {selPlace && <button type="button" aria-label="Remove" title="Remove" onClick={() => { move(sel, { type: 'list' }); setSel(null); }} className={ib}><UserMinus className="w-4 h-4"/></button>}
        <button type="button" aria-label="Cancel" title="Cancel" onClick={() => setSel(null)} className="w-8 h-10 inline-flex items-center justify-center text-slate-400 hover:text-white"><X className="w-4 h-4"/></button>
        </div>
        </div>); })()}
    </div>);
}

const LINEUP_PRESETS = [
    { value: 'best', label: 'Best XI', pool: (p) => true },
    { value: '1', label: '❶ First', pool: (p) => p.tier === 1 },
    { value: '2', label: '❷ Second', pool: (p) => p.tier === 2 },
    { value: '3', label: '❸ Reserves', pool: (p) => p.tier === 3 },
    { value: 'blank', label: 'Blank', pool: (p) => true, empty: true }, // every position empty, fill by dragging
];
const SQUAD_UI_DEFAULTS = { formation: '4-3-3', preset: 'best', age: 'all', withLoans: false, custom: null, benchSize: 7, sheets: [], activeSheet: null, tileGroup: 'all' };
// Age groups: "under N" = younger than N (U21 = 20 or younger)
// ─── DEPTH CHART ─────────────────────────────────────────────────────
// Every position, laid out like a pitch, with the players whose MAIN
// position it is (alternative positions aren't counted). Warnings: Thin
// (fewer than 2 players), Ageing (the top two average 30+).
const DEPTH_ROWS = [
    { label: 'Attack', groups: [{ label: 'LW / LM', pos: ['LW', 'LM'] }, { label: 'ST', pos: ['ST', 'CF'] }, { label: 'RW / RM', pos: ['RW', 'RM'] }] },
    { label: 'Midfield', groups: [{ label: 'CAM', pos: ['CAM'] }, { label: 'CM', pos: ['CM'] }, { label: 'CDM', pos: ['CDM'] }] },
    { label: 'Defence', groups: [{ label: 'LB', pos: ['LB', 'LWB'] }, { label: 'CB', pos: ['CB'] }, { label: 'RB', pos: ['RB', 'RWB'] }] },
    { label: 'Goalkeeper', groups: [{ label: 'GK', pos: ['GK'] }] },
];
const THIN_BELOW = 2, AGEING_FROM = 30;
const teamRank = (p) => (p.tier === 1 ? 1 : p.tier === 2 ? 2 : p.tier === 3 ? 3 : p.tier === 'loan' ? 4 : 5);
const roleRank = (p) => { const i = ROLE_ORDER.indexOf(p.role); return i < 0 ? 9 : i; };
function DepthTab({ squad, onOpen }) {
    const phoneD = useScreen() === 'phone'; // v27: header averages get their own layout on phones
    const [withLoans, setWithLoans] = useState(false);
    const pool = squad.current.filter(p => withLoans || p.tier !== 'loan');
    const depth = (g) => {
        // Order: team (❶ ❷ ❸, then on loan) → OVR → role → age (older first)
        const players = pool.filter(p => g.pos.includes(p.pos)).sort((a, b) => teamRank(a) - teamRank(b) || (b.ovr || 0) - (a.ovr || 0) || roleRank(a) - roleRank(b) || (b.age || 0) - (a.age || 0));
        const top2 = players.slice(0, 2);
        const ageTop2 = top2.length ? top2.reduce((a, p) => a + (p.age || 0), 0) / top2.length : 0;
        const ovrTop2 = top2.length ? top2.reduce((a, p) => a + (p.ovr || 0), 0) / top2.length : 0;
        return { ...g, players, thin: players.length < THIN_BELOW, ageing: top2.length >= 2 && ageTop2 >= AGEING_FROM, ageTop2, ovrTop2 };
    };
    const all = DEPTH_ROWS.flatMap(r => r.groups).map(depth);
    const thin = all.filter(d => d.thin), ageing = all.filter(d => d.ageing);
    const ranked = all.filter(d => d.players.length);
    const strongest = [...ranked].sort((a, b) => b.ovrTop2 - a.ovrTop2)[0];
    const weakest = [...ranked].sort((a, b) => a.ovrTop2 - b.ovrTop2)[0];
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Thin positions" icon={Shield} iconClassName="text-rose-300" value={thin.length} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left={thin.length ? thin.map(d => d.label).join(', ') : 'None'} right=""/>
    <HighlightCard label="Ageing positions" icon={Clock} iconClassName="text-amber-300" value={ageing.length} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={ageing.length ? ageing.map(d => d.label).join(', ') : 'None'} right=""/>
    <HighlightCard label="Strongest" icon={Star} iconClassName="text-emerald-300" value={strongest ? strongest.label : '–'} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={strongest ? `Top two average ${strongest.ovrTop2.toFixed(1)}` : ''} right=""/>
    <HighlightCard label="Weakest" icon={TrendingUp} iconClassName="text-sky-300" value={weakest ? weakest.label : '–'} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={weakest ? `Top two average ${weakest.ovrTop2.toFixed(1)}` : ''} right=""/>
    </HighlightsBar>
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>Players</ControlLabel>
    <Segmented value={withLoans ? 'yes' : 'no'} onChange={(v) => setWithLoans(v === 'yes')} options={[{ value: 'no', label: 'Available' }, { value: 'yes', label: 'Everyone' }]}/></div>
    <div className="text-[11px] text-slate-500 pb-2">Main positions only. <strong className="text-rose-700">Thin</strong>: fewer than {THIN_BELOW} players. <strong className="text-amber-700">Ageing</strong>: top two average {AGEING_FROM}+.</div>
    </div>
    <div className="space-y-4">
        {DEPTH_ROWS.map(row => (<div key={row.label} className="space-y-1.5">
        <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">{row.label}</div>
        <div className={`grid gap-3 ${row.groups.length === 1 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {row.groups.map((g, gi) => { const d = depth(g); const avgO = d.players.length ? d.players.reduce((a, p) => a + (p.ovr || 0), 0) / d.players.length : null; const avgA = d.players.length ? d.players.reduce((a, p) => a + (p.age || 0), 0) / d.players.length : null; return (<div key={g.label} className={`bg-white rounded-xl border p-3 space-y-2 ${d.thin ? 'border-rose-300' : 'border-slate-200'} ${row.groups.length === 1 ? 'sm:col-start-2' : ''}`}>
            {/* Header bar: position, average OVR, average age, players */}
            {/* Same columns as the rows: average OVR over OVR, average age over Age */}
            {phoneD ? (<div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2 py-2">
            <span className="flex items-center gap-1.5 min-w-0"><span className="text-sm font-black text-slate-900 truncate">{g.label}</span>
            {d.thin && <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">Thin</span>}
            {d.ageing && <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">Ageing</span>}</span>
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap tabular-nums"><span className="font-black" style={{ color: ovrColor(avgO) }}>{avgO == null ? '–' : avgO.toFixed(1)}</span> OVR · <span className="font-black text-slate-800">{avgA == null ? '–' : avgA.toFixed(1)}</span> yrs</span>
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap"><span className="font-black text-slate-800">{d.players.length}</span> player{d.players.length === 1 ? '' : 's'}</span>
            </div>) : (<div className="grid grid-cols-[34px_minmax(0,1fr)_14px_24px_22px_0px_32px_20px] gap-x-1.5 sm:grid-cols-[96px_minmax(0,160px)_22px_30px_28px_minmax(0,1fr)_42px_22px] sm:gap-x-2.5 items-center rounded-lg bg-slate-50 px-2 py-2">
            <span className="col-span-3 flex items-center gap-1.5 min-w-0"><span className="text-sm font-black text-slate-900">{g.label}</span>
            {d.thin && <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">Thin</span>}
            {d.ageing && <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">Ageing</span>}</span>
            <span className="text-[12px] font-black tabular-nums text-center" style={{ color: ovrColor(avgO) }} title="Average OVR">{avgO == null ? '–' : avgO.toFixed(1)}</span>
            <span className="text-[11px] font-black tabular-nums text-center text-slate-800" title="Average age">{avgA == null ? '–' : avgA.toFixed(1)}</span>
            <span className="col-span-3 text-right text-[11px] font-semibold text-slate-500 whitespace-nowrap"><span className="font-black text-slate-800">{d.players.length}</span> player{d.players.length === 1 ? '' : 's'}</span>
            </div>)}
            <div className="space-y-0.5">
                {d.players.map(p => (<button key={p.id} type="button" onClick={() => onOpen(p)} className="w-full grid grid-cols-[34px_minmax(0,1fr)_14px_24px_22px_0px_32px_20px] gap-x-1.5 sm:grid-cols-[96px_minmax(0,160px)_22px_30px_28px_minmax(0,1fr)_42px_22px] sm:gap-x-2.5 items-center px-2 py-1 rounded-md hover:bg-slate-50 text-[12px] text-left">
                <span className="truncate"><span className="font-black text-slate-900">{p.pos}</span></span>
                <span className="min-w-0 sm:pl-2"><span className="flex items-center gap-1.5 min-w-0"><Flag emoji={p.flag} size={16}/><span className="font-bold text-slate-800 truncate">{p.name}</span></span></span>
                <span className="text-[11px] font-bold text-slate-400 text-center">{p.foot}</span>
                <span className="font-black tabular-nums text-center" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</span>
                <span className="text-[11px] tabular-nums text-slate-500 text-center">{p.age}</span>
                <span/>
                <span className="flex justify-end"><RoleText role={p.role} short/></span>
                <span className="flex justify-end"><TeamNumber p={p}/></span>
                </button>))}
                {!d.players.length && <div className="text-[11px] text-slate-400 italic">Nobody</div>}
            </div>
            </div>); })}
        </div>
        </div>))}
    </div>
    </div>);
}

// ─── SHARED (v49 part 2) ─────────────────────────────────────────────
const median = (arr) => { const a = arr.filter(v => v != null && isFinite(v)).sort((x, y) => x - y); if (!a.length) return null; const m = Math.floor(a.length / 2); return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
const windowOf = (y) => (y == null ? null : (y % 1 ? 'winter' : 'summer'));
const WINDOW_ICON = { summer: '☀️', winter: '❄️' };
// "S5 · 2028 ☀️"
function SeasonTag({ season, year }) {
    if (!season) return <span className="text-slate-300">–</span>;
    const w = windowOf(year);
    return <span className="whitespace-nowrap tabular-nums"><span className="font-bold text-slate-800">S{season}</span>{year != null && <span className="text-slate-400"> · {Math.floor(year)}</span>}{w && <span className="ml-1" title={w === 'winter' ? 'Winter window' : 'Summer window'}>{WINDOW_ICON[w]}</span>}</span>;
}
const startOvr = (p) => { const f = p.seasons.find(x => x.start != null); return f ? f.start : p.ovr; };
const firstValue = (p) => { const f = p.seasons.find(x => x.value != null); return f ? f.value : p.value; };
const remainingPot = (p) => (p.potential == null || p.ovr == null ? null : p.ovr - p.potential); // −5 = 5 left, +2 = 2 above
const POT_TAG_ORDER = ['SGP', 'AEP', 'PTBS', 'SET', 'OWB', 'HTSS'];
const NO_GROWTH_TAGS = ['SET', 'OWB', 'HTSS'];
const routeOf = (p) => { const f = p.joined && p.joined.from ? String(p.joined.from).toUpperCase() : ''; return f === 'YOUTH ACADEMY' ? 'academy' : f === 'FREE AGENT' ? 'free' : f === 'LEGACY' ? 'legacy' : f ? 'transfer' : 'legacy'; };
const ROUTE_LABELS = { academy: '🎓 Academy', transfer: 'Transfer', free: '🖊️ Free agent', legacy: '📜 Legacy' };
const TEAM_GROUPS = [
    { value: 'all', label: 'Whole squad', test: () => true },
    { value: '1', label: '❶ First', test: (p) => p.tier === 1 },
    { value: '2', label: '❷ Second', test: (p) => p.tier === 2 },
    { value: '3', label: '❸ Reserves', test: (p) => p.tier === 3 },
    { value: 'loan', label: 'On loan', test: (p) => p.tier === 'loan' },
];
// Positions + alternatives in grey (used in several tables)
const PosCell = ({ p }) => (<span className="whitespace-nowrap"><span className="font-black text-slate-900">{p.pos}</span>{p.alt.length > 0 && <span className="text-[11px] text-slate-400 ml-1.5">{p.alt.join(', ')}</span>}</span>);
const NameCell = ({ p }) => (<span className="inline-flex items-center gap-1.5 font-bold text-slate-900 whitespace-nowrap"><Flag emoji={p.flag} size={16}/>{p.name}</span>);
// Segmented bar: one segment per season, length = size of the change on a
// shared scale; green rises, red falls, a short grey stub for no change.
function SegBar({ segs, scale, fmt = (c) => `${c > 0 ? '+' : ''}${c}`, tip, labels = false }) {
    const hv = useHover();
    const widthOf = (c) => (c === 0 ? null : Math.max(0.6, (Math.abs(c) / scale) * 100));
    return (<div className="w-full">
    {/* labels: each season's change, centred above its segment */}
    {labels && <div className="flex gap-[2px] w-full mb-0.5">{segs.map((x, i) => { const c = x.change, w = widthOf(c); return (<div key={i} className={`text-center text-[11px] font-black tabular-nums leading-tight overflow-visible whitespace-nowrap ${c > 0 ? 'text-emerald-700' : c < 0 ? 'text-rose-700' : 'text-slate-400'}`} style={w == null ? { flex: '0 0 6px' } : { width: `${w}%` }}>{fmt(c)}</div>); })}</div>}
    <div className="flex items-center gap-[2px] h-3.5 w-full">
        {segs.map((x, i) => { const c = x.change; const w = c === 0 ? null : Math.max(0.6, (Math.abs(c) / scale) * 100); return (<div key={i} {...hv(tip ? tip(x) : { title: fmt(c) })}
            className={`h-full rounded-[3px] ${c > 0 ? 'bg-emerald-500' : c < 0 ? 'bg-rose-500' : 'bg-slate-300'}`} style={w == null ? { flex: '0 0 6px' } : { width: `${w}%` }}/>); })}
    </div>
    </div>);
}
// Potential bar on a shared OVR scale: green = growth so far, purple = room
// left, dark green = growth beyond the potential
function PotBar({ p, lo, hi }) {
    const x = (v) => `${((v - lo) / Math.max(1, hi - lo)) * 100}%`;
    const s = startOvr(p), o = p.ovr, pot = p.potential;
    const greenTo = pot != null ? Math.min(o, pot) : o;
    const hv = useHover();
    const rem = remainingPot(p);
    return (<div className="relative h-3.5 w-full rounded bg-slate-100" {...hv({ title: p.name, rows: [['OVR', `${s} → ${o}`], ['Growth so far', `${o - s > 0 ? '+' : ''}${o - s}`], ['Potential', pot != null ? `${pot}${p.potentialImplied ? ' (implied)' : ''}` : '–'], ['Remaining', rem == null || rem === 0 ? '–' : rem > 0 ? `+${rem} above` : `${-rem} to go`]] })}>
        {greenTo > s && <div className="absolute inset-y-0 bg-emerald-500 rounded-l" style={{ left: x(s), width: `calc(${x(greenTo)} - ${x(s)})` }}/>}
        {pot != null && o > pot && <div className="absolute inset-y-0 bg-emerald-800" style={{ left: x(pot), width: `calc(${x(o)} - ${x(pot)})` }}/>}
        {pot != null && pot > o && <div className="absolute inset-y-0 bg-violet-400/80 rounded-r" style={{ left: x(o), width: `calc(${x(pot)} - ${x(o)})` }}/>}
        {pot != null && <div className="absolute -inset-y-0.5 w-0.5 bg-violet-700" style={{ left: x(pot) }}/>}
    </div>);
}
// Hover content for one season of growth: season + years, age, change, stats
const seasonYears = (squad, s) => (squad && squad.s1Year ? `${squad.s1Year + s - 1}–${String(squad.s1Year + s).slice(2)}` : '');
const growthTip = (squad, p) => (x) => ({
    title: `S${x.s}${seasonYears(squad, x.s) ? ` · ${seasonYears(squad, x.s)}` : ''}`,
    // Goalkeepers: clean sheets take the place of goals
    rows: [['Age', x.age ?? '–'], ['OVR', <><OvrNum v={x.start} dark/> → <OvrNum v={x.end} dark/> (<Delta v={x.change}/>)</>], ['Apps', x.app ?? '–'],
        p.pos === 'GK' ? ['Clean sheets', x.cs ?? '–'] : ['Goals', x.g ?? '–'], ['Assists', x.a ?? '–']],
    note: [x.app, p.pos === 'GK' ? x.cs : x.g, x.a].every(v => v == null) ? 'Stats for this season aren\'t recorded yet.' : null,
});
// Potential filters (shared by Growth and Potential)
const potMatch = (p, f) => {
    const lastCh = (() => { const s = [...p.seasons].reverse().find(x => x.change != null); return s ? s.change : 0; })();
    const atPeak = p.potential != null && p.ovr >= p.potential;
    if (f === 'growing') return p.potential != null && p.ovr < p.potential;
    if (f === 'peaked') return atPeak;
    if (f === 'declining') return lastCh < 0 && (atPeak || NO_GROWTH_TAGS.includes(p.dev));
    return true;
};
const potSorter = (k) => (a, b) => (k === 'high' ? (b.potential || 0) - (a.potential || 0) : k === 'low' ? (a.potential || 999) - (b.potential || 999)
    : k === 'tag' ? (POT_TAG_ORDER.indexOf(a.dev) + 1 || 99) - (POT_TAG_ORDER.indexOf(b.dev) + 1 || 99) || (b.potential || 0) - (a.potential || 0)
        : (remainingPot(a) ?? 99) - (remainingPot(b) ?? 99));
const bestSeason = (p) => { const b = p.seasons.filter(x => x.change != null && x.change > 0).sort((a, c) => c.change - a.change)[0]; return b ? `+${b.change} in S${b.s}` : '–'; };
// dark: inside hover cards, using the dark-background OVR scale
function OvrNum({ v, cls = '', dark = false }) {
    return <span className={`font-black tabular-nums ${cls}`} style={{ color: dark ? darkOvrColor(v) : ovrColor(v) }}>{v ?? '–'}</span>;
}
// A change in a hover card: green up, red down (invert: up is bad, e.g. cost over fair)
function Delta({ v, fmt = (x) => `${x > 0 ? '+' : ''}${x}`, invert = false }) {
    const sc = DARK_SCALE;
    if (v == null) return <span>–</span>;
    const good = invert ? v < 0 : v > 0;
    return <span className="font-bold tabular-nums" style={{ color: v === 0 ? undefined : good ? sc.up : sc.down }}>{fmt(v)}</span>;
}

// ─── DEVELOPMENT ─────────────────────────────────────────────────────
const DEV_VIEWS = [
    { value: 'growth', label: 'Growth' }, { value: 'potential', label: 'Potential' }, { value: 'value', label: 'Value' },
    { value: 'heatmap', label: 'Heatmap' }, { value: 'age', label: 'Growth by age' }, { value: 'teams', label: 'Teams' },
];
// ─── GROWTH BY AGE (v49.2 rebuild, after Pyramid's Progression chart) ──
// Every line thin and grey; up to 5 in colour with a name + OVR label at
// their last point (default: the 5 highest current OVRs; click lines to
// pick your own). Dashed line = average OVR at each age. Former players sit
// faint in the background. Drawn at real pixel size so text matches the page.
const PIN_COLORS = ['#7c3aed', '#2563eb', '#d97706', '#0d9488', '#7c3aed'];
const MAX_AGE_PINS = PIN_COLORS.length;
function GrowthByAge({ squad, players, ageGroup, route, team = 'all', withFormer, onOpen }) {
    const hv = useHover();
    const [pins, setPins] = useState([]);
    const [hover, setHover] = useState(null);
    const [box, width] = useWidth(1000);
    const phone = useScreen() === 'phone';
    // v27 (option A, as Pyramid's Compact): on touch screens, tap the chart to scrub (follows the nearest point;
    // the bar above shows the player); pin from the bar or the Pick players list. Mouse: hover + click as before.
    const touchScreen = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(hover: none)').matches;
    const [scrubOn, setScrubOn] = useState(false);
    const [scrubPt, setScrubPt] = useState(null); // { d, pt }
    const [picker, setPicker] = useState(false);
    const [pickQ, setPickQ] = useState(''); // v29: search inside Pick players
    const [cleared, setCleared] = useState(false); // v29: Clear leaves no players selected
    const tStart = useRef(null);
    // v32: a finished tap elsewhere (iPhone sends no click for blank space), a scroll or another overlay ends it
    useTouchCard(scrubOn, () => { setScrubOn(false); setScrubPt(null); setHover(null); }, { keep: '[data-gba-chart], [data-gba-bar]' });
    const teamTest = (TEAM_GROUPS.find(g => g.value === team) || TEAM_GROUPS[0]).test;
    const ok = (p) => (ageGroup === 'all' || groupOf(p.pos) === ageGroup) && (route === 'all' || routeOf(p) === route) && (team === 'all' || teamTest(p));
    const pts = (p) => p.seasons.filter(x => x.end != null && x.age != null).map(x => ({ x: x.age, y: x.end, s: x.s }));
    const cur = players.filter(ok).map(p => ({ p, pts: pts(p), former: false })).filter(d => d.pts.length);
    const old = withFormer ? squad.former.filter(ok).map(p => ({ p, pts: pts(p), former: true })).filter(d => d.pts.length) : [];
    const lines = [...old, ...cur];
    const allPts = lines.flatMap(d => d.pts);
    if (!allPts.length) return <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-400">No players match.</div>;
    // In colour: pinned players, else the 5 highest current OVRs (ties: younger)
    const shownIds = new Set(lines.map(d => d.p.id));
    const pinned = pins.filter(id => shownIds.has(id));
    const colourIds = pinned.length ? pinned : cleared ? [] : [...cur].sort((a, b) => (b.p.ovr || 0) - (a.p.ovr || 0) || (a.p.age ?? 99) - (b.p.age ?? 99)).slice(0, MAX_AGE_PINS).map(d => d.p.id);
    const colourOf = (id) => { const i = colourIds.indexOf(id); return i < 0 ? null : PIN_COLORS[i]; };
    const togglePin = (id) => setPins(cs => { const base = cs.filter(x => shownIds.has(x)); return base.includes(id) ? base.filter(x => x !== id) : base.length >= MAX_AGE_PINS ? [...base.slice(1), id] : [...base, id]; });
    // Average OVR at each age (ages with 3+ players), over every line shown
    const byAge = {};
    allPts.forEach(d => { (byAge[d.x] = byAge[d.x] || []).push(d.y); });
    const avgPts = Object.keys(byAge).map(Number).sort((a, b) => a - b).filter(a => byAge[a].length >= 3).map(a => ({ x: a, y: byAge[a].reduce((t, v) => t + v, 0) / byAge[a].length, n: byAge[a].length }));
    // Phones: no minimum width and no end labels (the tray names the coloured lines)
    const W = Math.max(phone ? 260 : 520, width), H = phone ? 340 : 420, m = { l: 40, r: phone ? 12 : 150, t: 14, b: 34 };
    const xLo = Math.min(...allPts.map(d => d.x)), xHi = Math.max(...allPts.map(d => d.x));
    const yLo = Math.floor((Math.min(...allPts.map(d => d.y)) - 1) / 5) * 5, yHi = Math.min(100, Math.ceil((Math.max(...allPts.map(d => d.y)) + 1) / 5) * 5);
    const X = (v) => m.l + (xHi === xLo ? 0.5 : (v - xLo) / (xHi - xLo)) * (W - m.l - m.r), Y = (v) => m.t + (1 - (v - yLo) / (yHi - yLo)) * (H - m.t - m.b);
    const path = (ps) => ps.map((d, i) => `${i ? 'L' : 'M'}${X(d.x).toFixed(1)},${Y(d.y).toFixed(1)}`).join(' ');
    // End labels for the coloured lines, nudged apart so they never overlap
    // The average's label joins the nudging, so it never sits on a name
    const avgEnd = avgPts[avgPts.length - 1];
    const labels = phone ? [] : [...lines.filter(d => colourOf(d.p.id)).map(d => { const last = d.pts[d.pts.length - 1]; return { d, x: X(last.x) + 7, y: Y(last.y), color: colourOf(d.p.id) }; }),
        ...(avgPts.length > 1 ? [{ avg: true, x: X(avgEnd.x) + 7, y: Y(avgEnd.y), color: '#475569' }] : [])].sort((a, b) => a.y - b.y);
    for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 14) labels[i].y = labels[i - 1].y + 14;
    const tip = (d) => ({ title: `${d.p.name} · ${d.p.pos}${d.former ? ' (former)' : ''}`, rows: d.pts.map(x => [`Age ${x.x} · S${x.s}`, <OvrNum v={x.y} dark/>]), note: pinned.includes(d.p.id) ? 'Click to unpin' : 'Click to show in colour', action: { label: pinned.includes(d.p.id) ? 'Unpin' : 'Show in colour', run: () => togglePin(d.p.id) } });
    // Touch scrubbing: nearest point to the finger
    const scrubPick = (clientX, clientY) => {
        const el = box.current;
        if (!el) return;
        const rc = el.getBoundingClientRect();
        const cx = clientX - rc.left, cy = clientY - rc.top;
        let best = null, bd = Infinity;
        lines.forEach(d => d.pts.forEach(pt => { const dx = X(pt.x) - cx, dy = Y(pt.y) - cy, q = dx * dx + dy * dy; if (q < bd) { bd = q; best = { d, pt }; } }));
        if (!best) return;
        setScrubPt(best); setHover(best.d.p.id);
    };
    const scrubProps = touchScreen ? {
        'data-gba-chart': '',
        style: { touchAction: scrubOn ? 'none' : 'pan-y' },
        onPointerDown: (e) => { tStart.current = { x: e.clientX, y: e.clientY }; if (scrubOn) scrubPick(e.clientX, e.clientY); },
        onPointerMove: (e) => { if (scrubOn) scrubPick(e.clientX, e.clientY); },
        onPointerUp: (e) => { const st = tStart.current; tStart.current = null; if (!scrubOn && st && Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y) < 12) { setScrubOn(true); scrubPick(e.clientX, e.clientY); } },
    } : {};
    const groupsOrder = Object.keys(POS_GROUPS);
    const lineEl = (d) => {
        const col = colourOf(d.p.id), isH = hover === d.p.id, dim = hover != null && !isH;
        const stroke = col || (isH ? '#334155' : d.former ? '#e2e8f0' : '#cbd5e1');
        return (<g key={d.p.id} className="cursor-pointer" {...(touchScreen ? {} : { onClick: () => togglePin(d.p.id), onMouseEnter: () => setHover(d.p.id), onMouseLeave: () => setHover(null), ...hv(tip(d)) })}>
            <path d={path(d.pts)} fill="none" stroke="transparent" strokeWidth="10"/>
            <path d={path(d.pts)} fill="none" stroke={stroke} strokeWidth={col || isH ? (isH ? 3 : 2.25) : d.former ? 1 : 1.5} strokeDasharray={d.former && !col ? '3 3' : undefined} strokeLinecap="round" strokeLinejoin="round" opacity={dim ? 0.3 : 1}/>
            {(col || isH) && d.pts.map((x, i) => <circle key={i} cx={X(x.x)} cy={Y(x.y)} r={i === d.pts.length - 1 ? 3.5 : 2.5} fill={i === d.pts.length - 1 ? stroke : '#fff'} stroke={stroke} strokeWidth="1.5" opacity={dim ? 0.3 : 1}/>)}
        </g>);
    };
    const greyFirst = [...lines].sort((a, b) => (colourOf(a.p.id) ? 1 : 0) - (colourOf(b.p.id) ? 1 : 0) || (a.p.id === hover) - (b.p.id === hover));
    const lastAvg = avgPts[avgPts.length - 1];
    return (<div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
    {/* Touch screens: the player under your finger (fixed height, so nothing moves) */}
    {touchScreen && (<div data-gba-bar="" className="h-[60px] px-3 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-2">
        {scrubPt ? (<>
        <div className="min-w-0 flex-1">
        <div className="text-[13px] font-extrabold text-slate-900 truncate">{scrubPt.d.p.name} <span className="text-[11px] font-bold text-slate-500">{scrubPt.d.p.pos}{scrubPt.d.former ? ' · former' : ''}</span></div>
        <div className="text-xs text-slate-600">Age <strong className="text-slate-900">{scrubPt.pt.x}</strong> · S{scrubPt.pt.s} · OVR <OvrNum v={scrubPt.pt.y}/></div>
        </div>
        <button type="button" aria-label="View profile" onClick={() => onOpen(scrubPt.d.p)} className="w-8 h-8 inline-flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-800"><Eye className="w-4 h-4"/></button>
        <button type="button" aria-label={pinned.includes(scrubPt.d.p.id) ? 'Unpin player' : 'Pin player'} onClick={() => togglePin(scrubPt.d.p.id)} className={`w-8 h-8 inline-flex items-center justify-center border rounded-lg ${pinned.includes(scrubPt.d.p.id) ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}><Pin className="w-4 h-4"/></button>
        <button type="button" aria-label="Stop" onClick={() => { setScrubOn(false); setScrubPt(null); setHover(null); }} className="p-1 text-slate-500"><CloseIcon className="w-4 h-4"/></button>
        </>) : (<span className="text-xs font-semibold text-slate-500">Tap the chart to scrub. Tap outside to stop.</span>)}
    </div>)}
    {/* Tray: who is in colour */}
    <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
        <span className="text-[11px] font-bold text-slate-500">{pinned.length ? 'Picked:' : cleared ? 'No players selected.' : `Top ${colourIds.length} by OVR:`}</span>
        {colourIds.map(id => { const d = lines.find(l => l.p.id === id); return d ? (<span key={id} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 pl-2 pr-1 py-0.5 text-[12px]">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colourOf(id) }}/>
            <button type="button" className="font-bold text-slate-800 hover:underline" onClick={() => onOpen(d.p)}>{d.p.name}</button>
            <OvrNum v={d.p.ovr}/>
            {pinned.length > 0 && <button type="button" className="text-slate-400 hover:text-slate-700 px-1" onClick={() => togglePin(id)} title="Unpin">×</button>}
        </span>) : null; })}
        {colourIds.length > 0 && <button type="button" onClick={() => { setPins([]); setCleared(true); }} className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-700 hover:bg-slate-50">Clear</button>}
        {pinned.length === 0 && <span className="text-[11px] text-slate-400">{touchScreen ? `Pin from the bar above, or pick (up to ${MAX_AGE_PINS}).` : `Click lines to pick your own (up to ${MAX_AGE_PINS}).`}</span>}
        <button type="button" onClick={() => setPicker(v => !v)} aria-expanded={picker} className="ml-auto h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-700 hover:bg-slate-50">{picker ? 'Hide list' : 'Pick players'}</button>
    </div>
    {/* Pick players: grouped by position; tap to pin (up to the limit; the oldest drops off) */}
    {picker && (<div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 space-y-2 max-h-[45vh] overflow-y-auto">
        <SearchInput accent="maroon" className="w-full" value={pickQ} onChange={setPickQ} placeholder="Search player..."/>
        {groupsOrder.map(gk => { const gl = lines.filter(d => groupOf(d.p.pos) === gk && (!pickQ || d.p.name.toLowerCase().includes(pickQ.toLowerCase()))).sort((a, b) => (a.former - b.former) || (b.p.ovr || 0) - (a.p.ovr || 0)); return gl.length ? (<div key={gk}>
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">{gk}</div>
        <div className="flex flex-wrap gap-1.5">{gl.map(d => { const col = pinned.includes(d.p.id) ? colourOf(d.p.id) : null; return (<button key={d.p.id} type="button" onClick={() => togglePin(d.p.id)}
            className={`inline-flex items-center gap-1.5 h-8 px-2 rounded-full border text-[12px] ${col ? 'bg-white border-slate-400 font-bold' : 'bg-white border-slate-200'} ${d.former ? 'text-slate-500' : 'text-slate-800'}`}>
            {col && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }}/>}{d.p.name}<OvrNum v={d.p.ovr}/></button>); })}</div>
        </div>) : null; })}
    </div>)}
    <div ref={box} className={`w-full rounded-lg ${scrubOn ? 'ring-2 ring-rose-800/40' : ''}`} {...scrubProps}>
    <svg width={W} height={H} className="block font-sans overflow-visible">
        {Array.from({ length: xHi - xLo + 1 }, (_, i) => xLo + i).map(a => <g key={a}><line x1={X(a)} x2={X(a)} y1={m.t} y2={H - m.b} stroke="#f1f5f9"/><text x={X(a)} y={H - m.b + 16} textAnchor="middle" fontSize="11" fill="#64748b">{a}</text></g>)}
        {Array.from({ length: (yHi - yLo) / 5 + 1 }, (_, i) => yLo + i * 5).map(o => <g key={o}><line x1={m.l} x2={W - m.r} y1={Y(o)} y2={Y(o)} stroke="#f1f5f9"/><text x={m.l - 8} y={Y(o)} dy="0.35em" textAnchor="end" fontSize="11" fill="#64748b">{o}</text></g>)}
        <text x={(W - m.r + m.l) / 2} y={H - 3} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">Age</text>
        <text x={10} y={(H - m.b) / 2} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8" transform={`rotate(-90 10 ${(H - m.b) / 2})`}>OVR</text>
        {greyFirst.map(lineEl)}
        {avgPts.length > 1 && (<g pointerEvents="none">
            <path d={path(avgPts)} fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" opacity={hover != null ? 0.4 : 0.9}/>
        </g>)}
        {labels.map(l => (l.avg ? <text key="avg" x={l.x} y={l.y} dy="0.35em" fontSize="11" fontWeight="600" fill={l.color} pointerEvents="none">Average {avgEnd.y.toFixed(1)}</text>
            : <text key={l.d.p.id} x={l.x} y={l.y} dy="0.35em" fontSize="11" fontWeight="700" fill={l.color} className="cursor-pointer" onClick={() => onOpen(l.d.p)} opacity={hover != null && hover !== l.d.p.id ? 0.4 : 1}>{l.d.p.name} {l.d.p.ovr}</text>))}
    </svg>
    </div>
    <p className="text-[11px] text-slate-500">One line per player: his OVR at the end of each season, by his age that season (lines start when he joined). Dashed: the average OVR at each age{withFormer ? ', former players included' : ''}. Hover for details; click a line to show it in colour; click a name to open the player.</p>
    </div>);
}
function DevelopmentTab({ squad, onOpen }) {
    const [view, setView] = useState('growth');
    const [sqMetric, setSqMetric] = useState('ovr'); // v27: Squad OVR By Season metric
    const devPhone = useScreen() === 'phone';
    const [gbaTeam, setGbaTeam] = useState('all'); // v29: Growth By Age team filter
    const [season, setSeason] = useState('all');
    const [potSort, setPotSort] = useState('remaining');
    const [potFilter, setPotFilter] = useState('all');
    const [heatGroup, setHeatGroup] = useState('pos');
    const [ageGroup, setAgeGroup] = useState('all');
    const [route, setRoute] = useState('all');
    const [withFormer, setWithFormer] = useState(false);
    const [growSort, setGrowSort] = useState('net');
    const [growFilter, setGrowFilter] = useState('all');
    const hv = useHover();
    const players = squad.current;
    const seasons = squad.seasons;
    const allTime = season === 'all';
    const periodLabel = allTime ? 'all time' : `S${season}`;
    // OVR changes in the chosen period (each season at the club, or one)
    const segsOf = (p) => p.seasons.filter(x => x.change != null && (allTime || String(x.s) === season));
    const growthAll = players.map(p => { const segs = segsOf(p); if (!segs.length) return null; const start = segs[0].start, end = segs[segs.length - 1].end; return { p, segs, start, end, net: end - start }; })
        .filter(Boolean).sort((a, b) => b.net - a.net || (b.p.ovr || 0) - (a.p.ovr || 0));
    const growth = growthAll.filter(g => potMatch(g.p, growFilter)).sort((a, b) => (growSort === 'net' ? b.net - a.net || (b.p.ovr || 0) - (a.p.ovr || 0) : potSorter(growSort)(a.p, b.p)));
    const gScale = Math.max(1, ...growth.map(g => g.segs.reduce((a, x) => a + Math.abs(x.change), 0)));
    // Value changes in the chosen period ($ M between consecutive season ends)
    const vsegsOf = (p) => { const out = []; p.seasons.forEach((x, i) => { const prev = p.seasons[i - 1]; if (x.value != null && prev && prev.value != null && (allTime || String(x.s) === season)) out.push({ s: x.s, age: x.age, change: Math.round((x.value - prev.value) * 10) / 10, from: prev.value, to: x.value }); }); return out; };
    const vgrowth = players.map(p => { const segs = vsegsOf(p); if (!segs.length) return null; const from = segs[0].from, to = segs[segs.length - 1].to; return { p, segs, from, to, net: to - from, pct: from ? (to - from) / from : null }; })
        .filter(Boolean).sort((a, b) => b.net - a.net);
    const vScale = Math.max(1, ...vgrowth.map(g => g.segs.reduce((a, x) => a + Math.abs(x.change), 0)));
    // Highlights
    const top = growthAll[0], vTop = vgrowth[0];
    // Value table: each column keeps its own decimals, lined up on the point
    const vCol = moneyCol(vgrowth.flatMap(x => [x.from, x.to])), vNet = moneyCol(vgrowth.map(x => x.net));
    const avgChange = growthAll.length ? growthAll.reduce((a, g) => a + g.net, 0) / growthAll.length : 0;
    const withPot = players.filter(p => p.potential != null && p.ovr != null);
    const peaked = withPot.filter(p => p.ovr >= p.potential).length;
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label={`Biggest grower (${periodLabel})`} icon={TrendingUp} iconClassName="text-emerald-300" value={top ? top.p.name : '–'} valueClassName="text-lg sm:text-xl font-black text-emerald-200 truncate" left={top ? `${top.start} → ${top.end} (▲ ${top.net})` : ''} right=""/>
    <HighlightCard label={`Average OVR change (${periodLabel})`} icon={Star} iconClassName="text-amber-300" value={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(1)}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={`${growthAll.length} players`} right=""/>
    <HighlightCard label={`Biggest value rise (${periodLabel})`} icon={Sparkles} iconClassName="text-sky-300" value={vTop ? vTop.p.name : '–'} valueClassName="text-lg sm:text-xl font-black text-sky-200 truncate" left={vTop ? ((f) => `${f(vTop.from)} → ${f(vTop.to)}`)(moneySet([vTop.from, vTop.to])) : ''} right=""/>
    <HighlightCard label="At or above potential" icon={Shield} iconClassName="text-rose-300" value={peaked} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left={`of ${withPot.length} with a potential`} right=""/>
    </HighlightsBar>
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={List}>View</ControlLabel>
    <Segmented value={view} onChange={setView} options={DEV_VIEWS}/></div>
    {(view === 'growth' || view === 'value') && (<div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Calendar}>Season</ControlLabel>
    <FilterPills accent="maroon" value={season} onChange={setSeason} options={[{ value: 'all', label: 'All time' }, ...seasons.map(s => ({ value: String(s), label: `S${s}` }))]}/></div>)}
    {view === 'growth' && (<><div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>Show</ControlLabel>
    <Segmented value={growFilter} onChange={setGrowFilter} options={[{ value: 'all', label: 'All' }, { value: 'growing', label: 'Growing' }, { value: 'peaked', label: 'Peaked' }, { value: 'declining', label: 'Declining' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={List}>Sort</ControlLabel>
    <Segmented value={growSort} onChange={setGrowSort} options={[{ value: 'net', label: 'Net growth' }, { value: 'high', label: 'Highest potential' }, { value: 'low', label: 'Lowest' }, { value: 'remaining', label: 'Remaining' }, { value: 'tag', label: 'Tag' }]}/></div></>)}
    {view === 'potential' && (<><div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>Show</ControlLabel>
    <Segmented value={potFilter} onChange={setPotFilter} options={[{ value: 'all', label: 'All' }, { value: 'growing', label: 'Growing' }, { value: 'peaked', label: 'Peaked' }, { value: 'declining', label: 'Declining' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={List}>Sort</ControlLabel>
    <Segmented value={potSort} onChange={setPotSort} options={[{ value: 'high', label: 'Highest' }, { value: 'low', label: 'Lowest' }, { value: 'remaining', label: 'Remaining' }, { value: 'tag', label: 'Tag' }]}/></div></>)}
    {view === 'heatmap' && (<div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>Group by</ControlLabel>
    <Segmented value={heatGroup} onChange={setHeatGroup} options={[{ value: 'pos', label: 'Position' }, { value: 'team', label: 'Team' }]}/></div>)}
    {view === 'age' && (<><div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>Position</ControlLabel>
    <Segmented value={ageGroup} onChange={setAgeGroup} options={[{ value: 'all', label: 'All' }, { value: 'GK', label: 'GK' }, { value: 'DEF', label: 'DEF' }, { value: 'MID', label: 'MID' }, { value: 'ATT', label: 'ATT' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>Route</ControlLabel>
    <Segmented value={route} onChange={setRoute} options={[{ value: 'all', label: 'All' }, { value: 'academy', label: '🎓 Academy' }, { value: 'transfer', label: 'Transfer' }, { value: 'free', label: '🖊️ Free' }, { value: 'legacy', label: '📜 Legacy' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Users}>Team</ControlLabel>
    <Segmented value={gbaTeam} onChange={setGbaTeam} options={[{ value: 'all', label: 'All' }, { value: '1', label: '❶' }, { value: '2', label: '❷' }, { value: '3', label: '❸' }, { value: 'loan', label: 'On loan' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Clock}>Former players</ControlLabel>
    <Segmented value={withFormer ? 'yes' : 'no'} onChange={(v) => setWithFormer(v === 'yes')} options={[{ value: 'no', label: 'Off' }, { value: 'yes', label: 'On' }]}/></div></>)}
    </div>
    {view === 'growth' && (<div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
    <table className="w-full text-xs"><thead><tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60 text-left whitespace-nowrap">
    <th className="py-2 px-2 pl-3">Pos</th><th className="py-2 px-2">Player</th><th className="py-2 px-2 text-center">Ft</th><th className="py-2 px-2 text-center">Age</th><th className="py-2 px-2 text-center">Seasons</th><th className="py-2 px-2 text-center">OVR</th><th className="py-2 px-2 w-[40%]">{allTime ? 'Growth, season by season' : `Growth in S${season}`}</th><th className="py-2 px-2 text-right">Net</th><th className="py-2 px-2 pr-3 text-right">Best season</th>
    </tr></thead><tbody className="divide-y divide-slate-100">
        {growth.map(({ p, segs, start, end, net }) => (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:bg-rose-50/40">
        <td className="py-1.5 px-2 pl-3"><PosCell p={p}/></td><td className="py-1.5 px-2"><NameCell p={p}/></td>
        <td className="py-1.5 px-2 text-center font-bold text-slate-500">{p.foot}</td><td className="py-1.5 px-2 text-center tabular-nums">{p.age}</td>
        <td className="py-1.5 px-2 text-center tabular-nums text-slate-600">{p.tenure && p.tenure.years != null ? p.tenure.years : p.seasons.length}</td>
        <td className="py-1.5 px-2 text-center whitespace-nowrap"><OvrNum v={start}/><span className="text-slate-300"> → </span><OvrNum v={end}/></td>
        <td className="py-1.5 px-2"><SegBar segs={segs} scale={gScale} tip={growthTip(squad, p)}/></td>
        <td className={`py-1.5 px-2 text-right font-black tabular-nums ${net > 0 ? 'text-emerald-700' : net < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{net > 0 ? `▲${net}` : net < 0 ? `▼${-net}` : '–'}</td>
        <td className="py-1.5 px-2 pr-3 text-right tabular-nums font-semibold text-slate-600 whitespace-nowrap">{bestSeason(p)}</td>
        </tr>))}
    </tbody></table>
    {!growth.length && <div className="p-6 text-center text-xs text-slate-400">No OVR changes recorded for {periodLabel}.</div>}
    </div>)}
    {view === 'potential' && (() => {
        const list = players.filter(p => p.ovr != null).filter(p => potMatch(p, potFilter)).sort(potSorter(potSort));
        const lo = Math.floor((Math.min(...list.map(startOvr), 99) - 2) / 5) * 5, hi = Math.min(99, Math.max(...list.map(p => Math.max(p.ovr, p.potential || 0)), 60) + 1);
        return (<div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <div className="flex flex-wrap gap-4 px-3 pt-3 text-[11px] font-semibold text-slate-600"><span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500"/>Growth so far</span><span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-violet-400"/>Room to potential</span><span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-800"/>Beyond potential</span><span className="text-slate-400">Italic potential = implied by the tag</span></div>
        <table className="w-full text-xs mt-2"><thead><tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60 text-left whitespace-nowrap">
        <th className="py-2 px-2 pl-3">Pos</th><th className="py-2 px-2">Player</th><th className="py-2 px-2 text-center">Ft</th><th className="py-2 px-2 text-center">Age</th><th className="py-2 px-2 text-center">OVR</th><th className="py-2 px-2 text-center">Growth</th><th className="py-2 px-2">Potential</th><th className="py-2 px-2 w-[38%]">{lo} → {hi}</th><th className="py-2 px-2 pr-3 text-right">Remaining</th>
        </tr></thead><tbody className="divide-y divide-slate-100">
            {list.map(p => { const rem = remainingPot(p); return (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:bg-rose-50/40">
            <td className="py-1.5 px-2 pl-3"><PosCell p={p}/></td><td className="py-1.5 px-2"><NameCell p={p}/></td>
            <td className="py-1.5 px-2 text-center font-bold text-slate-500">{p.foot}</td><td className="py-1.5 px-2 text-center tabular-nums">{p.age}</td>
            <td className="py-1.5 px-2 text-center whitespace-nowrap"><OvrNum v={startOvr(p)}/><span className="text-slate-300"> → </span><OvrNum v={p.ovr}/></td>
            <td className={`py-1.5 px-2 text-center font-black tabular-nums ${p.ovr - startOvr(p) > 0 ? 'text-emerald-700' : p.ovr - startOvr(p) < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{p.ovr - startOvr(p) > 0 ? `▲${p.ovr - startOvr(p)}` : p.ovr - startOvr(p) < 0 ? `▼${startOvr(p) - p.ovr}` : '–'}</td>
            <td className="py-1.5 px-2"><span className="inline-flex items-center gap-2.5"><span className={`w-6 text-right font-black tabular-nums ${p.potentialImplied ? 'italic opacity-60' : ''}`} style={{ color: ovrColor(p.potential) }}>{p.potential ?? '–'}</span><DevText code={p.dev}/></span></td>
            <td className="py-1.5 px-2 min-w-[180px] sm:min-w-0"><PotBar p={p} lo={lo} hi={hi}/></td>
            <td className={`py-1.5 px-2 pr-3 text-right font-black tabular-nums ${rem == null || rem === 0 ? 'text-slate-400' : rem < 0 ? 'text-violet-700' : 'text-emerald-800'}`}>{rem == null || rem === 0 ? '–' : rem > 0 ? `+${rem}` : `−${-rem}`}</td>
            </tr>); })}
        </tbody></table>
        {!list.length && <div className="p-6 text-center text-xs text-slate-400">No players match.</div>}
        </div>); })()}
    {view === 'value' && (<div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
    <table className="w-full text-xs"><thead><tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60 text-left whitespace-nowrap">
    <th className="py-2 px-2 pl-3">Pos</th><th className="py-2 px-2">Player</th><th className="py-2 px-2 text-center">Age</th><th className="py-2 px-2 text-right">Value</th><th className="py-2 px-2 w-[40%]">{allTime ? 'Value change, season by season' : `Value change in S${season}`}</th><th className="py-2 px-2 text-right">Net</th><th className="py-2 px-2 pr-3 text-right">%</th>
    </tr></thead><tbody className="divide-y divide-slate-100">
        {vgrowth.map(({ p, segs, from, to, net, pct }) => (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:bg-rose-50/40">
        <td className="py-1.5 px-2 pl-3"><PosCell p={p}/></td><td className="py-1.5 px-2"><NameCell p={p}/></td><td className="py-1.5 px-2 text-center tabular-nums">{p.age}</td>
        <td className="py-1.5 px-2 text-right whitespace-nowrap tabular-nums text-slate-600">{vCol(from)} → <strong className="text-slate-900">{vCol(to)}</strong></td>
        <td className="py-1.5 px-2"><SegBar segs={segs} scale={vScale} tip={(x) => ({ title: `S${x.s}${seasonYears(squad, x.s) ? ` · ${seasonYears(squad, x.s)}` : ''}`, rows: [['Age', x.age ?? '–'], ['Value', ((f) => `${f(x.from)} → ${f(x.to)}`)(moneySet([x.from, x.to]))], ['Change', <Delta v={x.change} fmt={(v) => money(v, true)}/>]] })}/></td>
        <td className={`py-1.5 px-2 text-right font-black tabular-nums whitespace-nowrap ${net > 0 ? 'text-emerald-700' : net < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{vNet(net, true)}</td>
        <td className={`py-1.5 px-2 pr-3 text-right tabular-nums ${pct > 0 ? 'text-emerald-700' : pct < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{pct == null ? '' : `${pct > 0 ? '+' : ''}${Math.round(pct * 100)}%`}</td>
        </tr>))}
    </tbody></table>
    {!vgrowth.length && <div className="p-6 text-center text-xs text-slate-400">No value changes recorded for {periodLabel} (a player's first season at the club has no earlier value to compare).</div>}
    </div>)}
    {view === 'heatmap' && (() => {
        const groups = heatGroup === 'pos'
            ? ['GK', 'DEF', 'MID', 'ATT'].map(g => ({ label: { GK: 'Goalkeepers', DEF: 'Defence', MID: 'Midfield', ATT: 'Attack' }[g], ps: players.filter(p => groupOf(p.pos) === g) }))
            : TEAM_GROUPS.slice(1).map(g => ({ label: g.label, ps: players.filter(g.test) }));
        // Companion chart: the squad each season (everyone at the club that season,
        // former players included) split by OVR band; "Now" = today's squad
        const bandIdx = (v) => { const i = OVR_BANDS.findIndex(([min]) => v >= min); return i < 0 ? OVR_BANDS.length - 1 : i; };
        const BAND_NAMES = ['95+', '90–94', '80s', '70s', '60s', '50s', '40s'];
        const everyone = [...squad.current, ...squad.former];
        // v27: a Legacy column (the squad at the start of the save: legacy players, S1 starting OVR)
        const firstS = seasons[0];
        const legacyRecs = everyone.filter(p => routeOf(p) === 'legacy').map(p => p.seasons.find(y => y.s === firstS && y.start != null)).filter(Boolean);
        const recsOf = (s) => everyone.map(p => p.seasons.find(y => y.s === s && y.end != null)).filter(Boolean);
        const cols = [
            ...(legacyRecs.length ? [{ key: 'Legacy', s: null, legacy: true, items: legacyRecs.map(x => ({ ovr: x.start, age: x.age, value: null })) }] : []),
            ...seasons.map(s => ({ key: `S${s}`, s, items: recsOf(s).map(x => ({ ovr: x.end, age: x.age, value: x.value })) })),
            { key: 'Now', s: null, items: squad.current.filter(p => p.ovr != null).map(p => ({ ovr: p.ovr, age: p.age, value: p.value })) }];
        const mean = (xs) => (xs.length ? xs.reduce((t, v) => t + v, 0) / xs.length : null);
        cols.forEach(c => {
            c.ovrs = c.items.map(x => x.ovr).filter(v => v != null);
            c.bands = OVR_BANDS.map(() => 0); c.ovrs.forEach(v => { c.bands[bandIdx(v)] += 1; });
            c.avg = mean(c.ovrs);
            const ages = c.items.map(x => x.age).filter(v => v != null), vals = c.items.map(x => x.value).filter(v => v != null);
            c.m = { ovr: c.avg, age: mean(ages), value: c.legacy || !vals.length ? null : vals.reduce((t, v) => t + Number(v), 0), number: c.items.length };
        });
        const BASE = { ovr: 50, age: 15, value: 0, number: 0 };
        const topOf = Math.max(BASE[sqMetric] + 1, ...cols.map(c => c.m[sqMetric] ?? 0));
        const hPct = (c) => (c.m[sqMetric] == null ? 0 : Math.max(0, (c.m[sqMetric] - BASE[sqMetric]) / (topOf - BASE[sqMetric])) * 100);
        const mLabel = (c) => { const v = c.m[sqMetric]; return v == null ? '–' : sqMetric === 'value' ? (devPhone ? money(v).replace(/^\$/, '').replace(/ M$/, '') : money(v)) : sqMetric === 'number' ? String(v) : v.toFixed(1); };
        const usedBands = OVR_BANDS.map((_, i) => i).filter(i => cols.some(c => c.bands[i]));
        return (<div className="grid grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)] gap-5 items-start">
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto p-3">
        <table className="text-xs border-separate border-spacing-[3px]"><thead><tr className="text-slate-500 font-bold">
        <th className="text-left px-2">Player</th><th className="w-8 text-center">Age</th><th className="w-2"/>{seasons.map(s => <th key={s} className="w-14 min-w-[34px] text-center">{s}</th>)}<th className="w-14 min-w-[34px] text-center">Now</th>
        </tr></thead><tbody>
            {groups.map(g => (<React.Fragment key={g.label}>
            <tr><td colSpan={seasons.length + 4} className="pt-3 pb-1 px-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{g.label}</td></tr>
                {[...g.ps].sort((a, b) => POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b.pos) || (b.ovr || 0) - (a.ovr || 0)).map(p => (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:opacity-80">
                <td className="px-2 py-0.5 whitespace-nowrap"><span className="text-[11px] font-black text-slate-400 w-8 inline-block">{p.pos}</span><NameCell p={p}/></td>
                <td className="text-center tabular-nums text-slate-500">{p.age ?? '–'}</td><td/>
                    {seasons.map(s => { const x = p.seasons.find(y => y.s === s && y.end != null); const v = x ? x.end : null; return (<td key={s} className="h-7 min-w-[34px] text-center font-black tabular-nums rounded" {...hv(x ? { title: `${p.name} · S${s}`, action: { label: 'Open profile', run: () => onOpen(p) }, rows: [['Age', x.age ?? '–'], ['OVR', <><OvrNum v={x.start} dark/> → <OvrNum v={x.end} dark/></>], ['Value', money(x.value)]] } : { title: `${p.name} · S${s}`, note: 'Not at the club', action: { label: 'Open profile', run: () => onOpen(p) } })}
                        style={v != null ? { backgroundColor: `${ovrColor(v)}22`, color: ovrColor(v) } : { backgroundColor: '#f8fafc' }}>{v ?? ''}</td>); })}
                <td className="h-7 min-w-[34px] text-center font-black tabular-nums rounded border border-slate-200" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</td>
                </tr>))}
            </React.Fragment>))}
        </tbody></table>
        <p className="text-[11px] text-slate-500 mt-2 px-2">Each cell is his OVR at the end of that season, in the OVR colours. Blank = not at the club yet.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3 xl:sticky" style={{ top: 'calc(var(--gsl-sticky, 120px) + 16px)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-extrabold text-slate-900">Squad By Season{devPhone && sqMetric === 'value' ? <span className="font-semibold text-slate-500"> ($ M)</span> : null}</div>
        <Segmented className="whitespace-nowrap" value={sqMetric} onChange={setSqMetric} options={[{ value: 'ovr', label: 'OVR' }, { value: 'age', label: 'Age' }, { value: 'value', label: 'Value' }, { value: 'number', label: 'Number' }]}/></div>
        <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">{[...usedBands].reverse().map(i => <span key={i} className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: OVR_BANDS[i][1], opacity: 0.8 }}/>{BAND_NAMES[i]}</span>)}</div></div>
        <div className="flex items-end gap-2 h-[380px] pt-2">
            {cols.map(c => (<div key={c.key} className="flex-1 min-w-0 flex flex-col items-center gap-1 h-full justify-end" {...hv({ title: c.s ? `S${c.s}${seasonYears(squad, c.s) ? ` · ${seasonYears(squad, c.s)}` : ''}` : c.key, rows: [['Players', c.items.length], ['Average OVR', c.avg == null ? '–' : <OvrNum v={Math.round(c.avg * 10) / 10} dark/>], ['Average age', c.m.age == null ? '–' : c.m.age.toFixed(1)], ['Squad value', c.m.value == null ? '–' : money(c.m.value)], ...usedBands.filter(i => c.bands[i]).map(i => [BAND_NAMES[i], c.bands[i]])] })}>
            <span className="text-[11px] font-black tabular-nums text-slate-700 whitespace-nowrap">{mLabel(c)}</span>
            <div className="w-full flex flex-col-reverse rounded-t overflow-hidden" style={{ height: `${hPct(c)}%` }}>
                {[...usedBands].reverse().map(i => c.bands[i] ? <div key={i} style={{ flex: c.bands[i], backgroundColor: OVR_BANDS[i][1], opacity: 0.8 }}/> : null)}
            </div>
            <span className={`text-[11px] font-bold ${c.key === 'Now' ? 'text-slate-900' : 'text-slate-500'}`}>{c.key}</span></div>))}
        </div>
        <p className="text-[11px] text-slate-500">Everyone at the club each season (former players included). Bar height = the number on top: {sqMetric === 'ovr' ? 'average OVR (scale from 50)' : sqMetric === 'age' ? 'average age (scale from 15)' : sqMetric === 'value' ? 'total squad value' : 'squad size'}; colours = the OVR-band mix. Legacy = the squad at the start of the save (legacy players; no value recorded then). Now = today's squad.</p>
        </div>
        </div>); })()}
    {view === 'age' && <GrowthByAge squad={squad} players={players} ageGroup={ageGroup} route={route} team={gbaTeam} withFormer={withFormer} onOpen={onOpen}/>}
    {view === 'teams' && (() => {
        const stat = (ps) => {
            const avg = (f) => { const v = ps.map(f).filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
            const bought = ps.filter(p => routeOf(p) !== 'legacy');
            return {
                n: ps.length, age: avg(p => p.age), ovr: avg(p => p.ovr), pot: avg(p => p.potential), value: avg(p => p.value),
                wageTotal: ps.reduce((a, p) => a + (p.wage || 0), 0), wage: avg(p => p.wage),
                fee: bought.length ? bought.reduce((a, p) => a + ((p.joined && p.joined.fee) || 0), 0) / bought.length : null,
                academy: ps.length ? ps.filter(p => routeOf(p) === 'academy').length / ps.length : null,
            };
        };
        const cols = TEAM_GROUPS.map(g => ({ ...g, s: stat(players.filter(g.test)) }));
        const rowSet = (k, unit) => moneySet(cols.map(c => c.s[k]), unit);
        const fV = rowSet('value'), fWT = rowSet('wageTotal', 'K'), fW = rowSet('wage', 'K'), fF = rowSet('fee');
        const rows = [
            ['Players', s => s.n], ['Average age', s => s.age?.toFixed(1)], ['Average OVR', s => s.ovr == null ? '–' : <OvrNum v={Math.round(s.ovr * 10) / 10}/>],
            ['Average potential', s => s.pot == null ? '–' : <OvrNum v={Math.round(s.pot * 10) / 10}/>], ['Average value', s => fV(s.value)],
            ['Weekly wages (total)', s => fWT(s.wageTotal)], ['Weekly wage (average)', s => fW(s.wage)],
            ['Average fee paid', s => (s.fee == null ? '–' : fF(s.fee))], ['From the academy', s => (s.academy == null ? '–' : `${Math.round(s.academy * 100)}%`)],
        ];
        const maxO = Math.max(...cols.map(c => c.s.ovr || 0)), minO = Math.min(...cols.map(c => c.s.ovr || 99)) - 4;
        return (<div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5">
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto"><table className="w-full text-xs"><thead><tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60 whitespace-nowrap">
        <th className="py-2 px-3 text-left">Metric</th>{cols.map(c => <th key={c.value} className="py-2 px-3 text-right">{c.label}</th>)}
        </tr></thead><tbody className="divide-y divide-slate-100">
            {rows.map(([label, f]) => (<tr key={label}><td className="py-2 px-3 font-semibold text-slate-600">{label}</td>{cols.map(c => <td key={c.value} className={`py-2 px-3 text-right tabular-nums ${c.value === 'all' ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{f(c.s) ?? '–'}</td>)}</tr>))}
        </tbody></table>
        <p className="text-[11px] text-slate-500 px-3 py-2">Average fee paid counts everyone who joined during the save (academy players and free agents at $0 M).</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <div className="text-sm font-extrabold text-slate-900">Squad Strength (Average OVR, Now)</div>
            {cols.map(c => (<div key={c.value} className="space-y-1"><div className="flex justify-between text-xs font-bold text-slate-700"><span>{c.label}</span><OvrNum v={c.s.ovr == null ? null : Math.round(c.s.ovr * 10) / 10}/></div>
            <div className="h-3 rounded bg-slate-100"><div className="h-full rounded" style={{ width: `${c.s.ovr == null ? 0 : Math.max(4, ((c.s.ovr - minO) / Math.max(1, maxO - minO)) * 100)}%`, backgroundColor: ovrColor(c.s.ovr) }}/></div></div>))}
        <p className="text-[11px] text-slate-500">Today's teams only. Once New Squad records teams each season, this becomes a line over time.</p>
        </div>
        </div>); })()}
    </div>);
}

// ─── ROSTER ──────────────────────────────────────────────────────────
function RosterTab({ squad, clubOf = () => null, interactions = {}, onOpen }) {
    const [tier, setTier] = useState('all');
    const [group, setGroup] = useState('all');
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('pos');
    const [asc, setAsc] = useState(true);
    const [stats, setStats] = useState('career');
    const [age, setAge] = useState('all');
    const all = squad.current;
    const ageMax = (AGE_FILTERS.find(a => a.value === age) || AGE_FILTERS[0]).max;
    const shown = all.filter(p => (p.age == null || p.age < ageMax) && (tier === 'all' || String(p.tier) === tier) && (group === 'all' || groupOf(p.pos) === group) && (!q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())));
    const st = (p) => (stats === 'season' ? p.season : p.career); // needed by the stats sorts below
    const key = {
        pos: p => POS_ORDER.indexOf(p.pos) * 1000 - (p.ovr || 0), name: p => p.name, age: p => p.age, ovr: p => p.ovr, pot: p => p.potential || 0,
        value: p => p.value || 0, wage: p => p.wage || 0, contract: p => p.contract || 0, ps: p => p.ps, change: p => lastChange(p) ?? -99,
        years: p => (p.tenure && p.tenure.years) || 0,
        rem: p => (p.rem ?? 99), app: p => (st(p).app || 0), g: p => (st(p).g || 0), a: p => (st(p).a || 0), cs: p => (st(p).cs || 0),
        joined: p => (p.joined && p.joined.year) || 0, fee: p => (p.joined && p.joined.fee) || 0, role: p => ['CRUCIAL', 'IMPORTANT', 'ROTATION', 'SPORADIC', 'PROSPECT'].indexOf(p.role),
        ovrSince: p => ovrSinceJoining(p) ?? -99,
        valueSince: p => { const v = valueSinceJoining(p); return v ? v.d : -9999; },
    }[sortBy];
    const sorted = [...shown].sort((a, b) => { const x = key(a), y = key(b); const d = typeof x === 'string' ? x.localeCompare(y) : x - y; return asc ? d : -d; });
    // Money columns keep their own decimals, lined up on the decimal point
    const mean = (f, list) => (list.length ? list.reduce((a, p) => a + (f(p) || 0), 0) / list.length : 0);
    const rcV = moneyCol([...sorted.map(p => p.value), mean(p => p.value, sorted)]);
    const rcW = moneyCol([...sorted.map(p => p.wage), mean(p => p.wage, sorted)], 'K');
    const rcF = moneyCol([...sorted.map(p => p.joined && p.joined.fee), mean(p => (p.joined && p.joined.fee) || 0, sorted)]);
    // Source cards are read together: one format for their values
    const srcOf = (k) => all.filter(p => { const f = p.joined && p.joined.from ? String(p.joined.from).toUpperCase() : ''; return k === 'BOUGHT' ? f && !SPECIAL_SOURCES[f] : f === k; });
    const srcVal = (ps) => ps.reduce((a, p) => a + (p.value || 0), 0);
    const srcFmt = moneySet(['YOUTH ACADEMY', 'BOUGHT', 'FREE AGENT', 'LEGACY'].map(k => srcVal(srcOf(k))));
    const rcS = moneyCol(sorted.map(p => { const v = valueSinceJoining(p); return v ? v.d : null; }));
    const sort = (k, defAsc) => { if (sortBy === k) setAsc(!asc); else { setSortBy(k); setAsc(defAsc); } };
    const TH = ({ k, children, defAsc = false, cls = '' }) => (<th onClick={() => sort(k, defAsc)} className={`py-2 px-2 cursor-pointer select-none whitespace-nowrap hover:text-slate-900 ${cls}`}>{children}{sortBy === k ? (asc ? ' ▲' : ' ▼') : ''}</th>);
    const onLoan = all.filter(p => p.tier === 'loan').length;
    const avg = (f, list) => (list.length ? list.reduce((a, p) => a + (f(p) || 0), 0) / list.length : 0);
    const filtersOn = tier !== 'all' || group !== 'all' || age !== 'all' || q.trim();
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Squad" icon={Users} iconClassName="text-rose-200" value={all.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${onLoan} out on loan`} right=""/>
    <HighlightCard label="Average OVR" icon={Star} iconClassName="text-amber-300" value={avg(p => p.ovr, all).toFixed(1)} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={`❶ first team: ${avg(p => p.ovr, all.filter(p => p.tier === 1)).toFixed(1)}`} right=""/>
    <HighlightCard label="Average age" icon={Clock} iconClassName="text-sky-300" value={avg(p => p.age, all).toFixed(1)} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={`❶ first team: ${avg(p => p.age, all.filter(p => p.tier === 1)).toFixed(1)}`} right=""/>
    <HighlightCard label="Squad value" icon={TrendingUp} iconClassName="text-emerald-300" value={money(all.reduce((a, p) => a + (p.value || 0), 0))} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={`Wages ${money(all.reduce((a, p) => a + (p.annualWage || 0), 0))} a year`} right=""/>
    </HighlightsBar>
    {/* How today's squad was built */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[['YOUTH ACADEMY', '🎓', 'Youth academy'], ['BOUGHT', '💰', 'Bought'], ['FREE AGENT', '🖊️', 'Free agents'], ['LEGACY', '📜', 'Legacy']].map(([k, icon, label]) => {
            const ps = srcOf(k);
            return (<div key={k} className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3">
            <span className="text-2xl leading-none">{icon}</span>
            <div className="min-w-0"><div className="text-[11px] font-bold text-slate-500">{label}</div>
            <div className="text-sm font-black text-slate-900">{ps.length} player{ps.length === 1 ? '' : 's'} <span className="font-semibold text-slate-500">· {srcFmt(srcVal(ps))} now</span></div></div>
            </div>); })}
    </div>
    <div className="space-y-3">
    <div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Users}>Status</ControlLabel>
    <FilterPills accent="maroon" value={tier} onChange={setTier} options={[
        { value: 'all', label: 'All', badge: all.length },
        { value: '1', label: '❶ First', badge: all.filter(p => p.tier === 1).length },
        { value: '2', label: '❷ Second', badge: all.filter(p => p.tier === 2).length },
        { value: '3', label: '❸ Reserves', badge: all.filter(p => p.tier === 3).length },
        { value: 'loan', label: 'On loan', badge: onLoan },
        ...(all.some(p => p.tier === 'loanIn') ? [{ value: 'loanIn', label: 'Loaned in', badge: all.filter(p => p.tier === 'loanIn').length }] : []),
    ]}/></div>
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-wrap items-end gap-3">
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>Position</ControlLabel>
    <Segmented value={group} onChange={setGroup} options={[{ value: 'all', label: 'All' }, { value: 'GK', label: 'GK' }, { value: 'DEF', label: 'DEF' }, { value: 'MID', label: 'MID' }, { value: 'ATT', label: 'ATT' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Calendar}>Stats</ControlLabel>
    <Segmented value={stats} onChange={setStats} options={[{ value: 'season', label: squad.lastSeason ? `S${squad.lastSeason}` : 'This season' }, { value: 'career', label: 'Career' }]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Clock}>Age</ControlLabel>
    <Segmented value={age} onChange={setAge} options={AGE_FILTERS.map(a => ({ value: a.value, label: a.label }))}/></div>
    </div>
    <div className="flex items-center gap-2">
    <SearchInput accent="maroon" className="w-56" value={q} onChange={setQ} placeholder="Search player..."/>
    <ResetButton disabled={!filtersOn} onClick={() => { setTier('all'); setGroup('all'); setAge('all'); setQ(''); }}/>
    </div>
    </div>
    </div>
    <div className="overflow-auto max-h-[78vh] bg-white rounded-xl border border-slate-200">
    <table className="w-full text-xs border-separate border-spacing-0">
    {/* Group row on top so the column labels can be short. Groups: Details | Attributes | Contract | Stats | Interactions | Transfer (in) | Tenure */}
    <thead className="whitespace-nowrap sticky top-0 z-10">
    <tr className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50">
    {[['Details', 4], ['Attributes', 5], ['Contract', 4], ['Stats', 4], ['Interactions', 2], ['Transfer', 3], ['Tenure', 3]].map(([g, n], gi) => (<th key={g} colSpan={n} className={`pt-2 pb-1 px-2 text-left ${gi ? 'border-l border-slate-200' : 'pl-3'}`}><span className="inline-block border-b-2 pb-0.5" style={{ borderColor: SQUAD_ACCENT }}>{g}</span></th>))}
    </tr>
    <tr className="text-slate-600 font-bold bg-slate-50 text-left shadow-[0_1px_0_#e2e8f0]">
    <TH k="pos" defAsc cls="pl-3 sm:sticky sm:left-0 z-20 bg-slate-50 w-[118px] min-w-[118px]">Pos</TH><TH k="name" defAsc cls="sm:sticky sm:left-[118px] z-20 bg-slate-50 shadow-[1px_0_0_#e2e8f0]">Player</TH><th className="py-2 px-2 text-center" title="Foot">Ft</th><th className="py-2 px-2 text-center" title="Squad status">Sq</th>
    <TH k="age" defAsc cls="text-center border-l border-slate-200">Age</TH><TH k="ovr" cls="text-center">OVR</TH><TH k="change" cls="text-center">{squad.lastSeason ? `S${squad.lastSeason} ±` : '±'}</TH><TH k="pot">Pot.</TH><TH k="ps">PS</TH>
    <TH k="role" defAsc cls="border-l border-slate-200">Role</TH><TH k="value" cls="text-right">Value</TH><TH k="wage" cls="text-right">Wage/wk</TH><TH k="rem" defAsc cls="text-center"><span title="Contract years remaining">Yrs rem.</span></TH>
    <TH k="app" cls="text-center border-l border-slate-200">App</TH><TH k="g" cls="text-center">G</TH><TH k="a" cls="text-center">A</TH><TH k="cs" cls="text-center">CS</TH>
    <th className="py-2 px-2 text-center border-l border-slate-200">Pos</th><th className="py-2 px-2 text-center">Neg</th>
    <TH k="joined" cls="border-l border-slate-200">Year</TH><th className="py-2 px-2">From</th><TH k="fee" cls="text-right">Fee</TH>
    <TH k="years" cls="text-center border-l border-slate-200">Yrs</TH><TH k="ovrSince" cls="text-center">OVR ±</TH><TH k="valueSince" cls="text-right pr-3"><span title="From his value at signing, or at the end of his first season if that isn't recorded">Value ±</span></TH>
    </tr>
    </thead>
    <tbody className="whitespace-nowrap">
        {sorted.map(p => { const ch = lastChange(p); const s = st(p); const since = ovrSinceJoining(p); const vs = valueSinceJoining(p); const vSince = vs ? vs.d : null;
            const from = p.joined && p.joined.from; const special = SPECIAL_SOURCES[from]; const club = !special && from ? clubOf(from) : null;
            const fee = from === 'YOUTH ACADEMY' || from === 'FREE AGENT' ? 0 : from === 'LEGACY' ? null : (p.joined && p.joined.fee != null ? p.joined.fee : null);
            const B = 'border-l border-slate-100';
            return (<tr key={p.id} onClick={() => onOpen(p)} className="group cursor-pointer hover:bg-rose-50 [&>td]:border-b [&>td]:border-slate-100">
        {/* Details */}
        <td className="py-1.5 px-2 pl-3 sm:sticky sm:left-0 z-10 bg-white group-hover:bg-rose-50 w-[118px] min-w-[118px] max-w-[118px] truncate border-b border-slate-100"><span className="font-black text-slate-900">{p.pos}</span>{p.alt.length > 0 && <span className="text-[11px] text-slate-400 ml-2">{p.alt.join(', ')}</span>}</td>
        <td className="py-1.5 px-2 sm:sticky sm:left-[118px] z-10 bg-white group-hover:bg-rose-50 shadow-[1px_0_0_#e2e8f0] border-b border-slate-100"><span className="inline-flex items-center gap-1.5 font-bold text-slate-900"><Flag emoji={p.flag} size={18}/>{p.name}</span></td>
        <td className="py-1.5 px-2 text-center font-bold text-slate-500">{p.foot}</td>
        <td className="py-1.5 px-2"><span className="flex justify-center"><StatusIcon p={p}/></span></td>
        {/* Attributes */}
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{p.age}</td>
        <td className="py-1.5 px-2 text-center font-black tabular-nums" style={{ color: ovrColor(p.ovr) }}>{p.ovr}</td>
        <td className={`py-1.5 px-2 text-center font-bold tabular-nums ${ch > 0 ? 'text-emerald-700' : ch < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{ch == null ? '' : ch > 0 ? `▲${ch}` : ch < 0 ? `▼${Math.abs(ch)}` : '–'}</td>
        <td className="py-1.5 px-2"><span className="inline-flex items-center gap-1.5"><span className={`w-6 text-right tabular-nums font-bold ${p.potentialImplied ? 'italic opacity-60' : ''}`} style={{ color: ovrColor(p.potential) }} title={p.potentialImplied ? `Implied by ${p.dev} (no potential in the sheet)` : ''}>{p.potential || '–'}</span><DevText code={p.dev}/></span></td>
        <td className="py-1.5 px-2 text-[11px] tracking-[0.15em]" style={{ color: SQUAD_ACCENT }} title={`${p.ps} playstyle${p.ps === 1 ? '' : 's'}`}>{p.ps ? '◆'.repeat(p.ps) : <span className="text-slate-300 tracking-normal">–</span>}</td>
        {/* Contract */}
        <td className={`py-1.5 px-2 ${B}`}><RoleText role={p.role}/></td>
        <td className="py-1.5 px-2 text-right tabular-nums font-bold">{rcV(p.value)}</td>
        <td className="py-1.5 px-2 text-right tabular-nums text-slate-600">{rcW(p.wage)}</td>
        <td className="py-1.5 px-2 text-center tabular-nums" title={p.contract ? `Contract to ${p.contract}${p.rem != null && p.rem <= 1 ? ' (1 year or less left)' : ''}` : ''}>{p.rem != null && p.rem <= 1 ? <span className="inline-flex items-center gap-1 font-black text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/>{p.rem}</span> : (p.rem ?? '–')}</td>
        {/* Stats */}
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{s.app ?? ''}</td><td className="py-1.5 px-2 text-center tabular-nums">{s.g ?? ''}</td>
        <td className="py-1.5 px-2 text-center tabular-nums">{s.a ?? ''}</td><td className="py-1.5 px-2 text-center tabular-nums">{s.cs ?? ''}</td>
        {/* Interactions (from the Interactions tab) */}
        {['pos', 'neg'].map((side, si) => { const rec = interactions[p.id]; const lit = (rec && rec[side]) || []; return (<td key={side} className={`py-1.5 px-2 text-center ${si === 0 ? B : ''}`} title={rec && rec.updated ? `Last updated ${fmtDate(rec.updated)}` : ''}>
            {lit.length ? <span className={`inline-flex gap-0.5 px-1 py-0.5 rounded-md ${side === 'pos' ? 'bg-emerald-50' : 'bg-rose-50'}`}>{lit.map(e => <span key={e} className="text-sm leading-none">{e}</span>)}</span> : <span className="text-slate-300">–</span>}
            </td>); })}
        {/* Transfer (in) */}
        <td className={`py-1.5 px-2 tabular-nums ${B}`}>{p.joined && p.joined.season ? <><span className="font-bold text-slate-800">S{p.joined.season}</span><span className="text-slate-400"> · {Math.floor(p.joined.year)}</span></> : '–'}</td>
        <td className="py-1.5 px-2"><ClubTag name={from} clubOf={clubOf}/></td>
        <td className="py-1.5 px-2 text-right tabular-nums font-semibold">{fee == null ? <span className="text-slate-300">–</span> : rcF(fee)}</td>
        {/* Tenure */}
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{p.tenure && p.tenure.years != null ? p.tenure.years : '–'}</td>
        <td className={`py-1.5 px-2 text-center tabular-nums font-bold ${since > 0 ? 'text-emerald-700' : since < 0 ? 'text-rose-700' : 'text-slate-400'}`} title={since != null ? `${p.ovr - since} → ${p.ovr}` : ''}>{since == null ? '–' : since > 0 ? `▲${since}` : since < 0 ? `▼${-since}` : '–'}</td>
        <td className={`py-1.5 px-2 pr-3 text-right tabular-nums font-bold ${vSince > 0 ? 'text-emerald-700' : vSince < 0 ? 'text-rose-700' : 'text-slate-400'}`} title={vs ? `${money1(vs.b.v)} (${vs.b.from}) → ${money1(p.value)}` : ''}>{vSince == null ? '–' : rcS(vSince, true)}</td>
        </tr>); })}
    </tbody>
    {/* Averages (and totals for stats) of the players shown */}
    {sorted.length > 0 && (() => { const A = (f) => avg(f, sorted); const T = (f) => sorted.reduce((a, p) => a + (f(p) || 0), 0); const td = 'py-2 px-2 tabular-nums font-bold text-slate-700 bg-slate-50 border-t-2 border-slate-200'; return (<tfoot className="sticky bottom-0 z-20 whitespace-nowrap"><tr>
        <td className={`${td} pl-3 sm:sticky sm:left-0 z-10`}>Average</td><td className={`${td} sm:sticky sm:left-[118px] z-10 font-semibold text-slate-500`}>{sorted.length} players</td><td className={td}/><td className={td}/>
        <td className={`${td} text-center border-l border-slate-100`}>{A(p => p.age).toFixed(1)}</td><td className={`${td} text-center`} style={{ color: ovrColor(A(p => p.ovr)) }}>{A(p => p.ovr).toFixed(1)}</td><td className={td}/><td className={td}>{A(p => p.potential).toFixed(1)}</td><td className={td}/>
        <td className={`${td} border-l border-slate-100`}/><td className={`${td} text-right`}>{rcV(A(p => p.value))}</td><td className={`${td} text-right`}>{rcW(A(p => p.wage))}</td><td className={`${td} text-center`}>{A(p => p.rem).toFixed(1)}</td>
        <td className={`${td} text-center border-l border-slate-100`}/><td className={`${td} text-center`} title="Total">{T(p => st(p).g)}</td><td className={`${td} text-center`} title="Total">{T(p => st(p).a)}</td><td className={`${td} text-center`} title="Total">{T(p => st(p).cs)}</td>
        <td className={`${td} border-l border-slate-100`}/><td className={td}/>
        <td className={`${td} border-l border-slate-100`}/><td className={td}/><td className={`${td} text-right`}>{rcF(A(p => (p.joined && p.joined.fee) || 0))}</td>
        <td className={`${td} text-center border-l border-slate-100`}>{A(p => (p.tenure && p.tenure.years) || 0).toFixed(1)}</td><td className={td}/><td className={`${td} pr-3`}/>
        </tr></tfoot>); })()}
    </table>
    {!sorted.length && <div className="p-6 text-center text-xs text-slate-500">No players match these filters.</div>}
    </div>
    </div>);
}

// ─── CONTRACTS ───────────────────────────────────────────────────────
// Advanced metrics (all from the current squad; on-loan players included):
//   cost       = total cost per year (TOTAL WAGES: annual wage + bonuses), $ M
//   vsOvr      = cost ÷ quality, where quality doubles every 10 OVR:
//                2^((OVR − 80) ÷ 10). $ M per unit of quality (raw $)
//   vsValue    = cost ÷ value × 100: % of his value paid each year (colour
//                key: green below the squad median, red above)
//   perApp     = cost ÷ appearances per season ($ K), plus an index where
//                100 = the squad median
//   perOut     = cost ÷ goals + assists per season (keepers: clean sheets)
//   vfm        = value-for-money score 0-100 from vsOvr, vsValue and perApp
//                (each player's rank in the squad, averaged; 100 = best)
const QUALITY_DOUBLES_EVERY = 10; // OVR points; tune later
const quality = (ovr) => Math.pow(2, ((ovr || 0) - 80) / QUALITY_DOUBLES_EVERY);
function contractStats(squad) {
    const out = {};
    squad.current.forEach(p => {
        const cost = p.totalWages != null ? p.totalWages : p.annualWage;
        const rec = p.seasons.filter(x => x.app != null);
        const sum = (k) => rec.reduce((a, x) => a + (x[k] || 0), 0);
        const appsPS = rec.length ? sum('app') / rec.length : null;
        const isGK = p.pos === 'GK';
        const outPS = rec.length ? (isGK ? sum('cs') : sum('g') + sum('a')) / rec.length : null;
        out[p.id] = {
            cost, appsPS, outPS, isGK,
            vsOvr: cost != null && p.ovr != null ? cost / quality(p.ovr) : null,
            vsValue: cost != null && p.value ? (cost / p.value) * 100 : null,
            perApp: cost != null && appsPS ? (cost * 1000) / appsPS : null,
            perOut: cost != null && outPS ? (cost * 1000) / outPS : null,
        };
    });
    const ids = Object.keys(out);
    const med = { vsValue: median(ids.map(i => out[i].vsValue)), perApp: median(ids.map(i => out[i].perApp)), vsOvr: median(ids.map(i => out[i].vsOvr)) };
    ids.forEach(i => { out[i].perAppIdx = out[i].perApp != null && med.perApp ? Math.round((out[i].perApp / med.perApp) * 100) : null; });
    // value for money: average rank percentile on the three fair metrics (lower cost = better)
    const pct = (k) => { const v = ids.filter(i => out[i][k] != null).sort((a, b) => out[a][k] - out[b][k]); const r = {}; v.forEach((i, n) => { r[i] = v.length > 1 ? 1 - n / (v.length - 1) : 1; }); return r; };
    const P = { vsOvr: pct('vsOvr'), vsValue: pct('vsValue'), perApp: pct('perApp') };
    ids.forEach(i => { const v = ['vsOvr', 'vsValue', 'perApp'].map(k => P[k][i]).filter(x => x != null); out[i].vfm = v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) : null; });
    const ranked = ids.filter(i => out[i].vfm != null).sort((a, b) => out[b].vfm - out[a].vfm);
    ranked.forEach((i, n) => { out[i].vfmRank = n + 1; });
    return { byId: out, med, n: ranked.length };
}
const kTxt = wageTxt;
const pctColor = (v, med) => (v == null || med == null ? undefined : v <= med ? '#047857' : '#be123c');
function Board({ title, rows, render }) {
    return (<div className="bg-white rounded-xl border border-slate-200 p-4"><div className="text-sm font-extrabold text-slate-900 mb-2">{title}</div>
        <div className="divide-y divide-slate-100">{rows.map((r, i) => render(r, i))}{!rows.length && <div className="text-xs text-slate-400 py-2">None</div>}</div></div>);
}
function ContractsTab({ squad, cstats, onOpen }) {
    const [fwBox, fwW] = useWidth(760);
    const [team, setTeam] = useState('all');
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('vfm');
    const [asc, setAsc] = useState(false);
    const [yrsLeft, setYrsLeft] = useState('all');
    const hv = useHover();
    const all = squad.current;
    const S = cstats.byId, med = cstats.med;
    const totalCost = all.reduce((a, p) => a + ((S[p.id] && S[p.id].cost) || 0), 0);
    const atRisk = all.filter(p => p.rem != null && p.rem <= 1);
    const best = [...all].filter(p => S[p.id] && S[p.id].vfm != null).sort((a, b) => S[b.id].vfm - S[a.id].vfm)[0];
    const shown = all.filter(p => (team === 'all' || String(p.tier) === team) && (!q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())));
    const key = { pos: p => POS_ORDER.indexOf(p.pos) * 1000 - (p.ovr || 0), name: p => p.name, age: p => p.age, ovr: p => p.ovr || 0, value: p => p.value || 0, wage: p => p.wage || 0, cost: p => S[p.id].cost || 0, rem: p => p.rem ?? 99,
        vsOvr: p => S[p.id].vsOvr ?? 1e9, vsValue: p => S[p.id].vsValue ?? 1e9, perApp: p => S[p.id].perApp ?? 1e9, perOut: p => S[p.id].perOut ?? 1e9, vfm: p => S[p.id].vfm ?? -1, role: p => roleRank(p) }[sortBy];
    const sorted = [...shown].sort((a, b) => { const x = key(a), y = key(b); const d = typeof x === 'string' ? x.localeCompare(y) : x - y; return asc ? d : -d; });
    // Per appearance / per output in $ M (stored in $ K); columns line up on the point
    const dbApp = moneyCol(sorted.map(p => S[p.id] && S[p.id].perApp != null ? S[p.id].perApp / 1000 : null));
    const dbOut = moneyCol(sorted.map(p => S[p.id] && S[p.id].perOut != null ? S[p.id].perOut / 1000 : null));
    const sort = (k, defAsc) => { if (sortBy === k) setAsc(!asc); else { setSortBy(k); setAsc(defAsc); } };
    const TH = ({ k, children, defAsc = false, cls = '' }) => (<th onClick={() => sort(k, defAsc)} className={`py-2 px-2 cursor-pointer select-none whitespace-nowrap hover:text-slate-900 ${cls}`}>{children}{sortBy === k ? (asc ? ' ▲' : ' ▼') : ''}</th>);
    // Charts
    const years = [...new Set(all.map(p => p.contract).filter(Boolean))].sort((a, b) => a - b);
    const riskByYear = years.map(y => ({ y, ps: all.filter(p => p.contract === y) })).map(d => ({ ...d, value: d.ps.reduce((a, p) => a + (p.value || 0), 0) }));
    const maxRisk = Math.max(1, ...riskByYear.map(d => d.value));
    // Sets read together share one format; table columns line up on the point
    const fwScrub = useScrub((e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const o = Math.round(oLo + ((e.clientX - r.left - m.l) / (W - m.l - m.r)) * (oHi - oLo));
        const near = [...new Set(pts.map(p => p.ovr))].sort((a, b) => Math.abs(a - o) - Math.abs(b - o))[0];
        const at = pts.filter(p => p.ovr === near).sort((a, b) => (S[b.id].cost || 0) - (S[a.id].cost || 0));
        if (!at.length) return null;
        const f = moneySet(at.map(p => S[p.id].cost));
        return { title: <span>OVR <OvrNum v={near} dark/></span>, rows: at.map(p => [<span className="text-white font-bold">{p.name}</span>, f(S[p.id].cost)]), note: 'Cost a year' };
    });
    const fairHover = (p) => {
        const cost = S[p.id].cost, fair = (med.vsOvr || 0) * quality(p.ovr), f = moneySet([cost, fair, cost - fair]);
        const r = ROLE_STYLE[p.role], j = p.joined, w = j ? windowOf(j.year) : null;
        return { title: <span>{p.name} · {p.pos}{r && <span className="text-slate-400 font-semibold"> · {r.short}</span>}</span>, action: { label: 'Open profile', run: () => onOpen(p) },
            rows: [['OVR', <OvrNum v={p.ovr} dark/>], ['Cost a year', f(cost)], ['Fair cost', f(fair)], ['Difference', <Delta v={cost - fair} fmt={(v) => f(v, true)} invert/>],
                ['Team', p.tag ? p.tag.label : '–'], ['Year signed', j && j.season ? `S${j.season} · ${Math.floor(j.year)}${w === 'winter' ? ' ❄️' : w === 'summer' ? ' ☀️' : ''}` : '–']] };
    };
    const riskFmt = moneySet(riskByYear.map(d => d.value));
    const stripFmt = moneySet([totalCost, atRisk.reduce((a, p) => a + (p.value || 0), 0)]);
    const expWage = moneyCol(all.map(p => p.wage), 'K');
    const topVal = [...all].sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 5), topValFmt = moneySet(topVal.map(p => p.value));
    const topCost = [...all].sort((a, b) => (S[b.id].cost || 0) - (S[a.id].cost || 0)).slice(0, 5), topCostFmt = moneySet(topCost.map(p => S[p.id].cost));
    const wagesBy = (groups) => groups.map(g => ({ ...g, w: all.filter(g.test).reduce((a, p) => a + (p.wage || 0), 0) }));
    const byTeam = wagesBy(TEAM_GROUPS.slice(1).map((g, i) => ({ ...g, color: ['#7c3aed', '#475569', '#94a3b8', '#0ea5e9'][i] })));
    const byPos = wagesBy([['GK', '#a16207'], ['DEF', '#1d4ed8'], ['MID', '#047857'], ['ATT', '#be123c']].map(([g, color]) => ({ label: g, value: g, color, test: (p) => groupOf(p.pos) === g })));
    const wageAll = all.reduce((a, p) => a + (p.wage || 0), 0) || 1;
    // Fair-wage scatter: cost vs OVR over the "fair wage" curve (squad median cost per unit of quality)
    const pts = all.filter(p => S[p.id].cost != null && p.ovr != null);
    // Real size (v50.01): drawn at the box's width so text stays readable on phones
    const W = Math.max(300, fwW), H = W < 500 ? 300 : 360, m = { l: 52, r: 16, t: 14, b: 34 };
    const oLo = Math.min(...pts.map(p => p.ovr)) - 2, oHi = Math.max(...pts.map(p => p.ovr)) + 2, cTicks = niceTicks(Math.max(...pts.map(p => S[p.id].cost)) * 1.04), cHi = cTicks[cTicks.length - 1], cTF = tickFmt(cTicks);
    const X = (v) => m.l + ((v - oLo) / (oHi - oLo)) * (W - m.l - m.r), Y = (v) => m.t + (1 - v / cHi) * (H - m.t - m.b);
    const curve = Array.from({ length: 41 }, (_, i) => oLo + (i / 40) * (oHi - oLo)).map((o, i) => `${i ? 'L' : 'M'}${X(o).toFixed(1)},${Y(Math.min(cHi, (med.vsOvr || 0) * quality(o))).toFixed(1)}`).join(' ');
    const teamColor = (p) => (p.tier === 1 ? '#7c3aed' : p.tier === 2 ? '#475569' : p.tier === 3 ? '#94a3b8' : '#0ea5e9');
    const LB = ({ p, i, right }) => (<button type="button" onClick={() => onOpen(p)} className="w-full grid grid-cols-[16px_minmax(0,1fr)_30px_86px] sm:grid-cols-[18px_minmax(0,1fr)_56px_110px] items-center gap-2 sm:gap-3 py-2 px-1 text-left hover:bg-slate-50 rounded">
        <span className="text-[12px] font-black text-slate-400">{i + 1}</span>
        <span className="flex items-center gap-2 min-w-0"><Flag emoji={p.flag} size={18}/><span className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2"><span className="text-[14px] font-bold text-slate-900 truncate">{p.name}</span><span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{p.pos} · {p.age}</span></span></span>
        <span className="text-center text-[14px]"><OvrNum v={p.ovr}/></span>
        <span className="text-right text-[14px] font-black tabular-nums text-slate-900">{right}</span></button>);
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Total cost" icon={TrendingUp} iconClassName="text-rose-300" value={stripFmt(totalCost)} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left="A year: wages + bonuses" right=""/>
    <HighlightCard label="Weekly wages" icon={Clock} iconClassName="text-sky-300" value={kTxt(wageAll)} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={`Average ${kTxt(wageAll / all.length)}`} right=""/>
    <HighlightCard label="Value at risk" icon={Shield} iconClassName="text-amber-300" value={stripFmt(atRisk.reduce((a, p) => a + (p.value || 0), 0))} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={`${atRisk.length} contract${atRisk.length === 1 ? '' : 's'} with 1 year or less`} right=""/>
    <HighlightCard label="Best value for money" icon={Star} iconClassName="text-emerald-300" value={best ? best.name : '–'} valueClassName="text-lg sm:text-xl font-black text-emerald-200 truncate" left={best ? `Score ${S[best.id].vfm} / 100` : ''} right=""/>
    </HighlightsBar>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <Board title="Top Valuations" rows={topVal} render={(p, i) => <LB key={p.id} p={p} i={i} right={topValFmt(p.value)}/>}/>
    <Board title="Top Total Costs (A Year)" rows={topCost} render={(p, i) => <LB key={p.id} p={p} i={i} right={topCostFmt(S[p.id].cost)}/>}/>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-5">
    <div className="bg-white rounded-xl border border-slate-200 p-4">
    <div className="text-sm font-extrabold text-slate-900">Fair Wage: Cost Against OVR</div>
    <p className="text-[11px] text-slate-500 mb-2">The curve is a fair cost if quality doubles every {QUALITY_DOUBLES_EVERY} OVR, set at the squad's median. Above it = paid more than his OVR suggests.</p>
    <div ref={fwBox} className="w-full" {...fwScrub}><svg width={W} height={H} className="block">
        {cTicks.map(v => <g key={v}><line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#f1f5f9"/><text x={m.l - 6} y={Y(v)} dy="0.35em" textAnchor="end" fontSize="11" fill="#64748b">{cTF(v)}</text></g>)}
        {Array.from({ length: Math.floor(oHi) - Math.ceil(oLo) + 1 }, (_, i) => Math.ceil(oLo) + i).filter(o => o % 2 === 0).map(o => <text key={o} x={X(o)} y={H - m.b + 14} textAnchor="middle" fontSize="11" fill="#64748b">{o}</text>)}
        <text x={(W + m.l) / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="#94a3b8">OVR</text>
        <path d={curve} fill="none" stroke="#7c3aed" strokeDasharray="5 4" strokeWidth="1.5"/>
        {pts.map(p => (<circle key={p.id} cx={X(p.ovr)} cy={Y(S[p.id].cost)} r="6" fill={teamColor(p)} fillOpacity="0.85" stroke="#fff" strokeWidth="1.5" className="cursor-pointer" onClick={() => onOpen(p)} {...hv(fairHover(p))}/>))}
    </svg></div>
    <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-slate-600">{TEAM_GROUPS.slice(1).map((g, i) => <span key={g.value} className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#7c3aed', '#475569', '#94a3b8', '#0ea5e9'][i] }}/>{g.label}</span>)}<span className="inline-flex items-center gap-1"><span className="w-4 border-t-2 border-dashed border-[#7c3aed]"/>Fair wage</span></div>
    </div>
    <div className="space-y-5">
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
    <div className="text-sm font-extrabold text-slate-900">Wage Bill Breakdown <span className="font-semibold text-slate-400">({kTxt(wageAll)} a week)</span></div>
        {[['By team', byTeam], ['By position', byPos]].map(([label, parts]) => (<div key={label} className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500">{label}</div>
        <div className="flex h-6 rounded overflow-hidden">{parts.map(g => g.w > 0 && <div key={g.value} className="h-full flex items-center justify-center text-[11px] font-black text-white" style={{ width: `${(g.w / wageAll) * 100}%`, backgroundColor: g.color }} {...hv({ title: g.label, rows: [['Weekly wages', kTxt(g.w)], ['Share of the bill', `${Math.round((g.w / wageAll) * 100)}%`], ['Players', all.filter(g.test).length], ['Average', kTxt(g.w / Math.max(1, all.filter(g.test).length))]] })}>{g.w / wageAll > 0.08 ? `${Math.round((g.w / wageAll) * 100)}%` : ''}</div>)}</div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">{parts.map(g => <span key={g.value} className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: g.color }}/>{g.label} {kTxt(g.w)}</span>)}</div>
        </div>))}
    </div>
    <div className="bg-white rounded-xl border border-slate-200 p-4">
    <div className="text-sm font-extrabold text-slate-900 mb-2">Value At Risk: Market Value By Contract End</div>
    <div className="flex items-end gap-2 h-64">
        {riskByYear.map(d => (<div key={d.y} className="flex-1 flex flex-col items-center gap-1 h-full justify-end" {...hv({ title: `Contracts ending ${d.y}`, rows: [['Players', d.ps.length], ['Market value', riskFmt(d.value)], ['Biggest', d.ps.length ? `${[...d.ps].sort((a, b) => (b.value || 0) - (a.value || 0))[0].name}, ${riskFmt([...d.ps].sort((a, b) => (b.value || 0) - (a.value || 0))[0].value)}` : '–']] })}>
        <span className="text-[11px] font-black tabular-nums text-slate-700">{riskFmt(d.value)}</span>
        <div className="w-full rounded-t bg-amber-400" style={{ height: `${(d.value / maxRisk) * 100}%`, minHeight: 3 }}/>
        <span className="text-[11px] font-bold text-slate-500">{d.y}</span></div>))}
    </div>
    </div>
    </div>
    </div>
    {/* Contract expiry schedule */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-extrabold text-slate-900">Contract Expiry Schedule</div>
    <div className="flex items-center gap-2"><span className="text-[11px] font-semibold text-slate-500">Years left</span>
    <Segmented value={yrsLeft} onChange={setYrsLeft} options={[{ value: 'all', label: 'All' }, ...[...new Set(riskByYear.map(d => d.ps[0] && d.ps[0].rem).filter(v => v != null))].sort((a, b) => a - b).map(n => ({ value: String(n), label: `≤ ${n}` }))]}/></div></div>
    {/* Year blocks wrap onto rows (about 3 per row on a wide screen) so names have room */}
    <div><div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))' }}>
        {riskByYear.filter(d => yrsLeft === 'all' || (d.ps[0] && d.ps[0].rem <= Number(yrsLeft))).map(({ y, ps, value }, yi) => { const rem = ps[0] && ps[0].rem; return (<div key={y} className="space-y-1 rounded-lg border border-slate-200 p-3">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-1"><span className="text-xs font-black text-slate-900">{y} <span className="font-semibold text-slate-400">· {rem ?? '?'} yr{rem === 1 ? '' : 's'} left</span></span><span className="text-[11px] font-bold text-slate-500">{ps.length} · {riskFmt(value)}</span></div>
            <div className="overflow-x-auto -mx-1 px-1"><div className="min-w-[420px] space-y-1">
            {[...ps].sort((a, b) => teamRank(a) - teamRank(b) || (b.ovr || 0) - (a.ovr || 0)).map(p => (<button key={p.id} type="button" onClick={() => onOpen(p)} className="w-full grid grid-cols-[36px_minmax(0,1fr)_28px_24px_34px_20px_76px] gap-x-2 items-center px-1 py-1 rounded hover:bg-slate-50 text-[12px] text-left">
            <span className="text-[11px] font-black text-slate-500">{p.pos}</span>
            <span className="inline-flex items-center gap-1 min-w-0"><Flag emoji={p.flag} size={14}/><span className="font-semibold text-slate-800 truncate">{p.name}</span></span>
            <span className="text-center"><OvrNum v={p.ovr}/></span><span className="text-center tabular-nums text-slate-500">{p.age}</span>
            <span className="flex justify-end"><RoleText role={p.role} short/></span><span className="flex justify-end"><TeamNumber p={p}/></span>
            <span className="text-right tabular-nums text-slate-600">{expWage(p.wage)}</span>
            </button>))}
            </div></div>
        </div>); })}
    </div></div>
    </div>
    {/* Contracts database */}
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Users}>Team</ControlLabel>
    <FilterPills accent="maroon" value={team} onChange={setTeam} options={[{ value: 'all', label: 'All', badge: all.length }, ...TEAM_GROUPS.slice(1).map(g => ({ value: g.value, label: g.label, badge: all.filter(g.test).length }))]}/></div>
    <SearchInput accent="maroon" className="w-56" value={q} onChange={setQ} placeholder="Search player..."/>
    </div>
    <div className="overflow-auto max-h-[78vh] bg-white rounded-xl border border-slate-200">
    <table className="w-full text-xs border-separate border-spacing-0">
    <thead className="whitespace-nowrap sticky top-0 z-10">
    <tr className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50">
        {[['Details', 4], ['Attributes', 3], ['Contract', 5], ['Value for money', 5]].map(([g, n], gi) => (<th key={g} colSpan={n} className={`pt-2 pb-1 px-2 text-left ${gi ? 'border-l border-slate-200' : 'pl-3'}`}><span className="inline-block border-b-2 pb-0.5" style={{ borderColor: SQUAD_ACCENT }}>{g}</span></th>))}
    </tr>
    <tr className="text-slate-600 font-bold bg-slate-50 text-left shadow-[0_1px_0_#e2e8f0]">
    <TH k="pos" defAsc cls="pl-3">Pos</TH><TH k="name" defAsc>Player</TH><th className="py-2 px-2 text-center">Ft</th><th className="py-2 px-2 text-center">Sq</th>
    <TH k="age" defAsc cls="text-center border-l border-slate-200">Age</TH><TH k="ovr" cls="text-center">OVR</TH><th className="py-2 px-2">Pot.</th>
    <TH k="role" defAsc cls="border-l border-slate-200">Role</TH><TH k="value" cls="text-right">Value</TH><TH k="wage" cls="text-right">Wage/wk</TH><TH k="cost" cls="text-right">Cost/yr</TH><TH k="rem" defAsc cls="text-center">Yrs rem.</TH>
    <TH k="vsOvr" defAsc cls="text-right border-l border-slate-200"><span title="Cost ÷ quality (quality doubles every 10 OVR)">vs OVR</span></TH><TH k="vsValue" defAsc cls="text-right"><span title="Cost as % of his value each year. Green below the squad median, red above">vs value</span></TH>
    <TH k="perApp" defAsc cls="text-right"><span title="Cost per appearance (index: 100 = squad median)">Per app</span></TH><TH k="perOut" defAsc cls="text-right"><span title="Cost per goal + assist (keepers: per clean sheet)">Per G+A / CS</span></TH><TH k="vfm" cls="text-center pr-3">Score</TH>
    </tr></thead>
    <tbody className="whitespace-nowrap">
        {sorted.map(p => { const c = S[p.id]; return (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:bg-rose-50 [&>td]:border-b [&>td]:border-slate-100">
        <td className="py-1.5 px-2 pl-3"><PosCell p={p}/></td><td className="py-1.5 px-2"><NameCell p={p}/></td>
        <td className="py-1.5 px-2 text-center font-bold text-slate-500">{p.foot}</td><td className="py-1.5 px-2"><span className="flex justify-center"><StatusIcon p={p}/></span></td>
        <td className="py-1.5 px-2 text-center tabular-nums border-l border-slate-100">{p.age}</td><td className="py-1.5 px-2 text-center"><OvrNum v={p.ovr}/></td>
        <td className="py-1.5 px-2"><span className="inline-flex items-center gap-1"><span className={`tabular-nums font-bold ${p.potentialImplied ? 'italic opacity-60' : ''}`} style={{ color: ovrColor(p.potential) }}>{p.potential ?? '–'}</span><DevText code={p.dev}/></span></td>
        <td className="py-1.5 px-2 border-l border-slate-100"><RoleText role={p.role}/></td>
        <td className="py-1.5 px-2 text-right tabular-nums font-bold">{money(p.value)}</td><td className="py-1.5 px-2 text-right tabular-nums text-slate-600">{kTxt(p.wage)}</td>
        <td className="py-1.5 px-2 text-right tabular-nums" title={`Wage ${money(p.annualWage)} + signing ${money(p.signBonus || 0)} + performance ${money(p.perfBonus || 0)}`}>{money(c.cost)}</td>
        <td className="py-1.5 px-2 text-center tabular-nums">{p.rem != null && p.rem <= 1 ? <span className="inline-flex items-center gap-1 font-black text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"/>{p.rem}</span> : (p.rem ?? '–')}</td>
        <td className="py-1.5 px-2 text-right tabular-nums border-l border-slate-100">{c.vsOvr == null ? '–' : money(c.vsOvr)}</td>
        <td className="py-1.5 px-2 text-right tabular-nums font-bold" style={{ color: pctColor(c.vsValue, med.vsValue) }}>{c.vsValue == null ? '–' : `${c.vsValue.toFixed(1)}%`}</td>
        <td className="py-1.5 px-2 text-right tabular-nums">{c.perApp == null ? <span className="text-slate-300">–</span> : <>{dbApp(c.perApp / 1000)} <span className="text-[11px] font-bold text-slate-400">· {c.perAppIdx}</span></>}</td>
        <td className="py-1.5 px-2 text-right tabular-nums">{c.perOut == null ? <span className="text-slate-300">–</span> : dbOut(c.perOut / 1000)}</td>
        <td className="py-1.5 px-2 pr-3 text-center"><span className="inline-block min-w-[2.5rem] px-1.5 py-0.5 rounded font-black tabular-nums text-white" style={{ backgroundColor: c.vfm == null ? '#cbd5e1' : c.vfm >= 67 ? '#047857' : c.vfm >= 34 ? '#64748b' : '#be123c' }}>{c.vfm ?? '–'}</span></td>
        </tr>); })}
    </tbody></table>
    </div>
    <p className="text-[11px] text-slate-500">Appearances and goals per season use the seasons with stats recorded (currently S7). The score ranks each player on cost vs OVR, vs value and per appearance (100 = best value in the squad); goals + assists are left out because they're unfair to defenders.</p>
    </div>);
}

// ─── TRANSFERS ───────────────────────────────────────────────────────
// In: everyone who joined from a club or as a free agent (not the academy
// or the start of the save). Out: former players who were sold. Figures at
// the time use the closest recorded season: the first for signings, the last
// for sales. Type, sell-on % and terms arrive with New Squad.
function transferMoves(squad) {
    const ins = [], outs = [];
    [...squad.current, ...squad.former].forEach(p => {
        const from = p.joined && p.joined.from ? String(p.joined.from).toUpperCase() : '';
        if (from && from !== 'LEGACY' && from !== 'YOUTH ACADEMY' && p.joined.season) {
            const f = p.seasons.find(x => x.s === p.joined.season) || p.seasons[0] || {};
            ins.push({ dir: 'in', p, season: p.joined.season, year: p.joined.year, club: p.joined.from, fee: p.joined.fee || 0, type: 'Buy', age: f.age ?? null, ovr: f.start ?? f.end ?? null, value: firstValue(p) });
        }
        if (p.left && p.left.fee) {
            const l = [...p.seasons].reverse().find(x => x.end != null) || {};
            const season = p.departedSeason || (p.left.year && squad.s1Year ? Math.floor(p.left.year - squad.s1Year) + 1 : null);
            const cost = p.joined && p.joined.fee ? p.joined.fee : 0;
            outs.push({ dir: 'out', p, season, year: p.left.year, club: p.left.to, fee: p.left.fee, type: 'Sale', age: p.age ?? l.age ?? null, ovr: l.end ?? p.ovr, value: l.value ?? p.value, cost, profit: p.left.fee - cost });
        }
    });
    return { ins, outs };
}
function TransfersTab({ squad, clubOf, onOpen }) {
    const phone = useScreen() === 'phone';
    const [inType, setInType] = useState('all');
    const [outType, setOutType] = useState('all');
    const [sortBy, setSortBy] = useState('latest');
    const [q, setQ] = useState('');
    const [clubRank, setClubRank] = useState('count');
    const [ledSeason, setLedSeason] = useState('all');
    const hv = useHover();
    const { ins, outs } = useMemo(() => transferMoves(squad), [squad]);
    const seasons = [...new Set([...ins, ...outs].map(m => m.season).filter(Boolean))].sort((a, b) => a - b);
    const spent = ins.reduce((a, m) => a + m.fee, 0), received = outs.reduce((a, m) => a + m.fee, 0);
    const stripF = moneySet([spent, received, received - spent, ...outs.map(m => m.fee)]);
    const perSeason = seasons.map(s => {
        const i = ins.filter(m => m.season === s), o = outs.filter(m => m.season === s);
        const split = (ms) => ({ summer: ms.filter(m => windowOf(m.year) !== 'winter').reduce((a, m) => a + m.fee, 0), winter: ms.filter(m => windowOf(m.year) === 'winter').reduce((a, m) => a + m.fee, 0) });
        const top = (ms) => [...ms].sort((a, b) => b.fee - a.fee)[0];
        return { s, spent: i.reduce((a, m) => a + m.fee, 0), received: o.reduce((a, m) => a + m.fee, 0), si: split(i), so: split(o), ti: top(i), to: top(o) };
    });
    const maxBar = Math.max(1, ...perSeason.flatMap(x => [x.spent, x.received]));
    const byFee = (ms) => [...ms].sort((a, b) => b.fee - a.fee).slice(0, 5);
    // A season after the last full one (e.g. S8's summer window) is labelled "so far"
    const partial = (s) => squad.lastSeason != null && s > squad.lastSeason;
    const netFmt = moneySet(perSeason.map(x => x.received - x.spent));
    // Hover card: summer and winter on their own lines; one format per card
    const seasonHover = (x) => {
        const net = x.received - x.spent;
        const f = moneySet([x.spent, x.received, x.si.summer, x.si.winter, x.so.summer, x.so.winter, x.ti && x.ti.fee, x.to && x.to.fee, net]);
        // Totals bold and white; subtotals indented, lighter weight and colour
        const sub = (t) => <span className="pl-3 font-normal text-slate-500">{t}</span>;
        const subV = (t) => <span className="font-normal text-slate-300">{t}</span>;
        const tot = (t) => <span className="font-bold text-white">{t}</span>;
        const title = `S${x.s}${partial(x.s) ? ' (so far)' : ''}${squad.s1Year ? ` · ${squad.s1Year + x.s - 1}–${String(squad.s1Year + x.s).slice(2)}` : ''}`;
        return { title: <span className="flex items-baseline justify-between gap-3"><span>{title}</span><Delta v={net} fmt={(v) => f(v, true)}/></span>, rows: [
            [tot('Spent'), tot(f(x.spent))], [sub('☀️ Summer'), subV(f(x.si.summer))], [sub('❄️ Winter'), subV(f(x.si.winter))], x.ti ? [sub('Biggest signing'), subV(`${x.ti.p.name}, ${f(x.ti.fee)}`)] : null,
            [tot('Received'), tot(f(x.received))], [sub('☀️ Summer'), subV(f(x.so.summer))], [sub('❄️ Winter'), subV(f(x.so.winter))], x.to ? [sub('Biggest sale'), subV(`${x.to.p.name}, ${f(x.to.fee)}`)] : null] };
    };
    const topIn = byFee(ins), topOut = byFee(outs), topInF = moneySet(topIn.map(m => m.fee)), topOutF = moneySet(topOut.map(m => m.fee));
    const mostP = [...outs].sort((a, b) => b.profit - a.profit).slice(0, 5), leastP = [...outs].sort((a, b) => a.profit - b.profit).slice(0, 5);
    const pFmt = (ms) => moneySet(ms.map(m => m.profit)), mostF = pFmt(mostP), leastF = pFmt(leastP);
    const pair = (m) => ((f) => `${f(m.cost)} → ${f(m.fee)}`)(moneySet([m.cost, m.fee]));
    const sortMs = (ms) => [...ms].sort((a, b) => sortBy === 'fee' ? b.fee - a.fee : sortBy === 'ovr' ? (b.ovr || 0) - (a.ovr || 0) : sortBy === 'oldest' ? (a.year || 0) - (b.year || 0) : (b.year || 0) - (a.year || 0));
    const match = (m) => (!q.trim() || m.p.name.toLowerCase().includes(q.trim().toLowerCase())) && (ledSeason === 'all' || String(m.season) === ledSeason);
    const shownIn = sortMs(ins.filter(m => match(m) && (inType === 'all' || m.type === inType)));
    const shownOut = sortMs(outs.filter(m => match(m) && (outType === 'all' || m.type === outType)));
    // Top clubs
    // Top clubs leave out free agents (not a club)
    const clubTable = (ms) => { const t = {}; ms.forEach(m => { const k = String(m.club || '').toUpperCase(); if (!k || SPECIAL_SOURCES[k]) return; t[k] = t[k] || { club: m.club, n: 0, fee: 0 }; t[k].n++; t[k].fee += m.fee; }); return Object.values(t).sort((a, b) => clubRank === 'count' ? b.n - a.n || b.fee - a.fee : b.fee - a.fee || b.n - a.n).slice(0, 5); };
    const Row = ({ m, i, big, sub, under }) => (<button type="button" onClick={() => onOpen(m.p)} className="w-full flex items-start gap-2.5 py-2 text-left hover:bg-slate-50 rounded px-1">
        <span className="w-4 pt-0.5 text-xs font-black text-slate-400">{i + 1}</span>
        <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5"><Flag emoji={m.p.flag} size={16}/><span className="text-sm font-bold text-slate-900 truncate">{m.p.name}</span><span className="text-[11px] font-black text-slate-400">{m.p.pos}</span></span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500"><SeasonTag season={m.season} year={m.year}/>{sub}</span>
        </span>
        <span className="text-right whitespace-nowrap"><span className="block text-base font-black tabular-nums text-slate-900">{big}</span>{under && <span className="block text-[11px] tabular-nums text-slate-500">{under}</span>}</span></button>);
    const Ledger = ({ title, ms, type, setType, types, dir, vc = moneyCol(ms.map(m => m.value)), fc = moneyCol(ms.map(m => m.fee)) }) => (<div className="bg-white rounded-xl border border-slate-200 min-w-0">
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3"><div className="text-sm font-extrabold text-slate-900">{title} <span className="font-semibold text-slate-400">({ms.length})</span></div>
    <Segmented value={type} onChange={setType} options={[{ value: 'all', label: 'All' }, ...types.map(t => ({ value: t, label: t }))]}/></div>
    <div className="overflow-auto max-h-[70vh] mt-2"><table className="w-full text-xs border-separate border-spacing-0"><thead className="sticky top-0 z-10"><tr className="text-slate-600 font-bold bg-slate-50 text-left whitespace-nowrap shadow-[0_1px_0_#e2e8f0]">
    <th className="py-2 px-2 pl-3">Season</th><th className="py-2 px-2">Pos</th><th className="py-2 px-2">Player</th><th className="py-2 px-2 text-center" title="At the time (closest recorded season)">Age</th><th className="py-2 px-2 text-center" title="At the time (closest recorded season)">OVR</th><th className="py-2 px-2 text-right" title="At the time (closest recorded season)">Value</th>
    <th className="py-2 px-2">{dir === 'in' ? 'From' : 'To'}</th><th className="py-2 px-2">Type</th><th className="py-2 px-2 text-right">Fee</th><th className="py-2 px-2 text-center">Sell-on</th><th className="py-2 px-2 pr-3 text-center">Terms</th>
    </tr></thead><tbody className="whitespace-nowrap">
        {ms.map((m, i) => (<tr key={i} onClick={() => onOpen(m.p)} className="cursor-pointer hover:bg-rose-50 [&>td]:border-b [&>td]:border-slate-100">
        <td className="py-1.5 px-2 pl-3"><SeasonTag season={m.season} year={m.year}/></td><td className="py-1.5 px-2 font-black text-slate-700">{m.p.pos}</td><td className="py-1.5 px-2"><NameCell p={m.p}/></td>
        <td className="py-1.5 px-2 text-center tabular-nums">{m.age ?? '–'}</td><td className="py-1.5 px-2 text-center"><OvrNum v={m.ovr}/></td><td className="py-1.5 px-2 text-right tabular-nums">{vc(m.value)}</td>
        <td className="py-1.5 px-2"><ClubTag name={m.club} clubOf={clubOf}/></td><td className="py-1.5 px-2 text-slate-600">{m.type}</td>
        <td className="py-1.5 px-2 text-right tabular-nums font-black">{m.fee ? fc(m.fee) : <span className="text-slate-400 font-semibold">Free</span>}</td>
        <td className="py-1.5 px-2 text-center text-slate-300">–</td><td className="py-1.5 px-2 pr-3 text-center text-slate-300" title="Swap and loan-to-buy terms arrive with New Squad">–</td>
        </tr>))}
    </tbody></table>{!ms.length && <div className="p-4 text-center text-xs text-slate-400">No transfers here.</div>}</div>
    </div>);
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Spent" icon={TrendingUp} iconClassName="text-rose-300" value={stripF(spent)} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left={`${ins.filter(m => m.fee > 0).length} paid signings`} right=""/>
    <HighlightCard label="Received" icon={TrendingUp} iconClassName="text-emerald-300" value={stripF(received)} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={`${outs.length} sales`} right=""/>
    <HighlightCard label="Net" icon={Star} iconClassName="text-amber-300" value={stripF(received - spent, true)} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={received - spent >= 0 ? 'Profit on transfers' : 'Net spend on transfers'} right=""/>
    <HighlightCard label="Record sale" icon={Sparkles} iconClassName="text-sky-300" value={outs.length ? stripF(topOut[0].fee) : '–'} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={outs.length ? `${byFee(outs)[0].p.name} to ${titleCase(byFee(outs)[0].club)}` : ''} right=""/>
    </HighlightsBar>
    {/* Transfer Income & Spending */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
    <div className="flex items-center justify-between"><div className="text-sm font-extrabold text-slate-900">Transfer Income & Spending</div>
    <div className="flex gap-3 text-[11px] font-semibold text-slate-600"><span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-rose-400"/>Spent</span><span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500"/>Received</span></div></div>
    {/* Phones: one row per season, sideways bars (spent above received), net at the end */}
    {phone ? (<div className="space-y-2 pt-1">
        {perSeason.map(x => { const net = x.received - x.spent; return (<div key={x.s} className="grid grid-cols-[52px_minmax(0,1fr)_74px] items-center gap-2" {...hv(seasonHover(x))}>
        <span className="text-[11px] font-bold text-slate-500 leading-tight">S{x.s}{partial(x.s) ? <span className="block font-semibold text-slate-400">so far</span> : null}</span>
        <div className="space-y-1">
        <div className="h-2.5 rounded-r bg-rose-400" style={{ width: `${Math.max(1, (x.spent / maxBar) * 100)}%` }}/>
        <div className="h-2.5 rounded-r bg-emerald-500" style={{ width: `${Math.max(1, (x.received / maxBar) * 100)}%` }}/>
        </div>
        <span className={`text-right text-[11px] font-black tabular-nums whitespace-nowrap ${net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netFmt(net, true)}</span>
        </div>); })}
    </div>) : (<>
    <div className="flex items-end gap-4 h-56 pt-4">
        {perSeason.map(x => { const net = x.received - x.spent; return (<div key={x.s} className="flex-1 flex flex-col items-center gap-1 h-full" {...hv(seasonHover(x))}>
        <div className="flex-1 w-full flex items-end justify-center gap-1.5">
        <div className="w-[38%] rounded-t bg-rose-400" style={{ height: `${(x.spent / maxBar) * 100}%` }}/>
        <div className="w-[38%] rounded-t bg-emerald-500" style={{ height: `${(x.received / maxBar) * 100}%` }}/>
        </div>
        <span className={`text-[11px] font-black tabular-nums ${net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netFmt(net, true)}</span>
        <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">S{x.s}{partial(x.s) ? ' (so far)' : ''}</span>
        </div>); })}
    </div>
    </>)}
    <p className="text-[11px] text-slate-500">{phone ? 'Net at the end of each row. Tap a season for the summer / winter split and its biggest deals.' : 'Net under each pair. Hover a season for the summer / winter split and its biggest deals.'}</p>
    </div>
    {/* Leaderboards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
    <Board title="Biggest Fees Received" rows={topOut} render={(m, i) => <Row key={i} m={m} i={i} big={topOutF(m.fee)} sub={<ClubTag name={m.club} clubOf={clubOf}/>}/>}/>
    <Board title="Biggest Fees Paid" rows={topIn} render={(m, i) => <Row key={i} m={m} i={i} big={topInF(m.fee)} sub={<ClubTag name={m.club} clubOf={clubOf}/>}/>}/>
    <Board title="Most Profitable Sales" rows={mostP} render={(m, i) => <Row key={i} m={m} i={i} big={<span className="text-emerald-700">{mostF(m.profit, true)}</span>} sub={<ClubTag name={m.club} clubOf={clubOf}/>} under={pair(m)}/>}/>
    <Board title="Least Profitable Sales" rows={leastP} render={(m, i) => <Row key={i} m={m} i={i} big={<span className={m.profit < 0 ? 'text-rose-700' : 'text-slate-900'}>{leastF(m.profit, true)}</span>} sub={<ClubTag name={m.club} clubOf={clubOf}/>} under={pair(m)}/>}/>
    </div>
    {/* Top clubs */}
    <div className="space-y-2">
    <div className="flex items-center justify-between"><div className="text-sm font-extrabold text-slate-900">Top Clubs</div><Segmented value={clubRank} onChange={setClubRank} options={[{ value: 'count', label: 'By players' }, { value: 'fee', label: 'By fees' }]}/></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[['Signed From', ins], ['Sold To', outs]].map(([t, ms]) => (<Board key={t} title={t} rows={clubTable(ms)} render={(c, i) => (<div key={i} className="flex items-center gap-2.5 py-2 px-1"><span className="w-4 text-xs font-black text-slate-400">{i + 1}</span><span className="flex-1 min-w-0 overflow-hidden"><ClubTag name={c.club} clubOf={clubOf}/></span>
        <span className="shrink-0 flex flex-col items-end sm:flex-row sm:items-center sm:gap-2.5"><span className={`text-[12px] sm:text-sm tabular-nums whitespace-nowrap ${clubRank === 'count' ? 'font-black text-slate-900' : 'text-slate-500'}`}>{c.n} player{c.n === 1 ? '' : 's'}</span><span className={`sm:w-24 text-right text-[12px] sm:text-sm tabular-nums whitespace-nowrap ${clubRank === 'fee' ? 'font-black text-slate-900' : 'text-slate-500'}`}>{moneySet(clubTable(ms).map(x => x.fee))(c.fee)}</span></span></div>)}/>))}
    </div>
    </div>
    {/* The database: in and out side by side */}
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-wrap items-end gap-x-8 gap-y-3 min-w-0 max-w-full">
    <div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Calendar}>Season</ControlLabel>
    <FilterPills accent="maroon" value={ledSeason} onChange={setLedSeason} options={[{ value: 'all', label: 'All' }, ...seasons.map(x => ({ value: String(x), label: `S${x}` }))]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={List}>Sort</ControlLabel>
    <Segmented value={sortBy} onChange={setSortBy} options={[{ value: 'latest', label: 'Latest first' }, { value: 'oldest', label: 'Oldest first' }, { value: 'fee', label: 'Biggest fee' }, { value: 'ovr', label: 'Highest OVR' }]}/></div>
    </div>
    <SearchInput accent="maroon" className="w-56" value={q} onChange={setQ} placeholder="Search player..."/>
    </div>
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
    <Ledger title="Transfers In" ms={shownIn} type={inType} setType={setInType} types={['Loan', 'LTB', 'Swap', 'Buy']} dir="in"/>
    <Ledger title="Transfers Out" ms={shownOut} type={outType} setType={setOutType} types={['Loan', 'Swap', 'Sale']} dir="out"/>
    </div>
    <p className="text-[11px] text-slate-500">Age, OVR and value at the time use the closest recorded season (the first for a signing, the last for a sale). Transfer type, sell-on % and swap / loan-to-buy terms arrive with New Squad; until then every signing reads Buy and every sale reads Sale.</p>
    </div>);
}

// ─── FORMER PLAYERS ──────────────────────────────────────────────────
const HOW_LEFT = (p) => (p.tier === 'retired' || p.role === 'RETIRED' ? 'Retired' : p.role === 'SOLD' ? 'Sold' : p.role === 'NOT RENEWED' ? 'Not renewed' : p.role === 'LOAN ENDED' ? 'Loan ended' : 'Other');
function FormerTab({ squad, clubOf, onOpen }) {
    const [season, setSeason] = useState('all');
    const [how, setHow] = useState('all');
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('left');
    const [asc, setAsc] = useState(false);
    const [scatterX, setScatterX] = useState('ovr');
    const hv = useHover();
    const [scBox, scW] = useWidth(520);
    // Scrub on the Sale Fee scatter: the chart publishes its geometry here each render
    const scGeom = useRef(null);
    const scScrub = useScrub((e) => {
        const g = scGeom.current;
        if (!g) return null;
        const r = e.currentTarget.getBoundingClientRect();
        const v = g.xLo + ((e.clientX - r.left - g.m.l) / (g.W - g.m.l - g.m.r)) * (g.xHi - g.xLo);
        const xs = [...new Set(g.pts.map(g.xOf))].sort((a, b) => Math.abs(a - v) - Math.abs(b - v));
        if (!xs.length) return null;
        const at = g.pts.filter(p => g.xOf(p) === xs[0]).sort((a, b) => b.left.fee - a.left.fee);
        const f = moneySet(at.map(p => p.left.fee));
        return { title: <span>{g.xLabel} {g.fmtX(xs[0])}</span>, rows: at.map(p => [<span className="text-white font-bold">{p.name}</span>, f(p.left.fee)]), note: 'Sale fee' };
    });
    const all = squad.former;
    const seasons = [...new Set(all.map(p => p.departedSeason).filter(Boolean))].sort((a, b) => a - b);
    const hows = ['Sold', 'Not renewed', 'Retired', 'Loan ended', 'Other'].filter(h => all.some(p => HOW_LEFT(p) === h));
    const pl = (p) => (p.left && p.left.fee ? p.left.fee - ((p.joined && p.joined.fee) || 0) : (p.tenure && p.tenure.pl != null ? p.tenure.pl : null));
    const shown = all.filter(p => (season === 'all' || String(p.departedSeason) === season) && (how === 'all' || HOW_LEFT(p) === how) && (!q.trim() || `${p.name} ${p.left ? p.left.to : ''}`.toLowerCase().includes(q.trim().toLowerCase())));
    const key = { pos: p => POS_ORDER.indexOf(p.pos) * 1000 - (p.ovr || 0), name: p => p.name, age: p => p.age || 0, ovr: p => p.ovr || 0, value: p => p.value || 0, wage: p => p.wage || 0,
        app: p => p.career.app || 0, g: p => p.career.g || 0, a: p => p.career.a || 0, cs: p => p.career.cs || 0, left: p => (p.left && p.left.year) || p.departedSeason || 0, fee: p => (p.left && p.left.fee) || 0,
        joined: p => (p.joined && p.joined.year) || 0, cost: p => (p.joined && p.joined.fee) || 0, years: p => (p.tenure && p.tenure.years) || 0, ovrSince: p => ovrSinceJoining(p) ?? -99, pl: p => pl(p) ?? -9999 }[sortBy];
    const sorted = [...shown].sort((a, b) => { const x = key(a), y = key(b); const d = typeof x === 'string' ? x.localeCompare(y) : x - y; return asc ? d : -d; });
    // Money columns keep their own decimals, lined up on the decimal point
    const fcV = moneyCol(sorted.map(p => p.value)), fcW = moneyCol(sorted.map(p => p.wage), 'K');
    const fcS = moneyCol(sorted.map(p => p.left && p.left.fee)), fcB = moneyCol(sorted.map(p => (p.joined && p.joined.fee) || 0)), fcP = moneyCol(sorted.map(p => pl(p)));
    const sort = (k, defAsc) => { if (sortBy === k) setAsc(!asc); else { setSortBy(k); setAsc(defAsc); } };
    const TH = ({ k, children, defAsc = false, cls = '' }) => (<th onClick={() => sort(k, defAsc)} className={`py-2 px-2 cursor-pointer select-none whitespace-nowrap hover:text-slate-900 ${cls}`}>{children}{sortBy === k ? (asc ? ' ▲' : ' ▼') : ''}</th>);
    const sold = all.filter(p => p.left && p.left.fee);
    const record = [...sold].sort((a, b) => b.left.fee - a.left.fee)[0];
    const servant = [...all].filter(p => p.tenure && p.tenure.years).sort((a, b) => b.tenure.years - a.tenure.years)[0];
    const totalPL = all.reduce((a, p) => a + (pl(p) || 0), 0);
    const stripF = moneySet([record ? record.left.fee : null, totalPL]);
    const filtersOn = season !== 'all' || how !== 'all' || q.trim();
    const B = 'border-l border-slate-100';
    return (<div className="space-y-5">
    <HighlightsBar accent="maroon" columns={4}>
    <HighlightCard label="Former players" icon={Users} iconClassName="text-rose-200" value={all.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${sold.length} sold for ${money(sold.reduce((a, p) => a + p.left.fee, 0))}`} right=""/>
    <HighlightCard label="Record sale" icon={TrendingUp} iconClassName="text-emerald-300" value={record ? stripF(record.left.fee) : '–'} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={record ? `${record.name} to ${titleCase(record.left.to)}` : ''} right=""/>
    <HighlightCard label="Profit on sales" icon={Star} iconClassName="text-amber-300" value={stripF(totalPL, true)} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left="Sale fees minus what they cost" right=""/>
    <HighlightCard label="Longest at the club" icon={Clock} iconClassName="text-sky-300" value={servant ? `${servant.tenure.years} seasons` : '–'} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={servant ? servant.name : ''} right=""/>
    </HighlightsBar>
    {/* Charts: how they left, departures by season, sales */}
    {(() => {
        // Lighter tints (v49.3): maroon stepped back for these charts
        const HOW_COLORS = { Sold: '#b9677a', 'Not renewed': '#94a3b8', Retired: '#d1a054', 'Loan ended': '#7cc4ec', Other: '#e2e8f0' };
        const counts = hows.map(h => { const ps = all.filter(p => HOW_LEFT(p) === h); return { h, ps, n: ps.length }; });
        const maxN = Math.max(1, ...counts.map(c => c.n));
        const bySeason = seasons.map(se => ({ se, parts: hows.map(h => ({ h, ps: all.filter(p => p.departedSeason === se && HOW_LEFT(p) === h) })) }));
        const maxS = Math.max(1, ...bySeason.map(b => b.parts.reduce((a, x) => a + x.ps.length, 0)));
        const solds = all.filter(p => p.left && p.left.fee);
        const xOf = (p) => (scatterX === 'ovr' ? p.ovr : scatterX === 'value' ? p.value : p.age);
        const pts = solds.filter(p => xOf(p) != null);
        // Real size (v50.01): drawn at the box's width
        const W = Math.max(280, scW), H = 280, m = { l: 52, r: 14, t: 12, b: 34 };
        const xs = pts.map(xOf), ys = pts.map(p => p.left.fee);
        const xLo = scatterX === 'value' ? 0 : Math.min(...xs) - 1, xHi = scatterX === 'value' ? niceTicks(Math.max(...xs) * 1.02, 5).slice(-1)[0] : Math.max(...xs) + 1;
        // Round money ticks; the axis top is the last tick
        const yTicks = niceTicks(Math.max(...ys, scatterX === 'value' ? Math.max(...xs) : 0) * 1.02), yHi = yTicks[yTicks.length - 1], yTF = tickFmt(yTicks);
        const xTicks = scatterX === 'value' ? niceTicks(xHi, 5) : null, xTF = xTicks ? tickFmt(xTicks) : null;
        const X = (v) => m.l + ((v - xLo) / Math.max(1, xHi - xLo)) * (W - m.l - m.r), Y = (v) => m.t + (1 - v / yHi) * (H - m.t - m.b);
        const xLabel = { ovr: 'OVR at sale', value: 'Value at sale', age: 'Age at sale' }[scatterX];
        const fmtX = (v) => (scatterX === 'value' ? money(v) : v);
        scGeom.current = { xLo, xHi, m, W, pts, xOf, xLabel, fmtX };
        const ticks = (lo, hi, n) => Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n);
        return (<div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* How They Left: one row per way of leaving, with the share as a bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
        <div className="text-sm font-extrabold text-slate-900">How They Left</div>
        {/* How, Players (with the bar) and Share only (v50.01) */}
        <table className="w-full text-[12px]"><thead><tr className="text-[11px] font-bold text-slate-500 text-left border-b border-slate-100">
            <th className="py-1.5 pr-2">How</th><th className="py-1.5 px-2 w-full">Players</th><th className="py-1.5 pl-2 text-right">Share</th>
        </tr></thead><tbody className="divide-y divide-slate-100">
            {counts.map(c => (<tr key={c.h}>
            <td className="py-2 pr-2 whitespace-nowrap font-semibold text-slate-700"><span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ backgroundColor: HOW_COLORS[c.h] }}/>{c.h}</td>
            <td className="py-2 px-2"><div className="flex items-center gap-2"><div className="flex-1 h-4 rounded bg-slate-100"><div className="h-full rounded" style={{ width: `${(c.n / maxN) * 100}%`, backgroundColor: HOW_COLORS[c.h] }}/></div><span className="w-8 text-right font-black tabular-nums text-slate-900">{c.n}</span></div></td>
            <td className="py-2 pl-2 text-right tabular-nums text-slate-600">{Math.round((c.n / Math.max(1, all.length)) * 100)}%</td>
            </tr>))}
        </tbody></table>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between"><div className="text-sm font-extrabold text-slate-900">Departures By Season</div>
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">{hows.map(h => <span key={h} className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: HOW_COLORS[h] }}/>{h}</span>)}</div></div>
        <div className="flex items-end gap-2 flex-1 min-h-[12rem] pt-2">
            {bySeason.map(b => { const tot = b.parts.reduce((a, x) => a + x.ps.length, 0); return (<div key={b.se} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-[11px] font-black tabular-nums text-slate-700">{tot}</span>
            <div className="w-full flex flex-col-reverse rounded-t overflow-hidden" style={{ height: `${(tot / maxS) * 100}%` }}>
                {b.parts.filter(x => x.ps.length).map(x => <div key={x.h} style={{ flex: x.ps.length, backgroundColor: HOW_COLORS[x.h] }} {...hv({ title: `S${b.se} · ${x.h}`, rows: [['Players', x.ps.length], ...x.ps.slice(0, 5).map(p => [p.pos, p.name])], note: x.ps.length > 5 ? `+${x.ps.length - 5} more` : null })}/>)}
            </div>
            <span className="text-[11px] font-bold text-slate-500">S{b.se}</span></div>); })}
        </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm font-extrabold text-slate-900">Sale Fee Vs {tcWords(xLabel)}</div>
        <Segmented className="whitespace-nowrap" value={scatterX} onChange={setScatterX} options={[{ value: 'ovr', label: 'OVR' }, { value: 'value', label: 'Value' }, { value: 'age', label: 'Age' }]}/></div>
        <div ref={scBox} className="w-full" {...scScrub}><svg width={W} height={H} className="block">
            {yTicks.map((v, i) => <g key={i}><line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#f1f5f9"/><text x={m.l - 6} y={Y(v)} dy="0.35em" textAnchor="end" fontSize="11" fill="#64748b">{yTF(v)}</text></g>)}
            {(xTicks || ticks(xLo, xHi, 5)).map((v, i) => <text key={i} x={X(v)} y={H - m.b + 15} textAnchor="middle" fontSize="11" fill="#64748b">{xTF ? xTF(v) : Math.round(v)}</text>)}
            <text x={(W + m.l) / 2} y={H - 3} textAnchor="middle" fontSize="11" fill="#94a3b8">{xLabel}</text>
            {scatterX === 'value' && <line x1={X(0)} y1={Y(0)} x2={X(Math.min(xHi, yHi))} y2={Y(Math.min(xHi, yHi))} stroke="#94a3b8" strokeDasharray="4 4"/>}
            {pts.map(p => { const cost = (p.joined && p.joined.fee) || 0; const pl = p.left.fee - cost; return (<circle key={p.id} cx={X(xOf(p))} cy={Y(p.left.fee)} r="5" fill={pl >= 0 ? '#047857' : '#be123c'} fillOpacity="0.75" stroke="#fff" strokeWidth="1" className="cursor-pointer" onClick={() => onOpen(p)}
                {...hv({ title: `${p.name} · ${p.pos}`, action: { label: 'Open profile', run: () => onOpen(p) }, rows: ((f) => [['Sold to', titleCase(p.left.to || '–')], ['Fee', f(p.left.fee)], [xLabel, scatterX === 'ovr' ? <OvrNum v={xOf(p)} dark/> : fmtX(xOf(p))], ['Cost', f(cost)], ['P/L', <Delta v={pl} fmt={(v) => f(v, true)}/>]])(moneySet([p.left.fee, cost, pl])) })}/>); })}
        </svg></div>
        <p className="text-[11px] text-slate-500">Green = sold for more than he cost, red = less.{scatterX === 'value' ? ' Above the dashed line = sold for more than his value.' : ''}</p>
        </div>
        </div>); })()}
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-wrap items-end gap-x-6 gap-y-3 min-w-0 max-w-full">
    <div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Calendar}>Left in</ControlLabel>
    <FilterPills accent="maroon" value={season} onChange={setSeason} options={[{ value: 'all', label: 'All', badge: all.length }, ...seasons.map(s => ({ value: String(s), label: `S${s}`, badge: all.filter(p => p.departedSeason === s).length }))]}/></div>
    <div className="flex flex-col gap-1.5"><ControlLabel accent="maroon" icon={Filter}>How they left</ControlLabel>
    <Segmented value={how} onChange={setHow} options={[{ value: 'all', label: 'All' }, ...hows.map(h => ({ value: h, label: h }))]}/></div>
    </div>
    <div className="flex items-end gap-2"><SearchInput accent="maroon" className="w-56" value={q} onChange={setQ} placeholder="Search player or club..."/><ResetButton disabled={!filtersOn} onClick={() => { setSeason('all'); setHow('all'); setQ(''); }}/></div>
    </div>
    <div className="overflow-auto max-h-[78vh] bg-white rounded-xl border border-slate-200">
    <table className="w-full text-xs border-separate border-spacing-0">
    <thead className="whitespace-nowrap sticky top-0 z-10">
    <tr className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50">
        {[['Details', 3], ['Attributes', 4], ['Contract', 2], ['Career stats', 4], ['Left', 4], ['Transfer in', 3], ['Tenure', 3]].map(([g, n], gi) => (<th key={g} colSpan={n} className={`pt-2 pb-1 px-2 text-left ${gi ? 'border-l border-slate-200' : 'pl-3'}`}><span className="inline-block border-b-2 pb-0.5" style={{ borderColor: SQUAD_ACCENT }}>{g}</span></th>))}
    </tr>
    <tr className="text-slate-600 font-bold bg-slate-50 text-left shadow-[0_1px_0_#e2e8f0]">
    <TH k="pos" defAsc cls="pl-3">Pos</TH><TH k="name" defAsc>Player</TH><th className="py-2 px-2 text-center">Ft</th>
    <TH k="age" defAsc cls="text-center border-l border-slate-200">Age</TH><TH k="ovr" cls="text-center">OVR</TH><th className="py-2 px-2">Pot.</th><th className="py-2 px-2">PS</th>
    <TH k="value" cls="text-right border-l border-slate-200">Value</TH><TH k="wage" cls="text-right">Wage/wk</TH>
    <TH k="app" cls="text-center border-l border-slate-200">App</TH><TH k="g" cls="text-center">G</TH><TH k="a" cls="text-center">A</TH><TH k="cs" cls="text-center">CS</TH>
    <TH k="left" cls="border-l border-slate-200">When</TH><th className="py-2 px-2">How</th><th className="py-2 px-2">To</th><TH k="fee" cls="text-right">Fee</TH>
    <TH k="joined" cls="border-l border-slate-200">When</TH><th className="py-2 px-2">From</th><TH k="cost" cls="text-right">Fee</TH>
    <TH k="years" cls="text-center border-l border-slate-200">Yrs</TH><TH k="ovrSince" cls="text-center">OVR ±</TH><TH k="pl" cls="text-right pr-3">P/L</TH>
    </tr></thead>
    <tbody className="whitespace-nowrap">
        {sorted.map(p => { const since = ovrSinceJoining(p); const v = pl(p); const from = p.joined && p.joined.from ? String(p.joined.from).toUpperCase() : ''; return (<tr key={p.id} onClick={() => onOpen(p)} className="cursor-pointer hover:bg-rose-50 [&>td]:border-b [&>td]:border-slate-100">
        <td className="py-1.5 px-2 pl-3"><PosCell p={p}/></td><td className="py-1.5 px-2"><NameCell p={p}/></td><td className="py-1.5 px-2 text-center font-bold text-slate-500">{p.foot}</td>
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{p.age ?? '–'}</td><td className="py-1.5 px-2 text-center"><OvrNum v={p.ovr}/></td>
        <td className="py-1.5 px-2"><span className="inline-flex items-center gap-1"><span className={`tabular-nums font-bold ${p.potentialImplied ? 'italic opacity-60' : ''}`} style={{ color: ovrColor(p.potential) }}>{p.potential ?? '–'}</span><DevText code={p.dev}/></span></td>
        <td className="py-1.5 px-2 text-[11px] tracking-[0.15em]" style={{ color: SQUAD_ACCENT }}>{p.ps ? '◆'.repeat(p.ps) : <span className="text-slate-300 tracking-normal">–</span>}</td>
        <td className={`py-1.5 px-2 text-right tabular-nums font-bold ${B}`}>{fcV(p.value)}</td><td className="py-1.5 px-2 text-right tabular-nums text-slate-600">{fcW(p.wage)}</td>
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{p.career.app ?? ''}</td><td className="py-1.5 px-2 text-center tabular-nums">{p.career.g ?? ''}</td><td className="py-1.5 px-2 text-center tabular-nums">{p.career.a ?? ''}</td><td className="py-1.5 px-2 text-center tabular-nums">{p.career.cs ?? ''}</td>
        <td className={`py-1.5 px-2 ${B}`}><SeasonTag season={p.departedSeason} year={p.left && p.left.year}/></td><td className="py-1.5 px-2 text-slate-600">{HOW_LEFT(p)}</td>
        <td className="py-1.5 px-2">{p.left && p.left.to && !['Not renewed', 'Retired'].includes(HOW_LEFT(p)) ? <ClubTag name={p.left.to} clubOf={clubOf}/> : null}</td>
        <td className="py-1.5 px-2 text-right tabular-nums font-black">{p.left && p.left.fee ? fcS(p.left.fee) : <span className="text-slate-300 font-normal">–</span>}</td>
        <td className={`py-1.5 px-2 ${B}`}><SeasonTag season={p.joined && p.joined.season} year={p.joined && p.joined.year}/></td>
        <td className="py-1.5 px-2"><ClubTag name={p.joined && p.joined.from} clubOf={clubOf}/></td>
        <td className="py-1.5 px-2 text-right tabular-nums">{from === 'YOUTH ACADEMY' || from === 'FREE AGENT' ? fcB(0) : p.joined && p.joined.fee != null ? fcB(p.joined.fee) : <span className="text-slate-300">–</span>}</td>
        <td className={`py-1.5 px-2 text-center tabular-nums ${B}`}>{p.tenure && p.tenure.years != null ? p.tenure.years : '–'}</td>
        <td className={`py-1.5 px-2 text-center tabular-nums font-bold ${since > 0 ? 'text-emerald-700' : since < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{since == null ? '–' : since > 0 ? `▲${since}` : since < 0 ? `▼${-since}` : '–'}</td>
        <td className={`py-1.5 px-2 pr-3 text-right tabular-nums font-black ${v > 0 ? 'text-emerald-700' : v < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{v == null ? '–' : fcP(v, true)}</td>
        </tr>); })}
    </tbody></table>
    {!sorted.length && <div className="p-6 text-center text-xs text-slate-500">No former players match these filters.</div>}
    </div>
    </div>);
}

// ─── INTERACTIONS ────────────────────────────────────────────────────
// Phone-first page to record player interactions: every current player,
// with a green (positive) and a red (negative) row of the same five
// emoji. Tap to light one up, tap again to turn it off. No maximum, no
// locking between sides (for playtesting). Test version: taps are kept
// for this session only; saving to the sheet comes with the next Sheets
// build.
const INTERACTIONS = ['🪷', '🤝', '📣', '🤬', '👏'];
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '');
function InteractionsTab({ squad, interactions, onToggle, onOpen }) {
    const [team, setTeam] = useState('all');
    const [q, setQ] = useState('');
    const all = squad.current;
    const list = all.filter(p => (team === 'all' || String(p.tier) === team) && (!q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())))
        .sort((a, b) => POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b.pos) || (b.ovr || 0) - (a.ovr || 0));
    const Row = ({ p, side }) => {
        const lit = ((interactions[p.id] || {})[side]) || [];
        const pos = side === 'pos';
        return (<div className={`flex items-center gap-1.5 rounded-xl p-1.5 border ${pos ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <span className={`w-5 text-center text-sm font-black ${pos ? 'text-emerald-700' : 'text-rose-700'}`}>{pos ? '+' : '−'}</span>
            {INTERACTIONS.map(e => { const on = lit.includes(e); return (<button key={e} type="button" onClick={() => onToggle(p.id, side, e)} aria-pressed={on}
                className={`flex-1 h-11 rounded-lg text-xl leading-none transition select-none active:scale-95 ${on ? `bg-white shadow-sm ring-2 ${pos ? 'ring-emerald-500' : 'ring-rose-500'}` : 'bg-white/40 grayscale opacity-35 hover:opacity-60'}`}>{e}</button>); })}
        </div>);
    };
    return (<div className="space-y-4">
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900">
    <strong>Test version:</strong> taps are kept for this session only (refreshing clears them). Saving to the sheet comes with the next Sheets build.
    </div>
    <div className="flex flex-wrap items-end gap-x-6 gap-y-3 min-w-0 max-w-full">
    <div className="flex flex-col gap-1.5 min-w-0 max-w-full"><ControlLabel accent="maroon" icon={Users}>Team</ControlLabel>
    <FilterPills accent="maroon" value={team} onChange={setTeam} options={[
        { value: 'all', label: 'All', badge: all.length },
        { value: '1', label: '❶', badge: all.filter(p => p.tier === 1).length },
        { value: '2', label: '❷', badge: all.filter(p => p.tier === 2).length },
        { value: '3', label: '❸', badge: all.filter(p => p.tier === 3).length },
        { value: 'loan', label: 'On loan', badge: all.filter(p => p.tier === 'loan').length },
    ]}/></div>
    <SearchInput accent="maroon" className="w-full sm:w-64" value={q} onChange={setQ} placeholder="Find a player..."/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
        {list.map(p => { const rec = interactions[p.id]; return (<div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
        <span className="w-9 text-xs font-black text-slate-900">{p.pos}</span>
        <Flag emoji={p.flag} size={20}/>
        <button type="button" onClick={() => onOpen(p)} className="text-sm font-extrabold text-slate-900 truncate flex-1 text-left">{p.name}</button>
        {rec && rec.updated && <span className="text-[11px] text-slate-400 shrink-0">{fmtDate(rec.updated)}</span>}
        <span className="shrink-0 w-5 flex justify-end"><StatusIcon p={p}/></span>
        </div>
        <Row p={p} side="pos"/>
        <Row p={p} side="neg"/>
        </div>); })}
    </div>
    {!list.length && <div className="p-6 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-xl">No players match.</div>}
    </div>);
}

// ─── PLAYER PROFILE ──────────────────────────────────────────────────
// A centred pop-up (sibling of the Pyramid club viewer). Each tab shows one
// slice across the squad; the profile shows every slice for one player:
// header, one combined chart, then a snapshot from each tab.
// Combined chart: one column per season (season + his age). OVR line in
// front on the left scale (segments green up / red down, labelled; dark
// green above his potential); potential as a dashed line with the room to it
// shaded purple; value as muted bars behind on the right scale, with the
// value change above each (red edge = a drop). Hover a season for details.
function ProfileChart({ p, squad }) {
    const hv = useHover();
    // Drawn at real pixel size so the text matches the page
    const [box, width] = useWidth(900);
    const ss = p.seasons.filter(x => x.end != null);
    if (!ss.length) return <div className="text-xs text-slate-400 p-4 text-center">No seasons recorded yet.</div>;
    const W = Math.max(280, width), H = 300, m = { l: 40, r: W < 420 ? 52 : 64, t: 24, b: 42 };
    const pot = p.potential;
    const ovrs = ss.flatMap(x => [x.start, x.end]).filter(v => v != null).concat(pot != null ? [pot] : []);
    const lo = Math.max(30, Math.floor((Math.min(...ovrs) - 3) / 5) * 5), hi = Math.min(100, Math.ceil((Math.max(...ovrs) + 3) / 5) * 5);
    // Value axis: round ticks (0, middle, top), with headroom above the top bar
    const vTicks = niceTicks(Math.max(1, ...ss.map(x => x.value || 0)), 2), vTF = tickFmt(vTicks);
    const vMax = vTicks[vTicks.length - 1] * 1.12;
    const barF = moneySet(ss.map(x => x.value));
    const colW = (W - m.l - m.r) / ss.length;
    const cx = (i) => m.l + colW * (i + 0.5);
    const Y = (v) => m.t + (1 - (v - lo) / (hi - lo)) * (H - m.t - m.b);
    const VY = (v) => m.t + (1 - v / vMax) * (H - m.t - m.b);
    const base = H - m.b;
    // segments: within each season, from its start (left of the column) to its end (column centre)
    const segs = ss.map((x, i) => ({ x1: i === 0 ? cx(0) - colW * 0.38 : cx(i - 1), y1: i === 0 ? (x.start ?? x.end) : ss[i - 1].end, x2: cx(i), y2: x.end, c: x.change ?? (i ? x.end - ss[i - 1].end : 0), s: x }));
    const segColor = (g) => (g.c < 0 ? '#e11d48' : pot != null && g.y2 > pot ? '#065f46' : g.c > 0 ? '#16a34a' : '#94a3b8');
    const ovrTicks = Array.from({ length: Math.floor((hi - lo) / 5) + 1 }, (_, i) => lo + i * 5).filter(v => v <= hi);
    const bw = Math.min(colW * 0.5, 140);
    const startLabel = routeOf(p) === 'legacy' ? 'S1 start' : 'Joined';
    return (<div ref={box} className="w-full">
    <svg width={W} height={H} className="block font-sans overflow-visible">
        {ovrTicks.map(v => <g key={v}><line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#f1f5f9"/><text x={m.l - 6} y={Y(v)} dy="0.35em" textAnchor="end" fontSize="11" fill="#64748b">{v}</text></g>)}
        {vTicks.map(v => <text key={v} x={W - m.r + 6} y={VY(v)} dy="0.35em" fontSize="11" fill="#94a3b8">{vTF(v)}</text>)}
        <text x={m.l - 30} y={m.t - 10} fontSize="11" fontWeight="700" fill="#64748b">OVR</text>
        <text x={W - m.r + 6} y={m.t - 10} fontSize="11" fontWeight="700" fill="#94a3b8">Value</text>
        {/* value bars, muted, behind; the value sits inside at the bottom */}
        {ss.map((x, i) => x.value != null && (<g key={`v${i}`}>
            <rect x={cx(i) - bw / 2} y={VY(x.value)} width={bw} height={base - VY(x.value)} rx="3" fill="#e2e8f0"/>
            {bw >= 44 && <text x={cx(i)} y={base - VY(x.value) >= 22 ? base - 7 : VY(x.value) - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{barF(x.value)}</text>}
        </g>))}
        {/* value change: in the gap before each bar */}
        {bw >= 44 && ss.map((x, i) => x.valueChange != null && (<text key={`vc${i}`} x={i === 0 ? cx(0) - bw / 2 - 6 : (cx(i - 1) + cx(i)) / 2} y={base - 7} textAnchor={i === 0 ? 'end' : 'middle'} fontSize="11" fontWeight="700" fill={x.valueChange < 0 ? '#be123c' : '#047857'}>{x.valueChange > 0 ? '+' : ''}{Math.round(x.valueChange * 100)}%</text>))}
        {/* potential: dashed line, the room below it shaded, label at the left */}
        {pot != null && pot >= lo && pot <= hi && (<>
            {segs.map((g, i) => (g.y1 < pot || g.y2 < pot) && <polygon key={`r${i}`} points={`${g.x1},${Y(Math.min(g.y1, pot))} ${g.x2},${Y(Math.min(g.y2, pot))} ${g.x2},${Y(pot)} ${g.x1},${Y(pot)}`} fill="#8b5cf6" fillOpacity="0.08"/>)}
            <line x1={m.l} x2={W - m.r} y1={Y(pot)} y2={Y(pot)} stroke="#7c3aed" strokeDasharray="6 4" strokeWidth="1.5"/>
            <text x={m.l + 4} y={Y(pot) - 6} fontSize="11" fontWeight="700" fill="#7c3aed">Potential {pot}{p.potentialImplied ? ' (implied)' : ''}</text>
        </>)}
        {/* the OVR line, segment by segment; ▲▼ small and light, under the line */}
        {segs.map((g, i) => (<g key={`s${i}`}>
            <line x1={g.x1} y1={Y(g.y1)} x2={g.x2} y2={Y(g.y2)} stroke={segColor(g)} strokeWidth="3" strokeLinecap="round"/>
            {g.c !== 0 && <text x={(g.x1 + g.x2) / 2} y={Math.max(Y(g.y1), Y(g.y2)) + 15} textAnchor="middle" fontSize="11" fontWeight="600" fill={segColor(g)} opacity="0.7">{g.c > 0 ? `▲${g.c}` : `▼${-g.c}`}</text>}
        </g>))}
        {ss.map((x, i) => (<g key={`p${i}`}><circle cx={cx(i)} cy={Y(x.end)} r="5" fill="#fff" stroke={ovrColor(x.end)} strokeWidth="2.5"/><text x={cx(i)} y={Y(x.end) - 10} textAnchor="middle" fontSize="12" fontWeight="900" fill={ovrColor(x.end)}>{x.end}</text></g>))}
        {ss[0].start != null && (<g><circle cx={segs[0].x1} cy={Y(ss[0].start)} r="3.5" fill={ovrColor(ss[0].start)}/>
            <text x={Math.max(m.l + 2, segs[0].x1 - 6)} y={Y(ss[0].start) - 9} textAnchor="start" fontSize="11" fontWeight="600" fill="#64748b">{startLabel} {ss[0].start}</text></g>)}
        {/* season labels with his age */}
        {ss.map((x, i) => <text key={`l${i}`} x={cx(i)} y={base + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">S{x.s}{x.age != null ? ` · ${x.age}` : ''}</text>)}
        <text x={(W + m.l - m.r) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">Season · age</text>
        {/* hover zones */}
        {ss.map((x, i) => <rect key={`h${i}`} x={cx(i) - colW / 2} y={m.t} width={colW} height={base - m.t} fill="transparent" {...hv({ title: `S${x.s}${seasonYears(squad, x.s) ? ` · ${seasonYears(squad, x.s)}` : ''}`, rows: [['Age', x.age ?? '–'], ['OVR', <><OvrNum v={x.start} dark/> → <OvrNum v={x.end} dark/> (<Delta v={x.change ?? 0}/>)</>], pot != null ? ['Potential', <OvrNum v={pot} dark/>] : null, ['Value', <>{money(x.value)}{x.valueChange != null ? <> (<Delta v={Math.round(x.valueChange * 100)} fmt={(v) => `${v > 0 ? '+' : ''}${v}%`}/>)</> : ''}</>], ['Apps', x.app ?? '–'], p.pos === 'GK' ? ['CS / A', `${x.cs ?? '–'} / ${x.a ?? '–'}`] : ['G / A', `${x.g ?? '–'} / ${x.a ?? '–'}`]] })}/>)}
    </svg>
    </div>);
}
// Vs his position: his OVR against everyone else at his main position
// (current players at their OVR now, former players at their last OVR at the
// club, faded for context). The average is current players only, the ones he
// competes with. Hidden when fewer than 2 other current players share it.
function VsPosition({ p, squad }) {
    const hv = useHover();
    // Scrub along the strip on touch; the strip publishes its geometry each render
    const vsGeom = useRef(null);
    const vsScrub = useScrub((e) => {
        const g = vsGeom.current;
        if (!g) return null;
        const r = e.currentTarget.getBoundingClientRect();
        const v = g.lo + ((e.clientX - r.left) / r.width) * (g.hi - g.lo);
        const near = g.values.slice().sort((a, b) => Math.abs(a - v) - Math.abs(b - v))[0];
        return near == null ? null : g.card(near);
    });
    const lastOvr = (q) => { const l = [...q.seasons].reverse().find(x => x.end != null); return l ? l.end : q.ovr; };
    const isCur = squad.current.some(x => x.id === p.id);
    const ovr = isCur ? p.ovr : lastOvr(p);
    if (ovr == null || !p.pos) return null;
    const others = [...squad.current.map(q => ({ q, former: false, v: q.ovr })), ...squad.former.map(q => ({ q, former: true, v: lastOvr(q) }))]
        .filter(d => d.q.id !== p.id && d.q.pos === p.pos && d.v != null);
    const curOthers = others.filter(d => !d.former);
    if (curOthers.length < 2) return null;
    const avg = curOthers.reduce((t, d) => t + d.v, 0) / curOthers.length, diff = ovr - avg;
    const vals = [...others.map(d => d.v), ovr, avg];
    const lo = Math.min(...vals) - 2, hi = Math.max(...vals) + 2, L = (v) => `${((v - lo) / (hi - lo)) * 100}%`;
    vsGeom.current = { lo, hi, values: [...new Set(others.map(d => d.v))], card: (v) => groupCard(v) };
    const nCur = others.filter(d => !d.former).length;
    const groupCard = (v) => { const ds = others.filter(d => d.v === v).sort((a, b) => a.former - b.former); return { rows: ds.map(d => [<span className="text-white font-bold">{d.q.name}{d.former ? <span className="text-slate-400 font-normal"> (former)</span> : null}</span>, <OvrNum v={d.v} dark/>]) }; };
    return (<div className="space-y-1 pt-1">
    <div className="flex justify-between text-[11px] text-slate-500"><span>Vs other {p.pos}s <span className="text-slate-400">· {nCur} now, {others.length - nCur} former</span></span>
        <span className="tabular-nums"><OvrNum v={ovr}/> vs {avg.toFixed(1)} · <span className={`font-black ${diff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{diff >= 0 ? '+' : '−'}{Math.abs(diff).toFixed(1)}</span></span></div>
    <div className="relative h-6 rounded bg-slate-50" {...vsScrub}>
        <div className="absolute top-0.5 bottom-0.5 border-l-2 border-dashed border-slate-400" style={{ left: L(avg) }} {...hv({ title: `Average current ${p.pos}`, rows: [['OVR', avg.toFixed(1)], ['Players', curOthers.length]] })}/>
        {/* one dot per OVR: solid if any current player has it, faded if only former players */}
        {[...new Set(others.map(d => d.v))].map(v => { const ds = others.filter(d => d.v === v).sort((a, b) => a.former - b.former); const cur = ds.some(d => !d.former);
            return <span key={v} className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${cur ? 'bg-slate-500' : 'bg-slate-300 opacity-40'}`} style={{ left: L(v) }}
                {...hv({ rows: ds.map(d => [<span className="text-white font-bold">{d.q.name}{d.former ? <span className="text-slate-400 font-normal"> (former)</span> : null}</span>, <OvrNum v={d.v} dark/>]) })}/>; })}
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-2 ring-white" style={{ left: L(ovr), backgroundColor: SQUAD_ACCENT }} {...hv({ title: p.name, rows: [['OVR', <OvrNum v={ovr} dark/>], [`vs average ${p.pos}`, <Delta v={Math.round(diff * 10) / 10}/>]] })}/>
    </div>
    <div className="flex gap-3 text-[11px] text-slate-400"><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500"/>Current</span><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 opacity-60"/>Former</span><span className="inline-flex items-center gap-1"><span className="w-3 border-t-2 border-dashed border-slate-400"/>Average now</span></div>
    </div>);
}
const ordinal = (n) => `${n}${n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'}`;
function PlayerProfile({ p, list, squad, cstats, interactions = {}, clubOf, onOpen, onClose }) {
    const idx = list.findIndex(x => x.id === p.id);
    const prev = idx >= 0 && list.length > 1 ? list[(idx - 1 + list.length) % list.length] : null;
    const next = idx >= 0 && list.length > 1 ? list[(idx + 1) % list.length] : null;
    useEffect(() => {
        const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft' && prev) onOpen(prev); if (e.key === 'ArrowRight' && next) onOpen(next); };
        window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
    }, [p, prev, next]);
    const isFormer = !squad.current.some(x => x.id === p.id);
    const rem = remainingPot(p);
    const c = !isFormer && cstats ? cstats.byId[p.id] : null;
    // where he stands at his position (Depth Chart order)
    const mates = squad.current.filter(x => x.pos === p.pos).sort((a, b) => teamRank(a) - teamRank(b) || (b.ovr || 0) - (a.ovr || 0) || roleRank(a) - roleRank(b) || (b.age || 0) - (a.age || 0));
    const depthRank = mates.findIndex(x => x.id === p.id) + 1;
    const rankOf = (f) => { const v = [...squad.current].sort((a, b) => (f(b) || 0) - (f(a) || 0)); return v.findIndex(x => x.id === p.id) + 1; };
    const segs = p.seasons.filter(x => x.change != null);
    const segScale = Math.max(1, segs.reduce((a, x) => a + Math.abs(x.change), 0));
    const lo = Math.floor((Math.min(startOvr(p), p.ovr || 99) - 3) / 5) * 5, hi = Math.min(99, Math.max(p.ovr || 0, p.potential || 0) + 2);
    const rec = interactions[p.id];
    const from = p.joined && p.joined.from ? String(p.joined.from).toUpperCase() : '';
    const plv = p.left && p.left.fee ? p.left.fee - ((p.joined && p.joined.fee) || 0) : null;
    const Section = ({ title, children }) => (<div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2"><div className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: SQUAD_ACCENT }}>{title}</div>{children}</div>);
    const KV = ({ k, children }) => (<div className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-500">{k}</span><span className="font-bold text-slate-900 text-right">{children}</span></div>);
    // Highlights (v49.3): age, foot, team, role, potential
    const joinAge = (() => { const f = p.seasons.find(x => x.age != null); return f ? f.age : null; })();
    const teamValue = isFormer ? 'Former' : p.tier === 'loan' ? 'On loan' : p.tag ? `${p.tag.badge} ${p.tag.label}` : '–';
    const roleLabel = isFormer ? HOW_LEFT(p) : (ROLE_STYLE[p.role] ? ROLE_STYLE[p.role].label : (p.role ? p.role.charAt(0) + p.role.slice(1).toLowerCase() : '–'));
    const potBy = rem == null ? '' : rem === 0 ? 'At potential' : rem > 0 ? `+${rem} above` : `${-rem} to go`;
    // Stats: career and his last season, side by side (goalkeepers lead with clean sheets)
    const lastS = [...p.seasons].reverse().find(x => [x.app, x.g, x.a, x.cs].some(v => v != null));
    const statCols = p.pos === 'GK' ? [['App', 'app'], ['CS', 'cs'], ['A', 'a'], ['G', 'g']] : [['App', 'app'], ['G', 'g'], ['A', 'a'], ['CS', 'cs']];
    // A blank stat counts as 0 once appearances are recorded; zeros in light grey
    const statCell = (row, f) => { const v = row[f] ?? (row.app ? 0 : null); return v == null ? <span className="text-slate-300">–</span> : v === 0 ? <span className="text-slate-400 font-semibold">0</span> : v; };
    return (<Sheet onClose={onClose}>
    {/* Header: flag, name + position, OVR */}
    <div className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 text-white shrink-0" style={{ background: `linear-gradient(135deg, ${SQUAD_ACCENT}, #2e1065)` }}>
    <div className="flex items-center gap-3.5 min-w-0">
    <span className="shrink-0 rounded-md overflow-hidden ring-2 ring-white/60 hidden sm:inline-flex"><Flag emoji={p.flag} size={44}/></span><span className="shrink-0 rounded overflow-hidden ring-2 ring-white/60 sm:hidden inline-flex"><Flag emoji={p.flag} size={28}/></span>
    <div className="min-w-0">
    <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5 min-w-0"><h2 className="text-xl sm:text-2xl font-black tracking-tight truncate max-w-full">{p.name}</h2>
    <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold"><strong>{p.pos}</strong>{p.alt.length ? <span className="text-slate-400"> · {p.alt.join(', ')}</span> : ''}</span></div>
        {isFormer && <div className="mt-1.5 text-xs font-semibold text-white/85 flex flex-wrap items-center gap-1.5">{HOW_LEFT(p)} <SeasonTag season={p.departedSeason} year={p.left && p.left.year}/>{p.left && p.left.to && <span className="px-1.5 py-0.5 rounded bg-white/95"><ClubTag name={p.left.to} clubOf={clubOf}/></span>}{p.left && p.left.fee ? <strong>· {money(p.left.fee)}</strong> : null}</div>}
    </div>
    </div>
    <div className="flex items-center gap-3 shrink-0">
    <div className="bg-white rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-center shadow">
    <div className="text-[11px] font-extrabold text-slate-400 uppercase">OVR</div>
    <div className="text-2xl sm:text-3xl font-black tabular-nums leading-none" style={{ color: ovrColor(p.ovr) }}>{p.ovr ?? '–'}</div>
    </div>
    <div className="flex flex-col gap-1">
    <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Close"><X className="w-5 h-5"/></button>
    <div className="flex gap-1"><button type="button" disabled={!prev} onClick={() => prev && onOpen(prev)} className="p-1 rounded hover:bg-white/15 disabled:opacity-30" aria-label="Previous"><ChevronLeft className="w-4 h-4"/></button><button type="button" disabled={!next} onClick={() => next && onOpen(next)} className="p-1 rounded hover:bg-white/15 disabled:opacity-30" aria-label="Next"><ChevronRight className="w-4 h-4"/></button></div>
    </div>
    </div>
    </div>
    <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
    {/* Highlights */}
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[['Age', p.age ?? '–', routeOf(p) === 'legacy' ? 'At the club since S1' : joinAge != null ? `Joined at ${joinAge}` : ''],
            ['Foot', p.foot === 'L' ? 'Left' : p.foot === 'R' ? 'Right' : '–', ''],
            ['Team', teamValue, ''],
            ['Role', roleLabel, ''],
            ['Potential', <span className={p.potentialImplied ? 'italic' : ''}>{p.potential ?? '–'}{p.dev ? <span className="ml-1.5 text-xs font-bold text-slate-400">{p.dev}</span> : null}</span>, potBy]].map(([k, v, by]) => (
        <div key={k} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 min-w-0">
            <div className="text-[11px] font-bold text-slate-400">{k}</div>
            <div className="text-lg font-black text-slate-900 truncate">{v}</div>
            <div className="text-[11px] text-slate-500 truncate min-h-[16px]">{by}</div>
        </div>))}
    </div>
    {/* The combined chart */}
    <div className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-1">
    <div className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: SQUAD_ACCENT }}>OVR, Potential And Value By Season</div>
    <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-slate-500"><span className="inline-flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-600"/>Rise</span><span className="inline-flex items-center gap-1"><span className="w-3 h-0.5 bg-rose-600"/>Fall</span><span className="inline-flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-900"/>Above potential</span><span className="inline-flex items-center gap-1"><span className="w-3 border-t-2 border-dashed border-violet-600"/>Potential</span><span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-slate-200"/>Value</span></div>
    </div>
    <ProfileChart p={p} squad={squad}/>
    </div>
    {/* Row 1: Squad | Stats | Development */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
    <Section title="Squad">
    <KV k="Positions"><span className="font-black">{p.pos}</span>{p.alt.length ? <span className="text-slate-400 font-semibold"> · {p.alt.join(', ')}</span> : ''}</KV>
    <KV k="Tenure">{p.tenure && p.tenure.years != null ? `${p.tenure.years} season${p.tenure.years === 1 ? '' : 's'}` : '–'}</KV>
    <KV k="Playstyles"><span className="tracking-[0.15em]" style={{ color: SQUAD_ACCENT }}>{p.ps ? '◆'.repeat(p.ps) : '–'}</span></KV>
        {!isFormer && <KV k={`Squad order at ${p.pos}`}>{depthRank ? `${ordinal(depthRank)} of ${mates.length}` : '–'}</KV>}
    </Section>
    <Section title="Stats">
    <table className="w-full text-xs"><thead><tr className="text-[11px] font-bold text-slate-400"><th className="text-left font-bold py-1"/>{statCols.map(([k]) => <th key={k} className="text-center py-1">{k}</th>)}</tr></thead>
    <tbody className="divide-y divide-slate-100">
        <tr><td className="py-1.5 text-slate-500">Career</td>{statCols.map(([k, f]) => <td key={k} className="text-center py-1.5 font-black tabular-nums text-slate-900">{statCell(p.career, f)}</td>)}</tr>
        {lastS && <tr><td className="py-1.5 text-slate-500">S{lastS.s}</td>{statCols.map(([k, f]) => <td key={k} className="text-center py-1.5 font-black tabular-nums text-slate-900">{statCell(lastS, f)}</td>)}</tr>}
    </tbody></table>
    </Section>
    <Section title="Development">
    <div className="space-y-1"><div className="flex justify-between text-[11px] text-slate-500"><span>Growth, season by season</span><span className="font-black tabular-nums"><OvrNum v={startOvr(p)}/> → <OvrNum v={p.ovr}/></span></div>
    <SegBar segs={segs} scale={segScale} tip={growthTip(squad, p)} labels/></div>
    <div className="space-y-1 pt-1"><div className="flex justify-between text-[11px] text-slate-500"><span>Potential</span><span className="tabular-nums">{lo} → {hi}</span></div><PotBar p={p} lo={lo} hi={hi}/></div>
    <VsPosition p={p} squad={squad}/>
    </Section>
    </div>
    {/* Row 2: Contracts, then Transfers (in | out) across two columns | Interactions + Injury History */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
    <div className="lg:col-span-2 space-y-3">
<Section title="Contracts">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
    <KV k="Value">{money(p.value)}</KV>
    <KV k="Wage">{wageTxt(p.wage)} a week</KV>
        {c && <KV k="Cost a year">{money(c.cost)}</KV>}
        {!isFormer && <KV k="Contract">{p.contract || '–'}{p.rem != null && <span className={`ml-1 ${p.rem <= 1 ? 'text-amber-700' : 'text-slate-400'}`}>({p.rem} yr{p.rem === 1 ? '' : 's'} left)</span>}</KV>}
        {c && (<>
        <KV k="vs OVR">{c.vsOvr == null ? '–' : money(c.vsOvr)}</KV>
        <KV k="vs value"><span style={{ color: pctColor(c.vsValue, cstats.med.vsValue) }}>{c.vsValue == null ? '–' : `${c.vsValue.toFixed(1)}%`}</span></KV>
        <KV k="Per appearance">{c.perApp == null ? '–' : <>{money(c.perApp / 1000)} <span className="text-slate-400">· {c.perAppIdx}</span></>}</KV>
        <KV k={c.isGK ? 'Per clean sheet' : 'Per goal + assist'}>{c.perOut == null ? '–' : money(c.perOut / 1000)}</KV>
        </>)}
    </div>
    </Section>
    <Section title="Transfers">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
    <div className="space-y-2">
    <div className="text-[11px] font-bold text-slate-400">In</div>
    <KV k="Joined"><SeasonTag season={p.joined && p.joined.season} year={p.joined && p.joined.year}/></KV>
    <KV k="From"><ClubTag name={p.joined && p.joined.from} clubOf={clubOf}/></KV>
    <KV k="Fee">{from === 'YOUTH ACADEMY' || from === 'FREE AGENT' ? money(0) : p.joined && p.joined.fee != null ? money(p.joined.fee) : '–'}</KV>
    </div>
    <div className="space-y-2">
    <div className="text-[11px] font-bold text-slate-400">Out</div>
        {isFormer ? (<>
        <KV k="Left">{HOW_LEFT(p)} · <SeasonTag season={p.departedSeason} year={p.left && p.left.year}/></KV>
            {p.left && p.left.to && !['Not renewed', 'Retired'].includes(HOW_LEFT(p)) && <KV k="To"><ClubTag name={p.left.to} clubOf={clubOf}/></KV>}
            {p.left && p.left.fee ? <KV k="Fee">{money(p.left.fee)}</KV> : null}
            {plv != null && <KV k="P/L"><span className={plv >= 0 ? 'text-emerald-700' : 'text-rose-700'}>{signedMoney1(plv)}</span></KV>}
        </>) : (<div className="text-xs text-slate-500">Still at the club{p.contract ? <span className="text-slate-400"> · Contract to {p.contract}</span> : ''}</div>)}
    </div>
    </div>
    </Section>
    </div>
    <div className="space-y-3">
        {!isFormer && (<Section title="Interactions">
            {['pos', 'neg'].map(side => { const lit = (rec && rec[side]) || []; return (<div key={side} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${side === 'pos' ? 'bg-emerald-50' : 'bg-rose-50'}`}><span className={`w-4 text-sm font-black ${side === 'pos' ? 'text-emerald-700' : 'text-rose-700'}`}>{side === 'pos' ? '+' : '−'}</span>{lit.length ? lit.map(e => <span key={e} className="text-lg leading-none">{e}</span>) : <span className="text-xs text-slate-400">None yet</span>}</div>); })}
        <div className="text-[11px] text-slate-400">{rec && rec.updated ? `Last updated ${fmtDate(rec.updated)}` : 'Record interactions in the Interactions tab.'}</div>
        </Section>)}
    {/* Injury History: space held for the coming section */}
    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white/60 p-3.5 min-h-[140px] space-y-1">
    <div className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: SQUAD_ACCENT }}>Injury History</div>
    <div className="text-[11px] text-slate-400">Coming soon.</div>
    </div>
    </div>
    </div>
    </div>
    </Sheet>);
}

// ─── THE SECTION ─────────────────────────────────────────────────────
// ─── LABS ────────────────────────────────────────────────────────────
// Testing ground for experiments before they go into the real tabs.
// Empty for now (the v49.2 hover-colour test is done: scale C won).
function LabsTab() {
    return (<div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center space-y-1">
    <FlaskConical className="w-6 h-6 text-slate-300 mx-auto"/>
    <div className="text-sm font-extrabold text-slate-900">Nothing In The Lab Right Now</div>
    <p className="text-[12px] text-slate-500">Experiments get tested here before they go into the other tabs.</p>
    </div>);
}

const SQUAD_TABS = [
    { id: 'squad', label: 'Squad', icon: LayoutGrid },
    { id: 'roster', label: 'Roster', icon: List },
    { id: 'depth', label: 'Depth Chart', icon: Shield },
    { id: 'development', label: 'Development', icon: TrendingUp },
    { id: 'contracts', label: 'Contracts', icon: Calendar },
    { id: 'transfers', label: 'Transfers', icon: Sparkles },
    { id: 'former', label: 'Former Players', icon: Clock },
    { id: 'interactions', label: 'Interactions', icon: Sparkles },
    { id: 'labs', label: 'Labs', icon: FlaskConical },
];
function SquadSection({ data, extra = {} }) {
    const [activeTab, setActiveTab] = useState('squad');
    const [open, setOpen] = useState(null);
    const squad = useMemo(() => parseSquad(data), [data]);
    const clubOf = useMemo(() => clubDirectory(extra['GSL Clubs'], extra.Pyramid), [extra]);
    // Squad tab settings live here so they survive switching tabs
    const [squadUI, setSquadUI] = useState(SQUAD_UI_DEFAULTS);
    const cstats = useMemo(() => contractStats(squad), [squad]);
    // Interactions: { playerId: { pos: [emoji], neg: [emoji], updated: date } }
    // Session only for now (saving to the sheet comes with the next Sheets build)
    const [interactions, setInteractions] = useState({});
    const toggleInteraction = (id, side, e) => setInteractions(cur => {
        const rec = cur[id] || { pos: [], neg: [] };
        const list = rec[side].includes(e) ? rec[side].filter(x => x !== e) : [...rec[side], e];
        return { ...cur, [id]: { ...rec, [side]: list, updated: new Date().toISOString() } };
    });
    const list = squad.current;
    return (<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
    <PageHeader accent="maroon" icon={Users} title="Squad" tabs={SQUAD_TABS} activeTab={activeTab} onTabChange={setActiveTab}/>
    <main className={`flex-1 ${PAGE_WIDTH} w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6`}>
    {squad.lastSeason && <p className="text-xs font-semibold text-slate-500">As of the end of S{squad.lastSeason}{squad.s1Year ? ` (${squad.s1Year + squad.lastSeason - 1}–${String(squad.s1Year + squad.lastSeason).slice(2)})` : ''}.</p>}
    {!list.length ? (<div className="p-6 text-center text-sm text-slate-500 bg-white border border-slate-200 rounded-xl">No squad data found in the Squad tab.</div>) : (<>
    {activeTab === 'squad' && <SquadTab squad={squad} onOpen={setOpen} ui={squadUI} setUI={setSquadUI}/>}
    {activeTab === 'roster' && <RosterTab squad={squad} clubOf={clubOf} interactions={interactions} onOpen={setOpen}/>}
    {activeTab === 'depth' && <DepthTab squad={squad} onOpen={setOpen}/>}
    {activeTab === 'development' && <DevelopmentTab squad={squad} onOpen={setOpen}/>}
    {activeTab === 'contracts' && <ContractsTab squad={squad} cstats={cstats} onOpen={setOpen}/>}
    {activeTab === 'transfers' && <TransfersTab squad={squad} clubOf={clubOf} onOpen={setOpen}/>}
    {activeTab === 'former' && <FormerTab squad={squad} clubOf={clubOf} onOpen={setOpen}/>}
    {activeTab === 'interactions' && <InteractionsTab squad={squad} interactions={interactions} onToggle={toggleInteraction} onOpen={setOpen}/>}
    {activeTab === 'labs' && <LabsTab/>}
    </>)}
    </main>
    {open && <PlayerProfile p={open} list={list.some(x => x.id === open.id) ? list : squad.former} squad={squad} cstats={cstats} interactions={interactions} clubOf={clubOf} onOpen={setOpen} onClose={() => setOpen(null)}/>}
    </div>);
}

export default function App(props) {
    return <HoverProvider><SquadSection {...props}/></HoverProvider>;
}
