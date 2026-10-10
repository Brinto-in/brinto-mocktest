import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const target = process.env.DEPLOY_TARGET || process.env.ADAPTER || 'vercel';

export default defineConfig({
  site: 'https://www.brinto.in',
  base: '/mocktest',
  integrations: [sitemap()],
  compressHTML: true,
  output: 'server',
  adapter: target === 'cloudflare' ? cloudflare() : vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
