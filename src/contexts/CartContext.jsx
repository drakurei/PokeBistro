import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import cartReducer, { initialState, MAX_QUANTITY } from '../reducers/cartReducer'
import { productsById } from '../data/products'
import { readJSON, writeJSON, isPositiveInt } from '../utils/storage'

const STORAGE_KEY = 'cart'
const CartContext = createContext(null)

// A stored cart is accepted only if every line is { id, quantity } with a product that still exists.
function isValidCart(value) {
  return (
    value &&
    typeof value === 'object' &&
    Array.isArray(value.items) &&
    value.items.length <= 50 &&
    value.items.every(
      (item) =>
        item &&
        isPositiveInt(item.id) &&
        isPositiveInt(item.quantity) &&
        item.quantity <= MAX_QUANTITY &&
        productsById[item.id] !== undefined,
    )
  )
}

function initCart() {
  const stored = readJSON(STORAGE_KEY, isValidCart)
  if (!stored) return initialState
  // Deduplicate defensively: one line per product
  const seen = new Set()
  const items = stored.items.filter((item) => (seen.has(item.id) ? false : seen.add(item.id)))
  return { items }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, initCart)
  const [isOpen, setIsOpen] = useState(false)
  // Timestamp of the last addition: the header badge listens to it to pulse
  const [lastAddedAt, setLastAddedAt] = useState(0)

  useEffect(() => {
    writeJSON(STORAGE_KEY, state)
  }, [state])

  // Lines enriched with the catalogue data (name, price, image…)
  const items = useMemo(
    () =>
      state.items
        .map((item) => ({ ...productsById[item.id], quantity: item.quantity }))
        .filter((item) => item.id !== undefined),
    [state.items],
  )

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const getQuantity = useCallback(
    (id) => state.items.find((item) => item.id === id)?.quantity ?? 0,
    [state.items],
  )

  const add = useCallback((id, quantity = 1) => {
    dispatch({ type: 'ADD', id, quantity })
    setLastAddedAt(Date.now())
  }, [])
  const increment = useCallback((id) => dispatch({ type: 'INCREMENT', id }), [])
  const decrement = useCallback((id) => dispatch({ type: 'DECREMENT', id }), [])
  const setQuantity = useCallback((id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }), [])
  const remove = useCallback((id) => dispatch({ type: 'REMOVE', id }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      getQuantity,
      add,
      increment,
      decrement,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
      lastAddedAt,
    }),
    [
      items,
      totalItems,
      totalPrice,
      getQuantity,
      add,
      increment,
      decrement,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
      lastAddedAt,
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
