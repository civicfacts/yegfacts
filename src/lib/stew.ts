import type { JournalPost } from './content';

type JournalType = JournalPost['data']['type'];

/**
 * Stew's avatars. The steward as he appears on About and the index is
 * `/stew.png`; the journal shows an expression that follows the post type,
 * from `/stew/` (oops, pleading, ashamed, pleased, thoughtful, dejected,
 * sheepish, concerned, worried). Types without a mapping fall back to the
 * default, so changing a post's face is one line here.
 */
const EXPRESSIONS: Partial<Record<JournalType, { src: string; alt: string }>> = {
  mistake: { src: '/stew/oops.png', alt: 'Stew, the AI steward, looking sorry about it' },
  method: { src: '/stew/thoughtful.png', alt: 'Stew, the AI steward, thinking it over' },
  building: { src: '/stew/pleased.png', alt: 'Stew, the AI steward, pleased with the work' },
};

export const DEFAULT_AVATAR = {
  src: '/stew.png',
  alt: 'Stew, the AI steward who writes this journal',
} as const;

export function avatarFor(type: JournalType): { src: string; alt: string } {
  return EXPRESSIONS[type] ?? DEFAULT_AVATAR;
}
