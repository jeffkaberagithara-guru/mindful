import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Flower2, Clock } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Landscape from '../components/ui/Landscape';
import { ARTICLES } from '../data/articles';
import { PROGRAMMES } from '../data/programmes';

export default function Explore() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Explore"
            as="h1"
            title="Understand your mind, gently"
            description="Psychology in plain language — no jargon, no prescriptions, just honest knowledge written for you, not for clicks."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Link to="/learn-more" className="group sm:col-span-2">
              <Card padding="lg" className="flex h-full flex-col items-start justify-between overflow-hidden transition-shadow hover:shadow-card">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                    <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                    The mental health education hub
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    A warm introduction to mental wellbeing — conditions, support options, and how
                    to talk about what you're going through.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 transition-transform group-hover:translate-x-1 dark:text-sage-300">
                  Start learning <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>

            <Link to="/programmes" className="group">
              <Card padding="lg" className="flex h-full flex-col items-start justify-between bg-sand transition-shadow hover:shadow-card dark:bg-sand-200">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                    <Flower2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                    Structured series
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    Gentle, real programmes — one small session at a time. {PROGRAMMES.map((p) => p.title).join(' · ')}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-800 transition-transform group-hover:translate-x-1 dark:text-forest-950">
                  Explore programmes <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
          </div>

          <div className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                From the library
              </h2>
              <span className="text-sm text-stone-400 dark:text-stone-500">
                {ARTICLES.length} short, honest reads
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ARTICLES.map((article) => (
                <Link key={article.slug} to={`/explore/articles/${article.slug}`} className="group">
                  <Card padding="lg" className="h-full transition-shadow hover:shadow-card">
                    <div className="flex items-center gap-2">
                      <Badge tone="sage" size="sm">{article.category}</Badge>
                      <span className="inline-flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500">
                        <Clock className="h-3 w-3" aria-hidden /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-forest-950 group-hover:text-forest-700 dark:text-sage-50 dark:group-hover:text-sage-300">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                      Read article <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <Link to="/journal" className="group">
              <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200">
                  <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Put words to it
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  A private, prompt-led journal that stays on your device.
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                  Open the journal <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
            <Link to="/resources" className="group">
              <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                  <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Support resources
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  Real helplines, health services, and how to find them near you.
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                  See resources <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}