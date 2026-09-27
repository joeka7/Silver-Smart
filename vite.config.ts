import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // `npm run dev:api` serves the contact endpoint on :3001. Proxying keeps the
    // request same-origin, exactly as it is in production on Railway. The object
    // form keeps the Host header (the string shorthand rewrites it), which the
    // endpoint's same-origin check compares against Origin.
    proxy: { '/api': { target: 'http://localhost:3001' } },
  },
})
