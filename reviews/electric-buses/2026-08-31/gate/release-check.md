# Release check — review artifacts, electric-buses 2026-08-31

Gate stage 7, AI-automatable portion. Run date 2026-09-01.

**Scope.** Every file the founder would commit under
`reviews/electric-buses/2026-08-31/`, plus the state note that lives one level
up:

| File | Size |
|---|---|
| `brief.md` | 4,963 B |
| `run.yaml` | 1,956 B |
| `../state.yaml` | 522 B |
| `round1/claude.json` | 36,747 B |
| `round1/gemini.json` | 15,198 B |
| `round1/gpt.json` | 34,907 B |
| `round2/claude.json` | 55,349 B |
| `round2/gemini.json` | 19,079 B |
| `round2/gpt.json` | 41,105 B |
| `combined-evidence.json` | 47,806 B |
| `disagreements.json` | 612 B |
| `synthesis.json` | 10,532 B |

**Method.** The three text files were read in full. The nine JSON files were
walked leaf-by-leaf (2,279 string values total) and every value tested against
pattern sets for email addresses, phone numbers, absolute filesystem paths,
injection phrasing, and zero-width / bidi / tag-block Unicode. Every string of
300 characters or more, and every string containing a quotation mark, was read
individually (85 strings). All 10 `quote` fields — the only place verbatim
source text lands — were read and word-counted. Capitalized name bigrams were
extracted across all files and triaged by hand.

---

## 1. Personal information — **none found**

No email addresses, phone numbers, street addresses, postal codes, IP addresses,
account handles, or credentials appear in any of the twelve files. The regex
sweep for emails and North American phone formats returned zero matches across
all of them.

Exactly two natural persons are named, both public figures cited for statements
they made publicly in their official or professional capacity:

- **Councillor Andrew Knack** — `combined-evidence.json` `items[12].citations[0].finding`;
  also `round1/claude.json` `claims[0].supporting_evidence[2].finding` and
  `round2/claude.json` `claims[0].supporting_evidence[3].finding`. Quoted as
  *"Councillor Andrew Knack said the buses cost over $1 million each and were
  'not producing what everyone expected.'"* An elected official commenting on
  municipal spending. **No redaction.**
- **Steve Munro** — `combined-evidence.json` `items[22]` (`publisher`: *"Steve
  Munro (transit analyst)"*, plus his blog URL); referenced in
  `round2/claude.json` `round2_notes.evidence_i_missed[2]` as *"my Steve Munro
  availability data."* A named author cited as the publisher of his own public
  writing — the same status as "CBC News" or "Global News" in the same field.
  **No redaction.**

The union officials quoted in the underlying news archives (ATU 569's Bradshaw
and McCabe) did **not** propagate into the review artifacts; the reviewers
referred to them only as "Amalgamated Transit Union Local 569 representatives."
`brief.md` puts "named-individual blame" explicitly out of scope, and the
artifacts hold to it.

## 2. Local filesystem paths — **none found**

No `/Users/…`, `/home/…`, `/tmp/…`, `/private/…`, `/Volumes/…`, `~/…`, or
Windows-drive paths in any file. No usernames, hostnames, or environment
variables.

`run.yaml` does publish full CLI invocations, which is where a path leak would
normally hide. It doesn't leak:

```
command: 'claude -p --model claude-fable-5 --allowedTools "WebSearch,WebFetch" < package.md > out.json'
command: 'codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -c tools.web_search=true -s read-only --skip-git-repo-check - < package.md'
command: 'agy --effort high --sandbox --print-timeout 45m -p "$(cat package2.md)"'
```

Bare relative filenames (`package.md`, `package2.md`, `out.json`) with no
containing directory. `isolation: "scratch dir outside repo"` describes the
scratch location without naming it. No API keys, tokens, or auth material.

The only paths anywhere are repo-relative and intentional:
`prompts/reviewer.md`, `prompts/review-schema.json` (`run.yaml`) and
`scripts/calcs/electric-buses.ts` (`brief.md`). Those are public-repo paths that
point at public-repo files.

## 3. Copyright-scale quotation — **none found**

The artifacts contain exactly **10** verbatim `quote` fields, three distinct
passages repeated across files. Longest is **25 words**, against the 75-word
threshold:

| Words | Source | Location |
|---|---|---|
| 25 | TTC head-to-head evaluation (public-sector report) | `combined-evidence.json` `items[7].citations[1].quote`; `round1/claude.json`, `round2/claude.json` |
| 21 | The Epoch Times | `combined-evidence.json` `items[25].citations[0].quote`; `round1/claude.json`, `round2/claude.json` |
| 20 | Global News (Knack) | `combined-evidence.json` `items[12].citations[0].quote`; `round1/claude.json`, `round2/claude.json`, `round2/gemini.json` |

Everything else long in these files is reviewer-authored prose — analysis,
interpretation notes, and short answers — not reproduced source text. The
longest string in the whole set (1,087 characters, 156 words, in
`synthesis.json` `claims[0].disagreement_notes[3]`) is a reviewer's own
reasoning, quoted from another reviewer's JSON in the same commit.

No single source is quoted more than 25 words in aggregate. Registry entries
mark CBC, Global News, The Epoch Times and Sustainable Bus as
`redistribution: restricted`; at 20-25 attributed words apiece this is
comfortably inside fair dealing.

## 4. Prompt-injection artifacts — **none found**

The reviewers ran with live web tools (`WebSearch`/`WebFetch`, `read_url`,
`web_search`), so fetched page content had a path into these files. It did not
carry anything hostile through.

- No instruction-shaped text: zero matches for "ignore previous/prior/above
  instructions", "disregard", "system prompt", "you are now", "new
  instructions", "act as", "override", "jailbreak", role markers
  (`assistant:` / `user:`), pseudo-tags (`<system>`, `</instructions>`), or
  template delimiters (`{{`, `[[`).
- No hidden-character carriers: zero zero-width spaces, zero-width joiners,
  BOMs, soft hyphens, word joiners, or Unicode tag-block characters. The only
  character above U+2100 anywhere is `→` in `synthesis.json`, used in
  `"Supported → Partially supported"`.
- The `quote` fields — the only verbatim channel — are three short factual
  sentences, all reviewed above.

## 5. Anything else unsuitable for a public repo — **nothing blocking**

Five advisory notes. None requires a redaction; each is something the founder
should decide about knowingly rather than discover after publication.

**5a. The artifacts name a commercial model and assert its citations were
fabricated.** `round2/claude.json` `round2_notes.errors_in_other_reviews[0]`:

> "Reviewer B (gemini): every load-bearing citation fails verification. The CBC
> URL ending 1.7100000 and the St. Albert Gazette URL ending 7700000 have
> implausibly round article IDs and did not resolve…"

Entries [1] through [4] continue in the same register ("comparator
cherry-picking in the optimistic direction"; "silent currency assumption"). This
is exactly the adversarial cross-review the methodology exists to produce, and
publishing it is arguably the point. It is still a public, attributed,
documented claim that a named vendor's product produced non-resolving citations.
Nothing to redact — just be aware it ships.

**5b. Unverified and probably-fabricated URLs ship as first-class citations.**
`combined-evidence.json` carries 30 items with no verification flag on any of
them. At least five are known-bad, per the reviewers' own round-2 notes:
`items[6]` (`cbc.ca/…/edmonton-proterra-electric-buses-lawsuit-1.7100000`),
`items[20]` (`stalbertgazette.com/…-7700000`), `items[9]` (concordia.ca, 404),
`items[15]` (nrel.gov, fetch failed), `items[27]` (ttc.ca green-bus-program,
404). Someone reading `combined-evidence.json` on its own — the most
citation-shaped file in the set — would take all thirty as real sources. The
caveats live only in `round2/claude.json` and `round2/gpt.json` prose.
*Suggested:* add a `verified: true|false` field per item, or a short README in
the run directory saying which citations failed retrieval and why they were kept
in the record.

**5c. `combined-evidence.json` has `evidence_id: null` on all 30 items.** No
link between the review record and the `YF-EV-*` registry the published claims
actually cite. Not a safety problem; a traceability gap that will make the
published methodology harder to follow back.

**5d. Two entries record fetch attempts against a bot-blocking site.**
`round2/claude.json` `round2_notes.evidence_i_missed[4]` and
`claims[2].supporting_evidence[2].finding` note the St. Albert Gazette is
"bot-blocked (403)." Publishing that an automated fetch was attempted against a
site that refuses bots is a minor disclosure. Low concern, and the reviewer
handled it correctly by downgrading the findings rather than working around the
block.

**5e. `brief.md` ships marked PROVISIONAL.** Its header reads "drafted by the
orchestrator 2026-08-31; the founder ratifies these definitions at the stage-7
gate before publication," and `../state.yaml` shows `human_gate: {status:
pending}`. Both are accurate as of this audit and become stale the moment the
founder approves. If the brief is committed as-is, the PROVISIONAL banner should
be updated in the same commit that flips the gate.

---

## Adjacent confirmation (not requested, but load-bearing here)

The largest PII exposure in this repository is **not** in the review artifacts —
it is in the evidence archives, and it is correctly excluded.

`evidence/private/YF-EV-0002-2311120260504000000000001` is the Proterra Chapter
11 claims register: 72 pages, ~3,000 rows across claim numbers running to 1417,
naming creditors with full names and complete home addresses — including many
private individuals (former employees and retail shareholders across the US,
Canada and Germany). Publishing it would be a serious privacy incident.

Verified it cannot reach the commit:

```
$ git check-ignore -v evidence/private/YF-EV-0002-2311120260504000000000001
.gitignore:5:evidence/private/	evidence/private/YF-EV-0002-…
$ git ls-files evidence/
evidence/registry/.gitkeep
evidence/registry/YF-EV-0001.yaml … YF-EV-0012.yaml
```

Only the twelve registry YAMLs are tracked; `evidence/private/` and
`evidence/staging/` are both ignored and nothing under either is staged. The
registry YAMLs themselves contain only metadata, hashes and URLs — no archived
content, and `excerpts: []` on every entry.

Worth keeping in mind for any future change to `.gitignore`: this file is the
reason that rule exists.

---

## Verdict: **SAFE TO COMMIT**

No required redactions. Zero findings on personal information, filesystem paths,
copyright-scale quotation, and prompt injection. The five items in §5 are
publication judgements for the founder, not safety defects — the most
substantive being §5b, where the run record presents unretrievable citations
without flagging them as such.
