/** Builds absolute URLs for assets hosted on the Paprika R2 CDN. */

const CDN_BASE = 'https://pub-bca52d58a1144baf81ba6ed02c98b0f5.r2.dev';

export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CDN_BASE}${normalized}`;
}
