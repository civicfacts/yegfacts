# Reviewer isolation and complete response retention plan

**Goal:** Correct the capture overclaim, stop unverified reviewer launches, and retain complete per-attempt evidence before extraction.

**Architecture:** Keep the existing Bash panel assembler and JSON extractor. Add one invocation helper used by the panel runner and a package-in/report-out entry point for framing and source audits. The first supported profile is the installed Claude 2.1.266 safe-mode web-only profile. Codex and Google are blocked until an isolated research-capable invocation is demonstrated. Never change global configuration or credentials.

**Stack:** Existing Bash, Node/TypeScript, Vitest and subscription CLIs. No new dependencies or container infrastructure.

## Design and alternatives

A scratch directory alone is rejected as an isolation boundary. A host filesystem jail is deferred because its credential and runtime exceptions add a separate maintenance problem. Native customization suppression and a strict public-web tool allowlist are selected, with per-attempt canary evidence and fail-closed admission. This restricts PDF retrieval and supersedes the earlier assumption that every seat may safely use a local shell. No old run is retroactively certified.

The installed Codex exec path was tested, not only its diagnostic command. Disabling memories, plugins, apps, hooks and host skill discovery still left global instructions and a skills catalog in the request. Disabling its code-mode host also prevented the public fetch. This proves that tested profile fails; it does not prove every possible Codex configuration fails. Google has no demonstrated customization/tool boundary in its installed CLI. Neither seat may silently fall back to the old command.

Claude safe mode disables customizations while retaining subscription authentication. Its allowed model tools are WebSearch and WebFetch only. A fresh synthetic check must verify those tools, absence of injected customization in the captured request, inability to read a harmless fixture outside its working directory, and an actual successful public fetch. The canary runs separately from the real package under the same profile, and its limits must be stated. A canary is evidence about that execution, not a proof about every future CLI release.

## Task 1: Journal correction

Modify only `src/content/journal/i-was-picking-the-claims.mdx`: insert a dated correction before the original body. Preserve the original date and body. Link the merged roads audit; distinguish a displayed-versus-extracted discrepancy from known missing unique comments.

## Task 2: Retained, restricted invocation

Create `scripts/panel/invoke-reviewer.sh` and a small companion parser only if needed. Accept provider, prepared package and fresh private attempt directory. Reject unsupported providers/versions before research. Keep artifacts outside every Git worktree, mode 0700 directories and 0600 files. Never overwrite an existing attempt. Preserve package, raw stdout/stderr, complete final response, request/stream trace, validation diagnostics, exact exit status, profile and hashes. Raw material is private; public manifests carry identifiers/hashes/status, not local paths or raw traces.

Use the verified Claude flags: `--safe-mode --setting-sources '' --strict-mcp-config --disable-slash-commands --no-session-persistence --permission-prompts none --tools WebSearch,WebFetch --allowedTools WebSearch WebFetch`. Retain structured streaming output and the complete final text including any trailing provenance. Add a per-attempt synthetic probe. A denied tool, unexpected tool/configuration, absent proof, nonzero exit or missing final response fails closed.

Do not rely on a model saying it was isolated. Validate the observed tool inventory and request/stream evidence. Do not rely only on a denylist of familiar private phrases. If the installed profile cannot meet that check, refuse it too.

## Task 3: Connect existing callers

Update `scripts/panel/run-reviewer.sh` to invoke the helper for each of its at-most-two attempts. Retain both packages and outputs before schema extraction. Nonzero invocation exits never earn status ok even if stdout contains valid review JSON. Preserve old successful outputs rather than overwriting them on a failed re-invocation. Update `scripts/panel/record-run.ts` with backward-compatible per-attempt exit, profile, proof and artifact hashes. Keep model pins, claim scope and two-attempt schema policy unchanged.

Add a package-in/report-out framing/audit entry point that invokes the same helper exactly once and refuses to overwrite an existing report. It does not assemble briefs, issue verdicts, reset caps or authorize parked runs. No new framing report or real panel is run in this batch.

## Task 4: Meaningful checks

Add tests using stub executables for complete footer retention, two distinct retries/packages, valid JSON plus nonzero exit rejection, permission denial rejection, unsupported provider refusal without invocation, failed boundary proof, unexpected tools, immutable existing output, and manifest backward compatibility. Run one live Claude profile canary with the final implementation. Preserve the failed Codex probe. Record an honest Google availability/isolation limit; do not run consultation through an unverified boundary.

## Task 5: Public record and release

Methodology v1.28 records the execution contract and reduced retrieval, corrects the old scratch-isolation claim, preserves historical commands and makes no claim about uninspected historical runs. Update `docs/DESIGN.md` and the live methodology disclosure. Publish the independent board memos with an editorial disposition preserving disagreements and correcting unsupported suggestions. Retain raw evidence while the associated public record exists; inspection requests go to research@yegfacts.ca, with privacy/rights review before sharing.

Run validation, relevant tests, full suite, type check, build, exposure, duplication and sitemap checks. Get independent critique of the code and reader-facing correction, PR on the branch, merge only on green, then verify production and update the private board locally.
