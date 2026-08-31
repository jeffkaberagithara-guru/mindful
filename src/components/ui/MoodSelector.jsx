import { Sun, Smile, Meh, Frown, Moon } from 'lucide-react';
import { cn } from '../../lib/cn';

const LEVELS = [
  { value: 5, label: 'Bright', icon: Sun, chip: 'bg-peach-500', hover: 'hover:border-peach-400 hover:text-peach-600' },
  { value: 4, label: 'Good', icon: Smile, chip: 'bg-sage-500', hover: 'hover:border-sage-400 hover:text-sage-600' },
  { value: 3, label: 'Okay', icon: Meh, chip: 'bg-sand-400', hover: 'hover:border-sand-300 hover:text-sand-600' },
  { value: 2, label: 'Low', icon: Frown, chip: 'bg-mist-500', hover: 'hover:border-mist-400 hover:text-mist-600' },
  { value: 1, label: 'Very low', icon: Moon, chip: 'bg-lilac-500', hover: 'hover:border-lilac-400 hover:text-lilac-600' },
];

export default function MoodSelector({ value, onChange, size = 'md' }) {
  const circleSize = size === 'lg' ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-12 w-12 sm:h-14 sm:w-14';
  const iconSize = size === 'lg' ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-5 w-5 sm:h-6 sm:w-6';

  return (
    <div
      role="radiogroup"
      aria-label="How are you feeling"
      className="flex items-stretch justify-between gap-1.5 sm:gap-3"
    >
      {LEVELS.map((level) => {
        const Icon = level.icon;
        const selected = value === level.value;
        return (
          <button
            key={level.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(level.value)}
            className={cn(
              'group flex min-w-0 flex-1 flex-col items-center gap-2 rounded-soft',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/40 focus-visible:ring-offset-2',
            )}
          >
            <span
              className={cn(
                'flex items-center justify-center rounded-full border transition-all duration-300',
                circleSize,
                selected
                  ? cn(level.chip, 'scale-105 border-transparent text-white shadow-card')
                  : cn(
                      'border-stone-900/10 bg-white text-stone-500 dark:border-white/15 dark:bg-forest-900 dark:text-stone-400',
                      level.hover,
                    ),
              )}
            >
              <Icon className={iconSize} strokeWidth={selected ? 1.75 : 1.5} aria-hidden />
            </span>
            <span
              className={cn(
                'text-xs font-medium transition-colors duration-200 sm:text-sm',
                selected ? 'text-forest-800 dark:text-sage-200' : 'text-stone-500 dark:text-stone-400',
              )}
            >
              {level.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}