import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  base: '/',
  build: {
    chunkSizeWarningLimit: 700, // Default is 500
  },

  
})

