// Main navigation: anchor links to the sections of the single page
const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#categories', label: 'Catégories' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
]

// onLinkClick is used by the Header to close the mobile menu after a click
function Nav({ onLinkClick }) {
  return (
    <ul className="navbar-nav mx-auto gap-lg-2 text-center">
      {links.map((link) => (
        <li key={link.href} className="nav-item">
          <a href={link.href} className="nav-link fw-semibold px-3" onClick={onLinkClick}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Nav
