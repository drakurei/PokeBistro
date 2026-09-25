// Lists used by the menu filters. Ids are URL-safe (they end up in ?category=…&tag=…),
// labels are what people read. Categories are in menu order.

export const categories = [
  { id: 'entree', label: 'Entrée', plural: 'Entrées', description: 'Pour commencer, ou pour partager' },
  { id: 'bento', label: 'Bento', plural: 'Bentos', description: 'Le plat complet, compartimenté' },
  { id: 'burger', label: 'Burger', plural: 'Burgers', description: 'Pain maison, frites maison' },
  { id: 'bowl', label: 'Bowl', plural: 'Bowls', description: 'Frais, coloré, à composer' },
  {
    id: 'assiette',
    label: 'Grande assiette',
    plural: 'Grandes assiettes',
    description: 'Les plats du chef, dressés à l’assiette',
  },
  { id: 'dessert', label: 'Dessert', plural: 'Desserts', description: 'Sucré, en forme de Pokémon' },
  { id: 'boisson', label: 'Boisson', plural: 'Boissons', description: 'Sodas, thés, shots' },
]

// Sub-groups of the dessert section (product.subcategory), in the order of the carte
export const dessertGroups = [
  { id: 'choux', label: 'Choux & profiteroles', description: 'La signature sucrée de la maison' },
  { id: 'patisserie', label: 'Gâteaux & douceurs', description: 'Moelleux, mochis, puddings' },
  { id: 'glace', label: 'Desserts glacés', description: 'Parfaits et glaces maison' },
  { id: 'fruits', label: 'Fruits & bowls', description: 'Légers, frais, colorés' },
]
export const dessertGroupsById = Object.fromEntries(dessertGroups.map((group) => [group.id, group]))

// Editorial tags only: nothing here claims sales data
export const tags = [
  { id: 'signature', label: 'Signature' },
  { id: 'chef', label: 'Choix du chef' },
  { id: 'nouveau', label: 'Nouveau' },
  { id: 'epice', label: 'Épicé' },
  { id: 'vegetarien', label: 'Végétarien' },
  { id: 'frais', label: 'Frais' },
  { id: 'leger', label: 'Léger' },
  { id: 'gourmand', label: 'Gourmand' },
]

// Dietary filters, derived from product.diet and product.allergens
export const diets = [
  { id: 'vegetarien', label: 'Végétarien' },
  { id: 'vegan', label: 'Végan' },
  { id: 'sans-gluten', label: 'Sans gluten' },
]

// The 14 allergens of EU regulation 1169/2011 (ids used in product.allergens)
export const allergens = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'crustaces', label: 'Crustacés' },
  { id: 'oeufs', label: 'Œufs' },
  { id: 'poissons', label: 'Poissons' },
  { id: 'arachides', label: 'Arachides' },
  { id: 'soja', label: 'Soja' },
  { id: 'lait', label: 'Lait' },
  { id: 'fruits-a-coque', label: 'Fruits à coque' },
  { id: 'celeri', label: 'Céleri' },
  { id: 'moutarde', label: 'Moutarde' },
  { id: 'sesame', label: 'Sésame' },
  { id: 'sulfites', label: 'Sulfites' },
  { id: 'lupin', label: 'Lupin' },
  { id: 'mollusques', label: 'Mollusques' },
]

export const spicyLabels = ['', 'Légèrement relevé', 'Relevé', 'Très relevé']

// A product matches a range when min <= price < max
export const priceRanges = [
  { id: 'all', label: 'Tous les prix', min: 0, max: Infinity },
  { id: 'lt10', label: 'Moins de 10 €', min: 0, max: 10 },
  { id: '10-15', label: '10 € à 15 €', min: 10, max: 15 },
  { id: '15-20', label: '15 € à 20 €', min: 15, max: 20 },
  { id: 'gt20', label: 'Plus de 20 €', min: 20, max: Infinity },
]

// Sort orders offered on the menu ('' = the order of the carte)
export const sortOptions = [
  { id: '', label: 'Ordre de la carte' },
  { id: 'price-asc', label: 'Prix croissant' },
  { id: 'price-desc', label: 'Prix décroissant' },
  { id: 'new', label: 'Nouveautés d’abord' },
]

export const categoriesById = Object.fromEntries(categories.map((item) => [item.id, item]))
export const tagsById = Object.fromEntries(tags.map((item) => [item.id, item]))
export const dietsById = Object.fromEntries(diets.map((item) => [item.id, item]))
export const allergensById = Object.fromEntries(allergens.map((item) => [item.id, item]))
export const priceRangesById = Object.fromEntries(priceRanges.map((item) => [item.id, item]))
export const sortOptionsById = Object.fromEntries(sortOptions.map((item) => [item.id, item]))
