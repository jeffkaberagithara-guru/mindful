import { useState } from 'react';
import { History, PenLine, Trash2, CheckCircle2, Inbox } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import MoodSelector from '../components/ui/MoodSelector';
import { Input } from '../components/ui/Field';
import Landscape from '../components/ui/Landscape';
import { useToast } from '../components/ui/ToastContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn, formatDate } from '../lib/cn';

const MOOD_LABELS = {
  5: 'Bright',
  4: 'Good',
  3: 'Okay',
  2: 'Low',
  1: 'Very low',
};

function todayStamp(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function MoodBadge({ mood, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium',
        mood >= 4 && 'bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200',
        mood === 3 && 'bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200',
        mood === 2 && 'bg-mist-100 text-mist-800 dark:bg-mist-300/20 dark:text-mist-200',
        mood === 1 && 'bg-lilac-100 text-lilac-800 dark:bg-lilac-300/20 dark:text-lilac-200',
        className,
      )}
    >
      {MOOD_LABELS[mood]}
    </span>
  );
}

export default function MoodTracker() {
  const toast = useToast();
  const [moodHistory, setMoodHistory] = useLocalStorage('moodHistory', []);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');

  const today = todayStamp();
  const todaysEntry = moodHistory.find((e) => todayStamp(new Date(e.date)) === today);
  const isEditingToday = todaysEntry != null;

  const save = () => {
    if (!mood) return;
    const keepOthers = todaysEntry ? moodHistory.filter((e) => e !== todaysEntry) : moodHistory;
    const entry = {
      id: Date.now(),
      mood,
      note: note.trim(),
      date: new Date().toISOString(),
    };
    setMoodHistory([entry, ...keepOthers]);
    toast.success(isEditingToday ? 'Today\u2019s check-in updated.' : 'Checked in — thank you for showing up.');
    setMood(null);
    setNote('');
  };

  const remove = (entry) => {
    setMoodHistory(moodHistory.filter((e) => e.id !== entry.id));
    toast.info('Check-in removed.');
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Tools"
            as="h1"
            title="Mood check-in & history"
            description="One honest tap about how you feel today — kept entirely on this device. A small trail of days adds up to a clearer picture over time."
          />

          <Card padding="lg" className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                How are you feeling right now?
              </h2>
              {isEditingToday && (
                <span className="inline-flex items-center gap-1.5 text-sm text-forest-800 dark:text-sage-300">
                  <PenLine className="h-3.5 w-3.5" aria-hidden />
                  You checked in today
                  {todaysEntry.mood && (
                    <>
                      {' '}as <MoodBadge mood={todaysEntry.mood} />
                    </>
                  )}
                </span>
              )}
            </div>

            <div className="mt-6">
              <MoodSelector value={mood ?? todaysEntry?.mood ?? null} onChange={setMood} size="lg" />
            </div>

            <div className="mt-6">
              <Input
                label="A note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="One quiet line about today\u2026"
              />
            </div>

            <div className="mt-6">
              <Button onClick={save} disabled={!mood}>
                {isEditingToday ? 'Update today\u2019s check-in' : 'Save today\u2019s check-in'}
                <CheckCircle2 className="ml-1.5 h-4 w-4" aria-hidden />
              </Button>
              {isEditingToday && (
                <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
                  You already checked in today — saving will update this entry rather than add a second one.
                </p>
              )}
            </div>
          </Card>

          <div className="mt-10">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-forest-700 dark:text-sage-300" aria-hidden />
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Your mood history
              </h2>
            </div>

            {moodHistory.length === 0 ? (
              <Card padding="lg" className="mt-4">
                <EmptyState
                  icon={<Inbox className="h-6 w-6" strokeWidth={1.75} />}
                  title="Nothing here yet"
                  description="Your check-ins will show up here as a gentle trail of your days."
                />
              </Card>
            ) : (
              <ul className="mt-4 space-y-2">
                {moodHistory.slice(0, 30).map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center gap-3 rounded-soft border border-stone-900/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-forest-900"
                  >
                    <MoodBadge mood={entry.mood} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-stone-400 dark:text-stone-500">
                        {formatDate(entry.date, { weekday: 'short', day: 'numeric', month: 'short' })}
                      </p>
                      {entry.note && (
                        <p className="mt-0.5 truncate text-sm text-stone-700 dark:text-stone-200">{entry.note}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(entry)}
                      aria-label="Remove this check-in"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-400/10"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {moodHistory.length > 30 && (
              <p className="mt-3 text-sm text-stone-400 dark:text-stone-500">
                Showing the most recent 30 check-ins.
              </p>
            )}

            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Your mood history stays on this device. You can clear it any time in Settings, under
              Your data.
            </p>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}