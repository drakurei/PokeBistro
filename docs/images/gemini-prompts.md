# Prompts Gemini — visuels PokéBistro

## État des visuels

| Série                                         | Plats   | Statut                                                                                                                      |
| --------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Première série (28 plats, ci-dessous)         | 1 → 28  | visuels **basse définition** en place (198 × 168) : à régénérer avec ces prompts, en 1:1 ou en planche 4 × 4 de 2048 × 2048 |
| Deuxième série (16 plats, en fin de document) | 29 → 44 | **terminée** : planche Gemini du 25/09/2026 découpée en 512 × 410, aucune action                                            |

Tous les prompts partagent le même **bloc de style** (à coller en tête de chaque génération) puis un **bloc produit**. Générer en 1:1, la plus haute définition proposée, puis recadrer en 1200 × 1200 si nécessaire.

## Bloc de style (commun à toutes les images)

```
Professional food photography for a contemporary Japanese-inspired bistro, single dish centered on a
seamless plain warm cream background (#F8EFDE), 3/4 high angle (about 35 degrees), soft diffused key
light from the top left, gentle warm bounce on the right, one soft natural shadow under the plate,
no hard specular highlights, shallow depth of field with the whole dish in focus, realistic textures,
appetizing, editorial restaurant menu style. Square 1:1 composition, dish fills about 72% of the
width with clean margins, no cutlery, no hands, no text, no logo, no watermark, no props other than
the plate or box described. Consistent series look.
```

Contraintes de série : même crème, même angle, même lumière, même échelle. Le Pokémon est **dans** la nourriture (riz moulé, décor en sucre, forme du pain, motif de l'assiette), jamais posé à côté comme une figurine ou un jouet.

## Bloc produit — première série (à régénérer)

### Bentos

**1. Pikachu Bento** (`pikachu-bento`)

```
Subject: a rectangular yellow lacquered bento box with compartments. Main compartment: yellow turmeric
rice shaped as Pikachu's face with two red cheek circles (made of red rice), black rice eyes and mouth.
Other compartments: rolled tamagoyaki omelette slices, grilled corn kernels, carrot sticks, small
grilled sausages, a strip of nori. Colours: warm yellow, orange, green accents. Camera: 3/4 high angle.
Mood: bright, energetic, "Électrik" type.
```

**2. Goupix Fire Box** (`goupix-fire-box`)

```
Subject: a rectangular orange-red bento box. Compartments: spicy orange chili rice, caramelised grilled
chicken pieces with charred edges, roasted broccoli florets, roasted red pepper strips, a small dish of
dark red "flame" sauce, sesame seeds. Six small flame-shaped crispy rice crackers on top of the rice
evoking Vulpix tails. Colours: orange, red, deep brown. Mood: hot, smoky, "Feu" type.
```

**3. Psykokwak Bento** (`psykokwak-bento`)

```
Subject: a rectangular pale green bento box. Main compartment: white rice moulded into a rounded
Psyduck head shape with a flat yellow-orange bill made of thin egg sheet and two nori eyes. Other
compartments: crispy chicken nuggets, a soft-boiled egg cut in half, steamed broccoli, corn. Colours:
white, yellow, green. Mood: fresh, playful but clean, "Eau" type.
```

**4. Herbizarre Bento** (`herbizarre-bento`)

```
Subject: a rectangular deep green bento box. Compartments: herb-flecked green rice topped with a
small rice ball shaped like Ivysaur's leafy bulb (green rice with spinach leaves), crunchy broccoli,
sliced ripe avocado fanned out, edamame, mixed green vegetables, black sesame. Colours: greens only,
cream rice. Mood: vegetal, fresh, "Plante" type. 100% vegetarian.
```

**5. Salamèche Bento** (`salameche-bento`)

```
Subject: a rectangular orange bento box. Compartments: sliced grilled beef with a glossy dark glaze,
fragrant white rice with a small flame-shaped decoration of thinly sliced red chili on top (evoking
Charmander's tail), grilled red and yellow pepper strips, green beans, a small cup of red "flame"
sauce. Colours: orange, red, brown, white. Mood: grilled, generous, "Feu" type.
```

**6. Salamèche Bento Maxi** (`salameche-bento-maxi`)

```
Subject: a larger rectangular orange bento box, visibly fuller than a standard bento. Compartments:
a double portion of spicy orange rice, grilled chicken thighs sliced, wok-fried mixed vegetables
(peppers, onion, bok choy), red chili slices, flame-shaped crispy rice cracker. Colours: orange, red,
green. Mood: XL, hearty, "Feu" type.
```

**7. Herbizarre Veggie Bento** (`herbizarre-veggie-bento`)

```
Subject: a rectangular pale green bento box. Compartments: plain white rice, cucumber ribbons,
sliced avocado, broccoli, cubes of marinated golden tofu, toasted pumpkin seeds, a small green leaf
decoration shaped like Ivysaur's bulb leaves on the rice. Colours: green, white, gold. Mood: fresh,
light, "Plante" type. 100% vegetarian.
```

### Burgers

**8. Tauros Steakhouse Burger** (`tauros-steakhouse-burger`)

```
Subject: a tall classic burger on a small round dark wooden board. Toasted brioche bun with sesame,
thick beef patty, melted cheddar dripping, caramelised grilled onions, steakhouse sauce, a few
lettuce leaves; a small portion of golden hand-cut fries beside it on the board. Two small curved
"horns" made of crispy onion on top of the bun evoking Tauros. Colours: golden brown, deep red-brown.
Camera: front 3/4, slightly lower than the bento shots but same lighting. Mood: hearty, "Normal" type.
```

**9. Félinferno Burger** (`felinferno-burger`)

```
Subject: a burger with a jet-black charcoal bun on a small round slate board. Double beef patties,
crispy bacon, melted cheddar, smoky red-orange chili sauce dripping, lettuce. Two small pointed bun
"ears" or a flame-orange sauce streak evoking Incineroar. Colours: black, orange, red. Camera: front
3/4. Mood: dark, fiery, "Feu" type.
```

**10. Florizarre Veggie Burger** (`florizarre-veggie-burger`)

```
Subject: a burger with a green spinach bun on a small round light wooden board. Vegetable patty,
sliced avocado, tomato, lettuce, a herb sauce, and one edible pink-red flower (like a pansy) placed on
top of the bun evoking Venusaur's flower. Colours: green, pink, cream. Camera: front 3/4. Mood:
colourful, vegetal, "Plante" type. 100% vegetarian.
```

### Bowls

**11. Bulbizarre Garden Bowl** (`bulbizarre-garden-bowl`)

```
Subject: a round pale green ceramic bowl. White rice base, fanned avocado, cucumber slices, grated
carrot, green peas, and in the centre a round rice onigiri shaped like Bulbasaur's head (green-tinted
rice, nori eyes) with a small green leaf bulb. Sesame dressing drizzle. Colours: greens, white,
orange. Mood: healthy, "Plante" type. Vegetarian.
```

**12. Carapuce Blue Bowl** (`carapuce-blue-bowl`)

```
Subject: a round deep blue ceramic bowl with a subtle wave pattern on the rim. Grilled salmon fillet
pieces, sliced avocado, edamame, cucumber, vinegared sushi rice, wakame seaweed, a light ponzu
glaze. A small wave-shaped decoration of blue-tinted rice evoking Squirtle. Colours: blue, orange
salmon, green. Mood: fresh, sea, "Eau" type.
```

**13. Mew Berry Bowl** (`mew-berry-bowl`)

```
Subject: a round pale pink ceramic bowl. Smooth strawberry yogurt base, fresh strawberries,
raspberries, blueberries, and a small pink Mew figure made of sugar paste sitting on top. Colours:
pink, red, purple. Mood: sweet, dreamy, "Psy" type. Vegetarian.
```

**14. Fresh Ice Blue Bowl** (`fresh-ice-blue-bowl`)

```
Subject: a round pale ice-blue ceramic bowl, slightly frosted look. Cold rice base, raw salmon
cubes, cooked shrimp, sliced avocado, edamame, nori seaweed strips, sesame, a few ice-crystal-shaped
daikon slices. Colours: ice blue, orange, green. Mood: cold, clean, "Glace" type.
```

**15. Mew Berry Bowl Chantilly** (`mew-berry-bowl-chantilly`)

```
Subject: a round pale pink ceramic bowl. Strawberry yogurt base, mixed red berries, blueberries, a
generous swirl of light whipped cream, crushed meringue, a tiny pink Mew sugar figure. Colours: pink,
white, purple. Mood: indulgent, "Psy" type. Vegetarian.
```

**16. Gardevoir Berry Plate** (`gardevoir-berry-plate`)

```
Subject: an elegant white porcelain plate with a thin gold rim. Artful arrangement of red berries,
light cream quenelles, meringue shards, raspberry coulis dots, and a slender white-and-green sugar
figure of Gardevoir standing at the side. Colours: white, red, green. Mood: refined, restaurant
dessert plating, "Psy" type. Vegetarian.
```

### Desserts

**17. Rondoudou Dessert** (`rondoudou-dessert`)

```
Subject: a small round white plate with a perfectly round pink strawberry mousse dome, a swirl of
whipped cream on top with one fresh strawberry, small pink and white marshmallows around, two tiny
pointed "ears" of pink chocolate, evoking Jigglypuff. Colours: pink, white, red. Mood: cute but
premium pastry, "Normal" type.
```

**18. Évoli Sweet Box** (`evoli-sweet-box`)

```
Subject: an open kraft cardboard takeaway box containing golden Belgian waffles drizzled with dark
chocolate, mixed red berries, a scoop of vanilla ice cream, and a small brown-and-cream Eevee tail
shaped cookie. Colours: golden brown, dark chocolate, red. Mood: gourmet takeaway, "Normal" type.
```

**19. Togepi Egg Pudding** (`togepi-egg-pudding`)

```
Subject: a small white plate holding a creamy vanilla flan inside a cracked white-chocolate eggshell
decorated with red and blue triangles like Togepi's shell, a little caramel, a few red berries.
Colours: cream, white, red, blue accents. Mood: delicate, "Fée" type.
```

**20. Lokhlass Ice Cream** (`lokhlass-ice-cream`)

```
Subject: a round pale blue plate. Scoops of vanilla and blueberry ice cream arranged like an ice
floe, sugar seashells, a blue-grey meringue shaped like Lapras's rounded back and neck, blueberries.
Colours: ice blue, white, purple. Mood: frozen, "Glace" type. Vegetarian.
```

**21. Mélofée Moon Cake** (`melofee-moon-cake`)

```
Subject: a small round pink-glazed vanilla layer cake on a white plate, smooth pastel pink icing,
a crescent moon and small stars made of white sugar on top, one curled pink sugar "hair" evoking
Clefairy. Colours: pastel pink, white. Mood: dreamy, "Fée" type.
```

### Boissons

**22. Voltali Energy Shot** (`voltali-energy-shot`)

```
Subject: a small tall shot glass of bright orange-yellow juice (orange, lemon, ginger, turmeric)
with a lightning-shaped thin slice of dried orange on the rim, two ice cubes, a few splashes,
evoking Jolteon. Colours: electric yellow, orange. Camera: front 3/4, slightly lower. Mood: energetic,
"Électrik" type.
```

**23. Magicarpe Splash Soda** (`magicarpe-splash-soda`)

```
Subject: a tall glass of layered soda, bright blue at the bottom fading to orange at the top, lemon
slice, ice cubes, a splash of liquid frozen mid-air above the glass, a small orange fin-shaped
orange peel on the rim evoking Magikarp. Colours: blue, orange. Camera: front 3/4. Mood: fizzy,
fresh, "Eau" type.
```

**24. Germignon Green Tea** (`germignon-green-tea`)

```
Subject: a clear glass mug of iced green tea, fresh mint leaves, a lime wedge, ice cubes, one large
green leaf placed on the rim like Chikorita's head leaf. Colours: green, pale gold. Camera: front 3/4.
Mood: light, herbal, "Plante" type.
```

### Menus

**25. Ronflex Meal** (`ronflex-meal`)

```
Subject: a very generous round deep plate (teal-blue ceramic). White rice, slices of roast beef with
jus, roasted potatoes, roasted seasonal vegetables (carrot, green beans, mushrooms), a small rice
mound shaped like a sleeping Snorlax silhouette (dark rice belly, white rice face). Colours: brown,
white, green. Mood: huge, comforting, "Normal" type.
```

**26. Dracaufeu Spicy Menu** (`dracaufeu-spicy-menu`)

```
Subject: a black slate board. Grilled chili chicken pieces with charred edges, orange spicy rice mound,
roasted vegetables (courgette, pepper, onion), a small dish of glossy red "Charizard fire" sauce,
three flame-shaped crispy rice crackers standing in the rice. Colours: orange, red, black slate.
Mood: intense, "Feu" type, signature dish.
```

**27. Mewtwo Deluxe Menu** (`mewtwo-deluxe-menu`)

```
Subject: a refined white porcelain plate. Lacquered salmon fillet with a glossy glaze, a neat mound of
sesame rice, crunchy vegetables (snap peas, carrot ribbons), an elegant streak of violet berry sauce
across the plate, a few micro herbs. Colours: white, orange, deep violet. Mood: prestige tasting
menu, "Psy" type, signature dish.
```

**28. Léviator Ocean Menu** (`leviator-ocean-menu`)

```
Subject: a round blue-and-white ceramic plate with a painted wave motif on the rim. Grilled salmon
fillet, white rice, broccoli, cucumber slices, wakame seaweed, a drizzle of soy glaze, a small blue
wave crest made of thin blue-tinted rice paper evoking Gyarados. Colours: blue, white, orange, green.
Mood: sea, generous, "Eau" type.
```

## Visuels du restaurant (à générer, même direction artistique)

Bloc de style commun aux scènes (à coller avant chaque prompt) :

```
Editorial photography of a contemporary Japanese-inspired bistro in France, warm cream walls (#F8EFDE),
black lacquered wood, red lacquer accents, porcelain plates, soft daylight from large windows, film-like
colour, shallow depth of field, no people looking at the camera, no logos, no text, no watermark,
consistent series look with the dish photography (warm cream, soft shadows).
```

| #   | Visuel            | Fichier cible                            | Format      | Prompt (sujet)                                                                                                                                                                                 |
| --- | ----------------- | ---------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | Hero food         | `src/assets/hero/hero-plate.webp`        | 1600 × 1600 | Top-down (90°) view of the Dracaufeu Spicy Menu on a black slate board, centred, plate fills 80 % of the square, a wisp of steam, plain cream around. Used behind the 3D Poké Ball on desktop. |
| H2  | Hero mobile       | `src/assets/hero/hero-plate-mobile.webp` | 1200 × 1500 | Same dish, 3/4 angle, portrait framing, plate in the lower two thirds, cream above for the title.                                                                                              |
| K1  | Cuisine           | `src/assets/sections/kitchen-01.webp`    | 1600 × 1000 | Close-up of two hands placing a tamagoyaki slice into a yellow lacquered bento box on a light wooden pass, blurred kitchen behind, warm daylight.                                              |
| K2  | Cuisine           | `src/assets/sections/kitchen-02.webp`    | 1600 × 1000 | Six finished bento boxes (yellow, orange, green, blue, pink, black) lined up on the pass, 3/4 high angle, shallow depth of field on the first two.                                             |
| C1  | Chef              | `src/assets/sections/chef.webp`          | 1200 × 1500 | A chef in a black apron seen from the side, plating a bowl with tweezers, face turned toward the plate, bento boxes stacked behind, no visible face detail.                                    |
| R1  | Salle             | `src/assets/sections/room.webp`          | 1600 × 1000 | The dining room at 11:30, empty, cream walls, black lacquered tables, red lacquer chairs, a long belt-like black line painted at mid-height on the wall, daylight.                             |
| R2  | Comptoir          | `src/assets/sections/counter.webp`       | 1600 × 1000 | The take-away counter: black lacquered counter, a row of porcelain bowls, a small red-and-white sphere as a lamp, kraft boxes stacked, morning light.                                          |
| T1  | Table             | `src/assets/sections/table.webp`         | 1600 × 1000 | A table for two from above: two bentos, a blue iced tea, a yellow soda, chopsticks on a black rest, cream tablecloth, hands out of frame.                                                      |
| E1  | Ambiance soir     | `src/assets/sections/evening.webp`       | 1600 × 1000 | The same room at night: warm pendant lights, red lacquer glowing, window reflections, tables set, a soft yellow glow like Pikachu's cheeks on the wall.                                        |
| D1  | Dessert signature | `src/assets/sections/dessert.webp`       | 1200 × 1200 | The Mentali Velvet Cake being sliced, one slice lifted on a black knife, lavender crumbs, cream background.                                                                                    |
| B1  | Réservation       | `src/assets/sections/reservation.webp`   | 1600 × 1000 | A reserved table: a small black card with a red dot standing on a cream plate, two glasses, evening light, blurred room behind.                                                                |
| S1  | Storytelling      | `src/assets/sections/origin.webp`        | 1600 × 1000 | A tiny kitchen, 2019 feel: one bento box being decorated with two red rice cheeks, a handwritten menu pinned on the wall (no readable text), warm lamp.                                        |

Contraintes : mêmes tons crème / laque / encre que les plats, aucun personnage reconnaissable, aucun texte lisible, pas de logo Pokémon officiel. Chaque visuel arrive en WebP (q 80), largeur ≤ 1600 px, avec ses dimensions déclarées dans le composant qui l'affiche.

## Hero et sections (phase 2)

**Hero plate** (`hero/hero-plate`)

```
Same style block. Subject: top-down (90°) view of the Dracaufeu Spicy Menu on a black slate board,
centred, dish fills 80% of the square, steam softly rising, no other props. Colours: orange, red,
black. This image sits behind a red/white sphere, keep the outer 15% of the frame plain cream.
```

**Kitchen 01** (`sections/kitchen-01`)

```
Same lighting and cream palette but a real scene: close-up of two hands (no faces) placing a
tamagoyaki slice into a yellow lacquered bento box on a light wooden counter, blurred kitchen
background, warm daylight. 16:10 landscape composition. No text, no logo.
```

**Kitchen 02** (`sections/kitchen-02`)

```
Same series. Subject: a row of six finished bento boxes (yellow, orange, green, blue, pink, black)
lined up on a pass counter, seen from a 3/4 high angle, shallow depth of field on the first two,
warm daylight, cream wall. 16:10 landscape. No text.
```

## Deuxième série (terminée) — prompts utilisés, pour référence et régénération éventuelle

Générée en une planche 4 × 4 (2048 × 2048) avec le bloc de style commun, un titre par case (retiré au découpage). À régénérer une case seule : reprendre le bloc de style + le bloc ci-dessous.

| #   | Plat                       | Sujet                                                                                                                                                                       |
| --- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 29  | **Roucool Crispy**         | Crispy chicken pieces fanned on a white plate with young salad leaves, shredded carrot, lemon-sesame dressing, one crisp bread "feather" evoking Pidgey. Type Vol.          |
| 30  | **Ouisticram Gyoza**       | Six pan-fried golden gyoza on a white plate, two dipping bowls (chili soy, chili crisp), two small flame-shaped crisps evoking Chimchar. Type Feu.                          |
| 31  | **Caninos Karaage**        | Glossy teriyaki karaage chicken pieces on a white plate, one skewer of grilled zucchini and pepper, sesame, spring onion, evoking Growlithe. Type Feu.                      |
| 32  | **Lucario Bento**          | Black lacquered bento: sliced grilled beef, black-sesame rice with a small blue Lucario face in tinted rice, edamame, wasabi, roasted carrot and sweet potato. Type Combat. |
| 33  | **Ectoplasma Black Bento** | Black and red lacquered bento: glazed chicken, black venere rice with a purple Gengar face in rice paste, pickled red cabbage, sautéed shiitake, pink ginger. Type Spectre. |
| 34  | **Arcanin Grill Bento**    | White plate: teriyaki-glazed grilled chicken, sesame rice, roasted zucchini and peppers, one flame-shaped rice cracker standing in the rice, evoking Arcanine. Type Feu.    |
| 35  | **Noadkoko Garden Bowl**   | Cream bowl: avocado and mango cubes, cucumber, edamame, coriander sprig on warm rice, evoking Exeggutor. Type Plante, vegetarian.                                           |
| 36  | **Marill Aqua Bowl**       | White bowl with a blue rim: fresh salmon cubes, cucumber slices, avocado, blueberries, sushi rice, wakame, one small blue sugar wave, evoking Marill. Type Eau.             |
| 37  | **Feunard Sunset Bowl**    | White bowl: grilled chicken slices, roasted sweet potato and pumpkin wedges, pickled carrot, honey-sriracha sauce, sesame, sunset colours evoking Ninetales. Type Feu.      |
| 38  | **Lucario Power Burger**   | Black charcoal bun, thick beef patty, blue cheese sauce, confit onions, lettuce, small blue sugar flame on top, evoking Lucario. Type Combat.                               |
| 39  | **Arcanin Flame Burger**   | Golden brioche bun, beef patty, melted cheddar, crispy caramelised onions, smoky hot sauce, small flame-shaped sugar on top, evoking Arcanine. Type Feu.                    |
| 40  | **Poussifeu Mochi**        | White plate: soft mango and peach mochi (one cut open), whipped cream, tiny sugar flames, evoking Torchic. Type Feu, dessert.                                               |
| 41  | **Sorbébé Ice Parfait**    | Tall frosted glass: vanilla and blueberry ice parfait layers, vanilla scoop, fresh blueberries, blue sugar splash, evoking Vanillite. Type Glace, dessert.                  |
| 42  | **Mentali Velvet Cake**    | Purple-and-pink velvet layer cake on a lavender plate, smooth lilac icing, dried lavender sprigs, evoking Espeon. Type Psy, dessert.                                        |
| 43  | **Amphinobi Blue Tea**     | Tall glass of blue butterfly-pea iced tea, lime slice, fresh mint, ice cubes, a small blue ribbon, evoking Greninja. Type Eau, drink.                                       |
| 44  | **Pikachu Spark Soda**     | Tall glass of sparkling yellow lemonade, ice, lemon halves and wedges, one sugar lightning bolt on the rim, evoking Pikachu. Type Électrik, drink.                          |
