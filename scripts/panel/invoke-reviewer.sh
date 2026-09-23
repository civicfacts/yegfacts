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
# keeps it. Claude Code honours ANTHROPIC_BASE_URL, so every invocation runs
# through scripts/panel/record-proxy.mjs, which writes each request and response
# to the attempt directory and forwards them unchanged to
# https://api.anthropic.com.
#
# WHAT THE CAPTURE IS CHECKED AGAINST CHANGED ON 2026-09-16 (methodology v1.30).
# v1.29 checked it against a pinned description of a clean request: the vendor
# prompt by hash, the tool definitions by hash, one pin row per (CLI build,
# model), an archived copy of the pinned build. That description was exact and it
# rotted. A new CLI build lands several times a week and each one needed a live
# capture and a fresh pin before a reviewer could run at all. The founder decided
# the cost was not worth paying and asked for a check that cannot rot. Stew
# advised keeping v1.29 and the disagreement stands on the record.
#
# So scripts/panel/capture-check.ts now reads the private text that actually
# exists on this machine — the user and repository CLAUDE.md and AGENTS.md files,
# every project memory file, the home directory, the repository path and this
# attempt's canary token — and searches every captured request for it. A hit is a
# leak. A capture that does not carry the declared package at all is not a
# capture of this run and fails too.
#
# The package leaves twice per research attempt, and no message here pretends
# otherwise. Before the main turn the CLI sends a session-naming request that
# wraps the whole package in <session> tags and carries no tools. Both are in
# the capture and both are checked; a refusal after the research run has started
# is a refusal to publish, not a claim that nothing left the machine.
#
# What is NOT covered, stated plainly because a capture invites the opposite
# reading. The check catches KNOWN private text FROM THIS MACHINE. It cannot
# catch text the vendor attaches that is not on this machine, and it does not
# describe what the request contains: it says only what the request does not
# contain. The proxy sees what the CLI addresses to its configured base URL, and
# nothing else on the machine is watched. The request also tells the model the
# operator's account email, the platform and the date through the vendor's own
# reminder blocks; that is host context, not isolation. A passing check is
# evidence about one attempt. It is not a vendor guarantee, and no historical run
# is retroactively certified. The capture is retained so a later reader can ask a
# stronger question of the same bytes.
#
# THE OTHER TWO SEATS OPENED ON 2026-09-16 (methodology v1.31), under limits
# this file states rather than papers over. The founder's reason is the whole of
# it: complete isolation is not available on a subscription CLI, a fully
# controlled context needs direct API calls, and the project does not pay for
# those. So each seat runs under the best profile its CLI allows, the v1.30
# denylist runs over whatever record that CLI yields, and what the check cannot
# see is written down here and on the public page. The September 9 ruling that a
# convention plus disclosure is not enough to admit a reviewer stands beside
# this; it was not withdrawn and it is not answered.
#
#   anthropic (claude): the request is captured through the proxy and searched.
#   Admitted only when the canary and the research run each pass their
#   structural check AND their capture check, and only when the upstream was
#   production. `--purpose diagnostic` runs the canary alone, captures and
#   checks its request, and never sends the package.
#
#   openai (codex 0.154.0): the request is captured, because codex honours
#   `openai_base_url` and `chatgpt_base_url`. From 0.156.1 codex refuses a
#   ChatGPT backend that is not an HTTPS origin ("workspace backend must use an
#   HTTPS origin"), so for this seat the proxy serves HTTPS on 127.0.0.1 with a
#   one-run self-signed certificate that codex trusts through
#   CODEX_CA_CERTIFICATE; the capture is the same. Per-attempt CODEX_HOME holding
#   nothing but a symlink to the credential and a two-line config; the host
#   skills catalogue, plugins, apps, hooks, memories, multi-agent and the rest
#   are switched off by flag. WHAT THIS CANNOT DO: shell and web run through one
#   host and cannot be separated — turning the host off takes web access with it,
#   and the 2026-09-09 probe then showed the model fabricating a fetch and
#   exiting zero. `-s read-only` grants read access to the WHOLE filesystem, and
#   the canary's own planted file IS read. What the check does instead is catch
#   it afterwards: a tool's output comes back in the next turn's request body, so
#   a reviewer that read private text is refused by the same denylist. The check
#   refuses the run; it does not prevent the read.
#
#   google (agy, 1.2.4 at release; the version is recorded, not gated): there is NO capture. agy ignores every base-URL variable
#   this project can set, its log holds no request bodies, and its own transcript
#   omits the system prompt. The denylist runs over the CLI's local record
#   instead — the event stream, the transcript, the page contents its fetch tool
#   saved — and the result is reported as `record-only`, a fourth word beside
#   pass, fail and unavailable. This seat, and only this seat, may be admitted on
#   it. WHAT THIS CANNOT DO: it sees what the model produced and what its tools
#   returned, and nothing of what was sent. Global instructions and extensions
#   are kept out by running from an empty home, which the probe supports and
#   cannot prove. The CLI also writes logs, caches and builtin skills into the
#   real `~/.gemini/antigravity-cli` whatever HOME says, which is disclosed here
#   rather than fought.
#
# AUTH REACHES A SUBPROCESS THROUGH A SYMLINK AND NEVER THROUGH A COPY. Each
# per-attempt home is created 0700 beside the working directory, in the same
# opaque `$TMPDIR/attempt-<id>` tree, and holds a link to the credential the CLI
# already uses. Nothing here reads a credential file, and nothing here creates
# one: a missing credential is a refusal. Afterwards the links are unlinked, which
# removes the link and never what it points at, and only the files and directories
# this script made are taken away. What an attempt has to keep out of that tree is
# copied into the attempt directory before it goes.
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
WORK_ROOT=""
PROFILE="unresolved"
CANARY_VERDICT="not-run"
STRUCTURE_VERDICT="not-run"
# "unavailable" until a capture has actually been proved, so every exit path
# before that records the honest answer rather than an optimistic default.
CONTEXT_PROOF="unavailable"
CANARY_CONTEXT_PROOF="unavailable"
ADMITTED="false"
ADMISSION_REASON="the launcher exited before reaching a decision"
# What the denylist ran over, whether the seat has an executable hook at all, and
# whether a test used it. These are the only assignments: the profile table below
# overrides them where a seat differs, and an exit before that table records what
# is true so far, which is "nothing has been decided yet".
RECORD_KIND="request"
BIN_HOOK=""
BIN_OVERRIDE=""
# What was still in the temporary tree when it was taken down, and whether a
# credential link came back as a regular file. Both are private observations, and
# both are empty on a run where nothing happened.
LEFTOVER_PATHS=""
CREDENTIAL_RESIDUE=""

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
    // The capture facts are read back out of the report the check wrote rather
    // than shuttled through a dozen shell variables. A report that is missing,
    // truncated or from a run that never reached the check leaves every field
    // absent, which reads as "not recorded" everywhere downstream.
    const summary = (file) => {
      try {
        const report = JSON.parse(fs.readFileSync(file, "utf8"));
        return report.capture_check ?? null;
      } catch { return null; }
    };
    const research = summary(values.report);
    const canary = summary(values.canary_report);
    const spread = (prefix, value) => (value === null ? {} : {
      [prefix + "upstream"]: value.upstream ?? null,
      [prefix + "request_count"]: value.requests,
      // How many of those the check actually walked. The difference is the
      // requests with no JSON body, which nothing looked inside.
      [prefix + "requests_searched"]: value.searched,
      [prefix + "package_seen"]: value.package_seen,
      // Which private sources were read and how many lines each contributed.
      // Names and counts only: the lines themselves never leave the check.
      [prefix + "capture_check_sources"]: value.sources,
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
      // Observations, not gates (methodology v1.30). Which build ran is worth
      // writing down; refusing every build nobody has probed yet is what rotted.
      cli_version: values.cli_version,
      // Private only. attempt-record.ts never copies these: where a CLI build
      // sits on this machine, what its bytes hash to, and where the attempt
      // worked are not part of the public record.
      cli_executable: values.cli_executable,
      cli_executable_sha256: values.cli_executable_sha256,
      // Public. Which kind of evidence the denylist ran over is exactly what a
      // reader needs to make sense of a `record-only` proof.
      record_kind: values.record_kind,
      // Private. A run a test arranged is never admitted, and the row says
      // which hook named the executable rather than leaving the reader to
      // infer it from an unadmitted run with no other explanation.
      cli_bin_override: values.cli_bin_override,
      // Private. What a CLI left in the temporary tree that could not be
      // removed, named relative to `work_dir`, and a credential path that came
      // back as a regular file where this launcher made a symlink. The second
      // one is close to an alarm: it means a copy of a login exists somewhere
      // this launcher did not put one.
      leftover_paths: values.leftover_paths === "" ? [] : String(values.leftover_paths).split(","),
      credential_residue:
        values.credential_residue === "" ? [] : String(values.credential_residue).split(","),
      work_dir: values.work_dir,
      exit_code: number(values.exit_code),
      canary: values.canary,
      structure: values.structure,
      context_proof: values.context_proof,
      admitted_for_research: values.admitted === "true",
      admission_reason: values.admission_reason,
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
    record_kind "$RECORD_KIND" \
    cli_bin_override "$BIN_OVERRIDE" \
    leftover_paths "$LEFTOVER_PATHS" \
    credential_residue "$CREDENTIAL_RESIDUE" \
    work_dir "$WORK_ROOT" \
    context_proof "$CONTEXT_PROOF" \
    canary_context_proof "$CANARY_CONTEXT_PROOF" \
    admitted "$ADMITTED" \
    admission_reason "$ADMISSION_REASON" \
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
  local out="$1" portfile="$2" tls_dir="${3:-}"
  local tls=()
  if [ -n "$tls_dir" ]; then tls=(--tls-dir "$tls_dir"); fi
  mkdir -p "$out"
  # The provider names the row in the proxy's fixed upstream table. This script
  # hands over a name, never a host.
  node "$PROXY_SCRIPT" --out "$out" --port-file "$portfile" --provider "$PROVIDER" ${tls[@]+"${tls[@]}"} &
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
# What the denylist ran over, and which proof words admit this seat. Only the
# Gemini seat accepts `record-only`, because only the Gemini CLI has no capture
# route at all; a seat with a proxy in front of it that produced `record-only`
# would be a seat whose proxy was bypassed.
# `RECORD_KIND` and `BIN_HOOK` already hold their defaults from the block above.
ACCEPT_PROOF="pass"
# The vendor's real executable, used when the command on PATH turns out to be a
# wrapper script. Resolved against $HOME because that is where both vendors put
# it on this machine.
REAL_BIN=""
case "$PROVIDER" in
  anthropic)
    CLI="claude"
    PROFILE_NAME="claude-safe-web-candidate"
    ALLOWED_TOOLS="WebFetch,WebSearch"
    PINNED_MODELS="claude-opus-5-5"
    DEFAULT_MODEL="claude-opus-5-5"
    STREAM_FORMAT="claude"
    EXPECTED_UPSTREAM="https://api.anthropic.com"
    ;;
  openai)
    CLI="codex"
    PROFILE_NAME="codex-captured-read-only"
    STREAM_FORMAT="codex"
    EXPECTED_UPSTREAM="https://chatgpt.com"
    # codex does not report a tool inventory in its stream, so there is no list
    # to compare one against. What settles this seat is the captured request.
    ALLOWED_TOOLS=""
    PINNED_MODELS="gpt-6-sol,gpt-6-luna"
    DEFAULT_MODEL="gpt-6-sol"
    BIN_HOOK="YEGFACTS_REVIEW_CODEX_BIN"
    REAL_BIN="$HOME/.bun/install/global/node_modules/@openai/codex-darwin-arm64/vendor/aarch64-apple-darwin/bin/codex"
    ;;
  google)
    CLI="agy"
    PROFILE_NAME="agy-denied-tools-record-only"
    ALLOWED_TOOLS=""
    PINNED_MODELS="gemini-3.8-flash-high"
    DEFAULT_MODEL="gemini-3.8-flash-high"
    STREAM_FORMAT="gemini"
    # This seat has no proxy, so there is no upstream to compare. See the
    # admission gate for the rule that stands in its place.
    EXPECTED_UPSTREAM=""
    RECORD_KIND="local-record"
    ACCEPT_PROOF="pass,record-only"
    BIN_HOOK="YEGFACTS_REVIEW_AGY_BIN"
    REAL_BIN="$HOME/.local/bin/agy"
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
#   report.json        the structural verdict and the capture check
#   exit-code, status.txt, metadata.json             (written by the trap)
#
# `run-reviewer.sh` extracts the review from `final-message.txt` and nothing
# else. The canary's files live under `canary/` deliberately: those are evidence
# about the CLI, never a reviewer's answer, and putting them where the runner
# looks is how a self-test would get published as a review.
#
# THE ORDER, which is the whole gate. The canary first, through its own proxy,
# with both its structural check and its capture check. Only if both pass does
# the package go anywhere, and then through a fresh proxy whose capture gets the
# same treatment. Exit 0 requires the CLI to have exited 0 and all four checks
# to have passed.
# ---------------------------------------------------------------------------
# WHICH BYTES RUN, recorded rather than gated (methodology v1.30).
#
# v1.29 pinned the build by the SHA-256 of the executable, kept its own archived
# copy of it and refused anything else, because the request pins described one
# build of one CLI running one model. There are no request pins now, so there is
# nothing left for a build pin to protect: the capture check reads this machine's
# private text and searches the request for it, and that works the same whatever
# build sent the request. What remains is the honest thing to do with a version
# number, which is to write it down. The resolved path and the hash of the bytes
# that ran are recorded privately, so a later reader of a retained capture can
# still ask which executable produced it.
#
# So this runs the CLI on PATH, which is the build the machine would use anyway,
# and refuses only when there is no such command at all. Two things qualify that,
# and both are recorded in the metadata:
#
#   A WRAPPER IS NOT THE PROGRAM. `codex` on PATH here is a shell script that
#   injects hook arguments inside one terminal emulator. What should run is the
#   vendor's own binary, so a command on PATH that turns out to be a script is
#   replaced by the vendor binary when this machine has one, and the resolved
#   path is written down either way.
#
#   A TEST MAY NAME THE EXECUTABLE, and only under a loopback upstream. That is
#   the same condition the v1.29 pins were under: a hook that worked against
#   production would be a way to run something nobody chose. A run that used the
#   hook is never admitted, whatever its checks say.
CLI_NAME="$CLI"

# The one non-production upstream that is allowed, checked here as well as in the
# proxy, because the Gemini seat never starts a proxy and still must not be
# admitted on a run a test arranged.
TEST_UPSTREAM="${YEGFACTS_REVIEW_UPSTREAM:-}"
LOOPBACK_UPSTREAM=0
case "$TEST_UPSTREAM" in
  '') ;;
  http://127.0.0.1|http://127.0.0.1:*|http://127.0.0.1/*|http://localhost|http://localhost:*|http://localhost/*)
    LOOPBACK_UPSTREAM=1 ;;
  *) refuse blocked "YEGFACTS_REVIEW_UPSTREAM must be a loopback URL, got '$TEST_UPSTREAM'" ;;
esac

if [ "$LOOPBACK_UPSTREAM" = "1" ] && [ -n "$BIN_HOOK" ]; then
  BIN_OVERRIDE="${!BIN_HOOK:-}"
fi

if [ -n "$BIN_OVERRIDE" ]; then
  [ -x "$BIN_OVERRIDE" ] \
    || refuse blocked "$BIN_HOOK names '$BIN_OVERRIDE', which is not an executable file"
  CLI="$BIN_OVERRIDE"
else
  command -v "$CLI_NAME" >/dev/null 2>&1 \
    || refuse blocked "$CLI_NAME is not on PATH; refusing before sending anything"
  CLI="$(command -v "$CLI_NAME")"
  # A `#!` at the front is a script, which here means a wrapper rather than the
  # program. Only then is the vendor binary preferred, and only when it is there.
  if [ -n "$REAL_BIN" ] && [ -x "$REAL_BIN" ] && [ "$(head -c 2 "$CLI" 2>/dev/null || true)" = "#!" ]; then
    CLI="$REAL_BIN"
  fi
fi

# Private only: the path names a place on this machine, and the hash is a fact
# about a file nobody else can fetch. Neither crosses into the public manifest.
CLI_EXECUTABLE="$CLI"
CLI_EXECUTABLE_SHA="$(shasum -a 256 "$CLI" 2>/dev/null | cut -d' ' -f1)"
[ -n "$CLI_EXECUTABLE_SHA" ] || CLI_EXECUTABLE_SHA="unreadable"

# The first field that looks like a version, not the first field. The three
# CLIs disagree about where they put it: `2.1.272 (Claude Code)`,
# `codex-cli 0.154.0`, `1.2.4`. Taking field one turned the Codex seat's profile
# into `codex-captured-read-only-codex-cli` on its first live run.
CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' \
  | awk '{ for (i = 1; i <= NF; i++) if ($i ~ /^v?[0-9]+\.[0-9]+/) { sub(/^v/, "", $i); print $i; exit } }')"
[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
PROFILE="$PROFILE_NAME-$CLI_VERSION"
printf '%s\n' "$PROFILE" > "$ATTEMPT_DIR/profile.txt"

BOUNDARY_TS="$REPO_ROOT/scripts/panel/stream-boundary.ts"
CANARY_URL="https://example.com/"
CANARY_HEADING="Example Domain"

# ---------------------------------------------------------------------------
# Per-attempt homes.
#
# Each run gets a home of its own in the opaque `$TMPDIR/attempt-<id>` tree,
# 0700, holding a SYMLINK to the credential the CLI already uses and the one
# configuration file the profile needs. A symlink rather than a copy for two
# reasons: nothing here ever reads a credential, and a token the vendor refreshes
# writes through the link to the real file, which is the direction that keeps the
# operator's login working.
#
# Nothing here creates a credential. A machine that is not logged in is a
# refusal, before anything is sent.
#
# Afterwards `clean_homes` takes away ONLY what was made here. The links are
# unlinked, which removes the link and never follows it; the configuration files
# are removed; the directories are `rmdir`ed, which succeeds only if they are
# empty. So whatever the CLI wrote into its own home is left where it was
# written, in the temporary tree and NOT in the archive. That is not retention:
# what an attempt keeps was copied into the attempt directory by `retain_run`
# before any of this runs, and what is left here is named in the metadata as a
# leftover path and then forgotten about, to be reaped with the rest of $TMPDIR.
#
# A LINK THAT IS NO LONGER A LINK is the one case this will not tidy. If a vendor
# ever replaced the symlink with a regular file, that file is a COPY of a
# credential sitting in the temporary tree. It is not deleted: the same vendor
# may have rotated the token and written the new one there, and deleting it could
# log the operator out. It is named on stderr and in the private metadata
# instead, and a person decides what to do with it.
# ---------------------------------------------------------------------------
HOME_LINKS=()
HOME_FILES=()
HOME_DIRS=()

clean_homes() {
  local target
  for target in ${HOME_LINKS[@]+"${HOME_LINKS[@]}"}; do
    if [ -L "$target" ]; then
      rm -f "$target"
    elif [ -e "$target" ]; then
      CREDENTIAL_RESIDUE="${CREDENTIAL_RESIDUE:+$CREDENTIAL_RESIDUE,}${target#"$WORK_ROOT"/}"
      echo "[$LABEL] warning: $target is a regular file where this launcher made a symlink to a credential. A credential may have been copied there. It is LEFT IN PLACE rather than deleted, because deleting a token a vendor had just rotated could log you out. Look at it and remove it yourself." >&2
    fi
  done
  for target in ${HOME_FILES[@]+"${HOME_FILES[@]}"}; do
    if [ -f "$target" ] && [ ! -L "$target" ]; then rm -f "$target"; fi
  done
  for target in ${HOME_DIRS[@]+"${HOME_DIRS[@]}"}; do
    rmdir "$target" 2>/dev/null || true
  done
}

make_codex_home() {
  local home="$1"
  local auth="$HOME/.codex/auth.json"
  [ -f "$auth" ] || refuse blocked "no codex credential at \$HOME/.codex/auth.json; refusing before anything is sent. This launcher never creates one."
  mkdir -p "$home"
  chmod 700 "$home"
  ln -s "$auth" "$home/auth.json"
  HOME_LINKS+=("$home/auth.json")
  # Two lines and no more. `--strict-config` refuses a key this build does not
  # know, before any model call, so a typo here is caught rather than ignored.
  printf 'model = "%s"\nmodel_reasoning_effort = "%s"\n' "$MODEL" "$EFFORT" > "$home/config.toml"
  HOME_FILES+=("$home/config.toml")
  HOME_DIRS=("$home" ${HOME_DIRS[@]+"${HOME_DIRS[@]}"})
}

make_gemini_home() {
  local home="$1"
  local base="$HOME/.gemini/antigravity-cli"
  [ -f "$base/antigravity-oauth-token" ] \
    || refuse blocked "no gemini credential at \$HOME/.gemini/antigravity-cli/antigravity-oauth-token; refusing before anything is sent. This launcher never creates one."
  [ -f "$base/installation_id" ] \
    || refuse blocked "no gemini installation id at \$HOME/.gemini/antigravity-cli/installation_id; refusing before anything is sent. This launcher never creates one."
  mkdir -p "$home/.gemini/antigravity-cli"
  chmod 700 "$home" "$home/.gemini" "$home/.gemini/antigravity-cli"
  ln -s "$base/antigravity-oauth-token" "$home/.gemini/antigravity-cli/antigravity-oauth-token"
  ln -s "$base/installation_id" "$home/.gemini/antigravity-cli/installation_id"
  HOME_LINKS+=("$home/.gemini/antigravity-cli/antigravity-oauth-token")
  HOME_LINKS+=("$home/.gemini/antigravity-cli/installation_id")
  # The tools stay in the model's inventory and are refused at the permission
  # check. `--dangerously-skip-permissions` auto-approves the PROMPT, not the
  # deny rules: the probe watched a file read fail here while a fetch worked.
  printf '%s\n' '{"permissions": {"allow": ["read_url(*)"], "deny": ["read_file(*)", "write_file(*)", "command(*)", "execute_url(*)"]}}' \
    > "$home/.gemini/antigravity-cli/settings.json"
  HOME_FILES+=("$home/.gemini/antigravity-cli/settings.json")
  HOME_DIRS=("$home/.gemini/antigravity-cli" "$home/.gemini" "$home" ${HOME_DIRS[@]+"${HOME_DIRS[@]}"})
}

# ---------------------------------------------------------------------------
# The canary prompt, which is per seat because the CLIs do not agree on what a
# file path is.
#
# Claude and codex are asked for `../CANARY.md`, a relative path one level above
# the working directory: reachable by any file tool, unreachable when there is
# no file tool. agy refuses a relative path before its permission check ever
# runs, which would make the refusal a fact about argument validation rather
# than about the profile, so that seat is given the absolute path. The working
# directory is already opaque, so the absolute path names nothing.
# ---------------------------------------------------------------------------
write_canary_prompt() {
  local out="$1"
  local fixture="$2"
  local step
  local index=1
  local steps=()

  steps+=("Fetch $CANARY_URL and read the text of its top-level heading.")
  # Only one seat is asked to search, because only one seat's positive evidence
  # is a search request in its capture. See `checkCodexCanary`.
  if [ "$PROVIDER" = "openai" ]; then
    steps+=('Search the web once for "City of Edmonton open data portal" and report the title of the first result.')
  fi
  steps+=("Attempt to read the file $fixture and report the token written in it.")
  steps+=('List the names of the tools you have available.')

  local shape='{"web_h1": "<heading text>", "canary_token": "<the token, or null if you could not read that file>", "tools": ["<tool name>"]}'
  if [ "$PROVIDER" = "openai" ]; then
    shape='{"web_h1": "<heading text>", "search_title": "<title>", "canary_token": "<the token, or null if you could not read that file>", "tools": ["<tool name>"]}'
  fi

  {
    echo 'Return ONLY a single JSON object, no prose and no markdown fence.'
    echo
    for step in "${steps[@]}"; do
      printf '%d. %s\n' "$index" "$step"
      index=$((index + 1))
    done
    echo
    printf '%s\n' "$shape"
  } > "$out"
}

# ---------------------------------------------------------------------------
# The recording proxy is per provider, and the Gemini seat has none.
#
# The upstream is chosen by the proxy from a fixed table keyed on the provider.
# This script hands over a name, never a host.
# ---------------------------------------------------------------------------
uses_proxy() { [ "$PROVIDER" != "google" ]; }

# ---------------------------------------------------------------------------
# The command, assembled per seat once the proxy's port is known.
#
# CMD is the argument vector and CLI_ENV the environment assignments that go in
# front of it. Every assignment is made on the child alone: nothing is exported
# into this shell and nothing is written to a configuration file, so nothing
# outside the subprocess is redirected and nothing survives this run.
# ---------------------------------------------------------------------------
CMD=()
CLI_ENV=()

build_command() {
  local port="$1" home="$2" work="$3" log="$4" prompt="$5" tls_dir="$6"
  CMD=()
  CLI_ENV=()
  case "$PROVIDER" in
    anthropic)
      CLI_ENV=("ANTHROPIC_BASE_URL=http://127.0.0.1:$port")
      # Two traps are baked in. `--permission-prompts none` WITHOUT
      # `--allowedTools` denies WebFetch outright, so the two are only ever
      # passed together. And `--bare` is wrong here: it forces an API key and
      # never reads the subscription OAuth that `--safe-mode` leaves working.
      CMD=(
        "$CLI" -p --model "$MODEL" --effort "$EFFORT"
        --safe-mode --setting-sources "" --strict-mcp-config
        --disable-slash-commands --no-session-persistence
        --permission-prompts none
        --tools "$ALLOWED_TOOLS" --allowedTools WebSearch WebFetch
        --output-format stream-json --verbose
      )
      if [ -n "$MAX_BUDGET" ]; then CMD+=(--max-budget-usd "$MAX_BUDGET"); fi
      ;;
    openai)
      # CMUX_CODEX_HOOKS_DISABLED is set whichever executable was resolved: the
      # wrapper reads it, and the vendor binary ignores it.
      # The proxy serves HTTPS on loopback for this seat (see the header), and
      # CODEX_CA_CERTIFICATE adds its one-run certificate to codex's roots.
      CLI_ENV=("CODEX_HOME=$home" "CMUX_CODEX_HOOKS_DISABLED=1" "CODEX_CA_CERTIFICATE=$tls_dir/cert.pem")
      # `--search` is a top-level flag and has to come before `exec`.
      # `--disable enable_request_compression` is what makes the capture
      # readable: without it the body is zstd and the denylist sees nothing.
      # The rest switch off everything this machine would otherwise attach.
      CMD=(
        "$CLI" --search exec -m "$MODEL" -C "$work" --skip-git-repo-check
        -s read-only --strict-config --ignore-rules --json
        -c "openai_base_url=https://127.0.0.1:$port/backend-api/codex"
        -c "chatgpt_base_url=https://127.0.0.1:$port/backend-api"
        -c skills.include_instructions=false -c project_doc_max_bytes=0
        --disable enable_request_compression
        --disable plugins --disable recommended_plugins --disable apps --disable hooks
        --disable multi_agent --disable multi_agent_v2 --disable memories
        --disable computer_use --disable browser_use --disable browser_use_external
        --disable image_generation --disable goals --disable tool_suggest
      )
      ;;
    google)
      CLI_ENV=("HOME=$home")
      # The package goes as an argument because this CLI has no stdin prompt.
      # `--effort low` conflicts with this model id; only high is pinned anyway.
      CMD=(
        "$CLI" --sandbox --dangerously-skip-permissions --disable-slash-commands
        --effort "$EFFORT" --model "$MODEL" --output-format stream-json
        --print-timeout 45m --log-file "$log" --prompt "$(cat "$prompt")"
      )
      ;;
  esac
}

# The Gemini seat carries its prompt in the argument vector, so a package larger
# than this machine's argument limit would fail inside `exec` with nothing
# written down. Refusing here, with the reason, is the honest version of that.
check_prompt_size() {
  [ "$PROVIDER" = "google" ] || return 0
  local prompt="$1" bytes limit
  bytes="$(wc -c < "$prompt" | tr -d ' ')"
  limit="$(getconf ARG_MAX 2>/dev/null || echo 262144)"
  limit=$((limit / 4))
  if [ "$bytes" -gt "$limit" ]; then
    refuse blocked "the package is $bytes bytes and this seat's CLI takes its prompt as a command-line argument, which this machine limits to about $limit bytes; nothing was sent"
  fi
}

# ---------------------------------------------------------------------------
# What is copied out of the opaque tree before it is taken down.
#
# Every seat's CLI log, and for the Gemini seat its local record as well.
#
# `record/` is what the denylist reads: the event stream the CLI printed and the
# transcript it kept. The final response is a field of the result event in that
# stream, so it is searched there rather than copied twice. `fetched/` is what
# the CLI's own fetch tool saved, retained beside it and read for one thing: the
# heading of the page the canary asked for. Under this profile the MODEL cannot
# open that file, which is the point.
# ---------------------------------------------------------------------------
retain_run() {
  # One `local` per line: bash expands every word of a `local` statement before
  # it assigns any of them, so `local dir="$2" record="$dir/record"` reads a
  # variable that does not exist yet and dies under `set -u`.
  local home="$1"
  local dir="$2"
  local log="$3"
  # The CLI log first, for every seat that writes one. It lives in the opaque
  # tree with the home, so this copy is the one that is kept.
  if [ -f "$log" ]; then cp "$log" "$dir/cli.log"; fi
  [ "$RECORD_KIND" = "local-record" ] || return 0

  local record="$dir/record"
  local fetched="$dir/fetched"
  mkdir -p "$record" "$fetched"
  if [ -f "$dir/stdout.txt" ]; then cp "$dir/stdout.txt" "$record/stdout.jsonl"; fi
  local brain="$home/.gemini/antigravity-cli/brain"
  [ -d "$brain" ] || return 0
  local conversation transcript content transcripts=0 pages=0
  for conversation in "$brain"/*/; do
    [ -d "$conversation" ] || continue
    transcript="$conversation.system_generated/logs/transcript_full.jsonl"
    if [ -f "$transcript" ]; then
      transcripts=$((transcripts + 1))
      cp "$transcript" "$record/transcript-$transcripts.jsonl"
    fi
    for content in "$conversation".system_generated/steps/*/content.md; do
      [ -f "$content" ] || continue
      pages=$((pages + 1))
      cp "$content" "$fetched/page-$pages.md"
    done
  done
}

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

WORK_ROOT="${TMPDIR:-/tmp}"
WORK_ROOT="${WORK_ROOT%/}/attempt-$ATTEMPT_ID"
mkdir -p "$WORK_ROOT/canary/work" "$WORK_ROOT/work"
chmod 700 "$WORK_ROOT"
# Resolved, because the CLI reports the resolved path in its environment
# reminder and the proof compares the two. On macOS $TMPDIR is under /var,
# which is a symlink to /private/var.
WORK_ROOT="$(cd "$WORK_ROOT" && pwd -P)"

# Relative for the seats whose file tools accept one, absolute for the seat that
# does not. See `write_canary_prompt`.
CANARY_FIXTURE="../CANARY.md"
if [ "$PROVIDER" = "google" ]; then CANARY_FIXTURE="$WORK_ROOT/canary/CANARY.md"; fi
write_canary_prompt "$CANARY_DIR/work/canary.md" "$CANARY_FIXTURE"

cp "$CANARY_DIR/CANARY.md" "$WORK_ROOT/canary/CANARY.md"
cp "$CANARY_DIR/work/canary.md" "$WORK_ROOT/canary/work/canary.md"

# Runs AFTER `clean_homes`, which is the only order that can work: the homes sit
# inside this tree, so taking the root away first simply failed and left an empty
# `attempt-<id>` directory behind on every single run.
#
# Whatever `rmdir` still cannot remove is what a CLI wrote into its own home and
# never cleaned up. It is named in the metadata rather than silently kept: a
# reader of a retained attempt should be able to see that a vendor left a
# database in the temporary tree without going to look for it. Only the top level
# is listed, because the count of files under a CLI's own cache is noise.
clean_work() {
  [ -n "$WORK_ROOT" ] || return 0
  rm -f "$WORK_ROOT/canary/work/canary.md" "$WORK_ROOT/canary/CANARY.md" \
    "$WORK_ROOT/canary-cli.log" "$WORK_ROOT/research-cli.log"
  rmdir "$WORK_ROOT/canary/work" "$WORK_ROOT/canary" "$WORK_ROOT/work" 2>/dev/null || true
  rmdir "$WORK_ROOT" 2>/dev/null || true
  [ -d "$WORK_ROOT" ] || return 0
  LEFTOVER_PATHS="$(cd "$WORK_ROOT" && find . -mindepth 1 -maxdepth 1 2>/dev/null \
    | sed 's|^\./||' | sort | tr '\n' ',' | sed 's/,$//')"
}

# ---------------------------------------------------------------------------
# WHERE A PER-ATTEMPT HOME GOES, and why it is the opaque tree for every seat.
#
# The first live Gemini canary is what settled this. agy's fetch tool saves the
# page it fetched into a file under HOME and then tells the model the absolute
# path of that file. The archive lives under `$HOME/.local/state`, so a home
# inside the attempt directory handed the reviewer the operator's home
# directory — which is on the denylist, and rightly: it is the operator's
# identity arriving in the reviewer's context. The check caught it and refused
# the run. The answer is to stop the leak rather than to stop checking for it.
#
# No seat gets a home in the archive, and not only the one that was caught. A
# rule that holds for one CLI because nobody has watched the other two is a rule
# waiting to be broken by a vendor's next build, and there is nothing in the
# archive copy worth the risk: what an attempt has to keep is copied back out by
# `retain_run` before the tree comes down. So every per-attempt home and every
# CLI log sits beside the working directory, in `$TMPDIR/attempt-<id>`, named
# only by the attempt id.
# ---------------------------------------------------------------------------

trap 'stop_proxy; clean_homes; clean_work; write_metadata' EXIT

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

# The evidence flags the boundary check is given for this seat: a capture
# directory for the seats that have one, the CLI's own record for the one that
# does not.
evidence_flags() {
  local dir="$1"
  if [ "$RECORD_KIND" = "local-record" ]; then
    printf '%s\n%s\n%s\n%s\n' --record "$dir/record" --fetched "$dir/fetched"
  else
    printf '%s\n%s\n' --requests "$dir/requests"
  fi
}

# ---------------------------------------------------------------------------
# ONE RUN OF THE SEAT, used for the canary and for the research turn.
#
#   $1 kind    canary | research, which names this run's home and log
#   $2 dir     the attempt sub-directory this run's bytes are kept in
#   $3 work    the directory the CLI is started in
#   $4 prompt  the file whose bytes are the prompt
#
# Sets CLI_EXIT. Everything it does is decided by the SEAT rather than by which
# of the two turns this is, which is why there is one of it: the per-attempt
# home, the proxy, the command, how the prompt reaches the CLI and what is
# copied back out are the same questions both times. The canary and the research
# run still get their own home, their own proxy and their own capture, so a
# research proof can never be satisfied by the canary's requests.
# ---------------------------------------------------------------------------
run_seat() {
  local kind="$1"
  local dir="$2"
  local work="$3"
  local prompt="$4"
  local home="$WORK_ROOT/$kind-home"
  local log="$WORK_ROOT/$kind-cli.log"
  local tls_dir=""

  case "$PROVIDER" in
    openai)
      make_codex_home "$home"
      # Beside the home, never in the archive, so the path the CLI is handed
      # names no directory of the operator's. The proxy deletes the key itself.
      tls_dir="$WORK_ROOT/$kind-tls"
      HOME_FILES+=("$tls_dir/cert.pem")
      HOME_DIRS=("$tls_dir" ${HOME_DIRS[@]+"${HOME_DIRS[@]}"})
      ;;
    google) make_gemini_home "$home" ;;
  esac

  PROXY_PORT=""
  if uses_proxy; then start_proxy "$dir/requests" "$dir/proxy-port" "$tls_dir"; fi
  build_command "$PROXY_PORT" "$home" "$work" "$log" "$prompt" "$tls_dir"

  # The Gemini CLI carries its prompt in the argument vector and reads nothing
  # from stdin; the other two read it from stdin and take no prompt argument.
  set +e
  if [ "$PROVIDER" = "google" ]; then
    ( cd "$work" && env "${CLI_ENV[@]}" "${CMD[@]}" < /dev/null ) \
      > "$dir/stdout.txt" 2> "$dir/stderr.txt"
  else
    ( cd "$work" && env "${CLI_ENV[@]}" "${CMD[@]}" < "$prompt" ) \
      > "$dir/stdout.txt" 2> "$dir/stderr.txt"
  fi
  CLI_EXIT=$?
  set -e
  stop_proxy
  retain_run "$home" "$dir" "$log"
  printf '%s\n' "$CLI_EXIT" > "$dir/exit-code"
}

# ---------------------------------------------------------------------------
# The canary, first, through its own proxy where there is one.
# ---------------------------------------------------------------------------
run_seat canary "$CANARY_DIR" "$CANARY_WORK" "$CANARY_DIR/work/canary.md"
printf '%s\n' "$CLI_EXIT" > "$ATTEMPT_DIR/exit-code"

# Parse and retain regardless of exit status. A run that exited nonzero still
# produced bytes worth keeping; what it does not get is admission.
#
# `--expect-file-read allowed` is the codex seat saying out loud what its
# profile cannot do. Under `-s read-only` the planted fixture IS readable, the
# canary reads it, and the outcome is recorded rather than failed. The token is
# left off the denylist for that run alone, because every other private string
# stays on it and a run that carried real private text is still refused.
EXPECT_FILE_READ=refused
if [ "$PROVIDER" = "openai" ]; then EXPECT_FILE_READ=allowed; fi

CANARY_VERDICT=fail
CANARY_FLAGS=()
while IFS= read -r flag; do CANARY_FLAGS+=("$flag"); done < <(evidence_flags "$CANARY_DIR")
npx tsx "$BOUNDARY_TS" "$CANARY_DIR/stdout.txt" \
  --report "$CANARY_DIR/report.json" --final "$CANARY_DIR/final-message.txt" \
  --format "$STREAM_FORMAT" --check canary --tools "$ALLOWED_TOOLS" \
  --token "$CANARY_TOKEN" --expect-url "$CANARY_URL" --expect-heading "$CANARY_HEADING" \
  --expect-file-read "$EXPECT_FILE_READ" --effort "$EFFORT" \
  --accept-proof "$ACCEPT_PROOF" \
  "${CANARY_FLAGS[@]}" --package "$CANARY_DIR/work/canary.md" \
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
  refuse failed "the candidate profile failed its canary: the structural check or the capture check did not pass. The package was never sent."
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
# Research: the package, through a fresh proxy and a fresh home, under the same
# profile.
# ---------------------------------------------------------------------------
check_prompt_size "$ATTEMPT_DIR/package.md"
run_seat research "$ATTEMPT_DIR" "$RESEARCH_WORK" "$ATTEMPT_DIR/package.md"

RESEARCH_VERDICT=fail
RESEARCH_FLAGS=()
while IFS= read -r flag; do RESEARCH_FLAGS+=("$flag"); done < <(evidence_flags "$ATTEMPT_DIR")
npx tsx "$BOUNDARY_TS" "$ATTEMPT_DIR/stdout.txt" \
  --report "$ATTEMPT_DIR/report.json" --final "$ATTEMPT_DIR/final-message.txt" \
  --format "$STREAM_FORMAT" --check research --tools "$ALLOWED_TOOLS" \
  --effort "$EFFORT" --accept-proof "$ACCEPT_PROOF" \
  "${RESEARCH_FLAGS[@]}" --package "$ATTEMPT_DIR/package.md" \
  2> "$ATTEMPT_DIR/failures.txt" && RESEARCH_VERDICT=pass
STRUCTURE_VERDICT="$RESEARCH_VERDICT"
CONTEXT_PROOF="$(proof_status "$ATTEMPT_DIR/report.json")"

# From here on, nothing says the package was not sent. A refusal after this
# point is a refusal to publish, not a claim that nothing left the machine.
if [ "$CLI_EXIT" -ne 0 ]; then
  ADMISSION_REASON="the research invocation exited $CLI_EXIT; the package had already been sent and nothing was admitted"
  refuse failed "the research invocation exited $CLI_EXIT; the package had already been sent, its output and capture are retained, and nothing was admitted"
fi
if [ "$RESEARCH_VERDICT" != "pass" ]; then
  sed 's/^/  /' "$ATTEMPT_DIR/failures.txt" >&2
  ADMISSION_REASON="the research run did not pass its structural check and capture check; the package had already been sent"
  refuse failed "the research run failed its admission check; the package had already been sent and its output and capture are retained"
fi

# WHERE THE EVIDENCE CAME FROM, which is a different question from whether it
# passed. A capture taken against a loopback stub can pass the capture check,
# because the check is about what the CLI sent and the CLI does not know where it
# went. So the check is reported honestly AND the run is not admitted, with the
# reason on the record. Every check passing is what earns exit 0; production
# upstream is what earns `admitted_for_research`.
#
# WHETHER A TEST ARRANGED THIS RUN is asked once, here, so that the rule and its
# wording exist in one place rather than once per seat. A run whose executable
# was named by a hook is never admitted, whatever its checks say. The Gemini seat
# has no upstream to compare, because it has no proxy, and for that seat a
# loopback upstream being configured at all stands in for the comparison the
# other seats get.
TEST_ARRANGED=""
if [ -n "$BIN_OVERRIDE" ]; then
  TEST_ARRANGED="the executable was named by $BIN_HOOK"
elif [ "$LOOPBACK_UPSTREAM" = "1" ]; then
  TEST_ARRANGED="a loopback upstream was configured"
fi

STATUS="ok"
UPSTREAM="$(tr -d '\r\n' < "$ATTEMPT_DIR/requests/upstream.txt" 2>/dev/null || true)"
if [ -n "$BIN_OVERRIDE" ]; then
  ADMITTED="false"
  ADMISSION_REASON="every check passed, but $TEST_ARRANGED, so this run was arranged by a test and is not admitted for research."
elif [ -n "$EXPECTED_UPSTREAM" ] && [ "$UPSTREAM" != "$EXPECTED_UPSTREAM" ]; then
  ADMITTED="false"
  ADMISSION_REASON="every check passed, but the capture was taken against $UPSTREAM rather than $EXPECTED_UPSTREAM, so this run is not admitted for research."
elif [ -z "$EXPECTED_UPSTREAM" ] && [ -n "$TEST_ARRANGED" ]; then
  ADMITTED="false"
  ADMISSION_REASON="every check passed, but $TEST_ARRANGED, so this run was arranged by a test and is not admitted for research."
elif [ -z "$EXPECTED_UPSTREAM" ]; then
  ADMITTED="true"
  ADMISSION_REASON="the canary and the research run each passed their structural check and their record check under $PROFILE. This seat's CLI exposes no request capture, so the check ran over its own local record and the proof is $CONTEXT_PROOF, not pass."
else
  ADMITTED="true"
  ADMISSION_REASON="the canary and the research run each passed their structural check and their capture check against $EXPECTED_UPSTREAM under $PROFILE."
fi
REASON="$ADMISSION_REASON"
echo "[$LABEL] research complete under $PROFILE, attempt $ATTEMPT_ID" >&2
echo "[$LABEL] canary: pass. Research structure: pass. Context proof: $CONTEXT_PROOF." >&2
echo "[$LABEL] admitted for research: $ADMITTED. $ADMISSION_REASON" >&2
