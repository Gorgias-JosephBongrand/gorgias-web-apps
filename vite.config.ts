import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/embed.ts',
      name: 'GorgiasROI',
      fileName: () => 'embed.js',
      formats: ['iife'],
    },
    rollupOptions: {
      // Bundle everything — no externals for a self-contained embed script
    },
    cssCodeSplit: false,
  },
})
