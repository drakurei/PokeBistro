import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { types } from '../../data/types'
import products from '../../data/products'
import cn from '../../utils/cn'
import { IconArrowUpRight } from '../ui/Icons'
import Reveal from '../motion/Reveal'

// "Choisissez votre type": eight tiles, one per Pokémon type. Hovering a tile tints the whole section,
// clicking opens the menu already filtered on that type.
export default function TypesSection() {
  const [ambient, setAmbient] = useState(null)
  const section = useRef(null)

  return (
    <section
      ref={section}
      aria-labelledby="types-title"
      className="relative py-section transition-[background-color] duration-700 ease-(--ease-out)"
      style={{
        backgroundColor: ambient ? `color-mix(in oklab, ${ambient} 12%, var(--color-porcelain))` : undefined,
      }}
    >
      <div className="container-pb">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Choisissez votre type</p>
          <h2 id="types-title" className="mt-4 font-display text-display-lg text-balance">
            Huit types, huit façons de manger.
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Chaque plat de la carte appartient à un type. Feu pour ce qui pique, Eau pour ce qui vient de la
            mer, Fée pour ce qui finit le repas en douceur.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" onMouseLeave={() => setAmbient(null)}>
          {types.map((type, index) => {
            const count = products.filter((product) => product.type === type.id).length
            return (
              <Reveal as="li" key={type.id} delay={index * 0.05}>
                <Link
                  to={`/menu?type=${type.id}`}
                  aria-label={`Type ${type.label}, voir les ${count} plats`}
                  onMouseEnter={() => setAmbient(type.color)}
                  onFocus={() => setAmbient(type.color)}
                  onBlur={() => setAmbient(null)}
                  className={cn(
                    'group flex h-full flex-col justify-between gap-8 rounded-(--radius-md) border border-line bg-porcelain p-5 no-underline',
                    'transition-[border-color,background-color] duration-(--duration-base) ease-(--ease-out) hover:border-transparent',
                  )}
                  style={{ '--type': type.color }}
                  onMouseOver={(event) =>
                    (event.currentTarget.style.backgroundColor = `color-mix(in oklab, ${type.color} 22%, var(--color-porcelain))`)
                  }
                  onMouseOut={(event) => (event.currentTarget.style.backgroundColor = '')}
                >
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className="size-12 rounded-full transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-125"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="font-mono text-xs text-ink-mute">{count} plats</span>
                  </div>
                  <div>
                    <span className="flex items-center justify-between font-display text-display-sm">
                      {type.label}
                      <IconArrowUpRight
                        size={20}
                        className="text-ink-mute transition-colors group-hover:text-ink"
                      />
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{type.promise}</span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
