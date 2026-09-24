# Release check — infrastructure-deficit

Gate stage 7, part 2. Run date 2026-09-24 (story run `2026-09-03`),
methodology v1.39. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session and from both faithfulness seats.

**Result: 0 blocking, 3 advisory.** Nothing in the run directory or the draft
exposes contact details, a local machine path, a credential, withheld-claim
text or long copyrighted quotation. The advisories are one private
individual's GitHub handle in cited URLs, one offensive captured comment in
the intake record (both already on `main`), and page references in run
artifacts that are wrong.

**Package.** The draft is `src/content/stories/infrastructure-deficit.mdx`,
the three `src/content/claims/infra-*.yaml` records, and the edited sentences
in `active-transportation.mdx`, `at-100m-vs-roads.yaml` and
`at-100m-vs-snow.yaml`. The run artifacts are every tracked file under
`reviews/infrastructure-deficit/2026-09-03/`: `brief.md`, `intake.md`,
`fetch-report.md`, `run-record.md`, `run.yaml`, `synthesis.json`,
`combined-evidence.json`, `disagreements.json`, the eight files under
`framing/`, `faithfulness/gpt-1.md`, `faithfulness/gpt-luna-1.md`,
`plain-speech/gpt-1.md`, `gate/freshness-audit.md`, the raw reviewer JSON in
`round1/` and `round2/`, and `superseded-2026-09-24/` (its `run.yaml` and three
`round1/` files). Registry entries YF-EV-0200 to YF-EV-0208 are new on this
branch. YF-EV-0114 and YF-EV-0129 to YF-EV-0131 are already on `main`.

What this branch adds to the run directory: the two faithfulness reports, the
plain-speech read, the freshness audit, the restored GPT-6 Luna rows in both
`run.yaml` manifests, and a section of `run-record.md`. The rest was published
on `main` by earlier PRs (#41 and #89 among them) and is checked here
again, because it publishes
with the page.

**Deterministic layer.** `npm run audit:exposure`, over the whole tracked
tree:

```
exposure-audit: 1089 tracked text files scanned (18 binary skipped, 1107 tracked total), 171 registry entries
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  WITHHELD LEAK         0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   76
  warn  LONG QUOTES           0
exposure-audit: OK — no fail-class findings; 76 warning(s) need disposition in the audit record
```

**This run adds none of the 76.** Filtering the audit output for
`infrastructure-deficit` or `infra-` returns nothing. The warnings sit in
other runs (`active-transportation`, `low-density-history`,
`lanes-and-congestion`) and in one test fixture. They are street addresses of
public buildings or corridors, and a placeholder email in a test fixture. As
in the cycling-volumes release check, none is repeated here. The two `note`
lines report withheld text allowed in its own capture file, which is how the
audit is configured.

The output above is from the run made after both gate reports were staged
(1,087 text files before, 1,089 after, with the same result), so it covers
them.

## Findings

**No blocking findings.**

Checked and clear:

- **No local paths.** A search of the run directory for `/Users/`,
  `/private/tmp`, `/tmp/`, `file://` and `~/` finds nothing. The capture-check
  rows in both `run.yaml` manifests name sources by placeholder (`$HOME/...`,
  `<repo>/...`, "the repository path", "the home directory"), never by value.
  The restored GPT-6 Luna rows follow the same form.
- **No credentials.** No key, token or password pattern appears. "The canary
  token" in `run.yaml` is the name of a check with a `present` flag, not a
  token value.
- **No contact details.** No email address or phone number anywhere in the
  run directory or the claim records.
- **Commenters are pseudonymous.** Every commenter in `intake.md` carries a
  capture pseudonym ("Sunny Crow C.", "Willow Muskrat G."). The one named
  commenter is Councillor Jennifer Rice, an office-holder, which the intake's
  own rule allows.
- **Named people in the reviewer output are office-holders acting in
  office.** The round files and `combined-evidence.json` name councillors by
  their recorded motions and votes (Principe, Rice, Cartmell, Hamilton, Janz,
  Wright). These are public votes in the City's own minutes. No City staff
  name from the minutes or the profile sheet appears in the run artifacts.
- **No accusations against named individuals.** The reviewer JSON reports
  motions, votes and documents. It says nothing about the conduct or motives
  of any named person beyond a councillor's stated reason for her own motion,
  as a news report gave it.
- **No withheld-claim text.** `WITHHELD LEAK` is zero across the tree, and the
  intake record lists only the five registered claims of this question.
- **Quotation volume.** `LONG QUOTES` is zero. Across the run's JSON there
  are 16 `quote` fields, and the longest is 18 words, a City budget-adjustment
  excerpt. The only news quotation is Taproot's, at 12 words. The story quotes
  the City twice, at 6 words ("with funding coming from Tax-Supported Debt")
  and 8 words ("renewal funding gap of $1.63 billion for 2023-2026"), each the
  wording the finding turns on. The claim records quote City documents four
  times, the longest at 9 words.
- **No private evidence tracked.** All 13 archives the claims cite are under
  `evidence/private/`, which is gitignored. Every registry entry marks
  `visibility: private` and `rights.redistribution: unclear`, failing closed.
  `PRIVATE-EVIDENCE LEAK` and `RIGHTS` are zero.
- **No claim of human review.** The story and claims say "reviewers", "seats"
  and "the panel". Every seat report on this branch opens with an HTML
  comment giving the seat, the command family, the attempt id and the drafting
  seat, and names Stew, not the founder, as the runner.
- **The founder is not named.** `run-record.md` and `intake.md` refer to "the
  founder" by role only.

## Advisory

- **ADVISORY — a private individual's GitHub handle in cited URLs, prior
  art.** The Claude seat's round-1 file cites three pull requests on a
  personal GitHub repository as a third-party transcription of the City's
  table. The account name is part of each URL, in `round1/claude.json`,
  `round2/gpt.json`, `superseded-2026-09-24/round1/claude.json`,
  `combined-evidence.json` and `fetch-report.md`. It is a public byline on
  public work, and nothing accuses the author of anything. Two seats said in
  round 2 that the transcriptions post-date the brief's cutoff, and the page
  does not use them. These files are already on `main`. No change needed.
  Rewriting raw reviewer output would break the record it exists to be.
- **ADVISORY — an offensive captured comment in `intake.md`, prior art.** The
  verbatim wording under registered claim 3 (`rec-centre-money-diverted`)
  includes a disparaging remark about a First Nations name. It is
  pseudonymised, it is an exact substring of the capture, it names no one, and
  it appears on no page. The intake record's rule is to quote captured
  wordings exactly. Whether offensive wording should be kept verbatim or
  elided in public intake records is the founder's decision, not a release
  check's. The file is on `main` and unchanged on this branch.
- **ADVISORY — page references in run artifacts that are wrong.** The
  disposition comment in `faithfulness/gpt-1.md` places the CM-20-0330 profile
  sheet on p. 539 of YF-EV-0114. It starts on p. 540, and its funding table is
  on p. 542. The source verification lists two similar slips in the calcs
  module comments. Nothing on the page depends on them. Fix them when those
  files are next touched.

`RELEASE: 0 blocking, 3 advisory`
