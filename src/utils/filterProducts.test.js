import { describe, expect, it } from 'vitest'
import filterProducts, { countActiveFilters, emptyFilters } from './filterProducts'
import products from '../data/products'

const filter = (patch) => filterProducts(products, { ...emptyFilters, ...patch })
const names = (list) => list.map((product) => product.name)

describe('filterProducts', () => {
  it('returns every product without filters', () => {
    expect(filter({})).toHaveLength(44)
  })

  it('searches without accents or case, on several fields', () => {
    expect(names(filter({ q: 'PIKACHU' }))).toContain('Pikachu Bento')
    expect(names(filter({ q: 'epice' })).length).toBeGreaterThan(0) // tag "Épicé"
    expect(names(filter({ q: 'tamagoyaki' }))).toEqual(['Pikachu Bento']) // ingredient
    expect(names(filter({ q: 'feu bento' }))).toContain('Goupix Fire Box') // type + category, any order
  })

  it('filters by category, type (any) and tags (all)', () => {
    expect(filter({ category: 'burger' })).toHaveLength(5)
    expect(filter({ types: ['feu', 'eau'] }).every((p) => ['feu', 'eau'].includes(p.type))).toBe(true)
    expect(
      filter({ tags: ['epice', 'signature'] }).every(
        (p) => p.tags.includes('epice') && p.tags.includes('signature'),
      ),
    ).toBe(true)
    expect(filter({ tags: ['epice', 'signature'] }).length).toBeGreaterThan(0)
  })

  it('filters by diet, gluten-free meaning no gluten allergen', () => {
    expect(filter({ diet: 'vegan' }).every((p) => p.diet.includes('vegan'))).toBe(true)
    expect(filter({ diet: 'vegan' }).length).toBeGreaterThanOrEqual(5)
    expect(filter({ diet: 'vegetarien' }).length).toBeGreaterThan(filter({ diet: 'vegan' }).length)
    expect(filter({ diet: 'sans-gluten' }).every((p) => !p.allergens.includes('gluten'))).toBe(true)
    expect(filter({ diet: 'nope' })).toHaveLength(0)
  })

  it('filters by price range, min included and max excluded', () => {
    const list = filter({ price: '10-15' })
    expect(list.every((p) => p.price >= 10 && p.price < 15)).toBe(true)
    expect(names(filter({ price: 'gt20' }))).toEqual([
      'Dracaufeu Spicy Menu',
      'Mewtwo Deluxe Menu',
      'Léviator Ocean Menu',
    ])
  })

  it('falls back to all prices for an unknown range', () => {
    expect(filter({ price: 'nope' })).toHaveLength(44)
  })

  it('combines filters and can return nothing', () => {
    expect(filter({ category: 'boisson', types: ['feu'] })).toEqual([])
  })

  it('counts active filters', () => {
    expect(countActiveFilters(emptyFilters)).toBe(0)
    expect(countActiveFilters({ ...emptyFilters, q: ' ', price: 'lt10', tags: ['nouveau'] })).toBe(2)
    expect(countActiveFilters({ ...emptyFilters, diet: 'vegan' })).toBe(1)
  })
})
