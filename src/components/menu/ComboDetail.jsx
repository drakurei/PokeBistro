import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { getType } from '../../data/types'
import formatPrice from '../../utils/formatPrice'
import { comboProducts, defaultChoices, regularPrice, slotOptions } from '../../utils/cartItems'
import Button from '../ui/Button'
import DishImage from '../ui/DishImage'
import Stepper from '../ui/Stepper'
import TypeIcon from '../ui/TypeIcon'
import { IconCart } from '../ui/Icons'
import ChoiceGrid from './ChoiceGrid'

// A formule in full: its dishes (or the choices to make), the set price and what it saves
export default function ComboDetail({ combo, titleId = 'combo-title', headingLevel = 'h2' }) {
  const Heading = headingLevel
  const { addFormula } = useCart()
  const toast = useToast()
  const [choices, setChoices] = useState(() => defaultChoices(combo))
  const [quantity, setQuantity] = useState(1)

  const items = comboProducts(combo, choices)
  const regular = regularPrice(items)
  const savings = regular - combo.price
  const type = getType(combo.type)

  const handleAdd = () => {
    addFormula(combo.id, choices, quantity)
    toast.show({
      title: quantity > 1 ? `${quantity} × ajoutées au panier` : 'Ajoutée au panier',
      description: combo.name,
    })
    setQuantity(1)
  }

  return (
    <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* The dishes, stacked like a tray */}
      <div className="flex flex-col justify-center gap-3 bg-ink p-6 text-porcelain md:min-h-[560px] md:p-10">
        <p className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{combo.eyebrow}</p>
        <ul className="mt-2 flex flex-col divide-y divide-porcelain/12">
          {items.map((product, index) => (
            <li key={`${product.id}-${index}`} className="flex items-center gap-4 py-3">
              <span className="size-16 shrink-0 overflow-hidden rounded-full bg-washi">
                <DishImage product={product} sizes="64px" className="h-full w-full object-cover" />
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
        {combo.availability && (
          <p className="font-mono text-[11px] tracking-[0.1em] text-gold uppercase">
            {combo.availability.label}
          </p>
        )}
        {combo.note && <p className="text-xs text-porcelain/60">{combo.note}</p>}
      </div>

      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="pr-10">
          <Heading id={titleId} className="font-display text-display-md text-balance">
            {combo.name}
          </Heading>
          <p className="mt-3 font-mono text-2xl font-medium">{formatPrice(combo.price)}</p>
          {type && (
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-mute uppercase">
              <TypeIcon typeId={combo.type} size={13} style={{ color: type.color }} />
              Type {type.label}
            </p>
          )}
        </div>

        <p className="text-ink-soft">{combo.description}</p>

        {combo.slots && (
          <div className="flex flex-col gap-6">
            {combo.slots.map((slot) => (
              <ChoiceGrid
                key={slot.id}
                slot={slot}
                options={slotOptions(slot)}
                value={choices[slot.id]}
                onChange={(slug) => setChoices((current) => ({ ...current, [slot.id]: slug }))}
              />
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
          Prix fixe, quel que soit le choix. Retrait sur place ou à emporter.
        </p>
      </div>
    </div>
  )
}
