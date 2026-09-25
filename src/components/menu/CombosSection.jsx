import { combos } from '../../data/combos'
import ComboCard from './ComboCard'

// The formules, as the last section of the carte (or alone when the Formules chip is active)
export default function CombosSection({ headingLevel = 'h2' }) {
  const Heading = headingLevel
  return (
    <section
      aria-labelledby="group-formules"
      id="formules"
      className="menu-section scroll-mt-[calc(var(--spacing-header)+6rem)]"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-ink pb-3">
        <Heading id="group-formules" className="font-display text-display-sm">
          Formules
          <span className="ml-3 font-mono text-sm font-normal text-ink-mute">{combos.length}</span>
        </Heading>
        <p className="hidden text-sm text-ink-mute sm:block">Un repas complet, moins cher qu’à la carte</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {combos.map((combo) => (
          <li key={combo.id}>
            <ComboCard combo={combo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
