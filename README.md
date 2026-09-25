# PokéBistro

Site vitrine, carte en ligne et parcours de commande d'un restaurant fictif inspiré de l'univers Pokémon. Projet de portfolio de niveau studio : direction artistique propre, motion design mesuré, Poké Ball 3D, carte filtrable, formules composables, panier persistant, commande et réservation simulées, HTML pré-rendu pour chaque page, accessibilité auditée, budget de performance en CI.

**Démo** : https://drakurei.github.io/PokeBistro/ · **Code** : https://github.com/drakurei/PokeBistro

## Présentation

PokéBistro sert des entrées, des bentos, des burgers, des bowls, des grandes assiettes, des desserts et des boissons qui portent chacun le nom d'un Pokémon : Pikachu Bento, Lucario Power Burger, Marill Aqua Bowl, Mentali Velvet Cake… Le site présente le restaurant, laisse explorer les **59 plats** (dont une collection de **15 profiteroles Pokémon**) et **8 formules** par type Pokémon (onze types, onze glyphes originaux), par catégorie, par envie, par régime ou par prix, compose un panier, simule une commande sur place ou à emporter et demande une table.

Le projet part d'un TP React validé en cours, conservé tel quel dans son dépôt. Cette version en garde la logique utile et reconstruit tout le reste. L'audit de départ est dans [`docs/audit/tp-audit.md`](docs/audit/tp-audit.md) ; l'audit senior qui a guidé la dernière itération et son bilan sont dans [`docs/audit/senior-audit-implementation.md`](docs/audit/senior-audit-implementation.md).

## Ce que le site fait

- **Accueil** : hero « food-first » (un plat HD sur la ceinture, la Poké Ball 3D en sceau, un titre qui se lit), types, six signatures, **la collection dessert** (croquembouche de Pikachu en grand, création du chef, quatre profiteroles), histoire, avis de démonstration clairement identifiés, réservation.
- **La carte** : sommaire, sept catégories dans l'ordre d'un repas puis les formules ; la section Desserts se lit comme une vitrine (choux & profiteroles, gâteaux, glacés, fruits) ; recherche sans accents, filtres combinables (catégorie, type, envie, régime végétarien / vegan / sans gluten, prix), tri ; tout vit dans l'URL, donc partageable.
- **Fiche de plat** : en dialog au-dessus de la carte, en page complète en accès direct ; ingrédients, régime, 14 allergènes réglementaires (données de démonstration, dites comme telles), niveau d'épice, « Existe aussi en formule », « À déguster avec » (un chou du type après un plat, un thé après un bowl, une boisson après un dessert).
- **Formules** : cinq fixes, trois à composer dans un composeur visuel (cartes-radio par emplacement), prix fixe, économie affichée ; la Formule Déjeuner porte ses conditions.
- **Panier** : plats et formules, quantités, annulation d'une suppression, proposition de passer en formule quand ses plats sont tous là, « Ajouter un dessert ? » / « Et une boisson ? » selon ce qui manque, barre mobile, persistance locale validée.
- **Commande** (`/commande`) : simulation en quatre étapes (mode, créneau réel selon les horaires, coordonnées, récapitulatif) puis confirmation avec numéro. Retour possible à chaque étape, clavier complet.
- **Réservation** : créneaux complets simulés, jours de fermeture, intérieur / terrasse, téléphone, récapitulatif, politique d'annulation, fichier `.ics`.
- **Favoris** (`/favoris`) : gardés dans le navigateur, compteur dans le header, état vide utile.
- **Pré-rendu** : les 74 adresses existent en HTML statique avec leur titre, description, balises sociales et JSON-LD (`Restaurant`, `Menu`, `MenuItem`, `BreadcrumbList`) ; sitemap généré au build.

## Stack

| Domaine     | Choix                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| UI          | React 19, React Router 8 (déclaratif, état des filtres dans l'URL, routes modales), Tailwind CSS 4 (`@theme`)      |
| Motion      | GSAP 3 + `@gsap/react`, ScrollTrigger, Lenis (desktop, wheel), View Transitions API, `<dialog>` natif              |
| 3D          | Three.js, chunk séparé, chargé après le loader et en idle sur desktop qualifié, SVG sinon                          |
| Images      | Planches Gemini découpées (Pillow) ; AVIF + WebP, `srcset`/`sizes`, vignettes 256 px, préchargement du hero        |
| Polices     | Fontsource : Unbounded (display), Zen Kaku Gothic New (texte), DM Mono (utilitaire), sous-ensembles latin          |
| Build       | Vite 8 ; pré-rendu statique par `react-dom/static` (`scripts/prerender.mjs`) ; budget de taille sans dépendance    |
| Qualité     | oxlint, Prettier, Vitest, Playwright (desktop + mobile, reduced motion, plein mouvement, axe-core), GitHub Actions |
| Hébergement | GitHub Pages (`base=/PokeBistro/`, 404 = coquille), configs Vercel et Netlify avec en-têtes de sécurité            |

## Lancer le projet

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # nettoie dist, build Vite, pré-rend les 74 routes, sitemap
npm run preview      # sert dist sur http://localhost:4173
npm run check        # lint + tests unitaires + build + budget
npm run test:e2e     # Playwright (construit et sert le build lui-même)
npm run deploy       # build en mode pages puis publication sur la branche gh-pages
```

Autres scripts : `lint`, `format`, `format:check`, `test`, `test:watch`, `size` (budget), `prerender`, `clean`, `csp-hash`.

## Structure

```
src/
  api/          fausse couche réseau (délai, échec si l'email commence par "erreur@")
  components/   cart, forms, home, layout, loading, menu, motion, order, ui
  contexts/     panier, favoris, toasts
  data/         plats (59), formules, filtres, types (+ glyphes), restaurant, avis, histoire, contenu, éditorial
  hooks/        filtres dans l'URL, media queries, défilement
  reducers/     panier (lignes objets, clés stables)
  routes/       une page par route
  seo/          pageMeta : titres, descriptions, canonical, JSON-LD, routes, sitemap
  three/        Poké Ball
  utils/        panier, filtres, horaires, suggestions, ics, stockage, validation…
  entry-server.jsx   rendu statique
scripts/        prerender, clean, size-budget, csp-hash, image-variants, cut-dessert-sheet
docs/           audit, design, ux, architecture, motion, webgl, images, seo, qa, mockups
e2e/            tests de bout en bout
```

## Décisions notables

- **Le hero montre un plat, pas un logo.** Le titre est une phrase, visible dès la première peinture ; l'intro n'anime que ce qui est déjà là.
- **Glyphes de types originaux.** Onze pictogrammes dessinés pour le site ; aucun logo ou sprite officiel.
- **Une signature dessert faite de pâte à choux.** Quinze profiteroles et un croquembouche où le Pokémon est fait de glaçage, de crème, de fruits et de sucre : pas de figurine, pas de jouet. Une seule création du chef, quatre desserts mis en avant, tout se change dans `src/data/editorial.js`.
- **Aucune donnée inventée présentée comme réelle.** Les avis, les allergènes, la commande, la réservation et leur disponibilité sont marqués « démonstration ». Pas de « Populaire », pas de note Google.
- **Pré-rendu plutôt que SSR.** Le site est statique et le reste : chaque page est un fichier HTML, React s'y attache. Sur GitHub Pages, les sous-pages se terminent par `/` ; les canonicals aussi.
- **Panier en lignes objets.** Un plat ou une formule avec ses choix, une clé stable, une validation à la lecture du stockage. Le passage en formule est proposé, jamais imposé.
- **Un budget de taille en CI.** JavaScript hors Three ≤ 210 kB gzip, Three ≤ 137 kB, CSS ≤ 16 kB, polices latin ≤ 127 kB.

## Limites connues

- 28 des 59 plats gardent leur visuel basse définition (198 × 168) : aucune nouvelle planche n'était disponible. Les prompts sont prêts dans `docs/images/gemini-prompts.md`.
- GitHub Pages ne permet aucun en-tête HTTP : les en-têtes de sécurité (CSP, HSTS…) ne s'appliquent que sur Vercel ou Netlify.
- Commande, réservation et contact sont simulés côté client ; l'API est prête à être branchée (`src/api`).
- Les avis viennent d'un jeu de données de démonstration ; le modèle prévoit une source Google (via un proxy serveur, jamais de clé dans le navigateur) ou un livre d'or maison.

## Documentation

- [`docs/design/design-direction.md`](docs/design/design-direction.md) — thèse, hero, palette, typographie, glyphes
- [`docs/ux/user-flows.md`](docs/ux/user-flows.md) — parcours, micro-décisions, accessibilité
- [`docs/architecture/site-architecture.md`](docs/architecture/site-architecture.md) — routes, données, panier, rendu
- [`docs/motion/motion-direction.md`](docs/motion/motion-direction.md) — tokens, séquences, reduced motion
- [`docs/webgl/webgl-strategy.md`](docs/webgl/webgl-strategy.md) — Poké Ball 3D, chargement différé
- [`docs/images/image-plan.md`](docs/images/image-plan.md) et [`gemini-prompts.md`](docs/images/gemini-prompts.md) — pipeline et prompts
- [`docs/seo/seo.md`](docs/seo/seo.md) — pré-rendu, données structurées, hébergement
- [`docs/qa/qa-report.md`](docs/qa/qa-report.md) — tests, budget, vérifications manuelles
- [`docs/mockups/`](docs/mockups/README.md) — maquettes SVG

## Crédits

Pokémon est une marque de Nintendo / Creatures Inc. / GAME FREAK inc. PokéBistro est un restaurant fictif et un projet de portfolio sans lien avec ces sociétés. Visuels des plats générés avec Gemini à partir des prompts du dossier `docs/images`.
