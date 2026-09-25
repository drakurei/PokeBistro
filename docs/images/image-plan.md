# Plan images

## État au 25/09/2026

Le catalogue compte **44 plats** et deux générations de visuels, toutes deux découpées à partir d'une planche Gemini, rangées dans `src/assets/products/<slug>.webp` et chargées par `import.meta.glob` (aucun code à toucher pour remplacer un fichier).

| Série                 | Plats | Source                    | Format final              | Poids                        | Qualité                                                             | Statut                              |
| --------------------- | ----- | ------------------------- | ------------------------- | ---------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| Première planche (TP) | 28    | grille 7 × 4, 1408 × 768  | 198 × 168, WebP           | 157 Ko au total              | correcte mais **basse définition** (upscalée ×2 dans les cartes)    | **à régénérer** avec les prompts HD |
| Deuxième planche      | 16    | grille 4 × 4, 2048 × 2048 | 512 × 410 (5:4), WebP q86 | 400 Ko au total (10 – 39 Ko) | **bonne** : nette dans les cartes (~ 400 px) et la fiche (≤ 420 px) | **terminée**                        |

Les deux séries partagent la même direction artistique (fond crème uni, plat isolé vu en plongée 3/4, lumière douce), donc elles cohabitent sans rupture de style ; seule la définition diffère.

## Découpage de la deuxième planche

Script Python + Pillow + NumPy, exécuté hors du dépôt (original conservé intact dans `Downloads`) :

1. la planche est divisée en 16 cases de 512 × 512 ;
2. dans chaque case, la bande de titre est détectée par les lignes contenant du texte noir dans le cinquième supérieur (« ROUCOOL CRISPY », « (Inspired by Pidgey) ») ;
3. la découpe commence sous le texte et garde **410 lignes** : la case entière moins le titre, soit un cadre 5:4 identique au bloc image des cartes ;
4. aucun canvas synthétique, aucun redimensionnement : le fond, l'ombre et l'échelle d'origine sont conservés, donc les 16 plats sont à la même échelle ;
5. export WebP qualité 86 ; planche de contrôle dans [`new-products-preview.webp`](new-products-preview.webp).

Les cases dont le fond présente un léger dégradé (bols, boissons) ont été gardées entières précisément pour éviter tout raccord visible.

## Affichage

- Cartes : bloc image 5:4, `object-cover`, masque radial `.dish-image` (fondu des angles uniquement ; le haut et le bas restent visibles pour les flammes, vagues et éclairs).
- Fiche : `object-contain`, largeur max 420 px sur un fond washi teinté par le type.
- Médaillons (hero, histoire) : 112 – 144 px, `rounded-full`.
- Attributs `width="512" height="410"` déclarés partout : aucun décalage de mise en page ; les 28 anciennes images (198 × 168, ratio 1,18) s'y adaptent avec un recadrage de 3 %.

## Ce qui reste à faire (n'empêche pas la livraison)

| Plat                              | Fichier                                                  | Action                                                                                               | Prompt                                          |
| --------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Les 28 plats de la première série | `src/assets/products/<slug>.webp` (198 × 168)            | **Régénérer** en 1200 × 1200 ou en planche 4 × 4 haute définition, puis découper avec le même script | `gemini-prompts.md`, section « Première série » |
| Hero                              | `src/assets/hero/hero-plate.webp`                        | Créer (optionnel)                                                                                    | section « Hero et sections »                    |
| Histoire                          | `src/assets/sections/kitchen-01.webp`, `kitchen-02.webp` | Créer (optionnel)                                                                                    | section « Hero et sections »                    |

Marche à suivre pour une planche 4 × 4 : générer en 2048 × 2048 avec le bloc de style commun, adapter la liste `SLUGS` du script de découpe, lancer, contrôler la planche produite, remplacer les fichiers. Rien d'autre à changer.
