import { Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/cn';
import { PROFESSIONAL } from '../../data/professionalProfile';

export default function FounderContactActions({ showConsult = true, stacked = false, className }) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-3', stacked && 'flex-col sm:flex-row', className)}
    >
      {showConsult && (
        <Button to={`/professionals/${PROFESSIONAL.slug}`}>
          Request a consultation <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      )}
      <a
        href={PROFESSIONAL.telLink}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/15 px-6 py-3 text-base font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Call
      </a>
      <a
        href={PROFESSIONAL.mailto}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/15 px-6 py-3 text-base font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800"
      >
        <Mail className="h-4 w-4" aria-hidden />
        Send email
      </a>
    </div>
  );
}
