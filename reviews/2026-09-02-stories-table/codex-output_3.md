Round 3 reads correctly.

- The 3px rules clearly separate stories on desktop and phone.
- Kicker, rule, and title hierarchy works on `/stories` and topic hubs.
- Each story has one obvious destination: `/facts/<slug>`.
- Tables, captions, `scope="col"`, counts, ordering, and story-page topic links remain correct.
- The narrow 390px badge column is acceptable under the fixed two-column decision.

## Findings

- `src/components/StoryList.astro:20`: "one click on" is awkward and unclear in public source documentation. Use "one click away."
- `src/components/TopicTags.astro:7`: "not a way out" is colloquial. "Not a destination" is more precise.
- `src/components/StoryList.astro:53`: `gap-x-3 text-xs` duplicates `TopicTags` defaults. Removable cleanup only.

The supplied `dist` footer points to `4161117` because it was built before commit `14c860a`. Rebuild before final preview; this is not a round-3 code regression.

VERDICT: APPROVED


