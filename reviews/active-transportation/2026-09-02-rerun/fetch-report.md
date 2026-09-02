## Evidence fetch report (round 2 input)

28 distinct sources after the merge of round 1. 26 fetched and hashed
into staging; 2 failed:

- https://www.cbc.ca/news/canada/edmonton/what-got-funded-and-what-didn-t-in-edmonton-city-council-s-budget-debate-1.6691557
  timed out at the archiver's 10-second limit (CBC pages have refused
  or stalled every automated fetch in this story's work; the same page
  could not be read by the session's fetch tool either). Cited by one
  seat as a media lead on the December 2022 budget decisions; the
  council minutes it summarises are in the set and did fetch.
- https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=282482
  returned HTTP 404. It was the framing checker's link for the
  September 2025 capital performance report; the seats cited the
  City's 2025 reports under other document ids (291480, 291514, 291701),
  all of which fetched.

Two escribe document ids fetched to byte-identical files in the first
run's staging (215334 and 219742, both 4,886,167 bytes), so they are one
document published twice; the registry keeps one.

### Registry disposition

Held before round 2 from the first run's staging and the editor's
ingest of the instruments every seat used: YF-EV-0114 (2023-2026
Capital Budget), 0115 (Approved 2019-2022 Operating Budget), 0116
(2023-2026 Operating Budget), 0117 (capital profile CM-20-0330), 0118
(IS03688), 0119 and 0120 (2023 and 2024 year-end capital updates,
attachment 2), 0121 (Global News, 2022-12-12), 0122 (the advocacy page
as captured 2022-12-12). The remaining 23 cited URLs stay unregistered
until the drafted claims cite them; whatever a key fact rests on is
ingested then, deliberately, one at a time.
