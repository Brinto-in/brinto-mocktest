import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

export default defineConfig({
  site: 'https://mocktest.brinto.in',
  compressHTML: true,
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
});
