import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(), react()],
  server: {
    port: 3005,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api', // เปลี่ยนเป็น URL ของเซิร์ฟเวอร์ Express ของคุณ
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
