/**
 * Home page singleton: reorderable sections only.
 * Document title and SEO meta stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import { getLocaleSubtitle, languageField } from '../objects/languageField';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    languageField,
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
    select: { language: 'language', id: '_id' },
    prepare({ language, id }) {
      return {
        title: 'Home',
        subtitle: getLocaleSubtitle(language, id),
      };
    },
  },
});
