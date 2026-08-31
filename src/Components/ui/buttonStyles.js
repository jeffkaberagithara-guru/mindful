import { cn } from '../../lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none select-none';

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

const variants = {
  primary: 'bg-forest-800 text-ivory hover:bg-forest-900 shadow-soft hover:shadow-card',
  secondary:
    'bg-white text-forest-800 border border-stone-900/15 hover:border-forest-600 hover:bg-sage-50 dark:bg-forest-900 dark:text-sage-50 dark:border-white/15 dark:hover:bg-forest-800',
  soft: 'bg-forest-100 text-forest-800 hover:bg-forest-200 dark:bg-forest-800 dark:text-sage-100 dark:hover:bg-forest-700',
  ghost: 'text-forest-800 hover:bg-forest-100/70 dark:text-sage-100 dark:hover:bg-white/10',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-soft dark:bg-rose-500 dark:hover:bg-rose-600',
};

export function buttonClass({ variant = 'primary', size = 'md', className } = {}) {
  return cn(base, sizes[size], variants[variant], className);
}