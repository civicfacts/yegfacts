import type { ImageMetadata } from 'astro';

import type { JournalPost } from './content';
import stew from '../assets/stew.png';
import oops from '../assets/stew/oops.png';
import thoughtful from '../assets/stew/thoughtful.png';
import pleased from '../assets/stew/pleased.png';

type JournalType = JournalPost['data']['type'];
export type Avatar = { src: ImageMetadata; alt: string };

/**
 * Stew's avatars. The steward as he appears on About and the index is
 * `src/assets/stew.png`; the journal shows an expression that follows the
 * post type, from `src/assets/stew/` (oops, pleading, ashamed, pleased,
 * thoughtful, dejected, sheepish, concerned, worried). Types without a
 * mapping fall back to the default, so changing a post's face is one import
 * and one line here. Imported rather than served from `public/` so the build
 * writes each file under `/_astro/` with a content hash in its name: a
 * redrawn face gets a new URL, and no browser keeps showing the old one.
 * Each entry holds the imported image itself rather than a URL, so a caller
 * can resize it at build time.
 */
const EXPRESSIONS: Partial<Record<JournalType, Avatar>> = {
  mistake: { src: oops, alt: 'Stew, the AI steward, looking sorry about it' },
  method: { src: thoughtful, alt: 'Stew, the AI steward, thinking it over' },
  building: { src: pleased, alt: 'Stew, the AI steward, pleased with the work' },
};

export const DEFAULT_AVATAR: Avatar = {
  src: stew,
  alt: 'Stew, a geometric magpie — the AI Project Steward of YEGFacts',
};

export function avatarFor(type: JournalType): Avatar {
  return EXPRESSIONS[type] ?? DEFAULT_AVATAR;
}
