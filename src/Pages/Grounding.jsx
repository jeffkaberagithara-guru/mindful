import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Eye, Hand, Ear, Wind, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import ProgressDots from '../components/ui/ProgressDots';
import Landscape from '../components/ui/Landscape';

const STEPS = [
  {
    icon: Eye,
    label: 'See',
    count: 5,
    title: 'Look around you',
    instruction: 'Name five things you can see — a lamp, a book, the grain in the wood. Say them quietly, or simply notice them.',
  },
  {
    icon: Hand,
    label: 'Touch',
    count: 4,
    title: 'Feel what is close',
    instruction: 'Notice four things you can touch. Their texture, warmth, pressure — the collar of your shirt, the arm of your chair.',
  },
  {
    icon: Ear,
    label: 'Listen',
    count: 3,
    title: 'Tune your hearing',
    instruction: 'Find three sounds — near or far. The hum of a distant kitchen, your own breathing, rain outside.',
  },
  {
    icon: Wind,
    label: 'Smell',
    count: 2,
    title: 'Breathe in faintly',
    instruction: 'Notice two smells in the air. Clean laundry, coffee, the air after rain. If nothing stands out, that’s an answer too.',
  },
  {
    icon: Utensils,
    label: 'Taste',
    count: 1,
    title: 'Come back home',
    instruction: 'Find one thing you can taste — the last of your tea, mint, or simply the feel of your own tongue against your palate.',
  },
];

export default function Grounding() {
  const [current, setCurrent] = useState(null); // null = intro, 0..4 = steps, 5 = done
  const isRunning = current !== null;

  const step = isRunning && current < STEPS.length ? STEPS[current] : null;

  const start = () => setCurrent(0);
  const next = () => {
    if (current === STEPS.length - 1) {
      setCurrent(STEPS.length);
    } else {
      setCurrent((c) => c + 1);
    }
  };
  const restart = () => setCurrent(0);

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-forest-900 dark:text-stone-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All tools
          </Link>

          <div className="mt-6">
            <SectionHeader
              eyebrow="Tool · Grounding"
              as="h1"
              title="Come back to your body"
              description="The 5 · 4 · 3 · 2 · 1 grounding exercise — a gentle, private walk through your senses to bring you back into the present moment."
            />
          </div>

          <Card padding="lg" className="mt-8 shadow-card">
            <AnimatePresence mode="wait">
              {current === null && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-center"
                >
                  <div
                    aria-hidden
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-blob bg-sage-100 dark:bg-sage-300/20"
                  >
                    <span className="font-display text-3xl font-semibold text-forest-800 dark:text-sage-200">
                      5 · 4 · 3 · 2 · 1
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                    Five steps, five senses
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-300">
                    We'll move slowly, one sense at a time. Nothing is recorded, nothing is judged —
                    this is only for you. Take each step at whatever pace feels right.
                  </p>
                  <Button onClick={start} className="mt-7">
                    Begin the walk <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </motion.div>
              )}

              {current !== null && current < STEPS.length && step && (
                <motion.div
                  key={`step-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sage-700 dark:text-sage-400">
                      <step.icon className="h-4 w-4" aria-hidden /> {step.label}
                    </span>
                    <span className="font-display text-6xl font-medium tabular-nums text-forest-100 dark:text-forest-800" aria-hidden>
                      {step.count}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-950 dark:text-sage-50">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                    {step.instruction}
                  </p>

                  <ProgressDots steps={STEPS.length} current={current} className="mt-8" />

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Button variant="ghost" onClick={restart} aria-label="Restart grounding exercise">
                      <RotateCcw className="h-4 w-4" aria-hidden /> Start over
                    </Button>
                    <Button onClick={next}>
                      {current === STEPS.length - 1 ? 'I’m here' : 'Next sense'}{' '}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              )}

              {current === STEPS.length && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-center"
                >
                  <div
                    aria-hidden
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-blob bg-sage-100 dark:bg-sage-300/20"
                  >
                    <Ear className="h-9 w-9 text-forest-800 dark:text-sage-200" strokeWidth={1.75} />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                    You came back to the present
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-stone-600 dark:text-stone-300">
                    That's the whole walk. Notice how your shoulders or your breathing feel right
                    now — that difference is data too.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Button onClick={restart}>
                      Walk it again <RotateCcw className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button to="/tools/breathing" variant="soft">
                      Now try breathing <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm italic leading-relaxed text-stone-500 dark:text-stone-400">
            Nothing from this exercise is stored — it lives only in the moment you just spent with
            yourself.
          </p>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}