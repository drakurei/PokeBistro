import { categories, sortOptions } from '../../data/filters'
import { FORMULES } from '../../hooks/useMenuFilters'
import cn from '../../utils/cn'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import { IconFilter } from '../ui/Icons'
import { controlClass } from '../ui/formStyles'
import SearchField from './SearchField'

// Sticky toolbar of the carte: search, sort and count; on small screens also the category strip
// and the button that opens the filter sheet.
export default function MenuToolbar({
  filters,
  setQuery,
  setSort,
  setCategory,
  activeCount,
  onReset,
  onOpenFilters,
  resultCount,
}) {
  const formulesOnly = filters.category === FORMULES

  return (
    <div className="sticky top-(--spacing-header) z-30 border-y border-line bg-porcelain/95 backdrop-blur-md">
      <div className="container-wide flex flex-col gap-2.5 py-2.5 lg:py-3">
        <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
          <SearchField
            value={filters.q}
            onChange={setQuery}
            className="min-w-0 flex-1 basis-full sm:basis-64"
          />
          <label className="flex min-w-0 flex-1 items-center gap-2 font-mono text-xs text-ink-mute sm:flex-none">
            <span className="sr-only">Trier</span>
            <select
              value={filters.sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Trier les plats"
              className={cn(
                controlClass,
                'h-11 w-full rounded-full py-0 pr-9 pl-4 text-sm sm:w-auto lg:h-12',
              )}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <Button variant="outline" size="sm" onClick={onOpenFilters} className="h-11 lg:hidden">
            <IconFilter size={18} />
            Filtres
            {activeCount > 0 && (
              <span className="rounded-full bg-lacquer px-1.5 py-0.5 font-mono text-[11px] leading-none text-porcelain">
                {activeCount}
              </span>
            )}
          </Button>
          <div className="hidden lg:block">{resultCount}</div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset} className="hidden lg:inline-flex">
              Tout effacer
            </Button>
          )}
        </div>

        {/* On small screens the categories are the quickest way through the carte */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="-mx-(--spacing-gutter) flex min-w-0 flex-1 gap-2 overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none]">
            <Chip
              active={filters.category === ''}
              onClick={() => filters.category && setCategory(filters.category)}
              className="shrink-0"
            >
              Tout
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category.id}
                active={filters.category === category.id}
                onClick={() => setCategory(category.id)}
                className="shrink-0"
              >
                {category.plural}
              </Chip>
            ))}
            <Chip active={formulesOnly} onClick={() => setCategory(FORMULES)} className="shrink-0">
              Formules
            </Chip>
            <span className="shrink-0 self-center pl-1">{resultCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
