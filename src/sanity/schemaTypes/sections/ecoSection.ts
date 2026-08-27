/**
 * Eco section block: editable headline, multi-paragraph body, and image.
 * Background color stays code-owned via CSS variable.
 */
import { defineField, defineType } from 'sanity';

export const ecoSection = defineType({
  name: 'ecoSection',
  title: 'Eco',
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
      rows: 12,
      description: 'Separate paragraphs with a blank line.',
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Eco', subtitle: 'Eco section', media };
    },
  },
});
