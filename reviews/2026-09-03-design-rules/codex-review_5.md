# Review context: panel radius, home rules, methodology badges, round 5

Repository root: the design-rules worktree of civicfacts/yegfacts
(branch `design-rules`, cut from `f0023e0`). Round 4 (REVISE: 1
standards, 1 spec, the h3 inside the summary) was answered in the
latest commit, `git log -1`; `git diff HEAD~1` shows it alone. Do not
edit anything. Same constraints as rounds 1 to 4.

## What changed since round 4

`src/pages/methodology/index.astro`: the `<h3>` "The whole table" and
its intro paragraph sit above the `<details>` as ordinary content; the
summary is its own control, a `<span>` reading "The twenty panels, from
the script" plus the `.disclosure-state` Show/Hide word. Heading order
h2 → h3 → h4 is unchanged and every heading is outside any summary.

## Files to review

- src/pages/methodology/index.astro

Screenshot attached: the section at 1280, disclosure closed. Verify the
fix lands and introduces nothing new. Concrete findings with file:line.
No praise. End with REVISE or APPROVED.
