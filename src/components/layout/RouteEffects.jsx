import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from '../../lib/motion'

// On every page change: scroll to the top, move the focus to the main region (screen readers announce
// the new page) and let ScrollTrigger measure the new layout. Opening a product in a dialog keeps
// the menu behind it, so it is not treated as a page change.
export default function RouteEffects() {
  const location = useLocation()
  const lenis = useLenis()
  const previousPath = useRef(location.pathname)

  const isDialogRoute = Boolean(location.state?.background)

  useEffect(() => {
    if (isDialogRoute) return
    const pathChanged = previousPath.current !== location.pathname
    previousPath.current = location.pathname
    if (!pathChanged) return

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'instant' })

    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, isDialogRoute, lenis])

  return null
}
