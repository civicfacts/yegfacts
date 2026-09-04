# Independent critique: controls, panel depth, forest footer, PR #46

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the second
design pass after the refresh (PR #38), drafted as D-0032: a 3px radius
on interactive controls, one soft shadow on white panels and the home
search field, and a forest footer that bookends the masthead.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with the rendered screenshots attached as images.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report for that round, with local
  machine paths made repo-relative before commit.
- Round 1 (REVISE, 3 standards + 4 spec, overlapping): Pagefind's shared
  radius variable also rounded result tags and loading blocks, which are
  not controls; the gold rule under the current nav word is drawn with
  an inset box-shadow and the "nothing else has a shadow" sentence did
  not say so; the footer colophon had lost a comma the brief did not
  permit changing; the strip's new hairline side borders were outside
  the three directed changes. Fixed in 571dcaa: Pagefind's variable back
  to zero with the radius on its input and clear button directly; the
  inset rule stated as a rule, not depth, in the stylesheet header and
  §10; the comma restored. The strip's side borders were kept on Stew's
  decision and §10 now says why: with the shadow alone the strip's
  outline read fainter than the dividers between its own cells. Every
  contrast pair the reviewer measured passed AA (gold on forest 4.88:1,
  paper at 82% on forest 7.79:1, paper at 70% 6.12:1, white on brick
  8.37:1).
- Round 2 (REVISE, 1 standards + 2 spec): Pagefind's filter checkboxes
  and load-more button were still square, because Pagefind's own CSS
  derives their radius from the shared variable and outranks the base
  layer; §10 said the strip had hairlines on all four sides when its top
  is a 3px forest rule. Fixed in 4aa781b: the direct override covers all
  four Pagefind controls; §10 describes the strip's edges exactly.
- Round 3: APPROVED, no findings.
