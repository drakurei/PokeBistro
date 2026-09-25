import { useCart } from '../../contexts/CartContext'
import cn from '../../utils/cn'
import { IconCart } from '../ui/Icons'

// Header button: opens the cart drawer, shows the number of items and pulses when something is added
export default function CartButton({ tone = 'light' }) {
  const { totalItems, open, lastAddedAt } = useCart()

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Ouvrir le panier, ${totalItems} article${totalItems > 1 ? 's' : ''}`}
      className={cn(
        'relative flex size-11 items-center justify-center rounded-full transition-colors duration-(--duration-fast)',
        tone === 'dark' ? 'text-porcelain hover:bg-porcelain/12' : 'text-ink hover:bg-ink/6',
      )}
    >
      <IconCart size={22} />
      {totalItems > 0 && (
        // Keyed on the last addition: the badge remounts and replays its pulse
        <span
          key={lastAddedAt}
          className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 animate-pulse-badge items-center justify-center rounded-full bg-lacquer px-1 font-mono text-[11px] font-medium text-porcelain"
          aria-hidden="true"
        >
          {totalItems}
        </span>
      )}
    </button>
  )
}
