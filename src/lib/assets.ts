/** Builds absolute URLs for assets hosted on the Paprika R2 CDN. */

const CDN_BASE = 'https://assets.paprika-advertising.com';

export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CDN_BASE}${normalized}`;
}
