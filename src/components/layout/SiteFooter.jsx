import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { NAV_ITEMS } from './NavItems';

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-900/8 bg-ivory px-6 py-10 lg:px-10 dark:border-white/10 dark:bg-forest-950">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="inline-block" aria-label="MindShift home">
          <Logo />
        </Link>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          MindShift* is a calm space for your mental wellbeing — tools, learning and reflection,
          built with care. It is a support tool, not a replacement for professional or emergency
          care.
        </p>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/find-therapist"
              className="text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
            >
              Find a therapist
            </Link>
            <Link
              to="/crisis"
              className="text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
            >
              If you're in crisis
            </Link>
            <Link
              to="/settings"
              className="text-stone-600 transition-colors hover:text-forest-900 dark:text-stone-300 dark:hover:text-white"
            >
              Privacy & data
            </Link>
          </nav>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            *If you're having thoughts of harming yourself or others, please call 112 now and talk
            to someone.
          </p>
        </div>
      </div>
    </footer>
  );
}