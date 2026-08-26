/**
 * Hero section block: editable headline, body, CTA, and image with alt text.
 */
import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
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
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Hero', subtitle: 'Hero section', media };
    },
  },
});
