import { cn } from '../../lib/cn';

export default function Logo({ withWordmark = true, dark = false, markSize = 36, className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M32 5c15.4 0 27 10.4 27 24.5 0 15.6-11.6 29.5-27 29.5S5 45.1 5 29.5C5 15.4 16.6 5 32 5z"
          fill={dark ? '#789d8b' : '#2e453b'}
        />
        <path
          d="M32 14c9.4 0 16 6.3 16 14.8 0 9.3-6.8 17.2-16 17.2s-16-7.9-16-17.2C16 20.3 22.6 14 32 14z"
          fill={dark ? '#a3bdb0' : '#789d8b'}
        />
        <path
          d="M32 20c-3.6 0-6 2.2-6 6 0 2 .9 3.4 2.4 4.4"
          stroke={dark ? '#d3e2cc' : '#d3e2cc'}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            'font-display text-2xl font-medium tracking-tight',
            dark ? 'text-sage-50' : 'text-forest-950',
          )}
        >
          MindShift
        </span>
      )}
    </span>
  );
}