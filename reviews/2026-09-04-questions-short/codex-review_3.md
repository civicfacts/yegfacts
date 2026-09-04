# Review context: the questions register's header and key column, round 3

Repository root: the questions-short worktree of civicfacts/yegfacts
(branch `questions-short`, cut from `34d4bd7`). Round 2 left one finding
open: the outline's active-section marker, at `lg`, would sit on "What
the states mean" for the whole scroll because the key starts beside the
title. The latest commit, `git log -1`, answers it. Do not edit
anything, do not build, do not run git commands that touch the working
tree. The built page is `dist/questions.html`, built from HEAD.

## What changed since round 2

No link order works at both breakpoints, because from `lg` the key is
beside the column rather than before or after anything in it. So the key
leaves the outline. That leaves two sections, below the layout's minimum
of three (`src/lib/toc.ts`, `TOC_MIN_SECTIONS`), so `toc()` returns none
and the page has no outline at any width: no rail copy, no phone
disclosure bar, no active-section marker. The page's own right-hand
column keeps the key and, from `lg`, the report box; below `lg` the
footer carries the contact. The comment on the `outline` constant says
why.

## Review focus

Is the finding closed? Is anything lost that a reader of this page
needs (the phone reader who used the outline to jump to the key at the
bottom of the list is the case to weigh)? Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
