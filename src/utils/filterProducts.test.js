import { describe, expect, it } from 'vitest'
import filterProducts, { countActiveFilters, emptyFilters } from './filterProducts'
import products from '../data/products'

const filter = (patch) => filterProducts(products, { ...emptyFilters, ...patch })
const names = (list) => list.map((product) => product.name)

describe('filterProducts', () => {
  it('returns every product without filters', () => {
    expect(filter({})).toHaveLength(28)
  })

  it('searches without accents or case, on several fields', () => {
    expect(names(filter({ q: 'PIKACHU' }))).toContain('Pikachu Bento')
    expect(names(filter({ q: 'epice' })).length).toBeGreaterThan(0) // tag "Épicé"
    expect(names(filter({ q: 'tamagoyaki' }))).toEqual(['Pikachu Bento']) // ingredient
    expect(names(filter({ q: 'feu bento' }))).toContain('Goupix Fire Box') // type + category, any order
  })

  it('filters by category, type (any) and tags (all)', () => {
    expect(filter({ category: 'burger' })).toHaveLength(3)
    expect(filter({ types: ['feu', 'eau'] }).every((p) => ['feu', 'eau'].includes(p.type))).toBe(true)
    expect(
      filter({ tags: ['epice', 'populaire'] }).every(
        (p) => p.tags.includes('epice') && p.tags.includes('populaire'),
      ),
    ).toBe(true)
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
    expect(filter({ price: 'nope' })).toHaveLength(28)
  })

  it('combines filters and can return nothing', () => {
    expect(filter({ category: 'boisson', types: ['feu'] })).toEqual([])
  })

  it('counts active filters', () => {
    expect(countActiveFilters(emptyFilters)).toBe(0)
    expect(countActiveFilters({ ...emptyFilters, q: ' ', price: 'lt10', tags: ['nouveau'] })).toBe(2)
  })
})
