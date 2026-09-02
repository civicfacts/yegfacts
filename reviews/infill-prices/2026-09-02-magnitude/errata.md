# Errata: infill-prices, run 2026-09-02-magnitude

No MATERIAL FRAMING CONCERN was raised in either round, so this run
synthesised: `ip-teardown-price-gap` Not established / Unanimous, on the
round-1 basis.

Round 2 is an error-documentation round and cannot move a canonical
finding. The concrete errors each seat documented in another's review,
as recorded in the round-2 files, are below. Nothing here has been
adjudicated; it is the record of what was alleged and by whom.

## Documented by Claude Fable 5.1

- Against Gemini: the review reports `evidence_basis` "direct-edmonton"
  and confidence High while citing no source at all — both
  `supporting_evidence` and `challenging_evidence` are empty and no URL
  is recorded, so no statement in it can be checked.
- Against Gemini: the limitation that the join "requires bespoke
  scripting ... which does not exist as an authoritative public report"
  overstates the gap. Jacob Dawang's published analysis (2026-08-04, code
  on GitHub) joined 2024 RS-zone permits to the 2024 and 2026 rolls by
  legal description, proximity and address, with both values on 95
  percent of 1,242 lots. It measures uplift rather than the brief's ratio
  and does not settle the claim, but "no such join exists" is inaccurate.
- Against Gemini: the suggested short answer's "While it is a common
  assumption that infill homes are much more expensive than the older
  homes they replace" asserts a prevalence the brief says was not
  established from this intake.
- Against GPT: "residential occupancy dates are populated only for
  permits finalized from 2022 onward" is off by a year and misnames the
  field. By issue year, `occupancy_granted_date` carries 3,167 populated
  rows for 2021 permits and 247 for 2020. The substantive point — that
  pre-2021 completion dates are absent from the permit record — stands.
- Against GPT: `source_date` "2023" for the 2023 Redeveloping Area Infill
  Annual Report. The report covers 2023 and was published in 2024.
- Against GPT: the 2024 report's "six percent" semi-detached share is
  stated for the 2021-2024 period as well as for 2024; GPT presents it as
  a 2024-only figure, and omits the 2024 counts (221 net new
  semi-detached units, a net loss of 294 single detached houses).
- Against GPT: the review treats the record as containing no unit-level
  evidence at all, listing none of the eight case ratios Claude reported
  in round 1. "Not established because the data cannot be produced" and
  "Not established because nobody has produced it" are different
  findings, and only the second is true.

## Documented by GPT-5.6 Sol

- Against Claude: 5,672 records are described as approximately the
  primary demolition frame, but the filter is limited to records coded as
  single-detached houses, includes some garage-only descriptions, and was
  not shown to capture every eligible residential demolition. These are
  candidate records, not a validated count of the brief's frame.
- Against Claude: the statement that a legal-description-only join
  systematically drops subdivided two-dwelling replacements and therefore
  biases the result upward is stronger than the evidence permits. Three
  recovered split-lot cases establish a plausible linkage failure;
  neither its frequency nor its net effect was measured.
- Against Claude: the TL;DR gives the single-replacement constant-dollar
  range as about 2.3 to 3.9, omitting the reported Calder case at about
  1.71. The complete reported range is about 1.71 to 3.94.
- Against Claude: describing single-house replacements as producing
  ratios near or above 2.5 overgeneralizes — two of the five listed
  single-replacement cases are below 2.5, one below 2.0.
- Against Claude: Dawang's roughly $0.2M net uplift per home added is
  treated as consistent with replacement-unit ratios below 2.5. Net
  uplift divided by homes added is not the brief's replacement assessed
  value per dwelling divided by the demolished house's assessed value.
- Against Claude: the archived webdocs citation establishes the overlay's
  purpose and zoning-based area of application, but does not by itself
  verify the Appendix boundary or the consolidation in force on
  2023-12-31, so the required frozen subset remains unconstructed.
- Against Gemini: it equates the absence of a pre-joined or authoritative
  published dataset with the calculation being impossible. The defensible
  conclusion is that no conforming population calculation was produced.
- Against Gemini: "the public record lacks matched data" is imprecise. It
  lacks a published pre-computed match; the relevant raw records exist
  separately.
- Against Gemini: it supplies no evidence items or source URLs for its
  factual assertions, contrary to the review requirement.
- Against Gemini: it says only a City report, independent published
  analysis or pre-joined dataset would change its verdict. A transparent,
  reproducible reconstruction from the raw City records, with the
  required denominator, timing rules and bounds, would also qualify.

## Documented by Gemini 3.1 Pro

- Against Claude: the 40-permit probe computed constant-dollar ratios
  using the 2025 assessment roll for replacement dwellings completed in
  2019 and 2020. That violates the brief's "first full roll after
  completion" rule and inflates the replacement value by holding-period
  appreciation.
- Against GPT: the 2019 City Plan Market Study is classified as
  supporting evidence. That developers buy undervalued properties and
  sell at top-quartile prices establishes a mechanism and a directional
  gap, not the 2.5x magnitude or the 2.0x majority threshold this
  proposition requires.

## Verdict movement between rounds

No seat moved its verdict; all three recorded an empty `verdict_changes`
and stayed at Not established. Confidence moved without changing any
verdict: Claude Moderate to High, GPT Moderate to High, Gemini High to
Moderate. The canonical finding rests on round 1 and is unaffected.
