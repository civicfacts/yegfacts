# Reviewer execution verification — September 9, 2026

Editor: Stew, OpenAI GPT-6 Astra. Diagnosis and implementation: separate Opus 5
high-effort sessions. This record distinguishes governance approval, observed
CLI behaviour, and release checks. It is not a panel or a framing report.

## Diagnostic evidence

### Codex 0.153.4: tested profile rejected

The actual `codex exec` path was tested after an earlier diagnostic subcommand
rejected flags. The accepted invocation used GPT-5.6 Sol, high effort,
`--ignore-user-config --ignore-rules --strict-config`, read-only sandboxing and
JSON output. Memories, plugins, apps, hooks, multi-agent, shell tools, unified
exec, computer use, image viewing and the code-mode host were disabled; host
skill discovery was skipped and `project_doc_max_bytes` was zero.

The resulting trace still contained host AGENTS instructions and a skills
catalogue. The public fetch failed with the code-mode host disabled. CLI exit
was zero despite that tool failure. This profile is rejected, not every possible
Codex configuration. A preliminary attempt also supplied `tools.view_image=false`;
strict configuration rejected that key before research, although it appears in
online documentation. Installed behaviour, not the documentation alone, governs
this record.

Original trace session: `01a087b7-2b33-74c1-8d00-a8920c06bb99`.
SHA-256: `a828b8440d4a0302e2aa6980f50c207c783785d47270eea1737301a8bfdd4f2a`.

Reference documentation consulted after local CLI help:
[configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
and [non-interactive output](https://learn.chatgpt.com/docs/non-interactive-mode).
Neither source establishes that this tested profile met the execution contract.

### Claude Code 2.1.266: candidate is not an admitted research profile

A safe-mode, web-only candidate returned the heading “Example Domain” and did
not return a synthetic local-file token. The earlier assessment overstated what
its debug log proved: it contains request identifiers, not outgoing bodies.
Searching that log for private text cannot establish whether the model received
that text. The CLI startup inventory reports tools and some customization lists,
not the complete instruction context. Admin-managed settings still apply under
safe mode, according to the installed help.

The original diagnostic JSON and log are retained privately, including the
assessment corrected here. JSON SHA-256:
`8c88de12ae302d4f5000af6df9276ffe949aad71ea37d34bbcfaf2d4ef0870f5`.
Debug-log SHA-256:
`a023a2344df4fe882e1e4848921448aef82dc7b8eced3f4c2c86ee097c66c306`.
The final implementation must not admit research on the strength of those
observations alone. Candidate diagnostics are not a source audit or a finding.

### Google agy 1.1.28: no demonstrated profile

No verified configuration/context boundary was demonstrated for the installed
Google CLI. No consultation retry was sent through its historical command in
this batch. This is an execution limit, not a fresh quota or source-existence
result. The consultation audit package remains unchanged at SHA-256
`90afdad108e6f868a09c3c0e1a0a40cde6292a0297df9ee77a63f39a9b003734`.

## Editorial checks

An independent Opus 5 read found the correction in the intake summary and the
cycling article was also needed, and found navigation/link styling omissions in
the new methodology section. Those were corrected. The journal retains its
original body beneath a dated correction. The article's history records the
capture-count correction without changing a finding, agreement or evidence.
New copy describes the memory supplied outside the package and report 3's
observed reading/citation, without claiming the public trace manifest independently
establishes a per-session context inventory for checks 1 and 2.

The reviewer also required implementation evidence before publishing present-tense
protection claims. Unverified research profiles are blocked, not described as
operating successfully. The full final checks are recorded below after execution.

## Live high-effort candidate diagnostic

Stew independently ran the final candidate launcher at high effort with Opus 5
on Claude Code 2.1.267. Attempt `5203dce225ed3647` completed with CLI exit 0 and a
passing structural canary: exactly WebSearch/WebFetch, no permission denials,
a matching successful WebFetch result containing the requested heading, and no
returned synthetic local-file token. The prepared input package was retained,
not sent; diagnostic mode sends only its fixed synthetic canary.

**Context proof remained unavailable and research admission remained false.**
The fetch tool's summary is observed tool output, not an independent archive of
the page bytes. The earlier 2.1.266 version check rejected the CLI auto-update;
2.1.267 was then inspected for the diagnostic only, not admitted for research.
The implementer's earlier low-effort diagnostic is retained privately and is not
used as proof of the high-effort profile.

[Sanitized diagnostic record and hashes](candidate-diagnostic.json) identify the
complete retained stdout, stderr, final message, canary package and check report.
The archive is outside Git; root inspection found only owner-readable files
(0600) and owner-accessible directories (0700). No new source audit, panel,
framing check or factual finding resulted from this diagnostic.

The consultation queue's internal note is not the text rendered on its question
page. Browser inspection caught that distinction; the visible reason now also
names the unfinished source check and reviewer-execution block, as a dated
addition to the existing triage explanation. The brief and framing reports are
unchanged.

## Implementation and release checks

Independent specification review initially failed four requirements: diagnostic
hashes did not identify the retained final/proof files; the audit caller could
not select Google; low effort was unnecessarily allowed; and retry handling
lacked an integration test. All four were corrected and independently re-reviewed
**PASS**. Additional checks cover preserving both an existing report and its
manifest, exclusive installation when another writer wins a race, accurate
blocked status, and refusing an archive root inside Git before creating it.

The retry tests replace the launcher only inside a temporary fixture repository.
There is no production flag or environment variable that admits a real reviewer.
A future research profile must implement the documented research-output contract;
changing the current refusal alone would not provide one.

Root verification after those changes:

- `npm test`: **367 passed, 1 skipped**, across 25 files. The skipped test is the
  opt-in live diagnostic; the separately retained high-effort run above covers
  the same candidate command. The specification reviewer independently reproduced
  the full result.
- `npm run validate` and `npm run check`: pass; no Astro errors or warnings.
- `npm run build`: pass. Browser inspection at desktop and mobile widths verified
  the methodology correction, its navigation and links, the journal correction,
  the cycling opening/history, and consultation's visible pause reason. No
  horizontal overflow was found. Link-adjacent spacing found in the first render
  was corrected and checked again.
- Exposure audit after staging all new files: no fail-class findings; 38 PII
  warnings, all in files unchanged by this batch. No new exception is introduced.
  A founder-specific path in a negative test fixture was replaced with a synthetic
  path before release; its targeted test still passes.
- Duplication audit: no fail-class findings; 20 cross-page warnings for shared
  explanatory text and historical records. Those warnings do not identify a new
  duplicated answer in this batch.
- Sitemap audit: 360 sitemap URLs match 360 indexable built pages.

### Recovery note

If an exclusive output install loses a race, the runner refuses to overwrite the
winner's report or manifest. The losing attempt remains in the private archive,
but that failure does not add a pointer to the winner's manifest. The operator
must record the losing attempt's identifier when reconciling the run before
publication or resumption. No concurrent research run is enabled by this release.

For a custom archive location, pre-create its root with mode 0700. The launcher
does not change permissions on a pre-existing root; new attempt directories are
always 0700, but a world-readable outer root can expose directory names.

## Final independent review

[Final quality and release review](release-review.md): **PASS**, with no remaining
Critical or Important findings. The reviewer independently reproduced 367 passing
tests, one opt-in skip, clean type/syntax checks and validation. After the small
reuse/CLI cleanup, root also ran all 65 targeted panel tests successfully; the
live diagnostic remained an explicit opt-in skip in that automated run.

The review corrected present-tense retention copy and aligned the candidate
version names with the retained evidence. It also caught a second “621-comment
thread” phrase in the intake summary, which now says “621-record capture.” The
named archive custodian and explicit public-field whitelist were retained; a
shared entry-point utility outside the changed modules was not added.
