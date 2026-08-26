// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

const projectId = PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = PUBLIC_SANITY_DATASET || 'production';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-03-01',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
});
