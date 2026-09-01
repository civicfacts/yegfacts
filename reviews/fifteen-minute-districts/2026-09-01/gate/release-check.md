# Release check — review artifacts, fifteen-minute-districts 2026-09-01

Gate stage 7, AI-automatable portion. Run date 2026-09-01.

**Scope.** Every file the founder would commit under
`reviews/fifteen-minute-districts/2026-09-01/`, plus the state note that lives one
level up:

| File | Size |
|---|---|
| `brief.md` | 3,070 B |
| `run.yaml` | 3,878 B |
| `fetch-report.md` | 263 B |
| `../state.yaml` | 700 B |
| `round1/claude.json` | 14,618 B |
| `round1/gemini.json` | 2,962 B |
| `round1/gpt.json` | 12,608 B |
| `round2/claude.json` | 24,392 B |
| `round2/gemini.json` | 9,837 B |
| `round2/gpt.json` | 19,170 B |
| `combined-evidence.json` | 20,902 B |
| `disagreements.json` | 79 B |
| `synthesis.json` | 3,087 B |

**Method.** The four text files were read in full. The nine JSON files were
walked leaf-by-leaf (804 string values total) and every value tested against
pattern sets for email addresses, North American phone numbers, absolute
filesystem paths, Canadian postal codes, IP addresses, credential-shaped strings,
injection phrasing, and zero-width / bidi / tag-block Unicode. All 37 `quote`
fields were read and word-counted. Every string of 300 characters or more was
read individually. Capitalized name bigrams were extracted across all files and
triaged by hand, and the individuals named in this story's evidence archives were
grepped for by name.

**Why this story needed a closer look than the other two.** This is the run whose
source material is a conspiracy claim about surveillance of individuals, whose
primary archive is a 63-page set of Council minutes recording every councillor's
vote by name, and whose fact-check archive documents a named protest. If
inappropriate personal information were going to reach a public repo from this
run, those are the three places it would come from. All three were checked
directly.

---

## 1. Personal information — **none found**

No email addresses, phone numbers, street addresses, postal codes, IP addresses,
account handles, or credentials appear in any of the thirteen files. The regex
sweep returned zero matches across all of them.

Exactly three natural persons are named, all public figures cited in their
official or professional capacity:

- **Shauna Kuiper** — `combined-evidence.json` and the round files, quoted as the
  City planning supervisor who gave the Canadian Press an on-record statement. A
  public official speaking for her employer, quoted from a published fact check.
  **No redaction.**
- **Councillor Aaron Paquette** — named in the round files as the mover of the
  freedom-of-movement amendment. An elected official, named for a recorded vote in
  public minutes. **No redaction.**
- **Mayor Amarjeet Sohi** — same status, named as seconder. **No redaction.**

**Three specific exposures were checked and are clean.**

*The Council minutes.* YF-EV-0015 records twelve councillors' names against every
vote across 63 pages. The artifacts name only the two who moved and seconded the
relevant amendment, and only in the context of that amendment. The eleven-name
vote rosters did not propagate.

*The fact-check archive.* YF-EV-0019 reports a protest attended by "dozens of
people", names the Canadian Press reporter and photographer, and names an Alberta
government communications official. None of them appears in any artifact, and no
protester is identified anywhere — in the archive or in the artifacts. Good: this
is a story about people who believe something, and naming individual believers
would be the obvious failure mode. It did not happen.

*Social-media claimants.* The brief and the artifacts describe the circulating
claim, its platforms and its volume. No account handle, username, screenshot, or
link to an individual post appears anywhere. The published story's `seen:` block
is paraphrased and platform-labelled with no attribution, which is the same
discipline.

## 2. Local filesystem paths — **none found**

No `/Users/…`, `/home/…`, `/tmp/…`, `/private/…`, `/Volumes/…`, `~/…`,
`/var/folders/…`, or Windows-drive paths in any file. No usernames, hostnames, or
environment variables.

`run.yaml` publishes full CLI invocations, which is where a path leak would
normally hide. It doesn't leak: bare relative filenames (`package.md`,
`package2.md`) with no containing directory, and `isolation: "scratch dir outside
repo; web tools only"` describing the scratch location without naming it. No API
keys, tokens, or auth material; the `prompt_sha256` values are hashes.

The apparent IP addresses my first pass flagged in `combined-evidence.json` and
the round files are all false positives — District Policy section numbers
(`3.3.1.2`, `4.1.3.1`, `3.1.1.1`). There are 21 of them and every one was read
individually to confirm. Worth recording so a future automated scan does not
re-raise them.

## 3. Copyright-scale quotation — **none found**

The artifacts contain **37** verbatim `quote` fields — the most of any run audited
today, which is expected for a story whose whole method is quoting adopted policy
text. Eleven distinct passages. Longest is **39 words**, against the 75-word
threshold:

| Words | Passage | Source | Rights |
|---|---|---|---|
| 39 | The two City Plan targets (50% transit/active, 15-minute access) | Report UPE01245rev | City publication |
| 34 | "To adopt the District Policy as a statutory plan…" | Report UPE01245rev | City publication |
| 26 | The freedom-of-movement clause | Charter Bylaw 24000 / consolidation | adopted bylaw text |
| 24 | "Although the choice will remain to make those trips by auto, through implementation…" | Charter Bylaw 20000 | adopted bylaw text |
| 21 | "These targets represent a shift in the built form and modes of travel…" | Report UPE01245rev | City publication |
| 15 | "People can continue to travel however they choose…" | City webpage | City publication |
| 12, 11, 10, 10, 7 | policy section text, glossary, zoning page | City publications | City publications |

Every quotation is from a City of Edmonton document — an adopted bylaw, a council
report, or a City webpage. Aggregate per source: about 94 words from Report
UPE01245rev across three passages, about 26 from Charter Bylaw 24000, about 35
from Charter Bylaw 20000, about 25 from City webpages. All attributed, all
short-form, all from public-sector policy instruments quoted for the purpose of
describing what they say. Comfortably inside fair dealing, and the registry notes
for YF-EV-0013 through 0018 all say "redistribution terms not stated. Fails closed
to private," which the artifacts honour by quoting rather than mirroring.

**Nothing is quoted from the Canadian Press archive.** YF-EV-0019 is the one
`redistribution: restricted` source in this set, and it carries `excerpts: []` in
the registry. The artifacts cite it for its rating and its findings without
reproducing its text. Correct handling of a wire-service source.

Everything else long in these files is reviewer-authored prose. The longest string
in the set (999 characters, 149 words, `round2/claude.json`
`claims[0].suggested_short_answer`) is a reviewer's own drafted answer.

## 4. Prompt-injection artifacts — **none found**

The reviewers ran with live web tools, so fetched page content had a path into
these files. Nothing hostile came through.

- No instruction-shaped text: zero matches for "ignore previous/prior/above
  instructions", "disregard", "system prompt", "you are now", "new instructions",
  "act as if", "jailbreak", "DAN mode", role markers (`assistant:` / `user:`),
  pseudo-tags (`<system>`, `</instructions>`), or template delimiters (`{{`,
  `[[`).
- No hidden-character carriers: zero zero-width spaces, zero-width joiners, BOMs,
  soft hyphens, word joiners, bidi overrides, or Unicode tag-block characters.
- The 37 `quote` fields — the only verbatim channel — are the eleven City-document
  passages reviewed above.

This story deserves one extra sentence on this point. Its subject matter is a
conspiracy claim that circulates on social platforms, and a reviewer researching
it will land on pages that reproduce that claim's rhetoric. None of that rhetoric
reached the artifacts as instruction-shaped text, and the reviewers consistently
describe the claim rather than restating it in its own voice.

## 5. Anything else unsuitable for a public repo — **nothing blocking**

Six advisory notes. None requires a redaction; each is something the founder
should decide about knowingly rather than discover after publication.

**5a. `../state.yaml` says the faithfulness check has not run.** The drafting
stage note reads:

> `drafting: {status: done, at: "2026-09-01", note: "story and claim drafted from the merged evidence; faithfulness check not yet run"}`

The other two stories audited today record the check in their equivalent notes
("every key fact checked against archived bytes"; "every published figure
re-verified against the archived bytes at drafting"). If the check has since run,
this note is stale and should be updated in the same commit that flips the gate;
if it has not run, the note is accurate and the founder is approving a story that
skipped a pipeline step. Either way this is the one file in the set whose content
the founder should reconcile before committing, because a state file that
misreports pipeline state is worse than no state file.

**5b. The artifacts name commercial models and document their errors.**
`round2/claude.json` `round2_notes.errors_in_other_reviews[0]`:

> "Reviewer B (gemini), evidence item 1: the cited URL … returns a City of
> Edmonton 'Page Not Found' 404 (fetched 2026-09-01)."

Entries continue through source-type misclassification, a transcription error (an
inserted Oxford comma in the quoted clause), and reliance on an unfetchable page.
`round2/gpt.json` makes eight such findings across both other seats, including one
against the Claude seat: that it attributed a claim about 2024 public hearings to
a Canadian Press article dated February 2023. This is the adversarial cross-review
the methodology exists to produce, and publishing it is arguably the point. It is
still a public, attributed, documented set of claims about named vendors'
products. Nothing to redact — just be aware it ships.

Worth noting that the process worked here: `round2/gpt.json`
`errors_in_other_reviews[3]` pushed back on the Claude seat's categorical framing
("any travel restriction would require entirely separate instruments … That is too
categorical because Council can amend"), and the published limitations adopted
that correction almost verbatim.

**5c. Unverified citations ship as first-class evidence items.**
`combined-evidence.json` carries 11 items with no verification flag on any of
them. At least two are known-bad, per `fetch-report.md` and the round-2 notes: the
City Plan webpage (failed) and a district-planning webpage recorded as returning a
404. Someone reading `combined-evidence.json` on its own — the most
citation-shaped file in the set — would take all eleven as real sources.

*Suggested:* add a `verified: true|false` field per item, or a short README in the
run directory.

**5d. `combined-evidence.json` has `evidence_id: null` on all 11 items.** No link
between the review record and the `YF-EV-*` registry the published claim actually
cites. Not a safety problem; a traceability gap. Same finding as the
electric-buses, winter-cycling and climate-targets runs, so it is systemic rather
than a slip.

**5e. One evidence item quotes a document not in this claim's registry set.**
`combined-evidence.json` `items[2].citations[0].quote` reads "Zoning is not about:
Regulating groups of people or behaviours", from a City zoning explanatory page.
That page is not among YF-EV-0013 through 0019, so a reader cannot check it
against an archive. The published claim does not use it, and the limitations
disclose the underlying gap ("The connected zoning instrument was checked only
through the City's explanatory webpage about it, not through a line-by-line
reading of the operative Zoning Bylaw text"). Not a safety issue; noted because it
is the one quoted passage in this run with no archived bytes behind it.

**5f. `brief.md` ships marked PROVISIONAL.** Its header reads "drafted by the
orchestrator 2026-09-01; founder ratifies at the gate," and `../state.yaml` shows
`human_gate: {status: pending}`. Both are accurate as of this audit and become
stale the moment the founder approves. If the brief is committed as-is, the
PROVISIONAL banner should be updated in the same commit that flips the gate.

---

## Adjacent confirmation (not requested, but load-bearing here)

The evidence archives for this story are correctly excluded from the commit:

```
$ git check-ignore -v evidence/private/YF-EV-0015-filestream.ashx
.gitignore:5:evidence/private/	evidence/private/YF-EV-0015-filestream.ashx
```

All seven archives (YF-EV-0013 through 0019) sit under `evidence/private/` and are
ignored. Only the registry YAMLs are tracked, and every one of these seven has
`excerpts: []` — no archived content in the commit at all, which for the Canadian
Press entry (`redistribution: restricted`) and the 63-page minutes (twelve
councillors' names on every recorded vote) is the right default.

---

## Verdict: **SAFE TO COMMIT**

No required redactions. Zero findings on personal information, filesystem paths,
copyright-scale quotation, and prompt injection.

For a run whose subject is a surveillance conspiracy claim, and whose primary
source is a name-by-name voting record, the personal-information result in §1 is
the one that matters: three public figures named for public acts, no protester
identified, no social-media account cited, no vote roster propagated.

The six items in §5 are publication judgements rather than safety defects. One of
them, **§5a**, should be reconciled before the commit rather than after: the state
file records that the faithfulness check has not run for this story, where the two
sibling runs record that it has.
