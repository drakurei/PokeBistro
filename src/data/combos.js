// Formules: composed menus sold at a set price, cheaper than the dishes bought separately.
// Fixed formules list their dishes; configurable ones offer one choice per slot (a slot can
// restrict categories and a minimum price so the set price always stays below the carte).
// Prices are checked by the unit tests, including the cheapest possible composition.

export const combos = [
  {
    id: 'formule-dejeuner',
    name: 'Formule Déjeuner',
    eyebrow: 'Du lundi au vendredi, le midi',
    badge: null,
    type: null,
    description: 'Un plat de la carte et une boisson, servis vite et bien, pour les pauses qui comptent.',
    availability: { label: 'Lundi – vendredi · 11h30 – 14h30', days: [1, 2, 3, 4, 5], service: 'lunch' },
    slots: [
      {
        id: 'plat',
        label: 'Plat',
        categories: ['bento', 'bowl', 'burger'],
        minPrice: 12.5,
        defaultSlug: 'pikachu-bento',
      },
      { id: 'boisson', label: 'Boisson', categories: ['boisson'], defaultSlug: 'germignon-green-tea' },
    ],
    price: 14.9,
  },
  {
    id: 'formule-pikachu',
    name: 'Formule Pikachu',
    eyebrow: 'La formule historique',
    badge: 'signature',
    type: 'electrik',
    description:
      'Le bento star, son soda pétillant et le dessert tout rond : la formule qui a lancé la maison.',
    items: ['pikachu-bento', 'pikachu-spark-soda', 'rondoudou-dessert'],
    price: 21.9,
  },
  {
    id: 'formule-feu',
    name: 'Formule Feu',
    eyebrow: 'Pour ceux qui aiment quand ça pique',
    badge: 'signature',
    type: 'feu',
    description: 'L’assiette de Dracaufeu, des mochis qui piquent un peu et le shot qui réveille.',
    items: ['dracaufeu-spicy-menu', 'poussifeu-mochi', 'voltali-energy-shot'],
    price: 29.9,
  },
  {
    id: 'formule-aqua',
    name: 'Formule Aqua',
    eyebrow: 'Fraîcheur complète',
    badge: null,
    type: 'eau',
    description:
      'Le bowl bleu de Carapuce, un soda qui fait des vagues et la banquise de Lokhlass pour finir.',
    items: ['carapuce-blue-bowl', 'magicarpe-splash-soda', 'lokhlass-ice-cream'],
    price: 21.9,
  },
  {
    id: 'formule-dresseur',
    name: 'Formule Dresseur',
    eyebrow: 'Vous composez',
    badge: 'nouveau',
    type: null,
    description: 'Une entrée, un plat, une boisson et un dessert, à choisir dans la carte, à prix fixe.',
    slots: [
      { id: 'entree', label: 'Entrée', categories: ['entree'], defaultSlug: 'ouisticram-gyoza' },
      { id: 'plat', label: 'Plat', categories: ['bento', 'burger'], defaultSlug: 'lucario-bento' },
      { id: 'boisson', label: 'Boisson', categories: ['boisson'], defaultSlug: 'amphinobi-blue-tea' },
      { id: 'dessert', label: 'Dessert', categories: ['dessert'], defaultSlug: 'poussifeu-mochi' },
    ],
    price: 26.9,
  },
  {
    id: 'formule-duo',
    name: 'Formule Duo',
    eyebrow: 'À deux',
    badge: null,
    type: null,
    description: 'Deux plats, deux boissons et un dessert à partager. Chacun choisit, la table économise.',
    slots: [
      {
        id: 'plat1',
        label: 'Premier plat',
        categories: ['bento', 'burger'],
        minPrice: 13.5,
        defaultSlug: 'lucario-power-burger',
      },
      {
        id: 'plat2',
        label: 'Second plat',
        categories: ['bento', 'burger'],
        minPrice: 13.5,
        defaultSlug: 'salameche-bento',
      },
      {
        id: 'boisson1',
        label: 'Première boisson',
        categories: ['boisson'],
        defaultSlug: 'pikachu-spark-soda',
      },
      {
        id: 'boisson2',
        label: 'Seconde boisson',
        categories: ['boisson'],
        defaultSlug: 'amphinobi-blue-tea',
      },
      {
        id: 'dessert',
        label: 'Dessert à partager',
        categories: ['dessert'],
        defaultSlug: 'mentali-velvet-cake',
      },
    ],
    price: 37.9,
  },
  {
    id: 'formule-pichu',
    name: 'Formule Pichu',
    eyebrow: 'Pour les petits dresseurs',
    badge: null,
    type: 'electrik',
    description:
      'Du poulet croustillant en portion adaptée, un soda qui fait des bulles et le flan de Togepi.',
    items: ['roucool-crispy', 'magicarpe-splash-soda', 'togepi-egg-pudding'],
    note: 'Jusqu’à 12 ans, portions adaptées.',
    price: 14.9,
  },
  {
    id: 'formule-signature',
    name: 'Formule Signature',
    eyebrow: 'La sélection du chef',
    badge: 'chef',
    type: 'psy',
    description:
      'Gyozas pour ouvrir, le menu prestige de Mewtwo, le velours de Mentali et un thé bleu glacé.',
    items: ['ouisticram-gyoza', 'mewtwo-deluxe-menu', 'mentali-velvet-cake', 'amphinobi-blue-tea'],
    price: 39.9,
  },
]

export const combosById = Object.fromEntries(combos.map((combo) => [combo.id, combo]))

export function getCombo(id) {
  return combosById[id] ?? null
}

// Fixed formules that contain a given dish (for "Existe aussi en formule")
export function combosContaining(slug) {
  return combos.filter((combo) => combo.items?.includes(slug))
}
