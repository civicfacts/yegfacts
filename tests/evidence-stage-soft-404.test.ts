import { describe, expect, it } from 'vitest';
import { isSoftNotFound } from '../scripts/evidence-stage.ts';

const html = (title: string, body = '') =>
  new TextEncoder().encode(`<!doctype html><html><head><title>${title}</title></head><body>${body}</body></html>`);

describe('soft not-found pages', () => {
  it('catches a not-found page served as HTML', () => {
    expect(isSoftNotFound(html('Page Not Found | City of Edmonton'), 'text/html; charset=utf-8')).toBe(true);
    expect(isSoftNotFound(html('404 - Not Found'), 'text/html')).toBe(true);
  });

  it('keeps a real page, even one that mentions a missing page in its body', () => {
    expect(isSoftNotFound(html('Bike routes', 'The old page could not be found.'), 'text/html')).toBe(false);
  });

  it('never inspects a non-HTML document', () => {
    expect(isSoftNotFound(new TextEncoder().encode('%PDF-1.7 Page Not Found'), 'application/pdf')).toBe(false);
  });
});
