import { Link } from 'react-router'
import cn from '../../utils/cn'

// The Poké Ball mark: red top, porcelain bottom, ink belt and button. Colours follow currentColor
// for the belt so the mark works on light and dark surfaces.
export function PokeballMark({ size = 36, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="var(--color-porcelain)" />
      <path d="M2 24a22 22 0 0 1 44 0Z" fill="var(--color-lacquer)" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M2 24h44" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="24" r="6.5" fill="var(--color-porcelain)" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('inline-flex items-center gap-2.5 rounded-full text-current no-underline', className)}
      aria-label="PokéBistro, retour à l’accueil"
    >
      <PokeballMark size={34} />
      <span className="font-display text-[1.05rem] font-bold tracking-tight">PokéBistro</span>
    </Link>
  )
}
