// Cart reducer. A line is a small object, never a product copy:
//   { key, kind: 'product', productId, quantity }
//   { key, kind: 'formula', formulaId, choices, quantity }
// `key` identifies a line (same product, or same formule with the same choices, share a line).
// Names, prices and images are read from the catalogue at render time, so nothing persisted in the
// browser can alter a price.

export const MAX_QUANTITY = 20
export const initialState = { items: [] }

const clamp = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, quantity))

export function lineKey(line) {
  if (line.kind === 'formula') {
    const choices = Object.entries(line.choices ?? {})
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([slot, slug]) => `${slot}=${slug}`)
      .join(';')
    return `f:${line.formulaId}${choices ? `:${choices}` : ''}`
  }
  return `p:${line.productId}`
}

export const productKey = (productId) => `p:${productId}`

function updateQuantity(state, key, quantity) {
  return {
    ...state,
    items: state.items.map((item) => (item.key === key ? { ...item, quantity: clamp(quantity) } : item)),
  }
}

export default function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const quantity = action.quantity ?? 1
      const key = lineKey(action.line)
      const existing = state.items.find((item) => item.key === key)
      // Already in the cart: the quantity grows, never a second line for the same thing
      if (existing) return updateQuantity(state, key, existing.quantity + quantity)
      return { ...state, items: [...state.items, { ...action.line, key, quantity: clamp(quantity) }] }
    }

    case 'INCREMENT': {
      const existing = state.items.find((item) => item.key === action.key)
      if (!existing) return state
      return updateQuantity(state, action.key, existing.quantity + 1)
    }

    case 'DECREMENT': {
      const existing = state.items.find((item) => item.key === action.key)
      // Not in the cart: nothing to do. Last unit: the line disappears (quantity is never 0)
      if (!existing) return state
      if (existing.quantity === 1)
        return { ...state, items: state.items.filter((item) => item.key !== action.key) }
      return updateQuantity(state, action.key, existing.quantity - 1)
    }

    case 'SET_QUANTITY': {
      if (!Number.isInteger(action.quantity)) return state
      if (action.quantity <= 0)
        return { ...state, items: state.items.filter((item) => item.key !== action.key) }
      const existing = state.items.find((item) => item.key === action.key)
      if (!existing) return state
      return updateQuantity(state, action.key, action.quantity)
    }

    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.key !== action.key) }

    // Replaces several lines by one (used when the cart is upgraded to a formule)
    case 'REPLACE': {
      const remaining = state.items.filter((item) => !action.keys.includes(item.key))
      const key = lineKey(action.line)
      const existing = remaining.find((item) => item.key === key)
      if (existing)
        return {
          ...state,
          items: remaining.map((item) =>
            item.key === key ? { ...item, quantity: clamp(item.quantity + 1) } : item,
          ),
        }
      return { ...state, items: [...remaining, { ...action.line, key, quantity: 1 }] }
    }

    // Loads a validated cart from storage (after mount, so the first render matches the server HTML)
    case 'HYDRATE':
      return action.state

    case 'CLEAR':
      return initialState

    default:
      return state
  }
}
