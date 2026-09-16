# Simplify the context check: capture stays, the pinned shape goes

**Decision (founder, 2026-09-16):** v1.29's pinned-shape checker is more than
the job needs. It hashes the vendor prompt and tool definitions per CLI build
and model, keeps an archived copy of the pinned build, and rots on every CLI
update, which happens several times a week. Replace it with a check that
cannot rot: keep the flags that disable customizations, keep the recording
proxy and the retention, and test the captured request against the private
text that actually exists on this machine. Stew advised keeping v1.29 and
recorded the disagreement; the founder decided. Methodology v1.30.

**What stays unchanged:** the safe-mode flag set; the loopback recording
proxy and its retention terms; the structural stream checks (tool inventory,
no plugins, skills or MCP, one init and one result, exit 0, complete final
message); the canary before every research run; the runner's refusal to
install anything not admitted; the production-upstream requirement; the
three-seat rule; Codex and Google blocked; the consultation pause reason.

**What goes:** `scripts/panel/request-proof.ts`, its pin table, the request
shape classification, the request envelope allowlist, the sanitized capture
fixtures under `tests/fixtures/request-capture/`, the substitute pin table
and `YEGFACTS_REVIEW_PINS`, the version gate, the archived pinned build and
its hash, `path_cli_version`, `pins_source`, `vendor_prompt_sha256`,
`tool_definitions_sha256`, the side-request counts.

## The new check: `scripts/panel/capture-check.ts`

Input: the attempt's `requests/` directory, the package bytes, the canary
token (empty for a research run), and the list of private sources below.
Output: `{status: 'pass' | 'fail', failures, sources: [{name, lines_checked}],
package_seen: number, requests: number}`. The report never contains private
text; a match is reported as source name and line number only.

Private sources, read at check time, contents never written anywhere:

- `$HOME/.claude/CLAUDE.md`, `$HOME/CLAUDE.md`, `$HOME/AGENTS.md`
  (symlinks followed once), `$HOME/.codex/AGENTS.md`;
- the repository's `CLAUDE.md` and `AGENTS.md`;
- every `*.md` under `$HOME/.claude/projects/*/memory/`;
- the strings: the repository's absolute path, `$HOME`, and the canary token.

A source that does not exist is recorded as absent, not an error. From each
file take every line that, trimmed, is at least 24 characters and is not a
markdown fence, heading marker alone or frontmatter delimiter. For every
`req-*.json` whose body parses as JSON, walk every string value (system
blocks, messages, tools, metadata, everything) and fail if any string
contains any denylisted line or string. Also require at least one request
whose string values contain the package text byte for byte (the session
title and the main turn both do); zero means the capture is not of this run.
Requests with non-JSON bodies (the HEAD connectivity check) are counted and
skipped.

Limit, stated everywhere the check is described: this catches known private
text from this machine. It does not catch text the vendor attaches that is
not on this machine, and it does not describe what the request contains; it
only says what it does not contain. The capture is retained so that a later
reader can ask a stronger question of it.

## Launcher (`invoke-reviewer.sh`)

Provider `anthropic`: resolve `claude` on PATH, record its version and
executable hash privately as observations, no version gate. Canary through
its own proxy as now; structural canary check; then `capture-check` over
`canary/requests` with the canary package and token. Then, for research, the
package through a fresh proxy; structural research check; `capture-check`
over `requests/` with the package and no token. Admitted when both pairs pass,
CLI exit 0 twice, and upstream is production. `context_proof` in metadata
keeps its name and values (pass, fail, unavailable) so older manifests read
the same; add `capture_check_sources` (names and line counts) and keep
`request_count`, `requests_manifest_sha256`, `proof_report_sha256`,
`upstream`, `cli_version`, `cli_executable_sha256` (private only).
`stream-boundary.ts`: remove the `--pins`, `--model`, `--work-dir` options and
the request-proof import; `contextProof()` takes the capture-check result.
Keep the working directory as an opaque temporary path (v1.29), because the
path is one of the strings the reviewer is told. `YEGFACTS_REVIEW_UPSTREAM`
stays for tests; a run under it is never admitted, as now.

`openai` and `google`: unchanged, still refused with their existing reasons.

## Tests

Delete `tests/request-proof.test.ts` and the capture fixtures. Add
`tests/capture-check.test.ts`: clean capture passes; a body carrying one line
from a stub CLAUDE.md fails and names the source and line, not the text; the
repo path fails; the canary token fails; a capture with no request carrying
the package fails; absent sources are recorded as absent; a non-JSON body is
skipped and counted. Update `tests/invoke-reviewer.test.ts`: the stub `claude`
posts through the proxy as now; a stub HOME carries a fake CLAUDE.md and a
memory file; a leaking stub that copies a line of them into its request is
refused; the clean stub passes both checks and, under the stub upstream, is
recorded as not admitted; the runner installs nothing not admitted. Remove
the pin and version tests. `stream-boundary.test.ts`: adjust the admission
tests to the new proof input.

## Public record

- `methodology/changelog.yaml` v1.30, scope `capture-check-simplified`: what
  was removed and why (founder's call on cost and version rot), what remains,
  the weaker limit stated plainly, and that the September 9 disposition's
  objection to a convention-only check, made under v1.28, stands on the record
  beside this decision. The September 15 technology memo asked for a looser
  gate than v1.29, which v1.29 refused; v1.30 goes past what it asked for.
- `src/pages/methodology/index.astro`, reviewer-execution section: keep the
  September 9 and September 15 paragraphs as history; add a dated September
  16 paragraph in plain words: what the check now does, what it no longer
  does, and why.
- `docs/DESIGN.md`: replace the v1.29 checked-and-recorded paragraphs with
  the v1.30 description.
- `methodology/audits/exposure/2026-09-16.md` if the audit output changes
  (the placeholder-address warnings from the deleted fixtures go away).
- `methodology/reviews/2026-09-16-capture-denylist/DECISION.md` and
  `verification.md` are written by Stew after the live run; do not create.

## Checks

`npm test`, `npm run validate`, `VALIDATE_BASE_REF=origin/main npm run
validate:diff`, `npx astro check`, `npm run build`, the three audits.
