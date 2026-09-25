# Plan images

## État au 26/09/2026

Le catalogue compte **59 plats** et trois générations de visuels, toutes découpées à partir de planches Gemini, rangées dans `src/assets/products/` et chargées par `import.meta.glob` (aucun code à toucher pour remplacer un fichier).

| Série                            | Plats | Source                    | Fichiers par plat                                            | Qualité                                              | Statut                                                               |
| -------------------------------- | ----- | ------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------------------------- |
| Première planche (TP)            | 28    | grille 7 × 4, 1408 × 768  | `slug.webp` 198 × 168 + `slug.avif`                          | correcte mais **basse définition** (upscalée ×2)     | **à régénérer** : aucune nouvelle planche disponible                 |
| Deuxième planche (plats)         | 16    | grille 4 × 4, 2048 × 2048 | `slug.webp` 512 × 410 + `slug.avif` + `slug-256.{webp,avif}` | **bonne** : nette dans les cartes et la fiche        | terminée                                                             |
| Troisième planche (profiteroles) | 15    | grille 6 × 4, 2816 × 1536 | idem, + `pikachu-croquembouche-tall.{webp,avif}` (455 × 558) | **bonne**, même lumière et même fond que la deuxième | terminée (25/09/2026, `Gemini_Generated_Image_hx04jmhx04jmhx04.jpg`) |

Les 28 basses définitions restent à régénérer (prompts prêts dans `gemini-prompts.md`) ; elles ne sont jamais agrandies par un script.

## La planche des profiteroles

24 cases, titres imprimés en bas de case, plusieurs doublons (Goupix, Lucario, Mentali, Psykokwak) : **15 desserts distincts** ont été retenus, dont le croquembouche qui occupe deux cases en hauteur. Découpe par `scripts/cut-dessert-sheet.py` :

1. cases repérées par la grille (6 × 4), séparateurs ignorés (7 px) ;
2. bande de titre détectée (pixels sombres dans le quart bas) et retirée ;
3. cadrage 5:4 : toute la largeur, la hauteur au-dessus du titre, le **haut prolongé avec le dégradé du fond** (mesuré sur les marges sans dessert) pour ne laisser aucune bande ;
4. le croquembouche (455 × 558) est gardé tel quel pour la section d'accueil et **composé sur un canvas 5:4** pour les cartes (fond continué et fondu sur les bords) ;
5. WebP q86, puis `scripts/image-variants.py` : AVIF et vignettes 256 px.

Poids : 59 WebP = 747 Ko, 59 AVIF = 475 Ko. Planche de contrôle : `docs/images/desserts-preview.webp`.

## Pipeline commun

- `products.js › imageSet(slug)` expose `{ width, height, srcSet, avif }` ; `<DishImage>` rend `<picture>` avec la source AVIF, `srcset`/`sizes`, `width`/`height` (zéro CLS), `loading="lazy"` par défaut, `fetchpriority="high"` + `decoding="sync"` pour le plat du hero, préchargé depuis le `<head>`.
- Le masque radial `.dish-image` fond le crème de la planche dans la surface derrière (washi, porcelaine, plateau encre).

## Où les images sont utilisées

| Endroit                       | Taille rendue  | Source choisie              |
| ----------------------------- | -------------- | --------------------------- |
| Hero                          | 330 → 500 px   | 512 (AVIF)                  |
| Section desserts (accueil)    | ≤ 420 × 600 px | `croquembouche-tall` (AVIF) |
| Cartes de la carte / favoris  | ≈ 360 px       | 512 (AVIF)                  |
| Fiche                         | ≤ 440 px       | 512 (AVIF)                  |
| Composeur de formule          | ≈ 160 px       | 256                         |
| Panier, plateaux, suggestions | 40 – 80 px     | 256                         |
| Histoire (médaillons)         | 112 – 144 px   | 256                         |

## Pages secondaires

Histoire utilise des médaillons de plats HD (dont trois profiteroles dans le chapitre « Le laboratoire des douceurs ») ; Réservation et Contact restent typographiques. Des prompts pour une ambiance de salle, une terrasse et une image Open Graph plus « plat » sont en fin de `gemini-prompts.md` : à générer quand une session Gemini sera disponible (aucune génération n'est lancée par le site).

## Règles

- Un seul style : fond crème uni, sujet isolé en plongée 3/4, lumière douce, ombre portée courte.
- Les fichiers sont nommés par slug ; `products.test.js` vérifie que chaque plat a une image et que chaque chou pointe vers un visuel de la collection.
- Aucun logo ou sprite officiel Pokémon dans les visuels ; les Pokémon sont faits de pâte à choux, de glaçage, de sucre et de fruits.
