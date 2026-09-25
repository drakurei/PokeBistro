import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// Self-hosted fonts (latin subsets only): display, text, mono
import '@fontsource-variable/unbounded'
import '@fontsource/zen-kaku-gothic-new/latin-400.css'
import '@fontsource/zen-kaku-gothic-new/latin-500.css'
import '@fontsource/zen-kaku-gothic-new/latin-700.css'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-500.css'

import './styles/globals.css'
import App from './App.jsx'

// BASE_URL is "/" locally and on Vercel/Netlify, "/PokeBistro/" on GitHub Pages (see .env.pages)
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pre-rendered pages (see scripts/prerender.mjs) already contain the markup: React attaches to it.
// The dev server and the 404 fallback start from an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
