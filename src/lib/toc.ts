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
  /**
   * Subheadings inside this section, rendered as a nested indented list. On a
   * story page these are the `###` subheads of the body, taken from the
   * rendered MDX, so the rail follows the narrative instead of pointing at one
   * heading over a thousand words.
   */
  children?: TocSection[];
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
 *
 * Children pass through untouched and do not count toward the minimum: a page
 * with one long section and six subheads still has one section, and an outline
 * of it would be furniture.
 */
export function toc(sections: Array<TocSection | false | null | undefined>): TocSection[] {
  const present = sections.filter((section): section is TocSection => Boolean(section));
  return present.length >= TOC_MIN_SECTIONS ? present : [];
}

/** A rendered MDX heading, as `render()` reports it. */
interface RenderedHeading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * The `###` subheads of a rendered body as outline children, or undefined when
 * there are none — so a caller can pass the result straight to `children`.
 */
export function subheads(headings: RenderedHeading[]): TocSection[] | undefined {
  const found = headings
    .filter((heading) => heading.depth === 3)
    .map((heading) => ({ id: heading.slug, label: heading.text }));
  return found.length > 0 ? found : undefined;
}
