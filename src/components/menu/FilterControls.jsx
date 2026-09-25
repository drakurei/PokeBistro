import products from '../../data/products'
import { categories, tags, priceRanges } from '../../data/filters'
import { types } from '../../data/types'
import cn from '../../utils/cn'
import Chip from '../ui/Chip'

function Group({ title, children }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">{title}</legend>
      {children}
    </fieldset>
  )
}

// The filters themselves, shared by the desktop rail and the mobile sheet
export default function FilterControls({
  filters,
  setCategory,
  toggleType,
  toggleTag,
  setPrice,
  idPrefix = 'f',
}) {
  return (
    <div className="flex flex-col gap-8">
      <Group title="Catégorie">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Chip
              key={category.id}
              active={filters.category === category.id}
              onClick={() => setCategory(category.id)}
              count={products.filter((product) => product.category === category.id).length}
            >
              {category.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Type">
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Chip
              key={type.id}
              color={type.color}
              active={filters.types.includes(type.id)}
              onClick={() => toggleType(type.id)}
            >
              {type.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Envie">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip key={tag.id} active={filters.tags.includes(tag.id)} onClick={() => toggleTag(tag.id)}>
              {tag.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Prix">
        <div className="flex flex-col gap-1">
          {priceRanges.map((range) => {
            const id = `${idPrefix}-price-${range.id}`
            const checked = filters.price === range.id
            return (
              <label
                key={range.id}
                htmlFor={id}
                className={cn(
                  'flex h-10 cursor-pointer items-center gap-3 rounded-full px-3 text-sm transition-colors duration-(--duration-fast)',
                  checked ? 'bg-ink text-porcelain' : 'text-ink-soft hover:bg-ink/6 hover:text-ink',
                )}
              >
                <input
                  id={id}
                  type="radio"
                  name={`${idPrefix}-price`}
                  value={range.id}
                  checked={checked}
                  onChange={() => setPrice(range.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-3 rounded-full border-2',
                    checked ? 'border-porcelain bg-lacquer' : 'border-line',
                  )}
                />
                {range.label}
              </label>
            )
          })}
        </div>
      </Group>
    </div>
  )
}
