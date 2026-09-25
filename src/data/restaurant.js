// Everything the site says about the (fictional) restaurant, in one place:
// used by the contact page, the footer, the reservation and order flows and the structured data.
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
  // Opening hours, for display
  hours: [
    { days: 'Lundi – Vendredi', slots: ['11h30 – 14h30', '18h30 – 22h30'] },
    { days: 'Samedi – Dimanche', slots: ['12h00 – 15h00', '18h30 – 23h00'] },
  ],
  // The same hours, structured (0 = Sunday), for the order and reservation flows
  schedule: [
    {
      days: [1, 2, 3, 4, 5],
      services: [
        ['11:30', '14:30'],
        ['18:30', '22:30'],
      ],
    },
    {
      days: [6, 0],
      services: [
        ['12:00', '15:00'],
        ['18:30', '23:00'],
      ],
    },
  ],
  // Closed every year on these days (month-day) or on a given date (full ISO date)
  closedDates: ['12-25', '01-01', '05-01'],
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
  seating: [
    { id: 'interieur', label: 'Intérieur', description: 'La salle, ses banquettes et le comptoir' },
    { id: 'terrasse', label: 'Terrasse', description: 'Dix tables, d’avril à octobre, selon la météo' },
  ],
  // Fictional policy, shown with the reservation summary and in the calendar file
  cancellationPolicy: 'Annulation gratuite jusqu’à 2 h avant le service, par téléphone ou par email.',
  social: [
    { label: 'Instagram', href: 'https://instagram.com', handle: '@pokebistro' },
    { label: 'TikTok', href: 'https://tiktok.com', handle: '@pokebistro' },
  ],
}
