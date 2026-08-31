import { AlertTriangle, MessageSquare, PhoneCall } from 'lucide-react';
import Modal from './ui/Modal';
import { CRISIS_LINES, KENYA_LINES } from '../data/crisis';

export default function CrisisModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Need help right now?" size="lg">
      <div className="mt-5 space-y-5">
        <div className="rounded-soft border border-rose-200 bg-rose-50/70 p-4 dark:border-rose-400/30 dark:bg-rose-400/10">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
              <AlertTriangle className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-base font-semibold text-rose-800 dark:text-rose-200">
                If you are unsafe right now
              </p>
              <p className="mt-1 text-sm leading-relaxed text-rose-900/90 dark:text-rose-100/90">
                Call <strong>112</strong> — or your local emergency number (999 or 112 in Kenya,
                911 in the US and Canada) — or go to the nearest emergency room.
              </p>
              <a
                href="tel:112"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
              >
                <PhoneCall className="h-4 w-4" aria-hidden /> Call now
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-600 dark:text-stone-300">
            Support in Kenya
          </p>
          <ul className="mt-3 space-y-3">
            {KENYA_LINES.map((line) => (
              <li
                key={line.name}
                className="rounded-soft border border-forest-800/10 bg-forest-50/40 p-4 dark:border-sage-400/20 dark:bg-forest-900"
              >
                <p className="font-display text-base font-semibold text-forest-950 dark:text-sage-50">
                  {line.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-stone-400 dark:text-stone-500">
                  {line.where}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {line.note}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {line.call && (
                    <a
                      href={`tel:${line.call.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-ivory transition-colors hover:bg-forest-900 dark:bg-forest-700 dark:hover:bg-forest-600"
                    >
                      <PhoneCall className="h-3.5 w-3.5" aria-hidden /> {line.call}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-600 dark:text-stone-300">
            US &amp; international lines
          </p>
          <ul className="mt-3 space-y-3">
            {CRISIS_LINES.map((line) => (
              <li
                key={line.name}
                className="rounded-soft border border-stone-900/10 bg-white p-4 dark:border-white/10 dark:bg-forest-900"
              >
                <p className="font-display text-base font-semibold text-forest-950 dark:text-sage-50">
                  {line.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-stone-400 dark:text-stone-500">
                  {line.where}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {line.note}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {line.call && (
                    <a
                      href={`tel:${line.call.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-ivory transition-colors hover:bg-forest-900 dark:bg-forest-700 dark:hover:bg-forest-600"
                    >
                      <PhoneCall className="h-3.5 w-3.5" aria-hidden /> {line.call}
                    </a>
                  )}
                  {line.text && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 dark:border-white/20 dark:text-stone-200">
                      <MessageSquare
                        className="h-3.5 w-3.5 text-sage-700 dark:text-sage-300"
                        aria-hidden
                      />
                      {line.text}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          MindShift checks these lines carefully, but services move. If one doesn’t get through,
          try another — and please double-check anything before relying on it.
        </p>
      </div>
    </Modal>
  );
}