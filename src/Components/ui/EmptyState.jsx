import { cn } from '../../lib/cn';

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-stone-900/15 px-6 py-16 text-center dark:border-white/15',
        className,
      )}
    >
      {icon ? (
        <div className="mb-2 text-forest-700/70 dark:text-sage-400">{icon}</div>
      ) : null}
      <h3 className="text-xl text-forest-950 dark:text-sage-50">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}