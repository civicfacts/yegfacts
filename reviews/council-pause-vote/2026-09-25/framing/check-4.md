<!-- Framing check 4, the defect confirmation under methodology v1.20, on the brief corrected 2026-09-25 after check 3 (prompts/framing-check.md, methodology v1.40). Checker: the same seat and pinned model as check 3, OpenAI gpt-6-sol at high via `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, codex-cli 0.157.0, prompt on stdin, run from an empty scratch directory with no repository access, live web search enabled; the run log records model gpt-6-sol. Package: the framing prompt, intake.md, the corrected brief.md (sha256 54ab605ceb72258c31a3f2d7967f3dc326518170d8404bc4b02e375a5ac46daf), the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, a note naming the round, the diff between the brief check 3 read and the corrected brief, check-1.md, response-1.md, check-2.md, response-2.md, check-3.md and response-3.md, with no local paths (package sha256 e4af9b92b6413f84bb98fd8f877c5ba2aa8da7c75cb7fc93afde557d6e7db13d). Run 2026-09-25 by Stew, 19:03 to 19:07 UTC. Verdict: DEFECTS REMAIN; the check 3 correction RESOLVED, four further defects with exact replacement wording, no framing finding. Under v1.20 the editor applied each correction in the checker's wording (framing/response-4.md) and the brief froze; there is no fifth report. Report is verbatim; nothing below this line was edited. -->

Verdict: DEFECTS REMAIN

This is the **fourth and final report, a defect confirmation under methodology v1.20**. The editor applied report 3’s exact replacement to claim 2. That finding is **RESOLVED**: when Attachment 5 lists no routes for re-evaluation, the revised Partially supported row cannot apply. I found four further mechanical defects. I make no framing finding and do not reopen any cutoff or other framing choice. **DEFECTS REMAIN does not park the brief.**

### 1. Provenance — OK

No defect in this round.

### 2. Does the proposition test the post? — OK

No defect in this round.

### 3. Strongest fair reading — OK

No defect in this round.

### 4. Operationalization and alternatives — findings

- [defect] **Claim 1 can assign both Contradicted and Not established when the operative version cannot be read but adoption is documented.** The no-hold ladder says “**Contradicted** if the committee or City Council adopted R” and “**Not established** … if the operative version cannot be read.” The unreadable-version case needs priority over the hold/no-hold split only when adoption is *not* established. **Insert immediately before the two ladders:**

  > **Order of classification.** If the Infrastructure Committee or City Council adopted R by the as-of date, report Contradicted, whether or not the operative version can be read. Otherwise, if the operative version cannot be read and R’s treatment cannot be established, report Not established. In all other cases, apply the hold or no-hold ladder below.

- [defect] **Claim 2 still has an overlap and a gap outside the corrected Partially supported row.** “**Not established** if the report or the version selected … cannot be read” overlaps Contradicted when the readable document establishes a Contradicted condition—for example, a readable Attachment 5 lists no routes for re-evaluation while the report cannot be read. Conversely, if Recommendation 1 does not ask for approval of the approach, the readable report and attachment show some re-evaluation, and no Contradicted condition holds, no row applies. **Replace the Not established bullet with:**

  > **Not established** if none of the Supported, Partially supported or Contradicted conditions can be established. This includes an unreadable report or version selected under “The operative version” when the readable material establishes no Contradicted condition; an unresolved route status when it is the only obstacle to Supported; and a readable Recommendation 1 that does not ask for approval of the approach in Attachment 5 when no other row applies. Uncertainty about which version was before the committee does not by itself trigger this row: use Version 2 and report the other versions as required.

- [defect] **Claim 3 can assign both Partially supported and Not established.** “**Partially supported** if at least one jointly brought motion to reduce the programme was defeated” can be established from one meeting while other “relevant minutes cannot be obtained” or a budget amount is unavailable, triggering Not established too. **Replace the Not established bullet with:**

  > **Not established** if none of the Supported, Partially supported or Contradicted conditions can be established from the available record, including because relevant minutes cannot be obtained or a contemporaneous budget amount needed to classify a candidate motion cannot be established.

- [defect] **Claim 4 can assign both Contradicted and Not established when one term has no vote.** The brief says B is zero and the primary result is Not established in that case, but the ladder also says “**Contradicted** if V holds at least three votes and B is 3 or fewer.” Three votes in one term satisfy both rows. **Insert immediately before claim 4’s verdict ladder:**

  > **Order of classification.** For each vote set and bloc rule, apply its Not established conditions before its count bands. A count band applies only when none of those conditions holds. This order also applies under the alternative band set. The no-vote-in-one-term condition applies only to a bloc rule that requires a vote in both terms.

### 5. Expected-finding leak — OK

No defect in this round.

### 6. Checkability — OK

No defect in this round.

### 7. Scope traps — OK

No defect in this round.

### 8. Stakes — OK

No defect in this round.

### 9. Who asks this — OK

No defect in this round.

**Re-check:** Report 3’s sole standing finding is **RESOLVED**. Its replacement appears in claim 2 verbatim and removes the overlap it identified.

A holder would recognize the claims the brief proposes to test; an opponent would recognize its stated limits. Neither should be given a verdict from a ladder that can assign two words to the same record—or none. These four corrections address classification only, not what any City record shows. Under the stated final-round rule, the editor must record and apply each correction in the wording above; there is no fifth report.