<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). N1 and N2 fixed as the editor decided; S-b and S-c adopted; S-a refused; S-d resolved by N2's pattern not applying and left. No finding changed. This committed copy replaces the commenter's pseudonym with "[the pseudonym]" so that no current file pairs it with her name; nothing else in the report is changed.

N1: replaced by the gate confirmation's N3 wording, the editor's choice for the same sentence: "No. In the records we checked, council did not pause the routes. Its Infrastructure Committee neither adopted nor rejected administration's plan…". It bounds the claim to council and to the records read, which answers the critic's point about construction being put off.

N2: the claim schema has no separate share field, so the answer is reordered and keeps both facts: "Partly. Administration's original plan would have taken 14 bike routes out of the program for 2026 and 2027, but its latest only set them aside without saying they would wait. Its two earlier versions both held them back." The editor's wording had a semicolon, which the answer schema rejects, so it is ", but". The first sentence is kept to 30 words so the share card carries it whole rather than cutting it mid-sentence, which is why "version of administration's plan" became "Administration's original plan", "dropped" became "taken … out of the program" (TL;DR 3 already says "dropped", and two identical runs fail the repetition audit) and "for a second look" is gone; the second sentence keeps the gate's point that both earlier versions held the routes back.

S-a, refused: "a former councillor shown here as [the pseudonym]" would undo the pseudonym, which the editor chose so that she is not named as a commenter. S-b, adopted: the parked claim's page heads its section "No finding" and says one brief covered every claim and this one was set aside on that run. S-c, adopted: both labels say "AI reviewers", and the selected-items label says "We do not have permission to republish our copy". S-d, left: claim 1's share card drops the date only on long cuts; minor. -->

# Critique confirmation, 2026-10-02, the same critic session (Claude Opus 5.5), separate from the drafter, checkers and gate

I rebuilt worktree `draft-cpv` at commit 8b86634 (PR #110). I read the
dispositions at the top of
`reviews/council-pause-vote/2026-09-25/critique-1.md`, then re-read the
built question page, the three finding pages, the parked claim page, the
three register pages and evidence pages YF-EV-0118, 0204, 0209 and 0210.

**Bottom line.** All seven required changes are resolved. R1 is resolved on
the editor's own terms: a cold reader now gets "No" in the first clause and
knows what happened. Two new problems come from the fixes themselves, and
each needs a short wording change:
- The new standfirst says "nothing was paused" without limit. The page's
  own sources show administration putting the routes' construction off to
  2027.
- Claim 2's share card now ends at its first sentence. That sentence keeps
  only the half of the finding that goes against the claimant.

## 1. Required changes R1 to R7

| | Status | What the page now says |
|---|---|---|
| R1 | RESOLVED (editor's version) | The question is unchanged. The standfirst is "No, nothing was paused, because council's Infrastructure Committee neither adopted nor rejected administration's plan to set 14 bike routes aside. The Council records we checked show no decision on it by September 25." A cold reader can now say "no, they didn't pause it, and they didn't reject it either". "Set aside" does not take a side on which version of the plan applied. The wording of "nothing was paused" is a new problem (N1). |
| R2 | RESOLVED | "A committee motion to keep building the routes as planned failed on a 2 to 2 tie, so the committee decided nothing either way." |
| R3 | RESOLVED | "The City's original plan would have dropped 14 bike routes for 2026 and 2027, but its latest version only proposed another look at them." |
| R4 | RESOLVED | Claim 2's answer now says "the original" and "Its two earlier versions". The explanation says "The City labelled the two replacements Version 1 and Version 2". Claim 1's limitation and claim 2's limitations now agree: all three reviewers came round on Version 1 in cross-review, and Luna's remaining reservation is recorded. |
| R5 | RESOLVED | The claim page reads "This claim was set aside when its question was checked, before the panel answered it, so it has no finding." The set-aside line replaces "waiting" and the registration expectation. The line is the share card (description and og:description), and it also appears under the claim in "Claims with no finding" on the question page. |
| R6 | RESOLVED | "The report asked the committee to send the plan to Council with a recommendation, and the committee carried no motion on it." No procedural rule from the brief is left in reader text. |
| R7 | RESOLVED | The label now says "this City meeting page", which is true for both the agenda (YF-EV-0210) and the minutes. YF-EV-0204's title now reads "(all the meeting's minutes on one page)", which agrees with the label. |

Suggestions taken up and checked: S1 (claim 1's answer now covers Council),
S2 (votes given as tallies, plus the line "A single vote, or a list of who
voted on one motion above, does not test it"), S3 ("a panel of three AI
models, called the reviewers below"), S6 (claim pages show "(archived copy)"
and "(selected items)" beside each carried ID), S7 (the line on round-one
confidence), and S8. I accept the reasons given for S4 in part, S5 and S9.

Links: 685 internal links and anchors across the 12 pages, 0 broken, and no
duplicate ids. No horizontal scroll at 375px.

## 2. New issues

### N1 (required). "Nothing was paused" claims more than the page shows

Quoted: "No, nothing was paused, because council's Infrastructure Committee
neither adopted nor rejected administration's plan..."

Why it misleads: the question asks about council, but "nothing was paused"
is a claim about the routes themselves. The page's own facts say the report
put construction not yet started "best postponed to 2027", called
installing six of the 14 in 2026 "no longer viable", and said the three
tendered routes "may be delayed ... or removed" until the Council report. A
resident who sees no work on their street this year can quote the page
against itself. The finding supports "council did not pause them". It does
not support "nothing was paused".

Exact fix (the share card follows, because it is the first sentence):
> No, council paused nothing, because its Infrastructure Committee neither adopted nor rejected administration's plan to set 14 bike routes aside. The Council records we checked show no decision on it by September 25.

### N2 (required). Claim 2's share card has lost its version caveat

Quoted, the description and og:description of
`/claims/cpv-administration-recommended-freeze` and of the register page
`administration-recommended-freezing-14-routes`: "Partly. Administration's
latest version of its plan set 14 bike routes aside for a second look
without saying they would wait."

Why it misleads: the description now ends at the answer's first sentence,
and the answer was split in two by the gate (B2). So a shared link to this
claim carries only the half that goes against the commenter. That is the
fault R3 fixed in the TL;DR. The full answer on the page itself is fine.

Exact fix: put the caveat into the first sentence, so that both the answer
and the card carry it.
> Partly. The original version of administration's plan would have dropped 14 bike routes for 2026 and 2027, but its latest version only set them aside for a second look without saying they would wait. Its middle version, Version 1, held them back too.

If the gate's B2 wording must stay as written, give this claim an explicit
share description set to the first sentence above.

### Suggestions (not blocking)

- **S-a. The pseudonym needs the context the release check asked for.** The
  explanation says "One comment, by [the pseudonym], carries three of the four
  claims", then "she and Councillor Karen Principe had twice brought
  motions". Release check B1 option 2, the option the editor chose, said to
  call her "one commenter, a former councillor". The page does not, so a
  reader has to work out from the motions who "she" is, and that her claim 3
  is about her own record. Suggested: "One comment, by a former councillor
  shown here as [the pseudonym], carries three of the four claims on this
  page." A note for the editor: the quoted wording "Councillor Karen
  Principe and I" and the seconder named in the facts identify her anyway.
  The release check said the same. The pseudonym keeps her out of the
  commenter role. It does not hide who she is.
- **S-b. The parked claim page still shows "No finding yet", "Going ahead"
  and "each claim still gets its own finding"**, which sit oddly beside "it
  has no finding". Suggested: headline "No finding", and leave out the
  "each claim still gets its own finding" sentence for a claim set aside
  at a run's vote gate.
- **S-c. Two labels word the same thing differently.** The whole-document
  label still says "Reviewers", while the selected-items label says "The AI
  reviewers". "Our copy carries no grant to republish it" is legal phrasing.
  Suggested: "The City's terms do not let us republish our copy, so check
  the items against the City's own page."
- **S-d. Claim 1's share card cuts off at "had not decided it by…"**, which
  drops the date. This is minor, and N1's pattern does not apply.

## 3. Phone test (D-0046 rule 8), second run

Rendered: yes. `dist/` was served on 127.0.0.1 and captured with Playwright
headless Chromium at viewport 375 by 812, deviceScaleFactor 2, mobile and
touch on. The pending-review banner was removed from the DOM before capture,
as it will be at publication.

Screenshots, in
`the critic's scratch directory (not committed)`:
- `phone2-01-first-screen.png`: the first screen at publication
- `phone2-02-y812.png`, `phone2-03-y1624.png`: the next two screens
- `phone2-04-no-finding.png`: the parked claim with its set-aside line, then the start of the sources
- `phone2-05-sources-minutes.png`: the selected-items labels
- `phone2-full.png`: the full page
- `phone2-06-claim4-page.png`: the parked claim's own page

**First screen.** The answer starts at 617 of 812px. "No, nothing was
paused, because council's Infrastructure Committee neither adopted nor
rejected administration's plan to set 14 bike routes aside" is fully
visible. Only the last line of the second sentence falls below the edge.
Within ten seconds a cold reader can say what the answer is: no, council did
not pause the routes, and the committee did not reject the plan either.
**Yes.** The one risk is N1's "nothing", which invites "but they aren't
being built".

**Sources.** The parked claim's line ("Set aside for this check, because
some Council votes it needs ... are not in our archive yet") is plain and
sits directly under the claim. The whole-document label reads clearly. The
new selected-items label is understood on first read: AI reviewers saw only
the picked items, from our copy, because the City's portal blocked
automated access, and a reader can check the items against the City's page.
**Yes.** Only "carries no grant to republish" reads stiffly (S-c). The
labels stay well below the answer.

CRITIQUE: FAIL

New required changes:
- **N1.** Standfirst: replace "No, nothing was paused, because council's Infrastructure Committee" with "No, council paused nothing, because its Infrastructure Committee". The rest of the sentence and the second sentence stay unchanged.
- **N2.** Claim 2 answer: "Partly. The original version of administration's plan would have dropped 14 bike routes for 2026 and 2027, but its latest version only set them aside for a second look without saying they would wait. Its middle version, Version 1, held them back too." If the gate's B2 wording must stay, give this claim an explicit share description set to that first sentence instead.
