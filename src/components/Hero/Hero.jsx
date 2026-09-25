import { handleImageError } from '../../utils/imageFallback'

// Hero section, styled with Tailwind
const heroImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'

const highlights = ['28 plats à la carte', '6 catégories', 'Ouvert 7j/7']

function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-poke-yellow/20">
      {/* Soft decorative shapes in the background */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-poke-yellow/50 blur-3xl"></div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-poke-blue/15 blur-3xl"></div>

      <div className="container-xl relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-28">
        {/* Text */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-poke-blue shadow-sm">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-poke-red"></span>
            Restaurant inspiré de l'univers Pokémon
          </p>
          <h1 className="mb-5 font-display text-5xl leading-[1.05] font-bold tracking-tight text-poke-navy sm:text-6xl lg:text-7xl">
            Attrapez-les tous…
            <br />
            <span className="text-poke-red">dans votre assiette&nbsp;!</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-700 sm:text-xl lg:mx-0">
            Bentos, burgers, bowls et desserts inspirés de vos Pokémon préférés. Des recettes fraîches, colorées
            et préparées comme au Bourg Palette.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-poke-red px-8 py-4 text-lg font-bold text-white no-underline shadow-lg shadow-poke-red/30 transition hover:-translate-y-0.5 hover:bg-red-700 hover:text-white"
            >
              Découvrir la carte
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#a-propos"
              className="inline-flex items-center rounded-full border-2 border-poke-navy px-8 py-4 text-lg font-bold text-poke-navy no-underline transition hover:bg-poke-navy hover:text-white"
            >
              Notre histoire
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-600 lg:justify-start">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-poke-yellow"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto flex aspect-square w-72 items-center justify-center sm:w-96 lg:col-span-5 lg:w-full lg:max-w-md">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-poke-yellow to-amber-300 shadow-2xl" aria-hidden="true"></div>
          <div className="absolute inset-5 rounded-full border-4 border-white/60" aria-hidden="true"></div>
          <img
            src={heroImage}
            alt="Pikachu, la mascotte du PokéBistro"
            className="relative h-auto w-[78%] drop-shadow-2xl transition duration-300 hover:scale-105"
            width="475"
            height="475"
            onError={handleImageError}
          />
          <span className="absolute -right-3 top-6 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-poke-navy shadow-lg">
            Nouveau : Mewtwo Deluxe Menu
          </span>
          <span className="absolute -left-3 bottom-8 rounded-2xl bg-poke-navy px-4 py-2 text-sm font-bold text-white shadow-lg">
            À partir de 3,20 €
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
