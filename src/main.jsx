import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles: Bootstrap + Tailwind + brand theme (see src/styles/globals.css)
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
