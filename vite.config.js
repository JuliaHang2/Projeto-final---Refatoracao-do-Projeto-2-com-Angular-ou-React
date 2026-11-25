import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' faz o build funcionar em qualquer hospedagem
// (GitHub Pages em subpasta, Netlify, Vercel...).
export default defineConfig({
  base: './',
  plugins: [react()],
});
