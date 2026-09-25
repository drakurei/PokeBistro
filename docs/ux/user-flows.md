# Parcours utilisateurs

## Personas rapides

- **La dresseuse pressée** (mobile, pause déjeuner) : veut voir vite les bentos, ajouter 2 plats, savoir où c'est.
- **Le groupe du samedi** (desktop) : découvre le concept, regarde la carte par types, réserve une table.
- **Le fan** : cherche « Mewtwo », lit les ingrédients, met en favori, partage le lien du plat.

## Flux 1 — Découvrir et commander (cœur du site)

1. Chargement : écran de marque ≤ 1,4 s (une fois par session), la page est déjà rendue dessous.
2. Hero : thèse en 3 secondes → CTA « Voir la carte ».
3. `/menu` : recherche en haut, filtres (rail desktop / feuille mobile), compteur de résultats annoncé (`aria-live`).
4. Carte : survol → CTA « Ajouter » ; clic image ou nom → détail (dialog, URL `/menu/:slug`).
5. Détail : quantité, « Ajouter au panier » → toast « Ajouté » + badge header qui pulse. Le dialog reste ouvert (on peut enchaîner).
6. Panier (tiroir) : lignes avec stepper, suppression, total, « Commander » → message clair : démonstration, pas de paiement. Vider = confirmation.
7. Rechargement : panier et favoris restaurés.

## Flux 2 — Choisir par type

1. Accueil, section « Choisissez votre type » : 8 types, survol = ambiance colorée, clic → `/menu?type=Feu`.
2. La carte s'ouvre déjà filtrée, chip « Feu » active, bouton « Tout effacer ».

## Flux 3 — Réserver

1. Header « Réserver » (desktop) ou menu mobile → `/reservation`.
2. Formulaire : date (min = aujourd'hui), heure (créneaux du service), couverts (1–8, au-delà : « contactez-nous »), nom, email. Validation à la perte de focus, erreurs sous le champ, premier champ invalide focalisé à la soumission.
3. États : envoi (bouton désactivé + spinner), succès (récapitulatif : « Table pour 4 samedi 3 octobre à 20 h 00 »), erreur (message + « Réessayer »).

## Flux 4 — Contacter

Même mécanique que la réservation, avec nom / email / message (≥ 10 caractères).

## Cas limites prévus

| Situation                               | Réponse                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| Aucun résultat                          | Message + suggestions (retirer un filtre, effacer la recherche) + bouton « Tout effacer ». |
| Slug inconnu (`/menu/xyz`)              | Page « Ce plat n'est pas à la carte » + retour à la carte.                                 |
| Panier vide                             | Poké Ball + « Votre panier est vide » + « Voir la carte ».                                 |
| Stockage local corrompu ou indisponible | Ignoré silencieusement, panier vide, aucune erreur visible.                                |
| Reduced motion                          | Pas de Lenis, pas de 3D, reveals en fondu court, loading réduit à un fondu.                |
| Pas de WebGL / mobile                   | Poké Ball SVG animée en CSS à la place de la 3D.                                           |
| Clavier seul                            | Skip link, focus visible partout, piège de focus dans dialog/tiroir, Échap ferme.          |

## Navigation

- Desktop : logo, Accueil, La carte, Histoire, Contact, bouton « Réserver », panier.
- Mobile : logo, panier, burger → panneau plein écran (liens + Réserver + infos horaires).
- Le lien actif est marqué par un point laque. Le header devient opaque (porcelaine + ceinture) après 24 px de scroll.
