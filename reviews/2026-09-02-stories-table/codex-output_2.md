Round 2 reads correctly.

- The 3px rule clearly separates stories at both widths.
- `/stories` keeps enough distance between the header hairline and first story.
- The topic hub’s label, then story rule, has a clear hierarchy.
- Headings, captions, `scope="col"`, reading order, links, counts, and pending-review labeling remain correct.
- The 390px badge column is acceptable under the fixed two-column decision. Questions wrap without horizontal overflow.
- `/`, `/search`, and topic hubs retain the shared finding-edge behavior.

## Findings

- **P3 — `src/components/StoryList.astro:14`:** The public component comment says verdicts read down “one line”; it should say “one column.” The following sentence uses “column,” so the current wording is internally inconsistent.

VERDICT: APPROVED


