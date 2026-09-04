# Review context: control corners, panel depth, forest footer, round 3

Repository root: the design-controls worktree of civicfacts/yegfacts
(branch `design-controls`, cut from `130865c`). Round 2 (REVISE: 1
standards, 2 spec) was answered in the latest commit, `git log -1`;
`git diff HEAD~1` shows the round-2 fixes alone. Do not edit anything.
Same constraints as rounds 1 and 2.

## What changed since round 2

1. `src/pages/search.astro`: the direct radius override now covers
   `.pagefind-ui__search-input`, `.pagefind-ui__search-clear`,
   `.pagefind-ui__filter-checkbox` and `.pagefind-ui__button`, each
   under `#search` so the id-plus-class selector outranks Pagefind's
   two-class selectors. Result tags, result images and loading blocks
   stay on the shared variable at 0.
2. `docs/DESIGN.md` §10: the strip sentence now says it keeps its 3px
   forest top rule and is closed by hairlines on its sides and bottom.

## Files to review

- src/pages/search.astro
- docs/DESIGN.md §10
- src/styles/global.css (the `.strip` rule, for the doc check)

Verify both fixes land and introduce nothing new. Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
