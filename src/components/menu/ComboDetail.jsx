import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { getType } from '../../data/types'
import formatPrice from '../../utils/formatPrice'
import { comboLineId, comboProducts, defaultChoices, regularPrice, slotOptions } from '../../utils/cartItems'
import Button from '../ui/Button'
import Field from '../ui/Field'
import Stepper from '../ui/Stepper'
import { controlClass } from '../ui/formStyles'
import { IconCart } from '../ui/Icons'

// A formule in full: its dishes (or the choices to make), the set price and what it saves
export default function ComboDetail({ combo, titleId = 'combo-title' }) {
  const { add } = useCart()
  const toast = useToast()
  const [choices, setChoices] = useState(() => defaultChoices(combo))
  const [quantity, setQuantity] = useState(1)

  const items = comboProducts(combo, choices)
  const regular = regularPrice(items)
  const savings = regular - combo.price
  const type = getType(combo.type)

  const handleAdd = () => {
    add(comboLineId(combo, choices), quantity)
    toast.show({
      title: quantity > 1 ? `${quantity} × ajoutées au panier` : 'Ajoutée au panier',
      description: combo.name,
    })
    setQuantity(1)
  }

  return (
    <div className="grid md:grid-cols-2">
      {/* The dishes, stacked like a tray */}
      <div className="flex flex-col justify-center gap-3 bg-ink p-6 text-porcelain md:min-h-[520px] md:p-10">
        <p className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{combo.eyebrow}</p>
        <ul className="mt-2 flex flex-col divide-y divide-porcelain/12">
          {items.map((product, index) => (
            <li key={`${product.id}-${index}`} className="flex items-center gap-4 py-3">
              <span className="size-16 shrink-0 overflow-hidden rounded-full bg-washi">
                <img
                  src={product.image}
                  alt=""
                  width="512"
                  height="410"
                  className="dish-image h-full w-full object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{product.name}</span>
                <span className="block font-mono text-xs text-porcelain/60">
                  {formatPrice(product.price)} à la carte
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-xs text-porcelain/60">
          Séparément : <s>{formatPrice(regular)}</s>
          {savings > 0 && (
            <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-ink">
              vous économisez {formatPrice(savings)}
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="pr-10">
          <h2 id={titleId} className="font-display text-display-md text-balance">
            {combo.name}
          </h2>
          <p className="mt-3 font-mono text-2xl font-medium">{formatPrice(combo.price)}</p>
          {type && (
            <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-ink-mute uppercase">
              Type {type.label}
            </p>
          )}
        </div>

        <p className="text-ink-soft">{combo.description}</p>

        {combo.slots && (
          <div className="grid gap-4 sm:grid-cols-2">
            {combo.slots.map((slot) => (
              <Field key={slot.id} id={`slot-${slot.id}`} label={slot.label}>
                <select
                  id={`slot-${slot.id}`}
                  value={choices[slot.id]}
                  onChange={(event) =>
                    setChoices((current) => ({ ...current, [slot.id]: event.target.value }))
                  }
                  className={controlClass}
                >
                  {slotOptions(slot).map((product) => (
                    <option key={product.id} value={product.slug}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </Field>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <Stepper
            value={quantity}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrement={() => setQuantity((q) => Math.min(20, q + 1))}
            label={combo.name}
          />
          <Button onClick={handleAdd} className="flex-1" size="lg">
            <IconCart size={20} />
            Ajouter · {formatPrice(combo.price * quantity)}
          </Button>
        </div>
        <p className="font-mono text-xs text-ink-mute">
          Prix fixe, quel que soit le choix. Retrait sur place, paiement au comptoir.
        </p>
      </div>
    </div>
  )
}
