import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    sourcemap: true, // Ensures source maps are generated during development
    sourcemapIgnoreList: () => true, // Ignores all source map warnings
  },
  build: {
    sourcemap: true, // Ensure source maps are generated
  },

})
