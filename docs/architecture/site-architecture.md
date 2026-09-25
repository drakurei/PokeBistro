# Architecture du site

## Plan du site

| Route               | Page             | Rôle                                                                                                                                                                                                          |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                 | Accueil          | Hero « food-first », marquee, types (glyphes), plats signatures, histoire (teaser), avis (démo), réservation.                                                                                                 |
| `/menu`             | La carte         | Sommaire, 7 catégories dans l'ordre d'un repas puis les formules ; la section Desserts est sous-groupée (`DessertGroups`) ; recherche, filtres (catégorie, type, envie, régime, prix), tri ; état dans l'URL. |
| `/menu/:slug`       | Fiche d'un plat  | Dialog au-dessus de la carte depuis la grille, page complète (`<h1>`) en accès direct. Régime, allergènes, formules, suggestions.                                                                             |
| `/menu/formule/:id` | Fiche de formule | Idem, avec le composeur visuel pour les formules à choix.                                                                                                                                                     |
| `/commande`         | Commander        | Simulation en quatre étapes + confirmation. `noindex`.                                                                                                                                                        |
| `/favoris`          | Vos favoris      | Les plats gardés dans ce navigateur. `noindex`.                                                                                                                                                               |
| `/histoire`         | Notre histoire   | Storytelling : origine, cuisine, types, ingrédients, chiffres.                                                                                                                                                |
| `/contact`          | Contact          | Adresse, horaires, services, formulaire.                                                                                                                                                                      |
| `/reservation`      | Réserver         | Formulaire → récapitulatif → confirmation, créneaux simulés, .ics.                                                                                                                                            |
| `*`                 | 404              | Coquille de l'application sur GitHub Pages.                                                                                                                                                                   |

## Arborescence

```
src/
  api/            fausse couche réseau (Promise + délai, hook d'échec "erreur@")
  components/
    cart/         CartDrawer, CartLine, CartButton, MobileCartBar
    forms/        ContactForm, ReservationForm, useForm
    home/         Hero, HeroBall, TypesSection, SignatureDishes, StoryTeaser, ReviewsSection, ReservationCta
    layout/       Header, Footer, MobileMenu, FavoritesButton, Seo, ErrorBoundary, LazyFailed, Belt, Logo…
    loading/      LoadingScreen + loadingState
    menu/         ProductCard, ProductDetail, ProductGrid, MenuToolbar, MenuSections, CombosSection,
                  ComboCard, ComboDetail, ChoiceGrid, FilterControls, FilterSheet, dialogs
    motion/       Reveal
    order/        StepIndicator, ChoiceCard, SlotPicker
    ui/           Button, Chip, Dialog, DishImage, Field, Icons, Stepper, TypeBadge, TypeIcon
  contexts/       CartContext, FavoritesContext, ToastContext
  data/           products (44), combos (8), filters, types (+ glyphe), restaurant, reviews, story, content, facts
  hooks/          useMenuFilters (URL), useMediaQuery, useScrolled
  reducers/       cartReducer (lignes objets)
  routes/         une page par route
  seo/            pageMeta (titres, descriptions, canonical, JSON-LD, routes, sitemap)
  three/          Poké Ball (chunk séparé)
  utils/          cartItems, filterProducts, schedule, suggestions, ics, storage, validation, text…
  entry-server.jsx  rendu statique (utilisé par scripts/prerender.mjs)
scripts/          prerender, clean, size-budget, csp-hash
e2e/              Playwright (navigation, menu, carte, panier, commande, favoris, formulaires, a11y, seo, motion)
```

## Données

- **Produit** : `id, slug, name, pokemon, description, ingredients, price, category, subcategory (desserts : choux / patisserie / glace / fruits), type, tags, diet, allergens (14 UE), spicy (0-3), availability, image, imageSet, keywords`. Les régimes et allergènes sont des données de démonstration, annoncées comme telles dans la fiche.
- **Formule** : fixe (`items`) ou à choix (`slots` avec catégories, prix minimum, choix par défaut), `price`, `badge`, `availability` (Déjeuner), `note`.
- **Types** : couleur, texte de contraste, promesse, saveur, `icon` (nom du glyphe original).
- **Contenu éditorial** : `data/content.js` (accueil), `data/story.js` (histoire), `data/restaurant.js` (coordonnées, horaires structurés, fermetures, places, politique d'annulation), `data/editorial.js` (création du chef, desserts mis en avant : un slug à changer, le site suit).

## Panier

Lignes objets : `{ kind: 'product', productId }` ou `{ kind: 'formula', formulaId, choices }`, clé stable (`p:12`, `f:formule-dresseur:plat=…`), quantité ≤ 20. `cartItems.js` résout une ligne en article (nom, prix, image, composition), valide ce qui vient du stockage et calcule les **formules atteignables** (les plats d'une formule fixe sont tous dans le panier → proposition d'économie, jamais appliquée seule). Persistance après le montage (le HTML pré-rendu est vide), `localStorage` préfixé, plafonné, validé.

## Rendu et chargement

- **Pré-rendu** : `entry-server.jsx` rend `<App>` dans un `StaticRouter` pour chaque route de `pageMeta.allRoutes` ; les pages paresseuses sont **préchargées** avant le rendu et `progressiveChunkSize` est relevé pour que Fizz n'externalise aucun Suspense. `main.jsx` hydrate si la racine a déjà du contenu, sinon rend (dev, 404).
- **Chunks** : `index` (app), `motion` (GSAP + Lenis), `three` (différé, desktop), un chunk par page secondaire, données du catalogue dans un chunk partagé.
- **Robustesse** : `ErrorBoundary` autour des routes (clé = chemin), `lazyPage` remplace un chunk introuvable par un panneau « recharger », `HeroBall` isole la 3D.
- **Loader** : dans le HTML, masqué avant la première peinture par un script inline quand la session l'a vu.

## Qualité

`npm run check` = lint (oxlint) → tests unitaires (Vitest) → build + pré-rendu → budget (`scripts/size-budget.mjs`). Les tests de bout en bout (Playwright, desktop + mobile, reduced motion + une suite plein mouvement, axe) tournent contre le build prévisualisé. Le tout est exécuté par GitHub Actions (`.github/workflows/ci.yml`) sur `main`, `develop` et les pull requests.
