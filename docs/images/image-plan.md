# Plan images

## État actuel

Les 28 visuels produits viennent d'une planche unique générée pour le TP (grille 7 × 4), découpée en 28 fichiers de **198 × 168 px**. Ils sont convertis en WebP (1 412 Ko → 157 Ko au total) et rangés dans `src/assets/products/<slug>.webp`.

Ils ont deux qualités : une direction artistique homogène (fond crème `#F8EFDE`, plat isolé, éclairage doux, style illustration réaliste) et un Pokémon reconnaissable dans chaque assiette. Ils ont une limite : la définition. Le site les affiche donc dans des zones bornées (cartes ≤ 400 px, fiche ≤ 420 px, médaillons 96 – 144 px) avec un **masque radial** (`.dish-image`) qui fond les bords crème dans la surface derrière, ce qui donne l'impression d'un plat détouré.

## Cible

Remplacer les 28 visuels par des images haute définition générées avec Gemini à partir de `gemini-prompts.md`, en gardant la même direction artistique pour que les anciennes et les nouvelles images puissent cohabiter le temps de la transition.

| Usage                                    | Fichier                                             | Format cible                           | Notes                                                                                                    |
| ---------------------------------------- | --------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Carte produit, fiche, panier, médaillons | `src/assets/products/<slug>.webp`                   | **1200 × 1200**, WebP q80 (~ 60–90 Ko) | Fond crème uni `#F8EFDE`, plat centré, marge ≥ 12 %. Une seule source, redimensionnée par le navigateur. |
| Hero (optionnel, phase 2)                | `src/assets/hero/hero-plate.webp`                   | 1600 × 1600                            | Un plat signature vu de dessus, à poser derrière la Poké Ball ou à sa place sur mobile.                  |
| Histoire                                 | `src/assets/sections/kitchen-01.webp` …             | 1600 × 1000                            | Cuisine, mains, bento en préparation. Même lumière, même crème.                                          |
| Open Graph                               | `public/og-image.png`                               | 1200 × 630 PNG                         | Généré depuis le site (typographie + Poké Ball).                                                         |
| Icônes                                   | `public/favicon.svg`, `public/apple-touch-icon.png` | SVG + 180 × 180                        | Faits.                                                                                                   |

## Règles de cohérence

1. **Même fond** : crème `#F8EFDE`, uni, sans ombre portée dure, une ombre douce sous l'assiette.
2. **Même angle** : 3/4 plongeant (environ 35°) pour les assiettes et bentos ; face légèrement plongeante pour les burgers et boissons.
3. **Même lumière** : lumière principale douce venant du haut gauche, rebond chaud à droite, aucun reflet spéculaire dur.
4. **Même échelle** : le plat occupe 70 – 76 % de la largeur ; un seul plat par image ; pas de couverts, pas de main.
5. **Le Pokémon est dans la nourriture** (riz moulé, décor en sucre, forme du pain), jamais posé à côté comme une figurine.
6. **Pas de texte, pas de logo, pas de filigrane** dans l'image.

## Intégration

- Nommer le fichier exactement comme le `slug` du produit (`pikachu-bento.webp`).
- Convertir en WebP (Pillow, Squoosh ou `cwebp -q 80`), vérifier le poids (< 100 Ko).
- Remplacer le fichier dans `src/assets/products/` : aucun code à toucher (`import.meta.glob`).
- Mettre à jour `width`/`height` des `<img>` (198 × 168 → 1200 × 1200) dans `ProductCard`, `ProductDetail`, `CartLine`, `Hero`, `StoryPage` pour garder un ratio réservé correct.
- Le masque radial `.dish-image` peut alors être adouci (bords moins fondus) puisque le fond sera uniforme.
