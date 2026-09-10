import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build
export default defineConfig({
  // Despliegue: GitHub Pages (project site en cuenta secundaria).
  // Si renombras el repo, cambia `base` por '/<nuevo-nombre>/'.
  site: 'https://leonardobringashello-oss.github.io',
  base: '/chatgpt-images-2.5/',
  vite: {
    plugins: [tailwindcss()]
  }
});
