/**
 * Studio desk structure: site-wide singletons with English and French documents.
 */
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const HOME_EN_ID = 'home';
export const HOME_FR_ID = 'home-fr';
export const ABOUT_EN_ID = 'about';
export const ABOUT_FR_ID = 'about-fr';
export const PRODUCTS_EN_ID = 'products';
export const PRODUCTS_FR_ID = 'products-fr';
export const PRIVACY_EN_ID = 'privacy';
export const PRIVACY_FR_ID = 'privacy-fr';
export const FOOTER_EN_ID = 'footer';
export const FOOTER_FR_ID = 'footer-fr';

type LocalizedSingletonConfig = {
  schemaType: string;
  title: string;
  listId: string;
  enId: string;
  frId: string;
};

function createLocalizedSingleton(
  S: StructureBuilder,
  { schemaType, title, listId, enId, frId }: LocalizedSingletonConfig,
) {
  return S.listItem()
    .title(title)
    .id(listId)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .title('English')
            .id(`${listId}-en`)
            .child(
              S.document()
                .schemaType(schemaType)
                .documentId(enId)
                .title(`${title} (English)`),
            ),
          S.listItem()
            .title('Français')
            .id(`${listId}-fr`)
            .child(
              S.document()
                .schemaType(schemaType)
                .documentId(frId)
                .title(`${title} (Français)`),
            ),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      createLocalizedSingleton(S, {
        schemaType: 'homePage',
        title: 'Home',
        listId: 'home',
        enId: HOME_EN_ID,
        frId: HOME_FR_ID,
      }),
      createLocalizedSingleton(S, {
        schemaType: 'aboutPage',
        title: 'About',
        listId: 'about',
        enId: ABOUT_EN_ID,
        frId: ABOUT_FR_ID,
      }),
      createLocalizedSingleton(S, {
        schemaType: 'productsPage',
        title: 'Products',
        listId: 'products',
        enId: PRODUCTS_EN_ID,
        frId: PRODUCTS_FR_ID,
      }),
      createLocalizedSingleton(S, {
        schemaType: 'privacyPage',
        title: 'Privacy Policy',
        listId: 'privacy',
        enId: PRIVACY_EN_ID,
        frId: PRIVACY_FR_ID,
      }),
      createLocalizedSingleton(S, {
        schemaType: 'footer',
        title: 'Footer',
        listId: 'footer',
        enId: FOOTER_EN_ID,
        frId: FOOTER_FR_ID,
      }),
    ]);
