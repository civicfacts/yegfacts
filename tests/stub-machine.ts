/**
 * The machine a stub reviewer runs on, and the upstream its requests reach.
 *
 * Both launcher spec files build the same two things. The machine is a HOME with
 * real private files in it, because that is what the denylist reads: a leaking
 * scenario copies a line of one of these files into its request for real, and
 * the check has to catch it by finding that line rather than by being told. The
 * upstream is a stand-in for the vendor's API, so that a test goes through the
 * real recording proxy without reaching the network.
 *
 * They live here rather than once per spec file because two copies of the
 * private text is two chances for one of them to stop being the text the check
 * actually searches for, which would leave a leak test passing for the wrong
 * reason.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TESTS = fileURLToPath(new URL('.', import.meta.url));

/** The private text the stub machine holds, which a leaking run copies for real. */
export const HOME_INSTRUCTION = 'Answer in the house voice and follow the rules in this file.';
export const MEMORY_NOTE = 'The founder runs parallel sessions; stage commits by explicit file names.';

/**
 * A HOME carrying the two kinds of private file the denylist resolves: the
 * operator's global instructions, and a project memory file. Returns the path so
 * a caller can add a credential for whichever seat it is testing.
 */
export function stubHome(dir: string): string {
  const home = path.join(dir, 'home');
  mkdirSync(path.join(home, '.claude', 'projects', 'stub-project', 'memory'), { recursive: true });
  writeFileSync(path.join(home, '.claude', 'CLAUDE.md'), `# Global instructions\n\n${HOME_INSTRUCTION}\n`);
  writeFileSync(
    path.join(home, '.claude', 'projects', 'stub-project', 'memory', 'notes.md'),
    `# Memory\n\n${MEMORY_NOTE}\n`,
  );
  return home;
}

/**
 * The stub upstream, in a process of its own.
 *
 * That is not incidental. The launcher is driven with `spawnSync`, which blocks
 * the vitest worker's event loop until the launcher exits, so an upstream
 * listening inside that worker would never answer a single request and every run
 * would deadlock behind its own first one.
 */
export async function startStubUpstream(root: string): Promise<{ url: string; stop: () => void }> {
  const portFile = path.join(root, 'upstream-port');
  const child = spawn(process.execPath, [path.join(TESTS, 'stub-upstream.mjs'), '--port-file', portFile], {
    stdio: 'ignore',
  });
  for (let waited = 0; waited < 100 && !existsSync(portFile); waited += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return {
    url: `http://127.0.0.1:${readFileSync(portFile, 'utf8').trim()}`,
    stop: () => child.kill('SIGKILL'),
  };
}
