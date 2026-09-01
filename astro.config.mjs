// @ts-check
import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

/**
 * The commit this build was made from, shown in the footer so a reader can go
 * from the deployed page to the exact tree that produced it. Falls back to
 * "dev" outside a git checkout (a shallow CI clone still resolves HEAD).
 */
function commitSha() {
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
    },
  },
});
