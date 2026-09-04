# Independent critique: design refresh, PR #38

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the refresh
inside the broadsheet ledger system (D-0023), drafted as D-0031.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with the rendered screenshots attached as images.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report for that round, with local
  machine paths made repo-relative before commit.
- Round 1 (REVISE, 4 standards + 4 spec, two overlapping): the nav's
  current-page marker matched exact paths only, so a question page or a
  journal post marked nothing; three list-item titles (the register's
  claim rows, the established-background premise, the board's group
  heading) still carried the running-text underline; §10 overstated
  which elements transition and misplaced the helper counts; a trailing
  blank line. Fixed in 480d95f. Not changed: the merged register column
  needs one screen-reader heading ("Comments and claims") where there
  were two; the reviewer counted that as a wording change, and it is,
  on purpose.
- Round 2 (REVISE, 2 standards + 3 spec): hover underline thickness and
  the search glyph's stroke were not in the transition list; the
  Edmonton-evidence list titles on a question page still used the
  running-text style; the home masthead was 268px at 1280 against 258
  before, which D-0031 said would not happen. Fixed in 44ed013: masthead
  trimmed to 256px, measured with Playwright.
- Round 3 (REVISE, 2 standards + 2 spec): the one hover-colour link
  outside the shared classes still animated under reduced motion; §10's
  motion sentence did not name the two added properties. Fixed in
  f7b3588.
- Round 4 (REVISE, 1 standards + 1 spec, both Low): the stylesheet's
  header comment and §10 listed colour and border but not opacity (the
  nav's 82% to full) among the transitioned properties. Fixed in
  47463ca.
- Round 5 (REVISE, 1 standards + 1 spec, both Low): the same two
  sentences still omitted underline colour. Fixed in 370eb28; both now
  list the full set the transition block declares.
- Round 6: APPROVED, no findings.
