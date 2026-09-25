import IconCheck from '../Icons/IconCheck'
import { handleImageError } from '../../utils/imageFallback'

// "À propos" section, styled with Tailwind
const aboutImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'

const stats = [
  { value: '28', label: 'plats à la carte' },
  { value: '6', label: 'catégories' },
  { value: '100 %', label: 'fictif, 0 % de Pokémon cuisiné' },
]

const promises = [
  'Produits frais, cuisinés sur place',
  'Une recette pensée pour chaque Pokémon',
  'Une ambiance de Centre Pokémon, en plus gourmand',
]

function About() {
  return (
    <section id="a-propos" className="py-20">
      <div className="container-xl grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-poke-blue uppercase">À propos</p>
          <h2 className="mb-6 font-display text-4xl leading-tight font-bold text-poke-navy md:text-5xl">
            Le restaurant des dresseurs gourmands
          </h2>
          <p className="mb-4 text-lg text-slate-700">
            PokéBistro est né d'une idée simple : et si chaque Pokémon avait son plat ? Un bento électrique pour
            Pikachu, un burger flamboyant pour Salamèche, un bowl frais et bleu pour Carapuce…
          </p>
          <p className="mb-6 text-slate-700">
            Nos recettes s'inspirent de la couleur, du type et du caractère de chaque Pokémon. Tout est préparé sur
            place, avec des produits frais et beaucoup de bonne humeur.
          </p>

          <ul className="mb-10 grid gap-3">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 font-semibold text-slate-800">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-poke-yellow text-poke-navy">
                  <IconCheck size={16} />
                </span>
                {promise}
              </li>
            ))}
          </ul>

          <dl className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <dt className="font-display text-4xl font-bold text-poke-red">{stat.value}</dt>
                <dd className="mb-0 text-sm text-slate-600">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-[2.5rem] bg-linear-to-br from-poke-blue to-poke-navy p-10 shadow-2xl">
            <img
              src={aboutImage}
              alt="Évoli, l'ambassadeur des desserts du PokéBistro"
              className="mx-auto h-auto w-3/4 drop-shadow-2xl transition duration-300 hover:scale-105"
              width="475"
              height="475"
              loading="lazy"
              onError={handleImageError}
            />
          </div>
          <p className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-poke-yellow px-6 py-2.5 text-sm font-bold text-poke-navy shadow-lg">
            Ouvert 7j/7 · 11h30 – 22h30
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
