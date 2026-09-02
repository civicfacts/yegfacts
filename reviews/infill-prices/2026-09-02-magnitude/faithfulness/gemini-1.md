<!-- Faithfulness check 1 (stage 6), Gemini seat: Gemini 3.1 Pro via agy, effort high. Run 2026-09-02 by Stew. A first invocation produced no output (the model reached for a shell command the sandbox denies); this is the second, with file tools only. -->

Gemini 3.1 Pro (High)

**Flagged Items:**

1. `scripts/calcs/infill-prices.ts`
- **Quoted text:** `utilitiesAlbertaAnnualCAD: 4_532`
- **What the evidence says:** The script attributes this figure to `YF-EV-0107` (Statistics Canada table 11-10-0222-01). The registry entry `evidence/registry/YF-EV-0107.yaml` does not contain the 4,532 figure in its `establishes` line (it only notes that it establishes the provincial average). Furthermore, the archived bytes (`evidence/private/YF-EV-0107-tv.action`) only contain data for the "Canada" geography and do not carry the Alberta data or the 4,532 figure. 
- **Fix:** Update the registry entry and the private archive to contain the Alberta data and the 4,532 figure, or remove the unsupported figure.

2. `src/content/stories/infill-prices.mdx`
- **Quoted text:** "The $90,000, which works out to a $2,250 a month shelter limit, is cited to two Census Profile pages that returned a File not found body when the run archived them, so it rests on the run's fetch report and on the City's own affordability report in the registry, which states the same figure."
- **What the evidence says:** The registry entry for the City's 2024 Monitoring Market Housing Affordability Report (`evidence/registry/YF-EV-0049.yaml`) establishes that benchmark row and apartment products were affordable on the City's method, while single and semi-detached were not. The `establishes` line does not state the $90,000 median household income figure, meaning the story makes the source establish more than its `establishes` line.
- **Fix:** Update the `establishes` line of `YF-EV-0049.yaml` to include the $90,000 median household income figure, or revise the story to not claim the registry entry states it.

3. `src/content/claims/ip-teardown-price-gap.yaml` and `src/content/stories/infill-prices.mdx`
- **Quoted text (Claim):** "1,492 permits consolidated to 1,242 lots, of which 1,182 carried both values"
- **Quoted text (Story):** "matched 1,242 lots and got values at both ends on 1,182 of them"
- **What the evidence says:** The cited source's registry entry (`evidence/registry/YF-EV-0055.yaml`) states "1,242 distinct lots, 95 percent matched to both a 2024 baseline and a 2026 completed assessed value". It does not carry the "1,492 permits" or "1,182" lots figures. A search of the attributed run artifacts (`reviews/infill-prices/2026-09-02-magnitude/`) confirms neither figure is carried by the run artifacts (though the $0.2M uplift figure is correctly carried by `synthesis.json`).
- **Fix:** Revise the claim and story to use the 1,242 lots and 95 percent figures carried by `YF-EV-0055.yaml`, or update the `establishes` line of `YF-EV-0055.yaml` to include the 1,492 and 1,182 figures.

**REVISE**
