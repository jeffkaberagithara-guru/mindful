import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Flower2, Moon, Feather } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import OrganicCircle from '../components/ui/OrganicCircle';
import Landscape from '../components/ui/Landscape';
import { getProgramme } from '../data/programmes';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../components/ui/ToastContext';

const ICONS = {
  'calmer-mind': Flower2,
  'sleep-gently': Moon,
  'kind-to-self': Feather,
};

function SessionCard({ session, index, total, done, isOpen, onToggle, onComplete }) {
  return (
    <Card padding="lg" className={done ? 'opacity-75' : undefined}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 text-left"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            done
              ? 'bg-forest-700 text-ivory dark:bg-sage-300 dark:text-forest-950'
              : 'bg-forest-100 text-forest-800 dark:bg-white/10 dark:text-sage-200'
          }`}
        >
          {done ? <Check className="h-4 w-4" aria-hidden /> : index + 1}
        </span>
        <span className="flex-1">
          <span className="block font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
            {session.title}
          </span>
          <span className="block text-xs font-medium text-stone-400 dark:text-stone-500">
            Session {index + 1} of {total}
          </span>
        </span>
        <ArrowRight
          className={`h-4 w-4 shrink-0 text-stone-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-200">
                {session.body}
              </p>
              <div className="mt-5 rounded-soft bg-sage-50/80 p-4 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700 dark:text-sage-400">
                  A practice for now
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                  {session.practice}
                </p>
              </div>
              <div className="mt-5 flex justify-end">
                <Button
                  variant={done ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => onComplete(session.id)}
                >
                  {done ? (
                    <><Check className="h-4 w-4" aria-hidden /> Completed · press to undo</>
                  ) : (
                    <>Mark session done <ArrowRight className="h-3.5 w-3.5" aria-hidden /></>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const programme = getProgramme(slug);
  const toast = useToast();
  const [progress, setProgress] = useLocalStorage('programmeProgress', {});
  const [openSession, setOpenSession] = useState(null);
  const openId = openSession?.slug === slug ? openSession.id : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const done = progress[programme?.slug] || [];
  const doneSet = new Set(done);

  if (!programme) {
    return (
      <section className="px-6 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
          We couldn\u2019t find that programme
        </h1>
        <Link
          to="/programmes"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to programmes
        </Link>
      </section>
    );
  }

  const Icon = ICONS[programme.slug] || Flower2;
  const total = programme.sessions.length;
  const finished = done.length >= total;
  const percent = Math.round((done.length / total) * 100);

  const completeSession = (id) => {
    if (doneSet.has(id)) {
      setProgress({ ...progress, [programme.slug]: done.filter((d) => d !== id) });
      toast.info('Session marked as not done.');
    } else {
      setProgress({ ...progress, [programme.slug]: [...done, id] });
      toast.success('Session complete — small steps are real steps.');
    }
  };

  const resetAll = () => {
    setOpenSession(null);
    setProgress({ ...progress, [programme.slug]: [] });
    toast.info('Programme progress cleared.');
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 opacity-70"
        >
          <OrganicCircle size={340} tone="sage" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-forest-900 dark:text-stone-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Programmes
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-blob bg-sage-100 dark:bg-sage-300/20 sm:inline-flex">
              <Icon className="h-6 w-6 text-forest-800 dark:text-sage-200" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHeader
              eyebrow="Programme"
              as="h1"
              title={programme.title}
              description={programme.description}
            />
          </div>

          <div className="mt-8">
            <ProgressBar value={percent} />
            <div className="mt-2 flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
              <span>{done.length} of {total} sessions done</span>
              {finished && (
                <span className="font-semibold text-forest-700 dark:text-sage-300">
                  You\u2019ve walked the whole path. Join anytime.
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {programme.sessions.map((session, index) => (
              <SessionCard
                key={session.id}
                session={session}
                index={index}
                total={total}
                done={doneSet.has(session.id)}
                isOpen={openId === session.id}
                onToggle={() => setOpenSession(
                  openId === session.id ? null : { slug, id: session.id },
                )}
                onComplete={completeSession}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-md text-sm italic leading-relaxed text-stone-400 dark:text-stone-500">
              A programme is a companion, not treatment. Feeling significantly unwell deserves professional support.
            </p>
            <Button variant="ghost" size="sm" onClick={resetAll}>
              <RotateCcw className="h-4 w-4" aria-hidden /> Clear progress
            </Button>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}