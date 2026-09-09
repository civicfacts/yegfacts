> Independent advisory memo, September 9, 2026. Model: `claude-opus-5`, high effort. Separate session for this role; no other role memo supplied. The memo below is preserved unchanged. Claims and recommendations are not all adopted: read [DISPOSITIONS.md](DISPOSITIONS.md), including its factual corrections. Original memo SHA-256: `33a8bd4f803221bda42b9ef0c496a989be133c8e9da0238e93d158bca2a4446a`.

# Technology & Sustainability — reviewer isolation and response retention

Role version 1.0. Independent session, 2026-09-09. Question: can we build and sustain this?

## Fit

Partly. Two halves of this proposal have very different cost profiles and should not be approved as one thing.

The retention half fits well. Raw stdout, stderr, the complete final response, exit status and hashes per attempt are text, tens of kilobytes each. Held privately, that is a few megabytes a year. Today the runner writes one raw file per slot, overwrites it on the retry, and deletes the scratch directory on success through an exit trap. So the evidence of a passing run is destroyed by design and the first attempt of a failing one is destroyed by the second. Per-attempt filenames and copying artifacts out before the trap fires is a small, contained change to one script.

The isolation half is where the cost hides. Native CLI flags are a reasonable base. An independently verified real filesystem boundary is not: on a single-user laptop that means a separate account, a sandbox profile or a container per reviewer, plus its own upkeep. That is standing infrastructure where a convention plus an honest disclosure would do, and it is the thing most likely to be broken and unfixed when the founder comes back after two weeks away.

## Benefits

The audit trail stops depending on ad-hoc copying, which is what lost the citation footer. The isolation claim in the runner's own header becomes testable instead of asserted. Fail-closed on unsupported configurations is right for this pipeline: the synthesis matrix needs exactly three verdicts, and the script already halts a two-reviewer panel.

## Risks

CLI flag churn is the main sustainability risk, and it is already visible. The evidence in this working set shows the installed Codex rejecting both `--ignore-user-config` and `--ignore-rules` on the subcommand probed. Whichever flags survive, they are unpinned dependencies that auto-update. A boundary made of flags plus fail-closed means a CLI upgrade during a quiet month turns into a dead panel with a cryptic error.

Verification decays. A canary proved once is a claim about one CLI version. If it is not re-run when versions change, the disclosure goes stale and we are back to the exact failure being fixed.

Tools-only mode reverses D-0025 for the Gemini seat, which was granted a shell after six empty returns on PDF sources. A seat that cannot read the documents its brief names is not a reviewer of them.

## Recommendation

Approve conditionally, in this order.

1. Retention and exit handling first, as a standalone change: per-attempt raw files, complete final response captured by the runner rather than by hand, artifacts copied out before cleanup, nonzero exit recorded and treated as a failed attempt. No new abstraction.
2. Native flags plus a canary script that runs in under two minutes and records the CLI version it proved. Preflight the flags before spending tokens.
3. Reject the filesystem jail for now. Disclose residual risk instead.
4. One shared invocation layer only if two callers exist. Until then, a function in the existing runner.

Disagreement to record: the brief treats a verified filesystem boundary as the acceptable path and tools-only as the fallback. On founder-hours the ranking is inverted. If the panel must pause because a seat cannot be isolated and researched at once, pause it and say so publicly rather than build a jail we will not maintain.

Methodology 1.28 must retract the scratch-cwd isolation claim explicitly, state reduced retrieval capability if it applies, and not retro-certify runs published before the boundary existed.

## Cost estimate

Retention and exit handling: 3–5 founder-hours. Canary plus preflight and tests: 3–4 hours, a few cents per probe on subscription seats. Filesystem boundary: 15–30 hours plus recurring breakage. Storage: negligible. Marginal cost per story: unchanged, unless tools-only parks stories, which costs whole stories, not hours.
