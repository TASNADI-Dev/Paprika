/**
 * About page singleton: reorderable sections only.
 * Document title and SEO meta stay code-owned.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
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
        defineArrayMember({ type: 'aboutHeroSection' }),
        defineArrayMember({ type: 'aboutIntroSection' }),
        defineArrayMember({ type: 'aboutValuesSection' }),
      ],
      description: 'Drag to reorder page sections.',
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'About',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
