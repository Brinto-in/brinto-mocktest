import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import cloudflare from '@astrojs/cloudflare';

const target = process.env.DEPLOY_TARGET || process.env.ADAPTER || 'vercel';

export default defineConfig({
  site: 'https://www.brinto.in',
  base: '/mocktest',
  compressHTML: true,
  output: 'server',
  adapter: target === 'cloudflare' ? cloudflare() : vercel(),
});
