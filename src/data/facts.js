import products from './products'
import { types } from './types'
import { restaurant } from './restaurant'

// Quick facts shown on the home page and the story page, computed from the catalogue
// so they never go stale when a dish or a type is added.
export const facts = [
  { value: products.length, label: 'plats à la carte', suffix: '' },
  { value: types.length, label: 'types Pokémon', suffix: '' },
  { value: restaurant.hours[0].slots.length, label: 'services par jour', suffix: '' },
  { value: 100, label: 'fait maison', suffix: ' %' },
]
