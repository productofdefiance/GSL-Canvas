// Every page and tab the kit renders (render.js, empty.js), and the state key that opens each tab.
const TABS = {
  league: ['overview', 'fixtures', 'clubs', 'race', 'analytics', 'homeaway', 'spider'],
  cups: ['campaigns', 'finals', 'eliminations', 'form', 'rivalries', 'leagues', 'competitions', 'timeline', 'lab'],
  pyramid: ['progression', 'standings', 'analytics', 'trophies', 'h2h'],
  squad: ['squad', 'roster', 'depth', 'development', 'contracts', 'transfers', 'former', 'interactions', 'labs'],
};
const PAGEKEY = { league: 'League:activeTab', cups: 'Cups:activeTab', pyramid: 'Pyramid:activeTab', squad: 'Squad:activeTab' };
module.exports = { TABS, PAGEKEY };
