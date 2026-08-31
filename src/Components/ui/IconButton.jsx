import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const tones = {
  neutral: 'text-stone-600 hover:bg-stone-900/5 dark:text-sage-100 dark:hover:bg-white/10',
  forest: 'text-forest-700 hover:bg-forest-100/80 dark:text-sage-100 dark:hover:bg-forest-800',
  dust: 'text-mist-700 hover:bg-mist-100/80 dark:text-mist-200 dark:hover:bg-mist-800',
  danger: 'text-rose-600 hover:bg-rose-50/80 dark:text-rose-400 dark:hover:bg-rose-400/10',
};

const sizes = {
  sm: 'p-2',
  md: 'p-3',
};

const IconButton = forwardRef(function IconButton(
  { tone = 'neutral', size = 'md', label, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-forest-600/40 focus:ring-offset-2',
        'active:scale-90',
        tones[tone],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default IconButton;