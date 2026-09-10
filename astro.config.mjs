import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build
export default defineConfig({
  site: 'https://leonardobringashello-oss.github.io',
  base: '/chatgpt-images-2.5/',
  vite: {
    plugins: [tailwindcss()]
  }
});
