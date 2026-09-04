# Review context: the methodology short version drawn as a flow, round 3

Repository root: the methodology-flow worktree of civicfacts/yegfacts
(branch `methodology-flow`, cut from `0c10681`). Round 2 (REVISE: 2
reader-facing findings, 1 label, 1 build provenance) is answered in the
latest commit, `git log -1`. Do not edit anything, do not build, do not
run git commands that touch the working tree. `dist/methodology.html`
was built AFTER that commit; its footer SHA should match `git rev-parse
--short HEAD`.

## What changed since round 2

1. Step 2, Stops here: "After three reports, a brief that still fails
   its check is parked until new evidence arrives, unless what remains
   is a defect of fact, which is corrected and confirmed instead." That
   is prompts/framing-check.md's v1.12 cap with its v1.20 exception.
2. Step 4, Stops here: "If a framing concern is right and there is no
   fair repair, the claim is parked with a public reason."
3. The label "Fixed first" is "Fixed before publication" (type and data);
   its sentence now reads "A statement the archived source does not carry
   is corrected before the page goes up." DESIGN.md's parenthesis says
   "being fixed before publication or corrected after it".

Screenshots attached: 1280 and 390, from the post-commit build.

## Review focus

Round-2 findings closed or not, one line each. Truth of the ten
outcomes as now worded, one line each. Anything new. Concrete findings
with file:line. No praise. End with REVISE or APPROVED.
