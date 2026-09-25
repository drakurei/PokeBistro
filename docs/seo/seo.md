# SEO

## Mise en place

| Élément                                           | Où                          | Détail                                                                                                                                                                 |
| ------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>` et `<meta name="description">` par page | `components/layout/Seo.jsx` | React 19 hisse les balises rendues dans `<head>`. Titre = `Page — PokéBistro`, description propre à chaque page, y compris chaque plat.                                |
| Canonical                                         | `Seo.jsx`                   | `https://drakurei.github.io/PokeBistro` + chemin.                                                                                                                      |
| Open Graph / Twitter                              | `Seo.jsx`                   | `og:title`, `og:description`, `og:url`, `og:image` (1200 × 630), `og:type` (`product` pour un plat), `twitter:card=summary_large_image`.                               |
| Données structurées `Restaurant`                  | `index.html`                | Nom, adresse, téléphone, horaires (`openingHoursSpecification`), `servesCuisine`, `acceptsReservations`, `hasMenu`.                                                    |
| Données structurées `MenuItem`                    | `routes/ProductPage.jsx`    | Nom, description, image, prix (`Offer`), régime végétarien le cas échéant.                                                                                             |
| Structure sémantique                              | partout                     | Un `<h1>` par page, `<header>` / `<nav aria-label>` / `<main>` / `<footer>`, sections avec `aria-labelledby`, listes pour les grilles.                                 |
| URLs propres                                      | React Router                | `/menu`, `/menu/pikachu-bento`, `/histoire`, `/contact`, `/reservation`. Les filtres sont des paramètres (`?type=feu`) : jamais de doublon d'URL pour un même contenu. |
| `robots.txt` + `sitemap.xml`                      | `public/`                   | Le sitemap liste les 6 pages et les 28 plats.                                                                                                                          |
| Favicon, `theme-color`, manifest                  | `index.html`, `public/`     | SVG + PNG 180.                                                                                                                                                         |
| Langue                                            | `<html lang="fr">`          | Copy entièrement en français, typographie française (espaces insécables avant `?` `:`).                                                                                |
| Images                                            | `<img alt>`                 | Images décoratives en `alt=""` (le nom du plat est dans le texte), image de la fiche avec le nom du plat.                                                              |

## Limites connues (SPA)

Le site est une application monopage rendue côté client : les robots modernes exécutent le JavaScript, mais un rendu serveur (Vite SSR, ou un pré-rendu statique des 34 URLs au build) améliorerait encore l'indexation. La structure (`Seo` par route, données dans `data/`) le permet sans refonte : c'est l'amélioration future n° 1 côté SEO.

## Vérifications faites

- Titres et descriptions uniques par page (contrôlés dans les tests Playwright pour l'accueil, la carte et une fiche).
- Une seule balise `<h1>` par page.
- Aucun texte porteur d'information dans une image.
- `og:image` servie en PNG, dimensions 1200 × 630.
