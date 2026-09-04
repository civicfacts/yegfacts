# Review context: design refresh, round 6

Repository root: the design-refresh worktree of civicfacts/yegfacts
(branch `design-refresh`, cut from `cb73b39`). Round 5 (REVISE: 1
standards, 1 spec, both Low) was answered in the latest commit;
`git diff HEAD~1` shows it. Do not edit anything.

## What changed since round 5

Both the stylesheet's header comment (`src/styles/global.css` lines 8
to 11) and `docs/DESIGN.md` §10 now list the transitioned properties
as: colour, background, border, underline colour, underline thickness,
opacity and the search glyph's stroke. That is the full set declared in
the transition block (`color`, `background-color`, `border-color`,
`text-decoration-color`, `text-decoration-thickness`, `opacity`) plus
the `.masthead a svg { transition: stroke-width }` rule.

## Files to review

- src/styles/global.css (header comment and the transition block)
- docs/DESIGN.md §10

Verify the two statements match the declarations. Concrete findings
with file:line. No praise. End with REVISE or APPROVED.
