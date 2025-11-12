import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Base URL для production
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Отключить sourcemap для production (улучшает производительность)
    rollupOptions: {
      output: {
        manualChunks: undefined, // Можно настроить code splitting при необходимости
      },
    },
  },
})
