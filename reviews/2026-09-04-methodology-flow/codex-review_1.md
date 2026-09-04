# Review context: the methodology short version drawn as a flow, round 1

Repository root: the methodology-flow worktree of civicfacts/yegfacts
(branch `methodology-flow`, cut from `0c10681`). The change is the latest
commit, `git log -1`; `git diff 0c10681 HEAD` is the whole of it. Do not
edit anything, do not build, do not run git commands that touch the
working tree. The built page is `dist/methodology.html`, built from HEAD.

## Why this change exists

The founder asked whether the methodology page would benefit from a
flowchart. Stew's answer: yes, but not as a picture beside the text. The
short version already has the shape of a flow; what a diagram can add
is where things fall OUT of the process, which is the honest part of the
method and the part a stranger never sees. So the short version's five
steps become the flow: a connector between them, and under each step
the things that leave the process there. It will be shown to a UX
researcher at the weekend as the first human test of the page.

## What changed

- `src/components/NumberedSteps.astro`: an optional `flow` prop and an
  optional `exits` list per step. With `flow`, each `<li>` takes
  `step-flow` (plus first/last markers) and, when it has exits, renders
  an 11px uppercase label "Leaves here" (a `<p>`, not a heading) and a
  `<ul>` of exits in muted 14px text behind a 2px rule-coloured left
  border. Without `flow` the emitted markup is byte-identical to before
  (the implementer diffed the built intake and stages fragments; both
  identical).
- `src/styles/global.css`: a 1px spine in the rule colour, a
  pseudo-element on each `.step-flow` `<li>`, running the numeral column
  and stopping on the first and last numeral. Drawn only from `sm`
  (40rem); below that the numeral sits above the text and no spine is
  drawn. The spine x is a measured constant (half a tabular digit at
  `text-lg`), documented in the CSS comment.
- `src/pages/methodology/index.astro`: nine exits across the five short
  steps, verbatim copy fixed by Stew from DESIGN.md §4 and §5 and the
  page's own full method; one lead sentence under the h2; the short list
  passes `flow`.
- `docs/DESIGN.md` §10: one sentence in the visuals paragraph.

Screenshots attached: 1280 (first 1400px) and 390 (first 2400px).

## Constraints that must hold

- Every exit is TRUE of the method as documented. Check each of the nine
  against DESIGN.md §4 (stages), §5 (matrix rules), §6 (CI guarantees),
  and the page's own full method: triage decline/park with reasons;
  named-person accusations recorded then declined; a brief not frozen
  until its check passes; a reviewer returning nothing after its retry
  halts the run before synthesis; a fabricated citation caught in
  cross-review triggers a fresh blind re-run of that claim; Supported
  against Contradicted is Mixed; a framing concern proved right with no
  fair repair parks the claim with a public reason (v1.24); a statement
  the archived source does not carry is fixed before publication; a
  finding later found wrong is withdrawn and its page stays saying why.
  Quote any exit that says more than the record does.
- The intake and stages lists are unchanged in the built HTML.
- No new colours, no gold, no fills, no icons, no arrows. Only the rule
  colour and muted text.
- No horizontal scroll at 390. AA contrast on the muted exits text.
- "Leaves here" is a `<p>`, not a heading; the outline is unchanged
  (nine sections).
- The DESIGN.md sentence describes the code truthfully.
- No em or en dash in any added line.

## Review focus, in order

1. Read the flow as a stranger. Does the spine plus the exits make "we
   do not pick the answers" visible rather than asserted? Where does the
   eye stall? Is "Leaves here" the right label, or does it read as
   jargon? Say what you would change, concretely.
2. Truth of the nine exits, one line each.
3. The spine's construction: a measured constant for x, drawn only from
   `sm`; is there a simpler construction that keeps the numeral markup
   shared with the other two lists?
4. Semantics, 390, contrast, docs.

Concrete findings with file:line. No praise. End with REVISE or
APPROVED.
