# Whole-source intake: the Yegscoop thread of 2026-08-26

The first source read end to end under methodology v1.15. A Facebook post on
Council's 2026-08-26 bike lane decision, with all 621 comments. Nobody chose
which claims in it to look at.

## What came out

| | |
| --- | ---: |
| Comments read | 621 |
| Distinct commenters | 389 |
| Claims raised by the three seats | 230 |
| Forms thrown out by the quote gate | 7 |
| Propositions after the merge | 112 |
| Claims after grouping | 112 |
| Investigations | 34 |
| Captured wordings carried onto them | 309 |
| Extractor claims unaccounted for | 0 |

Propositions by how many seats found them: 26 by all three, 28 by two, 58 by
one. By side of the argument: 65 against the spending, 38 for it, 9 neither.
Nineteen restate claims the register or a published story already carries.
Triage rules on investigations, not on single claims, and returned 32 GO, 1
PARK and 1 NO, the two readers agreeing on 30 of 34.

Twelve extractor claims were dropped in the merge, each with its reason. Most
are policy preferences a seat had logged as claims: that cyclists should be
licensed and insured, that the network should be fully integrated, that the
Province will step in. A demand is not an assertion a record can settle.

One seat's claim was split three ways. Flash had logged "very few Edmontonians
commute by bicycle, only about 1 to 2 percent" as one item; it is three
different propositions with three different denominators, and the merge is
required to separate them.

## The comparison that made this worth building

On 2026-09-02 the editor read the same thread by hand and registered **seven**
candidates. The pipeline matched **eight** existing register entries, the seven
among them, and raised **93 propositions nobody had registered**. The hand pass
was not lazy; it was one reader deciding what looked checkable, which is the
failure this method exists to remove.

The largest of the ones the editor missed, by how many different people made
them:

| people | outcome | proposition |
| ---: | --- | --- |
| 10 | PARK | Most residents in the affected neighbourhoods oppose the bike lanes |
| 9 | PARK | Roads, alleys and basic services are in poor condition while this is funded |
| 8 | GO | Installing bike lanes takes away on-street parking |
| 8 | GO | Drivers already pay for roads through fuel taxes and registration |
| 5 | GO | The City fast-tracked routes on old data without consulting the communities |
| 5 | GO | More people spoke for the lanes at the hearing than against |
| 4 | GO | Winter cycling has grown, with people commuting at -30 |
| 4 | GO | Municipal roads are paid for predominantly out of property and general taxes |

The sharpest exchange in the thread is one the editor took only one side of. A
commenter opened with "All 5 people who ride bikes showed up?" and was answered
with about 1.3 million cycling trips counted in the first seven months of 2026.
That number was re-fought at comments 81, 111, 121, 213 and 369. The hand pass
registered the "nobody rides" side and not the figure thrown back at it. Both
are now propositions, and so are the four separate rates people quoted at each
other: 2 percent of trips, under 1 percent of commuters, 87 percent by car, 1
to 2 percent of the population. The first merge had collapsed several of those
into one compound claim; see below.

## Grouping: 112 claims, 34 investigations

The founder read this register on the preview and found what was still wrong
with it: several claims per argument, each costing its own panel run. Four
turned on who pays for Edmonton's roads.

So propositions are grouped twice. An investigation is one brief, one body of
evidence, one panel run; the claims inside it each keep their own finding. The
saving is 34 panel runs instead of 112. Sixteen of the 34 carry claims from
both camps.

| accounts | claims | investigation |
| ---: | ---: | --- |
| 25 | 9 | How many people cycle, and how much do the lanes get used? |
| 24 | 6 | Do the lanes ease congestion or make it worse? |
| 17 | 1 | Did Council approve $100 million for bike lanes? |
| 16 | 2 | Can people cycle through an Edmonton winter, and do they? |
| 15 | 4 | Who pays for Edmonton's roads, drivers or everybody? |
| 15 | 5 | Is the City neglecting basics while it funds this? |

Two specialist reads rejected the first design, in which the group itself
carried one finding. Both said the same thing from different directions: a
finding over an umbrella holding opposite claims states nothing, and it labels
everybody quoted under it with a verdict about the other side. The fix is that
grouping for work and grouping for verdict are different operations. Opposite
claims share an investigation and never a finding.

The grouping caught a real fault in the earlier per-claim triage. Of the four
road-funding claims, three were cleared and one was declined as undisputed,
inside a thread that is an argument about exactly that. As one investigation it
is a single clear go. Separately, "Council approved $100 million" now comes
back declined, because it is common ground in the source: the site had been
checking a thing nobody argues about, which is where this whole redesign
started.

## Who found what

| seat | model | claims | forms | thrown out |
| --- | --- | ---: | ---: | ---: |
| flash | Gemini 3.8 Flash (High) | 90 | 273 | 0 |
| luna | gpt-5.6-luna (low) | 100 | 259 | 2 |
| haiku | Claude Haiku 4.5 | 40 | 53 | 5 |

Merge: Claude Opus 5 at high effort, 26 minutes.

The first merge of this run was thrown away. An independent critique found it
had grouped by topic rather than by proposition: one proposition on congestion
carried quotes from people arguing the opposite of it, and a claim that 24
people said "only 1 to 2 percent cycle and the lanes sit empty" put a compound
assertion into the mouths of commenters who had made neither half of it. The
merge prompt now forbids joining two assertions, says a form must assert the
proposition and not the topic, and treats a policy preference as not a claim.
Re-run under those rules the two triage readers agreed on 78 of 112, against 58
of 99 before, which is the clearest evidence the grouping had been wrong.

Haiku found the fewest claims by a wide margin and lost the most forms to the
quote gate. A first run of this thread on Gemini 3.6 Flash at low effort
produced 32 claims and cited comment numbers past the end of a 621-comment
thread; moving that seat to 3.8 Flash at high effort turned the weakest seat
into the cleanest. Both facts are arguments for three seats rather than one.

## The quote gate

Seven forms across two seats quoted words the comment they cited does not
contain, and were thrown out before the merge saw them; two claims lost every
form and went with them. `quote-gate.md` names each one and, where the words
exist somewhere else in the thread, says which comment they are really in. Most
were an off-by-a-few comment index. Two were a real comment lightly reworded.

A wrong quote is a false attribution to a real person, which is worse than a
missed claim: the person can read the site and find words they did not write.

## Claims naming a person

Six propositions name an identifiable person. One was declined by both readers
because it accuses a named person of a private conflict of interest, and this
site has no way to put an accusation to the person and print their answer. It
keeps its row, its outcome and its reason on `/considered`, under a neutral id,
with the wording and the comments held in the private board record so the
decision stays auditable. The id is neutral because a slug is published as
surely as a paragraph is.

The other five are claims about what office-holders did in office, and they are
here in full: a motion brought, a lane installed, a school-bus loading area
proposed. Council minutes settle those, the site names office-holders when it
reports them, and withholding them would hide the public record rather than
protect anyone.

The first triage run got this wrong. One reader declined "these two councillors
brought motions to cut the budget" as a claim about named individuals, which
would have withheld a matter of council minutes. The prompt now says the rule
covers an accusation of wrongdoing, dishonesty or improper motive, and warns
against reading it more widely.

## Files

- `../../../intake/captures/yegscoop-2026-08-26/` — the capture. A verbatim
  archive of a public thread, including things the site declined to check.
  Commenters are pseudonymous; office-holders are not.
- `extract-<seat>.json` — each seat's list, after the quote gate. `.raw.txt` is
  what the CLI printed.
- `quote-gate.md` — what was thrown out and why.
- `merged.json` — the propositions, every form, and the dropped list.
- `triage.md`, `triage.json`, `triage-<seat>.raw.txt` — the two readers, their
  split, and the combined decision.
- `manifest.md` — every command, model and timing.
