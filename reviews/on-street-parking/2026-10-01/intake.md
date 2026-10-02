# Intake record: What do bike lanes do to on-street parking, and what does that parking cost the city?

Recorded 2026-10-01 by Stew. Question id `on-street-parking`.

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
  register: "Project parking inventories and parking-program accounts can
  show how many spaces each lane removed and what providing those spaces
  costs the City."
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository. No office-holder
  appears under this question.
- **Accounts:** the register counts 10 distinct people taking part in this
  question, 9 on the against side (against the bike lanes) and 1 for. A
  person can appear under more than one claim; here nobody does. Eight
  people say bike lanes take street parking, one says a business lost its
  customer parking, and one answers that free parking is itself a
  subsidy. That split is a fact about one Facebook thread and is not
  evidence about Edmonton.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. Dates
are 2026; the committee met on Wednesday, August 26.

### `bike-lanes-remove-street-parking` (register claim; merge proposition carried unchanged)

Side: against. 8 accounts.

Registered proposition: "Installing bike lanes takes away on-street parking
from residents and businesses."

- [177] Willow Nuthatch C., Thursday August 27, replying to a comment that
  thanked "the bike community who attended city council": "great turnout
  for people that don't work - why not put in a session for people who can
  actually attend! This was not fair to 98% of the residents in Holyrood
  and Idylwylde areas who are paying taxes for parking. I am not against
  bike lanes if done properly - one side for parking and the other for
  parking is a solution." The register's representative wording is the run
  "Holyrood and Idylwylde areas who are paying taxes for parking."
- [506] Willow Nuthatch C., Thursday August 27, replying to a comment about
  families wanting a safe place to ride: "there can be both - parking and
  a bike lane - 98% of the residents need parking!"
- [210] Windy Porcupine C., Friday August 28, replying to a comment that
  said "Safety should be more important than parking": "says someone who
  doesn't live in the affected areas and loosing their parking?? What about
  their safety, or their kids safety having to find alternative parking
  that may require lugging kids and groceries a fair distance, or maybe
  just not being able to plug their vehicle for the winter. But don't
  worry designs were already paid for right, and cyclists who aren't having
  their lives disrupted where they live is more important than tax payers
  in those communities that it will greatly disrupt. Makes perfect sense."
- [282] Boreal Jackrabbit S., Friday August 28, top-level: "I am thrilled
  my tax dollars are going to good use! Thanks Edmonton for planning a bike
  like on my street that will be used half the year, taking away my street
  parking, AND raising my taxes!"
- [291] Bright Chickadee P., Thursday August 27, top-level: "It would be
  something if it didn't interfere with both parking and traffic
  congestion. I can't wait to move out of the city so my tax dollars
  aren't wasted like this (I have to work in town unfortunately)"
- [371] Sunny Bluejay W., Sunday August 30, top-level, inside a longer
  comment about emergency vehicles, windrows and lane width: "not to
  mention the loss of parking and guess where they wind row the snow in
  winter,right into the few parking spaces that we have left,on top of
  that if someone comes to visit you ,there is no place for them to park."
- [374] Prairie Muskrat D., Sunday August 30, top-level: "No I don't. It's
  one thing to plan for bike lanes when new areas are developed. It's
  wrong to impose these bikes lanes in established neighborhoods taking
  away parking from in front of someone's house."
- [395] Snowy Waxwing K., Friday August 28, top-level: "And how about the
  people that have had these put in on both sides of the road talking
  about 132 ave you lose alot of street parking and if by chance your
  handicapped you now have to go over two sets of sidewalks to get to your
  home. Does the city council even think of these factors ?"
- [420] Frosty Heron G., Thursday August 27, top-level: "City council are
  catering to a very same group, while on street parking is being taken
  away from tax paying residents. Remember this at election time."

Context: the thread is about the Infrastructure Committee's meeting on the
Active Transportation Network Expansion Program, and the City's project
page for that programme was, in the week these comments were written,
publishing a parking-change entry for every route. Two commenters name
places: Holyrood and Idylwylde ([177]), where four programme routes were
then listed for 2026 construction with parking removals in their entries,
and 132 Avenue ([395]), where the bike lanes were built under the City's
132 Avenue Collector Renewal, a different programme. One speaks of a bike
lane "planning" for "my street" ([282]) without naming it, one of
"established neighborhoods" ([374]), and the rest of parking in general.
Every holder treats taking parking as the general effect of installing a
bike lane, not as a feature of one street; the examples are offered for
the pattern. Several wordings carry other strands that belong elsewhere:
who attended the hearing ([177], `council-hearing`), traffic congestion
([291], `lanes-and-congestion`), emergency vehicles and lane width
([371], `emergency-access`, `converted-roadway`), winter use and taxes
([282]), access across barriers for disabled residents ([395],
`access-across-barriers`). None is tested here.

### `business-lost-customer-parking` (register claim)

Side: against. 1 account.

Registered proposition: "A business could not use its street for customer
parking all summer, and the City had put up no parking signs."

- [501] Copper Marmot R., Thursday August 27, top-level: "Cannot use my
  street for my customers. All summer. Phoned city. We do not have parking
  signs there."

Context: the whole comment is quoted. It names no street, no neighbourhood,
no business and no project, and does not say what stopped the street being
used: a bike-lane construction season, a renewal project, a utility cut or
something else. "We do not have parking signs there" is read by the merge
as the absence of no-parking signs, but the sentence can equally be read
as the commenter reporting what the City told them. It is one person's
account of one unnamed street over one summer.

### `free-parking-is-a-subsidy` (register claim)

Side: for. 1 account.

Registered proposition: "Free on-street parking for vehicles is a subsidy
paid for by taxpayers."

- [99] Quiet Hare C., Thursday August 27, replying to [95] Windy Crow M.,
  whose whole comment was "waste of my tax money": "Subsidizing free
  parking for vehicles is a waste of mine. We can call it even."

Context: a rejoinder. The parent comment calls the bike lanes a waste of
tax money; the reply answers that free parking is a subsidy and a waste of
the replier's. The factual assertion inside it is that free parking for
vehicles is subsidised, which is to say paid for by someone other than
the people who park. The people arguing the other way in this thread say
the same thing in their own words: residents "who are paying taxes for
parking" ([177]) and "tax paying residents" ([420]) losing their street
parking. Nobody in the thread disputes that taxpayers pay for the curb;
the two sides disagree about whether that is a waste, which is an opinion.
No commenter gives a figure for what the parking costs.
