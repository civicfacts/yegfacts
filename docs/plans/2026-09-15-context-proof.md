# Context proof by request capture

**Goal:** Give the Claude reviewer profile the context proof that v1.28 said was
missing, by retaining the actual outgoing request of every attempt, checking it
against a pinned description of what a clean request contains, and admitting the
Claude seat for research only when that check passes on both the canary and the
research run. Codex and Google stay blocked. No historical run is certified.

**Authority:** D-0036 (2026-09-09) named this as the next technical work: "a
bounded demonstration of an actual supported context boundary with working
public research, recorded publicly before admission." It forbade changing global
auth or configuration and building a filesystem jail. This plan does neither.

**Stack:** existing Bash, Node/TypeScript, Vitest, the installed Claude Code
CLI. One new Node script (the recording proxy) with no dependencies.

## What the demonstration found (2026-09-15, Stew, main session)

Claude Code 2.1.272 honours `ANTHROPIC_BASE_URL` under the candidate profile
with subscription OAuth. Two Haiku probes were run through a local recording
proxy that forwards to `https://api.anthropic.com` unchanged and writes each
request (authorization redacted) and response to disk. Everything the CLI sent
to the API went through it. The retained captures are at
`<scratchpad>/probe/run-KCrItz/out` (plain reply) and
`<scratchpad>/probe/run-lVZORa/out` (fetch + search + file-read canary). They
contain the founder's account email, account UUID and device id and MUST NOT be
copied into the repository; fixtures derived from them are sanitized.

Five request shapes were observed, and nothing else:

1. `HEAD /api/hello`: connectivity check, no body.
2. **Session title.** `POST /v1/messages`, no tools, system = billing header,
   agent line, a 3059-char naming prompt beginning "You are naming a coding
   session". One user message: the package wrapped in `<session>` tags plus a
   fixed trailer. Sent once, before the main turn, even with
   `--no-session-persistence`. It produces no research output.
3. **Main turn.** `POST /v1/messages`. System = three blocks:
   `x-anthropic-billing-header: cc_version=2.1.272.<3 hex>; cc_entrypoint=sdk-cli;`
   (the hex suffix varies per request), the line
   `You are a Claude agent, built on Anthropic's Claude Agent SDK.`, and the
   13,487-char vendor default prompt, byte-identical across runs and turns,
   SHA-256 `a3015596fabfe9063deb699fa369a88d1978106e7a9d3d06b40eb6199791872d`.
   Its headings: System, Doing tasks, Executing actions with care, Using your
   tools, Tone and style, Text output, Environment, Context management. It
   contains no memory paths, no CLAUDE.md content and no project text (the
   string "CLAUDE.md" appears once, in a generic sentence about durable
   instructions). Tools = exactly two client tool definitions, `WebFetch` and
   `WebSearch` (SHA-256 of their JSON: `e3f1f3ee…987efb` and `67e78dc…77d5b`,
   record the full hashes). `messages[0]` is a user message of five text
   blocks, in this order:
   - environment reminder: cwd, "Is a git repository: false", platform, shell,
     OS version;
   - model identity reminder naming the model id and its knowledge cutoff;
   - **account email reminder**: "# userEmail / The user's email address is
     <address>. Use it only to identify the user…" with the founder's address;
   - date reminder "Today's date is YYYY-MM-DD.";
   - the package text, byte-for-byte.
   Later turns append an assistant message (thinking, text, tool_use blocks)
   and a user message of tool_result blocks only. `thinking` is enabled with
   `budget_tokens` 31999; `context_management` clears old thinking. Metadata
   carries device id, account UUID and session id.
4. **Search helper.** System = billing header, agent line, and the 57-char
   line "You are an assistant for performing a web search tool use". Tools =
   one server tool `{type: web_search_20250305, name: web_search, max_uses: 8}`.
   One user message: "Perform a web search for the query: <query>".
5. **Fetch summarizer.** System = billing header and agent line only. No
   tools. One user message beginning "\nWeb page content:\n---\n" with the
   fetched page text and a fixed extraction/quoting instruction after it.

The account email and the working-directory path are host context that is not
in the declared package. They are not instructions and they name no project
material. They are disclosed, not suppressed: the proxy records and forwards,
it never rewrites a request. The `claude` on PATH is a cmux shim around
`~/.local/share/claude/versions/2.1.272`; the launcher records the resolved
executable path privately.

## Design

**Capture.** `scripts/panel/record-proxy.mjs`: a loopback HTTP server that
writes `requests/req-NNNN.json` (method, url, headers with `authorization`,
`x-api-key` and `cookie` replaced by `<redacted>`, body parsed as JSON when it
is JSON) and `requests/res-NNNN.txt` (status and complete body) for each
request, then forwards it unchanged to the upstream. Upstream is
`https://api.anthropic.com` unless `YEGFACTS_REVIEW_UPSTREAM` names a loopback
URL, which exists so tests never reach the network; the upstream actually used
is written to metadata and to the public manifest row, so a non-production
upstream can never be silent. The launcher starts one proxy per invocation
(canary and research each get their own), passes `ANTHROPIC_BASE_URL` only in
the CLI subprocess environment, and stops the proxy after the CLI exits. The
proxy must be listening before the CLI starts and must have flushed every
capture before the check runs. Any upstream error is recorded, never hidden.

**Proof.** `scripts/panel/request-proof.ts`: reads a `requests/` directory, the
exact package bytes, the stream facts from `stream-boundary.ts`, and a pinned
profile table keyed by CLI version. It classifies every captured request into
one of the five shapes above by exact structure, and returns
`{status: 'pass' | 'fail', requests: [...], failures: [...], disclosed: [...]}`.
Pass requires all of:

- every request is classified; an unknown shape fails;
- exactly one session-title request, and its `<session>` body is the package;
- at least one main turn; every main turn's system blocks match the pinned
  billing-header pattern, the exact agent line, and the pinned vendor prompt
  hash; its `tools` are exactly the two pinned tool definitions by hash; its
  `model` is the pinned research model (the canary is run with the same pin);
- every main turn's `messages[0]` is exactly the four reminder blocks matched
  by anchored regular expressions (cwd must equal the attempt's work directory;
  the model reminder must name the pinned model) followed by one text block
  equal to the package bytes; every later user message contains only
  `tool_result` blocks and every later assistant message only `thinking`,
  `text`, `tool_use` blocks; no other text block, no `<system-reminder>`
  anywhere after the first message;
- each main turn's tool_result ids correspond to tool_use ids that appear in
  the stream, and the number of main-turn requests equals the number of
  assistant messages in the stream (the stream's own record of turns);
- search-helper and fetch-summarizer requests match their shapes exactly;
- the upstream recorded for the capture is `https://api.anthropic.com`
  (a test upstream yields `pass` for the request check but the launcher marks
  `admitted_for_research` false unless the upstream is production, and records
  why; tests assert both branches).

`disclosed` lists, per main turn, the verbatim non-package, non-vendor blocks
with the email address replaced by `<account-email>` and the cwd left in. The
report never contains the address. `contextProof()` in `stream-boundary.ts`
stops being a constant: it takes the proof result and returns `pass`, `fail`,
or `unavailable` (no capture directory), with the reason.

**Pins.** The profile table lives in one place (`request-proof.ts`, exported):
CLI version `2.1.272`, vendor prompt hash, both tool definition hashes, the
agent line, billing-header pattern, the session-title prompt hash, the search
helper line, the fetch summarizer prefix and suffix, the reminder patterns.
2.1.266 and 2.1.267 are removed from the probed list: they have no pinned
hashes and are no longer installed. A CLI version without pins fails closed
before anything is sent, as today.

**Admission.** In `invoke-reviewer.sh`, provider `anthropic`, `--purpose
research`: (1) version check; (2) canary through its own proxy under
`canary/`, structural canary check plus request proof on `canary/requests/`;
(3) only if both pass, the research run through a fresh proxy under
`requests/`, same flags, package on stdin, stdout to `stdout.txt`, final
message to `final-message.txt`, `--check research` structural check plus
request proof on `requests/`; (4) exit 0 only when the CLI exited 0 and both
checks passed on both runs; otherwise nonzero with everything retained. The
diagnostic purpose keeps its current behaviour and gains the request capture
and proof on the canary. `openai` and `google` remain blocked with their
existing reasons. Model pin `claude-opus-5`, effort `high`, unchanged.
`--max-budget-usd` is passed through as today.

**Metadata and manifest.** Add to `metadata.json`: `context_proof` (pass, fail,
unavailable), `admitted_for_research` (true only on a passing research run),
`upstream`, `cli_executable` (private only), `vendor_prompt_sha256`,
`tool_definitions_sha256` (two), `request_count`, `main_turn_count`,
`side_request_counts` by shape, `requests_manifest_sha256` (hash of a sorted
list of `req-*/res-*` file hashes), `proof_report_sha256`, and the canary
equivalents. `attempt-record.ts` copies the public-safe fields (everything
above except `cli_executable`) into the manifest row. `record-run.ts` types
gain the optional fields. The stream-boundary CLI accepts `--requests <dir>`
and `--package <file>`, and writes the proof into `report.json`.

**Runner.** `run-reviewer.sh` and `audit-package.sh` need no flow change: an
admitted invocation already leaves `final-message.txt` at the top level. Update
their header comments, which currently say every provider is refused.

## Tasks

1. `record-proxy.mjs` with a unit test that posts through it to a local stub
   upstream and asserts redaction, forwarding, capture files and the recorded
   upstream.
2. `request-proof.ts` with fixtures built from the sanitized probe captures
   (email replaced by `user@example.com`, UUIDs and device id replaced by
   zeros, cwd replaced by `/stub/work`). Tests: passes the clean capture;
   fails on an extra system block, a changed vendor prompt, an extra text
   block in a later turn, a `<system-reminder>` in a later turn, a package
   byte mismatch, an unknown request shape, a missing session-title request,
   a third tool, an unpinned CLI version, a non-production upstream.
3. Launcher changes, then `tests/invoke-reviewer.test.ts`: the stub `claude`
   now POSTs fixture bodies to `$ANTHROPIC_BASE_URL` (so the proxy is
   exercised for real) against a stub upstream that returns a canned response;
   keep every existing negative test; add: research run admitted end to end
   with `final-message.txt` at the top level; research refused when the
   canary's proof fails; research refused when the research capture's proof
   fails after a passing canary; `admitted_for_research` false under a test
   upstream even when every check passes, with the reason recorded; both
   proxies stopped after the run (no listening port left); an attempt with
   `--purpose diagnostic` still never sends the package.
4. `stream-boundary.test.ts`: update the "refuses a perfectly clean stream
   anyway" test to "refuses a clean stream without a capture", add "admits a
   clean stream with a passing proof".
5. Public record: methodology `changelog.yaml` entry v1.29
   (scope `context-proof-admission`), the methodology page section
   `reviewer-execution` (keep the September 9 correction, add a dated
   September 15 paragraph: what is captured, what the proof checks, what is
   disclosed, what remains blocked), `docs/DESIGN.md` §4 stage 2 and the
   v1.28 paragraph near line 335. `methodology/reviews/2026-09-15-context-proof/`
   gets `verification.md` (written by Stew after the live Opus 5 run) and the
   board memos; leave placeholders out, Stew adds those files.
6. Full checks: `npm test`, `npm run validate`, `npm run validate:diff`,
   `npx astro check`, `npm run build`, `npm run audit:exposure`,
   `npm run audit:duplication`, `npm run audit:sitemap`.

## Limits to state publicly

The proxy sees what the CLI addresses to its configured base URL. Nothing
else on the machine is monitored. The check pins the vendor prompt by hash and
does not publish its text. The reviewer is told the operator's account email
and working directory by the vendor's own reminder blocks; that is disclosed
as host context, not treated as isolation. A passing proof is evidence about
one attempt under one CLI version, not a vendor guarantee. Codex and Google
have no capture-backed profile yet; the three-seat panel therefore still
cannot run, and consultation's Google source audit remains blocked.
