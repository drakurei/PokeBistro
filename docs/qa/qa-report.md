# Rapport QA

Date : 25/09/2026 (mise à jour après l'intégration des 16 nouveaux plats) · Build testé : `main` (Vite 8, React 19, React Router 8).

## 1. Tests automatisés

| Suite        | Outil                                                                                                               | Couverture                                                                                                                                                                                                                                                                                                                         | Résultat            |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Unitaire     | Vitest (`npm test`)                                                                                                 | `cartReducer` (8 cas), `filterProducts` (7), `storage` (4), `validation` (6)                                                                                                                                                                                                                                                       | **25 / 25**         |
| Bout en bout | Playwright (`npm run test:e2e`), projets `desktop` (Chrome 1366 × 900) et `mobile` (Pixel 7), reduced-motion activé | navigation, loader, skip link, 404, types → carte filtrée, recherche, filtres + URL + rechargement, fiche en dialog et en page, favoris persistants, panier (ajout, stepper, suppression, vide, persistance, stockage corrompu, clavier, Commander / Vider), formulaires contact et réservation (validation, focus, envoi, succès) | **30 / 30**         |
| Lint         | oxlint (`npm run lint`)                                                                                             | règles React (hooks, deps, refs, set-state-in-effect) + oxc                                                                                                                                                                                                                                                                        | **0 avertissement** |
| Format       | Prettier (`npm run format:check`)                                                                                   | tout le dépôt                                                                                                                                                                                                                                                                                                                      | conforme            |

## 2. Parcours vérifiés à la main (navigateur)

| Parcours                                                                                    | Desktop 1440                 | Mobile 390   | Notes                                                               |
| ------------------------------------------------------------------------------------------- | ---------------------------- | ------------ | ------------------------------------------------------------------- |
| Loader → hero                                                                               | OK                           | OK           | Une fois par session, sortie en 1,35 s, timeout 2,4 s.              |
| Poké Ball 3D                                                                                | OK (WebGL, parallaxe souris) | Fallback SVG | Chunk `three` chargé après le hero, jamais sur mobile.              |
| Header transparent → opaque + ceinture                                                      | OK                           | OK           | Bascule à 24 px de scroll.                                          |
| Marquee, types (teinte au survol), plateau, chiffres, bandeau                               | OK                           | OK           | Reveals une seule fois.                                             |
| Carte : recherche, rail / feuille de filtres, compteur                                      | OK                           | OK           | Feuille en bottom sheet, bouton « Voir N plats ».                   |
| Fiche plat (dialog), Échap, clic extérieur, URL                                             | OK                           | OK           | Accès direct = page complète + « Aussi de type ».                   |
| Panier : ajout, stepper sur carte, tiroir, total, Vider (confirmation), Commander (message) | OK                           | OK           | Persistance vérifiée après rechargement.                            |
| Contact / Réservation : erreurs, focus, envoi, succès                                       | OK                           | OK           | Simulation 900 ms.                                                  |
| 404                                                                                         | OK                           | OK           |                                                                     |
| Reduced motion                                                                              | OK                           | OK           | Pas de Lenis, pas de 3D, fondus courts, page lisible immédiatement. |

## 3. Accessibilité (vérifications faites)

- Un `<h1>` par page ; sections avec `aria-labelledby` ; landmarks `header` / `nav` / `main` / `footer`.
- Skip link premier élément focalisable ; focus déplacé sur `<main>` à chaque changement de page.
- Dialogs natifs (`showModal`) : piège de focus, Échap, restauration du focus sur le déclencheur (testé).
- Tous les boutons icône ont un `aria-label` ; chips en `aria-pressed` ; compteur de résultats et quantités en `aria-live`.
- Formulaires : labels visibles, `aria-invalid`, erreurs liées par `aria-describedby` et annoncées (`role="alert"`), premier champ invalide focalisé.
- Contrastes : encre sur porcelaine 16,5:1 ; encre muette sur porcelaine 5,5:1 ; porcelaine sur laque 5,2:1 ; porcelaine sur encre 16:1. Texte sur les couleurs de type choisi (encre ou porcelaine) selon la luminance.
- Cibles tactiles ≥ 44 px (boutons, chips 40 px avec marge 8 px, stepper 36–40 px).
- `prefers-reduced-motion` respecté (CSS + `gsap.matchMedia`).
- Images décoratives en `alt=""`, visuel de la fiche nommé.

Points à surveiller : la Poké Ball SVG anime un flottement en CSS (désactivé en reduced motion) ; les couleurs de type Fée et Glace sont claires et ne servent jamais de fond de texte.

## 4. Performance (build de production)

| Chunk                                                | Taille min | gzip         | Chargement                      |
| ---------------------------------------------------- | ---------- | ------------ | ------------------------------- |
| `index` (React, Router, accueil, carte, UI)          | 349 Ko     | 118 Ko       | initial                         |
| `motion` (GSAP, ScrollTrigger, Lenis)                | 142 Ko     | 53 Ko        | initial                         |
| `three` (Poké Ball 3D)                               | 536 Ko     | 133 Ko       | lazy, desktop + WebGL seulement |
| pages Histoire / Contact / Réservation / Fiche / 404 | 1–7 Ko     | 0,5–2,6 Ko   | lazy                            |
| CSS                                                  | 54 Ko      | 12,5 Ko      | initial                         |
| Fonts (latin)                                        | 3 familles | ~ 100 Ko     | swap                            |
| Images produits                                      | 28 WebP    | 157 Ko total | lazy (hors hero)                |

Mesures : aucune requête tierce (fonts auto-hébergées, pas de carte externe), images en `loading="lazy"` + `decoding="async"`, dimensions déclarées (pas de décalage), animations sur `transform` / `opacity` uniquement, rendu 3D mis en pause hors viewport et onglet caché, `pixelRatio` plafonné à 1,5.

Piste suivante : pré-rendu statique des 34 URLs (SEO + LCP) et suppression de Lenis si l'on veut encore alléger le bundle initial (~ 10 Ko).

## 5. Sécurité (revue frontend)

- Aucune donnée interprétée comme HTML : tout passe par JSX ; pas de `dangerouslySetInnerHTML` (le JSON-LD est sérialisé via `JSON.stringify`).
- Entrées de formulaire : nettoyage des caractères de contrôle, longueurs bornées, validation email, dates bornées (aujourd'hui → 3 mois), créneaux et couverts restreints à des listes fermées, honeypot.
- Stockage local : préfixé, taille plafonnée (32 Ko), validation de forme, ids vérifiés contre le catalogue, prix jamais lus depuis le stockage.
- Paramètres d'URL : valeurs inconnues ignorées, recherche tronquée à 60 caractères.
- Liens externes (réseaux) ouverts sans `target="_blank"` ; aucun secret, aucune clé, aucun `.env` versionné (seul `.env.pages` avec la base publique).
- Dépendances : `npm audit` → 0 vulnérabilité au 25/09/2026.

## 6. Bugs trouvés et corrigés pendant la QA

1. Poké Ball qui recouvrait le texte d'accroche sur mobile → marge haute du bloc bas et taille de balle réduite.
2. « 100 % » qui passait à la ligne dans les chiffres → taille fluide + `white-space: nowrap`.
3. Six boutons laque dans le plateau des plats signatures (trop de rouge) → CTA des cartes en encre.
4. Stepper du panier bloqué à 1 → prop `allowRemove` (retrait à 1, comme dans le TP).
5. Tests e2e : radio `sr-only` non cliquable (indicateur custom devant) → clic sur le label ; nom accessible des tuiles de type commençant par le compteur → `aria-label` explicite.

## 7. Intégration des 16 nouveaux plats (25/09/2026)

| Contrôle       | Résultat                                                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Planche source | `Downloads/Gemini_Generated_Image_ocqkffocqkffocqk.jpg`, 2048 × 2048, grille 4 × 4, 16 plats dans l'ordre attendu, original conservé                |
| Découpe        | 16 × 512 × 410 WebP (10 – 39 Ko), titres retirés (contrôle sur planche + zoom des bandes hautes), aucun raccord, aucun débord de case voisine       |
| Catalogue      | 44 plats, ids 29 → 44, slugs uniques, catégorie Entrée, types Vol / Combat / Spectre, tags signature / frais / léger / gourmand                     |
| Recherche      | « lucario » → 2 plats, « gyoza » → 1, « lavande » → 1 (ingrédient), « spectre » → 1 (type), sans accents                                            |
| Filtres        | Entrée (3), Combat (2), Spectre (1), Vol (1), Nouveau (16), Signature (11), combinaisons Bento + Feu + 10–15 € → 3 (test e2e)                       |
| Tri            | prix croissant / décroissant / nouveautés d'abord, dans l'URL (`?sort=`)                                                                            |
| Fiche          | image, description, prix, ingrédients, type, tags, quantité, ajout, favori : identiques aux anciens plats (vérifié sur Lucario Power Burger)        |
| Panier         | ajout d'un nouveau plat, double ajout, quantité, retrait, total, fermeture / réouverture, rechargement (suite e2e `cart.spec.js`, 30 / 30 au total) |
| Console        | 0 erreur React / JS sur accueil, carte, fiche, panier                                                                                               |
| Mobile 390     | bandeau de catégories défilant, tri, filtres en feuille, cartes 5:4 nettes                                                                          |
| Git            | dossier `cart` renommé dans l'index (`Cart/` → `cart/`) : build Linux sûr                                                                           |

Points d'attention documentés : les 28 anciens visuels (198 × 168) restent moins nets que les 16 nouveaux ; leur régénération est préparée dans `docs/images/`.
