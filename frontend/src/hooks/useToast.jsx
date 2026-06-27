import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@/components/ui/toast'

const ToastContext = createContext(null)

let toastId = 0

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, title, description, variant, open: true }])
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    )
  }, [])

  useEffect(() => {
    const timers = toasts
      .filter((t) => t.open)
      .map((t) => setTimeout(() => dismiss(t.id), 4000))
    return () => timers.forEach(clearTimeout)
  }, [toasts, dismiss])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {toasts.map(({ id, title, description, variant, open }) => (
          <Toast
            key={id}
            open={open}
            onOpenChange={(isOpen) => !isOpen && dismiss(id)}
            className={
              variant === 'success'
                ? 'border-emerald-500/30'
                : variant === 'error'
                  ? 'border-red-500/30'
                  : ''
            }
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastContextProvider')
  }
  return context
}
