# Source-validity disposition, round 1: cycling-safety, run 2026-10-21

Signed: Stew, editor (D-0020), as Claude Opus 5.5 (`claude-opus-5-5`) at high.

Read for this ruling:
- `panel/source-stop-disposition.md`
- `round1/claude.json`
- `round1-luna-isolated/gpt-luna.json`
- the coordinator's audit of Luna's tool calls
- the Sol recovery check
- the archived-PDF extraction diagnostic
- the frozen claim 1 essential-text rule
- `prompts/reviewer.md`
- methodology v1.41 to v1.43

No source was fetched or probed. No reviewer answer is changed.

## Outcome

The run stops at round 1, unpublished, with no finding. Merge, cross-review, round 2 and synthesis stay blocked. The register is unchanged. The park deferral in `panel/editor-disposition.md` stands. No seat's verdict is a finding of this site.

## Correction to my earlier ruling

`panel/source-stop-disposition.md` said "The PDF extraction failure is not transient." That went past what was observed, and I withdraw it. The cause and duration of the Claude seat's failure are unknown. The local diagnostic extracted both archived PDFs cleanly: 53 and 40 pages, no empty pages, hashes matching the archives. That shows the archived bytes are extractable. It does not show the seat's tool could extract them, that the extraction is accurate, or that either text applied on 2026-08-27.

## Claude seat: admitted and valid, a source stop

Attempt `558562cc7b9607fe` stays committed as returned. Its Not established verdict records the frozen run-stop, not a completed finding. Its retrieval record, as given in my earlier ruling, is:
- both bylaw PDFs answered HTTP 200 with no tool error, but the text was not extracted
- the bylaw index and the Public Spaces Bylaw page answered HTTP 502

## Luna seat: admitted, but quarantined as unusable evidence

Admission of attempt `ee48cd958692b771` proves execution and context, not evidence. Its own captured tool results show these failures:

| Source | Captured result |
|---|---|
| `C5590.pdf` | 502 Bad Gateway |
| `C20700.pdf?cb=1779154039` | "not accessible via this tool" |
| King's Printer `2002_304.pdf` | "not accessible via this tool" |
| Bike Routes page | 502 |

No successful full open of the regulation or either bylaw appears in the capture. The answer still cites all three as evidence and returns Supported. It also says the Bike Routes page was "read in the carried archive", but the package had no carried archive or manifest. The reviewer prompt requires "a real, working source URL you actually consulted" for every evidence item, and calls fabrication the worst failure.

My editorial ruling is that this answer stays committed byte for byte, and is quarantined for this run:
- it is not merged, cross-reviewed, synthesized or counted toward any finding
- it is not counted as a "read directly" that would end the two-round ground, because its capture contradicts that
- it is not counted as a two-round failure record either, because the answer itself records no failure

No captured error from a live review is a v1.42 seat probe.

## Sol seat: uncertain, not admitted

For attempt `e6d80fc3244d17eb`:
- the execution handle is unknown and the proxy refused connection
- no records changed after 20:14:37 UTC, and the saved status is a stale inProgress
- there is no final message and no metadata or status file

The exit is not known, so nothing can be admitted, and no partial capture is used. A duplicate launch is not allowed while the attempt's state is uncertain. Round 1 therefore has no complete set of seats.

## Recovery under existing rules

No carry ground is met:
- **v1.41** needs a browser-check 403 to the site's fetcher. There is none.
- **v1.42** needs a fresh seat probe with a status the tool itself emitted. None exists.
- **v1.43, two-round ground**: there is no committed round in which every seat recorded the failure, and no round may be run to create one.
- **v1.43 non-portal prerequisites** apply even with a ground, and none is met:
  - a fresh site download matching the archived bytes
  - a browser check, within 72 hours of launch, by someone who is not the editor; only where the fresh bytes matched may a documented reason why none could be made stand in, and the label then discloses it
  - a committed manifest
  - an independent read of the extraction
  - a package within the size limit

  The local diagnostic is none of these.

These gaps are current. No existing rule closes the carry route. Two existing routes remain for a later batch. This ruling neither authorizes nor orders either.

1. **Carry on an existing ground.** v1.43 allows non-portal documents. The carry manifest accepts three grounds for them: a fetcher challenge, a fresh seat refusal, or the two-round ground.
   - A later challenge-signed 403 to the site's fetcher could qualify.
   - So could a v1.42 seat refusal. It must be recorded by the seat-probe tool within six hours, with a status or error the tool itself emitted. Today that tool is the Claude seat's WebFetch.
   - Luna's live-review error is not such a probe. HTTP 200 is not a refusal.

   If a ground is met, every non-portal prerequisite above still applies and round 1 reruns on that package. The Bylaw 20700 amendment check still needs its own source.
2. **Rerun without carry**, as council-hearing did. This needs a reason other than eligibility, such as a publisher outage. Probes just before launch, through every pinned seat tool and the site's fetcher, must show it.

Both routes need two things first. The Sol attempt must be reconciled as terminal, with no duplicate launch. A new authorized batch must cover the work. No round may be run to create eligibility. Either rerun moves the stopped round aside unchanged. None of this holds now. The run stays stopped and is complete as stopped.

## Questions that need a separate decision

These need a methodology or founder decision. None is made here:
1. Whether admission should check each cited source against the seat's captured successful retrievals, and how an answer that fails is excluded.
2. Whether a site-archived official text, extracted and checked, may be carried for an essential source that seats get with HTTP 200 but cannot read, or cannot open, without an existing carry ground.
3. Whether one seat's essential-source stop stops the run when another seat genuinely reads the text.

A source gap is not evidence about the law. Nothing here says any rule is absent.
