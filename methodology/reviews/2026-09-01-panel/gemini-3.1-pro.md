Here is the ranked review of YEGFacts.ca across methodology, trustability, presentation, and honesty gaps, focusing on systemic issues and the known edge cases.

### 1. The Human Verification Promise is Broken
**Severity:** CRITICAL
**Dimension:** HONESTY GAPS
The Design Document and home page explicitly market the site's authority as resting on "a human who verifies every cited source before anything is published." However, Methodology v1.1 quietly delegated this critical publication gate to AI auditors. Claiming rigorous human verification while actually running an entirely AI-automated pipeline is a fatal trust breach for a fact-checking site.
**Recommendation:** Immediately rewrite the Design Document and home page text to accurately describe the AI-delegated gate, removing all claims of mandatory human source verification.

### 2. "Claims We're Seeing" Mimic Real Platforms
**Severity:** CRITICAL
**Dimension:** TRUSTABILITY
The "Claims we're seeing" section visually simulates real Facebook, Reddit, and X posts, despite being labeled in small text as composite paraphrases. To a skeptical Edmontonian or journalist, fabricating and styling fake social media posts to debunk looks like textbook strawman manipulation. This visual trickery destroys the platform's non-partisan credibility.
**Recommendation:** Drop the social media CSS styling entirely and present these as plain text bullet points under a "Common public claims" heading.

### 3. Unfetchable URLs Subvert Evidence Requirements
**Severity:** CRITICAL
**Dimension:** METHODOLOGY
The platform claims that fabricating a citation is the "worst possible failure," yet combined-evidence artifacts currently carry unflagged unfetchable-URL citations. If the staging script allows failed fetches to pass into the merge, the AI models and the AI publication gate are effectively rubber-stamping inaccessible or hallucinatory evidence. This completely breaks the epistemic chain of trust.
**Recommendation:** Update the staging and merge scripts to hard-fail the run if a cited URL returns a 404 or cannot be archived, forcing the reviewer to drop the item.

### 4. Missing Evidence IDs Break CI Guarantees
**Severity:** IMPORTANT
**Dimension:** HONESTY GAPS
The Design Document explicitly promises CI guarantees, including that "every referenced evidence and commitment ID exists." However, combined-evidence artifacts are currently carrying null `evidence_id`s. This proves the CI validation rules are either bypassing the combined-evidence files or failing to enforce their own structural integrity claims.
**Recommendation:** Add a strict check to `scripts/validate.ts` that fails the CI build if any `evidence_id` is null in the combined-evidence or claims artifacts.

### 5. Brief Framing Dictates Outcomes (Gameability)
**Severity:** IMPORTANT
**Dimension:** METHODOLOGY
The methodology uses a "frozen brief" that operationalizes each claim before models run, but the site does not publish it. Because the human founder defines ambiguous terms behind the scenes (like what counts as "lost" money), they can subtly constrain the models to guarantee a specific verdict. A hostile academic would easily attack this as human bias laundering through AI.
**Recommendation:** Publish the exact text of the frozen brief on every story page so the human's operational definitions are fully transparent and auditable.

### 6. Asynchronous Web Search Allows Fact Hallucination
**Severity:** IMPORTANT
**Dimension:** METHODOLOGY
Models perform live web searches in round 1, and the staging script subsequently fetches those URLs. If a model hallucinates a fact but attaches a real, fetchable URL to it, the staging script will blindly archive it without verifying the text. Unless the AI cross-review or gate catches it, the hallucination becomes canonical evidence.
**Recommendation:** Require models to output verbatim text excerpts for every cited fact, and have the merge script computationally verify those exact strings exist in the fetched HTML before accepting the source.

### 7. Unseen Corrections in the AI Gate Report
**Severity:** IMPORTANT
**Dimension:** PRESENTATION
The site publicly publishes the raw AI reviewer notes on the story page, but a known issue reveals that one reviewer's false accusation against another was corrected only in the gate report. Because the gate report is committed to the repo but not rendered on the webpage, readers are exposed to uncorrected AI hallucinations. This damages trust and comprehension.
**Recommendation:** Render the publication gate audit report directly on the story page, placing it immediately above or below the AI Review panel to contextualize the raw reviewer notes.

### 8. Private Evidence Defeats Public Auditing
**Severity:** IMPORTANT
**Dimension:** TRUSTABILITY
The site promises a journalist can audit a finding without asking questions, but sources with restricted rights are kept in a gitignored `private/` folder. If the live URL changes or dies, an auditor has only a SHA-256 hash, making it impossible to independently verify what the private text actually said. This directly contradicts the 10-minute audit goal.
**Recommendation:** For all private sources, ensure the public registry entry includes the specific short text excerpts the models relied upon to reach their verdict, permitting partial audits.

### 9. Synthesis Matrix Structurally Suppresses Findings
**Severity:** IMPORTANT
**Dimension:** METHODOLOGY
The synthesis rules state that neighbouring verdicts resolve to the weaker of the pair, meaning a panel of [Supported, Supported, Partially supported] resolves to Partially supported. A hostile academic would note this structurally suppresses affirmative findings by giving veto power to the most heavily RLHF-hedged model on the panel, regardless of actual evidence strength.
**Recommendation:** Adjust the synthesis matrix for 2-to-1 splits between adjacent verdicts to resolve to the majority verdict but at a downgraded Low confidence, rather than adopting the minority's weaker verdict.

### 10. Ambiguous Model IDs Undermine Reproducibility
**Severity:** MINOR
**Dimension:** TRUSTABILITY
The review runs are supposed to be reproducible via a `run.yaml` manifest, but models are self-reporting ambiguous IDs (like "gpt-5" instead of "gpt-5.6-sol") which get rendered in the UI. Masking the exact model version prevents technical auditors from accurately verifying the pipeline's execution environment.
**Recommendation:** Hardcode the CLI-resolved model string directly into the run manifest and the presentation layer, overriding the model's self-reported name.

### 11. Horizontal Scrolling Hides Verdicts on Mobile
**Severity:** MINOR
**Dimension:** PRESENTATION
The "AI review" table uses a minimum width of 34rem, which forces horizontal scrolling on most mobile devices. A resident trying to quickly read the panel finding on their phone might completely miss the final canonical verdict column unless they know to swipe sideways.
**Recommendation:** Refactor the AI review matrix on mobile into a stacked CSS Flexbox or Grid layout per claim, rather than forcing a desktop table view.

### 12. Inconsistent Methodology Versioning Display
**Severity:** MINOR
**Dimension:** PRESENTATION
The methodology changes are meticulously documented, but individual story pages do not indicate which methodology version produced their specific findings. A reader cannot tell if an older story was gated by a human (v1.0) or a newer story by an AI (v1.1) just by looking at the page.
**Recommendation:** Display the methodology version number (e.g., "Produced under Methodology v1.1") in the metadata block at the top of each story page.

---

### The three changes to make FIRST:
1. **Update the Design Document and homepage to honestly reflect the v1.1 AI-delegated publication gate**, resolving the critical honesty gap regarding human verification.
2. **Remove the social media UI styling from the "Claims we're seeing" section** to stop presenting synthesized paraphrases as if they were real screenshot captures.
3. **Update the staging and merge scripts to strictly hard-fail on both unfetchable URLs and null `evidence_id`s** to ensure CI guarantees and strict evidence rules are actually enforced.
