# PokéBistro — TP React

## Présentation

PokéBistro est un restaurant fictif inspiré de l'univers Pokémon : des bentos, des burgers, des bowls, des desserts et des boissons qui portent chacun le nom d'un Pokémon (Pikachu Bento, Salamèche Bento, Carapuce Blue Bowl, Rondoudou Dessert…).

Le site est une **landing page unique** : un header avec le panier, un hero, la carte du restaurant avec une sidebar de filtres, une section « À propos », un formulaire de contact et un footer. Les visiteurs peuvent chercher un plat, filtrer par catégorie / tag / prix et remplir un panier affiché dans une modal.

Le projet a été réalisé dans le cadre du cours React (Bachelor développement web, Cloud Campus).

## Objectif du TP

Le sujet du prof demandait de créer un projet React + Vite reproduisant une maquette de restaurant, puis de mettre en place les fonctionnalités suivantes :

- des composants séparés : Header, Nav, Footer (copyright avec l'année dynamique), Sidebar et ses blocs, bloc produit, Button, Cart ;
- un maximum de produits dans un **fichier extérieur** pour pouvoir tester les filtres ;
- filtrer les produits au clic sur un **tag** (dans la sidebar ou dans une carte), sur une **catégorie**, par **prix**, et via un **input de recherche** (titre, catégorie, mots-clés) ;
- passer par un **`useContext`** pour gérer les filtres ;
- ajouter un **`useContext`** pour le panier et incrémenter le nombre d'articles ;
- **Bonus** : une modal du panier (nom, prix unitaire, quantité, total) contrôlée par un `useState`, sans doublon quand on ajoute deux fois le même produit ;
- **Défi** : un bouton « retirer du panier » sur les cartes, et remplacer le `useState` du panier par un **`useReducer`** (la quantité ne peut pas devenir négative ; si la quantité vaut 1, le produit est supprimé).

Le prof laissait le choix de la maquette et de l'outil CSS. J'ai choisi de faire ma propre maquette sur le thème Pokémon et d'utiliser **Bootstrap et Tailwind CSS ensemble**, chacun pour un rôle précis.

## Technologies

```text
React 19
Vite 8
JavaScript (ES modules, JSX)
Bootstrap 5.3
Tailwind CSS 4
Git / GitHub
```

Aucune autre bibliothèque : pas de React Router (une seule page avec des ancres), pas de bibliothèque d'état, pas de backend.

## Fonctionnalités

- **Affichage des produits** : 28 plats répartis en 6 catégories (Bento, Burger, Bowl, Dessert, Boisson, Menu), chacun avec sa propre image (découpée depuis une planche créée pour le projet), son type Pokémon, sa description, ses tags et son prix.
- **Recherche texte** sur le nom, la catégorie, les mots-clés et les tags, insensible à la casse et aux accents (`epice` trouve les plats « épicé »).
- **Filtre par catégorie** (liste avec le nombre de plats de chaque catégorie).
- **Filtre par tag** (populaire, épicé, végétarien, dessert, nouveau), depuis la sidebar ou depuis les tags d'une carte.
- **Filtre par prix** : moins de 10 €, 10 € à 15 €, 15 € à 20 €, plus de 20 €.
- Les filtres se **combinent**, un compteur indique le nombre de résultats, un message propre s'affiche quand rien ne correspond, et un bouton **« Réinitialiser les filtres »** remet tout à zéro.
- **Panier** : ajout avec un retour visuel immédiat sur le bouton (« Ajouté au panier ») et une ligne « 2 dans le panier » sur la carte, retrait d'une unité depuis la carte, + / − et suppression d'une ligne dans la modal, vider le panier, nombre total d'articles dans le header, prix total recalculé automatiquement.
- **Modal du panier** : ouverture depuis le header, fermeture avec la croix, la touche Échap ou un clic à côté, état vide, sous-total par ligne, total général, et un bouton « Commander » qui affiche simplement un message (il n'y a pas de vrai système de commande).
- **Context** pour les filtres et pour le panier, **Reducer** pour la logique du panier.
- **Responsive** : menu burger, bouton « Afficher les filtres » qui déplie la sidebar sur mobile et tablette, grille sur 1 / 2 / 3 colonnes.
- Petits plus : année du copyright dynamique, images de secours si une image ne charge pas, animations légères (survol des cartes et des images, compteur du panier, apparition des cartes, ouverture de la modal), attributs `aria`, labels et focus visible sur les contrôles.
- **Interface** : sidebar de filtres dans un panneau blanc avec un compteur de filtres actifs, chips de tags communes à la sidebar et aux cartes, boutons Bootstrap recolorés aux couleurs de la marque (bleu, jaune) et en forme de pilule, sections À propos et Contact retravaillées (promesses, cartes d'informations avec icônes).

## Architecture

```text
poke-bistro/
├── docs/
│   └── maquette/
│       ├── maquette-resto.svg     wireframe desktop + mobile + modal
│       └── README.md              explication des zones et des choix
├── src/
│   ├── assets/
│   │   ├── pokeball.svg           favicon, logo et image de secours
│   │   └── products/              les 28 images des plats (PNG 198 x 168), une par produit
│   ├── components/
│   │   ├── Header/Header.jsx      logo, navigation, bouton panier + compteur, burger
│   │   ├── Nav/Nav.jsx            liens d'ancre vers les sections
│   │   ├── Hero/Hero.jsx          présentation du restaurant
│   │   ├── Sidebar/               Sidebar.jsx + SearchBlock, CategoryBlock, TagBlock, PriceBlock
│   │   ├── FilterBlock/           coque d'un bloc de la sidebar (titre + contenu)
│   │   ├── ProductGrid/           grille filtrée, compteur, état vide
│   │   ├── ProductCard/           carte d'un produit (image, type, tags, prix, ajouter / retirer)
│   │   ├── Button/                bouton Bootstrap réutilisable
│   │   ├── Modal/                 modal générique contrôlée par isOpen / onClose
│   │   ├── Cart/                  contenu du panier (lignes, total, vider)
│   │   ├── CartItem/              une ligne du panier (− quantité +, sous-total, supprimer)
│   │   ├── About/, Contact/       sections À propos et Contact
│   │   ├── Footer/                liens, infos fictives, copyright dynamique
│   │   └── Icons/                 icônes SVG (panier, loupe, corbeille, filtre, smiley, coche, adresse, téléphone, horloge)
│   ├── contexts/
│   │   ├── FilterContext.jsx      état des filtres (search, category, tag, price)
│   │   └── CartContext.jsx        état du panier (useReducer) + totaux
│   ├── reducers/
│   │   └── cartReducer.js         ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY, CLEAR_CART
│   ├── data/
│   │   ├── products.js            les 28 produits (import de leur image + description)
│   │   ├── filters.js             catégories, tags et tranches de prix
│   │   └── pokemonTypes.js        couleurs des types Pokémon (badge des cartes)
│   ├── utils/
│   │   ├── filterProducts.js      applique les 4 filtres à la liste des produits
│   │   ├── formatPrice.js         12.9 → "12,90 €"
│   │   └── imageFallback.js       image de secours quand une image ne charge pas
│   ├── pages/
│   │   └── Home.jsx               assemble Hero, Sidebar + ProductGrid, About, Contact
│   ├── styles/
│   │   └── globals.css            Bootstrap + Tailwind + thème (couleurs, boutons, chips, options de filtre, animations)
│   ├── App.jsx                    providers, header, page, footer, modal du panier
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Comment ça marche

**Les filtres.** `FilterContext` garde les quatre filtres dans des `useState` et expose des fonctions pour les modifier (`setSearch`, `toggleCategory`, `toggleTag`, `setPrice`, `resetFilters`). Les blocs de la sidebar et les tags des cartes lisent ce contexte avec `useContext(FilterContext)` et le mettent à jour. `ProductGrid` lit les mêmes valeurs et appelle `filterProducts(products, filters)`, une fonction qui garde un produit seulement s'il passe les quatre tests (recherche, catégorie, tag, prix). Comme tout le monde partage le même contexte, la grille se met à jour dès qu'un filtre change, sans passer de props de la page vers chaque bloc.

**Le panier.** Toute la logique est dans `cartReducer` : le state est `{ items: [...] }` et chaque action renvoie un nouveau state.

| Action | Effet |
| --- | --- |
| `ADD_TO_CART` | produit absent → ligne avec quantité 1 ; produit présent → quantité + 1 (jamais deux lignes pour le même produit) |
| `INCREMENT_QUANTITY` | quantité + 1 |
| `DECREMENT_QUANTITY` | quantité − 1 ; si la quantité était 1, la ligne est supprimée ; si le produit est absent, rien ne se passe |
| `REMOVE_FROM_CART` | supprime la ligne quelle que soit la quantité |
| `CLEAR_CART` | vide le panier |

`CartContext` fait le `useReducer(cartReducer, initialState)`, calcule `totalItems` et `totalPrice` avec `reduce` à chaque rendu (donc toujours à jour), et expose des petites fonctions (`addToCart`, `decrementQuantity`…) qui appellent `dispatch`. Le bouton « Retirer » d'une carte et le « − » de la modal utilisent `DECREMENT_QUANTITY`, la corbeille de la modal utilise `REMOVE_FROM_CART`.

**La modal.** `App` garde `isCartOpen` dans un `useState`. Le header reçoit `onOpenCart`, la modal reçoit `isOpen` et `onClose`. Le composant `Modal` réutilise le CSS de Bootstrap (`modal`, `modal-dialog`, `btn-close`…) mais c'est React qui décide de l'afficher ou non : aucun JavaScript Bootstrap n'est chargé.

**Bootstrap et Tailwind.** Chaque composant utilise principalement un des deux outils :

- Bootstrap pour la structure et les composants tout faits : navbar, `container` / `row` / `col`, cartes, boutons, `list-group`, formulaires de la sidebar, markup de la modal, footer ;
- Tailwind pour le hero, les sections À propos et Contact, les titres de section, les espacements et les détails (arrondis, ombres, couleurs de la charte définies dans `@theme`).

## Installation

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:5173`. Pour vérifier le build de production : `npm run build` puis `npm run preview`.

## Déploiement

Le site est en ligne sur GitHub Pages : **https://drakurei.github.io/tp-react-resto/**

```bash
npm run deploy
```

`predeploy` lance `vite build --base=./` (chemins relatifs, indispensables puisque le site n'est pas à la racine du domaine mais dans `/tp-react-resto/`), puis `deploy` envoie le dossier `dist` sur la branche `gh-pages` avec le package `gh-pages`. Cette branche ne contient que le site compilé, jamais le code source.

## GitHub

Repository : `https://github.com/drakurei/tp-react-resto.git`

### Branches

- `main` : la version rendue et déployée ;
- `develop` : la branche d'intégration, d'où partent les nouvelles fonctionnalités ;
- `feature/<nom>` : une branche par fonctionnalité, créée depuis `develop`, fusionnée dans `develop` puis dans `main` (par exemple `feature/github-pages-deploy` pour la mise en ligne) ;
- `gh-pages` : générée automatiquement par `npm run deploy`, ne pas y toucher à la main.

Les premières étapes du TP ont été faites directement sur `main` ; les branches ont été mises en place ensuite, à partir du déploiement.

## Maquette

```text
docs/maquette/maquette-resto.svg
```

La maquette a été faite avant de coder pour découper la page en zones et en composants. Le fichier `docs/maquette/README.md` explique les zones, les choix visuels et les décisions prises (une seule page, répartition Bootstrap / Tailwind, filtres repliables sur mobile, modal pour le panier).

## Images des produits

Les 28 images des plats proviennent d'une **planche unique générée pour le projet** (une grille de 7 colonnes sur 4 lignes, avec le nom de chaque plat écrit sous l'assiette). La planche a été découpée en 28 fichiers PNG de 198 × 168 px (le texte de la planche a été retiré : c'est le composant `ProductCard` qui affiche le nom), rangés dans `src/assets/products/` et importés dans `src/data/products.js` comme n'importe quel asset Vite :

```js
import pikachuBento from '../assets/products/pikachu-bento.png'
// ...
{ id: 1, name: 'Pikachu Bento', image: pikachuBento, ... }
```

Le découpage a été fait avec un petit script Python (Pillow) gardé en dehors du projet. Les visuels du hero et de la section À propos (Pikachu, Évoli) restent les artworks officiels servis par [PokeAPI](https://github.com/PokeAPI/sprites), avec une Pokéball SVG locale en secours. Pokémon est une marque de Nintendo / Creatures Inc. / GAME FREAK inc. ; ce projet est un exercice, sans but commercial.

## Difficultés rencontrées

### Difficulté 1 : Bootstrap écrasait les classes Tailwind

**Problème.** Après avoir installé les deux, certaines classes Tailwind ne s'appliquaient pas sur des éléments déjà stylés par Bootstrap (par exemple un `mb-0` ou un `font-bold` sur un titre restait au style Bootstrap).

**Cause.** Tailwind v4 met tout son CSS dans des *cascade layers* (`@layer theme, base, components, utilities`). Or en CSS, une règle qui n'est dans aucun layer passe toujours devant les règles qui sont dans un layer, peu importe sa spécificité. Bootstrap, importé normalement depuis `main.jsx`, n'était dans aucun layer : il gagnait donc à chaque fois.

**Solution.** Dans `globals.css`, Bootstrap est importé dans son propre layer, placé avant `utilities`, et le Preflight de Tailwind (son reset) n'est pas chargé puisque Bootstrap a déjà le sien :

```css
@layer bootstrap, theme, base, components, utilities;
@import 'bootstrap/dist/css/bootstrap.min.css' layer(bootstrap);
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
```

**Appris.** Les deux outils partagent aussi des noms de classes (`container`, `p-3`, `gap-3`, `rounded`, `shadow-sm`, `collapse`…). Avec cet ordre, c'est la version Tailwind qui gagne : les espacements suivent donc l'échelle Tailwind (`p-3` = 0,75 rem et pas 1 rem), j'utilise `container-xl` plutôt que `container` pour garder la largeur Bootstrap, et j'ai évité la classe `collapse` (menu burger géré avec `d-none` / `d-flex`).

### Difficulté 2 : erreur `useContext(...) is null` pendant le développement

**Problème.** En branchant les blocs de la sidebar sur le `FilterContext`, la console affichait `Cannot destructure property 'search' of 'useContext(...)' as it is null` et la page était blanche.

**Cause.** J'avais modifié les composants qui lisent le contexte avant d'entourer l'application avec `<FilterProvider>` dans `App.jsx`. Avec le rechargement à chaud de Vite, les blocs ont été rechargés en premier et ont lu la valeur par défaut du contexte (`null`). Même chose plus tard avec le `CartContext`.

**Solution.** Ajouter le Provider dans `App.jsx` et recharger la page. Pour vérifier que l'erreur ne venait pas du code, j'ai rechargé complètement le navigateur : plus aucune erreur.

**Appris.** Un composant qui fait `useContext` doit toujours être rendu à l'intérieur du Provider correspondant ; l'ordre dans lequel on écrit les fichiers a de l'importance quand le serveur de dev recharge à chaud.

### Difficulté 3 : images étirées sur mobile

**Problème.** En testant en 375 px, Pikachu dans le hero était déformé (très étiré en hauteur) et le bloc jaune n'était plus rond.

**Cause.** Les images ont des attributs `width="475" height="475"` (bonne pratique pour éviter les sauts de mise en page) et une largeur en pourcentage via Tailwind (`w-4/5`). Comme je n'ai pas chargé le Preflight de Tailwind (voir difficulté 1), il n'y avait plus la règle `img { height: auto }` : la hauteur restait bloquée à 475 px alors que la largeur diminuait.

**Solution.** Ajouter la classe `h-auto` sur les images concernées (hero et À propos).

**Appris.** Quand on retire un reset CSS, il faut savoir ce qu'il faisait ; Bootstrap ne rend pas les images fluides par défaut (il faut `img-fluid` ou `height: auto`).

### Difficulté 4 : avertissement `@charset` au build

**Problème.** `npm run build` affiche un avertissement : `Unknown at rule: @charset` en pointant le début du fichier CSS de Bootstrap.

**Cause.** Le fichier de Bootstrap commence par `@charset "UTF-8";`, une règle qui n'est valable qu'en tout début de feuille de style. Comme je l'importe à l'intérieur d'un `@layer`, l'optimiseur CSS de Vite la trouve au mauvais endroit et la signale.

**Solution.** Aucune pour l'instant : ce n'est qu'un avertissement, le build réussit et le site fonctionne (le fichier est bien en UTF-8 de toute façon). Je le laisse visible plutôt que de le cacher.

### Difficulté 5 : découper la planche des 28 plats sans garder le texte

**Problème.** La planche fournie contient les 28 plats dans une grille de 7 × 4, avec le nom écrit sous chaque plat. Il fallait obtenir 28 images propres, sans le texte, sans couper les assiettes, avec un rendu homogène.

**Cause.** Les séparations de la grille se détectent bien (ce sont les colonnes et lignes les plus claires de l'image), mais ma première détection automatique de la bande de texte se trompait sur certaines cases : les pixels sombres d'une assiette noire ou d'un pain au charbon étaient pris pour des lettres, ce qui aurait coupé le plat en deux.

**Solution.** Mesurer la position des lettres uniquement sur les cases où la détection était fiable (le texte commence toujours à la ligne 173-174 de la case), fixer une coupe commune à la ligne 169, puis générer une planche de contrôle des 28 découpes et un zoom sur la bande basse de chaque image pour vérifier à l'œil qu'aucun plat n'était coupé et qu'aucune lettre ne restait.

**Appris.** Un traitement automatique doit toujours être contrôlé visuellement ; sur une grille régulière, une coupe fixe vérifiée vaut mieux qu'une détection « intelligente » qui se trompe une fois sur quatre.

### Difficulté 6 : l'image ne remplissait pas la carte

**Problème.** Les cartes utilisaient une zone image au format 4:3 avec `object-fit: contain`. Les nouvelles images font 198 × 168 (un ratio plus carré) : il restait deux bandes sur les côtés, et comme le fond crème des images varie légèrement d'une case à l'autre de la planche, impossible de les cacher avec une couleur de fond identique.

**Solution.** Donner à la zone image exactement le ratio des images grâce à la variable CSS de Bootstrap : `.ratio-product { --bs-aspect-ratio: calc(168 / 198 * 100%); }`. L'image remplit la zone sans bande ni recadrage. Cette classe est dans `globals.css`, pas dans les images : c'est le CSS qui s'adapte aux visuels, pas l'inverse.

**À noter aussi.** La planche comporte deux « Salamèche Bento » et deux « Mew Berry Bowl », ainsi que deux fautes (« FRESH LCE » et « MAGIKARPE »). Pour que la carte et le panier restent lisibles, les doublons sont devenus « Salamèche Bento Maxi » et « Mew Berry Bowl Chantilly », et les noms ont été corrigés (« Fresh Ice Blue Bowl », « Magicarpe Splash Soda »). Cinq produits de la première version qui n'existaient pas sur la planche (Salamèche Burger, Ectoplasma Black Burger, Lucario Energy Bowl, Tortank Ocean Bowl, Pichu Lemonade) ont été remplacés par les plats réellement présents (Herbizarre Bento, Salamèche Bento ×2, Fresh Ice Blue Bowl, Mew Berry Bowl Chantilly) pour garder 28 produits, chacun avec sa vraie image.

### Difficulté 7 : le logo disparaissait une fois le site déployé

**Problème.** En préparant le déploiement sur GitHub Pages (site servi dans `/tp-react-resto/`, pas à la racine), le build en base relative gardait `src="/pokeball.svg"` tel quel dans le JavaScript du header, du footer et de l'image de secours. Une fois en ligne, ces chemins auraient pointé vers `drakurei.github.io/pokeball.svg`, qui n'existe pas.

**Cause.** Vite réécrit les URL des fichiers qu'il connaît (imports et balises de `index.html`), mais pas une simple chaîne de caractères écrite dans du JSX. Le fichier était dans `public/`, donc jamais importé.

**Solution.** Déplacer `pokeball.svg` dans `src/assets/` et l'importer comme les images des produits (`import pokeball from '../../assets/pokeball.svg'`, puis `src={pokeball}`). Vite génère alors la bonne URL quel que soit l'endroit où le site est hébergé, y compris pour la favicon référencée dans `index.html`.

**Appris.** Tout ce qui doit suivre la « base » du site doit passer par un import Vite ; le dossier `public/` ne sert que pour les fichiers dont on écrit l'URL à la main.

## Améliorations possibles

- Sauvegarder le panier dans le `localStorage` pour le retrouver après un rechargement.
- Ajouter un filtre par type Pokémon (Feu, Eau, Plante…) puisque la donnée existe déjà.
- Autoriser plusieurs tags en même temps.
- Une vraie page de commande (formulaire de livraison, récapitulatif) à la place du bouton « Continuer mes achats ».
- Un mode sombre en s'appuyant sur `data-bs-theme` et les variantes `dark:` de Tailwind.
- Quelques tests unitaires sur `cartReducer` et `filterProducts`, qui sont des fonctions pures faciles à tester.
