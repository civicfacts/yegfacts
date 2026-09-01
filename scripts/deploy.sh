#!/usr/bin/env bash
set -euo pipefail

echo "deploy: retired. Production deploys when a PR merges to main; every branch gets a
preview build from Cloudflare Pages (link posted on the PR). Open a PR instead:
  gh pr create" >&2
exit 1
