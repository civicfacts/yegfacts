# Review context: the questions register's header and key column, round 2

Repository root: the questions-short worktree of civicfacts/yegfacts
(branch `questions-short`, cut from `34d4bd7`). Round 1 (REVISE: 3
standards, 2 spec) is answered in the latest commit, `git log -1`.
`git diff HEAD~1` shows this commit alone; `git diff 34d4bd7 HEAD` is the
whole change. Do not edit anything, do not build, do not run git
commands that touch the working tree. The built page is
`dist/questions.html` (the site builds with `format: 'file'`), built
from HEAD.

## What changed since round 1

1. "Nothing is held back" is gone. The header's last sentence is "The
   filters only narrow this list."
2. The outline (`sections`) now follows the DOM: Filters, Every
   question, What the states mean. On a phone that is also the visual
   order; from `lg` the key sits beside the register, so either order
   reads.
3. The key paragraph no longer opens with what the badge definitions
   already say. It reads: two readers decide each question separately;
   goes ahead when both say GO or one GO and one PARK; declined when
   both say NO; anything else parks, with the reason; where the two
   split, the reason says so.

## Files to review

- src/pages/questions.astro
- src/layouts/Base.astro (the outline's render-order assumption near
  line 364; unchanged)
- dist/questions.html

Screenshots: unchanged from round 1 apart from the copy above.

## Review focus

Round-1 findings closed or not, one line each. Then anything new in the
rewritten sentences (plain speech, DESIGN.md §12). Concrete findings
with file:line. No praise. End with REVISE or APPROVED.
