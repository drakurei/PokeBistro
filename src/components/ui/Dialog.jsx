import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import cn from '../../utils/cn'

// Accessible modal on top of the native <dialog>: focus trap, Escape, top layer and focus
// restoration come from the platform. React stays in charge of the open state; the entry/exit
// animations are CSS (see dialog[data-variant] in globals.css).
//
// variant: 'center' (product detail) | 'right' (cart) | 'bottom' (mobile filters) | 'full' (mobile menu)
export default function Dialog({
  open,
  onClose,
  variant = 'center',
  label,
  labelledBy,
  className,
  children,
}) {
  const ref = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  // Smooth scroll is paused while a modal is open (the page behind must not move)
  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
    return () => lenis.start()
  }, [open, lenis])

  const handleCancel = (event) => {
    // Escape: keep React as the source of truth instead of letting the browser close the element
    event.preventDefault()
    onClose()
  }

  const handleClick = (event) => {
    // A click on the backdrop lands on the <dialog> element itself, not on its content
    if (event.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      data-variant={variant}
      aria-label={label}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
      className={cn('outline-none', className)}
    >
      {children}
    </dialog>
  )
}
