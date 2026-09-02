import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yassi0022.github.io',
  base: '/portfolio',
  output: 'static',
  integrations: [react(), tailwind()],
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});