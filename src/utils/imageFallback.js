import pokeball from '../assets/pokeball.svg'

// Shown when a remote image (PokeAPI) cannot be loaded.
// The SVG is imported (not read from /public) so that Vite rewrites its URL
// when the site is deployed in a sub-folder (GitHub Pages).
export const FALLBACK_IMAGE = pokeball

// To use as onError={handleImageError} on an <img>
export function handleImageError(event) {
  // Avoid an infinite loop if the fallback itself fails
  event.currentTarget.onerror = null
  event.currentTarget.src = FALLBACK_IMAGE
}
