import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useToast } from '../../contexts/ToastContext'
import { productKey } from '../../reducers/cartReducer'
import formatPrice from '../../utils/formatPrice'
import { truncateWords } from '../../utils/text'
import productBadge from '../../utils/productBadge'
import cn from '../../utils/cn'
import Button from '../ui/Button'
import DishImage from '../ui/DishImage'
import Stepper from '../ui/Stepper'
import TypeBadge from '../ui/TypeBadge'
import { IconCheck, IconHeart, IconPlus } from '../ui/Icons'

// A dish. The image and the name open the detail (as a dialog over the menu); the footer adds to the
// cart and turns into a quantity stepper once the dish is in it. Only the essentials are shown:
// image, type, name, price, a short description, at most one badge.
export default function ProductCard({ product, className, priority = false }) {
  const location = useLocation()
  const { addProduct, increment, decrement, getProductQuantity } = useCart()
  const { isFavorite, toggle } = useFavorites()
  const toast = useToast()
  const [justAdded, setJustAdded] = useState(false)
  const timer = useRef(null)

  const quantity = getProductQuantity(product.id)
  const key = productKey(product.id)
  const favorite = isFavorite(product.id)
  const detailLink = { pathname: `/menu/${product.slug}` }
  // The menu stays behind the dialog: we pass the current location as background
  const detailState = { background: location.state?.background ?? location }
  const badge = productBadge(product)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleAdd = () => {
    addProduct(product.id)
    setJustAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setJustAdded(false), 1200)
    toast.show({ title: 'Ajouté au panier', description: product.name })
  }

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-(--radius-md) bg-washi text-ink',
        'transition-[background-color,box-shadow] duration-(--duration-base) ease-(--ease-out) hover:bg-washi-deep hover:shadow-float',
        className,
      )}
    >
      {/* The favourite toggle stays clickable but out of the tab order: the same action exists in the detail */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => toggle(product.id)}
        aria-pressed={favorite}
        aria-label={favorite ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
        className={cn(
          'absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-porcelain/80 backdrop-blur transition-[color,transform] duration-(--duration-fast) active:scale-90',
          favorite ? 'text-lacquer' : 'text-ink-mute hover:text-ink',
        )}
      >
        <IconHeart size={18} filled={favorite} />
      </button>

      <Link
        to={detailLink}
        state={detailState}
        viewTransition
        className="relative block aspect-[5/4] overflow-hidden no-underline"
        aria-hidden="true"
        tabIndex={-1}
      >
        <DishImage
          product={product}
          priority={priority}
          sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 92vw"
          className="h-full w-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.04]"
          style={{ viewTransitionName: `dish-${product.slug}` }}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-1 pb-5">
        <div className="flex items-center justify-between gap-3">
          <TypeBadge typeId={product.type} />
          {badge && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase',
                badge.className,
              )}
            >
              {badge.label}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight font-bold">
            <Link
              to={detailLink}
              state={detailState}
              viewTransition
              className="no-underline after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 font-mono text-base font-medium">{formatPrice(product.price)}</span>
        </div>

        <p className="min-h-10 text-sm text-ink-soft">{truncateWords(product.description, 92)}</p>

        {/* Actions sit above the stretched link */}
        <div className="relative z-10 mt-auto pt-2">
          {quantity > 0 ? (
            <div className="flex items-center justify-between gap-3">
              <Stepper
                value={quantity}
                onDecrement={() => decrement(key)}
                onIncrement={() => increment(key)}
                label={product.name}
                allowRemove
                size="sm"
              />
              <span className="font-mono text-xs text-ink-mute">{formatPrice(product.price * quantity)}</span>
            </div>
          ) : (
            <Button
              size="sm"
              variant="dark"
              onClick={handleAdd}
              className="w-full"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              {justAdded ? (
                <>
                  <IconCheck size={18} className="text-gold" /> Ajouté
                </>
              ) : (
                <>
                  <IconPlus size={18} /> Ajouter
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
