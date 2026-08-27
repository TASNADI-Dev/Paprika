/**
 * Quote / contact section: editable headline, body, and contact info.
 * Form markup and blue panel styling stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Request a Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'companyName',
          title: 'Company name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Contact items',
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return {
        title: title || 'Request a Quote',
        subtitle: 'Quote section',
      };
    },
  },
});
