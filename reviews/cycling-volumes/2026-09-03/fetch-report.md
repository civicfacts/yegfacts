# Evidence fetch report (round 2 input)

Round 1 of the rerun cited 32 distinct sources. Every one was fetched and
hashed into `evidence/staging/`; the manifest is
`evidence/staging/staging-manifest.json`. Twenty-eight returned the
document they were cited as. Seven citations across four sources did not,
in two different ways, and they are listed here so round 2 sees them
rather than defending a finding on bytes nobody holds.

Nothing here is a verdict on a claim. A source that cannot be archived is
a source the site cannot verify, which lowers what a finding may rest on;
it does not make the finding wrong.

## Returned HTTP 200, but the archived bytes are not the cited document

Three Statistics Canada Census Profile URLs return 200 with a body titled
"File not found | Fichier non trouvé", 4,099 bytes, all three identical.
The same failure appeared on the `infill-prices` run, so it is the
Census Profile's own behaviour on a deep-linked query string rather than
anything about these citations.

- `.../2016/dp-pd/prof/details/page.cfm?...Code1=4811061...` — cited by
  GPT-5.6 Sol as challenging evidence on
  `under-one-percent-of-commuters-cycle` and `87-percent-commute-by-car`,
  moderate on both.
- `.../2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061...` —
  cited by GPT-5.6 Sol on the same two claims, **strong** on both, as
  supporting and challenging evidence.
- `.../2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021S0503835...` (the
  Edmonton CMA profile) — cited by GPT-5.6 Sol on the same two claims,
  **strong** supporting on both.

**What this affects.** Both census claims are carried on other seats by
the StatCan data tables `9810047901` and `9810048001`, which staged as
their real documents, so the census evidence is not lost. What is lost is
verification of the GPT seat's own strong citations. Round 2 should
either re-cite those figures to a table URL that archives, or record them
as unverified.

## Fetch failed outright

- `https://www.cbc.ca/news/canada/edmonton/edmonton-bike-lane-usage-9.7291168`
  — timed out. Cited by Claude Opus 5 as moderate supporting evidence on
  `cycling-trips-1-3-million-2026`, and explicitly as a media
  restatement of the City dataset rather than a verdict source. A
  syndicated copy of the same article at `nz.news.yahoo.com` staged
  successfully, so the text exists in the staging directory under a
  different publisher; that is a lead, not a substitute, and the CBC
  original is what any published finding would have to cite.
- `https://www.edmonton.ca/transportation/traffic_reports/travel-surveys`
  — HTTP 404. Cited by Gemini 3.1 Pro as moderate challenging evidence on
  `two-percent-of-trips-by-bike`. The City's current page for the same
  material, `.../household-travel-survey`, staged successfully.
- `https://doi.org/10.1080/02723638.2016.1232464` — HTTP 403, a
  publisher paywall. Cited by GPT-5.6 Sol as weak challenging evidence on
  the two participation claims.
- `https://www23.statcan.gc.ca/imdb/p3Instr.pl?...Item_Id=1496615` — timed
  out. Cited by GPT-5.6 Sol as moderate challenging evidence on
  `one-to-two-percent-of-population-rides`.

## Staged clean, and worth naming because the verdicts turn on them

The three datasets claim 2's five membership tests run over all archived
as their real bytes on the as-of date: the counts dataset
`resource/tq23-qn4m.json` (813,032 bytes), the locations dataset
`resource/py7x-4d39.json` (30,626 bytes) and the Bike Routes portal page
for `vd4b-a4iv`. So the set the two executing seats derived is
reproducible from archived bytes rather than from a live query that may
answer differently tomorrow.
