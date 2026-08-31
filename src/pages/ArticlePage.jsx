import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import OrganicCircle from '../components/ui/OrganicCircle';
import Landscape from '../components/ui/Landscape';
import { ARTICLES, getArticle } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <section className="px-6 py-20 text-center">
        <p className="font-display text-5xl font-medium text-forest-200 dark:text-forest-800">Hmm</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
          We couldn\u2019t find that article
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-500 dark:text-stone-400">
          The piece may have moved. The reading library is right here.
        </p>
        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Explore
        </Link>
      </section>
    );
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 1)
    .concat(ARTICLES.filter((a) => a.slug !== article.slug && a.category !== article.category).slice(0, 2));

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-24 opacity-80"
        >
          <OrganicCircle size={360} tone="lilac" className="opacity-60" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-forest-900 dark:text-stone-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Explore
          </Link>

          <div className="mt-8">
            <Badge tone="sage" size="md">
              {article.category}
            </Badge>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl dark:text-sage-50">
              {article.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-500">
              <Clock className="h-3.5 w-3.5" aria-hidden /> {article.readTime} read · written for you, not for clicks
            </p>
          </div>

          <article className="mt-8 space-y-5">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'font-display text-xl leading-relaxed text-forest-950 dark:text-sage-50'
                    : 'text-base leading-relaxed text-stone-700 dark:text-stone-200'
                }
              >
                {paragraph}
              </p>
            ))}
          </article>

          <Card padding="lg" className="mt-10 bg-sage-50/70 dark:bg-white/5">
            <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
              If any of this hits close to home
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Reading is a start, not a finish. If any part describes your days often, this is a
              good moment to involve a real person — a doctor or a therapist — or to use the calm
              tools while you arrange that.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button to="/find-therapist" size="sm">
                Find a therapist <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
              <Button to="/tools" variant="secondary" size="sm">
                Calm tools
              </Button>
            </div>
          </Card>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Keep reading
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} to={`/explore/articles/${r.slug}`} className="group">
                    <Card padding="lg" className="h-full transition-shadow hover:shadow-card">
                      <Badge tone="mist">{r.category}</Badge>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-forest-950 group-hover:text-forest-700 dark:text-sage-50 dark:group-hover:text-sage-300">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                        {r.excerpt}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}