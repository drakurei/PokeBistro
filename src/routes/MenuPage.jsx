import { useMemo, useState } from 'react'
import FilterControls from '../components/menu/FilterControls'
import FilterSheet from '../components/menu/FilterSheet'
import MenuToolbar from '../components/menu/MenuToolbar'
import MenuSections from '../components/menu/MenuSections'
import CombosSection from '../components/menu/CombosSection'
import ProductGrid from '../components/menu/ProductGrid'
import DessertGroups from '../components/menu/DessertGroups'
import MobileCartBar from '../components/cart/MobileCartBar'
import useMenuFilters, { FORMULES } from '../hooks/useMenuFilters'
import products from '../data/products'
import { combos } from '../data/combos'
import filterProducts, { countActiveFilters, groupByCategory, sortProducts } from '../utils/filterProducts'
import { types, typesById } from '../data/types'
import { categoriesById } from '../data/filters'
import { plural } from '../utils/text'

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

  // The full carte reads like a real menu; any filter or sort flattens it into one grid
  const grouped = activeCount === 0 && filters.sort === '' ? groupByCategory(visible) : null
  // The desserts alone keep their sub-groups (choux, cakes, frozen, fruits)
  const dessertsOnly = filters.category === 'dessert' && activeCount === 1 && filters.sort === ''
  // The grid animates when a filter changes, not while typing or sorting
  const animationKey = [
    filters.category,
    filters.types.join(),
    filters.tags.join(),
    filters.diet,
    filters.price,
  ].join('|')

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

        <MenuToolbar
          filters={filters}
          setQuery={setQuery}
          setSort={setSort}
          setCategory={setCategory}
          activeCount={activeCount}
          onReset={reset}
          onOpenFilters={() => setSheetOpen(true)}
          resultCount={resultCount}
        />

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
              <MenuSections groups={grouped} onReset={reset} />
            ) : dessertsOnly ? (
              <DessertGroups products={visible} onReset={reset} />
            ) : (
              <ProductGrid
                products={visible}
                onReset={reset}
                hasFilters={activeCount > 0}
                animationKey={animationKey}
              />
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
      <MobileCartBar />
    </>
  )
}
