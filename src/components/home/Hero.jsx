import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { featuredProducts } from '../../data/products'
import { restaurant } from '../../data/restaurant'
import { LOADER_DURATION } from '../loading/loadingState'
import Button from '../ui/Button'
import { IconArrowRight } from '../ui/Icons'
import HeroBall from './HeroBall'

const coins = featuredProducts.slice(0, 3)

// The hero is an open Poké Ball: lacquer on top, porcelain below, the belt in the middle and the
// 3D ball as its button.
export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        const tl = gsap.timeline({ delay: LOADER_DURATION, defaults: { ease: 'power3.out' } })
        tl.fromTo('.hero-belt', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' })
          .fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
          .fromTo(
            '.hero-word',
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            '-=0.35',
          )
          .fromTo(
            '.hero-ball',
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
            '-=0.7',
          )
          .fromTo('.hero-lead', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
          .fromTo(
            '.hero-cta',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            '-=0.3',
          )
          .fromTo(
            '.hero-coin',
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.07 },
            '-=0.3',
          )
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hero-belt, .hero-eyebrow, .hero-word, .hero-ball, .hero-lead, .hero-cta, .hero-coin', {
          clearProps: 'all',
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Top half: lacquer */}
      <div className="bg-lacquer pt-(--spacing-header) text-porcelain">
        <div className="container-pb flex min-h-[38svh] flex-col justify-end pt-8 pb-8 md:min-h-[50svh] md:pt-10 md:pb-10">
          <p className="hero-eyebrow flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs tracking-[0.18em] uppercase opacity-90">
            <span>Bistro · Évry · depuis {restaurant.since}</span>
            <span className="hidden md:inline">Ouvert 7j/7 · {restaurant.hours[0].slots.join(' · ')}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-5 max-w-[58%] font-display text-display-xl text-balance md:max-w-[62%]"
          >
            <span className="block overflow-hidden">
              <span className="hero-word block">Poké</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word block">Bistro</span>
            </span>
          </h1>
        </div>
      </div>

      {/* The belt, with the ball as its button */}
      <div className="relative">
        <div aria-hidden="true" className="hero-belt h-[3px] origin-center bg-ink" />
        <div className="hero-ball pointer-events-none absolute top-1/2 right-[5%] z-10 w-[clamp(150px,28vw,440px)] -translate-y-1/2 md:right-[8%]">
          <HeroBall />
        </div>
      </div>

      {/* Bottom half: porcelain */}
      <div className="bg-porcelain">
        <div className="container-pb grid gap-10 pt-24 pb-16 md:min-h-[42svh] md:grid-cols-12 md:pt-14 md:pb-20">
          <div className="md:col-span-7 lg:col-span-6">
            <p className="hero-lead max-w-xl text-lg text-ink-soft md:text-xl">
              Des bentos, des burgers, des bowls et des desserts qui portent chacun le nom d’un Pokémon.
              Cuisinés sur place, servis avec beaucoup de sérieux et un peu de magie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/menu" size="lg" className="hero-cta">
                Voir la carte
                <IconArrowRight size={20} />
              </Button>
              <Button to="/reservation" size="lg" variant="outline" className="hero-cta">
                Réserver une table
              </Button>
            </div>
          </div>

          {/* Three signature dishes floating under the ball */}
          <ul className="flex items-end gap-4 md:col-span-5 md:col-start-8 md:justify-end lg:col-span-6 lg:col-start-7">
            {coins.map((product, index) => (
              <li key={product.id} className="hero-coin" style={{ marginBottom: `${(2 - index) * 14}px` }}>
                <Link
                  to={`/menu/${product.slug}`}
                  className="group relative block size-24 rounded-full bg-washi no-underline transition-transform duration-(--duration-base) ease-(--ease-out) hover:scale-105 sm:size-28"
                  aria-label={`${product.name}, voir le plat`}
                >
                  <img
                    src={product.image}
                    alt=""
                    width="198"
                    height="168"
                    className="dish-image absolute inset-0 h-full w-full rounded-full object-cover"
                  />
                  <span className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-porcelain opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100 group-focus-visible:opacity-100">
                    {product.pokemon}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
