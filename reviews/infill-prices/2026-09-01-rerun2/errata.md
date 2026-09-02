# Errata: infill-prices, run 2026-09-01-rerun2

No MATERIAL FRAMING CONCERN was raised in either round, so unlike the
2026-09-02 run this one synthesised: `ip-teardown-price-gap` Not
established / Unanimous, `ip-infill-affordable` Not established / Split,
both on the round-1 basis.

Round 2 is an error-documentation round and cannot move a canonical
finding. The concrete errors each seat documented in another's review,
as recorded in the round-2 files, are below. Nothing here has been
adjudicated; it is the record of what was alleged and by whom.

## Documented by Claude Fable 5.1

- Against GPT, claim 1: the figures "286 new single-detached houses were
  built while 387 were demolished ... a net loss of 101" do not appear in
  the 2024 Redeveloping Area Infill Report at the cited URL. Claude
  extracted the report on 2026-09-02 and searched for 286, 387 and 101;
  the report states a net loss of 294 single detached houses in 2024. The
  direction of GPT's point survives; the numbers do not.
- Against GPT, claim 2: the CMHC absorbed-price table is described as
  covering "homeowner and condominium units". The table's type selector
  is single and semi-detached only, so the "411 units, median $592,500"
  figure says nothing about new row or apartment prices. Claude could not
  retrieve the 2025 annual cell to confirm the count.
- Against GPT, claim 1: "The General Building Permits dataset lacks a
  parcel identifier." It carries no account number, but it does carry a
  `legal_description` field, as do the assessment datasets — the join key
  Claude used to match 3,420 of 3,457 detected lots to a permit.
- Against GPT, claim 1: the Dawang analysis is labelled "advocacy". It is
  a personal analytical post on the same open datasets, and its stated
  counts are as both seats reported; it should be labelled an
  analytical-report and weighted as non-peer-reviewed.
- Against Gemini, both claims: the review cites no evidence and concludes
  the claims are "impossible" to test because no pre-compiled public
  report exists. That the compiled file does not exist is true; that the
  claims cannot be tested does not follow, since every input the brief
  requires for claim 1 is published.
- Against Gemini, both claims: it names the City as the likely holder of
  a matched demolition-to-replacement dataset. The City already publishes
  the components; the genuinely missing pieces sit with Alberta Land
  Titles, the REALTORS Association, and the City's inspection system.
- Against GPT and Gemini, claim 1: neither states the bounds the brief's
  verdict mapping requires, so their Not established is untested rather
  than wrong.

## Documented by GPT-5.6 Sol

- Against Claude, claim 1: the 62.0-percent and 88.4-percent results are
  attributed to the historical assessment dataset URL, which holds raw
  records, not those matched results. No code, row-level output or
  working file was included, so the derived figures cannot be checked
  from the cited source.
- Against Claude, claim 1: the declared frame of 2016-2025 residential
  demolition permits was replaced with an assessment-detected candidate
  set (8-metre point match, zoning, lot-size, value and age filters), and
  last-standing-roll year was substituted for demolition-permit year.
  That changes the population and cohort rather than filling in missing
  fields.
- Against Claude, claim 1: 2,995.6 unclassified replacement dwelling
  units and a denominator of 9,598.6. A self-contained dwelling unit is
  counted once and cannot be fractional, so the reported bounds do not
  conform to the brief.
- Against Claude, claim 1: title form and dwelling distribution were
  inferred from assessment-title counts against permit units-added
  counts; the assessment dataset identifies neither, and the rule does
  not say which units belong to which title when several share a lot.
- Against Claude, claim 1: the first full roll was operationalised with
  an unpredeclared 30-percent next-roll stabilization rule and a
  September 30 occupancy cutoff. The growth rule uses the outcome series
  to decide inclusion and can preferentially exclude low or delayed
  assessments.
- Against Claude, claim 1: the mature subset uses a neighbourhood-level
  layer as a proxy and never applies the bylaw's parcel-by-parcel RF1-RF5
  site-zoning condition.
- Against Claude, claim 1: the post-2018 under-capture of teardowns is
  plausible but not established by falling demolition-description counts
  set against a separate total of approved dwelling units, which have a
  different denominator.
- Against Claude, claim 2: assessed value was used as the price for every
  dwelling because no sale source was publicly accessible. Lack of access
  does not establish that no first arm's-length sale existed.
- Against Claude, claim 2: 2,968 divided by 3,584 is called the lower
  bound "with unclassified dwellings treated as meeting the threshold",
  but the numerator excludes all 225 unclassified dwellings. The
  arithmetic is the lower bound; the description is reversed.
- Against Gemini, both claims: absence of a pre-compiled report and an
  inability to run the join were treated as evidence the claims could not
  be tested.
- Against Gemini, claim 2: it identifies the City as the likely holder of
  first arm's-length sale prices; those sit with Alberta Land Titles and
  MLS participants, and the City assessment table publishes no
  transaction prices.

## Documented by Gemini 3.1 Pro

- Against GPT, claim 2: it held that the claim could not be established
  without an open dataset of first arm's-length sale prices, which
  ignores the brief's instruction to use the total assessed value on the
  first full roll where no sale is recorded.
- Against GPT, claim 1: it treated a missing parcel crosswalk as making
  the claim untestable rather than attempting a spatial or address-based
  match.

## Verdict movement between rounds

Gemini moved `ip-infill-affordable` from Not established to Supported,
recording as its reason that Claude's operationalisation of the
assessment data supplied a price basis whose 82.8-percent lower bound
clears the 50-percent threshold. No other seat moved on either claim. The
canonical findings rest on round 1 and are unaffected.
