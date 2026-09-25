import { describe, expect, it } from 'vitest'
import products, { productsBySlug } from './products'
import { categoriesById, tagsById } from './filters'
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

  it('only references known categories, types and tags', () => {
    for (const product of products) {
      expect(categoriesById[product.category], `${product.slug} category`).toBeDefined()
      expect(typesById[product.type], `${product.slug} type`).toBeDefined()
      for (const tag of product.tags) expect(tagsById[tag], `${product.slug} tag ${tag}`).toBeDefined()
    }
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
  })
})
