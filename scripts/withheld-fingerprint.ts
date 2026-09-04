/**
 * Fingerprint generator for `intake/withheld-fingerprints.yaml`.
 *
 *   npm run withheld:fingerprint            # reads plain text from stdin
 *
 * One string per line: the descriptive slug a run artifact used, the
 * proposition, the commenter's wording — whatever a right-of-reply decline
 * withholds. Prints the `fingerprints:` block to paste into the entry.
 *
 * Nothing is written to disk and nothing is echoed back. Pipe the strings in
 * from the private board record; do not paste them into a file in this repo,
 * and do not leave them in a shell history that is itself committed anywhere.
 */
import { fingerprintOf, loadWithheld } from './lib/withheld.ts';

const text = await new Response(process.stdin as unknown as ReadableStream).text();
const strings = text.split('\n').filter((line) => line.trim().length > 0);

if (strings.length === 0) {
  console.error('withheld-fingerprint: nothing on stdin — one string per line');
  process.exit(1);
}

const { salt } = loadWithheld();

console.log('    fingerprints:');
for (const string of strings) {
  const fingerprint = fingerprintOf(salt, string);
  if (fingerprint.tokens < 3) {
    console.error(
      `withheld-fingerprint: a ${fingerprint.tokens}-token string is too short to fingerprint ` +
        'safely — it would match innocent prose. Fingerprint the sentence it sits in.',
    );
    process.exit(1);
  }
  console.log(`      - tokens: ${fingerprint.tokens}`);
  console.log(`        chars: ${fingerprint.chars}`);
  console.log(`        sha256: ${fingerprint.sha256}`);
}
