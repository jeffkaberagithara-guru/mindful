import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export default function ProgressDots({ steps, current, className }) {
  const count = Array.isArray(steps) ? steps.length : steps;
  return (
    <div className={cn('flex items-center gap-2', className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className={cn(
            'rounded-full transition-colors duration-300',
            i <= current ? 'bg-forest-700 dark:bg-sage-400' : 'bg-stone-900/15 dark:bg-white/15',
            i === current ? 'h-2.5 w-2.5' : 'h-2 w-2',
          )}
          animate={i === current ? { scale: [1, 1.15, 1] } : undefined}
          transition={{ duration: 0.9, repeat: i === current ? Infinity : 0, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}