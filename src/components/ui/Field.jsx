import cn from '../../utils/cn'

import { controlClass } from './formStyles'

// A labelled form control with optional hint and error. The error is linked with aria-describedby
// and announced immediately (role=alert) when it appears.
export default function Field({
  id,
  label,
  hint,
  error,
  required,
  as = 'input',
  className,
  children,
  ...props
}) {
  const Control = as
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required && (
          <span className="text-lacquer" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children ?? (
        <Control
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlClass, as === 'textarea' && 'min-h-32 resize-y')}
          {...props}
        />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-ink-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
