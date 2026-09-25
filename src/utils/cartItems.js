import products, { productsById, productsBySlug } from '../data/products'
import { combosById } from '../data/combos'

// The cart stores ids only. A product id is a number; a formule line is a string:
//   "combo:formule-pikachu"
//   "combo:formule-dresseur:entree=ouisticram-gyoza;plat=lucario-bento;boisson=…;dessert=…"
// This module turns those ids into what the UI needs (name, price, image, composition) and
// validates whatever comes back from localStorage.

const PREFIX = 'combo:'

// Products a slot of a configurable formule can be filled with
export function slotOptions(slot) {
  return products.filter((product) => slot.categories.includes(product.category))
}

export function defaultChoices(combo) {
  return Object.fromEntries((combo.slots ?? []).map((slot) => [slot.id, slot.defaultSlug]))
}

export function comboLineId(combo, choices = {}) {
  if (!combo.slots) return `${PREFIX}${combo.id}`
  const parts = combo.slots.map((slot) => `${slot.id}=${choices[slot.id]}`)
  return `${PREFIX}${combo.id}:${parts.join(';')}`
}

// Returns { combo, choices } or null when the id does not describe a valid formule
export function parseComboLineId(id) {
  if (typeof id !== 'string' || !id.startsWith(PREFIX)) return null
  const [comboId, rest] = id.slice(PREFIX.length).split(':')
  const combo = combosById[comboId]
  if (!combo) return null
  if (!combo.slots) return rest === undefined ? { combo, choices: {} } : null
  const choices = {}
  for (const part of (rest ?? '').split(';')) {
    const [slotId, slug] = part.split('=')
    const slot = combo.slots.find((item) => item.id === slotId)
    const product = productsBySlug[slug]
    if (!slot || !product || !slot.categories.includes(product.category)) return null
    choices[slotId] = slug
  }
  if (combo.slots.some((slot) => !choices[slot.id])) return null
  return { combo, choices }
}

// The dishes that make up a formule, in slot order
export function comboProducts(combo, choices = {}) {
  const slugs = combo.slots ? combo.slots.map((slot) => choices[slot.id]) : combo.items
  return slugs.map((slug) => productsBySlug[slug]).filter(Boolean)
}

export function regularPrice(items) {
  return items.reduce((sum, product) => sum + product.price, 0)
}

export function isValidCartId(id) {
  if (Number.isInteger(id)) return productsById[id] !== undefined
  return parseComboLineId(id) !== null
}

// A product-like object for the cart and the header badge
export function resolveCartItem(id) {
  if (Number.isInteger(id)) {
    const product = productsById[id]
    return product ? { ...product, kind: 'product' } : null
  }
  const parsed = parseComboLineId(id)
  if (!parsed) return null
  const { combo, choices } = parsed
  const items = comboProducts(combo, choices)
  const main =
    items.find((product) => !['boisson', 'dessert', 'entree'].includes(product.category)) ?? items[0]
  return {
    id,
    kind: 'combo',
    slug: combo.id,
    name: combo.name,
    price: combo.price,
    image: main?.image,
    type: combo.type ?? main?.type,
    composition: items.map((product) => product.name),
    regularPrice: regularPrice(items),
  }
}
