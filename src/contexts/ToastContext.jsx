import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import cn from '../utils/cn'
import { IconCheck, IconInfo } from '../components/ui/Icons'

const ToastContext = createContext(null)
const DURATION = 3500

// Small, polite notifications ("Ajouté au panier"). They never take the focus.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
  }, [])

  const show = useCallback(
    ({ title, description = '', tone = 'success' }) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current.slice(-2), { id, title, description, tone }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), DURATION),
      )
    },
    [dismiss],
  )

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => clearTimeout(timer))
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex max-w-sm items-center gap-3 rounded-full bg-ink px-4 py-3 text-porcelain shadow-float-lg',
              'animate-[toast-in_300ms_var(--ease-out)]',
            )}
          >
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full',
                toast.tone === 'success' ? 'bg-gold text-ink' : 'bg-porcelain/15 text-porcelain',
              )}
            >
              {toast.tone === 'success' ? <IconCheck size={16} /> : <IconInfo size={16} />}
            </span>
            <span className="text-sm">
              <strong className="font-bold">{toast.title}</strong>
              {toast.description && <span className="text-porcelain/70"> · {toast.description}</span>}
            </span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="ml-1 rounded-full px-2 text-xs text-porcelain/60 hover:text-porcelain"
              aria-label="Fermer la notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components -- provider and hook belong together
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
