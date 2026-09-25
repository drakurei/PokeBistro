// Reducer of the cart: receives the current state and an action, returns the new state.
// state.items = [{ id, name, price, image, quantity }]

export const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.product
      const existingItem = state.items.find((item) => item.id === product.id)

      // Already in the cart: only the quantity changes (never two lines for the same product)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      // New product: one line with quantity 1
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }
      return { ...state, items: [...state.items, newItem] }
    }

    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }

    case 'DECREMENT_QUANTITY': {
      const existingItem = state.items.find((item) => item.id === action.id)

      // Not in the cart: nothing to do
      if (!existingItem) {
        return state
      }

      // Last unit: the line is removed (the quantity can never be 0 or negative)
      if (existingItem.quantity === 1) {
        return { ...state, items: state.items.filter((item) => item.id !== action.id) }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      }
    }

    // Removes the whole line, whatever the quantity
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export default cartReducer
