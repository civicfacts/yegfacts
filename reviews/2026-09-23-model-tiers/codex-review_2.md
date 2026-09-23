# Review context, round 2

Repository root: <repo>
(branch model-tiers, rebased onto origin/main 74c16b0 which now carries v1.35
and v1.36; compare with `git diff origin/main -- <file>`). Working tree clean.

Changed files: docs/DESIGN.md, methodology/changelog.yaml,
scripts/panel/run-reviewer.sh, scripts/panel/invoke-reviewer.sh,
tests/invoke-reviewer.test.ts, tests/three-seats.test.ts.

What changed since round 1:
1. Rebased: v1.36 and v1.35 sit above v1.34 in the changelog; nothing replaced.
2. Guard: the shadow seat now requires `--into shadow-<name>` (case pattern
   `shadow-*`); `round1`, `round1-rerun-1`, `round2` and a missing `--into` are
   all refused before the brief lookup, and round 2 is refused. Usage text and
   the case comment say so.
3. Tests: tests/invoke-reviewer.test.ts has two new run-reviewer tests (every
   refusal case, plus a dry run showing gpt-6-luna, effort high and the
   shadow-round1/gpt-luna.json destination, with no launcher call) and three
   new rows in the refusal it.each: gpt-6-luna and gpt-5.6-sol clear the pin
   check and stop at the credential, gpt-5.6-luna is refused as unpinned.
4. DESIGN.md: the historical table is restored exactly as on main; a "Current
   pins (v1.34)" paragraph and the shadow-seat paragraph follow it, before the
   "From v1.28" paragraph.
5. Changelog: the unsourced accuracy comparisons are gone; the two price
   sources are linked; the shadow highlight matches the guard.
6. New, at the request of the session running the v1.35 park confirmation:
   gpt-5.6-sol stays in the openai PINNED_MODELS list (never default) while a
   framing check that ran on it is open, because v1.35 confirms a park on the
   same pinned model as the report it confirms. Stated in the launcher comment,
   the v1.34 entry and DESIGN.md.
