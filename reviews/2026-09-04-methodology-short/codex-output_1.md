## Spec

1. **Core explanation is wrong for split panels.** A stranger can describe the pipeline and name Ildar Abdulin as accountable, but step 4 teaches the wrong rule: “When the three disagree, the finding leans to the more cautious side.” [index.astro:35](src/pages/methodology/index.astro:35) Materially split panels produce `Mixed`; they do not choose either side. This is the first place the ten-second explanation fails.

2. **“Every factual claim” exceeds the documented intake rule.** [index.astro:20](src/pages/methodology/index.astro:20) promises every factual claim is listed. DESIGN limits extraction to every “materially factual claim.” [DESIGN.md:169](docs/DESIGN.md:169)

3. **The pseudonym promise omits an exception.** The short version says “commenters get a label instead of their name.” Public office-holders keep their names. [index.astro:330](src/pages/methodology/index.astro:330)

4. **The public-record claims are absolute and false.** “What the models said ... are all public” and “Everything the site runs on is public” appear at [index.astro:40](src/pages/methodology/index.astro:40) and [index.astro:243](src/pages/methodology/index.astro:243). The full page says pseudonym mappings and some archived files remain private, while the release check removes unsuitable material.

5. **“Before anything goes up” conflicts with pending deployment.** [index.astro:39](src/pages/methodology/index.astro:39) says the audit precedes anything going up. Stage 7 allows a question to deploy earlier as `pending-review`. [index.astro:113](src/pages/methodology/index.astro:113)

6. **The component extraction did not happen.** [NumberedSteps.astro:3](src/components/NumberedSteps.astro:3) claims all three lists use it, but committed `HEAD` never imports it. The page retains three inline renderers at lines 212, 295, and 356. The component comment is therefore untrue. Commit `888a2b7` also reorders the first intake sentence, so its rendered HTML is not identical to its parent.

### Meaning drift

No additional drift found across the five `intake` and seven `stages` bodies. Stages 4, 5, and 6 match DESIGN §4’s v1.22, v1.24, and v1.18 rules.

## Standards

No hard AGENTS.md or DESIGN.md violation beyond the spec failures above.

- **Speculative Generality:** the new component has no caller.
- **Duplicated Code:** the page still repeats the same numbered-list renderer three times and retains manual `n` fields.

## Verification

- Outline order matches section order.
- All nine legacy anchors exist in committed source.
- `dist/methodology/index.html` is absent, so built-page anchors could not be verified.
- No added line contains an em or en dash.
- `scripts/`, `methodology/`, `prompts/`, and `src/lib/glossary.ts` are unchanged.
- The supplied 390px captures show no visible horizontal clipping.
- Spec findings: 6. Standards findings: 2 judgement calls.

REVISE


