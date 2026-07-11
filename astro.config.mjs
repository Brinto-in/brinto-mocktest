import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: 'https://mocktest.brinto.in',
  compressHTML: true,
  output: 'server',
  adapter: vercel(),
});
