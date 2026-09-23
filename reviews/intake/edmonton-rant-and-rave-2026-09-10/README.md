# Whole-source intake: the Edmonton Rant and Rave thread of 2026-09-10

The second capture read end to end under methodology v1.15, and the first on a
source that is not about bike lanes. A post in a public Edmonton Facebook
group complaining about garbage collection, snow clearing and taxes, from which
117 comment records were captured. Nobody chose which claims in the capture to
look at.

Two things about this run are not the method as written, and both are stated
here rather than in a footnote. The Google seat did not run: the only working
Gemini command-line tool on the machine reported its account quota exhausted
for about a week, and the founder chose to run the source on two vendors
rather than wait. And the intake prompts were changed before the seats ran,
because they defined a claim's `side` as a position in the first source's
argument (methodology v1.33, below).

## What came out

| | |
| --- | ---: |
| Comments read | 117 |
| Distinct commenters | 86 |
| Claims raised by the three seats | 144 |
| Forms thrown out by the quote gate | 2 |
| Claims after the merge | 71 |
| Captured wordings carried onto them | 104 |
| Extractor claims unaccounted for | 0 |
| Questions after grouping | 21 |
| Questions cleared for a panel (GO) | 17 |
| Parked | 2 |
| Declined | 2 |

The platform displayed 123 comments; the export holds 117. The gap is
unresolved and the capture is not proof of a complete thread; see the
[capture README](../../../intake/captures/edmonton-rant-and-rave-2026-09-10/README.md).

Merged claims by how many seats found them: 35 by all three, 22 by two, 14 by
one. By side of the argument: 43 against the City's service and spending, 24
for it, 4 neither. Seven of the 21 questions carry claims from both camps.
Five extractor claims were dropped in the merge, each with its reason on the
register as the source's `set_aside`: a sarcastic question about snow
removal, a prediction, a policy suggestion, sorting instructions, and a
general insult.

The two readers agreed on 17 of 21 questions. The largest, by how many
different people took part:

| people | outcome | question |
| ---: | --- | --- |
| 17 | GO | Are Edmonton's garbage, green-bin and recycling collection schedules adequate for households? |
| 10 | GO | How much can Edmonton households reduce their garbage through recycling and composting? |
| 9 | GO | How does Edmonton charge households for waste service, and can residents opt out? |
| 6 | GO | Can Edmonton households obtain waste carts that meet their household and medical needs? |
| 6 | GO | What happens to Edmonton's recycling and compost after collection? |

The thread's own argument is visible in that first row. The post says one
black bin every two weeks is not enough for a large family. Seven people
answered that it is enough for theirs, and the register now holds both, with
five people asserting the collection schedule and a dispute about whether the
City raised taxes when it cut collection from weekly. The fee on the Epcor
bill, whether waste is paid for through taxes at all, and whether the City
charges twice are a question of their own. None of this is about bike lanes,
which is what the founder asked the second source to show.

The two parked questions split the readers: whether the bin system has made
the city cleaner or dirtier (no litter measure spans the change), and whether
council gives daytime pro-bike advocates disproportionate attention (one
reader saw a hearing record that could answer it, the other saw no record of
who council "mainly listens to"). Under the rule, a GO against a NO parks. The
two declined are a truism about census commuting counts and the withheld
question below.

## The vendor limit

Three extraction seats ran, from two vendors: Claude Haiku 4.5, Claude Sonnet
5 and gpt-5.6-luna. The merge and the grouping ran on the OpenAI strong tier,
gpt-5.6-sol, because the founder designated this session the Codex seat; the
two triage readers, Claude Opus 5 and Claude Sonnet 5, are therefore from the
vendor the merge did not run on, which keeps the rule that readers are not
the editor's vendor, and loses reader-vendor diversity. The first run's
argument for three vendors, that the weakest seat found a fifth of what the
strongest did, applies here with one vendor fewer: a claim only a Gemini seat
would have found is a claim this run did not see.

## Who found what

| seat | model | claims | forms | thrown out |
| --- | --- | ---: | ---: | ---: |
| haiku | Claude Haiku 4.5 | 35 | 51 | 0 |
| sonnet | Claude Sonnet 5 | 55 | 78 | 0 |
| luna | gpt-5.6-luna (low) | 55 | 89 | 2 |

Merge: gpt-5.6-sol at high effort, 12 minutes. Grouping: the same seat, 3
minutes, and the check passed on the first pass with every merged claim placed
once and no claim mixing sides.

Haiku found the fewest claims again. Its first pass on this thread, under the
old prompt, found 25; under the changed prompt it found 35, with the same
thread and the same model, which is one data point that the `side` definition
was costing it claims and not only mislabelling them.

## The quote gate

Two forms from one seat quoted words the comment they cited does not contain,
and were thrown out before the merge saw them; one claim lost its only form
and went with them. Both stitched two runs of a comment into one quote. A
wrong quote is a false attribution to a real person, which is worse than a
missed claim.

## The prompt change (methodology v1.33)

The committed extraction and merge prompts defined `side` as a position in
"the bike-lane spending argument". The second source exposed that before a
seat ran. The prompts now point at a source note the run writes and commits,
one paragraph naming the argument the source is having and what `for` and
`against` mean in it; this run's is `source-note.md`. Two seats had already
run under the old prompt with a workaround paragraph; those extractions were
discarded and every seat re-run under the changed prompt, so nothing here
rests on the old wording.

## Claims naming a person

One question was declined by both readers because the single claim under it
accuses the mayor and council of a self-interested motive, and this site has
no way to put an accusation to the person it is about and print their answer.
No personal name is typed in the comment; the mayor is one identifiable
person, and both readers read it that way. The question and the claim keep
their rows, outcomes and reasons on the register under the neutral ids
`withheld-edmonton-rant-and-rave-2026-09-10-q1` and `-1`, and print neither
the wording nor the question text. The run artifacts in this directory were
redacted before they were committed, so no descriptive slug or proposition
was ever published; each raw seat output carries a notice saying what was
replaced. The commenter's sentence stays in the capture, verbatim, under the
same exemption the first source carries. One reader's reason restated the
accusation in its own words and that clause was replaced too; the register
carries the other reader's reason.

Stew's own reading before triage was that a body is not a person and the
claim could go to the disclosed-interests question the register already
holds. Both readers ruled the other way and the standing rule is applied; the
private board record notes the disagreement.

## The cross-source check (D-0030)

D-0030 asked that the second source be checked for whether the merge folds a
wording onto a claim the register already holds, or registers a
near-duplicate beside it. It registered beside. `road-condition` ("Are
Edmonton's tax-funded roads in poor condition?", one person) sits next to the
first source's `infrastructure-deficit` question and its
`basic-services-in-poor-condition` claim; `four-year-tax-plan` sits next to
`property-taxes`. The merge prompt hands the seat the register and says
nothing about what to do with a match, and the register generator has no
way to add a second source's wording to an existing claim's `variations`,
so the fold cannot happen under the current scripts. Existing entries were
not edited in this run at the founder's direction. This is the D-0030
finding, recorded rather than fixed here.

Methodology v1.34 added the missing step. `fold-note.md` records what it did
to these two pairs: the road-condition claim was folded onto the older claim,
and the four-year tax plan stays a question of its own.

## Topics

Waste collection has no topic in the site's vocabulary, so the nine questions
that are only about it carry none, which the register's own note says is the
shape for "no topic applies". A waste-and-utilities topic is a change under
`src/content/topics/` and is not in this run.

## Files

- `../../../intake/captures/edmonton-rant-and-rave-2026-09-10/` — the
  capture. A verbatim archive of a public thread, including things the site
  declined to check. Commenters and the post's author are pseudonymous.
- `source-note.md` — the paragraph every seat was given about this source.
- `extract-<seat>.json` — each seat's list, after the quote gate. `.raw.txt`
  is what the CLI printed.
- `quote-gate.md` — what was thrown out and why.
- `merged.json` — the claims, every form, and the dropped list.
- `groups.json` — the 21 questions and the claims under each.
- `triage-stories.md`, `triage-stories.json`, `triage-<reader>.raw.txt` —
  the two readers, their split, and the combined decision.
- `manifest.md` — every command, model and timing.
- `fold-note.md` — the two claims checked against the register afterwards,
  under methodology v1.34, and why one was folded and one was not.
