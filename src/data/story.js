// Content of the "Notre histoire" page
export const chapters = [
  {
    id: 'origine',
    eyebrow: '2019 · Évry',
    title: 'Un pari entre deux cuisiniers et une dresseuse.',
    paragraphs: [
      'Tout commence dans une cuisine de vingt mètres carrés, route Victoire. Deux cuisiniers formés au bento et au burger, une amie qui n’a jamais lâché sa console, et une question posée un soir de service : et si chaque Pokémon avait son plat ?',
      'Le premier essai était un riz jaune avec deux joues rouges. Il est encore à la carte, sous le nom de Pikachu Bento. Tout le reste est venu de la même règle : on doit reconnaître le Pokémon avant de lire le nom, et on doit avoir envie de le manger avant de le reconnaître.',
    ],
  },
  {
    id: 'cuisine',
    eyebrow: 'La cuisine',
    title: 'Le goût d’abord, le clin d’œil ensuite.',
    paragraphs: [
      'Un plat n’entre pas à la carte parce qu’il ressemble à un Pokémon. Il y entre parce qu’il est bon, puis on cherche à quel Pokémon il ressemble déjà. Le Tauros Steakhouse Burger existait avant Tauros ; le pain noir du Félinferno est un vrai pain au charbon, pas un colorant.',
      'Tout est fait sur place : les sauces, les pains, les glaçages, les petits Pokémon en sucre. Le riz est cuit à chaque service. Les légumes changent avec les saisons, les noms ne changent jamais.',
    ],
  },
  {
    id: 'types',
    eyebrow: 'Les types',
    title: 'Onze types pour dire ce qu’on a envie de manger.',
    paragraphs: [
      'Les types Pokémon sont devenus notre langue commune avec les clients. « Un truc Feu » veut dire relevé, grillé, fumé. « Plutôt Eau » veut dire frais, iodé, léger. « Combat » veut dire qu’on a faim. On n’a jamais eu besoin d’expliquer davantage.',
    ],
  },
  {
    id: 'douceurs',
    eyebrow: 'Le laboratoire des douceurs',
    title: 'Un Pokémon en pâte à choux, ça se mérite.',
    paragraphs: [
      'La collection est née d’un défi lancé à notre pâtissière : faire reconnaître un Pokémon avec de la pâte à choux, de la crème, du chocolat, des fruits et du sucre. Rien d’autre. Pas de figurine, pas de moule, pas de colorant qui n’ait pas d’abord un goût.',
      'Chaque profiterole part du type : le Feu se glace à l’orange et au caramel, l’Eau à la myrtille et au yuzu, la Plante au matcha et à la pistache. La forme vient ensuite, avec une tuile, un pétale de sucre, une oreille en meringue. Le croquembouche de Pikachu, trente choux et du caramel filé, est le sommet de la collection : on le partage, on le photographie, puis on le mange.',
    ],
    dishes: ['pikachu-spark-profiteroles', 'ectoplasma-dark-profiteroles', 'marill-bubble-profiteroles'],
  },
]

export const team = [
  {
    name: 'Nao',
    role: 'Chef de cuisine',
    line: 'Formé au bento à Osaka, il règle chaque cuisson à la seconde.',
  },
  {
    name: 'Lila',
    role: 'Cheffe pâtissière',
    line: 'Les Pokémon en sucre, les mochis, le Velvet Cake : c’est elle.',
  },
  {
    name: 'Marc',
    role: 'Salle & dressage',
    line: 'Il connaît la carte par type et vous trouve toujours une table.',
  },
]

export const gestures = [
  {
    title: 'Le riz, à chaque service',
    text: 'Cuit deux fois par jour, jamais réchauffé. C’est la base de tous les bentos.',
  },
  {
    title: 'La sauce flamme',
    text: 'Piments frais, miel et fumée, réduite lentement. Elle signe tous les plats Feu.',
  },
  {
    title: 'Le Pokémon en dernier',
    text: 'Le décor se pose à la minute, pour qu’il soit intact quand l’assiette arrive.',
  },
]

export const philosophy = {
  title: 'On ne cuisine pas des Pokémon. On cuisine pour des gens qui les aiment.',
  text: 'Le clin d’œil ne remplace jamais le goût. Chaque assiette doit tenir toute seule, Pokémon ou pas ; le reste est un jeu qu’on prend très au sérieux.',
}

export const principles = [
  { title: 'Fait maison', text: 'Sauces, pains, glaçages, décors en sucre : rien n’arrive prêt.' },
  { title: 'Reconnaissable', text: 'Le Pokémon se lit dans l’assiette avant le nom sur la carte.' },
  { title: 'Sérieux', text: 'Des produits frais, des cuissons justes, des portions honnêtes.' },
  { title: 'Ouvert', text: 'Végétarien, épicé, sucré, copieux : il y a un type pour chacun.' },
]
