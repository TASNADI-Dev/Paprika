/**
 * Seeds French Sanity singletons (home-fr, about-fr, etc.) from EN documents and fr.json.
 * Run: npx sanity exec scripts/seed-french-sanity.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli';
import fr from '../src/i18n/fr.json' with { type: 'json' };

const PRODUCT_KEYS = [
  'floorStand',
  'counter',
  'shelfOrganizer',
  'busStopFrame',
  'crossMerch',
  'testerGlorifier',
  'eco',
];

const SERVICE_KEYS = ['multimaterial', 'bespoke', 'eco', 'technology'];
const HIGHLIGHT_KEYS = ['experience', 'execution', 'export'];
const VALUE_KEYS = ['quality', 'flexibility', 'precision', 'partnership'];

function buildHomeFr(enHome) {
  const enSections = enHome?.sections ?? [];
  const enHero = enSections.find((s) => s._type === 'heroSection');
  const enServices = enSections.find((s) => s._type === 'servicesSection');
  const enEco = enSections.find((s) => s._type === 'ecoSection');
  const enQuote = enSections.find((s) => s._type === 'quoteSection');
  const enSupport = enSections.find((s) => s._type === 'supportSection');

  return {
    _id: 'home-fr',
    _type: 'homePage',
    language: 'fr',
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        headline: fr.hero.headline,
        body: fr.hero.body,
        ctaLabel: fr.hero.ctaLabel,
        image: {
          _type: 'image',
          alt: fr.hero.imageAlt,
          asset: enHero?.image?.asset,
        },
      },
      {
        _key: 'services',
        _type: 'servicesSection',
        headline: fr.services.headline,
        body: fr.services.body,
        services: SERVICE_KEYS.map((key) => {
          const enService = enServices?.services?.find((s) => s._key === key);
          const frService = fr.services.items[key];
          return {
            _key: key,
            _type: 'service',
            title: frService.title,
            body: frService.body,
            icon: enService?.icon,
          };
        }),
      },
      {
        _key: 'eco',
        _type: 'ecoSection',
        headline: fr.eco.headline,
        body: fr.eco.body,
        image: {
          _type: 'image',
          alt: fr.eco.imageAlt,
          asset: enEco?.image?.asset,
        },
      },
      {
        _key: 'quote',
        _type: 'quoteSection',
        headline: fr.quote.headline,
        body: fr.quote.body,
        contactInfo: {
          title: fr.quote.contactTitle,
          companyName: fr.quote.companyName,
          items: enQuote?.contactInfo?.items,
        },
      },
      {
        _key: 'support',
        _type: 'supportSection',
        note: enSupport?.note,
      },
    ],
  };
}

function buildAboutFr(enAbout) {
  const enSections = enAbout?.sections ?? [];
  const enHero = enSections.find((s) => s._type === 'aboutHeroSection');
  const enIntro = enSections.find((s) => s._type === 'aboutIntroSection');
  const enValues = enSections.find((s) => s._type === 'aboutValuesSection');

  return {
    _id: 'about-fr',
    _type: 'aboutPage',
    language: 'fr',
    sections: [
      {
        _key: 'aboutHero1',
        _type: 'aboutHeroSection',
        headline: fr.aboutHero.headline,
        body: fr.aboutHero.body,
        image: {
          _type: 'image',
          alt: fr.aboutHero.imageAlt,
          asset: enHero?.image?.asset,
        },
      },
      {
        _key: 'aboutIntro1',
        _type: 'aboutIntroSection',
        body: fr.aboutIntro.body,
        ctaLabel: fr.aboutIntro.ctaLabel,
        highlights: HIGHLIGHT_KEYS.map((key) => {
          const enHighlight = enIntro?.highlights?.find((h) => h._key === key);
          const frHighlight = fr.aboutIntro.highlights[key];
          return {
            _key: key,
            _type: 'highlight',
            title: frHighlight.title,
            body: frHighlight.body,
            icon: enHighlight?.icon,
          };
        }),
      },
      {
        _key: 'aboutValues1',
        _type: 'aboutValuesSection',
        headline: fr.aboutValues.headline,
        body: fr.aboutValues.body,
        values: VALUE_KEYS.map((key) => {
          const enValue = enValues?.values?.find((v) => v._key === key);
          const frValue = fr.aboutValues.items[key];
          return {
            _key: key,
            _type: 'value',
            title: frValue.title,
            body: frValue.body,
            icon: enValue?.icon,
          };
        }),
      },
    ],
  };
}

function buildProductsFr(enProducts) {
  const doc = {
    _id: 'products-fr',
    _type: 'productsPage',
    language: 'fr',
  };

  for (const key of PRODUCT_KEYS) {
    doc[key] = {
      _type: 'productCategory',
      body: fr.products.bodies[key],
      images: enProducts?.[key]?.images,
    };
  }

  return doc;
}

function buildPrivacyFr(enPrivacy) {
  return {
    _id: 'privacy-fr',
    _type: 'privacyPage',
    language: 'fr',
    title: fr.meta.privacy.fallbackTitle,
    body: enPrivacy?.body,
  };
}

function buildFooterFr(enFooter) {
  return {
    _id: 'footer-fr',
    _type: 'footer',
    language: 'fr',
    slogan: fr.footer.defaultSlogan,
    contactItems: enFooter?.contactItems,
  };
}

async function seedFrenchDocuments() {
  const client = getCliClient({ apiVersion: '2025-08-15' });

  const [enHome, enAbout, enProducts, enPrivacy, enFooter] = await Promise.all([
    client.fetch('*[_id == "home"][0]'),
    client.fetch('*[_id == "about"][0]'),
    client.fetch('*[_id == "products"][0]'),
    client.fetch('*[_id == "privacy"][0]'),
    client.fetch('*[_id == "footer"][0]'),
  ]);

  const frenchDocs = [
    buildHomeFr(enHome),
    buildAboutFr(enAbout),
    buildProductsFr(enProducts),
    buildPrivacyFr(enPrivacy),
    buildFooterFr(enFooter),
  ];

  for (const doc of frenchDocs) {
    await client.createOrReplace(doc);
    console.log(`Created/replaced ${doc._id}`);
  }

  const ids = frenchDocs.map((doc) => doc._id);
  const created = await client.fetch('*[_id in $ids]._id', { ids });
  console.log('Verified documents:', created);
}

seedFrenchDocuments().catch((error) => {
  console.error(error);
  process.exit(1);
});
