# Review context: panel radius and home section rules, round 1

Repository root: the design-rules worktree of civicfacts/yegfacts
(branch `design-rules`, cut from `f0023e0`). Inspect with
`git diff f0023e0 HEAD`; do not diff against origin/main. Do not edit
anything.

## Files to review

- src/pages/index.astro
- src/styles/global.css
- docs/DESIGN.md

A full-page screenshot of the home page at 1280 and a 390 capture are
attached.

## What this is

A small third pass on yegfacts.ca after PR #46, on the founder's
questions:

- The white panels (`.panel`, `.strip`) take the same 3px
  `--radius-control` the interactive controls carry, because a block
  with a shadow reads as a card. Badges, tiles, tables, rules and the
  ledger's left edges stay square; DESIGN.md §10 now says the verdict
  badge stays square on purpose.
- The 3px ink rules that sat above the home page's four section
  headings ("Recently checked", "Browse by topic", "How a verdict is
  made", "Corrections") are removed. No other page had them; the space
  above a heading is the break. The coloured top edges on the panels
  themselves (ink, brick, forest) stay, since they say what kind of
  panel it is.
- The stylesheet header comment, the `.panel`/`.strip` comment and
  DESIGN.md §10 were rewritten to match.

## Constraints that must hold

- No wording, number, date or link-target changes anywhere.
- The home page's heading order and structure are unchanged; only the
  rule above each heading is gone.
- A rounded panel with a 3px coloured top border renders cleanly (no
  gap at the corners, the top border follows the curve).
- No horizontal scroll at 390px.
- docs/DESIGN.md §10 and the global.css header describe the code
  truthfully: which things are square, which carry the radius, and that
  no section heading on any page sits under a rule.

## Review focus

Whether the doc claims match the code exactly, whether anything else on
the site still draws a rule over a section heading (grep for
`border-t-[3px]` and the `.section-heading` uses), the rounded top
border rendering, and any regression in the home page's grid from the
wrapper `<div>`s being removed. Concrete findings with file:line. No
praise. End with REVISE or APPROVED.
