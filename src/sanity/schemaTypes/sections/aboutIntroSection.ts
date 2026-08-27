/**
 * About page intro: body copy, highlight stats with Phosphor icons, and CTA label.
 * Icon colors and button href stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutIntroSection = defineType({
  name: 'aboutIntroSection',
  title: 'About Intro',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 12,
      description: 'Separate paragraphs with a blank line.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          title: 'Highlight',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon class',
              type: 'string',
              description: 'Phosphor class, e.g. "ph-fill ph-circle"',
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
    defineField({
      name: 'ctaLabel',
      title: 'Button text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'ctaLabel' },
    prepare({ title }) {
      return {
        title: 'About Intro',
        subtitle: title ? `CTA: ${title}` : 'About intro section',
      };
    },
  },
});
