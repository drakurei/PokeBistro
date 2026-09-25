import cn from '../../utils/cn'

// Toggle chip used by every filter (categories, types, tags) and by the tags on a product.
// `color` adds a dot (Pokémon type), `count` a small counter. Active state is announced with aria-pressed.
export default function Chip({ active = false, color, count, children, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-medium',
        'transition-[background-color,color,border-color] duration-(--duration-fast) ease-(--ease-out)',
        active
          ? 'border-ink bg-ink text-porcelain'
          : 'border-line bg-porcelain text-ink-soft hover:border-ink hover:text-ink',
        className,
      )}
      {...props}
    >
      {color && (
        <span
          aria-hidden="true"
          className={cn('size-2.5 shrink-0 rounded-full', active && 'ring-2 ring-porcelain/60')}
          style={{ backgroundColor: color }}
        />
      )}
      {children}
      {count !== undefined && (
        <span
          className={cn(
            'rounded-full px-1.5 py-0.5 font-mono text-[11px] leading-none',
            active ? 'bg-porcelain/15 text-porcelain' : 'bg-washi text-ink-mute',
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
