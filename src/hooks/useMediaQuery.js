import { useSyncExternalStore } from 'react'

// Subscribes to a media query. Server-safe (returns `fallback` when window is missing).
export default function useMediaQuery(query, fallback = false) {
  const subscribe = (callback) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => fallback

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px) and (pointer: fine)')
}
