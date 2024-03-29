/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    setupFiles: ['fake-indexeddb/auto', './src/test/vitest.setup.ts'],
    environment: 'jsdom',
  },
})
