import { Link } from 'react-router'
import Seo from '../components/layout/Seo'
import Belt from '../components/layout/Belt'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { IconArrowRight } from '../components/ui/Icons'
import ReservationCta from '../components/home/ReservationCta'
import { chapters, principles } from '../data/story'
import { types } from '../data/types'
import products from '../data/products'
import { facts } from '../data/facts'

// Dishes illustrating a chapter, shown as floating "coins"
function DishCluster({ slugs, className }) {
  const items = slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean)
  return (
    <ul className={`flex flex-wrap gap-4 ${className ?? ''}`}>
      {items.map((product, index) => (
        <li key={product.id} className={index % 2 ? 'mt-8' : ''}>
          <Link
            to={`/menu/${product.slug}`}
            className="group block size-28 rounded-full bg-washi no-underline sm:size-36"
            aria-label={`${product.name}, voir le plat`}
          >
            <img
              src={product.image}
              alt=""
              width="512"
              height="410"
              loading="lazy"
              className="dish-image h-full w-full rounded-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-105"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function StoryPage() {
  const [origin, cuisine, typesChapter] = chapters

  return (
    <>
      <Seo
        title="Notre histoire"
        path="/histoire"
        description="Comment PokéBistro est né à Évry en 2019, ce qu’on y cuisine, et pourquoi les types Pokémon sont devenus notre carte."
      />

      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 md:pt-20">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Notre histoire</p>
          <h1 className="mt-4 max-w-4xl font-display text-display-lg text-balance">
            Et si chaque Pokémon avait son plat ?
          </h1>
        </div>
      </section>

      {/* Chapter 1: origin */}
      <section
        aria-labelledby={origin.id}
        className="container-pb grid gap-10 py-section lg:grid-cols-12 lg:gap-8"
      >
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-xs tracking-[0.18em] text-ink-mute uppercase">{origin.eyebrow}</p>
          <p className="mt-6 font-display text-[clamp(4rem,10vw,9rem)] leading-none font-bold text-lacquer">
            2019
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
          <h2 id={origin.id} className="font-display text-display-md text-balance">
            {origin.title}
          </h2>
          {origin.paragraphs.map((text) => (
            <p key={text} className="mt-5 text-lg text-ink-soft">
              {text}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Chapter 2: cuisine, on the tray */}
      <section aria-labelledby={cuisine.id} className="bg-ink text-porcelain">
        <Belt light />
        <div className="container-pb grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-xs tracking-[0.18em] text-gold uppercase">{cuisine.eyebrow}</p>
            <h2 id={cuisine.id} className="mt-4 font-display text-display-md text-balance">
              {cuisine.title}
            </h2>
            {cuisine.paragraphs.map((text) => (
              <p key={text} className="mt-5 text-lg text-porcelain/75">
                {text}
              </p>
            ))}
            <DishCluster
              slugs={['tauros-steakhouse-burger', 'felinferno-burger', 'pikachu-bento']}
              className="mt-10"
            />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <ul className="divide-y divide-porcelain/15 border-y border-porcelain/15">
              {principles.map((principle) => (
                <li key={principle.title} className="py-6">
                  <h3 className="font-display text-lg font-semibold">{principle.title}</h3>
                  <p className="mt-1 text-porcelain/70">{principle.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Chapter 3: the types */}
      <section aria-labelledby={typesChapter.id} className="container-pb py-section">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">{typesChapter.eyebrow}</p>
          <h2 id={typesChapter.id} className="mt-4 font-display text-display-md text-balance">
            {typesChapter.title}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{typesChapter.paragraphs[0]}</p>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-lg) border border-line bg-line sm:grid-cols-2">
          {types.map((type, index) => (
            <Reveal as="li" key={type.id} delay={(index % 2) * 0.06} className="bg-porcelain">
              <Link
                to={`/menu?type=${type.id}`}
                className="group flex h-full gap-5 p-6 no-underline transition-colors hover:bg-washi"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 rounded-full"
                  style={{ backgroundColor: type.color }}
                />
                <span>
                  <span className="flex items-center gap-2 font-display text-lg font-semibold">
                    {type.label}
                    <IconArrowRight
                      size={16}
                      className="text-ink-mute opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-1 block text-ink-soft">{type.flavour}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Facts */}
      <section aria-label="PokéBistro en chiffres" className="border-t border-ink">
        <div className="container-pb grid grid-cols-2 gap-8 py-section lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.06}>
              <p className="font-display text-display-lg text-lacquer">
                {fact.value}
                {fact.suffix}
              </p>
              <p className="mt-2 text-ink-mute">{fact.label}</p>
            </Reveal>
          ))}
        </div>
        <div className="container-pb pb-section">
          <Button to="/menu" size="lg">
            Découvrir la carte
            <IconArrowRight size={20} />
          </Button>
        </div>
      </section>

      <ReservationCta />
    </>
  )
}
