# PokéBistro

Site vitrine et carte en ligne d'un restaurant fictif inspiré de l'univers Pokémon. Version professionnelle, pensée comme un projet de portfolio : direction artistique propre, motion design, Poké Ball 3D, carte filtrable, panier persistant, réservation, accessibilité et SEO.

**Démo** : https://drakurei.github.io/PokeBistro/ · **Code** : https://github.com/drakurei/PokeBistro

## Présentation

PokéBistro sert des entrées, des bentos, des burgers, des bowls, des desserts et des boissons qui portent chacun le nom d'un Pokémon : Pikachu Bento, Lucario Power Burger, Marill Aqua Bowl, Mentali Velvet Cake… Le site présente le restaurant, laisse explorer les **44 plats** par type Pokémon (onze types), par catégorie, par envie ou par prix, compose un panier et demande une table.

Le projet part d'un TP React (`tp-react-resto`) validé en cours, conservé tel quel dans son dépôt. Cette version en garde la logique utile (reducer du panier, filtres, données) et reconstruit tout le reste : identité, pages, composants, motion, accessibilité, SEO, tests. L'audit de départ et chaque décision (garder, refactorer, redessiner, reconstruire) sont dans [`docs/audit/tp-audit.md`](docs/audit/tp-audit.md).

## Vision

> Un bistro contemporain qui sert l'univers Pokémon dans l'assiette.

La Poké Ball est traitée comme un objet de design : rouge laqué, blanc porcelaine, ceinture noire, un bouton. Ce sont les matières d'une belle table japonaise (laque, porcelaine, encre), et c'est ce que le site emprunte, plutôt que les couleurs primaires et les sprites. Les Pokémon apparaissent là où ils sont déjà : dans les plats, et dans les **types**, qui deviennent la façon de choisir ce qu'on mange. Détails dans [`docs/design/design-direction.md`](docs/design/design-direction.md).

## Fonctionnalités

- **Écran de chargement** de marque (anneau de la Poké Ball qui se trace, ceinture, wordmark), une fois par session, non bloquant, avec timeout et version reduced-motion.
- **Hero** « Poké Ball ouverte » : moitié laque, moitié porcelaine, ceinture au centre, **Poké Ball 3D** (Three.js) qui flotte et suit la souris, trois plats signatures en médaillons.
- **Header** transparent sur le hero puis porcelaine avec la ceinture ; navigation multipage ; menu mobile plein écran.
- **Types Pokémon** : onze tuiles qui teintent la section au survol et ouvrent la carte filtrée, plus une porte vers toute la carte.
- **La carte** : 44 plats **regroupés par catégorie** comme un vrai menu (entrées, bentos, burgers, bowls, desserts, boissons, menus), recherche (nom, Pokémon, catégorie, type, tags, mots-clés, ingrédients, sans accents), filtres combinables (catégorie, types multiples, envies multiples, prix), **tri** (ordre de la carte, prix, nouveautés), **état dans l'URL** (partageable, bouton retour), rail de filtres desktop, bandeau de catégories et feuille de filtres sur mobile, compteur annoncé, état vide.
- **Fiche plat** : dialog au-dessus de la carte (URL `/menu/:slug`) ou page complète en accès direct, ingrédients, encart type, quantité, ajout, favori, plats du même type.
- **Panier** : tiroir latéral, lignes avec stepper, suppression, total, état vide, « Vider » avec confirmation, « Commander » qui explique la démonstration, **persistance locale validée**.
- **Favoris** persistants.
- **Histoire** : trois chapitres, principes, les huit types, chiffres.
- **Contact** : informations, services, carte stylisée hors ligne, formulaire à quatre états.
- **Réservation** : date, créneau, convives, nom, email ; validation à la perte de focus, récapitulatif en succès. Simulation côté client, structure prête pour une vraie API.
- **404**, skip link, focus géré à chaque changement de page, `prefers-reduced-motion` respecté partout.

## Stack technique

|             |                                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Framework   | React 19, Vite 8, JavaScript (JSX)                                           |
| Routage     | React Router 8 (mode déclaratif)                                             |
| Styles      | Tailwind CSS 4 (tokens `@theme`), CSS natif pour les composants clés         |
| Motion      | GSAP 3 + `@gsap/react`, ScrollTrigger, Lenis (desktop)                       |
| 3D          | Three.js (chunk lazy)                                                        |
| Fonts       | Fontsource : Unbounded, Zen Kaku Gothic New, DM Mono (auto-hébergées, latin) |
| Tests       | Vitest, Playwright                                                           |
| Qualité     | oxlint, Prettier, EditorConfig                                               |
| Déploiement | GitHub Pages (script dédié), compatible Vercel / Netlify                     |

Bootstrap, présent dans le TP, a été retiré : deux frameworks CSS doublaient le poids, entraient en collision (`container`, `p-*`) et imposaient un hack de cascade layers. Tailwind 4 seul, avec des tokens centralisés, suffit.

## Architecture

```
src/
├── main.jsx, App.jsx        entrée, providers, layout, routes (pages secondaires en lazy)
├── routes/                  HomePage, MenuPage, ProductPage, StoryPage, ContactPage, ReservationPage, NotFoundPage
├── components/
│   ├── layout/              Header, MobileMenu, Footer, Belt, Logo, Seo, SkipLink, RouteEffects
│   ├── ui/                  Button, Chip, TypeBadge, Stepper, Field, Dialog, Icons
│   ├── home/                Hero, HeroBall, TypesSection, SignatureDishes, StoryTeaser, ReservationCta
│   ├── menu/                SearchField, FilterControls, FilterSheet, ProductGrid, ProductCard, ProductDetail, ProductDialog, EmptyResults
│   ├── cart/                CartButton, CartDrawer, CartLine
│   ├── forms/               useForm, ContactForm, ReservationForm
│   ├── loading/             LoadingScreen (+ état de session)
│   └── motion/              Reveal
├── contexts/                CartContext (useReducer + localStorage), FavoritesContext, ToastContext
├── hooks/                   useMenuFilters (URL), useMediaQuery, useScrolled
├── reducers/                cartReducer (+ tests)
├── data/                    products, types, filters, restaurant, story, navigation
├── utils/                   filterProducts, storage, validation, formatPrice, text, cn (+ tests)
├── api/                     couche « fetch » simulée (contact, réservation)
├── lib/                     motion (GSAP), SmoothScroll (Lenis)
├── three/                   pokeball (scène), PokeballCanvas
├── styles/globals.css       tokens, base, composants, transitions des dialogs
└── assets/                  products (WebP), branding
```

Flux : l'URL porte les filtres de la carte ; le panier ne stocke que `{ id, quantité }` et relit prix et noms dans le catalogue ; tout ce qui vient du `localStorage` est validé. Détails dans [`docs/architecture/site-architecture.md`](docs/architecture/site-architecture.md).

## Design system

Palette **laque** `#C9211B` / **porcelaine** `#FCFBF8` / **washi** `#F7EEDC` / **encre** `#17151A` / **or** `#F2B826`, plus huit couleurs de type à usage strictement fonctionnel. Typographie : Unbounded (display), Zen Kaku Gothic New (texte), DM Mono (prix, étiquettes). Rayons, ombres (seulement pour ce qui flotte), rythme de section fluide, composants et états documentés dans [`docs/design/design-system.md`](docs/design/design-system.md). Signature : **la ceinture** de la Poké Ball, qui traverse le hero, ferme le header et sépare les sections.

## UX

Trois parcours principaux (commander, choisir par type, réserver) et les cas limites (aucun résultat, slug inconnu, panier vide, stockage indisponible, clavier seul, reduced motion) sont décrits dans [`docs/ux/user-flows.md`](docs/ux/user-flows.md). Les maquettes SVG qui ont servi de référence sont dans [`docs/mockups/`](docs/mockups/).

## Motion design

Lent, précis, physique : un loader de 1,35 s, une séquence de hero (ceinture, titre mot à mot, balle, texte, médaillons), des reveals uniques au scroll, des chiffres qui comptent, des dialogs qui glissent, un menu mobile en cascade. Tokens de durée et d'easing partagés entre CSS et GSAP ; tout se réduit à des fondus courts avec `prefers-reduced-motion`. Voir [`docs/motion/motion-direction.md`](docs/motion/motion-direction.md).

## WebGL / 3D

Une seule expérience : la Poké Ball du hero, construite en Three.js (sphère en deux matériaux, ceinture, bouton, trois lumières, clearcoat). Chargée en chunk séparé uniquement sur desktop avec pointeur fin, WebGL disponible, motion autorisé et sans data saver ; sinon, une Poké Ball SVG. Rendu mis en pause hors viewport et onglet caché, `pixelRatio` plafonné, tout est libéré au démontage. Voir [`docs/webgl/webgl-strategy.md`](docs/webgl/webgl-strategy.md).

## Images

Deux séries cohabitent, même direction artistique (fond crème, plat isolé, plongée 3/4) :

- **16 plats (seconde planche Gemini, 25/09/2026)** : planche 4 × 4 de 2048 × 2048 découpée par script (Python + Pillow + NumPy) en 16 images **512 × 410** (5:4, le bloc image des cartes). La bande de titre de chaque case est détectée (lignes de texte noir) et retirée ; le reste de la case est conservé tel quel, sans remplissage ni redimensionnement, donc fond, ombre et échelle sont identiques pour les 16. Planche de contrôle : `docs/images/new-products-preview.webp`. 400 Ko au total.
- **28 plats (première planche, TP)** : 198 × 168 px, WebP, corrects mais en basse définition dans les cartes. Leur régénération en haute définition est préparée (prompts par plat dans [`docs/images/gemini-prompts.md`](docs/images/gemini-prompts.md), plan dans [`docs/images/image-plan.md`](docs/images/image-plan.md)) et ne bloque pas la livraison : il suffira de déposer `<slug>.webp` dans `src/assets/products/`.

Toutes les images sont affichées avec un masque radial qui fond les angles dans la surface (le haut et le bas restent visibles pour les flammes, vagues et éclairs), en `loading="lazy"` avec dimensions déclarées.

## Performance

Bundle initial : 122 Ko gzip (React, Router, accueil, carte à 44 plats, UI) + 53 Ko (motion) + 12,5 Ko de CSS. Three.js (133 Ko gzip) et les pages secondaires sont chargés à la demande. Aucune requête tierce, fonts en `swap`, images lazy avec dimensions déclarées, animations sur `transform` et `opacity`. Détails et pistes dans [`docs/qa/qa-report.md`](docs/qa/qa-report.md).

## Accessibilité

Dialogs natifs (piège de focus, Échap, restauration du focus), skip link, focus déplacé sur le contenu à chaque page, `aria-pressed` / `aria-live` / `aria-describedby` là où il faut, contrastes vérifiés (encre / porcelaine 16,5:1, porcelaine / laque 5,2:1), cibles ≥ 44 px, reduced motion. Vérifications listées dans le rapport QA.

## SEO

Titre et description par page (React 19 hisse les balises), canonical, Open Graph et Twitter card avec image 1200 × 630, données structurées `Restaurant` (horaires, adresse, réservation) et `MenuItem` par plat, `robots.txt`, `sitemap.xml` (pages + 28 plats), URLs propres. Voir [`docs/seo/seo.md`](docs/seo/seo.md).

## Installation

```bash
npm install
```

Node 20 ou plus récent.

## Développement

```bash
npm run dev
```

Serveur sur `http://localhost:5173`. Autres commandes :

```bash
npm run lint          # oxlint
npm run format        # prettier --write
npm test              # tests unitaires (Vitest)
npm run test:e2e      # tests de bout en bout (Playwright, build + preview automatiques)
```

Pour la première exécution de Playwright : `npx playwright install chromium`.

## Build

```bash
npm run build         # base "/" (Vercel, Netlify, domaine racine) -> dist/
npm run preview       # sert dist/ en local
npm run build:pages   # base "/PokeBistro/" + 404.html pour GitHub Pages
```

## Déploiement

- **GitHub Pages** : `npm run deploy` (build en mode `pages`, publication de `dist/` sur la branche `gh-pages`). Le fichier `404.html` copié au build permet aux liens profonds (`/menu/pikachu-bento`) de charger l'application.
- **Vercel** : `vercel.json` réécrit toutes les routes vers `index.html` et met les assets en cache un an.
- **Netlify** : `netlify.toml`, même logique.

Le site n'est jamais enfermé dans GitHub Pages : la base est une variable d'environnement, les URLs publiques sont centralisées dans `Seo.jsx`.

## Difficultés rencontrées

### 1. Un dossier `cart/` effacé par la suppression de `Cart/`

**Problème.** En supprimant les anciens composants du TP (`src/components/Cart/`), les nouveaux fichiers de `src/components/cart/` ont disparu et le build a échoué sur `CartDrawer` introuvable.
**Cause.** Le système de fichiers Windows ignore la casse : `Cart` et `cart` sont le même dossier.
**Solution.** Réécrire les trois fichiers, puis ne plus jamais réutiliser un nom de dossier du TP en changeant seulement la casse.

### 2. `manualChunks` refusé par Vite 8

**Problème.** Avertissement `Invalid output options: manualChunks expected Function but received Object` et chunks non isolés.
**Cause.** Vite 8 repose sur Rolldown, qui n'accepte plus la forme objet de `manualChunks`.
**Solution.** Une fonction qui normalise l'identifiant (`\` → `/`) et renvoie `three` ou `motion` selon le chemin dans `node_modules`.

### 3. Faux positifs du linter React sur les formulaires

**Problème.** Une trentaine d'avertissements `Cannot access refs during render` sur `form.values`, `form.errors`…
**Cause.** Le hook `useForm` renvoie un objet qui contient une ref (`formRef`) ; la règle considère alors tout l'objet comme une ref.
**Solution.** Destructurer le résultat du hook (`const { values, errors, formRef, … } = useForm(...)`) : code plus lisible, plus d'avertissement.

### 4. `setState` dans des effets

**Problème.** Règle `react(set-state-in-effect)` sur la synchronisation du champ de recherche avec l'URL, la remise à zéro du tiroir à l'ouverture et la pulsation du badge.
**Solution.** Le pattern « ajuster l'état pendant le rendu » (comparer à la valeur précédente mémorisée) pour les deux premiers, et un simple `key={lastAddedAt}` qui remonte le badge pour rejouer l'animation CSS. Le calcul « faut-il charger la 3D ? » est devenu une dérivation au rendu avec une détection WebGL mémorisée au niveau du module.

### 5. Tests Playwright et contrôles personnalisés

**Problème.** `getByLabel('10 € à 15 €').check()` expirait : l'input radio est visuellement masqué (`sr-only`) et l'indicateur dessiné devant lui intercepte le clic. Sur mobile, le test « types → carte filtrée » ne trouvait pas la chip active.
**Cause.** Playwright clique au centre de l'élément ciblé ; la chip vit dans la feuille de filtres, fermée par défaut sur petit écran.
**Solution.** Cliquer sur le label (ce que fait un utilisateur), et ouvrir la feuille avant d'affirmer sur mobile. Au passage, les tuiles de type ont reçu un `aria-label` qui commence par le nom du type.

### 6. La Poké Ball recouvrait le texte sur mobile

**Problème.** À 390 px, la balle centrée sur la ceinture chevauchait l'accroche et la fin du titre.
**Solution.** Balle plus petite sous 768 px, titre limité en largeur, marge haute du bloc bas augmentée pour passer sous la balle.

### 7. Le dossier `cart` suivi par Git en `Cart/`

**Problème.** `git status` affichait `src/components/Cart/CartLine.jsx` alors que le code importe `./components/cart/…`. Sur Windows tout fonctionnait ; sur Linux (Vercel, Netlify, CI) le build aurait échoué avec un module introuvable.
**Cause.** Le dossier `Cart/` du TP existait encore quand les nouveaux fichiers ont été créés : le système de fichiers, insensible à la casse, a gardé l'ancien nom et Git l'a enregistré.
**Solution.** Renommer en deux temps (`git mv Cart cart_tmp`, puis `git mv cart_tmp cart`) pour que l'index reflète la bonne casse, et vérifier avec `git ls-files`.

### 8. Découper la seconde planche sans raccord visible

**Problème.** La première méthode (boîte englobante du plat + canvas carré rempli de la couleur de fond) laissait un rectangle visible : le fond des cases n'est pas uniforme (léger dégradé), et la détection « encre » prenait tout le fond des bols pour du plat.
**Solution.** Garder la case entière moins la bande de titre (512 × 410, un ratio 5:4 naturel), sans remplissage ni redimensionnement, et détecter le texte par ses lignes noires plutôt que par distance au fond. Zéro raccord, échelle identique pour les 16 plats, contrôle visuel sur une planche générée et sur un zoom des bandes hautes.

### 9. Attributs SVG en double dans le générateur de maquettes

**Problème.** Les maquettes générées ne s'affichaient pas (`Attribute font-weight redefined`).
**Cause.** La constante de police display embarquait déjà `font-weight`, réinjecté par l'appel.
**Solution.** Un seul point de vérité pour la graisse, validation XML des neuf fichiers après génération.

## Décisions techniques

- **Bootstrap retiré**, Tailwind 4 conservé : un seul système, des tokens centralisés, pas de collision de classes.
- **Filtres dans l'URL** plutôt que dans un contexte : partageables, compatibles avec le bouton retour, et l'accueil peut ouvrir la carte déjà filtrée.
- **Dialogs natifs** (`<dialog>` + `showModal`) : piège de focus, Échap et restauration du focus fournis par la plateforme ; transitions CSS avec `@starting-style` et `allow-discrete`.
- **Panier minimal en stockage** (`id`, `quantité`) : les prix ne sont jamais lus depuis le navigateur.
- **React 19 pour le SEO** : `<title>` et `<meta>` rendus par page, pas de bibliothèque supplémentaire.
- **Three.js en chunk lazy, desktop seulement** : la 3D sert le hero, pas l'inverse ; sur mobile une Poké Ball SVG est plus juste que 133 Ko de plus.
- **Lenis limité au desktop** et coupé en reduced motion ; le tactile reste natif.
- **Pas de backend factice** : une couche `api/` qui imite `fetch` (promesse, délai, échec possible), remplaçable en une ligne.
- **Fonts auto-hébergées** : aucune requête vers Google Fonts, sous-ensembles latin uniquement.
- **Carte regroupée par catégorie** quand aucun filtre n'est actif : avec 44 plats, on lit la carte comme un menu ; un filtre, une recherche ou un tri la remettent à plat.
- **Un badge maximum par carte** (Nouveau, sinon Signature) et plus de ligne de tags : les plats restent les stars, les détails sont dans la fiche.
- **Aucun fichier d'assistant** dans le dépôt (`.claude`, `.kilo`, etc. ignorés).

## Améliorations futures

- Régénérer les 28 visuels de la première série en haute définition (prompts prêts), puis une image de hero dédiée.
- Pré-rendu statique des 34 URLs au build (SEO et LCP).
- Vraie API pour le contact et la réservation (la couche `api/` est prête), puis commande en ligne.
- Mode sombre (les tokens le permettent : porcelaine ↔ encre).
- Internationalisation (anglais) des données et de l'interface.
- Tests d'accessibilité automatisés (axe) dans la suite Playwright.

## GitHub

https://github.com/drakurei/PokeBistro.git

### Branches

- `main` : la version publiée (déployée sur GitHub Pages) ;
- `develop` : la branche d'intégration, d'où partent les nouvelles fonctionnalités ;
- `feature/<nom>` : une branche par fonctionnalité, créée depuis `develop`, fusionnée dans `develop` puis dans `main` (`feature/design-system`, `feature/home-hero-3d`, `feature/menu-filters`, `feature/cart-drawer`, `feature/pages-forms`, `feature/seo`, `feature/e2e-tests`) ;
- `gh-pages` : générée par `npm run deploy`, ne contient que le site compilé.

Nouvelle fonctionnalité : `git checkout develop && git checkout -b feature/xxx`, merge dans `develop` puis dans `main`, puis `npm run deploy` depuis `main`.

Pokémon est une marque de Nintendo / Creatures Inc. / GAME FREAK inc. PokéBistro est un restaurant fictif et un projet de portfolio sans but commercial.
