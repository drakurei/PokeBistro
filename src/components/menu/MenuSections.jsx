import ProductGrid from './ProductGrid'
import CombosSection from './CombosSection'
import DessertGroups from './DessertGroups'

// The full carte, read like a real menu: a short table of contents, then every category in order,
// then the formules. Sections are anchored so the contents and the footer can point at them.
export default function MenuSections({ groups, onReset }) {
  return (
    <div className="flex flex-col gap-14">
      <nav aria-label="Sections de la carte" className="-mt-2">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">
          {groups.map((group) => (
            <li key={group.category.id}>
              <a
                href={`#${group.category.id}`}
                className="text-ink-mute no-underline underline-offset-4 hover:text-ink hover:underline"
              >
                {group.category.plural}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#formules"
              className="text-ink-mute no-underline underline-offset-4 hover:text-ink hover:underline"
            >
              Formules
            </a>
          </li>
        </ul>
      </nav>

      {groups.map((group) => (
        <section
          key={group.category.id}
          id={group.category.id}
          aria-labelledby={`group-${group.category.id}`}
          className="menu-section scroll-mt-[calc(var(--spacing-header)+6rem)]"
        >
          <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-ink pb-3">
            <h2 id={`group-${group.category.id}`} className="font-display text-display-sm">
              {group.category.plural}
              <span className="ml-3 font-mono text-sm font-normal text-ink-mute">{group.items.length}</span>
            </h2>
            <p className="hidden text-sm text-ink-mute sm:block">{group.category.description}</p>
          </div>
          {group.category.id === 'dessert' ? (
            <DessertGroups products={group.items} onReset={onReset} />
          ) : (
            <ProductGrid
              products={group.items}
              onReset={onReset}
              hasFilters={false}
              animationKey={group.category.id}
            />
          )}
        </section>
      ))}

      <CombosSection />
    </div>
  )
}
