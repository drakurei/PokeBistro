import { useRef, useState } from 'react'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { Link } from 'react-router'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useToast } from '../../contexts/ToastContext'
import { categoriesById, tagsById } from '../../data/filters'
import { getType } from '../../data/types'
import formatPrice from '../../utils/formatPrice'
import cn from '../../utils/cn'
import Button from '../ui/Button'
import Stepper from '../ui/Stepper'
import TypeBadge from '../ui/TypeBadge'
import { IconCart, IconHeart } from '../ui/Icons'

// Full detail of a dish: shared by the dialog (over the menu) and the standalone page
export default function ProductDetail({ product, titleId = 'product-title', onNavigate }) {
  const { add, getQuantity } = useCart()
  const { isFavorite, toggle } = useFavorites()
  const toast = useToast()
  const [quantity, setQuantity] = useState(1)
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.fromTo(
          '.detail-visual',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
        )
        gsap.fromTo(
          '.detail-content > *',
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out', delay: 0.1 },
        )
      })
    },
    { scope: root },
  )

  const type = getType(product.type)
  const inCart = getQuantity(product.id)
  const favorite = isFavorite(product.id)

  const handleAdd = () => {
    add(product.id, quantity)
    toast.show({
      title: quantity > 1 ? `${quantity} × ajoutés au panier` : 'Ajouté au panier',
      description: product.name,
    })
    setQuantity(1)
  }

  return (
    <div ref={root} className="grid md:grid-cols-2">
      {/* Visual on a tinted washi surface */}
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-washi md:aspect-auto md:min-h-[520px]"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, var(--color-washi) 38%, color-mix(in oklab, ${type?.color ?? '#fff'} 24%, var(--color-washi)) 100%)`,
        }}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-0.5 bg-ink/10" />
        <img
          src={product.image}
          alt={product.name}
          width="512"
          height="410"
          className="dish-image detail-visual relative w-[88%] max-w-[420px] object-contain"
        />
      </div>

      <div className="detail-content flex flex-col gap-6 p-6 md:p-10">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">
          <Link
            to={`/menu?category=${product.category}`}
            onClick={onNavigate}
            className="text-ink-mute no-underline hover:text-ink"
          >
            {categoriesById[product.category]?.label}
          </Link>
          <span aria-hidden="true">·</span>
          <TypeBadge typeId={product.type} size="md" />
        </div>

        <div className="pr-10">
          <h2 id={titleId} className="font-display text-display-md text-balance">
            {product.name}
          </h2>
          <p className="mt-3 font-mono text-2xl font-medium">{formatPrice(product.price)}</p>
        </div>

        <p className="text-ink-soft">{product.description}</p>

        <div>
          <h3 className="font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">Dans l’assiette</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {type && (
          <p className="rounded-(--radius-sm) bg-washi px-4 py-3 text-sm text-ink-soft">
            <span className="font-bold text-ink">Type {type.label}.</span> {type.flavour}
          </p>
        )}

        {product.tags.length > 0 && (
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-mute uppercase">
            {product.tags.map((tag) => tagsById[tag]?.label ?? tag).join(' · ')}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <Stepper
            value={quantity}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrement={() => setQuantity((q) => Math.min(20, q + 1))}
            label={product.name}
          />
          <Button onClick={handleAdd} className="flex-1" size="lg">
            <IconCart size={20} />
            Ajouter · {formatPrice(product.price * quantity)}
          </Button>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-pressed={favorite}
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className={cn(
              'flex size-14 items-center justify-center rounded-full border-2 transition-colors duration-(--duration-fast)',
              favorite
                ? 'border-lacquer text-lacquer'
                : 'border-line text-ink-mute hover:border-ink hover:text-ink',
            )}
          >
            <IconHeart size={22} filled={favorite} />
          </button>
        </div>
        {inCart > 0 && (
          <p className="font-mono text-xs text-ink-mute" role="status">
            Déjà {inCart} dans votre panier.
          </p>
        )}
      </div>
    </div>
  )
}
