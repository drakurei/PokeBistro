import { priceRangesById, categoriesById, tagsById } from '../data/filters'
import { typesById } from '../data/types'
import { normalize } from './text'

export const emptyFilters = { q: '', category: '', types: [], tags: [], price: 'all' }

// Builds the text a product can be found by: name, Pokémon, category, type, tags, keywords, ingredients.
function searchableText(product) {
  return normalize(
    [
      product.name,
      product.pokemon,
      categoriesById[product.category]?.label,
      typesById[product.type]?.label,
      ...product.tags.map((tag) => tagsById[tag]?.label ?? tag),
      ...product.keywords,
      ...product.ingredients,
    ].join(' '),
  )
}

// Returns the products matching ALL active filters.
// - q: every word must be found (order-free): "bento épicé" matches "Goupix Fire Box"
// - category / price: single choice
// - types: any of the selected types
// - tags: all of the selected tags
export default function filterProducts(products, filters = emptyFilters) {
  const words = normalize(filters.q).split(/\s+/).filter(Boolean)
  const range = priceRangesById[filters.price] ?? priceRangesById.all
  const types = new Set(filters.types ?? [])
  const tags = filters.tags ?? []

  return products.filter((product) => {
    if (words.length > 0) {
      const text = searchableText(product)
      if (!words.every((word) => text.includes(word))) return false
    }
    if (filters.category && product.category !== filters.category) return false
    if (types.size > 0 && !types.has(product.type)) return false
    if (tags.length > 0 && !tags.every((tag) => product.tags.includes(tag))) return false
    return product.price >= range.min && product.price < range.max
  })
}

export function countActiveFilters(filters) {
  return [
    filters.q.trim() !== '',
    filters.category !== '',
    filters.types.length > 0,
    filters.tags.length > 0,
    filters.price !== 'all',
  ].filter(Boolean).length
}
