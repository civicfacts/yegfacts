# Independent critique: the methodology short version drawn as a flow, PR #57

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the flow drawn
over the methodology page's short version on 2026-09-04: a hairline
spine through the five numerals and, under each step, the outcomes
besides going on to the next step, each opening with a fixed plain
label (Stops here, Loops back, Continues, Fixed before publication,
Corrected later).

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with rendered screenshots attached as images. Screenshots
  are not committed, by the convention of the earlier review
  directories.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report, with local machine paths
  made repo-relative before commit.
- Round 1 (REVISE, 4 spec + 2 standards + 1 CSS): the useful kind. The
  first draft labelled everything "Leaves here", and half of it did not
  leave: a rewritten brief loops back, a Mixed finding continues, an
  audit fix continues. One outcome invented a rule the method does not
  have ("a finding later found wrong is withdrawn"; the rule is a dated
  correction entry on the page). One placed the fabricated-citation
  re-run at blind research when it happens at cross-review. The 11px
  uppercase label used the treatment DESIGN.md reserves for metadata,
  and three comments claimed the shared array meant the picture "cannot
  drift" from the text, which two of the exits had just disproved. The
  reviewer also asked for the spine to sit at the column's centre rather
  than on a measured glyph width; the /simplify pass (two read-only
  agents, run after the commit) had asked the same. Fixed in 7c9b6f0:
  typed outcomes with sentence-case bold labels, ten outcomes reworded,
  numeral centred under `flow` and the spine at 1rem, `:first-child`
  and `:last-child` end-caps, and the drift claims replaced with what is
  true (the array keeps each outcome attached to its step; the critique
  checks the sentences).
- Round 2 (REVISE, 2 reader-facing + 1 label + 1 provenance): the
  three-report outcome ignored the v1.20 defect exception; "Fixed first"
  did not say before what; one sentence was hard to parse; the supplied
  build predated the commit. Fixed in 89bc256, built after the commit.
- Round 3 (REVISE, 1): the v1.20 clause as written ("a defect of fact")
  read wider than the three narrow defects the rule covers, and put a
  non-stopping path under "Stops here". Fixed in 7bb6d24 by claiming
  less: the parked outcome names only the framing case.
- Round 4: APPROVED, no findings.
- The founder then looked at the preview and saw artifacts: the spine
  ran through the digits, and every row divider crossed it, a grid of
  small crosses down the numeral column. Fix: the numeral carries the
  paper ground so the spine passes behind it, and the flow list has no
  row dividers, the spine being what joins the steps. Round 5 (REVISE,
  1 blocking): both artifacts gone, but the fix was uncommitted. Stew's
  command chain had gated the commit on a `grep -c` that returned zero,
  whose exit status stopped the chain; the built page carried the fix
  under a stale SHA. Committed as 7df1732. Round 6 produced no report
  (the Codex CLI failed twice on an internal error); what it was to
  confirm is mechanical and codex-output_6.md records Stew's own
  verification of it.
- The founder's second look showed the spine as short stubs between
  steps: the numeral cell stretched to the row's height, so its paper
  ground hid the spine along the body. Fixed in fcdb744 with
  `sm:self-start` on the numeral span. No reviewer report exists for
  this commit. Codex hit its usage limit (reset Sep 7) on the first
  attempt at round 7; the Gemini seat in headless mode needs the
  permissions flag the session's classifier refused. Stew verified the
  fix on the built page at 1280 (one continuous line from numeral 1 to
  5, broken only behind each digit) and the founder's look at the
  preview is the gate for the merge (D-0021). codex-review_7.md is the
  brief that did not run.

Four rounds for ten sentences, then two for one visual fix. Every finding was a sentence saying more
than the method does, the same failure the short version itself drew in
PR #53, and the reason the page comment now says the shape does not
make the sentences true.
