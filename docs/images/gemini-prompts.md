# Prompts Gemini — visuels PokéBistro

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

## Bloc produit — un prompt par plat

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
