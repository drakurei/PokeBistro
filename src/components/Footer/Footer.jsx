import pokeball from '../../assets/pokeball.svg'

const footerLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
]

// Footer (Bootstrap grid). The copyright year is computed at render time.
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-poke-navy text-white pt-16 pb-8 mt-auto">
      <div className="container-xl">
        <div className="row g-5">
          <div className="col-md-5">
            <p className="d-flex align-items-center gap-2 fs-3 fw-bold mb-3 font-display">
              <img src={pokeball} alt="" width="36" height="36" />
              PokéBistro
            </p>
            <p className="text-white-50 mb-0 max-w-sm">
              Le restaurant des dresseurs gourmands. Des plats inspirés de l'univers Pokémon, préparés avec des
              produits frais et beaucoup de bonne humeur.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="mb-4 text-xs font-bold tracking-widest text-poke-yellow uppercase">Navigation</h3>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-light link-underline-opacity-0 link-underline-opacity-100-hover fw-semibold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h3 className="mb-4 text-xs font-bold tracking-widest text-poke-yellow uppercase">Informations</h3>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li>12 route Victoire, Bourg Palette, 91000 Évry</li>
              <li>01 23 45 67 89</li>
              <li>Ouvert 7j/7 · 11h30 – 22h30</li>
            </ul>
          </div>
        </div>

        <hr className="border-white opacity-10 my-10" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-white-50">
          <p className="mb-0">© {currentYear} PokéBistro — Projet fictif réalisé dans le cadre d'un TP React.</p>
          <p className="mb-0">Pokémon est une marque de Nintendo / Creatures Inc. / GAME FREAK inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
