// Formules: composed menus sold at a set price, cheaper than the dishes bought separately.
// Fixed formules list their dishes; the configurable one ("Dresseur") offers one choice per slot.
// Prices are checked by the unit tests: a formule always costs less than the sum of its dishes.

export const combos = [
  {
    id: 'formule-pikachu',
    name: 'Formule Pikachu',
    eyebrow: 'La plus demandée',
    badge: 'populaire',
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
    id: 'formule-signature',
    name: 'Formule Signature',
    eyebrow: 'La sélection du chef',
    badge: 'signature',
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
