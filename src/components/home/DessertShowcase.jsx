import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { productsBySlug } from '../../data/products'
import { chefsCreation, featuredDesserts } from '../../data/editorial'
import { desserts as copy } from '../../data/content'
import formatPrice from '../../utils/formatPrice'
import Button from '../ui/Button'
import TypeBadge from '../ui/TypeBadge'
import { IconArrowRight } from '../ui/Icons'
import ProductCard from '../menu/ProductCard'
import Reveal from '../motion/Reveal'

const creation = productsBySlug[chefsCreation]
const featured = featuredDesserts.map((slug) => productsBySlug[slug]).filter(Boolean)
const tall = creation?.tallImage

// The sweet signature of the house: the chef's creation, tall, on the cream it was shot on,
// and four profiteroles that open the collection. One job: make you want the dessert.
export default function DessertShowcase() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        // The tower rises slowly as it enters the screen, then rests
        gsap.fromTo(
          '.dessert-tower',
          { y: 40, scale: 0.96 },
          {
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
          },
        )
      })
    },
    { scope: root },
  )

  if (!creation || !tall) return null

  return (
    <section ref={root} aria-labelledby="desserts-title" className="overflow-x-clip bg-washi">
      <div className="container-pb grid gap-10 pt-section lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7 lg:self-center">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">{copy.eyebrow}</p>
          <h2
            id="desserts-title"
            className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{copy.lead}</p>

          {/* Création du chef */}
          <Link
            to={`/menu/${creation.slug}`}
            className="mt-8 flex max-w-xl items-center gap-5 rounded-(--radius-md) border border-ink/10 bg-porcelain p-4 no-underline transition-colors hover:border-ink"
          >
            <span className="flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.14em] text-lacquer uppercase">
                Création du chef
              </span>
              <span className="mt-1 font-display text-lg font-semibold">{creation.name}</span>
              <span className="mt-1 text-sm text-ink-soft">{copy.creationLine}</span>
              <span className="mt-2 flex items-center gap-2 font-mono text-xs text-ink-mute">
                <TypeBadge typeId={creation.type} />
                <span aria-hidden="true">·</span>
                {formatPrice(creation.price)}
              </span>
            </span>
            <IconArrowRight size={20} className="ml-auto shrink-0 text-ink-mute" />
          </Link>
        </Reveal>

        <div className="lg:col-span-5">
          <Link
            to={`/menu/${creation.slug}`}
            className="block no-underline"
            aria-label={`${creation.name}, voir le dessert`}
          >
            <picture>
              <source type="image/avif" srcSet={tall.avif} />
              <img
                src={tall.webp}
                alt=""
                width={tall.width}
                height={tall.height}
                loading="lazy"
                decoding="async"
                className="dessert-tower dish-image-soft mx-auto max-h-[70vh] w-auto max-w-[min(100%,420px)] object-contain drop-shadow-[0_30px_40px_rgb(23_21_26_/_0.14)] lg:ml-auto lg:max-h-[600px]"
              />
            </picture>
          </Link>
        </div>
      </div>

      <div className="container-pb pt-12 pb-section">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-mute uppercase">
              Nos desserts signatures
            </p>
            <p className="mt-2 max-w-xl text-ink-soft">{copy.featuredLine}</p>
          </div>
          <Button to="/menu?category=dessert" variant="outline" className="shrink-0">
            Tous les desserts
            <IconArrowRight size={18} />
          </Button>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal as="li" key={product.id} delay={(index % 4) * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
