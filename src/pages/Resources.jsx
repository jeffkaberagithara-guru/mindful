import { Link } from 'react-router-dom';
import {
  BookOpen,
  Flower2,
  Wind,
  Feather,
  ShieldPlus,
  HeartPulse,
  UserRound,
  ArrowRight,
  Gauge,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Landscape from '../components/ui/Landscape';

const APP_RESOURCES = [
  {
    to: '/explore',
    icon: BookOpen,
    title: 'The reading library',
    body: 'Short, honest articles on anxiety, sleep, stress, habits and self-compassion.',
  },
  {
    to: '/programmes',
    icon: Flower2,
    title: 'Structured programmes',
    body: 'Gentle 7-session series for a calmer mind, kinder sleep, and self-kindness.',
  },
  {
    to: '/tools',
    icon: Wind,
    title: 'Calm-down tools',
    body: 'Breathing and grounding exercises that open instantly and stay private.',
  },
  {
    to: '/journal',
    icon: Feather,
    title: 'Your journal',
    body: 'A private, prompt-led notebook for putting words to your days.',
  },
  {
    to: '/support-plan',
    icon: ShieldPlus,
    title: 'Your support plan',
    body: 'Warning signs, calming things, and who to call — written ahead, kept on your device.',
  },
  {
    to: '/you',
    icon: Gauge,
    title: 'Your insights',
    body: 'Real trends from your check-ins, screenings, journal, and programmes.',
  },
];

const CARE = [
  {
    to: '/find-therapist',
    icon: UserRound,
    title: 'Finding a therapist',
    body: 'An honest, practical map of the real paths to professional care — no directory, no fees.',
  },
  {
    to: '/crisis',
    icon: HeartPulse,
    title: 'If it\u2019s a hard moment now',
    body: 'Verified crisis lines, emergency guidance, and what to expect when you call.',
  },
];

export default function Resources() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Support resources"
            as="h1"
            title="Everything, honestly, in one place"
            description="Real help falls into two buckets: things you can do right here, and things best done with real people. This page links to both — every link on it works, and nothing here is invented."
          />

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Inside MindShift, ready now
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {APP_RESOURCES.map((r) => (
                <Link key={r.to} to={r.to} className="group">
                  <Card padding="lg" className="flex h-full flex-col items-start transition-shadow hover:shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                      <r.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {r.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                      Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Professional care and urgent help
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CARE.map((r) => (
                <Link key={r.to} to={r.to} className="group">
                  <Card padding="lg" className="flex h-full items-start gap-4 transition-shadow hover:shadow-card">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                      <r.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        {r.body}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                        Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-400 dark:text-stone-500">
              Crisis helpline numbers live on the crisis page, where they\u2019re kept current and
              verified. If you\u2019re in immediate danger, call 112 (or your local emergency number)
              without waiting to read anything else.
            </p>
          </div>

          <div className="mt-14 rounded-card bg-forest-800 p-6 text-center sm:p-8 dark:bg-forest-900">
            <h2 className="font-display text-xl font-semibold text-ivory dark:text-white">
              Can\u2019t decide where to begin?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ivory/90 dark:text-white/85">
              Start with one honest mood check-in and a quick grounding exercise. Small, real
              actions beat grand intentions.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-peach-200 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-peach-100 dark:bg-peach-300 dark:hover:bg-peach-200"
            >
              Check in now <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}