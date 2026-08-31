import { cn } from '../../lib/cn';

const tones = {
  neutral: 'bg-stone-900/6 text-stone-700 dark:bg-white/10 dark:text-sage-100',
  forest: 'bg-forest-100 text-forest-700 dark:bg-forest-800 dark:text-sage-100',
  sage: 'bg-sage-100 text-sage-800 dark:bg-sage-800 dark:text-sage-50',
  mist: 'bg-mist-100 text-mist-800 dark:bg-mist-800 dark:text-mist-50',
  sand: 'bg-sand-100 text-sand-800 dark:bg-sand-800 dark:text-sand-50',
  lilac: 'bg-lilac-100 text-lilac-800 dark:bg-lilac-800 dark:text-lilac-50',
  peach: 'bg-peach-100 text-peach-800 dark:bg-peach-800 dark:text-peach-50',
};

const sizes = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ tone = 'forest', size = 'sm', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium tracking-wide whitespace-nowrap',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}