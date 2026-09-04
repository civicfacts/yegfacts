# Review context: design refresh, round 5

Repository root: the design-refresh worktree of civicfacts/yegfacts
(branch `design-refresh`, cut from `cb73b39`). Round 4 (REVISE: 1
standards, 1 spec, both Low, both documentation) was answered in the
latest commit on the branch; `git diff HEAD~1` shows the round-4 fixes
alone. Do not edit anything. Same constraints as rounds 1 to 4.

## What changed since round 4

1. `src/styles/global.css` lines 8 to 11 (the file's header comment) now
   list every transitioned property: colour, background, border,
   underline thickness, opacity and the search glyph's stroke.
2. `docs/DESIGN.md` §10's motion sentence lists the same set, naming the
   nav's 82% to full opacity as the opacity case.

## Files to review

- src/styles/global.css (header comment and the transition block)
- docs/DESIGN.md §10

Verify both statements now match the transition declarations in
`global.css`. Concrete findings with file:line. No praise. End with
REVISE or APPROVED.
