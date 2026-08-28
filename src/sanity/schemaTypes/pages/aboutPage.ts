/**
 * About page singleton: reorderable sections only.
 * Document title and SEO meta stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import { getLocaleSubtitle, languageField } from '../objects/languageField';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'aboutHeroSection' }),
        defineArrayMember({ type: 'aboutIntroSection' }),
        defineArrayMember({ type: 'aboutValuesSection' }),
      ],
      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    select: { language: 'language', id: '_id' },
    prepare({ language, id }) {
      return {
        title: 'About',
        subtitle: getLocaleSubtitle(language, id),
      };
    },
  },
});
