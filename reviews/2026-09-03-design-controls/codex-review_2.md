# Review context: control corners, panel depth, forest footer, round 2

Repository root: the design-controls worktree of civicfacts/yegfacts
(branch `design-controls`, cut from `130865c`; first commit `102ee75`,
round-1 fixes in the latest commit, `git log -1`). `git diff HEAD~1`
shows the round-1 fixes alone; `git diff 130865c HEAD -- <files>` is the
whole change. Do not edit anything. Same constraints and review focus as
round 1.

## What changed since round 1

1. Pagefind: `--pagefind-ui-border-radius` is back to 0, so result tags
   and loading blocks stay square; `#search .pagefind-ui__search-input`
   and `.pagefind-ui__search-clear` take `--radius-control` directly.
   The filter checkboxes are `<input>`s and take the 3px base-layer
   radius like every other control.
2. The stylesheet header and DESIGN.md §10 now state the one exception
   to "nothing else has a shadow": the gold rule under the current nav
   word is drawn with an inset box-shadow, but it is a rule, not depth.
3. The strip's hairline side borders are kept, on Stew's decision, and
   DESIGN.md §10 now says so and why: with the shadow alone the strip's
   outline read fainter than the dividers between its own cells. The
   CSS comment above `.strip` matches.
4. The footer colophon's comma after "model reviews" is restored; the
   only punctuation change left is the em dash to a colon.

## Files to review

- src/pages/search.astro
- src/components/Footer.astro
- src/styles/global.css
- docs/DESIGN.md

Verify each fix lands and introduces nothing new. Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
