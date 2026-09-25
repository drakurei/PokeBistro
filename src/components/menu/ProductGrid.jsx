import { useRef } from 'react'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import ProductCard from './ProductCard'
import EmptyResults from './EmptyResults'

// The filtered grid. Cards rise in with a small stagger each time the result set changes.
export default function ProductGrid({ products, onReset, hasFilters }) {
  const grid = useRef(null)
  const key = products.map((product) => product.id).join('-')

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
    { scope: grid, dependencies: [key] },
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
