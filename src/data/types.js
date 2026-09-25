// The eight Pokémon types served at PokéBistro.
// A type is both a filter and a mood: each one has a colour, a short promise and a flavour line.
// `onColor` tells which text colour keeps a readable contrast on the type colour.
export const types = [
  {
    id: 'electrik',
    label: 'Électrik',
    color: '#f2b826',
    onColor: 'ink',
    promise: 'Vif, doré, plein d’énergie',
    flavour: 'Maïs grillé, omelette roulée, agrumes et gingembre : des plats qui réveillent.',
  },
  {
    id: 'feu',
    label: 'Feu',
    color: '#e8542b',
    onColor: 'porcelain',
    promise: 'Grillé, fumé, relevé',
    flavour: 'Sauces flamme maison, poulet caramélisé, pain au charbon. Pour ceux qui aiment quand ça pique.',
  },
  {
    id: 'eau',
    label: 'Eau',
    color: '#2f7be0',
    onColor: 'porcelain',
    promise: 'Frais, iodé, léger',
    flavour: 'Saumon grillé, riz vinaigré, edamame, concombre. La mer dans un bol bleu.',
  },
  {
    id: 'plante',
    label: 'Plante',
    color: '#4fb34f',
    onColor: 'ink',
    promise: 'Végétal, croquant, vert',
    flavour: 'Avocat, brocolis, tofu mariné, thé vert. 100 % végétal, 0 % ennuyeux.',
  },
  {
    id: 'normal',
    label: 'Normal',
    color: '#9e9683',
    onColor: 'ink',
    promise: 'Généreux, réconfortant',
    flavour: 'Steak de bœuf, frites maison, rôti, pommes de terre. Les classiques, bien faits.',
  },
  {
    id: 'psy',
    label: 'Psy',
    color: '#e9508a',
    onColor: 'porcelain',
    promise: 'Fruité, mystérieux',
    flavour: 'Fruits rouges, yaourt onctueux, sauces violettes aux baies. Doux et un peu étrange.',
  },
  {
    id: 'fee',
    label: 'Fée',
    color: '#f2a1b8',
    onColor: 'ink',
    promise: 'Sucré, délicat, rose',
    flavour: 'Flan à la vanille, gâteau moelleux, glaçages pastel. Les desserts qui font sourire.',
  },
  {
    id: 'glace',
    label: 'Glace',
    color: '#7fd3e0',
    onColor: 'ink',
    promise: 'Glacé, net, bleu pâle',
    flavour: 'Bowls froids, glaces vanille-myrtille, meringue. Une banquise dans l’assiette.',
  },
]

export const typesById = Object.fromEntries(types.map((type) => [type.id, type]))

export function getType(id) {
  return typesById[id] ?? null
}
