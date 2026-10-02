# Correction: fifteen archived sources can no longer be checked against their hashes

2026-10-02. An audit record and a correction notice.

## The correction

Every evidence page on this site says that we archived the source and that its
SHA-256 hash identifies the exact bytes we read. For fifteen sources that is no
longer true. We lost the archived files. The hashes are still published, but we
hold nothing they can be checked against, and the sources have changed or now
refuse our requests, so a reader fetching them today gets different bytes.

Fourteen of the fifteen are cited by the seven published cycling-volumes
findings. None of those findings changes. Every figure they rest on is written
out in the review panel's committed answers, which anyone can read on GitHub;
one count is given there as a percentage rather than as the number we
published. What was lost is the second, independent check: matching the bytes
the panel read against the hash.

The evidence pages for these fifteen entries now say "original archive lost"
and link here.

## What was lost

`scripts/verify-private.ts` checks that every privately archived source is
present in the main checkout and matches its hash. On 2026-10-02 it reported 23
entries with no file. Each was fetched again that day from its registered URL
with the site fetcher's user agent.

| Outcome | Entries |
| --- | --- |
| Restored: the new bytes match the recorded hash, so nothing was lost | YF-EV-0142, 0151, 0152, 0154, 0155, 0156, 0157, 0161 |
| Lost: the source has changed, so the new bytes do not match | YF-EV-0078, 0141, 0143, 0144, 0145, 0146, 0147, 0148, 0149, 0150, 0153, 0159, 0160, 0162 |
| Lost: no copy could be made | YF-EV-0158 |

YF-EV-0158 is the Statistics Canada 2016 Census Profile for Edmonton. Its URL
now answers HTTP 403 with a Cloudflare challenge page. That page was discarded
rather than registered, because it is not the source.

YF-EV-0078, a Wikipedia article on Glenora, is cited by no published claim.

### How it happened

The files were archived in drafting worktrees, the separate working copies each
editing session uses. The archive folder, `evidence/private/`, is excluded from
Git because most of these sources may not be republished, so a worktree's
archived files exist only on disk inside that worktree. The worktrees were
removed before their files were copied to the main checkout, and the files went
with them. No other copy exists on the machine. The cycling-volumes sources were
all archived on 2026-09-04 (YF-EV-0078 on 2026-09-01); the loss was found on
2026-10-02.

## What still supports each finding

The panel's committed answers for this run are in
[`reviews/cycling-volumes/2026-09-03/`](../../reviews/cycling-volumes/2026-09-03/):
`round1/`, `round2/` and `combined-evidence.json`. Every lost source cited by a
claim was read successfully by the panel (its fetch status is `ok`), and the
reviewers wrote down the figures they took from it.

| Finding | Lost sources it cites | What still supports it |
| --- | --- | --- |
| [Do 87 percent of Edmontonians commute by car?](https://yegfacts.ca/claims/cv-commute-by-car) Supported | 0158 | The 2021 figures rest on restored sources 0155 to 0157. The 2016 comparison (367,225 of 466,230 by car, 78.76 percent) is written out in `round1/claude.json` and `combined-evidence.json`. |
| [Do fewer than 1 percent of Edmonton commuters cycle to work?](https://yegfacts.ca/claims/cv-commuters-cycle) Supported | 0158, 0159 | 2021 figures on restored sources. The 2016 figure (5,575 of 466,230) and the 2012 municipal census figure (2,568 of 380,640, 0.67 percent) are written out in `combined-evidence.json` and the round 1 files. |
| [Did the counters record nearly 1.3 million trips in the first seven months of 2026?](https://yegfacts.ca/claims/cv-counter-total-2026) Partially supported | 0141, 0143, 0144, 0148, 0160 | Every source it cites is lost, and none was restored. Each figure is in the committed text: the 1,291,714 total, the 2025 and 2024 totals, the last record on 2026-09-02, the City's warning that the data is raw, the API's last-update date and the CBC sentence. This finding is now checkable from the panel's text only. |
| [Do the bike lanes the City meters carry little or no traffic?](https://yegfacts.ca/claims/cv-lanes-look-empty) Contradicted | 0143, 0144, 0145, 0146, 0147, 0162 | The counter medians rest on restored 0142 and the historic counts on restored 0161. The one fact citing only lost sources, 21 counters on-street and 21 off-street, is written out in `round1/claude.json`. |
| [Do only about 1 to 2 percent of Edmontonians ride a bicycle?](https://yegfacts.ca/claims/cv-population-rides) Not established | 0149, 0150, 0153 | The Statistics Canada table list, the 2014 survey's recruitment counts and its answers, and the status of the 2025 travel survey are in `combined-evidence.json`. The survey answers are given as percentages of 816 (40.1 percent never ride); the published 327 and 489 follow from them. |
| [Are about 2 percent of trips made by bicycle?](https://yegfacts.ca/claims/cv-trips-by-bike) Supported | 0153 | The figures rest on restored 0152 and 0154. The lost source supports only the statement that the 2025 survey had published no results by 2026-09-03, which is in `combined-evidence.json`. |
| [Do only 1 percent of Edmontonians ride year-round?](https://yegfacts.ca/claims/cv-year-round-riders) Not established | 0141, 0149, 0150 | The 2025 counter totals (2,856,631; 139,245 in winter, 4.87 percent) and the table list are written out. The 2014 winter answers are given as percentages of 816 (87.6 percent never; daily 1.0, four or more a week 1.6). The published counts of 715, 101 and 21 follow by arithmetic but are not written out as counts anywhere committed. This is the weakest point found. |

## Where the registry now stands

- Each of the fifteen lost entries keeps its recorded hash and now carries
  `archive.lost_on: 2026-10-02`, a link to this record, and a note saying
  whether a new copy exists.
- Each of the fourteen new copies is registered as its own private entry, "the
  source as it now stands", retrieved 2026-10-02. Published claims keep citing
  the original entries; nothing was repointed.

| Lost | Re-archived 2026-10-02 as |
| --- | --- |
| YF-EV-0078 | YF-EV-0318 |
| YF-EV-0141 | YF-EV-0319 |
| YF-EV-0143 | YF-EV-0320 |
| YF-EV-0144 | YF-EV-0321 |
| YF-EV-0145 | YF-EV-0322 |
| YF-EV-0146 | YF-EV-0323 |
| YF-EV-0147 | YF-EV-0324 |
| YF-EV-0148 | YF-EV-0325 |
| YF-EV-0149 | YF-EV-0326 |
| YF-EV-0150 | YF-EV-0327 |
| YF-EV-0153 | YF-EV-0328 |
| YF-EV-0158 | none; the source answers with a challenge page |
| YF-EV-0159 | YF-EV-0329 |
| YF-EV-0160 | YF-EV-0330 |
| YF-EV-0162 | YF-EV-0331 |

## What could restore checkability

A copy whose bytes match a recorded hash would restore that entry exactly.

- **Internet Archive.** On 2026-10-02 the Wayback Machine had no capture of any
  of the fifteen URLs between 2026-08-01 and 2026-10-02. Ten have never been
  captured: 0141, 0143, 0145, 0146, 0147, 0150, 0158, 0159, 0160 and 0162.
  Older captures exist for the other five: 0078 (latest 2026-02-18), 0144
  (2025-11-15), 0148 (2025-07-16), 0149 (2025-09-06) and 0153 (2026-03-16). The
  latest capture of 0144, 0148, 0149 and 0153 was fetched and none matches its
  hash; the archive refused to serve the 0078 capture (HTTP 403). No entry was
  restored this way.
- **The publishers' own histories.** The City of Edmonton's Socrata datasets
  (0141, 0143, 0145, 0162) are aggregates of live data; Socrata keeps no public
  version history, so the City would have to supply the dataset as it stood on
  2026-09-04. Statistics Canada also publishes the 2016 Census Profile as
  downloadable files, which could support the 0158 figures though not its hash.
  Wikipedia keeps every revision of the Glenora article, so the revision live on
  2026-09-01 can be read, though the served page is unlikely to match the hash.
- **Exact hash match is unlikely for web pages** (0144, 0146, 0147, 0148, 0149,
  0153, 0159, 0160): they carry per-request tokens and site chrome, so even an
  unchanged page rarely hashes the same twice. Their content can be compared;
  their hashes cannot be restored.

## The process fix

`scripts/worktree-remove-safe.sh <worktree path>` now replaces a bare
`git worktree remove`. Before removing a worktree it compares the worktree's
`evidence/private/` with the main checkout's, file by file, by path and SHA-256.
It copies every file the main checkout lacks and prints each one. If any file
exists in both with different bytes, it lists them and refuses to remove the
worktree. The removal itself never forces. `AGENTS.md` and `CLAUDE.md` tell
every session to use it.

`scripts/verify-private.ts`, the local check that found this, now lists a
recorded loss on every run instead of failing on it, so a new loss stands out.
