import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import Logo from '../ui/Logo';
import { NAV_ITEMS } from './NavItems';

const SUPPORT_LINKS = [
  { to: '/find-therapist', label: 'Find a therapist' },
  { to: '/professionals/bernadatte-wanjiru-githara', label: 'Meet the founder' },
  { to: '/crisis', label: 'If you\u2019re in crisis' },
  { to: '/settings', label: 'Privacy & data' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-900/8 bg-ivory dark:border-white/10 dark:bg-forest-950">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link to="/" className="inline-block" aria-label="MindShift home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              A calm space for your mental wellbeing — mood check-ins, breathing and grounding
              tools, journaling, psychology articles and guided programmes.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-800 dark:text-sage-300">
              Sections
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-base text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-800 dark:text-sage-300">
              Support
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-base text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-card bg-sage-50 px-5 py-4 dark:bg-sage-300/10">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
            <HeartHandshake className="h-5 w-5" aria-hidden />
          </span>
          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">
            <span className="font-semibold">If you're having thoughts of harming yourself or others,</span>{' '}
            please call <span className="font-semibold">112</span> now and talk to someone.
          </p>
        </div>

        <div className="mt-8 border-t border-stone-900/8 pt-6 text-sm text-stone-500 dark:border-white/10 dark:text-stone-400">
          <p>
            MindShift is a support tool, not a replacement for professional or emergency care.
            Everything you write stays on your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
