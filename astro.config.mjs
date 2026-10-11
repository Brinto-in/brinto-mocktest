import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const target = process.env.DEPLOY_TARGET || process.env.ADAPTER || '';
const isCloudflare = process.env.CF_PAGES === '1' || target === 'cloudflare';

export default defineConfig({
  site: 'https://www.brinto.in',
  base: '/mocktest',
  integrations: [sitemap()],
  compressHTML: true,
  output: 'server',
  adapter: isCloudflare ? cloudflare() : vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
