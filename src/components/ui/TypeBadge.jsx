import { getType } from '../../data/types'
import cn from '../../utils/cn'

// "● FEU" — the small type label shown on cards and in the product detail
export default function TypeBadge({ typeId, size = 'sm', className }) {
  const type = getType(typeId)
  if (!type) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-ink-mute',
        size === 'sm' ? 'text-[11px]' : 'text-xs',
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: type.color }} />
      <span>
        <span className="sr-only">Type </span>
        {type.label}
      </span>
    </span>
  )
}
