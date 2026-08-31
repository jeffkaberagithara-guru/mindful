import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

const tones = {
  neutral:
    'border-stone-900/15 text-stone-700 hover:border-forest-600 hover:text-forest-800 dark:border-white/20 dark:text-sage-100 dark:hover:border-sage-400',
  selected:
    'border-forest-800 bg-forest-800 text-ivory dark:border-sage-400 dark:bg-sage-500 dark:text-forest-950',
  soft: 'border-transparent bg-ivory-deep text-stone-700 hover:bg-sage-100 dark:bg-forest-900 dark:text-sage-100 dark:hover:bg-forest-800',
};

export default function Chip({ selected, tone, size = 'md', className, children, ...props }) {
  const activeTone = selected ? 'selected' : tone || 'neutral';
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/40 focus-visible:ring-offset-2',
        'active:scale-[0.97]',
        size === 'md' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs',
        tones[activeTone],
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </button>
  );
}