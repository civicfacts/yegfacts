#!/usr/bin/env bash
#
# Run one panel reviewer for one story, one round (spec §5.2).
#
#   scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [--dry-run]
#   scripts/panel/run-reviewer.sh claude electric-buses 2026-08-31 1
#
# Providers: claude | codex | agy  (aliases: anthropic, gpt/openai, gemini/google)
#           luna | shadow  (the uncounted shadow seat, v1.34; needs --into)
#
# Isolation is NOT this script's business, and the older version of this comment
# claiming a fresh mktemp -d was the boundary was wrong: a CLI loads its
# user-level instructions from $HOME whatever its working directory is. Every
# invocation goes through scripts/panel/invoke-reviewer.sh, which runs the CLI
# through a recording proxy and, from methodology v1.30, searches the captured
# outgoing request for the private text that exists on this machine before it
# admits anything. Read that file for what the capture covers and, just as
# importantly, what it does not: it catches known private text from this machine,
# it cannot see what the vendor attaches elsewhere, and it says what the request
# did not contain rather than what it did. From methodology v1.31 all three
# seats can run, each under the best profile its own CLI allows and each with
# its limit stated in that file: the Claude and Codex seats are checked against
# a captured request, the Gemini seat against its CLI's own local record,
# because agy exposes no capture route at all. Every seat still has to pass its
# canary and its research run before anything it returns becomes a review.
#
# A zero exit from the launcher is not admission. This script reads
# `admitted_for_research` from the attempt metadata and installs nothing unless
# it is exactly true: a run whose capture went to a test upstream passes every
# check it can pass and is still not research. That attempt is recorded with
# schema "not-reached" and the run stops without spending the retry, which exists
# for a reviewer that answered badly rather than for one that was never admitted.
#
# The retained final message is extracted, validated against
# prompts/review-schema.json, and on failure retried EXACTLY once with the
# validation errors appended to the package. A reviewer still invalid after that
# retry exits nonzero, which halts the run: the synthesis matrix is defined for
# exactly three verdicts, so a two-reviewer panel must not proceed.
#
# A failed invocation cannot produce a review. The extracted JSON is staged in a
# scratch file and installed only once the run has passed the boundary check,
# exited zero and validated, and the install itself is exclusive, so nothing
# under reviews/ is ever replaced.
#
# An existing review makes this refuse outright, before the launcher runs and
# before the manifest is touched: a completed review and its manifest row are
# the output of a research run that cannot be reproduced bit for bit, and a
# re-run does not get to overwrite either. Use --into to record one beside it.
#
# --dry-run assembles the package and prints what would be invoked without
# executing any CLI, without writing into reviews/, and without that refusal.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

usage() {
  cat >&2 <<'USAGE'
usage: scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [options]
  provider  claude | codex | agy   (aliases: anthropic, gpt, openai, gemini, google)
            luna | shadow          the uncounted shadow seat (v1.34): round 1 only,
                                   and --into shadow-<name> is required so it never
                                   lands in a round directory
  story     story slug, e.g. electric-buses
  date      run date, e.g. 2026-08-31
  round     1 (blind research) or 2 (cross-review)

options:
  --dry-run          assemble the package and print the command, run nothing
  --claims <id,...>  answer only these claim ids (claim-scoped re-run)
  --into <dirname>   write the review and the manifest under <run>/<dirname>
                     instead of <run>/round<N> and <run>/run.yaml
USAGE
  exit 2
}

[ "$#" -ge 4 ] || usage

PROVIDER_ARG="$1"; STORY="$2"; RUN_DATE="$3"; ROUND="$4"; shift 4
DRY_RUN=0
CLAIMS=""
INTO=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --claims) CLAIMS="${2:-}"; [ -n "$CLAIMS" ] || { echo "--claims needs a value" >&2; usage; }; shift 2 ;;
    --into) INTO="${2:-}"; [ -n "$INTO" ] || { echo "--into needs a value" >&2; usage; }; shift 2 ;;
    *) echo "unknown option: $1" >&2; usage ;;
  esac
done
case "$INTO" in
  */*|..|.) echo "--into must be a single directory name, got '$INTO'" >&2; exit 2 ;;
esac

case "$ROUND" in 1|2) ;; *) echo "round must be 1 or 2, got '$ROUND'" >&2; exit 2 ;; esac
case "$PROVIDER_ARG" in
  luna|shadow)
    # The shadow seat is never merged. scripts/merge.ts reads every JSON file
    # in a round directory, so the only way to keep that promise is to refuse
    # to write into one. Round 2 hands a seat the other seats' findings, which
    # a seat that is not on the panel has no business reading.
    case "$INTO" in
      shadow-*) ;;
      *) echo "the shadow seat needs --into shadow-<name>; it is never written into a round directory" >&2; exit 2 ;;
    esac
    [ "$ROUND" = "1" ] || { echo "the shadow seat runs round 1 only" >&2; exit 2; }
    ;;
esac

# ---------------------------------------------------------------------------
# Provider → pinned command (spec §5.2). The output filename is the panel's
# short name so a run directory reads round1/{claude,gpt,gemini}.json.
#
# Reasoning effort is pinned per seat (methodology v1.6), not left to whatever
# the local CLI configuration happens to default to. `high` is the highest
# level all three CLIs share — claude offers low|medium|high|xhigh|max, codex
# low|medium|high|xhigh, agy low|medium|high — so it is the one setting that
# means the same thing across the panel.
# ---------------------------------------------------------------------------
EFFORT="high"

case "$PROVIDER_ARG" in
  claude|anthropic)
    # v1.34 (2026-09-23): Opus 5 to Opus 5.5, the day after its release. A
    # cost decision, as v1.15's move off Fable 5.1 was: the new model is
    # priced a fifth below the old one and its vendor claims fewer invented
    # figures; nothing here measures either. Opus 5.5 defaults to medium
    # effort, so the pin below is what keeps this seat at the level v1.6
    # pinned. Runs already published under Opus 5 or Fable 5.1 keep the model
    # their manifests record.
    SLOT="claude"; CLI="claude"; MODEL_ID="claude-opus-5-5"
    PROVIDER_CANONICAL="anthropic"; SEAT="Claude Opus 5.5"
    ;;
  codex|gpt|openai)
    # v1.34 (2026-09-23): GPT-5.6 Sol to GPT-6 Sol, released the same day as
    # Opus 5.5 at half the price of the seat it replaces. Same kind of
    # decision as above; runs published under GPT-5.6 Sol keep their model.
    SLOT="gpt"; CLI="codex"; MODEL_ID="gpt-6-sol"
    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Sol"
    ;;
  luna|shadow)
    # v1.34 (2026-09-23): the shadow seat. GPT-6 Luna is the cheapest model
    # any panel vendor sells, and whether a model that cheap can hold a
    # research seat is an open question this site answers by measurement,
    # not by guessing. It runs the same frozen package as the three counted
    # seats and its answer is committed, but it is never merged and never
    # synthesised: it must be run with --into shadow-<name>, because
    # scripts/merge.ts reads every JSON file in a round directory, and the
    # run's synthesis_scope names no shadow. The
    # comparison against the counted seats is written into run-record.md.
    SLOT="gpt-luna"; CLI="codex"; MODEL_ID="gpt-6-luna"
    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Luna (shadow, not counted)"
    ;;
  agy|gemini|google)
    # v1.20 (2026-09-03): the seat moves from Gemini 3.1 Pro to Gemini 3.8
    # Flash at high, on the founder's direction that 3.1 Pro is not to be
    # used anywhere any more. agy carries the effort in the model id, so the
    # id is pinned with it; --effort stays so the manifest records the same
    # setting the other seats pin. Runs already published under 3.1 Pro keep
    # the model their manifests record.
    SLOT="gemini"; CLI="agy"; MODEL_ID="gemini-3.8-flash-high"
    PROVIDER_CANONICAL="google"; SEAT="Gemini 3.8 Flash"
    # The command this seat used for its four published runs carried
    # --dangerously-skip-permissions (methodology v1.14) so it could reach a
    # shell for PDFs its URL tool would not read. That command is retired. The
    # v1.31 profile in invoke-reviewer.sh still passes that flag, because it
    # auto-approves the prompt rather than the deny rules, and it writes a
    # settings file in the per-attempt home that refuses every file, write and
    # command tool at the permission check. A PDF this seat's URL tool will not
    # read is an essential source it cannot reach, which stops a run rather than
    # becoming a finding.
    ;;
  *)
    echo "unknown provider: $PROVIDER_ARG" >&2; usage
    ;;
esac

RUN_DIR="$REPO_ROOT/reviews/$STORY/$RUN_DATE"
BRIEF="$RUN_DIR/brief.md"
SCHEMA="$REPO_ROOT/prompts/review-schema.json"
# A claim-scoped re-run (`--claims` with `--into`) writes into its own directory
# with its own manifest, and never into `round1/` or the run's `run.yaml`. The
# completed round stays exactly as the seats returned it: nothing is
# overwritten, the package hash recorded against it still describes the package
# the seats answered, and the re-run's own hashes sit beside its own answers.
OUT_DIR="$RUN_DIR/${INTO:-round$ROUND}"
OUT_FILE="$OUT_DIR/$SLOT.json"
# A --into directory that is a symbolic link is a destination whose name says
# one thing and whose contents land somewhere else. Nothing legitimate needs
# one, and for the shadow seat it is the one way left to reach round1/.
if test -n "$INTO" && test -L "$OUT_DIR"; then
  echo "--into '$INTO' is a symbolic link; refusing to write through it" >&2; exit 2
fi
MANIFEST="${INTO:+$RUN_DIR/$INTO/run.yaml}"
MANIFEST="${MANIFEST:-$RUN_DIR/run.yaml}"

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
# Scratch directory: where the package is assembled and the extracted review is
# staged. It is no longer the isolation boundary and no longer holds the only
# copy of anything — invoke-reviewer.sh archives each attempt's package, raw
# stream and final message before this is deleted — so removing it on the way
# out costs nothing. KEEP_SCRATCH=1 keeps it for debugging the assembler.
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
  if [ -n "$CLAIMS" ]; then
    # Scoping lives in the wrapper, never in the brief: the brief below is the
    # frozen bytes, so its hash still verifies. The seat is told what to answer
    # and nothing about why, which is what keeps a re-run blind.
    echo "## Scope of this run"
    echo
    echo "Answer ONLY the following claims from the brief:"
    echo
    printf '%s\n' "$CLAIMS" | tr ',' '\n' | sed '/^$/d;s/^/- `/;s/$/`/'
    echo
    echo "Your \`claims\` array must contain exactly those claims and no others."
    echo "Every other claim in the brief is out of scope: do not research it and"
    echo "do not return it. Everything else in the brief governs as written — the"
    echo "definitions, the fixed dates, the denominators, the thresholds, the"
    echo "required calculations and the reviewer instructions all still apply."
    echo
  fi
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
  if [ -n "$CLAIMS" ]; then
    echo "Answer only these claims, and no others: $CLAIMS"
  fi
} > "$PACKAGE"

PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
INVOKE="$REPO_ROOT/scripts/panel/invoke-reviewer.sh"
COMMAND_STRING="scripts/panel/invoke-reviewer.sh --provider $PROVIDER_CANONICAL --model $MODEL_ID --effort $EFFORT --package package.md"

# Each attempt lands in its own directory under the private archive, keyed by a
# fresh timestamp, so a re-run of a round never lands on top of the last one.
ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
RUN_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ATTEMPT_BASE="$ARCHIVE_ROOT/$STORY/$RUN_DATE/${INTO:-round$ROUND}/$SLOT/$RUN_STAMP"

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY RUN — no CLI executed, nothing written under reviews/"
  echo
  echo "provider:      $PROVIDER_ARG (slot: $SLOT, canonical: $PROVIDER_CANONICAL)"
  echo "model:         $MODEL_ID"
  echo "effort:        $EFFORT"
  echo "round:         $ROUND"
  echo "scratch dir:   $SCRATCH"
  echo "attempt dirs:  $ATTEMPT_BASE/attempt-N"
  echo "package files: $PACKAGE_FILES"
  echo "package bytes: $(wc -c < "$PACKAGE" | tr -d ' ')"
  echo "prompt sha256: $PROMPT_SHA"
  echo "would write:   ${OUT_FILE#"$REPO_ROOT"/}"
  echo "would update:  ${MANIFEST#"$REPO_ROOT"/}"
  echo
  echo "invocation (the helper decides whether this provider may run at all):"
  echo "  $COMMAND_STRING"
  exit 0
fi

# A completed review, and the manifest row describing it, are the output of a
# research run that cost money and cannot be reproduced bit for bit. Neither is
# re-derivable, so a re-run does not get to touch either: it refuses here,
# before the launcher is called and before record-run.ts rewrites the row.
# A claim-scoped re-run has --into for exactly this, and it writes its own
# directory and its own manifest. -L as well as -e, because a dangling symlink
# at the destination is still something a person put there.
if [ -e "$OUT_FILE" ] || [ -L "$OUT_FILE" ]; then
  echo "[$SLOT round $ROUND] ${OUT_FILE#"$REPO_ROOT"/} already exists." >&2
  echo "[$SLOT round $ROUND] Refusing: a re-run would replace both it and its manifest row." >&2
  echo "[$SLOT round $ROUND] Use --into <dirname> to record a re-run beside it." >&2
  exit 1
fi

CLI_VERSION="unknown"
if command -v "$CLI" >/dev/null 2>&1; then
  CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' || echo unknown)"
fi
[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"

mkdir -p "$OUT_DIR"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
ERRORS="$SCRATCH/validation-errors.txt"
STATUS="failed"
ATTEMPTS=0
DETAILS=""

# Per-attempt public record, built from the private attempt directory by the one
# script that knows which fields may leave it. Appended even for an attempt that
# never reached the CLI, so a refusal is on the record rather than absent from it.
add_detail() {
  local record
  record="$(npx tsx "$REPO_ROOT/scripts/panel/attempt-record.ts" "$1" --attempt "$2" --schema "$3")"
  # An empty record means the recorder ran and said nothing, which is how a
  # manifest ends up describing a run without describing the attempt it made.
  # Better to stop the whole run than to publish a row with the evidence
  # silently missing.
  [ -n "$record" ] || { echo "attempt-record produced nothing for $1" >&2; exit 1; }
  DETAILS="${DETAILS:+$DETAILS,}$record"
}

# The extracted JSON is staged here and only ever moved into reviews/ on a fully
# successful attempt. Writing straight to $OUT_FILE is how a failed re-run used
# to be able to damage a good review.
STAGED="$SCRATCH/staged-review.json"

for attempt in 1 2; do
  ATTEMPTS="$attempt"
  ATTEMPT_DIR="$ATTEMPT_BASE/attempt-$attempt"
  echo "[$SLOT round $ROUND] attempt $attempt: $COMMAND_STRING" >&2

  INVOKE_OK=1
  "$INVOKE" --purpose research --provider "$PROVIDER_CANONICAL" --package "$PACKAGE" \
    --attempt-dir "$ATTEMPT_DIR" --model "$MODEL_ID" --effort "$EFFORT" \
    --label "$SLOT round $ROUND" || INVOKE_OK=0

  if [ "$INVOKE_OK" != "1" ]; then
    # Fail closed and stop. A refusal is not a schema failure: re-sending the
    # same package to a profile that just refused it, or to a run that just
    # broke its boundary, spends money to be refused again. The retry budget
    # exists for a reviewer that answered badly, not for one that never ran.
    add_detail "$ATTEMPT_DIR" "$attempt" "not-reached"
    # A run refused by policy is not a run that went wrong, and the top line of
    # the manifest row should say which of the two happened.
    if [ "$(cat "$ATTEMPT_DIR/status.txt" 2>/dev/null || echo failed)" = "blocked" ]; then
      STATUS="blocked"
    else
      STATUS="failed"
    fi
    break
  fi

  # A zero exit means every check passed. It does not mean the run was admitted.
  # A capture taken against a test upstream passes the capture check and is still
  # not a research run, because the check is about what the CLI sent and the CLI
  # does not know where it went. The launcher says so in `admitted_for_research`.
  # Reading it here is what stops a response from such a run being published as a
  # review.
  #
  # No retry: this is not a reviewer that answered badly, so re-sending the same
  # package would only produce the same unadmitted run again.
  # Metadata that is missing or unreadable reads as "not admitted". A row the
  # launcher never finished writing is not permission to publish.
  ADMITTED="$(node -e '
    const fs = require("node:fs");
    let metadata = {};
    try { metadata = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); } catch {}
    const ok = metadata.admitted_for_research === true;
    if (!ok) process.stderr.write("  " + (metadata.admission_reason || "no admission decision was recorded") + "\n");
    process.stdout.write(ok ? "true" : "false");
  ' "$ATTEMPT_DIR/metadata.json")"
  if [ "$ADMITTED" != "true" ]; then
    echo "[$SLOT round $ROUND] not admitted for research; nothing was extracted or installed." >&2
    add_detail "$ATTEMPT_DIR" "$attempt" "not-reached"
    STATUS="failed"
    break
  fi

  # The launcher's research output contract: a top-level `final-message.txt`
  # holding the complete response. Nothing else is read, and the diagnostic
  # path's `canary/` files are deliberately not it.
  if npx tsx "$REPO_ROOT/scripts/panel/extract-review.ts" \
       "$ATTEMPT_DIR/final-message.txt" "$STAGED" > "$ERRORS"; then
    add_detail "$ATTEMPT_DIR" "$attempt" "valid"
    STATUS="ok"
    break
  fi

  cp "$ERRORS" "$ATTEMPT_DIR/validation-errors.txt"
  add_detail "$ATTEMPT_DIR" "$attempt" "invalid"
  echo "[$SLOT round $ROUND] output failed schema validation:" >&2
  sed 's/^/  /' "$ERRORS" >&2

  if [ "$attempt" = "2" ]; then break; fi

  # The one retry: same package, plus exactly what was wrong with the last try.
  # Appending in place is safe now that each attempt copies the package into its
  # own directory before invoking, so attempt 1's bytes and hash survive
  # attempt 2 rather than being overwritten by it.
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

# ---------------------------------------------------------------------------
# Post-validation: stamp the runner's own identity onto the saved review
# (methodology v1.2).
#
# Models never attest their own identity for display. A model's self-report is
# a claim by the thing being identified, and it drifts — the same seat has
# called itself "gpt-5" and "gpt-5.6-sol" across runs. So `model_self_reported`
# is KEPT exactly as written, as part of the raw record, but `provider` and the
# new `runner_model` / `runner_seat` fields are written from THIS script's
# pinned command, which is the only place that knows what was actually invoked.
# `runner_effort` is stamped for exactly the same reason (methodology v1.6):
# models never attest their own run parameters, and reasoning effort changes
# what a seat returns as much as the model version does.
# Everything the site displays as panel identity comes from here and from
# run.yaml, never from the reviewer's own JSON.
# ---------------------------------------------------------------------------
if [ "$STATUS" = "ok" ]; then
  node -e '
    const fs = require("node:fs");
    const [file, provider, model, seat, effort] = process.argv.slice(1);
    const review = JSON.parse(fs.readFileSync(file, "utf8"));
    review.reviewer = {
      ...review.reviewer,
      provider,
      runner_model: model,
      runner_seat: seat,
      runner_effort: effort,
    };
    fs.writeFileSync(file, JSON.stringify(review, null, 2) + "\n");
  ' "$STAGED" "$PROVIDER_CANONICAL" "$MODEL_ID" "$SEAT" "$EFFORT"
  # Only now does anything under reviews/ change, and it changes exclusively:
  # the destination was clear when this run started, and if a concurrent session
  # has filled it since, this fails rather than deciding whose answer wins.
  npx tsx "$REPO_ROOT/scripts/panel/install-output.ts" "$STAGED" "$OUT_FILE"
fi

npx tsx "$REPO_ROOT/scripts/panel/record-run.ts" \
  --manifest "$MANIFEST" \
  --story "$STORY" \
  --date "$RUN_DATE" \
  --provider "$PROVIDER_CANONICAL" \
  --seat "$SEAT" \
  --round "$ROUND" \
  --command "$COMMAND_STRING" \
  --cli_version "$CLI_VERSION" \
  --model "$MODEL_ID" \
  --effort "$EFFORT" \
  --prompt-sha256 "$PROMPT_SHA" \
  --started-at "$STARTED_AT" \
  --finished-at "$FINISHED_AT" \
  --attempts "$ATTEMPTS" \
  --status "$STATUS" \
  --package-files "$PACKAGE_FILES" \
  --attempts-detail "[$DETAILS]"

if [ "$STATUS" != "ok" ]; then
  echo "[$SLOT round $ROUND] FAILED after $ATTEMPTS attempt(s)." >&2
  echo "[$SLOT round $ROUND] Every attempt is retained under $ATTEMPT_BASE" >&2
  if [ -f "$OUT_FILE" ]; then
    echo "[$SLOT round $ROUND] ${OUT_FILE#"$REPO_ROOT"/} now holds another session's review; this attempt's output is in the archive" >&2
  fi
  exit 1
fi

echo "[$SLOT round $ROUND] wrote ${OUT_FILE#"$REPO_ROOT"/} in $ATTEMPTS attempt(s)"
