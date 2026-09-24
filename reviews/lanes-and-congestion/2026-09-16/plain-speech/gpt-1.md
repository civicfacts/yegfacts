<!-- Plain-speech read 1 (stage 6, methodology v1.40), GPT-6 Sol at high via scripts/panel/audit-package.sh --provider openai, attempt 744a8b029088f148. Drafting seat: Claude Opus 5.5. Run 2026-09-24 by Stew.

Disposition: seven rewrites (the answer, the standfirst and five TL;DR bullets). Two adopted as written, five adopted with modifications, none refused outright. One element is refused across three of them, stated below. The seat's opening note is about its read-only workspace; the editor commits the report and the claim names it.

Adopted as written: TL;DR 4 ("The City of Edmonton removed a driving lane on part of 102 Avenue to make room for a bike lane.") and TL;DR 5 ("Edmonton's bike route list does not say what road space each bike lane replaced."). The clauses they move down stay on the page: the other documented streets and Oliver are in "What the record does show", and the old fifth bullet's point that the conversions say nothing about traffic is in the standfirst and in that section's opening ("The finding on it does not measure congestion").

Modified, the answer. The rewrite is one sentence that opens "Nobody can tell from the records we found whether…", which fails the stance rule in src/lib/plain-speech.ts (the opener must reach a full stop within four words of "Nobody can tell"). Kept its content and its standalone fixes, Edmonton named and "all over" in the commenters' sense, as two sentences, with "we found" carried by the second: "Nobody can tell from the records. Edmonton did take driving lanes for bike lanes on some streets, but the records we found cannot show whether it happened all over the city."

Modified, the standfirst and TL;DR 1 and 2. Adopted the answer-first opening, "help or hurt", and the plainer wording of both bullets. Refused the narrowing to "the City records on this page". The absence those three sentences state is the framing check's, dated 2026-09-23, committed at framing/check-3.md and linked from "Why three of the claims are parked", which is where the explanation proves it. Narrowing it to the page's own sources would make the ten-second layer say something weaker than the record and would imply only the cited documents were looked at, when the point v1.35 requires the top layer to lead with is that no answering study was identified. So they say "the records we could find" and "we found no study": the standfirst is "Nobody can tell from the records we could find whether Edmonton's bike lanes help or hurt traffic."; TL;DR 1 is "We found no study showing whether traffic on an Edmonton street slowed or sped up after it got a bike lane." ("slowed or sped up" so the bullet cuts both ways, as the parked claims do); TL;DR 2 is "We found no study showing whether Edmonton's bike lanes got people out of cars and eased traffic."

Modified, TL;DR 3. The rewrite's "The City of Edmonton's records" claims all of them; bounded to "The City records we found", keeping the rest: "The City records we found do not say whether Edmonton would have removed driving lanes for traffic calming without bike lanes." -->

I read the draft supplied in the prompt. The referenced files and run directory are absent from this read-only workspace, so I could not commit the report or verify the `plain_speech_read` path on disk.

# Plain-speech read

**Drafting seat:** Claude Opus 5.5, Anthropic  
**Reading seat:** GPT-6, OpenAI  
**Date:** 2026-09-24  
**Claim covered:** `lc-lanes-taken-citywide`  
**Previous wording:** None; this is a first draft.

### lc-lanes-taken-citywide

1. **Would a person say it?** The two-sentence answer reads like a summary of the finding.
2. **Does it stand alone?** No. “The City” and “the record” lack context without the claim.
3. **Are its facts carried by the key facts?** Yes. The documented conversions and unknown citywide total are supported.
4. **Was anything true lost?** No. Both substantive points are accounted for below.

Clause accounting:

- **Kept:** Nobody can tell from the records found whether the conversions happened all over Edmonton.
- **Kept:** The City did take driving lanes for bike lanes on some streets.
- **Moved to the explanation:** The meaning of “most of the city,” including the district thresholds, is set out in “Why that does not settle all throughout the city.”

**REWRITE**

> Nobody can tell from the records we found whether the City took driving lanes for bike lanes all over Edmonton, though it did on some streets.

### lanes-and-congestion — standfirst

1. **Would a person say it?** The wording is understandable, but it leads with “published records” instead of the answer.
2. **Does it stand alone?** Yes; it names Edmonton and the traffic question.
3. **Are its facts carried by the key facts?** Not at its current breadth. The supplied key facts show that the City records here do not measure traffic effects; they do not document the wider search for published studies described in the story.
4. **Was anything true lost?** The wider search claim remains in “Why three of the claims are parked,” where the story links the framing check.

Clause accounting:

- **Kept:** These records cannot tell whether bike lanes help or hurt Edmonton traffic.
- **Moved to the explanation:** The broader claim about published records the site could find belongs in “Why three of the claims are parked.” It is not carried by the supplied key facts.

**REWRITE**

> Nobody can tell from the City records on this page whether Edmonton’s bike lanes help or hurt traffic.

### lanes-and-congestion — tldr 1

1. **Would a person say it?** “Blame, or credit, the bike lane” makes this sound written for a report.
2. **Does it stand alone?** Yes, though “a lane conversion” takes effort to picture.
3. **Are its facts carried by the key facts?** No. The supplied key facts do not establish the absence of a published study. The story attributes that claim to its framing check.
4. **Was anything true lost?** The study design and wider search claim remain in “Why three of the claims are parked.”

Clause accounting:

- **Moved to the explanation:** No suitable published study was found; see “Why three of the claims are parked,” in the paragraph about traffic on a converted street.
- **Moved to the explanation:** The need for before-and-after travel times and for separating the bike lane’s effect from other changes is in that same paragraph.
- **Kept in narrower form:** The records supplied here do not show whether traffic slowed after a street got a bike lane.

**REWRITE**

> The City records on this page do not show whether Edmonton traffic slowed after a street got a bike lane.

### lanes-and-congestion — tldr 2

1. **Would a person say it?** It is close, but “links people switching” sounds like study language.
2. **Does it stand alone?** Yes; it names Edmonton and the proposed traffic effect.
3. **Are its facts carried by the key facts?** No. The supplied key facts do not establish the absence of an Edmonton study joining these measures.
4. **Was anything true lost?** The broader absence claim and its two required measures remain in “Why three of the claims are parked.”

Clause accounting:

- **Moved to the explanation:** No Edmonton study was identified that joins a shift from cars to bikes to citywide delay; see the paragraph about the opposite congestion claim in “Why three of the claims are parked.”
- **Kept in narrower form:** The records supplied here do not show whether bike lanes got people out of cars and eased traffic.

**REWRITE**

> The City records on this page do not show whether Edmonton’s bike lanes got people out of cars and eased traffic.

### lanes-and-congestion — tldr 3

1. **Would a person say it?** “Whether a lane would have gone” is awkward aloud.
2. **Does it stand alone?** No. “The City” is unidentified without the page.
3. **Are its facts carried by the key facts?** Only in narrower form. The supplied conversion records do not answer this question, but the Hermitage Road material discussed in the story has no supplied key fact.
4. **Was anything true lost?** The traffic-calming explanation and the Hermitage Road example remain in “Why three of the claims are parked.”

Clause accounting:

- **Kept in narrower form:** The supplied City records do not say whether driving lanes would have been removed for traffic calming without bike lanes.
- **Moved to the explanation:** The scope of the records checked, including Hermitage Road, remains in “Why three of the claims are parked.”

**REWRITE**

> The City of Edmonton’s records do not say whether it would have removed driving lanes for traffic calming without bike lanes.

### lanes-and-congestion — tldr 4

1. **Would a person say it?** “What the records do show” is a report opening.
2. **Does it stand alone?** The 102 Avenue example helps, but “the City” needs Edmonton named.
3. **Are its facts carried by the key facts?** Yes. The 102 Avenue fact sheet and route guide support the completed change.
4. **Was anything true lost?** The wider set of streets and Oliver’s location remain in “What the record does show.”

Clause accounting:

- **Kept:** The City removed driving space for a bike lane on 102 Avenue.
- **Moved to the explanation:** Other documented streets and the Oliver location remain in “What the record does show.”

**REWRITE**

> The City of Edmonton removed a driving lane on part of 102 Avenue to make room for a bike lane.

### lanes-and-congestion — tldr 5

1. **Would a person say it?** Yes, but “those conversions” needs an earlier sentence and the point repeats the standfirst.
2. **Does it stand alone?** No. “Those conversions” has no antecedent on its own.
3. **Are its facts carried by the key facts?** Yes. The records describe built routes, while the finding’s limitation says it does not measure congestion.
4. **Was anything true lost?** Both points remain in the standfirst or explanation; the replacement adds a distinct fact from the bike route inventory.

Clause accounting:

- **Moved to the explanation:** What the City built is described in “What the record does show.”
- **Kept in the standfirst:** The supplied records cannot tell whether bike lanes help or hurt traffic; “What the record does show” also states this limit.
- **Added from a key fact:** The bike route inventory does not record what space each lane replaced.

**REWRITE**

> Edmonton’s bike route list does not say what road space each bike lane replaced.

**Closing count:** 0 answers passed and 1 answer rewritten. The standfirst and all 5 TL;DR bullets need rewriting. Across the set, the ten-second layer reaches beyond the supplied key facts when it states the wider search found no suitable studies.