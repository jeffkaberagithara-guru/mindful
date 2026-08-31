import { Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/cn';
import { PROFESSIONAL } from '../../data/professionalProfile';

export default function FounderContactActions({ showConsult = true, className }) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 items-stretch sm:flex-row sm:items-center',
        className,
      )}
    >
      {showConsult && (
        <Button to={`/professionals/${PROFESSIONAL.slug}`} className="w-full justify-center sm:w-auto">
          Request a consultation <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      )}
      <a
        href={PROFESSIONAL.telLink}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-900/15 px-6 py-3 text-base font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800 sm:flex-none"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Call
      </a>
      <a
        href={PROFESSIONAL.mailto}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-900/15 px-6 py-3 text-base font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800 sm:flex-none"
      >
        <Mail className="h-4 w-4" aria-hidden />
        Send email
      </a>
    </div>
  );
}
