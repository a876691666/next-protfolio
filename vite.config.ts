import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const base = repoName ? `/${repoName}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_URL || base,
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
