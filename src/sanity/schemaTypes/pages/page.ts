/**
 * Generic page document with an ordered array of sections editable in Sanity.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

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
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'servicesSection' }),
        defineArrayMember({ type: 'ecoSection' }),
        defineArrayMember({ type: 'quoteSection' }),
      ],

      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
