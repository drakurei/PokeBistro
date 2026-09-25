import { describe, expect, it } from 'vitest'
import { combos } from '../data/combos'
import {
  comboLineId,
  comboProducts,
  defaultChoices,
  isValidCartId,
  parseComboLineId,
  regularPrice,
  resolveCartItem,
  slotOptions,
} from './cartItems'

describe('formules', () => {
  it('always cost less than their dishes bought separately, including the cheapest composition', () => {
    for (const combo of combos) {
      if (combo.slots) {
        const cheapest = Object.fromEntries(
          combo.slots.map((slot) => [slot.id, slotOptions(slot).sort((a, b) => a.price - b.price)[0].slug]),
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
          expect(slotOptions(slot).some((p) => p.slug === slot.defaultSlug)).toBe(true)
        }
      } else {
        expect(comboProducts(combo)).toHaveLength(combo.items.length)
      }
    }
  })
})

describe('cart ids', () => {
  const dresseur = combos.find((combo) => combo.slots)
  const pikachu = combos.find((combo) => combo.id === 'formule-pikachu')

  it('round-trips fixed and configurable formules', () => {
    expect(parseComboLineId(comboLineId(pikachu))).toEqual({ combo: pikachu, choices: {} })
    const choices = defaultChoices(dresseur)
    expect(parseComboLineId(comboLineId(dresseur, choices))).toEqual({ combo: dresseur, choices })
  })

  it('rejects tampered or foreign ids', () => {
    expect(isValidCartId('combo:nope')).toBe(false)
    expect(
      isValidCartId(
        'combo:formule-dresseur:entree=pikachu-bento;plat=lucario-bento;boisson=amphinobi-blue-tea;dessert=poussifeu-mochi',
      ),
    ).toBe(false)
    expect(isValidCartId('combo:formule-dresseur:entree=ouisticram-gyoza')).toBe(false)
    expect(isValidCartId('combo:formule-pikachu:entree=x')).toBe(false)
    expect(isValidCartId(999)).toBe(false)
    expect(isValidCartId(1)).toBe(true)
    expect(isValidCartId(comboLineId(pikachu))).toBe(true)
  })

  it('resolves products and formules to cart lines', () => {
    expect(resolveCartItem(1)).toMatchObject({ kind: 'product', name: 'Pikachu Bento', price: 12.9 })
    const line = resolveCartItem(comboLineId(pikachu))
    expect(line).toMatchObject({ kind: 'combo', name: 'Formule Pikachu', price: 21.9 })
    expect(line.composition).toEqual(['Pikachu Bento', 'Pikachu Spark Soda', 'Rondoudou Dessert'])
    expect(line.image).toMatch(/pikachu-bento/)
    expect(resolveCartItem('combo:nope')).toBeNull()
  })
})
