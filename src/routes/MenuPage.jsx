import { useMemo, useState } from 'react'
import Seo from '../components/layout/Seo'
import Button from '../components/ui/Button'
import { IconFilter } from '../components/ui/Icons'
import SearchField from '../components/menu/SearchField'
import FilterControls from '../components/menu/FilterControls'
import FilterSheet from '../components/menu/FilterSheet'
import ProductGrid from '../components/menu/ProductGrid'
import useMenuFilters from '../hooks/useMenuFilters'
import products from '../data/products'
import filterProducts, { countActiveFilters } from '../utils/filterProducts'
import { typesById } from '../data/types'
import { categoriesById } from '../data/filters'
import { plural } from '../utils/text'

export default function MenuPage() {
  const { filters, setQuery, setCategory, toggleType, toggleTag, setPrice, reset } = useMenuFilters()
  const [sheetOpen, setSheetOpen] = useState(false)

  const visible = useMemo(() => filterProducts(products, filters), [filters])
  const activeCount = countActiveFilters(filters)
  const controls = { filters, setCategory, toggleType, toggleTag, setPrice }

  // A short title reflecting the current selection ("Les plats Feu", "Les burgers")
  const heading =
    filters.types.length === 1 && !filters.category
      ? `Les plats ${typesById[filters.types[0]].label}`
      : filters.category
        ? `Les ${categoriesById[filters.category].label.toLowerCase()}s`
        : 'La carte'

  return (
    <>
      <Seo
        title="La carte"
        path="/menu"
        description="Les 28 plats de PokéBistro : bentos, burgers, bowls, desserts et boissons inspirés des Pokémon. Filtrez par type, par envie ou par prix."
      />

      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 pb-8 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">28 plats · 8 types</p>
          <h1 className="mt-4 font-display text-display-lg text-balance">{heading}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Cherchez un Pokémon, un ingrédient ou une envie. Les filtres se combinent, et l’adresse de la page
            garde votre sélection.
          </p>
        </div>

        {/* Toolbar: search, count, mobile filters */}
        <div className="sticky top-(--spacing-header) z-30 border-y border-line bg-porcelain/92 backdrop-blur-md">
          <div className="container-pb flex flex-wrap items-center gap-3 py-3">
            <SearchField value={filters.q} onChange={setQuery} className="min-w-0 flex-1 basis-64" />
            <p
              className="order-last basis-full font-mono text-xs text-ink-mute sm:order-none sm:basis-auto"
              role="status"
              aria-live="polite"
            >
              {plural(visible.length, 'plat')}
              {visible.length < products.length && ` sur ${products.length}`}
            </p>
            {activeCount > 0 && (
              <Button variant="ghost" size="sm" onClick={reset} className="hidden sm:inline-flex">
                Tout effacer
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setSheetOpen(true)} className="lg:hidden">
              <IconFilter size={18} />
              Filtres
              {activeCount > 0 && (
                <span className="rounded-full bg-lacquer px-1.5 py-0.5 font-mono text-[11px] leading-none text-porcelain">
                  {activeCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="container-pb grid gap-10 py-10 lg:grid-cols-[280px_1fr] lg:gap-12">
          <aside aria-label="Filtres" className="hidden lg:block">
            <div className="sticky top-[calc(var(--spacing-header)+5.5rem)]">
              <FilterControls idPrefix="rail" {...controls} />
            </div>
          </aside>
          <div>
            <ProductGrid products={visible} onReset={reset} hasFilters={activeCount > 0} />
          </div>
        </div>
      </section>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        resultCount={visible.length}
        activeCount={activeCount}
        onReset={reset}
        {...controls}
      />
    </>
  )
}
