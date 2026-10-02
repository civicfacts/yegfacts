# snow-clearing checks: PDF extraction PASS, completeness FAIL, personal information CLEAR

All three carried PDFs are extracted completely, including both cost tables, and all nine carried texts are free of private individuals' personal information. Rule v3 misses one relevant record: the Agenda Review Committee minutes items that show the draft agenda of the 2026-08-31 committee meeting was reviewed on 2026-08-18. The brief cites that page for exactly this fact. Two added terms in rule v4 select it, with four harmless extras.

I checked this on 2026-10-02, around 15:00Z, as an independent session, not the editor, working read-only on worktree snow-panel at commit f3508bf. The claim is `two-snow-removal-proposals-need-more-money`.

## 1. PDF extraction: PASS for all three

For each PDF, a fresh `pdftotext -layout -enc UTF-8` run (pdftotext 26.08.0) is byte-identical to the carried text. The archive and text SHA-256 values match the manifest. I rendered every page at 90 dpi and compared it with the text.

- **YF-EV-0294, report CO03513, 11 pages: PASS.**
  - All 11 pages are present, with headings, bullets and footnotes 1 to 4. The cover table and the routing and delegation line are in the text.
  - The page 7 enhancement table has five rows, each with all four ratings and the ongoing and one-time costs. Rows whose labels wrap stay aligned with their figures.
  - The "Budget/Financial Implications" section is complete.
  - Loss: the page 1 banner image holds the words "COUNCIL REPORT" and the City logo, which are not extracted. They are decorative, and nothing material is lost.
- **YF-EV-0295, Attachment 9, 3 pages: PASS.** The package's two figures ($23.6 million ongoing and $11.5 million one-time) and all four areas with every bullet are in the text. Only the bold run-in labels are lost.
- **YF-EV-0296, Attachment 10, 4 pages: PASS.**
  - The cost table has 24 rows, and every rating, ongoing cost and one-time cost matches the rendered pages. Row 6's blank one-time cell is blank in the PDF as well.
  - The legend and the 24 numbered descriptions are complete.
  - Two-line labels in rows 2 and 13 put the row number on the second line, which is still readable.

## 2. Meeting-page completeness: FAIL (`completeness.yaml`)

All 223 items have a checker reason across the six pages: 25, 27, 71, 61, 27 and 12.

Relevant items and where they stand:

| Page | Relevant items | Status |
|---|---|---|
| YF-EV-0287 | 7.1 | carried |
| YF-EV-0289 | 7.1 | carried |
| YF-EV-0290 | 2.2 and 7.9 | carried |
| YF-EV-0291 | 10.3 and 10.4 | carried |
| YF-EV-0292 | 7.1 and 11.1 | carried |
| YF-EV-0293 | 2.1 and 2.1.1 | **missed** |

The missed items on YF-EV-0293, the Agenda Review Committee minutes of 2026-08-18:
- Item 2.1.1 is "August 31, 2026, Community and Public Services Committee". Its text is only "See item 2.1."
- Item 2.1 holds the carried motion "That the draft agendas be amended as discussed".

The brief names this page for qualification 4 (that the draft 2026-08-31 agenda was before the Agenda Review Committee on 2026-08-18). Under rule v3 the page carries only its header and roll call.

YF-EV-0290 parses to text identical to YF-EV-0227, the re-archived 2026-09-08 Council minutes that I checked earlier.

**Proposed rule v4:** add the terms "draft agendas" and "August 31, 2026, Community and Public Services Committee". Item 2.1.1 holds only its title, so no narrower term selects it. The two terms select the two missed items and four extras, all harmless:
- YF-EV-0289 1.4, Adoption of Agenda;
- YF-EV-0289 11.1, the co-location notice;
- YF-EV-0290 11.4, the same notice laid over;
- YF-EV-0291 10.2, the Traffic Bylaw review.

**Note for the editor (no rule change needed):** the 2026-08-31 committee motion asking for the Well Maintained City package to go to Council on 2026-09-08 was withdrawn (YF-EV-0289 item 7.1). Two motions for unfunded service packages carried instead, one for Assisted Snow Removal and one for Enhanced School Zone Clearing.

## 3. Personal information: CLEAR (`pi.yaml`)

All nine carried texts are clear. The only people named are members of Council and City staff acting in their roles. Speaker lists show only "[member of the public]" with any organisation kept. The only phone number is the City Clerk's office line.
