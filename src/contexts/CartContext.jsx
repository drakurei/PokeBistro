import { createContext, useReducer } from 'react'
import cartReducer, { initialState } from '../reducers/cartReducer'

// Shared state of the cart. The logic lives in the reducer (src/reducers/cartReducer.js);
// this provider only exposes the state, the totals and small helpers that dispatch actions.
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Totals are computed from the state at every render, so they are always up to date
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Quantity of one product in the cart (0 if absent), used by the product cards
  const getQuantity = (id) => {
    const item = state.items.find((cartItem) => cartItem.id === id)
    return item ? item.quantity : 0
  }

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    getQuantity,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', product }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', id }),
    incrementQuantity: (id) => dispatch({ type: 'INCREMENT_QUANTITY', id }),
    decrementQuantity: (id) => dispatch({ type: 'DECREMENT_QUANTITY', id }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
