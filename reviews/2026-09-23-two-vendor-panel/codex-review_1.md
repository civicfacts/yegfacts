# Review context

Repository root: this git worktree, branch two-vendor-panel. Compare with
`git diff origin/main -- <file>`; the working tree is clean.

Changed files: methodology/changelog.yaml (entries v1.37 and v1.38),
docs/DESIGN.md, scripts/panel/capture-check.ts, scripts/panel/stream-boundary.ts,
scripts/panel/invoke-reviewer.sh, scripts/panel/attempt-record.ts,
scripts/panel/run-reviewer.sh, scripts/panel/audit-package.sh,
scripts/panel/preflight.sh (new), tests/capture-check.test.ts,
tests/stream-boundary.test.ts, tests/invoke-reviewer.test.ts, README.md,
src/lib/glossary.ts, src/components/ClaimFinding.astro,
src/components/AiReview.astro, src/pages/about.astro, src/pages/support.astro,
src/pages/methodology/index.astro, src/pages/questions/[id].astro,
src/pages/sources/[id].astro.

What it does: the Google seat retires for runs frozen after 2026-09-23; the
panel is three seats from two vendors (Claude Opus 5.5, GPT-6 Sol, GPT-6
Luna); every page says so; each finding shows the panel from its own run
manifest; the capture check permits, counts and discloses the CLI's
binary-save note carrying the home path and refuses everything else as
before. Read the two changelog entries first: they are the rule.

Focus:
1. capture-check.ts: can anything other than the exact CLI note reach the
   cut? Can the note pattern be abused to smuggle other protected strings
   (repository path, canary, private file lines) past the check? The cut
   must apply to the home-directory source only.
2. run-reviewer.sh and audit-package.sh: can the retired Google seat run
   without --finish-frozen-run by any path? Does luna write only into
   round1/gpt-luna.json?
3. glossary.ts panelForClaim: correctness of the vendor classification;
   behaviour when run.yaml lists a failed Claude attempt row (status: failed)
   beside successful rows; process.cwd() assumptions at build time.
4. Public copy: any sentence that still claims or implies three independent
   vendors for the current method; any historical sentence wrongly rewritten
   to two vendors; consistency between the changelog, DESIGN.md and the
   methodology page.
Report required fixes separately from suggestions, each with file and line.
Do not edit files. End with VERDICT: APPROVED or VERDICT: REVISE.
