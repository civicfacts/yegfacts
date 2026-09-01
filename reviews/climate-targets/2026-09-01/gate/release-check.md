# Release check — review artifacts, climate-targets 2026-09-01

Gate stage 7, AI-automatable portion. Run date 2026-09-01.

**Scope.** Every file the founder would commit under
`reviews/climate-targets/2026-09-01/`, plus the state note that lives one level
up:

| File | Size |
|---|---|
| `brief.md` | 2,903 B |
| `run.yaml` | 4,205 B |
| `fetch-report.md` | 258 B |
| `../state.yaml` | 823 B |
| `round1/claude.json` | 16,451 B |
| `round1/gemini.json` | 4,444 B |
| `round1/gpt.json` | 10,228 B |
| `round2/claude.json` | 24,556 B |
| `round2/gemini.json` | 8,112 B |
| `round2/gpt.json` | 15,394 B |
| `combined-evidence.json` | 18,091 B |
| `disagreements.json` | 70 B |
| `synthesis.json` | 2,816 B |

**Method.** The four text files were read in full. The nine JSON files were
walked leaf-by-leaf (798 string values total) and every value tested against
pattern sets for email addresses, North American phone numbers, absolute
filesystem paths, Canadian postal codes, IP addresses, credential-shaped strings,
injection phrasing, and zero-width / bidi / tag-block Unicode. All 25 `quote`
fields were read and word-counted. Every string of 300 characters or more was
read individually. Capitalized name bigrams were extracted across all files and
triaged by hand, and the individuals named in this story's evidence archives were
grepped for by name.

---

## 1. Personal information — **none found**

No email addresses, phone numbers, street addresses, postal codes, IP addresses,
account handles, or credentials appear in any of the thirteen files. The regex
sweep returned zero matches across all of them.

Exactly one natural person is named:

- **Natasha Riebe** — `combined-evidence.json` `items[0]` and the round-1 and
  round-2 files that cite it, as the bylined author of the CBC article the
  evidence item is. The same status as "CBC News" in the `publisher` field of the
  neighbouring items. **No redaction.**

This story's archives name several other people the artifacts could have picked
up and did not: the CBC article quotes a named committee co-chair and a named
councillor at length, the archived report carries a delegation line naming three
City staff, and the CBC page footer carries the reporter's direct email address.
I grepped all of them. **Zero hits** in any artifact — including the email
address, which is the single highest-risk string in this story's source material.

The published story names no one at all.

## 2. Local filesystem paths — **none found**

No `/Users/…`, `/home/…`, `/tmp/…`, `/private/…`, `/Volumes/…`, `~/…`,
`/var/folders/…`, or Windows-drive paths in any file. No usernames, hostnames, or
environment variables.

`run.yaml` publishes full CLI invocations, which is where a path leak would
normally hide. It doesn't leak: bare relative filenames (`package.md`,
`package2.md`) with no containing directory, and `isolation: "scratch dir outside
repo; web tools only"` describing the scratch location without naming it. No API
keys, tokens, or auth material; the `prompt_sha256` values are hashes.

The only path anywhere is `brief.md` in `run.yaml`, which is repo-relative and
intentional.

## 3. Copyright-scale quotation — **none found**

The artifacts contain **25** verbatim `quote` fields, eight distinct passages
repeated across files. Longest is **30 words**, against the 75-word threshold:

| Words | Source | Rights | Distinct passages |
|---|---|---|---|
| 30, 26, 24, 21, 20, 17 | City of Edmonton (FCS03160, FCS01478, 2026 Budget Highlights, Engaged Edmonton) | City publications, redistribution terms not stated | 6 |
| 21, 14 | CBC News | commercial, `redistribution: restricted` in the registry | 2 |

The two CBC passages are 21 and 14 words — one of them a quotation of a City
report that CBC was itself quoting, which is City text arriving through a
commercial intermediary. Thirty-five words in aggregate from a single commercial
article, attributed, is comfortably inside fair dealing.

The six City passages are the load-bearing evidence of this whole story: the
City's own sentences saying it is not on track. They are quoted at the length
needed to be unambiguous and no further. The registry entries for YF-EV-0020,
0021, 0022 and 0032 all carry the note "retained privately and quoted only in
short excerpts," and the artifacts honour that.

Everything else long in these files is reviewer-authored prose. The longest
string in the set (768 characters, 112 words, `round2/claude.json`
`round2_notes.evidence_i_missed[0]`) is a reviewer explaining what it could not
verify, not reproduced source text.

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
- The `quote` fields — the only verbatim channel — are the eight short passages
  reviewed above, all from City documents or CBC.

Of the three stories audited today, this one had the narrowest injection surface:
every evidence item but one is a City of Edmonton document or webpage.

## 5. Anything else unsuitable for a public repo — **nothing blocking**

Five advisory notes. None requires a redaction; each is something the founder
should decide about knowingly rather than discover after publication.

**5a. The artifacts name a commercial model and record a citation that failed to
resolve.** `round2/claude.json` `round2_notes.errors_in_other_reviews[0]` and
`round2/gpt.json` `[1]` both record that the Gemini seat's sole primary citation
(`DocumentId=241434`) could not be fetched, and `../state.yaml` puts it in the
permanent record: "gemini's sole primary citation (DocumentId=241434) failed
staging with HTTP 404." Entries continue in the same register — reliance on
superseded 2023 figures, an outdated claim that the 2024 inventory was
unpublished. This is exactly the adversarial cross-review the methodology exists
to produce. It is still a public, attributed, documented claim about a named
vendor's product. Nothing to redact — just be aware it ships.

The record is fair to the vendor in one respect worth noting: `round2/gemini.json`
`errors_in_other_reviews[0]` lands a real hit back on the other two, flagging the
180,000-tonne funded-projects figure as an intention-versus-outcome risk. The
published story adopted that correction ("projects the City **estimates** will
cut about 180,000 tonnes").

**5b. A document is mislabelled in the record.** `round2/claude.json` and
`round2/gpt.json` repeatedly call YF-EV-0022 the "**Spring** 2026 Budget
Highlights". The document is the 2026 Budget Highlights, covering the December
2025 budget approval with supplemental schedules updated April 2026. The registry
entry and the published claim both name it correctly, and the source-verification
audit read its bytes directly, so nothing published is affected. But a reader
following the run record to the source will be looking for a document that does
not exist under that name.

**5c. Unverified citations ship as first-class evidence items.**
`combined-evidence.json` carries 10 items with no verification flag on any of
them. At least one is known-bad — `items[8]` (`DocumentId=241434`), recorded as a
404 in both `fetch-report.md` and `state.yaml` — and `items[9]`
(`DocumentId=280356`) is the subject of a documented dispute in
`round2/claude.json` `errors_in_other_reviews[2]` about whether that ID is the
right attachment. Someone reading `combined-evidence.json` on its own would take
all ten as real sources.

*Suggested:* add a `verified: true|false` field per item, or a short README in the
run directory. `fetch-report.md` already carries the information; it just is not
attached to the items it describes.

**5d. `combined-evidence.json` has `evidence_id: null` on all 10 items.** No link
between the review record and the `YF-EV-*` registry the published claim actually
cites. Not a safety problem; a traceability gap. This is the same finding as the
electric-buses and winter-cycling runs, so it is systemic rather than a slip.

**5e. `brief.md` ships marked PROVISIONAL.** Its header reads "drafted by the
orchestrator 2026-09-01; founder ratifies at the gate," and `../state.yaml` shows
`human_gate: {status: pending}`. Both are accurate as of this audit and become
stale the moment the founder approves. If the brief is committed as-is, the
PROVISIONAL banner should be updated in the same commit that flips the gate.

One thing the brief does that is worth keeping: its selection rationale says out
loud that "the expected finding cuts against City messaging, which demonstrates
the site is not an administration mouthpiece." Publishing the editorial reasoning
alongside the result is a stronger position than publishing the result alone.

---

## Adjacent confirmation (not requested, but load-bearing here)

The personal information in this story's source material is in the evidence
archives, and it is correctly excluded from the commit:

```
$ git check-ignore -v evidence/private/YF-EV-0033-edmonton-fails-to-meet-climate-targets-2-years-after-launchi
.gitignore:5:evidence/private/	evidence/private/YF-EV-0033-…
```

All six archives for this story (YF-EV-0020, 0021, 0022, 0024, 0032, 0033) sit
under `evidence/private/` and are ignored. Only the registry YAMLs are tracked.
Those carry short excerpts, and I read every excerpt for these six entries: all
are impersonal statements of measurement or policy. The CBC entry (YF-EV-0033),
the one with `redistribution: restricted` and the one whose archive contains a
reporter's email address, has `excerpts: []` — nothing quoted at all. That is the
right call and appears to be a deliberate one.

---

## Verdict: **SAFE TO COMMIT**

No required redactions. Zero findings on personal information, filesystem paths,
copyright-scale quotation, and prompt injection. This is the cleanest of the three
runs audited today on every axis: one named person, all quotes under 30 words,
nine of ten evidence items from a single public institution, and no injection
surface to speak of.

The five items in §5 are publication judgements for the founder, not safety
defects — the most substantive being §5c, where a citation the run itself
recorded as a 404 sits in `combined-evidence.json` without a flag.
