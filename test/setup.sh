#!/bin/bash
# GSL test kit setup: installs the test tools into test/node_modules (not the app's).
# Run from anywhere: test/setup.sh
set -e
cd "$(dirname "$0")"
npm install --no-audit --no-fund
# Claude Code cloud sessions ship Chromium in /opt/pw-browsers; elsewhere fetch it once.
if [ -z "$PLAYWRIGHT_BROWSERS_PATH" ]; then npx playwright install chromium; fi
echo "Ready: cd test && npm run check"
