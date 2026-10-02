# Evidence fetch report (round 2 input)

Round 1 under methodology v1.43 cited 4 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-10-02 at about 19:21Z and hashed into `evidence/staging/` (untracked). All 4 returned a document; none failed.

The bylaw's staged bytes are identical to its registry archive, YF-EV-0251, which is also the copy carried into the package. A meeting page's HTML differs on every fetch, so the staged hashes of the minutes and agenda pages do not match their registry archives (YF-EV-0209, YF-EV-0210); the carry manifest compares their items instead. The Yahoo News page also serves different bytes from its registry archive (YF-EV-0255); it is cited only by the Claude seat, in its search for a stated reason for the motion, and is a lead, not a source for the claim under review.

| Source | Cited by | Bytes | SHA-256 (first 12) | Registry |
|---|---|---|---|---|
| https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C18155.pdf | claude, gpt, gpt-luna | 423231 | 762a91771c6f | YF-EV-0251, identical |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&lang=English | claude, gpt, gpt-luna | 213699 | a9b4ea99191e | YF-EV-0209, generated page |
| https://ca.news.yahoo.com/edmonton-bike-lane-expansion-continue-231838925.html | claude | 496475 | 7b3dba29aa62 | YF-EV-0255, bytes differ |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&lang=English | claude | 168742 | b53acacfee3f | YF-EV-0210, generated page |
