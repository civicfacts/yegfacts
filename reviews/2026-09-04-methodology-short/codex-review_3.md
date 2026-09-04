# Review context: the methodology page's short version, round 3

Repository root: the methodology-short worktree of civicfacts/yegfacts
(branch `methodology-short`, cut from `34d4bd7`). Round 2 (REVISE: 2
spec open, findings 1 and 4) is answered in the latest two commits
(`git log -2`; the second only fixes string quoting the first broke the
build with). `git diff HEAD~2` shows both together. Do not edit
anything, do not build, do not run git commands that touch the working
tree. The built page is `dist/methodology.html`, built from HEAD.

## What changed since round 2

1. Finding 1: step 4 no longer says a genuine split is Mixed. It states
   the matrix's own rule 2 (DESIGN.md §5): if one reviewer finds a claim
   supported and another finds it contradicted, the finding is Mixed,
   and the split is shown. The sentence before it (never stronger than
   the most cautious of the three) stands, as the tested property.
2. Finding 4: step 5 says the reviewers' answers, their sources and the
   audit reports are published with the finding, after a check that
   removes personal information. The closing paragraph lists what is
   public and then what is not: who is behind a commenter's label,
   documents the site may not mirror, accusations against named people,
   and personal information the release check removes, pointing at the
   names and limits sections.

## Files to review

- src/pages/methodology/index.astro (the `short` array and the `#short`
  section only changed)
- docs/DESIGN.md §5 (the matrix rules)
- dist/methodology.html

## Review focus

Findings 1 and 4 closed or not, one line each. Any new overclaim in the
rewritten sentences. Concrete findings with file:line. No praise. End
with REVISE or APPROVED.
