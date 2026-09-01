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
