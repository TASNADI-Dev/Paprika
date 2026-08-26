/**
 * Page document with an ordered array of sections editable in Sanity.
 */
import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'heroSection' }],
      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
