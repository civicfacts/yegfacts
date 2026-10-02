<!-- Critique of the rendered page 1, with the phone test at 375 by 812 (D-0048 rule 7, the first story under the two-round ground), a Claude Opus 5.5 session separate from the drafter, the checkers and the gate, on 75dc267. Dispositioned 2026-10-02 by Stew. The report is committed as written except that the local folder holding the screenshots is replaced by "kept outside the repository"; the screenshots are not committed.

Disposition: 3 required changes, all made (R1 in the editor's wording); 6 suggestions, 4 adopted (S1 to S4) and 2 not taken (S5, S6). No finding changed. To keep the page's duplication audit clean after R2, the claim's answer now reads "when 64 entries were listed to speak on the bike lanes" where it said "with 64 entries on its list to speak on the bike lanes".

R1, made in the editor's wording rather than the critique's, to fit the gate's B1 finding: the standfirst is "Nobody can tell which side Edmonton's bike-lane speakers took. Nine of 64 entries named groups that urged people to speak, and no record shows anyone was paid." At 159 characters it is the share text whole, under the 160-character cut the site applies to descriptions. The parked line is the gate's fix 4, "We can't tell whether anyone paid Edmonton's bike-lane speakers, and the records tie only some of them to the groups that urged people to speak. We'll revisit this claim if a record turns up that settles it."

R2, made: TL;DR 1 is "The committee did cut each speaker's time from five minutes to three, with 64 entries on its list to speak on the bike lanes and 52 recorded as speaking." Bullet 5 stays.

R3, made in shared code: a claim parked at framing now gets the story's plain parked line as its share description, by the same route as the vote-gate park (src/pages/claims/[id].astro), wherever the question's story has a line for it. It applies to every framing park with such a line, including lanes-and-congestion's three.

S1, adopted: "This site does not name members of the public who spoke. It counts entries on the City's lists, and the reviewers read a copy with those names removed." S2, adopted in shared code (src/components/ClaimEntry.astro): on a framing-parked claim with a story line, the heading is "No finding", the line opens the section in place of the method sentence, the question's "Going ahead" badge and "each claim still gets its own finding" are gone, and the register's full reason follows one layer down under "The full reason, as recorded when it was set aside". S3, adopted: the two-round label says "failed to read it" and the semicolon is now a full stop (src/lib/carried.ts, with its test). S4, adopted where cheap: "consolidation" becomes "the City's up-to-date copy of October 2025", "in five panels" becomes "in five groups called panels", and the changelog no longer says "at framing".

Not taken. S5: the register's lifecycle moves at publication, as it did for council-pause-vote. S6: the double hairline is the site-wide layout pattern noted as S9 on council-pause-vote, not this page's, and is left to a layout change. -->

# Rendered-page critique, 2026-10-02, a Claude (Opus 5.5) session separate from the drafter, checkers and gate

Pages read: `dist/questions/council-hearing.html`, built with `npm run build`
on worktree `draft-hearing` at head 75dc267. Also every claim page it links:
`ch-speaking-time-cut`, the two parked claims
(`more-speakers-in-favour-at-hearing` and
`hearing-supporters-and-lobby-groups`), and the register page behind the
finding (`speaking-time-cut-to-three-minutes`). Evidence pages YF-EV-0251 and
YF-EV-0209. I read them against DESIGN.md §12 (plain speech, "The layers")
and §10, in the same form as the council-pause-vote critique.

**Bottom line.** This page is more careful than the last one. It never lets
the one Supported finding stand in for an answer to "who organized them".
The bylaw label does exactly what it should. Three things need fixing:
- **The standfirst and the second parked line contradict the page.** They
  say nothing shows who organized the speakers. The page itself reports a
  bike group urging supporters to sign up and a second group running a
  session to help them prepare. A reader against the lanes will quote one
  against the other.
- **The TL;DR never states the finding.** A resident who reads the top
  layers learns everything the records cannot show, and never learns that
  the committee did cut speaking time from five minutes to three.
- **Both parked claims' share cards read "We could not answer this before
  any research ran."** Lanes R7 removed that sentence from the page because
  it reads as the site declining to look.

Three changes are required.

Checked and passing:
- **Links.** All 376 internal links and in-page anchors on the seven pages
  resolve. No page has duplicate ids. The GitHub links to the item index and
  the selection rule both point at files on `origin/main`.
- **Page order.** Title, question, standfirst, TL;DR, the parked block, then
  the finding with the label "What the record could check. It does not
  answer the claims set aside above.", then the provenance line. This follows
  D-0039 and the v1.35 rule that parked claims lead.
- **The finding does not answer "who organized them".** Its question, answer
  and key facts are about the time limit and the size of the list. TL;DR
  bullet 4 says outright that a group's name "shows neither their side nor
  whether anyone organized them". The explanation says "Calling a group a
  special interest is a judgement this site does not make."
- **Both sides' parked claims are shown.** The block says they "come from
  both sides of the argument". The explanation ends its parked section with
  the same point.
- **Counts agree.** Eleven people: 1 + 4 + 5 + 1. Twelve comments: 5 + 6 +
  1. The lists: 64 entries in panels of 15, 15, 15, 15 and 4; 52 in panels
  of 16, 16, 18 and 2; 79 across the meeting; 15 and 12 entries naming a
  group. The vote: 6 to 0 against a two-thirds threshold of 4.
- **The finding states its count caveat.** "Yes ... though the 52 recorded
  as speaking fall short of about seventy". Limitation 1 says that on the
  52 and the stricter range the finding would be Partially supported. The
  reason the comment gave for the cut is marked "not checked". The reader is
  told the City's video was not watched. The two early-2026 Council meetings
  are bounded with "Other meetings were not searched".
- **Absence is bounded throughout.** "We found no public record showing
  that anyone was paid" and "no record could show that nobody did". The
  lobbyist registries are described by their scope and end date.
- **Members of the public are not named.** No member of the public is named
  on any of the pages read. The commenters appear under pseudonyms, with a
  caption saying so.
- **No horizontal scroll at 375px.**

## 1. Ten-second test

The title, question and standfirst read: "What the records show about
Edmonton's August 2026 bike-lane hearing" / "Who showed up to speak on the
bike lanes at council, and who organized them?" / "Nobody can tell from the
City's minutes which side Edmonton's bike-lane speakers took, or who, if
anyone, organized them."

A resident can say back what is *not* answered: which side, and who
organized them. They cannot say what *is* answered. The time-limit finding
first appears on the third phone screen. The TL;DR points at it only
sideways, in "gave no reason in its minutes for cutting speakers' time"
(R2). They also get a slightly wrong idea from "who, if anyone, organized
them". On the same page, groups did ask people to come (R1).

## Required (misleads)

### R1. The standfirst and the second parked line say no record shows any organizing, but the page reports some

Quoted:
- Standfirst: "Nobody can tell from the City's minutes which side Edmonton's
  bike-lane speakers took, or who, if anyone, organized them."
- Parked line: "We can't tell whether anyone organized or paid Edmonton's
  bike-lane speakers, because we found no record establishing either."
- The explanation, for contrast: "the YEG Bike Coalition urged its readers
  to register to speak on the item against administration's proposal, and
  said Paths for People would run an online session to help people prepare.
  That shows groups encouraging supporters to speak."

Why it misleads:
- **The parked line.** In plain English, urging supporters to sign up and
  running a session to prepare them is organizing. The page has that
  record, so "we found no record establishing either" is not true as worded.
  What no record shows is *which* speakers answered the call, and whether
  anyone was paid. A reader on the anti-lane side will set this line beside
  the coalition paragraph and conclude the site is covering for one side.
- **The standfirst.** "If anyone" suggests possibly nobody organized
  anything. "From the City's minutes" is also too narrow: the organizing
  half was searched well beyond the minutes, in registries, a newsletter
  and news reports.

Exact fixes:
- Standfirst: "Nobody can tell from the records which side Edmonton's bike-lane speakers took, or whether any of them came because a group asked."
- Parked line for `hearing-supporters-and-lobby-groups`: "A bike group urged its supporters to sign up to speak, but no record shows which speakers answered, and none shows anyone was paid. We'll revisit this claim if one turns up."

### R2. The TL;DR never says what the record does show

Quoted, TL;DR bullet 1: "Edmonton's Infrastructure Committee kept one
list of people approved to speak on the bike lanes and another of those who
spoke." Bullet 5: "Edmonton's Infrastructure Committee gave no reason in its
minutes for cutting speakers' time to three minutes."

Why it misleads: the brief asks whether a resident understands what is
answered. The page's one finding is Supported, and it appears nowhere in
the top two layers. Bullet 1 carries no fact a person would repeat. Bullet
5 assumes the cut without saying it happened. So a ten-second reader leaves
thinking "they couldn't tell anything". The TL;DR is meant to carry the
facts the standfirst does not (§12, "The layers").

Exact fix: replace bullet 1 with "The committee did cut each speaker's time from five minutes to three, with 64 entries on its list to speak on the bike lanes and 52 recorded as speaking." Bullet 5 stays as it is.

### R3. Both parked claims' share cards say only "We could not answer this before any research ran"

Quoted, the description of `/claims/more-speakers-in-favour-at-hearing`:
"We could not answer this before any research ran." The description of
`/claims/hearing-supporters-and-lobby-groups`: "We could not answer this
before any research ran, and nothing found since changes that."

Why it misleads: these are the cards that show when someone shares the
claim into the Facebook argument. Lanes R7 removed this sentence from the
page because it reads as the site declining to look, and it gives no
reason. The council-pause-vote fix (its R5) made the plain parked line the
share description for a claim set aside at a vote gate. Claims set aside
before research did not get the same treatment.

Exact fix: use the story's `parked` line as the description for every
parked claim page, framing parks included, by the same route as the
vote-gate park. The resulting cards:
- `more-speakers-in-favour-at-hearing`: "We can't tell whether more people spoke for Edmonton's bike lanes than against them, because the committee's minutes don't record which side speakers took."
- `hearing-supporters-and-lobby-groups`: the R1 line above.

## Suggested

### S1. Say the policy, not just its effect on the counts

The page explains that "Our copy withholds the names of members of the
public, so these are counts of lines". That gives the effect. It does not
say this site never names members of the public. It also leaves a
researcher asking why the site did not match people before removing their
names. Suggested, in "What the record does show": "This site does not name
members of the public who spoke. It counts entries on the City's lists, and
the reviewers read a copy with those names removed."

### S2. The parked claim pages: "No finding yet", "Going ahead", and method language

Both pages head the section "No finding yet". They show "The question
around it: Going ahead" and say that "each claim still gets its own
finding". The full reason the site gives is in method language ("the only
verdict available was Not established, decided by the shape of the record",
"the panel's tools", "the claim the brief tests"). The full reason belongs
on that page, one layer down. The site's own opening sentence there should
be the plain parked line, as council-pause-vote S-b did for the vote-gate
park.

### S3. Bylaw label: "retrieve", and a semicolon

The label says the tools "failed to retrieve it in two rounds in a row".
The explanation says one reviewer's tool "did download the file, but could
not read its text". "Failed to read it" is accurate for all three. The
label also uses a semicolon. Suggested: "The AI reviewers read our archived
copy because their research tools failed to read it in two rounds in a row.
That was their tools failing. It does not mean the document is unavailable
to you." The rest stays.

### S4. Glosses

- "consolidation": try "the City's up-to-date copy of October 2025".
- "in five panels": the panels are never explained. Try "in five groups
  called panels".
- "set aside at framing", in the article history: framing is a method word.

### S5. The register lifecycle is stale

"How it was registered" shows "How far the work has got: Briefed".
`intake/register.yaml` has `lifecycle: briefed` for council-hearing. The
panel has run, so it should read "Panel complete", as on council-pause-vote.

### S6. Double hairline

Between the parked block and the finding row there are two hairlines with
an empty band between them (phone-03). It is the same site-wide pattern
noted as S9 on council-pause-vote.

## Answers to the brief's questions

1. **Answered and not answered, first screen.** What is *not* answered is
   clear on the first screen. What *is* answered does not appear until the
   third screen, and the TL;DR does not state it either (R2).
2. **Does the finding read as an answer to "who organized them"?** No, and
   that is correct. Its label, its question and TL;DR bullet 4 keep it
   apart from the organizing question. The organizing question itself is
   understated (R1).
3. **Counted, never named.** Members of the public are counted and none is
   named. The page explains the counting but not the policy behind it (S1).
4. **Bylaw label.** It is clear and cannot be taken to mean the bylaw is
   unavailable to the public (see the phone test). Wording only (S3).

## Phone test (D-0048 rule 8)

Rendered: yes. I served `dist/` on 127.0.0.1 and captured it with
Playwright headless Chromium at viewport 375 by 812, deviceScaleFactor 2,
mobile and touch on. I removed the pending-review banner from the DOM
before capture, as it will be at publication. Positions on the page: title
at 406px, TL;DR at 842, parked block at 1358, the finding's answer at 2231,
the bylaw label at about 11,800.

Screenshots, kept outside the repository:
- `phone-01-first-screen.png`: title, question and standfirst
- `phone-02-y812.png`: TL;DR and the start of the parked block
- `phone-03-y1624.png`: the second parked claim and the Supported finding
- `phone-04-y2436.png`: the next screen
- `phone-05-bylaw-label.png`: the carried labels, the bylaw's included
- `phone-06-parked-claim-page.png`: the first screen of the second parked claim's page
- `phone-full.png`: the full page

**First screen.** The title, the question and the whole standfirst are
visible. Within ten seconds a cold reader can say: "they can't tell which
side the speakers were on or who organized them." That is the answer to
the question as asked, so **yes**. But it is the whole of what they take
away. They cannot say that the time cut happened, and the standfirst's
"who, if anyone" leaves them doubting that any group was involved, which
the page itself contradicts (R1, R2).

**Bylaw label.** "The AI reviewers read our archived copy because their
research tools failed to retrieve it in two rounds in a row. That was their
tools failing; it does not mean the document is unavailable to you." Read
cold on the phone, this is unambiguous. The second sentence answers the
question before a reader can ask it, and the "Original" link sits right
after it. **Yes**, it is understood. Nobody would read it as the bylaw
being unavailable. The minutes labels just above it read the same way as
on council-pause-vote. All the labels sit about 14 screens below the
answer, so none of them gets in its way.
