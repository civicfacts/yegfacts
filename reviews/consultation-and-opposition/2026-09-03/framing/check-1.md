<!-- Framing check 1 on the draft brief (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol, pinned as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, run from a scratch directory outside the repository with no repository access. The package was the framing prompt, intake.md, brief.md, the verdict vocabulary from docs/DESIGN.md section 3, and prompts/review-schema.json. Run 2026-09-04 by Stew. The report is unedited; the checker printed no model line of its own. -->

Verdict: REVISE

## 1. Provenance — OK

The intake identifies the source, capture date, post context, comment indexes, exact wording, surrounding context, account count and one-sidedness. The forms are representative of this captured thread, not of Edmonton; the brief states that limitation.

## 2. Does the proposition test what the post asserts? — FINDING

> “four commenters … said in their own words that the City did not consult the communities the routes run through”

The brief folds distinct assertions into one proposition:

- Comment 200 alleges programme-level “zero community consultation.”
- Comment 320 alleges insufficient consultation about 119 Avenue, which is outside set S.
- Comment 321 alleges that Hermitage was ignored.
- Comment 224 alleges failure to engage one stakeholder group: parents.
- Comment 393 alleges failure to inform residents, which is notification rather than engagement.

The named-person aspect of comment 393 may be declined, but that does not turn its remaining notification allegation into a route-engagement claim. Counting comment 320 among the four proponents of the set-S proposition also changes the route population being tested.

**Replacement wording:**

> “The primary proposition tests comment 200’s programme-level allegation against the fourteen routes in set S. Comments concerning Hermitage or routes within set S may provide additional circulating forms only where their geography is confirmed. The 119 Avenue complaint, the allegation that parents were omitted, and the allegation that residents were not informed are distinct claims and do not count as additional assertions of the primary proposition. They are separately parked, declined or reported as qualifications.”

Revise the prevalence count accordingly.

## 3. Is it the strongest fair reading? — FINDING

> “It keeps the strength, ‘no engagement’ … because ‘enough’ is undefinable”

That is the strongest captured reading of comment 200, but not a fair normalization of all five wordings. The brief compounds this by later classifying a literal no-engagement proposition as Supported when engagement is documented:

> “Supported for E of 0, 1 or 2”

One or two qualifying activities cannot establish the proposition that the City ran “no” qualifying engagement. That alternative silently changes the proposition from **none** to **rare**.

The stakes also call “zero community consultation”:

> “the most-repeated line in the argument”

It appears once verbatim. It is the strongest captured line, not the most repeated.

**Replacement wording:**

> “The primary proposition is the strict, programme-level ‘zero community consultation’ reading expressed in comment 200. Supported therefore remains possible only when no qualifying engagement occurred and the relevant routes are not unresolved. The ≤1/7 alternative tests a separately labelled ‘route-level engagement was rare’ reading and is reported only as a qualification in `interpretation_notes`, not as Supported for the no-engagement proposition.”

Replace “most-repeated line” with “strongest captured line.”

## 4. Operationalization and alternatives — FINDING

### Engagement boundary

> “Open to the neighbourhood … rather than an invitation limited to selected property owners, a community league board, or a named stakeholder list.”

This makes targeted consultation categorically irrelevant to the primary verdict even though the circulating claim is “community consultation,” not “an open public process.” The cited project page distinguishes focused opportunities from targeted engagement; it does not say targeted contact is not engagement. Both appear under the page’s public-engagement account. [City project page](https://www.edmonton.ca/projects_plans/roads/active-transportation-network-improvements-project)

This choice could change E and the verdict.

**Replacement wording:**

> “Primary definition: a documented, route-specific activity that solicited input about the route or its material design from affected residents, affected property owners, or a body representing the affected neighbourhood, while the relevant decision remained open. Mere notification, publication, or consultation about an ancillary matter does not count. Required alternative: apply the stricter requirement that every resident of the affected neighbourhood had a publicly accessible opportunity to participate.”

### Timing boundary

> “Before the build. It took place on or before … construction started”

An activity after design completion, tender award or an irrevocable route decision could qualify even though it offered no opportunity to influence the decision. That weakens “consultation” into pre-construction contact. The City defines public engagement as contributing to decision-making and communicating how input was used. [City public-engagement framework](https://www.edmonton.ca/sites/default/files/public-files/PublicEngagementFramework.pdf)

The reasonable alternative—engagement before the decision or design became fixed—could change the finding.

**Replacement wording:**

> “Primary cutoff: before the first documented point at which the route location or material design was no longer open to public influence, using dated council records, Attachment 3, procurement or tender-award records, and per-route design or construction documents. Required alternative: construction start, or the as-of date where construction had not started. If the decision point cannot be established from published records, that route is unresolved for the primary calculation.”

### As-of date

The brief gives 2026-09-03 but no alternative. The committee date, 2026-08-26, is reasonable because the route set and “pushed ahead” language arise from that decision. Engagement between those dates could change a count.

**Replacement wording:**

> “The primary as-of date is 2026-09-03. Reviewers also state whether using 2026-08-26 changes any route classification, based on dated City records.”

### Silence and unknown routes

> “Every route in S is either counted in E or not; there is no third bucket”

This treats an unresolved publication gap as if it established that no engagement occurred. The Not established safeguard is insufficient: one affirmative “none was run” record for one route would defeat that condition and permit Supported even if the other thirteen routes were silent.

**Replacement wording:**

> “Let E be routes with confirmed qualifying engagement and U be routes for which the required records do not establish either that qualifying engagement occurred or that none occurred. Do not count U as no engagement. Supported requires E = 0 and U = 0. Partially supported applies when E ≥ 1 and E + U ≤ 7. Contradicted applies when E ≥ 8. Otherwise the verdict is Not established. Apply the same lower-and-upper-bound method when reporting the alternative definition, route set and thresholds.”

The project page, Bike Plan Implementation Guide, Phase 2 report, Engaged Edmonton portal and City Public Engagement Framework exist under the names used. No retired or renamed public instrument was identified. The project page does not, however, justify treating targeted engagement as non-engagement.

## 5. Does the brief leak an expected finding? — OK

The brief names evidence to inspect and warns against invalid inferences without telling reviewers what verdict to reach. Statements about parked claims explain why no verdict will be attempted on them.

## 6. Is the claim checkable at all? — OK

The occurrence of engagement is factual. Evidence of an activity can establish that it happened; an affirmative City statement or demonstrably exhaustive record can establish that none occurred. Mere silence cannot. The unknown-route correction in check 4 is therefore necessary, but the claim is checkable in principle.

## 7. Scope traps — FINDING

> “What this claim does not test. Whether the engagement the City ran was good, sufficient, or fairly timed”

Whether an activity occurred while public input could still influence the route is part of determining whether the City “asked,” not a separate quality question. Only broader judgments about adequacy or fairness should remain out of scope.

The brief also uses the 119 Avenue complaint to support a proposition about set S even though 119 Avenue is not in that set, and it absorbs notification and stakeholder-omission allegations without testing them.

**Replacement wording:**

> “Out of scope: whether the amount of engagement was adequate, whether the City gave appropriate weight to responses, and whether residents were persuaded. In scope solely for classification: whether the activity solicited route-specific input before the relevant decision was fixed. The 119 Avenue, notification and parent-engagement allegations are separate dispositions and do not support the set-S proposition.”

## 8. Stakes — FINDING

> “Not established would mean the City cannot show what it asked … That is a finding about the City’s record-keeping”

Not established means the available evidence does not resolve the proposition. It does not itself establish deficient record-keeping. The paragraph also fails to state what this verdict requires each side to concede.

**Replacement wording:**

> **Supported:** The holder could say the strict route-level allegation is established for set S. The opponent could no longer say that qualifying route-specific consultation occurred, but could still argue that plan-level authority justified proceeding.  
>  
> **Partially supported:** The holder could cite confirmed route-level gaps but would have to abandon the universal “no engagement” wording. The opponent could cite confirmed engagement but could not generalize it to the whole set.  
>  
> **Contradicted:** The opponent could reject the programme-level no-engagement allegation because qualifying engagement is confirmed for most routes. The holder would have to move to a distinct claim about adequacy, influence, timing or omitted groups.  
>  
> **Not established:** The holder could not treat missing public records as proof that engagement never occurred. The opponent could not claim that qualifying engagement was demonstrated. Additional route-specific records could move the result either way; no record-keeping failure is inferred unless separate evidence establishes one.

## 9. Who asks this — FINDING

> “Did the city ask the people who live on my street before it put a bike lane down it?”

That is a genuine resident question, but the current primary definition does not answer it. An open page or survey could qualify without evidence that affected residents were invited or reached, while direct solicitation of affected property owners would fail merely because participation was targeted.

**Replacement wording:**

> “A resident would ask: ‘Did the City invite people affected by each route to give route-specific input while the route or its design could still change?’ The proposition answers that question by counting documented solicitation of affected residents or their representative bodies, distinguishing it from publication and one-way notification. An open-to-all neighbourhood process is reported as the stricter alternative.”

A holder of the view would welcome the brief’s separation of consultation from unsupported public-opinion claims and its decision to test a general pattern rather than one anecdote. They would object that late contact could count as consultation and that several distinct complaints are being recast as the same claim. An opponent would object more strongly that the primary definition excludes targeted engagement the City itself calls engagement and that unpublished or unresolved records are counted as negative findings. With the claim attribution, timing, engagement boundary and unknown-route calculation corrected, both sides would face a proposition capable of producing a genuinely surprising result.
