# Recheck under selection rule v2: PASS on (a), (b) and (c)

Rule v2 carries every item the completeness check marked relevant, and nothing beyond the one planned extra. The five newly carried items contain no private individual's personal information, and the rebuilt manifest's text hashes match the regenerated text. The claim-4 gate stays PARK (see `gate.md`); v2 does not resolve the missing meetings or the bundled votes.

I checked commit 2f594e5 on cpv-rerun on 2026-09-28, read-only. For all 13 pages I regenerated the carried text with `carryMeetingPage` and the current `minutes-selection-rules.yaml` version 2. I compared the result item by item with the rebuilt manifest and with my `completeness.yaml`.

## (a) Selection: PASS

Every item marked relevant is now carried, and no relevant item is left uncarried on any page. The v2 selection is exactly v1 plus five items:

| Page | Item | Matched term |
|---|---|---|
| YF-EV-0216 | 10.1 Active Transportation Implementation Funding (A. Salvador) | Active Transportation Implementation |
| YF-EV-0204 | 15. Main Budget Motions (Re-stated) | Capital Budget motion |
| YF-EV-0212 | 5.1.3 Vote on Fall 2024 Supplemental Capital Budget Adjustment and Other Related Motions | Supplemental Capital Budget Adjustment Motion |
| YF-EV-0214 | 10.7 50 Street Active Transportation Implementation (A. Salvador) | Active Transportation Implementation |
| YF-EV-0212 | 5.1 Fall 2024 Supplemental Capital Budget Adjustment (the planned extra) | Supplemental Capital Budget Adjustment Motion |

No item that v1 carried was dropped. For every page, the rebuilt manifest's item index agrees with my regeneration on each item's number and carried flag, and it records `rule_version: 2`.

## (b) Personal information and hashes: PASS

All five new items are clear. They name only members of Council and City staff acting in their roles:
- Item 15 names the City Clerk, the City Manager and the Chief Financial Officer.
- Item 5.1 names the Administration delegation and the City Clerk.
- Items 10.1 and 10.7 name only Councillor A. Salvador.

The five items contain no phone number, email, street address, postal code or member of the public. All 13 regenerated carried texts hash to the `text_sha256` values in the rebuilt manifest.

## (c) Reasons: PASS

No relevance judgement changes under v2. Five reasons change in wording only:
- Four reasons ended "MISSED by rule v1." They now end "Missed by v1, carried by v2."
- The reason for YF-EV-0212 item 5.1 said it would be selected by the proposed v2 as an extra. It now says "Carried by v2 as an extra; harmless."

`completeness-v2.yaml` holds these rewordings and adds `carried_by_v2` for every item and `missed_under_v2`, which is empty on all 13 pages. `completeness.yaml` is unchanged as the record of the v1 check.
