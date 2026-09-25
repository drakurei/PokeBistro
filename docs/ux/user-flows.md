# Parcours utilisateurs

## Personas rapides

- **La dresseuse pressée** (mobile, pause déjeuner) : veut voir vite les bentos, ajouter 2 plats, commander à emporter.
- **Le groupe du samedi** (desktop) : découvre le concept, regarde la carte par types, réserve une table en terrasse.
- **Le fan** : cherche « Mewtwo », lit les ingrédients et les allergènes, met en favori, partage le lien du plat.

## Flux 1 — Découvrir et commander (cœur du site)

1. Chargement : veil de marque ≤ 0,9 s (une fois par session, jamais avec reduced motion), page déjà rendue dessous (HTML pré-rendu).
2. Hero : un plat, une phrase, deux boutons. « Voir la carte ».
3. Carte : sommaire des sections, catégories dans l'ordre d'un repas (Entrées → Bentos → Burgers → Bowls → Grandes assiettes → Desserts → Boissons), formules en dernier. Recherche, filtres (catégorie, type, envie, régime, prix) et tri vivent dans l'URL.
4. Fiche (dialog au-dessus de la carte, page complète en accès direct) : ingrédients, régime et allergènes (démo), niveau d'épice, « Existe aussi en formule », « Souvent commandés ensemble », quantité, ajout.
5. Panier (tiroir) : lignes plats et formules, compteur, annuler une suppression, **suggestion de formule** quand les trois plats d'une formule fixe sont là (jamais appliquée seule), « Et avec ça ? » (boisson, dessert manquants), total avec économie.
6. Commande (`/commande`, simulation annoncée) : mode (sur place / à emporter) → créneau (jour ouvert, heure ≥ maintenant + 30 min) → coordonnées (nom, téléphone, email, précision cuisine) → récapitulatif → confirmation avec numéro. Retour possible à chaque étape, focus déplacé sur le titre de l'étape, panier modifiable jusqu'à la confirmation.
7. Sur mobile, une barre basse « n articles · total » suit le défilement de la carte dès que le panier n'est pas vide.

## Flux 1 bis — Le dessert comme destination

1. Accueil : après les six signatures, la section desserts (croquembouche en grand, « Création du chef », quatre choux). Elle a une seule fonction : donner envie du dessert avant même le plat.
2. Carte : la section Desserts est sous-groupée (choux, gâteaux, glacés, fruits) ; le chip « Desserts » et le lien « Tous les desserts » y mènent, `#dessert-choux` cible la collection.
3. Fiche d'un chou : ingrédients, allergènes (démo), sous-groupe, « À déguster avec » (thé du type + dessert d'une autre famille), formules qui l'incluent.
4. Panier : sans dessert, « Ajouter un dessert ? » propose le chou du type du plat principal ; sans boisson, « Et une boisson ? » ; les deux, « Complétez votre commande ». Jamais ajouté sans un geste.
5. Formules : les emplacements dessert proposent les choux (≤ 9,90 €) ; le croquembouche, à partager, reste hors formule.
6. Histoire : chapitre « Le laboratoire des douceurs », trois médaillons de choux, lien vers les desserts.

## Flux 2 — Réserver

1. Depuis le hero, le header, la mobile nav, le CTA laque de l'accueil.
2. Formulaire : date (≤ 3 mois, jours de fermeture refusés), horaire (créneaux **complets** visibles mais désactivés, simulation déterministe), convives (≤ 8), **intérieur / terrasse**, nom, téléphone, email, demande spéciale.
3. Récapitulatif à vérifier, politique d'annulation (fictive), « Confirmer la demande ».
4. Succès : rappel de tout, **fichier .ics** à ajouter à l'agenda, nouvelle réservation. Un email « erreur@… » montre l'état d'échec.

## Flux 3 — Les favoris

Le cœur sur une carte ou dans la fiche garde le plat dans ce navigateur (aucun compte). Le header affiche le compteur, la page `/favoris` liste les plats avec les mêmes cartes, et propose la carte quand elle est vide.

## Flux 4 — Composer une formule

Les formules à choix (Déjeuner, Dresseur, Duo) s'ouvrent dans un **composeur visuel** : un groupe de cartes-radio par emplacement (image, nom, prix, type), le plateau se met à jour, le prix reste fixe. La Formule Déjeuner affiche ses conditions (lundi – vendredi, midi).

## Micro-décisions

- Le bouton « Ajouter » devient un compteur sur la carte : on voit d'un coup d'œil ce qu'on a pris.
- Toute action produit un retour : toast (n'attrape jamais le focus), badge du panier qui pulse, compteur ARIA.
- Les états vides disent quoi faire (carte vide, favoris vides, aucun résultat → « Tout effacer »).
- Les erreurs disent la cause et la sortie (champ + message, alerte avec téléphone du restaurant).
- Les contenus « démo » sont marqués comme tels : avis, allergènes, commande, réservation.

## Accessibilité

- Un `<h1>` par page (y compris les fiches de plat et de formule en accès direct), landmarks, skip link.
- Focus visible partout, ordre de tabulation réduit sur la carte (sommaire, cœurs hors tabulation, image non focusable), `scroll-margin-top` sous la barre collante.
- Dialogs natifs (`<dialog>`) : Escape, piège de focus, retour du focus.
- Étoiles annoncées comme une image (« Note : 4 sur 5 »), créneaux complets annoncés, étapes de commande avec `aria-current="step"`.
- Reduced motion : pas de loader, pas d'intro, pas de smooth scroll, transitions de 150 ms, marquee figé.
- Audit axe (WCAG 2.1 A/AA) automatisé sur neuf écrans dans les tests de bout en bout.
