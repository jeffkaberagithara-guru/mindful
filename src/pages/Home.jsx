import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Anchor,
  Wind,
  Moon,
  Feather,
  Laugh,
  Compass,
  TrendingUp,
  UserRound,
  HeartHandshake,
  ArrowRight,
  Check,
} from 'lucide-react';
import MoodSelector from '../components/ui/MoodSelector';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import OrganicCircle from '../components/ui/OrganicCircle';
import Landscape from '../components/ui/Landscape';
import ProfessionalAvatar from '../components/professional/ProfessionalAvatar';
import { PROFESSIONAL } from '../data/professionalProfile';
import { Textarea } from '../components/ui/Field';
import { useToast } from '../components/ui/ToastContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MOOD_LABELS = {
  5: 'Bright',
  4: 'Good',
  3: 'Okay',
  2: 'Low',
  1: 'Very low',
};

const INTENTS = [
  {
    id: 'ground',
    icon: Anchor,
    label: 'Ground me',
    tone: 'bg-sage-100 text-sage-800 dark:bg-sage-300/20 dark:text-sage-200',
    title: '5 · 4 · 3 · 2 · 1',
    kind: 'A grounding moment, right now',
    body: 'These senses-bring-you back to the present — not to escape the feeling, but to stand beside it.',
    steps: [
      'Name 5 things you can see around you.',
      '4 things you can touch — notice their texture.',
      '3 sounds you can hear, nearby or far.',
      '2 smells you notice in the air.',
      '1 thing you can taste, or feel in your mouth.',
    ],
    links: [
      { to: '/tools/grounding', label: 'Try the guided grounding' },
      { to: '/learn-more', label: 'Why grounding works' },
    ],
  },
  {
    id: 'anxiety',
    icon: Wind,
    label: 'Settle my anxiety',
    tone: 'bg-mist-100 text-mist-800 dark:bg-mist-300/20 dark:text-mist-200',
    title: 'Unhurried breathing',
    kind: '4 · 7 · 8',
    body: 'Slow exhales signal the nervous system to settle. Gently — this is not a test of breath-holding.',
    steps: [
      'Breathe in slowly through your nose for a count of 4.',
      'Hold, softly, for a count of 7.',
      'Breathe out gently through your mouth for a count of 8.',
      'Repeat 3–4 rounds, then let your breath fall back to normal.',
    ],
    links: [
      { to: '/tools/breathing', label: 'Try the breathing tool' },
      { to: '/learn-more', label: 'Understand anxiety' },
    ],
  },
  {
    id: 'sleep',
    icon: Moon,
    label: 'Help me sleep',
    tone: 'bg-lilac-100 text-lilac-800 dark:bg-lilac-300/20 dark:text-lilac-200',
    title: 'A softer wind-down',
    kind: 'Tonight, keep it small',
    body: 'Sleep prefers a gentle runway. One small change tonight is enough.',
    steps: [
      'Dim the lights half an hour before bed — light tells your brain to stay awake.',
      'Set the phone aside; screens dampen the sleepy signal.',
      'Write down what is circling in your head — parking it on paper helps you let it go.',
    ],
    links: [
      { to: '/tools/breathing', label: 'Wind-down breathing' },
      { to: '/learn-more', label: 'Sleep & your mind' },
    ],
  },
  {
    id: 'comfort',
    icon: Feather,
    label: 'Comfort me',
    tone: 'bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200',
    title: 'A quiet word',
    kind: 'Read this slowly',
    body: 'You are allowed to not be okay. Whatever brought you here today — you just showed up for yourself, and that counts. You don\u2019t have to solve everything tonight.',
    steps: [
      'Say one true thing to yourself, out loud, the way you\u2019d say it to a friend: \u201cI am having a hard time, and I am handling this moment.\u201d',
    ],
    links: [
      { to: '/talk', label: 'A reflection space' },
      { to: '/you', label: 'Your space' },
    ],
  },
  {
    id: 'laugh',
    icon: Laugh,
    label: 'Make me laugh',
    tone: 'bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200',
    title: 'The honest version',
    kind: 'No canned humor',
    body: 'We won\u2019t fake you a laugh — manufactured jokes fall flat when you\u2019re low. Real laughter usually comes from real people or real stories.',
    steps: [
      'Text a friend the funniest thing you\u2019ve seen this week.',
      'Or watch a clip you already know makes you laugh. Three minutes is the whole ask.',
    ],
    links: [{ to: '/resources', label: 'Go to resources' }],
  },
  {
    id: 'focus',
    icon: Compass,
    label: 'Help me focus',
    tone: 'bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-sage-100',
    title: 'The two-minute dump',
    kind: 'Clear the deck',
    body: 'Before focusing, the head needs an empty desk. This takes two minutes.',
    steps: [
      'Start a timer for 2 minutes.',
      'Write down every task, worry and thought — unsorted, no judgment.',
      'When the timer rings, circle the single most important item.',
      'Do only that item next. Nothing else counts yet.',
    ],
    links: [{ to: '/resources', label: 'More focus help' }],
  },
  {
    id: 'motivate',
    icon: TrendingUp,
    label: 'Motivate me',
    tone: 'bg-mist-100 text-mist-800 dark:bg-mist-300/20 dark:text-mist-200',
    title: 'Move first, feel later',
    kind: 'A small real start',
    body: 'Motivation rarely rings the doorbell — it usually arrives after you move first. The gap is always the hardest part.',
    steps: [
      'Shrink the task until it\u2019s embarrassing to say no. \u201cWrite one line.\u201d \u201cPut on my shoes.\u201d',
      'Do that tiny first step now — then let momentum carry the next one.',
    ],
    links: [{ to: '/tools', label: 'Browse tools' }],
  },
  {
    id: 'talk',
    icon: UserRound,
    label: 'Let me talk to someone',
    tone: 'bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200',
    title: 'Talking beats solving alone',
    kind: 'Real people, real options',
    body: 'The most honest help is a person — a therapist you can meet, or crisis support if this moment is urgent. MindShift stays with you either way.',
    steps: [
      'Take the next step whenever you\u2019re ready — there\u2019s no wrong pace.',
    ],
    links: [
      { to: '/find-therapist', label: 'Find a therapist' },
      { to: '/crisis', label: 'If this is urgent' },
    ],
  },
];

function todayStamp(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function Home() {
  const toast = useToast();
  const [moodHistory, setMoodHistory] = useLocalStorage('moodHistory', []);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [activeIntent, setActiveIntent] = useState(null);

  const today = todayStamp();
  const todaysEntry = moodHistory.find((e) => todayStamp(new Date(e.date)) === today);
  const trending = [...moodHistory].slice(0, 7);

  const saveCheckIn = () => {
    if (!mood) return;
    const keepOthers = todaysEntry ? moodHistory.filter((e) => e !== todaysEntry) : moodHistory;
    const entry = {
      id: Date.now(),
      mood,
      note: note.trim(),
      date: new Date().toISOString(),
    };
    setMoodHistory([entry, ...keepOthers]);
    toast.success('Checked in — thank you for showing up for yourself.');
    if (todaysEntry) {
      setMood(null);
      setNote('');
    }
  };

  const active = INTENTS.find((i) => i.id === activeIntent) || null;

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 opacity-80 sm:-right-16"
        >
          <OrganicCircle size={420} tone="sage" className="opacity-70" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 hidden opacity-70 lg:block"
        >
          <OrganicCircle size={280} tone="sand" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-forest-800 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-sage-300">
              MindShift · your space for mental wellbeing
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-forest-950 sm:text-5xl lg:text-6xl dark:text-sage-50">
              A quieter place to
              <span className="block text-forest-600 dark:text-sage-300">carry your mind</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-300">
              No urgency, no pressure — just private tools, honest knowledge and a gentle way to
              meet yourself where you are today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/tools/mood-tracker">Check in with yourself</Button>
              <Button to="/find-therapist" variant="soft">
                Find a therapist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6">
        <div className="relative mx-auto max-w-4xl">
          <Card padding="lg" className="shadow-card">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                  {todaysEntry
                    ? `You checked in — ${MOOD_LABELS[todaysEntry.mood]?.toLowerCase()}.`
                    : 'How are you feeling right now?'}
                </h2>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {todaysEntry
                    ? 'You already chose once today. You can update it, or leave it be.'
                    : 'A moment for yourself — one tap, kept privately on this device.'}
                </p>
              </div>
              {trending.length > 0 && (
                <Link
                  to="/tools/mood-tracker"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
                >
                  View history <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              )}
            </div>

            <div className="mt-7">
              <MoodSelector value={mood ?? todaysEntry?.mood} onChange={setMood} size="lg" />
            </div>

            <AnimatePresence initial={false}>
              {mood !== null && mood !== todaysEntry?.mood && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-5">
                    <Textarea
                      id="checkin-note"
                      label={false}
                      placeholder="A note for yourself (optional)…"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button onClick={saveCheckIn}>
                        <Check className="mr-1.5 h-4 w-4" aria-hidden />
                        Save check-in
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setMood(null);
                          setNote('');
                        }}
                        className="text-sm font-medium text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl dark:text-sage-50">
              Help me feel better, right now
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              Tell us what you need — we'll hand you the thing that actually helps, no sifting.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTENTS.map((intent, index) => (
              <motion.button
                key={intent.id}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
                onClick={() => setActiveIntent(intent.id)}
                aria-pressed={activeIntent === intent.id}
                className={`flex flex-col items-start gap-3 rounded-card border p-5 text-left transition-all duration-200 ${
                  activeIntent === intent.id
                    ? 'border-forest-700 bg-forest-800 text-ivory shadow-card dark:border-sage-300 dark:bg-forest-700'
                    : 'border-stone-900/8 bg-white/60 hover:border-forest-700/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.08]'
                }`}
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    activeIntent === intent.id ? 'bg-ivory/15 text-ivory' : intent.tone
                  }`}
                >
                  <intent.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span
                  className={`font-display text-lg font-semibold transition-colors ${
                    activeIntent === intent.id ? 'text-ivory' : 'text-forest-950 dark:text-sage-50'
                  }`}
                >
                  {intent.label}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    activeIntent === intent.id ? 'text-ivory/80' : 'text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {intent.kind}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-8"
              >
                <Card padding="lg" className="bg-white/70 dark:bg-white/5">
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="shrink-0 sm:w-56">
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${active.tone}`}
                      >
                        <active.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                      </span>
                      <Badge tone="sage" size="md" className="mt-4">
                        {active.kind}
                      </Badge>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
                        {active.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        {active.body}
                      </p>
                    </div>
                    <div className="flex-1">
                      <ol className="space-y-3.5">
                        {active.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-800 font-display text-xs font-semibold text-ivory dark:bg-forest-700 dark:text-white">
                              {i + 1}
                            </span>
                            <span className="text-base leading-relaxed text-stone-700 dark:text-stone-200">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {active.links.map((link) => (
                          <Button
                            key={link.to + link.label}
                            to={link.to}
                            variant={link.label.startsWith('If this is') ? 'danger' : 'secondary'}
                            size="sm"
                          >
                            {link.label} <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          <Link to="/learn-more" className="group">
            <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                <Compass className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Understand what you feel
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Plain-language knowledge about emotions, anxiety, stress and sleep — no jargon, no
                prescriptions.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Card>
          </Link>
          <Link to="/find-therapist" className="group">
            <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                <UserRound className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Talk to a real person
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                A therapist you can actually meet — because app support works best beside human
                support.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                Find a therapist <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Card>
          </Link>
          <Link to="/crisis" className="group">
            <Card padding="lg" className="h-full items-start transition-shadow hover:shadow-card">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200">
                <HeartHandshake className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                If this moment is urgent
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Clear, immediate steps and real places for help — reached with one tap, any time.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 group-hover:translate-x-1 dark:text-sage-300">
                Get support <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Card>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 hidden opacity-60 lg:block"
        >
          <OrganicCircle size={240} tone="sand" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <Card padding="lg" className="bg-forest-800 text-ivory shadow-card sm:p-10 dark:bg-forest-900">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-300">
                  Meet the founder
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl dark:text-white">
                  Sometimes self-guided tools aren't enough.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/80">
                  Professional support is here when you want to speak with a person about what
                  you're experiencing — in a private, respectful and confidential space.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <ProfessionalAvatar name={PROFESSIONAL.name} size="md" tone="forest" />
                  <div className="text-left">
                    <p className="font-display text-lg font-semibold text-ivory dark:text-white">
                      {PROFESSIONAL.name}
                    </p>
                    <p className="text-sm text-sage-300">{PROFESSIONAL.role}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    to={`/professionals/${PROFESSIONAL.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-6 py-3 text-base font-medium text-forest-900 shadow-soft transition-all duration-300 hover:bg-sage-100 dark:bg-sage-100 dark:text-forest-900 dark:hover:bg-sage-200"
                  >
                    Meet {PROFESSIONAL.firstName}
                  </Link>
                  <a
                    href={PROFESSIONAL.mailto}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-base font-medium text-ivory transition-colors hover:border-ivory/60 hover:bg-white/10 dark:text-white dark:border-white/30"
                  >
                    Request support
                  </a>
                </div>
              </div>
              <div className="rounded-card bg-forest-900/40 p-6 sm:p-8 dark:bg-black/20">
                <h3 className="font-display text-xl font-semibold text-ivory dark:text-white">
                  A human conversation, when you need one
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/80">
                  {PROFESSIONAL.shortIntro}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {PROFESSIONAL.areasOfSupport.slice(0, 6).map((area) => (
                    <span key={area} className="inline-flex items-center gap-2 text-sm text-sage-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage-400" aria-hidden />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Landscape className="-mb-px h-28 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}