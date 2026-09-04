# Independent critique: the questions register's header and key column, PR #52

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the /questions
change of 2026-09-04: the header cut from four paragraphs to one, two of
its facts moved into the key, the two-column grid wrapping the whole
page so the key starts level with the title.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with rendered screenshots attached as images.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report for that round, with local
  machine paths made repo-relative before commit. Screenshots are not
  committed, by the convention of the earlier review directories.
- Round 1 (REVISE, 3 standards + 2 spec): "Nothing is held back" was a
  false absolute with a withheld claim on the page; the outline listed
  the key before the register while the DOM had it after; the key's new
  paragraph opened by repeating the badge definitions and "Two readers
  rule" was not plain speech. The reviewer's removed-sentence audit
  found every sentence cut from the header living on this page, in the
  key, or on the methodology page. Fixed in 58ce79f.
- Round 2 (REVISE, 1 open): the outline now matched the DOM but not the
  desktop layout, where the key starts beside the title, so the
  layout's active-section marker ("last link past the top third") would
  sit on the key for the whole scroll. No link order works at both
  breakpoints because the key is beside the column, not in it. Fixed in
  7d5e911 by taking the key out of the outline; two sections is below
  the layout's minimum, so the page has no outline at any width.
- Round 3 (REVISE, 1 spec): with the outline gone, a phone reader met
  44 rows of badges before their definitions. Fixed in 0e949e8: a
  phone-only "What the states mean" link under the list heading, hidden
  from `lg` where the key is beside the list.
- Round 4: APPROVED, no findings.
