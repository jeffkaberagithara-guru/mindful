import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  HeartPulse,
  Siren,
  ShieldPlus,
  BookOpen,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Landscape from '../components/ui/Landscape';
import { CRISIS_LINES, KENYA_LINES, INTERNATIONAL } from '../data/crisis';

const EXPECT = [
  'A trained person answers. You don\u2019t have to be \u201cbad enough\u201d to call — reaching out is enough on its own.',
  'It can be anonymous and confidential. You decide how much to say.',
  'You can say the hard words. Crisis counsellors hear them every day and stay calm.',
  'They\u2019ll listen first, then gently help you take the next small step — even just \u201cbreathe with me for a minute.\u201d',
];

export default function Crisis() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-16 h-80 w-80 rounded-blob bg-rose-200/40 blur-3xl dark:bg-rose-300/10"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Immediate support"
            as="h1"
            title="Hard moments deserve a real voice"
            description="If the moment is unbearable, stop reading and call. There are people whose whole job is answering right now. This page is honest — the numbers below are real, free, and 24/7."
            align="center"
          />

          <Card
            padding="lg"
            className="mt-10 border border-rose-300 bg-rose-50/70 dark:border-rose-400/40 dark:bg-rose-400/10"
          >
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
                  <Siren className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-rose-950 dark:text-rose-50">
                    If you are unsafe right now
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-rose-900/90 dark:text-rose-100/90">
                    Call <strong>112</strong> — or your local emergency number (999 or 112 in
                    Kenya, 911 in the US and Canada) — or go to the nearest emergency room.
                    Struggling to be safe beats trying to be strong. Every single time.
                  </p>
                </div>
              </div>
              <a
                href="tel:112"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
              >
                <PhoneCall className="h-4 w-4" aria-hidden /> Call now
              </a>
            </div>
          </Card>

          <div className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                Support in Kenya
              </h2>
              <Badge tone="mist">Free · confidential · local</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Local Kenyan numbers for mental-health and psychosocial support. These are checked
              against the organisations' own public listings. They can be reached in English or
              Kiswahili.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {KENYA_LINES.map((line) => (
                <Card key={line.name} padding="lg" className="items-start">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-snug text-forest-950 dark:text-sage-50">
                      {line.name}
                    </h3>
                    <Clock className="h-4 w-4 shrink-0 text-sage-600 dark:text-sage-400" aria-hidden />
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-stone-400 dark:text-stone-500">
                    {line.where}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    {line.note}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {line.call && (
                      <a
                        href={`tel:${line.call.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-ivory transition-colors hover:bg-forest-900 dark:bg-forest-700 dark:hover:bg-forest-600"
                      >
                        <PhoneCall className="h-3.5 w-3.5" aria-hidden /> {line.call}
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                Crisis lines that answer right now
              </h2>
              <Badge tone="mist">Free · confidential · 24/7</Badge>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CRISIS_LINES.map((line) => (
                <Card key={line.name} padding="lg" className="items-start">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-snug text-forest-950 dark:text-sage-50">
                      {line.name}
                    </h3>
                    <Clock className="h-4 w-4 shrink-0 text-sage-600 dark:text-sage-400" aria-hidden />
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-stone-400 dark:text-stone-500">
                    {line.where}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    {line.note}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
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
                        <MessageSquare className="h-3.5 w-3.5 text-sage-700 dark:text-sage-300" aria-hidden />
                        {line.text}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Outside the US
            </h2>
            <div className="mt-5 overflow-x-auto rounded-card border border-stone-200 dark:border-white/10">
              <table className="w-full min-w-[30rem] text-left text-sm">
                <thead className="bg-stone-100 text-stone-500 dark:bg-white/5 dark:text-stone-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Country</th>
                    <th className="px-4 py-3 font-medium">Number</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">Service</th>
                    <th className="px-4 py-3 font-medium">Call</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                  {INTERNATIONAL.map((line) => (
                    <tr key={line.service} className="bg-white dark:bg-forest-900">
                      <td className="px-4 py-3 font-medium text-forest-950 dark:text-sage-50">{line.country}</td>
                      <td className="px-4 py-3 text-forest-950 dark:text-sage-50">{line.number}</td>
                      <td className="hidden px-4 py-3 text-stone-500 dark:text-stone-400 sm:table-cell">{line.service}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`tel:${line.number.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
                        >
                          <PhoneCall className="h-3.5 w-3.5" aria-hidden /> Call
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-400 dark:text-stone-500">
              MindShift checks these lines carefully, but services move. If one doesn\u2019t go
              through, try another, or call 112 — and please double-check anything before relying
              on it.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              What to expect when you call
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-soft bg-sage-50/70 p-4 dark:bg-white/5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
                  <span className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Link to="/support-plan" className="group sm:col-span-2">
              <Card padding="lg" className="flex h-full items-start justify-between gap-4 transition-shadow hover:shadow-card">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                    <ShieldPlus className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                      Plan ahead, on the good days
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      Build your own support plan — warning signs, calming things, people and
                      professionals to call — before you need it. It stays on your device.
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-forest-700 transition-transform group-hover:translate-x-1 dark:text-sage-300">
                  Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
            <Link to="/find-therapist" className="group">
              <Card padding="lg" className="flex h-full flex-col items-start transition-shadow hover:shadow-card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                  <BookOpen className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                  Not an emergency, but need care soon
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  Start with your doctor, then a therapist that fits.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-forest-700 transition-transform group-hover:translate-x-1 dark:text-sage-300">
                  The finding-a-therapist guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-500 dark:border-white/10 dark:text-stone-400">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-500" aria-hidden />
              If someone else is unsafe: stay with them, remove immediate danger if it\u2019s safe to,
              and call 112 — they don\u2019t have to be \u201cdoing it\u201d to get help.
            </span>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-rose-200/70 dark:text-forest-900" aria-hidden />
    </>
  );
}