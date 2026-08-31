import { cn } from '../../lib/cn';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700 dark:text-sage-400">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl sm:text-4xl leading-[1.15] text-forest-950 dark:text-sage-50">
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}