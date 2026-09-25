import { useCart } from '../../contexts/CartContext'
import formatPrice from '../../utils/formatPrice'
import Stepper from '../ui/Stepper'
import { IconTrash } from '../ui/Icons'

// One line of the cart: dish, unit price, quantity, line total, remove
export default function CartLine({ item }) {
  const { increment, decrement, remove } = useCart()

  return (
    <li className="flex gap-4 py-5">
      <div className="size-20 shrink-0 overflow-hidden rounded-(--radius-sm) bg-washi">
        <img
          src={item.image}
          alt=""
          width="198"
          height="168"
          className="dish-image h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate font-bold">{item.name}</p>
          <p className="shrink-0 font-mono text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="font-mono text-xs text-ink-mute">{formatPrice(item.price)} l’unité</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <Stepper
            value={item.quantity}
            onDecrement={() => decrement(item.id)}
            onIncrement={() => increment(item.id)}
            label={item.name}
            allowRemove
            size="sm"
          />
          <button
            type="button"
            onClick={() => remove(item.id)}
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
