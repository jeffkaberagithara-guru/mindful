import { Link } from 'react-router-dom';
import { Smile, ClipboardList, ArrowRight, Flower2, Anchor, Feather, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const AVAILABLE = [
  {
    to: '/tools/grounding',
    icon: Anchor,
    title: 'Grounding',
    body: 'A gentle 5 · 4 · 3 · 2 · 1 walk through your senses — step back into the present when the world spins.',
    accent: 'bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200',
  },
  {
    to: '/tools/breathing',
    icon: Flower2,
    title: 'Breathing',
    body: 'Four guided breathing patterns with a circle that sets the pace — steady, unhurried, all yours.',
    accent: 'bg-mist-100 text-mist-800 dark:bg-mist-300/20 dark:text-mist-200',
  },
  {
    to: '/journal',
    icon: Feather,
    title: 'Journal',
    body: 'A private, prompt-led notebook. Write a sentence or a page — every entry stays on this device.',
    accent: 'bg-lilac-100 text-lilac-800 dark:bg-lilac-300/20 dark:text-lilac-200',
  },
  {
    to: '/programmes',
    icon: Sparkles,
    title: 'Programmes',
    body: 'Gentle, structured series — a calmer mind, kinder sleep, and a softer inner voice, one small session at a time.',
    accent: 'bg-forest-100 text-forest-800 dark:bg-forest-300/20 dark:text-forest-200',
  },
  {
    to: '/tools/mood-tracker',
    icon: Smile,
    title: 'Mood check-in',
    body: 'Name how you\'re feeling and track it over time — the honest starting point for everything else.',
    accent: 'bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200',
  },
  {
    to: '/tools/assessment',
    icon: ClipboardList,
    title: 'Wellbeing self-assessment',
    body: 'A private, science-based screening (PHQ-9 & GAD-7) to better understand where you are — a screening tool, not a diagnosis.',
    accent: 'bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white',
  },
];

const COMING = [
  'Thought records',
  'Decision help',
  'Self-compassion practice',
];

export default function Tools() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-blob bg-peach-200/40 blur-3xl dark:bg-peach-300/10"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Tools"
          as="h1"
          title="Find the right tool for right now"
          description="Short, private exercises that meet you where you are. Tools open instantly, keep your data on your device, and never judge."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {AVAILABLE.map((tool) => (
            <Link key={tool.to} to={tool.to} className="group">
              <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${tool.accent}`}
                >
                  <tool.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  {tool.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {tool.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 transition-transform group-hover:translate-x-1 dark:text-sage-300">
                  Open tool <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-card border border-dashed border-stone-300 p-6 sm:p-8 dark:border-white/15">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="mist">Being added</Badge>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              We introduce the guided library gradually, so every exercise gets the care it
              deserves. Next up:
            </p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {COMING.map((item) => (
              <li
                key={item}
                className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-500 dark:border-white/10 dark:text-stone-400"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}