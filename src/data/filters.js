// Lists used by the sidebar filters.
// They are written by hand so the order displayed in the UI is controlled here.

export const categories = ['Bento', 'Burger', 'Bowl', 'Dessert', 'Boisson', 'Menu']

export const tags = ['populaire', 'épicé', 'végétarien', 'dessert', 'nouveau']

// A product matches a range when: min <= price < max
export const priceRanges = [
  { id: 'all', label: 'Tous les prix', min: 0, max: Infinity },
  { id: 'lt10', label: 'Moins de 10 €', min: 0, max: 10 },
  { id: '10-15', label: '10 € à 15 €', min: 10, max: 15 },
  { id: '15-20', label: '15 € à 20 €', min: 15, max: 20 },
  { id: 'gt20', label: 'Plus de 20 €', min: 20, max: Infinity },
]
