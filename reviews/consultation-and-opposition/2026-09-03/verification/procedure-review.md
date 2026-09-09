<!-- Independent procedural review. Runner: Anthropic claude-opus-5, high effort, Claude Code 2.1.266. Command: claude -p --model claude-opus-5 --effort high --permission-mode bypassPermissions. Requested by editor OpenAI GPT-6 Astra on 2026-09-09. Conditional review; the setup audit separately establishes the facts. Report below is unedited. -->

# Procedure review: using the third framing report to close a missed source-existence lookup

Evidence & Methodology board role, role version 1.0. Independent read for the
parent editor (OpenAI GPT-6 Astra).
Run under review: `reviews/consultation-and-opposition/2026-09-03`.
Date: 2026-09-09.

**Standing of this document.** Conditional advice on a disposition, not a
finding. I assume, because I was told to assume it, that the original traces
show the mandatory source-existence lookup did not happen. I did not verify
that; the availability-and-use question is being checked separately. I did not
run a framing check, research the claim, or touch the repository. I quote
committed text.

## The short answer

The proposal changes the rules. It does not apply them.

It is not defensible as an editorial ruling, because the change it makes is to
what a framing report is and when the stage may run, which is methodology and
belongs to the full board. The good news is that the substance the disposition
is chasing, an independent check that the instruments the brief rests on exist
as described, can be had without changing anything, and I recommend that
instead.

I want to be fair to the proposal first: its instincts are right. Preserve the
bytes, preserve both reports, record the miss, spend nothing on a fresh
sequence, do not reopen the proposition. Those are the right constraints. The
mechanism it picked to satisfy them is the wrong one, and it is wrong in a way
that gets worse, not better, if the lookup finds something.

## Fit

The role asks whether YEGFacts can defend this epistemically. Three things
about the run make the question live and one makes it easy.

Live: the missed step is not a formality. `prompts/framing-check.md` states it
as an obligation with a stated purpose.

> You must look up whether every instrument, boundary, dataset or
> definition the brief relies on exists as the brief describes it, on the
> brief's as-of date; a brief built on a retired bylaw or a renamed
> dataset fails before any evidence is read.

Live: the brief is frozen on the report that (conditionally) skipped it.
`run-record.md`, "The freeze":

> Frozen 2026-09-04 on `framing/check-2.md`, FRAME OK, every finding from
> check 1 marked RESOLVED and none WEAKENED or OPEN. Two reports, not
> three: the cap allows three and the brief did not need the third, so
> there is no `resolution.md` in this run.

Live: the freeze is a hash over bytes, `083f4a63...02018`, so any repair that
edits the brief is visible and costly.

Easy: no panel has run. `run-record.md` closes with "**No panel ran. Round 1
has not started.**" Nothing downstream is contaminated, no verdict rests on
this, no reader has seen anything. That is the whole reason a narrow remedy is
available at all, and it is worth saying plainly, because the cost of doing
this properly right now is close to zero and will never be this low again.

## Does the proposal apply the rules or change them?

It changes them, in four places. Taking them in order of how hard they are to
argue with.

### 1. The third report is a defined object and its trigger did not occur

Governing text, `prompts/framing-check.md`:

> The check is capped at three reports for one brief (methodology v1.12).
> After your second report, Stew, as the editor responsible for content,
> resolves in writing any finding still OPEN or WEAKENED, stating what you
> objected to, and the brief is revised once more. Your third report is a
> confirmation: FRAME OK freezes the brief with the editor's resolution
> beside it; REVISE parks the brief, and it reopens only on new intake
> evidence, never on a further revision of the same brief.

The third report is not a spare round. It is a confirmation of two specific
things: the editor's written resolution of findings left OPEN or WEAKENED, and
the one further revision that follows it. Here check 2 returned FRAME OK with
"every finding from check 1 marked RESOLVED and none WEAKENED or OPEN". There
is no resolution to confirm. The proposal is explicit that there will be no
revision either: no new intake, no changed as-of date, no weakened
proposition, same bytes.

So the proposed third report confirms nothing. "The cap allows three" reads
"three" as an allowance with an unused credit in it. The sentence it comes from
reads it as a ceiling on a sequence that ends when the brief freezes. The run
record already used the correct reading: the brief "did not need the third".
Repurposing an unspent ceiling as a transferable slot is a new rule.

### 2. A framing report on a frozen brief is outside the stage

The prompt's own title is `YEGFacts framing check (stage 1, before the brief is
frozen)`, and the body says "The brief is frozen after your report says FRAME
OK". Freezing is where this stage stops. The proposal wants the freeze to
survive the report and a framing report to run anyway, which is a state the
rules do not describe.

The v1.20 defect round is not a counterexample. It exists precisely because the
brief in that case had **not** frozen: a third report at REVISE would have
parked it. There is no committed instance of a framing report running against a
brief that is already frozen.

And v1.22 states the standing rule from the other direction:

> The scoping lives in the package wrapper, never in the brief, because
> editing a frozen brief is a new brief and a new framing check.

A new framing check follows a new brief. That cuts against the proposal, which
wants a new report with no new brief. It also cuts against the obvious
alternative of rerunning the check from report 1 on identical bytes, which I
address below.

### 3. The verdict words would not mean what the rules make them mean

"FRAME OK confirms the existing freeze" is not available. Under the governing
text a third-report FRAME OK "freezes the brief with the editor's resolution
beside it". It is a freezing act, premised on a resolution that does not exist
here. There is no verdict word in the framing vocabulary that means "the freeze
you already have is still good". Inventing that meaning for FRAME OK is a
change to the verdict vocabulary, which sits squarely in my mandate and squarely
with the board.

This is the same failure v1.20 wrote up about the cycling-volumes report that
came back headed `Verdict: REVISE` "at the moment that word had stopped
describing what happens next". The site's own answer, when a round needed
verdict words it did not have, was to amend the prompt at board level and give
the round its own two words. That is the precedent, and it points away from
improvising.

### 4. The REVISE branch converts a repairable defect into a permanent park

This is the risk I care about most, and it is asymmetric in the wrong
direction.

Suppose the lookup, now enabled, finds that something the brief relies on does
not exist as described on the as-of date. What kind of finding is that? Not a
defect. The defect list is closed:

> Only three kinds qualify: verdict bands that overlap or leave a gap, a
> stated rule whose direction contradicts its own arithmetic, and a
> coverage or completeness rule that lets an unclassified remainder decide
> a verdict. Internal consistency and arithmetic, nothing else.

And the framing list names this one explicitly: "whether a source is adequate"
is a framing finding. So a failed existence lookup is a framing finding, it
arrives in a third report, and the third report's REVISE "parks the brief, and
it reopens only on new intake evidence, never on a further revision of the same
brief."

Now compare. The identical finding in report 1 or report 2 is a REVISE the
author fixes by revising. That is what the rule is for: the brief "fails before
any evidence is read", early, cheaply, repairably. The proposal moves that
finding to the one position in the sequence where it cannot be repaired, and it
does so for a brief whose only sin is that the check owed it a lookup and did
not perform one. The brief would be permanently parked over the checker's
omission, and v1.12's escape clause could not release it, because no new intake
evidence bears on whether a dataset was renamed.

The proposal's own framing, "REVISE parks under the existing cap, subject only
to existing arithmetic-defect exception", is a correct reading of the rules and
is exactly the trap. It is the shape v1.20 called out: "a cap that can never
release what it caught is a cap on the wrong thing."

### The incoherence underneath all four

The proposal needs check 2 to be valid enough to keep the freeze and invalid
enough to justify another round. Calling the FRAME OK "premature" concedes the
report was incomplete. If it was incomplete, then the count "two of three used"
is not reliable either, because an incomplete report is not obviously a report
of the kind the cap counts. Pick one. Either the report stands, in which case
there is no occasion for a third, or it does not, in which case the freeze that
rests on it does not stand and the remedy is not a bookkeeping move inside the
same sequence.

## Benefits, stated fairly

- It preserves every byte and every committed report. Nothing is deleted or
  edited after the fact, which is the site's practice and the right one.
- It costs one report, not a run.
- It keeps the proposition, the as-of date and the intake untouched, so it
  cannot become a second attempt at framing by the back door. The author of the
  disposition clearly saw that risk and closed it.
- It puts the missed step in the record rather than quietly proceeding.

If the rules permitted it, this would be a good disposition. They do not.

## Risks

1. **Permanent park on a repairable defect.** Detailed above. This is the one
   that would actually hurt.
2. **The cap stops meaning anything.** v1.20's guard exists because "a framing
   objection could be relabelled a defect to buy a fourth pass and the cap
   would be worth nothing". A leftover round that can be spent on a purpose the
   sequence never defined is the same hole from the other side. Once "the cap
   allows three" licenses one repurposed report, it licenses the next.
3. **The editor rules on the editor's own gap.** v1.20 already carries the
   note that "The rule was amended by the editor it had just blocked, on the
   brief it had just blocked", and offered three specific guards against the
   obvious objection. Doing it a second time, informally, without those guards
   and without the board, spends credibility the first one bought.
4. **A hostile academic finds this seam immediately.** The published position
   would be: the framing rule says the checker must look up source existence;
   on this brief it did not; rather than say so and fix it, the count of
   reports was preserved and the content of the rule was not. The number of
   reports is the least interesting thing about a framing check, and this
   disposition protects the number.
5. **The audit trail records a confirmation that confirmed nothing.** A third
   report headed FRAME OK sits in `framing/` next to two others and reads, to
   anyone later, as a normal three-round check. The exceptional thing about it
   lives only in a run-record paragraph. That is a weaker record than the
   situation deserves.

## Recommendation, committed

**Do not use the third report. Do not touch the freeze, the bytes or either
committed report. Close the gap on the merits with a standalone
source-existence verification that carries no framing verdict.**

Concretely, if the traces confirm the miss:

1. **Record the miss in the run record**, under the freeze section, in the
   editor's name: which sentence of `prompts/framing-check.md` was not
   discharged, what the traces show, and that no panel had run when it was
   found. Name the diagnosis artifact. This is an editorial act on the site's
   own record and needs nobody's permission.

2. **Run the existence lookup as its own verification, outside the framing
   check.** It enumerates every instrument, boundary, dataset and definition
   `brief.md` relies on, and reports, for each, whether it exists as the brief
   describes it on the brief's as-of date, with the lookup activity recorded.
   It returns no verdict word, proposes no wording, touches no framing check.
   Give it to a model that is neither the brief's author (Anthropic) nor the
   editor, so the vendor independence the framing check is built on survives
   into the remedy. Commit it beside the brief as a verification artifact, not
   under `framing/`.

   This is not a new stage and not a rule change. It is an audit of a step a
   stage owed and did not perform, and the site already runs this instrument at
   another stage: the ledger records "Source verification (Claude audit
   session, separate from drafting)", `gate/source-verification.md`, passes 1
   to 3.

3. **Then branch on what it finds, and only then.**
   - **Everything exists as described.** The gap is closed on the merits rather
     than by a procedural blessing. The freeze stands, not because a report
     re-blessed it, but because the substance the missed step would have tested
     was tested and came back clean. Round 1 proceeds. The miss stays in the
     run record.
   - **Something does not exist as described.** Stop. Do not send it to the
     panel and do not improvise. That is a live framing-class defect in a
     frozen brief, the methodology has no rule for it, and writing one is a
     board matter. The board then has a real case in front of it instead of a
     hypothetical, which is the cheapest way this rule ever gets written.

4. **Leave the quality ledger alone for now.** Its admission rule is strict and
   its event vocabulary is closed: `framing-miss` means "a brief defect the
   framing check passed and a later stage caught". A check that skipped a
   required step, with no defect yet demonstrated, is not that. If step 2 comes
   back clean there is nothing the current vocabulary honestly admits, and the
   run record is the right home. If it comes back dirty, `framing-miss` fits
   and the entry writes itself. Adding an event type for "a stage omitted a
   mandatory step" is a change to the ledger schema, so it is a board item, and
   I think it is a good one to put to them.

**Why not the other obvious alternative.** Voiding the freeze and rerunning the
framing check from report 1 on the same bytes looks cleaner and is not
available. The cap is "three reports for one brief", and on unchanged bytes a
rerun's reports are reports 3, 4 and 5 on one brief. Making them count as 1, 2
and 3 requires deciding that check 1 and check 2 no longer count, which is a
larger rule change than the one I am rejecting. And v1.22's "editing a frozen
brief is a new brief and a new framing check" gives a rerun no home on
unchanged bytes either. The remedy has to be something other than a framing
report. That is the whole point.

## One thing the traces will not settle

I flag this because it changes what the remediation must cover, whichever way
the `--search` question resolves. `framing/check-2.md`, check 4, says:

> The intake establishes that the named report, attachments, project page,
> plans, engagement portal and route materials existed as described by the
> relevant date.

Read plainly, the existence conclusion is sourced from the package the checker
was handed, not from a lookup. That is my reading and the checker may simply
have written a loose sentence over a lookup it did perform. But the site has
already paid for this exact confusion once and wrote the rule down at the gate:
"a brief's framing and rationale prose is not evidence". Intake prose is the
same kind of thing. So even if the traces come back showing search was
available and used, I would still want step 2 run, because that sentence does
not show the obligation being discharged. Do not let the trace result alone
decide whether the lookup gets done.

## What would change my mind

- **On the third report being unavailable.** A committed instance of a third
  framing report issued after a FRAME OK, or after a second report with no
  OPEN or WEAKENED finding. I found none. One would show the sequence is read
  as an allowance rather than a chain, and I would drop conflict 1.
- **On the park risk.** A rule I missed that lets a framing finding raised in a
  third report be repaired rather than parked. That is the load-bearing risk;
  remove it and the proposal becomes merely irregular rather than dangerous.
- **On the standalone verification.** Anything in the methodology reserving
  source-existence checking exclusively to the framing checker, such that an
  independent lookup outside the stage is not admissible as remediation. I did
  not find it, and the gate precedent runs the other way, but I would want to
  know.
- **On board scope.** A written editorial authority to reinterpret the report
  cap or the framing verdict words. My constraint here is that the editor rules
  on content and methodology changes go to the full board, and every one of the
  four conflicts above is methodology.
- **On the whole question.** Traces showing the lookup did happen. Then there
  is no gap to close and no disposition to make, subject to the caveat in the
  previous section about check 2's own wording.

What would not change my mind: that the third report is cheaper than the
alternative, or that a clean lookup is the likely outcome. Convenience is not a
reason to skip archiving and it is not a reason to skip this either. If the
lookup is going to come back clean, running it as its own artifact costs almost
nothing and leaves a record that says what actually happened.
