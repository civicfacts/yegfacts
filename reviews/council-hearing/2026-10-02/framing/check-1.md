<!-- Framing check 1 on the draft brief of 2026-10-02 (prompts/framing-check.md, methodology v1.42). Checker: OpenAI gpt-6-sol at high via `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, codex-cli 0.159.3, prompt on stdin, run from an empty scratch directory with no repository access, live web search enabled; the run log records model gpt-6-sol. Package: the framing prompt, intake.md (sha256 90102f9332a9a7fdf85a3bdc5846b64675621330ee2586a90a57b6b38cef5123), brief.md (sha256 66d0fd1e09621920631cca8fbf4dc16f151722f2e210b5497ca7e077ec9736e2), the verdict vocabulary from docs/DESIGN.md section 3 and prompts/review-schema.json, with no local paths (package sha256 539aff85ec2061161ea80fad646a406a7f1f6753a57ba5c881ab5e9fbfb7bf3f). Run 2026-10-02 by Stew, 07:38 to 07:42 UTC (the evening of 2026-10-01 in Edmonton). Verdict: REVISE, with one defect finding under check 4 and framing findings on checks 2, 3, 4, 7 and 8. Report is verbatim; nothing below this line was edited. -->

Verdict: REVISE

The brief has a checkable core, but it cannot be frozen yet. Its verdict ladder leaves possible outcomes unclassified, and its redacted panel record cannot support all the counts it requires.

### 1. Provenance — OK

The intake identifies the Facebook post, capture date, comment locations, verbatim wording and the unresolved gap between the platform’s displayed count and the accessible capture. The brief accurately limits representativeness to that one accessible thread; it does not present the forms as representative of Edmonton-wide discussion.

### 2. Proposition versus post — [framing]

The post asserts a change **because of a high volume of complaints from across the city**, as well as a five-to-three-minute change and a queue of seventy. The brief’s “Why this reading” says, “The holder’s ‘due to a high volume of complaints’ is read as the circumstance the holder offers, a long queue.” Queue size cannot establish why the motion was made, whether registrants had complaints, or where they lived. The brief isolates a factual part, but its assertion that the proposition is “not weaker” is wrong.

**Replace that assertion with:** “This proposition tests the reported change in speaking time and the reported queue size. It does not test the claimed reason for the change, whether registrants were complainants, or whether they came from across the city. Those parts of the comment remain unresolved by this verdict.”

### 3. Strongest fair reading — [framing]

The brief calls its magnitude rule “**About seventy**” but makes every count of 60 or more—including a count far above seventy—satisfy it. That tests a *large queue*, not the holder’s stated number. The [City minutes](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=55300824-2d70-4b6a-a504-df43ace1c6b4&lang=English) are the identified source from which reviewers would calculate either reading.

**Replace the magnitude wording with:** “For the reported figure of seventy, the primary band is 60–80 approved speakers on item 7.6; the required alternative band is 50–90. Reviewers report the count and the result under both bands. A count above a band still establishes a large queue, but does not establish that the reported figure was approximately seventy.” Carry the same distinction into the proposition, ladder and stakes.

### 4. Operationalization — [defect] and [framing]

**[defect] The verdict ladder has a gap.** It does not classify, for example, a documented reduction from five minutes to four, or from four minutes to three: neither is the specified five-to-three cut, but neither meets the current Contradicted rule of *no* shorter limit. A motion applying to only some approved speakers creates the same problem. This is a completeness error, independent of which magnitude band the editor chooses.

**Replace the ladder’s classification rules, retaining the chosen magnitude rule, with:**

> Apply Not established first when an essential source cannot be read or the available minutes do not establish the disposition of a recorded speaking-time motion. Supported requires a five-minute standing limit, a carried motion setting a three-minute maximum for every approved speaker at this meeting, and a primary count inside the chosen magnitude rule. Partially supported applies when a shorter per-speaker limit is established but the standing limit, new limit, coverage of speakers or queue count does not meet every Supported condition; report exactly which elements are established, including when the count cannot be calculated. Contradicted applies when the readable bylaw and sufficiently complete minutes establish that no motion reducing the per-speaker maximum below the standing limit was carried. Apply the same rules to each required alternative, reporting those results as qualifications to the one primary verdict.

**[framing] Some required calculations cannot be reproduced from the stated panel package.** The brief says every public name becomes the identical “[member of the public]” and also requires “distinct persons” across all meeting items and a count of approved speakers “not recorded as having presented.” Identical redactions do not let reviewers match a person across lists. Counting entries is a reasonable alternative to counting distinct people and can change N-all; it cannot silently stand in for the defined measure.

**Replace the redaction instruction with:** “Replace each public speaker’s name with a stable anonymous identifier, reused for that person across the Requests to Speak and presentation lists and across meeting items. Retain organizations. Reviewers may then count distinct people and match approved speakers to presentations without receiving public names.” If stable matching cannot be supplied, redefine the affected outputs as *entries*, say that distinct-person and non-presenter counts cannot be calculated, and report the effect on alternatives.

**[framing] Correct the statutory explanation used to park the lobbyist strand.** The brief says sections 3(1)(c) and (d) of Alberta’s Lobbyists Act exclude lobbying *of* municipal council. Those clauses exempt specified municipal people when **they act in their official capacity**; they do not define whom a registrant lobbies. The relevant boundary is the Act’s definitions of lobbying and “public office holder,” which concern provincial decision-makers. [Alberta’s published Act](https://www.ethicscommissioner.ab.ca/media/2991/lobbyists-act-chapter-l-205.pdf) supports that distinction.

**Replace the explanation with:** “Alberta’s Lobbyists Act defines registrable lobbying by reference to provincial public office holders and decisions, not lobbying of Edmonton City Council. Section 3(1)(c) and (d) separately exempts municipal officials acting in their official capacity. The City’s [Mayor’s Lobbyist Registry](https://data.edmonton.ca/Elected-Officials/Mayor-s-Lobbyist-Registry/3dkh-9hnu) is a different, historical instrument; neither identified registry is a per-speaker record for this hearing.”

The alternative item-wide and meeting-wide queues are reasonable and are assigned to qualifications, which the one-verdict schema can carry. The as-of date is appropriate for a claim about one meeting. The cited [Council Procedures Bylaw](https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C18155.pdf) exists and its section 38(1) provides a five-minute maximum; section 3 contains interpretation rules, so describe its committee provisions precisely. I could not retrieve the specific official minutes through this tool—the portal returned an access error—so I did not independently verify the brief’s item-by-item description. That access failure is not evidence that the minutes do not exist.

### 5. Expected finding — OK

The brief identifies where a reviewer should look without stating the motion’s result, the speaker count or a desired verdict. Keep that separation in the revision.

### 6. Checkability — OK, subject to check 2

The recorded limit and list size are factual questions. Fairness of a three-minute limit and whether concerns were “ignored” are not tested. The claimed *reason* is also outside this proposition, but must be acknowledged as an excluded part of the post, not converted into queue size.

### 7. Scope — [framing]

The title asks “Who showed up … and who organized them?” Both claims that would answer it are parked. The remaining verdict concerns speaking time and a queue. The brief explains the parks, but the headline still promises an answer it cannot give.

**Replace the title with:** “Did the committee cut speaking time at the bike-lane meeting, and how many people were approved to speak?” Introduce the two parked questions immediately beneath it as unanswered questions arising from the same thread.

### 8. Stakes — [framing]

“Supported would establish that the committee … cut **every approved speaker**” outruns the current ladder, which does not require reviewers to establish the motion’s coverage before awarding Supported. It also says Partially supported would “defeat the seventy” when the count might instead be unavailable, or—under an honest approximate-seventy band—higher than the band.

**Replace those passages with:** “Supported would establish the specified five-to-three-minute change for every approved speaker and a queue within the declared magnitude band; the opponent could no longer dismiss those two reported facts. Contradicted would establish that the committee made no reduction in the per-speaker maximum; the holder’s account of a cut would fail, though a long meeting or a short standing limit could still be argued. Partially supported would identify which part held and which failed or could not be counted. Not established would leave the motion or standing rule unresolved on the available record.” This gives each side a consequential result without treating an unavailable count as a smaller queue.

### 9. Who asks this — OK, subject to the title correction

The reader-facing question about whether the committee cut people to three minutes and how many were lined up matches the remaining proposition. The brief also plainly says that the record available to the panel cannot answer the separate questions about supporters and organizers. Use that reader question as the title.

A holder of the time-limit claim would recognize the cut and queue as the core of what they said, but would object to the brief treating their explanation—complaints from across the city—as though queue length tested it. An opponent would get a meaningful answer about whether a cut occurred, but the present ladder and “about seventy” rule could make the resulting verdict say more than the classified record warrants. Neither side should have to infer those limits from the qualifications.

