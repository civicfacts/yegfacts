## Standards

- **[P2] [questions.astro:121](src/pages/questions.astro:121)**: “Nothing is held back” is too absolute. The register contains a withheld claim whose wording is intentionally omitted, as the key explains at line 383. Say the concrete fact instead: every question is listed and the filters only narrow that list.

- **[P2] [questions.astro:53](src/pages/questions.astro:53)**: The outline orders Filters, States, Register, while the DOM orders Filters, Register, States. This conflicts with the render-order assumption in [Base.astro:364](src/layouts/Base.astro:364). On a phone, the outline sends readers down past the register to the key and then back up. The active marker also reports “Every question” while the reader is in “What the states mean.” The desktop and phone visual orders differ, so this needs breakpoint-aware handling rather than a simple reorder.

- **[P2] [questions.astro:369](src/pages/questions.astro:369)**: The first sentence repeats what the Going ahead and Declined badge definitions already say. The remaining wording is not plain speech: “Two readers rule” is unnecessarily formal, and “Both at GO … goes ahead. Two NOs declines.” is elliptical and grammatically awkward. Use “decide” and name the question explicitly.

No Fowler smell findings.

## Spec

- The key fails the explicit requirement that its new paragraphs not repeat the badge definitions.
- The outline and DOM order fail the stated semantics check. The h1 followed by h2 headings is otherwise valid, including with the key visually beside the h1.

## Removed-sentence audit

| Removed sentence | Where it lives now | Loss |
|---|---|---|
| A question is one brief, evidence body, panel run and findings. | Methodology intake step 4 and “Seven stages, per question.” | No. Not needed to use this register. |
| Every considered question appears with its claims and reason. | New header, sentences 1 and 2. | No. |
| Three models extract claims and a fourth combines them. | [methodology/index.astro:19](src/pages/methodology/index.astro:19), steps 1 through 3. | No. |
| Claims are grouped into questions and triage decides the question. | Methodology intake steps 4 and 5. | No. |
| Contradictory claims share a question but receive separate findings. | [methodology/index.astro:34](src/pages/methodology/index.astro:34), including the emergency-vehicle example. | No. |
| Going ahead, parked and declined concern whether to investigate. | New key paragraph and badge definitions. | No, but now duplicated. |
| Those states do not decide whether a claim is true. | New key paragraph and badge definitions. | No, but now duplicated. |
| Published and withdrawn describe what readers can see. | Their badge definitions in the key. | No. |
| The complete list is already present and filters only narrow it. | New header, sentences 3 and 4. | No, once “Nothing is held back” is narrowed. |
| Counts are comments, not people, and may include opposition. | New key paragraph. | No. |
| The label says “said,” not “agreed.” | New key paragraph. | No. |

## Other checks

- The table, filter controls and filtering script have no internal diff.
- No em or en dash appears in added lines.
- The 1280 screenshot shows the key level with the title and the header rule confined to the left column.
- The 390 screenshot shows no horizontal clipping. The new grid classes begin at `lg`, so the phone layout order remains header, filters, register, key.
- I could not open the branch preview for a separate 1024 screenshot. Static breakpoint sizing leaves roughly 696px for the register, a 32px gap and a 256px key, with no evident overflow.

Standards: 3 findings, worst is the false absolute transparency claim. Spec: 2 findings, worst is the outline and active-section ordering defect.

REVISE
