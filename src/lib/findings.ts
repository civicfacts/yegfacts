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
