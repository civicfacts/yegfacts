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

/** Path inside the project repository, used for run-artifact links. */
export function repoPath(path: string): string {
  return `${SITE.repo}/tree/main/${path.replace(/^\/+/, '')}`;
}

export function issueUrl(title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `${SITE.repo}/issues/new?${params.toString()}`;
}

export function mailto(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, '%20')}`;
}
