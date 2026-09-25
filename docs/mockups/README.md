# Maquettes

Maquettes vectorielles (SVG, s'ouvrent dans un navigateur ou VS Code) dessinées avec les tokens du design system avant le développement des écrans. Elles fixent la composition, le rythme et les états ; les textes sont indicatifs. Les polices sont celles du site (Unbounded, Zen Kaku Gothic New, DM Mono) si elles sont installées, sinon un substitut système.

| Fichier                 | Écran               | Ce qu'elle fixe                                                                                                                                                                                                         |
| ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01-loading.svg`        | Écran de chargement | L'anneau qui se trace, la ceinture, le bouton, le wordmark, la séquence et le timeout.                                                                                                                                  |
| `02-home-desktop.svg`   | Accueil (1440)      | Header transparent, hero « Poké Ball ouverte » (laque / ceinture / porcelaine, Poké Ball 3D, médaillons), marquee, section types, plateau des six plats signatures, teaser histoire avec chiffres, bandeau réservation. |
| `03-menu-desktop.svg`   | La carte (1440)     | Titre, barre de recherche + compteur collés, rail de filtres (catégorie, type, envie, prix), grille 3 colonnes, carte avec CTA encre et état « au panier » (stepper).                                                   |
| `04-product-detail.svg` | Fiche plat          | Dialog centré : visuel sur washi teinté avec la ligne d'horizon, catégorie · type, nom, prix mono, description, ingrédients en pilules, encart type, stepper + ajouter + favori.                                        |
| `05-cart-drawer.svg`    | Panier              | Tiroir droit : titre + compteur, ceinture, lignes (visuel, nom, prix unitaire, stepper, supprimer), total, mention retrait, Vider / Commander.                                                                          |
| `06-story.svg`          | Notre histoire      | Titre display-xl, chapitre 2019, chapitre cuisine sur plateau encre avec principes, grille des huit types.                                                                                                              |
| `07-contact.svg`        | Contact             | Cartes d'informations, carte stylisée hors ligne, formulaire avec états.                                                                                                                                                |
| `08-reservation.svg`    | Réservation         | Formulaire (date, horaire, convives, nom, email), trois étapes, horaires.                                                                                                                                               |
| `09-mobile.svg`         | Mobile (390)        | Accueil (Poké Ball SVG), carte avec bouton « Filtres », feuille de filtres, panier.                                                                                                                                     |

Les annotations en rouge (mono) sur chaque maquette précisent les comportements (animation, états, garde-fous).

Générées par un script Python à partir des tokens (`docs/design/design-system.md`) ; pour les modifier, éditer le SVG directement ou regénérer.
