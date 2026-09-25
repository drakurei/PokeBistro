// Static pre-rendering for GitHub Pages (and any static host).
//
// After `vite build`, this script builds a small server bundle of the app, renders every route with
// React, and writes the result as dist/<route>/index.html: the home page, the carte, the 44 dishes,
// the 8 formules and the secondary pages all exist as real HTML files with their own <title>,
// description, canonical URL, social card and JSON-LD. The client then hydrates instead of
// rendering from scratch. It also writes the sitemap.
//
// Usage: node scripts/prerender.mjs [--mode pages]

import { build } from 'vite'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { removeDir } from './lib/remove.mjs'

const args = process.argv.slice(2)
const mode = args.includes('--mode') ? args[args.indexOf('--mode') + 1] : 'production'
const root = process.cwd()
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html not found: run `vite build` first.')
  process.exit(1)
}

// 1. Server bundle (its emitted assets share the content hashes of the client build, so the URLs match)
removeDir(ssrDir)
await build({
  mode,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
  },
})
const { render, allRoutes, getPageMeta, headTags, sitemapEntries } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
)

// 2. Template: the built index.html, minus the tags that each page brings itself
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const shell = template
  .replace(/\s*<title>[^<]*<\/title>/, '')
  .replace(/\s*<meta\s+name="description"[\s\S]*?\/?>/, '')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')

function serializeHead(meta) {
  return headTags(meta)
    .map(([tag, attrs, text]) => {
      const attributes = Object.entries(attrs)
        .map(([key, value]) => ` ${key}="${escapeAttr(value)}"`)
        .join('')
      return tag === 'title' ? `<title>${escapeText(text)}</title>` : `<${tag}${attributes}>`
    })
    .join('\n    ')
}

// React emits the hoistable head tags of a fragment render at the start of the output: they are
// moved to <head>, the rest is the app markup.
function splitRendered(html) {
  const match = html.match(/^((?:<(?:title|meta|link)\b[^>]*>(?:[^<]*<\/title>)?)*)/)
  const hoisted = match ? match[1] : ''
  return { hoisted, app: html.slice(hoisted.length) }
}

// 3. The application shell, for addresses that are not pre-rendered (404 on GitHub Pages, SPA
// fallback on Vercel / Netlify and in `vite preview`): the original template, static tags included
writeFileSync(join(dist, '404.html'), template)

// 4. Every route
let written = 0
for (const route of allRoutes) {
  const meta = getPageMeta(route)
  const rendered = await render(route)
  const { hoisted, app } = splitRendered(rendered)
  const jsonLd = meta.jsonLd
    .map(
      (data) =>
        `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n    ')
  const head = [hoisted || serializeHead(meta), jsonLd].filter(Boolean).join('\n    ')
  const page = shell
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  if (!app.includes('<h1')) throw new Error(`No <h1> rendered for ${route}`)
  if (/<template id="B:|\$RC=/.test(app)) {
    writeFileSync(join(ssrDir, 'failed.html'), app)
    throw new Error(`Suspense placeholder left in ${route} (see dist-ssr/failed.html)`)
  }
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
  written += 1
}

// 5. Sitemap (lastmod = build date: the catalogue is data, it changes with every release)
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries()
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

// 6. Clean up the server bundle
removeDir(ssrDir)

console.log(`Pre-rendered ${written} routes, sitemap with ${sitemapEntries().length} URLs (mode: ${mode}).`)
