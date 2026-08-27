/**
 * Studio desk structure: pages group with Home singleton nested under Pages.
 */
import type { StructureResolver } from 'sanity/structure';

const HOME_ID = 'home';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
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
              S.divider(),
              S.documentTypeListItem('page').title('All pages'),
            ]),
        ),
    ]);
