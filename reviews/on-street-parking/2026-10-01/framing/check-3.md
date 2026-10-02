<!-- Framing check 3 on the brief revised 2026-10-01 after check 2 (prompts/framing-check.md, methodology v1.42), the last of the three reports the v1.12 cap allows. Checker: OpenAI gpt-6-sol at high via `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, codex-cli 0.159.3, prompt on stdin, run from an empty scratch directory with no repository access, live web search enabled; the run log records model gpt-6-sol. Package: the framing prompt, intake.md, the revised brief.md (sha256 ba2a027e728ba6fc1b588983355c6ec2b02826e2a21e3e6f0659deb845798da0), the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, check-1.md, response-1.md, check-2.md and response-2.md, with no local paths (package sha256 df01ed178b0f5c69877f5f02bca8e2cab4be9dc4c94b1862d4edbb1bdbe48c80). Run by Stew, 2026-10-02 06:06 to 06:10 UTC (the evening of 2026-10-01 in Edmonton). Verdict: REVISE; every earlier finding RESOLVED; two standing findings, one defect on check 4 and one framing finding on check 9, each with copy-ready replacement text and neither asking for a park, so the brief goes to the methodology v1.39 wording-confirmation route. Report is verbatim; nothing below this line was edited. -->

Verdict: REVISE

This is **framing check 3**, the final framing report under the v1.12 cap. Both earlier reports’ findings are resolved. Two new findings remain; the first is a mechanical completeness defect, and the second overstates what the parking record cannot answer.

1. **Provenance — OK.** The brief identifies the captured wordings, the grouping and triage, and the limit of the accessible thread.

2. **Proposition versus post — OK.** It tests the commenters’ generalisation while stating beside the verdict that a route-level result cannot establish a particular resident’s or business’s loss.

3. **Strongest fair reading — OK.** The full-block primary reading and any-removal alternative are distinct and measurable.

4. **Operationalization and alternatives — [defect].** The formal rule puts in U only routes that *could be eligible* under the denominator being reported. The reviewer instruction instead says, “A route whose facility type or parking entry is undetermined is in U.” Under the on-street denominator, that would put a route already known to be an off-road shared pathway in U merely because its parking entry is undetermined. An ineligible row could then move the bounds into different bands and decide **Not established**. Replace the entire “Count the unknown” instruction with:

   > **Count the unknown.** Under each denominator, put a route in U only if it could belong to that denominator and its facility type or parking entry prevents classification. A route excluded by a determined facility type is not in U for that denominator, even if its parking entry is undetermined. The bounds under the completeness rule carry U; a share that leaves eligible unknown routes out is not a finding.

   The brief supplies the required alternatives for its dates, unit, denominator, removal reading, route set and bands. No further alternative is needed. I confirmed the [City’s route table and Parking Change(s) column](https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project), the [132 Avenue renewal record](https://www.edmonton.ca/transportation/on_your_streets/132-avenue-renewal), [capital profile CM-20-0330](https://www.gov.edmonton.ab.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf), the [Curbside Management Strategy](https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/Curbside-Management-Strategy.pdf), and the City’s listing of the [2026 Parking Operations Audit](https://www.edmonton.ca/city_government/city_organization/city-auditor). This check could not retrieve the exact Wayback captures, their bytes or hashes, or the meeting-portal files. That remains a verification limit, not evidence that they are absent.

5. **Expected finding — OK.** No instruction points the panel toward a verdict on the claim under review.

6. **Checkability — OK.** The remaining proposition concerns the City’s stated route changes. The brief keeps the unnamed business account, parking cost and policy opinions outside that verdict.

7. **Scope traps — OK.** The 132 Avenue example is checked separately and does not enter the programme count.

8. **Stakes — OK.** Supported and Contradicted would change what opposing readers can say about the programme-wide pattern, without purporting to settle losses at individual homes or businesses.

9. **Who asks this — [framing].** The brief says, “The City does not publish a count of stalls removed by route,” “No City record identified at intake counts the on-street stalls a route removed,” and “how many stalls any route removed, which no identified City record counts.” Those statements are too absolute. The brief’s own removal rule anticipates a stated number of stalls at a corner, and the [City route table](https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project) gives an approximate two-stall figure for one Holyrood change. That is not a consistent inventory from which to total programme-wide losses. Replace the three quoted passages, respectively, with:

   > The route table sometimes estimates stalls for a particular change, but it does not provide comparable stall totals across the programme. This record cannot answer how many stalls the programme removed.

   > Some route entries give an approximate stall count for a particular removal, but no identified City record gives comparable stall totals for every programme route.

   > a programme-wide stall total or a comparable total for every route; report any route-specific estimate the City does give.

**Earlier findings:** Check 1 — RESOLVED for provenance, proposition limits, the full-block rule, the unclassified remainder, majority bands, fixed alternative date, programme scope, stakes and the named-street distinction. Check 2 — RESOLVED for the snapshot’s timing, the open-or-underway label and the description of exactly one half. None is WEAKENED or OPEN.

A holder would recognize the programme pattern and named-street examples being tested, but could still mistake “no stall count” for “the City gives no stall estimate anywhere.” An opponent would get a consequential programme test, but the broad U instruction could make an off-road route’s missing parking entry defeat a verdict. The replacements remove those errors without changing the claim or its cutoffs.

Both standing findings have copy-ready replacements. A third-round **REVISE** parks the brief under v1.12 unless the editor uses the exact-wording confirmation route in v1.39; this report is not a defect confirmation.

