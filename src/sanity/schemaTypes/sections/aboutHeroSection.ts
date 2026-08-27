/**
 * About page hero: editable headline, body, and background image.
 * Overlay styling stays code-owned.
 */
import { defineField, defineType } from 'sanity';

export const aboutHeroSection = defineType({
  name: 'aboutHeroSection',
  title: 'About Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Title',
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
      name: 'image',
      title: 'Background image',
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
      return { title: title || 'About Hero', subtitle: 'About hero section', media };
    },
  },
});
