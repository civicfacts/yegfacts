# Errata: active-transportation, run 2026-09-02-rerun

No MATERIAL FRAMING CONCERN was raised in either round, so this run
synthesised: `at-100m-vs-snow` Partially supported / Unanimous and
`at-100m-vs-roads` Supported / Unanimous, on the round-1 basis. Every
seat held its verdict and confidence through round 2.

Round 2 is an error-documentation round and cannot move a canonical
finding. The concrete errors each seat documented in another's review,
as recorded in the round-2 files, are below. Nothing here has been
adjudicated; it is the record of what was alleged and by whom. Where a
documented error changed a figure the story uses (the full list of 2022
snow additions), the story uses the corrected figure and says so in the
claim's limitations.

## Manifest note

The Gemini seat's round-1 row records two attempts: the first answer
carried a `$schema` key at the JSON root, which the extractor now drops
(methodology v1.14), and the seat was retried once by the runner. Both
rounds ran under the v1.14 command recorded in run.yaml.

## Documents the panel found that the brief did not name

The March 2022 carry-forward and the April 2022 spring adjustment to the
Snow and Ice Control budget (both in YF-EV-0124); the City's year-end
operating updates for 2022 to 2025 (YF-EV-0125 to 0128); the December
2025 capital update (YF-EV-0129); the spring 2025 transfer out of
CM-20-0330 (YF-EV-0130); the 2026 program summary by account category
(FCS03370, DocumentId 291701), which carries a second series of snow
actuals; the corrected document id for the September 2025 capital update
(FCS03234 attachment 2, DocumentId 294159; the checker's id 282482 is
dead).

## Documented by Claude Fable 5.1

- gemini and gpt, Claim A, Alternative A: both list the July 4, 2022 one-time $4.7 million as the only in-year amendment ('the identified in-year amendment'). The council record holds two earlier 2022 additions to Snow and Ice Control in force on 2022-12-12: $2.3 million from the 2021 program surplus (approved March 14, 2022) and $14.3 million for the Enhanced Snow Clearing Pilot (Spring 2022 Supplemental Operating Budget Adjustment, FCS01143 Attachment 1, approved 13 to 0 on April 19, 2022; https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=217869). With all three, Alternative A is 64,466 + 2,300 + 14,300 + 4,700 = 85,766 ($000s), ratio 1.166, Contradicted under both cutoff sets, not 'Partially supported under the alternative cutoffs' as gpt reported for its July-only figure of 1.446.
- gemini, Claim A: calls the $60.9 million figure 'the 2023 base budget'. It is the 2023 total after Operating Budget Amendment 18 (CBC reported a $56.9 million base plus a $4 million ongoing increase; the amendment added $3,768,000 plus $274,600 for 2023). Labelling it 'base' understates the amendment the brief requires to be named.
- gemini, Claim A: 'what_would_change_my_verdict' proposes that actual snow expenditure diverging from budget could lower 'the denominator'. The brief fixes the denominator as a budget cell and says an actual is not a budget; actuals are context only. Also, 2022 actual gross expenditure was $97.6 million, well above budget, so the direction of the hypothetical is wrong for the year in question.
- gemini, both claims: budget documents are typed 'legal-audited'; under the schema they are policy documents. Council minutes are the legal-audited items. Minor.
- gemini, Claim B: the required calculations (widest-reading total, as-amended total with dates, CM-20-0330 actuals by year, shares of the whole and transportation budgets) and the per-profile list with Appendix A pages are absent. Omissions, not wrong figures; the sums gemini does give (1,945.7; 1,116.5; 722.3; 106.9; 1,794.0) match mine and gpt's.
- gpt, Claim A, citation check: the URL given for '2023 and 2024 year-end capital financial performance reports' (https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=253138) is a single document, FCS02842 Attachment 2, 'Capital Financial Update - December 31, 2024'. I fetched it: it contains the 10,496 figure for CM-20-0330 but not the 807 figure for December 31, 2023, which is in FCS02228 Attachment 2 (DocumentId=215340). The 2023 figure is right; the URL does not carry it.
- gpt, Claim A, citation check: the URL given for the 'September 2025 Capital Financial Performance Report' (https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=282482) returned HTTP 404 on 2026-09-02. The $25.093 million cumulative figure is correct and is printed in FCS03234 Attachment 2 (DocumentId=294159, page 11).
- gpt, Claim A: describes the fact sheet figure as 'the published $60.9 million 2023 snow budget'. The fact sheet prints '$60.9 million for snow clearing' with no year, in a list of asset-renewal items beside two capital projects. The 2023 attribution rests on Global News (2022-12-20) and CBC (2022-12-16), which gpt did not cite. The figure is right; the document does not say what the citation implies.
- gpt, Claim B: the Global News citation is titled 'Edmonton city council approves $100M bike network expansion'. The article at that URL is 'City council hearing mixed reaction on $100 million to Edmonton bike plan'. Minor mis-titling; the quotation is verbatim.
- gpt, Claim A and B, page references: Appendix A's CM-20-0330 line is on printed page 103 (I checked the folio on the PDF page), Table 8 on printed page 56, and the CM-20-0330 profile sheet begins on page 540; gpt gives 102, 55 and 539-542. Off by one, probably PDF-viewer numbering. Minor.
- gpt, Claim A, 'unknowns': lists the 2022 Snow and Ice Control gross actual and the final 2025 year-end CM-20-0330 actual as not located. Both were published before the as-of date: 2022 actual expense 97,571 ($000s) in FCS01656 Attachment 1 (March 14, 2023), and CM-20-0330 to-date actuals 39,984 at December 31, 2025 in FCS03313 Attachment 2 (March 17, 2026). Gaps, not errors.
- All three round-1 reviews, including mine: none flagged that Snow and Ice Control actuals exist on two City bases that differ by $3 million to $10 million a year. The Operating Financial Update year-end tables give 2023 / 2024 / 2025 expense actuals of 54,917 / 72,086 / 76,648 ($000s); the FCS03370 Program Summary by Account Category gives 51,750 / 64,749 / 66,588. The program summary shows SNIC carrying almost no personnel cost (labour is in Mobility Infrastructure Services), while the 2022 primary cell carried 225.9 FTE. gpt's figures are correctly transcribed from a genuine City table; the basis difference is a limitation both of us should have stated.

Evidence Claude Fable 5.1 said it had missed in round 1:

- FCS03370 Attachment 1, 'Supplemental Information Package, City Operations - Parks and Roads Services' (Special City Council, March 5, 2026; https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=291701), cited by gpt under a generic title. I fetched it on 2026-09-02. Page 6 of 12 is 'Program - Snow & Ice Control, Program Summary by Account Category ($000)' with columns 2023 Actual, 2024 Actual, 2025 Actual, 2025 Approved Budget, 2026 Approved Budget. Gross 'Subtotal' row: 51,750 / 64,749 / 66,588 / 68,618 / 72,645. 'Total Net Operating Requirement': 49,111 / 62,508 / 65,226 / 66,475 / 71,486. This is the same table format as the 2022 primary cell and supplies the 2025 and 2026 approved gross snow budgets I lacked in round 1 (I had used a Taproot media figure of $67 million as a 2026 placeholder; that placeholder is withdrawn). Note 1 on the page says SNIC carries no FTEs because its labour sits in Mobility Infrastructure Services; the 2022 cell carried 225.9 FTE, so the program's accounting basis changed between cycles.
- The 2023-2026 Capital Budget's 'Total Adopted Capital Budget' line (PDF page 55, in $000s) is 7,192,540 for 2023-2026 and 715,656 for 2027 and beyond, total 7,908,196; Table 8's Grand Total (page 57, $ millions) is 7,192.5 / 715.7 / 7,908.2. In round 1 I described the total as 'the approved $7.91 billion 2023-2026 Capital Budget' using the document's own phrase, without noting that $7.91 billion includes 2027 and beyond. gpt's $7.19254 billion is the correct 2023-2026 figure for qualification 4; the share is 1.39 per cent of the 2023-2026 column and 1.26 per cent of the all-years total.
- gpt's widest-reading list: the six streetscape and pedestrian-realm profiles named in the brief total $80.145 million (21-50-9101 $0.560; 21-50-9100 $25.400; 17-74-4103 $0.265; CM-20-3102 $10.100; CM-20-3100 $13.615; 20-20-2024 $30.205), giving a widest total of $2,025.848 million. I did not report the widest total in round 1. I checked the arithmetic of the six but did not re-read each sheet; I adopt the figure with that attribution.
- The City's 2023-2026 Budget Engagement Fact Sheet (https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/BudgetEngagementFactSheet.pdf), which I fetched: it prints '$60.9 million for snow clearing' (under 'Asset renewal, maintenance and expansion', with no year stated), '$100 million for the Active Transportation Implementation Acceleration', 'The total capital budget for 2023-2026 is $7.91 billion, including $4.44 billion of previously-approved projects', and '$11 million for enhanced snow and ice control' by 2026. The $11 million reconciles with Operating Budget Amendment 18's cumulative increments (4,042.6 + 3,724.8 + 2,476.8 + 721.4 = 10,965.6 in $000s), and $60.9 million reconciles with CBC's reported 2023 base of $56.9 million plus the amendment's $4.04 million for 2023. That reconciliation, which gpt listed as unresolved, is now done: $60.9 million is the 2023 approved snow budget after the December 2022 amendment, though the fact sheet itself does not say so.

## Documented by GPT-5.6 Sol

- Gemini's Alternative A counts only the July 4, 2022 $4.7 million increase. It omits the March 14 $2.3 million carry-forward and the April 19 $14.3 million supplemental adjustment identified in City records, so its $69.166 million denominator is not the brief's required cell-plus-every-council-amendment calculation.
- Gemini says significantly different actual snow-clearing expenditure could change the Claim A verdict. That confuses outcome with authorization: the brief fixes the verdict denominator to the approved 2022 budget cell, while actual expenditure is contextual and cannot change that verdict.
- Gemini classifies the adopted capital and operating budget documents as legal-audited. They are policy documents; council minutes and enacted adjustments are the legal-audited records.
- Claude uses a reported 2025 annual snow budget of about $67 million as a placeholder for the unlocated 2026 approved program budget. A prior-year figure cannot establish the 2026 denominator, so the resulting four-year ratio of about 0.377 should be labelled an illustration, not a completed required calculation.
- Claude presents $85.766 million as Alternative A while also reporting the City's year-end adjusted 2022 expense budget as $79.474 million. The addition is arithmetically correct under the brief's mechanical cell-plus-council-amendments rule, but calling it the definitive amended budget requires reconciling the $6.292 million difference or identifying intervening transfers.
- Claude reports one set of Snow and Ice Control actual expenses for 2023-2025—$54.917 million, $72.086 million and $76.648 million—without reconciling it to the separate City program-reporting series in the evidence registry—$51.750 million, $64.749 million and $66.588 million. The two series appear to have different accounting scope and should not be treated as interchangeable.
- Neither other review should describe Table 8's $1.794 billion line as a roads total. Its published name is Active Pathways and Roads Service, and it includes CM-20-0330 and other active-pathway funding. Both reviews generally acknowledge this, but some suggested wording blurs the distinction.
- The primary Claim B total is reproducible under the brief's prescribed boundary, but it is not a City-published roads-only total: it combines Roads and Neighbourhood Renewal profile labels, three uncategorized bridges, and profiles that Table 8 presents under separate transformational or safety groupings. Describing it without that construction overstates what the City directly publishes.

Evidence GPT-5.6 Sol said it had missed in round 1:

- For Claim A, the cross-review surfaced two 2022 council-approved additions beyond the July 4 top-up: a $2.3 million carry-forward approved March 14 and a $14.3 million Spring Supplemental Operating Budget Adjustment approved April 19. These materially change Alternative A.
- The December 31, 2022 operating update reports an adjusted Snow and Ice Control expense budget of $79.474 million and actual expense of $97.571 million. This provides an important reconciliation check, although the adjusted budget does not equal the printed cell plus the three identified council additions.
- The December 31, 2025 reports provide later evidence than the September 2025 interim report: CM-20-0330 cumulative actuals were $39.984 million, while Snow and Ice Control expense was budgeted at $67.554 million and recorded at $76.648 million.
- The Spring 2025 capital adjustment transferred $0.430 million from CM-20-0330, reducing its current approved budget to $99.570 million without changing the original December 2022 approval used for either verdict.
- For Claim B, the other review supplied the complete profile-by-profile primary-boundary membership, the $2.025848 billion widest total, and the sensitivity result obtained by removing the four Yellowhead Trail profiles.

## Documented by Gemini 3.1 Pro

- gpt missed the March 14 ($2.3M) and April 19 ($14.3M) 2022 council amendments to the Snow and Ice Control budget, capturing only the July 4 ($4.7M) amendment for Alternative A.
- gpt relied on a published media fact sheet for the 2023 snow budget instead of assessing the 2023-2026 Operating Budget and Plans and the December 2022 council amendments.

Evidence Gemini 3.1 Pro said it had missed in round 1:

- Spring 2022 Supplemental Operating Budget Adjustment FCS01143 (April 19, 2022) adding $14.3 million to the 2022 Snow and Ice Control budget.
- City Council minutes March 14, 2022 carrying forward $2.3 million to the 2022 Snow and Ice Control budget.
- Operating and Capital Financial Updates providing adjusted year-end budgets and actual expenditures for 2022, 2023, 2024, and 2025.
- Spring 2025 Supplemental Capital Budget Adjustment transferring $430,000 out of CM-20-0330.

## Found at the gate

The source-verification audit found that the frozen brief's selection
rationale (and the first run's intake record, which the brief drew on)
describes the Infrastructure Committee of 2026-08-26 as having declined
administration's recommendation. The committee's minutes (YF-EV-0135)
show the recommendation was never put and a substitute motion to continue
the program under its approved scope was defeated on a tied vote, so the
committee made no decision. The brief is frozen and is not edited; the
error entered from news coverage summarised at intake, it sits in the
rationale and not in any proposition or definition, and no seat relied on
it. The story and claims follow the minutes.

