#!/usr/bin/env bash
# Check active vendor CLIs, their versions, and (for codex) the reported login state before a panel run.
# This does not call a model, test quota, or prove that a Keychain-backed login will work;
# the launcher's canary, a one-line model call per attempt, is what finds an exhausted
# allowance. Pass CLI names to check only those (the runner passes its seat's CLI);
# with no arguments both active CLIs are checked.
set -uo pipefail

failed=0
clis=("$@")
if [ "${#clis[@]}" -eq 0 ]; then clis=(claude codex); fi
for cli in "${clis[@]}"; do
  if ! command -v "$cli" >/dev/null 2>&1; then
    printf '%s: missing; login: unavailable\n' "$cli"
    failed=1
    continue
  fi
  printf '%s: %s\n' "$cli" "$("$cli" --version 2>&1)"
  if [[ "$cli" == claude ]]; then
    # Claude Code keeps its login in the Keychain and exposes no read that
    # does not also start a session. The launcher's canary, the first thing
    # every attempt does, is what proves that login; this step proves the
    # tool is present and which build it is.
    printf 'claude login: proven by the canary, not checked here\n'
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
