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
  // Astro sessions aren't used (login lives in localStorage). Without this the Cloudflare adapter
  // adds a SESSION KV binding with no namespace id, which `wrangler preview` rejects.
  session: false,
  adapter: cloudflare({
    imageService: 'compile',
  }),
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
