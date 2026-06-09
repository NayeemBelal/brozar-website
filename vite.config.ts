import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for client-side routing — serves index.html for all routes.
  // For production, configure your host (Vercel/Netlify) with a rewrite rule: /* → /index.html
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
})
