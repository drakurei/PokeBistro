import { Link } from 'react-router'
import { useFavorites } from '../../contexts/FavoritesContext'
import cn from '../../utils/cn'
import { IconHeart } from '../ui/Icons'

// Header link to the favourites page, with the number of dishes kept
export default function FavoritesButton({ tone = 'light' }) {
  const { count } = useFavorites()

  return (
    <Link
      to="/favoris"
      aria-label={count > 0 ? `Vos favoris, ${count} plat${count > 1 ? 's' : ''}` : 'Vos favoris'}
      className={cn(
        'relative flex size-11 items-center justify-center rounded-full no-underline transition-colors duration-(--duration-fast)',
        tone === 'dark' ? 'text-porcelain hover:bg-porcelain/12' : 'text-ink hover:bg-ink/6',
      )}
    >
      <IconHeart size={22} filled={count > 0} />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-mono text-[11px] font-medium text-ink"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </Link>
  )
}
