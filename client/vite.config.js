import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': "http://localhost:4000",
      '/client/uploads/': "http://localhost:4000",
    }
  }
})
