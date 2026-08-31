import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';

const fieldBase = [
  'w-full rounded-soft border border-transparent bg-ivory-deep px-4 py-3 text-base text-forest-950',
  'placeholder:text-stone-400 dark:bg-forest-900 dark:text-sage-50 dark:placeholder:text-stone-500',
  'border-stone-900/10 focus:border-forest-600 focus:bg-white focus:ring-2 focus:ring-forest-600/30',
  'dark:border-white/10 dark:focus:bg-forest-800',
  'transition-colors duration-200',
  'disabled:opacity-50 disabled:pointer-events-none',
].join(' ');

function FieldLabel({ id, label, hint, required }) {
  if (!label) return null;
  return (
    <div className="mb-1.5 flex items-baseline justify-between">
      <label htmlFor={id} className="text-sm font-medium text-forest-950 dark:text-sage-100">
        {label}
        {required ? <span className="text-peach-600"> *</span> : null}
      </label>
      {hint ? (
        <span className="text-xs text-stone-400 dark:text-stone-500">{hint}</span>
      ) : null}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { label, hint, required, error, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={className}>
      <FieldLabel id={inputId} label={label} hint={hint} required={required} />
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30')}
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">{error}</p> : null}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, hint, required, error, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={className}>
      <FieldLabel id={inputId} label={label} hint={hint} required={required} />
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, 'resize-none leading-relaxed', error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30')}
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">{error}</p> : null}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, hint, required, error, className, id, children, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={className}>
      <FieldLabel id={inputId} label={label} hint={hint} required={required} />
      <select
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(
          fieldBase,
          'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%23436757%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m5 7 3 3 3-3%27/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10',
          error && 'border-rose-500',
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="mt-1 text-sm text-rose-700 dark:text-rose-300">{error}</p> : null}
    </div>
  );
});