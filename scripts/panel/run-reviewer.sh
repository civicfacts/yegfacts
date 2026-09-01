#!/usr/bin/env bash
#
# Run one panel reviewer for one story, one round (spec §5.2).
#
#   scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [--dry-run]
#   scripts/panel/run-reviewer.sh claude electric-buses 2026-08-31 1
#
# Providers: claude | codex | agy  (aliases: anthropic, gpt/openai, gemini/google)
#
# Isolation, per spec §5.2: the reviewer runs with a fresh mktemp -d as its
# working directory, containing ONLY the package it needs. No repo path is ever
# passed to a model, so a reviewer cannot read another reviewer's answer, the
# published content, or this script. Each CLI still reads its own auth from
# $HOME, and web research is allowed and expected.
#
# The output is extracted, validated against prompts/review-schema.json, and on
# failure retried EXACTLY once with the validation errors appended to the
# package. A reviewer still invalid after that retry exits nonzero, which halts
# the run: the synthesis matrix is defined for exactly three verdicts, so a
# two-reviewer panel must not proceed.
#
# --dry-run assembles the package and prints the command without executing any
# CLI, and without writing into reviews/.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

usage() {
  cat >&2 <<'USAGE'
usage: scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [--dry-run]
  provider  claude | codex | agy   (aliases: anthropic, gpt, openai, gemini, google)
  story     story slug, e.g. electric-buses
  date      run date, e.g. 2026-08-31
  round     1 (blind research) or 2 (cross-review)
USAGE
  exit 2
}

[ "$#" -ge 4 ] || usage

PROVIDER_ARG="$1"; STORY="$2"; RUN_DATE="$3"; ROUND="$4"; shift 4
DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    *) echo "unknown option: $arg" >&2; usage ;;
  esac
done

case "$ROUND" in 1|2) ;; *) echo "round must be 1 or 2, got '$ROUND'" >&2; exit 2 ;; esac

# ---------------------------------------------------------------------------
# Provider → pinned command (spec §5.2). The output filename is the panel's
# short name so a run directory reads round1/{claude,gpt,gemini}.json.
# ---------------------------------------------------------------------------
case "$PROVIDER_ARG" in
  claude|anthropic)
    SLOT="claude"; CLI="claude"; MODEL_ID="claude-fable-5"
    CMD=(claude -p --model claude-fable-5)
    ;;
  codex|gpt|openai)
    SLOT="gpt"; CLI="codex"; MODEL_ID="gpt-5.6-sol"
    CMD=(codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check)
    ;;
  agy|gemini|google)
    SLOT="gemini"; CLI="agy"; MODEL_ID="gemini-3.1-pro"
    CMD=(agy -p --effort high)
    ;;
  *)
    echo "unknown provider: $PROVIDER_ARG" >&2; usage
    ;;
esac

RUN_DIR="$REPO_ROOT/reviews/$STORY/$RUN_DATE"
BRIEF="$RUN_DIR/brief.md"
SCHEMA="$REPO_ROOT/prompts/review-schema.json"
OUT_DIR="$RUN_DIR/round$ROUND"
OUT_FILE="$OUT_DIR/$SLOT.json"
MANIFEST="$RUN_DIR/run.yaml"

[ -f "$BRIEF" ] || { echo "brief not found: $BRIEF" >&2; exit 1; }
[ -f "$SCHEMA" ] || { echo "schema not found: $SCHEMA" >&2; exit 1; }

if [ "$ROUND" = "1" ]; then
  PROMPT_FILE="$REPO_ROOT/prompts/reviewer.md"
else
  PROMPT_FILE="$REPO_ROOT/prompts/cross-review.md"
  COMBINED="$RUN_DIR/combined-evidence.json"
  [ -f "$COMBINED" ] || {
    echo "round 2 needs $COMBINED — run scripts/merge.ts first" >&2
    exit 1
  }
fi
[ -f "$PROMPT_FILE" ] || { echo "prompt not found: $PROMPT_FILE" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Scratch directory: everything the reviewer may see, and nothing else.
# ---------------------------------------------------------------------------
SCRATCH="$(mktemp -d "${TMPDIR:-/tmp}/yegfacts-$SLOT-r$ROUND-XXXXXX")"
cleanup() { [ "${KEEP_SCRATCH:-0}" = "1" ] || rm -rf "$SCRATCH"; }
trap cleanup EXIT

cp "$BRIEF" "$SCRATCH/brief.md"
cp "$PROMPT_FILE" "$SCRATCH/$(basename "$PROMPT_FILE")"
cp "$SCHEMA" "$SCRATCH/review-schema.json"
PACKAGE_FILES="brief.md,$(basename "$PROMPT_FILE"),review-schema.json"

if [ "$ROUND" = "2" ]; then
  cp "$RUN_DIR/combined-evidence.json" "$SCRATCH/combined-evidence.json"
  PACKAGE_FILES="$PACKAGE_FILES,combined-evidence.json"
  # The OTHER reviewers' round-1 findings — never this reviewer's own, which it
  # already holds, and which it is being asked to defend or revise.
  for other in "$RUN_DIR"/round1/*.json; do
    [ -e "$other" ] || continue
    other_slot="$(basename "$other" .json)"
    if [ "$other_slot" = "$SLOT" ]; then continue; fi
    cp "$other" "$SCRATCH/other-review-$other_slot.json"
    PACKAGE_FILES="$PACKAGE_FILES,other-review-$other_slot.json"
  done
fi

# ---------------------------------------------------------------------------
# package.md — one document, because a single stdin prompt is the only input
# shape all three pinned commands share.
# ---------------------------------------------------------------------------
PACKAGE="$SCRATCH/package.md"
{
  echo "# YEGFacts panel review package"
  echo
  echo "Story: \`$STORY\` — run \`$RUN_DATE\` — round $ROUND."
  echo
  echo "Read the methodology, then the brief, then the required output schema."
  echo "Return your answer as a SINGLE JSON document conforming to the schema."
  echo "No prose, no explanation, no markdown fence — the first character of your"
  echo "response must be \`{\` and the last must be \`}\`. Set \`round\` to $ROUND."
  echo
  echo "---"
  echo
  echo "## Methodology"
  echo
  cat "$SCRATCH/$(basename "$PROMPT_FILE")"
  echo
  echo "---"
  echo
  echo "## Brief"
  echo
  cat "$SCRATCH/brief.md"
  echo
  if [ "$ROUND" = "2" ]; then
    echo "---"
    echo
    echo "## Combined evidence from round 1 (all reviewers)"
    echo
    echo '```json'
    cat "$SCRATCH/combined-evidence.json"
    echo '```'
    echo
    for other in "$SCRATCH"/other-review-*.json; do
      [ -e "$other" ] || continue
      echo "---"
      echo
      echo "## Round-1 findings from another reviewer ($(basename "$other" .json | sed 's/^other-review-//'))"
      echo
      echo '```json'
      cat "$other"
      echo '```'
      echo
    done
  fi
  echo "---"
  echo
  echo "## Required output schema (JSON Schema 2020-12)"
  echo
  echo '```json'
  cat "$SCRATCH/review-schema.json"
  echo '```'
  echo
  echo "Return ONLY the JSON document. Set \`round\` to $ROUND."
} > "$PACKAGE"

PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
COMMAND_STRING="${CMD[*]} < package.md"

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY RUN — no CLI executed, nothing written under reviews/"
  echo
  echo "provider:      $PROVIDER_ARG (slot: $SLOT)"
  echo "model:         $MODEL_ID"
  echo "round:         $ROUND"
  echo "scratch dir:   $SCRATCH"
  echo "package files: $PACKAGE_FILES"
  echo "package bytes: $(wc -c < "$PACKAGE" | tr -d ' ')"
  echo "prompt sha256: $PROMPT_SHA"
  echo "would write:   ${OUT_FILE#"$REPO_ROOT"/}"
  echo "would update:  ${MANIFEST#"$REPO_ROOT"/}"
  echo
  echo "command (run with cwd = scratch dir):"
  echo "  $COMMAND_STRING"
  exit 0
fi

command -v "$CLI" >/dev/null 2>&1 || { echo "$CLI is not on PATH" >&2; exit 1; }
CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' || echo unknown)"
[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"

mkdir -p "$OUT_DIR"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RAW="$SCRATCH/raw-stdout.txt"
ERRORS="$SCRATCH/validation-errors.txt"
STATUS="failed"
ATTEMPTS=0

for attempt in 1 2; do
  ATTEMPTS="$attempt"
  echo "[$SLOT round $ROUND] attempt $attempt: ${CMD[*]}" >&2

  # Run from INSIDE the scratch dir so the CLI's working directory contains
  # only the package. A nonzero exit is not fatal on attempt 1 — a CLI can
  # fail late having already printed a usable answer.
  ( cd "$SCRATCH" && "${CMD[@]}" < package.md ) > "$RAW" 2>"$SCRATCH/stderr.txt" || \
    echo "[$SLOT round $ROUND] CLI exited nonzero; still checking its output" >&2

  if npx tsx "$REPO_ROOT/scripts/panel/extract-review.ts" "$RAW" "$OUT_FILE" > "$ERRORS"; then
    STATUS="ok"
    break
  fi

  echo "[$SLOT round $ROUND] output failed schema validation:" >&2
  sed 's/^/  /' "$ERRORS" >&2

  if [ "$attempt" = "2" ]; then break; fi

  # The one retry: same package, plus exactly what was wrong with the last try.
  {
    echo
    echo "---"
    echo
    echo "## Your previous response was rejected"
    echo
    echo "It did not conform to review-schema.json. The validator reported:"
    echo
    cat "$ERRORS"
    echo
    echo "Return ONLY a corrected JSON document conforming to the schema."
  } >> "$PACKAGE"
  PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
done

FINISHED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

npx tsx "$REPO_ROOT/scripts/panel/record-run.ts" \
  --manifest "$MANIFEST" \
  --story "$STORY" \
  --date "$RUN_DATE" \
  --provider "$SLOT" \
  --round "$ROUND" \
  --command "$COMMAND_STRING" \
  --cli_version "$CLI_VERSION" \
  --model "$MODEL_ID" \
  --prompt-sha256 "$PROMPT_SHA" \
  --started-at "$STARTED_AT" \
  --finished-at "$FINISHED_AT" \
  --attempts "$ATTEMPTS" \
  --status "$STATUS" \
  --package-files "$PACKAGE_FILES"

if [ "$STATUS" != "ok" ]; then
  echo "[$SLOT round $ROUND] FAILED after $ATTEMPTS attempts. Scratch kept at $SCRATCH" >&2
  KEEP_SCRATCH=1
  exit 1
fi

echo "[$SLOT round $ROUND] wrote ${OUT_FILE#"$REPO_ROOT"/} in $ATTEMPTS attempt(s)"
