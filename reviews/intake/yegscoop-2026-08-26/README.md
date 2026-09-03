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
| Propositions after the merge | 99 |
| Captured wordings carried onto them | 337 |
| Extractor claims unaccounted for | 0 |

Propositions by how many seats found them: 25 by all three, 29 by two, 45 by
one. By side of the argument: 52 against the spending, 34 for it, 13 neither.
Thirteen are variations of claims the register or a published story already
carries. Triage returned 61 GO, 30 PARK, 8 NO.

One extractor claim was dropped in the merge, with its reason: a pair of
rhetorical questions about whether another commenter had been to a council
meeting, asserting nothing checkable.

## The comparison that made this worth building

On 2026-09-02 the editor read the same thread by hand and registered **seven**
candidates. The pipeline found all seven again, as variations pointing at those
register entries, and **86 more**. The hand pass was not lazy; it was one
reader deciding what looked checkable, which is the failure this method exists
to remove.

Some the editor missed, with the number of different people who said them:

| people | proposition |
| ---: | --- |
| 24 | Only about 1 to 2 percent of Edmontonians cycle, and the lanes sit largely empty |
| 18 | The bike lanes reduce motor-vehicle congestion |
| 17 | Drivers pay for roads through fuel tax and registration, so cyclists should be licensed and pay their share |
| 13 | The City claims an infrastructure deficit while spending $100 million on bike lanes |
| 10 | Building the lanes removes on-street parking residents and businesses depend on |
| 7 | Municipal roads are funded predominantly by property taxes, which cyclists also pay |
| 7 | The Province has directed Edmonton to stop building lanes and will order some removed |
| 6 | More people turned up at the hearing for the lanes than against them |

The largest of these, and the sharpest exchange in the thread, is the one the
editor took only one side of. A commenter opened with "All 5 people who ride
bikes showed up?" and was answered with about 1.3 million counted cycling trips
in the first seven months of 2026. That number was re-fought at comments 81,
111, 121, 213 and 369. The hand pass registered the "nobody rides" side and not
the figure thrown back at it.

## Who found what

| seat | model | claims | forms | thrown out |
| --- | --- | ---: | ---: | ---: |
| flash | Gemini 3.8 Flash (High) | 90 | 273 | 0 |
| luna | gpt-5.6-luna (low) | 100 | 259 | 2 |
| haiku | Claude Haiku 4.5 | 40 | 53 | 5 |

Merge: Claude Opus 5 at high effort, 23 minutes.

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

Three propositions name an identifiable person and were declined by both triage
seats on the same ground: this site has no right-of-reply process, so it does
not adjudicate what one person alleges about another. They appear on the
register and on `/considered` under a neutral id with the reason and nothing
else. Their wording and the comments they came from are in the private board
record, so the decision can still be audited.

Claims about what a councillor did in office are not in that class. Several are
here in full, parked or cleared, because a motion brought or a lane installed
is the public record.

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
