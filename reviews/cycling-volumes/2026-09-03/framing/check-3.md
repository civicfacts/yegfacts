<!-- Framing check 3 on the cycling-volumes brief (prompts/framing-check.md, methodology v1.18), the confirmation report and the last permitted under the v1.12 cap of three. Checker: OpenAI gpt-5.6-sol via `codex --search exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, run 2026-09-03 by Stew. Package: the framing-check prompt, intake.md, the twice-revised brief, the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, register-note.md, check-1.md, response-1.md, check-2.md and resolution-2.md. Live web search enabled. The verdict is REVISE, so under methodology v1.12 the brief is PARKED and is not frozen; it reopens only on new intake evidence, never on a further revision of the same brief. Verbatim below the rule. -->

Verdict: REVISE

1. **Provenance: OK.** The intake captures each circulating form and its context. The dropped Heritage Days claim and the current `/considered` limitation are accurately recorded.

2. **Does the proposition test what the post asserts?: OK.** Claim 3 now separates rider-participation forms from lane-user forms and forbids comparison between them. Claim 4 openly states its nearest-level substitution. Claim 2 names the metered-lane scope.

3. **Is it the strongest fair reading?: FINDING.** Claim 1 says `"Partially supported if the total is ... at or above 1.50 million"` and `"Contradicted if the total is ... above 1.95 million."` Every total above 1.95 million therefore receives two verdicts. The required alternative also leaves exactly 1.43 million unclassified. This fails the editor's adopted upper-bound resolution and can make the panel return the wrong verdict. Replace the relevant rules with:

   `"Partially supported if the total is at least 0.65 million and below 1.10 million, or at least 1.50 million and at most 1.95 million. Contradicted if the total is below 0.65 million or above 1.95 million."`

   For the alternative:

   `"Partially supported if the total is at least 0.65 million and below 1.17 million, or at least 1.43 million and at most 1.95 million."`

4. **Operationalization and its alternatives: FINDING.** Two defects remain.

   - Claim 1 says a Supported or Partially-supported-above verdict may stand when the window is short by up to fourteen days because missing days can only increase the total. That reasoning works only for Contradicted-above. A subtotal inside the Supported band could cross 1.50 million when the missing days are added. A Partially-supported-above subtotal could cross 1.95 million. Replace the short-window rule with: `"If the published record does not cover 2026-01-01 through 2026-07-31, return Not established. Report the available subtotal, exact dates and direction of uncertainty as qualifications."`
   - Claim 2 permits a verdict when only four fifths of the fixed counter set is classifiable, yet Supported and Contradicted make statements about the metered lanes as a set. An unclassified counter can change Supported or Contradicted to Partially supported. Replace with: `"Supported, Partially supported or Contradicted may be returned only if every counter in the verdict set is classifiable. Otherwise return Not established and report the observed counters as qualifications."`

   The instrument descriptions otherwise check out. The City publishes the [Eco-Counter dataset and linked location dataset](https://dev.socrata.com/foundry/data.edmonton.ca/tq23-qn4m), and describes the [2015 one-day household survey and Navigating Tomorrow successor](https://www.edmonton.ca/transportation/traffic_reports/household-travel-survey). Statistics Canada confirms that the [CCHS public-use file uses health-region geography](https://www150.statcan.gc.ca/n1/pub/82m0013x/82m0013x2024001-eng.htm), and that the [2021 Census commuting variable and universe](https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/definition-eng.cfm?ID=pop177) exist as described. The [ten-CMA commuting table](https://www150.statcan.gc.ca/n1/daily-quotidien/240826/t002a-eng.htm) also exists. The City's published Insight material identifies it as a [non-random online panel](https://www.edmonton.ca/programs_services/documents/PDF/August2019MixedTopicReport.pdf), as the brief states.

5. **Does the brief leak an expected finding?: OK.** The directional headings and assumed magnitudes remain removed.

6. **Is the claim checkable at all?: OK.** The editor's decision to send claims 3 and 4 to the panel is a defensible editorial call. The brief records the unsuccessful source search, rules known non-representative or mismatched instruments out, permits a qualifying instrument to carry the verdict if found, and requires a bounded Not established result otherwise. The checker's contrary position remains preserved in the record.

7. **Scope traps: OK.** Participation, lane use, passages, trips and commuting remain distinct. The two lane-user forms under Claim 3 are reported only as unmeasured qualifications.

8. **Stakes: OK.** The brief states what each verdict changes for both sides and makes clear that none decides whether bike-lane policy or spending is justified.

9. **Who asks this: OK.** The brief states the question a resident would ask, admits that no instrument answers it directly, and names the nearest measurable levels without presenting any one as a count of distinct lane users.

A holder of the low-use view should accept the one-sided readings of "only," the preservation of the lane-use wordings, and the limited scope of the metered-lane claim. An opponent should accept the denominator separation, the exclusion of opt-in panels from population verdicts, and the qualifications on unmetered lanes. Neither side should accept a Claim 1 rule that assigns two verdicts to the same total or lets an incomplete seven-month subtotal carry a two-sided magnitude verdict. Nor should either accept an all-counter conclusion when as much as one fifth of the fixed counter set is unclassified.

- **Report 1 finding 1: RESOLVED.** Provenance and the register-note description are accurate.
- **Reports 1 and 2 finding 2: RESOLVED.** Rider-participation and lane-user forms are no longer compared.
- **Report 1 finding 3: RESOLVED.** Claims 3 and 4 retain one-sided ceilings.
- **Report 1 finding 4a and report 2 CCHS-geography finding: RESOLVED.** The reference period is fixed and the CCHS geography is correctly limited.
- **Report 1 finding 4b and report 2 finding 6: RESOLVED.** The editor's contrary decision on sending claims 3 and 4 is defensible and fully recorded.
- **Report 1 finding 4c and report 2 short-window finding: WEAKENED.** The allowance is reduced to fourteen days, but incomplete data may still carry Supported or Partially-supported-above when the missing days could change the classification.
- **Report 1 finding 4d: RESOLVED.** The retired visualization is not relied on, the location dataset is named, and Claim 2's period is corrected.
- **Report 1 finding 5: RESOLVED.** Expected-direction language remains removed.
- **Report 1 finding 6: RESOLVED.** Claim 2 is explicitly limited to metered lanes.
- **Reports 1 and 2 finding 7: RESOLVED.** Participation figures cannot support or challenge lane-user forms.
- **Report 1 finding 8: RESOLVED.** Stakes and common verdict meanings are complete.
- **Report 1 finding 9: RESOLVED.** The brief states that the resident's question cannot be answered directly.
- **Report 2 finding 3: OPEN.** Claim 1's upper-bound revision still produces overlapping verdicts, and its alternative has an uncovered boundary.
- **Report 2 Claim 2 coverage finding: WEAKENED.** A coverage rule now exists, but it permits an all-set verdict with up to one fifth of the set unclassified.
- **Report 2 Claim 8 classification finding: RESOLVED.** The primary and alternative ladders are exhaustive.