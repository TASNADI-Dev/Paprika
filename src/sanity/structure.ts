/**
 * Studio desk structure: site-wide singletons (Home, Footer).
 */
import type { StructureResolver } from 'sanity/structure';

const HOME_ID = 'home';
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
        .title('Footer')
        .id(FOOTER_ID)
        .child(
          S.document()
            .schemaType('footer')
            .documentId(FOOTER_ID)
            .title('Footer'),
        ),
    ]);
