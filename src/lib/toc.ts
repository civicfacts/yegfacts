/**
 * "On this page" outlines.
 *
 * A page declares its own outline because only the page knows which of its
 * sections actually rendered — a story with no commitments has no commitments
 * section, and a table of contents that links to nothing is worse than none.
 * The layout does the rest: one sticky rail at desktop width, one disclosure on
 * phones, both built from the same list.
 */
export interface TocSection {
  /** The `id` on the rendered section. */
  id: string;
  /** Short label, not the heading verbatim — the rail is narrow. */
  label: string;
}

/**
 * Below this, a table of contents is furniture rather than navigation: the
 * whole outline is already on screen.
 */
export const TOC_MIN_SECTIONS = 3;

/**
 * Drop the sections that did not render, then withhold the whole outline if too
 * little is left. Falsy entries are how a page says "this section is absent",
 * so callers can write the outline in render order and let conditions decide.
 */
export function toc(sections: Array<TocSection | false | null | undefined>): TocSection[] {
  const present = sections.filter((section): section is TocSection => Boolean(section));
  return present.length >= TOC_MIN_SECTIONS ? present : [];
}
