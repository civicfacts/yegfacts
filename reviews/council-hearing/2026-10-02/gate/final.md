<!-- Final narrow check, 2026-10-02, by the same separate Claude Opus 5.5 audit session, on the diff 4930e5c..1c03002. GATE: PASS. Its one advisory (the article history said no third pass was run) is adopted. -->

# Final gate check — council-hearing

Result: 0 blocking, 1 advisory

Gate stage 7, final narrow check. Worktree `draft-hearing` at `1c03002` (PR
#121). Scope: `git diff 4930e5c..1c03002 -- src/ intake/` and the publication
fields. Auditor: the same Claude (Opus 5.5) audit session, read-only.

**Checks run.**

| Check | Result |
|---|---|
| `npm run build` | exits 0 |
| `npm run validate` | OK |
| `npx vitest run` | 650 passed, 1 skipped, across 38 files |
| The old framing-park sentence anywhere in `dist/` | 0 occurrences |

`validate` raises style warnings on this page only: one_line is 29 words and
tldr[2] is 37 words.

| Change | Grade | Basis |
|---|---|---|
| Standfirst: "The minutes don't say which side the bike-lane speakers took. Nine of 64 entries named groups tied to the call to speak, and no record shows anyone was paid." | VERIFIED | Bounded to the minutes, which record no positions (carried items 2.3 and 7.6, YF-EV-0209). "Groups tied to the call" is accurate for all three groups: the coalition made the call, Paths for People offered to prepare speakers, and the coalition names Ward Metis Bikes its ambassadors (YF-EV-0315). The nine are recounted and match the calculation. "No record shows anyone was paid" agrees with TL;DR 2 and the freshness audit. It is 157 characters, and the meta and og descriptions render it unchanged. N1 resolved |
| Shared framing-park sentence: "Its question went ahead, and this claim was set aside before the panel ran." | VERIFIED | True on all five pages where it renders. Both questions show triage "Going ahead", and each of these claims was parked at framing, before the rounds. The vote-gate park's sentence is unchanged. N2 resolved |
| Parked line 2: "We can't tell if anyone paid the bike-lane speakers, and records tie only some of them to the bike group that urged people to speak and groups working with it. We'll revisit this claim if a record turns up that settles it." | VERIFIED | YF-EV-0315 and YF-EV-0209. A1 resolved |
| Reopen condition, in both the register and the story: "… or that other speakers on the list were recruited by an organizer" | VERIFIED | Covers the 55 entries outside the nine, including the six that named other groups. Nothing held meets it. The register and the story match. A2 resolved |
| Story: "the committee's minutes show 15 that gave a group's name. By our own count, matching those names against the coalition's post, nine of those gave one of these three groups." | VERIFIED | Calculation: `approvedWithOrganization` 15, `approvedUnderCallGroups` 9. Attributing the match to "our own count" is accurate |
| Register `council-hearing` note: "Drafted, checked, gated and published on 2026-10-02; the second park's reason was revised twice that day after the freshness audit and the gate" | VERIFIED | Commits 75dc267 and 864418f; run record |
| Publication fields: story `status: published`; register `lifecycle: gate-complete`, `publication: published` | VERIFIED | Accepted by validate; no "Pending review" banner renders |
| New `published` changelog note | VERIFIED, see A1 | Lists each check and report path; "No finding changed at any stage: one claim Supported, Unanimous, and two set aside before the panel ran" matches synthesis and the register |

## Advisory

- **A1** — The published changelog says "no third pass was run". This narrow
  check is one. Recording it would make the note exact, for example: "…and a
  final narrow check of those corrections (gate/final.md)". This is optional,
  since the check found nothing to change.

GATE: PASS
