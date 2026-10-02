# Intake record: How does Edmonton clear snow from its streets and bike lanes?

Recorded 2026-10-02 by Stew. Question id `snow-clearing`.

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
  register: "The snow policy, service schedules and council reports can
  show when bike lanes and streets are cleared, where snow is placed and
  what changes are proposed."
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository. No commenter under this
  question is an office-holder. One comment names the mayor by surname in
  a sentence this record does not quote; the register's wording for that
  claim stops before it.
- **Accounts:** the register counts 5 distinct people taking part in this
  question, 4 on the against side (against the bike lanes) and 1 on
  neither side. Two people appear under two claims each: one under the
  Whyte Avenue and windrow claims, one under the two claims about what is
  before council. Nobody in the source argued the other way on any of the
  five claims. That split is a fact about one Facebook thread and is not
  evidence about Edmonton.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. Dates
are 2026; the committee met on Wednesday, August 26.

### `bike-lanes-plowed-before-streets` (register claim; merge proposition carried unchanged)

Side: against. 3 accounts.

Registered proposition: "The City plows bike lanes in winter before it
plows the streets."

- [280] Frosty Raven J., Friday August 28, top-level: "Fun Fact my fellow
  peasants bike lanes get plowed in the winter before the streets
  do...there's your tax dollars at work and nobody's riding them". The
  register's representative wording is the run "bike lanes get plowed in
  the winter before the streets do".
- [487] Silver Raven G., Thursday August 27, top-level: "They plow the bike
  lanes every winter for the 1 or 2 bikes you see going down them try
  ridding a bike in Edmonton when it's minus 20 or more". The register's
  wording is the run up to "going down them".
- [559] Snowy Heron C., Sunday August 30, top-level: "Our fricking mayor
  and councillors don't bike, have no infills in or Grannie Flats sitting
  on the property line next to them. They have snow and cleaning of their
  street and bike lanes and the roaming shelter they call the LRT are for
  the working class not them!" The register's wording is the run "They
  have snow and cleaning of their street and bike lanes".

Context: the first comment states the order of clearing as a fact and
offers it as a complaint about tax money and use. The second does not
state an order; it says the bike lanes are plowed at all, every winter,
for few riders, and the part about who rides belongs to the
`cycling-volumes` question. The third is about the mayor and councillors
getting their own streets and bike lanes cleared, and about infill and the
LRT; it says nothing about bike lanes being cleared before streets. The
merge folded all three under one proposition. The brief tests the claim as
the first comment states it, which is the only one of the three that
asserts an order, and reports that the other two wordings assert
something else. Nobody in the thread said the streets are cleared first.

### `whyte-avenue-narrow-in-winter` (register claim)

Side: against. 1 account.

Registered proposition: "Whyte Avenue becomes very narrow and dangerous in
winter because of the snow budget and clearing."

- [405] Sunny Bluejay W., Sunday August 30, replying to [403] Misty
  Jackrabbit D., whose comment said in part "Driving over to whyte ave,
  peak bike season time mid August, not one bike to be seen, not to
  mention the 8 months of winter": "have you been down whyte ave in winter
  knacks no snow budget,no proper snow removal makes whyte ave very narrow
  and dangerous in winter". The comment continues with a sentence about
  the mayor that is opinion and is not quoted or tested.

Context: a rejoinder inside an exchange about how many people ride. The
factual assertions are that there is no snow budget, that there is no
proper snow removal on Whyte Avenue, and that the avenue becomes very
narrow and dangerous in winter as a result. Whyte Avenue is the name
used for 82 Avenue through Old Strathcona. No width, season, incident or
standard is named.

### `snow-windrowed-into-parking-spaces` (register claim)

Side: against. 1 account.

Registered proposition: "Plows windrow the snow into the few on-street
parking spaces left beside the bike lanes."

- [371] Sunny Bluejay W., Sunday August 30, top-level, inside a longer
  comment about emergency vehicles, parking loss, lane width and road
  condition: "not to mention the loss of parking and guess where they wind
  row the snow in winter,right into the few parking spaces that we have
  left,on top of that if someone comes to visit you ,there is no place for
  them to park."

Context: the comment is a list of what the commenter holds against bike
lanes. The sentence quoted puts the windrows into the parking spaces that
remain after a bike lane took the rest; "the few parking spaces that we
have left" presupposes the parking-loss claim tested under
`on-street-parking` and is not retested here. No street is named. The
other strands of the comment (emergency access, lane width, pavement
breaking up, parking loss) belong to `emergency-access`,
`converted-roadway` and `on-street-parking` and are not tested here.

### `two-snow-removal-proposals-need-more-money` (register claim)

Side: neither. 1 account.

Registered proposition: "Administration has already put two snow removal
proposals to council, both requiring spending increases."

- [510] Windy Heron J., Thursday August 27, replying to [509] Aurora Vole
  M., whose whole comment was "All I can say is, they better not ask the
  taxpayer for more money when it comes to fixing our roads or snow
  removal. If there's money for this": "administration has already put 2
  different proposals to council for snow removal and of course both will
  require spending increases. Council will be debating soon about bringing
  back calcium chloride to use as anti icing on the roads"

Context: an answer to a commenter who expects the City to ask for snow
money. The reply says the asks already exist: two, from administration,
both needing more spending. Written on the Thursday after the committee
meeting, four days before the Community and Public Services Committee's
meeting of August 31 on the snow and ice policy review. The commenter
takes no side on the bike lanes, which is why the register counts the
account as neither.

### `calcium-chloride-debate-coming` (register claim)

Side: neither. 1 account.

Registered proposition: "Council will soon debate bringing back calcium
chloride as an anti-icer on the roads."

- [510] Windy Heron J., the second sentence of the same comment: "Council
  will be debating soon about bringing back calcium chloride to use as
  anti icing on the roads"

Context: the same comment and the same day, August 27. The sentence is in
the future tense. The City's current procedure uses calcium chloride
brine to pre-wet its sand-salt mix and as an anti-icer only on priority 1
active pathways, not on roadways; "bringing back" refers to its use on
roads. The commenter does not say which body, what report or when.
