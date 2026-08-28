/** Locale constants, path helpers, and UI translations for EN/FR routing. */
import { withBase } from './paths';
import en from '../i18n/en.json';
import fr from '../i18n/fr.json';

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

const dictionaries = { en, fr } as const;

type Dictionary = typeof en;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<Dictionary>;

export type TranslationParams = Record<string, string | number>;

const FR_PREFIX = '/fr';

function getNestedValue(source: object, key: string): unknown {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function formatTranslation(template: string, params?: TranslationParams): string {
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce(
    (result, [param, value]) => result.replaceAll(`{${param}}`, String(value)),
    template,
  );
}

/** Returns a UI string for the given locale and dot-notation key. */
export function t(
  locale: Locale,
  key: TranslationKey,
  params?: TranslationParams,
): string {
  const localized = getNestedValue(dictionaries[locale], key);
  const fallback = getNestedValue(dictionaries[DEFAULT_LOCALE], key);
  const value = typeof localized === 'string' ? localized : fallback;

  if (typeof value !== 'string') {
    return key;
  }

  return formatTranslation(value, params);
}

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
