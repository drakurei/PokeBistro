import { useContext } from 'react'
import CartContext from '../../contexts/CartContext'
import IconTrash from '../Icons/IconTrash'
import formatPrice from '../../utils/formatPrice'
import { handleImageError } from '../../utils/imageFallback'

// One line of the cart: product, unit price, quantity controls, subtotal, delete
function CartItem({ item }) {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext)

  const subtotal = item.price * item.quantity

  return (
    <li className="cart-item d-flex flex-wrap flex-sm-nowrap align-items-center gap-4 py-4">
      <img
        src={item.image}
        alt=""
        width="72"
        height="72"
        className="rounded-3 object-fit-cover flex-shrink-0"
        onError={handleImageError}
      />

      <div className="flex-grow-1 min-w-0">
        <p className="fw-bold mb-0 text-truncate">{item.name}</p>
        <p className="small text-secondary mb-2">{formatPrice(item.price)} l'unité</p>
        <div className="d-inline-flex align-items-center gap-2 bg-light rounded-pill p-1">
          <button
            type="button"
            className="qty-btn"
            onClick={() => decrementQuantity(item.id)}
            aria-label={`Diminuer la quantité de ${item.name}`}
          >
            −
          </button>
          <span className="fw-bold text-center" style={{ minWidth: '1.5rem' }} aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => incrementQuantity(item.id)}
            aria-label={`Augmenter la quantité de ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="text-sm-end ms-auto flex-shrink-0">
        <p className="small text-secondary mb-0">Sous-total</p>
        <p className="fs-5 fw-bold mb-1">{formatPrice(subtotal)}</p>
        <button
          type="button"
          className="btn btn-link btn-sm p-0 text-danger text-decoration-none d-inline-flex align-items-center gap-1"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Supprimer ${item.name} du panier`}
        >
          <IconTrash size={16} />
          Supprimer
        </button>
      </div>
    </li>
  )
}

export default CartItem
