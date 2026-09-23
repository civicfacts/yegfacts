# Two vendors, three seats, and the capture note: how PR #85 was made and reviewed

Methodology v1.37 (the Google seat retires; three seats from two vendors) and
v1.38 (the capture check counts the CLI's binary-save note). The founder
decided the retirement on cost; a full board pass in the private record shaped
the change (four role memos on GPT-6 Sol, all REVISE, every required change
taken). This directory is the public record of how the code and copy were
written and checked.

Written by: Stew (Claude Fable 5.1) for the scripts, methodology entries and
design doc; a Codex implementer (GPT-6 Sol, workspace-write) for the public
copy, the per-finding panel label and the preflight script, from the spec in
`implementer-spec.md`; its report is `implementer-report.md`. Reviewed by: a
fresh Codex session (GPT-6 Sol, read-only), four rounds, approved on the
fourth. Each round's context and full output sit beside this file; paths from
the machine are replaced with placeholders.

| Round | Finding | Disposition |
|---|---|---|
| 1 | The note cut applied to any JSON string, not only tool results, and accepted any path. | Cut confined to values inside tool_result blocks, path pinned to the CLI's own projects directory; tests for both boundaries. |
| 1 | The launcher still accepted a direct Google research run. | The launcher refuses `--provider google` itself unless `--finish-frozen-run`, after the defaults so the refused row names the seat; the runner passes the flag; audits refuse outright. |
| 1 | The panel label counted failed manifest rows and fell back to the historical vendors. | Only answered rows count (no status means pre-v1.28); an unreadable manifest gets a neutral label with one build warning, never the historical vendor list. |
| 1 | A passing proof sentence claimed none of the private text appeared while disclosing counted notes. | The sentence says "none of it appeared except the operator's home-directory path, which N request(s) carried inside the CLI's own note…". |
| 1 | Design doc and methodology page still said "three independent" for the current method and omitted the v1.38 exception. | Both corrected; the exception and its limits stated on the methodology page. |
| 1 | Preflight checked no quota and nothing invoked it. | The runner calls it before anything is assembled; the launcher's canary, a one-line model call per attempt, is the quota probe, said in v1.37 and in the script. |
| 2 | Identical note text in a tool result and a text block was cut in both places (matching by string equality). | Matching is positional: each string value carries whether it was reached through a tool_result; tested. |
| 2 | Any three distinct providers earned the historical Claude/GPT/Gemini label. | The historical label requires exactly those three. |
| 2 | Preflight ran after the package was assembled and skipped the retired seat on a frozen run. | Moved ahead of the scratch directory; runs for every seat. |
| 2 | The home page counted vendors as reviewers. | Seats and companies counted separately; the sentence says both. |
| 3 | The home page generalised the newest run's panel to "every claim". | Qualified to the newest finding; every finding names its own panel. |
| 4 | None. | APPROVED. |

Checks on the final tree: `npm test` 494 passed, 1 skipped; `npm run validate`,
`npm run check` (0 warnings) and `npm run build` pass; no panel-label warning
in the build.
