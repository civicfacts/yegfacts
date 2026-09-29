# Evidence fetch report (round 2 input)

Round 1 under methodology v1.42 cited 22 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-09-29 and, where it answered, hashed into `evidence/staging/` (untracked; the manifest `evidence/staging/staging-manifest.json` also holds earlier runs' entries; only this run's are listed). 10 returned a document; 12 did not.

Every source not archived is a portal file download, which answers scripts with a browser check (HTTP 403), or a citation that joins two portal URLs into one string, which is not a fetchable address; each such joined citation names documents that are also cited on their own. Every portal file the brief relies on is carried into the package from a browser-downloaded archive (carried/manifest.yaml). DocumentId 245911, a 2024 capital profile update that the GPT-6 Sol seat cites for claim 3, is not named in the brief and is not carried. A meeting page's HTML differs on every fetch, so its staged hash does not match the registry archive; the carry manifest compares its items instead.

## Not archived

| Source | What happened |
|---|---|
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304028 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304030 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304032 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=245911 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304028 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304030 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304030+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304028 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304030+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304024 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304031 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304032+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304031+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304030 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&Id=3195d7e4-a1e2-4923-810e-ddfa0726c299&lang=English+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2FMeeting.aspx%3FAgenda%3DPostMinutes&lang=English | HTTP 500 |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=11577a3c-2540-4848-908e-18710d3d2a4c&lang=English | 347728 | b9065aa58499 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=3195d7e4-a1e2-4923-810e-ddfa0726c299&lang=English | 417285 | f78c3a30b4c2 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&lang=English | 213699 | e9893781eca8 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=8c66c382-bd3c-4c28-bfad-1b5b91142ed7&lang=English | 383839 | af98d6504330 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=215a3a89-60c7-4eff-8533-cf94079fabd2&lang=English | 1367742 | 35f24170d5f8 |
| https://data.edmonton.ca/City-Administration/2025-2029-Council-And-Committee-Meetings-Voting-Re/abcm-eai5 | 576822 | aa4b7863a3d7 |
| https://edmonton.taproot.news/news/2026/09/01/bike-routes-cancelled-or-put-off-despite-council-direction | 55895 | c07569129ef9 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=0f0a1a9c-e89e-44dc-b776-b14a66e99487&lang=English | 470832 | c509a2236065 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=8c66c382-bd3c-4c28-bfad-1b5b91142ed7&lang=English+%3B+https%3A%2F%2Fpub-edmonton.escribemeetings.com%2Ffilestream.ashx%3FDocumentId%3D304024 | 383930 | f441f2f2a864 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=fb2d3de4-5170-4f51-9f18-60fd93590a78&lang=English | 199017 | 06e0fd688cfd |
