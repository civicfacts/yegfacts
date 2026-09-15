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
# WHAT IS CAPTURED, AND WHAT IS NOT.
#
# The old promise was that a fresh `mktemp -d` working directory isolated a
# reviewer. It never did: a CLI loads its user-level instructions from $HOME
# whatever its working directory is. The replacement candidate was the vendor's
# own customization suppression, checked against the CLI's `system/init`
# inventory. That check is worth having and it is implemented here, but it never
# carried the claim on its own: an empty plugin list proves plugins were not
# loaded, not that no CLAUDE.md, memory or host instruction reached the model.
#
# What settles it is the outgoing request, and from 2026-09-15 this launcher
# keeps it. Claude Code 2.1.272 honours ANTHROPIC_BASE_URL, so every invocation
# runs through scripts/panel/record-proxy.mjs, which writes each request and
# response to the attempt directory and forwards them unchanged to
# https://api.anthropic.com. scripts/panel/request-proof.ts then checks the
# capture against a pinned description of a clean request: the vendor default
# prompt by hash, exactly two client tool definitions by hash, four host
# reminder blocks matching a fixed template, and the declared package byte for
# byte as the last block of the first user message.
#
# The package leaves twice per research attempt, and no message here pretends
# otherwise. Before the main turn the CLI sends a session-naming request that
# wraps the whole package in <session> tags and carries no tools. Both are in
# the capture and both are checked; a refusal after the research run has started
# is a refusal to publish, not a claim that nothing left the machine.
#
# What is NOT covered, stated plainly because a capture invites the opposite
# reading. The proxy sees what the CLI addresses to its configured base URL.
# Nothing else on the machine is watched. The vendor prompt is pinned by hash
# and never read. The request tells the model the operator's account email and
# working directory through the vendor's own reminder blocks: those are
# recorded and published as disclosed host context, not suppressed and not
# counted as isolation. A passing proof is evidence about one attempt under one
# CLI version. It is not a vendor guarantee, and no historical run is
# retroactively certified.
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
#   anthropic (claude 2.1.272): the candidate profile, admitted for research
#   only when the canary and the research run each pass their structural check
#   AND their request proof, and only when the upstream was production.
#   `--purpose diagnostic` runs the canary alone, captures and proves its
#   request, and never sends the package.
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
CLI_EXECUTABLE=""
CLI_EXECUTABLE_SHA=""
PATH_CLI_VERSION="absent"
WORK_ROOT=""
PROFILE="unresolved"
CANARY_VERDICT="not-run"
STRUCTURE_VERDICT="not-run"
# "unavailable" until a capture has actually been proved, so every exit path
# before that records the honest answer rather than an optimistic default.
CONTEXT_PROOF="unavailable"
CANARY_CONTEXT_PROOF="unavailable"
PINS_SOURCE="built-in"
ADMITTED="false"
ADMISSION_REASON="the launcher exited before reaching a decision"

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
    // The proof summary is read back out of the report the check wrote rather
    // than shuttled through a dozen shell variables. A report that is missing,
    // truncated or from a run that never reached the check leaves every field
    // absent, which reads as "not recorded" everywhere downstream.
    const summary = (file) => {
      try {
        const report = JSON.parse(fs.readFileSync(file, "utf8"));
        return report.request_proof && report.request_proof.summary ? report.request_proof.summary : null;
      } catch { return null; }
    };
    const research = summary(values.report);
    const canary = summary(values.canary_report);
    const spread = (prefix, value) => (value === null ? {} : {
      [prefix + "upstream"]: value.upstream,
      [prefix + "vendor_prompt_sha256"]: value.vendor_prompt_sha256,
      [prefix + "tool_definitions_sha256"]: value.tool_definitions_sha256,
      [prefix + "request_count"]: value.request_count,
      [prefix + "main_turn_count"]: value.main_turn_count,
      [prefix + "side_request_counts"]: value.side_request_counts,
      [prefix + "requests_manifest_sha256"]: value.requests_manifest_sha256 ?? null,
    });
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
      // Private only. attempt-record.ts never copies these: where a CLI build
      // sits on this machine, and where the attempt worked, are not part of the
      // public record. The hash of the build IS public, under cli_version.
      cli_executable: values.cli_executable,
      cli_executable_sha256: values.cli_executable_sha256,
      work_dir: values.work_dir,
      // What `claude --version` on PATH says, which from methodology v1.29 is
      // not necessarily what ran. Public: a reader comparing the two sees that
      // the launcher held the pin rather than following the installer.
      path_cli_version: values.path_cli_version,
      exit_code: number(values.exit_code),
      canary: values.canary,
      structure: values.structure,
      context_proof: values.context_proof,
      admitted_for_research: values.admitted === "true",
      admission_reason: values.admission_reason,
      pins_source: values.pins_source,
      started_at: values.started_at,
      finished_at: values.finished_at,
      package_sha256: values.package_sha256,
      stdout_sha256: values.stdout_sha256,
      final_message_sha256: values.final_message_sha256,
      proof_report_sha256: values.proof_report_sha256,
      canary_stdout_sha256: values.canary_stdout_sha256,
      canary_stderr_sha256: values.canary_stderr_sha256,
      canary_final_message_sha256: values.canary_final_message_sha256,
      // The canary boundary report is also its proof report: one file, one hash.
      canary_report_sha256: values.canary_report_sha256,
      canary_context_proof: values.canary_context_proof,
      ...spread("", research),
      ...spread("canary_", canary),
    }, null, 2) + "\n");
  ' "$ATTEMPT_DIR/metadata.json" \
    report "$ATTEMPT_DIR/report.json" \
    canary_report "$ATTEMPT_DIR/canary/report.json" \
    cli_executable "$CLI_EXECUTABLE" \
    cli_executable_sha256 "$CLI_EXECUTABLE_SHA" \
    path_cli_version "$PATH_CLI_VERSION" \
    work_dir "$WORK_ROOT" \
    context_proof "$CONTEXT_PROOF" \
    canary_context_proof "$CANARY_CONTEXT_PROOF" \
    admitted "$ADMITTED" \
    admission_reason "$ADMISSION_REASON" \
    pins_source "$PINS_SOURCE" \
    proof_report_sha256 "$(sha_of "$ATTEMPT_DIR/report.json")" \
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
  printf '%s\n' "$CONTEXT_PROOF" > "$ATTEMPT_DIR/context-proof.txt"
}

# ---------------------------------------------------------------------------
# The recording proxy.
#
# One per invocation, never shared: the canary and the research run each get
# their own capture directory, so a research proof can never be satisfied by
# the canary's requests. ANTHROPIC_BASE_URL is set on the CLI subprocess only,
# as a prefix assignment on the command itself. It is never exported into this
# shell and never written to a configuration file, so nothing outside the
# subprocess is redirected and nothing survives this run.
#
# The port is chosen by the kernel and reported back through a file the proxy
# renames into place once it is listening. Picking a port in bash and hoping
# would be a race, and a proxy that was not yet listening when the CLI started
# would send the first request straight past the capture.
# ---------------------------------------------------------------------------
PROXY_SCRIPT="$REPO_ROOT/scripts/panel/record-proxy.mjs"
PROXY_PID=""
PROXY_PORT=""

start_proxy() {
  local out="$1" portfile="$2"
  mkdir -p "$out"
  node "$PROXY_SCRIPT" --out "$out" --port-file "$portfile" &
  PROXY_PID=$!
  local waited=0
  while [ ! -f "$portfile" ]; do
    if ! kill -0 "$PROXY_PID" 2>/dev/null; then
      PROXY_PID=""
      refuse failed "the recording proxy exited before it started listening; nothing was sent"
    fi
    sleep 0.1
    waited=$((waited + 1))
    if [ "$waited" -ge 100 ]; then
      stop_proxy
      refuse failed "the recording proxy did not start listening within ten seconds; nothing was sent"
    fi
  done
  PROXY_PORT="$(tr -d '\r\n' < "$portfile")"
}

# Waited on, not merely signalled. The proxy writes a response capture when the
# response ends, so "the CLI exited" is not "the files are on disk"; waiting for
# the proxy process to go is what makes the check read a complete capture.
stop_proxy() {
  [ -n "$PROXY_PID" ] || return 0
  kill "$PROXY_PID" 2>/dev/null || true
  wait "$PROXY_PID" 2>/dev/null || true
  PROXY_PID=""
}

trap 'stop_proxy; write_metadata' EXIT

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
    # Only versions with a pinned request profile in request-proof.ts. 2.1.266
    # and 2.1.267 are gone: they were probed before anything emitted a request,
    # so there is nothing to pin for them and no capture to pin it from. A
    # version with no row fails closed here, before a package is sent.
    PROBED_VERSIONS="2.1.272"
    # The build the pins describe, and the build the launcher runs. The
    # installer keeps every version as a standalone binary, so a newer CLI
    # arriving on PATH does not take the seat with it.
    PINNED_CLI_VERSION="2.1.272"
    ALLOWED_TOOLS="WebFetch,WebSearch"
    PINNED_MODELS="claude-opus-5"
    DEFAULT_MODEL="claude-opus-5"
    ;;
  openai)
    CLI="codex"
    PROFILE_NAME="none"
    PROBED_VERSIONS=""; ALLOWED_TOOLS=""; PINNED_CLI_VERSION=""
    PINNED_MODELS="gpt-5.6-sol"
    DEFAULT_MODEL="gpt-5.6-sol"
    BLOCK_REASON="no isolation profile for openai. The configuration tested on 2026-09-09 against codex-cli 0.153.4 — codex exec --ignore-user-config --ignore-rules --strict-config, with memories, plugins, apps, hooks, multi_agent, shell, unified_exec, computer_use, view_image and code_mode_host disabled, skip_host_skill_discovery enabled and project_doc_max_bytes=0 — still rendered the global AGENTS.md and a skills catalogue into its request (trace 01a087b7-2b33-74c1-8d00-a8920c06bb99), and disabling code_mode_host removed its web access. That is one tested configuration, not every possible one."
    ;;
  google)
    CLI="agy"
    PROFILE_NAME="none"
    PROBED_VERSIONS=""; ALLOWED_TOOLS=""; PINNED_CLI_VERSION=""
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
# The admission gate.
#
# THE OUTPUT CONTRACT. A research invocation that exits 0 leaves, at the TOP
# LEVEL of the attempt directory:
#
#   package.md         the exact bytes sent          (already written above)
#   final-message.txt  the complete final response, footer and all
#   stdout.txt         the raw stream
#   requests/          the captured outgoing requests and responses
#   report.json        the structural verdict and the request proof
#   exit-code, status.txt, metadata.json             (written by the trap)
#
# `run-reviewer.sh` extracts the review from `final-message.txt` and nothing
# else. The canary's files live under `canary/` deliberately: those are evidence
# about the CLI, never a reviewer's answer, and putting them where the runner
# looks is how a self-test would get published as a review.
#
# THE ORDER, which is the whole gate. Version check first, so an unpinned CLI
# stops before anything is spent. Then the canary through its own proxy, with
# both its structural check and its request proof. Only if both pass does the
# package go anywhere, and then through a fresh proxy whose capture gets the
# same treatment. Exit 0 requires the CLI to have exited 0 and all four checks
# to have passed.
# ---------------------------------------------------------------------------
# The pin table. Built-in unless YEGFACTS_REVIEW_PINS names another, which only
# exists so a test can prove a capture whose hash-pinned blocks are stand-ins:
# the repository pins the vendor prompt and the two tool definitions by hash and
# does not carry their text, so a fixture cannot reproduce them. It is gated on
# the loopback upstream, so it cannot be used against the API, and a run that
# used it is never admitted. Both facts are recorded.
PINS_SOURCE="built-in"
PINS_ARGS=()
if [ -n "${YEGFACTS_REVIEW_PINS:-}" ]; then
  case "${YEGFACTS_REVIEW_UPSTREAM:-}" in
    http://127.0.0.1*|http://localhost*)
      PINS_SOURCE="override"
      PINS_ARGS=(--pins "$YEGFACTS_REVIEW_PINS")
      ;;
    *)
      refuse blocked "YEGFACTS_REVIEW_PINS was set without a loopback YEGFACTS_REVIEW_UPSTREAM: a substitute pin table is a test fixture and must never be used against the API"
      ;;
  esac
fi

# WHICH BYTES RUN, which is a different question from which version is on PATH.
#
# The pins in request-proof.ts describe one build of one CLI. The `claude` on
# PATH is a shim that follows the installer, and by the time this shipped the
# installer had already moved to 2.1.273 while the captures behind the pins came
# from 2.1.272. A newer CLI is not a worse one. It is an unprobed one, and there
# is nothing to compare its request against.
#
# A version string is not enough either: it is whatever the executable says when
# asked. So the build is pinned by the SHA-256 of the file, and the launcher
# keeps its own copy of it in the archive. Three outcomes and no fallback:
#
#   (a) the archived copy exists and hashes to the pin, and is run;
#   (b) no archived copy, but the installer's file exists and hashes to the pin,
#       so it is copied into the archive (0700 directory, 0500 file) and the
#       copy is run;
#   (c) neither, and this refuses.
#
# A hash that does not match is its own refusal in either case. The point of
# (b) is that the installer overwrites and removes builds on its own schedule;
# a published proof that named a build nobody can produce any more would be
# worth very little. The copy is read-only so a later run cannot quietly get
# different bytes under the same name.
#
# There is no PATH fallback. What PATH reports is recorded and nothing else.
CLI_NAME="$CLI"

PATH_CLI_VERSION="absent"
if command -v "$CLI_NAME" >/dev/null 2>&1; then
  PATH_CLI_VERSION="$("$CLI_NAME" --version 2>/dev/null | head -1 | tr -d '\r' | awk '{print $1}')"
  [ -n "$PATH_CLI_VERSION" ] || PATH_CLI_VERSION="unknown"
fi

# Keyed by build AND model: the request shape depends on both, which a live
# demonstration proved by refusing a request the Haiku-derived pins had never
# described.
PINNED_BINARY_SHA="$(npx tsx "$REPO_ROOT/scripts/panel/request-proof.ts" \
  --field binarySha256 --cli-version "$PINNED_CLI_VERSION" --model "$MODEL" \
  "${PINS_ARGS[@]+"${PINS_ARGS[@]}"}")" \
  || refuse blocked "no pinned profile for $CLI_NAME $PINNED_CLI_VERSION running $MODEL; refusing before sending anything"

sha_of_file() { shasum -a 256 "$1" | cut -d' ' -f1; }

ARCHIVED_CLI="$ROOT/cli/$CLI_NAME-$PINNED_CLI_VERSION"
INSTALLED_CLI="${HOME}/.local/share/claude/versions/${PINNED_CLI_VERSION}"

if [ -f "$ARCHIVED_CLI" ]; then
  CLI_EXECUTABLE_SHA="$(sha_of_file "$ARCHIVED_CLI")"
  [ "$CLI_EXECUTABLE_SHA" = "$PINNED_BINARY_SHA" ] || refuse blocked \
    "the archived copy of build $PINNED_CLI_VERSION hashes to $CLI_EXECUTABLE_SHA, not the pinned $PINNED_BINARY_SHA; refusing before sending anything"
  CLI="$ARCHIVED_CLI"
elif [ -f "$INSTALLED_CLI" ]; then
  CLI_EXECUTABLE_SHA="$(sha_of_file "$INSTALLED_CLI")"
  [ "$CLI_EXECUTABLE_SHA" = "$PINNED_BINARY_SHA" ] || refuse blocked \
    "the installed build $PINNED_CLI_VERSION hashes to $CLI_EXECUTABLE_SHA, not the pinned $PINNED_BINARY_SHA; refusing before sending anything"
  mkdir -p "$ROOT/cli"
  chmod 700 "$ROOT/cli"
  # Copied under a unique name and renamed into place, so two sessions racing
  # here cannot run a half-written binary.
  staging="$ARCHIVED_CLI.partial.$$"
  cp "$INSTALLED_CLI" "$staging"
  chmod 500 "$staging"
  mv "$staging" "$ARCHIVED_CLI"
  CLI="$ARCHIVED_CLI"
else
  refuse blocked "pinned build $PINNED_CLI_VERSION is not installed and no archived copy exists"
fi

# Private only: it names a path on this machine and never crosses into the
# public manifest. The hash is what a reader of the public row would be given.
CLI_EXECUTABLE="$CLI"

CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' | awk '{print $1}')"
[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
case ",$PROBED_VERSIONS," in
  *",$CLI_VERSION,"*) ;;
  *) refuse blocked "$CLI_NAME $CLI_VERSION has never been probed (probed: $PROBED_VERSIONS); refusing before sending anything" ;;
esac
if [ -n "$PINNED_CLI_VERSION" ] && [ "$CLI_VERSION" != "$PINNED_CLI_VERSION" ]; then
  refuse blocked "$CLI_NAME $CLI_VERSION is not the pinned build $PINNED_CLI_VERSION; a new version needs its own capture and its own pin row before it can run. Refusing before sending anything"
fi
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
#
# `canary.md` stays one directory below `CANARY.md` in the retained copy as
# well as in the working tree. On a case-insensitive filesystem the two names
# are the same file, and putting them side by side silently overwrote the token
# with the prompt.
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

# ---------------------------------------------------------------------------
# The working directory, which the model is told.
#
# The vendor's environment reminder puts the working directory in every request,
# so the path itself is context the reviewer receives. Running inside the
# attempt directory meant that context read as
# `.../<story>/<date>/round1/claude/...`: the story, the round and the seat,
# handed to a reviewer that is supposed to answer blind. So the run happens in
# an opaque temporary directory named only by the attempt id, outside the
# archive and outside every repository.
#
# The files are still retained, in the attempt directory where they were
# written. What goes into the temporary tree is a copy, and afterwards only the
# named files this created are removed and only the directories it made are
# taken away. A `rmdir` that fails because the CLI left something behind is
# left alone rather than forced: nothing here deletes what it did not make.
# ---------------------------------------------------------------------------
WORK_ROOT="${TMPDIR:-/tmp}"
WORK_ROOT="${WORK_ROOT%/}/attempt-$ATTEMPT_ID"
mkdir -p "$WORK_ROOT/canary/work" "$WORK_ROOT/work"
chmod 700 "$WORK_ROOT"
# Resolved, because the CLI reports the resolved path in its environment
# reminder and the proof compares the two. On macOS $TMPDIR is under /var,
# which is a symlink to /private/var.
WORK_ROOT="$(cd "$WORK_ROOT" && pwd -P)"
cp "$CANARY_DIR/CANARY.md" "$WORK_ROOT/canary/CANARY.md"
cp "$CANARY_DIR/work/canary.md" "$WORK_ROOT/canary/work/canary.md"

clean_work() {
  [ -n "$WORK_ROOT" ] || return 0
  rm -f "$WORK_ROOT/canary/work/canary.md" "$WORK_ROOT/canary/CANARY.md"
  rmdir "$WORK_ROOT/canary/work" "$WORK_ROOT/canary" "$WORK_ROOT/work" "$WORK_ROOT" 2>/dev/null || true
}
trap 'stop_proxy; clean_work; write_metadata' EXIT

CANARY_WORK="$(cd "$WORK_ROOT/canary/work" && pwd -P)"
RESEARCH_WORK="$(cd "$WORK_ROOT/work" && pwd -P)"

# Reads the context-proof status a boundary report recorded. Absent or
# unreadable is "unavailable", never "pass".
proof_status() {
  node -e '
    const fs = require("node:fs");
    try {
      const report = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
      process.stdout.write(String(report.context_proof.status));
    } catch { process.stdout.write("unavailable"); }
  ' "$1"
}

start_proxy "$CANARY_DIR/requests" "$CANARY_DIR/proxy-port"
set +e
( cd "$CANARY_WORK" \
    && ANTHROPIC_BASE_URL="http://127.0.0.1:$PROXY_PORT" "${CMD[@]}" < canary.md ) \
  > "$CANARY_DIR/stdout.txt" 2> "$CANARY_DIR/stderr.txt"
CLI_EXIT=$?
set -e
stop_proxy
printf '%s\n' "$CLI_EXIT" > "$CANARY_DIR/exit-code"
printf '%s\n' "$CLI_EXIT" > "$ATTEMPT_DIR/exit-code"

# Parse and retain regardless of exit status. A run that exited nonzero still
# produced bytes worth keeping; what it does not get is admission.
CANARY_VERDICT=fail
npx tsx "$BOUNDARY_TS" "$CANARY_DIR/stdout.txt" \
  --report "$CANARY_DIR/report.json" --final "$CANARY_DIR/final-message.txt" \
  --check canary --tools "$ALLOWED_TOOLS" --versions "$PROBED_VERSIONS" \
  --token "$CANARY_TOKEN" --expect-url "$CANARY_URL" --expect-heading "$CANARY_HEADING" \
  --requests "$CANARY_DIR/requests" --package "$CANARY_DIR/work/canary.md" \
  --work-dir "$CANARY_WORK" --model "$MODEL" "${PINS_ARGS[@]+"${PINS_ARGS[@]}"}" \
  2> "$CANARY_DIR/failures.txt" && CANARY_VERDICT=pass
printf '%s\n' "$CANARY_VERDICT" > "$ATTEMPT_DIR/canary.txt"
STRUCTURE_VERDICT="$CANARY_VERDICT"
CANARY_CONTEXT_PROOF="$(proof_status "$CANARY_DIR/report.json")"
printf '%s\n' "$CANARY_CONTEXT_PROOF" > "$CANARY_DIR/context-proof.txt"

if [ "$CLI_EXIT" -ne 0 ]; then
  refuse failed "the canary invocation exited $CLI_EXIT; its output is retained and the package was never sent"
fi
if [ "$CANARY_VERDICT" != "pass" ]; then
  sed 's/^/  /' "$CANARY_DIR/failures.txt" >&2
  refuse failed "the candidate profile failed its canary: the structural check or the request proof did not pass. The package was never sent."
fi

if [ "$PURPOSE" != "research" ]; then
  # The diagnostic asks the CLI about itself. Its canary request is captured and
  # proved, which is worth having on the record, and it still admits nothing:
  # no package was sent, so there is nothing to admit. The canary refusals above
  # can say that too, because they all happen before the research run starts.
  CONTEXT_PROOF="$CANARY_CONTEXT_PROOF"
  ADMITTED="false"
  ADMISSION_REASON="a diagnostic never admits a seat: the prepared package was retained and never sent."
  STATUS="diagnostic"
  REASON="candidate profile passed its structural canary with context proof $CANARY_CONTEXT_PROOF. It is not admitted for research: a diagnostic sends no package and produces no review."
  echo "[$LABEL] diagnostic complete under $PROFILE, attempt $ATTEMPT_ID" >&2
  echo "[$LABEL] structural canary: pass. Canary context proof: $CANARY_CONTEXT_PROOF. Not admitted for research." >&2
  exit 0
fi

# ---------------------------------------------------------------------------
# Research: the package, through a fresh proxy, under the same profile.
# ---------------------------------------------------------------------------
start_proxy "$ATTEMPT_DIR/requests" "$ATTEMPT_DIR/proxy-port"
set +e
( cd "$RESEARCH_WORK" \
    && ANTHROPIC_BASE_URL="http://127.0.0.1:$PROXY_PORT" "${CMD[@]}" < "$ATTEMPT_DIR/package.md" ) \
  > "$ATTEMPT_DIR/stdout.txt" 2> "$ATTEMPT_DIR/stderr.txt"
CLI_EXIT=$?
set -e
stop_proxy
printf '%s\n' "$CLI_EXIT" > "$ATTEMPT_DIR/exit-code"

RESEARCH_VERDICT=fail
npx tsx "$BOUNDARY_TS" "$ATTEMPT_DIR/stdout.txt" \
  --report "$ATTEMPT_DIR/report.json" --final "$ATTEMPT_DIR/final-message.txt" \
  --check research --tools "$ALLOWED_TOOLS" --versions "$PROBED_VERSIONS" \
  --requests "$ATTEMPT_DIR/requests" --package "$ATTEMPT_DIR/package.md" \
  --work-dir "$RESEARCH_WORK" --model "$MODEL" "${PINS_ARGS[@]+"${PINS_ARGS[@]}"}" \
  2> "$ATTEMPT_DIR/failures.txt" && RESEARCH_VERDICT=pass
STRUCTURE_VERDICT="$RESEARCH_VERDICT"
CONTEXT_PROOF="$(proof_status "$ATTEMPT_DIR/report.json")"

# From here on, nothing says the package was not sent. The CLI sends it twice
# per research attempt: once as the main turn, and once before that in the
# session-naming request, which wraps the whole package in <session> tags. Both
# are in the capture and both are checked. A refusal after this point is a
# refusal to publish, not a claim that nothing left the machine.
if [ "$CLI_EXIT" -ne 0 ]; then
  ADMISSION_REASON="the research invocation exited $CLI_EXIT; the package had already been sent and nothing was admitted"
  refuse failed "the research invocation exited $CLI_EXIT; the package had already been sent, its output and capture are retained, and nothing was admitted"
fi
if [ "$RESEARCH_VERDICT" != "pass" ]; then
  sed 's/^/  /' "$ATTEMPT_DIR/failures.txt" >&2
  ADMISSION_REASON="the research run did not pass its structural check and request proof; the package had already been sent"
  refuse failed "the research run failed its admission check; the package had already been sent and its output and capture are retained"
fi

# The upstream the capture was actually taken against. A capture taken against
# a loopback stub can pass the request proof, because the proof is about the
# shape of what the CLI sent and the CLI does not know where it went. So the
# proof is reported honestly AND the run is not admitted, with the reason on the
# record. Every check passing is what earns exit 0; production upstream is what
# earns `admitted_for_research`, and they are different questions.
UPSTREAM="$(tr -d '\r\n' < "$ATTEMPT_DIR/requests/upstream.txt" 2>/dev/null || true)"
STATUS="ok"
if [ "$UPSTREAM" != "https://api.anthropic.com" ]; then
  ADMITTED="false"
  ADMISSION_REASON="every check passed, but the capture was taken against $UPSTREAM rather than https://api.anthropic.com, so this run is not admitted for research."
elif [ "$PINS_SOURCE" != "built-in" ]; then
  ADMITTED="false"
  ADMISSION_REASON="every check passed, but it was run against a substitute pin table rather than the built-in one, so this run is not admitted for research."
else
  ADMITTED="true"
  ADMISSION_REASON="the canary and the research run each passed their structural check and their request proof against https://api.anthropic.com under $PROFILE."
fi
REASON="$ADMISSION_REASON"
echo "[$LABEL] research complete under $PROFILE, attempt $ATTEMPT_ID" >&2
echo "[$LABEL] canary: pass. Research structure: pass. Context proof: $CONTEXT_PROOF." >&2
echo "[$LABEL] admitted for research: $ADMITTED. $ADMISSION_REASON" >&2
