import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [svelte()]
});