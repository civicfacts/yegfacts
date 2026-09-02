## Review findings

- **P3 — [StoryList.astro:75](file:///Users/iabdulin/Sites/yegfacts/.claude/worktrees/stories-table/src/components/StoryList.astro:75):** Tables lack captions identifying their story. `scope="col"` and reading order are correct, but screen-reader table navigation sees repeated anonymous `Claim / Finding` tables. Add a visually hidden caption or `aria-labelledby`.
- **P3 — [StoryList.astro:11](file:///Users/iabdulin/Sites/yegfacts/.claude/worktrees/stories-table/src/components/StoryList.astro:11):** The doc comment says the old content had the “same weight” and describes the badge column as fixed at every width. Both are imprecise; simplify it to the actual component contract.
- **P3 — [stories.astro:8](file:///Users/iabdulin/Sites/yegfacts/.claude/worktrees/stories-table/src/pages/stories.astro:8):** Calls the pending-review text a “badge,” although it is a plain label. Since pending content is not a final finding, use “label” for clarity.
- **P3 — [findings.ts:1](file:///Users/iabdulin/Sites/yegfacts/.claude/worktrees/stories-table/src/lib/findings.ts:1):** Unrelated quote-style and line-wrapping churn obscures the small helper extraction. Revert that formatting noise.

The requested information design is implemented correctly. Counts, ordering, headings, links, topic hubs, verdict colors, and `FindingsBoard` behavior check out. The 390px layout is acceptable under the explicit two-column constraint: badges remain intact and questions wrap.

VERDICT: APPROVED


