/*
 * GSL CANVAS — tailwind.config.js (Tailwind, compiled ahead of time by react-scripts)
 * Version:  Config v1
 * Date:     2026-10-18, 04:30 UTC
 * Latest:   Canvas v51.23: replaces the play CDN and its inline config in public/index.html.
 *           The test kit (test/css.js) reads this same file.
 * History:  CHANGELOG.md
 */

// Every colour scale reads its CSS variable (set in public/index.html, swapped by dark mode).
const FAMILIES = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const colors = {};
FAMILIES.forEach((f) => {
  colors[f] = {};
  SHADES.forEach((s) => { colors[f][s] = `rgb(var(--c-${f}-${s}) / <alpha-value>)`; });
});

module.exports = {
  content: { relative: true, files: ['./src/**/*.js', './public/index.html'] },
  // Class names the code builds while it runs, which a scan of the source can't see:
  // ui.js lightTone() turns a light text shade (50–400) into text-<colour>-700, and
  // HighlightCard's icon tone turns it into text-<colour>-600 (Highlights bars on every page).
  safelist: [{ pattern: new RegExp(`^text-(${FAMILIES.join('|')})-(600|700)$`) }],
  theme: { extend: { colors, fontFamily: { sans: ['var(--font-text)'] } } },
};
