/**
 * Studio desk structure: Home page singleton.
 */
import type { StructureResolver } from 'sanity/structure';

const HOME_ID = 'home';

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
    ]);
