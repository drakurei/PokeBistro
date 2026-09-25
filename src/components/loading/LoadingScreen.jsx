import { useRef, useState, useSyncExternalStore } from 'react'
import { gsap, useGSAP } from '../../lib/motion'
import { showLoader, markLoaded } from './loadingState'

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// The veil is in the server-rendered HTML (so first paint and hydration agree); once mounted, the
// client either plays it (first visit of the session) or drops it at once.
const subscribe = () => () => {}
const getSnapshot = () => showLoader
const getServerSnapshot = () => true

// Brand loader: the Poké Ball outline draws itself, the belt and button appear, the wordmark fades in,
// then the veil lifts, all under a second. The page is already rendered underneath, so nothing is
// blocked; a hard timeout guarantees the veil never stays.
export default function LoadingScreen() {
  const wanted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [done, setDone] = useState(false)
  const root = useRef(null)

  useGSAP(
    () => {
      if (!wanted) return
      const finish = () => {
        markLoaded()
        setDone(true)
      }
      const safety = setTimeout(finish, 1800)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish })
      tl.fromTo(
        '.loader-ring',
        { strokeDashoffset: CIRCUMFERENCE },
        { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' },
      )
        .fromTo('.loader-belt', { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, '-=0.1')
        .fromTo(
          '.loader-button',
          { scale: 0, transformOrigin: '50% 50%' },
          { scale: 1, duration: 0.15 },
          '-=0.05',
        )
        .fromTo('.loader-word', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1')
        .to(root.current, { yPercent: -100, duration: 0.4, ease: 'power4.inOut' }, '+=0.05')

      return () => clearTimeout(safety)
    },
    { scope: root, dependencies: [wanted] },
  )

  if (!wanted || done) return null

  return (
    <div
      ref={root}
      id="loader"
      role="status"
      aria-label="Chargement de PokéBistro"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-porcelain text-ink"
    >
      <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
        <circle
          className="loader-ring"
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          transform="rotate(-90 60 60)"
        />
        <path className="loader-belt origin-center" d="M16 60h88" stroke="currentColor" strokeWidth="3" />
        <g className="loader-button">
          <circle
            cx="60"
            cy="60"
            r="11"
            fill="var(--color-porcelain)"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="60" cy="60" r="4" fill="currentColor" />
        </g>
      </svg>
      <p className="loader-word font-display text-lg font-bold tracking-tight">PokéBistro</p>
    </div>
  )
}
