import { describe, expect, it } from 'vitest'
import cartReducer, { initialState, lineKey, MAX_QUANTITY, productKey } from './cartReducer'

const product = (id) => ({ kind: 'product', productId: id })
const formula = (id, choices = {}) => ({ kind: 'formula', formulaId: id, choices })
const run = (...actions) => actions.reduce(cartReducer, initialState)

describe('cartReducer', () => {
  it('adds a product line with quantity 1 and a stable key', () => {
    const state = run({ type: 'ADD', line: product(1) })
    expect(state.items).toEqual([{ kind: 'product', productId: 1, key: 'p:1', quantity: 1 }])
    expect(productKey(1)).toBe('p:1')
  })

  it('never creates two lines for the same thing', () => {
    const state = run(
      { type: 'ADD', line: product(1) },
      { type: 'ADD', line: product(1) },
      { type: 'ADD', line: product(1), quantity: 3 },
    )
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(5)
  })

  it('keys formules by id and sorted choices', () => {
    const a = lineKey(formula('formule-dresseur', { plat: 'lucario-bento', entree: 'ouisticram-gyoza' }))
    const b = lineKey(formula('formule-dresseur', { entree: 'ouisticram-gyoza', plat: 'lucario-bento' }))
    expect(a).toBe(b)
    expect(lineKey(formula('formule-pikachu'))).toBe('f:formule-pikachu')
    const state = run(
      { type: 'ADD', line: formula('formule-dresseur', { plat: 'a' }) },
      { type: 'ADD', line: formula('formule-dresseur', { plat: 'b' }) },
    )
    expect(state.items).toHaveLength(2)
  })

  it('caps the quantity', () => {
    const state = run({ type: 'ADD', line: product(1), quantity: 99 }, { type: 'INCREMENT', key: 'p:1' })
    expect(state.items[0].quantity).toBe(MAX_QUANTITY)
  })

  it('removes the line when decrementing from 1, ignores unknown keys', () => {
    expect(
      run(
        { type: 'ADD', line: product(1) },
        { type: 'DECREMENT', key: 'p:1' },
        { type: 'DECREMENT', key: 'p:42' },
      ),
    ).toEqual(initialState)
    expect(
      run({ type: 'ADD', line: product(1), quantity: 3 }, { type: 'DECREMENT', key: 'p:1' }).items[0]
        .quantity,
    ).toBe(2)
  })

  it('sets an explicit quantity and removes at 0', () => {
    expect(
      run({ type: 'ADD', line: product(2) }, { type: 'SET_QUANTITY', key: 'p:2', quantity: 4 }).items[0]
        .quantity,
    ).toBe(4)
    expect(run({ type: 'ADD', line: product(2) }, { type: 'SET_QUANTITY', key: 'p:2', quantity: 0 })).toEqual(
      initialState,
    )
    expect(
      run({ type: 'ADD', line: product(2) }, { type: 'SET_QUANTITY', key: 'p:2', quantity: 1.5 }).items[0]
        .quantity,
    ).toBe(1)
  })

  it('replaces several lines by a formule', () => {
    const state = run(
      { type: 'ADD', line: product(1) },
      { type: 'ADD', line: product(2) },
      { type: 'ADD', line: product(3) },
      { type: 'REPLACE', keys: ['p:1', 'p:2'], line: formula('formule-pikachu') },
    )
    expect(state.items.map((item) => item.key)).toEqual(['p:3', 'f:formule-pikachu'])
  })

  it('hydrates, removes and clears', () => {
    const stored = { items: [{ kind: 'product', productId: 5, key: 'p:5', quantity: 2 }] }
    expect(cartReducer(initialState, { type: 'HYDRATE', state: stored })).toBe(stored)
    const state = run(
      { type: 'ADD', line: product(1), quantity: 3 },
      { type: 'ADD', line: product(2) },
      { type: 'REMOVE', key: 'p:1' },
    )
    expect(state.items.map((item) => item.key)).toEqual(['p:2'])
    expect(cartReducer(state, { type: 'CLEAR' })).toEqual(initialState)
    expect(cartReducer(state, { type: 'NOPE' })).toBe(state)
  })
})
