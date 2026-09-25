// The brand loader plays once per browser session. Decided at module load so the hero can
// schedule its own intro right after it (see LOADER_DURATION).
const KEY = 'pokebistro:loaded'

function readFlag() {
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function markLoaded() {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    // no session storage: the loader will simply play again next time
  }
}

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const showLoader = typeof window !== 'undefined' && !readFlag() && !prefersReducedMotion

// Seconds before the page underneath is fully revealed
export const LOADER_DURATION = showLoader ? 1.35 : 0
