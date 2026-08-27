/** Hardcoded Products page tab labels and Sanity field keys (not CMS-editable). */

export const PRODUCT_TABS = [
  { id: 'floor-stand', field: 'floorStand', label: 'Floor Stand' },
  { id: 'counter', field: 'counter', label: 'Counter' },
  { id: 'shelf-organizer', field: 'shelfOrganizer', label: 'Shelf Organizer' },
  { id: 'bus-stop-frame', field: 'busStopFrame', label: 'Bus Stop – Frame' },
  { id: 'cross-merch', field: 'crossMerch', label: 'Cross Merch' },
  { id: 'tester-glorifier', field: 'testerGlorifier', label: 'Tester – Glorifier' },
  { id: 'eco', field: 'eco', label: 'Eco' },
] as const;

export type ProductTabField = (typeof PRODUCT_TABS)[number]['field'];
