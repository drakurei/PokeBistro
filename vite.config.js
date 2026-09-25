import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// GitHub Pages serves a SPA from a sub-folder and has no rewrite rules:
// in "pages" mode we copy index.html to 404.html so deep links (/menu/pikachu-bento) still load the app.
function spaFallbackForPages(mode) {
  return {
    name: 'spa-fallback-for-pages',
    apply: 'build',
    closeBundle() {
      if (mode !== 'pages') return
      const dist = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// Heavy, rarely-changing libraries get their own long-cached chunks
function manualChunks(id) {
  const path = id.replace(/\\/g, '/')
  if (path.includes('/node_modules/three/')) return 'three'
  if (/\/node_modules\/(gsap|@gsap|lenis)\//.test(path)) return 'motion'
  return undefined
}

export default defineConfig(({ mode }) => {
  // VITE_BASE comes from .env.pages ("/PokeBistro/"); default "/" fits Vercel, Netlify and any root domain.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE || '/',
    plugins: [react(), tailwindcss(), spaFallbackForPages(mode)],
    build: {
      rollupOptions: {
        output: { manualChunks },
      },
    },
    test: {
      include: ['src/**/*.test.js'],
    },
  }
})
