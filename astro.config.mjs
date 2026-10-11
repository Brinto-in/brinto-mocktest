import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const target = process.env.DEPLOY_TARGET || process.env.ADAPTER || '';
const isVercel = target === 'vercel';

export default defineConfig({
  site: 'https://www.brinto.in',
  base: '/mocktest',
  integrations: [sitemap()],
  compressHTML: true,
  output: 'server',
  adapter: isVercel
    ? vercel()
    : cloudflare({
        imageService: 'passthrough',
      }),
  build: {
    inlineStylesheets: 'auto',
  },
});
