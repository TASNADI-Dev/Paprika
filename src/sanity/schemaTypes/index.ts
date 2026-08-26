/**
 * Sanity schema type registry. Add page section types here so editors can
 * compose and reorder page content in Studio.
 */
import { page } from './page';
import { heroSection } from './sections/heroSection';

export const schemaTypes = [page, heroSection];
