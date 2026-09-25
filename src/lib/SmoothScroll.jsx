import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from './motion'
import { useReducedMotion } from '../hooks/useMediaQuery'

// Drives Lenis from the GSAP ticker so ScrollTrigger and the smooth scroll share one clock.
function LenisTicker() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return null
}

// Smooth scroll on wheel only (touch stays native), disabled when the user asks for less motion.
export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return children

  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 0.9, autoRaf: false, anchors: true }}>
      <LenisTicker />
      {children}
    </ReactLenis>
  )
}
