# Architecture du site

## Plan du site

| Route          | Page             | Rôle                                                                                                                                       |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`            | Accueil          | Thèse (hero), types, plats signatures, histoire (teaser), réservation.                                                                     |
| `/menu`        | La carte         | Les 28 plats, recherche, filtres (catégorie, type, tags, prix). L'état des filtres est dans l'URL.                                         |
| `/menu/:slug`  | Détail d'un plat | Ouvert en **dialog** au-dessus de la carte quand on vient de la grille, en **page complète** en accès direct (lien partagé, rechargement). |
| `/histoire`    | Notre histoire   | Storytelling : origine, cuisine, types, ingrédients, chiffres.                                                                             |
| `/contact`     | Contact          | Adresse, horaires, services, formulaire (nom, email, message).                                                                             |
| `/reservation` | Réserver         | Formulaire (date, heure, couverts, nom, email) simulé côté client.                                                                         |
| `*`            | 404              | Retour à l'accueil / à la carte.                                                                                                           |

Le panier est un **tiroir** disponible sur toutes les pages, pas une route.

## Stack

- **React 19 + Vite 8** (JS, JSX). React 19 hisse `<title>` / `<meta>` dans `<head>` : le SEO par page ne nécessite aucune bibliothèque.
- **React Router 8** (mode déclaratif) : routes ci-dessus, `useSearchParams` pour les filtres, `location.state.background` pour le détail en dialog.
- **Tailwind CSS 4** : tokens `@theme`, utilitaires, quelques classes composant dans `globals.css`. Bootstrap retiré (raisons dans `docs/audit/tp-audit.md`).
- **GSAP 3 + @gsap/react** : reveals, hero, marquee, transitions. **ScrollTrigger** pour les sections. **Lenis** (desktop, hors reduced-motion) pour le défilement.
- **Three.js** : Poké Ball 3D du hero, chargée en chunk séparé (`React.lazy`) uniquement sur desktop, WebGL disponible, reduced-motion désactivé.
- **Fontsource** : 3 familles auto-hébergées.
- **Vitest** (logique pure) + **Playwright** (parcours).

## Arborescence `src/`

```
src/
├── main.jsx                 fonts, styles, Router, App
├── App.jsx                  providers, layout, routes
├── routes/                  une page = un fichier
│   ├── HomePage.jsx, MenuPage.jsx, ProductPage.jsx, StoryPage.jsx,
│   ├── ContactPage.jsx, ReservationPage.jsx, NotFoundPage.jsx
├── components/
│   ├── layout/              Header, MobileMenu, Footer, Belt, Seo, SkipLink, PageTransition
│   ├── ui/                  Button, IconButton, Chip, TypeBadge, Stepper, Field, Dialog, Drawer, Toast, Icons
│   ├── home/                Hero, HeroBall (lazy 3D), PokeballMark (fallback SVG), TypesSection, SignatureDishes, StoryTeaser, ReservationCta
│   ├── menu/                MenuToolbar, FilterRail, FilterSheet, SearchField, ProductGrid, ProductCard, ProductDetail, EmptyResults
│   ├── cart/                CartDrawer, CartLine, CartButton
│   ├── forms/               ContactForm, ReservationForm
│   └── loading/             LoadingScreen
├── contexts/                CartContext (useReducer + localStorage), FavoritesContext, ToastContext
├── hooks/                   useMenuFilters (URL), useMediaQuery, useReducedMotion, useLockBodyScroll, useFocusTrap, useScrolled
├── reducers/                cartReducer
├── data/                    products, types, filters, restaurant, story
├── utils/                   filterProducts, formatPrice, storage (parse + validation), validation (formulaires), cn
├── api/                     contact.js, reservation.js — simulation Promise + délai, même signature qu'un vrai fetch
├── lib/                     motion.js (registration GSAP, tokens), SmoothScroll.jsx (Lenis)
├── three/                   pokeball.js (scène) + PokeballCanvas.jsx
├── styles/                  globals.css
└── assets/                  products/ (webp), branding/ (logo, pokeball), hero/, sections/, icons/, 3d/
```

## Flux de données

```
URL (?q=&category=&type=&tag=&price=)  --useMenuFilters-->  MenuPage --> filterProducts(products, filters) --> ProductGrid
                                                                                          |
localStorage <--persist--  CartContext (useReducer)  <-- ProductCard / ProductDetail / CartDrawer
localStorage <--persist--  FavoritesContext (liste d'ids)
```

- Le stockage local ne contient que `{ id, quantity }` (panier) et `[id]` (favoris). Les prix et noms sont **toujours** relus depuis `data/products.js` : une valeur modifiée dans le navigateur ne peut pas altérer un prix.
- Tout ce qui est lu depuis `localStorage` passe par `utils/storage.js` (try/catch + validation de forme + limites).

## Déploiement

- `vite build` → `dist/` avec `base = '/'` (Vercel, Netlify : `vercel.json` / `netlify.toml` réécrivent tout vers `index.html`).
- `npm run build:pages` → `vite build --mode pages` lit `.env.pages` (`VITE_BASE=/PokeBistro/`) et copie `index.html` en `404.html` pour le fallback SPA de GitHub Pages ; `npm run deploy` publie `dist/` sur `gh-pages`.
