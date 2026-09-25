# Audit senior — mise en œuvre

Bilan point par point de l'audit senior du 25/09/2026 (rapport hors dépôt) et de son implémentation. Trois états : **fait**, **fait autrement** (avec la raison), **non fait** (avec la raison).

## Images

| Point                                    | État           | Détail                                                                                                                      |
| ---------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Visuels HD pour les 28 plats historiques | **non fait**   | Aucune nouvelle planche disponible ; prompts prêts, pipeline de découpe prêt. Les 28 restent en 198 × 168, jamais agrandis. |
| AVIF / WebP, `srcset`, `sizes`, lazy     | fait           | `imageSet` + `<DishImage>` ; AVIF −38 % ; vignettes 256 px pour le panier, les plateaux, les suggestions.                   |
| `fetchpriority` et préchargement du hero | fait           | `preload()` React 19 depuis le `<head>`, `fetchpriority="high"`, `decoding="sync"`.                                         |
| Visuels des pages secondaires            | fait autrement | Histoire utilise des médaillons HD ; salle, terrasse et OG « plat » attendent une génération (prompts ajoutés).             |

## Hero, LCP, loader

| Point                                      | État | Détail                                                                                             |
| ------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------- |
| Hero « food-first »                        | fait | Plat HD sur la ceinture, Poké Ball en sceau, titre-phrase, légende du plat ; médaillons supprimés. |
| Chevauchement à 768 px                     | fait | Grille 12 colonnes dès `md`, plat en `justify-self-end`, balle centrée sur la ceinture.            |
| Hauteurs plafonnées                        | fait | `min(50svh, 560px)`.                                                                               |
| H1 jamais en `opacity: 0`                  | fait | Le titre n'est pas animé ; testé (`motion.spec.js`).                                               |
| Loader ≤ 0,9 s, non bloquant, dans l'arbre | fait | 0,9 s, rendu côté serveur, masqué avant peinture si déjà vu, supprimé en reduced motion.           |
| Three.js différé                           | fait | Après le loader + `requestIdleCallback`, desktop qualifié seulement.                               |

## SEO

| Point                              | État           | Détail                                                                                             |
| ---------------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| OG / Twitter dans le HTML statique | fait           | Pré-rendu de chaque route avec ses balises.                                                        |
| Pré-rendu de toutes les routes     | fait           | 59 routes (accueil, carte, 44 plats, 8 formules, secondaires), `hydrateRoot`.                      |
| Sitemap complet avec `lastmod`     | fait           | 57 URL générées au build ; `/commande`, `/favoris` en `noindex` et hors sitemap.                   |
| JSON-LD `Restaurant` + `Menu`      | fait           | `Menu` / `MenuSection` / `MenuItem` sur la carte, `MenuItem` + `BreadcrumbList` sur les fiches.    |
| En-têtes de sécurité               | fait autrement | Vercel / Netlify uniquement (CSP avec hash, HSTS…) ; impossible sur GitHub Pages, dit dans la doc. |

## Glyphes de types

Fait : `TypeIcon` (onze glyphes originaux), `icon` dans `data/types.js`, utilisés dans `TypeBadge`, les filtres, la section types, les cartes, la fiche, le composeur, la mobile sheet. Aucun logo ni sprite officiel.

## Accessibilité

| Point                            | État | Détail                                                                                            |
| -------------------------------- | ---- | ------------------------------------------------------------------------------------------------- |
| Étoiles en `role="img"`          | fait | « Note : n sur 5 », icônes masquées.                                                              |
| Couleur jamais seule             | fait | Badges texte, glyphe + nom, créneau complet barré + « (complet) », étapes numérotées.             |
| Réduction des focus sur la carte | fait | Sommaire, cœurs et images hors tabulation, `scroll-margin-top` sous la barre collante.            |
| Placeholders                     | fait | Les champs ont des libellés visibles et des aides ; plus de placeholder-exemple sur nom et email. |
| Audit axe                        | fait | `e2e/a11y.spec.js` sur neuf écrans + tiroir + feuille de filtres (WCAG 2.1 A/AA).                 |

## Catalogue et cartes

| Point                                                 | État | Détail                                                                                     |
| ----------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------ |
| « Menus » → « Grandes assiettes », ordre des sections | fait | Entrées, Bentos, Burgers, Bowls, Grandes assiettes, Desserts, Boissons, Formules.          |
| Desserts hors des bowls, Fresh Ice Blue Bowl          | fait | Trois bowls sucrés en Desserts ; le bowl glacé devient Givrali.                            |
| « Populaire » sans donnée                             | fait | Supprimé ; ≤ 6 signatures (6), 8 nouveautés, 4 choix du chef.                              |
| Régime, allergènes, épice, disponibilité              | fait | Sur les 44 plats, avec mention « démonstration » dans la fiche ; filtre régime dans l'URL. |
| Troncature au mot, cohérence des badges               | fait | `truncateWords`, un badge éditorial au plus.                                               |

## Formules, panier, commande, favoris, réservation, avis

| Point                                  | État           | Détail                                                                                                          |
| -------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| 6–7 formules dont Déjeuner, Duo, Pichu | fait autrement | 8 formules (les cinq existantes + les trois demandées) : un cran plus riche, cohérent avec la carte.            |
| Composeur visuel                       | fait           | `ChoiceGrid` : cartes-radio avec image, nom, prix, type.                                                        |
| « Existe aussi dans »                  | fait           | Sur la fiche, vers chaque formule qui contient le plat.                                                         |
| Panier → formule jamais automatique    | fait           | Proposition avec l'économie, bouton explicite.                                                                  |
| Commande simulée en 5 étapes           | fait           | `/commande` : mode, créneau, coordonnées, récapitulatif, confirmation ; retour ; clavier ; état vide.           |
| « Souvent commandés ensemble »         | fait           | À partir des formules et du type (aucune popularité inventée) ; « Et avec ça ? » dans le panier.                |
| Barre panier mobile                    | fait           | `MobileCartBar` sur la carte.                                                                                   |
| Page `/favoris`                        | fait           | Header (compteur), mobile nav, état vide.                                                                       |
| Réservation                            | fait           | Téléphone, créneaux complets simulés, jours fermés, intérieur/terrasse, récapitulatif, politique fictive, .ics. |
| Avis : bandeau démo, modèle de source  | fait           | `source: demo                                                                                                   | google | first-party`, bandeau tant que la source est démo, aucune clé côté navigateur. |

## Performance, motion, architecture, CI

| Point                                          | État              | Détail                                                                                                                                      |
| ---------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `content-visibility`, grille sans re-animation | fait autrement    | Animation seulement quand un filtre change ; `content-visibility` essayé puis retiré (sauts de défilement en une colonne, clics instables). |
| Marquee en pause hors écran                    | fait              | IntersectionObserver.                                                                                                                       |
| Dialogs fermées sur `transitionend`            | fait              | `Dialog › onClosed`, garde-fou 600 ms.                                                                                                      |
| Transitions de page reduced-motion safe        | fait              | View Transitions API, désactivées en reduced motion.                                                                                        |
| Continuité carte → fiche                       | fait autrement    | La fiche s'ouvre en dialog par-dessus la grille : le plat reste visible ; pas de morphing nommé (noms dupliqués).                           |
| WebGL : env map, ombre                         | non fait          | À 150 px, coût > gain ; documenté dans `webgl-strategy.md`.                                                                                 |
| TypesSection sans mutation DOM                 | fait              | Variable CSS `--tint`.                                                                                                                      |
| ErrorBoundary + repli de chunk                 | fait              | `ErrorBoundary` par route, `lazyPage` → `LazyFailed`.                                                                                       |
| MenuPage découpée                              | fait              | `MenuToolbar`, `MenuSections`, `CombosSection`.                                                                                             |
| Modèle de lignes du panier                     | fait              | `{ kind, productId }` / `{ kind, formulaId, choices }`, clés stables.                                                                       |
| Contenu hors JSX                               | fait (progressif) | `data/content.js` pour l'accueil ; `story.js`, `restaurant.js` existants.                                                                   |
| CI GitHub Actions                              | fait              | lint, unitaires, build + pré-rendu, budget, Playwright (Chromium), rapport en artefact.                                                     |
| Budget de performance                          | fait autrement    | `scripts/size-budget.mjs` (zéro dépendance ; `size-limit` mesurait mal sur ce poste Windows).                                               |
| Nettoyage de `dist`, pas de `dist` versionné   | fait              | `scripts/clean.mjs` (robuste), `dist` ignoré, `gh-pages` remplace la branche à chaque déploiement.                                          |

## Tests

Voir `docs/qa/qa-report.md` pour les résultats.

## Phase suivante (26/09/2026) — desserts signatures

| Point                                   | État           | Détail                                                                                                                                         |
| --------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Collection de profiteroles Pokémon      | fait           | 15 desserts (14 trios de choux + le croquembouche) découpés de la planche Gemini du 25/09, même lumière et même fond que la série HD.          |
| Catégorie dédiée ou sous-groupes        | fait autrement | Une seule catégorie Desserts (26 plats), lue en quatre sous-groupes : choux, gâteaux, glacés, fruits. Pas de catégorie artificielle.           |
| Données complètes (allergènes, régime…) | fait           | Régime végétarien, allergènes gluten / œufs / lait (+ fruits à coque, soja selon le dessert), toujours marqués « démonstration ».              |
| « Nos desserts signatures » (3 à 5)     | fait           | Quatre choux mis en avant sur l'accueil (`data/editorial.js`).                                                                                 |
| Produit du moment / création du chef    | fait           | Le croquembouche de Pikachu, un slug dans `data/editorial.js`.                                                                                 |
| Cross-sell « À déguster avec »          | fait           | Règles simples par catégorie et type (chou du type après un plat, thé après un bowl, boisson après un dessert), formules d'abord.              |
| Panier « Ajouter un dessert ? »         | fait           | Le libellé nomme ce qui manque ; le chou proposé est du type du plat principal ; jamais ajouté seul.                                           |
| Formules avec dessert                   | fait           | Déjeuner, Duo, Pichu existaient ; les emplacements dessert acceptent les choux (≤ 9,90 €), le croquembouche reste à partager hors formule.     |
| Composeur visuel                        | fait (déjà)    | Cartes-radio image + nom + prix + type pour chaque emplacement.                                                                                |
| Storytelling                            | fait           | Chapitre « Le laboratoire des douceurs » sur la page Histoire, trois médaillons.                                                               |
| Hero dessert                            | fait           | Section d'accueil « Une touche sucrée pour votre prochaine évolution. » : croquembouche en grand, création du chef, quatre choux, un bouton.   |
| Motion                                  | fait           | Le croquembouche se pose (y 40 → 0, scale .96 → 1) à l'entrée dans l'écran ; reveals en cascade ; rien en reduced motion.                      |
| Glyphes originaux, avis démo            | conservés      | Aucun logo officiel ; bandeau d'avis de démonstration inchangé.                                                                                |
| Head dupliqué sur les pages paresseuses | corrigé        | `<Seo>` rendu une fois à la racine de l'application ; JSON-LD écrit dans `<head>` par le pré-rendu ; préchargement du hero limité à l'accueil. |
