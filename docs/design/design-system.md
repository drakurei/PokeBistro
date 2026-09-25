# Design system — PokéBistro

Tous les tokens vivent dans `src/styles/globals.css` (`@theme` de Tailwind 4) et sont consommés via des classes utilitaires (`bg-lacquer`, `text-ink-mute`, `font-display`…) ou des variables CSS (`var(--color-lacquer)`).

## Couleurs

```css
--color-porcelain: #FCFBF8;   /* fond */
--color-washi: #F7EEDC;       /* surfaces cartes, fond des visuels */
--color-washi-deep: #EFE3C9;  /* survol des surfaces */
--color-lacquer: #C9211B;     /* action principale, surfaces fortes */
--color-lacquer-deep: #9E1913;
--color-ink: #17151A;
--color-ink-soft: #3C3944;
--color-ink-mute: #6B6772;
--color-line: #E6E0D3;
--color-gold: #F2B826;
--color-success: #1F7A4D;     /* feedback formulaire */
--color-danger: #B42318;
--color-type-electrik / -feu / -eau / -plante / -normal / -combat / -psy / -spectre / -fee / -glace / -vol
```

Règles :

- Texte courant : `ink` sur `porcelain` (16,5:1). Texte secondaire : `ink-soft`. Jamais de gris sur gris.
- `lacquer` = un seul usage fort par écran (CTA principal ou surface de section), jamais les deux au même endroit.
- Les couleurs de type ne servent qu'à **identifier un type** (badge, filtre, ambiance de section). Texte sur type : `ink`, sauf Feu, Eau, Psy → blanc.

## Typographie

| Token             | Valeur                                               | Usage                              |
| ----------------- | ---------------------------------------------------- | ---------------------------------- |
| `font-display`    | Unbounded Variable                                   | titres, chiffres                   |
| `font-sans`       | Zen Kaku Gothic New                                  | corps                              |
| `font-mono`       | DM Mono                                              | prix, labels                       |
| `text-display-xl` | `clamp(3.25rem, 9vw, 9rem)` / 0.92 / -0.03em / 800   | hero                               |
| `text-display-lg` | `clamp(2.25rem, 5vw, 4.5rem)` / 1 / -0.02em / 700    | titres de section                  |
| `text-display-md` | `clamp(1.75rem, 3vw, 2.75rem)` / 1.1 / -0.01em / 700 | sous-titres, nom du plat en détail |
| `text-title`      | 1.25rem / 1.3 / 700 (sans)                           | nom du plat en carte               |
| `text-body-lg`    | 1.125rem / 1.6                                       | intro                              |
| `text-body`       | 1rem / 1.6                                           | texte                              |
| `text-small`      | 0.875rem / 1.5                                       | secondaire                         |
| `text-label`      | 0.75rem / 1 / +0.12em / mono / majuscules            | eyebrows, métadonnées              |
| prix              | mono 500, `font-variant-numeric: tabular-nums`       | partout                            |

## Espacement, grille, rayons, ombres

- Échelle 4 px (Tailwind). Rythme vertical des sections : `py-section` = `clamp(4rem, 9vw, 8rem)`.
- Conteneur : `max-w-[80rem]`, gouttière `clamp(1rem, 4vw, 2.5rem)` (`.container-pb`).
- Grilles : carte 1 / 2 / 3 colonnes (375 / 640 / 1024) ; rail de filtres 280 px sticky à partir de 1024.
- Rayons : `--radius-sm: 10px` (chips, inputs), `--radius-md: 18px` (cartes), `--radius-lg: 28px` (panneaux, images), `9999px` (pilules, bouton).
- Ombres : seulement pour ce qui **flotte** — `--shadow-float: 0 24px 60px -24px rgb(23 21 26 / .28)` (carte survolée, tiroir, dialog). Pas d'ombre de repos sur les cartes.
- Ligne : `1px solid var(--color-line)`. La ceinture : `2px solid var(--color-ink)`.

## Composants

| Composant     | Variantes / états                                                                                                                | Notes                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Button`      | `solid` (laque), `outline` (encre), `ghost`, `light` (porcelaine sur laque) ; tailles `sm` / `md` / `lg` ; `loading`, `disabled` | Pilule, hauteur ≥ 44 px, focus ring 3 px `lacquer/40`, pas de translation au survol (fond + ombre uniquement). |
| `IconButton`  | mêmes variantes, 44 × 44 min                                                                                                     | `aria-label` obligatoire.                                                                                      |
| `Chip`        | `default`, `active`, avec compteur                                                                                               | Utilisé pour tags, types, catégories. `aria-pressed`.                                                          |
| `TypeBadge`   | 8 types                                                                                                                          | Point de couleur + libellé mono.                                                                               |
| `ProductCard` | repos, survol, favori, dans le panier, « ajouté »                                                                                | Image sur washi masquée en radial, nom + prix mono, badge type, cœur, CTA.                                     |
| `Stepper`     | − n +                                                                                                                            | Boutons 40 px, `aria-live` sur la quantité.                                                                    |
| `Field`       | `input`, `textarea`, `select` ; `error`, `hint`, `required`                                                                      | Label visible, erreur sous le champ, `aria-describedby`, `aria-invalid`.                                       |
| `Dialog`      | centré (détail produit)                                                                                                          | Piège de focus, Échap, clic extérieur, `inert` sur le reste, restauration du focus.                            |
| `Drawer`      | droite (panier), bas (filtres mobile)                                                                                            | Même base que Dialog, translation 100 % → 0.                                                                   |
| `Belt`        | seul, avec bouton, en marquee                                                                                                    | La signature.                                                                                                  |
| `Toast`       | succès / info                                                                                                                    | `aria-live="polite"`, 3,5 s, ne prend jamais le focus.                                                         |

## Motion (résumé, détails dans `docs/motion/motion-direction.md`)

`--ease-out: cubic-bezier(.22, 1, .36, 1)` · `--dur-fast: 150ms` · `--dur-base: 250ms` · `--dur-slow: 450ms` · `--dur-hero: 900ms`.
Reduced motion : tout passe en opacité ≤ 150 ms, Lenis et la 3D sont désactivés.
