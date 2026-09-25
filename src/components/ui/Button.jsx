import { Link } from 'react-router'
import cn from '../../utils/cn'
import { IconSpinner } from './Icons'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,box-shadow] duration-(--duration-base) ease-(--ease-out) ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'

const variants = {
  solid: 'bg-lacquer text-porcelain hover:bg-lacquer-deep shadow-[0_10px_30px_-12px_rgb(201_33_27_/_0.6)]',
  dark: 'bg-ink text-porcelain hover:bg-ink-soft',
  outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-porcelain',
  ghost: 'text-ink hover:bg-ink/6',
  light: 'bg-porcelain text-ink hover:bg-washi',
  lightOutline: 'border-2 border-porcelain/70 text-porcelain hover:bg-porcelain hover:text-ink',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-base',
}

// The one button of the site. Renders a <Link> when `to` is given, an <a> when `href` is given.
export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  loading = false,
  className,
  to,
  href,
  type = 'button',
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <IconSpinner size={18} />}
      {children}
    </button>
  )
}

const iconSizes = { sm: 'size-10', md: 'size-11', lg: 'size-14' }

// Icon-only button: the label is mandatory and read by assistive tech, shown as a tooltip on hover.
export function IconButton({ label, children, variant = 'ghost', size = 'md', className, to, ...props }) {
  const classes = cn(base, variants[variant], iconSizes[size], 'px-0', className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label} title={label} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} aria-label={label} title={label} {...props}>
      {children}
    </button>
  )
}
