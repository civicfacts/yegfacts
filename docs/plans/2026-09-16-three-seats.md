# Admit the Codex and Gemini seats under stated limits

**Decision (founder, 2026-09-16):** "can't we unblock the other two seats?
... we can just note the limitation that no matter how hard we try, we can't
isolate completely until we run models through API which will cost more
money compared to subsidized subscriptions." Methodology v1.31. Both seats
run under the best profile each CLI allows, the v1.30 denylist check runs
over whatever record each CLI yields, and the public copy says plainly what
each check covers and why the project accepts the gap: a fully controlled
context needs direct API calls, which the project does not pay for.

**Unchanged:** the Claude profile (v1.30), the recording proxy's contract,
retention, the runner's refusal to install anything not admitted, the model
and effort pins (`gpt-5.6-sol` high, `gemini-3.8-flash-high` high), the
three-seat rule, framing-check caps. No historical run is certified.

Probe evidence is private under `~/.local/state/yegfacts/probes/` (read
only; contains account identifiers; never copy into the repo). The key facts
are summarised below; where this plan and the probe notes disagree, verify
against the CLI and report.

## Codex seat (`openai`, codex-cli 0.154.0)

Per-attempt `CODEX_HOME` under the private archive (0700) containing only
`auth.json -> $HOME/.codex/auth.json` (symlink, never a copy; the real file
is never read by our code) and a two-line `config.toml` naming the model and
`model_reasoning_effort = "high"`. Invoke the real binary, not the shim:
resolve `codex` on PATH, and if it is the cmux shim (a shell script), use
`$HOME/.bun/install/global/node_modules/@openai/codex-darwin-arm64/vendor/aarch64-apple-darwin/bin/codex`
when it exists; set `CMUX_CODEX_HOOKS_DISABLED=1` in the subprocess
environment either way; record the resolved path and its hash privately.

Command shape (verify each flag against `codex exec --help` and
`--strict-config`, which rejects unknown keys before any model call):

```
codex --search exec -m gpt-5.6-sol -C <work dir> --skip-git-repo-check \
  -s read-only --strict-config --ignore-rules --json \
  -c openai_base_url="http://127.0.0.1:<port>/backend-api/codex" \
  -c chatgpt_base_url="http://127.0.0.1:<port>/backend-api" \
  -c skills.include_instructions=false -c project_doc_max_bytes=0 \
  --disable enable_request_compression \
  --disable plugins --disable recommended_plugins --disable apps --disable hooks \
  --disable multi_agent --disable multi_agent_v2 --disable memories \
  --disable computer_use --disable browser_use --disable browser_use_external \
  --disable image_generation --disable goals --disable tool_suggest
```

The package goes as the positional prompt argument (or stdin if the
installed build reads it; verify). Capture: the proxy forwards to
`https://chatgpt.com`; the model request is `POST /backend-api/codex/responses`
and search is `/backend-api/codex/alpha/search`. The build tries a WebSocket
first and falls back to HTTPS after about a minute; accept the delay and
record it. Redact `chatgpt-account-id` in addition to authorization, api key
and cookie. Retain raw bodies as `req-NNNN.bin` beside the JSON when a body
does not parse.

Check: the v1.30 capture check over every captured request body, package
presence required. Tool outputs return in later turns' bodies, so a reviewer
that reads a private file is refused by the same check. Structural check:
`--json` event stream; require exit 0, a final message, and for the canary at
least one successful search-endpoint request in the capture (the 2026-09-09
run showed the model fabricating a fetch when web was off; the string in the
answer is not evidence). Canary: fetch example.com heading, search once,
attempt to read `../CANARY.md`, list tools. Under this profile the file read
is expected to succeed; record it as `file_read: allowed` rather than
failing, and disclose. Effort: verify `model_reasoning_effort` appears in
the captured body and matches the pin.

Limit to state: shell and web run through one host and cannot be separated;
the read-only sandbox reads the whole filesystem; the check refuses runs
that carried private text, it cannot prevent the read.

## Gemini seat (`google`, agy 1.1.28)

Per-attempt `HOME` under the private archive (0700) containing
`.gemini/antigravity-cli/antigravity-oauth-token -> $HOME/.gemini/antigravity-cli/antigravity-oauth-token`
and `.gemini/antigravity-cli/installation_id -> ...` (symlinks), plus a
`.gemini/antigravity-cli/settings.json` written by the launcher:

```
{"permissions": {"allow": ["read_url(*)"], "deny": ["read_file(*)", "write_file(*)", "command(*)", "execute_url(*)"]}}
```

Command: the real binary `$HOME/.local/bin/agy` (PATH has a shell alias
adding `--mode`; do not rely on it):

```
agy --sandbox --dangerously-skip-permissions --disable-slash-commands \
  --effort high --model gemini-3.8-flash-high --output-format stream-json \
  --print-timeout 45m --log-file <attempt>/agy.log --prompt "<package>"
```

`--effort low` conflicts with the model id; only high is pinned anyway.
No capture exists: `BAICODE_PREDICTION_ENDPOINT_URL` and
`GOOGLE_GEMINI_BASE_URL` are ignored under this login, the log holds no
bodies, and the local transcript omits the system prompt. Retain: the
stream-json stdout, stderr, the log, the final response, and the probe home's
`.gemini/antigravity-cli/brain/<conversation>/.system_generated/logs/transcript_full.jsonl`
copied into the attempt directory before the home is removed. The CLI also
writes logs, caches and builtin skills into the real `~/.gemini/antigravity-cli`
regardless of HOME; disclose, do not fight it.

Check: the v1.30 denylist over the stream-json stdout, the transcript and the
final response (string values), package presence required in the transcript.
`context_proof` for this seat is `record-only`, a fourth value beside pass,
fail and unavailable, meaning the check ran over the CLI's local record and
not over a request; admission accepts `pass` or `record-only` for this seat
only, and the public row says which. Structural check: exit 0, a `result`
event with status SUCCESS, tools used drawn from `read_url_content`,
`search_web` and response steps only (any file, command or write tool in the
step stream fails), canary file read refused, fetch result carrying the
heading. The Gemini seat's own canary output from the probes: 48k tokens for
a three-item canary, so keep canaries short.

Limit to state: no request capture; the check sees only what the model
produced and what its tools returned; global instructions and extensions are
kept out by running from an empty home, which the probe supports but cannot
prove.

## Shared

- `record-proxy.mjs`: upstream selected per provider from a fixed table
  (`https://api.anthropic.com`, `https://chatgpt.com`); loopback test override
  unchanged; add the account-id header to the redaction set.
- `invoke-reviewer.sh`: replace the two BLOCK_REASON refusals with the
  profiles above; keep every existing safety property (attempt dirs, no
  overwrite, metadata on every exit, upstream gate, admission only after
  canary and research both pass). Per-attempt homes live under the attempt
  directory and are removed file by file afterwards (only what the launcher
  created; the symlinks are unlinked, never followed).
- `attempt-record.ts`, `record-run.ts`: `context_proof` accepts
  `record-only`; a `record_kind` field (`request` or `local-record`).
- `run-reviewer.sh`: the codex and agy rows stop saying the seat is refused.
- Tests with stub `codex` and `agy` executables on PATH (the launcher must
  honour a test hook for the binary path: use `YEGFACTS_REVIEW_CODEX_BIN` and
  `YEGFACTS_REVIEW_AGY_BIN`, loopback-upstream-gated like the pins were, and
  recorded in metadata): profile assembly, the deny settings written, the
  symlinks created and unlinked, the capture check over a stub capture and
  over a stub transcript, a file-tool step failing the Gemini structural
  check, admission and non-admission paths, refusals when the auth file is
  missing (never create one).
- Public record: changelog v1.31 (scope `three-seats-under-stated-limits`),
  the methodology page reviewer-execution section (one dated September 16
  paragraph after the existing ones: the two seats, each limit, the
  founder's reason in plain words: full isolation needs direct API access,
  which costs money the project does not spend; the September 9 refusal of
  a convention-only check stands beside this), DESIGN.md, the consultation
  pause reason in `intake/register.yaml` (now: paused because the
  independent source check is unfinished; the three seats can run again),
  and the short-version line on the methodology page ("no panel has run
  since September 4") updated to say the seats can run again as of
  September 16 while no finding has yet been published.
- `methodology/reviews/2026-09-16-three-seats/DECISION.md` and
  `verification.md` are written by Stew after live canaries; do not create.

## Checks

`npm test`, `npm run validate`, `VALIDATE_BASE_REF=origin/main npm run
validate:diff`, `npx astro check`, `npm run build`, the three audits.
