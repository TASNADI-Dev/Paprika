import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  'placeholder';
const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

export default defineConfig({
  name: 'paprika',
  title: 'Paprika',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return [];
      }
      return prev;
    },
  },
});
