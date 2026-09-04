# Review context: the methodology page's short version, round 2

Repository root: the methodology-short worktree of civicfacts/yegfacts
(branch `methodology-short`, cut from `34d4bd7`). Round 1 (REVISE: 6
spec, 2 standards) is answered in the latest commit, `git log -1`.
`git diff HEAD~1` shows this commit alone; `git diff 34d4bd7 HEAD` is the
whole change. Do not edit anything, do not build, do not run git
commands that touch the working tree. The built page is
`dist/methodology.html` (the site builds with `format: 'file'`), already
built from HEAD.

## What changed since round 1

1. Finding 1 (split panels): short step 4 now says the finding is never
   stronger than the most cautious of the three, and that a genuine
   split is Mixed with the split shown. That is the tested property in
   DESIGN.md §6 (no row resolves past the panel's most cautious verdict).
2. Finding 2: short step 1 says "every claim in it that a public record
   could settle" instead of "every factual claim".
3. Finding 3: short step 1 adds "unless they hold public office".
4. Finding 4: "all public" and "Everything the site runs on is public"
   are gone. Step 5 says the models' answers, citations and audit
   findings are published with the finding. The closing paragraph lists
   what is public and names the two things that are not (who is behind
   a commenter's label; documents the site may not mirror), pointing at
   the names and limits sections.
5. Finding 5: step 5 opens "Before anything is published as a finding".
6. Finding 6: `NumberedSteps.astro` is imported and renders all three
   lists; the inline `<ol>` blocks and the hand-written `n` fields are
   gone. The numeral is the array position. Intake step 1 keeps its
   original wording; short step 1 was reworded ("A post with all its
   comments") so the two no longer share a ten-word run, which is what
   the earlier reorder had been dodging.

## Files to review

- src/pages/methodology/index.astro
- src/components/NumberedSteps.astro
- docs/DESIGN.md §4, §6, §12 (unchanged)
- dist/methodology.html (built from HEAD)

Screenshots: unchanged from round 1 except for the copy above; the
layout did not move.

## Constraints that must hold

- Every sentence in `#short` is true of the method as DESIGN.md §4 and
  the full page below describe it. Read the five steps and the closing
  paragraph against them once more.
- The rendered list markup is identical to round 1's (same classes, same
  numerals 1 to 5, 1 to 5, 1 to 7).
- The nine legacy anchors plus `short` exist in `dist/methodology.html`.
- No em or en dash in any added line.
- The component's own comment is true: three lists render through it.

## Review focus

Round-1 findings closed or not, one line each. Then any new overclaim
in the rewritten sentences. Concrete findings with file:line. No praise.
End with REVISE or APPROVED.
