<!-- Framing check 2 on the brief revised 2026-10-02 after check 1 (prompts/framing-check.md, methodology v1.42). Checker: OpenAI gpt-6-sol at high via `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, codex-cli 0.159.3, prompt on stdin, run from an empty scratch directory with no repository access, live web search enabled; the run log records model gpt-6-sol. Package: the framing prompt, intake.md, the revised brief.md (sha256 023e63c673f3a4d754d1fd5c771c4d8b1cf4c0417a1894ccb978a37d3a4f63a6), the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, check-1.md and response-1.md, with no local paths (package sha256 6a1aeb162ec409e0ae1541f39f28e2e9dbb276977e88f64dda9c8dfa1be12c5c). Run 2026-10-02 by Stew, 07:47 to 07:50 UTC (the evening of 2026-10-01 in Edmonton). Verdict: REVISE, with one defect finding under check 4 and no framing finding; every check 1 finding RESOLVED except the ladder defect, marked WEAKENED. Report is verbatim; nothing below this line was edited. -->

Verdict: REVISE

The revision resolves the wording and scope objections from check 1. The verdict ladder still leaves one possible record state without a verdict.

### 1. Provenance — OK

The brief identifies the captured thread, preserves its wordings, discloses the capture gap, and does not treat one thread as representative of Edmonton-wide discussion.

### 2. Proposition versus post — OK

The brief now says plainly that the verdict tests the reported time change and queue size, not the claimed reason, the speakers’ views, or where they came from.

### 3. Strongest fair reading — OK

The proposition retains the five-to-three-minute change and an approximate-seventy queue. The 60–80 band and required 50–90 alternative test the reported magnitude without treating every larger queue as “about seventy.”

### 4. Operationalization — [defect]

The revised ladder says, “Apply Not established first when an essential source cannot be read or the available minutes do not establish the disposition of a recorded speaking-time motion.” It assigns no row if both sources are readable but the minutes are too incomplete to establish **either** that a reduction was carried **or** that none was carried. That record meets neither this Not established rule nor the Contradicted rule’s “sufficiently complete minutes” condition. The same sentence also conflicts with the brief’s instruction that an inaccessible essential source *stops the run* rather than producing a finding.

Replace **only the ladder’s first sentence** with:

> An inaccessible essential source stops the run and yields no reviewer verdict. With both essential sources readable, apply Not established when the standing limit cannot be determined, when the disposition of a recorded speaking-time motion is unknown, or when the minutes are too incomplete to establish either that a reduction was carried or that none was carried.

Keep the remaining ladder rules and required alternatives. This closes the unclassified case without changing the chosen count or band.

The other choices are adequately exposed. The item-specific approved-entry count is primary; meeting-wide and actually-spoke counts could change the row and are required qualifications. The wider magnitude band is also required. Counting distinct people instead of entries could change a meeting-wide count, but the redacted record cannot support matching people across lists; the brief now says so. The meeting date fixes the applicable rule, while later corrections to the minutes are checked separately. The [City’s bylaw](https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C18155.pdf) identifies section 38’s five-minute limit and the special-resolution rule. The revised boundary between provincial lobbying and municipal council activity accords with [Alberta’s published Act](https://www.ethicscommissioner.ab.ca/media/2991/lobbyists-act-chapter-l-205.pdf); the [City registry](https://data.edmonton.ca/Elected-Officials/Mayor-s-Lobbyist-Registry/3dkh-9hnu) is a separate dataset.

I again could not open the official meeting page through this lookup, so I did not independently verify the brief’s item-by-item account of its minutes. The inaccessible page is not evidence that the minutes are absent; the package identifies the site’s archived copy.

### 5. Expected finding — OK

The brief directs reviewers to records and calculations without stating the motion’s result, a speaker count, or a desired verdict.

### 6. Checkability — OK

The time limit and list size are factual. The brief identifies the claimed cause and fairness judgments as parts the verdict will not settle.

### 7. Scope — OK

The title now names the question being tested. The brief puts the unanswered speaker-balance and organizer questions up front and parks their claims with stated reopening conditions.

### 8. Stakes — OK, subject to check 4

Supported and Contradicted would change what the holder and opponent can say about a cut. Partial support preserves a split between the cut and queue claims. The stakes remain meaningful once every readable-record state has a row.

### 9. Who asks this — OK

The reader-facing question asks whether the committee cut speaking time and how many people were lined up. The proposition answers it at the level the identified minutes and bylaw can address, while naming what they cannot answer.

### Earlier findings

- **Check 2, excluded cause presented as queue size — RESOLVED.**
- **Check 3, one-sided “about seventy” rule — RESOLVED.**
- **Check 4, verdict-ladder gap — WEAKENED.** The documented shorter-limit examples now have a row, but incomplete readable minutes still do not.
- **Check 4, counts impossible after name redaction — RESOLVED.** The brief consistently requires entries and drops counts that need identity matching.
- **Check 4, Lobbyists Act boundary — RESOLVED.**
- **Check 7, title promising the parked claims — RESOLVED.**
- **Check 8, stakes outrunning the ladder — RESOLVED.**

A holder would recognize the reported cut and queue in the proposition, while seeing that their explanation for the cut remains unanswered. An opponent would get a consequential test of those two reported facts. Neither should receive a verdict from a ladder that leaves an incomplete but readable record unclassified.