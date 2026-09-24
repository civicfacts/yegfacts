<!-- Plain-speech read 2 (stage 6, methodology v1.40), GPT-6 Sol at high via scripts/panel/audit-package.sh --provider openai, attempt 092c6d6a2faaae30. Drafting seat: Claude Opus 5.5. Run 2026-09-24 by Stew. It reads the TL;DR bullets and parked-claim lines rewritten after the rendered-page critique; plain-speech/gpt-1.md read the earlier wording.

Disposition: ten items. Two passed as written (the standfirst, TL;DR 2). Of eight rewrites, three adopted as written (the traffic-calming park line, TL;DR 3 in substance, the bike-infrastructure park line), four modified (TL;DR 1, 4 and 5, the lane-removal park line), and one refused (the answer).

The seat's scope note is right that it was not given the earlier wording. The old-to-new clause accounting is in plain-speech/gpt-1.md for the first rewrite and in critique-1.md's dispositions for the second, where every fact that left the TL;DR is named with the place it now sits.

TL;DR 1, modified: took "drivers … wait" for "delays", and kept "itself", which the gate required so the bullet cannot be read as denying that any before-and-after survey exists (the Hermitage Road evaluation reports speeds): "We found no study showing whether a bike lane itself made drivers on an Edmonton street wait more or less." TL;DR 3, adopted with the City named as the subject so "it" has a noun: "We found no record saying the City would have removed driving lanes to slow traffic even without bike lanes." TL;DR 4, modified: the seat is right that "at least four streets" counts 110 Street, which rests on a design and an inventory entry, not a record that the lane was removed. The street count is now three, computed in the calculation module from the corridors with a City record of the change (102 Avenue, 96 Street, 100 Street). The district fraction stays, because three of fifteen is the number the finding turns on, and dropping it would leave the bullet without the fact that answers "all over": "The City has taken driving lanes for bike lanes on at least three streets, in three of its fifteen districts." TL;DR 5, modified: adopted "The City's records do not show" and "all over Edmonton", and kept the traffic guard the critique required (R2), in plainer words: "The City's records do not show whether it has done so all over Edmonton, or what any of it did to traffic."

Park lines. Traffic calming and bike infrastructure adopted as written. Lane removal modified only by adding "by itself", for the same reason as TL;DR 1.

Refused: the answer rewrite. As with gpt-1.md, a single sentence opening "Nobody can tell from the records we found whether…" fails the stance rule in src/lib/plain-speech.ts, and the site's answers may run to two sentences when the first is the stance. The current answer keeps both clauses the seat accounts for.

The claim's plain_speech_read names one file, so it stays gpt-1.md; the article history names both reads. -->

# Plain-speech read — 2026-09-24

**Drafting seat:** Claude Opus 5.5, Anthropic  
**Reading seat:** Codex (GPT-6), OpenAI  
**Claim covered:** `lc-lanes-taken-citywide`, with the story standfirst, five TL;DR bullets and three parked-claim lines.

**Scope limit:** The workspace is empty and read-only. The first plain-speech report and earlier wording were not supplied, so I can account for every clause of the *current* wording but cannot certify what the earlier wording carried forward. This is not a completed publication read, and I could not save it under the run directory.

### lanes-and-congestion — standfirst

1. **Would a person say it?** Yes.
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** The story describes the checks behind this sentence. The published claim’s key facts concern lane conversions, not traffic effects.
4. **Has anything true been dropped?** Nothing from the current sentence; the earlier standfirst is unavailable.

Clause accounting:

- **Kept:** The records found cannot settle whether Edmonton bike lanes help or hurt traffic.
- **Earlier wording:** Unavailable, so its clauses cannot be accounted for.

**OK** for the current sentence.

### lanes-and-congestion — tldr 1

1. **Would a person say it?** No. People do not usually say delays became “better or worse.”
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** The story describes a check for a street-level study; the published claim’s key facts do not cover that check.
4. **Has anything true been dropped?** No current clause is lost; the earlier bullet is unavailable.

Clause accounting:

- **Kept:** No study found that isolates whether a bike lane changed delays on an Edmonton street.
- **Moved to the explanation:** What such a study would need to measure remains in “Why three of the claims have no answer.”
- **Earlier wording:** Unavailable.

**REWRITE**

> We found no study showing whether a bike lane made drivers on an Edmonton street wait longer or shorter.

### lanes-and-congestion — tldr 2

1. **Would a person say it?** Yes.
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** The story says the check found no Edmonton study joining fewer car trips to an effect on traffic. The published claim’s key facts do not cover this parked claim.
4. **Has anything true been dropped?** Nothing from the current bullet; the earlier bullet is unavailable.

Clause accounting:

- **Kept:** No study found that shows both a shift out of cars due to bike lanes and an easing of traffic.
- **Earlier wording:** Unavailable.

**OK** for the current sentence.

### lanes-and-congestion — tldr 3

1. **Would a person say it?** “Traffic calming” makes this sound like project language.
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** The story’s parked-claim explanation supports the limited statement about records found. The published claim’s key facts do not address it.
4. **Has anything true been dropped?** The money-saving part is in the parked line and “Why three of the claims have no answer”; the earlier bullet is unavailable.

Clause accounting:

- **Kept:** No City record found saying driving lanes would have been removed without bike lanes.
- **Moved to the explanation:** The proposed money-saving reason appears in “Why three of the claims have no answer.”
- **Earlier wording:** Unavailable.

**REWRITE**

> We found no City record saying it would have removed driving lanes to slow traffic even without bike lanes.

### lanes-and-congestion — tldr 4

1. **Would a person say it?** The district fraction reads like a report.
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** Three documented districts are carried. “At least four streets” is too firm: for 110 Street, the facts give a design and a built bike lane, but no completed-road drawing confirming the driving lane was removed as designed.
4. **Has anything true been dropped?** The district count stays. The four-street count must be removed because the supplied facts do not carry it without qualification.

Clause accounting:

- **Kept:** The City gave up driving space for bike lanes in three documented districts.
- **Moved to the explanation:** “Three of fifteen” remains in “What the record does show.”
- **Dropped:** “At least four streets,” because the supplied facts do not confirm the completed driving-lane change on 110 Street.
- **Earlier wording:** Unavailable.

**REWRITE**

> The City has taken driving lanes for bike lanes in at least three parts of Edmonton.

### lanes-and-congestion — tldr 5

1. **Would a person say it?** No. “That finding” sounds like the site talking about its process.
2. **Does it stand alone?** No. “It” and “that finding” depend on the previous bullet.
3. **Is it carried by the key facts?** Yes. The inventory cannot count former driving lanes, and the limitations say this claim does not measure congestion.
4. **Has anything true been dropped?** The traffic qualification remains in “What the record does show” and the claim limitations.

Clause accounting:

- **Kept:** The records do not show whether the City made these changes all over Edmonton.
- **Moved to the explanation:** The claim says nothing about traffic, stated at the start of “What the record does show.”
- **Earlier wording:** Unavailable.

**REWRITE**

> The City’s records do not show whether it has taken driving lanes for bike lanes all over Edmonton.

### lc-lanes-taken-citywide

1. **Would a person say it?** The wording is sayable, but it is two sentences where the answer must be one.
2. **Does it stand alone?** Yes.
3. **Is it carried by the key facts?** Yes. Some conversions are documented; the inventory cannot establish their citywide extent.
4. **Has anything true been dropped?** No current clause needs to be lost; the earlier answer is unavailable.

Clause accounting:

- **Kept:** The records cannot show whether the change happened all over the city.
- **Kept:** The City did take driving lanes for bike lanes on some streets, as the single supporting fact.
- **Earlier wording:** Unavailable.

**REWRITE**

> Nobody can tell from the records we found whether the City has taken driving lanes for bike lanes all over Edmonton, though it has on some streets.

### lanes-and-congestion — parked lane-removal-increases-congestion

1. **Would a person say it?** “Measured whether” is awkward, and “It comes back” sounds like internal shorthand.
2. **Does it stand alone?** No. The second sentence does not name what returns.
3. **Is it carried by the key facts?** The story describes the study it sought and says none was identified; no separate key facts were supplied for this parked claim.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Kept:** No study found tying a driving-lane conversion to changed travel times on an Edmonton street.
- **Kept:** The site would revisit the claim if that study were published.

**REWRITE**

> We found no study showing whether replacing a driving lane with a bike lane changed travel times on any Edmonton street. We’ll revisit this claim if one is published.

### lanes-and-congestion — parked bike-infra-reduces-congestion

1. **Would a person say it?** “Trips bike lanes took out of cars” is strained; “It comes back” is unclear.
2. **Does it stand alone?** The first sentence does, but the second does not.
3. **Is it carried by the key facts?** No. The story supports finding no study that **joins** changed car trips to changed traffic. “No study of … or …” reads as though no study exists on either part separately.
4. **Has anything true been dropped?** The separate absence claims must go because the supplied material does not carry them.

Clause accounting:

- **Kept:** No Edmonton study found linking a shift out of cars due to bike lanes with an easing of traffic across the city.
- **Kept:** The site would revisit the claim if such a study were published.
- **Dropped:** The implication that neither component has been studied separately; the supplied story establishes only that no study does both.

**REWRITE**

> We found no Edmonton study showing that bike lanes got people out of cars and, in turn, eased traffic across the city. We’ll revisit this claim if one is published.

### lanes-and-congestion — parked lanes-removed-for-traffic-calming

1. **Would a person say it?** No. “The lanes,” “the two,” and “It comes back” require a reader to fill in the nouns.
2. **Does it stand alone?** No.
3. **Is it carried by the key facts?** The story says the City records identified in the check say neither thing; no separate key facts were supplied for this parked claim.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Kept:** No City record found saying it would have removed driving lanes without bike lanes.
- **Kept:** No City record found saying it paired the work with bike lanes to save money.
- **Kept:** The site would revisit the claim if such a record appeared.

**REWRITE**

> We found no City record saying it would have removed driving lanes to slow traffic anyway or paired that work with bike lanes to save money. We’ll revisit this claim if such a record turns up.

**Closing:** 0 answers passed; 1 answer rewritten. Across the set, the four-street bullet exceeds its supplied facts, and several lines use shorthand a reader cannot understand alone. The earlier wording is missing, so the required old-to-new clause accounting remains open and this page cannot pass the read yet.