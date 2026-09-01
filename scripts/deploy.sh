#!/usr/bin/env bash
# The ONLY sanctioned way to deploy. Enforces: clean tree → pushed HEAD →
# green checks → build (footer SHA = HEAD by construction) → verify the
# built SHA actually matches → deploy. Exists because a hand-run deploy
# once shipped a stale commit SHA in the footer.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain)" ]]; then
  echo "deploy: refusing — working tree has uncommitted or untracked-but-relevant changes:" >&2
  git status --short >&2
  exit 1
fi

git fetch -q origin main
HEAD_SHA=$(git rev-parse HEAD)
if [[ "$HEAD_SHA" != "$(git rev-parse origin/main)" ]]; then
  echo "deploy: refusing — HEAD is not pushed to origin/main (deploys must be reproducible from the public repo)." >&2
  exit 1
fi

npm run validate
npm test
npm run build

SHORT_SHA=$(git rev-parse --short HEAD)
if ! grep -rq "commit/${SHORT_SHA}" dist/about/index.html; then
  echo "deploy: refusing — built output does not carry HEAD's SHA (${SHORT_SHA}); build/inject is broken." >&2
  exit 1
fi

npx wrangler pages deploy dist --project-name=yegfacts --commit-hash="$HEAD_SHA" 2>&1 | tail -2
echo "deploy: OK — ${SHORT_SHA} live"
