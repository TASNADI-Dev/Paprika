// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const env = {
  ...loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), ''),
  ...process.env,
};

const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://tasnadi-dev.github.io',
  base: '/Paprika',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle Studio deps so Vite doesn't re-optimize mid-session
    // (which causes 504 "Outdated Optimize Dep" during image uploads).
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-is',
        'styled-components',
        'sanity',
        '@sanity/client',
      ],
    },
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
