# Release check — lanes-and-congestion

Gate stage 7, part 2. Run date 2026-09-24 (story run `2026-09-16`),
methodology v1.40. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session and from both faithfulness seats.

**Result: 0 blocking, 3 advisory.** Nothing in the package needs to change
before release. Two advisories concern the frozen inventory snapshot, which
has been public on `main` since PR #81. It carries City staff system
usernames, and its registry entry calls it private while the repository
publishes it. Both are decisions for the founder.

**Package.** The draft, which is `src/content/stories/lanes-and-congestion.mdx`
and `src/content/claims/lc-lanes-taken-citywide.yaml`, and all 60 tracked
files under `reviews/lanes-and-congestion/2026-09-16/`. That covers the
current run (`brief.md`, `intake.md`, `register-note.md`, `run-record.md`,
`run.yaml`, `state.yaml`, `fetch-report.md`, `synthesis.json`,
`combined-evidence.json`, `disagreements.json`, `round1/` and `round2/`),
the four framing checks and three responses, both `faithfulness/` reports,
`plain-speech/gpt-1.md`, `gate/freshness-audit.md` and `snapshot/`. It also
covers the three earlier attempts that publish with it: `closed-2026-09-23/`
(including `shadow-round1/`), `superseded-2026-09-24/` and
`superseded-2026-09-24b/`. Registry entries YF-EV-0163 to YF-EV-0172, and the
two register rows this branch changes.

**Deterministic layer.** `npm run audit:exposure`, over the whole tracked
tree, run with both gate reports staged. The first draft of this report
quoted two of the matched strings verbatim and so raised two warnings of its
own; the figures below are from the run after that was repaired.

```
exposure-audit: 1089 tracked text files scanned (18 binary skipped, 1107 tracked total), 172 registry entries
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  WITHHELD LEAK         0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   79
  warn  LONG QUOTES           0
exposure-audit: OK — no fail-class findings; 79 warning(s) need disposition in the audit record
```

**38 of the 79 PII warnings are in this run, and all 38 are false
positives.** Each is the "street address" pattern matching a year written
directly before a numbered street name (a 2017 date running into 102 Avenue,
a 2025 date into 96 Street) or a block range written with a hyphen (111 to
136 Street, 119 to 124 Avenue). The examples here are spelled out so that
this report does not trip the same pattern. Extracting every match
of the audit's own regex from `reviews/lanes-and-congestion/` returns 15
distinct strings, and none is a house number. There is no address of a
person or a private building anywhere in the run. The other 41 warnings are
in other runs, were dispositioned there, and this run adds none of them.

## Findings

**No blocking findings.**

Checked and clear:

- **No local paths or credentials.** A search of all 60 tracked run files
  for `/Users/`, `/private/tmp`, `/tmp/`, `file://`, `~/`, email-address and
  phone-number shapes, and common token prefixes returns nothing. The seat
  reports carry the launcher's attempt ids and model names, not machine
  paths.
- **No contact details.** No email address or phone number appears in the
  run directory, the draft or the ten registry entries. One private
  archive, the 132 Avenue project page (YF-EV-0171), names City
  construction managers and gives their work phone numbers. It is under the
  gitignored `evidence/private/` and marked `visibility: private`, and none
  of those names or numbers appears in any tracked file.
- **No real names from the capture.** Every commenter in `intake.md`, the
  register and the reviewer JSON is a pseudonym of the capture's own form
  ("Granite Hare D.", "Cedar Pelican C."). The story quotes nobody by name.
- **One named individual, and he is an office-holder.** `closed-2026-09-23/`,
  `superseded-2026-09-24/` and `superseded-2026-09-24b/` name Councillor
  Aaron Paquette as the publisher of a blog post about Hermitage Road that a
  seat cited. He is a sitting ward councillor writing under his own name, so
  this is the byline on a public office-holder's published work. The
  cycling-volumes gate made the same call about the same councillor. The
  finding quoted from him is descriptive ("narrowed the lanes, added bike
  lanes with buffers") and accuses no one. He is not named on the page.
- **No accusations against named people.** None of the round files, framing
  reports or seat reports attributes wrongdoing to a person. The claims are
  about what the City built.
- **No withheld-claim text.** `WITHHELD LEAK 0`. None of this run's claims
  carries `ground: right-of-reply`.
- **Quotation volume.** `LONG QUOTES 0`. The longest `quote` field in any
  review JSON in the package is 35 words, a City sentence about 132 Avenue in
  `closed-2026-09-23/`. The longest commenter wording in `intake.md` is 32
  words. The story quotes no commenter verbatim beyond short phrases, and
  quotes no copyrighted news text. The one media quotation on the page's
  record is a 14-word Globe and Mail phrase inside `round1/claude.json`, well
  within fair dealing.
- **No private evidence tracked.** All ten archives cited by the claim sit
  under `evidence/private/`, and each registry entry marks
  `visibility: private` with `rights.redistribution: unclear`. The one
  exception in practice is A2 below.
- **No claim of human review.** The story and the claim say "reviewers",
  "seats" and "the panel", and every model name on the page matches
  `run.yaml`. Each seat report committed with this run opens with an HTML
  comment naming the seat, its effort, the launcher attempt and the drafting
  seat.
- **The founder is not named.** The run files refer to "the founder" by
  role, in `intake.md` and `run-record.md`. The editorial byline is Stew.
- **These two gate reports.** Neither pastes a local path, a staff username
  or a commenter's words beyond short phrases already in the register. The
  exposure audit above was run after both were written.

## Advisory

- **A1 — The frozen snapshot carries City staff system usernames, and it has
  been public on `main` since PR #81.**
  `snapshot/bike-routes-on-street.geojson` is the City's layer as its public
  REST service returned it, and every feature includes `created_user` and
  `last_edited_user`. Across 3,175 features those two fields hold five
  distinct values, four of which look like login ids built from staff
  names. They are not repeated here. They are not contact details, and the
  City's own public endpoint serves them. But they identify individual
  employees and add nothing the page uses. The file cannot be edited in
  place, because its SHA-256 is frozen in the brief, the registry and the
  calculation module. The choice is to accept the fields as the City
  published them, or to have a future run re-export without them and freeze
  the new hash. That call belongs to the founder, who is accountable for the
  capture. Nothing in this batch adds to the exposure.
- **A2 — YF-EV-0166 says private while the repository publishes the same
  bytes.** The registry entry, new in this branch, sets
  `visibility: private` and `rights.redistribution: unclear` ("Fails closed
  to private"). Yet its `url` is the raw GitHub address of the tracked
  snapshot, and `cmp` shows the two files are identical. The exposure audit
  does not flag this, because it looks for private archive paths, not for
  identical content under another path. The record should say what is true:
  the export is published in the repository as the run's frozen instrument,
  and on what rights basis. That basis is the founder's to state, for
  example the City's open-data licence if it covers GIS layer 236. The
  registry's rights note should then match.
- **A3 — Prior art, still open: the capture's platform comment ids.** As
  recorded at the cycling-volumes gate, `intake/captures/yegscoop-2026-08-26/comments.jsonl`
  pairs each pseudonym with the platform's own `comment_id`, and the README
  gives the post URL, so a reader holding both can walk back to a real name.
  This run draws its commenter counts from that capture and changes nothing
  in it. It is listed again only because the founder's decision on it is
  still outstanding.

`RELEASE: 0 blocking, 3 advisory`
