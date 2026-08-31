import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { cn } from '../../lib/cn';
import ProfessionalAvatar from './ProfessionalAvatar';
import FounderContactActions from './FounderContactActions';
import { PROFESSIONAL } from '../../data/professionalProfile';

export default function FounderCard({
  tone = 'sage',
  showContact = true,
  surface = 'tinted',
  className,
}) {
  return (
    <Card padding="lg" className={cn('relative overflow-hidden', className)} surface={surface}>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sage-200/40 dark:bg-sage-300/10"
      />
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <ProfessionalAvatar name={PROFESSIONAL.name} size="lg" tone={tone} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-800 dark:text-sage-400">
            Human support
          </p>
          <h3 className="mt-1.5 font-display text-3xl font-semibold leading-tight text-forest-950 dark:text-sage-50">
            {PROFESSIONAL.name}
          </h3>
          <p className="mt-1 text-base font-semibold text-forest-800 dark:text-sage-300">
            {PROFESSIONAL.role}
          </p>
          <p className="mt-2 text-base leading-relaxed text-stone-700 dark:text-stone-300">
            {PROFESSIONAL.shortSupport}
          </p>
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center gap-3 border-t border-stone-900/8 pt-5 dark:border-white/10">
        <Link
          to={`/professionals/${PROFESSIONAL.slug}`}
          className="inline-flex items-center gap-1.5 text-base font-semibold text-forest-900 hover:underline dark:text-sage-200"
        >
          View profile <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        {showContact && (
          <div className="ml-auto shrink-0">
            <FounderContactActions showConsult />
          </div>
        )}
      </div>
    </Card>
  );
}
