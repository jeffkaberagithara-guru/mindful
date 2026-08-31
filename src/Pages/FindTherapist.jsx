import { Link } from 'react-router-dom';
import {
  Stethoscope,
  ShieldCheck,
  Briefcase,
  HandCoins,
  ExternalLink,
  CheckCircle2,
  PhoneCall,
  CreditCard,
  MessageCircleQuestion,
  HeartPulse,
  SearchCheck,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Landscape from '../components/ui/Landscape';

const PATHS = [
  {
    icon: Stethoscope,
    title: 'Start with your doctor',
    body: 'Your GP or primary care doctor is a trusted first step. They know the services in your area, can check whether anything physical is affecting your mood, and can refer you onward.',
  },
  {
    icon: ShieldCheck,
    title: 'Your insurance',
    body: 'Most plans list in-network therapists you can filter by distance and specialty. Ask about copays, session limits, and whether telehealth is covered before you book.',
  },
  {
    icon: Briefcase,
    title: 'Through work (EAP)',
    body: 'Employee Assistance Programs offer a handful of free, confidential counselling sessions and can steer you to longer-term care. Check what your employer provides.',
  },
  {
    icon: HandCoins,
    title: 'Sliding scale & community care',
    body: 'Community mental-health clinics, university training clinics, and directories like Open Path offer sessions priced by what you earn. Waiting lists are common — get on them early.',
  },
];

const DIRECTORIES = [
  {
    name: 'Psychology Today directory',
    note: "One of the largest directories — search by postcode, specialty, insurance and approach.",
    href: 'https://www.psychologytoday.com/us/therapists',
  },
  {
    name: 'Open Path Collective',
    note: 'A network of therapists offering reduced-fee sessions on a sliding scale.',
    href: 'https://www.openpathcollective.org',
  },
  {
    name: 'NAMI resources',
    note: "The National Alliance on Mental Illness keeps provider and support finders for every area of the US.",
    href: 'https://www.nami.org',
  },
];

const CHECKLIST = [
  'Licensed in your state or country — search their registry, not just their site.',
  'Experience with your specific concern, not generic talk alone.',
  'A way to work that suits you — online, in person, or a mix.',
  'Fees you can actually sustain, including a clear sliding scale.',
  'Availability that fits your weeks — evening or weekend slots if you need them.',
  'Someone who makes you feel safe. This is the one that outranks all the rest.',
];

const FIRST_CALL = [
  'What do you usually help people with, and how?',
  'How does your approach work week to week?',
  'How are fees, sliding scales, and cancellations handled?',
  'Do you take my insurance, and do you do telehealth?',
  'How do you handle anything I\u2019m worried about sharing?',
];

function ResourceLink({ name, note, href }) {
  return (
    <Card padding="lg" className="items-start">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
          {name}
        </h2>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 underline-offset-2 hover:underline dark:text-sage-300"
        >
          Visit site <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{note}</p>
    </Card>
  );
}

export default function FindTherapist() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-8 h-96 w-96 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Find support"
            as="h1"
            title="Finding a therapist who fits you"
            description="MindShift doesn\u2019t run a therapist directory or take referral fees — that\u2019s a decision between you and a professional. What we can offer is an honest, practical map of the real paths people use to find one."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PATHS.map((path) => (
              <Card key={path.title} padding="lg" className="items-start">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                  <path.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  {path.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {path.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Well-known directories to try
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="sand">Independent sites</Badge>
              <span className="text-xs text-stone-400 dark:text-stone-500">
                Not vetted or endorsed by MindShift — check they\u2019re current.
              </span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {DIRECTORIES.map((d) => (
              <ResourceLink key={d.name} {...d} />
            ))}
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Card padding="lg" className="bg-sage-50/70 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                  <SearchCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  What to look for
                </h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="lg" className="bg-peach-50/70 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200">
                  <MessageCircleQuestion className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  A good first call
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Most therapists offer a short introductory call. You\u2019re interviewing each other,
                so ask without apology:
              </p>
              <ul className="mt-4 space-y-2.5">
                {FIRST_CALL.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                    <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-peach-700 dark:text-peach-300" aria-hidden />
                    “{q}”
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card padding="lg" className="items-start">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                  <CreditCard className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  The cost reality
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Out-of-pocket, individual therapy often runs roughly $100–$250 a session and varies
                a lot by area and specialism. That\u2019s why the first three paths matter: insurance
                copays, EAP sessions, and sliding scales can bring the real price down sharply. Ask
                about all three before you decide anything.
              </p>
            </Card>
            <Card padding="lg" className="items-start">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                  <PhoneCall className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Phone first, book later
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Send the same short message to two or three therapists — who you\u2019re, roughly what
                you\u2019re navigating, and what you can pay. Real therapists respond professionally, don\u2019t
                pressure, and tell you plainly if they\u2019re not the right fit.
              </p>
            </Card>
          </div>

          <div className="mt-12 rounded-card bg-forest-800 p-6 sm:p-8 dark:bg-forest-900">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-xl font-semibold text-ivory dark:text-white">
                  If the search can\u2019t wait
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ivory/80 dark:text-white/70">
                  For persistent distress, thoughts of harming yourself or others, or moments that
                  feel unbearable, a search can wait — but you shouldn\u2019t. Clinics, emergency
                  departments, and crisis lines exist for exactly this, and using them is strength.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to="/crisis"
                  className="inline-flex items-center gap-2 rounded-full bg-peach-200 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-peach-100 dark:bg-peach-300 dark:hover:bg-peach-200"
                >
                  <HeartPulse className="h-4 w-4" aria-hidden /> If you\u2019re in crisis now
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/learn-more"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-forest-700 hover:text-forest-900 dark:border-white/20 dark:text-stone-200 dark:hover:border-sage-300 dark:hover:text-white"
            >
              Learn about mental health
            </Link>
            <Link
              to="/tools/assessment"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-forest-700 hover:text-forest-900 dark:border-white/20 dark:text-stone-200 dark:hover:border-sage-300 dark:hover:text-white"
            >
              Run a private screening
            </Link>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-peach-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}