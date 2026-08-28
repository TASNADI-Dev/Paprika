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
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'en',
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
        defineArrayMember({ type: 'supportSection' }),
      ],


      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Home',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
