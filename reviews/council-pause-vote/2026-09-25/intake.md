# Intake record: Did council pause the future bike routes when its own administration recommended it?

Recorded 2026-09-25 by Stew. Question id `council-pause-vote`.

This question came out of whole-source intake (methodology v1.15) and the
grouping and triage that followed (v1.16); the register
(`intake/register.yaml`) is its primary record. This file exists so the
framing checker has the raw claims, their provenance and their context in
one place. Reviewers do not receive it.

## Provenance

- **Source:** `yegscoop-2026-08-26`, a Facebook post by Yegscoop about the
  Infrastructure Committee's bike-lane meeting of 2026-08-26, captured by
  the founder on 2026-09-02 and committed at
  `intake/captures/yegscoop-2026-08-26/comments.jsonl`. The source URL and
  the capture's own terms are in that directory's README.
- **Capture limitation:** the platform displayed 669 comments; the capture
  holds 621 accessible records after two stable end passes exposed no
  further comments or replies. The 48-count gap is unresolved and does not
  identify 48 missing unique comments. Every count in this record and in
  the brief describes the accessible capture, not the complete displayed
  thread, and the capture is not described as complete anywhere in this
  run.
- **How the claims were found:** three extractor seats read the whole
  thread and listed every materially factual claim in it; a merge seat
  folded the three lists into propositions; `scripts/intake-coverage.ts`
  proved nothing raised was lost; `scripts/intake-quote-gate.ts` threw out
  any wording that is not an unbroken run of the comment it cites.
  Artifacts: `reviews/intake/yegscoop-2026-08-26/`.
- **How this question was formed:** `prompts/intake-group.md` grouped the
  propositions into questions. Two triage readers, both from a different
  vendor than the editor and neither shown the other, ruled on every
  question. Both returned GO on this one, with the public reason on the
  register: "Administration's report and recorded votes can show what
  pause was recommended, which motions were made and how each councillor
  voted, without examining the allegation about councillors' motives."
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository. One commenter is a
  sitting councillor writing under her own name; public office-holders
  keep their names under the register's pseudonym rule.
- **Accounts:** the register counts 6 distinct people taking part in this
  question, all 6 on the against side, none for and none on neither side.
  Nobody in the source argued that council did pause the routes, that
  administration recommended no such thing, or that the councillors vote
  independently of one another. That one-sidedness is a fact about one
  Facebook thread and is not evidence about Edmonton. A person can appear
  under more than one claim; the councillor appears under three.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. All
comments are dated Thursday, August 27, 2026, the day after the committee
meeting.

### `council-rejected-pause` (register claim; merge proposition carried unchanged)

Side: against. 5 accounts.

Registered proposition: "Council did not support the recommended pause and
review of the future bike routes."

- [449] Councillor Jennifer Rice, top-level comment: "That review was also
  not supported by Council." The sentence before it in the same comment:
  "Yesterday, City Administration recommended freezing 14 future routes to
  reassess — exactly the review we were asking for."
- [406] Boreal Crow K., top-level: "The city’s recommendation was to PAUSE
  the bike lines until more information was obtained to continue it in a
  thoughtful way that worked for residents that it affects as well as
  drivers and bikers. Council chose to ignore that."
- [441] Amber Coyote T., top-level: "Typical city council, ignore a
  committee's decision and go thier own route."
- [356] Snowy Bluejay M., top-level: "They already ignore the citizens,
  might as well ignore their own committees too."
- [200] Boreal Marmot L., replying to Cedar Pelican C.: "The motion was not
  to scrap the routes, but rather to not rapidly push them through without
  a second look." The same comment opens "City council rejected the
  opportunity to do their due diligence" and carries the consultation
  strand ("relying on old data and zero community consultation"), which
  belongs to the `consultation-and-opposition` question and is not tested
  here.

Context: every holder writes the day after the Infrastructure Committee
met on report IS03688 and calls the deciding body "council" or "city
council". Two of them ([441], [356]) describe council overriding "a
committee's decision" or "their own committees"; the other three describe
council declining administration's recommendation. None names a vote, a
motion or a councillor. The councillor's sentence is the flattest form of
the claim and is the one the proposition follows. What "the recommended
pause and review" was is the next claim's business.

### `administration-recommended-freezing-14-routes` (register claim)

Side: against. 1 account.

Registered proposition: "City Administration recommended freezing 14
future bike routes to reassess them."

- [449] Councillor Jennifer Rice: "Yesterday, City Administration
  recommended freezing 14 future routes to reassess"

Context: the same comment says the recommendation was "exactly the review
we were asking for". "Yesterday" is August 26, 2026, the date of the
Infrastructure Committee meeting and of report IS03688. The holder gives a
number, 14, and a treatment, "freezing ... to reassess". No other
commenter gives a count.

### `motions-to-cut-budget-to-50-million-failed` (register claim; `names_person: true`)

Side: against. 1 account.

Registered proposition: "Councillor Karen Principe and Councillor Jennifer
Rice brought two motions to cut the bike lane budget to $50 million and
redirect the rest, and Council did not support them."

- [449] Councillor Jennifer Rice: "Councillor Karen Principe and I brought
  forward two motions — twice — to cut it to $50M and redirect the rest to
  core priorities. Council didn’t support them."

Context: the two sentences before it: "Council approved $100M for rapid
bike lane expansion. I voted NO." So "it" is the $100 million programme
and "to $50M" is half of it. The register flags the claim `names_person`
because it names two councillors; it names them for motions brought and
votes cast in office, which the methodology treats as council-minutes
questions rather than accusations, so the claim is triaged on the ordinary
tests and the site names the office-holders when it reports it.

### `same-seven-councillors-vote-together` (register claim)

Side: against. 1 account.

Registered proposition: "The same seven councillors vote together to keep
the bike lane expansion going."

- [39] Icy Grebe A., replying to Mossy Crow K.: "It didn’t matter, the core
  7 councillors never had an intention of pausing it."
- [577] Icy Grebe A., top-level: "Of course they rejected it. The same old
  7 councillors who are in a corrupt clique voted for it."

Context: one person, two comments, both on the day after the committee
meeting. The factual assertion in both is a fixed bloc of seven members of
council who vote the same way on the bike-lane programme; "same old"
places the bloc before the current council as well as in it. Everything
else in the two comments is about motive and character ("never had an
intention", "corrupt clique", "They are out to ruin this city") and is
outside what the register cleared: the triage reason excludes "the
allegation about councillors' motives", and the site tests no claim about
what a person intended. The proposition keeps the voting pattern and drops
the rest.
