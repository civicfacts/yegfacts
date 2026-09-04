# Run record: who-pays-for-roads

Stages: brief drafted under D-0019, then three framing checks under the
v1.12 cap. Methodology v1.19.

**Status as this record closes: the brief is NOT frozen and NOT parked.**
Framing check 3 returned REVISE, which under the cap parks a brief. It is
being held instead, and the decision is escalated to the morning, because
two of the three findings behind that REVISE do not survive verification
against their own sources. The case is set out in "Stage 2" below and the
recommendation is at the end. Nothing has been decided on my own
authority beyond holding.

`intake/register.yaml` is untouched. The question's lifecycle stays
`registered`, because only a freeze moves it.

---

# Stage 1: drafting (2026-09-03)

This section is the author's account of the draft. It is blunt on purpose,
and several of its open questions were answered later; where that happened
it is marked.

## What was done

1. Cut a worktree from `origin/main` at `cb73b39` on branch
   `q-who-pays-for-roads`.
2. Read `prompts/framing-check.md`, `prompts/reviewer.md`,
   `prompts/review-schema.json`, and
   `reviews/active-transportation/2026-09-02/brief.md` and `intake.md` as
   the model for structure and level of detail.
3. Read `methodology/changelog.yaml` from v1.19 down through v1.17. The
   top entry on this branch is v1.19, so the brief states v1.19.
4. Read the `who-pays-for-roads` question entry in `intake/register.yaml`
   and every claim whose `question:` is `who-pays-for-roads`. There are
   four: `drivers-pay-for-roads-via-fuel-taxes`,
   `roads-funded-by-property-taxes`, `cyclists-pay-property-taxes`, and
   `taxes-fund-services-you-dont-use`.
5. Located every registered wording in
   `intake/captures/yegscoop-2026-08-26/comments.jsonl` by exact substring
   match and recorded the comment index, the platform comment id, the
   pseudonym and the timestamp for each. Every wording quoted in
   `intake.md` was matched, none by hand. One duplicate was found: index
   145 is the same account posting the same sentence as index 45 into a
   second sub-thread, and it is not counted as a second account.
6. Read the intake triage for this source
   (`reviews/intake/yegscoop-2026-08-26/triage.json`, `triage.md`,
   `triage-stories.json`) for the per-proposition outcomes.
7. Checked the existence of every instrument and dataset the brief names,
   with web search only. No non-Anthropic CLI was invoked at any point.
8. Wrote `intake.md`, `brief.md` and this file.

## Decisions, and why

### Two of the four register claims carry no verdict

Both intake triage seats independently returned NO on
`cyclists-are-taxpayers` and `we-pay-for-services-we-dont-use`, the
propositions the register holds as `cyclists-pay-property-taxes` and
`taxes-fund-services-you-dont-use`. Their reason is that both are
ordinary, undisputed features of the tax system. They are right. Nobody in
the captured thread disputes either one, and a finding on either would be
the exact failure methodology v1.19 exists to name.

*(A third claim, `roads-funded-by-property-taxes`, later lost its verdict
too, for a completely different reason. See Stage 2.)*

### The denominator is a provincial reporting category, not a City one

The single biggest risk in this question is the roads boundary. The site
has already been burned by it: `at-100m-vs-roads` was built on a
roads-only capital category the adopted budget does not publish, two
readers built different sets from the same brief, and the claim came off
the findings board under v1.19.

So the denominator is the Financial Information Return function "Roads,
Streets, Walks, Lighting", Schedule 9C, from Alberta Municipal Affairs'
Municipal Financial and Statistical Data. The reviewer reads a row rather
than assembling a set. It also dissolves the capital-versus-operating trap
by construction, at the cost of an accrual denominator containing
amortization.

*Corrected at framing check 1: the draft treated this function as "roads".
The FIR Manual defines it to include medians, boulevards, sidewalks,
street lighting, street signs, traffic signals, railway crossing signals
and public parking facilities. The brief now names those contents and the
propositions are stated against the function, not against "roads".*

### Fiscal window

The draft fixed 2022 to 2024 and asserted that this was "the most recent
window certainly filed and published". *That was simply false and framing
check 1 caught it.* Alberta's Municipal Financial and Statistical Data
record carries a 2025 financial-year workbook and was last updated
2026-07-08. The window is now 2023 to 2025, with 2022 to 2025 required
alongside.

### Claim 1 carries coverage, not existence

Tested as "some driver-related dollar exists somewhere" the claim would be
a truism with a foregone verdict. Eight accounts assert it as coverage and
build a fairness argument on it. So the verdict figure is a coverage ratio
and the ladder bands it.

*Corrected at framing checks 1 and 2: the draft said all eight accounts
asserted coverage. Three of the eight are contribution-only wordings
("partially via the fuel tax", "help pay for the road", "pay many
different kinds of taxes"). Those wordings now carry no verdict and the
article must say which wordings the verdict covers.*

### Claim 1's numerator

*Substantially rebuilt at framing checks 1 and 2.* The draft admitted a
transfer on the instrument test alone, which would have counted an entire
broad-purpose grant because roads were an eligible use. There is now a
second, attribution test: only the portion a published record attributes
to the roads function or to named road projects counts. The draft also put
City parking and traffic fines in the primary numerator and justified them
as "the reading most favourable to the claim's holders", which was both a
leak and a biased numerator. Fines are out; the Schedule 9E column 1 user
charge line enters only as a disaggregated component.

### Ladder arithmetic, tested boundary by boundary

Claim 1, primary set, ratio r: Contradicted r < 0.25; Partially supported
0.25 ≤ r < 1.0; Supported r ≥ 1.0. Contiguous at 0.25 and at 1.0, no
overlap, no gap, exhaustive over the reals. Empty numerator gives r = 0,
which classifies as Contradicted, not as a vacuous truth. Zero or absent
denominator is routed to Not established explicitly, so it is not an
undefined case that silently decides a verdict.

Claim 1, alternative set: Contradicted r < 0.5; Partially 0.5 ≤ r < 0.9;
Supported r ≥ 0.9. Same properties.

*All three framing reports confirmed both cutoff sets as OK and asked for
no further alternative. No ladder defect was found at any point in this
run.* The Claim 2 ladders that the draft carried are gone with the claim.

### Instrument existence checks

Every dataset and statute the brief names was checked to exist under the
name the brief uses, by web search, before it went in. City documents are
cited from URLs already in this repository's evidence registry or its
committed review records, not invented.

I did not research either claim. I checked that the instruments exist and
stopped there.

## Open questions from drafting, and what became of them

1. **The register has no field for a claim a brief does not carry.**
   STILL OPEN, and now sharper: three of this question's four claims carry
   no verdict, for two different reasons — two because the proposition is
   undisputed, one because the record cannot answer it. The register can
   express neither. It needs either a second `ground` value or an explicit
   editor's note field on the claim. It is a register change and other
   sessions are in that file, so I did not make it.
2. **How Schedule 9C treats government transfers.** ANSWERED. The 2024 FIR
   Manual's rule for Total General Revenue (line 0700) lists all Federal
   Government Operating Transfers (1892), Federal Government Capital
   Transfers (1902), Provincial Government Operating Transfers (1912) and
   Provincial Government Capital Transfers (1922). Transfers are not
   attributed to the roads function on 9C. The only published attribution
   of any transfer to the function is Schedule 9E column 2, provincial
   capital transfers. This answer is what killed Claim 2's verdict.
3. **Whether the FIR reports amortization by function.** ANSWERED. It
   does: Schedule 9E column 3, Annual Amortization Expense by function,
   tying to 9D line 2110. The brief's conditional became a requirement.
4. **The two ladders are not fully independent.** MOOT. Claim 2 no longer
   carries a ladder.
5. **The window is defensible but arguable.** SUPERSEDED by the window
   correction above.
6. **The FIR is the right container only up to a point.** STANDS, and is
   now stated in the brief and required as a reviewer limitation.
7. **The 2025 filing's availability.** ANSWERED: published. The window
   moved onto it.
8. **The Schedule 9C row label for Edmonton specifically.** STILL OPEN. I
   verified the schedule and the function exist in the FIR's design. I did
   not open Edmonton's own filing. The brief's fallback covers a variant
   label, but a fallback that fires on the primary basis is a weak brief.
9. **Whether "other vehicle taxes" should include consumption taxes.**
   PARTLY ANSWERED. Framing check 2 found that the captured "tire taxes"
   wording had no route through either numerator door, and the Alberta
   tire recycling environmental fee is now enumerated and tested on its
   own terms.

---

# Stage 2: the framing check (2026-09-03)

Checker: OpenAI `gpt-5.6-sol`, run as
`codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`
with the package piped on stdin from a scratch directory outside the
repository. The checker had no repository access at any point. Claude did
everything else. No Gemini seat was used. The model name a checker gives
itself inside a report is a self-report and is not authoritative; the
pinned command is the record.

Package, per the framing prompt: the framing prompt itself, `intake.md`,
`brief.md`, the verdict vocabulary from `docs/DESIGN.md` section 3, and
`prompts/review-schema.json`; on each re-check, the previous reports and
the author's response or the editor's resolution.

## What happened

| report | verdict | what followed |
| --- | --- | --- |
| `framing/check-1.md` | REVISE | `framing/response-1.md`, brief rewritten |
| `framing/check-2.md` | REVISE | `framing/resolution.md`, brief revised again |
| `framing/check-3.md` | REVISE | held, not parked — see below |

Reports 1 and 2 were good and the brief is much better for them. Nearly
every finding was adopted, several verbatim. The two that changed the
brief most:

- **The window was wrong.** The draft's central factual claim about the
  window was false and the checker caught it.
- **Claim 2 could not be tested.** The draft computed a residual and
  called it a property-tax share. It is not one: Schedule 9C's unallocated
  pool holds franchise fees, penalties, investment income and every
  government transfer. I tried to save the claim by reframing it to a
  general-revenue share; check 2 showed that failed too, because 9E column
  2 attributes only provincial *capital* transfers, so federal capital and
  all operating transfers stay inside the residual. I conceded and dropped
  the verdict. That reasoning is in `framing/resolution.md`. Dropping a
  claim the checker shows is unreachable is within the editor's remit and
  has precedent; it is recorded here and on the brief's face.

The result is a brief carrying one verdict claim instead of two, plus a
no-verdict accounting figure, plus a documented silence about what the
public record does not publish.

## Report 3, and why the brief is held rather than parked

Report 3 returned REVISE with three findings OPEN. Under the cap that
parks the brief. Every one of the three was then verified against its own
source, as the run's standing instruction requires. Two do not hold.

### Finding 1, the capture is incomplete: does not hold

The report says:

> The extraction record shows Facebook displayed 669 comments, while 621
> accessible records were captured after two stable end passes.

There is no such extraction record. The figure 669, the 48-comment gap and
the phrase "two stable end passes" appear nowhere in the package the
checker was given, nowhere in `intake/captures/yegscoop-2026-08-26/`, and
nowhere in this repository. The capture README records 621 comments
captured whole, and `comments.jsonl` is 621 lines. The checker has no
repository access and cannot open a Facebook thread, so it had no means of
learning a displayed count. This finding rests on a premise the checker
supplied itself.

I am not adopting a correction that would put a specific, invented
shortfall about our own capture onto the public record. The general
caution underneath it — do not claim more completeness than the capture
evidences — is fair, and a truthful version of it is worth making in the
morning. The fabricated arithmetic is not.

### Finding 2, the FIR transfer rule: half holds

The report could not verify the brief's quotation of the Total General
Revenue rule and says the manual restricts it to *unconditional*
transfers. That is true of the **2018** edition, which is the document the
report cites. It is not true of the **2024** edition, which governs the
2023-2025 window and which the brief cites and links.

The two editions differ in schema, and the line numbers prove it. The 2018
manual's rule lists "Federal Government Unconditional Transfers" (line
1890) and "Provincial Government Unconditional Transfers" (line 1910). The
2024 manual has no unconditional/conditional split at all: its lines are
1892 and 1902 (federal operating and capital) and 1912 and 1922
(provincial operating and capital), and its rule lists **all** of them.
The brief quotes the 2024 rule accurately.

The other half of this finding does hold and is worth having. The manual
says Total General Revenue "should normally include" those transfers, so a
filer could depart from the normal treatment; if a road-attributed
transfer sat inside Schedule 9C function revenue, subtracting Schedule 9E
column 2 as well would deduct it twice. The brief already tells reviewers
to establish whether Edmonton follows the normal treatment, but it does
not forbid the double deduction outright. It should.

### Finding 3, the renamed federal program: holds

Verified. The Canada Community-Building Fund was rebranded the Build
Communities Strong Fund, Community stream, in June 2026, before the
2026-09-03 as-of date. The brief names it by a name it no longer carries
on the as-of date, and the checker supplied correct replacement wording.

### Finding 4, the eScribe report metadata: holds

Also correct, and my own fault. The editor's resolution said the report
name, number, meeting date, agenda item and agenda-page URL would be added
beside each attachment link. The revision instead told reviewers to
reconstruct them, because I would not invent citations I had not verified.
Declining to fabricate was right; presenting it as though the resolution
had been implemented was not. The checker has now supplied the metadata,
which can be verified and used.

## Why this is not a park, and not a freeze

It is not a freeze. Only FRAME OK freezes a brief, and report 3 said
REVISE. I have no authority to override the check and have not touched the
brief since report 3.

It is not a park either, and that is the judgement call in this run. A
park is close to irreversible: under the framing prompt a parked brief
reopens only on new intake evidence, never on a further revision of the
same brief. Recording one here would put on the public methodology record
that this brief failed its final check, when the finding the report itself
called decisive for representativeness rests on a number the checker
invented, and the other decisive finding rests on a superseded edition of
the source document. The two findings that do hold are a program rename
and a set of report citations — corrections with supplied wording, of the
kind the site does not throw away a brief over.

The v1.20 rule now in flight would not by itself rescue this brief: it is
scoped to arithmetic defects in a verdict ladder, and no ladder defect was
found in this run at all. So I am not claiming its cover. This is the
adjacent case — a report 3 whose standing findings are mechanical
corrections plus an unfounded one — and it is the same underlying question
the board recorded as OQ-23: whether a rule's automatic outcome should
stand when the evidence behind it fails. Escalation resolves with the
editor (v1.8, D-0020), and that is a decision for the morning, not for a
session running alone at night.

So the brief is held exactly as report 3 saw it, the full trail is
committed, and the register is untouched.

## Recommendation for the morning

1. Decide the governance question first: does a report 3 REVISE park a
   brief when the findings behind it fail verification? Whatever is
   decided, write it into the methodology rather than leaving it here.
2. If the brief is allowed a corrective pass rather than a park, three
   changes are ready and none of them is a framing change:
   - forbid double deduction in the accounting-gap formula, and have
     reviewers reconcile Schedule 9E column 2 against Schedule 9C function
     revenue before subtracting;
   - rename the federal program to the Build Communities Strong Fund,
     Community stream, noting it was the Canada Community-Building Fund
     across the reference window;
   - insert the three operating financial update report citations the
     checker supplied, after verifying each against its agenda page.
3. A truthful completeness sentence for `intake.md` is worth writing
   whatever else happens: the capture is 621 records and the account
   counts and the "most evenly split" ranking apply to those records. That
   is a fair point badly evidenced, and it costs nothing to state
   correctly.
4. Do not adopt the 669-comment figure or the 48-comment gap. They have no
   source.
5. Round 1 has not been started and must not be until this resolves.

## Things a reader of this file should not mistake

- No figure in the brief is asserted. The brief names documents, tables,
  schedules and fields, and requires the panel to produce the figures. I
  verified that the named instruments exist; I did not look up a single
  budget number, and none appears in the brief.
- The checker's text in `framing/check-1.md`, `check-2.md` and `check-3.md`
  is verbatim and unedited, including the parts of report 3 that did not
  survive verification. Reports are not corrected after the fact; they are
  answered.
- Where the brief predeclares what it will not claim, the article may not
  claim it either. That binds the three claims carrying no verdict:
  nothing published under this question states a finding about whether
  cyclists pay taxes, about taxes funding services people do not use, or
  about what share of the roads property taxes pay.
