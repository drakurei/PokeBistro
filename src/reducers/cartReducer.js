// Cart reducer. The state only stores ids and quantities: names, prices and images are read from
// the product catalogue at render time, so nothing persisted in the browser can alter a price.
// state.items = [{ id, quantity }]

export const MAX_QUANTITY = 20
export const initialState = { items: [] }

const clamp = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, quantity))

function updateQuantity(state, id, quantity) {
  return {
    ...state,
    items: state.items.map((item) => (item.id === id ? { ...item, quantity: clamp(quantity) } : item)),
  }
}

export default function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const quantity = action.quantity ?? 1
      const existing = state.items.find((item) => item.id === action.id)
      // Already in the cart: the quantity grows, never a second line for the same product
      if (existing) return updateQuantity(state, action.id, existing.quantity + quantity)
      return { ...state, items: [...state.items, { id: action.id, quantity: clamp(quantity) }] }
    }

    case 'INCREMENT': {
      const existing = state.items.find((item) => item.id === action.id)
      if (!existing) return state
      return updateQuantity(state, action.id, existing.quantity + 1)
    }

    case 'DECREMENT': {
      const existing = state.items.find((item) => item.id === action.id)
      // Not in the cart: nothing to do. Last unit: the line disappears (quantity is never 0)
      if (!existing) return state
      if (existing.quantity === 1)
        return { ...state, items: state.items.filter((item) => item.id !== action.id) }
      return updateQuantity(state, action.id, existing.quantity - 1)
    }

    case 'SET_QUANTITY': {
      if (!Number.isInteger(action.quantity)) return state
      if (action.quantity <= 0)
        return { ...state, items: state.items.filter((item) => item.id !== action.id) }
      const existing = state.items.find((item) => item.id === action.id)
      if (!existing)
        return { ...state, items: [...state.items, { id: action.id, quantity: clamp(action.quantity) }] }
      return updateQuantity(state, action.id, action.quantity)
    }

    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) }

    case 'CLEAR':
      return initialState

    default:
      return state
  }
}
