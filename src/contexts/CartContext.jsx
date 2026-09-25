import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import cartReducer, { initialState, lineKey, MAX_QUANTITY, productKey } from '../reducers/cartReducer'
import { formulaLine, isValidLine, productLine, resolveLine } from '../utils/cartItems'
import { readJSON, writeJSON, isPositiveInt } from '../utils/storage'

const STORAGE_KEY = 'cart'
const CartContext = createContext(null)

// A stored cart is accepted only if every line is well-formed and still resolves against the catalogue
function isValidCart(value) {
  return (
    value &&
    typeof value === 'object' &&
    Array.isArray(value.items) &&
    value.items.length <= 50 &&
    value.items.every(
      (item) => isValidLine(item) && isPositiveInt(item.quantity) && item.quantity <= MAX_QUANTITY,
    )
  )
}

function readStoredCart() {
  const stored = readJSON(STORAGE_KEY, isValidCart)
  if (!stored) return null
  // Recompute keys and deduplicate: one line per key
  const seen = new Set()
  const items = stored.items
    .map((item) => ({ ...item, key: lineKey(item) }))
    .filter((item) => (seen.has(item.key) ? false : seen.add(item.key)))
  return { items }
}

export function CartProvider({ children }) {
  // The first render matches the server-rendered HTML (empty cart); the stored cart is loaded right after mount
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // Timestamp of the last addition: the header badge listens to it to pulse
  const [lastAddedAt, setLastAddedAt] = useState(0)

  useEffect(() => {
    const stored = readStoredCart()
    if (stored) dispatch({ type: 'HYDRATE', state: stored })
    // oxlint-disable-next-line react/set-state-in-effect -- localStorage is an external system: the pre-rendered HTML is empty on purpose, the stored cart arrives after mount
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeJSON(STORAGE_KEY, state)
  }, [state, hydrated])

  // Lines enriched with the catalogue data (name, price, image, composition for formules)
  const items = useMemo(
    () =>
      state.items
        .map((line) => ({ ...resolveLine(line), quantity: line.quantity, line }))
        .filter((item) => item.name),
    [state.items],
  )

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  // What the same dishes would cost à la carte (formules counted at their regular price)
  const regularTotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.regularPrice ?? item.price) * item.quantity, 0),
    [items],
  )

  const getProductQuantity = useCallback(
    (productId) => state.items.find((item) => item.key === productKey(productId))?.quantity ?? 0,
    [state.items],
  )

  const addProduct = useCallback((productId, quantity = 1) => {
    dispatch({ type: 'ADD', line: productLine(productId), quantity })
    setLastAddedAt(Date.now())
  }, [])
  const addFormula = useCallback((formulaId, choices = {}, quantity = 1) => {
    dispatch({ type: 'ADD', line: formulaLine(formulaId, choices), quantity })
    setLastAddedAt(Date.now())
  }, [])
  const upgradeToFormula = useCallback((formulaId, keys) => {
    dispatch({ type: 'REPLACE', keys, line: formulaLine(formulaId, {}) })
    setLastAddedAt(Date.now())
  }, [])
  const increment = useCallback((key) => dispatch({ type: 'INCREMENT', key }), [])
  const decrement = useCallback((key) => dispatch({ type: 'DECREMENT', key }), [])
  const setQuantity = useCallback((key, quantity) => dispatch({ type: 'SET_QUANTITY', key, quantity }), [])
  const remove = useCallback((key) => dispatch({ type: 'REMOVE', key }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      items,
      lines: state.items,
      totalItems,
      totalPrice,
      regularTotal,
      getProductQuantity,
      addProduct,
      addFormula,
      upgradeToFormula,
      increment,
      decrement,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
      lastAddedAt,
      hydrated,
    }),
    [
      items,
      state.items,
      totalItems,
      totalPrice,
      regularTotal,
      getProductQuantity,
      addProduct,
      addFormula,
      upgradeToFormula,
      increment,
      decrement,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
      lastAddedAt,
      hydrated,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// oxlint-disable-next-line react/only-export-components -- provider and hook belong together
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
