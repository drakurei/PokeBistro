import { useState } from 'react'
import { Link } from 'react-router'
import { types } from '../../data/types'
import products from '../../data/products'
import { typesSection } from '../../data/content'
import cn from '../../utils/cn'
import { IconArrowRight, IconArrowUpRight } from '../ui/Icons'
import TypeIcon from '../ui/TypeIcon'
import Reveal from '../motion/Reveal'

const tileClass =
  'group flex h-full flex-col justify-between gap-8 rounded-(--radius-md) border border-line p-5 no-underline ' +
  'transition-[border-color,background-color] duration-(--duration-base) ease-(--ease-out)'

// "Choisissez votre type": one tile per Pokémon type plus the door to the whole carte.
// Hovering a tile tints it and the whole section (through a CSS variable, no DOM writes);
// clicking opens the menu already filtered on that type.
export default function TypesSection() {
  const [ambient, setAmbient] = useState(null)

  return (
    <section
      aria-labelledby="types-title"
      className="relative py-section transition-[background-color] duration-700 ease-(--ease-out)"
      style={{
        backgroundColor: ambient ? `color-mix(in oklab, ${ambient} 12%, var(--color-porcelain))` : undefined,
      }}
    >
      <div className="container-pb">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">{typesSection.eyebrow}</p>
          <h2 id="types-title" className="mt-4 font-display text-display-lg text-balance">
            {typesSection.title}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{typesSection.lead}</p>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" onMouseLeave={() => setAmbient(null)}>
          {types.map((type, index) => {
            const count = products.filter((product) => product.type === type.id).length
            return (
              <Reveal as="li" key={type.id} delay={(index % 4) * 0.05}>
                <Link
                  to={`/menu?type=${type.id}`}
                  aria-label={`Type ${type.label}, voir les ${count} plats`}
                  onMouseEnter={() => setAmbient(type.color)}
                  onFocus={() => setAmbient(type.color)}
                  onBlur={() => setAmbient(null)}
                  style={{ '--tint': type.color }}
                  className={cn(
                    tileClass,
                    'bg-porcelain hover:border-transparent hover:bg-[color-mix(in_oklab,var(--tint)_22%,var(--color-porcelain))]',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-full text-porcelain transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-110"
                      style={{
                        backgroundColor: type.color,
                        color: type.onColor === 'ink' ? 'var(--color-ink)' : 'var(--color-porcelain)',
                      }}
                    >
                      <TypeIcon typeId={type.id} size={24} />
                    </span>
                    <span className="font-mono text-xs text-ink-mute">
                      {count} plat{count > 1 ? 's' : ''}
                    </span>
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
          <Reveal as="li" delay={0.15}>
            <Link
              to="/menu"
              onMouseEnter={() => setAmbient(null)}
              className={cn(tileClass, 'border-ink bg-ink text-porcelain hover:bg-ink-soft')}
            >
              <span className="font-mono text-xs tracking-[0.14em] text-gold uppercase">Sans hésiter</span>
              <span>
                <span className="flex items-center justify-between font-display text-display-sm">
                  Toute la carte
                  <IconArrowRight size={20} />
                </span>
                <span className="mt-1 block text-sm text-porcelain/70">
                  {products.length} plats, tous types confondus
                </span>
              </span>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
