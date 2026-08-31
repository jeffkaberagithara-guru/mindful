import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (
              id.includes('react-router') ||
              id.includes('react-dom') ||
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'vendor-react';
            }
          }
          return undefined;
        },
      },
    },
  },
})