# Review context: the methodology short version drawn as a flow, round 5

Repository root: the methodology-flow worktree of civicfacts/yegfacts
(branch `methodology-flow`, cut from `0c10681`). Round 4 approved. The
founder then looked at the preview and reported visual artifacts: the
spine ran through the digits, and every row divider crossed the spine,
so the numeral column read as a grid of small crosses. The latest
commit, `git log -1`, answers it. Do not edit anything, do not build, do
not run git commands that touch the working tree. `dist/methodology.html`
was built after that commit.

## What changed since round 4

`src/components/NumberedSteps.astro` only. Under `flow` (and from `sm`)
the numeral span carries the paper ground and is positioned, so the
spine passes behind the digit instead of through it; and the flow list
drops its row dividers (`divide-y divide-rule`), keeping the top rule,
since the spine is what joins the steps. Without `flow` the `<ol>`
class string is exactly what it was, so the intake and stages lists are
unchanged (check the three `<ol class="…">` strings in the built page).

Screenshots attached: 1280 and 390, post-commit build.

## Review focus

Are both artifacts gone at 1280? Does the flow still read as one
process without dividers, and do the two other lists still carry
theirs? Anything new at 390. Concrete findings with file:line. No
praise. End with REVISE or APPROVED.
