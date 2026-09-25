import cn from '../../utils/cn'

// A big radio rendered as a card: keyboard-operable (native input), announced as a radio, and
// visibly selected without relying on colour alone (a check mark and a bold border).
export default function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  disabled = false,
  badge,
  children,
}) {
  return (
    <label
      className={cn(
        'relative flex cursor-pointer flex-col gap-1 rounded-(--radius-md) border-2 p-5 transition-[border-color,background-color] duration-(--duration-fast)',
        'has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-lacquer/50',
        checked ? 'border-ink bg-washi' : 'border-line bg-porcelain hover:border-ink/40',
        disabled && 'cursor-not-allowed opacity-50 hover:border-line',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="sr-only"
      />
      <span className="flex items-center justify-between gap-3">
        <span className="font-display text-lg font-semibold">{title}</span>
        {badge ? (
          <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-porcelain uppercase">
            {badge}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              'flex size-5 items-center justify-center rounded-full border-2',
              checked ? 'border-ink bg-ink' : 'border-line',
            )}
          >
            {checked && <span className="size-2 rounded-full bg-porcelain" />}
          </span>
        )}
      </span>
      {description && <span className="text-sm text-ink-soft">{description}</span>}
      {children}
    </label>
  )
}
