import { getType } from '../../data/types'

// Original glyphs for the eleven types, drawn in the site's icon language (24 grid, 1.75 stroke,
// round joins). They borrow an idea from each type, never an official mark: a bolt, a flame, a drop,
// a leaf, a full plate, a fist, a spiral, a sheet ghost, a four-point star, a snowflake, a feather.
const GLYPHS = {
  bolt: <path d="M13 3 5 13.5h6L10 21l9-11h-6l1-7Z" />,
  flame: (
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-3 2-5 3.5-7 .5 1.5 1.5 2.5 2.5 3 0-3 1-6 4-8 0 3 1.5 4.5 2.5 6 1 1.5 1.5 3 1.5 5 0 4-3 7-7.5 7Z" />
  ),
  drop: <path d="M12 3.5c-3 4.2-6 7.3-6 10.8a6 6 0 0 0 12 0c0-3.5-3-6.6-6-10.8Z" />,
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
      <path d="M5 19c3-4 6-7 10-10" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  fist: (
    <>
      <path d="M6 13V9.5A2.5 2.5 0 0 1 8.5 7H9V5.5a1.5 1.5 0 0 1 3 0V7h1V5a1.5 1.5 0 0 1 3 0v2.5A2.5 2.5 0 0 1 18.5 10v3c0 4-2.8 7-6.5 7S6 17 6 13Z" />
      <path d="M9 11v3M12 11v3M15 11v3" />
    </>
  ),
  spiral: (
    <path d="M12 12a1.5 1.5 0 0 1 1.5 1.5 3 3 0 0 1-3 3 4.5 4.5 0 0 1-4.5-4.5A6 6 0 0 1 12 6a7.5 7.5 0 0 1 7.5 7.5" />
  ),
  ghost: (
    <>
      <path d="M6 20.5V11a6 6 0 0 1 12 0v9.5l-3-2-3 2-3-2-3 2Z" />
      <circle cx="9.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  star: <path d="M12 3c.7 4.2 2.6 6.6 8 9-5.4 2.4-7.3 4.8-8 9-.7-4.2-2.6-6.6-8-9 5.4-2.4 7.3-4.8 8-9Z" />,
  snowflake: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      <path d="M12 3l-2.5 1.5M12 3l2.5 1.5M12 21l-2.5-1.5M12 21l2.5-1.5" />
    </>
  ),
  feather: (
    <>
      <path d="M20 4c-6.5.3-11 4.4-13 10.5L5 20l5.5-2C16.5 16 20.3 11 20 4Z" />
      <path d="M8 16l7-7" />
    </>
  ),
}

// Decorative by default: the type name is always written next to it.
export default function TypeIcon({ typeId, size = 16, className, style, title }) {
  const type = getType(typeId)
  const glyph = type && GLYPHS[type.icon]
  if (!glyph) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      className={className}
      style={style}
    >
      {title && <title>{title}</title>}
      {glyph}
    </svg>
  )
}
