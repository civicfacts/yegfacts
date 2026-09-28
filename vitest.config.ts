import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

// Other sessions' git worktrees live under .claude/worktrees/ inside the main
// checkout; without this, a local run also collects their copies of the tests.
// getViteConfig lets a test render an .astro component through Astro's
// container API.
export default getViteConfig({ test: { exclude: [...configDefaults.exclude, '.claude/**'] } });
