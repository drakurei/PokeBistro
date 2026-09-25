import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { restaurant } from '../../data/restaurant'
import formatPrice from '../../utils/formatPrice'
import Dialog from '../ui/Dialog'
import Button, { IconButton } from '../ui/Button'
import { IconClose } from '../ui/Icons'
import { PokeballMark } from '../layout/Logo'
import CartLine from './CartLine'

// The cart, as a right-hand drawer available on every page
export default function CartDrawer() {
  const { items, totalItems, totalPrice, clear, isOpen, close } = useCart()
  const [notice, setNotice] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [wasOpen, setWasOpen] = useState(isOpen)

  // Transient states start fresh every time the drawer opens
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) {
      setNotice(false)
      setConfirmClear(false)
    }
  }

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true)
      return
    }
    clear()
    setConfirmClear(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      variant="right"
      labelledBy="cart-title"
      className="w-full max-w-[28rem] bg-porcelain text-ink shadow-float-lg"
    >
      <div className="flex h-dvh flex-col">
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 id="cart-title" className="font-display text-xl font-semibold">
            Panier
            {totalItems > 0 && (
              <span className="ml-2 font-mono text-sm font-normal text-ink-mute">{totalItems}</span>
            )}
          </h2>
          <IconButton label="Fermer le panier" onClick={close} autoFocus>
            <IconClose size={22} />
          </IconButton>
        </div>
        <div className="belt" aria-hidden="true" />

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <PokeballMark size={64} className="text-ink-mute opacity-70" />
            <p className="mt-6 font-display text-lg font-semibold">Votre panier est vide.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Un bento, un bowl, un dessert : tout commence sur la carte.
            </p>
            <Button to="/menu" onClick={close} className="mt-8">
              Voir la carte
            </Button>
          </div>
        ) : (
          <>
            <ul className="scroll-panel flex-1 divide-y divide-line overflow-y-auto px-6" data-lenis-prevent>
              {items.map((item) => (
                <CartLine key={item.id} item={item} />
              ))}
            </ul>

            <div className="border-t border-line px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <dl className="flex items-baseline justify-between">
                <dt className="font-bold">Total</dt>
                <dd className="font-mono text-2xl font-medium">{formatPrice(totalPrice)}</dd>
              </dl>
              <p className="mt-1 font-mono text-xs text-ink-mute">Retrait sur place · paiement au comptoir</p>

              {notice && (
                <p
                  role="status"
                  className="mt-4 rounded-(--radius-sm) bg-washi px-4 py-3 text-sm text-ink-soft"
                >
                  La commande en ligne arrive bientôt. En attendant, appelez-nous au{' '}
                  <a href={restaurant.phoneHref} className="font-bold text-ink">
                    {restaurant.phone}
                  </a>{' '}
                  ou réservez une table : votre sélection est gardée dans ce navigateur.
                </p>
              )}

              <div className="mt-5 flex gap-3">
                <Button variant="ghost" onClick={handleClear} className="shrink-0">
                  {confirmClear ? 'Confirmer' : 'Vider'}
                </Button>
                <Button onClick={() => setNotice(true)} className="flex-1" size="lg">
                  Commander
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
