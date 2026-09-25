import { Link } from 'react-router'
import Belt from '../components/layout/Belt'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { IconArrowRight } from '../components/ui/Icons'
import ReservationCta from '../components/home/ReservationCta'
import { chapters, gestures, philosophy, principles, team } from '../data/story'
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
  const [origin, cuisine, typesChapter, sweets] = chapters

  return (
    <>
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

      {/* Chapter 4: the sweet laboratory */}
      <section aria-labelledby={sweets.id} className="border-t border-line">
        <div className="container-pb grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">{sweets.eyebrow}</p>
            <h2 id={sweets.id} className="mt-4 font-display text-display-md text-balance">
              {sweets.title}
            </h2>
            {sweets.paragraphs.map((text) => (
              <p key={text} className="mt-5 text-lg text-ink-soft">
                {text}
              </p>
            ))}
            <Button to="/menu?category=dessert" variant="outline" className="mt-8">
              Voir les desserts
              <IconArrowRight size={18} />
            </Button>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-center" delay={0.1}>
            <DishCluster slugs={sweets.dishes} />
          </Reveal>
        </div>
      </section>

      {/* The team and the chef's gestures */}
      <section aria-labelledby="team-title" className="bg-washi">
        <div className="container-pb grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Notre équipe</p>
            <h2 id="team-title" className="mt-4 font-display text-display-md text-balance">
              Trois personnes, une seule carte.
            </h2>
            <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
              {team.map((member) => (
                <li key={member.name} className="flex gap-5 py-5">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-porcelain"
                  >
                    {member.name[0]}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold">
                      {member.name}
                      <span className="ml-2 font-mono text-xs font-normal tracking-[0.12em] text-ink-mute uppercase">
                        {member.role}
                      </span>
                    </span>
                    <span className="mt-1 block text-ink-soft">{member.line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Le geste du chef</p>
            <ol className="mt-4 flex flex-col gap-4">
              {gestures.map((gesture, index) => (
                <li key={gesture.title} className="rounded-(--radius-md) bg-porcelain p-6">
                  <span className="font-mono text-xs text-lacquer">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{gesture.title}</h3>
                  <p className="mt-1 text-ink-soft">{gesture.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="bg-lacquer text-porcelain">
        <div className="container-pb py-section">
          <Reveal className="max-w-4xl">
            <p className="font-mono text-xs tracking-[0.18em] uppercase">Notre philosophie</p>
            <h2 id="philosophy-title" className="mt-4 font-display text-display-lg text-balance">
              {philosophy.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg">{philosophy.text}</p>
          </Reveal>
        </div>
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
