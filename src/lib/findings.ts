import type { CanonicalFinding, PanelAgreement } from './vocabulary';

/**
 * One fixed sentence per canonical finding, shown under every Finding on a
 * story page (methodology v1.2).
 *
 * The panel review flagged that "Not established" is read as "false" by half of
 * readers and as a dodge by the rest unless the page says plainly what it
 * means, so this gloss is load-bearing, not decoration. The wording is fixed:
 * it is the same sentence on every claim, so it cannot be tuned per verdict to
 * lean an interpretation.
 */
export const FINDING_GLOSS: Record<CanonicalFinding, string> = {
  Supported: 'The evidence affirmatively establishes it.',
  'Partially supported': 'Part holds; as stated it overreaches.',
  'Not established': 'The public record can’t back this up — not the same as proven false.',
  Contradicted: 'The evidence affirmatively points against it.',
  Mixed: 'The panel materially split; both readings are shown.',
};

/**
 * The glossary key for a Partially supported that the synthesis rule produced
 * from a Split panel, and its fixed sentence.
 *
 * The matrix resolves a split downwards, so a Partially supported can come from
 * a panel that disagreed rather than from a claim that part-held. The general
 * gloss ("as stated it overreaches") would then tell a reader something no
 * reviewer found. The wording is fixed and generic, like the others.
 */
export const SPLIT_PARTIAL_TERM = 'Partially supported (split panel)';
export const SPLIT_PARTIAL_GLOSS =
  'The reviewers split, and the published rule resolves a split cautiously to this finding. It does not mean part of the claim was found to overreach.';

/**
 * The glossary key whose definition glosses a claim's finding badge: the
 * finding word itself, except for a Partially supported reached from a Split
 * panel, which takes SPLIT_PARTIAL_TERM.
 */
export function findingGlossTerm(finding: string, panelAgreement: string): string {
  return finding === 'Partially supported' && panelAgreement === 'Split' ? SPLIT_PARTIAL_TERM : finding;
}

/**
 * One fixed sentence per panel-agreement value (methodology v1.3).
 *
 * Every one of them says the same thing in three ways: this dimension measures
 * the panel, not the world. The site used to print a canonical "confidence"
 * here, which readers reasonably took as a probability that the claim was true.
 * Nothing in the method computes that, so the label no longer implies it.
 */
export const PANEL_AGREEMENT_GLOSS: Record<PanelAgreement, string> = {
  Unanimous:
    'All three reviewers reached this verdict independently. Agreement, not a probability of truth.',
  Adjacent: 'Two reviewers landed one step from the third; the cautious resolution is shown.',
  Split: 'The panel materially disagreed; the disagreement is shown, not averaged.',
};

/**
 * The colour a finding is filled in, as Tailwind class names.
 *
 * `bg` and `text` are the badge — a filled tile carrying the word in full —
 * and `border` is the verdict-coloured left edge of a ledger row, so a list of
 * findings can be read down a single column. One map, so the badge and the row
 * edge can never disagree about what colour a verdict is.
 *
 * `text` is the badge's foreground, not a colour for the word on paper: only
 * Mixed takes ink, because white on gold fails AA.
 */
export const FINDING_TONE: Record<
  CanonicalFinding,
  { text: string; bg: string; border: string }
> = {
  Supported: { text: 'text-white', bg: 'bg-forest', border: 'border-forest' },
  'Partially supported': { text: 'text-white', bg: 'bg-navy', border: 'border-navy' },
  'Not established': { text: 'text-white', bg: 'bg-charcoal', border: 'border-charcoal' },
  Contradicted: { text: 'text-white', bg: 'bg-brick', border: 'border-brick' },
  Mixed: { text: 'text-ink', bg: 'bg-gold', border: 'border-gold' },
};

/**
 * The ledger-row edge for a finding. Charcoal, the Not established fill, is the
 * fallback for a word the vocabulary does not know, so a bad value shows up as
 * a grey row rather than a build error on a page that lists everything.
 */
export function findingEdge(finding: string): string {
  return FINDING_TONE[finding as CanonicalFinding]?.border ?? 'border-charcoal';
}
