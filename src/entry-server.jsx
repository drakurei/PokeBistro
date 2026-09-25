import { StrictMode } from 'react'
import { StaticRouter } from 'react-router'
import App, { preloadPages } from './App.jsx'

export { allRoutes, getPageMeta, headTags, sitemapEntries } from './seo/pageMeta'

// Used only at build time by scripts/prerender.mjs: renders one route to static HTML.
// The same <App> and the same basename as main.jsx, so the markup hydrates without a difference.
// The location carries the base path ("/PokeBistro/menu" on GitHub Pages), as the browser would.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export async function render(url) {
  const { prerenderToNodeStream } = await import('react-dom/static')
  await preloadPages()
  // Fizz normally "outlines" any Suspense boundary larger than progressiveChunkSize (12.8 kB) and
  // swaps it in with an inline script. A static page wants everything inline: raise the threshold.
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={`${basename}${url}`} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
    { progressiveChunkSize: 1 << 30 },
  )
  return new Promise((resolve, reject) => {
    let html = ''
    prelude.on('data', (chunk) => {
      html += chunk
    })
    prelude.on('end', () => resolve(html))
    prelude.on('error', reject)
  })
}
