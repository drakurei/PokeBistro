import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap, useGSAP, FULL } from '../../lib/motion'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useToast } from '../../contexts/ToastContext'
import { allergensById, categoriesById, dietsById, spicyLabels, tagsById } from '../../data/filters'
import { combosContaining } from '../../data/combos'
import { getType } from '../../data/types'
import formatPrice from '../../utils/formatPrice'
import cn from '../../utils/cn'
import Button from '../ui/Button'
import DishImage from '../ui/DishImage'
import Stepper from '../ui/Stepper'
import TypeBadge from '../ui/TypeBadge'
import TypeIcon from '../ui/TypeIcon'
import { IconArrowRight, IconCart, IconHeart, IconInfo } from '../ui/Icons'

// Full detail of a dish: shared by the dialog (over the menu) and the standalone page
export default function ProductDetail({ product, titleId = 'product-title', onNavigate }) {
  const { addProduct, getProductQuantity } = useCart()
  const { isFavorite, toggle } = useFavorites()
  const toast = useToast()
  const [quantity, setQuantity] = useState(1)
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.fromTo('.detail-visual', { scale: 0.94 }, { scale: 1, duration: 0.6, ease: 'power3.out' })
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
  const inCart = getProductQuantity(product.id)
  const favorite = isFavorite(product.id)
  const formulas = combosContaining(product.slug)
  const diets = (product.diet ?? []).map((id) => dietsById[id]?.label).filter(Boolean)
  const allergens = (product.allergens ?? []).map((id) => allergensById[id]?.label).filter(Boolean)

  const handleAdd = () => {
    addProduct(product.id, quantity)
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
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-washi md:aspect-auto md:min-h-[560px]"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, var(--color-washi) 38%, color-mix(in oklab, ${type?.color ?? '#fff'} 24%, var(--color-washi)) 100%)`,
        }}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-0.5 bg-ink/10" />
        <DishImage
          product={product}
          priority
          sizes="(min-width: 768px) 480px, 90vw"
          alt={product.name}
          className="detail-visual relative w-[88%] max-w-[440px] object-contain drop-shadow-[0_24px_30px_rgb(23_21_26_/_0.18)]"
          style={{ viewTransitionName: `dish-${product.slug}` }}
        />
      </div>

      <div className="detail-content flex flex-col gap-6 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">
          <Link
            to={`/menu?category=${product.category}`}
            onClick={onNavigate}
            className="text-ink-mute no-underline hover:text-ink"
          >
            {categoriesById[product.category]?.label}
          </Link>
          <span aria-hidden="true">·</span>
          <TypeBadge typeId={product.type} size="md" />
          {product.spicy > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-lacquer">{spicyLabels[product.spicy]}</span>
            </>
          )}
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

        {(diets.length > 0 || allergens.length > 0) && (
          <div className="rounded-(--radius-sm) border border-line p-4 text-sm">
            {diets.length > 0 && (
              <p>
                <span className="font-bold">Régime :</span> {diets.join(', ')}
              </p>
            )}
            <p className={cn(diets.length > 0 && 'mt-1')}>
              <span className="font-bold">Allergènes :</span>{' '}
              {allergens.length > 0 ? allergens.join(', ') : 'aucun des 14 allergènes réglementaires'}
            </p>
            <p className="mt-2 flex items-start gap-1.5 font-mono text-[11px] text-ink-mute">
              <IconInfo size={14} className="mt-0.5 shrink-0" />
              Informations de démonstration (restaurant fictif), pas un avis sanitaire.
            </p>
          </div>
        )}

        {type && (
          <p className="flex items-start gap-3 rounded-(--radius-sm) bg-washi px-4 py-3 text-sm text-ink-soft">
            <TypeIcon
              typeId={product.type}
              size={20}
              className="mt-0.5 shrink-0"
              style={{ color: type.color }}
            />
            <span>
              <span className="font-bold text-ink">Type {type.label}.</span> {type.flavour}
            </span>
          </p>
        )}

        {formulas.length > 0 && (
          <div>
            <h3 className="font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">
              Existe aussi en formule
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {formulas.map((combo) => (
                <li key={combo.id}>
                  <Link
                    to={`/menu/formule/${combo.id}`}
                    onClick={onNavigate}
                    className="flex items-center justify-between gap-3 rounded-(--radius-sm) bg-ink px-4 py-3 text-sm text-porcelain no-underline hover:bg-ink-soft"
                  >
                    <span>
                      <span className="font-bold">{combo.name}</span>
                      <span className="block text-xs text-porcelain/70">{combo.description}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 font-mono">
                      {formatPrice(combo.price)}
                      <IconArrowRight size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
              'flex size-14 items-center justify-center rounded-full border-2 transition-[color,border-color,transform] duration-(--duration-fast) active:scale-90',
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
