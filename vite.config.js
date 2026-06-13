import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/astrology-numerology-site/",
  plugins: [react()],
  server: {
    proxy: {
      "/api/vedika": {
        target: "https://api.vedika.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vedika/, "/sandbox"),
      },
    },
  },
})
