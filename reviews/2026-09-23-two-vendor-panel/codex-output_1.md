## Required fixes

1. [capture-check.ts](scripts/panel/capture-check.ts:147) removes note-shaped text from **any** JSON string, not just a Claude `tool_result`. Its pattern also accepts an arbitrary destination path. A fabricated note can therefore hide the home path and still pass. The cut is correctly limited to the home-directory source—repository paths, canary tokens and private-file lines remain checked—but the note’s origin and shape need tighter checks.

2. [invoke-reviewer.sh](scripts/panel/invoke-reviewer.sh:571) still accepts a direct `--provider google` research invocation without `--finish-frozen-run`. The new guards cover `run-reviewer.sh` and `audit-package.sh`, but not their shared launcher.

3. [glossary.ts](src/lib/glossary.ts:174) counts every round-one manifest row, including failed attempts. A failed Claude row beside three successful two-vendor rows makes the count four; the catch block then labels the finding as a historical Claude/GPT/Gemini panel. Classify the successful seats and do not silently substitute a historical label when a manifest is inconsistent. Its `process.cwd()` assumption matches the existing build-time convention in `AiReview.astro`.

4. [stream-boundary.ts](scripts/panel/stream-boundary.ts:472) says none of the private text appeared, then discloses that the home path appeared in counted notes. The passing proof must not make both claims.

5. Public method copy still overclaims or omits the new exception. [DESIGN.md](docs/DESIGN.md:19) calls the current reviewers “three independent reviewers,” and its present-tense finding description repeats that claim at line 1208. The [methodology page](src/pages/methodology/index.astro:454) describes every private-text hit as a refusal without stating the v1.38 home-path exception. Align both with [the changelog](methodology/changelog.yaml:16).

6. [preflight.sh](scripts/panel/preflight.sh:1) explicitly does not probe quota, and no panel command invokes it. That does not meet the adopted pre-run check for versions, login and quota.

## Suggestions

None beyond the fixes above. Luna’s default round-one destination is `round1/gpt-luna.json`; round two and explicit `--into` destinations remain available, so it is not *literally* limited to that one file.

This was a read-only diff review; I did not run the test suite or edit files.

**VERDICT: REVISE**

