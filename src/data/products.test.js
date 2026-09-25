import { describe, expect, it } from 'vitest'
import products, { productsBySlug, signatureProducts } from './products'
import { allergensById, categoriesById, dietsById, tagsById } from './filters'
import { typesById } from './types'

// The catalogue is data, but it is also a contract for the rest of the site
describe('catalogue', () => {
  it('has 44 dishes with unique ids and slugs', () => {
    expect(products).toHaveLength(44)
    expect(new Set(products.map((p) => p.id)).size).toBe(44)
    expect(new Set(products.map((p) => p.slug)).size).toBe(44)
    expect(products.map((p) => p.id)).toEqual(products.map((_, i) => i + 1))
  })

  it('resolves an image file for every dish', () => {
    for (const product of products) {
      expect(product.image, `${product.slug} image`).toMatch(/\.webp$/)
    }
  })

  it('only references known categories, types, tags, diets and allergens', () => {
    for (const product of products) {
      expect(categoriesById[product.category], `${product.slug} category`).toBeDefined()
      expect(typesById[product.type], `${product.slug} type`).toBeDefined()
      for (const tag of product.tags) expect(tagsById[tag], `${product.slug} tag ${tag}`).toBeDefined()
      for (const diet of product.diet) expect(dietsById[diet], `${product.slug} diet ${diet}`).toBeDefined()
      for (const allergen of product.allergens) expect(allergensById[allergen], `${product.slug} allergen`).toBeDefined()
      expect([0, 1, 2, 3]).toContain(product.spicy)
    }
  })

  it('keeps editorial badges rare and honest', () => {
    expect(signatureProducts).toHaveLength(6)
    expect(products.filter((p) => p.tags.includes('nouveau')).length).toBeLessThanOrEqual(8)
    expect(products.filter((p) => p.tags.includes('chef')).length).toBeLessThanOrEqual(5)
    expect(products.some((p) => p.tags.includes('populaire') || p.tags.includes('bestseller'))).toBe(false)
  })

  it('has complete, credible content', () => {
    for (const product of products) {
      expect(product.description.length, product.slug).toBeGreaterThan(40)
      expect(product.ingredients.length, product.slug).toBeGreaterThanOrEqual(3)
      expect(product.keywords.length, product.slug).toBeGreaterThanOrEqual(4)
      expect(product.price).toBeGreaterThan(3)
      expect(product.price).toBeLessThan(30)
      expect(product.pokemon).toBeTruthy()
    }
    expect(productsBySlug['pikachu-bento'].tags).toContain('signature')
    // Sweet bowls are desserts, the big plates have their own category
    expect(productsBySlug['mew-berry-bowl'].category).toBe('dessert')
    expect(productsBySlug['mewtwo-deluxe-menu'].category).toBe('assiette')
    expect(productsBySlug['fresh-ice-blue-bowl'].pokemon).toBe('Givrali')
    // Vegan implies vegetarian, and vegan dishes carry no milk or egg allergen
    for (const product of products.filter((p) => p.diet.includes('vegan'))) {
      expect(product.diet).toContain('vegetarien')
      expect(product.allergens).not.toContain('lait')
      expect(product.allergens).not.toContain('oeufs')
    }
  })
})
