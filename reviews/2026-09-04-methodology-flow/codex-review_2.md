# Review context: the methodology short version drawn as a flow, round 2

Repository root: the methodology-flow worktree of civicfacts/yegfacts
(branch `methodology-flow`, cut from `0c10681`). Round 1 (REVISE: 4 spec,
2 standards, 1 CSS) is answered in the latest commit, `git log -1`;
`git diff 0c10681 HEAD` is the whole change. Do not edit anything, do
not build, do not run git commands that touch the working tree. The
built page is `dist/methodology.html`, built from HEAD.

## What changed since round 1

1. "Leaves here" is gone, and with it the 11px uppercase metadata
   treatment. Each outcome opens with a sentence-case bold label from a
   fixed set, typed in the component (`Exit.kind`): Stops here, Loops
   back, Continues, Fixed first, Corrected later. The lead sentence under
   the h2 now reads "What can stop a claim, send it back or change it at
   each step is marked under the step."
2. The nine outcomes, re-labelled and where needed re-worded:
   - Step 1: Stops here (triage decline or park, reason on the register);
     Stops here (named-person accusation written down, then declined).
   - Step 2: Loops back (a brief that fails its check is rewritten before
     it can be frozen); Stops here (after three reports the check is
     over; a brief that still fails is parked until new evidence arrives,
     per prompts/framing-check.md, v1.12).
   - Step 3: Stops here (a reviewer returning nothing after its retry
     halts the run); Loops back ("Afterwards the three read each other's
     work. A fabricated citation caught there sends that claim back for a
     fresh blind round."), which places the branch at cross-review.
   - Step 4: Continues (Supported against Contradicted publishes as
     Mixed, split shown); Stops here (framing concern right, no fair
     repair, parked with a public reason).
   - Step 5: Fixed first (a statement the archive does not carry is fixed
     before publication); Corrected later ("A finding that changes after
     publication is logged on its own page as a dated entry. Nothing is
     quietly edited."), which is the story-changelog rule (typed entries,
     including verdict-change) and the About page's corrections line. The
     invented "withdrawn" rule is gone.
3. Spine: under `flow` the numeral is centred in its 2rem column
   (`sm:text-center` on the span, only when `flow`), the spine sits at
   `calc(1rem - 0.5px)`, and the end-caps use `:first-child` and
   `:last-child` on `.step-flow`. No glyph-metric constant, no computed
   first/last classes.
4. The "cannot drift" claims are gone from DESIGN.md §10 and both
   comments; they now say the shared array keeps each outcome attached
   to its step and the critique checks the sentences, and that the
   connector is drawn only from `sm`.

Screenshots attached: 1280 (first 1500px) and 390 (first 2600px), from
the HEAD build.

## Review focus

Round-1 findings closed or not, one line each. Then: truth of the nine
outcomes as now worded, one line each; whether the five labels read as
plain words to a stranger; anything new. Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
