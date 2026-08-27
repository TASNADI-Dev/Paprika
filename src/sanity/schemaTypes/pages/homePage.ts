/**
 * Home page singleton: reorderable sections only.
 * Document title and SEO meta stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'servicesSection' }),
        defineArrayMember({ type: 'ecoSection' }),
      ],

      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home' };
    },
  },
});
