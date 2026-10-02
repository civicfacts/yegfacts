<!-- Critique confirmation, with a phone test at 375 by 812, the same Claude Opus 5.5 session as critique-1.md, on 4930e5c. Dispositioned 2026-10-02 by Stew. The report is committed as written except that the local folder holding the screenshots is replaced by "kept outside the repository"; the screenshots are not committed.

Disposition: R1 to R3 and S1 to S4 confirmed resolved. 1 new required change, corrected; 3 suggestions, 1 adopted (S-b), 1 not taken (S-a), 1 noted (S-c). No finding changed.

N1, corrected, in the gate's equivalent sentence (gate/confirmation.md N2), which the editor chose: "Its question went ahead, and this claim was set aside before the panel ran." It is true on all five pages, whatever happened to the other claims under each question.

S-a, not taken: the counts are of entries on the committee's list, not of people, and "listed speakers" would say people. S-b, adopted: the paragraph now links the minutes and says the nine are "by our own count, matching those names against the coalition's post". S-c, noted: the full register reason sits one layer down under its dated heading as the record, as the lanes-and-congestion dispositions accepted.

The first screen still answers both halves of the question in the phone test. The standfirst it read has since been bounded to the minutes by the gate's N1. -->

# Critique confirmation, council-hearing, 2026-10-02, the same critic session (Claude Opus 5.5), separate from the drafter, checkers and gate

I rebuilt worktree `draft-hearing` at 4930e5c and read the dispositions at
the top of `reviews/council-hearing/2026-10-02/critique-1.md`. I re-read:
- the question page;
- the hearing page's two parked claim pages and its finding page;
- lanes-and-congestion's three parked claim pages, which the shared-code
  change also touches;
- council-pause-vote's parked claim, to check for regressions.

**Bottom line.** R1, R2 and R3 are resolved. One new error came in with the
shared parked-claim code. On every claim page parked before research, the
site now says that the question's other claims "went ahead". That is false
on all five such pages, because each of those questions has another parked
claim. It is a one-line fix.

## 1. R1 to R3

| | Status | What the page now says |
|---|---|---|
| R1 | RESOLVED | The standfirst is "Nobody can tell which side Edmonton's bike-lane speakers took. Nine of 64 entries named groups that urged people to speak, and no record shows anyone was paid." It is also the whole share text, at 159 characters. The page no longer denies the link its own records show, and the payment absence is bounded ("no record shows"). The parked line is "We can't tell whether anyone paid Edmonton's bike-lane speakers, and the records tie only some of them to the groups that urged people to speak." It now agrees with the explanation, with TL;DR bullet 3 ("nine entries on the list gave its name or a group working with it, but no record shows who else answered") and with the full reason. |
| R2 | RESOLVED | TL;DR bullet 1 is "The committee did cut each speaker's time from five minutes to three, with 64 entries on its list to speak on the bike lanes and 52 recorded as speaking." |
| R3 | RESOLVED | Both hearing parked claims now use the plain parked line as description and og:description. The same holds for lanes-and-congestion's three parked claims: "We found no study showing whether replacing a driving lane with a bike lane, by itself, changed travel times on any Edmonton street."; "We found no Edmonton study showing that bike lanes got people out of cars and, in turn, eased traffic across the city."; "We found no City record saying it would have removed driving lanes to slow traffic anyway or paired that work with bike lanes to save money." |

S1 to S4 check out as described: the no-naming policy sentence, the parked
page heading "No finding" with the plain line first and the full reason one
layer down, the label's "failed to read it" with no semicolon, and the three
glosses. Council-pause-vote's vote-gate parked page is unchanged by this
code.

## 2. New issue in shared code

### N1 (required). "The other claims under that question went ahead" is false on every page parked before research

Quoted: on `/claims/more-speakers-in-favour-at-hearing`,
`/claims/hearing-supporters-and-lobby-groups`,
`/claims/lane-removal-increases-congestion`,
`/claims/bike-infra-reduces-congestion` and
`/claims/lanes-removed-for-traffic-calming`: "The other claims under that
question went ahead, and this one was set aside before they were checked."

Why it misleads: council-hearing set aside two of its three claims, and
lanes-and-congestion set aside three of its four. So on each of these five
pages, at least one of "the other claims" was also set aside and did not go
ahead. On lanes, a reader who opens one parked claim learns that the other
two congestion claims were checked, and they were not. The sentence comes
from `src/components/ClaimEntry.astro` line 292.

Exact fix: replace that string with "This claim was set aside before the
panel ran on that question." It is true for every claim parked before
research, whatever happened to its siblings. The page's next sentence, "The
question's page carries the reason, the grouping and the other claims made
about it.", stays.

### Suggestions (not blocking)

- **S-a. "Entries" in the standfirst.** A cold reader does not yet know
  that "entries" means lines on the list of approved speakers. If the
  160-character budget allows, drop "Edmonton's" and write "Nine of 64
  listed speakers named groups that urged people to speak". The page itself
  is careful to count entries rather than people, so this is a trade-off
  for the editor.
- **S-b. Label the count of nine as the site's own.** The count comes from
  matching group names on the committee's list against the coalition's
  newsletter. The explanation paragraph that gives it links only the
  newsletter, YF-EV-0315. Add the minutes link and "a count made here", in
  the same way as the vote-threshold calculation.
- **S-c. The full reason still uses method words.** On the lanes parked
  pages it still says "The fairness check found…", and on the hearing pages
  "the shape of the record" and "the claim the brief tests". It now sits one
  layer down under a dated heading as the record, which the lanes
  dispositions accepted. I note it only.

## 3. Phone test, first screen

I captured the page with Playwright headless Chromium at viewport 375 by
812, deviceScaleFactor 2, mobile and touch on, after removing the
pending-review banner from the DOM.
The screenshots (the first screen, and the TL;DR at y 812) are kept outside
the repository.

The title, the question and the whole standfirst are on the first screen.
Within ten seconds a cold reader can say: "they can't tell which side
people took. Some speakers came from groups that urged people to turn out,
and there's no sign anyone was paid." That answers both halves of the
question as asked. **Yes, the answer is clear.** The one stumble is
"entries" (S-a). The time-cut finding opens the TL;DR on the next screen.

CRITIQUE: FAIL

New required change:
- **N1.** In `src/components/ClaimEntry.astro` line 292, replace "The other claims under that question went ahead, and this one was set aside before they were checked." with "This claim was set aside before the panel ran on that question."
