<!-- Faithfulness check 1 (methodology stage 6), GPT seat: OpenAI gpt-5.6-sol via codex exec, effort high. Run 2026-09-01 by Stew. -->

Model: GPT-5.6 Sol

### Flagged items

- `infill-prices.mdx:5,43-46`; `ip-teardown-price-gap.yaml:32`; `infill-prices.ts:27-30`; `YF-EV-0101.yaml:8`  
  **Text:** “286 new single-detached houses ... 387 demolished, a net loss of 101.”  
  **Evidence:** Archive inspection recorded in `errata.md` found none of those figures. The report says a net loss of 294 single-detached houses.  
  **Fix:** Remove 286/387/101, correct the registry and calculation, and use only the verified net figure.

- `infill-prices.mdx:28-33,110`  
  **Text:** “most Edmonton infill arguments”; “circulating”; “affordable to anyone.”  
  **Evidence:** No captured source establishes the argument’s prevalence or circulation. The brief tests affordability for a hypothetical median-income household, not “anyone.”  
  **Fix:** Say “The argument examined here...” and name the brief’s household.

- `infill-prices.mdx:51-57`; `ip-teardown-price-gap.yaml:46`; `YF-EV-0103.yaml:8`  
  **Text:** “The City also counts what replaced them”; the permit mix “is the reason” eight row houses are worth more together and less each.  
  **Evidence:** YF-EV-0103 reports city-wide approvals and product mix, not matched teardown replacements, prices, or assessed values. Only one reviewer’s contested reconstruction reports the value pattern.  
  **Fix:** Attribute and narrow this to that reviewer’s reconstructed matched set.

- `infill-prices.mdx:77-79`; `ip-teardown-price-gap.yaml:42`; `YF-EV-0053.yaml:8`  
  **Text:** The City request establishes that the matched comparison “did not exist.”  
  **Evidence:** The archive establishes that the City was asked to analyze the issue. Non-publication is a run search conclusion; nonexistence does not follow.  
  **Fix:** Say “the run found no published matched comparison by the freeze date.”

- `infill-prices.mdx:93-95`  
  **Text:** “Read by title rather than by dwelling, the same set runs the other way.”  
  **Evidence:** The run reports 62.0% higher per classified dwelling, 93.2% higher by undivided title, and 99.6% higher by lot. They do not run in opposite directions.  
  **Fix:** State the three percentages and say title and lot results are stronger.

- `ip-teardown-price-gap.yaml:34`  
  **Text:** The 2023 report “establishes that the City holds the demolition-for-infill frame this claim needs.”  
  **Evidence:** It publishes aggregate demolition counts, not the required permit-level cohort and identifiers.  
  **Fix:** Limit this to aggregate counts.

- `infill-prices.mdx:120-127`; `ip-infill-affordable.yaml:37`; `YF-EV-0059.yaml:7`  
  **Text:** “Every input ... is published except” income; YF-EV-0059 is cited for $90,000 and $2,250.  
  **Evidence:** The Census archives failed. YF-EV-0059 concerns economic families, not the declared household income. Sale prices and condominium fees were also unavailable. Its “without changing which dwelling types pass” language is run arithmetic, not StatCan evidence.  
  **Fix:** Cite the fetch report and YF-EV-0049 for the declared figure, disclose every missing input, and attribute sensitivity results to the run.

- `infill-prices.mdx:8,98-100,132-135`; `ip-teardown-price-gap.yaml:48`; `ip-infill-affordable.yaml:61`  
  **Text:** Bounds and “single-title” populations read as established classifications.  
  **Evidence:** The seat inferred title form and produced 2,995.6 “dwelling units,” which the errata says violates the discrete-unit frame.  
  **Fix:** Call these seat-inferred proxy classifications and label the bounds nonconforming.

- `ip-teardown-price-gap.yaml:66`; `ip-infill-affordable.yaml:45`  
  **Text:** Records and contract rents “do not exist” or no published source provides them.  
  **Evidence:** The run did not locate open cohort data. YF-EV-0036 says sale records exist parcel-by-parcel for a fee; YF-EV-0039 only establishes CMHC survey scope.  
  **Fix:** Say “the run found no open cohort-level source.”

- `ip-teardown-price-gap.yaml:73`  
  **Text:** “Larger consolidated sites are the likelier misses.”  
  **Evidence:** No miss analysis establishes this.  
  **Fix:** Delete or label it an untested hypothesis.

- `ip-infill-affordable.yaml:43`; `YF-EV-0105.yaml:7`  
  **Text:** CMHC distribution for “homeowner and condominium units.”  
  **Evidence:** Errata says the captured selector covers single- and semi-detached units only.  
  **Fix:** Correct the scope or omit the comparator.

- `ip-teardown-price-gap.yaml:91`; `ip-infill-affordable.yaml:99`  
  **Text:** “No published lot-level study exists”; “Without the purchase price ... the test has nothing to run on.”  
  **Evidence:** YF-EV-0055 is a published lot-level analysis. The frozen brief expressly permits first-full-roll assessed value as fallback, and one seat ran it.  
  **Fix:** Qualify the first as no study matching the proposition; record the second as a reviewer error, not a finding.

- `infill-prices.ts:122`; `ip-infill-affordable.yaml:83`  
  **Text:** Lower bound treats unclassified dwellings as “meeting” the threshold; component medians follow `$3,948` as if additive.  
  **Evidence:** The numerator excludes the 225 unclassified cases, so they are treated as below threshold. The components sum to $3,941.67 because medians do not add.  
  **Fix:** Reverse the comment and state that component medians are separate distributions.

- `infill-prices.mdx:141-143`  
  **Text:** “The City’s legal definition.”  
  **Evidence:** YF-EV-0050 is a City guidebook/program definition, not legislation.  
  **Fix:** Say “the City’s affordable-housing program definition.”

REVISE