# Review brief, round 4: bars, table headers, panel agreement

Same checkout and scope as the earlier briefs; their decisions stand. After
round 3 the founder asked three things on the preview: "do we need column
headings? (claim, finding)"; "should we add a small gap between left
borders in claims, right now all of them merge into one line, same on the
home page"; and on the home page, "do we need 'split panel', 'unanimous
panel' there or not? I would drop it."

## What changed since round 3

- src/components/StoryList.astro: the Claim | Finding header row is
  `sr-only`; the table keeps a hairline above its first row. The 5px
  verdict bar moved from the cell onto the question block inside the
  cell's padding, so each row's bar stands alone with paper between.
- src/components/FindingsBoard.astro (used on / and /search): the same
  bar move, via an inner div that carries the bar and the grid, with the
  padding on the `li`. Panel agreement is printed only when it is not
  Unanimous: Stew's decision, narrower than the founder's suggestion to
  remove it, because a Split or Adjacent verdict on the front page must
  not look as firm as a unanimous one (charter: overclaiming is the
  costliest error). Unanimous is the default and stays silent.

Screenshots of /stories (1280, 390), / (1280, 390) and /search (1280)
accompany this brief.

## What to review

Whether the bars now read as one per row on all three pages, whether
losing the visible column heads costs anything, whether the
agreement-only-when-contested rule is honest and reads clearly to someone
who does not know the vocabulary (the one "Split panel" row on the home
page), the reading order of the boards after the inner div, and anything
the delta disturbs. Comments are public source.

End with a findings list (file:line, what, why it matters) and a single
line VERDICT: APPROVED or VERDICT: REVISE. File references must be
repo-relative.
