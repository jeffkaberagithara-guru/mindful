import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { ToastContext } from './ToastContext';
import { cn } from '../../lib/cn';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const tones = {
  success: 'border-sage-300 text-forest-900 dark:border-sage-700 dark:text-sage-50',
  error: 'border-peach-300 text-forest-900 dark:border-peach-800',
  info: 'border-mist-300 text-forest-900 dark:border-mist-700 dark:text-sage-50',
};

const badgeTones = {
  success: 'text-sage-600 dark:text-sage-400',
  error: 'text-peach-600 dark:text-peach-400',
  info: 'text-mist-600 dark:text-mist-300',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, { type = 'info', duration = 4000 } = {}) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      success: (m, o) => notify(m, { ...o, type: 'success' }),
      error: (m, o) => notify(m, { ...o, type: 'error' }),
      info: (m, o) => notify(m, { ...o, type: 'info' }),
    }),
    [notify],
  );

  const mount = typeof document === 'undefined' ? null : document.body;

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mount &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 top-4 z-[90] flex flex-col items-center gap-2 px-4">
          <AnimatePresence>
            {toasts.map((toast) => {
              const Icon = icons[toast.type];
              return (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, y: -16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className={cn(
                    'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-card border bg-white/95 px-4 py-3 shadow-float backdrop-blur-sm dark:bg-forest-800/95',
                    tones[toast.type],
                  )}
                  role="status"
                >
                  <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', badgeTones[toast.type])} />
                  <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => dismiss(toast.id)}
                    className="shrink-0 rounded-full p-1 text-current/60 hover:bg-black/5 hover:text-current dark:hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>,
        mount,
      )}
    </ToastContext.Provider>
  );
}