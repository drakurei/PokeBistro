import products, { productsById, productsBySlug } from '../data/products'
import { combos, combosById } from '../data/combos'
import { lineKey, productKey } from '../reducers/cartReducer'

// Turns cart lines into what the UI needs (name, price, image, composition) and validates
// whatever comes back from localStorage.

// Products a slot of a configurable formule can be filled with
export function slotOptions(slot) {
  return products.filter(
    (product) =>
      slot.categories.includes(product.category) &&
      (slot.minPrice === undefined || product.price >= slot.minPrice),
  )
}

export function defaultChoices(combo) {
  return Object.fromEntries((combo.slots ?? []).map((slot) => [slot.id, slot.defaultSlug]))
}

// The dishes that make up a formule, in slot order
export function comboProducts(combo, choices = {}) {
  const slugs = combo.slots ? combo.slots.map((slot) => choices[slot.id]) : combo.items
  return slugs.map((slug) => productsBySlug[slug]).filter(Boolean)
}

export function regularPrice(items) {
  return items.reduce((sum, product) => sum + product.price, 0)
}

export const productLine = (productId) => ({ kind: 'product', productId })
export const formulaLine = (formulaId, choices = {}) => ({ kind: 'formula', formulaId, choices })

// Validates the choices of a configurable formule (every slot filled with an allowed dish)
export function validChoices(combo, choices) {
  if (!combo.slots) return choices === undefined || Object.keys(choices).length === 0
  if (!choices || typeof choices !== 'object') return false
  return combo.slots.every((slot) => {
    const product = productsBySlug[choices[slot.id]]
    return product && slotOptions(slot).includes(product)
  })
}

export function isValidLine(line) {
  if (!line || typeof line !== 'object') return false
  if (line.kind === 'product')
    return Number.isInteger(line.productId) && productsById[line.productId] !== undefined
  if (line.kind === 'formula') {
    const combo = combosById[line.formulaId]
    return Boolean(combo) && validChoices(combo, line.choices ?? {})
  }
  return false
}

// A product-like object for the cart drawer, the badge and the order summary
export function resolveLine(line) {
  if (line.kind === 'product') {
    const product = productsById[line.productId]
    return product ? { ...product, kind: 'product', key: productKey(product.id) } : null
  }
  const combo = combosById[line.formulaId]
  if (!combo || !validChoices(combo, line.choices ?? {})) return null
  const items = comboProducts(combo, line.choices)
  const main =
    items.find((product) => !['boisson', 'dessert', 'entree'].includes(product.category)) ?? items[0]
  return {
    kind: 'formula',
    key: lineKey(line),
    id: combo.id,
    slug: combo.id,
    name: combo.name,
    price: combo.price,
    image: main?.image,
    type: combo.type ?? main?.type,
    composition: items.map((product) => product.name),
    products: items,
    regularPrice: regularPrice(items),
  }
}

// Fixed formules whose every dish is already in the cart as separate product lines
export function upgradableFormulas(lines) {
  const productIds = new Set(lines.filter((line) => line.kind === 'product').map((line) => line.productId))
  return combos
    .filter((combo) => combo.items && combo.items.every((slug) => productIds.has(productsBySlug[slug]?.id)))
    .map((combo) => {
      const items = comboProducts(combo)
      return {
        combo,
        keys: items.map((product) => productKey(product.id)),
        savings: regularPrice(items) - combo.price,
      }
    })
    .filter((entry) => entry.savings > 0)
}
