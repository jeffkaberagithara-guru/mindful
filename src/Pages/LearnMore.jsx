import { Link } from 'react-router-dom';
import {
  Brain,
  Moon,
  CloudSun,
  Flame,
  Heart,
  HeartHandshake,
  ArrowRight,
  BookOpen,
  Smile,
  ClipboardList,
  Wind,
  Footprints,
  LifeBuoy,
  Stethoscope,
  ListChecks,
  Plus,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Landscape from '../components/ui/Landscape';
import { FAQS } from '../data/faqs.js';

const TOPICS = [
  {
    slug: 'what-anxiety-actually-is',
    title: 'Anxiety',
    icon: Brain,
    excerpt:
      'Not a character flaw — a built-in alarm system running a little too loud, and what that changes.',
  },
  {
    slug: 'sleep-simple-science',
    title: 'Sleep',
    icon: Moon,
    excerpt: 'Circadian rhythms, light, and the quiet reasons your nights got complicated.',
  },
  {
    slug: 'stress-vs-overload',
    title: 'Stress vs. overload',
    icon: CloudSun,
    excerpt: 'A little stress sharpens you; chronic overload doesn\u2019t. Spotting the difference is protective.',
  },
  {
    slug: 'burnout-where-it-lives',
    title: 'Burnout',
    icon: Flame,
    excerpt: 'Exhaustion you can\u2019t relax out of — what it actually is, and the honest road back.',
  },
  {
    slug: 'emotions-are-data',
    title: 'Emotions as data',
    icon: Heart,
    excerpt: 'The feeling is not the enemy — it\u2019s a report from the body. Learning to read it, not fight it.',
  },
  {
    slug: 'your-inner-critic',
    title: 'The inner critic',
    icon: HeartHandshake,
    excerpt: 'The voice that calls you names in your own head — where it comes from, and how to answer it.',
  },
];

const GUIDES = [
  { to: '/tools/mood-tracker', title: 'Mood check-in & history', icon: Smile, note: 'One honest tap about how today feels.' },
  { to: '/tools/assessment', title: 'Self-assessment', icon: ClipboardList, note: 'The PHQ-9 and GAD-7, used as screens.' },
  { to: '/tools/breathing', title: 'Slow breathing', icon: Wind, note: 'A paced exercise for a too-fast nervous system.' },
  { to: '/tools/grounding', title: 'Grounding', icon: Footprints, note: 'Returning your attention to the present moment.' },
  { to: '/support-plan', title: 'Support plan', icon: LifeBuoy, note: 'Warning signs, calm tools, and people to call.' },
  { to: '/find-therapist', title: 'Finding a therapist', icon: Stethoscope, note: 'An honest guide to the real, practical steps.' },
  { to: '/journal', title: 'Journal', icon: BookOpen, note: 'A private, gentle place to untangle thoughts.' },
  { to: '/programmes', title: 'Programmes', icon: ListChecks, note: 'Small, honest sessions you can repeat.' },
];

function FaqItem({ faq }) {
  return (
    <details className="group rounded-soft border border-stone-900/10 bg-white dark:border-white/10 dark:bg-forest-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <span className="font-display text-base font-semibold text-forest-950 dark:text-sage-50">
          {faq.question}
        </span>
        <span className="shrink-0 text-forest-700 transition-transform duration-200 group-open:rotate-45 dark:text-sage-300">
          <Plus className="h-5 w-5" aria-hidden />
        </span>
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{faq.answer}</p>
    </details>
  );
}

export default function LearnMore() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-blob bg-lilac-200/40 blur-3xl dark:bg-lilac-300/10"
        />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Learn"
            as="h1"
            title="A small, honest mental-health education hub"
            description="Plain-language articles written for the app, real guides inside MindShift, and straight answers to common questions. No medical claims we can\u2019t stand behind."
          />

          <div id="topics" className="mt-12">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Start with a topic
              </h2>
              <Badge tone="lilac">Articles written for MindShift</Badge>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <Link
                    key={topic.slug}
                    to={`/explore/articles/${topic.slug}`}
                    className="group rounded-soft border border-stone-900/10 bg-white p-5 transition-colors hover:border-forest-600 hover:bg-sage-50/60 dark:border-white/10 dark:bg-forest-900 dark:hover:border-sage-400 dark:hover:bg-forest-800"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-forest-700 dark:text-stone-500 dark:group-hover:text-sage-300"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {topic.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Real tools inside MindShift
              </h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GUIDES.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.to}
                    to={guide.to}
                    className="group flex items-center gap-4 rounded-soft border border-stone-900/10 bg-white px-4 py-3 transition-colors hover:border-forest-600 hover:bg-sage-50/60 dark:border-white/10 dark:bg-forest-900 dark:hover:border-sage-400 dark:hover:bg-forest-800"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-forest-700 shadow-card dark:bg-forest-800 dark:text-sage-300">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-forest-950 dark:text-sage-50">
                        {guide.title}
                      </span>
                      <span className="block text-xs text-stone-500 dark:text-stone-400">{guide.note}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
              Honest answers
            </h2>
            <div className="mt-5 space-y-2">
              {FAQS.map((faq) => (
                <FaqItem key={faq.question} faq={faq} />
              ))}
            </div>
          </div>

          <Card padding="lg" surface="tinted" className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Not sure where to start?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest-800 dark:text-sage-200">
              Reading helps, but acting in small ways is what actually shifts the days. A two-minute screen,
              a breathing exercise, or a single journal line are all honest first steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button to="/tools/assessment">Take a self-assessment</Button>
              <Button to="/tools/breathing" variant="secondary">
                Try slow breathing
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}