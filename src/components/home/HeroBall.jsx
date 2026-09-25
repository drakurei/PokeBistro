import { Component, lazy, Suspense } from 'react'
import { useIsDesktop, useReducedMotion } from '../../hooks/useMediaQuery'
import cn from '../../utils/cn'

const PokeballCanvas = lazy(() => import('../../three/PokeballCanvas'))

// Probed once, the first time a hero asks for it
let webglSupport
function webglAvailable() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas')
      webglSupport = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      webglSupport = false
    }
  }
  return webglSupport
}

const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true

// If the 3D chunk fails to load or crashes, the SVG ball remains
class BallBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// Static Poké Ball, used on mobile, with reduced motion, without WebGL, and while the 3D chunk loads
export function PokeballSvg({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={cn('h-full w-full', className)} aria-hidden="true">
      <defs>
        <radialGradient id="ball-shine" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ball-shade" cx="50%" cy="50%" r="55%">
          <stop offset="70%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="var(--color-porcelain)" />
      <path d="M8 100a92 92 0 0 1 184 0Z" fill="var(--color-lacquer)" />
      <circle cx="100" cy="100" r="92" fill="url(#ball-shade)" />
      <circle cx="100" cy="100" r="92" fill="url(#ball-shine)" />
      <path d="M8 100h184" stroke="var(--color-ink)" strokeWidth="10" />
      <circle cx="100" cy="100" r="26" fill="var(--color-ink)" />
      <circle cx="100" cy="100" r="18" fill="var(--color-porcelain)" />
      <circle cx="100" cy="100" r="7" fill="var(--color-ink)" />
    </svg>
  )
}

export default function HeroBall({ className }) {
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  // The 3D chunk is only worth it on a desktop with a fine pointer, motion allowed, no data saver, WebGL available
  const enable3d = desktop && !reduced && !saveData && webglAvailable()

  return (
    <div className={cn('relative aspect-square', className)}>
      <div className={cn('absolute inset-0 motion-safe:animate-float', enable3d && 'hidden')}>
        <PokeballSvg />
      </div>
      {enable3d && (
        <BallBoundary>
          <Suspense fallback={null}>
            <PokeballCanvas />
          </Suspense>
        </BallBoundary>
      )}
    </div>
  )
}
