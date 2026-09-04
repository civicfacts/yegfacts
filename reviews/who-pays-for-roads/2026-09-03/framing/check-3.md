<!-- Framing check 3, the final report under the three-report cap (prompts/framing-check.md, methodology v1.19 and the v1.12 cap). Checker: OpenAI gpt-5.6-sol via `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, package piped on stdin from a scratch directory outside the repository; the checker had no repo access. The package added check-2.md and resolution.md to the check-2 package. Run 2026-09-03 by Stew. The pinned command above is the record of which model ran. Text below is verbatim and unedited. Three of this report findings were verified against their sources afterwards and two did not hold; see run-record.md. Nothing in this file is edited on that account. -->

Verdict: REVISE

This is report 3. Under the three-report cap, the brief is parked and is not frozen.

## 1. Provenance

**Earlier account-count finding: RESOLVED.**

The brief now distinguishes the eight driver-charge accounts, four property/general-tax accounts, and three adjacent accounts correctly.

**New finding: OPEN.** The intake overstates the completeness of the source capture:

> "One source, captured whole and read end to end."

The extraction record shows Facebook displayed 669 comments, while 621 accessible records were captured after two stable end passes. The unresolved 48-comment gap means the brief cannot describe this as a whole-source intake or claim representativeness for the complete displayed thread.

Replace with:

> "One source was captured to the limit Facebook exposed. Facebook displayed 669 comments; the capture contains 621 accessible records after two stable end passes exposed no further comments or replies. The unresolved 48-comment gap means the account counts, balance, and selection ranking apply to the accessible capture, not necessarily to the complete displayed thread."

Replace "whole-source intake," "full comment thread," and "most evenly split question in that source" throughout with wording limited to the 621 accessible records.

## 2. Does the proposition test what the post asserts?

**Claim 1 folding finding: RESOLVED.**

The brief now makes full coverage the verdict-carrying reading only for wordings that imply coverage. It excludes "partially," "help pay," and other contribution-only wordings from that verdict and requires their amount and share to be reported separately.

**Claim 2 finding: RESOLVED.**

`roads-funded-by-property-taxes` is parked rather than converted into a verdict on an adjusted residual. That is the correct schema-compatible treatment.

## 3. Is it the strongest fair reading?

**Claim 1 finding: RESOLVED.**

The coverage proposition preserves the magnitude in the strong circulating forms without applying it to the weaker forms.

**Claim 2 finding: RESOLVED.**

The revision no longer replaces the property/general-tax claim with a measurable cousin. It states that the record cannot answer the claim at the level asserted.

## 4. Operationalization and its alternatives

The following earlier findings are **RESOLVED**:

- 2023-2025 primary window and 2022-2025 alternative.
- One FIR workbook per reporting year.
- Full "Roads, Streets, Walks, Lighting" boundary.
- Audited "Roadway and parking" alternative, excluding transit.
- Accrual cost distinguished from cash spending.
- Road attribution required before counting broad transfers.
- Schedule 9E column 1 disaggregated before entering the primary numerator.
- Tire environmental fee given an explicit route through the test.
- Purchased capital additions used as the capital denominator; donated assets and debt movements treated separately.
- Capture-date alternative.
- Required constant-2025-dollar calculation.
- Traffic Safety Act sections 52 and 64 plus the Registry Agent Product Catalogue.
- Both cutoff sets. No further threshold alternative is required.

Three defects remain.

### FIR transfer treatment and accounting-gap formula: OPEN

The brief says:

> "The manual states that Total General Revenue should normally include [...] all federal and provincial government operating and capital transfers."

It then defines:

> `Gap = (total expenses − function revenue − road-attributed transfers) ÷ total expenses`

I could not verify the quoted transfer rule. The accessible Alberta Municipal Affairs FIR manual says Total General Revenue normally includes federal and provincial **unconditional** transfers. It defines Schedule 9E column 2 as a functional breakdown of provincial capital transfers. Alberta's official 2024 changes bulletin does not identify a change to the line 0700 rule. A filed 2024 FIR also shows Schedule 9E provincial capital transfers alongside Schedule 9C function revenue, demonstrating why the two fields must be reconciled before subtraction. This makes double deduction possible under the present formula. [Alberta FIR manual](https://municipalaffairs.gov.ab.ca/documents/2018-FIR-manual.pdf), [2024 reporting changes](https://www.alberta.ca/system/files/ma-changes-to-financial-reporting.pdf), [filed 2024 FIR](https://mountainviewcounty.com/Home/DownloadDocument?docId=8311028c-fe69-4c06-96ad-d8f2bd99d09b)

Replace with:

> "Reviewers quote the applicable 2024 manual definitions for Total General Revenue, Function Revenue, and Schedule 9E column 2. Before calculating the accounting gap, they reconcile whether each road-attributed transfer is already included in Schedule 9C function revenue.  
>   
> Gap = (total expenses − function revenue − separately identified road transfers not already included in function revenue) ÷ total expenses.  
>   
> No amount may be deducted twice."

The parked-claim explanation must also stop saying that Schedule 9C places every federal and provincial transfer in the general pool unless the cited 2024 manual expressly establishes that.

### eScribe source metadata: OPEN

The editor said this would be added, but the revision still gives only:

> "2023, https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=215334;  
> 2024, https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=252517;  
> 2025, https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=291514."

The brief tells reviewers to reconstruct the report names, numbers, meeting dates, items, and agenda URLs. That does not implement the earlier finding.

Replace the list with:

> - 2023: Financial and Corporate Services report FCS02229, "Operating Financial Update - December 31, 2023," City Council, March 12, 2024, item 7.4, [agenda page](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=812acb12-0c9d-4427-af78-f632446522bd&Item=27&Tab=attachments&lang=English), plus the attachment URL.
> - 2024: Financial and Corporate Services report FCS02841, "Operating Financial Update - December 31, 2024," City Council, March 18, 2025, item 7.2, [agenda page](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=f49fd47d-d94d-4ec6-afde-600366e89d9a&Item=25&Tab=attachments&lang=English), plus the attachment URL.
> - 2025: Financial and Corporate Services report FCS03314, "Operating Financial Update - December 31, 2025," City Council, March 17, 2026, item 7.2, [agenda page](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=86bee574-31e8-424f-abbb-978f946337f3&Item=30&Tab=attachments&lang=English), plus the attachment URL.

### Renamed federal transfer program: OPEN

The brief lists:

> "The Canada Community-Building Fund as administered in Alberta"

By the 2026-09-03 freeze date, the federal government had renamed CCBF as the Build Communities Strong Fund, Community stream. The Alberta URL now redirects to the renamed program. The old name remains relevant to the 2023-2025 window, but it is not the instrument's as-of-date name. [Alberta program page](https://www.alberta.ca/build-communities-strong-fund-community-stream), [federal July 2026 guidance](https://infrastructure.gc.ca/pub/signage-panneaux/guidelines-lignesdirectrices-eng.php?wbdisable=true)

Replace with:

> "The Build Communities Strong Fund, Community stream, formerly the Canada Community-Building Fund and called CCBF during the 2023-2025 reference window, as administered in Alberta."

## 5. Does the brief leak an expected finding?

**Earlier leak finding: RESOLVED. OK.**

The City Charters instruction is now neutral. The brief does not tell reviewers what Claim 1's evidence should produce.

## 6. Is the claim checkable at all?

**Claim 1: RESOLVED. OK**, subject to correcting the source-definition defects under check 4.

**Claim 2: RESOLVED. OK.** It is correctly parked because the named record cannot carry the requested verdict. The policy and fairness arguments remain excluded.

## 7. Scope traps

**Earlier scope findings: RESOLVED. OK.**

Broad grants, fines, undifferentiated user charges, capital additions, provincial highways, and adjacent questions are now handled within defensible boundaries. The remaining transfer problem is an accounting-definition defect under check 4, not a new scope expansion.

## 8. Stakes

**Earlier stakes findings: RESOLVED. OK.**

Supported, Partially supported, Contradicted, and Not established would each change what Claim 1's holders and opponents can maintain. The parked claim's documented silence is also described without turning the accounting gap into evidence for either side.

## 9. Who asks this?

**Earlier finding: RESOLVED. OK.**

The resident question is natural. Claim 1 names the narrower published function in reader-facing terms, and the brief says plainly that the record cannot answer the property/general-tax half at the requested level.

A holder of the driver-pays view would now recognize the strong coverage claim and see contribution-only statements protected from the coverage verdict. An opponent would accept the tighter numerator and the decision not to manufacture a property-tax verdict. Both should still reject the current package's claim to be a whole-thread intake and the accounting-gap formula's risk of deducting transfers twice. The renamed program and missing eScribe metadata are narrower defects, but the first two go directly to representativeness and calculation validity. The brief therefore cannot freeze.


