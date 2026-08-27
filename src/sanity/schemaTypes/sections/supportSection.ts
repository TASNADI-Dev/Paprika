/**
 * Demján Sándor Program attribution block.
 * Content and logos are code-owned; this type exists only so editors can reorder it.
 */
import { defineField, defineType } from 'sanity';

export const supportSection = defineType({
  name: 'supportSection',
  title: 'Program Support',
  type: 'object',
  fields: [
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      readOnly: true,
      initialValue:
        'This section is managed in code. You can reorder it, but cannot edit its content.',
      description:
        'Attribution copy and logos are hardcoded. Drag this block in the sections list to change its position.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Program Support',
        subtitle: 'Demján Sándor Program',
      };
    },
  },
});
