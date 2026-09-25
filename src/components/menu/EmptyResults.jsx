import Button from '../ui/Button'
import { PokeballMark } from '../layout/Logo'

export default function EmptyResults({ onReset, hasFilters }) {
  return (
    <div className="flex flex-col items-center rounded-(--radius-lg) border border-dashed border-line px-6 py-20 text-center">
      <PokeballMark size={56} className="text-ink-mute opacity-60" />
      <h3 className="mt-6 font-display text-display-sm">Aucun plat ne correspond.</h3>
      <p className="mt-3 max-w-md text-ink-soft">
        Essayez un autre mot, retirez un filtre, ou repartez de la carte complète : il y a forcément un
        Pokémon pour vous.
      </p>
      {hasFilters && (
        <Button variant="outline" onClick={onReset} className="mt-8">
          Tout effacer
        </Button>
      )}
    </div>
  )
}
