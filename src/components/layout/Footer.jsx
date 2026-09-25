import { Link } from 'react-router'
import { restaurant } from '../../data/restaurant'
import { PokeballMark } from './Logo'
import Belt from './Belt'
import { navLinks } from '../../data/navigation'

const columns = [
  {
    title: 'Le restaurant',
    links: [
      ...navLinks.map((link) => ({ label: link.label, to: link.to })),
      { label: 'Réserver', to: '/reservation' },
    ],
  },
  {
    title: 'La carte',
    links: [
      { label: 'Entrées', to: '/menu?category=entree' },
      { label: 'Bentos', to: '/menu?category=bento' },
      { label: 'Burgers', to: '/menu?category=burger' },
      { label: 'Bowls', to: '/menu?category=bowl' },
      { label: 'Desserts', to: '/menu?category=dessert' },
      { label: 'Boissons', to: '/menu?category=boisson' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { address } = restaurant

  return (
    <footer className="bg-ink text-porcelain">
      <Belt light />
      <div className="container-pb grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 font-display text-2xl font-bold">
            <PokeballMark size={40} className="text-porcelain" />
            PokéBistro
          </p>
          <p className="mt-5 max-w-sm text-porcelain/70">{restaurant.tagline}</p>
          <address className="mt-8 font-mono text-xs leading-relaxed tracking-[0.1em] text-porcelain/60 uppercase not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            <a href={restaurant.phoneHref} className="text-porcelain/80 no-underline hover:text-gold">
              {restaurant.phone}
            </a>
          </address>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
            <h2 className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{column.title}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-porcelain/80 no-underline transition-colors hover:text-porcelain"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h2 className="font-mono text-xs tracking-[0.14em] text-gold uppercase">Horaires</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {restaurant.hours.map((line) => (
              <li key={line.days}>
                <p className="font-bold">{line.days}</p>
                <p className="font-mono text-sm text-porcelain/70">{line.slots.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-pb flex flex-col gap-2 border-t border-porcelain/10 py-6 text-xs text-porcelain/50 md:flex-row md:justify-between">
        <p>© {year} PokéBistro — restaurant fictif, projet de portfolio.</p>
        <p>Pokémon est une marque de Nintendo / Creatures Inc. / GAME FREAK inc.</p>
      </div>
    </footer>
  )
}
