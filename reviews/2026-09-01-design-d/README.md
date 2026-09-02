# Independent critique: design D (broadsheet ledger), PR #5

Rendered UI gets a critique from a different model before it merges
(D-0018 process rule). This directory is the record for the visual
system change recorded as D-0023.

- Reviewer: OpenAI Codex CLI, model gpt-5.6-sol, reasoning effort high,
  read-only sandbox, one resumed session across four rounds.
- codex-review_N.md is the context Stew handed the reviewer for round N;
  codex-output_N.md is the reviewer's full transcript for that round,
  with local machine paths made repo-relative and one quoted git author
  email redacted before commit.
- Round 1 (REVISE, 6 findings): gold text on paper failed AA; the site
  header had lost its banner landmark and the skip link bypassed the
  home masthead; Newsreader 800 was not loaded; base heading styles were
  unlayered and beat Tailwind utilities; /stories and topic-hub links had
  no persistent link signal; three sentences in DESIGN.md §10 overstated
  the code. Fixed in 13812ce.
- Round 2 (REVISE, 4 findings): the AI-review matrix kept its own
  verdict palette; a disclosure had no visible cue; Libre Franklin 500
  and 800 were not loaded; the rounding sentence in §10 was still too
  broad. Fixed in 32d45f8.
- Round 3 (REVISE, 1 finding): §10 said "no shadows" but the glossary
  popover has one. Fixed in f47a936.
- Round 4: APPROVED, no findings.
