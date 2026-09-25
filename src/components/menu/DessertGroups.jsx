import { dessertGroups } from '../../data/filters'
import ProductGrid from './ProductGrid'

// The dessert section read like a pastry counter: the choux collection first, then the cakes,
// the frozen desserts and the fruit bowls. Only groups with dishes are shown.
export default function DessertGroups({ products, onReset }) {
  const groups = dessertGroups
    .map((group) => ({ group, items: products.filter((product) => product.subcategory === group.id) }))
    .filter(({ items }) => items.length > 0)
  const ungrouped = products.filter((product) => !product.subcategory)

  return (
    <div className="flex flex-col gap-10">
      {groups.map(({ group, items }) => (
        <div
          key={group.id}
          id={`dessert-${group.id}`}
          className="scroll-mt-[calc(var(--spacing-header)+6rem)]"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-lg font-semibold">
              {group.label}
              <span className="ml-3 font-mono text-sm font-normal text-ink-mute">{items.length}</span>
            </h3>
            <p className="hidden text-sm text-ink-mute sm:block">{group.description}</p>
          </div>
          <ProductGrid products={items} onReset={onReset} hasFilters={false} animationKey={group.id} />
        </div>
      ))}
      {ungrouped.length > 0 && <ProductGrid products={ungrouped} onReset={onReset} hasFilters={false} />}
    </div>
  )
}
