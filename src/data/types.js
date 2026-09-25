// The Pokémon types served at PokéBistro.
// A type is both a filter and a mood: each one has a colour, a short promise and a flavour line.
// `onColor` tells which text colour keeps a readable contrast on the type colour.
// `icon` names the original glyph drawn in components/ui/TypeIcon (no official mark is used).
export const types = [
  {
    id: 'electrik',
    icon: 'bolt',
    label: 'Électrik',
    color: '#f2b826',
    onColor: 'ink',
    promise: 'Vif, doré, plein d’énergie',
    flavour: 'Maïs grillé, omelette roulée, citron et gingembre : des plats qui réveillent.',
  },
  {
    id: 'feu',
    icon: 'flame',
    label: 'Feu',
    color: '#e8542b',
    onColor: 'porcelain',
    promise: 'Grillé, fumé, relevé',
    flavour: 'Sauces flamme maison, poulet caramélisé, pain au charbon. Pour ceux qui aiment quand ça pique.',
  },
  {
    id: 'eau',
    icon: 'drop',
    label: 'Eau',
    color: '#2f7be0',
    onColor: 'porcelain',
    promise: 'Frais, iodé, léger',
    flavour: 'Saumon, riz vinaigré, edamame, concombre, thé glacé bleu. La mer dans un bol.',
  },
  {
    id: 'plante',
    icon: 'leaf',
    label: 'Plante',
    color: '#4fb34f',
    onColor: 'ink',
    promise: 'Végétal, croquant, vert',
    flavour: 'Avocat, mangue, brocolis, tofu mariné, thé vert. 100 % végétal, 0 % ennuyeux.',
  },
  {
    id: 'normal',
    icon: 'plate',
    label: 'Normal',
    color: '#9e9683',
    onColor: 'ink',
    promise: 'Généreux, réconfortant',
    flavour: 'Steak de bœuf, frites maison, rôti, pommes de terre. Les classiques, bien faits.',
  },
  {
    id: 'combat',
    icon: 'fist',
    label: 'Combat',
    color: '#b85c38',
    onColor: 'porcelain',
    promise: 'Costaud, protéiné, sérieux',
    flavour: 'Bœuf grillé, steaks épais, riz au sésame noir : pour les appétits d’entraînement.',
  },
  {
    id: 'psy',
    icon: 'spiral',
    label: 'Psy',
    color: '#e9508a',
    onColor: 'porcelain',
    promise: 'Fruité, mystérieux',
    flavour: 'Fruits rouges, lavande, sauces violettes aux baies. Doux et un peu étrange.',
  },
  {
    id: 'spectre',
    icon: 'ghost',
    label: 'Spectre',
    color: '#6d5b9c',
    onColor: 'porcelain',
    promise: 'Sombre, laqué, farceur',
    flavour: 'Riz noir, poulet laqué, chou rouge mariné : des assiettes qui jouent avec l’obscurité.',
  },
  {
    id: 'fee',
    icon: 'star',
    label: 'Fée',
    color: '#f2a1b8',
    onColor: 'ink',
    promise: 'Sucré, délicat, rose',
    flavour: 'Flan à la vanille, gâteau moelleux, glaçages pastel. Les desserts qui font sourire.',
  },
  {
    id: 'glace',
    icon: 'snowflake',
    label: 'Glace',
    color: '#7fd3e0',
    onColor: 'ink',
    promise: 'Glacé, net, bleu pâle',
    flavour: 'Bowls froids, parfaits givrés, glace vanille-myrtille. Une banquise dans l’assiette.',
  },
  {
    id: 'vol',
    icon: 'feather',
    label: 'Vol',
    color: '#a3a8e8',
    onColor: 'ink',
    promise: 'Léger, aérien, croustillant',
    flavour: 'Poulet croustillant, jeunes pousses, chips légères : ce qui se mange sans peser.',
  },
]

export const typesById = Object.fromEntries(types.map((type) => [type.id, type]))

export function getType(id) {
  return typesById[id] ?? null
}
