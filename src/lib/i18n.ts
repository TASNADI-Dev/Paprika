/** Locale constants and path helpers for EN/FR routing. */
import { withBase } from './paths';

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

const FR_PREFIX = '/fr';

function stripBase(pathname: string): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  if (!base || base === '/') {
    return pathname || '/';
  }

  if (pathname === base || pathname === `${base}/`) {
    return '/';
  }

  if (pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length) || '/';
  }

  return pathname || '/';
}

/** Returns the path segment without the locale prefix (always starts with `/`). */
export function getPathWithoutLocale(path: string): string {
  const bare = stripBase(path);

  if (bare === FR_PREFIX) {
    return '/';
  }

  if (bare.startsWith(`${FR_PREFIX}/`)) {
    return bare.slice(FR_PREFIX.length) || '/';
  }

  return bare;
}

/** Detects the active locale from a URL or pathname (handles Astro `base`). */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const bare = stripBase(pathname);

  if (bare === FR_PREFIX || bare.startsWith(`${FR_PREFIX}/`)) {
    return 'fr';
  }

  return DEFAULT_LOCALE;
}

/** Builds a locale-aware site path, then applies the configured Astro base. */
export function localizedPath(locale: Locale, path = '/'): string {
  const bare = getPathWithoutLocale(path.startsWith('/') ? path : `/${path}`);

  if (locale === 'fr') {
    return withBase(bare === '/' ? FR_PREFIX : `${FR_PREFIX}${bare}`);
  }

  return withBase(bare);
}

/** Switches the current path to the equivalent route in another locale. */
export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  return localizedPath(targetLocale, getPathWithoutLocale(currentPath));
}
