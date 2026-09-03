# Intake merge: three extractions into one list of propositions

Three cheap extractor seats each read the same captured thread and listed every
factual claim they found in it. They disagree about wording, about grouping,
and about what counts. Your job is to turn their three lists into **one** list
of propositions, and to account for every claim they raised.

You are merging, not extracting. Do not read the thread yourself and do not add
a claim no seat found. Do no research, and do not judge whether any claim is
true.

## What you are given

- Three extraction files, one per seat. Each is
  `{"claims":[{"id":"e-001","proposition":"…","side":"…","forms":[{"index":N,"commenter":"…","quote":"…"}]}]}`.
  Seat names are given with the files; use them exactly.
- `intake/register.yaml` — every claim the project has already registered,
  with its `id` and `wording`.
- The list of questions on already-published claim pages, each with its claim
  id (the file's basename).

## Merging

Two extractor claims become one proposition when **the same evidence would
settle both**. Same number in different units, an assertion and its flat
denial, the same event described from two sides — one proposition.

Two claims stay apart when a record could settle one and leave the other open.
"$100 million is 1% of the roads capital budget" and "$100 million is over four
years, not one" are different propositions even though they come from one
sentence.

Write the merged `proposition` in plain words, one sentence, self-contained,
as the thing that would have to be true. Prefer the clearest of the seats'
wordings; sharpen it if all three are vague. State it in the direction the
commenter asserted it, not as a question.

`side` is which side of the bike-lane spending argument the proposition serves:
`for`, `against`, or `neither`. Where seats disagree, decide it yourself from
the forms.

## Forms

Carry **every** form from every seat onto the proposition it belongs to. A form
is `{"index":N,"commenter":"…","quote":"…","seats":["haiku","flash","luna"]}`
where `seats` lists the seats that found that form. Two seats quoting the same
comment with slightly different substrings are one form: keep the fuller quote
and list both seats. Keep each quote under 60 words; if the seats' quotes are
longer, trim to the part that carries the claim, still verbatim.

`commenters` is the count of **distinct** commenter labels across the forms —
the number of different people who asserted the proposition, not the number of
forms.

## Relation to what is already registered

Every proposition gets a `relation`:

- `"new"` — nothing in the register and no published claim asserts this
  proposition.
- `{"variation-of": "<id>"}` — this is the same proposition as an existing
  register entry or a published claim, in different words. Use the register
  entry's `id` or the published claim's id. Same proposition means the same
  evidence settles both; a claim about a neighbouring subject is `new`.

Judge this against the register `wording` and the published `question`, not
against your memory of the project.

## The hard rule

**Every extractor claim id from every seat must be accounted for.** Each one
appears either in some proposition's `from` list, or in the top-level
`dropped` list with a one-sentence reason. Nothing may appear in both, and
nothing may go missing. The permitted reasons are:

- `not a claim` — opinion, insult, prediction, or a value judgement the seat
  mislabelled.
- `duplicate quote` — the same form the same seat already emitted under another
  id.
- `not about Edmonton civic government` — out of scope for this project.

If a claim is thin but real, keep it; `dropped` is for the three reasons above,
not for claims you find uninteresting.

## Output

A single JSON object, and nothing else — no markdown fence, no commentary:

```json
{
  "propositions": [
    {
      "id": "cycling-trips-1-3-million",
      "proposition": "Edmonton's automated counters recorded about 1.3 million cycling trips in the first seven months of 2026.",
      "side": "for",
      "relation": "new",
      "commenters": 2,
      "from": {"haiku": ["e-004"], "flash": ["e-002"], "luna": ["e-011"]},
      "forms": [
        {"index": 2, "commenter": "Boreal Hare I.", "quote": "Edmonton recorded nearly 1.3 million cycling trips across its automated counters", "seats": ["haiku", "flash", "luna"]}
      ]
    }
  ],
  "dropped": [
    {"seat": "flash", "id": "e-031", "reason": "not a claim — a prediction about what council will do next year."}
  ]
}
```

`id` is a short slug, unique in the file, describing the proposition.
`from` maps each seat name to the extractor ids it contributed; omit a seat
that found nothing for that proposition.

Order the propositions by how many seats found them, most first.
