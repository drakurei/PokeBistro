import cn from '../../utils/cn'
import { hourLabel } from '../../utils/schedule'

// A grid of time slots as radios. Unavailable slots stay visible but disabled, with the reason in
// their label so it is read out, not only greyed.
export default function SlotPicker({ name, slots, value, onChange, availability = {}, legend = 'Heure' }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">{legend}</legend>
      {slots.length === 0 ? (
        <p className="text-sm text-ink-soft">Plus de créneau disponible ce jour-là. Essayez un autre jour.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {slots.map((slot) => {
            const full = availability[slot] === 'complet'
            const checked = value === slot
            return (
              <label
                key={slot}
                className={cn(
                  'flex h-11 cursor-pointer items-center justify-center rounded-full border font-mono text-sm transition-colors duration-(--duration-fast)',
                  'has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-lacquer/50',
                  checked ? 'border-ink bg-ink text-porcelain' : 'border-line text-ink hover:border-ink',
                  full && 'cursor-not-allowed border-dashed text-ink-mute line-through hover:border-line',
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={slot}
                  checked={checked}
                  onChange={() => onChange(slot)}
                  disabled={full}
                  className="sr-only"
                />
                {hourLabel(slot)}
                {full && <span className="sr-only"> (complet)</span>}
              </label>
            )
          })}
        </div>
      )}
    </fieldset>
  )
}
