# Maquette PokéBistro

Fichier : [`maquette-resto.svg`](./maquette-resto.svg) (s'ouvre dans n'importe quel navigateur ou dans VS Code).

## Objectif

Avant de coder les composants, poser l'organisation de la page sur une seule vue pour :

- savoir quelles zones existent et dans quel ordre elles s'enchaînent ;
- découper la page en composants React (chaque zone = un composant) ;
- décider ce qui est géré par Bootstrap et ce qui est géré par Tailwind ;
- anticiper la version mobile et la modal du panier.

Ce n'est pas une maquette graphique finale : c'est un **wireframe** (zones, textes indicatifs, boutons) avec quelques couleurs de la charte pour se projeter.

## Les zones (de haut en bas)

| Zone | Composant(s) | Contenu |
| --- | --- | --- |
| Header | `Header`, `Nav` | logo Pokéball + nom, liens d'ancre (Accueil, Menu, Catégories, À propos, Contact), bouton **Panier** avec compteur |
| Hero | `Hero` | titre, phrase d'accroche, bouton « Voir le menu » (ancre `#menu`), visuel Pokémon |
| Section Menu | `Sidebar` + `ProductGrid` | titre + nombre de plats affichés |
| Sidebar | `FilterBlock`, `SearchBlock`, `CategoryBlock`, `TagBlock`, `PriceBlock` | recherche texte, liste des catégories, tags cliquables, tranches de prix, bouton « Réinitialiser les filtres » |
| Grille | `ProductGrid`, `ProductCard`, `Button` | 3 colonnes en desktop ; chaque carte = image, type Pokémon, nom, prix, catégorie, description, tags cliquables, boutons **Ajouter** / **Retirer** |
| À propos | `About` | courte présentation du restaurant fictif + quelques chiffres |
| Contact | `Contact` | infos fictives + formulaire de démonstration |
| Footer | `Footer` | nom, liens, infos fictives, copyright avec **année dynamique** |
| Modal panier | `Modal`, `Cart`, `CartItem` | lignes du panier (nom, prix unitaire, quantité avec − / +, sous-total, supprimer), total général, « Vider le panier », état vide |

## Choix visuels

- **Palette** : jaune Pokéball `#ffcb05`, rouge `#e3350d`, bleu `#2a75bb`, bleu nuit `#1b2a4a`, fond crème. Le header est bleu, le hero et le contact sont sur fond jaune pâle, le footer est bleu nuit. Les couleurs des **types Pokémon** ne servent que pour le petit badge de type sur les cartes, pour ne pas tomber dans l'arc-en-ciel.
- **Typographie** : `Fredoka` (titres, arrondie et ludique) + `Nunito` (texte), chargées via Google Fonts.
- **Cartes arrondies** avec image en haut, prix en rouge bien visible, boutons pleins pour l'action principale (Ajouter) et contour pour l'action secondaire (Retirer).
- **Images** : au moment de la maquette, les cartes utilisaient les artworks officiels des Pokémon (PokeAPI). Elles utilisent maintenant les 28 plats d'une planche générée pour le projet, découpée en 28 images (`src/assets/products/`). Le hero et la section À propos gardent les artworks PokeAPI, avec une Pokéball SVG locale en secours.

## Décisions prises avant le développement

1. **Une seule page** avec navigation par ancres (`#accueil`, `#menu`, `#categories`, `#a-propos`, `#contact`) : pas besoin de React Router pour ce TP.
2. **Bootstrap** pour la structure et les composants « tout faits » : navbar, grille (`row` / `col`), cartes, boutons, list-group, formulaires, markup de la modal.
   **Tailwind** pour le hero, les sections À propos / Contact, les titres de section, les chips de tags et les détails d'espacement.
   Règle : un composant utilise principalement l'un des deux, pas les deux mélangés.
3. **Aucun JavaScript Bootstrap** : le menu burger, le panneau de filtres mobile et la modal sont pilotés par des `useState` React, pour avoir une seule source de vérité.
4. **Filtres** : la sidebar et les tags des cartes écrivent dans un `FilterContext` ; la grille lit ce contexte et applique les 4 critères (recherche, catégorie, tag, prix) en même temps.
5. **Panier** : un `CartContext` alimenté par un `useReducer` (`cartReducer`) ; les cartes et la modal dispatchent des actions, le total est recalculé à partir du state.
6. **Mobile** (< 992 px) : header avec burger, hero empilé, un bouton « Filtres » qui affiche / masque la sidebar, grille sur 1 colonne (2 en tablette), sections en colonne.
7. **État vide** prévu partout : aucun produit trouvé (message + réinitialiser), panier vide (message + lien vers le menu).
