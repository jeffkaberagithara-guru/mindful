import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export default function BottomSheet({ isOpen, onClose, title, className, children }) {
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
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-forest-950/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className={cn(
              'absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-blob bg-white p-6 pb-8 shadow-float dark:bg-forest-900',
              className,
            )}
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-stone-900/15 dark:bg-white/15" />
            {title ? (
              <h2 className="mb-4 text-2xl leading-snug text-forest-950 dark:text-sage-50">{title}</h2>
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