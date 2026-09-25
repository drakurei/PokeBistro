import cn from '../../utils/cn'
import { IconCheck } from '../ui/Icons'

// oxlint-disable-next-line react/only-export-components -- the steps and their indicator belong together
export const ORDER_STEPS = [
  { id: 'mode', label: 'Mode' },
  { id: 'slot', label: 'Créneau' },
  { id: 'details', label: 'Coordonnées' },
  { id: 'summary', label: 'Récapitulatif' },
]

// Where we are in the order: done steps are ticked, the current one is announced with aria-current
export default function StepIndicator({ current }) {
  const index = ORDER_STEPS.findIndex((step) => step.id === current)
  return (
    <ol
      className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.12em] uppercase"
      aria-label="Étapes de la commande"
    >
      {ORDER_STEPS.map((step, position) => {
        const done = position < index
        const active = position === index
        return (
          <li
            key={step.id}
            aria-current={active ? 'step' : undefined}
            className={cn(
              'flex items-center gap-2',
              active ? 'text-ink' : done ? 'text-success' : 'text-ink-mute',
            )}
          >
            <span
              className={cn(
                'flex size-6 items-center justify-center rounded-full border text-[11px]',
                active
                  ? 'border-ink bg-ink text-porcelain'
                  : done
                    ? 'border-success bg-success text-porcelain'
                    : 'border-line',
              )}
              aria-hidden="true"
            >
              {done ? <IconCheck size={12} /> : position + 1}
            </span>
            {step.label}
          </li>
        )
      })}
    </ol>
  )
}
