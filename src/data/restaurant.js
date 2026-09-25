// Everything the site says about the (fictional) restaurant, in one place:
// used by the contact page, the footer, the reservation form and the structured data.
export const restaurant = {
  name: 'PokéBistro',
  tagline: 'Le bistro qui sert l’univers Pokémon dans l’assiette.',
  since: 2019,
  address: {
    street: '12 route Victoire',
    district: 'Quartier Bourg Palette',
    postalCode: '91000',
    city: 'Évry-Courcouronnes',
    country: 'France',
  },
  phone: '01 23 45 67 89',
  phoneHref: 'tel:+33123456789',
  email: 'bonjour@pokebistro.fr',
  // Opening hours: two services, every day
  hours: [
    { days: 'Lundi – Vendredi', slots: ['11h30 – 14h30', '18h30 – 22h30'] },
    { days: 'Samedi – Dimanche', slots: ['12h00 – 15h00', '18h30 – 23h00'] },
  ],
  services: ['Sur place', 'À emporter', 'Livraison Roucool', 'Groupes jusqu’à 8', 'Anniversaires'],
  // Reservation slots offered by the form (lunch + dinner)
  reservationSlots: [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ],
  maxGuests: 8,
  social: [
    { label: 'Instagram', href: 'https://instagram.com', handle: '@pokebistro' },
    { label: 'TikTok', href: 'https://tiktok.com', handle: '@pokebistro' },
  ],
}
