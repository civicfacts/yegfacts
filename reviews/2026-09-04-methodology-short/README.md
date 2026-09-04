# Independent critique: the methodology page's short version, PR #53

Rendered pages and reader-facing copy get a critique from a different
model before they merge (D-0018 process rule). This directory is the
record for the methodology page rewrite of 2026-09-04: a short version
first, the vocabulary second, the full method after, three stale stages
brought current, and one component for the page's three numbered lists.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, a fresh session per round, run from the branch's
  worktree with rendered screenshots attached as images.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's report for that round, with local
  machine paths made repo-relative before commit. Screenshots are not
  committed, by the convention of the earlier review directories.
- Round 1 (REVISE, 6 spec + 2 standards): five overclaims in the short
  version, every one a sentence that said more than the method does. A
  split panel was said to lean cautious when Supported against
  Contradicted is Mixed; "every factual claim" where the intake rule
  says materially factual; commenters relabelled with no mention that
  office-holders keep their names; "all public" and "everything the site
  runs on is public" against private pseudonym mappings and unmirrored
  files; "before anything goes up" against pending-review deployment.
  The sixth: the NumberedSteps component had been committed unused. The
  commit that was meant to wire it in (888a2b7) had lost the wiring to a
  review agent's file revert in the same worktree; the record of that is
  in the board repo. Fixed in 8c0fd5a.
- Round 2 (REVISE, 2 spec open): "when they genuinely split, it is
  Mixed" was still wrong, since S S N, S N N and S P N are Split panels
  with non-Mixed findings; and the public list was still exhaustive
  against withheld named-person allegations and the release check.
  Fixed in 1ac69f0 (which broke the build on a string quote) and b603ee4
  (which fixed the quote): step 4 states matrix rule 2 as written, step
  5 names the release check, the closing paragraph lists what stays
  private.
- Round 3: APPROVED. Findings 1 and 4 closed, no new overclaim, built
  HTML matches source.

What the three rounds say about the short version as a form: every
finding was a sentence that compressed a rule past the point where it
was still true. The full method below it survived all three rounds
without a drift finding.
