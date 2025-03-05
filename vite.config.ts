import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'next-portfolio': resolve(__dirname, './lib/index.ts')
    }
  },
  optimizeDeps: {
    include: ['gsap/ScrollTrigger']
  },
  define: {
    'process.env': process.env
  }
})
