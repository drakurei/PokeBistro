# Direction motion

## Principe

Le mouvement de PokéBistro est **lent, précis, physique** : une Poké Ball qui flotte, une ceinture qui se trace, des plats qui se posent. Rien ne rebondit, rien ne clignote. Une seule chose bouge à la fois dans le champ de vision.

## Tokens

| Token           | Valeur                              | Usage                               |
| --------------- | ----------------------------------- | ----------------------------------- |
| `--ease-out`    | `cubic-bezier(.22, 1, .36, 1)`      | entrées, ouvertures                 |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)`      | déplacements, marquee               |
| `--dur-fast`    | 150 ms                              | survol, focus, chips                |
| `--dur-base`    | 250 ms                              | boutons, cartes, toast              |
| `--dur-slow`    | 450 ms                              | dialog, tiroir, transitions de page |
| `--dur-hero`    | 900 ms                              | séquence du hero, loading           |
| stagger         | 40 ms (grille), 60 ms (menu mobile) | listes                              |

## Séquences

**Loading (une fois par session, max 1,4 s)** : anneau de la Poké Ball qui se trace (stroke-dashoffset, 700 ms) → bouton central qui apparaît (150 ms) → wordmark en fondu (250 ms) → le voile se lève vers le haut (450 ms, `--ease-out`). Un timeout de 2 s force la sortie. Reduced motion : simple fondu de 200 ms.

**Hero (au montage, après le loading)** : ceinture qui se trace du centre vers les bords (600 ms) → titre mot à mot (translateY 40 px → 0, 700 ms, stagger 80 ms) → sous-titre + CTA (400 ms) → plats flottants (scale .8 → 1, stagger 60 ms). La Poké Ball 3D tourne lentement (1 tour / 40 s) et suit la souris (parallaxe ± 8°, amortie).

**Scroll** : chaque section a un reveal unique (opacité 0 → 1, translateY 24 px → 0, 600 ms) déclenché à 80 % du viewport, une seule fois. Les chiffres de l'histoire comptent de 0 à N (1 s). Le marquee de la ceinture défile à vitesse constante et se met en pause au survol.

**Cartes** : survol = surface `washi-deep` + image scale 1.04 (250 ms) + apparition du CTA (opacité). Pas de translation (stabilité). « Ajouté » = le bouton passe en encre avec une coche 1,2 s ; le badge du panier scale 1 → 1.25 → 1 (300 ms).

**Dialog / tiroir** : voile (opacité 0 → .55, 250 ms) + panneau (translateX 100 % → 0 ou scale .96 → 1, 450 ms `--ease-out`). Fermeture = 60 % de la durée.

**Menu mobile** : panneau plein écran (opacité + translateY, 400 ms), liens en stagger 60 ms.

**Transitions de page** : entrée 400 ms (opacité + translateY 12 px). Le focus est placé sur le `<main>` à chaque changement de route, le scroll remis en haut (sauf pour le détail en dialog).

## Reduced motion

`prefers-reduced-motion: reduce` (via `gsap.matchMedia` et `@media` CSS) : toutes les translations deviennent des fondus ≤ 150 ms, le marquee est statique, la Poké Ball 3D n'est pas chargée, Lenis n'est pas monté, le loading est un fondu.

## Implémentation

- `@gsap/react` `useGSAP` avec `scope` par composant ; cleanup automatique.
- ScrollTrigger enregistré une fois dans `lib/motion.js`, `ScrollTrigger.refresh()` après changement de route.
- Lenis (`lenis/react`) monté dans `lib/SmoothScroll.jsx`, synchronisé avec `gsap.ticker`, désactivé en reduced-motion ; le défilement tactile reste natif.
- Micro-interactions (survol, focus, chips) en CSS pur (`transition`), jamais en JS.
