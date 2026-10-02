# council-hearing checks: completeness PASS, personal information CLEAR, gates confirmed empty

Rule v2 carries everything this brief's claim needs, so no rule v3 is required. The carried text names no member of the public. No claim in this brief needs every recorded vote, so the empty gates file is correct.

I checked this on 2026-10-02 as an independent session, not the editor, working read-only on worktree hearing-panel at commit aebae85. The claim is `speaking-time-cut-to-three-minutes`.

## 1. Completeness: PASS (`completeness.yaml`)

All 62 items have a checker reason: 32 on the minutes, YF-EV-0209, and 30 on the agenda, YF-EV-0210.

Relevant items on the minutes:
- 1.4: the section 38 time-limit motion and the orders of the day.
- 2.3: the Requests to Speak motion, which gives N and N-all, plus the additional-speaker motion on 7.4.
- 2.4: puts 7.6 first in the order of business.
- 7.6: the presentation lists, which give N-spoke, and the speaker attachments.
- 1.2 Roll Call: needed for the two-thirds statement. The rule does not select it, but the build always carries it as the attendance block, so it is not a miss.

Relevant item on the agenda:
- 7.6: its file list and addendum status.

All are carried. Minutes items 11.1 and 11.2 are carried but bear on nothing in this claim, which is harmless.

The builder's flags:
- **Minutes 7.1, 7.3 and 7.4: not relevant.** They list presenters on other items. N-all is defined on approved entries in the 2.3 motion, which covers every item, and N-spoke counts 7.6 only. A search of the whole page finds no time-limit, extension or request motion outside 1.4 and 2.3. That also answers qualification 7: no motion extends any speaker's time.
- **Agenda 1.4 and 2.3: not relevant.** Item 1.4 is a bare heading. Item 2.3 reads only "Refer to Summary of Agenda Changes", and that summary is not on the archived page.

## 2. Personal information: CLEAR (`pi.yaml`)

- Both regenerated carried texts hash to the manifest's `text_sha256`, and the manifest's item index agrees with the regeneration.
- 136 "[member of the public]" entries replace names: 79 in item 2.3 and 57 in item 7.6. This equals the manifest's withheld counts.
- I searched the carried text for every name token from the unredacted lines, including the surnames in the speaker-panel attachment titles. None survives.

## 3. Gates: confirmed empty

The claim turns on one bylaw section, one motion, its vote and counts of names on the lists. Its verdict does not depend on every recorded vote of any body.

Qualification 9 asks whether earlier meetings adjusted the limits. That is a bounded-search context item, not a vote-set claim. `gates.yaml` with `claims: []` is therefore correct.
