import { useRef } from 'react'
import { preload } from 'react-dom'
import { Link } from 'react-router'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { productsBySlug } from '../../data/products'
import { restaurant } from '../../data/restaurant'
import { hero } from '../../data/content'
import { LOADER_DURATION } from '../loading/loadingState'
import formatPrice from '../../utils/formatPrice'
import Button from '../ui/Button'
import DishImage from '../ui/DishImage'
import TypeBadge from '../ui/TypeBadge'
import { IconArrowRight } from '../ui/Icons'
import HeroBall from './HeroBall'

const dish = productsBySlug[hero.dishSlug]

// The hero is an open Poké Ball: lacquer on top, porcelain below, the belt in the middle with the
// ball as its button. The dish is the subject: it sits on the belt, first thing painted, and the
// title reads as a sentence rather than a logo. Nothing here starts invisible: the intro only
// nudges what is already on screen.
export default function Hero() {
  const root = useRef(null)
  // The dish is the largest element of the first screen: ask for it from the <head>, on the pages
  // that render the hero only (a preload at module level would fire on every route)
  if (dish.imageSet.avif) {
    preload(dish.image, {
      as: 'image',
      type: 'image/avif',
      imageSrcSet: dish.imageSet.avif,
      imageSizes: '(min-width: 768px) 36vw, 76vw',
      fetchPriority: 'high',
    })
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        const tl = gsap.timeline({ delay: LOADER_DURATION, defaults: { ease: 'power3.out' } })
        tl.fromTo('.hero-belt', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' })
          .fromTo('.hero-dish', { y: 28, scale: 0.94 }, { y: 0, scale: 1, duration: 0.9 }, '-=0.55')
          .fromTo('.hero-ball', { scale: 0.5 }, { scale: 1, duration: 0.7, ease: 'back.out(1.6)' }, '-=0.6')
          .fromTo('.hero-lead', { y: 14, opacity: 0.001 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.5')
          .fromTo(
            '.hero-cta',
            { y: 10, opacity: 0.001 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
            '-=0.35',
          )
          .fromTo('.hero-caption', { y: 8, opacity: 0.001 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-x-clip">
      {/* Top half: lacquer. The dish overflows it and lands on the belt. */}
      <div className="bg-lacquer pt-(--spacing-header) text-porcelain">
        <div className="container-pb grid items-end gap-x-8 pt-8 pb-0 md:min-h-[min(50svh,560px)] md:grid-cols-12 md:pt-10">
          <div className="pb-10 md:col-span-7 md:pb-12 lg:col-span-6">
            <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs tracking-[0.18em] uppercase">
              <span>{hero.eyebrow}</span>
              <span className="hidden md:inline">Ouvert 7j/7 · {restaurant.hours[0].slots.join(' · ')}</span>
            </p>
            <h1
              id="hero-title"
              className="mt-5 max-w-[14ch] font-display text-[clamp(1.85rem,5.6vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.02em] text-balance md:max-w-[16ch] md:text-[clamp(2.25rem,4.9vw,3.75rem)]"
            >
              {hero.title}
            </h1>
          </div>

          <figure className="hero-dish relative z-10 -mb-14 justify-self-end md:col-span-5 md:-mb-20 lg:col-span-6 lg:-mb-24">
            <Link
              to={`/menu/${dish.slug}`}
              className="group block w-[min(70vw,330px)] no-underline md:w-[clamp(300px,36vw,500px)]"
              aria-label={`${dish.name}, voir le plat`}
            >
              <DishImage
                product={dish}
                priority
                sizes="(min-width: 768px) 36vw, 76vw"
                className="w-full drop-shadow-[0_30px_40px_rgb(23_21_26_/_0.35)] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.02]"
              />
            </Link>
          </figure>
        </div>
      </div>

      {/* The belt, with the ball as its button */}
      <div className="relative">
        <div aria-hidden="true" className="hero-belt h-[3px] origin-center bg-ink" />
        <div className="hero-ball pointer-events-none absolute top-1/2 left-[5%] z-20 w-[clamp(72px,10vw,150px)] -translate-y-1/2 md:left-[42%] md:-translate-x-1/2 lg:left-[45%]">
          <HeroBall />
        </div>
      </div>

      {/* Bottom half: porcelain */}
      <div className="bg-porcelain">
        <div className="container-pb grid gap-8 pt-20 pb-16 md:grid-cols-12 md:pt-14 md:pb-20">
          <div className="md:col-span-7 lg:col-span-6">
            <p className="hero-lead max-w-xl text-lg text-ink-soft md:text-xl">{hero.lead}</p>
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

          {/* The caption of the dish, under it, on the porcelain */}
          <div className="hero-caption flex md:col-span-5 md:items-end md:justify-end lg:col-span-6">
            <Link
              to={`/menu/${dish.slug}`}
              className="flex items-center gap-4 rounded-full border border-line bg-porcelain py-2 pr-5 pl-2 no-underline transition-colors hover:border-ink"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-washi font-mono text-[11px] text-ink-mute">
                {hero.captionLabel}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold">{dish.name}</span>
                <span className="flex items-center gap-2 font-mono text-[11px] text-ink-mute">
                  <TypeBadge typeId={dish.type} />
                  <span aria-hidden="true">·</span>
                  {formatPrice(dish.price)}
                </span>
              </span>
              <IconArrowRight size={16} className="text-ink-mute" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
