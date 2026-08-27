/**
 * Shared product category block: editable body copy and image gallery.
 * Category labels stay code-owned on the Products page.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product category',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Description',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { body: 'body', media: 'images.0' },
    prepare({ body, media }) {
      return {
        title: body ? body.slice(0, 60) : 'Product category',
        media,
      };
    },
  },
});
