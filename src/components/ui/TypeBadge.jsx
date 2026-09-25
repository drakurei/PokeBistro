import { getType } from '../../data/types'
import cn from '../../utils/cn'
import TypeIcon from './TypeIcon'

// Glyph + name of a type ("⚡ ÉLECTRIK"): the glyph carries the type colour, the name stays readable
// without it.
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
      <TypeIcon typeId={typeId} size={size === 'sm' ? 14 : 16} style={{ color: type.color }} />
      <span>
        <span className="sr-only">Type </span>
        {type.label}
      </span>
    </span>
  )
}
