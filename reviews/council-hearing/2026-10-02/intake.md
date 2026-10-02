# Intake record: Who showed up to speak on the bike lanes at council, and who organized them?

Recorded 2026-10-02 by Stew. Question id `council-hearing`.

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
  register: "The hearing record can establish the speaker balance and time
  limit, but the claim that supporters were paid or organized should be
  dropped unless the lobbyist registry links them directly." Before triage
  moved up to the question level, the second claim below was read on its
  own by two seats and both refused it (`prior_triage: no`), for the
  reason "No public record identifies who was paid to attend the meeting,
  so the allegation cannot be settled in either direction." That refusal
  is recorded on the register beside the claim and is weighed in the
  brief.
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository. No commenter under
  this question writes under a real name; every one is a pseudonym, and
  the editor checked each of the eleven against the capture's pseudonym
  rule before writing this record. One wording names a sitting
  office-holder as the person who paid the speakers; that sentence is
  described, not quoted, below.
- **Accounts:** the register counts 11 distinct people taking part in this
  question, 5 on the for side and 6 on the against side, counted by the
  side of the claim each wording sits under. Read as people, the split is
  different: of the five people under the first claim, one asserts that
  supporters outnumbered opponents and four, arguing against the lanes,
  answer that the supporters were few or were only there because they do
  not work. Nobody appears under more than one claim. Those figures are a
  fact about one Facebook thread and are not evidence about Edmonton.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. Dates
are 2026; the committee met on Wednesday, August 26, and every comment
below is from Thursday, August 27, except one from Sunday, August 30.

### `more-speakers-in-favour-at-hearing` (register claim; merge proposition carried unchanged)

Side on the register: for. 5 accounts.

Registered proposition: "More people spoke in favour of the bike lanes at
the council hearing than against them."

- [38] Mossy Crow K., Thursday 3:24 PM, top-level: "Supposedly this
  happened because more people for the bike lanes showed up, then those
  who didn't want it. That's what I heard anyways."
- [42] Silver Moose D., Thursday 5:36 PM, replying to [38]: "because the
  taxpayers were at WORK at the time"
- [177] Willow Nuthatch C., Thursday 12:51 PM, replying to [176] Misty
  Squirrel C., whose comment read "Great news. Thank you to those of the
  bike community who attended city council and represented the voice of
  Albertans.": "great turnout for people that don't work - why not put in
  a session for people who can actually attend! This was not fair to 98%
  of the residents in Holyrood and Idylwylde areas who are paying taxes
  for parking. I am not against bike lanes if done properly - one side for
  parking and the other for parking is a solution." The register's
  representative wording is the run "great turnout for people that don't
  work".
- [178] Windy Otter P., Thursday 1:43 PM, replying to the same [176]: "all
  twelve of them… sick"
- [303] Boreal Grouse K., Thursday 9:41 AM, top-level: "This is so dumb, 10
  people show up in support but thousands and thousands are opposed. This
  council is ($&”@ed)."

Context: "this happened" in [38] is the committee's decision the post
reports, and the commenter offers the balance of the room as the
explanation for it, hedged twice ("Supposedly", "That's what I heard
anyways"). The two replies to [38] and the two replies to [176] do not
deny that supporters came; they say who could come ("taxpayers were at
WORK", "people that don't work") and how few they were ("all twelve of
them", "10 people show up in support"). So the thread disputes two things
at once: whether supporters outnumbered opponents at the hearing, and how
many supporters there were. "Thousands and thousands are opposed" is a
claim about the city, not the hearing, and belongs to the parked
`consultation-and-opposition` question. The weekday-daytime strand ("at
WORK", "a session for people who can actually attend") is about who can
attend a 9:30 a.m. weekday meeting and is not a factual claim about who
did. The parking strand in [177] is tested under `on-street-parking`.

### `hearing-supporters-and-lobby-groups` (register claim; `prior_triage: no`)

Side: against. 5 accounts, 6 wordings.

Registered proposition: "The pro bike lane people at the council meeting
were paid or organized by special interest groups and lobbyists."

- [39] Icy Grebe A., Thursday 4:28 PM, replying to [38]: "special interest
  groups.. crazies! It didn't matter, the core 7 councillors never had an
  intention of pausing it. They are out to ruin this city."
- [577] Icy Grebe A., Thursday 4:25 PM, top-level: "Of course they
  rejected it. The same old 7 councillors who are in a corrupt clique
  voted for it. They had their crazy special interest groups show up and
  declare that they were going to get killed by cars. You literally can't
  make up the stupidity of this council."
- [200] Boreal Marmot L., Thursday 2:56 PM, replying to Cedar Pelican C.,
  inside a longer comment about due diligence, old data, consultation and
  tendering: "This City Council is bowing to special interest groups."
  The other strands of that comment are tested or parked under
  `council-pause-vote`, `consultation-and-opposition` and
  `routes-already-committed`.
- [281] Quiet Moose J., Sunday, August 30, 4:23 PM, top-level: "The City
  if Edmonton councillors are a joke!!! I know why they're doing it. The
  rich people in Edmonton (lobbyists) asked for bike lanes! So
  frustrating!"
- [330] Wintry Raven B., Thursday 10:04 AM, top-level, inside a longer
  comment about the programme's cost and the share of residents who
  cycle: "Special interest gets our dollars." The cost and share strands
  belong to `active-transportation` and `cycling-volumes`.
- [416] Sunny Moose J., Thursday 4:54 PM, top-level: "Those pro bike lane
  people were orivably paid to be,at that meeting." The sentence after it
  attributes the payment to a named sitting office-holder, out of
  taxpayers' money, and asks for an audit. That sentence is an allegation
  of wrongdoing against an identifiable person; the merge kept the
  payment assertion and dropped the name, and this record does the same.

Context: three strands sit under one proposition. "Special interest
groups" ([39], [577], [200], [330]) is a label for the people who spoke
for the lanes and for whoever council listens to; the only factual
content in it is that the supporters at the hearing came as organized
groups rather than as individuals. "Lobbyists" ([281]) is the same label
with a legal term attached: that the people asking for bike lanes are
lobbyists, which in Alberta is a registrable status. "Paid" ([416]) is a
distinct factual allegation: that the supporters who attended were paid to
be there. The register's reason for sending the question ahead names this
claim and the condition on which it could be tested: a lobbyist registry
that links the groups directly. Everything else in these six comments
("crazies", "corrupt clique", "out to ruin this city", "the stupidity of
this council", "a joke") is characterisation and motive, which the site
does not test. The "core 7" and "same old 7 councillors" strand is tested
under `council-pause-vote`.

### `speaking-time-cut-to-three-minutes` (register claim)

Side: against. 1 account.

Registered proposition: "Council cut speakers from five minutes to three
because of the volume of complaints, with 70 still in the queue."

- [601] Golden Pelican H., Thursday 1:40 PM, replying to [600] Cedar
  Pelican C., who had written "there are none on arterial roads" under
  the same commenter's top-level comment [599]: "yes there is and one is
  getting built as we speak on from 102ave to 107ave, it was deemed by the
  province as arterial to a future connecting one on 107ave. Most concerns
  from the area have been ignored by the rogue council while limiting
  concerns to 3min from 5min due to a high volume of complaints from all
  over the city and 70 is in the current cue."

Context: the exchange is about whether any bike lane runs on an arterial
road, which is a different question (`converted-roadway`); the sentence
the register took is an aside inside the reply. It carries four
assertions: that the speaking limit was cut from five minutes to three;
that this was done "due to a high volume of complaints from all over the
city"; that "70 is in the current cue"; and that "most concerns from the
area have been ignored". The holder's own comments elsewhere in the thread
([599], [451], [453], [454]) are about provincial orders, foreign
interference and a particular neighbourhood's notification, none of which
is this claim. "Concerns" and "complaints" are the holder's words for the
people who registered to speak; whether they were complaints is the
business of the first claim above. "Ignored" is a judgement of the
outcome, which `council-pause-vote` tested as what the committee decided.
The register's proposition names "Council"; the body that met on
2026-08-26 was the Infrastructure Committee, a standing committee of
Council, and the brief names the committee.
