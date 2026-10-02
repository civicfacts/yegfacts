import { SITE } from './site';

/** The archive fields of an evidence registry entry that decide what the site may claim about it. */
export interface ArchiveFields {
  visibility: 'public' | 'private';
  lost_on?: string;
  loss_record?: string;
}

export interface ArchiveStatus {
  /** Whether the bytes behind the recorded hash are still held. */
  lost: boolean;
  /** For the registry list: one or two words. */
  short: string;
  /** For the evidence page's record. */
  long: string;
  /** The audit record explaining a loss, on GitHub; set only when `lost`. */
  recordHref?: string;
}

/**
 * What the site may say about an entry's archive. A lost archive is never
 * described as mirrored or retained, because the reader could not check the
 * hash against it; it points to the audit record instead.
 */
export function archiveStatus(archive: ArchiveFields): ArchiveStatus {
  if (archive.lost_on !== undefined) {
    return {
      lost: true,
      short: 'original archive lost',
      long: 'original archive lost; see the audit record',
      recordHref: archive.loss_record ? `${SITE.repo}/blob/main/${archive.loss_record}` : undefined,
    };
  }
  return archive.visibility === 'public'
    ? { lost: false, short: 'mirrored', long: 'mirrored in this repo' }
    : { lost: false, short: 'retained privately', long: 'retained privately; hash published' };
}
