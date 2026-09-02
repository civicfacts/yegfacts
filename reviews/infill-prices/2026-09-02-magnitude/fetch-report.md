## Evidence fetch report (round 2 input)

All 13 cited URLs returned HTTP 200 and were hashed and staged; no fetch
failed. Two of them returned something other than the cited document under
that 200, so the archived bytes cannot verify what they were cited for:

- https://dev.socrata.com/foundry/data.edmonton.ca/24uj-dj8v — 200, body is the
  Socrata Developer Portal shell (33,899 bytes): an empty `<h1 id="title">`, no
  occurrence anywhere in the bytes of the dataset id it was cited for, the field
  documentation rendered client-side.
- https://dev.socrata.com/foundry/data.edmonton.ca/qi6a-xuwt — 200,
  byte-identical to the URL above (both sha256
  `efb8be0979efa05e9d0c42777c7978f814da5eb8edb6ffd8670138ef8ace83e4`), so the
  archived bytes cannot distinguish the two datasets.

Both are the same soft-404 recorded in the 2026-09-01-rerun2 report; the pages
have not recovered. GPT cited them as challenging evidence on the field
definitions behind `ip-teardown-price-gap`. The field documentation is not in
the archived bytes, so neither was ingested.

The remaining 11 URLs staged as their real documents. Two Socrata dataset
landing pages (`data.edmonton.ca/.../qi6a-xuwt`, `.../24uj-dj8v`) carry the
correct `<title>` and their column metadata in the page payload; the "not
found" strings in them are the portal's own i18n message table, not a 404.

One pair among the 11 is the same document fetched twice: the 2023 Redeveloping
Area Infill Annual Report with and without a `?cb=` cache-buster, identical
bytes, already YF-EV-0048.

### Registry disposition

Already held by sha256 or URL from this story's earlier runs, so not
re-ingested: YF-EV-0041, YF-EV-0044, YF-EV-0047, YF-EV-0048 (both URL forms),
YF-EV-0055, YF-EV-0101, YF-EV-0108.

Newly ingested, each cited as supporting evidence for a key finding:

- YF-EV-0111 — 2025 Assessment Methodology: Residential Improved Properties
  (City of Edmonton), cited by Claude for the valuation and condition dates the
  roll value carries.
- YF-EV-0112 — The City Plan - Economic, Demographic and Market Study (City of
  Edmonton / Watson & Associates), cited by GPT for the stated developer
  site-selection motive.
- YF-EV-0113 — Section 814 Mature Neighbourhood Overlay, Zoning Bylaw 12800
  webdocs consolidation (City of Edmonton), cited by Claude for the RF1-RF5
  site-zoning condition.

All three are City of Edmonton documents whose archived bytes carry no
redistribution grant, so all three are `unclear` and archived private.
