/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — CupsLab.js (Cups Lab: experimental views, hidden)
 *  Version:  Cups Lab v3
 *  Date:     2026-10-18, 02:05 UTC
 *  Latest:   Canvas v51.22 code tidy: an unused import removed; history in CHANGELOG.md.
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */
import React, { useMemo, useState } from 'react';
import { FlaskConical, Filter, Trophy, Globe, Grid3x3, Flame, Swords, TrendingDown, Target } from 'lucide-react';
import { HighlightsBar, HighlightCard, Segmented, FilterPills, ControlLabel, ResetButton, Flag, flagKey } from './ui.js';

// ─── Shared helpers ──────────────────────────────────────────────────
function Section({ icon: Icon, title, sub, right, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              {title}
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-800 border border-violet-200">Lab</span>
            </h3>
            {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
          </div>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
function Empty({ children }) {
  return <div className="p-6 text-center text-xs font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl">{children}</div>;
}
const pct = (n, d) => (d > 0 ? (n / d) * 100 : 0);
const winTone = (p) =>
  p >= 75 ? 'bg-emerald-600 text-white' : p >= 50 ? 'bg-emerald-200 text-emerald-950' : p >= 25 ? 'bg-amber-200 text-amber-950' : 'bg-rose-500 text-white';
function record(list) {
  const w = list.filter((m) => m.result === 'W').length;
  const d = list.filter((m) => m.result === 'D').length;
  const l = list.filter((m) => m.result === 'L').length;
  return { p: list.length, w, d, l, winPct: pct(w, list.length) };
}

// ─── 1. ROUND SURVIVAL FUNNEL ────────────────────────────────────────
// For each competition: of the decided runs, how many reached each round
// (a run that entered later counts as having reached the earlier rounds),
// and how many ended there. One-match cups (e.g. Community Shield) are
// left out: their funnel is a single step.
function RoundFunnel({ campaigns, rounds, compName }) {
  const decided = campaigns.filter((c) => c.result && c.result !== 'SCHEDULED');
  const comps = useMemo(() => {
    const by = {};
    decided.forEach((c) => {
      (by[c.competition] = by[c.competition] || []).push(c);
    });
    return Object.entries(by)
      .filter(([, runs]) => runs.some((r) => (r.rounds || []).filter((x) => x.gf != null).length > 1 || r.groupStage))
      .map(([comp, runs]) => ({ comp, runs }))
      .sort((a, b) => b.runs.length - a.runs.length);
  }, [campaigns]);
  const [comp, setComp] = useState(null);
  const active = comps.find((c) => c.comp === comp) || comps[0];
  if (!active) return <Section icon={Filter} title="Round Survival Funnel"><Empty>No decided runs yet.</Empty></Section>;

  // Stages in playing order: group stage (if any), then knockout rounds
  const playOrder = [...rounds].reverse(); // Q2 ... Final
  const played = (run, key) => (run.rounds || []).some((r) => r.key === key && r.gf != null);
  const hasGroup = active.runs.some((r) => r.groupStage && (r.groupStage.matchdays || []).some((m) => m.gf != null));
  const koKeys = playOrder.filter((r) => active.runs.some((run) => played(run, r.key))).map((r) => r.key);
  const stages = [...(hasGroup ? [{ key: 'GROUP', name: 'Group stage' }] : []), ...koKeys.map((k) => ({ key: k, name: (rounds.find((r) => r.key === k) || {}).name || k }))];
  const reachedIdx = (run) => {
    let last = -1;
    stages.forEach((st, i) => {
      if (st.key === 'GROUP' ? run.groupStage && (run.groupStage.matchdays || []).some((m) => m.gf != null) : played(run, st.key)) last = i;
    });
    return last;
  };
  const total = active.runs.length;
  const rows = stages.map((st, i) => {
    const reached = active.runs.filter((run) => reachedIdx(run) >= i).length;
    const endedHere = active.runs.filter((run) => reachedIdx(run) === i && !(st.key === 'F' && run.result === 'CHAMPIONS')).length;
    return { ...st, reached, endedHere };
  });
  const won = active.runs.filter((r) => r.result === 'CHAMPIONS').length;
  const exits = rows.filter((r) => r.endedHere > 0 && r.key !== 'F');
  const worst = exits.length ? exits.reduce((a, r) => (r.endedHere > a.endedHere ? r : a)) : null;

  return (
    <Section
      icon={Filter}
      title="Round Survival Funnel"
      sub="How many runs reached each round, and where they ended. A run that entered late counts as having reached the earlier rounds."
    >
      <div className="space-y-1.5">
        <ControlLabel accent="amber" icon={Trophy}>Competition</ControlLabel>
        <FilterPills accent="amber" value={active.comp} onChange={setComp} options={comps.map((c) => ({ value: c.comp, label: compName(c.comp), badge: c.runs.length }))} />
      </div>
      <HighlightsBar accent="amber" columns={4}>
        <HighlightCard label="Runs" icon={Filter} iconClassName="text-amber-400" value={total} valueClassName="text-2xl sm:text-3xl font-black text-white" left="Decided runs" right="" />
        <HighlightCard label="Won" icon={Trophy} iconClassName="text-amber-400" value={`${won}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-300" left={`${pct(won, total).toFixed(0)}% of runs`} right="" />
        <HighlightCard label="Reached the Final" icon={Target} iconClassName="text-sky-400" value={(rows.find((r) => r.key === 'F') || { reached: 0 }).reached} valueClassName="text-2xl sm:text-3xl font-black text-sky-300" left={`${pct((rows.find((r) => r.key === 'F') || { reached: 0 }).reached, total).toFixed(0)}% of runs`} right="" />
        <HighlightCard label="Most exits" icon={TrendingDown} iconClassName="text-rose-400" value={worst ? worst.name : 'None'} valueClassName="text-lg sm:text-xl font-black text-rose-300" left={worst ? `${worst.endedHere} run${worst.endedHere === 1 ? '' : 's'} ended here` : 'No knockout exits'} right="" />
      </HighlightsBar>
      <div className="space-y-2">
        {rows.map((r) => {
          const w = pct(r.reached, total);
          return (
            <div key={r.key} className="grid grid-cols-[8.5rem_1fr_7.5rem] items-center gap-3 text-xs">
              <span className="font-bold text-slate-800 truncate">{r.name}</span>
              <div className="h-7 bg-slate-100 rounded-lg overflow-hidden flex justify-center">
                <div className="h-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center text-[11px] font-black text-amber-950 transition-all" style={{ width: `${Math.max(w, 4)}%` }} title={`${r.reached} of ${total} runs reached the ${r.name}`}>
                  {w >= 12 ? `${r.reached} (${w.toFixed(0)}%)` : r.reached}
                </div>
              </div>
              <span className={`font-bold tabular-nums ${r.endedHere ? 'text-rose-700' : 'text-slate-400'}`}>{r.endedHere ? `${r.endedHere} ended here` : 'no exits'}</span>
            </div>
          );
        })}
        <div className="grid grid-cols-[8.5rem_1fr_7.5rem] items-center gap-3 text-xs">
          <span className="font-black text-amber-800">Won it</span>
          <div className="h-7 bg-slate-100 rounded-lg overflow-hidden flex justify-center">
            <div className="h-full rounded-lg bg-gradient-to-r from-yellow-400 to-amber-300 flex items-center justify-center text-[11px] font-black text-amber-950" style={{ width: `${Math.max(pct(won, total), 4)}%` }}>
              {won} ({pct(won, total).toFixed(0)}%)
            </div>
          </div>
          <span />
        </div>
      </div>
    </Section>
  );
}

// ─── 2. CUPS PASSPORT (tile map) ─────────────────────────────────────
// Each country is a square placed roughly where it sits. ESL = the 92-club
// pyramid; GSL = everyone else (met only in continental cups).
const TILE_POS = {
  CAN: [0, 0], USA: [0, 1], COL: [0, 3], ARG: [0, 5],
  NOR: [5, 0], SWE: [6, 0], FIN: [7, 0],
  SCO: [3, 1], DEN: [5, 1],
  IRL: [2, 2], ENG: [3, 2], NED: [4, 2], GER: [5, 2], POL: [6, 2],
  WAL: [2, 3], BEL: [4, 3], CZE: [6, 3], UKR: [7, 3],
  FRA: [3, 4], SUI: [4, 4], AUT: [5, 4], HUN: [6, 4], ROU: [7, 4], AZE: [9, 4],
  POR: [2, 5], ESP: [3, 5], ITA: [5, 5], CRO: [6, 5],
  GRE: [6, 6], TUR: [7, 6], CYP: [8, 7], KSA: [9, 6], UAE: [10, 6], IND: [11, 5],
  CHN: [11, 3], KOR: [12, 3], AUS: [12, 6], NZL: [13, 7],
};
const COUNTRY_NAMES = {
  CAN: 'Canada', USA: 'USA', COL: 'Colombia', ARG: 'Argentina', NOR: 'Norway', SWE: 'Sweden', FIN: 'Finland',
  SCO: 'Scotland', DEN: 'Denmark', IRL: 'Ireland', ENG: 'England', NED: 'Netherlands', GER: 'Germany', POL: 'Poland',
  WAL: 'Wales', BEL: 'Belgium', CZE: 'Czechia', UKR: 'Ukraine', FRA: 'France', SUI: 'Switzerland', AUT: 'Austria',
  HUN: 'Hungary', ROU: 'Romania', AZE: 'Azerbaijan', POR: 'Portugal', ESP: 'Spain', ITA: 'Italy', CRO: 'Croatia',
  GRE: 'Greece', TUR: 'Türkiye', CYP: 'Cyprus', KSA: 'Saudi Arabia', UAE: 'UAE', IND: 'India', CHN: 'China',
  KOR: 'South Korea', AUS: 'Australia', NZL: 'New Zealand',
};
function Passport({ matches }) {
  const [scope, setScope] = useState('all');
  const [picked, setPicked] = useState(null);
  const scoped = matches.filter((m) => (scope === 'esl' ? m.isEsl : scope === 'gsl' ? !m.isEsl : true));
  const byCountry = useMemo(() => {
    const map = {};
    scoped.forEach((m) => {
      const k = flagKey(m.flag) || 'INT';
      (map[k] = map[k] || []).push(m);
    });
    return map;
  }, [scoped]);
  const codes = Object.keys(byCountry);
  const maxP = Math.max(1, ...codes.map((k) => byCountry[k].length));
  const clubs = new Set(scoped.map((m) => m.opponent)).size;
  const most = codes.length ? codes.reduce((a, k) => (byCountry[k].length > byCountry[a].length ? k : a)) : null;
  const toughest = codes.filter((k) => byCountry[k].length >= 4).sort((a, b) => record(byCountry[a]).winPct - record(byCountry[b]).winPct)[0];
  const cols = 14, rowsN = 8;
  const pickedList = picked && byCountry[picked] ? byCountry[picked] : null;
  const pickedClubs = pickedList
    ? Object.values(pickedList.reduce((acc, m) => { (acc[m.opponent] = acc[m.opponent] || { name: m.opponent, flag: m.flag, list: [] }).list.push(m); return acc; }, {}))
        .map((c) => ({ ...c, rec: record(c.list) }))
        .sort((a, b) => b.rec.p - a.rec.p)
    : [];
  return (
    <Section
      icon={Globe}
      title="Cups Passport"
      sub="Every country you've faced in cup football. Darker = more matches. Click a country for its clubs."
      right={<Segmented className="self-start lg:self-auto" value={scope} onChange={(v) => { setScope(v); setPicked(null); }} options={[{ value: 'all', label: 'All' }, { value: 'esl', label: 'ESL' }, { value: 'gsl', label: 'GSL' }]} />}
    >
      <HighlightsBar accent="amber" columns={4}>
        <HighlightCard label="Countries" icon={Globe} iconClassName="text-amber-400" value={codes.filter((c) => c !== 'INT').length} valueClassName="text-2xl sm:text-3xl font-black text-amber-300" left={`${clubs} clubs`} right="" />
        <HighlightCard label="Matches" icon={Swords} iconClassName="text-sky-400" value={scoped.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${record(scoped).w}W-${record(scoped).d}D-${record(scoped).l}L`} right="" />
        <HighlightCard label="Most faced" icon={Flame} iconClassName="text-orange-400" value={most ? COUNTRY_NAMES[most] || most : '–'} valueClassName="text-lg sm:text-xl font-black text-orange-300" left={most ? `${byCountry[most].length} matches` : ''} right="" />
        <HighlightCard label="Toughest (4+ games)" icon={TrendingDown} iconClassName="text-rose-400" value={toughest ? COUNTRY_NAMES[toughest] || toughest : '–'} valueClassName="text-lg sm:text-xl font-black text-rose-300" left={toughest ? `${record(byCountry[toughest]).winPct.toFixed(0)}% won` : ''} right="" />
      </HighlightsBar>
      {!scoped.length ? (<Empty>No matches in this scope yet.</Empty>) : (
        <div className="overflow-x-auto">
          <div className="grid gap-1.5 min-w-[640px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rowsN}, 3.6rem)` }}>
            {Object.entries(TILE_POS).map(([code, [x, y]]) => {
              const list = byCountry[code];
              const n = list ? list.length : 0;
              const rec = list ? record(list) : null;
              const a = n ? 0.25 + 0.75 * (n / maxP) : 0;
              const active = picked === code;
              return (
                <button
                  key={code}
                  type="button"
                  disabled={!n}
                  onClick={() => setPicked(active ? null : code)}
                  title={n ? `${COUNTRY_NAMES[code]}: ${n} matches, ${rec.w}W-${rec.d}D-${rec.l}L` : `${COUNTRY_NAMES[code]}: not faced`}
                  className={`rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${active ? 'ring-2 ring-amber-600 ring-offset-1' : ''} ${n ? 'border-amber-300 hover:brightness-95 cursor-pointer' : 'border-dashed border-slate-200 bg-white cursor-default opacity-50'}`}
                  style={{ gridColumn: x + 1, gridRow: y + 1, backgroundColor: n ? `rgba(245, 158, 11, ${a})` : undefined }}
                >
                  <Flag code={code} />
                  <span className={`text-[11px] font-black ${n && a > 0.6 ? 'text-amber-950' : 'text-slate-700'}`}>{code}</span>
                  {n > 0 && <span className="text-[9.5px] font-bold tabular-nums text-slate-900">{n}</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {byCountry.INT && <p className="text-[11px] text-slate-500">{byCountry.INT.length} matches against clubs with no country flag in the sheet are left off the map.</p>}
      {pickedList && (
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <Flag code={picked} />
            {COUNTRY_NAMES[picked]}
            <span className="text-xs font-bold text-slate-600">{pickedList.length} matches • {record(pickedList).w}W-{record(pickedList).d}D-{record(pickedList).l}L</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {pickedClubs.map((c) => (
              <div key={c.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 truncate flex-1 min-w-0">{c.name}</span>
                <span className="tabular-nums font-semibold text-slate-600 shrink-0">{c.rec.w}W-{c.rec.d}D-{c.rec.l}L</span>
                <span className={`px-1.5 rounded text-[11px] font-black tabular-nums shrink-0 ${winTone(c.rec.winPct)}`}>{c.rec.winPct.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

// ─── 3. RIVALRY REMATCH GRID ─────────────────────────────────────────
// Rows: clubs met at least N times. Columns: competitions or seasons.
// Each cell: number of meetings, shaded by your win % there.
function RematchGrid({ matches, compShort, compName, openRivalry }) {
  const [minMeet, setMinMeet] = useState('2');
  const [columnsBy, setColumnsBy] = useState('comp');
  const [sortBy, setSortBy] = useState('meetings');
  const clubs = useMemo(() => {
    const by = {};
    matches.forEach((m) => { (by[m.opponent] = by[m.opponent] || { name: m.opponent, flag: m.flag, list: [] }).list.push(m); });
    return Object.values(by).map((c) => ({ ...c, rec: record(c.list), comps: new Set(c.list.map((m) => m.competition)).size }));
  }, [matches]);
  const shown = clubs
    .filter((c) => c.rec.p >= Number(minMeet))
    .sort((a, b) =>
      sortBy === 'worst' ? a.rec.winPct - b.rec.winPct || b.rec.p - a.rec.p
        : sortBy === 'comps' ? b.comps - a.comps || b.rec.p - a.rec.p
          : b.rec.p - a.rec.p || b.rec.winPct - a.rec.winPct);
  const colKeys = columnsBy === 'comp'
    ? Array.from(new Set(matches.map((m) => m.competition))).sort((a, b) => matches.filter((m) => m.competition === b).length - matches.filter((m) => m.competition === a).length)
    : Array.from(new Set(matches.map((m) => m.season))).sort((a, b) => a - b);
  const colLabel = (k) => (columnsBy === 'comp' ? compShort(k) : `S${k}`);
  const inCol = (list, k) => list.filter((m) => (columnsBy === 'comp' ? m.competition === k : m.season === k));
  const filtersOn = minMeet !== '2' || columnsBy !== 'comp' || sortBy !== 'meetings';
  return (
    <Section icon={Grid3x3} title="Rivalry Rematch Grid" sub="Clubs you keep meeting, and where. Each cell: meetings (each leg counts), shaded by your win %. Click a club to open it in Rivalries.">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1.5"><ControlLabel accent="amber" icon={Swords}>Met at least</ControlLabel>
            <Segmented value={minMeet} onChange={setMinMeet} options={[{ value: '2', label: '2×' }, { value: '3', label: '3×' }, { value: '5', label: '5×' }]} /></div>
          <div className="space-y-1.5"><ControlLabel accent="amber" icon={Grid3x3}>Columns</ControlLabel>
            <Segmented value={columnsBy} onChange={setColumnsBy} options={[{ value: 'comp', label: 'Competitions' }, { value: 'season', label: 'Seasons' }]} /></div>
          <div className="space-y-1.5"><ControlLabel accent="amber" icon={Filter}>Sort</ControlLabel>
            <Segmented value={sortBy} onChange={setSortBy} options={[{ value: 'meetings', label: 'Most meetings' }, { value: 'worst', label: 'Worst record' }, { value: 'comps', label: 'Most competitions' }]} /></div>
        </div>
        <ResetButton disabled={!filtersOn} onClick={() => { setMinMeet('2'); setColumnsBy('comp'); setSortBy('meetings'); }} />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600">
        {[['75%+ won', 'bg-emerald-600'], ['50–74%', 'bg-emerald-200'], ['25–49%', 'bg-amber-200'], ['Under 25%', 'bg-rose-500']].map(([l, c]) => (
          <span key={l} className="inline-flex items-center gap-1.5"><span className={`w-3 h-3 rounded-xs ${c}`} />{l}</span>
        ))}
        <span className="text-slate-400">• {shown.length} clubs</span>
      </div>
      {!shown.length ? (<Empty>No clubs met that often yet.</Empty>) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60">
                <th className="py-2 px-3 text-left">Club</th>
                {colKeys.map((k) => <th key={k} className="py-2 px-1.5 text-center whitespace-nowrap" title={columnsBy === 'comp' ? compName(k) : `Season ${k}`}>{colLabel(k)}</th>)}
                <th className="py-2 px-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shown.map((c) => (
                <tr key={c.name} className="hover:bg-amber-50/40 cursor-pointer" onClick={() => openRivalry(c.name)} title="Open in Rivalries">
                  <td className="py-1.5 px-3">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 whitespace-nowrap"><Flag emoji={c.flag} />{c.name}</span>
                  </td>
                  {colKeys.map((k) => {
                    const list = inCol(c.list, k);
                    if (!list.length) return <td key={k} className="py-1.5 px-1.5 text-center text-slate-300">·</td>;
                    const r = record(list);
                    return (
                      <td key={k} className="py-1 px-1 text-center">
                        <span className={`inline-block min-w-[1.9rem] px-1.5 py-0.5 rounded font-black tabular-nums ${winTone(r.winPct)}`} title={`${r.w}W-${r.d}D-${r.l}L: ${list.map((m) => `${m.gf}–${m.ga}`).join(', ')}`}>{list.length}</span>
                      </td>
                    );
                  })}
                  <td className="py-1.5 px-3 text-center font-bold tabular-nums whitespace-nowrap">
                    <span className="text-emerald-700">{c.rec.w}W</span> • <span className="text-amber-700">{c.rec.d}D</span> • <span className="text-rose-700">{c.rec.l}L</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

// ─── 4. MARGIN EXTREMES WALL ─────────────────────────────────────────
function ExtremesWall({ matches, ties, compName }) {
  const [comp, setComp] = useState('all');
  const comps = Array.from(new Set(matches.map((m) => m.competition)));
  const ms = comp === 'all' ? matches : matches.filter((m) => m.competition === comp);
  const ts = comp === 'all' ? ties : ties.filter((t) => t.competition === comp);
  const pick = (list, score) => (list.length ? list.reduce((a, x) => (score(x) > score(a) ? x : a)) : null);
  const where = (m) => `${compName(m.competition)} • ${m.stage} • S${m.season}`;
  const cards = [];
  const bigWin = pick(ms.filter((m) => m.result === 'W'), (m) => (m.gf - m.ga) * 100 + m.gf);
  cards.push({ key: 'bw', label: 'Biggest win', tone: 'emerald', m: bigWin, value: bigWin && `${bigWin.gf}–${bigWin.ga}` });
  const heavy = pick(ms.filter((m) => m.result === 'L'), (m) => (m.ga - m.gf) * 100 + m.ga);
  cards.push({ key: 'hl', label: 'Heaviest loss', tone: 'rose', m: heavy, value: heavy && `${heavy.gf}–${heavy.ga}` });
  const high = pick(ms, (m) => (m.gf + m.ga) * 100 + (m.gf - m.ga));
  cards.push({ key: 'hs', label: 'Highest-scoring match', tone: 'amber', m: high, value: high && `${high.gf}–${high.ga}`, note: high && `${high.gf + high.ga} goals` });
  const agg = pick(ts.filter((t) => t.isWin), (t) => (t.gf - t.ga) * 100 + t.gf);
  cards.push({ key: 'ag', label: 'Biggest aggregate win', tone: 'emerald', m: agg, value: agg && `${agg.gf}–${agg.ga}`, note: agg && `Legs ${agg.l1.gf}–${agg.l1.ga}, ${agg.l2.gf}–${agg.l2.ga}` });
  const cb = pick(ts.filter((t) => t.isWin && t.l1.ga > t.l1.gf), (t) => (t.l1.ga - t.l1.gf) * 100 + (t.gf - t.ga));
  cards.push({ key: 'cb', label: 'Biggest comeback', tone: 'sky', m: cb, value: cb && `${cb.gf}–${cb.ga}`, note: cb && `Lost leg 1 ${cb.l1.gf}–${cb.l1.ga}, won leg 2 ${cb.l2.gf}–${cb.l2.ga}` });
  const finals = ms.filter((m) => m.result === 'W' && /^Final/.test(m.stage));
  const tight = finals.length ? finals.reduce((a, m) => {
    const ka = (a.pens ? 0 : a.gf - a.ga), km = (m.pens ? 0 : m.gf - m.ga);
    return km < ka || (km === ka && m.pens && !a.pens) ? m : a;
  }) : null;
  cards.push({ key: 'tf', label: 'Tightest final win', tone: 'amber', m: tight, value: tight && `${tight.gf}–${tight.ga}`, note: tight && (tight.pens ? 'Won on pens' : `Won by ${tight.gf - tight.ga}`) });
  const lines = {};
  ms.forEach((m) => { const k = `${m.gf}–${m.ga}`; lines[k] = (lines[k] || 0) + 1; });
  const sig = Object.entries(lines).sort((a, b) => b[1] - a[1])[0];
  cards.push({ key: 'ss', label: 'Signature scoreline', tone: 'violet', value: sig && sig[0], note: sig && `${sig[1]} times (${pct(sig[1], ms.length).toFixed(0)}% of matches)` });
  const upset = pick(ms.filter((m) => m.result === 'L' && m.isEsl && m.eslRank != null), (m) => m.eslRank);
  cards.push({ key: 'up', label: 'Biggest upset suffered', tone: 'rose', m: upset, value: upset && `${upset.gf}–${upset.ga}`, note: upset && `Opponent ranked ${upset.eslRank} in the ESL` });
  const TONES = {
    emerald: 'border-emerald-200 bg-emerald-50/60 text-emerald-900', rose: 'border-rose-200 bg-rose-50/60 text-rose-900',
    amber: 'border-amber-200 bg-amber-50/60 text-amber-900', sky: 'border-sky-200 bg-sky-50/60 text-sky-900', violet: 'border-violet-200 bg-violet-50/60 text-violet-900',
  };
  return (
    <Section icon={Flame} title="Margin Extremes Wall" sub="The records: widest margins, wildest games, tightest escapes. Every leg counts as a match.">
      <div className="space-y-1.5">
        <ControlLabel accent="amber" icon={Trophy}>Competition</ControlLabel>
        <FilterPills accent="amber" value={comp} onChange={setComp} options={[{ value: 'all', label: 'All competitions' }, ...comps.map((c) => ({ value: c, label: compName(c) }))]} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.key} className={`p-4 rounded-xl border ${TONES[c.tone]}`}>
            <div className="text-xs font-bold">{c.label}</div>
            {c.value ? (
              <>
                <div className="text-3xl font-black tabular-nums mt-1 text-slate-900">{c.value}</div>
                {c.m && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-800 min-w-0">
                    <Flag emoji={c.m.flag} />
                    <span className="truncate">{c.m.opponent}</span>
                  </div>
                )}
                {c.m && <div className="text-[11px] text-slate-600 mt-0.5">{where(c.m)}</div>}
                {c.note && <div className="text-[11px] font-semibold text-slate-700 mt-1">{c.note}</div>}
              </>
            ) : (
              <div className="text-sm font-semibold text-slate-400 mt-2">Nothing yet</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── THE LAB TAB ─────────────────────────────────────────────────────
const EXPERIMENTS = [
  { value: 'funnel', label: 'Round Survival Funnel' },
  { value: 'passport', label: 'Cups Passport' },
  { value: 'rematch', label: 'Rematch Grid' },
  { value: 'extremes', label: 'Extremes Wall' },
];
export default function CupsLab({ campaigns = [], formData = { matches: [], ties: [] }, rounds = [], helpers = {} }) {
  const [exp, setExp] = useState('funnel');
  const { compName = (x) => x, compShort = (x) => x, openRivalry = () => {} } = helpers;
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 rounded-xl border border-violet-200 bg-violet-50/60">
        <div className="flex items-center gap-2 text-sm">
          <FlaskConical className="w-5 h-5 text-violet-700" />
          <span className="font-extrabold text-violet-950">Cups Lab</span>
          <span className="text-xs text-violet-900/80">Experiments. They may change, graduate into Cups, or be removed.</span>
        </div>
        <Segmented value={exp} onChange={setExp} options={EXPERIMENTS} />
      </div>
      {exp === 'funnel' && <RoundFunnel campaigns={campaigns} rounds={rounds} compName={compName} />}
      {exp === 'passport' && <Passport matches={formData.matches || []} />}
      {exp === 'rematch' && <RematchGrid matches={formData.matches || []} compShort={compShort} compName={compName} openRivalry={openRivalry} />}
      {exp === 'extremes' && <ExtremesWall matches={formData.matches || []} ties={formData.ties || []} compName={compName} />}
    </div>
  );
}
