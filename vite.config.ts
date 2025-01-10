import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Shortcut for 'src' directory
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'], // Automatically resolve these extensions
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002', // Your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix when forwarding the request
      },
    },
  },
})
