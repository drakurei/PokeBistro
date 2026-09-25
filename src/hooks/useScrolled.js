import { useEffect, useState } from 'react'

// true once the page is scrolled past `threshold` pixels (the header uses it to become opaque)
export default function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(() =>
    typeof window === 'undefined' ? false : window.scrollY > threshold,
  )

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
