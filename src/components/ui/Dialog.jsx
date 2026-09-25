import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import cn from '../../utils/cn'

// Accessible modal on top of the native <dialog>: focus trap, Escape, top layer and focus
// restoration come from the platform. React stays in charge of the open state; the entry/exit
// animations are CSS (see dialog[data-variant] in globals.css).
//
// variant: 'center' (product detail) | 'right' (cart) | 'bottom' (mobile filters) | 'full' (mobile menu)
// onClosed fires once the exit transition has actually ended (or right away without transitions).
export default function Dialog({
  open,
  onClose,
  onClosed,
  variant = 'center',
  label,
  labelledBy,
  className,
  children,
}) {
  const ref = useRef(null)
  const lenis = useLenis()
  const closedCallback = useRef(onClosed)
  useEffect(() => {
    closedCallback.current = onClosed
  })

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) {
      dialog.close()
      if (!closedCallback.current) return
      // Wait for the exit transition (opacity / translate) before telling the parent, with a guard
      // for browsers that skip transitions
      let done = false
      const finish = () => {
        if (done) return
        done = true
        dialog.removeEventListener('transitionend', onEnd)
        clearTimeout(guard)
        closedCallback.current?.()
      }
      const onEnd = (event) => {
        if (event.target === dialog) finish()
      }
      dialog.addEventListener('transitionend', onEnd)
      const guard = setTimeout(finish, 600)
      return () => {
        dialog.removeEventListener('transitionend', onEnd)
        clearTimeout(guard)
      }
    }
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
