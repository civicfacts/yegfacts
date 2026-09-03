/**
 * Plain speech (docs/DESIGN.md §12), in the part a script can see.
 *
 * These live outside `src/content.config.ts` for the reason `vocabulary.ts`
 * does: the config imports `astro:content`, which only exists inside an Astro
 * build, so `scripts/validate.ts` and the tests could not read the rules from
 * there. The schema and the validator now apply the same definitions, and the
 * tests can hold them to both halves of the punctuation rule.
 *
 * A script can only judge shape, so it judges shape. Everything else — whether
 * a person would say it out loud, whether it stands alone, whether anything
 * true was dropped rather than moved down — goes to the plain-speech read in
 * `prompts/plain-speech-read.md`, because no rule here can see it and a build
 * rule that rewrites prose recreates the failure §12 exists because of.
 *
 * There is deliberately no word limit anywhere in this file. Five of the six
 * answers published under a thirty-word cap were exactly thirty words long: a
 * limit every instance sits on is generating the failure it was meant to
 * prevent, so the cap went and the punctuation rule took its place.
 */
import { CANONICAL_FINDINGS } from './vocabulary';

/**
 * The punctuation that lets a second idea into a sentence. A hyphen inside an
 * ordinary compound is English and stays, which is why this is four characters
 * rather than "any dash" — the rule this replaced banned dashes outright and
 * would have failed "bike-lane" and "like-for-like".
 */
const SECOND_IDEA_PUNCTUATION = /[:;—–]/;

export const ONE_IDEA_RULE =
  'must not use a colon, semicolon, em dash or en dash. That punctuation is how a second idea gets into a sentence. A hyphen inside an ordinary compound is fine.';

export function hasSecondIdeaPunctuation(text: string): boolean {
  return SECOND_IDEA_PUNCTUATION.test(text);
}

/**
 * The stance the answer opens with. Four openers, each free to carry a short
 * qualifier before the full stop, as in "Yes, roughly." and "Nobody can tell
 * yet.". The qualifier is bounded so that an ordinary sentence which happens to
 * begin "No conforming series matches…" cannot pass itself off as a stance;
 * that bound is on the shape of an opening fragment, not on the length of the
 * answer, which has no limit at all.
 */
const STANCE_OPENER = /^(?:Yes|No|Partly|Nobody can tell),?(?:\s[a-z]+){0,4}\./;

export const STANCE_RULE =
  'must open with a plain-speech stance. The openers are "Yes", "No", "Partly" and "Nobody can tell", each free to carry a short qualifier before the full stop, as in "Yes, roughly." and "Nobody can tell yet.".';

export function opensWithStance(text: string): boolean {
  return STANCE_OPENER.test(text);
}

/** The method's verdict words, which are the badge's job and never the answer's. */
const FINDING_OPENER = new RegExp(`^(?:${CANONICAL_FINDINGS.join('|')})\\b`, 'i');

export const FINDING_WORD_RULE =
  'must not open with a finding word. The finding is the badge beside the answer and does the method’s job. The answer does the human one, so it opens with the stance a person would say.';

export function opensWithFindingWord(text: string): boolean {
  return FINDING_OPENER.test(text);
}

/**
 * Method vocabulary that has no business in a sentence written for a reader.
 * These are the words the method needs and a person asking the question would
 * never use.
 *
 * A warning wherever it is applied, never a failure, and that is the whole
 * point of §12. A list of banned words that fails the build is the next rule
 * that deletes true content: the writer facing a red build removes the sentence
 * rather than rewriting it, which is how a thirty-word cap turned six answers
 * into abstracts. A person reads the line and decides.
 *
 * "Not established" is listed as a phrase in prose, not as a finding: the
 * finding word belongs on the badge beside the answer, and the answer says the
 * same thing in the words a person would say.
 */
export const METHOD_VOCABULARY = [
  'proposition',
  'materially factual',
  'operationalised',
  'operationalized',
  'as-of',
  'evidence basis',
  'panel agreement',
  'canonical',
  'synthesis',
  'verdict matrix',
  'not established',
] as const;

/** Every method word the sentence uses, in the order this module lists them. */
export function methodVocabularyIn(text: string): string[] {
  const haystack = text.toLowerCase();
  return METHOD_VOCABULARY.filter((term) => haystack.includes(term));
}
