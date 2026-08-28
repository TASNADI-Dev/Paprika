/**
 * Products page singleton: fixed category slots (labels/count code-owned).
 * Editors can change each category's description and images only.
 */
import { defineField, defineType } from 'sanity';

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products',
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
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Products',
        subtitle: language?.toUpperCase() || 'EN',
      };
    },
  },
});
