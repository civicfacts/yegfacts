<!-- Plain-speech read 1 (stage 6, methodology v1.39), GPT-6 Sol at high via scripts/panel/audit-package.sh --provider openai, attempt ccc18dde4c034c31; drafting seat Claude Opus 5.5; run 2026-09-24 by Stew.

Disposition: 7 of 9 rewrites adopted, 1 as written and 6 modified; 2 refused. Every modification keeps "Partly." as a sentence of its own, because the validator's stance rule (src/lib/plain-speech.ts, DESIGN.md s12) takes "Partly," followed by at most four words and a full stop, so "Partly, the City's ..." fails the build. No finding changed.

Adopted as written: tldr 4.

Modified: the roads answer (the reading's order taken, the replacement-cost measure moved to the end, stance kept separate). The shortfall answer (the reading's wording taken, "existing infrastructure" for "assets", the $1.5 billion moved down to the explanation and key facts where $1.52 billion and $1.63 billion already sit; stance kept separate). The eligibility answer: the reading's lead is taken, council approving all $100 million as borrowing repaid through taxes, but the vendor split stays in the answer, because methodology v1.37 requires a finding with a vendor split to name it beside the finding, and the reading's "council could have used" states the OpenAI seats' reading as the finding when the finding is Partially supported; the split and the Anthropic seat's access failure are carried in the claim's first two limitations and the story's panel-split section. The standfirst: the reading is right that it joined two findings without answering; it now turns on "but" and names the $100 million, and keeps the end-of-2024 date, because the brief binds every statement of the roads verdict to the inventory date and the reading's "during years when some Edmonton roads were in poor condition" asserts a condition across years the ratings do not describe. tldr 1: the ninth, the measure and the date stay, because moving them down would leave the ten-second layer with no road figure; the sentence is reordered to read as speech. The consequence the reading added under tldr 1, that the ratings cannot say what the roads were like when residents argued, is adopted as the new tldr 2. tldr 3: the reading's wording, with Council rather than the City as the body that approved it; the absence of a grant is in the explanation.

Refused: tldr 2's rewrite, "The City left its unpaved roads unrated", which is true and already in the explanation but is a detail of the class's make-up rather than a fact a resident needs at that layer; the bullet it would replace now carries the date consequence above, and the 70.8 per cent good share it held stays in the explanation's roads section. tldr 5's rewrite, the $430,000 transfer: the bullet it would replace is the only place in the top layer that says drainage, which is in the question's own wording, is not checked, and that council's choice is not judged; both are scope limits the brief requires the page not to imply, so they stay at the top, and the transfer stays in the explanation. -->

# YEGFacts plain-speech read

**Drafting seat:** Claude Opus 5.5, Anthropic  
**Reading seat:** GPT-6, OpenAI  
**Date:** 2026-09-24  
**Claims covered:** `infra-roads-condition`, `infra-bike-money-renewal-eligible`, `infra-hundred-million-vs-shortfall`

This is a first draft, so the accounting covers the current wording only. The workspace is empty and read-only. I could not commit this report under the run directory, and the `plain_speech_read` path in the claims does not yet name a file on disk.

### infra-roads-condition

**1. Would someone say it aloud?** No. “Partly” is a separate sentence, and the replacement-cost aside interrupts the answer.  
**2. Does it stand alone?** Yes. It names Edmonton, the City and the condition being measured.  
**3. Does each fact have support in the key facts?** Yes. The share, measure and date are all there.  
**4. Has anything true been dropped?** No, with the replacement below.

Clause accounting:

- **Kept:** “Partly”; the City’s latest rating; about a ninth rated poor or very poor; the end-of-2024 date; and the replacement-cost measure.

**REWRITE**

> Partly, the City’s latest ratings put about a ninth of Edmonton’s roads in poor or very poor condition at the end of 2024, counting them by what they would cost to replace.

### infra-bike-money-renewal-eligible

**1. Would someone say it aloud?** No. It explains the reviewers before answering what the City did.  
**2. Does it stand alone?** No. A reader needs the claim to know that the question is about road and alley renewal.  
**3. Does each fact have support in the key facts?** No. The funding source is there, but the reviewer split and file-access problem are in the review and limitations, not the key facts.  
**4. Has anything true been dropped?** No, with the moves below.

Clause accounting:

- **Kept:** “Partly”; all $100 million coming from borrowing repaid through taxes; and the conclusion that this source could have gone to road or alley renewal.
- **Moved to the explanation:** The split between reviewers and the two OpenAI reviewers’ reading are in “Where the $100 million came from, and how the panel split.”
- **Moved to the explanation:** The Anthropic reviewer’s inability to open the documents is in that same section and the claim’s limitations.

**REWRITE**

> Partly, the City approved all $100 million for bike lanes as borrowing repaid through taxes that council could have used for road or alley renewal.

### infra-hundred-million-vs-shortfall

**1. Would someone say it aloud?** No. It splits the stance from the answer and calls familiar infrastructure “assets.”  
**2. Does it stand alone?** No. “The $100 million” has no purpose until the reader sees the claim.  
**3. Does each fact have support in the key facts?** Yes. The City’s shortfall and the comparison are supported.  
**4. Has anything true been dropped?** No, with the move below.

Clause accounting:

- **Kept:** “Partly”; the $100 million bike-lane budget; its roughly one-fifteenth share; the City’s reported shortfall; and the 2023–2026 period.
- **Moved to the explanation:** The roughly $1.5 billion figure remains in “The money beside the shortfall.” The answer keeps the comparison without making the reader process both amounts.

**REWRITE**

> Partly, the City’s $100 million bike-lane budget was about a fifteenth of what it said it lacked for renewing its existing infrastructure from 2023 to 2026.

### infrastructure-deficit — standfirst

**1. Would someone say it aloud?** No. It joins two findings without first answering the question.  
**2. Does it stand alone?** No. “The bike-lane money” is vague without the title.  
**3. Does each fact have support in the key facts?** Yes. The road rating and renewal shortfall are supported.  
**4. Has anything true been dropped?** No, with the moves below.

Clause accounting:

- **Kept:** Some Edmonton roads were rated poor, and the City funded bike lanes.
- **Moved to the explanation:** The end-of-2024 date is in “What the City’s ratings say about the roads.”
- **Moved to tldr 4:** The bike-lane budget’s small share of the renewal shortfall. Its figures remain in “The money beside the shortfall.”

**REWRITE**

> Partly, the City funded bike lanes during years when some Edmonton roads were in poor condition.

### infrastructure-deficit — tldr 1

**1. Would someone say it aloud?** No. The date and measurement explanation make it read like a report.  
**2. Does it stand alone?** Yes. It identifies the City’s roads.  
**3. Does each fact have support in the key facts?** Yes.  
**4. Has anything true been dropped?** No, with the moves below.

Clause accounting:

- **Kept in the standfirst:** Some roads were rated poor or very poor.
- **Moved to the explanation:** The end-of-2024 date, roughly one-ninth share and replacement-cost measure are in “What the City’s ratings say about the roads.”
- **Kept in this bullet as a consequence:** Those ratings cannot describe conditions when residents made the argument.

**REWRITE**

> The City’s road ratings cannot tell us what the roads were like when residents argued about bike lanes.

### infrastructure-deficit — tldr 2

**1. Would someone say it aloud?** No. “Seven in ten dollars’ worth” makes the reader decode the measure.  
**2. Does it stand alone?** No. “Those roads” depends on the previous bullet.  
**3. Does each fact have support in the key facts?** Yes.  
**4. Has anything true been dropped?** No. The precise share and its measure remain in the explanation.

Clause accounting:

- **Moved to the explanation:** The 70.8 per cent good-or-very-good share and its replacement-value measure are in “What the City’s ratings say about the roads.”
- **Added from the key facts:** The City left unpaved roads unrated. That fact is also in the same explanation section.

**REWRITE**

> The City left its unpaved roads unrated.

### infrastructure-deficit — tldr 3

**1. Would someone say it aloud?** No. It packs the funding source, its definition and the absence of a grant into one sentence.  
**2. Does it stand alone?** Yes. It identifies the City, amount and purpose.  
**3. Does each fact have support in the key facts?** Yes. The profile lists one source for the full amount, and the key facts explain the borrowing.  
**4. Has anything true been dropped?** No, with the move below.

Clause accounting:

- **Kept:** The full $100 million was approved as borrowing repaid through taxes for bike lanes.
- **Moved to the explanation:** The profile’s lack of a grant is in “Where the $100 million came from, and how the panel split.”

**REWRITE**

> The City approved $100 million in borrowing for bike lanes, to be repaid through taxes.

### infrastructure-deficit — tldr 4

**1. Would someone say it aloud?** No. “The City’s own figure for renewal it could not pay for” is document language.  
**2. Does it stand alone?** No. “The same four years” has no referent in the bullet.  
**3. Does each fact have support in the key facts?** Yes.  
**4. Has anything true been dropped?** No, with the move below.

Clause accounting:

- **Kept:** The bike-lane budget was about a fifteenth of the City’s renewal shortfall.
- **Moved to the explanation:** The matching 2023–2026 periods and exact figures are in “The money beside the shortfall.”

**REWRITE**

> The bike-lane budget was about a fifteenth of the City’s shortfall for renewing its existing infrastructure.

### infrastructure-deficit — tldr 5

**1. Would someone say it aloud?** Yes, but it gives two limits on the page rather than one fact for a resident reading on.  
**2. Does it stand alone?** No. “The money” depends on earlier text.  
**3. Does each fact have support in the key facts?** These are statements about the page’s scope, confirmed by “What this page does not answer”; they are not evidence findings.  
**4. Has anything true been dropped?** No. Both limits remain in that section.

Clause accounting:

- **Moved to the explanation:** Drainage is not checked in “What this page does not answer.”
- **Moved to the explanation:** Whether council should have spent the money differently is also in that section.
- **Added from the key facts:** Council’s transfer from the bike program to neighbourhood and alley renewal is in “Where the $100 million came from, and how the panel split.”

**REWRITE**

> Council moved about $430,000 from the bike-lane budget into neighbourhood and alley renewal.

**Answers passed: 0. Answers rewritten: 3.** The whole answer set breaks the one-sentence stance rule; the story’s ten-second layer also carries dates, denominators or multiple clauses.