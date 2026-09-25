import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../../contexts/CartContext'
import formatPrice from '../../utils/formatPrice'
import { upgradableFormulas } from '../../utils/cartItems'
import Dialog from '../ui/Dialog'
import Button, { IconButton } from '../ui/Button'
import { IconArrowRight, IconClose } from '../ui/Icons'
import { PokeballMark } from '../layout/Logo'
import CartLine from './CartLine'

const UNDO_MS = 6000

// The cart, as a right-hand drawer available on every page
export default function CartDrawer() {
  const {
    items,
    lines,
    totalItems,
    totalPrice,
    regularTotal,
    clear,
    isOpen,
    close,
    remove,
    addProduct,
    addFormula,
    upgradeToFormula,
  } = useCart()
  const navigate = useNavigate()
  const [confirmClear, setConfirmClear] = useState(false)
  const [wasOpen, setWasOpen] = useState(isOpen)
  // Last removed line, kept a few seconds so the removal can be undone
  const [removed, setRemoved] = useState(null)
  const undoTimer = useRef(null)

  // Transient states start fresh every time the drawer opens
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setConfirmClear(false)
  }

  useEffect(() => () => clearTimeout(undoTimer.current), [])

  const handleRemove = (item) => {
    remove(item.key)
    setRemoved(item)
    clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => setRemoved(null), UNDO_MS)
  }

  const undo = () => {
    if (!removed) return
    if (removed.kind === 'formula') addFormula(removed.id, removed.line.choices, removed.quantity)
    else addProduct(removed.id, removed.quantity)
    setRemoved(null)
    clearTimeout(undoTimer.current)
  }

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true)
      return
    }
    clear()
    setConfirmClear(false)
  }

  const handleOrder = () => {
    close()
    navigate('/commande')
  }

  const upgrades = upgradableFormulas(lines)
  const savings = regularTotal - totalPrice

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
            {removed && (
              <Button variant="outline" onClick={undo} className="mt-6">
                Remettre {removed.name}
              </Button>
            )}
            <Button to="/menu" onClick={close} className="mt-4">
              Voir la carte
            </Button>
          </div>
        ) : (
          <>
            <ul className="scroll-panel flex-1 divide-y divide-line overflow-y-auto px-6" data-lenis-prevent>
              {items.map((item) => (
                <CartLine key={item.key} item={item} onRemove={handleRemove} />
              ))}
            </ul>

            <div className="border-t border-line px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {removed && (
                <p
                  role="status"
                  className="mb-3 flex items-center justify-between gap-3 rounded-(--radius-sm) bg-washi px-4 py-2 text-sm"
                >
                  <span className="truncate">{removed.name} retiré</span>
                  <button
                    type="button"
                    onClick={undo}
                    className="shrink-0 font-bold text-lacquer underline-offset-2 hover:underline"
                  >
                    Annuler
                  </button>
                </p>
              )}

              {upgrades.length > 0 && (
                <div className="mb-3 rounded-(--radius-sm) bg-ink p-4 text-sm text-porcelain">
                  <p>
                    Vous avez déjà les plats de la <strong>{upgrades[0].combo.name}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => upgradeToFormula(upgrades[0].combo.id, upgrades[0].keys)}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 font-bold text-ink"
                  >
                    Passer en formule et économiser {formatPrice(upgrades[0].savings)}
                    <IconArrowRight size={16} />
                  </button>
                </div>
              )}

              <dl className="flex flex-col gap-1">
                {savings > 0.005 && (
                  <div className="flex justify-between font-mono text-xs text-ink-mute">
                    <dt>À la carte</dt>
                    <dd>
                      <s>{formatPrice(regularTotal)}</s>
                    </dd>
                  </div>
                )}
                {savings > 0.005 && (
                  <div className="flex justify-between font-mono text-xs text-success">
                    <dt>Économie formules</dt>
                    <dd>−{formatPrice(savings)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-mono text-2xl font-medium">{formatPrice(totalPrice)}</dd>
                </div>
              </dl>
              <p className="mt-1 font-mono text-xs text-ink-mute">
                Sur place ou à emporter · paiement au comptoir
              </p>

              <div className="mt-4 flex gap-3">
                <Button variant="ghost" onClick={handleClear} className="shrink-0">
                  {confirmClear ? 'Confirmer' : 'Vider'}
                </Button>
                <Button onClick={handleOrder} className="flex-1" size="lg">
                  Commander
                  <IconArrowRight size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
