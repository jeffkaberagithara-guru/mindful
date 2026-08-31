import { Link } from 'react-router-dom';
import { Volume2, Brain, Wind, Lightbulb, Feather, HeartHandshake, ShieldCheck, UserPlus, Lock, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import OrganicCircle from '../components/ui/OrganicCircle';
import Landscape from '../components/ui/Landscape';

const INTENTS = [
  {
    icon: Volume2,
    title: 'Just listen',
    body: 'Unload whatever\'s on your mind without shaping it — a patient ear that won\'t interrupt.',
  },
  {
    icon: Brain,
    title: 'Help me understand',
    body: 'Untangle a feeling and name what\'s actually driving it.',
  },
  {
    icon: Wind,
    title: 'Help me calm down',
    body: 'Slow a racing moment with gentle, guided tools before anything else.',
  },
  {
    icon: Lightbulb,
    title: 'Help me think through a decision',
    body: 'Explore a choice from every side instead of circling it alone.',
  },
  {
    icon: Feather,
    title: 'Help me reflect',
    body: 'Look back on how the day went and what it left behind.',
  },
];

export default function Talk() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-20">
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Talk"
            align="center"
            as="h1"
            title="Sort it out, out loud"
            description="Talk is the space to open up and be guided through what's on your mind — to understand it, calm it, or decide what to do next. It's an AI support guide, not a therapist, and never a replacement for talking to a real person."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTENTS.map((intent) => (
              <Card key={intent.title} padding="lg" className="items-start">
                <intent.icon
                  className="h-5 w-5 text-forest-700 dark:text-sage-300"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h2 className="mt-4 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                  {intent.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {intent.body}
                </p>
              </Card>
            ))}

            <Link
              to="/find-therapist"
              className="group flex flex-col justify-between rounded-card bg-sand p-6 transition-colors hover:bg-sand-300 dark:bg-sand-200 dark:hover:bg-sand-100"
            >
              <div>
                <UserPlus
                  className="h-5 w-5 text-forest-800 dark:text-forest-900"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h2 className="mt-4 font-display text-lg font-semibold text-forest-950 dark:text-forest-950">
                  Prefer a person?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-forest-950/80 dark:text-forest-950/80">
                  Find a therapist you can actually meet. MindShift supports your real conversations —
                  it doesn't replace them.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-800 transition-transform group-hover:translate-x-1 dark:text-forest-900">
                Find a therapist <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-card border border-stone-900/8 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 dark:bg-sage-300/20">
                <ShieldCheck className="h-5 w-5 text-forest-700 dark:text-sage-300" aria-hidden />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  About your conversation
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  <li>
                    <Lock className="mr-2 inline h-3.5 w-3.5 text-stone-400" aria-hidden />
                    Conversations stay on your device. They can be cleared any time, and you'll
                    always know how your data is handled.
                  </li>
                  <li>
                    <HeartHandshake className="mr-2 inline h-3.5 w-3.5 text-stone-400" aria-hidden />
                    If you mention harming yourself or someone else, Talk will immediately and
                    clearly hand you to crisis support.
                  </li>
                  <li>
                    <Brain className="mr-2 inline h-3.5 w-3.5 text-stone-400" aria-hidden />
                    Talk listens, reflects and asks — it doesn't diagnose, label or give medical
                    advice.
                  </li>
                </ul>
                <div className="mt-5 rounded-soft bg-amber-100/70 p-4 text-sm leading-relaxed text-amber-900 dark:bg-amber-300/10 dark:text-amber-100">
                  <p className="font-semibold">Conversations are being activated.</p>
                  <p className="mt-1">
                    Live guided conversations need a connected AI reflection service (an API key
                    stored server-side, never in the browser) plus a safety review. MindShift won't
                    fake a conversation — this space goes live once those are in place. In the
                    meantime, the tools below are ready now.
                  </p>
                </div>
              </div>
            </div>
          </div>

<div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-center">
            <Button to="/tools">
              Explore calm-down tools <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button to="/crisis" variant="secondary">
              <HeartHandshake className="h-4 w-4" aria-hidden />
              I need help right now
            </Button>
          </div>
        </div>
      </section>

      <OrganicCircle className="mx-auto -mb-16 hidden h-4 w-4 text-sage-300 sm:block dark:text-sage-800" aria-hidden />
      <Landscape
        className="-mt-4 h-24 w-full text-sage-200/80 dark:text-forest-900"
        aria-hidden
      />
    </>
  );
}