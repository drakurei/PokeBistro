import { useContext, useState } from 'react'
import CartContext from '../../contexts/CartContext'
import Nav from '../Nav/Nav'
import Button from '../Button/Button'
import IconCart from '../Icons/IconCart'
import pokeball from '../../assets/pokeball.svg'

// Sticky header: logo, navigation, cart button with counter.
// The mobile menu (burger) is a simple useState, no Bootstrap JS needed.
function Header({ onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useContext(CartContext)

  const closeMenu = () => setIsMenuOpen(false)

  // On desktop (lg) the nav is always visible; on mobile it depends on the state
  const navClasses = isMenuOpen
    ? 'navbar-collapse d-flex order-lg-2 pt-3 pt-lg-0'
    : 'navbar-collapse d-none d-lg-flex order-lg-2'

  return (
    <header className="sticky-top shadow">
      <nav className="navbar navbar-expand-lg bg-poke-blue py-3" data-bs-theme="dark" aria-label="Navigation principale">
        <div className="container-xl">
          <a className="navbar-brand d-flex align-items-center gap-2 fs-3 fw-bold py-0" href="#accueil">
            <img src={pokeball} alt="" width="40" height="40" />
            PokéBistro
          </a>

          <div className="d-flex align-items-center gap-2 order-lg-3">
            <Button
              variant="warning"
              className="position-relative d-flex align-items-center gap-2 shadow-sm"
              onClick={onOpenCart}
              aria-label={`Ouvrir le panier, ${totalItems} article(s)`}
            >
              <IconCart />
              <span className="d-none d-sm-inline">Panier</span>
              {/* key={totalItems}: the badge is re-created at each change, which replays the "pop" animation */}
              <span
                key={totalItems}
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge-pop"
              >
                {totalItems}
              </span>
            </Button>

            <button
              className="navbar-toggler"
              type="button"
              aria-controls="main-nav"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div id="main-nav" className={navClasses}>
            <Nav onLinkClick={closeMenu} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
