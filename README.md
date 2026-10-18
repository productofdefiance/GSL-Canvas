# GSL-Canvas

A React dashboard for an EA FC25 career save. The project layout is in CLAUDE.md.

## Files

| Path | What it is |
| --- | --- |
| package.json, package-lock.json | Project settings (react-scripts); exact versions, installed with `npm ci` |
| netlify.toml | Netlify build for pull-request previews: `CI=false npm run build`, publishes `build/`, Node 20 |
| tailwind.config.js | Tailwind's config; react-scripts compiles the styles ahead of time (the test kit reads the same file) |
| public/, src/ | The app (see CLAUDE.md for each file); `src/index.css` holds the three `@tailwind` lines |
| test/ | Test kit (see test/README.md) |
| briefs/ | One build brief per build |
| FLAGS.md | The flags log: things noticed and not yet fixed |
| .github/ | Pull request template and the GitHub checks (Kit, Browser, Production build, Safari engine, Checklist gate) |
| CLAUDE.md | Project instructions, full layout and the review layers |
