# WebGL / 3D — stratégie

## Décision

Une seule expérience 3D : **la Poké Ball du hero**. Elle est le « bouton » de la ceinture qui traverse le hero, donc un élément de composition, pas une démonstration. Aucune autre 3D sur le site (les plats attendent les visuels Gemini haute définition ; un plat 3D n'apporterait rien de plus qu'une belle image).

## Construction (Three.js, sans framework)

- Sphère (`SphereGeometry` 64 × 64) coupée en deux matériaux via `phiStart/phiLength` : hémisphère haut `MeshPhysicalMaterial` laque (`#C9211B`, clearcoat 1, roughness .25), hémisphère bas porcelaine (`#F4F1EA`, roughness .4).
- Ceinture : `TorusGeometry` encre, légèrement plus large que la sphère.
- Bouton : cylindre encre + disque porcelaine + anneau encre fin.
- Lumière : `HemisphereLight` chaud/froid + `DirectionalLight` clé + `DirectionalLight` contre-jour. Pas d'environment map (poids) : le clearcoat suffit.
- Animation : rotation Y lente (1 tour / 40 s), flottement vertical sin (± 6 px, 4 s), parallaxe souris amortie (`lerp` 0.06) sur X/Y ± 8°.
- Rendu : `WebGLRenderer` `antialias`, `alpha`, `pixelRatio` plafonné à 1.5, `setAnimationLoop` mis en pause quand le hero sort du viewport (`IntersectionObserver`) ou que l'onglet est caché.

## Garde-fous

| Condition                                                          | Comportement                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `prefers-reduced-motion: reduce`                                   | Chunk non chargé, fallback SVG statique.                                                                |
| Largeur < 1024 px ou pointeur grossier                             | Fallback SVG (animation CSS légère : rotation 60 s).                                                    |
| `navigator.connection.saveData`                                    | Fallback SVG.                                                                                           |
| WebGL indisponible (`canvas.getContext('webgl2' ou 'webgl')` null) | Fallback SVG.                                                                                           |
| Erreur au chargement du chunk                                      | `ErrorBoundary` → fallback SVG.                                                                         |
| Redimensionnement                                                  | `ResizeObserver` sur le conteneur → `renderer.setSize`, caméra mise à jour.                             |
| Démontage                                                          | `renderer.dispose()`, géométries et matériaux `dispose()`, listeners retirés, `setAnimationLoop(null)`. |

## Poids

`three` est isolé dans un chunk `three` (`manualChunks`) chargé après le loading via `React.lazy` : ~ 150 Ko gzip, uniquement sur desktop. Le bundle initial ne le contient pas.
