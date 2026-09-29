import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tyrion.uk',
  // Internal links and canonical URLs have no trailing slash; keep the sitemap consistent.
  integrations: [sitemap({ serialize: (item) => ({ ...item, url: item.url.replace(/(?<=.)\/$/, '') }) })],
  build: {
    // The CSS is small, so inline it into each page instead of making the
    // browser wait on separate render-blocking stylesheet requests.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep font files as separate (cacheable) files rather than base64-inlining
      // the small subsets into the CSS.
      assetsInlineLimit: (filePath) => (filePath.endsWith('.woff2') ? false : undefined),
    },
  },
});
