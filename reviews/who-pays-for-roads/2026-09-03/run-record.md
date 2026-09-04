# Run record: who-pays-for-roads, brief drafting

Date: 2026-09-03. Stage: brief drafted under D-0019. Methodology v1.19.
The brief is NOT frozen and the framing check has NOT been run. This file
is the author's account of what was decided and what is still wrong with
it. It is blunt on purpose.

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
   four, not three: `drivers-pay-for-roads-via-fuel-taxes`,
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

`intake/register.yaml` was not touched. Other sessions are running against
it and the question's lifecycle stays `registered` until a brief is
frozen.

## Decisions, and why

### Two of the four register claims carry no verdict

Both intake triage seats independently returned NO on
`cyclists-are-taxpayers` and `we-pay-for-services-we-dont-use`, the
propositions the register holds as `cyclists-pay-property-taxes` and
`taxes-fund-services-you-dont-use`. Their reasons are that both are
ordinary, undisputed features of the tax system. They are right. Nobody in
the captured thread disputes either one, and a finding on either would be
the exact failure methodology v1.19 exists to name: a panel run on a
question nobody was arguing about.

So the brief carries two claims. This is the one place where I overrode
the shape of the register rather than following it, and it is recorded
here rather than left implicit.

### The denominator is a provincial reporting category, not a City one

The single biggest risk in this question is the roads boundary. The site
has already been burned by it: `at-100m-vs-roads` was built on a
roads-only capital category the adopted budget does not publish, two
readers built different sets from the same brief, and the claim came off
the findings board under v1.19.

So the denominator is the Financial Information Return function "Roads,
streets, walks and lighting", Schedule 9C "Financial Activities by
Function", from Alberta Municipal Affairs' Municipal Financial and
Statistical Data. The reviewer reads a row rather than assembling a set.
The category is defined by the Province for every Alberta municipality, it
separates roads from public transit by definition, and it is compiled from
Edmonton's audited statements.

It also dissolves the capital-versus-operating trap by construction: FIR
function expenses are accrual expenses, so there is no way to set four
years of capital against one year of operating, which is what killed
`at-100m-vs-snow`. The cost of that is that the denominator contains
amortization, which no revenue source pays in the year it is charged. The
brief handles that as a required restatement rather than pretending it
away.

### Fiscal window 2022 to 2024

Three consecutive complete fiscal years, fixed before any figure was seen.
One year would let a single project or grant instalment decide both
verdicts. 2022 to 2024 is the most recent window certain to be filed and
published on the as-of date. 2025 is added as a required alternative
window if Edmonton's 2025 filing is published, which removes the
temptation to let availability quietly move the window.

### Claim 1 carries coverage, not existence

"Drivers already pay for Edmonton's roads through fuel taxes, registration
fees and other vehicle taxes" tested as "some driver-related dollar exists
somewhere" would be a truism with a foregone verdict and would tell no
reader anything. Eight accounts assert it as coverage and build a fairness
argument on it, one of them explicitly ("Right now it's a free ride"). So
the verdict figure is a coverage ratio and the ladder bands it. The one
holder who said "partially" is served by the middle band rather than
failed by default.

### Claim 1's numerator is enumerated, not described

Two doors, both closed. Door (a) admits a transfer only where a named
statute, regulation or program agreement ties the amount or its source to
fuel tax, fuel sales or vehicle registration revenue, and the brief lists
the six instruments the reviewer must work through by name. Door (b)
admits City-collected charges on driving by printed line name. Additions
require a named instrument. Two seats reading this should build the same
set; if they do not, the brief has failed and the framing check should say
so.

Door (b) is included under the primary reading because it is the reading
most favourable to the claim's holders, and the classification without it
is required beside the primary one.

### Claim 2 was split

As registered the claim is compound: "predominantly out of property and
general taxes, **not** fuel taxes or vehicle registration". The negative
half is Claim 1's territory. A single finding over both would state
neither, and would tag four people with a verdict on a claim they did not
make. The brief tests the positive half and says so in the open.

Claim 2's share is a published field rather than a set: total expenses
less attributed revenues, over total expenses, for the same function. The
residual is what general municipal revenue covers.

### Ladder arithmetic, tested boundary by boundary before commit

Claim 1, primary set, ratio r:

| band | interval |
| --- | --- |
| Contradicted | r < 0.25 |
| Partially supported | 0.25 ≤ r < 1.0 |
| Supported | r ≥ 1.0 |

Contiguous at 0.25 and at 1.0, no overlap, no gap, exhaustive over the
reals. Empty numerator gives r = 0, which classifies as Contradicted, not
as a vacuous truth. Numerator equal to or above the denominator gives
Supported. Zero or absent denominator is routed to Not established
explicitly in the shared denominator section, so it is not an undefined
case that silently decides a verdict.

Claim 1, alternative set: Contradicted r < 0.5; Partially 0.5 ≤ r < 0.9;
Supported r ≥ 0.9. Same properties.

Claim 2, primary set, share S:

| band | interval |
| --- | --- |
| Contradicted | S < 0.35 |
| Partially supported | 0.35 ≤ S ≤ 0.5 |
| Supported | S > 0.5 |

Contiguous at 0.35 and at 0.5, no overlap, no gap, exhaustive over the
reals. S = 0.5 exactly is Partially supported, because "most" and
"predominantly" mean more than half. S above 1.0 (possible only if
attributed revenues print negative) is Supported. S at or below zero
(attributed revenues meeting or exceeding expenses) is Contradicted.

Claim 2, alternative set: Contradicted S < 0.4; Partially 0.4 ≤ S ≤ 0.6;
Supported S > 0.6. Same properties.

No band is described in terms that are false at one of its ends. The
earlier draft of Claim 2's middle band said general revenue would be "the
largest single contributor", which is not true at S = 0.35, and it was
rewritten.

### Instrument existence checks

Every dataset and statute the brief names was checked to exist under the
name the brief uses, by web search, before it went in:

- **Municipal Financial and Statistical Data**, Alberta Municipal Affairs
  open data, compiled from the Financial Information Return and the
  Statistical Information Return. Exists.
- **Financial Information Return Manual**, Alberta Municipal Affairs.
  Exists; confirms the function "roads, streets, walks and lighting" and
  confirms it is reported separately from public transit.
- **Schedule 9C, Financial Activities by Function**, and Schedule 9D by
  type/object. Confirmed to exist and to report revenues and expenses by
  function, with totals that must agree between the two schedules.
- **Local Government Fiscal Framework Act** and the LGFF capital funding
  program, which replaced the Municipal Sustainability Initiative in
  2024-25. Exists.
- **City Charters Fiscal Framework Act, SA 2018, c C-13.3**. Exists on
  CanLII.
- **Municipal Sustainability Initiative** and its Basic Municipal
  Transportation Grant component. Exists as a named program.

City documents named in the brief are cited from URLs already in this
repository's evidence registry or its committed review records, not
invented: the 2023-2026 capital and operating budgets, the budget and
finances landing page, the 2025 annual report, and the year-end operating
financial updates for 2023, 2024 and 2025.

I did not research either claim. I checked that the instruments exist and
stopped there.

## Open questions I could not settle

These are for the framing check, for the editor, or for the register.
None of them is resolved in the brief.

1. **The register has no field for a claim a brief does not carry.** The
   register's model says a claim carries no state of its own, with one
   exception, `triage: no` with `ground: right-of-reply`. Two claims under
   this question are declined for a different reason: both intake seats
   said the proposition is undisputed. There is nowhere to record that.
   Right now the only record is `intake.md` and this file, which is worse
   than the register, because the register is the published surface. This
   needs either a second `ground` value or an explicit editor's note field
   on the claim. It is a register change and other sessions are in that
   file, so I did not make it.

2. **I have not confirmed how Schedule 9C treats government transfers.**
   Whether a road capital grant appears as revenue attributed to the roads
   function or only in the by-object schedule changes Claim 2's share
   materially. The brief handles this by requiring the reviewer to
   establish it from the manual and to compute the alternative share both
   ways, but that is a workaround, not knowledge. If the framing checker
   can settle it from the FIR Manual, the brief should be tightened to one
   computation before it freezes.

3. **I have not confirmed that the FIR reports amortization by function.**
   The brief requires the amortization restatement "where the filing
   reports amortization for the function" and requires the reviewer to say
   so if it does not. That conditional is honest but it is a hole: if
   amortization is not available by function, the accrual denominator
   cannot be converted to a cash-outlay one from the primary source at
   all, and the alternative basis has to do that work with the City's own
   boundary, which is the boundary problem again in a smaller form.

4. **The two ladders are not fully independent.** Claim 1's numerator and
   Claim 2's numerator overlap wherever a driver-tied transfer is also
   attributed to the roads function on Schedule 9C. In that region the two
   claims cannot both be Supported. The brief states the relationship
   openly and says a finding on one is not a finding on the other, and it
   says both can fail together, which is the outcome that matters. But a
   framing checker may reasonably say that a verdict ladder partly
   determined by a sibling claim's numerator is a defect. I do not have a
   cleaner design that keeps both claims answerable as their holders make
   them, and I would rather this be argued in the check than papered over.

5. **The window is defensible but arguable.** 2022 to 2024 predates the
   argument the claims were made in, by design, because those are the
   years certainly filed. If Edmonton's road funding mix changed
   materially in 2025 or 2026, the primary window misses it and only the
   four-year alternative catches part of it. Nobody in the thread was
   talking about a particular year, so I judged the structural question
   more important than currency. A checker may disagree.

6. **The FIR is the right container for a funding question only up to a
   point.** It answers "what did Edmonton spend on roads and what revenue
   was attributed to that" cleanly. It does not directly answer "which
   revenue paid for which road", because money is fungible and no
   government publishes that mapping. Every share in this brief is
   therefore an accounting attribution, not a trace of dollars. The brief
   now says so in the denominator section and requires reviewers to record
   it as a limitation. The article will have to say it in the reader's own
   words, which is not this stage's job.

7. **The 2025 filing's availability is unknown to me.** The required
   alternative four-year window is written conditionally for that reason.
   If the checker can establish that Edmonton's 2025 FIR is published on
   the as-of date, the window should probably be fixed at 2022 to 2025 and
   the conditional removed.

8. **I did not verify the Schedule 9C row label for Edmonton
   specifically.** I verified the schedule and the function exist in the
   FIR's design. I did not open Edmonton's own filing. If Edmonton files
   under a variant label, the brief's fallback covers it, but a fallback
   that fires on the primary basis is a weak brief.

9. **Whether "other vehicle taxes" should include federal GST on parts,
   repairs and fuel.** One captured wording names "tire taxes and various
   consumption taxes on vehicles, repairs and parts". The brief reports on
   these as a qualification and does not count them in the ratio unless an
   instrument ties them under door (a). That is the right call on the
   instrument test, but it is a call, and a holder of the claim could say
   it drains part of their meaning. Named here so the checker can rule on
   it rather than discover it.

## Things a reader of this file should not mistake

- No figure in the brief is asserted. The brief names documents, tables,
  schedules and fields, and requires the panel to produce the figures. I
  verified that the named instruments exist; I did not look up a single
  budget number, and none appears in the brief.
- The framing check has not run. This brief is a draft and the different-
  vendor check happens later on a different budget, per the constraint on
  this session.
- Where the brief predeclares what it will not claim, the article may not
  claim it either. That binds the two declined claims in particular:
  nothing published under this question states a finding about whether
  cyclists pay taxes.
