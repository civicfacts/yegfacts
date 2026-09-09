/**
 * Put a finished artefact at its destination, or fail — never over the top of
 * something already there.
 *
 *   tsx scripts/panel/install-output.ts <source> <destination>
 *
 * `mv` and `cp` both happily replace an existing file, and both callers here
 * write results that took a research run to produce. Checking first and copying
 * second is not enough either: the gap between the check and the write is real,
 * and a concurrent session is exactly the thing that fills it. This repo runs
 * several sessions at once by design.
 *
 * `COPYFILE_EXCL` closes the gap by pushing the test into the same syscall as
 * the write, the way `O_EXCL` does. If the destination appears at any point
 * before the copy lands, this exits 1 and nothing at the destination changes.
 *
 * The destination is not followed: a symlink sitting there, live or dangling,
 * counts as something already present and is refused rather than written
 * through. The source is left alone — for one caller it is a scratch file about
 * to be swept up, for the other it is retained archive evidence.
 */
import { constants, copyFileSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function installExclusive(source: string, destination: string): void {
  copyFileSync(source, destination, constants.COPYFILE_EXCL);
}

/**
 * True when this file is the script node was told to run. realpath on both
 * sides, because through a symlinked checkout the two spellings of the same
 * file differ, the comparison fails, and the script exits 0 having done nothing.
 */
function isEntryPoint(): boolean {
  const invoked = process.argv[1];
  if (!invoked) return false;
  try {
    return realpathSync(invoked) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  const [source, destination, ...rest] = process.argv.slice(2);
  if (!source || !destination || rest.length > 0) {
    console.error('usage: tsx scripts/panel/install-output.ts <source> <destination>');
    process.exit(2);
  }
  try {
    installExclusive(source, destination);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'EEXIST') {
      console.error(`refusing to overwrite ${destination}: something is already there`);
      process.exit(1);
    }
    console.error(`could not install ${destination}: ${(error as Error).message}`);
    process.exit(1);
  }
}
