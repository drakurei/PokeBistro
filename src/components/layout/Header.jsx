import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import cn from '../../utils/cn'
import useScrolled from '../../hooks/useScrolled'
import { navLinks } from '../../data/navigation'
import Button, { IconButton } from '../ui/Button'
import { IconMenu } from '../ui/Icons'
import CartButton from '../cart/CartButton'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

// Fixed header. Over the home hero it is transparent with light text; once the page scrolls
// (or on any other page) it becomes porcelain with the belt underneath.
export default function Header() {
  const location = useLocation()
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)

  const overHero = location.pathname === '/' && !scrolled
  const tone = overHero ? 'dark' : 'light'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-(--duration-slow) ease-(--ease-out)',
          overHero ? 'bg-transparent text-porcelain' : 'bg-porcelain/95 text-ink backdrop-blur-md',
        )}
      >
        <div className="container-pb flex h-(--spacing-header) items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        'relative flex h-10 items-center rounded-full px-4 text-sm font-medium no-underline transition-colors duration-(--duration-fast)',
                        overHero ? 'hover:bg-porcelain/12' : 'hover:bg-ink/6',
                        isActive &&
                          'after:absolute after:bottom-1 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-lacquer',
                        isActive && overHero && 'after:bg-gold',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              to="/reservation"
              size="sm"
              variant={overHero ? 'light' : 'dark'}
              className="hidden sm:inline-flex"
            >
              Réserver
            </Button>
            <CartButton tone={tone} />
            <IconButton
              label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className={cn('lg:hidden', overHero ? 'text-porcelain hover:bg-porcelain/12' : 'text-ink')}
            >
              <IconMenu size={24} />
            </IconButton>
          </div>
        </div>

        {/* The belt closes the header once it is opaque */}
        <div
          aria-hidden="true"
          className={cn(
            'belt origin-center transition-[scale,opacity] duration-(--duration-slow) ease-(--ease-out)',
            overHero ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100',
          )}
        />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
