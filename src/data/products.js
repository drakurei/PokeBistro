// All the products of the restaurant.
// The images come from a sprite sheet generated for the project (28 dishes),
// cut into 28 files in src/assets/products/ and imported here like any Vite asset.
import pikachuBento from '../assets/products/pikachu-bento.png'
import goupixFireBox from '../assets/products/goupix-fire-box.png'
import psykokwakBento from '../assets/products/psykokwak-bento.png'
import herbizarreBento from '../assets/products/herbizarre-bento.png'
import salamecheBento01 from '../assets/products/salameche-bento-01.png'
import salamecheBento02 from '../assets/products/salameche-bento-02.png'
import herbizarreVeggieBento from '../assets/products/herbizarre-veggie-bento.png'
import taurosSteakhouseBurger from '../assets/products/tauros-steakhouse-burger.png'
import felinfernoBurger from '../assets/products/felinferno-burger.png'
import florizarreVeggieBurger from '../assets/products/florizarre-veggie-burger.png'
import bulbizarreGardenBowl from '../assets/products/bulbizarre-garden-bowl.png'
import carapuceBlueBowl from '../assets/products/carapuce-blue-bowl.png'
import mewBerryBowl01 from '../assets/products/mew-berry-bowl-01.png'
import freshIceBlueBowl from '../assets/products/fresh-ice-blue-bowl.png'
import mewBerryBowl02 from '../assets/products/mew-berry-bowl-02.png'
import gardevoirBerryPlate from '../assets/products/gardevoir-berry-plate.png'
import rondoudouDessert from '../assets/products/rondoudou-dessert.png'
import evoliSweetBox from '../assets/products/evoli-sweet-box.png'
import togepiEggPudding from '../assets/products/togepi-egg-pudding.png'
import lokhlassIceCream from '../assets/products/lokhlass-ice-cream.png'
import melofeeMoonCake from '../assets/products/melofee-moon-cake.png'
import voltaliEnergyShot from '../assets/products/voltali-energy-shot.png'
import magicarpeSplashSoda from '../assets/products/magicarpe-splash-soda.png'
import germignonGreenTea from '../assets/products/germignon-green-tea.png'
import ronflexMeal from '../assets/products/ronflex-meal.png'
import dracaufeuSpicyMenu from '../assets/products/dracaufeu-spicy-menu.png'
import mewtwoDeluxeMenu from '../assets/products/mewtwo-deluxe-menu.png'
import leviatorOceanMenu from '../assets/products/leviator-ocean-menu.png'

const products = [
  // ---------- Bento ----------
  {
    id: 1,
    name: 'Pikachu Bento',
    description: 'Riz jaune au visage de Pikachu, omelette roulée, maïs, bâtonnets de carotte et petites saucisses grillées.',
    price: 12.9,
    category: 'Bento',
    type: 'Électrik',
    tags: ['populaire'],
    image: pikachuBento,
    keywords: ['pikachu', 'riz', 'omelette', 'maïs', 'saucisse', 'japonais'],
  },
  {
    id: 2,
    name: 'Goupix Fire Box',
    description: 'Riz pimenté, poulet grillé caramélisé, brocolis et poivrons rôtis : le bento qui réchauffe comme Goupix.',
    price: 13.5,
    category: 'Bento',
    type: 'Feu',
    tags: ['épicé'],
    image: goupixFireBox,
    keywords: ['goupix', 'poulet', 'riz', 'piment', 'brocoli', 'poivron'],
  },
  {
    id: 3,
    name: 'Psykokwak Bento',
    description: 'Riz moulé façon Psykokwak, nuggets de poulet croustillants, œuf mollet et brocolis vapeur.',
    price: 11.5,
    category: 'Bento',
    type: 'Eau',
    tags: ['nouveau'],
    image: psykokwakBento,
    keywords: ['psykokwak', 'poulet', 'nuggets', 'œuf', 'oeuf', 'riz'],
  },
  {
    id: 4,
    name: 'Herbizarre Bento',
    description: 'Riz aux herbes, brocolis croquants, avocat frais et légumes verts : un bento 100 % végétal.',
    price: 11.9,
    category: 'Bento',
    type: 'Plante',
    tags: ['végétarien'],
    image: herbizarreBento,
    keywords: ['herbizarre', 'avocat', 'brocoli', 'légumes', 'herbes', 'veggie'],
  },
  {
    id: 5,
    name: 'Salamèche Bento',
    description: "Émincé de bœuf grillé, riz parfumé, poivrons et haricots verts, relevés d'une sauce flamme maison.",
    price: 13.9,
    category: 'Bento',
    type: 'Feu',
    tags: ['populaire', 'épicé'],
    image: salamecheBento01,
    keywords: ['salamèche', 'salameche', 'bœuf', 'boeuf', 'riz', 'piment', 'flamme'],
  },
  {
    id: 6,
    name: 'Salamèche Bento Maxi',
    description: 'La version XL du bento Salamèche : double portion de riz épicé, poulet grillé et légumes sautés au wok.',
    price: 15.9,
    category: 'Bento',
    type: 'Feu',
    tags: ['épicé', 'nouveau'],
    image: salamecheBento02,
    keywords: ['salamèche', 'salameche', 'maxi', 'xl', 'poulet', 'riz', 'piment', 'wok'],
  },
  {
    id: 7,
    name: 'Herbizarre Veggie Bento',
    description: 'Riz blanc, concombre, avocat, brocolis et tofu mariné, servis dans un bento tout en fraîcheur.',
    price: 12.5,
    category: 'Bento',
    type: 'Plante',
    tags: ['végétarien'],
    image: herbizarreVeggieBento,
    keywords: ['herbizarre', 'tofu', 'concombre', 'avocat', 'brocoli', 'veggie'],
  },

  // ---------- Burger ----------
  {
    id: 8,
    name: 'Tauros Steakhouse Burger',
    description: 'Steak de bœuf épais, cheddar fondu, oignons grillés et sauce steakhouse, servi avec des frites maison.',
    price: 14.9,
    category: 'Burger',
    type: 'Normal',
    tags: ['populaire'],
    image: taurosSteakhouseBurger,
    keywords: ['tauros', 'bœuf', 'boeuf', 'steak', 'frites', 'cheddar', 'oignons'],
  },
  {
    id: 9,
    name: 'Félinferno Burger',
    description: 'Pain noir au charbon, double steak, bacon croustillant, cheddar coulant et sauce fumée légèrement pimentée.',
    price: 13.9,
    category: 'Burger',
    type: 'Feu',
    tags: ['épicé', 'nouveau'],
    image: felinfernoBurger,
    keywords: ['félinferno', 'felinferno', 'noir', 'charbon', 'bacon', 'cheddar', 'fumé'],
  },
  {
    id: 10,
    name: 'Florizarre Veggie Burger',
    description: 'Pain vert aux épinards, galette de légumes, avocat, tomate et fleur comestible, pour un burger tout en couleurs.',
    price: 13.5,
    category: 'Burger',
    type: 'Plante',
    tags: ['végétarien'],
    image: florizarreVeggieBurger,
    keywords: ['florizarre', 'veggie', 'avocat', 'tomate', 'légumes', 'épinards'],
  },

  // ---------- Bowl ----------
  {
    id: 11,
    name: 'Bulbizarre Garden Bowl',
    description: 'Riz, avocat, concombre, carottes râpées, petits pois et un onigiri Bulbizarre au centre du bowl.',
    price: 11.9,
    category: 'Bowl',
    type: 'Plante',
    tags: ['végétarien', 'populaire'],
    image: bulbizarreGardenBowl,
    keywords: ['bulbizarre', 'avocat', 'concombre', 'riz', 'onigiri', 'healthy'],
  },
  {
    id: 12,
    name: 'Carapuce Blue Bowl',
    description: 'Pavé de saumon grillé, avocat, edamame, concombre et riz vinaigré, dans un bowl bleu comme Carapuce.',
    price: 12.9,
    category: 'Bowl',
    type: 'Eau',
    tags: [],
    image: carapuceBlueBowl,
    keywords: ['carapuce', 'saumon', 'edamame', 'poisson', 'riz', 'poke'],
  },
  {
    id: 13,
    name: 'Mew Berry Bowl',
    description: 'Yaourt onctueux à la fraise, fruits rouges frais et un petit Mew en sucre posé sur le dessus.',
    price: 9.5,
    category: 'Bowl',
    type: 'Psy',
    tags: ['végétarien'],
    image: mewBerryBowl01,
    keywords: ['mew', 'fraise', 'fruits rouges', 'yaourt', 'sucré', 'petit-déjeuner'],
  },
  {
    id: 14,
    name: 'Fresh Ice Blue Bowl',
    description: 'Bowl glacé au saumon, crevettes, avocat, edamame et algues nori, servi sur un riz bien frais.',
    price: 14.9,
    category: 'Bowl',
    type: 'Glace',
    tags: ['nouveau'],
    image: freshIceBlueBowl,
    keywords: ['glace', 'frais', 'saumon', 'crevettes', 'avocat', 'algues', 'poke'],
  },
  {
    id: 15,
    name: 'Mew Berry Bowl Chantilly',
    description: 'Fruits rouges, myrtilles et chantilly légère sur un yaourt à la fraise : la version gourmande du Mew Berry Bowl.',
    price: 9.9,
    category: 'Bowl',
    type: 'Psy',
    tags: ['végétarien'],
    image: mewBerryBowl02,
    keywords: ['mew', 'chantilly', 'fruits rouges', 'myrtille', 'yaourt', 'sucré'],
  },
  {
    id: 16,
    name: 'Gardevoir Berry Plate',
    description: "Assiette élégante de fruits rouges, crème légère et éclats de meringue, décorée d'une Gardevoir en sucre.",
    price: 15.5,
    category: 'Bowl',
    type: 'Psy',
    tags: ['végétarien'],
    image: gardevoirBerryPlate,
    keywords: ['gardevoir', 'baies', 'fruits rouges', 'crème', 'meringue', 'fraîcheur'],
  },

  // ---------- Dessert ----------
  {
    id: 17,
    name: 'Rondoudou Dessert',
    description: 'Dôme de mousse à la fraise, chantilly, fraises fraîches et petits marshmallows, aussi rond que Rondoudou.',
    price: 6.9,
    category: 'Dessert',
    type: 'Normal',
    tags: ['dessert', 'populaire'],
    image: rondoudouDessert,
    keywords: ['rondoudou', 'fraise', 'mousse', 'chantilly', 'marshmallow', 'sucré'],
  },
  {
    id: 18,
    name: 'Évoli Sweet Box',
    description: 'Gaufres dorées nappées de chocolat, fruits rouges et boule de glace vanille, dans une boîte à emporter.',
    price: 8.9,
    category: 'Dessert',
    type: 'Normal',
    tags: ['dessert', 'nouveau'],
    image: evoliSweetBox,
    keywords: ['évoli', 'evoli', 'gaufre', 'chocolat', 'fruits rouges', 'glace', 'sucré'],
  },
  {
    id: 19,
    name: 'Togepi Egg Pudding',
    description: 'Flan crémeux à la vanille servi dans une coquille façon Togepi, avec quelques fruits rouges.',
    price: 5.9,
    category: 'Dessert',
    type: 'Fée',
    tags: ['dessert'],
    image: togepiEggPudding,
    keywords: ['togepi', 'flan', 'pudding', 'vanille', 'œuf', 'oeuf'],
  },
  {
    id: 20,
    name: 'Lokhlass Ice Cream',
    description: 'Boules de glace vanille et myrtille, coquillages en sucre et un Lokhlass en meringue sur la banquise.',
    price: 7.5,
    category: 'Dessert',
    type: 'Glace',
    tags: ['dessert', 'végétarien'],
    image: lokhlassIceCream,
    keywords: ['lokhlass', 'glace', 'vanille', 'myrtille', 'meringue', 'coquillage'],
  },
  {
    id: 21,
    name: 'Mélofée Moon Cake',
    description: 'Gâteau moelleux à la vanille, glaçage rose et décor lune et étoiles, comme un rêve de Mélofée.',
    price: 6.5,
    category: 'Dessert',
    type: 'Fée',
    tags: ['dessert'],
    image: melofeeMoonCake,
    keywords: ['mélofée', 'melofee', 'gâteau', 'lune', 'vanille', 'sucré'],
  },

  // ---------- Boisson ----------
  {
    id: 22,
    name: 'Voltali Energy Shot',
    description: 'Shot vitaminé orange, citron et gingembre, pour recharger ses batteries comme Voltali.',
    price: 4.9,
    category: 'Boisson',
    type: 'Électrik',
    tags: ['nouveau', 'épicé'],
    image: voltaliEnergyShot,
    keywords: ['voltali', 'orange', 'gingembre', 'citron', 'énergie', 'shot'],
  },
  {
    id: 23,
    name: 'Magicarpe Splash Soda',
    description: 'Soda pétillant bleu et orange, citron frais et glaçons : un splash de fraîcheur signé Magicarpe.',
    price: 3.5,
    category: 'Boisson',
    type: 'Eau',
    tags: [],
    image: magicarpeSplashSoda,
    keywords: ['magicarpe', 'soda', 'citron', 'pétillant', 'bleu', 'glaçons'],
  },
  {
    id: 24,
    name: 'Germignon Green Tea',
    description: 'Thé vert glacé infusé à la menthe et au citron vert, léger et désaltérant.',
    price: 3.2,
    category: 'Boisson',
    type: 'Plante',
    tags: ['végétarien'],
    image: germignonGreenTea,
    keywords: ['germignon', 'thé vert', 'menthe', 'citron vert', 'glacé'],
  },

  // ---------- Menu ----------
  {
    id: 25,
    name: 'Ronflex Meal',
    description: "Riz, tranches de rôti de bœuf, pommes de terre rôties et légumes : l'assiette complète d'un Ronflex affamé.",
    price: 18.9,
    category: 'Menu',
    type: 'Normal',
    tags: ['populaire'],
    image: ronflexMeal,
    keywords: ['ronflex', 'bœuf', 'boeuf', 'rôti', 'pommes de terre', 'copieux', 'formule'],
  },
  {
    id: 26,
    name: 'Dracaufeu Spicy Menu',
    description: 'Poulet grillé au piment, riz épicé, légumes rôtis et sauce feu de Dracaufeu, dressés sur ardoise.',
    price: 21.9,
    category: 'Menu',
    type: 'Feu',
    tags: ['épicé', 'populaire'],
    image: dracaufeuSpicyMenu,
    keywords: ['dracaufeu', 'poulet', 'riz', 'piment', 'menu', 'formule'],
  },
  {
    id: 27,
    name: 'Mewtwo Deluxe Menu',
    description: 'Filet de saumon laqué, riz au sésame, légumes croquants et sauce violette aux baies : le menu prestige.',
    price: 24.9,
    category: 'Menu',
    type: 'Psy',
    tags: ['nouveau'],
    image: mewtwoDeluxeMenu,
    keywords: ['mewtwo', 'saumon', 'riz', 'deluxe', 'menu', 'formule', 'premium'],
  },
  {
    id: 28,
    name: 'Léviator Ocean Menu',
    description: 'Saumon grillé, riz, brocolis, concombre et algues, servis sur une assiette aux vagues de Léviator.',
    price: 22.5,
    category: 'Menu',
    type: 'Eau',
    tags: [],
    image: leviatorOceanMenu,
    keywords: ['léviator', 'leviator', 'saumon', 'poisson', 'menu', 'formule'],
  },
]

export default products
