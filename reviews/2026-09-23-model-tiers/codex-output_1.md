## Required fixes

1. **Restore the methodology history.** Current `origin/main` is `574487e`, not the `f360010` named in the review context. Against the current ref, [changelog.yaml](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/methodology/changelog.yaml:17) replaces the merged v1.35 entry with v1.34. Preserve v1.35 and add this refresh as the next version.

2. **Close the shadow-seat guard.** [run-reviewer.sh](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/scripts/panel/run-reviewer.sh:90) requires `--into` but accepts `--into round1`; line 182 then targets the directory that `merge.ts` reads. It also accepts `round2` and `round1-rerun-*`. Reject round directories and symlinked targets before invocation. The “never merged” claims in [DESIGN.md](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/docs/DESIGN.md:350) and [changelog.yaml](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/methodology/changelog.yaml:33) are not true with this guard. A read-only probe confirmed `--into round1` passes the guard and reaches the brief lookup.

3. **Test the new safety behavior.** [invoke-reviewer.test.ts](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/tests/invoke-reviewer.test.ts:527) does not test Luna or the shadow restrictions; [three-seats.test.ts](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/tests/three-seats.test.ts:175) tests Sol only. Cover both accepted OpenAI pins and an unlisted model, plus a valid isolated Luna run and rejection of missing `--into`, round 2, and reserved output directories. The comma-list check accepts both exact model IDs, and `gpt-luna` does not collide with `gpt`.

## Suggestions

- [DESIGN.md](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/docs/DESIGN.md:336) calls the table *historical commands, not approved for new runs*, then adds current v1.34 commands. Separate the historical commands from current launcher instructions.
- [changelog.yaml](/Users/iabdulin/Sites/yegfacts/.claude/worktrees/model-tiers/methodology/changelog.yaml:31) names vendor performance claims and an independent legal-research index without links. Cite them or remove those comparisons; the entry’s cost rationale does not need them.

`bash -n` passed for both changed shell scripts. I did not run the test suite in this read-only workspace.

VERDICT: REVISE

