import { useCart } from '../../contexts/CartContext'
import formatPrice from '../../utils/formatPrice'
import { plural } from '../../utils/text'
import { IconArrowRight, IconCart } from '../ui/Icons'

// On small screens the header is far away once you scroll the carte: this bar keeps the cart one
// tap away as soon as it holds something.
export default function MobileCartBar() {
  const { totalItems, totalPrice, open } = useCart()
  if (totalItems === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-(--spacing-gutter) pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <button
        type="button"
        onClick={open}
        className="flex h-14 w-full items-center justify-between gap-3 rounded-full bg-ink px-5 text-porcelain shadow-float-lg"
        aria-label={`Ouvrir le panier, ${plural(totalItems, 'article')}, ${formatPrice(totalPrice)}`}
      >
        <span className="flex items-center gap-3 text-sm font-bold">
          <IconCart size={20} />
          {plural(totalItems, 'article')}
        </span>
        <span className="flex items-center gap-2 font-mono">
          {formatPrice(totalPrice)}
          <IconArrowRight size={18} />
        </span>
      </button>
    </div>
  )
}
