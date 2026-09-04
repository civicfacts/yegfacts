# Release check — cycling-volumes

Gate stage 7, part 2. Run 2026-09-04 (story run `2026-09-03`), methodology
v1.24. Auditor: a Claude (Opus) audit session, separate from the drafting
session.

**Package.** The draft — `src/content/stories/cycling-volumes.mdx` and the
seven `src/content/claims/cv-*.yaml` records — and every tracked file under
`reviews/cycling-volumes/2026-09-03/`: `brief.md`, `intake.md`,
`register-note.md`, `errata.md`, `fetch-report.md`, `run-record.md`,
`run.yaml`, `synthesis.json`, `combined-evidence.json`,
`disagreements.json`, the four framing checks, both check reports under
`faithfulness/` and `plain-speech/`, and the raw reviewer JSON in `round1/`,
`round1-superseded/`, `round1-rerun-1/`, `round1-rerun-2/` and `round2/`
including `round2/gemini-invalid-output.txt`. Registry entries YF-EV-0141 to
YF-EV-0162. The capture the run draws on,
`intake/captures/yegscoop-2026-08-26/`, is on `main` already and is treated
here as prior art, with one observation below.

**Deterministic layer.** `npm run audit:exposure`, over the whole tracked
tree:

```
exposure-audit: 735 tracked text files scanned (16 binary skipped, 751 tracked total), 162 registry entries
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   36
  warn  LONG QUOTES           0
```

**This run adds none of the 36.** Every PII warning is in
`reviews/active-transportation/` or `reviews/low-density-history/`, and each
is a street address inside a budget line or a heritage Statement of
Significance — "CM-99-9600 Yellowhead Trail Freeway Conversion", "the Holgate
Residence, 6210 Ada Boulevard", "the Hardisty Residence, 10549 126 Street
NW". They are civic addresses of public buildings and named capital projects,
already dispositioned as accepted in the records for those runs. Filtering
the audit output for `cycling-volumes` or `cv-` returns nothing.

## Findings

**No blocking findings.**

Checked and clear:

- **No local paths.** No `/Users/`, `/private/tmp/`, `/tmp/` or `file://`
  string appears in the draft, in any file under the run directory, or in the
  registry entries. The two check seats' scratch directories stayed outside
  the repository and their raw stdout is not committed; both reports are
  committed as edited Markdown, and the tool-narration preamble the Gemini
  seat printed was stripped rather than published.
- **No contact details.** No email address, phone number, postal code or
  street address anywhere in the run directory or the claim records.
- **No real names from capture data.** Every commenter in `intake.md` and in
  the reviewer JSON carries a stable pseudonym of the capture's own form —
  "Boreal Hare I.", "Wintry Raven B.", "Chilly Squirrel O." The mapping is
  held privately and is not in this repository, which the capture's README
  states.
- **One named individual, and he is an office-holder.** `round1-rerun-1/gpt.json`
  records `"source_publisher": "Aaron Paquette"` for a newsletter page at
  `aaronpaquette.ca` that repeated the counter figure. He is a sitting
  Edmonton councillor publishing under his own name, so this is a byline on
  published work by a public office-holder — the disposition the
  2026-09-02 release check reached for a journalist's byline, on the same
  reasoning. Not adopted as a finding. He is not named on the page.
- **Quotation volume.** The longest verbatim comment anywhere in the run is 34
  words, in `intake.md`. The story quotes three commenters, at 8, 11 and 9
  words, each being the wording the finding is about. `LONG QUOTES` is zero:
  no `quote` field in any committed review JSON exceeds 75 words. The CBC
  article is quoted twice on `cv-counter-total-2026`, at 13 and 21 words, each
  the shortest run that carries the point, and the claim says in terms that
  the archived bytes are a syndicated copy standing in for an address that
  could not be archived.
- **No private evidence tracked.** All 23 archives sit under
  `evidence/private/`, which is gitignored; every registry entry marks
  `visibility: private` and `rights.redistribution: unclear`, failing closed.
  None enters the build.
- **Nothing unsuitable in the raw reviewer output.** The round files carry
  verdicts, citations and arithmetic. `round2/gemini-invalid-output.txt` is
  committed unedited as `errata.md` item 2 requires and contains nothing but
  that seat's schema-invalid review.
- **No claim of human review.** The story and the claim records say
  "reviewers", "seats" and "the panel" throughout, and every model identity
  on the page renders from `run.yaml`. Every seat report committed with this
  run opens with an HTML comment naming the runner's recorded model and
  saying the report's own first line is the model's self-report — which
  matters this run, because the freshness seat signed itself "Gemini 3.1 Pro
  (High)" and 3.1 Pro was retired the day before under D-0034, so what
  answered was the CLI's current default. Both Gemini reports say so in the
  comment.
- **The founder is not named.** `intake.md` and the capture README credit "the
  founder" by role for the capture. The editorial byline is Stew, which is
  the site's published byline by decision.

## Advisory

- **ADVISORY — the capture's comment ids are a re-identification vector, and
  this is prior art.** `intake/captures/yegscoop-2026-08-26/comments.jsonl`
  pseudonymises every commenter, and the README says the mapping is held
  privately. But each row also carries the platform's own `comment_id` and the
  README gives the post URL, so a reader with both can walk back from a
  pseudonymised comment to the original and its author's real name. The
  pseudonyms protect against casual reading and not against that. The file
  was published on `main` under PR #32 and nothing in this run changes it, so
  it is out of this gate's scope to alter — but the founder should decide
  whether captures keep platform ids, because the decision belongs to whoever
  is accountable for the capture and not to a release check that found it.

`RELEASE: 0 blocking, 1 advisory`
