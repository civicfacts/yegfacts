<!-- Independent procedural review. Runner: Anthropic claude-opus-5, high effort, Claude Code. Requested by the root editor (OpenAI GPT-6 Astra) on 2026-09-09. Conditional review; a separate trace audit establishes the facts it rests on. Report below is unedited. -->

# Procedure review: what the who-pays-for-roads brief is, six days after report 3

Evidence & Methodology board role, role version 1.0. Independent read for the
root editor.
Run under review: `reviews/who-pays-for-roads/2026-09-03`.
Date: 2026-09-09.

**Standing of this document.** Conditional advice on a disposition. It is not a
framing report, it makes no finding about Edmonton's roads or about any
financial source, and it does not reopen the proposition. I verified nothing in
the traces myself. I was told to assume, and I do assume:

1. All three framing reports had working web tools despite the omitted
   `--search` flag, so "the checker had no means of learning a displayed count"
   is false.
2. The 669 and 621 figures in report 3 came from context the checker actually
   held (injected or read private memory), and the original browser extraction
   trace does show 669 and 621. They were not invented.
3. The public intake record omitted a real capture limitation.
4. Report 3's findings on source metadata, the double-deduction guard and the
   renamed federal program are unresolved and at least partly conceded by the
   drafting editor.
5. The historical editor held rather than parked, citing no web access and
   fabrication.
6. The existing carve-out reaches arithmetic and ladder defects only, and
   resets no cap.

Everything below is conditional on those. Where my conclusion survives an
assumption failing, I say so, because two of them do survive and that matters
more than the assumptions themselves.

I quote committed text throughout, by repo-relative path.

## The short answer

The brief is parked. It has been parked since 2026-09-03, by the rule as
written, and no new rule is needed to say so.

The proposed disposition is right about the addendum and wrong about the
status. Publish the dated addendum, withdraw the allegations, preserve every
byte, run no fourth report and no panel: all correct, and the addendum is
overdue. But it should record a park, not continue a hold. "HELD pending a new
rule" was defensible on 2026-09-03, when the editor believed the decisive
finding rested on a number that did not exist. Under the assumptions above that
belief was wrong, and when the reason for an exception fails, the exception
fails with it. What is left is a third report reading `Verdict: REVISE` with
standing framing findings, which is the plainest case the cap governs.

The uncomfortable part, and I want it on the record: the hold has outlived its
justification by six days, and the same editor's other brief from the same
night was parked immediately on a weaker case.

## The rule, cited exactly

The governing text is `prompts/framing-check.md`, the paragraph headed by what
happens after a report:

> The check is capped at three reports for one brief (methodology v1.12).
> After your second report, Stew, as the editor responsible for content,
> resolves in writing any finding still OPEN or WEAKENED, stating what you
> objected to, and the brief is revised once more. Your third report is a
> confirmation: FRAME OK freezes the brief with the editor's resolution
> beside it; REVISE parks the brief, and it reopens only on new intake
> evidence, never on a further revision of the same brief.

One correction to the shorthand in circulation. The board's notes say "under
v1.19 the brief is parked". v1.19 is `claim-dispositions` and has nothing to do
with framing rounds. The cap is methodology v1.12:

> "The framing check is capped at three reports: after the second the editor
> resolves open findings in writing, the third confirms, and a brief still at
> REVISE after the third is parked and reopens only on new intake evidence."

v1.19 is the methodology version the run was *conducted under*, which is what
`brief.md` and `run-record.md` mean when they say "Methodology: v1.19". Getting
this right matters, because the next person to read the record should not go
looking for a parking rule in the claim-dispositions entry and conclude the
citation is broken.

`framing/check-3.md` opens:

> Verdict: REVISE
>
> This is report 3. Under the three-report cap, the brief is parked and is not
> frozen.

The checker applied the rule to itself. Three findings are marked OPEN, and the
report's closing paragraph names two of them as decisive: "the first two go
directly to representativeness and calculation validity. The brief therefore
cannot freeze."

## Does the carve-out reach any of the three findings? No, twice over.

Methodology v1.20 lets a defect standing after report 3 be corrected and
confirmed rather than parked. It does not reach here, and I want the reasoning
written down because "the carve-out might cover it" is the argument that will
be made next.

**By kind.** v1.20 enumerates and closes the list:

> "Three kinds qualify and nothing else does: verdict bands that overlap or
> leave a gap, a stated rule whose direction contradicts its own arithmetic,
> and a coverage or completeness rule that lets an unclassified remainder
> decide a verdict."

And it puts the counterpart on the other side:

> "Everything else is a framing finding and stays capped at three reports under
> v1.12: what the claim tests, whose reading of it, the value of a cutoff,
> **whether a source is adequate**, whether a verdict is reachable, whether the
> brief leaks an expectation."

Finding 1 is source adequacy and representativeness, named in that list.
Finding 2 turns on which edition of a manual governs and how one filer actually
reported, which is a source-definition judgement, and v1.20's own test settles
it: "If a finding can be argued about, it is a framing finding, because the
test for a defect is that there is nothing left to argue about." The two
parties argued about it, so it is framing. Finding 3, the renamed program, is
verifiable and carries replacement wording, but it is an instrument-existence
question and is not one of the three enumerated kinds. The list is exhaustive
by construction.

The run record reached the same conclusion unprompted and refused to claim the
cover, which was the right call and should be said plainly:

> "The v1.20 rule now in flight would not by itself rescue this brief: it is
> scoped to arithmetic defects in a verdict ladder, and no ladder defect was
> found in this run at all. So I am not claiming its cover."

**By timing.** v1.20 also requires that "the checker, not the editor, labels
each finding framing or defect in its own report, so the distinction is
auditable in the committed record rather than asserted afterwards by the person
it benefits." Report 3 ran under v1.19, before that requirement existed, and
carries no labels. Report 3 does use the word "defects" in its own prose,
under check 4, but that is ordinary English written before the term was
defined, and reading it as the v1.20 label would be exactly the retroactive
relabelling the guard exists to prevent, performed by the party it releases.

**And the guard closes it anyway.** Even granting a fourth round, v1.20 says a
framing finding in the confirmation "parks the brief for good, so the extra
round is worth nothing to anyone trying to use it as a second attempt at
framing." Finding 1 is a framing finding. Every road leads back to the park.

## Do the editor's two grounds for holding survive?

Neither, under the assumptions.

**Ground one, fabrication.** `run-record.md`:

> "There is no such extraction record. The figure 669, the 48-comment gap and
> the phrase 'two stable end passes' appear nowhere in the package the checker
> was given, nowhere in `intake/captures/yegscoop-2026-08-26/`, and nowhere in
> this repository. The checker has no repository access and cannot open a
> Facebook thread, so it had no means of learning a displayed count. This
> finding rests on a premise the checker supplied itself."

Two claims are welded together there and they come apart. The narrow claim,
that the figures are in no file the checker was handed and in no repository
file, appears to be true and I have no reason to doubt it. The broad claim,
that the checker therefore had no means of learning them and supplied them
itself, is an inference from the setup, and under assumptions 1 and 2 the
inference is wrong. The number is real, the limitation is real, and the finding
that rests on it is a valid catch.

Something genuinely defective is still sitting here, and it is not the one
alleged. If a figure entered a framing report from private context rather than
from the package, the stage's package discipline failed, and that is worth a
ledger entry against the setup on its own terms. But it does not make the
finding wrong and it does not make the brief freezeable. A true limitation the
public intake omitted is a true limitation however the checker came to notice
it. The editor was right that the figure had no route into the report through
the package, and wrong to convert that into an accusation of invention. That
distinction is the whole content of the addendum.

**Ground two, no web.** Under assumption 1 this fails as a matter of fact. It
also fails as a matter of scope: the missing-flag theory was offered in the
board record as grounds for voiding the run and granting a fresh three-report
sequence, which is a much larger claim than a hold, and one that would hand
three more framing rounds to the editor who drafted the brief and set up the
defective run. The board record already flagged that conflict against itself.
With the factual basis gone, that route is closed and nothing needs to be
decided about it.

**What survives if the assumptions fail.** Findings 2 and 3 came through
independent of the disputed figure and are conceded in writing in
`run-record.md`: the double-deduction guard ("The brief already tells reviewers
to establish whether Edmonton follows the normal treatment, but it does not
forbid the double deduction outright. It should.") and the renamed program
("Verified."). Finding 4 on the report metadata is conceded harder than either
("Also correct, and my own fault"). Three conceded, unresolved findings after
report 3 park a brief whether or not the 669 figure ever existed. **The park
does not depend on the assumptions.** Only the withdrawal of the allegations
does.

## Fit

The role's question is whether YEGFacts can defend this epistemically. Four
things bear on it.

**The parity problem is the sharpest.** `infrastructure-deficit`, drafted the
same night by the same editor from the same capture, was parked on 2026-09-03
on *one* standing finding, conceded, with corrected wording supplied. Its
`brief.md` header says so without hedging: "Status: PARKED 2026-09-03 on
framing check 3 REVISE." This brief has three standing findings, two of them
conceded, and it is not parked. The difference between the two dispositions is
that in this run the editor disputed the checker. A method whose outcome
depends on whether the editor argued back is not a method. That is the seam a
hostile academic finds first, and they would not need the traces to find it.

**"HELD" is not a status the method defines.** The vocabulary is freeze, park,
revise. `brief.md` currently reads "NOT frozen, NOT parked", which describes
the brief by what it is not, and has done for six days. The register cannot
express it either: `intake/register.yaml` carries `lifecycle: registered,
triage: go` for this question, identical to every unbriefed question and
identical to the parked `infrastructure-deficit`. So the public record
currently says nothing happened. Six days of a state the method does not name
is a worse advertisement for the method than a park would be.

**Nothing downstream is contaminated.** No panel ran, no round 1 started, no
reader has seen a verdict, nothing was published under this question. The cost
of getting the disposition right is close to zero and will never be lower.

**Parking is the reversible move; holding is not.** The board is already
weighing two rule questions that could release this brief (OQ-26, OQ-27). If
either is decided in a way that reaches it, a parked brief can be released by
the amending version, exactly as v1.20 released what v1.12 had caught. A park
recorded today forecloses nothing. An open-ended hold, by contrast, quietly
establishes that an editor who disagrees with a final report can suspend the
outcome while the rule is renegotiated, and that precedent is not reversible by
a later version, because it is not written anywhere to be amended.

## Benefits of the proposed disposition, stated fairly

The parts I would keep unchanged:

- Withdrawing the allegations promptly, in the run's own record, with a date.
  An unfounded public accusation against a named model seat is the kind of
  thing this project's ledger exists to catch, and it should not sit any
  longer.
- Preserving all three reports byte for byte, including the parts that did not
  survive verification. `run-record.md` states the rule already: "Reports are
  not corrected after the fact; they are answered." Answering it in an
  addendum honours that.
- No fourth report. Correct, and for the reason above: no route to one exists.
- No panel. Correct on any reading.
- Not retelling any of this as a research finding. Correct and important. The
  669 figure, if it is published at all, is a fact about how this project
  captured a thread. It is not evidence about Edmonton, it belongs to the
  method record, and it must not appear anywhere a reader could mistake it for
  a finding.

## Risks

**The hold hardens into a doctrine.** Every day this stays HELD, the informal
rule "a disputed report 3 suspends the cap" gets more established by practice.
It has already survived the collapse of its own justification once.

**Adopting the checker's replacement wording verbatim would overstate what is
known.** Report 3 proposes publishing "the unresolved 48-comment gap". A
platform's displayed comment counter and the records a capture can enumerate do
not measure the same population: collapsed replies, hidden, filtered or deleted
comments and blocked accounts all move the counter without being retrievable
text. 669 minus 621 is a difference between two numbers, not 48 unread
opinions. The editor's original instinct, that a specific shortfall should not
be asserted onto the public record without support, was sound; it was applied
to the wrong target. Adopt the limitation, not the arithmetic framing.

**The correction is being scoped to one brief when it belongs to the source.**
The capture at `intake/captures/yegscoop-2026-08-26/` feeds the register, the
intake triage, the whole-source intake pilot's own audit records and three
briefs. Its README opens "The full comment thread ... as one JSONL file", and
the intake record for this run says "One source, captured whole and read end to
end." If the completeness claim is wrong it is wrong everywhere it appears, and
fixing it only inside the brief that got caught would be the worse kind of
correction: the one that repairs the instance and leaves the class.

**Ledger inversion.** The board record currently holds two pending entries for
this run: a setup miss against the editor and a fabricated-finding event
against the checker seat. Under the assumptions the second inverts. The ledger
schema at `methodology/quality-ledger.yaml` already carries the vocabulary for
what actually happened: `valid-catch` for the checker, and `false-accusation`
for a public allegation that did not hold. Using `false-accusation` against
this project's own editor rather than against a model seat is uncomfortable,
which is the argument for doing it. The ledger is worth nothing if it only
records other people's failures.

**My own reliance.** Two of my six assumptions do real work, and I did not
check either. If the trace audit finds the 669 figure has no source after all,
the fabrication finding revives, the ledger entries stand as the board wrote
them, and the withdrawal must not be published. The park still stands.

## Recommendation, committed

Six items. One is a status change, one is a correction, four are records.

**1. Record the park, dated today, and stop using HELD.**

Replace the operative status line in `reviews/who-pays-for-roads/2026-09-03/brief.md`
with a dated line that carries its own history rather than erasing it. In
substance:

> Status: PARKED 2026-09-09 on framing check 3 REVISE (`framing/check-3.md`),
> the last report the v1.12 cap allows, with three findings standing. NOT
> frozen; no panel may run on it. It reopens only on new intake evidence, never
> on a further revision of this brief.
>
> Between 2026-09-04 and 2026-09-09 this brief was recorded as HELD rather than
> parked, on the grounds that report 3's provenance finding rested on an
> invented comment count and that the checks had run without web access. A
> dated audit addendum at `verification/` withdraws both grounds. That earlier
> status line is quoted in full in the addendum. The brief's body is unchanged
> since report 3.

The distinction the editor asked me to draw is this one. The three framing
reports and the brief body are historical artifacts and are immutable; nothing
in them is edited, including the parts of report 3 that were disputed and
including the editor's original allegation, which is preserved by quotation in
the addendum. The brief's status line is not an artifact. `run-record.md`
designated it the single mutable line ("This status line is the only text
changed after report 3"), and a status line that cannot be updated when the
status changes is a status line that lies. Supersede it, quote the old one,
date both.

Two smaller record repairs of the same kind. The HTML provenance comment at the
top of `framing/check-3.md` is the editor's annotation, not the checker's text,
and it currently asserts that two findings "did not hold". Do not rewrite that
sentence; append one dated line beneath it pointing at the addendum. The
promise that the checker's text is verbatim and unedited applies to the report,
and it stays intact. And `run-record.md` should gain a short dated closing
section rather than edits in place, for the same reason.

I am not recommending a content hash over the parked body. Freeze hashes are
freeze practice, a park is not a freeze, and inventing an obligation while
disposing of a brief is how method drifts. Note it as available if the board
later wants parked briefs pinned.

**2. Publish the addendum under `verification/`, as this run's sibling did.**

The precedent is one week old and fits exactly:
`reviews/consultation-and-opposition/2026-09-03/verification/`, where a
procedural question about a framing check was resolved with an independent
review on unchanged bytes, no framing verdict and no reset of the cap. Same
shape here. The addendum states what was alleged, what the trace audit found,
what is withdrawn, what survives, and the park. It is a procedural record. It
carries no verdict, proposes no brief wording, and reopens nothing.

Publish it only after the trace audit reports. The withdrawal is the one part
of this that genuinely depends on facts I did not check, and a withdrawal that
has to be re-withdrawn would cost more than the six days already spent.

**3. Correct the capture record now, in two stages, and scope it to the source.**

Stage one needs no identity evidence and should not wait for the trace audit.
Everything required is verifiable against committed files today: the capture
holds 621 records, and every downstream count, balance and ranking describes
those records. So drop the unsupported completeness claims wherever they
appear, in the capture README's "The full comment thread" and in the intake
record's "One source, captured whole and read end to end", and replace them
with what the file evidences. That correction is true whatever the trace shows,
because "621 records were captured" and "621 records were all there were" are
different sentences and only the first was ever established. `run-record.md`
proposed this itself and was right: "That is a fair point badly evidenced, and
it costs nothing to state correctly."

Stage two, publishing the figure 669 and characterising the difference, needs
the trace linked to this capture. What I would want established before a number
goes on the public record: the trace's target matches the committed source URL;
its date matches the recorded capture date; its output matches the committed
file, by record count and ideally by a hash or by first and last comment ids;
the 669 is a value the platform displayed and the trace records where it was
read, rather than a remembered or derived number; and the "two stable end
passes" description corresponds to events in the trace. The first three are the
identity link and are the ones that matter. Without them, 669 is a number from
somewhere.

Even with all five, write the limitation and not the subtraction: the platform
displayed a higher comment count than the capture enumerates, the difference is
not characterised, and the capture's counts describe the records it holds. Do
not publish "48 missing comments". We do not know that.

Scope both stages to the capture and the intake pilot, not to this brief. Three
briefs and the register descend from that source.

**4. Correct the pending ledger entries before they are written.**

`valid-catch` to the checker seat at the framing stage for the provenance
finding; `false-accusation` against the editor for the fabrication allegation,
materiality blocking because it reached committed public text, disposition the
dated addendum and the park. If the trace audit confirms that a figure entered
a framing report from context outside the package, that is a third entry
against the setup, and it is a real defect regardless of the figure being
right: a check whose value is independence cannot quietly read things the
package did not give it.

**5. Leave OQ-26 and OQ-27 open, and update OQ-27's facts.**

Nothing here decides them and nothing here needs them decided. OQ-27 as written
rests on the fabrication and no-search findings, and both of its first two
options are built on those. Under the assumptions, option (a), void the run for
a setup failure, loses its factual basis, and option (b), strike the false
findings and re-read the report, loses its subject. What is left is option (c),
which is the letter of the rule and is what I recommend. Rewrite OQ-27 to say
so, and let what remains of it, whether a check that breached package
discipline earns anything, stand as the real question.

**6. Do not start round 1, and do not draft a fresh brief for this question.**

The second is the one to watch. A new brief on the same question, built from
the same intake, would be the loophole the cap exists to close, and the board
record already names it as such.

## What would have to change to release the brief instead

The editor asked me not to invent a board requirement where the existing rule
already applies, and not to hide one where it does not. Both halves:

**Parking needs nothing.** It applies `prompts/framing-check.md` as written,
it is the editor's own call under D-0020, and it is the null action. Publishing
the addendum and correcting the capture record are corrections to committed
records, which are also editorial. No board, no methodology version, no founder
sign-off for any of it. This is not a decision the editor should be asking
anyone's permission to make.

**Releasing it needs a methodology change, and therefore the board.** Under the
steward contract's escalation rules, methodology changes go to the full board.
Three routes exist and each is an amendment, not an application:

1. Widen the v1.20 carve-out from arithmetic defects to any finding that is
   fully specified by the checker and conceded by the editor in writing. This
   is OQ-26's question exactly. It would reach findings 2, 3 and 4 here, and
   not finding 1, which is source adequacy and stays framing under the v1.8
   bound. So this route parks the brief anyway unless finding 1 is separately
   resolved.
2. Add a void-and-rerun rule for a check that breached the stage's conditions,
   whether by a missing mandatory lookup or by reading outside its package.
   New rule, and note that under the assumptions the breach here runs the
   other way from the one OQ-27 assumed.
3. Define what counts as new intake evidence. Which brings me to the
   interesting part.

**The rule may already contain this brief's release, and it is worth seeing
before anyone amends anything.** The clause reads "reopens only on new intake
evidence, never on a further revision of the same brief." Finding 1 is about
the intake. A genuine re-capture of that source, one that either recovers
records the first pass did not expose or establishes what the platform will not
give up, produces new intake evidence in the plain meaning of the words, and it
is not a revision of the brief. So the work finding 1 demands is the same work
that opens the door, which is what a well-made rule looks like from the inside.

I will preserve the disagreement rather than settle it, because a reader should
be able to argue the other side. A strict reading says "new intake evidence"
means new claim material, new wordings, new accounts, something that changes
what people are asserting, and that a better inventory of the same thread is
housekeeping. And a loose reading is dangerous in a specific way: if merely
writing a truthful disclosure sentence counted as new intake evidence, the
escape clause would be worth nothing and every parked brief could free itself
by correcting its own paperwork. My position is that the disclosure alone is a
correction and does not reopen anything, while a re-capture attempt that
returns a different set of records does. If the board disagrees with me, route
1 or 3 above is where this goes.

## What would change my mind

- **The trace audit finds 669 has no source.** Then the fabrication finding
  revives, the withdrawal must not be published, the ledger stands as drafted,
  and OQ-27 keeps its subject. The park still stands, on findings 2, 3 and 4.
- **A committed file in the package carried the count all along.** Then there
  was no contamination, no package breach, no ledger entry against the setup,
  and the editor's verification in `run-record.md` simply missed it. Park
  unchanged; the addendum gets shorter and more embarrassing.
- **Someone shows me a labelled defect in report 3 under v1.20's definition.**
  I do not think one exists, the labels did not exist when the report was
  written, and the enumeration is closed. But a genuine ladder or coverage
  defect in report 3 would open the confirmation round for that finding, and
  the park would still follow from finding 1.
- **The founder rules on OQ-26 or OQ-27 in a way that reaches this brief.**
  Then it is released by the amending version and the park's date is what makes
  that release legible. Nothing in this memo resists that outcome; it argues
  only that the release should come from a written rule and not from a status
  the method does not define.
- **Evidence that the difference between the two counts is not retrievable
  text** (collapsed replies and filtered comments accounting for it). Then
  stage one of the capture correction still stands, because "captured whole"
  was never established, and stage two changes from a gap to a documented
  ceiling on what the platform exposes.

## One thing I could not settle

Whether report 3 read outside its package is the most consequential question
left, and it is not the one anybody has been arguing about. If a framing
checker can reach private context, the stage's independence is weaker than the
run records claim, in every run, not just this one. That is bigger than one
brief and it belongs in the ledger and then in front of the board. It does not
change the disposition here, and I would not let it delay the park.
