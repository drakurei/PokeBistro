import { NavLink } from 'react-router'
import cn from '../../utils/cn'
import { restaurant } from '../../data/restaurant'
import Dialog from '../ui/Dialog'
import Button, { IconButton } from '../ui/Button'
import { IconClose, IconArrowRight } from '../ui/Icons'
import Logo from './Logo'
import { navLinks } from '../../data/navigation'

// Full-screen navigation for small screens. Built on the native dialog, so Escape and the focus
// trap are free; links close it on click.
export default function MobileMenu({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant="full"
      label="Menu de navigation"
      className="bg-ink text-porcelain"
    >
      <div id="mobile-menu" className="flex h-full flex-col">
        <div className="container-pb flex h-(--spacing-header) items-center justify-between">
          <Logo onClick={onClose} className="text-porcelain" />
          <IconButton
            label="Fermer le menu"
            onClick={onClose}
            className="text-porcelain hover:bg-porcelain/12"
          >
            <IconClose size={24} />
          </IconButton>
        </div>
        <div className="belt belt-light" aria-hidden="true" />

        <nav aria-label="Navigation principale" className="container-pb flex-1 py-8">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                className="border-b border-porcelain/10"
                style={{ animation: `menu-link-in 500ms var(--ease-out) ${120 + index * 60}ms both` }}
              >
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-5 font-display text-3xl font-semibold tracking-tight no-underline transition-colors',
                      isActive ? 'text-gold' : 'text-porcelain hover:text-gold',
                    )
                  }
                >
                  {link.label}
                  <IconArrowRight size={22} className="opacity-50" />
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/reservation" onClick={onClose} size="lg" className="mt-8 w-full">
            Réserver une table
          </Button>
        </nav>

        <div className="container-pb pb-8 font-mono text-xs tracking-[0.12em] text-porcelain/60 uppercase">
          <p>
            {restaurant.hours[0].days} · {restaurant.hours[0].slots.join(' · ')}
          </p>
          <p className="mt-1">
            {restaurant.address.street}, {restaurant.address.city}
          </p>
        </div>
      </div>
    </Dialog>
  )
}
