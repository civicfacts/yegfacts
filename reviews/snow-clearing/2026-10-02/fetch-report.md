# Evidence fetch report (round 2 input)

Round 1 on the twice-revised brief cited 15 distinct sources after the merge. Each was fetched by `scripts/evidence-stage.ts` on 2026-10-02 at about 23:37Z and hashed into `evidence/staging/` (untracked). Ten returned a document. The five eScribe filestream files failed with HTTP 403, the portal's browser check. Each of those five is carried in the package from the founder's browser download (YF-EV-0294, 0295, 0296, 0304, 0308).

A meeting page's HTML differs on every fetch, so the staged hashes of the agenda and minutes pages do not match their registry archives. The carry manifest compares their items instead. The Taproot article is cited only by the Claude seat, for the 2026-01-19 committee agenda, and is a lead, not a source for the claim under review. The Internet Archive capture GPT-6 Luna cites is the wrapped page. The registry archives the capture's original bytes (the `id_` form, YF-EV-0288), so the hashes differ.

| Source | Cited by | Bytes | SHA-256 (first 12) | Registry |
|---|---|---|---|---|
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=278877 | claude, gpt-luna, gpt | failed (HTTP 403) | - | YF-EV-0304, carried |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304803 | claude, gpt-luna, gpt | failed (HTTP 403) | - | YF-EV-0294, carried |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304812 | claude, gpt-luna, gpt | failed (HTTP 403) | - | YF-EV-0295, carried |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=268207 | claude, gpt-luna | failed (HTTP 403) | - | YF-EV-0308, carried |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=8321e64d-6394-469b-8653-65641562497c&lang=English | gpt-luna, gpt | 188947 | b9cff9015e36 | YF-EV-0299, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=e2eee963-953d-4bbd-834c-419a4545cbcf&lang=English | claude, gpt | 154786 | badb9bcaff91 | YF-EV-0287, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=2925a7f5-32a8-49a6-be15-fc1cf157c764&lang=English | claude, gpt | 458372 | 05b377dd6b7e | YF-EV-0302, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=3195d7e4-a1e2-4923-810e-ddfa0726c299&lang=English | gpt-luna, gpt | 417285 | 1186751ce5fb | YF-EV-0290, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=e2eee963-953d-4bbd-834c-419a4545cbcf&lang=English | gpt-luna, gpt | 172110 | 67325cc1ad72 | YF-EV-0289, generated page |
| https://edmonton.taproot.news/news/2026/01/19/on-the-agenda-parking-ban-fines-municipal-assets-brand-framework | claude | 54972 | 38e58698646a | not registered |
| https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=304813 | claude | failed (HTTP 403) | - | YF-EV-0296, carried |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=09050f7e-7108-4015-be41-e1d6ce2e862e&lang=English | claude | 174525 | fe8670b35a7d | YF-EV-0298, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=8321e64d-6394-469b-8653-65641562497c&lang=English | claude | 230940 | a602f3b11716 | YF-EV-0300, generated page |
| https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=86bee574-31e8-424f-abbb-978f946337f3&lang=English | claude | 373842 | d350c16b9910 | YF-EV-0291, generated page |
| https://web.archive.org/web/20260822162600/https://pub-edmonton.escribemeetings.com/Meeting.aspx?Id=e2eee963-953d-4bbd-834c-419a4545cbcf&Agenda=Agenda&lang=English | gpt-luna | 142420 | 638a6ee3ae2b | the wrapped capture; YF-EV-0288 archives the id_ form, bytes differ |
