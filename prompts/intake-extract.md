# Intake extraction: every factual claim in one source

You are extracting claims from a captured public thread — a social post and
all of its comments. The unit of intake is the whole source. Your job is
inventory, not selection: an editor is not choosing which claims are
interesting, so you must not choose either.

Read the whole thread before you write anything.

## What you are given

A flat list of comments. Each entry looks like:

```
[12] Snowy Hare F. (reply to 4):
the text of comment 12
```

The number in brackets is the comment index — the id you cite. `(reply to N)`
means this comment answers comment N. Commenters are pseudonyms, stable within
the thread; use them exactly as printed.

Reply chains carry meaning. A comment often only states a claim by reference:
"that never happened" in comment 4 replies to comment 2, so it asserts that the
1.3 million cycling trips in comment 2 did not happen. Resolve the reference
before you decide whether there is a claim, and write the proposition out in
full so it stands alone.

## What counts as a claim

List **every materially factual claim** in the thread about Edmonton civic
government, its spending, infrastructure, plans, or their effects. A claim is
something that a record, a count, or a measurement could show to be true or
false.

Include:

- Numbers, budgets, counts, dates, votes, and what a document or official said.
- A factual premise sitting inside an opinion. "Waste of money, nobody rides
  them" is an opinion with a claim inside it: that nobody rides the lanes.
- A claim made by denying someone else's ("that never happened").
- A claim about effects: congestion, safety, business, snow clearing, traffic.

Exclude:

- Pure opinion, preference, values, and taste ("bike lanes are ugly").
- Insults, jokes, and abuse with no factual premise.
- Predictions and hypotheticals about the future ("this will bankrupt us"),
  unless they assert a present or past fact as their basis.
- Anything not about Edmonton civic government, its spending, infrastructure,
  plans, or their effects — provincial or federal politics on their own, other
  cities on their own, national culture-war material.
- Questions, unless the question asserts the fact it asks about ("why are they
  removing lanes all over the city?" asserts that they are).

Do **no research**. Do **not** judge whether any claim is true. Do not soften,
correct, or fact-check a claim; record what was asserted.

## Grouping

Several commenters often assert the same proposition in different words. Put
them under **one** claim group with one proposition and every form listed in
`forms`. Two claims belong in the same group only if the same evidence would
settle both. "Nobody rides the bike lanes" and "less than 1% of commuters
cycle" are the same proposition in different units — group them. "$100 million
is 1% of the roads budget" and "$100 million is double the snow budget" are two
propositions — keep them apart.

## Each claim carries

- `id` — `e-001`, `e-002`, … in the order you emit them.
- `proposition` — plain words, one sentence, what would have to be true for
  the claim to hold. Self-contained: a reader who has not seen the thread must
  understand it. No hedging, no verdict.
- `side` — which side of the bike-lane spending argument the claim serves:
  `for` (supports the spending or the lanes), `against` (opposes them), or
  `neither`.
- `forms` — every place the claim appears, each with:
  - `index` — the comment index, an integer.
  - `commenter` — the pseudonym exactly as printed.
  - `quote` — an **exact substring of that comment's text**. Copy it
    character for character; do not tidy spelling, punctuation, or capitals.
    Quote the claim, not the whole comment: keep it under 60 words.

Two rules about quotes are checked by a script after you finish, and a form
that fails either is thrown out:

1. **The quote must be one unbroken run of the comment.** If the words you
   want are split by a sentence you do not want, either quote the shorter run
   or give two forms. Never stitch two parts together, with or without an
   ellipsis, and never repair a typo: "The signed a agreement" stays exactly
   that.
2. **The index must be the comment the words are in.** Comment indexes run
   from 1 to the last comment in the thread and no further. Copy the index
   from the line you are quoting rather than reconstructing it, and never
   cite an index the thread does not have.

Getting a claim right and its quote wrong is worse than not finding the
claim: a wrong quote is a false attribution to a real person.

## Output

First, one short text block stating your model name and version.

Then a single JSON object, and nothing else — no markdown fence, no commentary:

```json
{"claims":[{"id":"e-001","proposition":"Edmonton recorded about 1.3 million cycling trips on its automated counters in the first seven months of 2026.","side":"for","forms":[{"index":2,"commenter":"Boreal Hare I.","quote":"Edmonton recorded nearly 1.3 million cycling trips across its automated counters"}]}]}
```

Completeness is the measure of this job. A thread of several hundred comments
holds dozens of claims; missing one is the failure mode that matters, and a
marginal claim you were unsure about is better listed than dropped.
