import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: ['ai-business-agent-production.up.railway.app'],
  },
})