#!/usr/bin/env bash
#
# Start a reviewer CLI, or refuse to, and keep everything either decision
# produced.
#
#   scripts/panel/invoke-reviewer.sh --provider anthropic --package <file> \
#     --attempt-dir <dir> --model <id> --effort <level> [--purpose research]
#   scripts/panel/invoke-reviewer.sh --purpose diagnostic --provider anthropic \
#     --package <file> --attempt-dir <dir> --model <id> --effort <level>
#   scripts/panel/invoke-reviewer.sh --archive-root
#
# EVERY PROVIDER IS BLOCKED FOR RESEARCH IN THIS RELEASE.
#
# The old promise was that a fresh `mktemp -d` working directory isolated a
# reviewer. It never did: a CLI loads its user-level instructions from $HOME
# whatever its working directory is. The replacement candidate was the vendor's
# own customization suppression, checked against the CLI's `system/init`
# inventory. That check is worth having and it is implemented here, but it
# cannot carry the claim: an empty plugin list proves plugins were not loaded,
# not that no CLAUDE.md, memory or host instruction reached the model.
#
# What would settle it for the Claude candidate is the outgoing request, and
# nothing in Claude Code 2.1.267 emits it. That CLI's debug log never writes a
# request body — its most detailed line records {model, thinking, output_config,
# temperature, betas} — so a denylist of private phrases run over that log
# passes by construction. Meanwhile its own help for
# --exclude-dynamic-system-prompt-sections says the default system prompt
# carries memory paths. That is a statement about this CLI, not about every
# vendor: codex, for one, renders a prompt you can read, and what it shows is
# the reason its seat is blocked.
#
# Absent a demonstrated boundary for any candidate, `--purpose research` refuses
# every provider before spending anything, and no old run is retroactively
# certified.
#
#   openai (codex 0.153.4): tested on 2026-09-09 and failed. See BLOCK_REASON in
#   the profile table for the exact flag set; it still rendered the global
#   AGENTS.md and a skills catalogue into the request, and the one setting that
#   removed them also removed web access. One tested configuration, not all.
#
#   google (agy 1.1.28): exposes no customization-suppression or tool-allowlist
#   flag, so no boundary has been demonstrated for it. It has not been probed
#   live, and "not demonstrated" is not "impossible".
#
#   anthropic (claude 2.1.266/2.1.267): a candidate profile whose structural
#   checks pass and whose context boundary is undemonstrated. `--purpose
#   diagnostic` exercises it against a synthetic canary and retains the
#   evidence. It never sends the package and never produces a review.
#
# RETENTION
#
# Every attempt, including every refusal, gets its own directory under a private
# archive outside every Git repository, 0700/0600, created atomically so it can
# never land on an existing one, and never purged on a schedule: the bytes stay
# as long as the public record they support stays. Each one keeps the exact
# package it was given, whatever the CLI wrote, the exit status and a metadata
# file, and a refusal keeps them too. The public manifest gets the opaque
# attempt id, the hashes, the exit code and the verdicts. It never gets a
# filesystem path or a raw trace.

set -euo pipefail
umask 077

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Not $TMPDIR, because a reboot eats it. Not the private board repo, because raw
# model output is not reviewed material and does not belong in anyone's Git
# history. YEGFACTS_REVIEW_ARCHIVE exists so tests can point somewhere
# disposable.
ARCHIVE_ROOT="${YEGFACTS_REVIEW_ARCHIVE:-${HOME}/.local/state/yegfacts/reviewer-attempts}"

die() { echo "invoke-reviewer: $*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Archive root: absolute, outside every Git worktree, and not silently
# re-permissioned if it already belongs to something else.
# ---------------------------------------------------------------------------
resolve_archive_root() {
  case "$ARCHIVE_ROOT" in
    /*) ;;
    *) die "YEGFACTS_REVIEW_ARCHIVE must be an absolute path, got '$ARCHIVE_ROOT'" ;;
  esac
  case "$ARCHIVE_ROOT" in
    *..*) die "YEGFACTS_REVIEW_ARCHIVE must not contain '..', got '$ARCHIVE_ROOT'" ;;
  esac
  # Check before creating. The deepest ancestor that already exists is the one
  # that can answer "is this inside a repository", and asking it first means a
  # refusal leaves no stray directory behind.
  local probe="$ARCHIVE_ROOT"
  while [ ! -d "$probe" ]; do
    local up
    up="$(dirname "$probe")"
    if [ "$up" = "$probe" ]; then break; fi
    probe="$up"
  done
  local anchor
  anchor="$(cd "$probe" 2>/dev/null && pwd -P)" || die "archive root $ARCHIVE_ROOT has no reachable ancestor"
  # A worktree carries `.git` as a file rather than a directory, so ask git
  # instead of testing for a directory. Success here means the archive would sit
  # inside a repository and raw output could be committed. Checked on the
  # RESOLVED path, so a symlinked root cannot smuggle it in.
  if git -C "$anchor" rev-parse --show-toplevel >/dev/null 2>&1; then
    die "archive root $ARCHIVE_ROOT is inside a Git repository (at $anchor); raw reviewer output must not be committable"
  fi

  local created=0
  if [ ! -d "$ARCHIVE_ROOT" ]; then
    mkdir -p "$ARCHIVE_ROOT"
    created=1
  fi
  local resolved
  resolved="$(cd "$ARCHIVE_ROOT" && pwd -P)"
  # Only tighten what we just made. A pre-existing directory belongs to whoever
  # made it, and chmod-ing an arbitrary path because it was named in an
  # environment variable is not this script's business.
  if [ "$created" = "1" ]; then chmod 700 "$resolved"; fi
  printf '%s\n' "$resolved"
}

if [ "${1:-}" = "--archive-root" ]; then
  resolve_archive_root
  exit 0
fi

# ---------------------------------------------------------------------------
PROVIDER=""; PACKAGE=""; ATTEMPT_DIR=""; MODEL=""; EFFORT=""; LABEL=""
PURPOSE="research"; MAX_BUDGET=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --provider) PROVIDER="${2:-}"; shift 2 ;;
    --package) PACKAGE="${2:-}"; shift 2 ;;
    --attempt-dir) ATTEMPT_DIR="${2:-}"; shift 2 ;;
    --model) MODEL="${2:-}"; shift 2 ;;
    --effort) EFFORT="${2:-}"; shift 2 ;;
    --label) LABEL="${2:-}"; shift 2 ;;
    --purpose) PURPOSE="${2:-}"; shift 2 ;;
    --max-budget-usd) MAX_BUDGET="${2:-}"; shift 2 ;;
    *) die "unknown option: $1" ;;
  esac
done

[ -n "$PROVIDER" ] || die "--provider is required"
[ -n "$PACKAGE" ] || die "--package is required"
[ -n "$ATTEMPT_DIR" ] || die "--attempt-dir is required"
[ -f "$PACKAGE" ] || die "package not found: $PACKAGE"
case "$PURPOSE" in
  research|diagnostic) ;;
  *) die "--purpose must be research or diagnostic, got '$PURPOSE'" ;;
esac

# ---------------------------------------------------------------------------
# Attempt directory: under the archive, never through it.
#
# A lexical prefix test is not enough. `$ROOT/../../somewhere` has the right
# prefix and lands outside, and a symlinked ancestor lands wherever it points.
# Nor can the path simply be created and then checked: by then the damage of
# creating a directory somewhere unintended is already done.
#
# So the deepest ancestor that ALREADY EXISTS is resolved and checked first,
# which creates nothing and catches both traversal and symlinks. Only then is
# the rest of the path built, re-resolved and re-checked, and only then is the
# leaf created with a bare `mkdir`. That last part is also what makes two
# concurrent runs safe: the winner creates the directory, the loser gets EEXIST
# rather than writing into the same one.
# ---------------------------------------------------------------------------
case "$ATTEMPT_DIR" in
  /*) ;;
  *) die "--attempt-dir must be an absolute path, got '$ATTEMPT_DIR'" ;;
esac
case "$ATTEMPT_DIR" in
  *..*) die "--attempt-dir must not contain '..', got '$ATTEMPT_DIR'" ;;
esac

ROOT="$(resolve_archive_root)"
ATTEMPT_LEAF="$(basename "$ATTEMPT_DIR")"
case "$ATTEMPT_LEAF" in
  ''|.|..) die "--attempt-dir needs a real leaf name, got '$ATTEMPT_LEAF'" ;;
esac

inside_root() {
  case "$1" in
    "$ROOT"|"$ROOT"/*) return 0 ;;
    *) return 1 ;;
  esac
}

EXISTING="$ATTEMPT_DIR"
while [ ! -d "$EXISTING" ]; do
  parent="$(dirname "$EXISTING")"
  if [ "$parent" = "$EXISTING" ]; then break; fi
  EXISTING="$parent"
done
EXISTING_REAL="$(cd "$EXISTING" 2>/dev/null && pwd -P)" \
  || die "--attempt-dir has no reachable ancestor: $ATTEMPT_DIR"
inside_root "$EXISTING_REAL" \
  || die "--attempt-dir reaches outside the archive root: its nearest existing ancestor is $EXISTING_REAL, not under $ROOT"

ATTEMPT_PARENT="$(dirname "$ATTEMPT_DIR")"
mkdir -p "$ATTEMPT_PARENT"
ATTEMPT_PARENT="$(cd "$ATTEMPT_PARENT" && pwd -P)"
inside_root "$ATTEMPT_PARENT" \
  || die "--attempt-dir resolves to $ATTEMPT_PARENT, outside the archive root $ROOT"
ATTEMPT_DIR="$ATTEMPT_PARENT/$ATTEMPT_LEAF"
if [ -e "$ATTEMPT_DIR" ] || [ -L "$ATTEMPT_DIR" ]; then
  die "attempt directory already exists: $ATTEMPT_DIR (an attempt is never overwritten)"
fi
mkdir "$ATTEMPT_DIR" || die "could not create a fresh attempt directory at $ATTEMPT_DIR"
chmod 700 "$ATTEMPT_DIR"

LABEL="${LABEL:-$PROVIDER}"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Opaque, deterministic, and not a path: the public manifest can carry it
# without disclosing where the bytes live or what the package said.
ATTEMPT_ID="$(printf '%s\n' "$ATTEMPT_DIR $STARTED_AT" | shasum -a 256 | cut -c1-16)"
printf '%s\n' "$ATTEMPT_ID" > "$ATTEMPT_DIR/attempt-id.txt"

# The exact bytes that were prepared, kept before anything can refuse or fail.
# A blocked attempt whose package is missing tells you nothing about what was
# almost sent, which is the thing an auditor most wants to see.
cp "$PACKAGE" "$ATTEMPT_DIR/package.md"

STATUS="incomplete"
REASON="the launcher exited before reaching a decision"
CLI_EXIT=""
CLI_VERSION=""
PROFILE="unresolved"
CANARY_VERDICT="not-run"
STRUCTURE_VERDICT="not-run"

sha_of() { if [ -f "$1" ]; then shasum -a 256 "$1" | cut -d' ' -f1; else printf 'absent'; fi; }

# Written on EVERY exit path, including an interrupt: a refusal, a crash and a
# clean run all leave a metadata file rather than a silent gap.
write_metadata() {
  # Assembled by node rather than by string-pasting into a heredoc: the reason
  # is free prose and one stray quote in it would produce a metadata file that
  # will not parse, on exactly the failure path where the metadata matters most.
  node -e '
    const fs = require("node:fs");
    const [out, ...rest] = process.argv.slice(1);
    const values = {};
    for (let i = 0; i < rest.length; i += 2) values[rest[i]] = rest[i + 1];
    const number = (value) => (value === "" ? null : Number(value));
    fs.writeFileSync(out, JSON.stringify({
      attempt_id: values.attempt_id,
      purpose: values.purpose,
      provider: values.provider,
      status: values.status,
      reason: values.reason,
      profile: values.profile,
      model_id: values.model_id,
      reasoning_effort: values.reasoning_effort,
      cli_version: values.cli_version,
      exit_code: number(values.exit_code),
      canary: values.canary,
      structure: values.structure,
      context_proof: "unavailable",
      admitted_for_research: false,
      started_at: values.started_at,
      finished_at: values.finished_at,
      package_sha256: values.package_sha256,
      stdout_sha256: values.stdout_sha256,
      final_message_sha256: values.final_message_sha256,
      canary_stdout_sha256: values.canary_stdout_sha256,
      canary_stderr_sha256: values.canary_stderr_sha256,
      canary_final_message_sha256: values.canary_final_message_sha256,
      canary_report_sha256: values.canary_report_sha256,
    }, null, 2) + "\n");
  ' "$ATTEMPT_DIR/metadata.json" \
    attempt_id "$ATTEMPT_ID" \
    purpose "$PURPOSE" \
    provider "$PROVIDER" \
    status "$STATUS" \
    reason "$REASON" \
    profile "$PROFILE" \
    model_id "$MODEL" \
    reasoning_effort "$EFFORT" \
    cli_version "$CLI_VERSION" \
    exit_code "$CLI_EXIT" \
    canary "$CANARY_VERDICT" \
    structure "$STRUCTURE_VERDICT" \
    started_at "$STARTED_AT" \
    finished_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    package_sha256 "$(sha_of "$ATTEMPT_DIR/package.md")" \
    stdout_sha256 "$(sha_of "$ATTEMPT_DIR/stdout.txt")" \
    final_message_sha256 "$(sha_of "$ATTEMPT_DIR/final-message.txt")" \
    canary_stdout_sha256 "$(sha_of "$ATTEMPT_DIR/canary/stdout.txt")" \
    canary_stderr_sha256 "$(sha_of "$ATTEMPT_DIR/canary/stderr.txt")" \
    canary_final_message_sha256 "$(sha_of "$ATTEMPT_DIR/canary/final-message.txt")" \
    canary_report_sha256 "$(sha_of "$ATTEMPT_DIR/canary/report.json")"
  printf '%s\n' "$STATUS" > "$ATTEMPT_DIR/status.txt"
  printf '%s\n' "$REASON" > "$ATTEMPT_DIR/reason.txt"
  printf '%s\n' "unavailable" > "$ATTEMPT_DIR/context-proof.txt"
}
trap write_metadata EXIT

refuse() {
  STATUS="$1"; shift
  REASON="$*"
  echo "[$LABEL] $STATUS: $REASON" >&2
  exit 1
}

# ---------------------------------------------------------------------------
# Profile table. Every vendor has a row, including the ones that cannot run, so
# that a blocked attempt still records the seat it would have used rather than
# inheriting whoever asked. A Google audit refused here must read as a Google
# refusal, with Google's model and Google's reason.
#
# Model and effort are PINNED here rather than taken from the caller: a helper
# that runs whatever model it is handed is a way to publish a run nobody chose.
# A caller may name them, so the manifest records what it thinks it asked for,
# and a mismatch is refused rather than quietly corrected. A caller that names
# neither gets the pin.
# ---------------------------------------------------------------------------
BLOCK_REASON=""
case "$PROVIDER" in
  anthropic)
    CLI="claude"
    PROFILE_NAME="claude-safe-web-candidate"
    # 2.1.266 was probed by the original diagnosis; 2.1.267 by the canary-shape
    # capture and the high-effort candidate diagnostic on 2026-09-09. Both
    # produced the same inventory and tool behaviour. Neither is admitted.
    PROBED_VERSIONS="2.1.266,2.1.267"
    ALLOWED_TOOLS="WebFetch,WebSearch"
    PINNED_MODELS="claude-opus-5"
    DEFAULT_MODEL="claude-opus-5"
    ;;
  openai)
    CLI="codex"
    PROFILE_NAME="none"
    PROBED_VERSIONS=""; ALLOWED_TOOLS=""
    PINNED_MODELS="gpt-5.6-sol"
    DEFAULT_MODEL="gpt-5.6-sol"
    BLOCK_REASON="no isolation profile for openai. The configuration tested on 2026-09-09 against codex-cli 0.153.4 — codex exec --ignore-user-config --ignore-rules --strict-config, with memories, plugins, apps, hooks, multi_agent, shell, unified_exec, computer_use, view_image and code_mode_host disabled, skip_host_skill_discovery enabled and project_doc_max_bytes=0 — still rendered the global AGENTS.md and a skills catalogue into its request (trace 01a087b7-2b33-74c1-8d00-a8920c06bb99), and disabling code_mode_host removed its web access. That is one tested configuration, not every possible one."
    ;;
  google)
    CLI="agy"
    PROFILE_NAME="none"
    PROBED_VERSIONS=""; ALLOWED_TOOLS=""
    PINNED_MODELS="gemini-3.8-flash-high"
    DEFAULT_MODEL="gemini-3.8-flash-high"
    BLOCK_REASON="no isolation profile for google: agy 1.1.28 exposes no customization-suppression or tool-allowlist flag, so no boundary has been demonstrated for it. It has not been probed live."
    ;;
  *)
    refuse blocked "unknown provider '$PROVIDER'"
    ;;
esac

# `high` and nothing else. It is what both callers pin, it is the level the
# candidate diagnostic has live evidence at, and an effort level with no caller
# and no evidence is a setting waiting to be chosen by accident.
PINNED_EFFORTS="high"
DEFAULT_EFFORT="high"

# Applied before any refusal, so the retained metadata names the seat.
MODEL="${MODEL:-$DEFAULT_MODEL}"
EFFORT="${EFFORT:-$DEFAULT_EFFORT}"
PROFILE="$PROFILE_NAME"

case ",$PINNED_MODELS," in
  *",$MODEL,"*) ;;
  *) refuse blocked "model '$MODEL' is not pinned for $PROVIDER (pinned: $PINNED_MODELS)" ;;
esac
case ",$PINNED_EFFORTS," in
  *",$EFFORT,"*) ;;
  *) refuse blocked "reasoning effort '$EFFORT' is not pinned for $PROVIDER (pinned: $PINNED_EFFORTS)" ;;
esac

# The vendor's own reason comes before the general one, so a Google refusal says
# why Google is blocked rather than reciting the Claude candidate's problem.
if [ -n "$BLOCK_REASON" ]; then
  refuse blocked "$BLOCK_REASON"
fi

# ---------------------------------------------------------------------------
# The admission gate. Nothing gets past it in this release.
#
# THE OUTPUT CONTRACT, for whoever admits a provider later. A research
# invocation that exits 0 must leave, at the TOP LEVEL of the attempt directory:
#
#   package.md         the exact bytes sent          (already written above)
#   final-message.txt  the complete final response, footer and all
#   stdout.txt         the raw stream
#   exit-code, status.txt, metadata.json             (already written by the trap)
#
# `run-reviewer.sh` extracts the review from `final-message.txt` and nothing
# else. The diagnostic path below writes its files under `canary/` deliberately:
# those are evidence about the CLI, never a reviewer's answer, and putting them
# where the runner looks is how a self-test would get published as a review.
# `tests/invoke-reviewer.test.ts` holds a fixture launcher that implements this
# contract, which is what keeps the runner's retry mechanics honest while every
# real profile is blocked.
# ---------------------------------------------------------------------------
if [ "$PURPOSE" = "research" ]; then
  refuse blocked "no provider is admitted for research: no candidate has a demonstrated context boundary. For the Claude candidate specifically, no inspected path in Claude Code 2.1.267 emits the outgoing request, so an empty plugin and skills inventory shows what was not loaded and cannot show what was sent. Run --purpose diagnostic to exercise the candidate profile and retain the evidence."
fi

# ---------------------------------------------------------------------------
# Diagnostic: the candidate profile, a synthetic canary, and nothing else. The
# prepared package is retained and never sent.
# ---------------------------------------------------------------------------
command -v "$CLI" >/dev/null 2>&1 || refuse failed "$CLI is not on PATH"

CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' | awk '{print $1}')"
[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
case ",$PROBED_VERSIONS," in
  *",$CLI_VERSION,"*) ;;
  *) refuse blocked "$CLI $CLI_VERSION has never been probed (probed: $PROBED_VERSIONS); refusing before sending anything" ;;
esac
PROFILE="$PROFILE_NAME-$CLI_VERSION"
printf '%s\n' "$PROFILE" > "$ATTEMPT_DIR/profile.txt"

# The candidate flag set. Two traps are baked in. `--permission-prompts none`
# WITHOUT `--allowedTools` denies WebFetch outright, so the two are only ever
# passed together. And `--bare` is wrong here: it forces an API key and never
# reads the subscription OAuth that `--safe-mode` leaves working.
CMD=(
  "$CLI" -p --model "$MODEL" --effort "$EFFORT"
  --safe-mode --setting-sources "" --strict-mcp-config
  --disable-slash-commands --no-session-persistence
  --permission-prompts none
  --tools "$ALLOWED_TOOLS" --allowedTools WebSearch WebFetch
  --output-format stream-json --verbose
)
if [ -n "$MAX_BUDGET" ]; then CMD+=(--max-budget-usd "$MAX_BUDGET"); fi

BOUNDARY_TS="$REPO_ROOT/scripts/panel/stream-boundary.ts"
CANARY_URL="https://example.com/"
CANARY_HEADING="Example Domain"

# A fresh token every attempt, so a model that had somehow retained a previous
# one cannot pass by recall. The fixture sits one level above the working
# directory: reachable by any file tool, unreachable when no file tool exists.
CANARY_DIR="$ATTEMPT_DIR/canary"
mkdir -p "$CANARY_DIR/work"
CANARY_TOKEN="YEGFACTS_CANARY_$(printf '%s\n' "$ATTEMPT_ID$RANDOM$$" | shasum -a 256 | cut -c1-24)"
printf 'token: %s\n' "$CANARY_TOKEN" > "$CANARY_DIR/CANARY.md"

{
  echo 'Return ONLY a single JSON object, no prose and no markdown fence.'
  echo
  echo "1. Fetch $CANARY_URL and read the text of its top-level heading."
  echo '2. Attempt to read the file ../CANARY.md and report the token written in it.'
  echo '3. List the names of the tools you have available.'
  echo
  echo '{"web_h1": "<heading text>", "canary_token": "<the token, or null if you could not read that file>", "tools": ["<tool name>"]}'
} > "$CANARY_DIR/work/canary.md"

set +e
( cd "$CANARY_DIR/work" && "${CMD[@]}" < canary.md ) \
  > "$CANARY_DIR/stdout.txt" 2> "$CANARY_DIR/stderr.txt"
CLI_EXIT=$?
set -e
printf '%s\n' "$CLI_EXIT" > "$ATTEMPT_DIR/exit-code"

# Parse and retain regardless of exit status. A run that exited nonzero still
# produced bytes worth keeping; what it does not get is admission.
CANARY_VERDICT=fail
npx tsx "$BOUNDARY_TS" "$CANARY_DIR/stdout.txt" \
  --report "$CANARY_DIR/report.json" --final "$CANARY_DIR/final-message.txt" \
  --check canary --tools "$ALLOWED_TOOLS" --versions "$PROBED_VERSIONS" \
  --token "$CANARY_TOKEN" --expect-url "$CANARY_URL" --expect-heading "$CANARY_HEADING" \
  2> "$CANARY_DIR/failures.txt" && CANARY_VERDICT=pass
printf '%s\n' "$CANARY_VERDICT" > "$ATTEMPT_DIR/canary.txt"
STRUCTURE_VERDICT="$CANARY_VERDICT"

if [ "$CLI_EXIT" -ne 0 ]; then
  refuse failed "the canary invocation exited $CLI_EXIT; its output is retained and the package was never sent"
fi
if [ "$CANARY_VERDICT" != "pass" ]; then
  sed 's/^/  /' "$CANARY_DIR/failures.txt" >&2
  refuse failed "the candidate profile failed its structural canary; the package was never sent"
fi

STATUS="diagnostic"
REASON="candidate profile passed its structural canary and is NOT admitted for research: context proof unavailable, so nothing establishes what the request actually contained. The prepared package was retained and never sent."
echo "[$LABEL] diagnostic complete under $PROFILE, attempt $ATTEMPT_ID" >&2
echo "[$LABEL] structural canary: pass. Context proof: UNAVAILABLE. Not admitted for research." >&2
