# Review context: two cuts on the methodology page, round 1

Repository root: the methodology-trim worktree of civicfacts/yegfacts
(branch `methodology-trim`, cut from `e3c82ac`). The change is the latest
commit, `git log -1`; `git diff e3c82ac HEAD` is the whole of it. Do not
edit anything, do not build, do not run git commands that touch the
working tree. The built page is `dist/methodology.html`, built from HEAD.

## What changed

One file, `src/pages/methodology/index.astro`, two deletions.

1. The opening paragraph no longer ends "and a named person, Ildar
   Abdulin, answers for all of it." The accountability line stays in
   short step 5 and in stage 7 (the standing delegation). The About page
   (`src/pages/about.astro`, unchanged) carries it too.
2. The section "The launch slate, dropped" (`#launch-slate`) is gone,
   with its outline entry. The record of the slate stays in
   `methodology/changelog.yaml` at v1.17 and `docs/DESIGN.md` §7, both
   unchanged.

## Constraints that must hold

- Nothing on the site links to `/methodology#launch-slate` (grep `src/`).
- The page still names the accountable person at least once, in the
  method's own terms (D-0015 in the board record requires it; the About
  page's line is not a substitute for this page's).
- The remaining mention of the slate in the panel-quality section ("the
  point at which it published used to be fixed by the launch slate, and
  that slate is gone") still reads with the section it pointed at gone.
- The changelog v1.17 entry makes no promise that this page keeps the
  slate's record (read the entry).
- No dangling reference, no broken outline, nine anchors in the built
  page.

## Review focus

The four constraints. Concrete findings with file:line. No praise. End
with REVISE or APPROVED.
