import { configDefaults, defineConfig } from 'vitest/config';

// Other sessions' git worktrees live under .claude/worktrees/ inside the main
// checkout; without this, a local run also collects their copies of the tests.
export default defineConfig({ test: { exclude: [...configDefaults.exclude, '.claude/**'] } });
