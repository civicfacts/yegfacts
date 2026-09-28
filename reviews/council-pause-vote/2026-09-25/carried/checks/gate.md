# Claim-4 gate (D-0047 rule 5): PARK

**Verdict: PARK claim 4 (`same-seven-councillors-vote-together`) for this run.** The full set of relevant recorded Council votes cannot be established from the archived minutes, and the votes left unresolved change the claim's result. Claims 1 to 3 are not affected by this gate.

Checked by an independent read-only session, 2026-09-28. The vote table is in `reconciliation.yaml`.

## Why

1. **The meeting set is incomplete.** V covers every recorded Council vote from 2022-11-30 to 2026-09-25. Only the editor's floor-list meetings are archived. Council budget meetings that plausibly hold candidate votes are not archived:
   - the spring supplemental capital budget adjustments of 2023, 2024 and 2025;
   - the Fall 2025 adjustment (2025-12-01);
   - the Spring 2026 adjustment (2026-06-16).

   No other Council meeting in the period was searched either. For the 2021-2025 term the open data cannot serve as a cross-check, because the dataset covers 2025-2029 only.
2. **Bundled votes have unresolved relevance and direction.** Several recorded votes approve budget bundles:
   - the re-stated 2023-2026 capital and operating budgets (YF-EV-0204 item 15);
   - the operating impacts and debt-servicing motions (YF-EV-0204 items 13.84 and 13.91);
   - the Fall 2023 and Fall 2024 adjustment motions (YF-EV-0211 5.1.3, YF-EV-0212 5.1.3);
   - the Fall 2025 and Spring 2026 adjustment motions (open data only).

   Whether each one belongs in V, and on which side, depends on attachments that are not archived. Examples are FCS02530rev Attachment 4, FCS03159 Attachment 4 and FS03252 Attachment 4.
3. **The unresolved votes decide the result.** This is the checker's illustration, not a finding for publication:
   - The clear, program-specific votes in V are V01, V06 to V09, V11 and V13 to V16. All of them fall in the 2021-2025 term. The open data shows no program-specific Council vote in the 2025-2029 term. On those votes alone, the primary rule gives Not established (no vote in one term).
   - If the Fall 2025 or Spring 2026 adjustment votes count as V, the both-terms condition becomes testable. The strict bloc would then be A. Knack, A. Salvador, K. Tang and A. Stevenson, a count of 4, which is Partially supported.
   - If the 2022 re-stated operating budget (V05) counts, A. Knack voted against it and the count falls to 3, which is Contradicted.

   All three verdict bands are reachable, depending on the open items.
4. **The carried package is itself incomplete under rule v1.** Four relevant items were missed (see `completeness.yaml`), including the V04/V05 item and the V12 item. Under D-0047 rule 3, rule v2 must be adopted and every page rerun and rechecked before any round, whatever happens to claim 4.

## What passed

- Every vote found in the archived minutes has a member-level record: 16 Council votes and candidates from 2022 to 2025, plus four V+ votes from 2026. The checker derived absences as members named in neither the In Favour nor the Opposed list, and each tally matches its stated result.
- The open data (data.edmonton.ca, resource `abcm-eai5`) was reachable on 2026-09-28. Every archived vote it covers agrees at member level with the minutes:
  - Council 2026-07-07 item 7.5: 9 to 3, with K. Principe absent;
  - Executive Committee 2026-06-30 item 11.2: 5 to 0;
  - Infrastructure Committee 2026-08-26 item 7.6: both 2 to 2 votes, with A. Knack and A. Paquette absent.

  There were no disagreements. The open data also holds one row with no result for the 7.6 motion as moved, which is not a conflict.
- All 16 archived Council votes precede the 2025-2029 term, so the open data cannot confirm or contradict any of them.

## What would lift the park

Complete all of the following, then rerun this gate:

1. Archive and read the minutes of every Council meeting in the period, at least every budget and supplemental capital or operating adjustment meeting and every meeting with a program bylaw.
2. Archive the adjustment attachments, and record for each bundled vote whether it changes CM-20-0330 and in which direction.
3. Adopt rule v2.
