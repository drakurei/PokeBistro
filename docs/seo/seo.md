# SEO

## Principe

Le site est une SPA React, mais **chaque adresse existe en HTML statique** : `scripts/prerender.mjs` rend les 59 routes (accueil, carte, 44 plats, 8 formules, histoire, contact, réservation, commande, favoris) avec React (`prerenderToNodeStream`) après `vite build`, et écrit `dist/<route>/index.html`. Le navigateur reçoit une page complète (titre, description, balises sociales, JSON-LD, contenu) puis React s'y attache (`hydrateRoot`). Sans JavaScript, la page reste lisible.

## Une seule source : `src/seo/pageMeta.js`

| Élément                | Détail                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`, description | Par route (statique, plat, formule). Titre = `Page — PokéBistro`.                                                                                           |
| Canonical              | `https://drakurei.github.io/PokeBistro/<route>/` : les sous-pages finissent par `/`, c'est l'adresse que GitHub Pages sert (redirection 301 sans le slash). |
| Open Graph / Twitter   | `og:type` (`product` pour un plat), `og:image` (le plat lui-même, sinon `og-image.png`), `twitter:card=summary_large_image`.                                |
| `robots`               | `noindex` sur `/commande`, `/favoris` et la 404 (contenu local ou vide).                                                                                    |
| JSON-LD `Restaurant`   | Accueil : nom, adresse, téléphone, horaires structurés (`openingHoursSpecification` dérivées de `restaurant.schedule`), `hasMenu`.                          |
| JSON-LD `Menu`         | Carte : `MenuSection` par catégorie + une section Formules, `MenuItem` pour chaque plat (nom, description, image, `Offer`, régimes) et chaque formule.      |
| JSON-LD `MenuItem`     | Fiches plat et formule, avec `BreadcrumbList`.                                                                                                              |
| `sitemap.xml`          | Généré au build (57 URL avec `lastmod` = date du build, `changefreq`, `priority`) ; `robots.txt` le référence.                                              |

`<Seo>` rend ces balises dans React (hissées dans `<head>` par React 19) et le script de pré-rendu écrit exactement les mêmes : à l'hydratation, React adopte les balises existantes, aucune n'est dupliquée (vérifié par `e2e/seo.spec.js`).

## Structure

Un `<h1>` par page (y compris les fiches en accès direct), `<header>` / `<nav aria-label>` / `<main>` / `<footer>`, sections avec `aria-labelledby`, sommaire de la carte avec ancres, texte alternatif vide sur les visuels décoratifs et nom du plat sur l'image de la fiche.

## Hébergement

- **GitHub Pages** (`npm run deploy`) : `base=/PokeBistro/`, `404.html` = coquille de l'application pour les adresses inconnues, `.nojekyll`. Pages **ne permet aucun en-tête HTTP** : pas de CSP, pas de HSTS, pas de cache-control personnalisé. C'est une limite de l'hébergeur, documentée ici plutôt que contournée.
- **Vercel / Netlify** (`vercel.json`, `netlify.toml`) : réécriture SPA, cache immuable des assets et en-têtes de sécurité (CSP stricte avec le hash du script inline du loader, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, COOP). `npm run csp-hash` recalcule le hash si le script inline change.

## Performance perçue par les moteurs

HTML pré-rendu, image du hero préchargée avec `fetchpriority="high"`, AVIF/WebP avec `srcset`, polices auto-hébergées (sous-ensembles latin), chunks `three` et `motion` séparés, budget de taille vérifié à chaque build (`npm run size`).
