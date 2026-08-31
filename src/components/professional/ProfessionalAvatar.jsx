import { cn } from '../../lib/cn';

const sizes = {
  sm: 'h-14 w-14',
  md: 'h-20 w-20',
  lg: 'h-28 w-28 sm:h-32 sm:w-32',
  xl: 'h-40 w-40 sm:h-48 sm:w-48',
};

const tones = {
  sage: 'bg-sage-100 text-sage-900',
  forest: 'bg-forest-100 text-forest-800',
  mist: 'bg-mist-100 text-mist-800',
  sand: 'bg-sand-100 text-sand-800',
};

export default function ProfessionalAvatar({
  name,
  size = 'md',
  tone = 'sage',
  className,
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-card',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      <span className="font-display text-3xl font-semibold tracking-tight [font-size:46%]">
        {initials || 'BG'}
      </span>
      <span className="pointer-events-none absolute inset-x-4 bottom-0 h-1/2 rounded-t-full bg-white/30" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 rounded-full bg-white/40" />
    </span>
  );
}
