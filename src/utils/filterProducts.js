import { priceRanges } from '../data/filters'

// Lowercase without accents, so that "epice" also matches "épicé"
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

// Returns the products that match ALL the active filters
function filterProducts(products, filters) {
  const search = normalize(filters.search.trim())
  const range = priceRanges.find((priceRange) => priceRange.id === filters.price)

  return products.filter((product) => {
    // 1. Text search on the name, the category, the keywords and the tags
    const searchableText = normalize([product.name, product.category, ...product.keywords, ...product.tags].join(' '))
    const matchesSearch = search === '' || searchableText.includes(search)

    // 2. Category
    const matchesCategory = filters.category === '' || product.category === filters.category

    // 3. Tag
    const matchesTag = filters.tag === '' || product.tags.includes(filters.tag)

    // 4. Price range (min included, max excluded)
    const matchesPrice = product.price >= range.min && product.price < range.max

    return matchesSearch && matchesCategory && matchesTag && matchesPrice
  })
}

export default filterProducts
