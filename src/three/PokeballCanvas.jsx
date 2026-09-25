import { useEffect, useRef, useState } from 'react'
import { createPokeball } from './pokeball'
import cn from '../utils/cn'

// Mounts the Three.js Poké Ball. Loaded lazily by HeroBall, only when the device qualifies.
export default function PokeballCanvas({ className }) {
  const container = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = container.current
    if (!element) return
    let dispose = () => {}
    try {
      dispose = createPokeball(element)
      // Let the first frame render before fading the canvas in
      const frame = requestAnimationFrame(() => setReady(true))
      return () => {
        cancelAnimationFrame(frame)
        dispose()
      }
    } catch {
      // WebGL context creation can still fail (blocked GPU, too many contexts): the SVG fallback stays visible
      return dispose
    }
  }, [])

  return (
    <div
      ref={container}
      className={cn(
        'absolute inset-0 transition-opacity duration-700 ease-(--ease-out)',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}
