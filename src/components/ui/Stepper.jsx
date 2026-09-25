import cn from '../../utils/cn'
import { IconMinus, IconPlus } from './Icons'

// − n + quantity control. `label` names the product for assistive tech.
export default function Stepper({
  value,
  onDecrement,
  onIncrement,
  min = 1,
  max = 20,
  allowRemove = false,
  label,
  size = 'md',
  className,
}) {
  // In the cart, going below 1 removes the line; in the detail picker the button simply stops at 1
  const atMin = value <= min
  const removes = allowRemove && value === 1
  const buttonClass = cn(
    'flex shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-(--duration-fast)',
    'hover:bg-ink hover:text-porcelain disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink',
    size === 'md' ? 'size-10' : 'size-9',
  )

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-line bg-porcelain p-1',
        className,
      )}
      role="group"
      aria-label={label ? `Quantité de ${label}` : 'Quantité'}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={onDecrement}
        disabled={atMin && !allowRemove}
        aria-label={removes ? 'Retirer du panier' : 'Diminuer la quantité'}
      >
        <IconMinus size={18} />
      </button>
      <span
        className="min-w-8 text-center font-mono text-base font-medium"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <IconPlus size={18} />
      </button>
    </div>
  )
}
