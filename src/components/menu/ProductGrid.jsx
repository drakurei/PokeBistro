import { useRef } from 'react'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import ProductCard from './ProductCard'
import EmptyResults from './EmptyResults'

// The filtered grid. Cards rise in with a small stagger when the grid mounts and when a filter
// changes (`animationKey`); typing in the search or sorting only re-renders, without motion.
export default function ProductGrid({ products, onReset, hasFilters, animationKey = '' }) {
  const grid = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.fromTo(
          '.grid-item',
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.out',
            overwrite: true,
            clearProps: 'transform',
          },
        )
      })
    },
    { scope: grid, dependencies: [animationKey] },
  )

  if (products.length === 0) return <EmptyResults onReset={onReset} hasFilters={hasFilters} />

  return (
    <ul ref={grid} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <li key={product.id} className="grid-item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
