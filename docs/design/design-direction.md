# Direction artistique — PokéBistro

## Thèse

> **Un bistro contemporain qui sert l'univers Pokémon dans l'assiette.**
> La Poké Ball est un objet de design : rouge laqué, blanc porcelaine, ceinture noire, un bouton.
> Ces trois matières sont exactement celles d'une belle table japonaise : **laque (urushi), porcelaine, encre (sumi)**.

Le site est construit sur cette correspondance. Il ne cite pas Pokémon par des sprites ou des couleurs primaires « jouet » : il emprunte la **géométrie** de la Poké Ball (le cercle, la ceinture, le bouton) et la **matière** d'un restaurant japonais moderne. Les Pokémon apparaissent là où ils sont déjà : dans les plats (chaque assiette porte un Pokémon en sucre, en riz ou en forme) et dans les **types**, qui deviennent la façon de choisir ce qu'on mange.

## Ce que le site doit faire ressentir

1. **On a faim avant d'avoir compris le concept.** Le premier écran montre un plat, pas un logo. Le titre est une phrase (« Le bistro qui sert l'univers Pokémon dans l'assiette. »), pas une marque en 9 rem.
2. **C'est un vrai restaurant.** Prix, horaires, allergènes, formules, réservation avec créneaux, commande en quatre étapes : tout ce qu'un client attend, avec la mention honnête de ce qui est simulé.
3. **C'est joueur, pas puéril.** L'humour est dans les noms, les descriptions, les types ; jamais dans des couleurs criardes ou des mascottes.

## Le hero (v3, « food-first »)

- **Structure** : la Poké Ball ouverte. Haut laque (`#C9211B`), ceinture encre de 3 px, bas porcelaine. La **Poké Ball 3D** est le bouton de la ceinture, à petite échelle (72 → 150 px) : un sceau, plus un décor.
- **Sujet** : un plat haute définition (Marill Aqua Bowl, `data/content.js › hero.dishSlug`) qui déborde de la laque et se pose sur la ceinture. Il est peint immédiatement (`fetchpriority="high"`, préchargé, jamais en `opacity: 0`).
- **Titre** : `clamp(1.85rem, 5.6vw, 4.25rem)`, `max-width: 14ch`, trois lignes maximum à 390 px. Visible dès la première peinture : l'intro GSAP n'anime que la ceinture, le plat, la balle, le chapeau et les boutons.
- **Sous la ceinture** : le chapeau, deux boutons (carte, réservation) et la **légende du plat** (nom, type, prix) qui mène à sa fiche. Les quatre médaillons de la v2 ont disparu : ils gênaient à 768 px et diluaient le sujet.
- **Hauteurs plafonnées** : `min-height: min(50svh, 560px)` pour la laque, aucune section n'excède un écran.

## Palette

| Token               | Valeur     | Rôle                                                     |
| ------------------- | ---------- | -------------------------------------------------------- |
| `--color-lacquer`   | `#C9211B`  | Laque : hero, CTA principal, accents, prix barrés jamais |
| `--color-porcelain` | `#FCFBF8`  | Fond général                                             |
| `--color-washi`     | `#F7EEDC`  | Surfaces secondaires (cartes de plats, encarts)          |
| `--color-ink`       | `#17151A`  | Texte, ceinture, plateaux des formules, panier, footer   |
| `--color-gold`      | `#F2B826`  | Badge « Nouveau », économies, étoiles, favoris           |
| `--color-type-*`    | 11 teintes | Une par type Pokémon, portée par le glyphe, jamais seule |

Règle de contraste : `ink-mute` (`#6B6772`) sur porcelaine = 5,1:1, `porcelain/60` sur ink = 6,3:1. Une information n'est jamais portée par la couleur seule (badge = texte, type = glyphe + nom, créneau complet = barré + « (complet) »).

## Typographie

- **Unbounded** (display) pour les titres : large, géométrique, un peu « enseigne ». Toujours en `text-balance`, jamais plus de trois lignes.
- **Zen Kaku Gothic New** (texte) : un gothique japonais lisible, qui donne le ton bistro sans cliché.
- **DM Mono** (utilitaire) : prix, compteurs, chapeaux, badges, étapes. Chiffres tabulaires partout.
- Un seul chapeau (« eyebrow » mono, lacquer) par section. Le chapeau dit la catégorie, le titre dit l'idée.

## Les glyphes de types

Onze pictogrammes **originaux** (`components/ui/TypeIcon.jsx`), dessinés dans la grammaire des icônes du site (grille 24, trait 1,75, bouts ronds) : éclair, flamme, goutte, feuille, assiette, poing, spirale, fantôme de drap, étoile à quatre branches, flocon, plume. Aucun logo ni sprite officiel n'est copié. Le glyphe porte la couleur du type, le nom reste écrit à côté ; il apparaît sur les badges des cartes, les filtres, les tuiles « Choisissez votre type », la fiche, le composeur de formule et la page Histoire.

## Cartes de plats

Image (masque radial qui fond le crème de la planche dans le washi), badge de type, nom, prix, description coupée **au mot** (~90 caractères), au plus **un** badge éditorial (Nouveau > Signature > Choix du chef), bouton « Ajouter » qui devient un compteur. Le cœur reste cliquable mais hors de l'ordre de tabulation : la même action existe dans la fiche.

## La signature dessert : les profiteroles Pokémon

Le dessert est devenu la seconde signature du restaurant, après la Poké Ball ouverte du hero. Le principe est celui de la carte : on reconnaît le Pokémon avant de lire le nom, et on a envie de le manger avant de le reconnaître. Ici le matériau est unique, la **pâte à choux**, et tout ce qui fait le Pokémon est comestible (glaçage, crème, chocolat, fruits, sucre tiré, meringue, pâte d'amande). Pas de figurine, pas de moule, pas de gâteau d'anniversaire.

- **Sur l'accueil**, une section washi (le crème des photos, donc la photo se fond dans la page) : « Une touche sucrée pour votre prochaine évolution. », le **croquembouche de Pikachu** en grand (455 × 558, vertical, la seule image haute du site), la « Création du chef » en carte de texte, puis quatre profiteroles en cartes. Un seul bouton : « Tous les desserts ».
- **Sur la carte**, la section Desserts se lit comme une vitrine de pâtisserie : Choux & profiteroles (15), Gâteaux & douceurs, Desserts glacés, Fruits & bowls. Les sous-titres sont des `h3`, ancrés (`#dessert-choux`).
- **Dans la fiche**, le fil d'Ariane ajoute le sous-groupe, et « À déguster avec » propose un thé ou une boisson du type et un dessert d'une autre famille.
- **Badges** : le croquembouche est Signature (la septième, la seule sucrée) et Choix du chef ; quatre choux portent Nouveau ; les autres n'ont rien. La collection se vend par ses visuels, pas par ses étiquettes.

## Matière

Les surfaces restent mates et planes ; la seule « matière » est la laque du hero et du CTA (ombre colorée courte) et l'ombre portée du plat sur la ceinture. Pas de grain, pas de verre dépoli : la Poké Ball 3D suffit comme objet.

## Ce qu'on ne fait pas

- Pas de sprites, pas de logos, pas de police « Pokémon ».
- Pas de « Populaire », « Best-seller », « 4,9/5 Google » sans donnée réelle.
- Pas de titre en quatre lignes, pas de section plus haute qu'un écran, pas de texte sous 12 px.
