import { useCart } from '../../contexts/CartContext'
import formatPrice from '../../utils/formatPrice'
import DishImage from '../ui/DishImage'
import Stepper from '../ui/Stepper'
import { IconTrash } from '../ui/Icons'

// One line of the cart: dish or formule, unit price, quantity, line total, remove
export default function CartLine({ item, onRemove }) {
  const { increment, decrement } = useCart()

  return (
    <li className="flex gap-4 py-5">
      <div className="size-20 shrink-0 overflow-hidden rounded-(--radius-sm) bg-washi">
        <DishImage product={item} sizes="80px" className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate font-bold">
            {item.kind === 'formula' && (
              <span className="mr-1.5 font-mono text-[10px] tracking-[0.1em] text-lacquer uppercase">
                Formule
              </span>
            )}
            {item.name}
          </p>
          <p className="shrink-0 font-mono text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="font-mono text-xs text-ink-mute">{formatPrice(item.price)} l’unité</p>
        {item.kind === 'formula' && <p className="text-xs text-ink-soft">{item.composition.join(' · ')}</p>}
        <div className="mt-1 flex items-center justify-between gap-3">
          <Stepper
            value={item.quantity}
            onDecrement={() => decrement(item.key)}
            onIncrement={() => increment(item.key)}
            label={item.name}
            allowRemove
            size="sm"
          />
          <button
            type="button"
            onClick={() => onRemove(item)}
            aria-label={`Supprimer ${item.name} du panier`}
            className="flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-danger/10 hover:text-danger"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
    </li>
  )
}
