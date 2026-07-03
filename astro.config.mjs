import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // 'hybrid' keeps your main portfolio pages blazing fast and static,
  // but allows your admin API routes to run on a live server!
  output: 'hybrid', 
  adapter: vercel(),
});