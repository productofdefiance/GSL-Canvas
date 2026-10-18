/*
 * ════════════════════════════════════════════════════════════════════
 *  GSL CANVAS — Pyramid.js (Pyramid section)
 *  Version:  Pyramid v32
 *  Date:     2026-10-18, 07:30 UTC
 *  Latest:   Canvas v51.24 doctype: filter labels and season ticks keep their old spacing.
 *  History:  CHANGELOG.md (every build, newest first)
 * ════════════════════════════════════════════════════════════════════
 */

import React, { useState, useMemo, useRef, useEffect, useContext } from 'react';
import { PAGE_WIDTH, ClubSelect, SearchPicker, PageHeader, HighlightsBar, HighlightCard, Segmented, FilterPills, ControlLabel, ResetButton, SearchInput, SvgFlag, useTouchCard, flagKey, ChromeContext, useScreen, screenNow, Sheet, HoverProvider, useHover, ACCENT_HEX } from './ui.js';
import { Trophy, TrendingUp, TrendingDown, Layers, Filter, Sparkles, Shield, Activity, Eye, Edit2, X, ChevronLeft, ChevronRight, ChevronDown, Crown, Flame, BarChart2, Users, ArrowUpRight, ArrowDownRight, Maximize2, Minimize2, List, LayoutGrid, Globe, Calendar, Pin } from 'lucide-react';
// Division metadata with official hierarchy and branding
const DIVISIONS = {
    1: {
        id: 1,
        name: 'Division 1',
        shortName: 'Div 1',
        color: '#7c3aed',
        badgeBg: '#f5f3ff',
        badgeText: '#6d28d9',
        badgeBorder: '#ddd6fe',
        bgTint: 'rgba(124, 58, 237, 0.04)',
        range: [1, 20],
        icon: '🌕',
        accentColor: '#8b5cf6'
    },
    2: {
        id: 2,
        name: 'Division 2',
        shortName: 'Div 2',
        color: '#d97706',
        badgeBg: '#fffbeb',
        badgeText: '#b45309',
        badgeBorder: '#fde68a',
        bgTint: 'rgba(217, 119, 6, 0.04)',
        range: [21, 44],
        icon: '🥇',
        accentColor: '#f59e0b'
    },
    3: {
        id: 3,
        name: 'Division 3',
        shortName: 'Div 3',
        color: '#475569',
        badgeBg: '#f8fafc',
        badgeText: '#334155',
        badgeBorder: '#cbd5e1',
        bgTint: 'rgba(100, 116, 139, 0.04)',
        range: [45, 68],
        icon: '🥈',
        accentColor: '#64748b'
    },
    4: {
        id: 4,
        name: 'Division 4',
        shortName: 'Div 4',
        color: '#c2410c',
        badgeBg: '#fff7ed',
        badgeText: '#9a3412',
        badgeBorder: '#fed7aa',
        bgTint: 'rgba(194, 65, 12, 0.04)',
        range: [69, 92],
        icon: '🥉',
        accentColor: '#ea580c'
    }
};
// Robust Country Code mapping to prevent SVG text mojibake / broken glyphs
const COUNTRY_MAP = {
    '🏴󠁧󠁢󠁷󠁬󠁳󠁿': { code: 'WAL', name: 'Wales' },
    '🇫🇷': { code: 'FRA', name: 'France' },
    '🇩🇪': { code: 'GER', name: 'Germany' },
    '🇪🇸': { code: 'ESP', name: 'Spain' },
    '🏴󠁧󠁢󠁥󠁮󠁧󠁿': { code: 'ENG', name: 'England' },
    '🇮🇹': { code: 'ITA', name: 'Italy' },
    '🇵🇹': { code: 'POR', name: 'Portugal' },
    '🇳🇱': { code: 'NED', name: 'Netherlands' },
    '🏴󠁧󠁢󠁳󠁣󠁴󠁿': { code: 'SCO', name: 'Scotland' },
    '🇹🇷': { code: 'TUR', name: 'Turkey' },
    '🇬🇷': { code: 'GRE', name: 'Greece' },
    '🇧🇪': { code: 'BEL', name: 'Belgium' },
    '🇺🇦': { code: 'UKR', name: 'Ukraine' },
    '🇨🇿': { code: 'CZE', name: 'Czechia' },
    '🇦🇹': { code: 'AUT', name: 'Austria' },
    '🇨🇭': { code: 'SUI', name: 'Switzerland' },
    '🇸🇪': { code: 'SWE', name: 'Sweden' },
    '🇩🇰': { code: 'DEN', name: 'Denmark' },
    '🇷🇴': { code: 'ROU', name: 'Romania' },
    '🇳🇴': { code: 'NOR', name: 'Norway' },
    '🇵🇱': { code: 'POL', name: 'Poland' },
    '🇭🇷': { code: 'CRO', name: 'Croatia' }
};
function cleanString(str) {
    if (!str)
        return '';
    return String(str).replace(/[\uE000-\uF8FF\uDB40-\uDB43\uDC00-\uDFFF]/g, '').trim();
}
const TAG_CONFIG = {
    UCL: { label: 'Champions League', short: 'UCL', emoji: '🔵', pillBg: '#1e3a8a', pillBorder: '#3b82f6', color: '#1e40af', bg: '#dbeafe', border: '#bfdbfe', icon: '🔵' },
    UEL: { label: 'Europa League', short: 'UEL', emoji: '🟠', pillBg: '#9a3412', pillBorder: '#f97316', color: '#c2410c', bg: '#ffedd5', border: '#fed7aa', icon: '🟠' },
    UECL: { label: 'Conference League', short: 'UECL', emoji: '🟢', pillBg: '#14532d', pillBorder: '#22c55e', color: '#15803d', bg: '#dcfce7', border: '#bbf7d0', icon: '🟢' },
    P: { label: 'Promoted', short: 'P', emoji: '⬆️', pillBg: '#065f46', pillBorder: '#10b981', color: '#047857', bg: '#d1fae5', border: '#a7f3d0', icon: '⬆' },
    R: { label: 'Relegated', short: 'R', emoji: '⬇️', pillBg: '#991b1b', pillBorder: '#ef4444', color: '#b91c1c', bg: '#fee2e2', border: '#fecaca', icon: '⬇' },
    D: { label: 'Stayed in Division', short: 'D', emoji: '⏹️', pillBg: '#334155', pillBorder: '#64748b', color: '#64748b', bg: '#f1f5f9', border: '#e2e8f0', icon: '•' }
};

// ─── SETTINGS ────────────────────────────────────────────────────────
// Your club, as its abbreviation appears in the Pyramid tab (column AE).
const CLUB_ABBR = 'WRE';
// Pyramid's signature colour (teal-700); used where a hex is needed in charts.
const PYRAMID_ACCENT = ACCENT_HEX.teal;
// How your club's name reads on buttons (the sheet's short name has a ✦).
const CLUB_DISPLAY_NAME = 'Wrexham';
// Saving edits from the canvas back to the sheet has never been tested and
// may overwrite formulas. Leave off until tried on a COPY of the sheet.
const ENABLE_EDITING = false;
// "Top Risers" preset: clubs that have climbed at least this many places.
const TOP_RISER_PLACES = 15;
// League rules for the shaded zones in the Expanded chart.
// Automatic promotion: places at the top of each division that go up
// (play-off winners are not shaded). Relegation: places at the bottom.
const AUTO_PROMOTION_PLACES = { 2: 2, 3: 2, 4: 3 };
const RELEGATION_PLACES = { 1: 3, 2: 3, 3: 4 };
// Compact view: how many clubs can be pinned to compare
const MAX_PINNED = 5; // v24: compare up to 5 clubs (was 3)

// ─── SHEET LAYOUT (Pyramid tab, 0-based columns) ─────────────────────
const COL = {
    divLabel: 0, divPos: 1, overallPos: 2, curRank: 3, changeLast: 4, changeAvg: 5,
    totRisen: 6, highRank: 7, dropFromHigh: 8, lowRank: 9, volatility: 10, titleEmojis: 11,
    carabao: 12, faCup: 13, communityShield: 14, superCup: 15, ucl: 16, uel: 17, uecl: 18,
    cupWinsTot: 19, div1Wins: 20, div2Wins: 21, div3Wins: 22, div4Wins: 23, divWinsTot: 24,
    avgRank: 25, hex: 26, kit: 27, esl: 28, country: 29, abbr: 30, shortName: 31,
    mediumName: 32, name: 33, startRating: 34, startRank: 35,
    firstSeason: 36, // season 1 rank; its P/R/UCL tag is the next column; 2 columns per season
};
// Division boundaries, filled from the sheet by parsePyramid(). Defaults
// only matter if the sheet's "DIVISION n" labels can't be found.
let DIV_STARTS = [1, 21, 45, 69];
let TOTAL_CLUBS = 92;
function divOfRank(rank) {
    if (rank == null || isNaN(rank)) return null;
    let d = 1;
    DIV_STARTS.forEach((start, i) => { if (rank >= start) d = i + 1; });
    return d;
}
function divRange(div) {
    const start = DIV_STARTS[div - 1];
    const end = div < DIV_STARTS.length ? DIV_STARTS[div] - 1 : TOTAL_CLUBS;
    return [start, end];
}
// Ranks where a division ends (for chart gridlines), e.g. [20, 44, 68].
function divBoundaryRanks() {
    return DIV_STARTS.slice(1).map((s) => s - 1);
}

function parsePyramid(data) {
    const empty = { teams: [], seasonNums: [] };
    if (!data || !Array.isArray(data)) return empty;
    const num = (v) => (v !== null && v !== undefined && v !== '' && !isNaN(Number(v)) ? Number(v) : null);
    const str = (v) => (v === null || v === undefined ? '' : String(v).trim());

    // Club rows: an abbreviation, a name and a current rank.
    const clubRows = data.filter((d) => d.row && str(d.row[COL.abbr]) && str(d.row[COL.name]) && num(d.row[COL.curRank]) != null);
    if (!clubRows.length) return empty;
    TOTAL_CLUBS = clubRows.length;

    // Division boundaries from the "DIVISION n" label rows.
    const starts = clubRows
        .filter((d) => /^DIVISION\s*\d+/i.test(str(d.row[COL.divLabel])))
        .map((d) => ({ div: Number(str(d.row[COL.divLabel]).match(/\d+/)[0]), start: num(d.row[COL.overallPos]) }))
        .filter((x) => x.start != null)
        .sort((a, b) => a.div - b.div)
        .map((x) => x.start);
    if (starts.length >= 2 && starts[0] === 1) DIV_STARTS = starts;

    // Completed seasons: the sheet's "COMPLETED SEASONS:" cell, else the
    // number of season columns that hold any ranks.
    let completed = null;
    data.forEach((d) => (d.row || []).forEach((c, i) => {
        if (completed == null && typeof c === 'string' && /COMPLETED SEASONS/i.test(c)) completed = num(d.row[i + 1]);
    }));
    if (completed == null) {
        completed = 0;
        for (let s = 1; s <= 30; s++) {
            const col = COL.firstSeason + (s - 1) * 2;
            if (clubRows.some((d) => num(d.row[col]) != null)) completed = s; else break;
        }
    }
    const seasonNums = Array.from({ length: completed }, (_, i) => i + 1);

    const teams = clubRows.map((d) => {
        const r = d.row;
        const curRank = num(r[COL.curRank]) || num(r[COL.overallPos]);
        const seasons = [];
        seasonNums.forEach((s) => {
            const rank = num(r[COL.firstSeason + (s - 1) * 2]);
            const tagRaw = str(r[COL.firstSeason + (s - 1) * 2 + 1]).toUpperCase() || null;
            const prevRank = s > 1 && seasons[s - 2] ? seasons[s - 2].rank : null;
            seasons.push({
                season: s,
                rank,
                tag: tagRaw,
                div: divOfRank(rank),
                change: rank != null && prevRank != null ? prevRank - rank : null,
            });
        });
        const n = (k) => num(r[COL[k]]) || 0;
        const carabao = n('carabao'), faCup = n('faCup'), communityShield = n('communityShield'), superCup = n('superCup');
        const ucl = n('ucl'), uel = n('uel'), uecl = n('uecl');
        const cupWinsTot = num(r[COL.cupWinsTot]) || (carabao + faCup + communityShield + superCup + ucl + uel + uecl);
        const div1Wins = n('div1Wins'), div2Wins = n('div2Wins'), div3Wins = n('div3Wins'), div4Wins = n('div4Wins');
        const divWinsTot = num(r[COL.divWinsTot]) || (div1Wins + div2Wins + div3Wins + div4Wins);
        const rawHex = str(r[COL.hex]) || '#64748b';
        const hex = rawHex.startsWith('#') ? rawHex : `#${rawHex}`;
        const country = str(r[COL.country]);
        // Promotion / relegation at the end of each season. Worked out from the
        // division the club finished in the next season, because the sheet's
        // tag holds one value (a European place hides a promotion) and is
        // sometimes blank. The latest season has no "next", so its tag is used.
        seasons.forEach((ss, i) => {
            const next = seasons[i + 1];
            if (next && ss.div != null && next.div != null) ss.move = next.div < ss.div ? 'P' : next.div > ss.div ? 'R' : null;
            else ss.move = ss.tag === 'P' || ss.tag === 'R' ? ss.tag : null;
        });
        // Yo-yo bounces: promoted then relegated in successive seasons, or the reverse
        let bounces = 0;
        for (let i = 1; i < seasons.length; i++) {
            const a = seasons[i - 1].move, b = seasons[i].move;
            if (a && b && a !== b) bounces += 1;
        }
        return {
            index_: d.index_,
            id: d.index_,
            rank: curRank,
            curRank,
            div: divOfRank(curRank),
            divPos: num(r[COL.divPos]) || 1,
            changeLast: n('changeLast'),
            changeAvg: n('changeAvg'),
            totRisen: n('totRisen'),
            highRank: num(r[COL.highRank]) || curRank,
            dropFromHigh: n('dropFromHigh'),
            lowRank: num(r[COL.lowRank]) || curRank,
            volatility: n('volatility'),
            titleEmojis: str(r[COL.titleEmojis]),
            carabao, faCup, communityShield, superCup, ucl, uel, uecl, cupWinsTot,
            div1Wins, div2Wins, div3Wins, div4Wins, divWinsTot,
            totalTrophies: cupWinsTot + divWinsTot,
            avgRank: num(r[COL.avgRank]) || curRank,
            hex,
            country,
            countryCode: flagKey(country) || 'INT',
            abbr: cleanString(r[COL.abbr]),
            shortName: cleanString(r[COL.shortName] || r[COL.name]),
            name: cleanString(r[COL.name] || r[COL.shortName]),
            startRating: n('startRating'),
            startRank: num(r[COL.startRank]) || curRank,
            isMine: cleanString(r[COL.abbr]).toUpperCase() === CLUB_ABBR,
            bounces,
            seasons,
            raw: r,
        };
    }).sort((a, b) => a.curRank - b.curRank);
    return { teams, seasonNums };
}

const PYRAMID_TABS = [
    { id: 'progression', label: 'Progression', icon: TrendingUp },
    { id: 'standings', label: 'Standings', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'trophies', label: 'Trophies', icon: Trophy },
    { id: 'h2h', label: 'Head to Head', icon: Users },
];
function seasonNumsOf(teams) {
    return teams && teams.length ? teams[0].seasons.map((s) => s.season) : [];
}
function App({ data, extra = {}, updateItem, deleteItem, insertItem, moveItem, followLink }) {
    const [activeTab, setActiveTab] = useState('progression');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [highlightedTeamId, setHighlightedTeamId] = useState(null);
    const [divisionFilter, setDivisionFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [editModalTeam, setEditModalTeam] = useState(null);
    const [presetFilter, setPresetFilter] = useState('all');
    // Phones open in Compact (v23: the whole pyramid fitted to the screen)
    const [chartViewMode, setChartViewMode] = useState(() => (screenNow() === 'phone' ? 'compact' : 'standard')); // 'compact' | 'standard' | 'expanded'
    // Head-to-Head state
    const [h2hTeamA, setH2hTeamA] = useState(null);
    const [h2hTeamB, setH2hTeamB] = useState(null);
    // Read the Pyramid tab (clubs, completed seasons, division boundaries).
    // Everything comes from the sheet; see parsePyramid() near the top.
    const pyramid = useMemo(() => parsePyramid(data), [data]);
    const teams = pyramid.teams;
    // Winners tab (from App.js): cup winners, for European qualification routes
    const winners = useMemo(() => parseWinners(extra.Winners), [extra.Winners]);
    // Set default teams for H2H once loaded
    useEffect(() => {
        if (teams.length >= 2) {
            if (!h2hTeamA)
                setH2hTeamA(teams.find((t) => t.isMine) || teams[0]);
            if (!h2hTeamB)
                setH2hTeamB(teams[5] || teams[1]);
        }
    }, [teams]);
    // Filtered teams for progression chart and standings
    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            // Division filter
            if (divisionFilter !== 'all' && team.div !== Number(divisionFilter)) {
                return false;
            }
            // Search query
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchName = team.name.toLowerCase().includes(query);
                const matchAbbr = team.abbr.toLowerCase().includes(query);
                const matchCountry = team.countryCode.toLowerCase().includes(query);
                const matchShort = team.shortName.toLowerCase().includes(query);
                if (!matchName && !matchAbbr && !matchCountry && !matchShort)
                    return false;
            }
            // Presets
            // Presets are rules, worked out from the data each time
            if (presetFilter === 'wrexham') {
                return team.isMine;
            }
            if (presetFilter === 'div1_elite') {
                // In Division 1 at the end of every completed season
                return team.seasons.length > 0 && team.seasons.every((s) => s.div === 1);
            }
            if (presetFilter === 'yoyo') {
                // Promoted then relegated in successive seasons (or the reverse), at least once
                return team.bounces > 0;
            }
            if (presetFilter === 'big_risers') {
                return team.totRisen >= TOP_RISER_PLACES;
            }
            if (presetFilter === 'big_fallers') {
                return team.totRisen <= -TOP_RISER_PLACES;
            }
            return true;
        });
    }, [teams, divisionFilter, searchQuery, presetFilter]);
    // Handle saving an edited team back to spreadsheet
    const handleSaveEditTeam = (e) => {
        e.preventDefault();
        if (!editModalTeam)
            return;
        const formData = new FormData(e.target);
        const newName = formData.get('name');
        const newShortName = formData.get('shortName');
        const newAbbr = formData.get('abbr');
        const newHex = formData.get('hex');
        const newRating = Number(formData.get('rating'));
        const updatedRow = new Array(editModalTeam.raw.length).fill(undefined);
        updatedRow[26] = newHex;
        updatedRow[30] = newAbbr;
        updatedRow[31] = newShortName;
        updatedRow[33] = newName;
        updatedRow[34] = newRating;
        updateItem(editModalTeam.index_, updatedRow);
        setEditModalTeam(null);
    };
    return (<div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
    <PageHeader accent="teal" icon={Layers} title="The Pyramid" tabs={PYRAMID_TABS} activeTab={activeTab} onTabChange={setActiveTab} actions={
        // Find a club (search first): pick a club to open its profile, or show
        // every match on the Progression chart. Matching mirrors the chart's
        // own search, so the count shown is what the chart will show.
        <SearchPicker accent="teal" className="sm:w-72" placeholder="Find a club..."
            items={teams.map((t) => ({ value: t.abbr, label: t.name, code: t.countryCode, meta: t.curRank, search: `${t.name} ${t.shortName} ${t.abbr} ${t.countryCode}` }))}
            onPick={(abbr) => setSelectedTeam(teams.find((t) => t.abbr === abbr))}
            onSubmit={(q) => { setSearchQuery(q); setDivisionFilter('all'); setPresetFilter('all'); setActiveTab('progression'); }}
            submitLabel={(n) => `Show ${n} match${n === 1 ? '' : 'es'} on the Progression chart`}/>
    }/>
    {/* Main Container */}
    <main className={`flex-1 ${PAGE_WIDTH} w-full mx-auto p-4 sm:p-6 lg:p-8 font-sans`}>
    {/* Tab 1: Interactive Multi-Season Line Chart */}
        {activeTab === 'progression' && (<ProgressionChartTab teams={teams} filteredTeams={filteredTeams} divisionFilter={divisionFilter} setDivisionFilter={setDivisionFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} presetFilter={presetFilter} setPresetFilter={setPresetFilter} highlightedTeamId={highlightedTeamId} setHighlightedTeamId={setHighlightedTeamId} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} chartViewMode={chartViewMode} setChartViewMode={setChartViewMode} onOpenEditModal={ENABLE_EDITING ? setEditModalTeam : null}/>)}
    {/* Tab 2: Full Standings & Season Matrix */}
        {activeTab === 'standings' && (<StandingsTab teams={teams} filteredTeams={filteredTeams} divisionFilter={divisionFilter} setDivisionFilter={setDivisionFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectTeam={setSelectedTeam} onOpenEditModal={ENABLE_EDITING ? setEditModalTeam : null}/>)}
    {/* Tab 3: Pyramid Dashboards & Analytics */}
        {activeTab === 'analytics' && (<AnalyticsTab teams={teams} winners={winners} onSelectTeam={setSelectedTeam}/>)}
    {/* Tab 4: Trophies & Cabinet */}
        {activeTab === 'trophies' && (<TrophiesTab teams={teams} winners={winners} onSelectTeam={setSelectedTeam}/>)}
    {/* Tab 5: Head-to-Head Comparison */}
        {activeTab === 'h2h' && (<HeadToHeadTab teams={teams} winners={winners} teamA={h2hTeamA} teamB={h2hTeamB} setTeamA={setH2hTeamA} setTeamB={setH2hTeamB}/>)}
    </main>
    {/* Team Detail Drawer */}
        {selectedTeam && (<TeamDetailModal team={selectedTeam} teams={teams} onSelectTeam={setSelectedTeam} onClose={() => setSelectedTeam(null)} onEdit={ENABLE_EDITING ? () => setEditModalTeam(selectedTeam) : null} onFocusChart={() => {
                setHighlightedTeamId(selectedTeam.id);
                setActiveTab('progression');
            }} onCompare={() => {
                // Compare the club you're viewing with yours (or, if it is
                // yours, with the club already on the other side)
                const mine = teams.find((t) => t.isMine);
                setH2hTeamA(selectedTeam);
                if (mine && !selectedTeam.isMine) setH2hTeamB(mine);
                else if (h2hTeamB && h2hTeamB.id === selectedTeam.id) setH2hTeamB(teams.find((t) => t.id !== selectedTeam.id) || h2hTeamB);
                setActiveTab('h2h');
            }}/>)}
    {/* Edit Club Modal */}
        {ENABLE_EDITING && editModalTeam && (<EditTeamModal team={editModalTeam} onClose={() => setEditModalTeam(null)} onSave={handleSaveEditTeam}/>)}
    </div>);
}
// ------------------------------------------------------------------------------------------------
// TAB 1: PROGRESSION CHART (BUMP CHART) WITH THREE DISTINCT VIEW PRIORITIES
// ------------------------------------------------------------------------------------------------
function ProgressionChartTab({ teams, filteredTeams, divisionFilter, setDivisionFilter, searchQuery, setSearchQuery, presetFilter, setPresetFilter, highlightedTeamId, setHighlightedTeamId, selectedTeam, setSelectedTeam, chartViewMode, setChartViewMode, onOpenEditModal }) {
    // v23: on phones every view fits the screen: 3-letter club codes, no right-hand labels, no 240px plot floor
    const screen = useScreen();
    const phone = screen === 'phone';
    // Three views, three jobs:
    //   Compact  - the whole pyramid on one screen, at a glance. Thin lines,
    //              grey except your club and whatever is highlighted/filtered.
    //   Standard - everyday use. Full width, page scrolls, names and flags on
    //              both sides, club colours.
    //   Expanded - immersive. Taller rows, rank on every point, P/R and
    //              European markers, division champions in each season's
    //              header. Clicking a club puts it in focus with a side panel.
    const isExpanded = chartViewMode === 'expanded';
    const isCompact = chartViewMode === 'compact';
    const [hoverNode, setHoverNode] = useState(null); // { team, season, x, y }
    const [focusTeamId, setFocusTeamId] = useState(null); // Expanded only
    const [pinnedIds, setPinnedIds] = useState([]); // Compact only: clubs pinned to compare
    const chartRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(1100);
    const [viewportH, setViewportH] = useState(900);
    const [stickyTop, setStickyTop] = useState(160); // below the switcher + page header
    // v22: when the Header is folded the Top Bar no longer sticks, so the strip sits right under the Tab Bar
    const { headerFolded } = useContext(ChromeContext);
    // Measure the page: chart width, screen height, and where the sticky strip sits
    useEffect(() => {
        const measure = () => {
            if (chartRef.current && chartRef.current.clientWidth) setChartWidth(chartRef.current.clientWidth);
            if (typeof window !== 'undefined') setViewportH(window.innerHeight || 900);
            if (typeof document !== 'undefined') {
                const header = document.querySelector('header');
                setStickyTop((headerFolded ? 0 : 44) + (header ? header.offsetHeight : 116));
            }
        };
        measure();
        if (typeof window === 'undefined') return undefined;
        window.addEventListener('resize', measure);
        let ro = null;
        if (typeof ResizeObserver !== 'undefined' && chartRef.current) {
            ro = new ResizeObserver(measure);
            ro.observe(chartRef.current);
        }
        return () => {
            window.removeEventListener('resize', measure);
            if (ro) ro.disconnect();
        };
    }, [chartViewMode, focusTeamId, headerFolded]);
    // Leaving Expanded clears the focus panel
    useEffect(() => { if (!isExpanded) setFocusTeamId(null); }, [isExpanded]);

    // Preset sizes (badges on the preset pills)
    const presetCounts = useMemo(() => ({
        div1_elite: teams.filter((t) => t.seasons.length > 0 && t.seasons.every((x) => x.div === 1)).length,
        yoyo: teams.filter((t) => t.bounces > 0).length,
        big_risers: teams.filter((t) => t.totRisen >= TOP_RISER_PLACES).length,
    }), [teams]);
    // Seasons and divisions come from the sheet (see parsePyramid)
    const seasonNums = seasonNumsOf(teams);
    const lastSeason = seasonNums[seasonNums.length - 1] || 1;
    const divIds = DIV_STARTS.map((_, i) => i + 1);
    const filterActive = divisionFilter !== 'all' || presetFilter !== 'all' || !!searchQuery.trim();

    // Layout per view (real pixels: the chart is drawn at the page's width)
    const stripH = isCompact ? 76 : 36; // season headers (+ the pin tray in Compact)
    // Name labels are sized to the longest club name, so there's no dead
    // space between the names and the chart.
    const RAIL_W = 44;
    const nameChars = phone ? 3 : Math.min(16, Math.max(6, ...teams.map((t) => t.shortName.length)));
    const charW = isExpanded ? 7.8 : 6.7; // average width of an uppercase letter at the label size
    const flagW = isExpanded ? 18 : 14;
    const rankW = isExpanded ? 26 : 22;
    // Expanded shows the rank on every point, so its side labels drop the rank
    const sideRankW = isExpanded ? 0 : rankW + 6;
    const leftLabelW = 8 + Math.ceil(nameChars * charW) + 6 + flagW + 6 + sideRankW;
    const rightLabelW = phone ? 0 : 8 + sideRankW + flagW + 6 + Math.ceil(nameChars * charW) + 8 + 26;
    const margin = isCompact
        ? { top: 10, right: phone ? (pinnedIds.length ? 58 : 10) : 76, bottom: 28, left: phone ? 78 : 112 }
        : isExpanded
            // extra top room so crowns above rank 1 aren't cut off
            ? { top: 34, right: phone ? 12 : rightLabelW + 18, bottom: 34, left: RAIL_W + leftLabelW + 12 }
            : { top: 12, right: phone ? 12 : rightLabelW + 16, bottom: 30, left: RAIL_W + leftLabelW + 10 };
    const rowH = isExpanded ? 34 : 18;
    const compactH = Math.max(420, viewportH - stickyTop - stripH - 64 - 24);
    const plotHeight = isCompact ? compactH - margin.top - margin.bottom : (TOTAL_CLUBS - 1) * rowH;
    const chartHeight = plotHeight + margin.top + margin.bottom;
    const plotWidth = Math.max(phone ? 120 : 240, chartWidth - margin.left - margin.right);
    const getX = (season) => margin.left + (lastSeason > 1 ? (season - 1) / (lastSeason - 1) : 0.5) * plotWidth;
    const getY = (rank) => margin.top + ((rank - 1) / Math.max(1, TOTAL_CLUBS - 1)) * plotHeight;
    const majorTicks = [1, ...divBoundaryRanks(), TOTAL_CLUBS];
    // Every 5 places, minus any that would crowd a division edge (e.g. 45 next to 44)
    const minorTicks = Array.from({ length: Math.floor(TOTAL_CLUBS / 5) }, (_, i) => (i + 1) * 5).filter((r) => !majorTicks.some((m) => m !== r && Math.abs(m - r) <= 2));
    const yTicks = Array.from(new Set([...majorTicks, ...minorTicks])).filter((r) => r <= TOTAL_CLUBS).sort((a, b) => a - b);

    const activeTeam = useMemo(() => teams.find(t => t.id === highlightedTeamId) || null, [teams, highlightedTeamId]);
    const focusTeam = useMemo(() => (isExpanded ? teams.find(t => t.id === focusTeamId) || null : null), [teams, focusTeamId, isExpanded]);
    const spotlight = focusTeam || activeTeam; // the club drawn on top, others dimmed
    const pinned = useMemo(() => pinnedIds.map((id) => teams.find((t) => t.id === id)).filter(Boolean), [pinnedIds, teams]);
    const isPinned = (t) => pinnedIds.includes(t.id);
    const togglePin = (t) => setPinnedIds((cur) => (cur.includes(t.id) ? cur.filter((x) => x !== t.id) : cur.length >= MAX_PINNED ? [...cur.slice(1), t.id] : [...cur, t.id]));
    // Title winners: finished top of their division that season
    const isTitle = (s) => s.rank != null && s.div != null && s.rank === divRange(s.div)[0];

    // Smooth path through a club's season finishes
    const generatePath = (seasons) => {
        const pts = seasons.filter(s => s.rank !== null);
        if (!pts.length) return '';
        let path = `M ${getX(pts[0].season)} ${getY(pts[0].rank)}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const x0 = getX(pts[i].season), y0 = getY(pts[i].rank);
            const x1 = getX(pts[i + 1].season), y1 = getY(pts[i + 1].rank);
            path += ` C ${x0 + (x1 - x0) * 0.45} ${y0}, ${x1 - (x1 - x0) * 0.45} ${y1}, ${x1} ${y1}`;
        }
        return path;
    };
    // Line colour and weight per view
    const lineStyle = (team) => {
        const isSpot = spotlight && spotlight.id === team.id;
        const dim = spotlight && !isSpot;
        if (isCompact) {
            // All grey; your club in colour until you pin clubs, then only pins
            const pin = isPinned(team);
            const coloured = pin || isSpot || (!pinnedIds.length && team.isMine);
            return {
                stroke: coloured ? team.hex : '#cbd5e1',
                width: pin ? 3 : isSpot ? 3 : coloured ? 2.5 : 1,
                opacity: coloured ? 1 : pinnedIds.length || spotlight ? 0.35 : 0.7,
            };
        }
        return {
            stroke: team.hex,
            width: isSpot ? (isExpanded ? 5 : 4.5) : dim ? 1 : isExpanded ? 2.2 : 1.8,
            opacity: isSpot ? 1 : dim ? 0.12 : 0.65,
        };
    };
    // v24 touch scrubbing: tap the chart to start; drag follows the nearest line (the page holds still);
    // a tap outside the chart stops it. Mouse hover is unchanged.
    const lastTouch = useRef(false);
    const [scrubOn, setScrubOn] = useState(false);
    const scrubStart = useRef(null);
    const scrubPick = (clientX, clientY) => {
        const el = chartRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = clientX - r.left, y = clientY - r.top;
        const season = Math.max(1, Math.min(lastSeason, Math.round(((x - margin.left) / Math.max(1, plotWidth)) * Math.max(1, lastSeason - 1)) + 1));
        const rank = ((y - margin.top) / Math.max(1, plotHeight)) * (TOTAL_CLUBS - 1) + 1;
        let best = null, bd = Infinity;
        for (const t of filteredTeams) {
            const ss = t.seasons[season - 1];
            if (!ss || ss.rank == null) continue;
            const d = Math.abs(ss.rank - rank);
            if (d < bd) { bd = d; best = t; }
        }
        if (!best) return;
        setHighlightedTeamId(best.id);
        setHoverNode({ team: best, season, x: getX(season), y: getY(best.seasons[season - 1].rank) });
    };
    // v30: a finished tap outside the chart, a scroll or another overlay ends it (ui.js useTouchCard)
    useTouchCard(scrubOn, () => { setScrubOn(false); setHoverNode(null); }, { box: chartRef, keep: null });
    const scrubProps = {
        style: { touchAction: scrubOn ? 'none' : 'pan-y' },
        onPointerDown: (e) => {
            lastTouch.current = e.pointerType !== 'mouse';
            if (e.pointerType === 'mouse') return;
            scrubStart.current = { x: e.clientX, y: e.clientY };
            if (scrubOn) scrubPick(e.clientX, e.clientY);
        },
        onPointerMove: (e) => { if (e.pointerType !== 'mouse' && scrubOn) scrubPick(e.clientX, e.clientY); },
        onPointerUp: (e) => {
            if (e.pointerType === 'mouse') return;
            const st = scrubStart.current; scrubStart.current = null;
            if (!scrubOn && st && Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y) < 12) { setScrubOn(true); scrubPick(e.clientX, e.clientY); }
        },
    };
    const onClub = (team) => {
        if (lastTouch.current && !isExpanded) return; // v26: on any touch screen, Compact / Standard taps scrub (pin and profile sit on the bar); Expanded taps focus
        if (isCompact) {
            togglePin(team);
        } else if (isExpanded) {
            setFocusTeamId((cur) => (cur === team.id ? null : team.id));
            setHighlightedTeamId(team.id);
        } else {
            setSelectedTeam(team);
        }
    };
    // Grey lines first, coloured on top, spotlight last
    const drawOrder = useMemo(() => {
        const rank = (t) => (spotlight && spotlight.id === t.id ? 4 : pinnedIds.includes(t.id) ? 3 : t.isMine ? 2 : 1);
        return [...filteredTeams].sort((a, b) => rank(a) - rank(b));
    }, [filteredTeams, spotlight, pinnedIds]);
    const markerFor = (s) => {
        const out = [];
        if (s.move === 'P') out.push({ k: 'P', text: 'P', fill: '#ecfdf5', stroke: '#10b981', color: '#047857' });
        if (s.move === 'R') out.push({ k: 'R', text: 'R', fill: '#fef2f2', stroke: '#ef4444', color: '#b91c1c' });
        if (s.tag && TAG_CONFIG[s.tag] && ['UCL', 'UEL', 'UECL'].includes(s.tag)) {
            const c = TAG_CONFIG[s.tag];
            out.push({ k: s.tag, text: s.tag, fill: c.bg, stroke: c.border, color: c.color });
        }
        return out;
    };

    return (<div className="space-y-4 font-sans">
    {/* Controls (shared kit) */}
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3 font-sans">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
    <div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Layers}>Division</ControlLabel>
    <FilterPills accent="teal" value={presetFilter === 'all' ? divisionFilter : ''} onChange={(v) => { setDivisionFilter(v); setPresetFilter('all'); }} options={[
        { value: 'all', label: `All ${TOTAL_CLUBS}` },
        ...DIV_STARTS.map((_, i) => { const [a, b] = divRange(i + 1); return { value: String(i + 1), label: `Div ${i + 1}`, badge: `${a}–${b}` }; }),
    ]}/>
    </div>
    <div className="space-y-1.5">
    <Segmented value={chartViewMode} onChange={(v) => { setChartViewMode(v); setHoverNode(null); }} options={[
        { value: 'compact', label: 'Compact', icon: Minimize2, title: 'The whole pyramid on one screen' },
        { value: 'standard', label: 'Standard', icon: LayoutGrid, title: 'Everyday view' },
        { value: 'expanded', label: 'Expanded', icon: Maximize2, title: 'Immersive: click a club to focus on it' },
    ]}/>
    </div>
    </div>
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
    <div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Sparkles}>Presets</ControlLabel>
    <FilterPills accent="teal" value={presetFilter} onChange={(v) => { setPresetFilter(presetFilter === v ? 'all' : v); setDivisionFilter('all'); }} options={[
        { value: 'wrexham', label: `${CLUB_DISPLAY_NAME} Ascent`, title: 'Your club' },
        { value: 'div1_elite', label: 'Div 1 Elite', badge: presetCounts.div1_elite, title: 'In Division 1 at the end of every season' },
        { value: 'yoyo', label: 'Yo-Yo Clubs', badge: presetCounts.yoyo, title: 'Promoted then relegated in successive seasons (or the reverse), at least once' },
        { value: 'big_risers', label: 'Top Risers', badge: presetCounts.big_risers, title: `Climbed ${TOP_RISER_PLACES}+ places overall` },
    ]}/>
    </div>
    <div className="flex items-center gap-2">
    <SearchInput accent="teal" className="w-full sm:w-60" value={searchQuery} onChange={setSearchQuery} placeholder="Highlight club or code..."/>
    <ResetButton disabled={!(highlightedTeamId || focusTeamId || pinnedIds.length || filterActive)} onClick={() => {
            setHighlightedTeamId(null);
            setFocusTeamId(null);
            setPinnedIds([]);
            setSearchQuery('');
            setPresetFilter('all');
            setDivisionFilter('all');
        }}/>
    </div>
    </div>
    </div>

    <div className={focusTeam ? 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 items-start' : ''}>
    <div className="min-w-0">
    {/* Sticky strip: status bar + season headers. Always the same size, so nothing moves. */}
    <div className="sticky z-20 bg-slate-50/95 backdrop-blur-sm pt-2 pb-1" style={{ top: stickyTop }}>
    <div className={`${phone ? 'h-[112px] py-2 items-start justify-between gap-2' : 'h-16 items-center justify-between gap-3'} px-3 rounded-lg bg-slate-100 border border-slate-200 flex`}>
        {activeTeam ? (<>
        <div className={phone ? 'flex items-start gap-2.5 min-w-0 flex-1' : 'flex items-center gap-3 min-w-0'}>
        <span className="shrink-0 inline-flex"><SvgFlag code={activeTeam.countryCode} width={24} height={17}/></span>
        <div className="min-w-0">
        <div className="flex items-center gap-2 min-w-0">
        <span className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white" style={{ backgroundColor: activeTeam.hex }}/>
        <span className="font-extrabold text-sm text-slate-900 truncate">{activeTeam.name}</span>
        <span className="text-xs text-slate-500 font-semibold shrink-0">{activeTeam.abbr}</span>
        </div>
        <div className={phone ? 'text-xs text-slate-600 grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1' : 'text-xs text-slate-600 flex flex-wrap items-center gap-x-3 mt-0.5'}>
        <span>Now <strong className="text-slate-900">{activeTeam.curRank}</strong> ({(DIVISIONS[activeTeam.div] || {})[phone ? 'shortName' : 'name']})</span>
        <span>Avg <strong className="text-slate-900">{activeTeam.avgRank.toFixed(1)}</strong></span>
        <span>Peak <strong className="text-emerald-700">{activeTeam.highRank}</strong></span>
        <span>Trophies <strong className="text-amber-700">{activeTeam.totalTrophies}</strong></span>
        {activeTeam.bounces > 0 && <span>Yo-yo bounces <strong className="text-slate-900">{activeTeam.bounces}</strong></span>}
        </div>
        {/* v24.1 phones: no hover card; while scrubbing, the season under your finger shows here */}
        {phone && hoverNode && hoverNode.team.id === activeTeam.id && (() => { const hs = activeTeam.seasons[hoverNode.season - 1] || {}; const ch = hs.change; return (
            <div className="mt-1 text-xs font-bold text-slate-900">S{hoverNode.season} · {hs.rank ?? '–'} <span className="font-semibold text-slate-500">({(DIVISIONS[hs.div] || {}).shortName})</span> <span className={ch > 0 ? 'text-emerald-700' : ch < 0 ? 'text-rose-700' : 'text-slate-400'}>{ch > 0 ? `▲${ch}` : ch < 0 ? `▼${Math.abs(ch)}` : '–'}</span></div>); })()}
        </div>
        </div>
        <div className={phone ? 'flex flex-col items-center gap-1 shrink-0' : 'flex items-center gap-1.5 shrink-0'}>
        <button onClick={() => setSelectedTeam(activeTeam)} aria-label="View profile" title="View profile" className={`${phone ? 'w-8 h-8 inline-flex items-center justify-center' : 'px-2.5 py-1'} bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 rounded-lg transition`}>
        {phone ? <Eye className="w-4 h-4"/> : 'View Profile'}
        </button>
        {isCompact && (<button onClick={() => togglePin(activeTeam)} title={!isPinned(activeTeam) && pinnedIds.length >= MAX_PINNED ? `Replaces the oldest of ${MAX_PINNED} pinned clubs` : undefined}
            aria-label={isPinned(activeTeam) ? 'Unpin club' : 'Pin club'}
            className={`${phone ? 'w-8 h-8 inline-flex items-center justify-center' : 'px-2.5 py-1'} border text-xs font-bold rounded-lg transition ${isPinned(activeTeam) ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}>
        {phone ? <Pin className="w-4 h-4"/> : isPinned(activeTeam) ? 'Unpin' : 'Pin club'}
        </button>)}
        <button onClick={() => { setHighlightedTeamId(null); setFocusTeamId(null); }} title="Clear" className="text-slate-500 hover:text-slate-900 p-1 rounded">
        <X className="w-4 h-4"/>
        </button>
        </div>
        </>) : (<span className="text-xs font-semibold text-slate-500">
            {phone ? (isExpanded ? 'Tap a club to focus on it.' : 'Tap the chart to scrub. Tap outside to stop.') : isExpanded ? 'Hover a club to see its details here. Click one to focus on it.' : isCompact ? `Hover a club to see its details here. Click lines to pin up to ${MAX_PINNED} clubs to compare.` : 'Hover or click a club to see its details here.'}
        </span>)}
    </div>
    {/* Compact: pinned clubs (fixed height, so nothing moves) */}
    {isCompact && (<div className="h-9 mt-1.5 px-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-500 shrink-0">Compare</span>
        {pinned.length ? pinned.map((t) => (<span key={t.id} className="inline-flex items-center gap-1.5 pl-1.5 pr-1 py-0.5 rounded-full border text-xs font-bold text-slate-800 shrink-0" style={{ borderColor: t.hex }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.hex }}/>
            <SvgFlag code={t.countryCode} width={14} height={10}/>
            {screen !== 'desktop' ? t.abbr : t.shortName}
            <button onClick={() => togglePin(t)} title="Unpin" className="text-slate-400 hover:text-slate-800"><X className="w-3.5 h-3.5"/></button>
            </span>)) : (<span className="text-[11px] text-slate-400 font-medium">Click up to {MAX_PINNED} clubs' lines to compare their paths.</span>)}
        {pinned.length > 0 && (<button onClick={() => setPinnedIds([])} className="ml-auto text-[11px] font-bold text-slate-500 hover:text-slate-800 shrink-0">Clear</button>)}
    </div>)}
    {/* Season headers, lined up with the chart's columns */}
    <div className="relative mt-1.5" style={{ height: 30 }}>
        {seasonNums.map((s) => {
            const latest = s === lastSeason;
            return (<div key={`sh-${s}`} className="absolute top-1.5 -translate-x-1/2" style={{ left: getX(s) }}>
            <span className={`block text-xs whitespace-nowrap ${latest ? 'font-extrabold' : 'font-semibold text-slate-500'}`} style={latest ? { color: PYRAMID_ACCENT } : undefined}>
            S{s}
            </span>
            </div>);
        })}
    </div>
    </div>

    {/* The chart: draws at the page's width; the page scrolls, not the chart */}
    <div ref={chartRef} className={`relative w-full select-none rounded-lg ${scrubOn && !isExpanded ? 'ring-2 ring-teal-500/60' : ''}`} {...(isExpanded ? {} : scrubProps)}>
    <svg width={chartWidth} height={chartHeight} className="block font-sans overflow-visible">
    <defs>
    <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="1" stdDeviation="3" floodOpacity="0.45"/>
    </filter>
    </defs>
    {/* 1. Division rail (left edge) */}
    <g>
        {divIds.map((d) => {
            const [a, b] = divRange(d);
            const top = d === 1 ? getY(1) - 4 : getY(a - 0.5) + 2;
            const bottom = d === divIds.length ? getY(TOTAL_CLUBS) + 4 : getY(b + 0.5) - 2;
            const mid = (top + bottom) / 2;
            const st = DIVISIONS[d] || DIVISIONS[4];
            const label = isCompact || bottom - top < 150 ? `Div ${d}` : `Division ${d} • Ranks ${a}–${b}`;
            return (<g key={`rail-${d}`}>
            <rect x="8" y={top} width="30" height={bottom - top} rx="5" fill={st.badgeBg} stroke={st.badgeBorder} strokeWidth="1.2"/>
            <rect x="8" y={top} width="4" height={bottom - top} rx="2" fill={st.color}/>
            {/* dy centres the rotated text across the box */}
            <text x="25" y={mid} dy="0.35em" transform={`rotate(-90, 25, ${mid})`} textAnchor="middle" fill={st.badgeText} className="text-[11px] font-bold tracking-widest uppercase font-sans">
            {label}
            </text>
            </g>);
        })}
    </g>
    {/* 2. Division bands and cutoff lines */}
    <g>
        {divIds.map((d) => {
            const [a, b] = divRange(d);
            const top = d === 1 ? margin.top : getY(a - 0.5);
            const bottom = d === divIds.length ? margin.top + plotHeight : getY(b + 0.5);
            return <rect key={`band-${d}`} x={margin.left} y={top} width={plotWidth} height={bottom - top} fill={(DIVISIONS[d] || DIVISIONS[4]).bgTint}/>;
        })}
        {divBoundaryRanks().map((r, i) => {
            const y = getY(r + 0.5);
            const st = DIVISIONS[i + 1] || DIVISIONS[4];
            return <line key={`cut-${r}`} x1={margin.left} y1={y} x2={margin.left + plotWidth} y2={y} stroke={st.color} strokeDasharray="5 4" strokeWidth="1.5" opacity="0.45"/>;
        })}
    </g>
    {/* 2b. Expanded: automatic promotion and relegation zones */}
        {isExpanded && divIds.map((d) => {
            const [a, b] = divRange(d);
            const up = AUTO_PROMOTION_PLACES[d] || 0;
            const down = RELEGATION_PLACES[d] || 0;
            return (<g key={`zones-${d}`}>
            {up > 0 && (<g>
                <rect x={margin.left} y={getY(a - 0.5)} width={plotWidth} height={getY(a + up - 0.5) - getY(a - 0.5)} fill="rgba(16, 185, 129, 0.10)"/>
                <text x={margin.left + 6} y={getY(a - 0.5) + 10} className="text-[11px] font-bold font-sans" fill="#047857">Automatic promotion</text>
                </g>)}
            {down > 0 && (<g>
                <rect x={margin.left} y={getY(b - down + 0.5)} width={plotWidth} height={getY(b + 0.5) - getY(b - down + 0.5)} fill="rgba(244, 63, 94, 0.08)"/>
                <text x={margin.left + 6} y={getY(b + 0.5) - 4} className="text-[11px] font-bold font-sans" fill="#be123c">Relegation</text>
                </g>)}
            </g>);
        })}
    {/* 3. Season gridlines and bottom labels */}
        {seasonNums.map(s => (<g key={`col-${s}`}>
        <line x1={getX(s)} y1={margin.top} x2={getX(s)} y2={margin.top + plotHeight} stroke="#e2e8f0" strokeWidth="1"/>
        <text x={getX(s)} y={margin.top + plotHeight + 20} textAnchor="middle" className="text-xs font-semibold font-sans" fill="#64748b">S{s}</text>
        </g>))}
    {/* 4. Rank ticks (Compact only: no names there) */}
        {isCompact && yTicks.map(r => {
            const major = majorTicks.includes(r);
            return (<g key={`y-${r}`}>
            <text x={margin.left - 8} y={getY(r) + 3.5} textAnchor="end" className={`font-sans font-semibold ${major ? 'text-[11px] fill-slate-800 font-bold' : 'text-[9.5px] fill-slate-400'}`}>{r}</text>
            <line x1={margin.left - (major ? 6 : 4)} y1={getY(r)} x2={margin.left} y2={getY(r)} stroke={major ? '#94a3b8' : '#e2e8f0'} strokeWidth={major ? 1.2 : 0.8}/>
            </g>);
        })}
    {/* 5. Lines */}
    <g>
        {drawOrder.map(team => {
            const st = lineStyle(team);
            const isSpot = spotlight && spotlight.id === team.id;
            return (<path key={`line-${team.id}`} d={generatePath(team.seasons)} fill="none" stroke={st.stroke} strokeWidth={st.width} opacity={st.opacity} strokeLinecap="round" strokeLinejoin="round" filter={isSpot ? 'url(#lineGlow)' : undefined} className="cursor-pointer" onMouseEnter={() => setHighlightedTeamId(team.id)} onClick={() => onClub(team)}/>);
        })}
    </g>
    {/* 6. Points (with rank numbers and markers in Expanded) */}
    <g>
        {drawOrder.map(team => {
            const st = lineStyle(team);
            const isSpot = spotlight && spotlight.id === team.id;
            const dim = spotlight && !isSpot;
            return team.seasons.map(s => {
                if (s.rank === null) return null;
                const cx = getX(s.season);
                const cy = getY(s.rank);
                const isHovered = hoverNode && hoverNode.team.id === team.id && hoverNode.season === s.season;
                const r = isExpanded ? (isSpot ? 11.5 : 10) : isCompact ? (isSpot || isHovered || isPinned(team) ? 3.5 : 2) : (isSpot ? 6 : isHovered ? 5 : 3.5);
                const showMarkers = isExpanded && (!dim || isSpot);
                const big = isHovered; // markers grow on hover
                const mH = big ? 16 : 13, mFont = big ? 'text-[11px]' : 'text-[11px]', mCharW = big ? 7 : 6;
                return (<g key={`node-${team.id}-${s.season}`} className="cursor-pointer" onMouseEnter={() => { setHighlightedTeamId(team.id); setHoverNode({ team, season: s.season, x: cx, y: cy }); }} onMouseLeave={() => setHoverNode(null)} onClick={() => onClub(team)}>
                <circle cx={cx} cy={cy} r={r + 6} fill="transparent"/>
                {isHovered && <circle cx={cx} cy={cy} r={r + 3.5} fill="none" stroke={st.stroke} strokeWidth="1.8" opacity="0.85"/>}
                <circle cx={cx} cy={cy} r={r} fill={isExpanded || isSpot || isHovered ? '#ffffff' : st.stroke} stroke={st.stroke} strokeWidth={isExpanded ? (isSpot ? 2.6 : 1.6) : isSpot ? 2.6 : 1} opacity={dim ? 0.2 : 1}/>
                {isExpanded && (<text x={cx} y={cy} dy="0.35em" textAnchor="middle" pointerEvents="none" className="text-[9.5px] font-extrabold font-sans" fill={dim ? '#cbd5e1' : '#0f172a'}>{s.rank}</text>)}
                {isExpanded && isTitle(s) && !dim && (<g transform={`translate(${cx - 7}, ${cy - r - 11})`} pointerEvents="none">
                    <title>{`Division ${s.div} champions`}</title>
                    <polygon points="0,9 1,2 4.5,5.5 7,0 9.5,5.5 13,2 14,9" fill="#fbbf24" stroke="#b45309" strokeWidth="0.9" strokeLinejoin="round"/>
                    </g>)}
                {showMarkers && markerFor(s).map((m, i, arr) => {
                    const w = m.text.length * mCharW + 8;
                    const y0 = cy - (arr.length * (mH + 2)) / 2 + i * (mH + 2);
                    return (<g key={m.k} transform={`translate(${cx + r + 4}, ${y0})`} pointerEvents="none">
                    <rect width={w} height={mH} rx="3" fill={m.fill} stroke={m.stroke} strokeWidth="0.9"/>
                    <text x={w / 2} y={mH / 2} dy="0.35em" textAnchor="middle" className={`${mFont} font-extrabold font-sans`} fill={m.color}>{m.text}</text>
                    </g>);
                })}
                </g>);
            });
        })}
    </g>
    {/* 6b. Compact: abbreviations for pinned clubs at both ends */}
        {isCompact && pinned.map((t) => {
            const first = t.seasons.find((x) => x.rank != null);
            const last = [...t.seasons].reverse().find((x) => x.rank != null);
            if (!first || !last) return null;
            const tag = (x, y, anchor, label) => {
                const w = label.length * 6.5 + 10;
                const x0 = anchor === 'end' ? x - w : x;
                return (<g>
                <rect x={x0} y={y - 8} width={w} height={16} rx="4" fill={t.hex}/>
                <text x={x0 + w / 2} y={y} dy="0.35em" textAnchor="middle" className="text-[11px] font-extrabold font-sans" fill={getContrastText(t.hex)}>{label}</text>
                </g>);
            };
            return (<g key={`pin-${t.id}`} pointerEvents="none">
            {!phone && tag(margin.left - 34, getY(first.rank), 'end', t.abbr)}
            {tag(margin.left + plotWidth + 10, getY(last.rank), 'start', `${t.abbr} ${last.rank}`)}
            </g>);
        })}
    {/* 7. Left labels: first-season finish (not in Compact) */}
        {!isCompact && filteredTeams.map(team => {
            const s1 = team.seasons[0];
            if (!s1 || s1.rank === null) return null;
            const y = getY(s1.rank);
            const isSpot = spotlight && spotlight.id === team.id;
            const x0 = RAIL_W;
            const w = leftLabelW;
            const h = isExpanded ? 22 : 16;
            const fw = flagW, fh = isExpanded ? 13 : 10;
            const max = nameChars;
            return (<g key={`ll-${team.id}`} className="cursor-pointer" onClick={() => onClub(team)} onMouseEnter={() => setHighlightedTeamId(team.id)} opacity={spotlight && !isSpot ? 0.45 : 1}>
            <rect x={x0} y={y - h / 2} width={w} height={h} rx="5" fill={isSpot ? '#0f172a' : 'transparent'}/>
            {/* Name, flag, then rank next to the chart (Expanded: no rank, the points show it) */}
            {!isExpanded && (<text x={x0 + w - 6} y={y} dy="0.35em" textAnchor="end" className="font-bold font-sans text-[11px]" fill={isSpot ? '#ffffff' : '#0f172a'}>{s1.rank}</text>)}
            <SvgFlag code={team.countryCode} x={x0 + w - 6 - sideRankW - fw} y={y - fh / 2} width={fw} height={fh}/>
            <text x={x0 + w - 6 - sideRankW - fw - 6} y={y} dy="0.35em" textAnchor="end" className={`font-sans ${isExpanded ? 'text-[11.5px]' : 'text-[11px]'} ${isSpot ? 'font-bold' : 'font-semibold'}`} fill={isSpot ? '#ffffff' : '#1e293b'}>
            {phone ? team.abbr : team.shortName.length > max ? `${team.shortName.slice(0, max - 1)}…` : team.shortName}
            </text>
            </g>);
        })}
    {/* 8. Right labels: latest-season finish (not in Compact) */}
        {!isCompact && !phone && filteredTeams.map(team => {
            const last = team.seasons[team.seasons.length - 1];
            if (!last || last.rank === null) return null;
            const y = getY(last.rank);
            const isSpot = spotlight && spotlight.id === team.id;
            const w = rightLabelW;
            const h = isExpanded ? 22 : 16;
            const x0 = margin.left + plotWidth + 12;
            const fw = flagW, fh = isExpanded ? 13 : 10;
            const max = nameChars;
            const ch = team.changeLast;
            return (<g key={`rl-${team.id}`} className="cursor-pointer" onClick={() => onClub(team)} onMouseEnter={() => setHighlightedTeamId(team.id)} opacity={spotlight && !isSpot ? 0.45 : 1}>
            <rect x={x0} y={y - h / 2} width={w} height={h} rx="5" fill={isSpot ? team.hex : '#f8fafc'} stroke={isSpot ? team.hex : '#e2e8f0'} strokeWidth="1"/>
            {!isExpanded && (<text x={x0 + 8} y={y} dy="0.35em" className="font-bold font-sans text-[11px]" fill={isSpot ? getContrastText(team.hex) : '#0f172a'}>{last.rank}</text>)}
            <SvgFlag code={team.countryCode} x={x0 + 8 + sideRankW} y={y - fh / 2} width={fw} height={fh}/>
            <text x={x0 + 8 + sideRankW + fw + 6} y={y} dy="0.35em" className={`font-sans ${isExpanded ? 'text-[11.5px]' : 'text-[11px]'} ${isSpot ? 'font-bold' : 'font-semibold'}`} fill={isSpot ? getContrastText(team.hex) : '#1e293b'}>
            {phone ? team.abbr : team.shortName.length > max ? `${team.shortName.slice(0, max - 1)}…` : team.shortName}
            </text>
            <text x={x0 + w - 8} y={y} dy="0.35em" textAnchor="end" className={`font-bold font-sans ${isExpanded ? 'text-[11px]' : 'text-[11px]'}`} fill={isSpot ? getContrastText(team.hex) : ch > 0 ? '#16a34a' : ch < 0 ? '#dc2626' : '#94a3b8'}>
            {ch > 0 ? `+${ch}` : ch < 0 ? ch : '–'}
            </text>
            </g>);
        })}
    </svg>

    {/* Hover card (light, like League and Cups) */}
    {hoverNode && !phone && (() => {
        const t = hoverNode.team;
        const s = t.seasons[hoverNode.season - 1] || {};
        const w = 244;
        const right = hoverNode.x > chartWidth * 0.55;
        const left = right ? hoverNode.x - w - 18 : hoverNode.x + 18;
        const top = Math.max(0, Math.min(hoverNode.y - 70, chartHeight - 170));
        const tag = s.tag && TAG_CONFIG[s.tag] ? TAG_CONFIG[s.tag] : null;
        const moveTxt = s.move === 'P' ? 'Promoted' : s.move === 'R' ? 'Relegated' : null;
        return (<div className={`${phone ? 'fixed z-[70] left-3 right-3 bottom-3 mx-auto max-w-sm' : 'absolute z-30'} pointer-events-none bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-3 text-xs`} style={phone ? undefined : { left: Math.max(0, left), top, width: w }}>
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5 mb-2 min-w-0">
        <SvgFlag code={t.countryCode} width={18} height={13}/>
        <span className="font-extrabold text-slate-900 truncate flex-1 min-w-0">{t.name}</span>
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.hex }}/>
        </div>
        <div className="space-y-1.5 bg-slate-50 rounded-lg p-2 border border-slate-100">
        <div className="flex justify-between"><span className="text-slate-600 font-medium">Season {hoverNode.season}</span><span className="font-black text-slate-900">{s.rank} <span className="font-semibold text-slate-500">({(DIVISIONS[s.div] || {}).shortName})</span></span></div>
        <div className="flex justify-between"><span className="text-slate-600 font-medium">Change</span><span className={`font-black ${s.change > 0 ? 'text-emerald-700' : s.change < 0 ? 'text-rose-700' : 'text-slate-500'}`}>{s.change > 0 ? `▲ ${s.change}` : s.change < 0 ? `▼ ${Math.abs(s.change)}` : '–'}</span></div>
        {(moveTxt || tag) && (<div className="flex justify-between"><span className="text-slate-600 font-medium">End of season</span><span className="font-bold text-slate-900">{[moveTxt, tag && ['UCL', 'UEL', 'UECL'].includes(s.tag) ? tag.label : null].filter(Boolean).join(' • ')}</span></div>)}
        </div>
        <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-2">
        <span>Avg finish {t.avgRank.toFixed(1)}</span>
        <span>{scrubOn ? 'Tap outside to stop' : phone ? '' : isExpanded ? 'Click to focus' : isCompact ? (isPinned(t) ? 'Click to unpin' : 'Click to pin') : 'Click for profile'}</span>
        </div>
        </div>);
    })()}
    </div>
    </div>

    {/* Focus panel (Expanded): the club's story, season by season */}
    {focusTeam && ((body) => (phone
        ? <Sheet onClose={() => setFocusTeamId(null)}><div className="flex-1 min-h-0 overflow-y-auto bg-white"><div className="min-h-full flex flex-col">{body}</div></div></Sheet>
        : <aside className="sticky self-start bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" style={{ top: stickyTop + 8 }}>{body}</aside>))(<>
    <div className="p-4 border-b border-slate-100" style={{ borderTop: `4px solid ${focusTeam.hex}` }}>
    <div className="flex items-center gap-2 min-w-0">
    <SvgFlag code={focusTeam.countryCode} width={22} height={16}/>
    <span className="font-extrabold text-slate-900 truncate flex-1 min-w-0">{focusTeam.name}</span>
    <button onClick={() => setFocusTeamId(null)} title="Close" className="text-slate-400 hover:text-slate-800 p-1 rounded"><X className="w-4 h-4"/></button>
    </div>
    <div className="grid grid-cols-4 gap-2 mt-3 text-center">
        {[
            { label: 'S1', value: focusTeam.seasons[0] && focusTeam.seasons[0].rank != null ? focusTeam.seasons[0].rank : '–' },
            { label: 'Now', value: focusTeam.curRank },
            { label: 'Peak', value: focusTeam.highRank },
            { label: 'Trophies', value: focusTeam.totalTrophies },
        ].map((k) => (<div key={k.label} className="bg-slate-50 border border-slate-100 rounded-lg py-1.5">
        <div className="text-[11px] font-semibold text-slate-500">{k.label}</div>
        <div className="text-sm font-black text-slate-900">{k.value}</div>
        </div>))}
    </div>
    {(() => {
        const t = focusTeam;
        const ranked = t.seasons.filter((x) => x.rank != null);
        const best = ranked.length ? ranked.reduce((a, x) => (x.rank < a.rank ? x : a)) : null;
        const worst = ranked.length ? ranked.reduce((a, x) => (x.rank > a.rank ? x : a)) : null;
        const trophies = [
            { label: 'Div 1 titles', n: t.div1Wins }, { label: 'Div 2 titles', n: t.div2Wins },
            { label: 'Div 3 titles', n: t.div3Wins }, { label: 'Div 4 titles', n: t.div4Wins },
            { label: 'UCL', n: t.ucl }, { label: 'UEL', n: t.uel }, { label: 'UECL', n: t.uecl },
            { label: 'Super Cup', n: t.superCup }, { label: 'FA Cup', n: t.faCup },
            { label: 'Carabao Cup', n: t.carabao }, { label: 'Community Shield', n: t.communityShield },
        ].filter((x) => x.n > 0);
        return (<div className="mt-3 space-y-2 text-xs">
        <div className="flex justify-between"><span className="text-slate-500 font-semibold">Best season</span><span className="font-bold text-slate-900">{best ? `S${best.season}: ${best.rank} (${(DIVISIONS[best.div] || {}).shortName})` : '–'}</span></div>
        <div className="flex justify-between"><span className="text-slate-500 font-semibold">Worst season</span><span className="font-bold text-slate-900">{worst ? `S${worst.season}: ${worst.rank} (${(DIVISIONS[worst.div] || {}).shortName})` : '–'}</span></div>
        <div className="flex justify-between"><span className="text-slate-500 font-semibold">Average finish</span><span className="font-bold text-slate-900">{t.avgRank.toFixed(1)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500 font-semibold">Yo-yo bounces</span><span className="font-bold text-slate-900">{t.bounces}</span></div>
        <div>
        <div className="text-slate-500 font-semibold mb-1">Trophies</div>
        {trophies.length ? (<div className="flex flex-wrap gap-1">
            {trophies.map((x) => (<span key={x.label} className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-bold text-[11px]">{x.label} × {x.n}</span>))}
        </div>) : (<span className="text-slate-400">None yet</span>)}
        </div>
        </div>);
    })()}
    </div>
    <div className={`${phone ? '' : 'max-h-[34vh] overflow-y-auto '}divide-y divide-slate-100`}>
        {focusTeam.seasons.map((s) => {
            const st = DIVISIONS[s.div] || DIVISIONS[4];
            const euro = s.tag && ['UCL', 'UEL', 'UECL'].includes(s.tag) ? TAG_CONFIG[s.tag] : null;
            // v27 phones: 6 columns: season · crown · rank · division · change · tags (side by side, P / R)
            if (phone) return (<div key={s.season} className="px-4 py-2 grid grid-cols-[1fr_16px_1fr_1fr_1fr_1.3fr] items-center gap-x-1.5 text-xs">
            <span className="justify-self-center font-bold text-slate-500">S{s.season}</span>
            <span className="justify-self-end inline-flex">{isTitle(s) && <Crown className="w-3.5 h-3.5 text-amber-500" aria-label="Division champions"/>}</span>
            <span className="justify-self-start font-black text-slate-900">{s.rank ?? '–'}</span>
            <span className="justify-self-center px-1.5 rounded font-bold text-[11px]" style={{ backgroundColor: st.badgeBg, color: st.badgeText }}>{st.shortName}</span>
            <span className={`justify-self-center font-bold ${s.change > 0 ? 'text-emerald-700' : s.change < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{s.change > 0 ? `▲${s.change}` : s.change < 0 ? `▼${Math.abs(s.change)}` : '–'}</span>
            <span className="justify-self-center inline-flex items-center gap-1">
            {s.move === 'P' && <span className="px-1.5 rounded text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200" title="Promoted">P</span>}
            {s.move === 'R' && <span className="px-1.5 rounded text-[11px] font-extrabold bg-rose-50 text-rose-800 border border-rose-200" title="Relegated">R</span>}
            {euro && <span className="px-1.5 rounded text-[11px] font-extrabold border" style={{ backgroundColor: euro.bg, color: euro.color, borderColor: euro.border }}>{euro.short}</span>}
            </span>
            </div>);
            return (<div key={s.season} className="px-4 py-2 flex items-center gap-2 text-xs">
            <span className="w-7 font-bold text-slate-500">S{s.season}</span>
            <span className="w-8 font-black text-slate-900 inline-flex items-center gap-0.5">{s.rank ?? '–'}{isTitle(s) && <Crown className="w-3.5 h-3.5 text-amber-500" aria-label="Division champions"/>}</span>
            <span className="px-1.5 rounded font-bold text-[11px]" style={{ backgroundColor: st.badgeBg, color: st.badgeText }}>{st.shortName}</span>
            <span className={`font-bold ${s.change > 0 ? 'text-emerald-700' : s.change < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{s.change > 0 ? `▲${s.change}` : s.change < 0 ? `▼${Math.abs(s.change)}` : '–'}</span>
            {!phone && <span className="flex-1"/>}
            {/* Phones: the tags share the fifth column (stacked if two) */}
            {(() => { const tags = (<>
            {s.move === 'P' && <span className="px-1.5 rounded text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">Promoted</span>}
            {s.move === 'R' && <span className="px-1.5 rounded text-[11px] font-extrabold bg-rose-50 text-rose-800 border border-rose-200">Relegated</span>}
            {euro && <span className="px-1.5 rounded text-[11px] font-extrabold border" style={{ backgroundColor: euro.bg, color: euro.color, borderColor: euro.border }}>{euro.short}</span>}
            </>); return phone ? <span className="flex flex-col items-center gap-0.5">{tags}</span> : tags; })()}
            </div>);
        })}
    </div>
    <div className={`p-3 border-t border-slate-100 flex gap-2 ${phone ? 'mt-auto sticky bottom-0 bg-white pb-[max(12px,env(safe-area-inset-bottom))]' : ''}`}>
    <button onClick={() => setSelectedTeam(focusTeam)} className="flex-1 px-3 py-1.5 text-xs font-bold rounded-lg text-white" style={{ backgroundColor: PYRAMID_ACCENT }}>Full profile</button>
    <button onClick={() => { setFocusTeamId(null); setHighlightedTeamId(null); }} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">Clear focus</button>
    </div>
    </>)}
    </div>
    </div>);
}
// Readable text on a club-colour background
function getContrastText(hex) {
    const h = String(hex || '').replace('#', '');
    if (h.length !== 6) return '#ffffff';
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#0f172a' : '#ffffff';
}
// ------------------------------------------------------------------------------------------------
// TAB 2: STANDINGS & SEASON-BY-SEASON MATRIX
// ------------------------------------------------------------------------------------------------
function StandingsTab({ teams, filteredTeams, divisionFilter, setDivisionFilter, searchQuery, setSearchQuery, onSelectTeam, onOpenEditModal }) {
    const seasonNums = seasonNumsOf(teams);
    const [sortField, setSortField] = useState('curRank');
    const [sortAsc, setSortAsc] = useState(true);
    const handleSort = (field) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        }
        else {
            setSortField(field);
            setSortAsc(true);
        }
    };
    const sortedTeams = useMemo(() => {
        // Season columns sort by that season's finish ('season:3'); clubs
        // with no finish that season always go last
        const seasonOf = (t) => {
            const n = Number(String(sortField).split(':')[1]);
            const ss = t.seasons[n - 1];
            return ss && ss.rank != null ? ss.rank : null;
        };
        const isSeason = String(sortField).startsWith('season:');
        return [...filteredTeams].sort((a, b) => {
            let valA = isSeason ? seasonOf(a) : a[sortField];
            let valB = isSeason ? seasonOf(b) : b[sortField];
            if (isSeason && (valA == null || valB == null)) return valA == null && valB == null ? 0 : valA == null ? 1 : -1;
            if (typeof valA === 'string')
                valA = valA.toLowerCase();
            if (typeof valB === 'string')
                valB = valB.toLowerCase();
            if (valA < valB)
                return sortAsc ? -1 : 1;
            if (valA > valB)
                return sortAsc ? 1 : -1;
            return 0;
        });
    }, [filteredTeams, sortField, sortAsc]);
    return (<div className="space-y-4 font-sans">
    {/* Controls Bar */}
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-sans">
    <div className="flex items-center space-x-2 font-sans">
    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg font-sans">
    <button onClick={() => setDivisionFilter('all')} className={`px-3 py-1 rounded-md text-xs font-medium transition font-sans ${divisionFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'}`}>
All {TOTAL_CLUBS}
    </button>
        {DIV_STARTS.map((_, i) => i + 1).map(d => (<button key={d} onClick={() => setDivisionFilter(String(d))} className={`px-3 py-1 rounded-md text-xs font-medium transition font-sans ${divisionFilter === String(d)
                ? d === 1 ? 'bg-purple-600 text-white font-semibold' : d === 2 ? 'bg-amber-500 text-white font-semibold' : d === 3 ? 'bg-slate-600 text-white font-semibold' : 'bg-orange-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'}`}>
Div {d}
        </button>))}
    </div>
    <span className="text-xs text-slate-400 font-medium font-sans">({sortedTeams.length} clubs)</span>
    </div>
    <SearchInput accent="teal" className="w-full sm:w-72" value={searchQuery} onChange={setSearchQuery} placeholder="Search club, country code, abbr..."/>
    </div>
    {/* Standings Table */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">
    <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse text-xs font-sans">
    <thead>
    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider text-[11px] font-sans">
    <th onClick={() => handleSort('curRank')} className="py-3 px-3 cursor-pointer hover:text-slate-900 select-none text-center w-12">
Rank {sortField === 'curRank' && (sortAsc ? '▲' : '▼')}
    </th>
    <th onClick={() => handleSort('divPos')} className="py-3 px-2 cursor-pointer hover:text-slate-900 select-none text-center w-10 text-slate-400">
Div#
    </th>
    <th onClick={() => handleSort('name')} className="py-3 px-3 cursor-pointer hover:text-slate-900 select-none min-w-[200px]">
Club {sortField === 'name' && (sortAsc ? '▲' : '▼')}
    </th>
    <th onClick={() => handleSort('changeLast')} className="py-3 px-2.5 cursor-pointer hover:text-slate-900 select-none text-center w-14">
Form
    </th>
    <th onClick={() => handleSort('avgRank')} className="py-3 px-2.5 cursor-pointer hover:text-slate-900 select-none text-center w-14">
Avg
    </th>
    <th onClick={() => handleSort('highRank')} className="py-3 px-2 cursor-pointer hover:text-slate-900 select-none text-center w-12">
Peak
    </th>
    <th onClick={() => handleSort('lowRank')} className="py-3 px-2 cursor-pointer hover:text-slate-900 select-none text-center w-12">
Low
    </th>
    <th onClick={() => handleSort('volatility')} className="py-3 px-2 cursor-pointer hover:text-slate-900 select-none text-center w-14">
Range
    </th>
    {/* Season columns (every completed season) */}
        {seasonNums.map(s => (<th key={s} onClick={() => handleSort(`season:${s}`)} title={`Sort by Season ${s} finish`} className="py-3 px-2 text-center w-12 text-slate-500 font-medium font-sans cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
S{s} {sortField === `season:${s}` && (sortAsc ? '▲' : '▼')}
        </th>))}
    <th onClick={() => handleSort('totalTrophies')} className="py-3 px-3 cursor-pointer hover:text-slate-900 select-none text-center w-16 font-sans">
🏆 Tot
    </th>
    {onOpenEditModal && <th className="py-3 px-3 text-right w-16 font-sans">Actions</th>}
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-100 font-sans">
        {sortedTeams.map(team => {
            return (<tr key={team.id} className="hover:bg-slate-50/70 transition-colors group cursor-pointer font-sans" onClick={() => onSelectTeam(team)}>
            {/* Overall Rank */}
            <td className="py-2.5 px-3 text-center">
            <span className="font-sans font-bold text-slate-900">
#{team.curRank}
            </span>
            </td>
            {/* Div Pos */}
            <td className="py-2.5 px-2 text-center text-slate-400 font-sans text-[11px]">
            {team.divPos}
            </td>
            {/* Club Details */}
            <td className="py-2.5 px-3">
            <div className="flex items-center space-x-2.5 font-sans">
            <span className="shrink-0 inline-flex"><SvgFlag code={team.countryCode} width={22} height={16}/></span>
            <div className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-slate-200" style={{ backgroundColor: team.hex }} title={`Color code: ${team.hex}`}/>
            <div className="min-w-0 font-sans">
            <div className="font-semibold text-slate-900 truncate flex items-center space-x-1.5 font-sans">
            <span>{team.name}</span>
            <span className="text-slate-400 text-[11px] font-sans font-normal">
{team.abbr}
            </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
Start rating ★ {team.startRating.toFixed(1)}
            </div>
            </div>
            </div>
            </td>
            {/* Form / Last Movement */}
            <td className="py-2.5 px-2.5 text-center font-semibold font-sans">
                {team.changeLast > 0 ? (<span className="inline-flex items-center text-emerald-600 font-sans text-[11px] font-bold">
+{team.changeLast}
                </span>) : team.changeLast < 0 ? (<span className="inline-flex items-center text-rose-600 font-sans text-[11px] font-bold">
                {team.changeLast}
                </span>) : (<span className="text-slate-400 font-sans text-[11px]">—</span>)}
            </td>
            {/* Avg Finish */}
            <td className="py-2.5 px-2.5 text-center font-sans text-slate-700">
#{team.avgRank.toFixed(1)}
            </td>
            {/* High */}
            <td className="py-2.5 px-2.5 text-center font-sans text-emerald-700 font-medium">
#{team.highRank}
            </td>
            {/* Low */}
            <td className="py-2.5 px-2.5 text-center font-sans text-rose-700 font-medium">
#{team.lowRank}
            </td>
            {/* Volatility Range */}
            <td className="py-2.5 px-2.5 text-center font-sans text-slate-500">
±{team.volatility}
            </td>
            {/* Finishes, every completed season */}
                {team.seasons.map(s => {
                    const tagMeta = s.tag ? TAG_CONFIG[s.tag] : null;
                    return (<td key={s.season} className="py-2.5 px-1.5 text-center font-sans">
                        {s.rank !== null ? (<div className="flex flex-col items-center justify-center font-sans">
                        <span className="text-[11px] font-sans px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: (DIVISIONS[s.div] || DIVISIONS[4]).badgeBg, color: (DIVISIONS[s.div] || DIVISIONS[4]).badgeText }}>
                        {s.rank}
                        </span>
                            {tagMeta && (<span className="text-[11px] font-bold px-1 rounded mt-0.5 font-sans" style={{ backgroundColor: tagMeta.bg, color: tagMeta.color }} title={tagMeta.label}>
                            {tagMeta.short}
                            </span>)}
                        </div>) : (<span className="text-slate-300 font-sans">—</span>)}
                    </td>);
                })}
            {/* Total Trophies */}
            <td className="py-2.5 px-3 text-center font-sans font-bold">
                {team.totalTrophies > 0 ? (<span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-sans">
                <span>🏆</span>
                <span>{team.totalTrophies}</span>
                </span>) : (<span className="text-slate-300 font-sans">0</span>)}
            </td>
            {/* Edit button (only when editing is switched on) */}
            {onOpenEditModal && (<td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onOpenEditModal(team)} title="Edit Club Metadata" className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition font-sans">
            <Edit2 className="w-3.5 h-3.5"/>
            </button>
            </td>)}
            </tr>);
        })}
    </tbody>
    </table>
    </div>
    </div>
    </div>);
}
// ------------------------------------------------------------------------------------------------
// EUROPEAN COMPETITION QUALIFICATION DASHBOARD (UCL, UEL, UECL)
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// EUROPEAN QUALIFICATION (Pyramid v6)
// Who qualified for Europe, how, and what happened next. Three views of
// the same qualifications: Positions (stacked dots), Ledger (club x
// season), Europe Tax (next-season table).
// ------------------------------------------------------------------------------------------------

// Winners tab: find each competition's WINNER row by its label (column D),
// and each season's block by the year headers (2 rows up top).
const WINNER_SECTIONS = { fa: 'FA CUP', carabao: 'CARABAO CUP', cs: 'COMMUNITY SHIELD', sc: 'SUPER CUP', ucl: 'CHAMPIONS LEAGUE', uel: 'EUROPA LEAGUE', uecl: 'CONFERENCE LEAGUE' };
function parseWinners(rows) {
    const out = {};
    if (!Array.isArray(rows) || !rows.length) return out;
    const str = (v) => (v == null ? '' : String(v).trim());
    // Season blocks: header cells like "2024 - 25", in order = Season 1, 2, ...
    const headerRow = rows.find((d) => (d.row || []).some((c) => /^\d{4}\s*-\s*\d{2}$/.test(str(c))));
    if (!headerRow) return out;
    const blocks = [];
    headerRow.row.forEach((c, i) => { if (/^\d{4}\s*-\s*\d{2}$/.test(str(c))) blocks.push(i); });
    Object.entries(WINNER_SECTIONS).forEach(([key, label]) => {
        const hi = rows.findIndex((d) => str((d.row || [])[3]).toUpperCase() === label);
        if (hi < 0) return;
        const win = rows.slice(hi + 1, hi + 6).find((d) => str((d.row || [])[3]).toUpperCase() === 'WINNER');
        if (!win) return;
        blocks.forEach((col, k) => {
            const name = str(win.row[col + 2]).replace('✦', '').trim();
            if (!name || name === '0' || /DATA UNAVAILABLE/i.test(name)) return;
            // { name, flag (emoji from the sheet), rank (ESL rank that season, or a league code) }
            (out[k + 1] = out[k + 1] || {})[key] = { name, flag: str(win.row[col]), rank: win.row[col + 1] };
        });
    });
    return out;
}

// Routes into Europe, from the league's rules:
//  1. League: #1-4 UCL, #5-6 UEL, #7 UECL.
//  2. UCL / UEL winners outside the top 4 take UCL places (the lowest
//     league qualifiers slide down).
//  3. FA Cup winner outside the UCL/UEL places takes a UEL place.
//  4. Carabao Cup winner outside all places takes the UECL place.
//  5. UECL winner gets an extra UEL place (displaces no one).
// League qualification beats a cup route; a club with two routes takes
// the higher competition. Winners from outside the Pyramid change nothing.
const EURO_COMPS = ['UCL', 'UEL', 'UECL'];
const EURO_STYLE = {
    UCL: { label: 'Champions League', color: '#2563eb', soft: 'bg-blue-50 text-blue-800 border-blue-200' },
    UEL: { label: 'Europa League', color: '#ea580c', soft: 'bg-orange-50 text-orange-800 border-orange-200' },
    UECL: { label: 'Conference League', color: '#16a34a', soft: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
};
function computeEuropeQuals(teams, winners) {
    const norm = (x) => String(x || '').replace('✦', '').trim().toUpperCase();
    const find = (n) => (n ? teams.find((t) => norm(t.shortName) === norm(n) || norm(t.name) === norm(n)) : null);
    const quals = [];
    const seasonNums = seasonNumsOf(teams);
    seasonNums.forEach((s) => {
        const order = teams.filter((t) => t.seasons[s - 1] && t.seasons[s - 1].rank != null).sort((a, b) => a.seasons[s - 1].rank - b.seasons[s - 1].rank);
        const w = winners[s] || {};
        const nm = (x) => (x && typeof x === 'object' ? x.name : x);
        const W = { fa: find(nm(w.fa)), carabao: find(nm(w.carabao)), ucl: find(nm(w.ucl)), uel: find(nm(w.uel)), uecl: find(nm(w.uecl)) };
        const route = {};
        const top4 = order.slice(0, 4);
        const uclWinners = [W.ucl, W.uel].filter((x) => x && !top4.includes(x));
        const ucl = [...order.filter((t) => !uclWinners.includes(t)).slice(0, 4 - uclWinners.length), ...uclWinners];
        ucl.forEach((t) => { route[t.id] = { comp: 'UCL', via: t === W.ucl && !top4.includes(t) ? 'UCL winner' : t === W.uel && !top4.includes(t) ? 'UEL winner' : 'League' }; });
        let rest = order.filter((t) => !ucl.includes(t));
        const leagueUel = rest.slice(0, 2);
        const faIn = W.fa && !ucl.includes(W.fa) && !leagueUel.includes(W.fa);
        const uel = faIn ? [...rest.filter((t) => t !== W.fa).slice(0, 1), W.fa] : leagueUel;
        uel.forEach((t) => { route[t.id] = { comp: 'UEL', via: faIn && t === W.fa ? 'FA Cup' : 'League' }; });
        rest = rest.filter((t) => !uel.includes(t));
        const carIn = W.carabao && !ucl.includes(W.carabao) && !uel.includes(W.carabao);
        (carIn ? [W.carabao] : rest.slice(0, 1)).forEach((t) => { route[t.id] = { comp: 'UECL', via: carIn ? 'Carabao Cup' : 'League' }; });
        if (W.uecl && !route[W.uecl.id]) route[W.uecl.id] = { comp: 'UEL', via: 'UECL winner' };
        // The sheet's tags are the record; the rules explain the route
        teams.forEach((t) => {
            const ss = t.seasons[s - 1];
            if (!ss || !EURO_COMPS.includes(ss.tag)) return;
            const r = route[t.id];
            const next = t.seasons[s];
            quals.push({
                team: t, season: s, rank: ss.rank, comp: ss.tag,
                via: r && r.comp === ss.tag ? r.via : 'Unexplained',
                nextRank: next && next.rank != null ? next.rank : null,
                change: next && next.rank != null && ss.rank != null ? ss.rank - next.rank : null,
            });
        });
    });
    return quals;
}
const ROUTE_STYLE = {
    'League': { short: 'League', ring: null },
    'UCL winner': { short: 'UCL winner', ring: '#1d4ed8' },
    'UEL winner': { short: 'UEL winner', ring: '#c2410c' },
    'UECL winner': { short: 'UECL winner', ring: '#15803d' },
    'FA Cup': { short: 'FA Cup', ring: '#dc2626', dashed: true },
    'Carabao Cup': { short: 'Carabao Cup', ring: '#65a30d', dashed: true },
    'Unexplained': { short: 'Unexplained', ring: '#94a3b8' },
};

// Rank axis. Division 1 gets 70% of the line on a smooth curve (a softened
// log scale): every place gets a little less room than the one above it, so
// ranks 1-5 get the most room and 1-10 more than 11-20, with no sudden
// jumps. Each lower division gets a straight 10%. Rank 1 sits slightly in
// from the edge.
const EURO_DIV1_SHARE = 0.70;
const EURO_LOWER_SHARE = 0.10; // per lower division
// v24: d1 = Division 1's share of the line (phones pass a smaller share so the lower divisions come into view)
function euroAxisPos(rank, d1 = EURO_DIV1_SHARE) {
    const lo = EURO_LOWER_SHARE * ((1 - d1) / Math.max(0.0001, 1 - EURO_DIV1_SHARE));
    const div = divOfRank(rank) || 1;
    if (div === 1) {
        const [, end] = divRange(1);
        // log(rank + 2): gentler than a pure log, so rank 1 to 2 isn't a huge gap
        return 0.02 + (d1 - 0.04) * ((Math.log(rank + 2) - Math.log(3)) / (Math.log(end + 2) - Math.log(3)));
    }
    const [a, b] = divRange(div);
    const zoneStart = d1 + (div - 2) * lo;
    return zoneStart + lo * ((rank - a + 0.5) / (b - a + 1));
}
function euroZone(div, d1 = EURO_DIV1_SHARE) {
    // [start, end] of a division's share of the line
    const lo = EURO_LOWER_SHARE * ((1 - d1) / Math.max(0.0001, 1 - EURO_DIV1_SHARE));
    if (div === 1) return [0, d1];
    const start = d1 + (div - 2) * lo;
    return [start, start + lo];
}

function EuropeanQualification({ teams, winners, onSelectTeam }) {
    const [view, setView] = useState('positions');
    const [season, setSeason] = useState('all');
    const [hover, setHover] = useState(null); // { q, x, y }
    const seasonNums = seasonNumsOf(teams);
    const allQuals = useMemo(() => computeEuropeQuals(teams, winners), [teams, winners]);
    const quals = season === 'all' ? allQuals : allQuals.filter((q) => String(q.season) === String(season));
    const clubsCount = new Set(allQuals.map((q) => q.team.id)).size;
    const cupRoutes = allQuals.filter((q) => q.via !== 'League').length;
    const outsideDiv1 = allQuals.filter((q) => q.team.seasons[q.season - 1].div > 1).length;
    const outsideDiv1ViaCup = allQuals.filter((q) => q.team.seasons[q.season - 1].div > 1 && q.via !== 'League').length;

    return (<div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 font-sans">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
    <div className="flex items-center space-x-2">
    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><Globe className="w-5 h-5"/></div>
    <div>
    <h3 className="text-lg font-extrabold text-slate-900">European Qualification</h3>
    <p className="text-xs text-slate-600 mt-0.5">Who qualified for Europe, how they got there, and what happened next.</p>
    </div>
    </div>
    <Segmented className="self-start lg:self-auto" value={view} onChange={(v) => { setView(v); setHover(null); }} options={[
        { value: 'positions', label: 'Positions' },
        { value: 'ledger', label: 'Ledger' },
        { value: 'tax', label: 'Europe Tax' },
    ]}/>
    </div>

    <HighlightsBar accent="teal" columns={4}>
    <HighlightCard label="Qualifications" icon={Globe} iconClassName="text-teal-300" value={allQuals.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${seasonNums.length} seasons`} right=""/>
    <HighlightCard label="Clubs" icon={Users} iconClassName="text-sky-300" value={clubsCount} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left="Have ever qualified" right=""/>
    <HighlightCard label="Via a cup" icon={Trophy} iconClassName="text-amber-300" value={cupRoutes} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left="Not by league position" right=""/>
    <HighlightCard label="From outside Div 1" icon={TrendingUp} iconClassName="text-emerald-300" value={outsideDiv1} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={`${outsideDiv1ViaCup} via a cup route`} right=""/>
    </HighlightsBar>

    {view !== 'ledger' && (<div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Calendar}>Season</ControlLabel>
    <FilterPills accent="teal" value={season} onChange={(v) => { setSeason(v); setHover(null); }} options={[
        { value: 'all', label: 'All Seasons', badge: allQuals.length },
        ...seasonNums.map((s) => ({ value: String(s), label: `S${s}`, badge: allQuals.filter((q) => q.season === s).length })),
    ]}/>
    </div>)}

    {view === 'positions' && <EuroPositions quals={quals} hover={hover} setHover={setHover} onSelectTeam={onSelectTeam}/>}
    {view === 'ledger' && <EuroLedger quals={allQuals} seasonNums={seasonNums} onSelectTeam={onSelectTeam}/>}
    {view === 'tax' && <EuroTax quals={quals} onSelectTeam={onSelectTeam}/>}
    </div>);
}

// Positions: one row per competition; each qualification is a dot at the
// club's finishing rank, stacked upward when several share a rank.
function EuroPositions({ quals, hover, setHover, onSelectTeam }) {
    const ref = useRef(null);
    // v24.1 touch: a tap shows the card first (docked, with Open profile); mouse click still opens the profile directly
    const lastTouch = useRef(false);
    // v30: closes on a finished tap elsewhere (iPhone sends no click for blank space), a scroll or another overlay
    useTouchCard(!!(hover && hover.touch), () => setHover(null), { keep: '[data-euro-dot], [data-euro-card]' });
    const [w, setW] = useState(900);
    useEffect(() => {
        const m = () => { if (ref.current && ref.current.clientWidth) setW(ref.current.clientWidth); };
        m();
        if (typeof window === 'undefined') return undefined;
        window.addEventListener('resize', m);
        return () => window.removeEventListener('resize', m);
    }, []);
    // v24 phones: narrower label column, no 300px floor, Division 1 takes about half the line
    const phone = useScreen() === 'phone';
    const d1 = phone ? 0.5 : EURO_DIV1_SHARE;
    const left = phone ? 46 : 70, right = phone ? 6 : 16, dot = phone ? 10 : 12, gap = phone ? 2 : 2.5;
    const plotW = Math.max(phone ? 160 : 300, w - left - right);
    const xOf = (rank) => left + euroAxisPos(rank, d1) * plotW;
    const rows = EURO_COMPS.map((c) => {
        const list = quals.filter((q) => q.comp === c).sort((a, b) => a.rank - b.rank || a.season - b.season);
        const stacks = {};
        list.forEach((q) => { (stacks[q.rank] = stacks[q.rank] || []).push(q); });
        const maxStack = Math.max(1, ...Object.values(stacks).map((s) => s.length));
        return { comp: c, stacks, maxStack, n: list.length };
    });
    const rowH = (r) => Math.max(44, r.maxStack * (dot + gap) + 22);
    const axisY = 20;
    let y = axisY + 14;
    const layout = rows.map((r) => { const top = y; y += rowH(r) + 10; return { ...r, top, h: rowH(r) }; });
    const H = y + 6;
    // Div 1: most places labelled; lower divisions: first place of each, plus the last club
    const ticks = Array.from(new Set([...(phone ? [1, 4, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20]), ...DIV_STARTS.slice(1), TOTAL_CLUBS])).filter((r) => r <= TOTAL_CLUBS);
    const zoneX = (d) => euroZone(d, d1).map((f) => left + f * plotW);
    const divIds = DIV_STARTS.map((_, i) => i + 1);
    return (<div className="space-y-3">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
    <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-400"/>League place</span>
    {['UCL winner', 'UEL winner', 'UECL winner', 'FA Cup', 'Carabao Cup'].map((k) => (<span key={k} className="inline-flex items-center gap-1.5">
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full" style={{ border: `1.8px ${ROUTE_STYLE[k].dashed ? 'dashed' : 'solid'} ${ROUTE_STYLE[k].ring}` }}>
        <span className="w-2.5 h-2.5 rounded-full bg-slate-400"/>
        </span>{k}
        </span>))}
    </div>
    <div ref={ref} className="relative w-full">
    <svg width={w} height={H} className="block font-sans">
    {/* Each division shaded (very lightly) in its own colour */}
    {divIds.map((d) => {
        const [x0, x1] = zoneX(d);
        const st = DIVISIONS[d] || DIVISIONS[4];
        return (<g key={`zone-${d}`}>
        <rect x={x0 + 1} y={axisY - 12} width={x1 - x0 - 2} height={H - axisY + 8} rx="8" fill={st.color} fillOpacity="0.06"/>
        <text x={x0 + 10} y={axisY - 1} className="text-[11px] font-bold" fill={st.badgeText}>{d === 1 ? 'DIVISION 1' : `DIV ${d}`}</text>
        </g>);
    })}
    {/* Ticks */}
    {ticks.map((r) => (<g key={`t-${r}`}>
        <line x1={xOf(r)} y1={axisY + 8} x2={xOf(r)} y2={H - 4} stroke="#e8edf3"/>
        <text x={xOf(r)} y={H + 12} textAnchor="middle" className="text-[11px] font-semibold" fill="#64748b">{r}</text>
        </g>))}
    {/* Rows */}
    {layout.map((row) => {
        const st = EURO_STYLE[row.comp];
        const base = row.top + row.h - 8;
        return (<g key={row.comp}>
        <text x={8} y={base - 2} className="text-[12px] font-extrabold" fill={st.color}>{row.comp}</text>
        <text x={8} y={base + 10} className="text-[11px] font-semibold" fill="#94a3b8">{row.n}</text>
        <line x1={left - 6} y1={base + 6} x2={left + plotW} y2={base + 6} stroke="#e2e8f0"/>
        {Object.entries(row.stacks).map(([rank, list]) => list.map((q, i) => {
            const cx = xOf(Number(rank));
            const cy = base - i * (dot + gap);
            const ring = ROUTE_STYLE[q.via] ? ROUTE_STYLE[q.via].ring : null;
            const isHover = hover && hover.q === q;
            return (<g key={`${q.team.id}-${q.season}`} data-euro-dot="" className="cursor-pointer" onPointerDown={(e) => { lastTouch.current = e.pointerType !== 'mouse'; }} onMouseEnter={() => { if (!lastTouch.current) setHover({ q, x: cx, y: cy }); }} onMouseLeave={() => { if (!lastTouch.current) setHover(null); }} onClick={() => (lastTouch.current ? setHover({ q, x: cx, y: cy, touch: true }) : onSelectTeam(q.team))}>
            {ring && <circle cx={cx} cy={cy} r={dot / 2 + 2.4} fill="#ffffff" stroke={ring} strokeWidth="1.8" strokeDasharray={ROUTE_STYLE[q.via].dashed ? '2.2 1.8' : undefined}/>}
            <circle cx={cx} cy={cy} r={isHover ? dot / 2 + 1 : dot / 2 - (ring ? 0.5 : 0)} fill={q.team.hex} stroke={isHover ? '#0f172a' : 'rgba(15,23,42,0.25)'} strokeWidth={isHover ? 1.5 : 0.6}/>
            </g>);
        }))}
        </g>);
    })}
    </svg>
    {hover && (() => {
        const q = hover.q;
        const cardW = 236;
        const leftPos = Math.min(w - cardW - 4, Math.max(0, hover.x > w * 0.6 ? hover.x - cardW - 14 : hover.x + 14));
        return (<div data-euro-card="" className={`${hover.touch ? 'fixed z-[70] left-3 right-3 bottom-3 mx-auto max-w-sm' : 'absolute z-20 pointer-events-none'} bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-3 text-xs`} style={hover.touch ? undefined : { left: leftPos, top: Math.max(0, hover.y - 60), width: cardW }}>
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5 mb-2 min-w-0">
        <SvgFlag code={q.team.countryCode} width={18} height={13}/>
        <span className="font-extrabold text-slate-900 truncate flex-1 min-w-0">{q.team.name}</span>
        <span className="text-[11px] font-bold px-1.5 rounded border" style={{ color: EURO_STYLE[q.comp].color, borderColor: EURO_STYLE[q.comp].color }}>{q.comp}</span>
        </div>
        <div className="space-y-1.5 bg-slate-50 rounded-lg p-2 border border-slate-100">
        <div className="flex justify-between"><span className="text-slate-600 font-medium">Season {q.season} finish</span><span className="font-black">{q.rank} <span className="font-semibold text-slate-500">({(DIVISIONS[q.team.seasons[q.season - 1].div] || {}).shortName})</span></span></div>
        <div className="flex justify-between"><span className="text-slate-600 font-medium">Route</span><span className="font-black">{q.via}</span></div>
        <div className="flex justify-between"><span className="text-slate-600 font-medium">Next season</span><span className="font-black">{q.nextRank != null ? `${q.nextRank} (${q.change > 0 ? '▲' + q.change : q.change < 0 ? '▼' + Math.abs(q.change) : 'same'})` : 'Not played yet'}</span></div>
        </div>
        {hover.touch && (<button type="button" onClick={() => { const t = q.team; setHover(null); onSelectTeam(t); }} className="mt-2 w-full h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-[13px] font-bold text-slate-900">Open profile ›</button>)}
        </div>);
    })()}
    </div>
    </div>);
}

// Ledger: every club that has qualified, by season.
function EuroLedger({ quals, seasonNums, onSelectTeam }) {
    const clubs = useMemo(() => {
        const by = {};
        quals.forEach((q) => { (by[q.team.id] = by[q.team.id] || { team: q.team, list: [] }).list.push(q); });
        return Object.values(by).sort((a, b) => b.list.length - a.list.length || a.team.curRank - b.team.curRank);
    }, [quals]);
    return (<div className="overflow-x-auto">
    <table className="w-full text-xs">
    <thead>
    <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60">
    <th className="py-2 px-3 text-left">Club</th>
    {seasonNums.map((s) => <th key={s} className="py-2 px-1.5 text-center">S{s}</th>)}
    <th className="py-2 px-3 text-center">Total</th>
    <th className="py-2 px-3 text-center whitespace-nowrap">UCL • UEL • UECL</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
        {clubs.map((c) => (<tr key={c.team.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelectTeam(c.team)}>
        <td className="py-1.5 px-3">
        <span className="inline-flex items-center gap-2 font-bold text-slate-900 whitespace-nowrap">
        <SvgFlag code={c.team.countryCode} width={18} height={13}/>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.team.hex }}/>
        {c.team.name}
        </span>
        </td>
        {seasonNums.map((s) => {
            const q = c.list.find((x) => x.season === s);
            if (!q) return <td key={s} className="py-1.5 px-1.5 text-center text-slate-300">·</td>;
            const st = EURO_STYLE[q.comp];
            const cup = q.via !== 'League';
            return (<td key={s} className="py-1 px-1 text-center">
            <span className={`inline-block px-1.5 py-0.5 rounded border text-[11px] font-extrabold ${st.soft}`} style={cup ? { outline: `1.5px ${ROUTE_STYLE[q.via].dashed ? 'dashed' : 'solid'} ${ROUTE_STYLE[q.via].ring}`, outlineOffset: '1px' } : undefined} title={`S${s}: ${q.comp}, finished ${q.rank}, via ${q.via}`}>
            {q.comp}
            </span>
            </td>);
        })}
        <td className="py-1.5 px-3 text-center font-black text-slate-900">{c.list.length}</td>
        <td className="py-1.5 px-3 text-center font-semibold text-slate-600 tabular-nums whitespace-nowrap">
        {EURO_COMPS.map((k) => c.list.filter((q) => q.comp === k).length).join(' • ')}
        </td>
        </tr>))}
    </tbody>
    </table>
    <p className="text-[11px] text-slate-500 mt-2">Ringed badges got in through a cup (hover for the route).</p>
    </div>);
}

// Europe Tax: each qualification's league finish vs the next season (when
// the club played in Europe). "How far they got" arrives with future data.
function EuroTax({ quals, onSelectTeam }) {
    const [sortBy, setSortBy] = useState('season');
    const [comp, setComp] = useState('all');
    const withNext = quals.filter((q) => q.nextRank != null && (comp === 'all' || q.comp === comp));
    const sorted = [...withNext].sort((a, b) =>
        sortBy === 'change' ? a.change - b.change
            : sortBy === 'rank' ? a.rank - b.rank || a.season - b.season
                : a.season - b.season || a.rank - b.rank);
    const summary = EURO_COMPS.map((c) => {
        const list = quals.filter((q) => q.comp === c && q.nextRank != null);
        const up = list.filter((q) => q.change > 0).length, same = list.filter((q) => q.change === 0).length, down = list.filter((q) => q.change < 0).length;
        const avgQ = list.length ? list.reduce((a, q) => a + q.rank, 0) / list.length : 0;
        const avgN = list.length ? list.reduce((a, q) => a + q.nextRank, 0) / list.length : 0;
        return { comp: c, n: list.length, up, same, down, avgQ, avgN };
    });
    const unplayed = quals.filter((q) => q.nextRank == null).length;
    return (<div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {summary.map((s) => (<div key={s.comp} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
        <div className="flex items-center justify-between text-xs">
        <span className="font-extrabold" style={{ color: EURO_STYLE[s.comp].color }}>{EURO_STYLE[s.comp].label}</span>
        <span className="font-semibold text-slate-500">{s.n} with a next season</span>
        </div>
        <div className="h-5 flex rounded-md overflow-hidden bg-slate-200 text-[11px] font-black">
            {s.up > 0 && <div className="bg-emerald-500 text-white flex items-center justify-center" style={{ width: `${(s.up / s.n) * 100}%` }} title={`${s.up} finished higher next season`}>{s.up}</div>}
            {s.same > 0 && <div className="bg-slate-400 text-white flex items-center justify-center" style={{ width: `${(s.same / s.n) * 100}%` }} title={`${s.same} finished the same`}>{s.same}</div>}
            {s.down > 0 && <div className="bg-rose-500 text-white flex items-center justify-center" style={{ width: `${(s.down / s.n) * 100}%` }} title={`${s.down} finished lower next season`}>{s.down}</div>}
        </div>
        <div className="flex justify-between text-[11px] text-slate-600">
        <span>Avg finish {s.n ? s.avgQ.toFixed(2) : '–'} → {s.n ? s.avgN.toFixed(2) : '–'}</span>
        <span className={`font-bold ${s.avgQ - s.avgN >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{s.n ? `${s.avgQ - s.avgN >= 0 ? '+' : ''}${(s.avgQ - s.avgN).toFixed(2)}` : ''}</span>
        </div>
        </div>))}
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
    <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-500"/>Finished higher next season</span>
    <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-slate-400"/>Same</span>
    <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-rose-500"/>Lower</span>
    </div>
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="space-y-1.5 flex flex-col items-start sm:block">
    <ControlLabel accent="teal" icon={Globe}>Competition</ControlLabel>
    <Segmented value={comp} onChange={setComp} options={[{ value: 'all', label: 'All' }, ...EURO_COMPS.map((c) => ({ value: c, label: c }))]}/>
    </div>
    <div className="space-y-1.5 flex flex-col items-start sm:block">
    <ControlLabel accent="teal" icon={BarChart2}>Sort</ControlLabel>
    <Segmented value={sortBy} onChange={setSortBy} options={[{ value: 'season', label: 'Season' }, { value: 'rank', label: 'Qualifying finish' }, { value: 'change', label: 'Biggest drop' }]}/>
    </div>
    </div>
    <div className="overflow-x-auto">
    <table className="w-full text-xs">
    <thead>
    <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60">
    <th className="py-2 px-3 text-left">Club</th>
    <th className="py-2 px-2 text-center">Season</th>
    <th className="py-2 px-2 text-center">Finish</th>
    <th className="py-2 px-2 text-left">Route</th>
    <th className="py-2 px-2 text-center">Comp</th>
    <th className="py-2 px-2 text-center whitespace-nowrap">Next season</th>
    <th className="py-2 px-2 text-center">Change</th>
    <th className="py-2 px-3 text-center whitespace-nowrap text-slate-400" title="Coming when the sheet records European runs">How far they got</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
        {sorted.map((q) => (<tr key={`${q.team.id}-${q.season}`} className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelectTeam(q.team)}>
        <td className="py-1.5 px-3"><span className="inline-flex items-center gap-2 font-bold text-slate-900 whitespace-nowrap"><SvgFlag code={q.team.countryCode} width={18} height={13}/>{q.team.name}</span></td>
        <td className="py-1.5 px-2 text-center font-semibold text-slate-600">S{q.season}</td>
        <td className="py-1.5 px-2 text-center font-black text-slate-900">{q.rank}</td>
        <td className="py-1.5 px-2 text-left font-semibold whitespace-nowrap" style={{ color: q.via === 'League' ? '#475569' : ROUTE_STYLE[q.via].ring }}>{q.via}</td>
        <td className="py-1.5 px-2 text-center"><span className={`px-1.5 py-0.5 rounded border text-[11px] font-extrabold ${EURO_STYLE[q.comp].soft}`}>{q.comp}</span></td>
        <td className="py-1.5 px-2 text-center font-black text-slate-900">{q.nextRank}</td>
        <td className={`py-1.5 px-2 text-center font-black ${q.change > 0 ? 'text-emerald-700' : q.change < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{q.change > 0 ? `▲ ${q.change}` : q.change < 0 ? `▼ ${Math.abs(q.change)}` : '–'}</td>
        <td className="py-1.5 px-3 text-center text-slate-300">–</td>
        </tr>))}
    </tbody>
    </table>
    </div>
    {unplayed > 0 && <p className="text-[11px] text-slate-500">{unplayed} qualification{unplayed === 1 ? '' : 's'} from the latest season aren't in the table yet: their European season hasn't been played.</p>}
    </div>);
}

// ------------------------------------------------------------------------------------------------
// MOVEMENT (Pyramid v16): how clubs move between seasons. Two views of the
// same season-to-season moves: Where you land (zone grid) and Staying power
// (lifelines: how long each promotion lasted / how long each relegation
// took to undo).
// ------------------------------------------------------------------------------------------------
// Zones are finishing PLACES (not outcomes), 5 per division, from the league
// rules: top places, play-offs (Divs 2-4), rest of the top half, bottom half,
// drop zone. Div 4 has no drop zone, so its bottom half is split in two.
const PLAYOFF_PLACES = 4; // play-off places after the automatic promotion places
function movementZones() {
    const zones = [];
    DIV_STARTS.forEach((_, i) => {
        const d = i + 1;
        const [a, b] = divRange(d);
        const size = b - a + 1;
        const up = AUTO_PROMOTION_PLACES[d] || 0;
        const down = RELEGATION_PLACES[d] || 0;
        const half = a + Math.floor(size / 2) - 1; // last place of the top half
        let cur = a;
        const push = (to, label, short) => { if (to >= cur) { zones.push({ div: d, from: cur, to, label, short }); cur = to + 1; } };
        if (d === 1) { push(a, 'Champion', 'Champion'); push(a + 3, 'Top 4', 'Top 4'); }
        else { push(a + up - 1, 'Automatic promotion', 'Auto'); push(a + up + PLAYOFF_PLACES - 1, 'Play-off places', 'Play-offs'); }
        push(half, 'Top half', 'Top half');
        if (down) { push(b - down, 'Bottom half', 'Bottom half'); push(b, 'Drop zone', 'Drop zone'); }
        else { const mid = cur + Math.floor((b - cur + 1) / 2) - 1; push(mid, 'Lower half', 'Lower half'); push(b, `Bottom ${b - mid}`, `Bottom ${b - mid}`); }
    });
    return zones;
}
const zoneRange = (z) => (z.from === z.to ? `${z.from}` : `${z.from}–${z.to}`);
function hexToRgba(hex, a) {
    const h = String(hex || '#64748b').replace('#', '');
    return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`;
}

function MovementDashboard({ teams, onSelectTeam }) {
    const [view, setView] = useState('land');
    const [cell, setCell] = useState(null); // { from, to } zone indexes
    const [after, setAfter] = useState('promotion');
    const zones = useMemo(() => movementZones(), [teams]);
    const zoneOf = (rank) => zones.findIndex(z => rank >= z.from && rank <= z.to);
    const divIds = DIV_STARTS.map((_, i) => i + 1);
    const moves = useMemo(() => {
        const out = [];
        teams.forEach(t => {
            for (let i = 0; i < t.seasons.length - 1; i++) {
                const a = t.seasons[i], b = t.seasons[i + 1];
                if (a.rank != null && b.rank != null) out.push({ team: t, season: a.season, from: a.rank, to: b.rank, div: a.div, toDiv: b.div, fz: zoneOf(a.rank), tz: zoneOf(b.rank) });
            }
        });
        return out;
    }, [teams, zones]);
    const bounce = useMemo(() => {
        let rr = 0, rf = 0, fr = 0, ff = 0;
        teams.forEach(t => {
            const s = t.seasons;
            for (let i = 1; i < s.length - 1; i++) {
                if (s[i - 1].rank == null || s[i].rank == null || s[i + 1].rank == null) continue;
                const c1 = s[i - 1].rank - s[i].rank, c2 = s[i].rank - s[i + 1].rank;
                if (c1 > 0 && c2 > 0) rr++; else if (c1 > 0 && c2 < 0) rf++; else if (c1 < 0 && c2 > 0) fr++; else if (c1 < 0 && c2 < 0) ff++;
            }
        });
        return { roseFellBack: rf / Math.max(1, rr + rf), fellBouncedBack: fr / Math.max(1, fr + ff), rose: rr + rf, fell: fr + ff };
    }, [teams]);
    const stability = divIds.map(d => {
        const list = moves.filter(m => m.div === d);
        return { div: d, n: list.length, within2: list.filter(m => Math.abs(m.from - m.to) <= 2).length / Math.max(1, list.length), avg: list.reduce((s, m) => s + Math.abs(m.from - m.to), 0) / Math.max(1, list.length) };
    });
    const most = [...stability].sort((a, b) => b.within2 - a.within2)[0];
    const least = [...stability].sort((a, b) => a.within2 - b.within2)[0];
    const grid = zones.map((_, fi) => zones.map((__, ti) => moves.filter(m => m.fz === fi && m.tz === ti).length));
    const rowTotals = grid.map(r => r.reduce((a, b) => a + b, 0));
    const cellMoves = cell ? moves.filter(m => m.fz === cell.from && m.tz === cell.to).sort((a, b) => a.season - b.season || a.from - b.from) : [];
    const divColor = (d) => (DIVISIONS[d] || DIVISIONS[4]).color;
    const firstOfDiv = (i) => i === 0 || zones[i - 1].div !== zones[i].div;
    // Layout: the club list sits beside the grid only when the whole grid
    // (all 20 columns) still fits; then it's exactly as tall as the grid.
    // Otherwise it goes underneath. Measured, not guessed from screen size.
    // Squares grow to fill the room left after the labels (and the list, if
    // it fits beside the grid): between CELL_MIN and CELL_MAX pixels wide.
    const wrapRef = useRef(null);
    const tableRef = useRef(null);
    const labelRef = useRef(null);
    const [side, setSide] = useState(false);
    const [gridH, setGridH] = useState(0);
    const [cellW, setCellW] = useState(40);
    const LIST_W = 300, GAP = 20, CELL_MIN = 40, CELL_MAX = 76, DIV_GAPS = 8 * 3, CELL_PAD = 3;
    useEffect(() => {
        const measure = () => {
            const wrap = wrapRef.current;
            if (!wrap) return;
            const labels = labelRef.current ? labelRef.current.offsetWidth : 230;
            const fixed = labels + DIV_GAPS + zones.length * CELL_PAD + 4;
            let cw = Math.floor((wrap.clientWidth - LIST_W - GAP - fixed) / zones.length);
            const fitsBeside = cw >= CELL_MIN;
            if (!fitsBeside) cw = Math.floor((wrap.clientWidth - fixed) / zones.length);
            setSide(fitsBeside);
            setCellW(Math.max(CELL_MIN, Math.min(CELL_MAX, cw)));
        };
        measure();
        if (typeof window === 'undefined') return undefined;
        window.addEventListener('resize', measure);
        let ro = null;
        if (typeof ResizeObserver !== 'undefined' && wrapRef.current) { ro = new ResizeObserver(measure); ro.observe(wrapRef.current); }
        return () => { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
    }, [view, zones.length]);
    // The list matches the grid's height (measured after the squares resize)
    useEffect(() => { if (tableRef.current) setGridH(tableRef.current.offsetHeight); }, [cellW, side, view]);
    const cellH = Math.max(28, Math.min(40, Math.round(cellW * 0.6)));
    const cellFont = cellW >= 60 ? 12 : 11; // v28: 11px floor (was 10px in narrow cells)
    return (<div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 font-sans">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
    <div className="flex items-center space-x-2">
    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><Activity className="w-5 h-5"/></div>
    <div>
    <h3 className="text-lg font-extrabold text-slate-900">Movement</h3>
    <p className="text-xs text-slate-600 mt-0.5">How clubs move from one season to the next, across {moves.length} season-to-season moves.</p>
    </div>
    </div>
    <Segmented className="self-start lg:self-auto" value={view} onChange={(v) => { setView(v); setCell(null); }} options={[{ value: 'land', label: 'Where you land' }, { value: 'stay', label: 'Staying power' }]}/>
    </div>
    <HighlightsBar accent="teal" columns={4}>
    <HighlightCard label="Most stable" icon={Shield} iconClassName="text-teal-300" value={`Div ${most.div}`} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${Math.round(most.within2 * 100)}% within 2 places`} right=""/>
    <HighlightCard label="Most fluid" icon={Activity} iconClassName="text-amber-300" value={`Div ${least.div}`} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={`${Math.round(least.within2 * 100)}% within 2 places`} right=""/>
    <HighlightCard label="Rose, then fell back" icon={TrendingDown} iconClassName="text-rose-300" value={`${Math.round(bounce.roseFellBack * 100)}%`} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left={`of ${bounce.rose} rises`} right=""/>
    <HighlightCard label="Fell, then bounced back" icon={TrendingUp} iconClassName="text-emerald-300" value={`${Math.round(bounce.fellBouncedBack * 100)}%`} valueClassName="text-2xl sm:text-3xl font-black text-emerald-200" left={`of ${bounce.fell} falls`} right=""/>
    </HighlightsBar>

    {view === 'land' ? (<div className="space-y-5">
    <div ref={wrapRef} className={`flex gap-5 ${side ? 'flex-row items-start' : 'flex-col'}`}>
    <div className="overflow-x-auto min-w-0">
    <table ref={tableRef} className="border-separate text-[11px]" style={{ borderSpacing: 0 }}>
    <thead>
    {/* Division bands across the top */}
    <tr>
    <th ref={labelRef} rowSpan={2} className="text-left align-bottom pr-2 sm:pr-3 pb-1.5 sticky left-0 z-10 bg-white sm:static sm:bg-transparent">
    <div className="text-[11px] font-semibold text-slate-400 leading-tight">Finished ↓</div>
    <div className="text-[11px] font-semibold text-slate-400 leading-tight">Next season →</div>
    </th>
        {divIds.map(d => { const span = zones.filter(z => z.div === d).length; return (<th key={d} colSpan={span} className="px-1 pb-1">
        <div className="text-[11px] font-extrabold text-left px-1" style={{ color: (DIVISIONS[d] || DIVISIONS[4]).badgeText }}>Div {d}</div>
        <div className="h-1 rounded-full mt-0.5" style={{ backgroundColor: divColor(d) }}/>
        </th>); })}
    </tr>
    <tr>
        {zones.map((z, i) => (<th key={i} title={`${z.label}: places ${zoneRange(z)}`} className={`pb-1.5 font-bold text-slate-500 tabular-nums whitespace-nowrap ${firstOfDiv(i) && i > 0 ? 'pl-2' : ''}`} style={{ fontSize: Math.max(11, cellFont - 0.5) }}>{zoneRange(z)}</th>))}
    </tr>
    </thead>
    <tbody>
        {zones.map((z, fi) => (<tr key={fi}>
        {/* Phones (v24): band names hidden; colour, range and count pinned to the left while the grid scrolls */}
        <td className={`pr-2 sm:pr-3 whitespace-nowrap sticky left-0 z-10 bg-white sm:static sm:bg-transparent ${firstOfDiv(fi) && fi > 0 ? 'pt-2' : ''}`}>
        <span className="inline-flex items-center gap-1.5 sm:gap-2">
        <span className="w-1 h-6 rounded-full" style={{ backgroundColor: divColor(z.div) }}/>
        <span className="w-10 sm:w-12 text-right font-extrabold text-slate-900 tabular-nums">{zoneRange(z)}</span>
        <span className="hidden sm:inline-block w-20 font-semibold text-slate-500 truncate">{z.short}</span>
        <span className="w-6 sm:w-8 text-[11px] text-slate-400 tabular-nums">{rowTotals[fi]}</span>
        </span>
        </td>
            {zones.map((tz, ti) => {
                const n = grid[fi][ti];
                const pct = rowTotals[fi] ? n / rowTotals[fi] : 0;
                const active = cell && cell.from === fi && cell.to === ti;
                return (<td key={ti} className={`p-[1.5px] ${firstOfDiv(ti) && ti > 0 ? 'pl-2' : ''} ${firstOfDiv(fi) && fi > 0 ? 'pt-2' : ''}`}>
                <button type="button" disabled={!n} onClick={() => setCell(active ? null : { from: fi, to: ti })} title={`${zoneRange(z)} ${z.label} → ${zoneRange(tz)} ${tz.label} (Div ${tz.div}): ${n} of ${rowTotals[fi]}`}
                    className={`rounded-md font-black tabular-nums transition ${n ? 'cursor-pointer hover:scale-105' : 'cursor-default'} ${active ? 'ring-2 ring-slate-900 ring-offset-1' : fi === ti ? 'ring-1 ring-slate-300' : ''}`}
                    style={{ width: cellW, height: cellH, fontSize: cellFont, backgroundColor: n ? hexToRgba(divColor(tz.div), 0.12 + pct * 0.88) : '#f8fafc', color: pct >= 0.4 ? '#ffffff' : '#0f172a' }}>
                {n ? `${Math.round(pct * 100)}%` : ''}
                </button>
                </td>);
            })}
        </tr>))}
    </tbody>
    </table>
    </div>
    {/* Clubs behind the chosen square */}
    <div className={`${side ? '' : 'w-full'} shrink-0 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 flex flex-col gap-2`} style={side ? { width: LIST_W, height: gridH || undefined } : undefined}>
    {cell ? (<>
    <div className="text-xs font-extrabold text-slate-900">
    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: divColor(zones[cell.from].div) }}/>{zoneRange(zones[cell.from])} {zones[cell.from].label}</div>
    <div className="flex items-center gap-1.5 mt-0.5"><span className="text-slate-400">→</span><span className="w-2 h-2 rounded-full" style={{ backgroundColor: divColor(zones[cell.to].div) }}/>{zoneRange(zones[cell.to])} {zones[cell.to].label}</div>
    <div className="text-[11px] font-semibold text-slate-500 mt-1">{cellMoves.length} of {rowTotals[cell.from]} ({Math.round((cellMoves.length / Math.max(1, rowTotals[cell.from])) * 100)}%)</div>
    </div>
    <div className={`overflow-y-auto space-y-1 ${side ? 'flex-1 min-h-0' : 'max-h-[420px]'}`}>
        {cellMoves.map((m, i) => (<button key={i} type="button" onClick={() => onSelectTeam(m.team)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-[11px] text-left">
        <SvgFlag code={m.team.countryCode} width={16} height={11}/>
        <span className="font-bold text-slate-800 truncate flex-1">{m.team.shortName}</span>
        <span className="font-semibold text-slate-400 tabular-nums shrink-0">S{m.season}: {m.from} → {m.to}</span>
        {m.toDiv < m.div && <span className="text-[11px] font-black text-emerald-700 shrink-0" title="Promoted">▲</span>}
        {m.toDiv > m.div && <span className="text-[11px] font-black text-rose-700 shrink-0" title="Relegated">▼</span>}
        </button>))}
    </div>
    </>) : (<div className="text-[11px] text-slate-500 leading-relaxed">
    <div className="text-xs font-extrabold text-slate-900 mb-1">Reading the grid</div>
    Rows: where clubs finished. Columns: where they finished the next season. Each row adds up to 100%. Colour shows the division they ended up in; stronger colour, more clubs. Outlined squares: same zone again.
    <div className="mt-2 font-semibold text-slate-600">Click a square to list the clubs.</div>
    </div>)}
    </div>
    </div>
    {/* Stability by division */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stability.map(s => (<div key={s.div} className="p-3 rounded-xl border border-slate-200" style={{ borderTop: `3px solid ${divColor(s.div)}` }}>
        <div className="flex justify-between text-xs"><span className="font-extrabold" style={{ color: (DIVISIONS[s.div] || DIVISIONS[4]).badgeText }}>Div {s.div}</span><span className="font-black text-slate-900 tabular-nums">{Math.round(s.within2 * 100)}%</span></div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden mt-1.5"><div className="h-full rounded-full" style={{ width: `${s.within2 * 100}%`, backgroundColor: divColor(s.div) }}/></div>
        <div className="text-[11px] text-slate-500 mt-1.5">finished within 2 places of the season before · average move {s.avg.toFixed(1)}</div>
        </div>))}
    </div>
    </div>) : (<StayingPower teams={teams} after={after} setAfter={setAfter} onSelectTeam={onSelectTeam}/>)}
    </div>);
}

// Staying power as lifelines: one bar per promotion (or relegation), from
// the season a club arrived until it left. Each season is a segment in the
// colour of the division the club was in, showing its finish; the end marker
// says how it finished (relegated, promoted again, back up, still there).
function StayingPower({ teams, after, setAfter, onSelectTeam }) {
    const [hover, setHover] = useState(null); // { run, x, y }
    // v24 phones: 3-letter codes, season numbers without the S, short outcomes ("3 ▼"), solid header
    const phone = useScreen() === 'phone';
    const GRID = 'grid grid-cols-[52px_1fr_40px] gap-2 sm:grid-cols-[150px_1fr_110px] sm:gap-3';
    const boxRef = useRef(null);
    // v26 touch: a tap shows the card first (docked, with Open profile); a mouse click still opens the profile
    const lastTouch = useRef(false);
    // v30: closes on a finished tap elsewhere, a scroll or another overlay (ui.js useTouchCard)
    useTouchCard(!!(hover && hover.touch), () => setHover(null), { keep: '[data-sp-row], [data-sp-card]' });
    const seasonNums = seasonNumsOf(teams);
    const lastSeason = seasonNums[seasonNums.length - 1] || 1;
    const promotion = after === 'promotion';
    const runs = useMemo(() => {
        const out = [];
        teams.forEach(t => {
            const s = t.seasons;
            for (let i = 0; i < s.length - 1; i++) {
                const a = s[i], b = s[i + 1];
                if (a.div == null || b.div == null || a.div === b.div) continue;
                const up = b.div < a.div;
                if (up !== promotion) continue;
                const into = b.div;
                const home = a.div; // relegation: the division to get back to
                const seasons = [b];
                let end = 'ongoing';
                for (let j = i + 2; j < s.length; j++) {
                    const dv = s[j].div;
                    if (promotion) {
                        if (dv > into) { end = 'relegated'; break; }
                        if (dv < into) { end = 'promotedAgain'; break; }
                    } else if (dv <= home) { end = 'backUp'; break; }
                    seasons.push(s[j]);
                }
                out.push({ team: t, into, home, start: b.season, seasons, end });
            }
        });
        return out.sort((x, y) => x.into - y.into || x.start - y.start || x.seasons.length - y.seasons.length);
    }, [teams, promotion]);
    const groups = [...new Set(runs.map(r => r.into))].sort((a, b) => a - b).map(d => {
        const list = runs.filter(r => r.into === d);
        const oneAndDone = list.filter(r => r.seasons.length === 1 && r.end !== 'ongoing').length;
        const twoPlus = list.filter(r => r.seasons.length >= 2).length;
        const ongoing = list.filter(r => r.end === 'ongoing').length;
        return { d, list, oneAndDone, twoPlus, ongoing };
    });
    const col = (s) => ((s - 1) / seasonNums.length) * 100; // left edge of a season, %
    const W = 100 / Math.max(1, seasonNums.length);
    const END = {
        relegated: { sym: '▼', text: 'Relegated', cls: 'text-rose-700' },
        promotedAgain: { sym: '▲', text: 'Promoted again', cls: 'text-emerald-700' },
        backUp: { sym: '▲', text: 'Back up', cls: 'text-emerald-700' },
        ongoing: { sym: '●', text: promotion ? 'Still there' : 'Still waiting', cls: 'text-slate-400' },
    };
    const onEnter = (e, run) => {
        const r = boxRef.current ? boxRef.current.getBoundingClientRect() : { left: 0, top: 0, width: 800 };
        setHover({ run, x: e.clientX - r.left, y: e.clientY - r.top, w: r.width });
    };
    return (<div className="space-y-4">
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="space-y-1.5 flex flex-col items-start sm:block">
    <ControlLabel accent="teal" icon={Layers}>After</ControlLabel>
    <Segmented value={after} onChange={(v) => { setAfter(v); setHover(null); }} options={[{ value: 'promotion', label: 'Promotion: how long they stay' }, { value: 'relegation', label: 'Relegation: how long to get back' }]}/>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
    {promotion ? (<><span><span className="text-rose-700 font-black">▼</span> Relegated</span><span><span className="text-emerald-700 font-black">▲</span> Promoted again</span></>) : (<span><span className="text-emerald-700 font-black">▲</span> Back up</span>)}
    <span><span className="text-slate-400 font-black">●</span> {promotion ? 'Still there' : 'Still waiting'}</span>
    <span className="text-slate-400">Each block is a season, coloured by division, showing the finish</span>
    </div>
    </div>
    <div ref={boxRef} className="relative space-y-5" onMouseLeave={() => { if (!lastTouch.current) setHover(null); }}>
    {/* Season axis */}
    <div className={`${GRID} items-end sticky z-10 bg-white py-1 border-b border-slate-100`} style={{ top: 'calc(var(--gsl-sticky, 160px) + 16px)' }}>
    <span/>
    <div className="relative h-4">
        {seasonNums.map(s => <span key={s} className="absolute text-[11px] font-bold text-slate-500 text-center" style={{ left: `${col(s)}%`, width: `${W}%` }}>{phone ? s : `S${s}`}</span>)}
    </div>
    <span/>
    </div>
        {groups.map(g => (<div key={g.d} className="space-y-1.5">
        {/* Group header + summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold" style={{ color: (DIVISIONS[g.d] || DIVISIONS[4]).badgeText }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: (DIVISIONS[g.d] || DIVISIONS[4]).color }}/>
        {promotion ? `Promoted into Div ${g.d}` : `Relegated into Div ${g.d}`} · {g.list.length}
        </span>
        <span className="flex flex-wrap gap-3 text-[11px] font-semibold text-slate-600">
        <span>{promotion ? 'Straight back down' : 'Straight back up'}: <strong className="text-slate-900">{promotion ? g.list.filter(r => r.seasons.length === 1 && r.end === 'relegated').length : g.list.filter(r => r.seasons.length === 1 && r.end === 'backUp').length}</strong></span>
        <span>{promotion ? 'Lasted 2+ seasons' : 'Took 2+ seasons'}: <strong className="text-slate-900">{g.twoPlus}</strong></span>
        <span>{promotion ? 'Still there' : 'Still waiting'}: <strong className="text-slate-900">{g.ongoing}</strong></span>
        </span>
        </div>
            {g.list.map((r, i) => {
                const e = END[r.end];
                const endSeason = r.seasons[r.seasons.length - 1].season;
                return (<div key={i} className={`${GRID} items-center cursor-pointer group`} data-sp-row="" onPointerDown={(ev) => { lastTouch.current = ev.pointerType !== 'mouse'; }} onClick={(ev) => (lastTouch.current ? setHover({ run: r, touch: true }) : onSelectTeam(r.team))} onMouseMove={(ev) => { if (!lastTouch.current) onEnter(ev, r); }}>
                <span className="inline-flex items-center gap-1.5 min-w-0 text-[11px] font-bold text-slate-800">
                <SvgFlag code={r.team.countryCode} width={16} height={11}/><span className="truncate group-hover:text-teal-800">{phone ? r.team.abbr : r.team.shortName}</span>
                </span>
                <div className="relative h-6 rounded-md bg-slate-50">
                    {r.seasons.map(ss => { const st = DIVISIONS[ss.div] || DIVISIONS[4]; return (<span key={ss.season} className="absolute top-0.5 bottom-0.5 rounded-[4px] flex items-center justify-center text-[11px] font-black tabular-nums text-white" style={{ left: `calc(${col(ss.season)}% + 1px)`, width: `calc(${W}% - 2px)`, backgroundColor: st.color }}>{ss.rank}</span>); })}
                {!phone && <span className={`absolute top-1/2 -translate-y-1/2 text-[11px] font-black ${e.cls}`} style={{ left: `calc(${col(endSeason) + W}% + 3px)` }}>{e.sym}</span>}
                </div>
                <span className={`text-[11px] font-semibold whitespace-nowrap ${e.cls}`}>{phone ? <>{r.seasons.length} <span className="font-black">{e.sym}</span></> : <>{r.seasons.length} season{r.seasons.length === 1 ? '' : 's'} · {e.text}</>}</span>
                </div>);
            })}
        </div>))}
        {!groups.length && <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl">Nothing yet.</div>}
    {/* Hover card */}
    {hover && (() => {
        const r = hover.run, e = END[r.end];
        const left = Math.min(Math.max(0, hover.x + 16), (hover.w || 800) - 260);
        return (<div data-sp-card="" className={`${hover.touch ? 'fixed z-[70] left-3 right-3 bottom-3 mx-auto max-w-sm' : 'absolute z-20 pointer-events-none w-64'} bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-3 text-xs`} style={hover.touch ? undefined : { left, top: hover.y + 14 }}>
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5 mb-2 min-w-0">
        <SvgFlag code={r.team.countryCode} width={18} height={13}/><span className="font-extrabold text-slate-900 truncate">{r.team.name}</span>
        </div>
        <div className="text-[11px] text-slate-600 mb-1.5">{promotion ? `Promoted into Div ${r.into} for S${r.start}` : `Relegated from Div ${r.home} to Div ${r.into} for S${r.start}`}</div>
        <div className="space-y-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
            {r.seasons.map(ss => (<div key={ss.season} className="flex justify-between"><span className="text-slate-600 font-medium">S{ss.season}</span><span className="font-black tabular-nums">{ss.rank} <span className="font-semibold text-slate-500">(Div {ss.div})</span></span></div>))}
        </div>
        <div className={`mt-2 font-extrabold ${e.cls}`}>{e.sym} {e.text}{r.end === 'ongoing' ? ` after ${r.seasons.length} season${r.seasons.length === 1 ? '' : 's'}` : ` after ${r.seasons.length} season${r.seasons.length === 1 ? '' : 's'}`}</div>
        {hover.touch && (<button type="button" onClick={() => { const t = r.team; setHover(null); onSelectTeam(t); }} className="mt-2 w-full h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-[13px] font-bold text-slate-900">Open profile ›</button>)}
        </div>);
    })()}
    </div>
    <p className="text-[11px] text-slate-500">Seasons up to S{lastSeason}. "Still there" / "Still waiting" runs are still going, so their length so far is a minimum.</p>
    </div>);
}

// ------------------------------------------------------------------------------------------------
// RANGE (Pyramid v15): every club's finishes on one line. Dots = each
// season's finish, bar = best to worst, ring = now, tick = average.
// ------------------------------------------------------------------------------------------------
function RangeDashboard({ teams, onSelectTeam }) {
    const hv = useHover(); // v24: card on hover / tap (was a browser tooltip)
    const [div, setDiv] = useState('all');
    const [sortBy, setSortBy] = useState('range');
    const rows = useMemo(() => teams.map(t => {
        const ranks = t.seasons.map(s => s.rank).filter(r => r != null);
        const best = Math.min(...ranks), worst = Math.max(...ranks);
        return { t, ranks, best, worst, range: worst - best, avg: ranks.reduce((a, b) => a + b, 0) / ranks.length, now: t.curRank, fromPeak: t.curRank - best };
    }).filter(r => r.ranks.length), [teams]);
    const shown = rows.filter(r => div === 'all' || String(r.t.div) === String(div)).sort((a, b) =>
        sortBy === 'range' ? b.range - a.range || a.now - b.now
            : sortBy === 'avg' ? a.avg - b.avg
                : sortBy === 'peak' ? b.fromPeak - a.fromPeak || a.now - b.now
                    : a.now - b.now);
    const widest = [...rows].sort((a, b) => b.range - a.range)[0];
    const narrow = [...rows].sort((a, b) => a.range - b.range || a.now - b.now)[0];
    const farthest = [...rows].sort((a, b) => b.fromPeak - a.fromPeak)[0];
    const avgRange = rows.reduce((s, r) => s + r.range, 0) / Math.max(1, rows.length);
    const pos = (rank) => ((rank - 1) / Math.max(1, TOTAL_CLUBS - 1)) * 100;
    return (<div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 font-sans">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
    <div className="flex items-center space-x-2">
    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><BarChart2 className="w-5 h-5"/></div>
    <div>
    <h3 className="text-lg font-extrabold text-slate-900">Range</h3>
    <p className="text-xs text-slate-600 mt-0.5">Every club's finishes on one line: how high, how low, and where it is now.</p>
    </div>
    </div>
    </div>
    <HighlightsBar accent="teal" columns={4}>
    <HighlightCard label="Widest range" icon={Activity} iconClassName="text-amber-300" value={widest ? widest.range : '–'} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left={widest ? `${widest.t.shortName} (${widest.best}–${widest.worst})` : ''} right=""/>
    <HighlightCard label="Narrowest range" icon={Shield} iconClassName="text-teal-300" value={narrow ? narrow.range : '–'} valueClassName="text-2xl sm:text-3xl font-black text-white" left={narrow ? `${narrow.t.shortName} (${narrow.best}–${narrow.worst})` : ''} right=""/>
    <HighlightCard label="Furthest from peak" icon={TrendingDown} iconClassName="text-rose-300" value={farthest ? farthest.fromPeak : '–'} valueClassName="text-2xl sm:text-3xl font-black text-rose-200" left={farthest ? `${farthest.t.shortName}: peak ${farthest.best}, now ${farthest.now}` : ''} right=""/>
    <HighlightCard label="Average range" icon={Layers} iconClassName="text-sky-300" value={avgRange.toFixed(1)} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left="places, per club" right=""/>
    </HighlightsBar>
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Layers}>Current division</ControlLabel>
    <FilterPills accent="teal" value={div} onChange={setDiv} options={[{ value: 'all', label: `All ${TOTAL_CLUBS}` }, ...DIV_STARTS.map((_, i) => ({ value: String(i + 1), label: `Div ${i + 1}` }))]}/>
    </div>
    <div className="space-y-1.5 flex flex-col items-start sm:block">
    <ControlLabel accent="teal" icon={BarChart2}>Sort</ControlLabel>
    <Segmented value={sortBy} onChange={setSortBy} options={[{ value: 'range', label: 'Widest range' }, { value: 'avg', label: 'Best average' }, { value: 'now', label: 'Current rank' }, { value: 'peak', label: 'Furthest from peak' }]}/>
    </div>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
    <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-500"/>A season's finish</span>
    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-slate-900"/>Now</span>
    <span className="inline-flex items-center gap-1.5"><span className="w-0.5 h-3 bg-slate-900"/>Average</span>
    <span className="inline-flex items-center gap-1.5"><span className="w-5 h-1.5 rounded-full bg-slate-300"/>Best to worst</span>
    </div>
    <div className="space-y-0.5">
    {/* Axis */}
    <div className="grid grid-cols-[104px_1fr_32px] sm:grid-cols-[170px_1fr_40px] gap-2 items-end">
    <span/>
    <div className="relative h-5">
        {[1, ...divBoundaryRanks(), TOTAL_CLUBS].map(r => <span key={r} className="absolute -translate-x-1/2 text-[11px] font-semibold text-slate-400 tabular-nums" style={{ left: `${pos(r)}%` }}>{r}</span>)}
    </div>
    <span className="text-[11px] font-semibold text-slate-400 text-right">Range</span>
    </div>
        {shown.map(r => (<div key={r.t.id} onClick={() => onSelectTeam(r.t)} {...hv({ title: r.t.name, rows: [['Finishes', r.ranks.join(' · ')], ['Best', r.best], ['Worst', r.worst], ['Range', `${r.range} places`], ['Average', r.avg.toFixed(1)], ['Now', r.now]], action: { label: 'Open profile', run: () => onSelectTeam(r.t) } })} className={`grid grid-cols-[104px_1fr_32px] sm:grid-cols-[170px_1fr_40px] gap-2 items-center cursor-pointer rounded-md hover:bg-slate-50 ${r.t.isMine ? 'bg-teal-50/60' : ''}`}>
        <span className="inline-flex items-center gap-1.5 min-w-0 text-[11px] font-bold text-slate-800">
        <SvgFlag code={r.t.countryCode} width={16} height={11}/>
        <span className="truncate">{r.t.shortName}</span>
        </span>
        <div className="relative h-5">
            {DIV_STARTS.map((_, i) => { const [a, b] = divRange(i + 1); return <span key={i} className="absolute inset-y-0" style={{ left: `${pos(a - 0.5 < 1 ? 1 : a - 0.5)}%`, width: `${pos(b + 0.5 > TOTAL_CLUBS ? TOTAL_CLUBS : b + 0.5) - pos(a - 0.5 < 1 ? 1 : a - 0.5)}%`, backgroundColor: (DIVISIONS[i + 1] || DIVISIONS[4]).bgTint }}/>; })}
        <span className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full opacity-30" style={{ left: `${pos(r.best)}%`, width: `${Math.max(0.6, pos(r.worst) - pos(r.best))}%`, backgroundColor: r.t.hex }}/>
            {r.ranks.map((rk, i) => <span key={i} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ left: `${pos(rk)}%`, backgroundColor: r.t.hex, boxShadow: '0 0 0 1px rgba(255,255,255,0.9)' }}/>)}
        <span className="absolute top-0.5 bottom-0.5 w-0.5 -translate-x-1/2 bg-slate-900" style={{ left: `${pos(r.avg)}%` }}/>
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-slate-900" style={{ left: `${pos(r.now)}%` }}/>
        </div>
        <span className="text-[11px] font-black tabular-nums text-slate-900 text-right">{r.range}</span>
        </div>))}
    </div>
    </div>);
}

// ------------------------------------------------------------------------------------------------
// NATIONAL POWER INDEX (Pyramid v19): the Pyramid by country. Baseline is the
// S1 finish (never the pre-S1 seeding). Nations are grouped by how many clubs
// they have, so like is compared with like.
// ------------------------------------------------------------------------------------------------
const NATION_SIZES = [
    { value: 'big', label: 'Big', min: 7, max: Infinity, note: '7+ clubs' },
    { value: 'medium', label: 'Medium', min: 3, max: 6, note: '3–6 clubs' },
    { value: 'small', label: 'Small', min: 1, max: 2, note: '1–2 clubs' },
];
const NATION_NAMES = Object.values(COUNTRY_MAP).reduce((acc, c) => { acc[c.code] = c.name; return acc; }, {});
function NationalPowerIndex({ teams, onSelectTeam }) {
    const [size, setSize] = useState('all');
    const [sortBy, setSortBy] = useState('clubs');
    const [open, setOpen] = useState(null);
    const seasonNums = seasonNumsOf(teams);
    const first = seasonNums[0] || 1, last = seasonNums[seasonNums.length - 1] || 1;
    const divIds = DIV_STARTS.map((_, i) => i + 1);
    const nations = useMemo(() => {
        const by = {};
        teams.forEach(t => { (by[t.countryCode] = by[t.countryCode] || []).push(t); });
        return Object.entries(by).map(([code, clubs]) => {
            const avgAt = (s) => {
                const r = clubs.map(t => t.seasons[s - 1] && t.seasons[s - 1].rank).filter(x => x != null);
                return r.length ? r.reduce((a, b) => a + b, 0) / r.length : null;
            };
            const footprint = (s) => divIds.map(d => clubs.filter(t => t.seasons[s - 1] && t.seasons[s - 1].div === d).length);
            const base = avgAt(first), now = avgAt(last);
            const avgs = seasonNums.map(s => ({ s, v: avgAt(s) })).filter(x => x.v != null);
            const best = avgs.length ? avgs.reduce((a, x) => (x.v < a.v ? x : a)) : null;
            const worst = avgs.length ? avgs.reduce((a, x) => (x.v > a.v ? x : a)) : null;
            const sz = NATION_SIZES.find(z => clubs.length >= z.min && clubs.length <= z.max) || NATION_SIZES[2];
            return {
                code, name: NATION_NAMES[code] || code, clubs, size: sz.value,
                base, now, trend: base != null && now != null ? base - now : 0, // + = clubs finishing higher
                best, worst,
                nowFoot: footprint(last), history: seasonNums.map(s => ({ s, foot: footprint(s), avg: avgAt(s) })),
            };
        });
    }, [teams]);
    const shown = nations.filter(n => size === 'all' || n.size === size).sort((a, b) =>
        sortBy === 'trend' ? b.trend - a.trend || a.now - b.now
            : sortBy === 'now' ? a.now - b.now
                : sortBy === 'div1' ? b.nowFoot[0] - a.nowFoot[0] || a.now - b.now
                    : b.clubs.length - a.clubs.length || a.now - b.now);
    // One scale for every row's sparkline, so nations compare fairly
    const allAvgs = nations.flatMap(n => n.history.map(h => h.avg)).filter(v => v != null);
    const yLo = Math.max(1, Math.floor(Math.min(...allAvgs)) - 2), yHi = Math.min(TOTAL_CLUBS, Math.ceil(Math.max(...allAvgs)) + 2);
    const SPARK_W = 220, SPARK_H = 60;
    const Spark = ({ history }) => {
        const [hov, setHov] = useState(null); // season under the pointer
        const pts = history.filter(h => h.avg != null);
        const x = (s) => 6 + ((s - first) / Math.max(1, last - first)) * (SPARK_W - 12);
        const y = (v) => 4 + ((v - yLo) / Math.max(1, yHi - yLo)) * (SPARK_H - 8);
        const onMove = (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - r.left;
            let best = null;
            pts.forEach(p => { if (!best || Math.abs(x(p.s) - px) < Math.abs(x(best.s) - px)) best = p; });
            setHov(best);
        };
        const hovDiv = hov ? divOfRank(Math.round(hov.avg)) : null;
        return (<div className="relative" style={{ width: SPARK_W }}>
        <svg width={SPARK_W} height={SPARK_H} className="block cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHov(null)}>
            {DIV_STARTS.map((_, i) => {
                const [a, b] = divRange(i + 1);
                const top = Math.max(yLo, a - 0.5), bot = Math.min(yHi, b + 0.5);
                if (bot <= yLo || top >= yHi) return null;
                return <rect key={i} x={0} width={SPARK_W} y={y(top)} height={y(bot) - y(top)} fill={(DIVISIONS[i + 1] || DIVISIONS[4]).color} fillOpacity="0.1"/>;
            })}
            <path d={pts.map((p, i) => `${i ? 'L' : 'M'} ${x(p.s)} ${y(p.avg)}`).join(' ')} fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinejoin="round"/>
            {hov && <line x1={x(hov.s)} x2={x(hov.s)} y1={0} y2={SPARK_H} stroke="#94a3b8" strokeDasharray="3 2"/>}
            {pts.map((p, i) => (<circle key={p.s} cx={x(p.s)} cy={y(p.avg)} r={hov && hov.s === p.s ? 4 : i === pts.length - 1 ? 3.2 : 2} fill={hov && hov.s === p.s ? '#0f172a' : i === pts.length - 1 ? '#0f172a' : '#ffffff'} stroke="#0f172a" strokeWidth="1.2"/>))}
        </svg>
        {hov && (<div className="absolute z-20 pointer-events-none -top-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-md text-[11px] font-bold text-slate-900 whitespace-nowrap flex items-center gap-1.5" style={{ left: Math.min(Math.max(0, x(hov.s) - 50), SPARK_W - 110), transform: 'translateY(-100%)' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: divCol(hovDiv || 4) }}/>S{hov.s} · avg {hov.avg.toFixed(1)}<span className="font-semibold text-slate-400">Div {hovDiv}</span>
        </div>)}
        </div>);
    };
    const topDiv1 = [...nations].sort((a, b) => b.nowFoot[0] - a.nowFoot[0] || a.now - b.now)[0];
    const riser = [...nations].sort((a, b) => b.trend - a.trend)[0];
    const faller = [...nations].sort((a, b) => a.trend - b.trend)[0];
    const signedAvg = (v) => (v > 0 ? `▲ ${v.toFixed(1)}` : v < 0 ? `▼ ${Math.abs(v).toFixed(1)}` : '–');
    const trendCls = (v) => (v > 0.05 ? 'text-emerald-700' : v < -0.05 ? 'text-rose-700' : 'text-slate-400');
    const divCol = (d) => (DIVISIONS[d] || DIVISIONS[4]).color;
    const Strip = ({ foot }) => {
        const total = foot.reduce((a, b) => a + b, 0) || 1;
        return (<div className="flex h-6 rounded-md overflow-hidden bg-slate-100 w-full min-w-[170px] gap-px">
            {foot.map((n, i) => n > 0 && (<span key={i} className="h-full flex items-center justify-center gap-1 text-[11px] font-black text-white whitespace-nowrap overflow-hidden" style={{ flex: n, backgroundColor: divCol(i + 1) }} title={`Div ${i + 1}: ${n} club${n === 1 ? '' : 's'}`}>
                {n / total >= 0.28 && <span className="font-semibold opacity-80">D{i + 1}</span>}{n}
            </span>))}
        </div>);
    };
    return (<div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 font-sans">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
    <div className="flex items-center space-x-2">
    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><Globe className="w-5 h-5"/></div>
    <div>
    <h3 className="text-lg font-extrabold text-slate-900">National Power Index</h3>
    <p className="text-xs text-slate-600 mt-0.5">The Pyramid by country: where each nation's clubs finished in S{first} and in S{last}, and how they've moved between divisions.</p>
    </div>
    </div>
    </div>
    <HighlightsBar accent="teal" columns={4}>
    <HighlightCard label="Nations" icon={Globe} iconClassName="text-teal-300" value={nations.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left={`${TOTAL_CLUBS} clubs`} right=""/>
    <HighlightCard label="Most Div 1 clubs" icon={Crown} iconClassName="text-amber-300" value={topDiv1 ? topDiv1.name : '–'} valueClassName="text-lg sm:text-xl font-black text-amber-200" left={topDiv1 ? `${topDiv1.nowFoot[0]} in Div 1 (S${last})` : ''} right=""/>
    <HighlightCard label="Biggest riser" icon={TrendingUp} iconClassName="text-emerald-300" value={riser ? riser.name : '–'} valueClassName="text-lg sm:text-xl font-black text-emerald-200" left={riser ? `avg finish ${signedAvg(riser.trend)} since S${first}` : ''} right=""/>
    <HighlightCard label="Biggest faller" icon={TrendingDown} iconClassName="text-rose-300" value={faller ? faller.name : '–'} valueClassName="text-lg sm:text-xl font-black text-rose-200" left={faller ? `avg finish ${signedAvg(faller.trend)} since S${first}` : ''} right=""/>
    </HighlightsBar>
    <div className="flex flex-wrap items-end justify-between gap-3">
    <div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Users}>Nation size</ControlLabel>
    <FilterPills accent="teal" value={size} onChange={(v) => { setSize(v); setOpen(null); }} options={[{ value: 'all', label: 'All', badge: nations.length }, ...NATION_SIZES.map(z => ({ value: z.value, label: `${z.label} (${z.note})`, badge: nations.filter(n => n.size === z.value).length }))]}/>
    </div>
    <div className="space-y-1.5 flex flex-col items-start sm:block">
    <ControlLabel accent="teal" icon={BarChart2}>Sort</ControlLabel>
    <Segmented value={sortBy} onChange={setSortBy} options={[{ value: 'clubs', label: 'Most clubs' }, { value: 'now', label: 'Best average now' }, { value: 'trend', label: 'Biggest rise' }, { value: 'div1', label: 'Most in Div 1' }]}/>
    </div>
    </div>
    <div className="overflow-x-auto">
    <table className="w-full text-xs">
    <thead>
    <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/60">
    <th className="py-2 px-3 text-left">Nation</th>
    <th className="py-2 px-2 text-center">Clubs</th>
    <th className="py-2 px-2 text-center whitespace-nowrap" title="Average finish of the nation's clubs in the first season">Avg S{first}</th>
    <th className="py-2 px-2 text-center whitespace-nowrap" title="Average finish in the latest season">Avg S{last}</th>
    <th className="py-2 px-2 text-center">Trajectory</th>
    <th className="py-2 px-2 text-center whitespace-nowrap" title="Best season average finish">Best avg</th>
    <th className="py-2 px-2 text-center whitespace-nowrap" title="Worst season average finish">Worst avg</th>
    <th className="py-2 px-2 text-center whitespace-nowrap">Div 1 now</th>
    <th className="py-2 px-2 text-left whitespace-nowrap">Divisions now</th>
    <th className="py-2 px-3 text-left whitespace-nowrap" title="The nation's average finish each season, on division-coloured bands (higher = better). Hover for the numbers.">Average finish</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
        {shown.map(n => {
            const isOpen = open === n.code;
            const maxClubs = n.clubs.length;
            return (<React.Fragment key={n.code}>
            <tr onClick={() => setOpen(isOpen ? null : n.code)} className={`cursor-pointer ${isOpen ? 'bg-teal-50/50' : 'hover:bg-slate-50'}`}>
            <td className="py-2 px-3"><span className="inline-flex items-center gap-2 font-bold text-slate-900 whitespace-nowrap">
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? '' : '-rotate-90'}`}/>
            <SvgFlag code={n.code} width={22} height={16}/>{n.name}</span></td>
            <td className="py-2 px-2 text-center font-black tabular-nums">{n.clubs.length}</td>
            <td className="py-2 px-2 text-center tabular-nums text-slate-600">{n.base != null ? n.base.toFixed(1) : '–'}</td>
            <td className="py-2 px-2 text-center tabular-nums font-black text-slate-900">{n.now != null ? n.now.toFixed(1) : '–'}</td>
            <td className={`py-2 px-2 text-center tabular-nums font-black ${trendCls(n.trend)}`}>{signedAvg(n.trend)}</td>
            <td className="py-2 px-2 text-center tabular-nums whitespace-nowrap"><span className="font-bold text-emerald-700">{n.best ? n.best.v.toFixed(1) : '–'}</span>{n.best && <span className="text-[11px] text-slate-400"> · S{n.best.s}</span>}</td>
            <td className="py-2 px-2 text-center tabular-nums whitespace-nowrap"><span className="font-bold text-rose-700">{n.worst ? n.worst.v.toFixed(1) : '–'}</span>{n.worst && <span className="text-[11px] text-slate-400"> · S{n.worst.s}</span>}</td>
            <td className="py-2 px-2 text-center tabular-nums font-bold" style={{ color: n.nowFoot[0] ? (DIVISIONS[1] || {}).badgeText : '#cbd5e1' }}>{n.nowFoot[0]}</td>
            <td className="py-2 px-2"><Strip foot={n.nowFoot}/></td>
            <td className="py-1 px-3"><Spark history={n.history}/></td>
            </tr>
            {isOpen && (<tr className="bg-teal-50/30"><td colSpan={10} className="px-3 py-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {/* Left half: the clubs, in two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
                {[...n.clubs].sort((a, b) => a.curRank - b.curRank).map(t => {
                    const s1 = t.seasons[first - 1] && t.seasons[first - 1].rank;
                    const ch = s1 != null ? s1 - t.curRank : 0;
                    return (<button key={t.id} type="button" onClick={(e) => { e.stopPropagation(); onSelectTeam(t); }} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-teal-400 text-[11px] text-left">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: divCol(t.div) }}/>
                    <span className="font-bold text-slate-800 truncate sm:flex-1">{t.shortName}</span>
                    <span className="text-slate-400 tabular-nums shrink-0">S{first} {s1 ?? '–'} → {t.curRank}</span>
                    <span className={`font-black tabular-nums shrink-0 ${ch > 0 ? 'text-emerald-700' : ch < 0 ? 'text-rose-700' : 'text-slate-400'}`}>{ch > 0 ? `▲${ch}` : ch < 0 ? `▼${Math.abs(ch)}` : '–'}</span>
                    </button>);
                })}
            </div>
            {/* Right half: how many of its clubs were in each division, each season */}
            <div>
            <div className="text-[11px] font-extrabold text-slate-700 mb-1">Clubs per division, season by season</div>
            <div className="overflow-x-auto">
            <table className="text-[11px] border-separate" style={{ borderSpacing: '3px' }}>
            <thead><tr><th/>{n.history.map(h => <th key={h.s} className="w-9 text-center font-bold text-slate-500">S{h.s}</th>)}</tr></thead>
            <tbody>
                {divIds.map((d, di) => (<tr key={d}>
                <td className="pr-2 font-extrabold whitespace-nowrap" style={{ color: (DIVISIONS[d] || DIVISIONS[4]).badgeText }}>Div {d}</td>
                    {n.history.map(h => { const c = h.foot[di]; return (<td key={h.s} className="p-0"><div className="w-9 h-7 rounded-md flex items-center justify-center font-black tabular-nums" style={{ backgroundColor: c ? hexToRgba(divCol(d), 0.2 + (c / maxClubs) * 0.8) : '#f8fafc', color: c / maxClubs >= 0.45 ? '#ffffff' : '#0f172a' }} title={`S${h.s}: ${c} club${c === 1 ? '' : 's'} in Div ${d}`}>{c || ''}</div></td>); })}
                </tr>))}
            </tbody>
            </table>
            </div>
            </div>
            </div>
            </td></tr>)}
            </React.Fragment>);
        })}
    </tbody>
    </table>
    </div>
    <p className="text-[11px] text-slate-500">Trajectory: change in the nation's average finish from S{first} to S{last} (▲ = its clubs finish higher now). Best / worst: its best and worst season average. The line shows its average finish each season (higher = better) over the division bands; every row uses the same scale. Click a nation for its season-by-season division grid and its clubs.</p>
    </div>);
}

// ------------------------------------------------------------------------------------------------
// TAB 3: PYRAMID ANALYTICS (INSIGHTS & READY-MADE DASHBOARDS)
// ------------------------------------------------------------------------------------------------
function AnalyticsTab({ teams, winners = {}, onSelectTeam }) {
    const phone = useScreen() === 'phone'; // v24: 3-letter codes on phones, short names on desktop
    const seasonNums = seasonNumsOf(teams);
    const lastSeason = seasonNums[seasonNums.length - 1] || 1;
    const [mainstayDivFilter, setMainstayDivFilter] = useState('all');
    const [mainstayViewMode, setMainstayViewMode] = useState('table');
    const [risersFallersSeason, setRisersFallersSeason] = useState('overall');
    // 1. Division 1 Royalty (in Division 1 at the end of every completed season)
    const div1Royalty = useMemo(() => {
        return teams.filter(t => {
            return t.seasons.every(s => s.rank !== null && s.div === 1);
        }).sort((a, b) => a.avgRank - b.avgRank);
    }, [teams]);
    // 2. Mainstay Clubs (never changed division across all completed seasons)
    const mainstayClubs = useMemo(() => {
        return teams.filter(t => {
            const firstDiv = t.seasons[0]?.div;
            if (!firstDiv)
                return false;
            return t.seasons.every(s => s.div === firstDiv);
        }).sort((a, b) => a.div - b.div || a.avgRank - b.avgRank);
    }, [teams]);
    // Filter mainstay clubs by user-selected division
    const filteredMainstayClubs = useMemo(() => {
        if (mainstayDivFilter === 'all')
            return mainstayClubs;
        return mainstayClubs.filter(t => t.div === Number(mainstayDivFilter));
    }, [mainstayClubs, mainstayDivFilter]);
    // Mainstay count breakdown per tier
    const mainstayCounts = useMemo(() => {
        const counts = { all: mainstayClubs.length, 1: 0, 2: 0, 3: 0, 4: 0 };
        mainstayClubs.forEach(t => {
            if (counts[t.div] !== undefined)
                counts[t.div]++;
        });
        return counts;
    }, [mainstayClubs]);
    // 3. Yo-Yo Clubs (Most promotions + relegations)
    const yoyoClubs = useMemo(() => {
        const list = teams.map(t => {
            let pCount = 0;
            let rCount = 0;
            t.seasons.forEach(s => {
                // Promotions/relegations worked out from the ranks (see parsePyramid)
                if (s.move === 'P')
                    pCount++;
                if (s.move === 'R')
                    rCount++;
            });
            return {
                ...t,
                pCount,
                rCount,
                totalMoves: pCount + rCount
            };
        });
        // A yo-yo = promoted then relegated in successive seasons, or the
        // reverse (t.bounces, from parsePyramid). Only promotions (a climb) or
        // only relegations (a freefall) don't count. Most yo-yos first; ties:
        // more total moves, then better average finish.
        return list.filter(t => t.bounces > 0).sort((a, b) => b.bounces - a.bounces || b.totalMoves - a.totalMoves || a.avgRank - b.avgRank);
    }, [teams]);
    // 4. Favorite Rank: each club's most repeated finish (3+ times), with its
    // longest run at that rank. Top 10 by count, then run, then rank.
    const favoriteRanks = useMemo(() => {
        const list = teams.map((t) => {
            const counts = {};
            t.seasons.forEach((ss) => { if (ss.rank != null) counts[ss.rank] = (counts[ss.rank] || 0) + 1; });
            let best = null;
            Object.entries(counts).forEach(([rk, n]) => {
                const rank = Number(rk);
                let streak = 0, run = 0;
                t.seasons.forEach((ss) => { run = ss.rank === rank ? run + 1 : 0; streak = Math.max(streak, run); });
                if (!best || n > best.count || (n === best.count && (streak > best.streak || (streak === best.streak && rank < best.rank)))) best = { rank, count: n, streak };
            });
            return best ? { team: t, club: t.name, abbr: t.abbr, flag: t.country, countryCode: t.countryCode, hex: t.hex, ...best } : null;
        }).filter((x) => x && x.count >= 3);
        return list.sort((a, b) => b.count - a.count || b.streak - a.streak || a.rank - b.rank).slice(0, 10);
    }, [teams]);
    // 5. Biggest Risers & Fallers (Overall or Specific Season)
    const trajectoryLeaders = useMemo(() => {
        if (!teams || teams.length === 0) {
            return { risers: [], fallers: [], scopeLabel: '', startPrefix: '', endPrefix: '' };
        }
        if (risersFallersSeason === 'overall') {
            const valid = teams
                .map(t => {
                const s1 = t.seasons[0]?.rank;
                const s8 = t.seasons[t.seasons.length - 1]?.rank ?? t.curRank; // latest season
                // Rank climb: starting rank minus ending rank (e.g. 69 - 1 = +68 climb)
                const net = (s1 !== null && s1 !== undefined && s8 !== null && s8 !== undefined)
                    ? (s1 - s8)
                    : (t.totRisen || 0);
                return {
                    ...t,
                    prevRank: s1,
                    endRank: s8,
                    netTrajectory: net,
                    tag: t.seasons[t.seasons.length - 1]?.tag || null
                };
            })
                .filter(t => t.prevRank !== null && t.prevRank !== undefined);
            const risers = [...valid]
                .sort((a, b) => b.netTrajectory - a.netTrajectory || a.curRank - b.curRank)
                .slice(0, 5);
            const fallers = [...valid]
                .sort((a, b) => a.netTrajectory - b.netTrajectory || b.curRank - a.curRank)
                .slice(0, 5);
            return {
                risers,
                fallers,
                scopeLabel: `Overall (S1 ↔ S${lastSeason} Finish)`,
                startPrefix: 'S1',
                endPrefix: 'Current'
            };
        }
        else {
            const sNum = Number(risersFallersSeason);
            const valid = teams
                .map(t => {
                let prevRank = null;
                let endRank = null;
                let tag = null;
                // Movement starts in Season 2 (the Season 1 "start rank" is just
                // the alphabetical seeding of an empty table)
                {
                    prevRank = t.seasons[sNum - 2]?.rank;
                    endRank = t.seasons[sNum - 1]?.rank;
                    tag = t.seasons[sNum - 1]?.tag || null;
                }
                const net = (prevRank !== null && prevRank !== undefined && endRank !== null && endRank !== undefined)
                    ? (prevRank - endRank)
                    : 0;
                return {
                    ...t,
                    prevRank,
                    endRank,
                    netTrajectory: net,
                    tag
                };
            })
                .filter(t => t.prevRank !== null && t.endRank !== null);
            const risers = [...valid]
                .sort((a, b) => b.netTrajectory - a.netTrajectory || a.curRank - b.curRank)
                .slice(0, 5);
            const fallers = [...valid]
                .sort((a, b) => a.netTrajectory - b.netTrajectory || b.curRank - a.curRank)
                .slice(0, 5);
            return {
                risers,
                fallers,
                scopeLabel: sNum === 1 ? 'Season 1 (Start ↔ S1 Finish)' : `Season ${sNum} (S${sNum - 1} ↔ S${sNum} Movement)`,
                startPrefix: sNum === 1 ? 'Start' : `S${sNum - 1}`,
                endPrefix: `S${sNum}`
            };
        }
    }, [teams, risersFallersSeason]);
    return (<div className="space-y-6 font-sans">
    {/* European Qualification: positions, ledger and Europe Tax (v6) */}
    <EuropeanQualification teams={teams} winners={winners} onSelectTeam={onSelectTeam}/>
    {/* Movement and Range (v15) */}
    <MovementDashboard teams={teams} onSelectTeam={onSelectTeam}/>
    <RangeDashboard teams={teams} onSelectTeam={onSelectTeam}/>
    <NationalPowerIndex teams={teams} onSelectTeam={onSelectTeam}/>
    {/* 2-Column Responsive Dashboard Layout: Moves Mainstay Clubs directly beneath Div 1 Royalty */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-sans">
    {/* Left Column: Div 1 Royalty (Reduced size) + Mainstay Clubs (Moved up & takes up full size) */}
    <div className="space-y-6 flex flex-col font-sans">
    {/* Div 1 Royalty (Compact Box, Fitted naturally to content without empty trailing space) */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-sm font-sans">
    <div className="flex items-center justify-between mb-3">
    <div className="flex items-center space-x-2">
    <span className="p-1.5 bg-teal-50 text-teal-800 rounded-lg">
    <Crown className="w-4 h-4"/>
    </span>
    <div>
    <h3 className="font-bold text-slate-900 text-sm font-sans">DIV 1 ROYALTY</h3>
    <p className="text-[11px] text-slate-500 font-sans">Clubs never out of Division 1 across all {seasonNums.length} seasons</p>
    </div>
    </div>
    </div>
    <div className="overflow-x-auto">
    <table className="w-full text-xs text-left font-sans">
    <thead>
    <tr className="border-b border-slate-100 text-slate-400 font-medium font-sans text-[11px]">
    <th className="py-1.5 px-2">Club</th>
    <th className="py-1.5 px-2 text-center">Avg</th>
    <th className="py-1.5 px-2 text-center">Peak</th>
    <th className="py-1.5 px-2 text-center">Low</th>
    <th className="py-1.5 px-2 text-center">Titles</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-50 font-sans">
        {div1Royalty.map(t => (<tr key={t.id} onClick={() => onSelectTeam(t)} className="hover:bg-slate-50 cursor-pointer transition group">
        <td className="py-1.5 px-2 flex items-center space-x-2">
        <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.hex }}/>
        <span className="font-semibold text-slate-900 font-sans group-hover:text-teal-800 transition">
        {phone ? t.abbr : t.shortName}
        </span>
        </td>
        <td className="py-1.5 px-2 text-center font-sans font-medium text-slate-700">
        {t.avgRank.toFixed(1)}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-emerald-600 font-semibold">
#{t.highRank}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-rose-600">
#{t.lowRank}
        </td>
        <td className="py-1.5 px-2 text-center font-sans font-bold text-amber-600">
        {t.div1Wins > 0 ? `🌕 ${t.div1Wins}` : '—'}
        </td>
        </tr>))}
    </tbody>
    </table>
    </div>
    </div>
    {/* Mainstay Clubs (Moved up right below Div 1 Royalty; Takes up 100% of container width & height) */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-sm font-sans flex flex-col">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-3">
    <div className="flex items-center space-x-2">
    <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
    <Shield className="w-4 h-4"/>
    </span>
    <div>
    <h3 className="font-bold text-slate-900 text-sm font-sans">MAINSTAY CLUBS</h3>
    <p className="text-[11px] text-slate-500 font-sans">Clubs that spent all {seasonNums.length} seasons in the same division</p>
    </div>
    </div>
    <div className="flex items-center space-x-2 self-start sm:self-auto">
    {/* View Mode Toggle: Table vs Cards */}
    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 font-sans">
    <button onClick={() => setMainstayViewMode('table')} title="Full Table View (Edge-to-edge container fit)" className={`px-2 py-1 text-xs font-medium rounded flex items-center space-x-1 font-sans transition ${mainstayViewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
    <List className="w-3.5 h-3.5"/>
    <span className="text-[11px]">Table</span>
    </button>
    <button onClick={() => setMainstayViewMode('cards')} title="Cards Grid View" className={`px-2 py-1 text-xs font-medium rounded flex items-center space-x-1 font-sans transition ${mainstayViewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
    <LayoutGrid className="w-3.5 h-3.5"/>
    <span className="text-[11px]">Cards</span>
    </button>
    </div>
    {/* count badge removed */}
    </div>
    </div>
    {/* Division Selector */}
    <div className="flex items-center flex-wrap gap-1 bg-slate-100 p-1 rounded-lg mb-3 self-start font-sans">
    <button onClick={() => setMainstayDivFilter('all')} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${mainstayDivFilter === 'all'
            ? 'bg-white text-slate-900 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'}`}>
All ({mainstayCounts.all})
    </button>
    <button onClick={() => setMainstayDivFilter('1')} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${mainstayDivFilter === '1'
            ? 'bg-purple-600 text-white shadow-xs font-semibold'
            : 'text-slate-600 hover:text-purple-700'}`}>
Div 1 ({mainstayCounts[1]})
    </button>
    <button onClick={() => setMainstayDivFilter('2')} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${mainstayDivFilter === '2'
            ? 'bg-amber-500 text-white shadow-xs font-semibold'
            : 'text-slate-600 hover:text-amber-700'}`}>
Div 2 ({mainstayCounts[2]})
    </button>
    <button onClick={() => setMainstayDivFilter('3')} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${mainstayDivFilter === '3'
            ? 'bg-slate-600 text-white shadow-xs font-semibold'
            : 'text-slate-600 hover:text-slate-800'}`}>
Div 3 ({mainstayCounts[3]})
    </button>
    <button onClick={() => setMainstayDivFilter('4')} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${mainstayDivFilter === '4'
            ? 'bg-orange-600 text-white shadow-xs font-semibold'
            : 'text-slate-600 hover:text-orange-800'}`}>
Div 4 ({mainstayCounts[4]})
    </button>
    </div>
    {/* Container Body (Full-Width Table View or Responsive 2-Col Card Grid) */}
    <div className="w-full font-sans">
        {filteredMainstayClubs.length === 0 ? (<div className="p-8 text-center text-xs text-slate-400 font-sans">
No mainstay clubs found in this tier.
        </div>) : mainstayViewMode === 'table' ? (
        /* Primary Table View (Fills 100% of container width and height cleanly) */
        <div className="overflow-x-auto w-full">
        <div className="max-h-[380px] overflow-y-auto scrollbar-thin pr-1">
        <table className="w-full text-xs text-left font-sans">
        <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
        <tr className="text-slate-400 font-medium font-sans text-[11px]">
        <th className="py-2 px-2">Club</th>
        <th className="py-2 px-2 text-center">Division</th>
        <th className="py-2 px-2 text-center">Current</th>
        <th className="py-2 px-2 text-center">Avg</th>
        <th className="py-2 px-2 text-center">Peak</th>
        <th className="py-2 px-2 text-center">Low</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-sans">
            {filteredMainstayClubs.map(t => {
                const divMeta = DIVISIONS[t.div];
                return (<tr key={t.id} onClick={() => onSelectTeam(t)} className="hover:bg-slate-50 cursor-pointer transition group">
                <td className="py-2 px-2">
                <div className="flex items-center space-x-2">
                <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.hex }}/>
                <div className="min-w-0">
                <span className="font-semibold text-slate-900 font-sans truncate block group-hover:text-teal-800 transition">
                {phone ? t.abbr : t.shortName}
                </span>
                </div>
                </div>
                </td>
                <td className="py-2 px-2 text-center">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded font-sans inline-block" style={{ backgroundColor: divMeta.badgeBg, color: divMeta.badgeText }}>
                {divMeta.shortName}
                </span>
                </td>
                <td className="py-2 px-2 text-center font-bold text-slate-800 font-sans">
#{t.curRank}
                </td>
                <td className="py-2 px-2 text-center font-medium text-slate-700 font-sans">
                {t.avgRank.toFixed(1)}
                </td>
                <td className="py-2 px-2 text-center font-semibold text-emerald-600 font-sans">
#{t.highRank}
                </td>
                <td className="py-2 px-2 text-center font-semibold text-rose-600 font-sans">
#{t.lowRank}
                </td>
                </tr>);
            })}
        </tbody>
        </table>
        </div>
        </div>) : (
        /* Cards View (2 balanced columns filling 100% of container width) */
        <div className="max-h-[380px] overflow-y-auto scrollbar-thin pr-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans w-full">
            {filteredMainstayClubs.map(t => {
                const divMeta = DIVISIONS[t.div];
                return (<div key={t.id} onClick={() => onSelectTeam(t)} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-300 hover:shadow-xs cursor-pointer transition flex flex-col justify-between text-xs font-sans group w-full">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.hex }}/>
                <span className="font-bold text-slate-800 font-sans text-xs group-hover:text-teal-800 transition">
                {t.abbr}
                </span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded font-sans" style={{ backgroundColor: divMeta.badgeBg, color: divMeta.badgeText }}>
                {divMeta.shortName}
                </span>
                </div>
                <div className="font-semibold text-slate-900 mt-1.5 truncate font-sans text-xs">
                {phone ? t.abbr : t.shortName}
                </div>
                <div className="text-[11px] text-slate-500 font-sans mt-2 flex items-center justify-between pt-1.5 border-t border-slate-100">
                <span>Current: <strong className="text-slate-800">#{t.curRank}</strong></span>
                <span>Avg: <strong className="text-slate-700">{t.avgRank.toFixed(1)}</strong></span>
                <span className="text-emerald-700 font-semibold">Peak #{t.highRank}</span>
                </div>
                </div>);
            })}
        </div>
        </div>)}
    </div>
    </div>
    {/* Biggest Risers & Fallers (Net Trajectory Leaders) - Directly under Mainstay Clubs */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-sm font-sans flex flex-col">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-3 pb-2.5 border-b border-slate-100">
    <div className="flex items-center space-x-2">
    <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
    <Activity className="w-4 h-4"/>
    </span>
    <div>
    <h3 className="font-bold text-slate-900 text-sm font-sans">BIGGEST RISERS & FALLERS</h3>
    <p className="text-[11px] text-slate-500 font-sans">
        {risersFallersSeason === 'overall'
            ? `Net trajectory leaders measuring rank movement from Season 1 to Season ${lastSeason}`
            : `Form swing leaders measuring movement during Season ${risersFallersSeason}`}
    </p>
    </div>
    </div>
    </div>
    {/* Season selector: overall or one season */}
    <div className="flex items-center flex-wrap gap-1 bg-slate-100 p-1 rounded-lg mb-3.5 self-start font-sans">
    <button onClick={() => setRisersFallersSeason('overall')} title={`Overall (S1–S${lastSeason})`} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${risersFallersSeason === 'overall'
            ? 'bg-white text-slate-900 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'}`}>
Overall
    </button>
        {seasonNums.slice(1).map(s => (<button key={s} onClick={() => setRisersFallersSeason(String(s))} title={`Season ${s}`} className={`px-2.5 py-1 rounded-md text-xs font-medium transition font-sans ${risersFallersSeason === String(s)
                ? 'bg-teal-700 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-teal-800'}`}>
S{s}
        </button>))}
    </div>
    {/* Side-by-Side Grid: Top 5 Risers & Top 5 Fallers */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
    {/* Top 5 Risers Column */}
    <div className="space-y-2">
    <div className="flex items-center justify-between pb-1 px-1">
    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
    <TrendingUp className="w-3.5 h-3.5 text-emerald-600"/>
    <span>Top 5 Risers</span>
    </div>
    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
Climbers
    </span>
    </div>
    <div className="space-y-1.5">
        {trajectoryLeaders.risers.map((t, idx) => (<div key={`riser-${t.id}`} onClick={() => onSelectTeam(t)} className="p-2 sm:p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition cursor-pointer flex items-center justify-between group text-xs font-sans">
        <div className="flex items-center space-x-2 min-w-0 pr-2">
        <span className="text-xs font-bold text-slate-400 w-3.5 text-center flex-shrink-0">
#{idx + 1}
        </span>
        {/* Country Vector Flag */}
        <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
        {/* Club Color Badge */}
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-slate-200" style={{ backgroundColor: t.hex }} title={`Color: ${t.hex}`}/>
        {/* Club Name & Finishes */}
        <div className="min-w-0">
        <div className="font-bold text-slate-900 truncate group-hover:text-emerald-700 transition flex items-center space-x-1">
        <span>{t.shortName}</span>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
        <span>{trajectoryLeaders.startPrefix}: <strong className="text-slate-700 font-semibold">#{t.prevRank}</strong></span>
        <span className="text-slate-300">→</span>
        <span>{trajectoryLeaders.endPrefix}: <strong className="text-slate-900 font-bold">#{t.endRank}</strong></span>
        </div>
        </div>
        </div>
        {/* Net Trajectory Pill in Emerald Green */}
        <div className="flex-shrink-0">
        <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
        <ArrowUpRight className="w-3.5 h-3.5"/>
        <span>+{t.netTrajectory}</span>
        </span>
        </div>
        </div>))}
    </div>
    </div>
    {/* Top 5 Fallers Column */}
    <div className="space-y-2">
    <div className="flex items-center justify-between pb-1 px-1">
    <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
    <TrendingDown className="w-3.5 h-3.5 text-rose-600"/>
    <span>Top 5 Fallers</span>
    </div>
    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
Drops
    </span>
    </div>
    <div className="space-y-1.5">
        {trajectoryLeaders.fallers.map((t, idx) => (<div key={`faller-${t.id}`} onClick={() => onSelectTeam(t)} className="p-2 sm:p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-rose-300 hover:shadow-xs transition cursor-pointer flex items-center justify-between group text-xs font-sans">
        <div className="flex items-center space-x-2 min-w-0 pr-2">
        <span className="text-xs font-bold text-slate-400 w-3.5 text-center flex-shrink-0">
#{idx + 1}
        </span>
        {/* Country Vector Flag */}
        <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
        {/* Club Color Badge */}
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-slate-200" style={{ backgroundColor: t.hex }} title={`Color: ${t.hex}`}/>
        {/* Club Name & Finishes */}
        <div className="min-w-0">
        <div className="font-bold text-slate-900 truncate group-hover:text-rose-700 transition flex items-center space-x-1">
        <span>{t.shortName}</span>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
        <span>{trajectoryLeaders.startPrefix}: <strong className="text-slate-700 font-semibold">#{t.prevRank}</strong></span>
        <span className="text-slate-300">→</span>
        <span>{trajectoryLeaders.endPrefix}: <strong className="text-slate-900 font-bold">#{t.endRank}</strong></span>
        </div>
        </div>
        </div>
        {/* Net Trajectory Pill in Rose Red */}
        <div className="flex-shrink-0">
        <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
        <ArrowDownRight className="w-3.5 h-3.5"/>
        <span>{t.netTrajectory}</span>
        </span>
        </div>
        </div>))}
    </div>
    </div>
    </div>
    </div>
    </div>
    {/* Right Column: Yo-Yo Clubs + Favorite Rank */}
    <div className="space-y-6 flex flex-col font-sans">
    {/* Yo-Yo Clubs */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-sm font-sans">
    <div className="flex items-center justify-between mb-3">
    <div className="flex items-center space-x-2">
    <span className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
    <Flame className="w-4 h-4"/>
    </span>
    <div>
    <h3 className="font-bold text-slate-900 text-sm font-sans">YO-YO CLUBS</h3>
    <p className="text-[11px] text-slate-500 font-sans">Promoted then relegated in successive seasons, or the reverse. Most yo-yos first.</p>
    </div>
    </div>
    </div>
    <div className="overflow-x-auto">
    <table className="w-full text-xs text-left font-sans">
    <thead>
    <tr className="border-b border-slate-100 text-slate-400 font-medium font-sans text-[11px]">
    <th className="py-1.5 px-2">Club</th>
    <th className="py-1.5 px-2 text-center">Yo-yos</th>
    <th className="py-1.5 px-2 text-center">Promoted</th>
    <th className="py-1.5 px-2 text-center">Relegated</th>
    <th className="py-1.5 px-2 text-center">Peak</th>
    <th className="py-1.5 px-2 text-center">Low</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-50 font-sans">
        {yoyoClubs.map(t => (<tr key={t.id} onClick={() => onSelectTeam(t)} className="hover:bg-slate-50 cursor-pointer transition group">
        <td className="py-1.5 px-2 flex items-center space-x-2">
        <span className="shrink-0 inline-flex"><SvgFlag code={t.countryCode} width={20} height={14}/></span>
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.hex }}/>
        <span className="font-semibold text-slate-900 font-sans group-hover:text-teal-800 transition">
        {phone ? t.abbr : t.shortName}
        </span>
        </td>
        <td className="py-1.5 px-2 text-center font-sans font-bold text-amber-600">
        {t.bounces}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-emerald-600 font-semibold">
        {t.pCount}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-rose-600 font-semibold">
        {t.rCount}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-slate-700">
#{t.highRank}
        </td>
        <td className="py-1.5 px-2 text-center font-sans text-slate-700">
#{t.lowRank}
        </td>
        </tr>))}
    </tbody>
    </table>
    </div>
    </div>
    {/* Favorite Rank */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-sm font-sans">
    <div className="flex items-center justify-between mb-3">
    <div className="flex items-center space-x-2">
    <span className="p-1.5 bg-teal-50 text-teal-800 rounded-lg">
    <Sparkles className="w-4 h-4"/>
    </span>
    <div>
    <h3 className="font-bold text-slate-900 text-sm font-sans">FAVORITE RANK</h3>
    <p className="text-[11px] text-slate-500 font-sans">Clubs finishing at the exact same position season after season</p>
    </div>
    </div>
    </div>
    <div className="space-y-1.5 font-sans">
        {favoriteRanks.map((fav, idx) => (<div key={idx} onClick={() => onSelectTeam(fav.team)} className="p-2 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-sans hover:bg-white hover:border-teal-200 transition cursor-pointer">
        <div className="flex items-center space-x-2 font-sans">
        <span className="text-xs font-sans text-slate-400 font-semibold w-4">#{idx + 1}</span>
        <span className="shrink-0 inline-flex"><SvgFlag code={fav.countryCode} width={20} height={14}/></span>
        <div>
        <span className="font-bold text-slate-900 font-sans">{fav.club}</span>
        </div>
        </div>
        <div className="flex items-center space-x-3 font-sans">
        <div className="text-right font-sans">
        <div className="font-bold font-sans text-teal-800 text-xs">
Rank #{fav.rank}
        </div>
        <div className="text-[11px] text-slate-500 font-sans">
        {fav.count} times ({fav.streak} streak)
        </div>
        </div>
        </div>
        </div>))}
    </div>
    </div>
    </div>
    </div>
    </div>);
}
// ------------------------------------------------------------------------------------------------
// TAB 4: TROPHIES & TITLES CABINET
// ------------------------------------------------------------------------------------------------
// Trophy symbols (as used in the sheet): 🌕 Div 1, 🥇 Div 2, 🥈 Div 3,
// 🥉 Div 4, 🏆 FA Cup / Carabao Cup, 🛡️ Community Shield / Super Cup,
// 🔵 UCL, 🟠 UEL, 🟢 UECL.
const TROPHY_COLUMNS = [
    { key: 'div1Wins', label: 'Div 1', sym: '🌕', group: 'league' },
    { key: 'div2Wins', label: 'Div 2', sym: '🥇', group: 'league' },
    { key: 'div3Wins', label: 'Div 3', sym: '🥈', group: 'league' },
    { key: 'div4Wins', label: 'Div 4', sym: '🥉', group: 'league' },
    { key: 'faCup', label: 'FA Cup', sym: '🏆', group: 'domestic' },
    { key: 'carabao', label: 'Carabao', sym: '🏆', group: 'domestic' },
    { key: 'communityShield', label: 'Shield', sym: '🛡️', group: 'domestic' },
    { key: 'ucl', label: 'UCL', sym: '🔵', group: 'continental' },
    { key: 'uel', label: 'UEL', sym: '🟠', group: 'continental' },
    { key: 'uecl', label: 'UECL', sym: '🟢', group: 'continental' },
    { key: 'superCup', label: 'Super Cup', sym: '🛡️', group: 'continental' },
];
const TROPHY_GROUPS = [
    { value: 'all', label: 'All' },
    { value: 'league', label: 'League' },
    { value: 'domestic', label: 'Domestic cups' },
    { value: 'continental', label: 'Continental' },
];
// Roll of Honour rows: league titles come from the Pyramid (the club that
// finished top of each division); cups from the Winners tab.
const HONOUR_ROWS = [
    { key: 'd1', label: 'Division 1', sym: '🌕', group: 'league', div: 1 },
    { key: 'd2', label: 'Division 2', sym: '🥇', group: 'league', div: 2 },
    { key: 'd3', label: 'Division 3', sym: '🥈', group: 'league', div: 3 },
    { key: 'd4', label: 'Division 4', sym: '🥉', group: 'league', div: 4 },
    { key: 'fa', label: 'FA Cup', sym: '🏆', group: 'domestic' },
    { key: 'carabao', label: 'Carabao Cup', sym: '🏆', group: 'domestic' },
    { key: 'cs', label: 'Community Shield', sym: '🛡️', group: 'domestic' },
    { key: 'ucl', label: 'Champions League', sym: '🔵', group: 'continental' },
    { key: 'uel', label: 'Europa League', sym: '🟠', group: 'continental' },
    { key: 'uecl', label: 'Conference League', sym: '🟢', group: 'continental' },
    { key: 'sc', label: 'Super Cup', sym: '🛡️', group: 'continental' },
];

function seasonTrophies(team, s, winners) {
    const out = [];
    const ss = team.seasons[s - 1];
    if (ss && ss.rank != null && ss.div && ss.rank === divRange(ss.div)[0]) {
        const row = HONOUR_ROWS.find((r) => r.div === ss.div);
        if (row) out.push({ sym: row.sym, label: `${row.label} champions` });
    }
    const norm = (x) => String(x || '').replace('✦', '').trim().toUpperCase();
    const w = winners[s] || {};
    HONOUR_ROWS.filter((r) => !r.div).forEach((r) => {
        const win = w[r.key];
        if (win && (norm(win.name) === norm(team.shortName) || norm(win.name) === norm(team.name))) out.push({ sym: r.sym, label: r.label });
    });
    return out;
}
function TrophiesTab({ teams, winners = {}, onSelectTeam }) {
    const [group, setGroup] = useState('all');
    const [view, setView] = useState('table');
    const seasonNums = seasonNumsOf(teams);
    const cols = TROPHY_COLUMNS.filter(c => group === 'all' || c.group === group);
    const totalOf = (t) => cols.reduce((a, c) => a + (t[c.key] || 0), 0);
    const rows = useMemo(() => teams.filter(t => totalOf(t) > 0).sort((a, b) => totalOf(b) - totalOf(a) || b.totalTrophies - a.totalTrophies || a.curRank - b.curRank), [teams, group]);
    const all = teams.reduce((a, t) => a + t.totalTrophies, 0);
    const top = [...teams].sort((a, b) => b.totalTrophies - a.totalTrophies || a.curRank - b.curRank)[0];
    const clubsWith = teams.filter(t => t.totalTrophies > 0).length;
    const norm = (x) => String(x || '').replace('✦', '').trim().toUpperCase();
    const findTeam = (name) => teams.find(t => norm(t.shortName) === norm(name) || norm(t.name) === norm(name));
    // One winner: club, flag, and a corner tag (Pyramid club: its division
    // and finish that season; club from outside the Pyramid: its league code)
    const honourCell = (row, s) => {
        const pyramidTag = (t) => {
            const ss = t.seasons[s - 1];
            return ss && ss.rank != null ? { text: `D${ss.div} · ${ss.rank}`, div: ss.div } : null;
        };
        if (row.div) {
            const t = teams.find(x => x.seasons[s - 1] && x.seasons[s - 1].rank === divRange(row.div)[0]);
            return t ? { team: t, name: t.shortName, code: t.countryCode, tag: pyramidTag(t) } : null;
        }
        const w = winners[s] && winners[s][row.key];
        if (!w) return null;
        const t = findTeam(w.name);
        if (t) return { team: t, name: t.shortName, code: t.countryCode, tag: pyramidTag(t) };
        const code = w.rank != null && isNaN(Number(w.rank)) ? String(w.rank).trim() : null;
        return { team: null, name: w.name, code: flagKey(w.flag), tag: code ? { text: code, div: null } : null };
    };
    const honourRows = HONOUR_ROWS.filter(r => group === 'all' || r.group === group);
    return (<div className="space-y-6 font-sans">
    <HighlightsBar accent="teal" columns={4}>
    <HighlightCard label="Trophies won" icon={Trophy} iconClassName="text-amber-300" value={all} valueClassName="text-2xl sm:text-3xl font-black text-amber-200" left="By Pyramid clubs" right=""/>
    <HighlightCard label="Most decorated" icon={Crown} iconClassName="text-amber-300" value={top ? top.shortName : '–'} valueClassName="text-lg sm:text-xl font-black text-white truncate" left={top ? `${top.totalTrophies} trophies` : ''} right=""/>
    <HighlightCard label="Clubs with silverware" icon={Users} iconClassName="text-sky-300" value={clubsWith} valueClassName="text-2xl sm:text-3xl font-black text-sky-200" left={`of ${TOTAL_CLUBS}`} right=""/>
    <HighlightCard label="Seasons" icon={Calendar} iconClassName="text-teal-300" value={seasonNums.length} valueClassName="text-2xl sm:text-3xl font-black text-white" left="Completed" right=""/>
    </HighlightsBar>

    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-slate-100 pb-4">
    <div className="flex items-center space-x-2">
    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700"><Trophy className="w-5 h-5"/></div>
    <div>
    <h3 className="text-lg font-extrabold text-slate-900">Trophy Cabinet</h3>
    <p className="text-xs text-slate-600 mt-0.5">Every trophy won by a Pyramid club: counts by club, or who won what each season.</p>
    </div>
    </div>
    <Segmented className="self-start lg:self-auto" value={view} onChange={setView} options={[{ value: 'table', label: 'By Club' }, { value: 'honours', label: 'Roll of Honour' }]}/>
    </div>
    <div className="space-y-1.5 min-w-0 max-w-full flex flex-col">
    <ControlLabel accent="teal" icon={Filter}>Trophies</ControlLabel>
    <FilterPills accent="teal" value={group} onChange={setGroup} options={TROPHY_GROUPS}/>
    </div>

    {/* v24: the table scrolls inside its own box (up to 75% of the screen) so its header stays pinned */}
    {view === 'table' ? (<div className="overflow-auto max-h-[75vh] rounded-lg">
    <table className="w-full text-xs">
    <thead>
    <tr className="border-b border-slate-200 text-slate-600 font-bold">
    <th className="py-2 px-3 text-left sticky top-0 z-10 bg-slate-50">Club</th>
        {cols.map(c => (<th key={c.key} className="py-2 px-1.5 text-center whitespace-nowrap sticky top-0 z-10 bg-slate-50" title={c.label}><div className="text-sm leading-none">{c.sym}</div><div className="text-[11px] mt-1">{c.label}</div></th>))}
    <th className="py-2 px-3 text-center">Total</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
        {rows.map(t => (<tr key={t.id} onClick={() => onSelectTeam(t)} className={`cursor-pointer ${t.isMine ? 'bg-teal-50/50 hover:bg-teal-50' : 'hover:bg-slate-50'}`}>
        <td className="py-1.5 px-3"><span className="inline-flex items-center gap-2 font-bold text-slate-900 whitespace-nowrap"><SvgFlag code={t.countryCode} width={20} height={14}/><span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.hex }}/>{t.name}</span></td>
            {cols.map(c => <td key={c.key} className={`py-1.5 px-1.5 text-center tabular-nums ${t[c.key] ? 'font-black text-slate-900' : 'text-slate-300'}`}>{t[c.key] || '·'}</td>)}
        <td className="py-1.5 px-3 text-center font-black tabular-nums text-amber-700">{totalOf(t)}</td>
        </tr>))}
    </tbody>
    </table>
    {!rows.length && <div className="p-6 text-center text-xs text-slate-500">No trophies in this group yet.</div>}
    </div>) : (<div className="overflow-x-auto">
    {/* Roll of Honour: seasons down, trophies across */}
    <table className="w-full text-xs border-separate" style={{ borderSpacing: '6px' }}>
    <thead>
    <tr className="text-slate-600 font-bold">
    <th className="py-1 px-1 text-left w-10"/>
        {honourRows.map(row => (<th key={row.key} className="py-1 px-1 text-center align-bottom min-w-[118px]">
        <div className="text-base leading-none">{row.sym}</div>
        <div className="text-[11px] mt-1 whitespace-nowrap">{row.label}</div>
        </th>))}
    </tr>
    </thead>
    <tbody>
        {seasonNums.map(sn => (<tr key={sn}>
        <td className="px-1 text-center font-black text-slate-500 align-middle">S{sn}</td>
            {honourRows.map(row => {
                const c = honourCell(row, sn);
                if (!c) return (<td key={row.key} className="p-0 align-top"><div className="h-[62px] rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-300" title="Not recorded">–</div></td>);
                const mine = c.team && c.team.isMine;
                const outside = !c.team;
                const tagStyle = c.tag && c.tag.div ? { backgroundColor: (DIVISIONS[c.tag.div] || DIVISIONS[4]).badgeBg, color: (DIVISIONS[c.tag.div] || DIVISIONS[4]).badgeText } : { backgroundColor: '#f1f5f9', color: '#64748b' };
                return (<td key={row.key} className="p-0 align-top">
                <div onClick={() => c.team && onSelectTeam(c.team)} title={outside ? `${c.name} (outside the Pyramid)` : c.team.name} className={`relative h-[62px] rounded-lg border bg-white px-2 pt-2 pb-1.5 flex flex-col justify-end gap-1 transition ${outside ? 'border-slate-200' : 'cursor-pointer hover:shadow-md hover:-translate-y-px'} ${mine ? 'ring-2 ring-teal-400 border-teal-300 bg-teal-50/40' : 'border-slate-200'}`} style={!outside ? { borderTop: `4px solid ${c.team.hex}` } : undefined}>
                {c.tag && <span className="absolute top-1.5 right-1.5 text-[9.5px] font-extrabold px-1 rounded tabular-nums" style={tagStyle}>{c.tag.text}</span>}
                <span className={`inline-flex rounded-sm overflow-hidden ring-1 ring-slate-300 self-start ${outside ? 'grayscale opacity-60' : ''}`}><SvgFlag code={c.code} width={22} height={16}/></span>
                <span className={`text-[11px] leading-tight font-extrabold truncate ${outside ? 'text-slate-400' : mine ? 'text-teal-900' : 'text-slate-900'}`}>{c.name}</span>
                </div>
                </td>);
            })}
        </tr>))}
    </tbody>
    </table>
    <p className="text-[11px] text-slate-500 mt-1">Corner: division and finish that season. Greyed: winners from outside the Pyramid (corner shows their league code; their trophies aren't in the club counts). "–": not recorded in the Winners tab.</p>
    </div>)}
    </div>
    </div>);
}
// ------------------------------------------------------------------------------------------------
// TAB 5: HEAD-TO-HEAD COMPARISON
// ------------------------------------------------------------------------------------------------
function HeadToHeadTab({ teams, winners = {}, teamA, teamB, setTeamA, setTeamB }) {
    const hv = useHover(); // v26: trophy columns open a card (light style)
    // Head to head for a pyramid: every season both clubs finish somewhere,
    // so the rivalry is "who finished above whom", plus the records side by side.
    const seasonNums = seasonNumsOf(teams);
    const chartRef = useRef(null);
    const [w, setW] = useState(900);
    useEffect(() => {
        const m = () => { if (chartRef.current && chartRef.current.clientWidth) setW(chartRef.current.clientWidth); };
        m();
        if (typeof window === 'undefined') return undefined;
        window.addEventListener('resize', m);
        return () => window.removeEventListener('resize', m);
    }, [teamA, teamB]);
    // Club lists for the pickers (the other side's club left out)
    const clubItems = (other) => [...teams].filter(t => !other || t.id !== other.id).sort((x, y) => x.name.localeCompare(y.name)).map(t => ({ value: t.id, label: t.name, code: t.countryCode, meta: t.curRank }));
    if (!teamA || !teamB) return (<div className="p-6 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-xl">Pick two clubs to compare.</div>);
    const A = teamA, B = teamB;
    // Rivals for A: closest average finish
    const rivals = teams.filter(t => t.id !== A.id).sort((x, y) => Math.abs(x.avgRank - A.avgRank) - Math.abs(y.avgRank - A.avgRank)).slice(0, 5);
    // Season duel
    const duel = seasonNums.map(s => {
        const a = A.seasons[s - 1], b = B.seasons[s - 1];
        const ra = a && a.rank, rb = b && b.rank;
        return { s, ra, rb, da: a && a.div, db: b && b.div, winner: ra == null || rb == null ? null : ra < rb ? 'A' : rb < ra ? 'B' : null };
    });
    const aAbove = duel.filter(d => d.winner === 'A').length, bAbove = duel.filter(d => d.winner === 'B').length;
    const sameDiv = duel.filter(d => d.da && d.da === d.db).length;
    const streak = (() => {
        let who = null, len = 0;
        for (let i = duel.length - 1; i >= 0; i--) {
            if (!duel[i].winner) break;
            if (who === null) who = duel[i].winner;
            if (duel[i].winner !== who) break;
            len++;
        }
        return { who, len };
    })();
    const euro = (t) => t.seasons.filter(s => EURO_COMPS.includes(s.tag)).length;
    const moves = (t, m) => t.seasons.filter(s => s.move === m).length;
    const top4 = (t) => t.seasons.filter(s => s.rank != null && s.rank <= 4).length;
    // Stat duel: lower = better for ranks
    const stats = [
        { label: 'Current finish', a: A.curRank, b: B.curRank, lower: true },
        { label: 'Average finish', a: A.avgRank, b: B.avgRank, lower: true, digits: 1 },
        { label: 'Peak', a: A.highRank, b: B.highRank, lower: true },
        { label: 'Low', a: A.lowRank, b: B.lowRank, lower: true },
        { label: 'Top 4 finishes', a: top4(A), b: top4(B) },
        { label: 'Trophies', a: A.totalTrophies, b: B.totalTrophies },
        { label: 'League titles', a: A.divWinsTot, b: B.divWinsTot },
        { label: 'Domestic cups', a: A.faCup + A.carabao + A.communityShield, b: B.faCup + B.carabao + B.communityShield },
        { label: 'Continental trophies', a: A.ucl + A.uel + A.uecl + A.superCup, b: B.ucl + B.uel + B.uecl + B.superCup },
        { label: 'European qualifications', a: euro(A), b: euro(B) },
        { label: 'Promotions', a: moves(A, 'P'), b: moves(B, 'P') },
        { label: 'Relegations', a: moves(A, 'R'), b: moves(B, 'R'), lower: true },
    ];
    const aWinsStats = stats.filter(x => (x.lower ? x.a < x.b : x.a > x.b)).length;
    const bWinsStats = stats.filter(x => (x.lower ? x.b < x.a : x.b > x.a)).length;
    // Chart
    const H = 300, m = { t: 26, r: 24, b: 22, l: 36 };
    const pw = Math.max(200, w - m.l - m.r), ph = H - m.t - m.b;
    const allRanks = [...A.seasons, ...B.seasons].map(s => s.rank).filter(r => r != null);
    const lo = Math.max(1, Math.min(...allRanks) - 2), hi = Math.min(TOTAL_CLUBS, Math.max(...allRanks) + 2);
    const x = (s) => m.l + (seasonNums.length > 1 ? (s - 1) / (seasonNums.length - 1) : 0.5) * pw;
    const y = (r) => m.t + ((r - lo) / Math.max(1, hi - lo)) * ph;
    const path = (t) => t.seasons.filter(s => s.rank != null).map((s, i) => `${i ? 'L' : 'M'} ${x(s.season)} ${y(s.rank)}`).join(' ');
    const colA = A.hex, colB = A.hex.toLowerCase() === B.hex.toLowerCase() ? '#64748b' : B.hex;
    const Side = ({ t, color }) => (<div className="flex items-center gap-2 min-w-0">
        <SvgFlag code={t.countryCode} width={26} height={18}/>
        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }}/>
        <span className="font-black text-slate-900 truncate">{t.name}</span>
    </div>);
    return (<div className="space-y-5 font-sans">
    {/* Pick the clubs */}
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
    <div className="flex flex-wrap items-end gap-3">
    <div className="space-y-1.5 flex flex-col"><ControlLabel accent="teal" icon={Users}>Club A</ControlLabel><ClubSelect accent="teal" items={clubItems(B)} value={A.id} onChange={(id) => setTeamA(teams.find(t => t.id === id))} placeholder="Search club or code..."/></div>
    <button onClick={() => { setTeamA(B); setTeamB(A); }} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700" title="Swap">⇄ Swap</button>
    <div className="space-y-1.5 flex flex-col"><ControlLabel accent="teal" icon={Users}>Club B</ControlLabel><ClubSelect accent="teal" items={clubItems(A)} value={B.id} onChange={(id) => setTeamB(teams.find(t => t.id === id))} placeholder="Search club or code..."/></div>
    </div>
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
    <span className="font-semibold text-slate-500">Closest rivals to {A.shortName}:</span>
        {rivals.map(t => (<button key={t.id} onClick={() => setTeamB(t)} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-bold ${t.id === B.id ? 'bg-teal-700 border-teal-700 text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
        <SvgFlag code={t.countryCode} width={14} height={10}/>{t.shortName}<span className="opacity-60 font-semibold">avg {t.avgRank.toFixed(1)}</span>
        </button>))}
    </div>
    </div>

    {/* Verdict */}
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
    {/* v24 phones: both clubs on one row, the score underneath (the left name was squeezed out) */}
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
    <div className="min-w-0"><Side t={A} color={colA}/></div>
    <div className="text-center col-span-2 order-last sm:order-none sm:col-span-1">
    <div className="text-4xl font-black tabular-nums text-slate-900">{aAbove} <span className="text-slate-300">–</span> {bAbove}</div>
    <div className="text-[11px] font-semibold text-slate-500">seasons finished above the other</div>
    </div>
    <div className="justify-self-end min-w-0"><Side t={B} color={colB}/></div>
    </div>
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-3 text-xs text-slate-600">
    <span>Same division in <strong className="text-slate-900">{sameDiv}</strong> of {seasonNums.length} seasons</span>
    {streak.len > 0 && <span>Current run: <strong className="text-slate-900">{(streak.who === 'A' ? A : B).shortName}</strong> above for <strong className="text-slate-900">{streak.len}</strong> season{streak.len === 1 ? '' : 's'}</span>}
    <span>Stat duel: <strong className="text-slate-900">{aWinsStats} – {bWinsStats}</strong></span>
    </div>
    </div>

    {/* Finishes over time, with trophies won each season underneath */}
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
    <h3 className="text-sm font-extrabold text-slate-900 mb-2">Finishes Over Time</h3>
    <div ref={chartRef} className="w-full">
    <svg width={w} height={H} className="block">
        {divBoundaryRanks().filter(r => r > lo && r < hi).map((r) => (<line key={r} x1={m.l} x2={m.l + pw} y1={y(r + 0.5)} y2={y(r + 0.5)} stroke={(DIVISIONS[DIV_STARTS.findIndex(sv => sv > r)] || DIVISIONS[4]).color} strokeDasharray="4 3" opacity="0.4"/>))}
        {seasonNums.map(s => <line key={`g${s}`} x1={x(s)} x2={x(s)} y1={m.t} y2={m.t + ph} stroke="#f1f5f9"/>)}
        {[lo, hi].map(r => <text key={r} x={m.l - 8} y={y(r)} dy="0.35em" textAnchor="end" className="text-[11px] font-semibold" fill="#94a3b8">{r}</text>)}
        {[[B, colB], [A, colA]].map(([t, c]) => (<path key={t.id} d={path(t)} fill="none" stroke={c} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>))}
        {duel.map(d => [[A, colA, d.ra, d.rb], [B, colB, d.rb, d.ra]].map(([t, c, mine, other]) => {
            if (mine == null) return null;
            // The club that finished higher gets its label above its point, the other below
            const above = other == null || mine < other;
            const cy = y(mine);
            return (<g key={`${t.id}-${d.s}`}>
            <circle cx={x(d.s)} cy={cy} r="4.5" fill={c} stroke="#ffffff" strokeWidth="1.5"/>
            <text x={x(d.s)} y={above ? cy - 10 : cy + 17} textAnchor="middle" className="text-[11px] font-black" fill="#0f172a" stroke="#ffffff" strokeWidth="3" paintOrder="stroke">{mine}</text>
            </g>);
        }))}
    </svg>
    </div>
    {/* Trophy strip: one row per club, aligned with the seasons */}
    <div className="mt-1 space-y-1">
        {/* v26: each season's trophies stack in its own column (up to 3, then +N); tap or hover for the list */}
        {[[A, colA], [B, colB]].map(([t, c]) => {
            const per = seasonNums.map(sn => seasonTrophies(t, sn, winners));
            const tallest = Math.max(1, ...per.map(tr => Math.min(3, tr.length) + (tr.length > 3 ? 1 : 0)));
            return (<div key={t.id} className="relative" style={{ height: Math.max(28, tallest * 18 + 6) }}>
            <span className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} title={t.name}/>
            {seasonNums.map((sn, k) => {
                const tr = per[k];
                if (!tr.length) return (<span key={sn} className="absolute top-1.5 -translate-x-1/2 text-[11px] text-slate-200" style={{ left: x(sn) }}>·</span>);
                return (<span key={sn} {...hv({ title: `${t.shortName} · S${sn}`, rows: tr.map(z => [z.sym, z.label]) })} className="absolute top-0.5 -translate-x-1/2 flex flex-col items-center gap-0.5 text-sm leading-none cursor-pointer" style={{ left: x(sn) }}>
                {tr.slice(0, 3).map((z, i) => <span key={i}>{z.sym}</span>)}
                {tr.length > 3 && <span className="text-[11px] font-bold text-slate-500">+{tr.length - 3}</span>}
                </span>);
            })}
            </div>);
        })}
    </div>
    <div className="relative h-4">
        {seasonNums.map(sn => <span key={sn} className="absolute -translate-x-1/2 text-[11px] font-semibold text-slate-500" style={{ left: x(sn) }}>S{sn}</span>)}
    </div>
    </div>

    {/* Stat duel */}
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
    <h3 className="text-sm font-extrabold text-slate-900 mb-2">Records Side By Side</h3>
    <div className="divide-y divide-slate-100">
        {stats.map(st => {
            const aBetter = st.lower ? st.a < st.b : st.a > st.b, bBetter = st.lower ? st.b < st.a : st.b > st.a;
            const fmt = (v) => (st.digits ? v.toFixed(st.digits) : v);
            return (<div key={st.label} className="grid grid-cols-[4rem_1fr_4rem] items-center py-1.5 text-xs">
            <span className={`text-left font-black tabular-nums ${aBetter ? 'text-teal-800' : 'text-slate-500'}`}>{aBetter && '● '}{fmt(st.a)}</span>
            <span className="text-center font-semibold text-slate-600">{st.label}</span>
            <span className={`text-right font-black tabular-nums ${bBetter ? 'text-teal-800' : 'text-slate-500'}`}>{fmt(st.b)}{bBetter && ' ●'}</span>
            </div>);
        })}
    </div>
    <p className="text-[11px] text-slate-400 mt-2">● the better side. For finishes and relegations, lower is better.</p>
    </div>

    </div>);
}

// ------------------------------------------------------------------------------------------------
function TeamDetailModal({ team, teams, onSelectTeam, onClose, onEdit, onFocusChart, onCompare }) {
    // Club viewer: identity, performance, trophy cabinet, Pyramid record and
    // season-by-season finishes. Movement is measured from the S1 finish
    // (the pre-S1 "start rank" is only the alphabetical seeding).
    const seasonNums = seasonNumsOf(teams);
    const divMeta = DIVISIONS[team.div] || DIVISIONS[4];
    const idx = teams.findIndex(t => t.id === team.id);
    const prevTeam = idx >= 0 && teams.length ? teams[(idx - 1 + teams.length) % teams.length] : null;
    const nextTeam = idx >= 0 && teams.length ? teams[(idx + 1) % teams.length] : null;
    const light = getContrastText(team.hex) === '#0f172a';
    const played = team.seasons.filter(s => s.rank != null);
    const s1Rank = played.length ? played[0].rank : null;
    const net = s1Rank != null ? s1Rank - team.curRank : 0;
    const stats = useMemo(() => {
        const divCounts = {};
        DIV_STARTS.forEach((_, i) => { divCounts[i + 1] = 0; });
        let promoted = 0, relegated = 0, top4 = 0, top10 = 0;
        const euro = { UCL: 0, UEL: 0, UECL: 0 };
        team.seasons.forEach(s => {
            if (s.div) divCounts[s.div] = (divCounts[s.div] || 0) + 1;
            if (s.move === 'P') promoted++;
            if (s.move === 'R') relegated++;
            if (euro[s.tag] != null) euro[s.tag]++;
            if (s.rank != null && s.rank <= 4) top4++;
            if (s.rank != null && s.rank <= 10) top10++;
        });
        return { divCounts, promoted, relegated, top4, top10, euro, euroTotal: euro.UCL + euro.UEL + euro.UECL };
    }, [team]);
    const n = seasonNums.length;
    const signed = (v, digits = 0) => (v > 0 ? `+${v.toFixed(digits)}` : v.toFixed(digits));
    const tone = (v) => (v > 0 ? 'text-emerald-700' : v < 0 ? 'text-rose-700' : 'text-slate-500');
    const cabinet = [
        { title: 'League Titles', total: team.divWinsTot, rows: [
            { sym: '🌕', label: 'Division 1', v: team.div1Wins }, { sym: '🥇', label: 'Division 2', v: team.div2Wins },
            { sym: '🥈', label: 'Division 3', v: team.div3Wins }, { sym: '🥉', label: 'Division 4', v: team.div4Wins },
        ], box: 'border-amber-200 bg-amber-50/40' },
        { title: 'Domestic Cups', total: team.faCup + team.carabao + team.communityShield, rows: [
            { sym: '🏆', label: 'FA Cup', v: team.faCup }, { sym: '🏆', label: 'Carabao Cup', v: team.carabao },
            { sym: '🛡️', label: 'Community Shield', v: team.communityShield },
        ], box: 'border-emerald-200 bg-emerald-50/30' },
        { title: 'Continental', total: team.ucl + team.uel + team.uecl + team.superCup, rows: [
            { sym: '🔵', label: 'Champions League', v: team.ucl }, { sym: '🟠', label: 'Europa League', v: team.uel },
            { sym: '🟢', label: 'Conference League', v: team.uecl }, { sym: '🛡️', label: 'Super Cup', v: team.superCup },
        ], box: 'border-blue-200 bg-blue-50/30' },
    ];
    const Kpi = ({ label, value, sub, cls = 'text-slate-900' }) => (<div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 text-center">
        <div className="text-[11px] font-semibold text-slate-500">{label}</div>
        <div className={`text-2xl font-black tabular-nums mt-0.5 ${cls}`}>{value}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
    </div>);
    const Row = ({ label, value, cls = 'text-slate-900' }) => (<div className="flex items-center justify-between py-1 text-xs">
        <span className="text-slate-600">{label}</span><span className={`font-bold tabular-nums ${cls}`}>{value}</span>
    </div>);
    return (<div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-6 font-sans" onClick={onClose}>
    <div className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:max-w-4xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
    {/* Banner in the club's colour */}
    <div className="px-5 sm:px-6 py-4 flex items-start justify-between gap-3" style={{ backgroundColor: team.hex }}>
    <div className="flex items-center gap-3 min-w-0">
    <span className="shrink-0 inline-flex rounded-md overflow-hidden ring-2 ring-white/70"><SvgFlag code={team.countryCode} width={42} height={30}/></span>
    <div className="min-w-0">
    <h2 className={`text-xl sm:text-2xl font-black tracking-tight truncate ${light ? 'text-slate-900' : 'text-white'}`}>{team.name}</h2>
    <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs font-bold">
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 text-slate-900"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: divMeta.color }}/>{divMeta.name} • Rank {team.curRank}</span>
    <span className="px-2 py-0.5 rounded-full bg-white/70 text-slate-800">{team.abbr}</span>
    <span className="px-2 py-0.5 rounded-full bg-white/70 text-slate-800">Start rating ★ {team.startRating.toFixed(1)}</span>
    </div>
    </div>
    </div>
    <div className="flex items-center gap-1.5 shrink-0">
    {prevTeam && <button onClick={() => onSelectTeam(prevTeam)} title={`Previous: ${prevTeam.name}`} className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800"><ChevronLeft className="w-4 h-4"/></button>}
    {nextTeam && <button onClick={() => onSelectTeam(nextTeam)} title={`Next: ${nextTeam.name}`} className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800"><ChevronRight className="w-4 h-4"/></button>}
    <button onClick={onClose} title="Close" className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800"><X className="w-4 h-4"/></button>
    </div>
    </div>

    <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
    {/* Performance */}
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
    <Kpi label="Current" value={team.curRank} sub={divMeta.name}/>
    <Kpi label="Average" value={team.avgRank.toFixed(1)} sub={`Over ${n} season${n === 1 ? '' : 's'}`}/>
    <Kpi label="Peak" value={team.highRank} sub="Best finish" cls="text-emerald-700"/>
    <Kpi label="Low" value={team.lowRank} sub="Worst finish" cls="text-rose-700"/>
    <Kpi label="Net trajectory" value={net === 0 ? '–' : `${net > 0 ? '▲' : '▼'} ${Math.abs(net)}`} sub={s1Rank != null ? `Since S1 finish (${s1Rank})` : 'No finishes yet'} cls={tone(net)}/>
    </div>

    {/* Trophy cabinet */}
    <div className="space-y-2.5">
    <div className="flex items-center justify-between">
    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-600"/>Trophy Cabinet</h3>
    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900">{team.totalTrophies} {team.totalTrophies === 1 ? 'trophy' : 'trophies'}</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {cabinet.map(c => (<div key={c.title} className={`p-3.5 rounded-xl border ${c.box}`}>
        <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-slate-200/70">
        <span className="text-xs font-extrabold text-slate-900">{c.title}</span>
        <span className="text-sm font-black tabular-nums text-slate-900">{c.total}</span>
        </div>
        {c.rows.map(r => (<div key={r.label} className={`flex items-center justify-between py-0.5 text-xs ${r.v ? '' : 'opacity-40'}`}>
            <span className="flex items-center gap-1.5"><span className="w-4 text-center">{r.sym}</span>{r.label}</span>
            <span className="font-bold tabular-nums">{r.v}</span>
            </div>))}
        </div>))}
    </div>
    </div>

    {/* Pyramid record */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
    <div className="p-3.5 rounded-xl border border-slate-200">
    <div className="text-xs font-extrabold text-slate-900 mb-1 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-teal-700"/>Seasons by division</div>
        {Object.keys(stats.divCounts).map(Number).map(d => (<div key={d} className="flex items-center justify-between py-1 text-xs">
        <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: (DIVISIONS[d] || DIVISIONS[4]).color }}/>Div {d} ({divRange(d).join('–')})</span>
        <span className="font-bold tabular-nums text-slate-900">{stats.divCounts[d]}</span>
        </div>))}
    </div>
    <div className="p-3.5 rounded-xl border border-slate-200">
    <div className="text-xs font-extrabold text-slate-900 mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-teal-700"/>Movement</div>
    <Row label="Promotions" value={stats.promoted} cls={stats.promoted ? 'text-emerald-700' : 'text-slate-400'}/>
    <Row label="Relegations" value={stats.relegated} cls={stats.relegated ? 'text-rose-700' : 'text-slate-400'}/>
    <Row label="Yo-yos" value={team.bounces} cls={team.bounces ? 'text-amber-700' : 'text-slate-400'}/>
    <Row label="Rank range" value={`${team.highRank}–${team.lowRank}`}/>
    <Row label="Avg change per season" value={signed(team.changeAvg, 2)} cls={tone(team.changeAvg)}/>
    </div>
    <div className="p-3.5 rounded-xl border border-slate-200">
    <div className="text-xs font-extrabold text-slate-900 mb-1 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-teal-700"/>Europe & milestones</div>
    <Row label="European qualifications" value={stats.euroTotal}/>
    <div className="flex gap-1 pb-1">
        {['UCL', 'UEL', 'UECL'].map(k => (<span key={k} className="text-[11px] font-extrabold px-1.5 rounded border" style={{ backgroundColor: TAG_CONFIG[k].bg, color: TAG_CONFIG[k].color, borderColor: TAG_CONFIG[k].border }}>{k} {stats.euro[k]}</span>))}
    </div>
    <Row label="Top 4 finishes" value={`${stats.top4} / ${n}`}/>
    <Row label="Top 10 finishes" value={`${stats.top10} / ${n}`}/>
    <Row label="Drop from peak" value={team.dropFromHigh ? `▼ ${Math.abs(team.dropFromHigh)}` : '–'} cls={team.dropFromHigh ? 'text-rose-700' : 'text-slate-400'}/>
    </div>
    </div>

    {/* Season by season: fixed rows (rank, movement, division, labels) so they line up */}
    <div className="space-y-2.5">
    <h3 className="text-sm font-extrabold text-slate-900">Historical Finishes</h3>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(1, Math.min(n, 10))}, minmax(0, 1fr))` }}>
        {team.seasons.map((s, i) => {
            const st = DIVISIONS[s.div] || DIVISIONS[4];
            const labels = [];
            if (EURO_COMPS.includes(s.tag)) labels.push({ k: s.tag, text: s.tag, style: { backgroundColor: TAG_CONFIG[s.tag].bg, color: TAG_CONFIG[s.tag].color, borderColor: TAG_CONFIG[s.tag].border } });
            if (s.move === 'P') labels.push({ k: 'P', text: 'P', style: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' } });
            if (s.move === 'R') labels.push({ k: 'R', text: 'R', style: { backgroundColor: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' } });
            return (<div key={s.season} className="rounded-xl border border-slate-200 bg-slate-50/50 px-1.5 py-2 text-center">
            <div className="text-[11px] font-bold text-slate-500">S{s.season}</div>
            <div className="h-8 flex items-center justify-center text-xl font-black tabular-nums text-slate-900">{s.rank ?? '–'}</div>
            {/* movement (none in S1: movement starts in S2) */}
            <div className={`h-5 flex items-center justify-center text-xs font-black tabular-nums ${tone(s.change || 0)}`}>
                {i > 0 && s.change != null ? (s.change > 0 ? `▲ ${s.change}` : s.change < 0 ? `▼ ${Math.abs(s.change)}` : '–') : ''}
            </div>
            <div className="h-6 flex items-center justify-center">
                {s.div && <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded" style={{ backgroundColor: st.badgeBg, color: st.badgeText }}>Div {s.div}</span>}
            </div>
            <div className="h-6 flex items-center justify-center gap-1">
                {labels.map(l => <span key={l.k} className="text-[11px] font-extrabold px-1.5 py-0.5 rounded border" style={l.style}>{l.text}</span>)}
            </div>
            </div>);
        })}
    </div>
    </div>
    </div>

    <div className="px-5 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-end gap-2">
    {onEdit && <button onClick={() => { onClose(); onEdit(); }} className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl">Edit Club</button>}
    <button onClick={() => { onClose(); onFocusChart(); }} className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl">Highlight on Chart</button>
    <button onClick={() => { onClose(); onCompare(); }} className="px-3.5 py-2 text-xs font-semibold text-white rounded-xl" style={{ backgroundColor: PYRAMID_ACCENT }}>Head to Head</button>
    </div>
    </div>
    </div>);
}

function EditTeamModal({ team, onClose, onSave }) {
    return (<div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-150 font-sans">
    <div className="bg-white w-full h-[100dvh] sm:h-auto overflow-y-auto sm:rounded-2xl sm:max-w-md p-6 shadow-2xl border border-slate-200 relative font-sans">
    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg">
    <X className="w-5 h-5"/>
    </button>
    <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-sans">
    <Edit2 className="w-4 h-4 text-teal-700"/>
    <h3 className="font-bold text-slate-900 text-base font-sans">Edit Club Metadata</h3>
    </div>
    <form onSubmit={onSave} className="space-y-3.5 mt-4 text-xs font-sans">
    <div>
    <label className="block font-semibold text-slate-700 mb-1 font-sans">Full Team Name</label>
    <input type="text" name="name" defaultValue={team.name} required className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-teal-600 focus:outline-none font-sans"/>
    </div>
    <div className="grid grid-cols-2 gap-3 font-sans">
    <div>
    <label className="block font-semibold text-slate-700 mb-1 font-sans">Short Name</label>
    <input type="text" name="shortName" defaultValue={team.shortName} required className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-teal-600 focus:outline-none font-sans"/>
    </div>
    <div>
    <label className="block font-semibold text-slate-700 mb-1 font-sans">Abbreviation (3-4 char)</label>
    <input type="text" name="abbr" defaultValue={team.abbr} maxLength="5" required className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-teal-600 focus:outline-none font-sans uppercase font-semibold"/>
    </div>
    </div>
    <div className="grid grid-cols-2 gap-3 font-sans">
    <div>
    <label className="block font-semibold text-slate-700 mb-1 font-sans">Color Code (Hex)</label>
    <div className="flex items-center space-x-2">
    <input type="color" defaultValue={team.hex} onChange={(e) => {
            const textInput = document.getElementById('hexTextInput');
            if (textInput)
                textInput.value = e.target.value;
        }} className="w-8 h-8 rounded border border-slate-200 p-0.5 cursor-pointer"/>
    <input id="hexTextInput" type="text" name="hex" defaultValue={team.hex} required className="w-full p-2 border border-slate-200 rounded-lg font-sans focus:ring-1 focus:ring-teal-600 focus:outline-none font-semibold"/>
    </div>
    </div>
    <div>
    <label className="block font-semibold text-slate-700 mb-1 font-sans">Start Rating (Stars)</label>
    <input type="number" step="0.5" min="1" max="5" name="rating" defaultValue={team.startRating} className="w-full p-2 border border-slate-200 rounded-lg font-sans focus:ring-1 focus:ring-teal-600 focus:outline-none"/>
    </div>
    </div>
    <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2 font-sans">
    <button type="button" onClick={onClose} className="px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition font-sans">
Cancel
    </button>
    <button type="submit" className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-sm transition font-sans">
Save & Sync Changes
    </button>
    </div>
    </form>
    </div>
    </div>);
}

export default function PyramidSection(props) {
    return <HoverProvider light><App {...props} /></HoverProvider>;
}
