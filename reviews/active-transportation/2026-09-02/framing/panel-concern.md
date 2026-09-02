# MATERIAL FRAMING CONCERN raised in round 1 (recorded verbatim)

Synthesis of run `2026-09-02` halts on this string (methodology v1.2).
Per docs/DESIGN.md section 5 stage 4, the brief is revised and round 1
is rerun blind under the revised brief in a fresh directory; this
run's artifacts stay as the record.

## Claude Fable 5.1 seat, claim `at-100m-vs-snow`

From `round1/claude.json`, `interpretation_notes`, verbatim:

> MATERIAL FRAMING CONCERN. The brief fixes the primary denominator as
> 'the approved 2022 gross Snow and Ice Control expenditure budget, the
> annual budget in force when the statement was captured'. The public
> record holds two different 'approved 2022' gross figures and the
> verdict word flips between them.

The seat computed 1.571 (Partially supported) on the base budget it read
as 63,666 and 1.26 (Contradicted) on the budget as amended in-year to
79,474, both in $000s, and asked that the brief name one.

## What the other two seats did with the same wording

- GPT-5.6 Sol read the primary denominator as the base 2022 gross
  budget of 64,466 plus the one-time $4,700 top-up council approved on
  2022-07-04: 69,166, ratio 1.446, Contradicted; without the top-up
  1.551, Partially supported. No framing concern raised.
- Gemini 3.1 Pro read it as $56.6 million, ratio 1.76, Partially
  supported. No framing concern raised.

Three seats, three denominators, two verdict words, from one sentence
of the brief. The concern is upheld: the brief's phrase "in force when
the statement was captured" did not name a document cell, and the
document holds several candidate figures (branch summary net, program
summary gross, in-year amendments). The rerun brief names the cell.
