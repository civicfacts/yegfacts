# Intake grouping: merged claims into claims, claims into questions

The merge turned one source into a list of claims. Many of them are the same
argument approached from different sides, in different units, or about
different slices of one subject. Checked one at a time, the site would spend a
panel run on each and publish near-duplicate findings.

Your job is to group them twice, at two levels that do different work.

- A **question** is one unit of work: one brief, one body of evidence, one
  panel run. Grouping saves work here.
- A **claim** is one assertion that gets one finding. Grouping here decides
  what a finding will mean.

You are grouping, not rewriting. Do not add a merged claim, drop one, or change
its wording. Do no research and do not judge whether anything is true.

## Level one: what belongs under the same question

Two merged claims belong under the same question when **one investigation
against the same body of evidence would settle both**. Ask what a reviewer
would have to go and read. If it is the same documents, dataset or record, it
is one question.

This is wide on purpose, and it cuts in ways that may feel wrong at first.

- **Opposite directions belong under the same question.** "Concrete barriers
  delay emergency vehicles" and "emergency vehicles drive down the bike lanes
  to get past traffic" are answered by the same response-time records and the
  same design standards. One question, one brief.
- **Different units and denominators belong under the same question.** Trips by
  bicycle, commuters by bicycle, share of the population, counts on particular
  lanes: one question about how much cycling there is and how much the lanes
  carry.
- **A general claim and a specific instance of it belong under the same
  question** when the same record answers both.

Keep them under different questions when a reviewer could settle one and learn
nothing about the other. "Council approved $100 million" and "the money is
spread over four budget years" touch one budget line, but confirming the
approval says nothing about the phasing.

## Level two: what belongs in the same claim

Under a question, merged claims are folded into claims. A claim carries exactly
one finding from the site's vocabulary, so it has to be one assertion with
definite truth conditions.

Two merged claims are one claim only when **the same state of the world makes
both true and the same state makes both false**. In practice that means:

- **A flat denial is another wording, not a claim of its own.** "Edmonton
  recorded 1.3 million cycling trips" and "that never happened" have identical
  truth conditions. One claim, two wordings.
- **The same assertion in other words is another wording.** Same predicate,
  same scope, same period, same quantifier.

Everything else is a separate claim under the same question:

- **Opposite assertions are separate claims.** "Barriers delay emergency
  vehicles" and "emergency vehicles use the lanes to bypass traffic" can both
  be true. A single finding over the pair would state nothing, and it would
  label the people on each side with a verdict about the other.
- **Different predicates, scopes, periods or quantifiers are separate
  claims**, even about one subject. "2 percent of trips are by bicycle" and
  "under 1 percent of commuters cycle" are different measurements. They share a
  question and a brief. They do not share a finding.
- **"The City said X" and "X happened" are separate claims**, even when one
  report is the source for both.

The test to apply, out loud, before you fold two merged claims into one: if
this claim comes back Contradicted, is every commenter quoted under it someone
whose own words were contradicted? If the answer is no for even one of them,
they are separate claims.

When you cannot tell, keep them apart. A claim that should have been two
produces a finding that answers neither, which this site has already done once.

## What you output

For each question:

- `id` — short slug naming the question, unique in the file. It becomes a
  permanent address the day it is registered, so it names the question and not
  the state of the work on it.
- `question` — what it covers, as a question a resident would type. Where the
  claims under it point opposite ways, it must be answerable in either
  direction: "Do Edmonton's bike lanes help or hinder emergency vehicles?"
- `claims` — the claims under it, most-asserted first.
- `note` — one sentence, only where the grouping needs defending: what single
  body of evidence settles the lot. Leave it out otherwise.

For each claim:

- `id` — short slug, unique in the file, and a permanent address too.
- `claim` — copy the wording of the merged claim you are treating as canonical,
  verbatim from the input. Do not compose a new sentence.
- `merged_from` — the merged-claim ids folded into it, the canonical one first.
- `side` — `for`, `against` or `neither`, from the merged claims in it. A claim
  is one assertion, so everything folded into it shares a side; a flat denial
  takes the side of the assertion it denies.

Ids are published in URLs, so no id may name a private individual or repeat an
accusation.

Every merged-claim id you were given appears in exactly one claim, under
exactly one question. None twice, none missing, none invented. A script checks
it.

## Output

A single JSON object and nothing else. No fence, no commentary.

```json
{
  "questions": [
    {
      "id": "emergency-access",
      "question": "Do Edmonton's bike lanes help or hinder emergency vehicles?",
      "note": "Response-time records and the City's design standards for emergency access settle both directions at once.",
      "claims": [
        {
          "id": "barriers-delay-emergency-vehicles",
          "claim": "Bike lanes and their concrete barriers delay or block emergency vehicles reaching homes.",
          "merged_from": ["lanes-block-emergency-vehicles"],
          "side": "against"
        },
        {
          "id": "responders-use-lanes-to-pass-traffic",
          "claim": "Emergency services can drive down two-way protected bike lanes to bypass traffic queues.",
          "merged_from": ["emergency-vehicles-use-bike-lanes"],
          "side": "for"
        }
      ]
    }
  ]
}
```
