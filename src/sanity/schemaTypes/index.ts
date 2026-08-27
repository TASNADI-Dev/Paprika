/**
 * Sanity schema type registry. Add page section types here so editors can
 * compose and reorder page content in Studio.
 */
import { aboutPage } from './pages/aboutPage';
import { homePage } from './pages/homePage';
import { aboutHeroSection } from './sections/aboutHeroSection';
import { aboutIntroSection } from './sections/aboutIntroSection';
import { ecoSection } from './sections/ecoSection';
import { heroSection } from './sections/heroSection';
import { quoteSection } from './sections/quoteSection';
import { servicesSection } from './sections/servicesSection';
import { supportSection } from './sections/supportSection';
import { footer } from './singletons/footer';

export const schemaTypes = [
  homePage,
  aboutPage,
  footer,
  aboutHeroSection,
  aboutIntroSection,
  ecoSection,
  heroSection,
  quoteSection,
  servicesSection,
  supportSection,
];
