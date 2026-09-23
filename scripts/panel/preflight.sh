#!/usr/bin/env bash
# Check active vendor CLIs, their versions, and reported login state before a panel run.
# This does not call a model, test quota, or prove that a Keychain-backed login will work.
set -uo pipefail

failed=0
for cli in claude codex; do
  if ! command -v "$cli" >/dev/null 2>&1; then
    printf '%s: missing; login: unavailable\n' "$cli"
    failed=1
    continue
  fi
  printf '%s: %s\n' "$cli" "$("$cli" --version 2>&1)"
  if [[ "$cli" == claude ]]; then
    if "$cli" auth --help 2>&1 | grep -Eq '^[[:space:]]*status([[:space:]]|$)'; then
      status=$("$cli" auth status 2>&1)
      if [[ "$status" =~ '"loggedIn"'[[:space:]]*:[[:space:]]*true ]]; then
        printf 'claude login: reported\n'
      else
        printf 'claude login: not reported\n'
        failed=1
      fi
    else
      printf 'claude login: not checkable here (Keychain-backed login)\n'
    fi
  else
    status=$("$cli" login status 2>&1)
    if [[ "$status" == *'Logged in'* ]]; then
      printf 'codex login: reported\n'
    else
      printf 'codex login: not reported\n'
      failed=1
    fi
  fi
done
exit "$failed"
