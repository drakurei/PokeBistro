# WebGL / 3D — stratégie

## Décision

Une seule expérience 3D : **la Poké Ball du hero**, devenue un **sceau** (72 → 150 px) qui sert de bouton à la ceinture. Le plat en photo est le sujet ; la balle signe l'objet. Aucune autre 3D sur le site.

## Construction (Three.js, sans framework)

- Sphère coupée en deux matériaux via `phiStart/phiLength` : hémisphère haut `MeshPhysicalMaterial` laque (`#C9211B`, clearcoat 1, roughness .28), hémisphère bas porcelaine (`#F4F1EA`, roughness .42, clearcoat .5).
- Ceinture : `TorusGeometry` encre. Bouton : cylindre encre + anneau + disque porcelaine + point.
- Lumière : `HemisphereLight` chaud/froid + trois `DirectionalLight` (clé, contre-jour doré, remplissage bleuté).
- Rendu : `pixelRatio ≤ 1.5`, tone mapping ACES, boucle arrêtée hors écran et onglet caché, tout est disposé au démontage (géométries, matériaux, renderer, écouteurs, observers).

## Quand elle se charge

`HeroBall` décide au montage : **desktop avec pointeur fin, motion autorisée, pas de Data Saver, WebGL disponible**. Même alors, le chunk `three` (≈ 129 kB gzip) n'est demandé qu'**après le loader et quand le navigateur est libre** (`requestIdleCallback`, délai max 2 s). Le SVG flottant est affiché d'abord et reste si le chunk échoue (ErrorBoundary locale) ou si la création du contexte WebGL échoue.

## Ce qu'on a choisi de ne pas ajouter

- **Environment map / ombres** : la balle fait 150 px ; un PMREM et une ombre portée coûteraient plus (init GPU, textures) qu'ils n'apporteraient à cette taille. Le clearcoat et le contre-jour suffisent. À réévaluer si la balle redevient grande.
- **Interaction au clic** : le hero doit vendre le plat ; la balle ne réagit qu'au pointeur (parallaxe).

## Coût

| Chemin                 | JS téléchargé             | Quand                    |
| ---------------------- | ------------------------- | ------------------------ |
| Mobile, reduced motion | 0 (SVG)                   | jamais                   |
| Desktop qualifié       | ≈ 129 kB gzip (`three-*`) | après le loader, en idle |

Budget vérifié à chaque build (`npm run size`).
