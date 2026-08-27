/**
 * Services section: headline, intro body, and reorderable service cards
 * with Phosphor icon class, title, and description.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services',
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
      rows: 4,
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon class',
              type: 'string',
              description: 'Phosphor class, e.g. "ph ph-package"',
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
              rows: 4,
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
      return { title: title || 'Services', subtitle: 'Services section' };
    },
  },
});
