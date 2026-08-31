import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import IconButton from './IconButton';

export default function Modal({ isOpen, onClose, title, size = 'md', children, className }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const mount = typeof document === 'undefined' ? null : document.body;

  return mount
    ? createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-forest-950/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className={cn(
              'relative w-full rounded-t-blob bg-white shadow-float sm:rounded-card dark:bg-forest-900',
              size === 'sm' && 'max-w-sm',
              size === 'md' && 'max-w-lg',
              size === 'lg' && 'max-w-2xl',
              'max-h-[88dvh] overflow-y-auto p-6 sm:p-8',
              className,
            )}
          >
            <IconButton
              onClick={onClose}
              label="Close dialog"
              tone="neutral"
              size="sm"
              className="absolute top-4 right-4"
            >
              <X className="h-5 w-5" />
            </IconButton>
            {title ? (
              <h2 className="pr-10 text-2xl leading-snug text-forest-950 dark:text-sage-50 sm:text-3xl">
                {title}
              </h2>
            ) : null}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    mount,
  )
    : null;
}