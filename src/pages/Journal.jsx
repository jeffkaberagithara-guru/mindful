import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Feather, Trash2, Download, Sparkles, Flame, CalendarDays } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import MoodSelector from '../components/ui/MoodSelector';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { Textarea } from '../components/ui/Field';
import { useToast } from '../components/ui/ToastContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { JOURNAL_PROMPTS, randomPrompt } from '../data/journalPrompts';
import Landscape from '../components/ui/Landscape';
import { cn } from '../lib/cn';

const MOOD_LABELS = {
  5: 'Bright',
  4: 'Good',
  3: 'Okay',
  2: 'Low',
  1: 'Very low',
};

function formatEntryDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function computeStreak(entries) {
  const days = new Set(entries.map((e) => {
    const d = new Date(e.date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }));
  if (days.size === 0) return 0;
  const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  let cursor = new Date();
  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function Journal() {
  const toast = useToast();
  const [entries, setEntries] = useLocalStorage('journalEntries', []);
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);
  const [prompt, setPrompt] = useState(JOURNAL_PROMPTS[0]);
  const [open, setOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const streak = computeStreak(entries);

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setEntries([
      { id: Date.now(), text: trimmed, mood, date: new Date().toISOString() },
      ...entries,
    ]);
    setText('');
    setMood(null);
    setPrompt(randomPrompt(prompt));
    toast.success('Entry saved — it stays on this device.');
  };

  const remove = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
    if (open === id) setOpen(null);
    toast.info('Entry deleted.');
  };

  const exportText = () => {
    if (entries.length === 0) return;
    const body = [...entries]
      .reverse()
      .map((e) => `— ${formatEntryDate(e.date)}${e.mood ? ` (${MOOD_LABELS[e.mood]})` : ''}\n\n${e.text}`)
      .join('\n\n---\n\n');
    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindshift-journal-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Journal exported as a text file.');
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-blob bg-peach-200/40 blur-3xl dark:bg-peach-300/10"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-col gap-4">
            <SectionHeader
              eyebrow="Journal"
              as="h1"
              title="Your private notebook"
              description="A calm place to put words to your day. Everything here stays on this device — it\u2019s yours, and yours alone."
            />
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1.5 text-sm font-semibold text-sage-800 dark:bg-sage-300/20 dark:text-sage-200">
                <Flame className="h-3.5 w-3.5" aria-hidden />
                {streak > 0
                  ? `${streak} day${streak === 1 ? '' : 's'} in a row`
                  : 'Start a streak today'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-sm font-semibold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
          </div>

          <Card padding="lg" className="mt-8 shadow-card">
            <button
              type="button"
              onClick={() => setPrompt(randomPrompt(prompt))}
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-stone-900/15 bg-sage-50/60 px-3 py-1.5 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-600 dark:border-white/15 dark:bg-white/5 dark:text-sage-300"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden aria-label="give me another prompt" />
              Give me a gentle prompt
            </button>
            <p className="mt-3 font-display text-lg leading-relaxed text-forest-950 dark:text-sage-50">
              “{prompt}”
            </p>

            <div className="mt-5">
              <Textarea
                label="Your words"
                hint="optional — write as much or as little as you like"
                rows={5}
                placeholder="Start writing…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="sm:max-w-sm">
                <p className="mb-1.5 text-sm font-medium text-stone-400 dark:text-stone-500">
                  Optional mood tag
                </p>
                <MoodSelector value={mood} onChange={setMood} />
              </div>
              <Button onClick={save} disabled={!text.trim()}>
                <Feather className="mr-1.5 h-4 w-4" aria-hidden /> Save entry
              </Button>
            </div>
          </Card>

          <div className="mt-12 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
              Your entries
            </h2>
            {entries.length > 0 && (
              <Button variant="ghost" size="sm" onClick={exportText}>
                <Download className="h-4 w-4" aria-hidden /> Export
              </Button>
            )}
          </div>

          {entries.length === 0 ? (
            <EmptyState
              icon={<Feather className="h-8 w-8" />}
              title="No entries yet"
              description="Your first entry lives above. There\u2019s no wrong way to start \u2014 one honest sentence is a real entry."
            />
          ) : (
            <div className="mt-6 space-y-4">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card padding="lg">
                      <button
                        type="button"
                        onClick={() => setOpen(open === entry.id ? null : entry.id)}
                        className="flex w-full items-baseline justify-between gap-3 text-left"
                        aria-expanded={open === entry.id}
                      >
                        <span className="text-sm font-semibold text-forest-800 dark:text-sage-300">
                          {formatEntryDate(entry.date)}
                        </span>
                        <span className="flex items-center gap-2">
                          {entry.mood ? (
                            <span
                              className={cn(
                                'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium',
                                entry.mood >= 4 && 'bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200',
                                entry.mood === 3 && 'bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200',
                                entry.mood === 2 && 'bg-mist-100 text-mist-800 dark:bg-mist-300/20 dark:text-mist-200',
                                entry.mood === 1 && 'bg-lilac-100 text-lilac-800 dark:bg-lilac-300/20 dark:text-lilac-200',
                              )}
                            >
                              {MOOD_LABELS[entry.mood]}
                            </span>
                          ) : null}
                          <span className="text-stone-400 dark:text-stone-500">
                            {open === entry.id ? 'Hide' : 'Read'}
                          </span>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open === entry.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="whitespace-pre-wrap pt-4 text-base leading-relaxed text-stone-700 dark:text-stone-200">
                              {entry.text}
                            </p>
                            <div className="mt-5 flex justify-end">
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(entry.id)}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-400 transition-colors hover:text-rose-600 dark:text-stone-500 dark:hover:text-rose-400"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-peach-200/80 dark:text-forest-900" aria-hidden />
      <ConfirmDialog
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete !== null) remove(confirmDelete);
        }}
        title="Delete this entry?"
        body="This can\u2019t be undone — the entry will be gone from this device for good."
        confirmLabel="Delete entry"
      />
    </>
  );
}