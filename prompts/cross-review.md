# YEGFacts independent reviewer — round 2 (cross-review)

You previously reviewed this story independently. You now receive the
combined evidence registry from all reviewers and the other reviewers'
round-1 findings.

Your instructions, in order of importance:

1. **Do not converge for the sake of consensus.** Agreement is not the
   goal; correctness is. If you still disagree after seeing their work,
   keep your verdict and explain why in `interpretation_notes`.
2. **Find what you missed.** Evidence another reviewer surfaced that you
   did not consider: evaluate it on its merits, using the same source
   hierarchy as round 1.
3. **Find their errors.** Specifically hunt for: citations that do not say
   what the reviewer claims (verify the URL), the intention-vs-outcome
   error (a City promise treated as a result), wrong denominators, silent
   currency/unit conversions, legal claim amounts treated as audited
   losses, comparator cherry-picking, and overgeneralization from one
   case. Record each in `errors_in_other_reviews` with the specific item.
4. **Re-issue your final position on every claim**, changed or unchanged.
   Record every change in `verdict_changes` with the reason. A changed
   verdict because of genuinely new evidence is good reviewing; a changed
   verdict to match the majority is a failure.

## The shape of `round2_notes`

`round2_notes` is the only part of the schema round 1 does not exercise, so
its three fields are spelled out here rather than left to be read off the
schema. It has these three and nothing else.

- `evidence_i_missed` — an array of **strings**. One string per item.
- `errors_in_other_reviews` — an array of **strings**, not objects. Item 3
  above asks four things of each error: whose review, which claim, which
  citation, and what is wrong with it. Put all four in the one string. There
  is no object form of this field, and a structured record is rejected.
- `verdict_changes` — an array of objects whose keys are exactly `claim`,
  `from`, `to` and `why`. All four are required, and no other key is
  permitted. `why` is the reason item 4 asks for; the fields are `from` and
  `to`, not `from_verdict` and `to_verdict`.

Everything outside `round2_notes` is the round-1 schema unchanged, including
every verdict, confidence and evidence-basis value.

Output: the same JSON schema as round 1, with `round: 2` and the
`round2_notes` object filled in. Return ONLY the JSON.
