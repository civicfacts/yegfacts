<!-- Faithfulness check 2 (re-check), Gemini seat: Gemini 3.1 Pro via agy, effort high. Run 2026-09-01 by Stew. -->

Gemini 3.1 Pro (High)

**1. `src/content/stories/infill-prices.mdx` (TL;DR bullet 1 and body section)**
RESOLVED. The text correctly cites the 294 net loss figure for 2024 and appropriately attributes the demolition counts to the previous year.

**2. `src/content/claims/ip-teardown-price-gap.yaml` (key_facts item 1)**
RESOLVED. The key facts accurately reflect the 294 net loss for 2024 (YF-EV-0101) and cite the aggregate demolition counts (on the order of 390) for 2023 (YF-EV-0048).

**3. `src/content/claims/ip-teardown-price-gap.yaml` (limitations item 7)**
RESOLVED. The limitation was cleanly rewritten to document the registry transcription error and note that it was caught during cross-review and corrected at drafting.

**4. `scripts/calcs/infill-prices.ts`**
RESOLVED. The incorrect built/demolished variables were removed, and the correct `netSingleDetachedChange2024: -294` was added with an explanatory comment detailing the drafting correction.

**Rewording flags:**
The rewording introduced the phrase "on the order of 390 teardowns" (in the story) and "on the order of 390 houses" (in the claim) to represent the 2023 demolition count. This is an accurate, safe approximation of the 387 figure and aligns perfectly with the updated errata. No unsupported facts or framing issues were introduced by the drafter's paraphrasing.

FAITHFUL
