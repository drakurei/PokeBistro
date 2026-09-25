import ReservationForm from '../components/forms/ReservationForm'
import Reveal from '../components/motion/Reveal'
import { restaurant } from '../data/restaurant'

const steps = [
  {
    title: 'Choisissez',
    text: 'Une date, un horaire libre, le nombre de convives, la salle ou la terrasse.',
  },
  {
    title: 'On confirme',
    text: 'Un récapitulatif à vérifier, puis un email avant le service, avec le nom de la table.',
  },
  { title: 'Vous arrivez', text: 'La table est prête, la carte aussi. Bon appétit.' },
]

export default function ReservationPage() {
  return (
    <>
      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Réservation</p>
          <h1 className="mt-4 font-display text-display-lg text-balance">Réservez votre table.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Deux services par jour, sept jours sur sept. Pour les groupes de plus de {restaurant.maxGuests},
            un coup de fil suffit.
          </p>
        </div>

        <div className="container-pb grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
          <Reveal className="lg:col-span-7">
            <div className="rounded-(--radius-lg) border border-line p-6 md:p-10">
              <ReservationForm />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <ol className="flex flex-col divide-y divide-line">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-5 py-6">
                  <span className="font-mono text-sm text-lacquer">0{index + 1}</span>
                  <div>
                    <h2 className="font-display text-lg font-semibold">{step.title}</h2>
                    <p className="mt-1 text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-(--radius-md) bg-washi p-6">
              <h2 className="font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">Horaires</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {restaurant.hours.map((line) => (
                  <li key={line.days} className="flex flex-wrap justify-between gap-x-4">
                    <span className="font-bold">{line.days}</span>
                    <span className="font-mono text-sm text-ink-soft">{line.slots.join(' · ')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-soft">
                Groupes, anniversaires, privatisation :{' '}
                <a href={restaurant.phoneHref} className="font-bold text-ink">
                  {restaurant.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
