import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export default function ProgressBar({ value, className, trackClassName }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-stone-900/15 dark:bg-white/15', trackClassName)}
    >
      <motion.div
        className={cn('h-full rounded-full bg-sage-500 dark:bg-sage-400', className)}
        initial={false}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 24 }}
      />
    </div>
  );
}