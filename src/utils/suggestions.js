import products, { productsById } from '../data/products'
import { combos } from '../data/combos'

// "À déguster avec", without any invented popularity data. The pairings follow the way the house
// composes a meal: a dish goes with the dishes it shares a formule with, a main calls for a choux
// of its own type and a drink (a tea after a bowl), a dessert calls for a drink, a drink for a
// dessert. Deterministic, and honest about where it comes from.

const MAINS = ['bento', 'burger', 'bowl', 'assiette']
const isTea = (product) =>
  product.category === 'boisson' && /th[ée]|tea/i.test(`${product.name} ${product.keywords.join(' ')}`)

function formulaCompanions(product) {
  const companions = []
  const ordered = [...combos].sort((a, b) => Number(Boolean(b.items)) - Number(Boolean(a.items)))
  for (const combo of ordered) {
    const slugs = combo.items ?? combo.slots.map((slot) => slot.defaultSlug)
    if (!slugs.includes(product.slug)) continue
    for (const slug of slugs) if (slug !== product.slug) companions.push(slug)
  }
  return companions
}

// First dish of a category, same type when possible; `where` narrows further (a sub-group, a tea)
function firstOf(category, type, exclude, where = () => true) {
  const pool = products.filter((item) => item.category === category && !exclude.has(item.id) && where(item))
  return pool.find((item) => item.type === type) ?? pool[0]
}

const isChoux = (item) => item.subcategory === 'choux' && item.price < 12
const notTower = (item) => item.price < 12

export function suggestedWith(productId, excludeIds = [], max = 3) {
  const product = productsById[productId]
  if (!product) return []
  const exclude = new Set([product.id, ...excludeIds])
  const picks = []
  const push = (item) => {
    if (item && !exclude.has(item.id) && picks.length < max) {
      picks.push(item)
      exclude.add(item.id)
    }
  }
  for (const slug of formulaCompanions(product).slice(0, 2)) push(products.find((item) => item.slug === slug))

  if (MAINS.includes(product.category)) {
    push(firstOf('dessert', product.type, exclude, isChoux))
    push(
      product.category === 'bowl'
        ? firstOf('boisson', product.type, exclude, isTea)
        : firstOf('boisson', product.type, exclude),
    )
  } else if (product.category === 'dessert') {
    push(
      product.subcategory === 'choux'
        ? firstOf('boisson', product.type, exclude, isTea)
        : firstOf('boisson', product.type, exclude),
    )
    push(
      firstOf(
        'dessert',
        product.type,
        exclude,
        (item) => item.subcategory !== product.subcategory && notTower(item),
      ),
    )
  } else if (product.category === 'boisson') {
    push(firstOf('dessert', product.type, exclude, isChoux))
    push(firstOf('bento', product.type, exclude))
  } else {
    push(firstOf('bento', product.type, exclude))
    push(firstOf('boisson', product.type, exclude))
  }
  push(firstOf('dessert', product.type, exclude, notTower))
  push(firstOf('boisson', product.type, exclude))
  return picks
}

// For the cart: what is missing from a meal (a dessert, a drink), matched to the first main dish.
// The dessert offered is a choux of the same type: the signature, never the tower.
export function cartSuggestions(productIds, max = 2) {
  const inCart = productIds.map((id) => productsById[id]).filter(Boolean)
  if (inCart.length === 0) return []
  const categories = new Set(inCart.map((item) => item.category))
  const lead = inCart.find((item) => MAINS.includes(item.category)) ?? inCart[0]
  const exclude = new Set(productIds)
  const picks = []
  if (!categories.has('dessert'))
    picks.push(
      firstOf('dessert', lead.type, exclude, isChoux) ?? firstOf('dessert', lead.type, exclude, notTower),
    )
  if (!categories.has('boisson'))
    picks.push(
      lead.category === 'bowl'
        ? firstOf('boisson', lead.type, exclude, isTea)
        : firstOf('boisson', lead.type, exclude),
    )
  return picks.filter(Boolean).slice(0, max)
}
