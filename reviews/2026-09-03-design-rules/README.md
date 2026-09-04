# Independent critique: panel radius, home section rules, methodology badges, PR #47

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the third
design pass of 2026-09-03: the white panels take the 3px control
radius, the ink rules over the home page's section headings go, and the
methodology page renders its vocabulary as badges and the synthesis
table from the script that computes it.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with rendered screenshots attached as images.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report for that round, with local
  machine paths made repo-relative before commit.
- Round 1 (REVISE, 2 standards + 1 spec, on the radius and rules change
  alone): two stylesheet comments still said the panels stay square;
  §10 said no heading on any page sits under a rule, but a journal
  post's receipts keep a hairline above their heading. Fixed in
  b21ff23, which also added the methodology page work: §10 now names
  that hairline as a section divider, and the comments say the panels
  take the radius because a shadowed block is a card.
- Round 2 (REVISE, 1 standards + 2 spec, on the methodology page): the
  three matrix group labels were paragraphs, so Unanimous, Adjacent and
  Split were not reachable by heading navigation; the agreement tile was
  12px where every other tile is 11px. Fixed in e6db0f9: the
  labels are h4s (the outline is declared, so they stay out of it) and
  the tile is 11px. The reviewer confirmed the table is derived from the
  script with no literal rows, 20 rows grouped 4, 6 and 10, and contrast
  from 6.75:1 to 14.91:1.
- Round 3: APPROVED, no findings.
