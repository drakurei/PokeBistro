import { useEffect, useRef } from 'react'
import cn from '../../utils/cn'

// The signature line: a 2px rule with the Poké Ball button in the middle.
// `light` inverts the colours for dark surfaces.
export default function Belt({ light = false, className }) {
  return <div aria-hidden="true" className={cn('belt', light && 'belt-light', className)} />
}

// A belt whose line is a slow marquee of words (used under the hero).
// The animation only runs while the band is on screen.
export function BeltMarquee({ items, light = false, className }) {
  const track = [...items, ...items]
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      element.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'group relative flex overflow-hidden border-y-2 py-3 select-none',
        light ? 'border-porcelain text-porcelain' : 'border-ink text-ink',
        className,
      )}
    >
      <div
        ref={ref}
        className="flex w-max shrink-0 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
      >
        {track.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-6 pr-6 font-mono text-xs tracking-[0.18em] uppercase"
          >
            {item}
            <span className={cn('size-2 rounded-full', light ? 'bg-porcelain' : 'bg-lacquer')} />
          </span>
        ))}
      </div>
    </div>
  )
}
