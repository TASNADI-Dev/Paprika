/**
 * Products page singleton: fixed category slots (labels/count code-owned).
 * Editors can change each category's description and images only.
 */
import { defineField, defineType } from 'sanity';
import { getLocaleSubtitle, languageField } from '../objects/languageField';

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'floorStand',
      title: 'Floor Stand',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'counter',
      title: 'Counter',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shelfOrganizer',
      title: 'Shelf Organizer',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'busStopFrame',
      title: 'Bus Stop – Frame',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'crossMerch',
      title: 'Cross Merch',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testerGlorifier',
      title: 'Tester – Glorifier',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eco',
      title: 'Eco',
      type: 'productCategory',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { language: 'language', id: '_id' },
    prepare({ language, id }) {
      return {
        title: 'Products',
        subtitle: getLocaleSubtitle(language, id),
      };
    },
  },
});
