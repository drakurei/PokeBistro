import { useContext, useState } from 'react'
import FilterContext from '../../contexts/FilterContext'
import CartContext from '../../contexts/CartContext'
import Button from '../Button/Button'
import IconCheck from '../Icons/IconCheck'
import pokemonTypes from '../../data/pokemonTypes'
import formatPrice from '../../utils/formatPrice'
import { handleImageError } from '../../utils/imageFallback'

// One product, as a Bootstrap card
function ProductCard({ product }) {
  const { tag: activeTag, toggleTag } = useContext(FilterContext)
  const { addToCart, decrementQuantity, getQuantity } = useContext(CartContext)
  // Short visual feedback on the button after a click on "Ajouter"
  const [justAdded, setJustAdded] = useState(false)

  const typeStyle = pokemonTypes[product.type]
  // How many times this product is already in the cart (0 = not in the cart)
  const quantity = getQuantity(product.id)

  const handleAdd = () => {
    addToCart(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
      <div className="position-relative overflow-hidden">
        {/* The box has the same ratio as the product images (198 x 168), so nothing is cropped */}
        <div className="ratio ratio-product">
          <img
            src={product.image}
            alt={product.name}
            className="object-fit-cover product-card-image"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        <span
          className="badge position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 shadow-sm"
          style={{ backgroundColor: typeStyle.background, color: typeStyle.color }}
        >
          {product.type}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-5">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <h3 className="fs-5 fw-bold lh-sm mb-0">{product.name}</h3>
          <span className="fs-5 fw-bold text-poke-red text-nowrap">{formatPrice(product.price)}</span>
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">{product.category}</p>
        <p className="card-text mb-4 text-sm text-slate-600 line-clamp-2">{product.description}</p>

        {/* Clicking a tag filters the grid on this tag (same as the sidebar) */}
        {product.tags.length > 0 && (
          <ul className="list-unstyled d-flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  className={tag === activeTag ? 'chip is-active' : 'chip'}
                  aria-pressed={tag === activeTag}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <Button
            variant={justAdded ? 'success' : 'primary'}
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleAdd}
          >
            {justAdded ? (
              <>
                <IconCheck /> Ajouté au panier
              </>
            ) : (
              '+ Ajouter au panier'
            )}
          </Button>

          {/* Shown only when the product is in the cart: quantity + a discreet "remove one" button */}
          {quantity > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3 small">
              <span className="d-inline-flex align-items-center gap-1 fw-bold text-success">
                <IconCheck size={16} />
                {quantity} dans le panier
              </span>
              <button
                type="button"
                className="btn btn-link btn-sm p-0 text-secondary text-decoration-none"
                onClick={() => decrementQuantity(product.id)}
                aria-label={`Retirer ${product.name} du panier`}
              >
                − Retirer
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
