/**
 * Sanity schema type registry. Add page section types here so editors can
 * compose and reorder page content in Studio.
 */
import { homePage } from './pages/homePage';
import { ecoSection } from './sections/ecoSection';
import { heroSection } from './sections/heroSection';
import { quoteSection } from './sections/quoteSection';
import { servicesSection } from './sections/servicesSection';
import { supportSection } from './sections/supportSection';

export const schemaTypes = [
  homePage,
  ecoSection,
  heroSection,
  quoteSection,
  servicesSection,
  supportSection,
];
