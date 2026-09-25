import formatPrice from '../../utils/formatPrice'
import cn from '../../utils/cn'
import DishImage from '../ui/DishImage'
import TypeIcon from '../ui/TypeIcon'
import { getType } from '../../data/types'

// One slot of a configurable formule: a radio group of dish cards (image, name, price).
// Native radios keep it keyboard-operable and announced correctly; the card is the label.
export default function ChoiceGrid({ slot, options, value, onChange }) {
  const name = `slot-${slot.id}`

  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">
        {slot.label}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((product) => {
          const checked = value === product.slug
          const type = getType(product.type)
          return (
            <label
              key={product.id}
              className={cn(
                'relative flex cursor-pointer flex-col gap-2 rounded-(--radius-sm) border-2 p-2 transition-[border-color,background-color] duration-(--duration-fast)',
                checked ? 'border-ink bg-washi' : 'border-line bg-porcelain hover:border-ink/40',
                'has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-lacquer/50',
              )}
            >
              <input
                type="radio"
                name={name}
                value={product.slug}
                checked={checked}
                onChange={() => onChange(product.slug)}
                className="sr-only"
              />
              <span className="block aspect-[5/4] overflow-hidden rounded-[6px] bg-washi">
                <DishImage product={product} className="h-full w-full object-cover" sizes="160px" />
              </span>
              <span className="flex items-start justify-between gap-2">
                <span className="text-xs leading-tight font-bold">{product.name}</span>
                <span className="shrink-0 font-mono text-[11px] text-ink-mute">
                  {formatPrice(product.price)}
                </span>
              </span>
              {type && (
                <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.1em] text-ink-mute uppercase">
                  <TypeIcon typeId={product.type} size={12} style={{ color: type.color }} />
                  {type.label}
                </span>
              )}
              {checked && (
                <span className="absolute top-2 right-2 rounded-full bg-ink px-1.5 py-0.5 font-mono text-[10px] text-porcelain">
                  Choisi
                </span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
