<!-- Framing check 1 on the draft brief (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol via `codex --search exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, live web search enabled because the prompt requires the checker to verify that every instrument and dataset the brief names exists as described (the checker named itself "OpenAI GPT-5"; the run log records gpt-5.6-sol). Package: the framing prompt, intake.md, brief.md, the verdict vocabulary from docs/DESIGN.md section 3, and prompts/review-schema.json. Run 2026-09-03 by Stew. Report is verbatim; nothing below this line was edited. -->

Model: OpenAI GPT-5  
Verdict: REVISE

## 1. Provenance

**Finding.** The intake is strong and appears representative of the captured thread: the whole thread was captured, three extractors listed claims, quotations were checked, and every registered form is attributed. It is not evidence of how the argument circulates beyond that thread.

The brief overstates what all 15 people said:

> “Fifteen people in one captured thread made the same argument in different words: that Edmonton's roads and back alleys are falling apart, that the City says it cannot afford to fix them, and that it found $100 million for bike lanes anyway.”

The 15 accounts made five related claims. Only eight captured accounts mention roads, alleys, or potholes. Two juxtapose the infrastructure deficit with bike-lane spending. The remaining three discuss a recreation centre, drainage damage, and streetlights. Nor does the intake establish that this is:

> “the standing case against the program in Edmonton's 2026 argument about streets”

**Replacement wording:**

> “Fifteen accounts in one captured Facebook thread made five related arguments against the bike-lane program. Eight mentioned road, alley, or pothole condition; two juxtaposed the City's infrastructure deficit with the $100 million approval; and three raised separate claims about a recreation centre, drainage damage, and streetlights. This brief tests only the captured factual claims that fit its evidence base. The intake establishes prevalence within this thread, not across Edmonton.”

## 2. Does the proposition test what the post asserts?

**Finding.** Three mismatches remain.

First, Claim 1 says:

> “Ten people argued this”

Ten accounts contributed to the registered basic-services claim, but two spoke only about snow and one spoke about grass and snow. Those accounts cannot be presented as asserting the roads-and-alleys proposition.

**Replacement wording:**

> “Eight captured accounts mentioned road, alley, or pothole condition. The other two accounts in the registered basic-services claim mentioned snow only and do not support this proposition.”

Second, Claim 2 tests a different claim:

> “Council paid for the $100 million bike-lane programme by cutting money it had budgeted to renew roads and alleys.”

The intake expressly says nobody asserted a physical transfer from a road budget. The captured argument is about priority and opportunity cost: the City funded one thing while saying infrastructure renewal was underfunded. A verdict that no renewal profile was directly cut would not settle that argument.

**Replacement proposition:**

> “At least [predeclared amount] of the funding approved for CM-20-0330 came from sources whose terms allowed Council to use that money for road or alley renewal while the City reported an unmet capital-renewal requirement.”

Keep direct transfers from renewal profiles as a reported calculation, not the verdict-bearing proposition.

Third, Claim 3 changes the denominator:

> “The holders' own words are about the infrastructure deficit as a whole”

but then:

> “This brief uses the narrower, roads-and-alleys shortfall as the primary denominator”

The primary proposition therefore does not test the captured wording. The whole-infrastructure shortfall must carry the verdict. A roads-and-alleys result may be a qualification only if the City publishes a usable figure.

**Replacement proposition:**

> “The $100 million approved for CM-20-0330 equalled at least [predeclared share] of the City's published whole-infrastructure capital-renewal shortfall for the same accounting period.”

## 3. Is it the strongest fair reading?

**Finding.** The title strengthens the intake in one respect while Claims 1 and 2 weaken it in others.

The title says:

> “Is Edmonton letting roads, alleys and drainage go”

“Letting go” asserts deterioration or neglect over time. The intake says no captured wording makes a trend claim. The brief then declines to give a trend verdict. The title promises a test the propositions do not perform.

Claim 1 also combines roads and alleys into a weighted set:

> “Roads and alleys are treated as one set, because the holders named them together and because a verdict has to come out as one number.”

Most holders did not name both, and the schema does not require one verdict for two distinct asset classes. A road class with a much larger replacement value could determine the combined result and erase the alley claim. Worse, the fallback permits the verdict to rest on whichever class “covers the larger share” when the denominators differ. That could produce a verdict about “roads and alleys” without measuring alleys.

No identified source in the package supplies a separately computable D-or-F share for alleys. The open-data sources are renewal-program datasets, not yet established condition datasets. A separate alley threshold would therefore risk predetermining Not established.

**Replacement wording:**

> “This brief gives a condition verdict for the City's published Roads asset class. It does not give an alley-condition verdict unless a named City source published by the freeze date supplies a computable alley condition distribution. Alley renewal schedules and project status are not substitutes for condition ratings.”

**Replacement title:**

> “Are Edmonton's roads in poor condition, and how does the $100 million bike-lane approval compare with the City's infrastructure-renewal shortfall?”

Claim 2's direct-cut formulation is also a weak reading. A holder could accept Contradicted while continuing to make the captured argument unchanged. Use the funding-eligibility proposition proposed under check 2.

## 4. Operationalization and its alternatives

**Finding.** The numeric cutoff sets satisfy the methodology's bounded requirement because each has one required alternative. No additional cutoff alternative is needed. Other verdict-sensitive choices remain unresolved.

### Source and instrument audit

The main condition system exists: the City describes the A-to-F scale and D/F categories on its [Infrastructure State and Condition page](https://www.edmonton.ca/city_government/initiatives_innovation/infrastructure-state-and-condition). The 2025 report also exists and was presented as IIS03137 on February 23, 2026, as shown in the [Infrastructure Committee record](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=6e208552-6c5f-494a-90ef-838910965e22&Item=26&Tab=attachments&lang=English).

The adopted capital budget exists, including CM-20-0330 and the “Roads” and “Neighbourhood Renewal” service labels, in the [2023–2026 Capital Budget](https://www.edmonton.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf). The named open-data landing pages, infrastructure report, budget pages, meeting portal, and Neighbourhood Renewal page also resolve.

Source 9 is obsolete as described:

> “City of Edmonton Bylaw 19627, ‘EPCOR Drainage Services and Wastewater Treatment Bylaw’”

Council replaced Bylaw 19627 with Bylaw 20865 in February 2025. The [February 4, 2025 council record](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=5c91f922-52ef-465c-93d8-e6f9df6204d7&lang=English) expressly identifies Bylaw 20865 as replacing 19627. A brief frozen on 2026-09-03 cannot name 19627 as the current instrument.

**Replacement wording:**

> “City of Edmonton Bylaw 20865, ‘EPCOR Wastewater Services Bylaw,’ including any amendments in force on 2026-09-03; the February 2025 council record replacing Bylaw 19627; and Report CR_4436 and the April 12, 2017 council decision approving the drainage transfer, effective September 1, 2017.”

### Accounting period

B2 says:

> “Both sides of every ratio cover the same number of years.”

Claim 3 later permits a ratio when the City publishes the denominator over another span:

> “the reviewer reports the span as the City states it and the ratio computed on it”

Those rules conflict. Comparing a four-year $100 million approval with a ten-year or unstated-period shortfall repeats the accounting-window problem the brief says it was designed to prevent.

**Replacement wording:**

> “A verdict-bearing ratio may be computed only when both numerator and denominator cover 2023–2026. A differently dated or differently spanned shortfall is reported as context without classification.”

Name the exact source and calculation for the primary denominator. The adopted budget supplies a plausible same-cycle whole-infrastructure basis: its published ideal renewal requirement and funded renewal amount for 2023–2026. The brief has not identified an equivalent published roads-and-alleys shortfall. “The most recent publication carrying such a figure” is not enough.

### Approved versus spent

B4 chooses approved amounts even though the captured wording says “spending”:

> “Both the $100 million and every renewal figure in this brief are approved amounts”

Actual expenditure is a reasonable alternative and could materially change the ordinary-language finding. Merely reporting actuals elsewhere does not classify the claim under that alternative.

**Replacement wording:**

> “The primary reading treats ‘spending $100 million’ as Council's $100 million approval. Reviewers must also classify the magnitude proposition using cumulative actual expenditure through 2025. If the classifications differ, the finding is definition-sensitive.”

### Renewal boundary

Claim 2 includes:

> “Every capital profile … whose profile sheet carries Service Category ‘Roads’ or Service Category ‘Neighbourhood Renewal’”

That includes growth profiles and profiles containing sidewalks, signals, streetlights, safety work, and active-mode components. It is not equivalent to “money budgeted to renew roads and alleys.” The profile sheets publish growth and renewal percentages, so counting an entire profile also ignores a field the named source supplies.

**Replacement wording:**

> “For transfer calculations, count only dollars the council record identifies as removed from the renewal-funded portion of a profile. Do not count a profile's growth allocation. Do not describe a transfer from a mixed profile as a road-or-alley cut unless the record identifies the affected asset component.”

If the record cannot allocate a mixed transfer to roads or alleys, the brief must name the measurable level, such as “Roads or Neighbourhood Renewal service-category funding,” rather than translate it into resident-facing road money.

### Condition denominator

Replacement value is a reasonable primary denominator because the City publishes condition that way. Lane-kilometres are also reasonable and could change the finding because expensive road types receive more weight under replacement value.

**Replacement wording:**

> “Replacement value carries the primary road-condition verdict. Where the City also publishes a lane-kilometre distribution, reviewers report the classification under that denominator as the required alternative. Count is used only if neither value nor length is published and does not permit a combined-class verdict.”

## 5. Does the brief leak an expected finding?

**Finding.** The clearest leak is an openly side-favouring denominator rule:

> “This brief uses the narrower, roads-and-alleys shortfall as the primary denominator … because it gives the holders' argument its best available footing. Choosing the denominator that favours the claim is a choice both a supporter and an opponent can accept before the result is known.”

An opponent need not accept a denominator selected because it favours the claim, especially when it changes “infrastructure deficit” into “roads-and-alleys shortfall.”

**Replacement wording:**

> “The captured wording refers to the City's infrastructure deficit without limiting it to roads or alleys. The whole-infrastructure shortfall therefore carries the verdict. Any directly published roads-and-alleys shortfall is reported as an alternative and may not replace the primary denominator.”

Also remove:

> “If such a target exists it is a better standard than either cutoff set”

**Replacement wording:**

> “If the City publishes a directly applicable target, reviewers report the result against it and explain how that classification compares with the brief's predeclared cutoffs.”

The story can later decide how to present the difference. Reviewers should not receive an instruction that one result is inherently “better.”

## 6. Is the claim checkable at all?

**Finding.** Road condition and arithmetic comparisons are factual and checkable. Whether Council should have preferred roads is a policy judgment and properly receives no verdict.

Two formulations cross that boundary:

> “letting roads, alleys and drainage go”

This implies a trend or deliberate neglect absent from the intake.

> “would have covered a serious share”

This asserts a counterfactual use of money before the funding instrument's eligibility has been established.

**Replacement wording:**

> “The brief does not test whether Council should have preferred road renewal or whether it deliberately neglected infrastructure. It tests current published road condition, how much bike-program funding was eligible for road renewal, and the arithmetic size of the approval relative to a same-period published renewal shortfall.”

Replace “would have covered” with “equalled” in Claim 3. Whether it could actually have covered the shortfall belongs to the funding-eligibility claim.

## 7. Scope traps

**Finding.** The snow and grass exclusions are justified. The recreation-centre and streetlight claims also require separate evidence and are properly excluded.

Drainage remains a trap. The title includes it, and required calculation 5 constructs a bike-versus-drainage funding question, but no captured wording links drainage funding to bike-lane funding. The registered drainage claim concerns homeowner damage. That claim is excluded because it is uncontested, yet drainage remains in the advertised question through a different proposition nobody was captured making.

**Replacement wording:**

> “Drainage damage and drainage financing are outside this brief. The intake contains no captured wording asserting that bike-lane funding was taken from, or was available to, Edmonton's drainage utility. Remove drainage from the title and delete required calculation 5. The drainage claim remains on the register for separate treatment if new intake supplies a contested factual proposition.”

Claim 2's asset boundary also imports sidewalks, streetlights, safety projects, and growth spending through broad service-category membership while the scope section excludes several of those things. Apply the renewal-boundary replacement from check 4.

## 8. Stakes

**Finding.** The stakes section does not consistently state what every verdict means separately to a holder and an opponent. More importantly, Claim 2 fails the surprise test.

> “Contradicted would mean the money came from somewhere that took nothing from renewal”

A holder did not claim that an accounting transfer occurred. That holder could accept this result and still say Council chose bike lanes while infrastructure was underfunded. Contradicted therefore would not contradict the argument being debated.

Claim 3 has the related problem that Supported under a deliberately narrowed roads-only denominator tells an opponent nothing about the captured whole-infrastructure claim.

After revising the propositions, replace each stakes block with explicit two-sided consequences. For the revised funding-eligibility proposition, use:

> **Supported:** A holder would learn that a material amount of the bike-program funding was available for road or alley renewal and could retain the factual premise of a priority argument. An opponent would have to concede that Council faced a real allocative choice, while remaining free to defend that choice.  
> **Partially supported:** A holder would learn that some funding was available for renewal but less than the claim's serious-share threshold. An opponent would have to concede limited fungibility but could reject the claim that most of the program competed with renewal.  
> **Contradicted:** A holder would have to abandon the factual premise that a material amount of this funding was available for road or alley renewal. An opponent would gain a direct answer to the opportunity-cost claim, not merely evidence that no bookkeeping transfer occurred.  
> **Not established:** Neither side could claim that the public record settles funding eligibility. The holder would lack evidence for the opportunity-cost premise, and the opponent would lack evidence that the funds were unavailable.

Give Claims 1 and 3 the same explicit holder/opponent treatment for all four verdicts. Do not say merely that each outcome “changes something for one side.”

## 9. Who asks this?

**Finding.** The resident question is natural, but the propositions do not answer it at the level asked:

> “My street is a mess and the alley is worse.”

A citywide replacement-value distribution cannot determine the condition of that resident's street or alley. The next paragraph nevertheless asks:

> “Is my street actually in bad shape, or does it just feel that way?”

The brief cannot answer that question.

**Replacement wording:**

> “A resident or reporter would ask: ‘Are Edmonton's roads broadly in poor condition? When Council approved $100 million for bike lanes, how much of that funding could instead have been used for road renewal, and how large was it compared with the City's published infrastructure-renewal shortfall?’
>
> The public record used here cannot determine whether a particular resident's street is in poor condition. It answers the first question citywide, using the City's Roads asset class. It does not assign an alley-condition verdict unless a named published source supplies an alley condition distribution.”

## Likely reaction from each side

A holder would recognize the condition and shortfall concerns but object that the direct-cut claim is a bookkeeping substitute for the priority argument actually made. They would also object to counting snow-only speakers as road-condition claimants. An opponent would object to a roads-only denominator chosen expressly to favour the claim and to a renewal set that includes whole mixed profiles. Both sides could reasonably say that the current design makes one proposition too easy to contradict and another too easy to support. The brief therefore does not yet test the argument fairly.
