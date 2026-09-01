import type { CanonicalFinding } from './vocabulary';

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
