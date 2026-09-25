import { describe, expect, it } from 'vitest'
import { combos } from '../data/combos'
import {
  comboProducts,
  defaultChoices,
  formulaLine,
  isValidLine,
  productLine,
  regularPrice,
  resolveLine,
  slotOptions,
  upgradableFormulas,
} from './cartItems'

describe('formules', () => {
  it('always cost less than their dishes bought separately, including the cheapest composition', () => {
    for (const combo of combos) {
      if (combo.slots) {
        const cheapest = Object.fromEntries(
          combo.slots.map((slot) => [
            slot.id,
            [...slotOptions(slot)].sort((a, b) => a.price - b.price)[0].slug,
          ]),
        )
        expect(regularPrice(comboProducts(combo, cheapest)), combo.id).toBeGreaterThan(combo.price)
      } else {
        expect(regularPrice(comboProducts(combo)), combo.id).toBeGreaterThan(combo.price)
      }
    }
  })

  it('reference existing dishes and offer at least three options per slot', () => {
    for (const combo of combos) {
      if (combo.slots) {
        for (const slot of combo.slots) {
          expect(slotOptions(slot).length, `${combo.id} ${slot.id}`).toBeGreaterThanOrEqual(3)
          expect(
            slotOptions(slot).some((p) => p.slug === slot.defaultSlug),
            `${combo.id} ${slot.id} default`,
          ).toBe(true)
        }
      } else {
        expect(comboProducts(combo)).toHaveLength(combo.items.length)
      }
    }
  })

  it('has between six and eight formules with unique ids', () => {
    expect(combos.length).toBeGreaterThanOrEqual(6)
    expect(combos.length).toBeLessThanOrEqual(8)
    expect(new Set(combos.map((combo) => combo.id)).size).toBe(combos.length)
  })
})

describe('cart lines', () => {
  const dresseur = combos.find((combo) => combo.id === 'formule-dresseur')
  const pikachu = combos.find((combo) => combo.id === 'formule-pikachu')

  it('validates product and formule lines', () => {
    expect(isValidLine(productLine(1))).toBe(true)
    expect(isValidLine(productLine(999))).toBe(false)
    expect(isValidLine(formulaLine('formule-pikachu'))).toBe(true)
    expect(isValidLine(formulaLine('formule-pikachu', { entree: 'x' }))).toBe(false)
    expect(isValidLine(formulaLine('formule-dresseur', defaultChoices(dresseur)))).toBe(true)
    expect(
      isValidLine(formulaLine('formule-dresseur', { ...defaultChoices(dresseur), entree: 'pikachu-bento' })),
    ).toBe(false)
    expect(isValidLine(formulaLine('formule-dresseur', { entree: 'ouisticram-gyoza' }))).toBe(false)
    expect(isValidLine({ kind: 'nope' })).toBe(false)
    expect(isValidLine(null)).toBe(false)
  })

  it('resolves lines for the UI', () => {
    expect(resolveLine(productLine(1))).toMatchObject({
      kind: 'product',
      key: 'p:1',
      name: 'Pikachu Bento',
      price: 12.9,
    })
    const line = resolveLine(formulaLine('formule-pikachu'))
    expect(line).toMatchObject({
      kind: 'formula',
      key: 'f:formule-pikachu',
      name: 'Formule Pikachu',
      price: 21.9,
    })
    expect(line.composition).toEqual(['Pikachu Bento', 'Pikachu Spark Soda', 'Rondoudou Dessert'])
    expect(line.image).toMatch(/pikachu-bento/)
    expect(line.regularPrice).toBeCloseTo(24.7)
    expect(resolveLine(formulaLine('nope'))).toBeNull()
  })

  it('suggests a formule when its dishes are all in the cart', () => {
    const lines = comboProducts(pikachu).map((product) => ({
      ...productLine(product.id),
      key: `p:${product.id}`,
      quantity: 1,
    }))
    const [upgrade] = upgradableFormulas(lines)
    expect(upgrade.combo.id).toBe('formule-pikachu')
    expect(upgrade.keys).toEqual(['p:1', 'p:44', 'p:17'])
    expect(upgrade.savings).toBeCloseTo(2.8)
    expect(upgradableFormulas(lines.slice(0, 2))).toEqual([])
  })
})
