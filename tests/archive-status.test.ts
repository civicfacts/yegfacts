/**
 * What the evidence pages say about an entry's archive. An entry whose
 * archived bytes were lost must not read as mirrored or retained: the reader
 * could not check its hash against anything we hold.
 */
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { archiveStatus } from '../src/lib/archive';

describe('archive status', () => {
  it('describes a held archive by where it is kept', () => {
    expect(archiveStatus({ visibility: 'public' })).toMatchObject({ lost: false, short: 'mirrored' });
    expect(archiveStatus({ visibility: 'private' })).toMatchObject({
      lost: false,
      long: 'retained privately; hash published',
    });
  });

  it('says a lost archive is lost and links the audit record', () => {
    const status = archiveStatus({
      visibility: 'private',
      lost_on: '2026-10-02',
      loss_record: 'methodology/audits/archive-loss-2026-10-02.md',
    });
    expect(status.lost).toBe(true);
    expect(status.long).toBe('original archive lost; see the audit record');
    expect(status.long).not.toMatch(/retained|mirrored/);
    expect(status.recordHref).toBe('/methodology/audits/archive-loss-2026-10-02');
  });

  it('reads the recorded loss on a registry entry a published claim cites, and its record exists', () => {
    const entry = parse(readFileSync('evidence/registry/YF-EV-0158.yaml', 'utf8'));
    expect(archiveStatus(entry.archive).lost).toBe(true);
    expect(existsSync(entry.archive.loss_record)).toBe(true);
  });
});
