/**
 * Sanity schema type registry. Add page section types here so editors can
 * compose and reorder page content in Studio.
 */
import { homePage } from './pages/homePage';
import { page } from './pages/page';
import { heroSection } from './sections/heroSection';
import { servicesSection } from './sections/servicesSection';

export const schemaTypes = [homePage, page, heroSection, servicesSection];
