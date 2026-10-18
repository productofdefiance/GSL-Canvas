// Checklist gate (v51.25): the pull request's "The user's checks" section must have at least one tick-box, all ticked.
// Reads only that section: from its heading to the next heading of the same or a higher level.
//   node gate.js <event.json>    (GitHub's pull_request event payload; the workflow passes $GITHUB_EVENT_PATH)
//   node gate.js --body <file>   (a description saved to a file, for trying it locally)
const fs = require('fs');

const HEADING = "The user's checks";
const arg = process.argv[2];
const body = arg === '--body'
  ? fs.readFileSync(process.argv[3], 'utf8')
  : ((JSON.parse(fs.readFileSync(arg, 'utf8')).pull_request || {}).body || '');

const lines = body.replace(/\r/g, '').split('\n');
const start = lines.findIndex((l) => /^#{1,6}\s/.test(l) && l.replace(/^#+\s*/, '').trim().toLowerCase().startsWith(HEADING.toLowerCase()));
if (start < 0) {
  console.log(`Checklist gate: no "${HEADING}" section in the pull request description.`);
  process.exit(1);
}
const level = lines[start].match(/^#+/)[0].length;
const section = [];
for (const l of lines.slice(start + 1)) {
  const h = l.match(/^(#{1,6})\s/);
  if (h && h[1].length <= level) break;
  section.push(l);
}
const boxes = section.map((l) => l.match(/^\s*[-*+]\s+\[( |x|X)\]\s*(.*)$/)).filter(Boolean);
const open = boxes.filter((b) => b[1] === ' ');
if (!boxes.length) {
  console.log(`Checklist gate: "${HEADING}" has no tick-boxes.`);
  process.exit(1);
}
open.forEach((b) => console.log(`not ticked: ${b[2]}`));
console.log(`Checklist gate: ${boxes.length - open.length} of ${boxes.length} ticked.`);
process.exit(open.length ? 1 : 0);
