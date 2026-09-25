import { useEffect, useState } from 'react'
import cn from '../../utils/cn'
import { IconClose, IconSearch } from '../ui/Icons'

// Search box. Typing updates the URL after a short pause so the history is not rewritten on every key.
export default function SearchField({ value, onChange, className }) {
  const [draft, setDraft] = useState(value)
  const [syncedValue, setSyncedValue] = useState(value)

  // When the URL changes from elsewhere (reset, back button), the field follows it
  if (value !== syncedValue) {
    setSyncedValue(value)
    setDraft(value)
  }

  useEffect(() => {
    if (draft === value) return
    const timer = setTimeout(() => onChange(draft), 180)
    return () => clearTimeout(timer)
  }, [draft, value, onChange])

  const clear = () => {
    setDraft('')
    onChange('')
  }

  return (
    <div className={cn('relative', className)}>
      <label htmlFor="menu-search" className="sr-only">
        Rechercher un plat, un Pokémon, un ingrédient
      </label>
      <IconSearch
        size={20}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-mute"
      />
      <input
        id="menu-search"
        type="search"
        inputMode="search"
        autoComplete="off"
        enterKeyHint="search"
        maxLength={60}
        placeholder="Pikachu, burger, avocat…"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className="h-12 w-full rounded-full border border-line bg-porcelain pr-12 pl-12 text-base text-ink placeholder:text-ink-mute/70 focus:border-ink focus:outline-none focus:ring-3 focus:ring-lacquer/25 [&::-webkit-search-cancel-button]:hidden"
      />
      {draft !== '' && (
        <button
          type="button"
          onClick={clear}
          aria-label="Effacer la recherche"
          className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-mute hover:bg-ink/6 hover:text-ink"
        >
          <IconClose size={18} />
        </button>
      )}
    </div>
  )
}
