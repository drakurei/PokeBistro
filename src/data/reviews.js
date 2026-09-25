// Customer reviews.
//
// PokéBistro is a fictional restaurant: everything below is DEMONSTRATION content and the site says so.
// The shape mirrors what a real source would return (a Google Business Profile read through a small
// backend proxy, for instance), so plugging real data later means replacing `getReviews` only.

export const DEMO_NOTICE = 'Avis de démonstration — contenu fictif, version portfolio'

const demoReviews = {
  source: 'demo',
  rating: 4.8,
  count: 6,
  items: [
    {
      id: 'r1',
      author: 'Camille R.',
      initials: 'CR',
      date: '2026-09-02',
      rating: 5,
      dish: 'Pikachu Bento',
      text: 'Le Pikachu Bento est exactement ce qu’il promet : joli, mais surtout très bon. L’omelette roulée est parfaite.',
    },
    {
      id: 'r2',
      author: 'Yanis M.',
      initials: 'YM',
      date: '2026-08-27',
      rating: 5,
      dish: 'Lucario Power Burger',
      text: 'Le pain noir, la sauce au bleu, la cuisson du steak : un vrai burger de bistro, pas un gadget. On revient pour la Formule Feu.',
    },
    {
      id: 'r3',
      author: 'Inès D.',
      initials: 'ID',
      date: '2026-08-15',
      rating: 4,
      dish: 'Marill Aqua Bowl',
      text: 'Saumon très frais, riz vinaigré comme il faut. Un peu d’attente le samedi soir, mais la salle est agréable.',
    },
    {
      id: 'r4',
      author: 'Théo & Léa',
      initials: 'TL',
      date: '2026-07-30',
      rating: 5,
      dish: 'Formule Dresseur',
      text: 'On a composé notre formule chacun de notre côté, deux repas complets pour moins de 55 €. Le mochi Poussifeu vaut le détour.',
    },
    {
      id: 'r5',
      author: 'Sophie K.',
      initials: 'SK',
      date: '2026-07-12',
      rating: 5,
      dish: 'Mentali Velvet Cake',
      text: 'Réservé pour un anniversaire, tout était prêt à l’heure. Le Velvet Cake à la lavande a fait l’unanimité.',
    },
    {
      id: 'r6',
      author: 'Marco P.',
      initials: 'MP',
      date: '2026-06-21',
      rating: 4,
      dish: 'Ectoplasma Black Bento',
      text: 'Le bento noir d’Ectoplasma est spectaculaire et le riz venere bien assaisonné. Portions généreuses.',
    },
  ],
}

// Single entry point: swap this for a fetch to a backend proxy when a real profile exists
export function getReviews() {
  return demoReviews
}
