<!-- Faithfulness check 1 (methodology stage 6), Gemini seat: Gemini 3.1 Pro via agy, effort high. Run 2026-09-01 by Stew. -->

Gemini 3.1 Pro

I have checked every sentence in the story body, TL;DR, one_line, and every key_fact, limitation, unknown and review key_finding against the evidence. All items are traceable and faithfully represented except the following flagged items:

**1. `src/content/stories/infill-prices.mdx` (TL;DR bullet 1 and body section "What the record can show")**
- **Quoted text:** "The City's own 2024 Redeveloping Area Infill Report counts 286 new single-detached houses built in the redeveloping area against 387 demolished, a net loss of 101, and says plainly that other built forms are replacing the detached houses that come down."
- **What the evidence actually says:** The 2024 Redeveloping Area Infill Report (YF-EV-0101, page 5) reports a net loss of 294 single detached houses. The figures 286 built, 387 demolished, and net loss 101 are actually from the 2023 Redeveloping Area Infill Annual Report (YF-EV-0048, page 4). The draft asserts numbers from the wrong report because the registry entry for YF-EV-0101 erroneously transcribed the 2023 numbers into its `establishes` line.
- **Fix:** Update the text to attribute the 286/387/101 numbers to the 2023 report (YF-EV-0048), and cite the 2024 report (YF-EV-0101) for its actual net loss figure of 294 single detached houses.

**2. `src/content/claims/ip-teardown-price-gap.yaml` (key_facts item 1)**
- **Quoted text:** "The City's own 2024 Redeveloping Area Infill Report counts 286 new single-detached houses built in the redeveloping area against 387 demolished, a net loss of 101, and concludes that other built forms are replacing the detached houses that come down."
- **What the evidence actually says:** As above, the 2024 report (YF-EV-0101) does not carry these numbers; it reports a net loss of 294. The 286/387/101 figures are from the 2023 report (YF-EV-0048). 
- **Fix:** Correct the key fact to reflect the true figures from the 2024 report (net loss of 294) and properly attribute the 286/387/101 numbers to the 2023 report.

**3. `src/content/claims/ip-teardown-price-gap.yaml` (limitations item 7)**
- **Quoted text:** "The 286, 387 and net 101 figures above are what the evidence registry records for the 2024 Redeveloping Area Infill Report. One seat documented against another that it could not find those numbers in the report at the cited URL and read a net loss of 294 single detached houses for 2024 instead. Nothing in the run adjudicated that..."
- **What the evidence actually says:** The seat that read a net loss of 294 from the 2024 report was correct. The registry `establishes` line for YF-EV-0101 is incorrect.
- **Fix:** Since the primary text and key facts will be corrected to resolve this contradiction, this limitation should be removed or rewritten to state that the registry's transcription error for YF-EV-0101 was caught during cross-review and corrected.

**4. `scripts/calcs/infill-prices.ts` (lines 27-30, 85-87)**
- **Quoted text:**
```typescript
/** YF-EV-0101 — 2024 Redeveloping Area Infill Report: new single-detached houses built. */
singleDetachedBuilt2024: 286,
/** YF-EV-0101 — 2024 Redeveloping Area Infill Report: single-detached houses demolished. */
singleDetachedDemolished2024: 387,
...
/** YF-EV-0101 — net change in single-detached houses in the redeveloping area, 2024. */
export const netSingleDetachedChange2024 =
  figures.singleDetachedBuilt2024 - figures.singleDetachedDemolished2024;
```
- **What the evidence actually says:** The numbers 286 and 387 belong to 2023 (YF-EV-0048) and not 2024. The 2024 report provides a net loss of 294.
- **Fix:** Rename the variables to `singleDetachedBuilt2023` and `singleDetachedDemolished2023` attributing them to `YF-EV-0048`, and recalculate the net change for 2023 instead of 2024 (or directly add the 294 net loss figure for 2024).

REVISE
