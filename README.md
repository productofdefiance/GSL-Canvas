# GSL-Canvas

A React dashboard for an EA FC25 career save. The project layout is in CLAUDE.md.

## Files

| Path | What it is |
| --- | --- |
| package.json | Project settings (react-scripts) |
| netlify.toml | Netlify build for pull-request previews: `CI=false npm run build`, publishes `build/`, Node 20 |
| tailwind.config.js | Tailwind's config; react-scripts compiles the styles ahead of time (the test kit reads the same file) |
| public/, src/ | The app (see CLAUDE.md for each file); `src/index.css` holds the three `@tailwind` lines |
| test/ | Test kit (see test/README.md) |
| briefs/ | One build brief per build |
| CLAUDE.md | Project instructions and full layout |
