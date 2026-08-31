import { Link } from 'react-router-dom';
import { ArrowRight, Flower2, Moon, Feather, HeartHandshake } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Landscape from '../components/ui/Landscape';
import { PROGRAMMES } from '../data/programmes';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/cn';

const ICONS = {
  'calmer-mind': Flower2,
  'sleep-gently': Moon,
  'kind-to-self': Feather,
};

export default function Programmes() {
  const [progress] = useLocalStorage('programmeProgress', {});
  const totalSessions = PROGRAMMES.reduce((sum, p) => sum + p.sessions.length, 0);
  const doneTotal = PROGRAMMES.reduce(
    (sum, p) => sum + (progress[p.slug]?.length || 0),
    0,
  );

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Programmes"
            as="h1"
            title="Change, one gentle session at a time"
            description="Structured series with real content and small practices \u2014 companions for a calmer mind, kinder sleep, and a softer inner voice. They\u2019re guides, not cures, and always by your side, never over you."
          />

          {doneTotal > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-ivory dark:bg-forest-700 dark:text-white">
                <HeartHandshake className="h-4 w-4" aria-hidden />
                {doneTotal} of {totalSessions} sessions completed across all programmes
              </span>
            </div>
          )}

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROGRAMMES.map((programme) => {
              const Icon = ICONS[programme.slug] || Flower2;
              const done = progress[programme.slug]?.length || 0;
              const total = programme.sessions.length;
              const started = done > 0;
              const finished = done >= total;
              return (
                <Link
                  key={programme.slug}
                  to={`/programmes/${programme.slug}`}
                  className="group flex flex-col"
                >
                  <Card padding="lg" className="flex h-full flex-col transition-shadow hover:shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-forest-950 dark:text-sage-50">
                      {programme.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                      {programme.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="h-1.5 w-full rounded-full bg-stone-900/8 dark:bg-white/10">
                        <div
                          className={cn(
                            'h-1.5 rounded-full transition-all',
                            finished ? 'bg-forest-700 dark:bg-sage-300' : 'bg-sage-400',
                          )}
                          style={{ width: `${(done / total) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm font-medium text-stone-500 dark:text-stone-400">
                        <span>
                          {started
                            ? `${done} of ${total} sessions`
                            : `${total} sessions`}
                        </span>
                        {finished ? (
                          <span className="font-semibold text-forest-700 dark:text-sage-300">
                            Finished · join anytime
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-forest-700 transition-transform group-hover:translate-x-0.5 dark:text-sage-300">
                            {started ? 'Continue' : 'Begin'} <ArrowRight className="h-3 w-3" aria-hidden />
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}