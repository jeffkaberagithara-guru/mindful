import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import OrganicCircle from '../components/ui/OrganicCircle';
import Landscape from '../components/ui/Landscape';

const PATTERNS = [
  {
    id: 'box',
    name: 'Box',
    short: '4 · 4 · 4 · 4',
    desc: 'Equal in, hold, out, hold — the classic settling rhythm.',
    phases: [
      { k: 'IN', label: 'Breathe in', sec: 4 },
      { k: 'HOLD', label: 'Hold', sec: 4 },
      { k: 'OUT', label: 'Breathe out', sec: 4 },
      { k: 'HOLD', label: 'Hold', sec: 4 },
    ],
  },
  {
    id: 'calm',
    name: 'Calm',
    short: '4 · 7 · 8',
    desc: 'A long, gentle exhale pattern for when the mind races.',
    phases: [
      { k: 'IN', label: 'Breathe in', sec: 4 },
      { k: 'HOLD', label: 'Hold softly', sec: 7 },
      { k: 'OUT', label: 'Breathe out', sec: 8 },
    ],
  },
  {
    id: 'even',
    name: 'Even',
    short: '5 · 5',
    desc: 'Balanced in and out — steady rhythm for everyday moments.',
    phases: [
      { k: 'IN', label: 'Breathe in', sec: 5 },
      { k: 'OUT', label: 'Breathe out', sec: 5 },
    ],
  },
  {
    id: 'sleep',
    name: 'Wind-down',
    short: '4 · 8',
    desc: 'A slower exhale to ease the body toward rest.',
    phases: [
      { k: 'IN', label: 'Breathe in', sec: 4 },
      { k: 'OUT', label: 'Slow exhale', sec: 8 },
    ],
  },
];

const scaleByKind = {
  IN: 1.22,
  HOLD: 1.22,
  OUT: 0.9,
};

const toneByKind = {
  IN: 'sage',
  HOLD: 'forest',
  OUT: 'mist',
};

export default function Breathing() {
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState({ idx: 0, sec: PATTERNS[0].phases[0].sec });

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setCycle((c) => {
        if (c.sec > 1) return { ...c, sec: c.sec - 1 };
        const next = (c.idx + 1) % pattern.phases.length;
        return { idx: next, sec: pattern.phases[next].sec };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, pattern]);

  const phase = pattern.phases[cycle.idx];
  const scale = scaleByKind[phase.k];
  const tone = toneByKind[phase.k];

  const choosePattern = (p) => {
    setPattern(p);
    setCycle({ idx: 0, sec: p.phases[0].sec });
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setCycle({ idx: 0, sec: pattern.phases[0].sec });
  };

  const counts = pattern.phases
    .map((p) => p.sec)
    .filter((n) => !Number.isNaN(n))
    .join(' · ');

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-blob bg-mist-200/50 blur-3xl dark:bg-mist-300/10"
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
              eyebrow="Tool · Breathing"
              as="h1"
              title="A rhythm for your breath"
              description="Pick a pattern, press start, and let the circle carry the pacing. Gentle and unhurried — nothing here is a competition."
            />
          </div>

          <Card padding="lg" className="mt-8 shadow-card">
            <div className="flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Breathing pattern">
              {PATTERNS.map((p) => {
                const selected = p.id === pattern.id;
                return (
                  <Chip
                    key={p.id}
                    selected={selected}
                    onClick={() => choosePattern(p)}
                  >
                    {p.name} <span className="opacity-90">· {p.short}</span>
                  </Chip>
                );
              })}
            </div>
            <p className="mt-3 text-center text-sm text-stone-500 dark:text-stone-400">
              {pattern.desc}
            </p>

            <div
              className="relative mx-auto mt-8 flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80"
              aria-hidden
            >
              <div className="absolute h-56 w-56 rounded-full bg-forest-800/5 blur-2xl" />
              <motion.div
                animate={{ scale }}
                transition={{ duration: running ? phase.sec : 0.3, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <OrganicCircle size={200} tone={tone} className="shadow-soft" />
              </motion.div>
            </div>

            <div className="mt-2 text-center">
              <p
                className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50"
                aria-live="polite"
              >
                {running ? `${phase.label}` : pattern.id === 'box' ? 'When you’re ready…' : 'Press start when you’re ready'}
              </p>
              <p
                className="mt-1 font-display text-5xl font-medium tabular-nums text-forest-700 sm:text-6xl dark:text-sage-300"
                aria-live="polite"
              >
                {running ? cycle.sec : counts}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  aria-pressed={running}
                  onClick={() => setRunning((r) => !r)}
                  variant={running ? 'secondary' : 'primary'}
                >
                  {running ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                  {running ? 'Pause' : 'Start'}
                </Button>
                <Button variant="ghost" onClick={reset} aria-label="Reset breathing exercise">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Reset
                </Button>
              </div>
            </div>
          </Card>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm italic leading-relaxed text-stone-500 dark:text-stone-400">
            Slow exhales help the body settle — gently, never forcefully. Your breaths, your pace.
          </p>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-mist-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}