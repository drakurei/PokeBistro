import Dialog from '../ui/Dialog'
import Button, { IconButton } from '../ui/Button'
import { IconClose } from '../ui/Icons'
import FilterControls from './FilterControls'

// Mobile filters: a bottom sheet with the same controls as the desktop rail
export default function FilterSheet({ open, onClose, resultCount, activeCount, onReset, ...controls }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant="bottom"
      labelledBy="filter-sheet-title"
      className="max-h-[88dvh] rounded-t-(--radius-lg) bg-porcelain text-ink"
    >
      <div className="flex max-h-[88dvh] flex-col">
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <h2 id="filter-sheet-title" className="font-display text-xl font-semibold">
            Filtres
          </h2>
          <IconButton label="Fermer les filtres" onClick={onClose}>
            <IconClose size={22} />
          </IconButton>
        </div>
        <div className="belt" aria-hidden="true" />
        <div className="scroll-panel flex-1 overflow-y-auto px-5 py-6" data-lenis-prevent>
          <FilterControls idPrefix="sheet" {...controls} />
        </div>
        <div className="flex gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="ghost" onClick={onReset} disabled={activeCount === 0} className="flex-1">
            Tout effacer
          </Button>
          <Button onClick={onClose} className="flex-1">
            Voir {resultCount} plat{resultCount > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
