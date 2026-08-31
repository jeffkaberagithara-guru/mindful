import { useEffect, useState } from 'react';
import { Link, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import Logo from '../ui/Logo';
import CrisisModal from '../CrisisModal';
import { NAV_ITEMS, isNavActive } from './NavItems';
import SiteFooter from './SiteFooter';
import { cn } from '../../lib/cn';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
};

export default function RootLayout({ routes }) {
  const location = useLocation();
  const [crisisOpen, setCrisisOpen] = useState(false);
  const openCrisis = () => setCrisisOpen(true);

  return (
    <div className="min-h-dvh overflow-x-clip bg-ivory text-stone-800 dark:bg-forest-950 dark:text-stone-200">
      <ScrollToTop />

      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-stone-900/8 bg-ivory lg:flex dark:border-white/10 dark:bg-forest-950"
        aria-label="Primary"
      >
        <div className="px-6 pb-2 pt-7">
          <Link to="/" aria-label="MindShift home" className="inline-block">
            <Logo />
          </Link>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3" aria-label="Sections">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(location.pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-soft px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white'
                    : 'text-stone-600 hover:bg-forest-800/5 hover:text-forest-900 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={openCrisis}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-sand px-4 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-sand-300 dark:bg-sand-200 dark:hover:bg-sand-100"
          >
            <HeartHandshake className="h-4 w-4" />
            Need help right now?
          </button>
          <p className="text-center text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            If you're in danger of harming yourself or someone else, call 112 or go to your nearest
            emergency room.
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-stone-900/8 bg-ivory/85 px-4 backdrop-blur-sm lg:hidden dark:border-white/10 dark:bg-forest-950/85">
        <Link to="/" aria-label="MindShift home" className="inline-flex items-center gap-2">
          <Logo withWordmark={false} markSize={30} />
          <span className="font-display text-lg font-semibold tracking-tight text-forest-900 dark:text-ivory">
            Mind<span className="text-forest-600 dark:text-sage-300">Shift</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={openCrisis}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-900/10 px-3 py-1.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-900/5 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
        >
          <HeartHandshake className="h-3.5 w-3.5 text-forest-600 dark:text-sage-300" />
          Need help?
        </button>
      </header>

      <div className="pb-28 lg:pb-0 lg:pl-64">
        <main className="min-h-[calc(100dvh-20rem)] lg:min-h-dvh">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} {...pageMotion}>
              <Routes location={location}>{routes}</Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <SiteFooter />
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-900/10 bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden dark:border-white/10 dark:bg-forest-950/95"
        aria-label="Bottom navigation"
      >
        <div className="mx-auto flex max-w-md items-stretch">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(location.pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className="flex flex-1 flex-col items-center gap-1 py-2.5"
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    active ? 'text-forest-700 dark:text-sage-300' : 'text-stone-500 dark:text-stone-400'
                  )}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span
                  className={cn(
                    'text-[11px] leading-none transition-colors',
                    active ? 'font-semibold text-forest-800 dark:text-sage-200' : 'text-stone-500 dark:text-stone-400'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <CrisisModal isOpen={crisisOpen} onClose={() => setCrisisOpen(false)} />
    </div>
  );
}