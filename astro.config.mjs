// @ts-check
import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

/**
 * The commit this build was made from, shown in the footer so a reader can go
 * from the deployed page to the exact tree that produced it. Cloudflare Pages
 * builds from a fetched tarball, not a git checkout, so its own commit SHA env
 * var is used when set; otherwise falls back to git, then to "dev" outside a
 * checkout (a shallow CI clone still resolves HEAD).
 */
function commitSha() {
  if (process.env.CF_PAGES_COMMIT_SHA) return process.env.CF_PAGES_COMMIT_SHA.slice(0, 7);
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() || 'dev';
  } catch {
    return 'dev';
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://yegfacts.ca',
  trailingSlash: 'never',
  /*
   * One HTML file per route — `dist/about.html`, not `dist/about/index.html`.
   * Cloudflare Pages serves `about.html` at `/about` with no redirect and sends
   * `/about/` back to `/about`; with the default directory layout it does the
   * opposite, 308-ing every clean URL to the trailing-slash form. Every
   * canonical tag, sitemap entry, feed link and ClaimReview url on this site is
   * written without the slash, so the directory layout made all of them
   * redirects and pointed each served page's canonical at a URL that bounced
   * back to it. This is what makes `trailingSlash: 'never'` true on Pages.
   */
  build: { format: 'file' },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.COMMIT_SHA': JSON.stringify(commitSha()),
      // Cloudflare sets CF_PAGES_BRANCH; empty in local builds.
      'import.meta.env.DEPLOY_BRANCH': JSON.stringify(process.env.CF_PAGES_BRANCH ?? ''),
    },
  },
});
