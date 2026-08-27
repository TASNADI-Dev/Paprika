/** Prefixes site-relative paths with Astro's configured base URL. */

export function withBase(path = ''): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  if (!path || path === '/') return base;

  const normalized = path.replace(/^\//, '');
  return `${base}${normalized}`;
}
