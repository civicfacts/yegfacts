# Review context: panel radius, home rules, methodology badges, round 3

Repository root: the design-rules worktree of civicfacts/yegfacts
(branch `design-rules`, cut from `f0023e0`). Round 2 (REVISE: 1
standards, 2 spec) was answered in the latest commit, `git log -1`;
`git diff HEAD~1` shows it alone. Do not edit anything. Same
constraints as rounds 1 and 2.

## What changed since round 2

1. `src/pages/methodology/index.astro`: each matrix group label is an
   `<h4>` (font-sans, carrying the agreement tile and the panel count),
   so Unanimous, Adjacent and Split are reachable by heading
   navigation. The page outline is declared in `sections` and built by
   `src/lib/toc.ts`, so the h4s do not enter "On this page".
2. The agreement tile is `text-[0.6875rem]` (11px), matching
   `StateBadge.astro` and the panel-count label.

## Files to review

- src/pages/methodology/index.astro

Verify both fixes land and introduce nothing new (heading order h2 →
h3 "The whole table" → h4 groups). Concrete findings with file:line. No
praise. End with REVISE or APPROVED.
