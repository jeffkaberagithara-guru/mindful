import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const surfaces = {
  default:
    'rounded-card bg-white border border-stone-900/5 shadow-soft dark:bg-forest-900 dark:border-white/10 dark:shadow-none',
  subdued: 'rounded-card bg-ivory-deep border border-stone-900/5 dark:bg-forest-900/60 dark:border-white/5',
  tinted: 'rounded-card bg-sage-50 border border-sage-200/60 dark:bg-forest-900 dark:border-white/10',
  forest:
    'rounded-card bg-forest-800 text-ivory dark:bg-forest-900 dark:text-sage-50 shadow-card dark:shadow-none',
  hover:
    'rounded-card bg-white border border-stone-900/5 shadow-soft hover:shadow-card hover:-translate-y-0.5 dark:bg-forest-900 dark:border-white/10 dark:hover:bg-forest-800',
  flat: 'rounded-card border border-stone-900/10 dark:border-white/10',
};

const paddings = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

const Card = forwardRef(function Card(
  { surface = 'default', padding = 'md', className, as: Tag = 'div', ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-300',
        surfaces[surface],
        paddings[padding],
        className,
      )}
      {...props}
    />
  );
});

export default Card;