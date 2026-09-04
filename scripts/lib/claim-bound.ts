/**
 * The merge bound, as far as a string test can carry it.
 *
 * `prompts/intake-merge.md` rule 1 says a claim is one assertion: if you are
 * joining two assertions with "and", they are two claims. Nothing enforced it,
 * and a claim reached the public register joining two people's remarks with
 * exactly that word — one person's tax bill and another person's tax rise,
 * published as a single proposition that neither of them had asserted.
 *
 * This is not the quote gate. The quote gate asks whether a substring is in a
 * comment, which is decidable. This asks whether a wording *supports* a
 * proposition, which is entailment, and no string test decides entailment. So
 * this module does not implement rule 1. It implements one mechanically
 * decidable corner of it, and the corner is chosen to be the shape that got
 * through:
 *
 *   A proposition whose coordinated halves each name a numeral, where the
 *   halves' numerals are disjoint, and no single captured wording carries a
 *   numeral from both halves.
 *
 * Read that as: the proposition asserts two quantities, and nobody in the
 * capture said both. Either it is two claims, or the merge invented a sentence
 * for the register that no person in the source ever uttered. Both are the
 * failure rule 1 exists to prevent.
 *
 * What this deliberately does NOT catch, and what therefore still needs a human
 * or a model read (see `docs`/report `Not checked here` section):
 *
 *   - a compound proposition with no numerals at all. "Taking traffic lanes for
 *     bike lanes increases congestion, slows traffic and causes idling and
 *     emissions" is four assertions and this module is silent on it.
 *   - a compound proposition where one person happened to say both numbers, but
 *     said them as two separate assertions.
 *   - rule 2 entirely (a form must assert the claim, not the topic). "Bicycles
 *     reduce congestion" and "removing a traffic lane increases congestion" are
 *     opposite claims and share every content word; no string test tells them
 *     apart.
 *   - numbers written as words. `two`, `five`, `a quarter` are not numerals
 *     here, on purpose: `one` and `no one` are everywhere in ordinary prose and
 *     a word list would make the check noisy enough to be ignored, which is how
 *     a check dies.
 *
 * The partial check is worth having anyway, because it fires on the exact
 * defect that shipped. It is not worth calling rule 1.
 */

/** A claim as this check needs to see it: what it asserts, and who said what. */
export interface BoundClaim {
  id: string;
  /** The site-facing sentence: what would have to be true. */
  proposition: string;
  /** Every captured wording under the claim, including the representative one. */
  wordings: readonly string[];
}

/** One claim that failed the check, with everything the report needs to say why. */
export interface UnsplitClaim {
  id: string;
  /** The two coordinated halves whose numerals nobody said together. */
  halves: [string, string];
  /** Their numerals, normalised, in the same order. */
  numerals: [string[], string[]];
  /** How many wordings were searched, so a reader knows the size of the miss. */
  wordings: number;
}

/**
 * Coordinators that join two assertions in this project's propositions. Kept
 * short on purpose: every addition is a new way to split a noun phrase by
 * accident, and the numeral test below is what makes a wrong split harmless.
 */
const COORDINATOR = /\s*(?:,|;)?\s+(?:and|while|as well as)\s+/i;

/**
 * Numerals only, commas stripped, magnitude words ignored. `$1,500` and `$ 1500`
 * normalise together; `$100 million` and `100 metres` both reduce to `100`,
 * which makes the check treat them as the same quantity. That is the
 * conservative direction: a collision here suppresses a flag, it never invents
 * one.
 */
export function numerals(text: string): string[] {
  const found = text.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  const out = new Set<string>();
  for (const raw of found) {
    const normalised = raw.replace(/,/g, '').replace(/\.$/, '');
    if (normalised !== '') out.add(normalised);
  }
  return [...out];
}

/** The proposition's coordinated halves, empty parts dropped. */
export function halves(proposition: string): string[] {
  return proposition
    .split(COORDINATOR)
    .map((part) => part.trim())
    .filter((part) => part !== '');
}

const disjoint = (a: readonly string[], b: readonly string[]) => !a.some((value) => b.includes(value));

/**
 * Every claim whose proposition asserts two quantities that no one wording
 * under it carries together.
 *
 * Only the first failing pair of halves is reported per claim: the remedy is
 * the same either way — split the claim, or find the person who asserted both —
 * and a list of every pair would bury it.
 */
export function unsplitClaims(claims: readonly BoundClaim[]): UnsplitClaim[] {
  const out: UnsplitClaim[] = [];
  for (const claim of claims) {
    const parts = halves(claim.proposition)
      .map((text) => ({ text, nums: numerals(text) }))
      .filter((part) => part.nums.length > 0);
    if (parts.length < 2) continue;

    const wordingNumerals = claim.wordings.map((wording) => numerals(wording));

    let found: UnsplitClaim | undefined;
    for (let i = 0; i < parts.length && !found; i += 1) {
      for (let j = i + 1; j < parts.length && !found; j += 1) {
        const a = parts[i]!;
        const b = parts[j]!;
        if (!disjoint(a.nums, b.nums)) continue;
        const together = wordingNumerals.some(
          (nums) => a.nums.some((n) => nums.includes(n)) && b.nums.some((n) => nums.includes(n)),
        );
        if (together) continue;
        found = {
          id: claim.id,
          halves: [a.text, b.text],
          numerals: [a.nums, b.nums],
          wordings: claim.wordings.length,
        };
      }
    }
    if (found) out.push(found);
  }
  return out;
}

/** One line a report or the validator can print, saying what is wrong and why. */
export function describeUnsplit(claim: UnsplitClaim): string {
  return (
    `${claim.id}: the proposition asserts ${claim.numerals[0].join(', ')} in one half ` +
    `and ${claim.numerals[1].join(', ')} in the other, and none of its ${claim.wordings} ` +
    `wording(s) carries both. Either it is two claims, or a wording that asserts both is missing. ` +
    `Halves: "${claim.halves[0]}" / "${claim.halves[1]}"`
  );
}
