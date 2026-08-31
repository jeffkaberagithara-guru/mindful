import { cn } from '../../lib/cn';

export default function Toggle({ checked, onChange, label, description, id }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-4">
      <span>
        <span className="block text-base font-medium text-forest-950 dark:text-sage-100">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-stone-500 dark:text-stone-400">{description}</span>
        ) : null}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/40 focus-visible:ring-offset-2',
          checked ? 'bg-forest-700 dark:bg-sage-500' : 'bg-stone-900/15 dark:bg-white/15',
        )}
      >
        <span
          className={cn(
            'absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-soft transition-transform duration-300',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </label>
  );
}