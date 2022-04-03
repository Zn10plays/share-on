import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6942,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket': {
        target: 'ws://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
        ws: true,
      },
    }
  }
})
