import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Changed to 'static' to match Astro 7+ standards. 
  // Your API files with `export const prerender = false;` will still run on the live server!
  output: 'static', 
  adapter: vercel(),
});