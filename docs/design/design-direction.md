# Direction artistique — PokéBistro

## Thèse

> **Un bistro contemporain qui sert l'univers Pokémon dans l'assiette.**
> La Poké Ball est un objet de design : rouge laqué, blanc porcelaine, ceinture noire, un bouton.
> Ces trois matières sont exactement celles d'une belle table japonaise : **laque (urushi), porcelaine, encre (sumi)**.

Le site est construit sur cette correspondance. Il ne cite pas Pokémon par des sprites ou des couleurs primaires « jouet » : il emprunte la **géométrie** de la Poké Ball (le cercle, la ceinture, le bouton) et la **matière** d'un restaurant japonais moderne. Les Pokémon apparaissent là où ils sont déjà : dans les plats (chaque assiette porte un Pokémon en sucre, en riz ou en forme) et dans les **types**, qui deviennent la façon de choisir ce qu'on mange.

## Ce que le site doit faire ressentir

| Ressenti                              | Comment                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| « C'est un vrai restaurant »          | La nourriture d'abord : plats grands, détourés, prix, ingrédients, réservation.                                      |
| « C'est premium »                     | Beaucoup d'air, typographie large et peu de familles, une seule couleur forte, mouvement lent et précis.             |
| « C'est Pokémon, sans être enfantin » | La Poké Ball comme objet 3D et comme motif géométrique ; les types comme palette fonctionnelle ; les noms des plats. |
| « C'est japonais contemporain »       | Matières (laque, porcelaine, encre), grille bento, étiquettes mono type « fiche », rythme calme.                     |

## Palette : laque, porcelaine, encre, or

| Nom            | Hex       | Rôle                                                                                                                                      |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Porcelaine     | `#FCFBF8` | Fond de page. Blanc chaud, pas crème « papier ».                                                                                          |
| Washi          | `#F7EEDC` | Surface des cartes et fond des visuels (c'est la couleur de fond des images produits, pour qu'elles semblent détourées).                  |
| Laque          | `#C9211B` | La couleur forte. Utilisée en **surfaces** (moitié haute du hero, bandeau réservation) plus qu'en accent. Blanc dessus : contraste 5,2:1. |
| Laque profonde | `#9E1913` | Survol / actif.                                                                                                                           |
| Encre          | `#17151A` | Texte, ceinture, sections sombres (« plateau »).                                                                                          |
| Encre douce    | `#3C3944` | Texte secondaire.                                                                                                                         |
| Encre muette   | `#6B6772` | Texte tertiaire (contraste 5,5:1 sur porcelaine).                                                                                         |
| Ligne          | `#E6E0D3` | Bordures, séparateurs discrets.                                                                                                           |
| Or             | `#F2B826` | Accent rare : badge « signature », favoris, Pikachu. Encre dessus.                                                                        |

Couleurs de **types** (palette fonctionnelle, jamais décorative) : Électrik `#F2B826`, Feu `#E8542B`, Eau `#2F7BE0`, Plante `#4FB34F`, Normal `#9E9683`, Combat `#B85C38`, Psy `#E9508A`, Spectre `#6D5B9C`, Fée `#F2A1B8`, Glace `#7FD3E0`, Vol `#A3A8E8`. Chaque type a une version « teinte » (14 % sur porcelaine) pour les fonds.

Ce qu'on évite : le trio bleu/jaune/rouge primaire du TP, les blobs flous, les dégradés « tech », et le trio crème + serif + terracotta des sites générés automatiquement.

## Typographie

| Rôle       | Famille                                   | Usage                                                                                                                 |
| ---------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Display    | **Unbounded** (variable 500–800)          | Titres larges, chiffres, marque. Large, géométrique, un peu « arcade ». Réservé aux moments forts (max 5–6 par page). |
| Texte      | **Zen Kaku Gothic New** (400 / 500 / 700) | Corps, navigation, cartes. Calme, dessin japonais contemporain, très lisible.                                         |
| Utilitaire | **DM Mono** (400 / 500)                   | Prix, étiquettes, eyebrows, métadonnées (« TYPE · FEU », « 12,90 € »). Donne le côté fiche / Pokédex.                 |

Auto-hébergées (Fontsource, sous-ensemble latin), `font-display: swap`. Aucune requête vers Google Fonts.

## Signature : la ceinture

L'élément que le visiteur retient : **la ceinture de la Poké Ball**, une ligne d'encre de 2 px avec un bouton (anneau blanc, cercle d'encre) au centre. Elle traverse le hero au niveau de la Poké Ball 3D, ferme le header quand il devient opaque, sépare les grandes sections et ouvre le pied de page. Tout le reste reste calme.

Deuxième motif, discret : la **grille bento** — les cartes de la carte sont posées sur un « plateau » d'encre, comme des compartiments.

## Composition du hero

```
+--------------------------------------------------------------+
| [logo]  Accueil  La carte  Histoire  Contact  [Réserver] [P] |  header transparent
|                                                              |
|  BISTRO · ÉVRY · DEPUIS 2019 (mono)                          |  surface LAQUE
|  POKÉ                                     .--------.         |  (moitié haute)
|  BISTRO  (Unbounded, très large, blanc)   |  ball  |  3D     |
| ==========================================|   3D   |=========|  <- ceinture au milieu
|  Des bentos, des burgers et des bowls     '--------'         |  surface PORCELAINE
|  qui portent le nom d'un Pokémon.         o  o  o  plats     |  (moitié basse)
|  [Voir la carte]  [Réserver une table]                       |
+--------------------------------------------------------------+
```

Le hero **est** une Poké Ball ouverte : moitié haute laque, moitié basse porcelaine, ceinture au centre, bouton = Poké Ball 3D.

## Risque assumé

Utiliser la laque comme **surface pleine** (une moitié de viewport rouge) plutôt que comme accent. C'est ce qui rend le site reconnaissable en une seconde, et c'est la seule zone où la couleur forte s'exprime : ailleurs, elle ne sert qu'aux actions principales.
