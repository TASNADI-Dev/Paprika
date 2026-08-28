/**
 * Site-wide footer singleton: editable slogan and contact details only.
 * Logo, legal links, and social icons stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import { getLocaleSubtitle, languageField } from '../objects/languageField';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'text',
      rows: 2,
      description: 'Shown under the logo in the site footer.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactItems',
      title: 'Contact details',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactItem',
          title: 'Contact item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon class',
              type: 'string',
              description: 'Phosphor class, e.g. "ph ph-map-pin"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'url',
              description: 'Supports https, tel:, and mailto: links.',
              validation: (rule) =>
                rule.uri({
                  allowRelative: false,
                  scheme: ['http', 'https', 'tel', 'mailto'],
                }),
            }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'icon' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { language: 'language', id: '_id' },
    prepare({ language, id }) {
      return {
        title: 'Footer',
        subtitle: getLocaleSubtitle(language, id),
      };
    },
  },
});
