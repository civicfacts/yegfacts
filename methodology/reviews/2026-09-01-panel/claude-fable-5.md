Review complete. I browsed the live site (home, methodology, changes, three story pages, evidence, about, support) and checked the repo. One discovery ranks above everything in the brief: **github.com/civicfacts/yegfacts is private**. It resolves fine with authenticated `gh` (visibility: PRIVATE) and returns 404 to the public. Every auditability claim on the site currently points at a locked door.

Ranked findings:

---

**1. The "public, auditable repo" is not public**
CRITICAL / Honesty gaps, Trustability
The design doc's core authority claim is "you should be able to audit a published finding without asking anyone anything," and the site repeats it: "Every change to this page is in the public git history," source-code links, prefilled GitHub issue CTAs, publicly mirrored evidence files. The repo returns 404 to anyone but you. Until it's flipped, every trust argument on the site is unverifiable and a journalist who clicks once will conclude the transparency is theater. This is worse than having no repo claim at all.
*Recommendation:* Make the repo public today, or do a sweep removing every "public git history / public repo" sentence until you can.

**2. The human gate the site still advertises never operated on any published story**
CRITICAL / Honesty gaps
v1.0 (Aug 31) promises "a human who verifies every cited source before anything is published. No publish path skips this." v1.1 (Sep 1, the very next day) delegates that to an AI audit pair, and the electric-buses article history confirms the AI gate ran on story one. So the human gate has gated zero published stories, while the design document's §1 and stage 7 still describe it in the present tense and the support page still says "verifying every source by hand." That's the exact overclaim pattern the site exists to catch in others.
*Recommendation:* Update the design doc and support page to match v1.1, and add one plain sentence to /methodology: "All four currently published stories passed the AI audit gate, not a per-source manual review by the founder."

**3. Three LLMs are not three independent reviewers, and the matrix pretends they are**
CRITICAL / Methodology
Claude, GPT, and Gemini share training corpora, share the same searchable web, and share failure modes (the intention-vs-outcome error your own prompt warns about, over-trusting well-indexed sources, missing anything paywalled or offline). Unanimity is therefore weaker evidence than the synthesis matrix implies: S-S-S can be a shared blind spot, and this bites hardest on thin local Edmonton records where all three lean on the same two council PDFs. A hostile academic reviewer attacks exactly here: no ground truth, no calibration data, confidence labels with no track record behind them.
*Recommendation:* Publish a running calibration ledger, seeded from data you already generate: every error caught in round 2 (`errors_in_other_reviews`) and at the gate, tallied per model and error type, plus one honest sentence on /methodology that unanimity measures agreement, not accuracy.

**4. The frozen brief is the real editorial lever, and it's the least examined step**
IMPORTANT / Methodology (gameability)
You write the operationalization (what counts as "lost," gross vs net, the as-of date that closes the accounting window) before any model runs. Those choices can predetermine a verdict; freezing prevents post-hoc adjustment but not pre-loading, and the panel then gives a loaded proposition a three-model imprimatur. This is how the system produces confident nonsense while every downstream stage works perfectly.
*Recommendation:* Publish each brief verbatim, linked from the story page, with a short "definitions we chose, and the plausible alternatives that would change the answer" note per claim.

**5. Round 2 injects errors and pressures convergence, and synthesis runs on its output**
IMPORTANT / Methodology
The committed round-2 file with a false accusation against another reviewer proves cross-review creates errors, and the correction lives only in the gate report, which a repo auditor has no reason to connect to that file. Meanwhile "do not converge" is a prompt instruction fighting a documented model tendency toward agreement, and nothing surfaces whether it's working, even though `verdict_changes` records exist.
*Recommendation:* Commit an errata file alongside any artifact known to contain a false statement (linked both ways), and publish per-run verdict-change stats: how many round-2 changes, and whether each moved toward or away from the majority.

**6. The pipeline doesn't enforce on itself the citation standard it demands of models**
IMPORTANT / Methodology, Honesty gaps
The reviewer prompt calls a fabricated citation "the worst possible failure," yet combined-evidence.json carries null evidence_ids and citations whose URLs failed to fetch, with no flag. Round-2 reviewers and future auditors can't distinguish a verified source from one nobody could retrieve, so the cross-review's "verify the URL" instruction silently operates on unverifiable input.
*Recommendation:* Have merge.ts stamp every evidence item with fetch status (fetched+hash / fetch-failed / not-attempted) and a registry id or explicit "unregistered," and make the gate fail on any unflagged fetch failure.

**7. Panel labels are self-reported by the models and inconsistent across stories**
IMPORTANT / Trustability
Electric-buses displays "GPT-5"; winter-cycling displays "gpt-5.6-sol." The display evidently comes from what each model wrote about itself, not from the run.yaml manifest you built precisely to record what ran. So the public record of who reviewed what is unreliable, and it's the kind of five-minute catch that makes a journalist doubt everything else.
*Recommendation:* Render panel identity only from run.yaml; keep the self-reported id as an internal consistency check, never as display text.

**8. The "Claims we're seeing" disclaimer contradicts itself, and the cards invite screenshot abuse**
IMPORTANT / Honesty gaps, Presentation
"Composite examples… not captured posts" and "the original posts remain public" cannot both be true; a composite has no original. Worse, platform-styled fake-post cards on a fact-checking site are fabricated-quote-shaped content, and they will circulate as screenshots without the disclaimer attached.
*Recommendation:* Delete the "original posts remain public" sentence, drop the platform styling, and bake "paraphrase, not a real post" into each card's visual so it survives a screenshot.

**9. "AI audits the AI" is a weak anchor for the site's heaviest trust claim**
IMPORTANT / Trustability
The v1.1 gate is materially weaker than the human gate it replaced, and skeptics will compress it to "the AI grades its own homework, and a busy founder can theoretically revert." The mitigating evidence exists (the electric-buses history shows "22 statements checked, 0 unsupported, 7 imprecisions fixed") but it's buried in article history.
*Recommendation:* Put the audit report link and those counts directly in each story's AI-review box, plus one sentence on what you personally did for that story.

**10. Private-by-default evidence breaks the journalist's 10-minute audit**
IMPORTANT / Presentation, Trustability
Most registry entries read "retained privately": the auditor gets a hash, a URL, and a retrieval date. If the live URL has moved or died (and you already know some citations were unfetchable), the trail dead-ends, since a hash of bytes you can't see proves nothing to an outsider. Rights caution has quietly become verification failure.
*Recommendation:* Add build-time live-link status and a permitted excerpt to each private evidence page, plus one line on how to verify: email for the bytes, compare the hash.

**11. The verdict system asks for three-dimensional reading nobody will do**
MINOR / Presentation
Finding × confidence × a six-value evidence-basis label is epistemically honest and largely illegible; "Not established" will be read as "false" by half of residents and as a dodge by the rest. Winter-cycling also shows "Unanimous panel" where other pages show a confidence level, muddling the scheme. The plain-English headline sentence is doing the real 10-second work, and it's good.
*Recommendation:* Add a fixed one-line gloss under each verdict badge ("Not established = the public record can't back this up. Not the same as proven false.") and standardize the confidence slot across stories.

**12. "Non-partisan" is asserted but not yet demonstrable**
MINOR / Trustability
All four live verdicts land against the same political flank (defending buses, bike lanes, district plans), and your About page discloses you favor density and transit. Your actual defense is strong, a nine-story slate fixed before any verdict was known, but it lives in an unpublished design doc (see finding 1).
*Recommendation:* Say on the homepage that these four are the first of a pre-committed nine-story slate, and link the full slate so readers can see what's still coming.

---

**The three changes I'd make first:**

1. **Make the repo public.** Nothing else on the site is checkable until this is true, and finding it private converts every transparency claim into evidence against you.
2. **Reconcile the site with v1.1.** Fix the design doc's stage 7 and §1, fix the support page's "by hand" line, and state that all four live stories were AI-gated. The gap between v1.0's promise and v1.1's reality is currently a one-paragraph story a hostile blogger writes for free.
3. **One artifact-hygiene batch:** render model names from run.yaml, commit an errata file next to the false-accusation round-2 artifact, and make merge.ts flag unfetchable URLs and null evidence_ids. All three are small scripts, and together they close the gap between the citation standard you demand of models and the one your own pipeline meets.
