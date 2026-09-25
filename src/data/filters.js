// Lists used by the menu filters. Ids are URL-safe (they end up in ?category=…&tag=…),
// labels are what people read.

export const categories = [
  { id: 'bento', label: 'Bento', description: 'Le plat complet, compartimenté' },
  { id: 'burger', label: 'Burger', description: 'Pain maison, frites maison' },
  { id: 'bowl', label: 'Bowl', description: 'Frais, coloré, à composer' },
  { id: 'dessert', label: 'Dessert', description: 'Sucré, en forme de Pokémon' },
  { id: 'boisson', label: 'Boisson', description: 'Sodas, thés, shots' },
  { id: 'menu', label: 'Menu', description: 'La formule des grands appétits' },
]

export const tags = [
  { id: 'populaire', label: 'Populaire' },
  { id: 'nouveau', label: 'Nouveau' },
  { id: 'epice', label: 'Épicé' },
  { id: 'vegetarien', label: 'Végétarien' },
  { id: 'dessert', label: 'Dessert' },
]

// A product matches a range when min <= price < max
export const priceRanges = [
  { id: 'all', label: 'Tous les prix', min: 0, max: Infinity },
  { id: 'lt10', label: 'Moins de 10 €', min: 0, max: 10 },
  { id: '10-15', label: '10 € à 15 €', min: 10, max: 15 },
  { id: '15-20', label: '15 € à 20 €', min: 15, max: 20 },
  { id: 'gt20', label: 'Plus de 20 €', min: 20, max: Infinity },
]

export const categoriesById = Object.fromEntries(categories.map((item) => [item.id, item]))
export const tagsById = Object.fromEntries(tags.map((item) => [item.id, item]))
export const priceRangesById = Object.fromEntries(priceRanges.map((item) => [item.id, item]))
