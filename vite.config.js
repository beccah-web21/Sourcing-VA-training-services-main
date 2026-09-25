import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward payment requests to the private payment server (server.js)
    proxy: { '/api': 'http://localhost:3001' },
  },
})
