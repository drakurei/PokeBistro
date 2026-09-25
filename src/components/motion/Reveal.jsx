import { useRef } from 'react'
import { gsap, useGSAP, FULL } from '../../lib/motion'

// Reveals its content once, when it enters the viewport (opacity + 24px rise).
// With reduced motion the content is simply visible.
export default function Reveal({ as: Tag = 'div', delay = 0, y = 24, children, className, ...props }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
