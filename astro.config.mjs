import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.brinto.in',
  base: '/mocktest',
  output: 'server',
  security: {
    checkOrigin: false,
  },
  adapter: cloudflare({
    imageService: 'compile',
  }),
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
