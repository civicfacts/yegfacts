# YF-EV-0227 check: completeness PASS, personal information CLEAR, builder's diff account confirmed

YF-EV-0227 is the re-archive of the City Council minutes of 2026-09-08, which the City edited after the first archive (YF-EV-0215). The edit changes no relevant item. Rule v2 carries every relevant item on the page, the carried text contains no private individual's personal information, and the only differences from YF-EV-0215 are the three the builder described.

I checked this on 2026-09-29 as an independent session, not the editor, working read-only on worktree cpv-rerun at commit bff9992.

## 1. Completeness under rule v2: PASS

- Every one of the 71 items has a checker reason in `completeness-0227.yaml`.
- One item is relevant: 11.6, Active Transportation Implementation Funding. Rule v2 carries it, and it is the only item carried. No relevant item is missed.
- I read the three changed items fresh. None is relevant:
  - 7.7 is the Public Art policy;
  - 7.11 is the climate implementation priorities;
  - 11.1 is the property tax reporting format.
- The other 68 items keep their YF-EV-0215 reasons. I confirmed each is textually identical to its YF-EV-0215 counterpart.
- The manifest's item index agrees with my regeneration on the number and carried flag of all 71 items, and it records rule version 2 and status carried.
- YF-EV-0215 no longer appears in the manifest.

## 2. Carried text and personal information: CLEAR

- The regenerated carried text hashes to `4d4b6bae8671f5f6ff988e5566d90e7379c9d2df49df3848af0a69bfd4f55538`, which matches the manifest's `text_sha256`.
- The text is byte-identical to the carried text of YF-EV-0215.
- It holds the meeting header, the roll call and item 11.6. It names only members of Council, the City Manager and Office of the City Clerk staff acting in their roles.
- It contains no member of the public, email, phone number or address.

## 3. Diff against YF-EV-0215: builder's account confirmed

I compared the full parsed text of all 71 items, both as published and with members of the public withheld. Both pages have 71 items with the same numbers and titles in the same order, and the headers are identical. Exactly three items differ:

1. **7.7 Public Art to Enhance Edmonton's Public Realm Policy C458E Review.** The four attachment DocumentIds changed from 307573–307576 to 308291–308294. The attachment titles and the motion text are unchanged.
2. **7.11 2027 Update - Climate Implementation Priorities.** The DocumentId of Attachment 2 changed from 307638 to 308356. Nothing else changed.
3. **11.1 Communication of Property Tax Impacts in Budget Presentations and Documents (M. Janz).** One line is restored: under "Amendment 1 on the floor, put", the line "That the motion be amended to read:" now appears before the amendment wording. No mover, seconder, vote or result changed.

Item 11.6, the carried program item, is unchanged.

Beyond the builder's account, the parsed text of items 7.7 and 7.11 on both archives carries raw anchor-tag markup in its attachment lines (`a class='Link' ... href=...`). This is a known parser artefact on titles that contain an apostrophe. It appears only in uncarried items, so it does not affect the carried package.
