// The brand loader plays once per browser session and never with reduced motion.
// The decision is taken here, at module load, so the hero can schedule its own intro right after it.
// The pre-rendered HTML always contains the loader; an inline script in index.html hides it before
// the first paint when this session has already seen it (see html[data-loader]).
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

// Seconds before the page underneath is fully revealed (the veil lifts at the end of this)
export const LOADER_DURATION = showLoader ? 0.9 : 0
