<!-- Independent audit-record critique, 2026-09-09. Runner: Anthropic claude-opus-5, high effort, Claude Code 2.1.266. Reviewed commit 750b3af against 617ec14. Report below is unedited; both non-blocking wording notes were subsequently applied. -->

APPROVED

Independent read-only review of commit 750b3af against 617ec14. No repository
file was modified. Scope: the five added/changed files in that commit, checked
against `prompts/framing-check.md`, the two original framing traces, and the
source-existence runner artifacts. No blockers.

## What I verified, and how

**The commit touches nothing frozen.** `git diff --name-only 617ec14 750b3af`
returns only `run-record.md` and four files under `verification/`. `brief.md`
and both framing reports are absent from the diff, and the brief's SHA-256
recomputes to `083f4a63...02018`, matching `run-record.md:18` and
`setup-audit.md:48`. The freeze bytes are intact.

**Trace-count claims are exact.** `setup-audit.md:13` says check 1 made 7 tool
calls including 4 to the web tool; `setup-audit.md:16` says check 2 made zero
of any kind. Parsing the two named traces for `function_call`,
`custom_tool_call` and `local_shell_call` items: check 1 has 7 (5 `exec`, 2
`js`), 4 of which carry a `web__run` invocation; check 2 has 0. Both numbers
are right as written. The private diagnosis artifact carries a looser "six live
web calls" in its summary; the editor did not import that figure, and 4 is the
number the trace supports.

**The trace hashes and identifiers hold.** SHA-256 over the two complete
original trace files matches `480a4362...dd100` and `10b15d4e...4c582a` at
`setup-audit.md:36` and `:39`. Session IDs and the UTC start times (06:04:27
and 06:15:13) agree with the trace filenames once local offset is applied.

**Report-to-trace matching is real, not asserted.** Extracting the final
assistant message from each trace and comparing it to the committed report with
only the leading HTML provenance comment removed and outer whitespace trimmed
gives byte equality for both `framing/check-1.md` and `framing/check-2.md`.
Interior bytes are identical, so `setup-audit.md:8-11`'s "Matching ignores only
their added HTML provenance headers and boundary whitespace" is accurate rather
than approximate.

**Web availability is not overclaimed.** `setup-audit.md:20-24` says the
missing `--search` flag is not proof of disabled access, that check 2's trace
does not enumerate the tools offered so its availability is not claimed as
directly observed, and that only its non-use is directly observed. That is the
correct epistemic split and it matches the diagnosis artifact's own limits
section, which flags the same inference as configuration parity rather than
observation. Nothing in the commit asserts check 2 could have reached the web.

**The eScribe naming is correct.** `setup-audit.md:14-15` names report IS03688
and Attachment 5 as the failed retrievals. In check 1's trace the refused URLs
are DocumentId 304024 and 304032; `brief.md:492` maps 304024 to report IS03688
and `brief.md:497-499` maps 304032 to Attachment 5. The browser fallback
refusal is in the trace as described.

**`source-existence-attempt.json` matches the runner trace field by field.**
`model` matches the trace's `init.model` (`gemini-3.8-flash-high`).
`reported_error` reproduces the trace `result.error` verbatim, including the
`50h54m44s` figure. `input_tokens` and `output_tokens` of 0 match
`result.usage`. `research_performed: false` (line 12) is supported: the trace
contains no tool-call event of any kind, only `user_input`, three
`agent_response` and three `error_message` steps, `num_turns: 1`, and a total
token count of 0. The recorded command redacts the package to
`<package argument>` and leaks no path. `started_at`/`finished_at` and
`exit_code: 1` come from the runner's own invocation record; the 6.6s wall
span against the trace's 3.43s `duration_seconds` is process overhead, not a
discrepancy.

**Package SHA reconstructs.** Concatenating the committed
`source-existence-request.md` bytes, a blank line, the literal heading
`## Frozen brief`, a blank line, and the committed `brief.md` produces exactly
`90afdad1...b003734`, matching `source-existence-attempt.json:5`. The resulting
file is byte-identical to the package the runner was given. A reader with only
the repository can rebuild the audited input and confirm the hash. The blank
line before the heading is load-bearing: omitting it yields
`ebb14201...288f1ba3`.

**The quota failure is never dressed up as research.** `setup-audit.md:74-77`
says Gemini returned an account-quota error before research with zero tokens,
produced no source verification, and the runner exited 1. `run-record.md:483`
says "no panel result or source-audit result exists". The JSON says
`research_performed: false`. Consistent everywhere.

**The review cap is untouched.** `setup-audit.md:53-58` records that the editor
considered spending an unused third framing report, that the independent review
rejected that reading, that the editor accepts the objection, and that no review
count is reset and no framing verdict is redefined. This is the reading
`prompts/framing-check.md` supports: the third report is a confirmation of an
editor's written resolution of OPEN or WEAKENED findings, and check 2 left
none. The commissioned Gemini audit is explicitly outside the framing stage and
returns no framing or claim verdict, so it does not consume or redefine a
report. `run-record.md:475-476` states the same in the canonical record.

**No finding is claimed.** `setup-audit.md:27-29` states that nothing here
establishes either source is absent or the claim false, and `:69-70` that this
records an omitted check, not a demonstrated defect, with no panel-quality
event type or methodology rule added. `run-record.md:484` confirms the
historical freeze is unchanged and the brief is not marked PARKED. Correct on
the rules: a failed existence lookup would be a framing finding, not one of the
three closed defect kinds, and none has been found.

**Conditional advice is distinguished from adopted assertion.** The provenance
comment atop `procedure-review.md:1` marks it unedited, conditional, and says
the setup audit separately establishes the facts; the document restates its own
conditional standing in its opening section. The editor adopts exactly one
thing from it, the cap interpretation at `setup-audit.md:53-58`, which is a
reading of committed rules and does not depend on the assumed premise. The
factual claims in `setup-audit.md` rest on the trace inspection, which I
recomputed above. That separation is sound. The unadopted material in
`procedure-review.md`, including its permanent-park risk and its ledger
recommendation, stays visibly the reviewer's conditional view.

**Disposition and resumption cohere.** The commissioned audit's vendor is
neither the brief author's nor the editor's, as the review recommended. The
runner's working directory in the trace is an isolated scratch directory, so
"in an isolated directory" at `setup-audit.md:89` describes what actually
happened. The reset arithmetic checks: 2026-09-09T17:23:55Z plus 50h54m44s is
2026-09-11T20:18:39Z, and `setup-audit.md:94-96` correctly labels it a provider
estimate rather than a scheduled retry.

**No secrets or local paths.** Grepping every added line for home directories,
`/tmp`, session rollout paths, env files, keys and bearer tokens returns
nothing. The trace files are identified by hash and session ID only, and
`setup-audit.md:42-44` is honest that hashes identify the traces without making
them publicly inspectable.

## Non-blocking notes

Neither of these holds the commit. Both are one-line fixes if the editor wants
them.

1. `run-record.md:476` reads "An independent source-existence audit is checking
   the omitted obligation." As of this commit no audit is checking anything;
   the attempt burned zero tokens on a quota error. `run-record.md:480-482`
   states the real position four lines later, so the section is self-correcting
   and a reader is not left misled. Still, that sentence read alone asserts
   work in progress that does not exist. "is commissioned and has not yet run"
   would match the JSON.

2. `setup-audit.md:86-88` tells a resumer to "assemble the preserved request,
   then the literal heading `## Frozen brief` followed by a blank line, then
   the unchanged `brief.md`." It specifies the blank line after the heading but
   not the one before it, and that byte changes the hash. The instruction to
   match the recorded package hash before invoking catches the error, so
   reproducibility is preserved either way; naming the separator would remove
   the guess.

## Points that cannot be checked from the repository

`setup-audit.md:3-6` credits the trace inspection to an independent Opus 5
session with matching and call counts recomputed by the editor. Whether the
editor performed that recomputation is a claim about process that leaves no
artifact. It does not matter much here, because the numbers are correct, which
I confirmed independently.
