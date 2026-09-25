import { describe, expect, it } from 'vitest'
import cartReducer, { initialState, MAX_QUANTITY } from './cartReducer'

const run = (...actions) => actions.reduce(cartReducer, initialState)

describe('cartReducer', () => {
  it('adds a product with quantity 1', () => {
    expect(run({ type: 'ADD', id: 1 })).toEqual({ items: [{ id: 1, quantity: 1 }] })
  })

  it('never creates two lines for the same product', () => {
    const state = run({ type: 'ADD', id: 1 }, { type: 'ADD', id: 1 }, { type: 'ADD', id: 1, quantity: 3 })
    expect(state.items).toEqual([{ id: 1, quantity: 5 }])
  })

  it('caps the quantity', () => {
    const state = run({ type: 'ADD', id: 1, quantity: 99 }, { type: 'INCREMENT', id: 1 })
    expect(state.items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('removes the line when decrementing from 1, ignores unknown ids', () => {
    const state = run({ type: 'ADD', id: 1 }, { type: 'DECREMENT', id: 1 }, { type: 'DECREMENT', id: 42 })
    expect(state).toEqual(initialState)
  })

  it('decrements otherwise', () => {
    const state = run({ type: 'ADD', id: 1, quantity: 3 }, { type: 'DECREMENT', id: 1 })
    expect(state.items[0].quantity).toBe(2)
  })

  it('sets an explicit quantity and removes at 0', () => {
    expect(run({ type: 'SET_QUANTITY', id: 2, quantity: 4 }).items).toEqual([{ id: 2, quantity: 4 }])
    expect(run({ type: 'ADD', id: 2 }, { type: 'SET_QUANTITY', id: 2, quantity: 0 })).toEqual(initialState)
    expect(
      run({ type: 'ADD', id: 2 }, { type: 'SET_QUANTITY', id: 2, quantity: 1.5 }).items[0].quantity,
    ).toBe(1)
  })

  it('removes a whole line and clears everything', () => {
    const state = run({ type: 'ADD', id: 1, quantity: 3 }, { type: 'ADD', id: 2 }, { type: 'REMOVE', id: 1 })
    expect(state.items).toEqual([{ id: 2, quantity: 1 }])
    expect(cartReducer(state, { type: 'CLEAR' })).toEqual(initialState)
  })

  it('returns the same state for unknown actions', () => {
    const state = run({ type: 'ADD', id: 1 })
    expect(cartReducer(state, { type: 'NOPE' })).toBe(state)
  })
})
