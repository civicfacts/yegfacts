# Independent critique: two cuts on the methodology page, PR #54

Reader-facing copy gets a critique from a different model before it
merges (D-0018 process rule). This directory is the record for the
founder's two asks of 2026-09-04 after reading the new short version:
his name out of the opening paragraph, and "The launch slate, dropped"
off the page.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report, with local machine paths
  made repo-relative before commit.
- Round 1 (REVISE, 1): Stew had grepped `src/` for links to the removed
  anchor and missed the one in data. The v1.17 changelog entry's links
  carried `/methodology#launch-slate`, rendered on the changes page.
  Fixed in 64d608f: the link follows the slate's surviving record to
  DESIGN.md §7 on GitHub. Editing a past entry's link is a correction
  of the record, the changelog header's own exemption; validate:diff
  passes without a version.
- Round 2: the round-1 finding closed. One new finding, that the local
  `dist/` footer carried the previous commit's SHA: the build had run
  before the commit, in the same command. Not a property of the change;
  CI builds from the commit. Recorded here rather than answered with a
  third round.

What stays on the page: the accountability line in short step 5 and in
stage 7 (D-0015 requires the methodology page to name the accountable
person; this PR moves the name out of the first sentence, it does not
remove the line). The slate's record stays in changelog v1.17 and
DESIGN.md §7, which keeps the table.
