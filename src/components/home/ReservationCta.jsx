import { restaurant } from '../../data/restaurant'
import Button from '../ui/Button'
import { IconArrowRight } from '../ui/Icons'
import Reveal from '../motion/Reveal'

// Lacquer surface: the second and last place where the strong colour fills the screen
export default function ReservationCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-lacquer text-porcelain">
      <div className="container-pb py-section">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs tracking-[0.18em] uppercase">Réservation</p>
            <h2 id="cta-title" className="mt-4 font-display text-display-lg text-balance">
              Une table pour ce soir ? On vous garde une place.
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
            <p className="font-mono text-sm leading-relaxed lg:text-right">
              {restaurant.hours[0].days}
              <br />
              {restaurant.hours[0].slots.join(' · ')}
            </p>
            <Button to="/reservation" variant="light" size="lg">
              Réserver une table
              <IconArrowRight size={20} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
