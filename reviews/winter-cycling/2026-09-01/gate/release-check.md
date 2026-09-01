# Release check — review artifacts, winter-cycling 2026-09-01

Gate stage 7, AI-automatable portion. Run date 2026-09-01.

**Scope.** Every file the founder would commit under
`reviews/winter-cycling/2026-09-01/`, plus the state note that lives one level up:

| File | Size |
|---|---|
| `brief.md` | 3,272 B |
| `run.yaml` | 4,103 B |
| `fetch-report.md` | 364 B |
| `../state.yaml` | 870 B |
| `round1/claude.json` | 20,499 B |
| `round1/gemini.json` | 8,549 B |
| `round1/gpt.json` | 16,827 B |
| `round2/claude.json` | 32,804 B |
| `round2/gemini.json` | 14,331 B |
| `round2/gpt.json` | 25,967 B |
| `combined-evidence.json` | 22,906 B |
| `disagreements.json` | 69 B |
| `synthesis.json` | 3,515 B |

**Method.** The four text files were read in full. The nine JSON files were
walked leaf-by-leaf (1,164 string values total) and every value tested against
pattern sets for email addresses, North American phone numbers, absolute
filesystem paths, Canadian postal codes, IP addresses, credential-shaped strings,
injection phrasing, and zero-width / bidi / tag-block Unicode. All seven `quote`
fields were read and word-counted. Every string of 300 characters or more was
read individually. Capitalized name bigrams were extracted across all files and
triaged by hand, and the private individuals named in this story's evidence
archives were grepped for by name.

---

## 1. Personal information — **none found**

No email addresses, phone numbers, street addresses, postal codes, IP addresses,
account handles, or credentials appear in any of the thirteen files. The regex
sweep returned zero matches across all of them.

Exactly three natural persons are named, all public figures cited in their
professional capacity:

- **Councillor Michael Janz** — `combined-evidence.json` `items[12]`
  (`publisher`: *"Councillor Michael Janz"*, title *"Bike Lane Use Rises!
  (summary of City of Edmonton eco-counter data)"*), cited as the author of an
  advocacy summary of City eco-counter data. An elected official, cited for
  something he published. **No redaction.**
- **Councillor Janz** again in `round2/claude.json`
  `round2_notes.errors_in_other_reviews[2]`, in the course of correcting another
  reviewer's attribution. Same status. **No redaction.**
- **Mark Wagenbuur** — `combined-evidence.json`, as the publisher of Bicycle
  Dutch, his own blog. The same status as "CBC News" in the `publisher` field.
  **No redaction.**

**The notable result here is a negative one.** This story's evidence archives
contain more personal information than any other in this run. YF-EV-0026, the
City of Edmonton's "Cycling in a winter wonderland" page, is a human-interest
piece that names four private individuals — including a father and his named
young daughter, photographed on a school run — alongside a named academic and a
named bike-shop manager. I grepped every artifact for all of them plus the
journalists and researchers named in the other archives (CBC's bylined reporter,
the Canadian Press photographer, the Québec and Helsinki study authors). **Zero
hits.** The reviewers took the two statistics off that page and left the people
behind, which is exactly right: the 90,000-trip figure is the evidence, and the
family is not.

The published story does the same. Nothing in `winter-cycling.mdx` names anyone
from that archive.

## 2. Local filesystem paths — **none found**

No `/Users/…`, `/home/…`, `/tmp/…`, `/private/…`, `/Volumes/…`, `~/…`,
`/var/folders/…`, or Windows-drive paths in any file. No usernames, hostnames, or
environment variables.

`run.yaml` publishes full CLI invocations, which is where a path leak would
normally hide. It doesn't leak:

```
command: 'claude -p --model claude-fable-5 --allowedTools "WebSearch,WebFetch" < package.md'
command: 'codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -c tools.web_search=true -s read-only --skip-git-repo-check - < package.md'
command: 'agy --effort high --sandbox --print-timeout 45m -p "$(cat package2.md)"'
```

Bare relative filenames (`package.md`, `package2.md`) with no containing
directory. `isolation: "scratch dir outside repo; web tools only"` describes the
scratch location without naming it. No API keys, tokens, or auth material. The
`prompt_sha256` values are hashes, not content.

The only paths anywhere are repo-relative and intentional: `brief.md` in
`run.yaml`.

## 3. Copyright-scale quotation — **none found**

The artifacts contain **7** verbatim `quote` fields, three distinct passages
repeated across files. Longest is **21 words**, against the 75-word threshold:

| Words | Source | Rights | Location |
|---|---|---|---|
| 21 | CityMonitor (media) | commercial | `combined-evidence.json` `items[4].citations[1].quote`; `round1/claude.json`, `round2/claude.json` |
| 21 | City of Oulu, 2021 travel survey (Finnish original + parenthetical translation) | city publication | `round2/claude.json` `claims[0].challenging_evidence[0].quote` |
| 11 | Urban Cycling Institute | non-profit research | `combined-evidence.json` `items[16].citations[0].quote`; `round1/claude.json`, `round2/claude.json` |

No single source is quoted more than 21 words in aggregate. At that length,
attributed, this is comfortably inside fair dealing for all three, including the
one commercial publisher.

Everything else long in these files is reviewer-authored prose. The longest
string in the set (1,193 characters, 185 words, `round2/claude.json`
`claims[0].suggested_short_answer`) is a reviewer's own drafted answer, not
reproduced source text.

## 4. Prompt-injection artifacts — **none found**

The reviewers ran with live web tools (`WebSearch`/`WebFetch`, `web_search`), so
fetched page content had a path into these files. Nothing hostile came through.

- No instruction-shaped text: zero matches for "ignore previous/prior/above
  instructions", "disregard", "system prompt", "you are now", "new instructions",
  "act as if", "jailbreak", "DAN mode", role markers (`assistant:` / `user:`),
  pseudo-tags (`<system>`, `</instructions>`), or template delimiters (`{{`,
  `[[`).
- No hidden-character carriers: zero zero-width spaces, zero-width joiners, BOMs,
  soft hyphens, word joiners, bidi overrides, or Unicode tag-block characters.
- The `quote` fields — the only verbatim channel — are the three short passages
  reviewed above.

One thing worth noting because it looks like an anomaly and is not: the Finnish
quotation in `round2/claude.json` carries non-ASCII characters (`pyöräilivät`,
`keskimäärin`). Those are ordinary Finnish diacritics, correctly transcribed
against the archive, not an encoding smuggle.

## 5. Anything else unsuitable for a public repo — **nothing blocking**

Six advisory notes. None requires a redaction; each is something the founder
should decide about knowingly rather than discover after publication.

**5a. The artifacts name commercial models and assert one hallucinated
citations.** `round2/gemini.json` `round2_notes.errors_in_other_reviews[3]`:

> "Reviewer B (GPT) cited the Trondheim study (European Transport Research
> Review) and hallucinated highly specific quantitative findings (e.g., 9.6% and
> 24.3% reductions, and a precise sample size of 7,025 trips) that do not appear
> [in it]"

`round2/claude.json` and `round2/gpt.json` make similar findings in the other
direction, with the model named each time. This is the adversarial cross-review
the methodology exists to produce, and publishing it is arguably the point. It is
still a public, attributed, documented claim that a named vendor's product
fabricated citations. Nothing to redact — just be aware it ships.

**5b. One of those accusations is itself wrong, and this gate can now say so.**
`round2/gemini.json` `round2_notes.errors_in_other_reviews[1]`:

> "Reviewer A (Claude) cited the 'Active Travel Studies' paper for specific winter
> retention rates in Québec cities (Montréal 13.6%, Sherbrooke 9.09%, etc.), but
> those numbers do not appear in that source text."

They do. The source-verification audit read the archived bytes of YF-EV-0030 and
found all four figures verbatim in a single sentence pair. Gemini's accusation is
false, it names a competitor, and it currently ships uncorrected in the run
record. Nothing about it is unsafe, and the methodology's own logic says the
record should show what each reviewer actually said — but if any note is ever
added to a run directory, this is the one that earns it.

**5c. Unverified and known-bad citations ship as first-class evidence items.**
`combined-evidence.json` carries 19 items with no verification flag on any of
them. At least three are known-bad, per the reviewers' own round-2 notes and
`fetch-report.md`: the Daily Pedestrian and Bike Counts dataset page (failed),
the Urban Cycling Institute Oulu article (failed), and the Eco-Counter corporate
homepage, which `round2/claude.json` records as containing "no Montreal data, no
retention" figures at all. Someone reading `combined-evidence.json` on its own —
the most citation-shaped file in the set — would take all nineteen as real
sources. The caveats live in `fetch-report.md` and in round-2 prose.

*Suggested:* add a `verified: true|false` field per item, or a short README in the
run directory. `fetch-report.md` already does half this job and is well written;
it just is not attached to the items it describes.

**5d. `combined-evidence.json` has `evidence_id: null` on all 19 items.** No link
between the review record and the `YF-EV-*` registry the published claim actually
cites. Not a safety problem; a traceability gap that will make the published
methodology harder to follow back. This is the same finding as the electric-buses
run, so it is systemic rather than a slip.

**5e. Two figures survive in the record that the published story correctly
rejected.** `combined-evidence.json` `items` and `round2/gemini.json` carry a
"43% increase in October–March rider traffic 2022–2024" and a statement that
Edmonton clears "protected lanes to bare pavement within a day". The first is
sourced only to a councillor's advocacy summary; the second treats a service
standard as an achieved outcome, which `round2/gemini.json` itself flags as an
intention-versus-outcome error. Neither reached the story or the claim, and
neither has a registry entry — the pipeline worked. But both sit in
`round2/gemini.json`'s `suggested_short_answer`, which reads like a finished
answer and will be read as one.

**5f. `brief.md` ships marked PROVISIONAL.** Its header reads "drafted by the
orchestrator 2026-09-01; founder ratifies at the gate," and `../state.yaml` shows
`human_gate: {status: pending}`. Both are accurate as of this audit and become
stale the moment the founder approves. If the brief is committed as-is, the
PROVISIONAL banner should be updated in the same commit that flips the gate.

---

## Adjacent confirmation (not requested, but load-bearing here)

The personal information in this story's source material is in the evidence
archives, and it is correctly excluded from the commit:

```
$ git check-ignore -v evidence/private/YF-EV-0026-cycling-in-a-winter-wonderland
.gitignore:5:evidence/private/	evidence/private/YF-EV-0026-…
```

All six privately-held archives for this story (YF-EV-0023, 0025, 0026, 0027,
0028, 0031) sit under `evidence/private/` and are ignored. Only the registry
YAMLs are tracked, and they contain metadata, hashes, URLs and short excerpts —
no archived content, and no personal information in any excerpt.

**One thing to check before committing.** The two public archives for this story,
`evidence/files/YF-EV-0029-acs-25.pdf` and `evidence/files/YF-EV-0030-1384`, are
untracked and **not** covered by any `.gitignore` rule, so a `git add .` would
commit them. That is by design — the ingest comment in `.gitignore` says
`evidence/files/` is the public destination — and both are rights-cleared for it:
YF-EV-0029 is a U.S. federal work not subject to copyright (17 U.S.C. §105) and
YF-EV-0030 is CC BY 4.0. Redistributing them is fine. Just commit them
deliberately rather than by sweep, because `evidence/files/` is the one evidence
directory with no guard rail, and a future misfiled archive would land in a commit
silently.

---

## Verdict: **SAFE TO COMMIT**

No required redactions. Zero findings on personal information, filesystem paths,
copyright-scale quotation, and prompt injection — and the strongest result is the
negative one in §1: the reviewers extracted two statistics from a City page full
of named private individuals, including a child, and carried none of them
forward.

The six items in §5 are publication judgements for the founder, not safety
defects. The most substantive are §5b, where a false accusation against a named
vendor ships uncorrected, and §5c, where three citations the run itself knows are
bad are presented without a flag on the items themselves.
