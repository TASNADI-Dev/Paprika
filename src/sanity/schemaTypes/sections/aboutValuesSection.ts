/**
 * About page values section: headline, intro, and reorderable value items
 * with Phosphor icon class, title, and description. Size and color stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutValuesSection = defineType({
  name: 'aboutValuesSection',
  title: 'About Values',
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
      title: 'Intro',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          title: 'Value',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon class',
              type: 'string',
              description: 'Phosphor class, e.g. "ph ph-seal-check"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return {
        title: title || 'About Values',
        subtitle: 'Values section',
      };
    },
  },
});
