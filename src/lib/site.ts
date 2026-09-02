export const SITE = {
  name: 'YEGFacts.ca',
  url: 'https://yegfacts.ca',
  tagline: 'Edmonton civic evidence, checked against the record.',
  email: 'hello@yegfacts.ca',
  /** Where a reader asks to verify a privately-archived source against its hash. */
  researchEmail: 'research@yegfacts.ca',
  repo: 'https://github.com/civicfacts/yegfacts',
  operator: 'Ildar Abdulin',
} as const;

/**
 * The URL path a page is actually served at, from `Astro.url.pathname`.
 *
 * `build.format: 'file'` writes `dist/about.html`, and Astro reports the built
 * file rather than the served URL: `Astro.url.pathname` is `/about.html` in a
 * build and `/about` under `astro dev`. Cloudflare Pages serves that file at
 * `/about`, which is the URL every canonical tag, sitemap entry and link on
 * this site uses, so the extension is stripped here and the two agree. The
 * home page is `/index.html` in a build and `/` served, and a trailing slash
 * from anywhere else goes the same way.
 */
export function servedPath(pathname: string): string {
  return pathname.replace(/(?:\/index)?\.html$/, '').replace(/\/$/, '') || '/';
}

/** Path inside the project repository, used for run-artifact links. */
export function repoPath(path: string): string {
  return `${SITE.repo}/tree/main/${path.replace(/^\/+/, '')}`;
}

/** A single file in the project repository, rather than a directory. */
export function repoFile(path: string): string {
  return `${SITE.repo}/blob/main/${path.replace(/^\/+/, '')}`;
}

export function issueUrl(title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `${SITE.repo}/issues/new?${params.toString()}`;
}

export function mailto(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, '%20')}`;
}
