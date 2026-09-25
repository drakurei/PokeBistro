import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// `vite preview` serves the pre-rendered site the way a static host with clean URLs does
// (Vercel, Netlify): /menu/pikachu-bento -> dist/menu/pikachu-bento/index.html, and unknown
// addresses get the 404 shell, which then renders the app. GitHub Pages does the same with a
// redirect to the trailing-slash form.
function staticSiteInPreview() {
  return {
    name: 'static-site-in-preview',
    configurePreviewServer(server) {
      const dist = resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
        if (/\.[a-z0-9]+$/i.test(pathname)) return next()
        const page = join(dist, pathname.replace(/\/$/, ''), 'index.html')
        const html = existsSync(page) ? readFileSync(page) : null
        const shell = join(dist, '404.html')
        if (!html && !existsSync(shell)) return next()
        res.statusCode = html ? 200 : 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(html ?? readFileSync(shell))
      })
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
    plugins: [react(), tailwindcss(), staticSiteInPreview()],
    build: {
      // Dish images stay files (cacheable, lazy) even when tiny; icons and fonts follow the default
      assetsInlineLimit: (file) =>
        file.replace(/\\/g, '/').includes('/assets/products/') ? false : undefined,
      rollupOptions: {
        output: { manualChunks },
      },
    },
    test: {
      include: ['src/**/*.test.js'],
    },
  }
})
