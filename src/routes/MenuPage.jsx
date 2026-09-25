import { useMemo, useState } from 'react'
import Seo from '../components/layout/Seo'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { IconFilter } from '../components/ui/Icons'
import SearchField from '../components/menu/SearchField'
import FilterControls from '../components/menu/FilterControls'
import FilterSheet from '../components/menu/FilterSheet'
import ProductGrid from '../components/menu/ProductGrid'
import ComboCard from '../components/menu/ComboCard'
import useMenuFilters, { FORMULES } from '../hooks/useMenuFilters'
import products from '../data/products'
import { combos } from '../data/combos'
import filterProducts, { countActiveFilters, groupByCategory, sortProducts } from '../utils/filterProducts'
import { types, typesById } from '../data/types'
import { categories, categoriesById, sortOptions } from '../data/filters'
import { plural } from '../utils/text'
import { controlClass } from '../components/ui/formStyles'
import cn from '../utils/cn'

// The formules, as a section of the carte
function CombosSection({ headingLevel = 'h2' }) {
  const Heading = headingLevel
  return (
    <section
      aria-labelledby="group-formules"
      id="formules"
      className="scroll-mt-[calc(var(--spacing-header)+6rem)]"
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

export default function MenuPage() {
  const { filters, setQuery, setCategory, toggleType, toggleTag, setDiet, setPrice, setSort, reset } =
    useMenuFilters()
  const [sheetOpen, setSheetOpen] = useState(false)

  const formulesOnly = filters.category === FORMULES
  // Formules have their own place: when they are selected, products are listed without a category filter
  const visible = useMemo(() => {
    const productFilters = formulesOnly ? { ...filters, category: '' } : filters
    return sortProducts(filterProducts(products, productFilters), filters.sort)
  }, [filters, formulesOnly])
  const activeCount = countActiveFilters(filters)
  const controls = { filters, setCategory, toggleType, toggleTag, setDiet, setPrice }

  // The full carte reads like a real menu: every category in order, then the formules. Any filter or sort flattens it.
  const grouped = activeCount === 0 && filters.sort === '' ? groupByCategory(visible) : null

  const heading = formulesOnly
    ? 'Les formules'
    : filters.types.length === 1 && !filters.category
      ? `Les plats ${typesById[filters.types[0]].label}`
      : filters.category
        ? `Les ${categoriesById[filters.category].plural.toLowerCase()}`
        : 'La carte'

  const resultCount = (
    <p className="font-mono text-xs whitespace-nowrap text-ink-mute" role="status" aria-live="polite">
      {formulesOnly ? plural(combos.length, 'formule') : plural(visible.length, 'plat')}
      {!formulesOnly && visible.length < products.length && ` sur ${products.length}`}
    </p>
  )

  return (
    <>
      <Seo
        title="La carte"
        path="/menu"
        description={`Les ${products.length} plats et ${combos.length} formules de PokéBistro : entrées, bentos, burgers, bowls, desserts et boissons inspirés des Pokémon. Filtrez par type, par envie ou par prix.`}
      />

      <section className="pt-(--spacing-header)">
        <div className="container-wide pt-12 pb-8 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">
            {products.length} plats · {combos.length} formules · {types.length} types
          </p>
          <h1 className="mt-4 font-display text-display-lg text-balance">{heading}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Cherchez un Pokémon, un ingrédient ou une envie. Les filtres se combinent, et l’adresse de la page
            garde votre sélection.
          </p>
        </div>

        {/* Toolbar: search, sort and count; on small screens also the category strip and the filters button */}
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSheetOpen(true)}
                className="h-11 lg:hidden"
              >
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
                <Button variant="ghost" size="sm" onClick={reset} className="hidden lg:inline-flex">
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
                <Chip active={formulesOnly} onClick={() => setCategory(FORMULES)} className="shrink-0">
                  Formules
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
                <span className="shrink-0 self-center pl-1">{resultCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-wide grid gap-10 py-10 lg:grid-cols-[264px_1fr] lg:gap-12">
          <aside aria-label="Filtres" className="hidden lg:block">
            <div className="sticky top-[calc(var(--spacing-header)+5.5rem)]">
              <FilterControls idPrefix="rail" {...controls} />
            </div>
          </aside>
          <div>
            {formulesOnly ? (
              <CombosSection />
            ) : grouped ? (
              <div className="flex flex-col gap-14">
                {grouped.map((group) => (
                  <section
                    key={group.category.id}
                    id={group.category.id}
                    aria-labelledby={`group-${group.category.id}`}
                    className="scroll-mt-[calc(var(--spacing-header)+6rem)]"
                  >
                    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-ink pb-3">
                      <h2 id={`group-${group.category.id}`} className="font-display text-display-sm">
                        {group.category.plural}
                        <span className="ml-3 font-mono text-sm font-normal text-ink-mute">
                          {group.items.length}
                        </span>
                      </h2>
                      <p className="hidden text-sm text-ink-mute sm:block">{group.category.description}</p>
                    </div>
                    <ProductGrid products={group.items} onReset={reset} hasFilters={false} />
                  </section>
                ))}
                <CombosSection />
              </div>
            ) : (
              <ProductGrid products={visible} onReset={reset} hasFilters={activeCount > 0} />
            )}
          </div>
        </div>
      </section>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        resultCount={formulesOnly ? combos.length : visible.length}
        activeCount={activeCount}
        onReset={reset}
        {...controls}
      />
    </>
  )
}
