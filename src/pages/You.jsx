import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserRound,
  Settings,
  CalendarDays,
  ClipboardList,
  HeartHandshake,
  ChevronRight,
  Wind,
  Flame,
  Feather,
  Layers,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PROGRAMMES } from '../data/programmes';

const MOOD_LABELS = {
  5: 'Great',
  4: 'Good',
  3: 'Okay',
  2: 'Not great',
  1: 'Struggling',
};

const DAY = 24 * 60 * 60 * 1000;
const dayKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function formatDay(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { weekday: 'short' });
  } catch {
    return '';
  }
}

function avg(values) {
  if (!values.length) return null;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function computeStreak(entries) {
  const days = new Set(entries.map((e) => dayKey(new Date(e.date))));
  if (days.size === 0) return 0;
  let cursor = new Date();
  if (!days.has(dayKey(cursor))) {
    cursor = new Date(cursor.getTime() - DAY);
    if (!days.has(dayKey(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY);
  }
  return streak;
}

function Trend({ value }) {
  if (value > 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden /> higher than last time
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-700 dark:text-sage-300">
        <TrendingDown className="h-3.5 w-3.5" aria-hidden /> lower than last time
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 dark:text-stone-400">
      <Minus className="h-3.5 w-3.5" aria-hidden /> same as last time
    </span>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <Card padding="lg" className="items-start">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-800 dark:bg-white/10 dark:text-sage-200">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="mt-3 font-display text-3xl font-semibold text-forest-950 dark:text-sage-50">
        {value}
      </p>
      <p className="mt-0.5 text-sm font-medium text-stone-600 dark:text-stone-300">{label}</p>
    </Card>
  );
}

export default function You() {
  const [moodHistory] = useLocalStorage('moodHistory', []);
  const [assessmentHistory] = useLocalStorage('assessmentHistory', []);
  const [journalEntries] = useLocalStorage('journalEntries', []);
  const [programmeProgress] = useLocalStorage('programmeProgress', {});

  const latest = moodHistory[0] || null;
  const lastSeven = [...moodHistory].slice(0, 7).reverse();
  const moodStreak = computeStreak(moodHistory);
  const journalStreak = computeStreak(journalEntries);

  const [now] = useState(() => Date.now());
  const thisWeek = moodHistory.filter((e) => now - new Date(e.date).getTime() < 7 * DAY);
  const lastWeek = moodHistory.filter((e) => {
    const age = now - new Date(e.date).getTime();
    return age >= 7 * DAY && age < 14 * DAY;
  });
  const avgThisWeek = avg(thisWeek.map((e) => e.mood));
  const avgLastWeek = avg(lastWeek.map((e) => e.mood));
  const weekDelta =
    avgThisWeek !== null && avgLastWeek !== null
      ? avgThisWeek - avgLastWeek
      : null;

  const thisWeekJournal = journalEntries.filter(
    (e) => now - new Date(e.date).getTime() < 7 * DAY,
  );

  const doneTotal = PROGRAMMES.reduce(
    (sum, p) => sum + (programmeProgress[p.slug]?.length || 0),
    0,
  );
  const sessionTotal = PROGRAMMES.reduce((sum, p) => sum + p.sessions.length, 0);

  const depScores = assessmentHistory.filter((a) => a.type === 'depression').map((a) => a.score);
  const anxScores = assessmentHistory.filter((a) => a.type === 'anxiety').map((a) => a.score);
  const latestDep = depScores[0];
  const prevDep = depScores[1];
  const latestAnx = anxScores[0];
  const prevAnx = anxScores[1];

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-blob bg-lilac-200/40 blur-3xl dark:bg-lilac-300/10"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="You"
          as="h1"
          title="A quiet place to see yourself"
          description="Real trends from real moments you've logged — nothing invented, nothing shared. Everything here lives in this space, on your device."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={CalendarDays} label="Mood check-ins" value={moodHistory.length} />
          <Stat
            icon={Flame}
            label={moodStreak > 0 ? 'Check-in streak' : 'Check-in streak (0 until tomorrow)'}
            value={moodStreak || '—'}
          />
          <Stat icon={Feather} label="Journal entries" value={journalEntries.length} />
          <Stat
            icon={Layers}
            label="Programme sessions done"
            value={sessionTotal ? `${doneTotal}/${sessionTotal}` : '—'}
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          <Card padding="lg" className="lg:col-span-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Recent feeling
              </h2>
              {weekDelta !== null && (
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  Avg this week {avgThisWeek.toFixed(1)}
                  {avgLastWeek !== null && (
                    <>
                      {' '}· last week {avgLastWeek.toFixed(1)}
                    </>
                  )}
                </span>
              )}
            </div>

            {moodHistory.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  icon={<Wind className="h-8 w-8" />}
                  title="Nothing here yet"
                  description="When you do a mood check-in, it will appear here as a gentle trail of your days."
                />
                <Button to="/tools/mood-tracker" className="mt-4">
                  First check-in
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col justify-center rounded-soft bg-ivory p-5 dark:bg-forest-900">
                    <p className="text-xs uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                      Latest
                    </p>
                    <p className="mt-1 font-display text-3xl font-semibold text-forest-950 dark:text-sage-50">
                      {MOOD_LABELS[latest?.mood] || '—'}
                    </p>
                    {latest?.note ? (
                      <p className="mt-2 text-sm italic leading-relaxed text-stone-500 dark:text-stone-400">
                        “{latest.note}”
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                      Last seven days
                    </p>
                    <div className="mt-3 flex h-32 items-end justify-between gap-2">
                      {lastSeven.map((entry) => (
                        <div
                          key={entry.id}
                          className="group relative flex flex-1 flex-col items-center gap-1.5"
                        >
                          <span className="text-[11px] font-medium text-stone-500 group-hover:text-stone-700 dark:text-stone-300">
                            {MOOD_LABELS[entry.mood]?.[0] ?? ''}
                          </span>
                          <div
                            className="w-full rounded-full bg-forest-700/20"
                            style={{ height: `${entry.mood * 20}%`, minHeight: '4px' }}
                          />
                          <span className="text-[11px] text-stone-500 dark:text-stone-300">
                            {formatDay(entry.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-stone-400 dark:text-stone-500">
                  A week of consistently low check-ins is worth raising with a real person — even
                  just to say it out loud.
                </p>
              </>
            )}
          </Card>

          <div className="flex flex-col gap-5 lg:col-span-2">
            <Card padding="lg">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                  <ClipboardList className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                    Self-assessments
                  </h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Screens map your answers to a score — a conversation starter, not a diagnosis.
                  </p>
                </div>
              </div>

              {assessmentHistory.length === 0 ? (
                <Button to="/tools/assessment" variant="soft" className="mt-4">
                  Take a screening
                </Button>
              ) : (
                <div className="mt-4 space-y-3">
                  {(latestDep !== undefined || latestAnx !== undefined) && (
                    <div className="rounded-soft bg-ivory p-4 dark:bg-forest-900">
                      {latestDep !== undefined && (
                        <>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
                              Latest · Depression screen (PHQ-9)
                            </span>
                            <span className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                              {latestDep}
                            </span>
                          </div>
                          {prevDep !== undefined && (
                            <Trend value={latestDep - prevDep} />
                          )}
                        </>
                      )}
                      {latestAnx !== undefined && (
                        <>
                          <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-stone-900/5 pt-3 dark:border-white/10">
                            <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
                              Latest · Anxiety screen (GAD-7)
                            </span>
                            <span className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                              {latestAnx}
                            </span>
                          </div>
                          {prevAnx !== undefined && (
                            <Trend value={latestAnx - prevAnx} />
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button to="/tools/assessment" variant="soft" size="sm" className="flex-1">
                      Take again
                    </Button>
                  </div>

                  {assessmentHistory.length >= 2 && (
                    <p className="text-xs leading-relaxed text-stone-400 dark:text-stone-500">
                      Repeated or rising scores are a good reason to bring this up with a doctor or
                      therapist.
                    </p>
                  )}
                </div>
              )}
            </Card>

            <Card padding="lg">
              <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                Journal momentum
              </h2>
              {journalEntries.length === 0 ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    A few honest sentences, most days, quietly add up.
                  </p>
                  <Button to="/journal" variant="soft" size="sm">
                    Open the journal
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-soft bg-ivory p-3 text-center dark:bg-forest-900">
                      <p className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                        {journalEntries.length}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-300">entries</p>
                    </div>
                    <div className="rounded-soft bg-ivory p-3 text-center dark:bg-forest-900">
                      <p className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                        {journalStreak || '—'}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-300">day streak</p>
                    </div>
                    <div className="rounded-soft bg-ivory p-3 text-center dark:bg-forest-900">
                      <p className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                        {thisWeekJournal.length}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-300">this week</p>
                    </div>
                  </div>
                  <Link
                    to="/journal"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
                  >
                    Open the journal <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card padding="lg" className="bg-sand dark:bg-sand-200">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                <Layers className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-forest-950">
                  Your programmes
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-forest-950/80">
                  {doneTotal === 0
                    ? 'No sessions completed yet — every gentle start counts.'
                    : `${doneTotal} of ${sessionTotal} sessions across all programmes.`}
                </p>
              </div>
            </div>
<Link
                  to="/programmes"
                  className="flex items-center justify-between gap-3 rounded-soft px-3 py-2.5 text-sm font-medium text-forest-950/90 transition-colors hover:bg-forest-800/5 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  Programmes <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link
                  to="/support-plan"
                  className="flex items-center justify-between gap-3 rounded-soft px-3 py-2.5 text-sm font-medium text-forest-950/90 transition-colors hover:bg-forest-800/5 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  Support plan <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
          </Card>

          <Card padding="lg" className="bg-ivory dark:bg-forest-900">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-forest-900 dark:bg-sand-200 dark:text-forest-950">
                <Wind className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-forest-950 dark:text-sage-50">
                  Calm tools
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  Breathing and grounding exercises that meet you where you are, any time.
                </p>
              </div>
            </div>
            <Link
              to="/tools"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 hover:underline dark:text-sage-300"
            >
              Open tools <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Card>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link to="/settings" className="group">
            <Card className="flex-row items-center gap-4 transition-shadow hover:shadow-card">
              <Settings className="h-5 w-5 shrink-0 text-forest-700 dark:text-sage-300" strokeWidth={1.75} aria-hidden />
              <span className="font-medium text-stone-700 group-hover:text-forest-900 dark:text-stone-200 dark:group-hover:text-white">
                Privacy & settings
              </span>
              <ChevronRight className="ml-auto h-4 w-4 text-stone-400" aria-hidden />
            </Card>
          </Link>
          <Link to="/find-therapist" className="group">
            <Card className="flex-row items-center gap-4 transition-shadow hover:shadow-card">
              <UserRound className="h-5 w-5 shrink-0 text-forest-700 dark:text-sage-300" strokeWidth={1.75} aria-hidden />
              <span className="font-medium text-stone-700 group-hover:text-forest-900 dark:text-stone-200 dark:group-hover:text-white">
                Find support
              </span>
              <ChevronRight className="ml-auto h-4 w-4 text-stone-400" aria-hidden />
            </Card>
          </Link>
          <Link to="/crisis" className="group">
            <Card className="flex-row items-center gap-4 transition-shadow hover:shadow-card">
              <HeartHandshake className="h-5 w-5 shrink-0 text-forest-700 dark:text-sage-300" strokeWidth={1.75} aria-hidden />
              <span className="font-medium text-stone-700 group-hover:text-forest-900 dark:text-stone-200 dark:group-hover:text-white">
                If you're in crisis
              </span>
              <ChevronRight className="ml-auto h-4 w-4 text-stone-400" aria-hidden />
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}