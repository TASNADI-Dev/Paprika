/**
 * Studio desk structure: site-wide singletons (Home, About, Products, Privacy, Footer).
 */
import type { StructureResolver } from 'sanity/structure';

const HOME_ID = 'home';
const ABOUT_ID = 'about';
const PRODUCTS_ID = 'products';
const PRIVACY_ID = 'privacy';
const FOOTER_ID = 'footer';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .id(HOME_ID)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId(HOME_ID)
            .title('Home'),
        ),
      S.listItem()
        .title('About')
        .id(ABOUT_ID)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId(ABOUT_ID)
            .title('About'),
        ),
      S.listItem()
        .title('Products')
        .id(PRODUCTS_ID)
        .child(
          S.document()
            .schemaType('productsPage')
            .documentId(PRODUCTS_ID)
            .title('Products'),
        ),
      S.listItem()
        .title('Privacy Policy')
        .id(PRIVACY_ID)
        .child(
          S.document()
            .schemaType('privacyPage')
            .documentId(PRIVACY_ID)
            .title('Privacy Policy'),
        ),
      S.listItem()
        .title('Footer')
        .id(FOOTER_ID)
        .child(
          S.document()
            .schemaType('footer')
            .documentId(FOOTER_ID)
            .title('Footer'),
        ),
    ]);
