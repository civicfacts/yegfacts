# Evidence fetch report (round 2 input)

Round 1 under methodology v1.42 cited 14 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-09-29 and, where it answered, hashed into `evidence/staging/` (untracked; the manifest `evidence/staging/staging-manifest.json` also holds earlier runs' entries; only this run's are listed). 8 returned a document; 6 did not.

The six that did not are the portal's file downloads, which answer scripts with a browser check. Every one of them that the brief relies on is carried into the package from a browser-downloaded archive (carried/manifest.yaml); the one that is not, DocumentId 245911, is a 2024 City capital financial update that the GPT-6 Sol seat cites for claim 3 as a record of the approved budget; the brief does not name it. A meeting page's HTML differs on every fetch, so its staged hash does not match the registry archive; the carry manifest compares its items instead.

## Not archived

| Source | What happened |
|---|---|
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304024 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304028 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304030 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304032 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304031 | HTTP 403 |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=245911 | HTTP 403 |

## Archived

| Source | Bytes | SHA-256 (first 12) |
|---|---|---|
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=11577a3c-2540-4848-908e-18710d3d2a4c&lang=English | 347728 | b4f89a550722 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=3195d7e4-a1e2-4923-810e-ddfa0726c299&lang=English | 417285 | 9bd4b6273b63 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&lang=English | 213699 | 5f1795dba35e |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=8c66c382-bd3c-4c28-bfad-1b5b91142ed7&lang=English | 383839 | b615a5bb8a08 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=215a3a89-60c7-4eff-8533-cf94079fabd2&lang=English | 1367742 | 20307fcadfb2 |
| https://edmonton.taproot.news/news/2026/09/01/bike-routes-cancelled-or-put-off-despite-council-direction | 55895 | ed8169341ade |
| https://globalnews.ca/news/12035727/edmonton-proposes-changes-bike-routes-community-pushback-provincial-legislation | 337128 | 643b5e159637 |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=fb2d3de4-5170-4f51-9f18-60fd93590a78&lang=English | 199017 | 680539ffbc12 |
