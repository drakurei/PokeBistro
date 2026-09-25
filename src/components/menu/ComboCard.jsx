import { Link, useLocation } from 'react-router'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { getType } from '../../data/types'
import formatPrice from '../../utils/formatPrice'
import { comboProducts, defaultChoices, regularPrice } from '../../utils/cartItems'
import Button from '../ui/Button'
import DishImage from '../ui/DishImage'
import TypeIcon from '../ui/TypeIcon'
import { IconArrowRight, IconPlus } from '../ui/Icons'

const badgeLabels = { signature: 'Signature', chef: 'Choix du chef', nouveau: 'Nouveau' }

// A formule on the ink tray: composition, set price, what it saves, and the way in.
// Fixed formules can be added in one tap; configurable ones open their composer.
export default function ComboCard({ combo }) {
  const location = useLocation()
  const { addFormula } = useCart()
  const toast = useToast()

  const items = comboProducts(combo, defaultChoices(combo))
  const regular = regularPrice(items)
  const savings = regular - combo.price
  const type = getType(combo.type)
  const detailLink = { pathname: `/menu/formule/${combo.id}` }
  const detailState = { background: location.state?.background ?? location }

  const handleAdd = () => {
    addFormula(combo.id)
    toast.show({ title: 'Ajoutée au panier', description: combo.name })
  }

  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-(--radius-md) bg-ink p-6 text-porcelain">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{combo.eyebrow}</p>
        {combo.badge && (
          <span className="shrink-0 rounded-full bg-porcelain/12 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase">
            {badgeLabels[combo.badge]}
          </span>
        )}
      </div>

      <ul className="flex -space-x-3" aria-hidden="true">
        {items.slice(0, 5).map((product, index) => (
          <li
            key={`${product.id}-${index}`}
            className="size-14 overflow-hidden rounded-full bg-washi ring-2 ring-ink"
          >
            <DishImage product={product} sizes="56px" className="h-full w-full object-cover" />
          </li>
        ))}
      </ul>

      <div>
        <h3 className="font-display text-display-sm">
          <Link
            to={detailLink}
            state={detailState}
            className="no-underline after:absolute after:inset-0 after:content-['']"
          >
            {combo.name}
          </Link>
        </h3>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-porcelain/75">
          {combo.slots
            ? combo.slots.map((slot) => (
                <li key={slot.id}>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-porcelain/50 uppercase">
                    {slot.label}
                  </span>{' '}
                  au choix
                </li>
              ))
            : items.map((product) => <li key={product.id}>{product.name}</li>)}
        </ul>
        {combo.availability && (
          <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-gold uppercase">
            {combo.availability.label}
          </p>
        )}
        {combo.note && <p className="mt-2 text-xs text-porcelain/60">{combo.note}</p>}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-porcelain/15 pt-4">
        <div>
          <p className="font-mono text-2xl font-medium">{formatPrice(combo.price)}</p>
          {savings > 0 && (
            <p className="mt-0.5 font-mono text-xs text-porcelain/60">
              {combo.slots ? 'à partir de ' : ''}
              <s>{formatPrice(regular)}</s>
              <span className="ml-2 rounded-full bg-gold px-1.5 py-0.5 text-[10px] text-ink">
                −{formatPrice(savings)}
              </span>
            </p>
          )}
          {type && (
            <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-porcelain/60 uppercase">
              <TypeIcon typeId={combo.type} size={13} style={{ color: type.color }} />
              Type {type.label}
            </p>
          )}
        </div>
        <div className="relative z-10">
          {combo.slots ? (
            <Button to={detailLink} state={detailState} variant="light" size="sm">
              Composer
              <IconArrowRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              variant="light"
              size="sm"
              aria-label={`Ajouter ${combo.name} au panier`}
            >
              <IconPlus size={16} />
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
