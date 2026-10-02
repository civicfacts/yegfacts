# snow-clearing recheck under rule v4: PASS on (a), (b) and (c)

Rule v4 carries every item the completeness check marked relevant, and nothing beyond the six expected additions. The four changed carried texts match the manifest and contain no private individual's personal information. Every relevance judgement stands; six reasons are reworded only.

I checked this on 2026-10-02 as an independent session, not the editor, working read-only on worktree snow-panel at commit 5d753fd.

## (a) Selection: PASS

Rule v4 is rule v3 plus two terms, "draft agendas" and "August 31, 2026, Community and Public Services Committee", and drops nothing. The manifest records rule version 4 on every page.

Regenerating all six meeting pages under v4 adds exactly these items over v3:
- YF-EV-0293 items 2.1 and 2.1.1, the two items v3 missed;
- YF-EV-0289 items 1.4 and 11.1;
- YF-EV-0290 item 11.4;
- YF-EV-0291 item 10.2.

No item is dropped, and no relevant item is left uncarried on any page. The manifest's item index agrees with the regeneration on every item's number and carried flag.

## (b) Hashes and personal information: PASS, CLEAR

- All six meeting texts hash to the manifest's `text_sha256`. Only YF-EV-0289, 0290, 0291 and 0293 changed; 0287 and 0292 are byte-identical to their v3 text.
- The three PDF archive and text hashes in the manifest are unchanged from the earlier check.
- The new items name only members of Council and City staff acting in their roles. The one name not seen before is M. Gunther, the Acting City Solicitor.
- The new items contain no member of the public, email, phone number or address.

## (c) Reasons: PASS, with wording updated

No relevance judgement changes. Six reasons are reworded in `completeness-v4.yaml`, which also adds `carried_by_v4` for every item and `missed_under_v4`, empty on all six pages:
- YF-EV-0293 items 2.1 and 2.1.1: "MISSED by rule v3" becomes "Missed by v3, carried by v4."
- YF-EV-0289 items 1.4 and 11.1, YF-EV-0290 item 11.4 and YF-EV-0291 item 10.2: each reason now ends "Carried by v4 as an extra; harmless."

`completeness.yaml` is unchanged as the record of the v3 check.
