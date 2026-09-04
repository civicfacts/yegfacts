# Review context: the methodology short version drawn as a flow, round 7

Repository root: the methodology-flow worktree of civicfacts/yegfacts
(branch `methodology-flow`). After round 5's fix the founder's second
look showed the spine as short stubs between steps: the numeral cell
stretched to the row's height, so its paper ground hid the spine along
the whole body, leaving it visible only in the row padding. The latest
commit, `git log -1`, answers it: the numeral span takes `sm:self-start`
under `flow`, so its ground covers the digit's line box only. Do not
edit anything, do not build, do not run git commands that touch the
working tree. `dist/methodology.html` was built after that commit.

Screenshot attached: 1280, post-commit build.

## Review focus

Is the spine one continuous line from numeral 1 to numeral 5, broken
only behind each digit? Is the working tree clean and the footer SHA
equal to HEAD? Anything new. Concrete findings with file:line. No
praise. End with REVISE or APPROVED.
