import { useContext, useState } from 'react'
import CartContext from '../../contexts/CartContext'
import Modal from '../Modal/Modal'
import CartItem from '../CartItem/CartItem'
import Button from '../Button/Button'
import IconCart from '../Icons/IconCart'
import formatPrice from '../../utils/formatPrice'

// Content of the cart, displayed inside the Modal
function Cart({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, clearCart } = useContext(CartContext)
  // Message shown after a click on "Commander" (there is no real ordering system)
  const [orderMessage, setOrderMessage] = useState('')

  const title = totalItems === 0 ? 'Mon panier' : `Mon panier (${totalItems} article${totalItems > 1 ? 's' : ''})`

  const handleOrder = () => {
    setOrderMessage('Le système de commande sera disponible prochainement. Merci pour votre visite !')
  }

  const handleClear = () => {
    clearCart()
    setOrderMessage('')
  }

  const handleClose = () => {
    setOrderMessage('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-poke-cream text-poke-navy mb-4 size-20">
            <IconCart size={40} />
          </div>
          <p className="fs-5 fw-bold mb-1">Votre panier est vide.</p>
          <p className="text-secondary mb-5">Ajoutez un plat depuis le menu pour commencer votre commande.</p>
          <a href="#menu" className="btn btn-primary" onClick={handleClose}>
            Voir le menu
          </a>
        </div>
      ) : (
        <>
          <ul className="list-unstyled mb-0">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center bg-poke-cream rounded-4 px-5 py-4 mt-4">
            <span className="fs-5 fw-bold">Total</span>
            <span className="fs-3 fw-bold text-poke-red font-display">{formatPrice(totalPrice)}</span>
          </div>

          {orderMessage && (
            <p className="mt-4 mb-0 rounded-3 bg-blue-50 px-4 py-3 text-sm fw-semibold text-poke-blue" role="status">
              {orderMessage}
            </p>
          )}

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <Button variant="outline-secondary" className="flex-fill" onClick={handleClear}>
              Vider le panier
            </Button>
            <Button variant="primary" className="flex-fill" onClick={handleOrder}>
              Commander
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}

export default Cart
