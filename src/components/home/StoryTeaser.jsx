import { useRef } from 'react'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { facts } from '../../data/facts'
import Button from '../ui/Button'
import { IconArrowRight } from '../ui/Icons'
import Reveal from '../motion/Reveal'

// Counts a number up from 0 when it scrolls into view
function Counter({ value, suffix }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const target = { n: 0 }
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.to(target, {
          n: value,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
          onUpdate: () => {
            ref.current.textContent = Math.round(target.n) + suffix
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <span
      ref={ref}
      className="font-display text-[clamp(2.5rem,4.5vw,4.25rem)] leading-none font-bold tracking-tight whitespace-nowrap text-lacquer"
    >
      {value}
      {suffix}
    </span>
  )
}

export default function StoryTeaser() {
  return (
    <section aria-labelledby="story-title" className="py-section">
      <div className="container-pb grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Notre histoire</p>
          <h2 id="story-title" className="mt-4 font-display text-display-lg text-balance">
            Et si chaque Pokémon avait son plat ?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            PokéBistro est né d’un pari entre deux cuisiniers et une dresseuse : servir des plats qu’on
            reconnaît au premier coup d’œil, sans jamais sacrifier le goût au clin d’œil. Sept ans plus tard,
            la carte compte quarante-quatre recettes et un seul principe : tout est fait maison.
          </p>
          <Button to="/histoire" variant="outline" className="mt-8">
            Lire notre histoire
            <IconArrowRight size={18} />
          </Button>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-5 lg:pl-8">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.08} className="border-t border-ink pt-4">
              <dt className="order-2 mt-2 text-sm text-ink-mute">{fact.label}</dt>
              <dd className="order-1">
                <Counter value={fact.value} suffix={fact.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
