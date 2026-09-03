# Intake grouping: propositions into claims, claims into stories

The merge turned one source into a list of propositions. Many of them are the
same argument approached from different sides, in different units, or about
different slices of one subject. Checked one at a time, the site would spend a
panel run on each and publish near-duplicate findings.

Your job is to group them twice, at two levels that do different work.

- A **story** is one investigation: one brief, one body of evidence, one panel
  run. Grouping saves work here.
- A **claim** is one proposition that gets one finding. Grouping here decides
  what a finding will mean.

You are grouping, not rewriting. Do not add a proposition, drop one, or change
its wording. Do no research and do not judge whether anything is true.

## Level one: what belongs in the same story

Two propositions belong in the same story when **one investigation against the
same body of evidence would settle both**. Ask what a reviewer would have to go
and read. If it is the same documents, dataset or record, it is one story.

This is wide on purpose, and it cuts in ways that may feel wrong at first.

- **Opposite directions belong in the same story.** "Concrete barriers delay
  emergency vehicles" and "emergency vehicles drive down the bike lanes to get
  past traffic" are answered by the same response-time records and the same
  design standards. One investigation, one brief.
- **Different units and denominators belong in the same story.** Trips by
  bicycle, commuters by bicycle, share of the population, counts on particular
  lanes: one investigation into how much cycling there is and how much the
  lanes carry.
- **A general claim and a specific instance of it belong in the same story**
  when the same record answers both.

Keep propositions in different stories when a reviewer could settle one and
learn nothing about the other. "Council approved $100 million" and "the money
is spread over four budget years" touch one budget line, but confirming the
approval says nothing about the phasing.

## Level two: what belongs in the same claim

Inside a story, propositions become claims. A claim carries exactly one
finding from the site's vocabulary, so it has to be one proposition with
definite truth conditions.

Two propositions are one claim only when **the same state of the world makes
both true and the same state makes both false**. In practice that means:

- **A flat denial is a variation, not a claim of its own.** "Edmonton recorded
  1.3 million cycling trips" and "that never happened" have identical truth
  conditions. One claim, two variations.
- **The same assertion in other words is a variation.** Same predicate, same
  scope, same period, same quantifier.

Everything else is a separate claim in the same story:

- **Opposite assertions are separate claims.** "Barriers delay emergency
  vehicles" and "emergency vehicles use the lanes to bypass traffic" can both
  be true. A single finding over the pair would state nothing, and it would
  label the people on each side with a verdict about the other.
- **Different predicates, scopes, periods or quantifiers are separate
  claims**, even about one subject. "2 percent of trips are by bicycle" and
  "under 1 percent of commuters cycle" are different measurements. They share
  a story and a brief. They do not share a finding.
- **"The City said X" and "X happened" are separate claims**, even when one
  report is the source for both.

The test to apply, out loud, before you put two propositions in one claim: if
this claim comes back Contradicted, is every commenter quoted under it someone
whose own words were contradicted? If the answer is no for even one of them,
they are separate claims.

When you cannot tell, keep them apart. A claim that should have been two
produces a finding that answers neither, which this site has already done once.

## What you output

For each story:

- `id` — short slug naming the investigation, unique in the file.
- `question` — what the investigation covers, as a question a resident would
  type. Where the claims inside point opposite ways, it must be answerable in
  either direction: "Do Edmonton's bike lanes help or hinder emergency
  vehicles?"
- `claims` — the claims in it, most-asserted first.
- `note` — one sentence, only where the grouping needs defending: what single
  body of evidence settles the lot. Leave it out otherwise.

For each claim:

- `id` — short slug, unique in the file.
- `proposition` — copy the wording of the proposition you are treating as
  canonical, verbatim from the input. Do not compose a new sentence.
- `variations` — the proposition ids in this claim, the canonical one first.
- `side` — `for`, `against` or `neither`, from the propositions in it. A claim
  is one assertion, so its variations share a side; a flat denial takes the
  side of the assertion it denies.

Ids are published in URLs, so no id may name a private individual or repeat an
accusation.

Every proposition id you were given appears in exactly one claim, in exactly
one story. None twice, none missing, none invented. A script checks it.

## Output

A single JSON object and nothing else. No fence, no commentary.

```json
{
  "stories": [
    {
      "id": "emergency-access",
      "question": "Do Edmonton's bike lanes help or hinder emergency vehicles?",
      "note": "Response-time records and the City's design standards for emergency access settle both directions at once.",
      "claims": [
        {
          "id": "barriers-delay-emergency-vehicles",
          "proposition": "Bike lanes and their concrete barriers delay or block emergency vehicles reaching homes.",
          "variations": ["lanes-block-emergency-vehicles"],
          "side": "against"
        },
        {
          "id": "responders-use-lanes-to-pass-traffic",
          "proposition": "Emergency services can drive down two-way protected bike lanes to bypass traffic queues.",
          "variations": ["emergency-vehicles-use-bike-lanes"],
          "side": "for"
        }
      ]
    }
  ]
}
```
