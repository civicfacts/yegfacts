<!-- Independent critique 1 of the rendered story page (D-0018 rule): OpenAI gpt-5.6-sol via `codex --search exec`, effort high, read-only sandbox. Run 2026-09-02. The package was assembled from a path the build no longer writes (PR #29 moved to one HTML file per route), so the critic worked from an older rendering: findings 6, 8 and 13 quote sentences already removed by the faithfulness checks. Adopted from the rest: 3 (the one-line answer names the budget basis), 4 (the no-judgement sentence moved to the opening), 5 (adjectives cut), 7 (the arithmetic error stated as an error), 9 (title), 11 (method vocabulary translated in place), 12 (the third seen card removed), 14 (direct opening), 15 (closing summary replaced by what stays open). Not adopted: 1 and 2, the verdict word is the site-wide vocabulary and the qualification sits in the one-line answer, the first TL;DR bullet and the claim record beside it; 10, evidence is linked from the claim records as on every story. Critique 2 runs on the current build. -->

OpenAI GPT-5.6 Sol (`gpt-5.6-sol`)

*The live preview was unreachable from this sandbox. I reviewed the exact story payload and current page-render order, but not pixel-level clipping.*

## 1. The snow verdict is dangerously quotable

> "Partially supported"

**Why it fails:** This appears beside the claim before the page explains that another valid denominator produces "Contradicted." Either camp can screenshot the verdict without its decisive qualification.

**Fix:** Replace it with: "1.55× using the printed budget; 1.17× using the amended budget." If a verdict must remain, show both verdicts in the same row.

## 2. The roads verdict hides a disputed definition

> "Do roads get $1.8 billion ...? Supported"

**Why it fails:** The page later admits that the City publishes no roads-only total, the $1.79 billion line includes active pathways, and a roads-labelled-only count is $1.12 billion. "Supported" conceals that range.

**Fix:** Use: "No published roads-only total. Depending on the boundary, the count is $1.12 billion to $1.95 billion."

## 3. The shareable answer omits both denominators

> "about 1.5 times one year's snow-clearing budget, not double, and roads get about 19 times as much."

**Why it fails:** It does not say which snow budget or what was counted as roads. This is the sentence most likely to circulate without the article.

**Fix:** Name the bases or give the ranges: "The four-year approval equals 1.17 to 1.64 times one annual snow budget; road-related counts range from 11 to 19 times the bike program."

## 4. The neutrality qualification arrives too late

> "Neither claim says whether the program is worth it, and neither verdict does."

**Why it fails:** This appears near the end, after the verdicts, summary, TL;DR, Facebook excerpts and main account. A ten-second reader may never see it.

**Fix:** Put a shorter version directly under the verdict strip: "These comparisons do not judge whether the program is worthwhile, well-used or good for traffic."

## 5. Several phrases make value judgments

> "That is a lot more than a year of snow clearing."  
> "only 1.17 times"  
> "well above a year of snow clearing and nowhere near double it"

**Why it fails:** "A lot," "only," "well above" and "nowhere near" tell readers how to feel about the ratios. Hostile readers can fairly cite them as evidence of a side.

**Fix:** State the numbers and the published threshold. Delete the adjectives.

## 6. The page implies blame for the spending pace

> "And it has been slow"  
> "Only $40.0 million"  
> "the harder ones waited for design and, lately, for council to decide what to do with them."

**Why it fails:** "Slow" and "only" imply underperformance. The final clause blames council and supplies a causal explanation that this story does not need.

**Fix:** Use: "By the end of 2025, the City reported $40.0 million in cumulative spending." Cut the explanation or attribute it precisely.

## 7. The treatment of the councillor's error sounds protective

> "The councillor's comparison has a slip in it."  
> "which is the substance of the point"

**Why it fails:** "Slip" softens a tenfold arithmetic error, while "substance of the point" appears to rescue the argument. A bike-lane opponent will see favourable treatment.

**Fix:** Say: "The quoted ratio is wrong: $1.8 billion is 18 times $100 million, not 180. The panel assessed the dollar comparison separately."

## 8. Speculation is presented too confidently

> "almost certainly where the councillor's figure came from"  
> "no other record of the remark exists"

**Why it fails:** The first sentence guesses at the councillor's source. The second claims nonexistence when the defensible statement is that the review did not find another record.

**Fix:** Use: "The $1.79 billion line matches the quoted figure, but the councillor's source is unknown. The review found no second record of the remark."

## 9. The title wastes the ten-second reader's attention

> "Active transportation investment"

**Why it fails:** It is bureaucratic and says nothing about the Facebook claim, the period or the result.

**Fix:** Use a direct title such as: "$100 million for bike lanes is a four-year approval, not an annual expense."

## 10. Reporters must hunt for sources

> "The City's own project page describes it..."  
> "Global News quoted him..."  
> "The City's own year-end table gives..."

**Why it fails:** The narrative names sources but does not link them at the relevant numbers. Evidence records appear much later.

**Fix:** Link the first occurrence of every material figure to its evidence page. Keep the evidence index for readers who want the full record.

## 11. Method jargon obstructs the explanation

> "capital profile"  
> "frozen brief"  
> "definition-sensitive"  
> "the answer moves with the denominator"

**Why it fails:** Glossary controls do not make this natural language. A resident should not need to learn the site's review vocabulary to understand which budgets were compared.

**Fix:** Translate it in place: "Before reviewing the claim, YEGFacts chose the City's printed 2022 snow budget. Using the amended budget changes the result."

## 12. One Facebook excerpt is not a claim the story checks

> "This council loves throwing TAX PAYER'S MONEY away on things that don't benefit 99% of tax payers."

**Why it fails:** It amplifies an insult and an unsupported 99% figure without examining either. It makes the page look like a venue for partisan comments.

**Fix:** Remove it. Keep only excerpts that correspond directly to one of the two checked comparisons.

## 13. "Every reviewer" can imply human review

> "every reviewer classified the claim the same way"  
> "Every reviewer summed the same profiles"

**Why it fails:** The page used three model reviewers. Calling them simply "reviewers" may lead readers to assume people independently checked the work.

**Fix:** Write "all three AI models" or "all three model reviewers."

## 14. The opening sounds manufactured

> "\"$100 million\" and \"bike lanes\" have travelled together in Edmonton's argument about its streets"

**Why it fails:** "Travelled together" and "Edmonton's argument" are writerly abstractions. They delay the concrete point and read like generated prose.

**Fix:** Open directly: "Since the December 2022 vote, opponents have compared the $100 million program with snow clearing, while supporters have compared it with roads."

## 15. The page repeats conclusions instead of advancing them

> "The $100 million for bike lanes is a four-year program..."  
> "What this story settles is the arithmetic both sides have been carrying into the argument..."

**Why it fails:** The one-line answer, five TL;DR bullets, narrative conclusion and claim cards repeat the same figures. The repetition increases scrolling and creates slightly different, differently qualified versions of the verdict.

**Fix:** Keep the complete answer at the top. Let the body explain calculations and sources, then end with what remains unsettled rather than another summary.

REVISE


