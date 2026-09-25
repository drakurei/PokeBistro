import Seo from '../components/layout/Seo'
import ContactForm from '../components/forms/ContactForm'
import Reveal from '../components/motion/Reveal'
import { IconClock, IconMail, IconPhone, IconPin } from '../components/ui/Icons'
import { restaurant } from '../data/restaurant'

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4 rounded-(--radius-md) bg-washi p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-porcelain text-ink">
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <h3 className="font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">{title}</h3>
        <div className="mt-1.5 text-ink">{children}</div>
      </div>
    </div>
  )
}

// A stylised, offline "map": the belt as a street, the button as the pin
function MapSketch() {
  return (
    <div className="relative overflow-hidden rounded-(--radius-lg) bg-ink text-porcelain" aria-hidden="true">
      <svg viewBox="0 0 600 320" className="h-auto w-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="rgba(252,251,248,0.08)" />
          </pattern>
        </defs>
        <rect width="600" height="320" fill="url(#grid)" />
        <path
          d="M0 200C120 160 220 240 340 190S520 150 600 180"
          fill="none"
          stroke="rgba(252,251,248,0.25)"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M0 200C120 160 220 240 340 190S520 150 600 180"
          fill="none"
          stroke="var(--color-porcelain)"
          strokeWidth="2"
          strokeDasharray="8 10"
        />
        <path d="M300 0v320" stroke="rgba(252,251,248,0.18)" strokeWidth="14" />
        <circle cx="300" cy="196" r="26" fill="var(--color-lacquer)" />
        <circle cx="300" cy="196" r="9" fill="var(--color-porcelain)" />
        <text
          x="336"
          y="202"
          fill="var(--color-porcelain)"
          fontFamily="DM Mono, monospace"
          fontSize="13"
          letterSpacing="2"
        >
          POKÉBISTRO
        </text>
        <text
          x="20"
          y="40"
          fill="rgba(252,251,248,0.6)"
          fontFamily="DM Mono, monospace"
          fontSize="11"
          letterSpacing="2"
        >
          ROUTE VICTOIRE · ÉVRY
        </text>
      </svg>
    </div>
  )
}

export default function ContactPage() {
  const { address } = restaurant

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Adresse, horaires, téléphone et formulaire de contact de PokéBistro à Évry-Courcouronnes."
      />

      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Contact</p>
          <h1 className="mt-4 font-display text-display-lg text-balance">
            On répond plus vite qu’une Vive-Attaque.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Une table de groupe, une allergie, une idée de plat, un anniversaire : écrivez-nous, ou passez la
            porte.
          </p>
        </div>

        <div className="container-pb grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
          <Reveal className="flex flex-col gap-4 lg:col-span-5">
            <InfoCard icon={IconPin} title="Adresse">
              <p>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </p>
            </InfoCard>
            <InfoCard icon={IconPhone} title="Téléphone">
              <a href={restaurant.phoneHref} className="font-bold no-underline hover:text-lacquer">
                {restaurant.phone}
              </a>
            </InfoCard>
            <InfoCard icon={IconMail} title="Email">
              <a href={`mailto:${restaurant.email}`} className="font-bold no-underline hover:text-lacquer">
                {restaurant.email}
              </a>
            </InfoCard>
            <InfoCard icon={IconClock} title="Horaires">
              <ul className="flex flex-col gap-1">
                {restaurant.hours.map((line) => (
                  <li key={line.days} className="flex flex-wrap justify-between gap-x-4">
                    <span className="font-bold">{line.days}</span>
                    <span className="font-mono text-sm text-ink-soft">{line.slots.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
            <ul className="mt-2 flex flex-wrap gap-2">
              {restaurant.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-soft"
                >
                  {service}
                </li>
              ))}
            </ul>
            <MapSketch />
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-(--radius-lg) border border-line p-6 md:p-10">
              <h2 className="font-display text-display-sm">Écrivez-nous</h2>
              <p className="mt-2 mb-8 text-sm text-ink-soft">Réponse avant le prochain service, promis.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
