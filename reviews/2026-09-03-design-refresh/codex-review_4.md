# Review context: design refresh, round 4

Repository root: the design-refresh worktree of civicfacts/yegfacts
(branch `design-refresh`, cut from `cb73b39`). Round 3 (REVISE: 2
standards, 2 spec) was answered in the latest commit on the branch;
`git log -1` names it and `git diff HEAD~1` shows the round-3 fixes
alone. `git diff cb73b39 HEAD -- <files>` is the whole change. Do not
edit anything. Same constraints and review focus as rounds 1 to 3.

## What changed since round 3

1. `src/components/SeenCards.astro`: the "Source post" link carries
   `motion-reduce:transition-none` beside `transition-colors`, so it is
   still under `prefers-reduced-motion` like every other transition.
2. `docs/DESIGN.md` §10: the motion sentence now names every
   transitioned property: colour, border, underline thickness and the
   search glyph's stroke, on links and on the controls that change on
   hover, off under reduced motion.

## Files to review

- src/components/SeenCards.astro
- src/styles/global.css
- docs/DESIGN.md

Verify both fixes land and introduce nothing new. Concrete findings
with file:line. No praise. End with REVISE or APPROVED.
