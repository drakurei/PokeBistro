# Direction motion

## Principe

Le mouvement de PokéBistro est **lent, précis, physique** : une Poké Ball qui flotte, une ceinture qui se trace, un plat qui se pose. Rien ne rebondit, rien ne clignote. Une seule chose bouge à la fois dans le champ de vision, et **rien de ce qui compte ne commence invisible**.

## Tokens

| Token             | Valeur                           | Usage                                |
| ----------------- | -------------------------------- | ------------------------------------ |
| `--ease-out`      | `cubic-bezier(.22, 1, .36, 1)`   | entrées, ouvertures                  |
| `--ease-in-out`   | `cubic-bezier(.65, 0, .35, 1)`   | déplacements, marquee                |
| `--ease-spring`   | `cubic-bezier(.34, 1.3, .64, 1)` | badge du panier                      |
| `--duration-fast` | 150 ms                           | hover, focus, chips                  |
| `--duration-base` | 250 ms                           | boutons, cartes                      |
| `--duration-slow` | 450 ms                           | dialogs, tiroir, transitions de page |
| `--duration-hero` | 900 ms                           | intro du hero, loader                |

## Séquences

### Loader (une fois par session)

Contour de la Poké Ball qui se trace (0,4 s), ceinture (0,2 s), bouton (0,15 s), mot (0,2 s), levée du voile (0,4 s) : **~0,9 s** au total, garde-fou à 1,8 s. Le voile est dans le HTML pré-rendu ; un script inline le masque avant la première peinture quand la session l'a déjà vu, et `prefers-reduced-motion` le supprime en CSS. Le titre du hero est peint dessous dès le départ (LCP).

### Hero

Timeline GSAP démarrée à la fin du loader : ceinture (scaleX), plat (y 28 → 0, scale .94 → 1), Poké Ball (scale .5 → 1, `back.out`), chapeau, boutons, légende. Le `<h1>` n'est **pas** animé.

### Carte

- Les cartes montent de 18 px en cascade (40 ms) quand la grille apparaît ou quand un **filtre** change (`animationKey`), jamais en tapant dans la recherche ni en triant.
- `content-visibility: auto` sur les sections a été essayé puis retiré : en une colonne, la hauteur réelle (jusqu'à 6 000 px) est trop loin de l'estimation et le défilement sautait.

### Dialogs et tiroir

Natifs, animés en CSS (`@starting-style` + `allow-discrete`) : fiche en fondu + scale .96, tiroir du panier en translation depuis la droite, feuille de filtres depuis le bas. La fermeture attend `transitionend` (garde-fou 600 ms) avant de reculer dans l'historique.

### Transitions de page

`::view-transition-old/new(root)` en 220 ms quand le navigateur sait faire ; désactivées en reduced motion. Les cartes ouvrent une dialog par-dessus la carte : la continuité, c'est le même plat qui reste visible, pas un morphing.

### Marquee, Poké Ball, compteurs

- Marquee 48 s linéaire, **en pause hors écran** (IntersectionObserver) et au survol.
- Poké Ball 3D : rotation lente (un tour / 40 s), flottement, parallaxe pointeur ; SVG flottant partout ailleurs. Chargée après le loader, quand le navigateur est libre.
- Compteurs de la section Histoire : de 0 à la valeur en 1,2 s, une seule fois, à l'entrée dans l'écran.

## Reduced motion

`prefers-reduced-motion: reduce` : pas de loader, pas d'intro (les `matchMedia` GSAP n'installent rien), pas de smooth scroll, animations CSS à 0,01 ms, transitions de dialog à 150 ms sans translation, transitions de page désactivées, marquee figé. Tout est testé en reduced motion par défaut ; une suite dédiée vérifie le plein mouvement.
