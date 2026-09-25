import { describe, expect, it } from 'vitest'
import { cartSuggestions, suggestedWith } from './suggestions'
import { productsBySlug } from '../data/products'

describe('suggestions', () => {
  it('pairs a dish with its formule companions first', () => {
    const slugs = suggestedWith(productsBySlug['pikachu-bento'].id).map((item) => item.slug)
    expect(slugs).toContain('pikachu-spark-soda')
    expect(slugs).toContain('rondoudou-dessert')
    expect(slugs).toHaveLength(3)
    expect(slugs).not.toContain('pikachu-bento')
  })

  it('offers a choux of the same type after a main, a tea after a bowl', () => {
    const burger = suggestedWith(productsBySlug['lucario-power-burger'].id)
    expect(burger.some((item) => item.subcategory === 'choux' && item.type === 'combat')).toBe(true)
    const bowl = suggestedWith(productsBySlug['bulbizarre-garden-bowl'].id)
    expect(bowl.some((item) => item.category === 'boisson' && /tea|th[ée]/i.test(item.name))).toBe(true)
  })

  it('offers a drink and another kind of dessert after a dessert, never the tower', () => {
    const picks = suggestedWith(productsBySlug['ectoplasma-dark-profiteroles'].id)
    expect(picks.some((item) => item.category === 'boisson')).toBe(true)
    expect(picks.some((item) => item.category === 'dessert' && item.subcategory !== 'choux')).toBe(true)
    expect(picks.map((item) => item.slug)).not.toContain('pikachu-croquembouche')
  })

  it('never suggests what is excluded', () => {
    const soda = productsBySlug['pikachu-spark-soda'].id
    const slugs = suggestedWith(productsBySlug['pikachu-bento'].id, [soda]).map((item) => item.slug)
    expect(slugs).not.toContain('pikachu-spark-soda')
  })

  it('completes a cart with what is missing, dessert first', () => {
    const bento = productsBySlug['pikachu-bento'].id
    const picks = cartSuggestions([bento])
    expect(picks.map((item) => item.category)).toEqual(['dessert', 'boisson'])
    expect(picks[0].subcategory).toBe('choux')
    expect(picks[0].type).toBe('electrik')
    const withDrink = cartSuggestions([bento, productsBySlug['pikachu-spark-soda'].id]).map(
      (item) => item.category,
    )
    expect(withDrink).toEqual(['dessert'])
    expect(cartSuggestions([])).toEqual([])
  })
})
