# Audit du TP PokéBistro (point de départ)

Date : 25/09/2026 · Base auditée : `tp-react-resto` (10 commits, React 19 + Vite 8 + Bootstrap 5 + Tailwind 4).

Objectif de l'audit : décider, partie par partie, ce qui est **conservé**, **refactoré**, **redessiné** ou **reconstruit** pour passer d'un exercice validé à un site de restaurant de niveau portfolio.

## 1. Synthèse

| Axe           | Constat                                                                                                                                                                                   | Gravité |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Architecture  | Une seule page ancrée, 2 contextes, 1 reducer, composants bien découpés. Solide comme base logique.                                                                                       | —       |
| UX            | Filtres uniquement en sidebar (1 tag à la fois), pas de détail produit, panier en modal centrée, pas de persistance, pas de favoris, pas de réservation.                                  | Moyenne |
| UI / DA       | Palette « Pokémon primaire » (bleu #2a75bb + jaune #ffcb05 + rouge), Fredoka/Nunito, blobs flous : rendu sympathique mais générique, lisible comme un TP.                                 | Haute   |
| Contenu       | 28 produits cohérents avec 28 visuels, descriptions correctes, mots-clés de recherche. Pas d'ingrédients, pas de slug, pas de storytelling réel.                                          | Moyenne |
| Responsive    | Correct (375/768/1280) mais filtres mobiles = sidebar dépliée au-dessus de la grille (long à parcourir).                                                                                  | Moyenne |
| Performance   | 2 frameworks CSS (Bootstrap 230 Ko + Tailwind), Google Fonts en ligne (2 requêtes tierces), PNG 1,4 Mo pour 28 images de 198 × 168, artworks PokeAPI chargés à distance (hero, À propos). | Haute   |
| Accessibilité | Bonne base : labels, `aria-pressed`, focus visible, Échap sur la modal. Manque : piège de focus dans la modal, `aria-live` sur les résultats, skip link, `prefers-reduced-motion`.        | Moyenne |
| SEO           | `title` + `description` seulement. Pas d'Open Graph, pas de données structurées, pas de sitemap/robots, pas d'URL par contenu.                                                            | Haute   |
| Animations    | CSS simples (fade-up, pop, hover). Pas de direction motion, pas de reveal au scroll, pas de transitions de page.                                                                          | Moyenne |
| Code          | Propre et commenté. Points faibles : `setTimeout` non nettoyé dans `ProductCard`, styles Bootstrap surchargés via variables, classes utilitaires dupliquées entre les deux frameworks.    | Faible  |
| Dépendances   | `bootstrap` inutile si Tailwind reste ; `gh-pages` OK ; aucune lib de test.                                                                                                               | Moyenne |

## 2. Décisions par partie

| Partie du TP                                                    | Décision                                 | Pourquoi                                                                                                                                                                              |
| --------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cartReducer.js` (ADD / INCREMENT / DECREMENT / REMOVE / CLEAR) | **KEEP** (+ `SET_QUANTITY`, hydratation) | Logique correcte, testable, déjà validée. On y ajoute la restauration depuis le stockage local.                                                                                       |
| `CartContext.jsx`                                               | **REFACTOR**                             | Même API, mais persistance localStorage, état d'ouverture du tiroir, `useMemo` sur les totaux.                                                                                        |
| `FilterContext.jsx`                                             | **REBUILD → `useMenuFilters` (URL)**     | L'état des filtres passe dans l'URL (`/menu?type=Feu&tag=épicé`) : partageable, compatible bouton retour, et permet à la page d'accueil de « lancer » un filtre sans contexte global. |
| `filterProducts.js`                                             | **REFACTOR**                             | Même normalisation sans accents ; ajout des ingrédients et du type dans la recherche, multi-sélection des tags et des types.                                                          |
| `formatPrice.js`                                                | **KEEP**                                 | Correct.                                                                                                                                                                              |
| `imageFallback.js`                                              | **KEEP** (déplacé)                       | Toujours utile.                                                                                                                                                                       |
| `products.js` (28 produits)                                     | **KEEP + enrichir**                      | Ajout de `slug`, `ingredients`, `featured`, `pokemon`. Aucun produit supprimé.                                                                                                        |
| `filters.js`, `pokemonTypes.js`                                 | **REFACTOR**                             | Types = données de premier niveau (couleur, libellé, description courte) car ils deviennent une expérience interactive.                                                               |
| `Header` / `Nav`                                                | **REDESIGN**                             | Header transparent → plein au scroll, navigation multipage, menu mobile plein écran animé.                                                                                            |
| `Hero`                                                          | **REBUILD**                              | Nouvelle composition typographique + Poké Ball 3D + plats flottants. L'artwork PokeAPI distant disparaît.                                                                             |
| `Sidebar` + blocs                                               | **REDESIGN**                             | Rail de filtres desktop + feuille de filtres mobile (bottom sheet), même logique.                                                                                                     |
| `ProductGrid`                                                   | **REFACTOR**                             | Compteur `aria-live`, état vide conservé, animation d'entrée.                                                                                                                         |
| `ProductCard`                                                   | **REBUILD**                              | Carte premium : image détourée sur le crème d'origine, prix en mono, type, favori, ajout rapide, ouverture du détail.                                                                 |
| `Modal`                                                         | **REBUILD → `Dialog` + `Drawer`**        | Base accessible commune (piège de focus, Échap, scroll bloqué, `inert` du reste).                                                                                                     |
| `Cart` / `CartItem`                                             | **REDESIGN**                             | Tiroir latéral, état vide, résumé, persistance, clavier.                                                                                                                              |
| `About`                                                         | **REBUILD → page « Histoire »**          | Vrai storytelling (origine, cuisine, types, chiffres).                                                                                                                                |
| `Contact`                                                       | **REDESIGN**                             | Infos + formulaire à états (normal / envoi / succès / erreur) branché sur une couche `api/` factice remplaçable.                                                                      |
| `Footer`                                                        | **REDESIGN**                             | Même contenu, nouvelle DA.                                                                                                                                                            |
| `Icons/`                                                        | **REFACTOR**                             | Un seul fichier d'icônes SVG cohérentes (trait 1,75).                                                                                                                                 |
| `Button`                                                        | **REBUILD**                              | Variantes maison (solid / outline / ghost / icon) sans Bootstrap.                                                                                                                     |
| Bootstrap                                                       | **REMOVE**                               | Deux frameworks CSS = double poids, collisions de classes (`container`, `p-*`), hack de layers. Tailwind 4 + tokens `@theme` suffisent.                                               |
| Tailwind 4                                                      | **KEEP**                                 | Tokens centralisés, utilitaires, aucune config.                                                                                                                                       |
| Google Fonts distantes                                          | **REPLACE**                              | Fonts auto-hébergées (Fontsource, sous-ensemble latin) : pas de requête tierce, `font-display: swap`.                                                                                 |
| Images PNG                                                      | **CONVERT**                              | WebP (1 412 Ko → 157 Ko), en attendant les visuels Gemini haute définition (voir `docs/images/`).                                                                                     |
| `vite.config.js`                                                | **REFACTOR**                             | `base` pilotée par variable d'environnement (Pages vs Vercel/Netlify), découpage des chunks (three, gsap).                                                                            |
| Déploiement `gh-pages`                                          | **KEEP + élargir**                       | Script Pages conservé (`--mode pages`), ajout `vercel.json` et `netlify.toml` (SPA fallback).                                                                                         |
| README                                                          | **REWRITE**                              | Version professionnelle.                                                                                                                                                              |
| `docs/maquette`                                                 | **REPLACE**                              | Nouvelles maquettes dans `docs/mockups/`.                                                                                                                                             |

## 3. Bugs et fragilités relevés dans le TP

1. `ProductCard` : `setTimeout` du feedback « Ajouté » jamais nettoyé au démontage (warning React possible si la carte disparaît pendant les 1,2 s à cause d'un filtre).
2. `Modal` : pas de piège de focus, le focus peut sortir vers la page derrière ; pas de restauration du focus sur l'élément déclencheur à la fermeture.
3. Hero / À propos : images chargées depuis `raw.githubusercontent.com` (dépendance réseau tierce, pas de cache contrôlé, pas de dimension réservée sur mobile → décalage).
4. Filtre prix : `range` peut être `undefined` si l'id n'existe pas (crash `range.min`).
5. `scroll-padding-top` en dur (88 px) ; casse si la hauteur du header change.
6. Pas de `prefers-reduced-motion`.

Tous ces points sont traités dans la nouvelle version.
