<!-- Framing check 2 on the brief revised 2026-09-25 after check 1 (prompts/framing-check.md, methodology v1.40). Checker: OpenAI gpt-6-sol at high via `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, codex-cli 0.157.0, prompt on stdin, run from an empty scratch directory with no repository access, live web search enabled; the run log records model gpt-6-sol. Package: the framing prompt, intake.md, the revised brief.md (sha256 117e3d6e4dfc629527895635f181ac73f1310d723e07f9e00e67eded93488f77), the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, check-1.md and response-1.md, with no local paths (package sha256 56f1a80099e015bcf7fc7587625e8a2ac706cc7b1b7e53736144ff2c76b50d50). Run 2026-09-25 by Stew, 18:53 to 18:56 UTC. Verdict: REVISE, with one defect finding and framing findings on checks 2, 3, 4, 8 and 9; three check 1 findings marked WEAKENED. Report is verbatim; nothing below this line was edited. -->

Verdict: REVISE

This is **framing report 2 of 3**. The revision resolves most of report 1, but the primary tests for the pause and the “same seven” still do not fully test what the commenters asserted. Claim 2 also has a mechanical overlap in its verdict ladder. I have not assessed how any claim turns out.

### 1. Provenance — OK

The intake identifies the captured comments, their context and the incomplete-accessible-thread limit. The brief does not present the six commenters as representative of Edmonton. The circulating forms look representative of the *accessible captured thread*; the package cannot establish how widely those forms circulate elsewhere.

### 2. Does the proposition test the post? — finding

- [framing] **Claim 1 can decide a question about a hold without establishing that R was a hold.** The normalized proposition says the committee “rejected administration’s recommended hold,” but its ladder classifies adoption or rejection of **R**, and “Why this reading” says: “The proposition does not say what the recommendation was, whether it was a pause.” That sentence conflicts with the proposition and the resident’s question. Replace it with: “This claim tests the disposition of R **and** whether R proposed a hold under claim 2’s primary deferral definition. Reviewers establish that treatment from the operative Attachment 5 before describing any vote on R as a vote on a hold. If R did not propose a hold, the finding says what treatment was proposed and does not call rejection of R rejection of a hold.” Make the same condition explicit in claim 1’s verdict ladder and short answer. One verdict still carries the primary reading; the other body’s disposition remains a qualification.

The budget proposition now tests a named destination, and claim 2’s Supported rule now requires the counted routes to be unbuilt.

### 3. Strongest fair reading — finding

- [framing] **The “same seven” can still be seven people who never voted together.** The primary rule counts each member “at every vote in V held while they were a member”; someone who served only before the 2025 election can be counted with someone who served only after it. It also assesses a member after just two eligible votes. The intake’s “same old 7” asserts a continuing, fixed bloc, not a collection assembled across different councils. Replace the primary bloc rule with: “A member qualifies only if they served on Council before and after the October 2025 election, cast at least one vote in V in each term, and voted on the pro-programme side at every vote in V held while they served; an absence breaks the pattern. Count only members meeting all of those conditions in B.” Retain the current while-serving rule as a required alternative, along with the less-strict absence result. The named election results and minutes can support either calculation; this is a choice about the claim, not an unavailable-data threshold. [City election results](https://www.edmonton.ca/city_government/municipal_elections/election-history-and-results).

The express-deferral definition and the broader “brought” rule resolve report 1’s other strongest-reading objections.

### 4. Operationalization and alternatives — findings

- [defect] **Claim 2 can assign two verdicts to an unidentified operative version.** Its version rule says to use Version 2 as the declared primary when the minutes do not distinguish replacements. Its Not established row nevertheless applies when “the version before the committee cannot be identified.” The row can also overlap Partially supported when one route’s status is unresolved but a known count, treatment or built-route mismatch has already ruled out Supported. **Exact replacement for the Not established bullet:** “**Not established** if the report or the version selected under ‘The operative version’ cannot be read, or if an unresolved route status is the only obstacle to determining whether the Supported conditions hold. Uncertainty about which version was before the committee does not by itself trigger this row: use Version 2 and report the other versions as required.” This leaves the declared fallback operative and prevents an irrelevant unresolved status from overriding an otherwise determined classification.

- [framing] **The as-of rule conflates when a decision happened with when its minutes became public.** Quote: “A record retrieved after the as-of date may establish an as-of fact only if its content was public by that date; post-meeting minutes are dated by the meeting they record.” Those clauses give different answers for a pre-cutoff meeting whose minutes were posted later. Replace them with: “Decisions made by 2026-09-25 are in scope. Minutes published later may document those decisions, but not a later decision; reviewers state the meeting date and, where material, the minutes’ publication date.” The City says minutes are typically posted three business days after a meeting and remain draft until approved, so this distinction can matter near the cutoff. [City Clerk’s records FAQ](https://www.edmonton.ca/city_government/council_committee_meetings/council-committee-meetings-faq).

- [framing] **The blanket description of seconders is inaccurate for committee motions.** Quote: “The minutes record each motion and amendment put, its mover and seconder…” Replace with: “The minutes record motions, votes and results, including movers and, for Council motions, seconders where recorded. A standing-committee motion does not require a seconder.” The City’s Council Procedures Bylaw makes that distinction. [Council Procedures Bylaw, Part V](https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C18155.pdf).

The revised brief supplies the requested alternatives for body, version, status date, amount, vote participation and bloc size. I am not requesting alternatives to those alternatives. The City publishes the meeting-record system, the named 2025–2029 voting dataset, the election results and capital profile CM-20-0330. [Meeting records](https://www.edmonton.ca/city_government/council-committee-meetings), [voting dataset](https://data.edmonton.ca/City-Administration/2025-2029-Council-And-Committee-Meetings-Voting-Re/abcm-eai5), [capital budget](https://www.edmonton.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf). The specific August 2026 eScribe agenda, minutes and DocumentIds remained inaccessible through this lookup; I cannot independently confirm their mapping or publication dates. That limit is separate from the editor’s stated archived-byte verification.

### 5. Expected-finding leak — OK

I found no direction to reviewers about which factual result to reach. The ladder problems above concern what result a condition *means*, not a prediction that the condition holds.

### 6. Checkability — OK

Motions, recommendations, dates and recorded votes are factual questions the identified records can test. The brief separates them from policy preference, motive, coordination and corruption. It now tests whether a budget motion named a destination without judging whether that destination was a “core priority.”

### 7. Scope traps — OK

The override allegation is now reported separately and requires both a committee decision and a later incompatible Council decision. The brief does not infer an override from silence. Consultation, route commitments and councillors’ motives remain distinct questions.

### 8. Stakes — finding

- [framing] **Two stated consequences still outrun the primary rules.** Claim 1 says Supported would establish that Infrastructure Committee “rejected a hold”; until the hold condition in check 2 is added, it establishes only rejection of R. Claim 4 says Supported establishes “the same seven or more people on the programme’s side across the defined eligible votes,” although the present rule can assemble them from separate terms. After the changes above, use this replacement: “For claim 1, Supported establishes rejection of an administration-proposed hold by Infrastructure Committee, not a full Council rejection; Council’s action is stated separately. For claim 4, Supported establishes at least seven continuing members who voted on the programme’s side at every eligible vote while serving in both terms; the alternative results show how the finding changes if service in both terms is not required.” Then a Supported result would tell an opponent something contested, while Contradicted would require the holder to give up the asserted hold rejection or continuing seven-member pattern.

### 9. Who asks this — finding

- [framing] The brief states the resident’s question well: “administration told council to hit pause on the rest of the bike lanes; did council say no?” Its current claim 1 ladder can answer the measurable cousin—what happened to R—even if R was not a pause. Apply the check 2 replacement so the proposition and short answer answer the resident’s question. Where only Infrastructure Committee acted, keep that body’s name beside the verdict and report full Council’s disposition separately.

**Reaction from both sides.** A holder would see that the brief now takes the route count, lost budget motions and recorded voting pattern seriously, but could still object to a finding about R being presented as an answer about a pause. An opponent could accept the use of City records yet reject a “same seven” Supported label assembled from members who never served together. The proposed changes make both objections testable before the panel sees the evidence.

### Re-check of report 1

- **Check 2:** budget destination **RESOLVED**; “future”/unbuilt status **RESOLVED**; committee versus Council and the override strand **RESOLVED**.
- **Check 3:** freeze versus re-evaluation **RESOLVED**; “brought” versus mandatory co-sponsorship **RESOLVED**; fixed “same seven” **WEAKENED**—absences now break a member’s pattern, but the primary count can still join people from different terms.
- **Check 4:** primary body **RESOLVED**; operative-version fallback **RESOLVED** as a definition, though its ladder now conflicts with it; contemporaneous budget source **RESOLVED**; participation and assessability alternatives **RESOLVED**; bundled-vote classification **RESOLVED**; unclassifiable-vote completeness defect **RESOLVED**; claim 1 overlap defect **RESOLVED**; claim 3 gap defect **RESOLVED**; status-date, route-count, mayor and voting-dataset requests **RESOLVED**.
- **Checks 6 and 7:** budget destination and override scope **RESOLVED**.
- **Check 8:** **WEAKENED** by the remaining pause and cross-term bloc overclaims.
- **Check 9:** **WEAKENED**—the question now names the correct bodies, but the verdict can still substitute R for the proposed hold.