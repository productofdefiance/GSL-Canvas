// Every club name the sheet knows (v51.22), from the club directory ("GSL Clubs" in src/sheetData.js):
// abbreviation (col 18), short, medium and full name (19–21) and the TEAM name (22).
// Used by rules.js (no club name typed into code) and empty.js (no club name on an empty save).
// Needs build.js to have run (it reads out/sheetData.js).
const path = require('path');

function clubNames() {
  const { sheetData } = require(path.join(__dirname, 'out/sheetData.js'));
  const rows = (sheetData['GSL Clubs'] || []).filter((r) => r.index_ >= 5);
  const abbrs = new Set(), names = new Set();
  for (const r of rows) {
    const row = r.row || [];
    const a = row[18];
    if (typeof a === 'string' && a.trim()) abbrs.add(a.trim().toUpperCase());
    for (const c of [19, 20, 21, 22]) {
      const v = row[c];
      if (typeof v === 'string' && v.trim()) names.add(v.trim().toUpperCase());
    }
  }
  return { abbrs, names };
}

module.exports = { clubNames };
