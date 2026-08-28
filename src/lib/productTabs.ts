/** Product tab metadata and locale-aware labels via i18n dictionaries. */
import { t, type Locale, type TranslationKey } from './i18n';

const TAB_CONFIG = [
  { id: 'floor-stand', field: 'floorStand', labelKey: 'products.tabs.floorStand' },
  { id: 'counter', field: 'counter', labelKey: 'products.tabs.counter' },
  { id: 'shelf-organizer', field: 'shelfOrganizer', labelKey: 'products.tabs.shelfOrganizer' },
  { id: 'bus-stop-frame', field: 'busStopFrame', labelKey: 'products.tabs.busStopFrame' },
  { id: 'cross-merch', field: 'crossMerch', labelKey: 'products.tabs.crossMerch' },
  { id: 'tester-glorifier', field: 'testerGlorifier', labelKey: 'products.tabs.testerGlorifier' },
  { id: 'eco', field: 'eco', labelKey: 'products.tabs.eco' },
] as const;

export type ProductTabField = (typeof TAB_CONFIG)[number]['field'];

export type ProductTab = {
  id: string;
  field: ProductTabField;
  label: string;
};

const BODY_KEYS: Record<ProductTabField, TranslationKey> = {
  floorStand: 'products.bodies.floorStand',
  counter: 'products.bodies.counter',
  shelfOrganizer: 'products.bodies.shelfOrganizer',
  busStopFrame: 'products.bodies.busStopFrame',
  crossMerch: 'products.bodies.crossMerch',
  testerGlorifier: 'products.bodies.testerGlorifier',
  eco: 'products.bodies.eco',
};

/** Returns product tab ids, Sanity fields, and localized labels. */
export function getProductTabs(locale: Locale): ProductTab[] {
  return TAB_CONFIG.map((tab) => ({
    id: tab.id,
    field: tab.field,
    label: t(locale, tab.labelKey),
  }));
}

/** Returns the default fallback body copy for a product category tab. */
export function getProductTabDefaultBody(locale: Locale, field: ProductTabField): string {
  return t(locale, BODY_KEYS[field]);
}
