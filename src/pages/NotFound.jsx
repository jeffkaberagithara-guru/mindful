import { Compass, Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-40 h-96 w-96 rounded-blob bg-sage-200/40 blur-2xl dark:bg-sage-300/10"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-7xl font-medium text-forest-300 dark:text-forest-800 sm:text-8xl">
          404
        </p>
        <h1 className="font-display text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl dark:text-sage-50">
          This page has drifted away
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
          You don't need to find your way here. Let's get you back somewhere calm.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button to="/">
            <Home className="h-4 w-4" aria-hidden />
            Back home
          </Button>
          <Button to="/explore" variant="secondary">
            <Compass className="h-4 w-4" aria-hidden />
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}