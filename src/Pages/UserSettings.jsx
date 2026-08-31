import {
  Sun,
  Moon,
  Type,
  Accessibility,
  Eye,
  Download,
  Trash2,
  ShieldCheck,
  Database,
} from 'lucide-react';
import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Landscape from '../components/ui/Landscape';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../components/ui/ToastContext';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { cn } from '../lib/cn';

const TEXT_SIZES = [
  { value: 'small', label: 'Small', glyph: 'simple' },
  { value: 'medium', label: 'Medium', glyph: 'Aa' },
  { value: 'large', label: 'Large', glyph: 'Aa' },
  { value: 'xlarge', label: 'Extra large', glyph: 'Aa' },
];

function SettingRow({ icon: Icon, title, body, children }) {
  return (
    <div className="flex flex-col gap-4 rounded-soft border border-stone-900/5 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-800 dark:bg-white/10 dark:text-sage-200">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-forest-950 dark:text-sage-50">{title}</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{body}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Segmented({ options, value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-soft bg-stone-900/5 p-1 dark:bg-white/5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-soft px-3 py-1.5 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-forest-800 text-ivory shadow-sm dark:bg-forest-700 dark:text-white'
              : 'text-stone-600 hover:text-forest-900 dark:text-stone-300 dark:hover:text-white',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function UserSettings() {
  const toast = useToast();
  const [confirmClear, setConfirmClear] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium');
  const [reduceMotion, setReduceMotion] = useLocalStorage('reduceMotion', false);
  const [dyslexiaFont, setDyslexiaFont] = useLocalStorage('dyslexiaFont', false);
  const [highContrast, setHighContrast] = useLocalStorage('highContrast', false);

  const [moodHistory] = useLocalStorage('moodHistory', []);
  const [assessmentHistory] = useLocalStorage('assessmentHistory', []);
  const [journalEntries] = useLocalStorage('journalEntries', []);
  const [programmeProgress] = useLocalStorage('programmeProgress', {});
  const [supportPlan] = useLocalStorage('supportPlan', {});

  const supportFilled = Object.values(supportPlan).some((v) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim()),
  );

  const exportData = () => {
    const payload = {
      app: 'mindshift',
      exportedAt: new Date().toISOString(),
      preferences: { theme, fontSize, reduceMotion, dyslexiaFont, highContrast },
      data: {
        moodHistory,
        assessmentHistory,
        journalEntries,
        programmeProgress,
        supportPlan,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindshift-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('All your MindShift data exported.');
  };

  const clearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-16 h-80 w-80 rounded-blob bg-lilac-200/40 blur-3xl dark:bg-lilac-300/10"
        />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Settings"
            as="h1"
            title="Make it yours, keep it yours"
            description="Adjust how MindShift looks and feels for you, and stay in full control of everything you've written here."
          />

          <div className="mt-12 space-y-6">
            <Card padding="lg">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                  <Sun className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Appearance
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-forest-950 dark:text-sage-50">Theme</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Light for bright rooms, dark for quiet ones.</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setTheme('light')}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        theme === 'light'
                          ? 'bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white'
                          : 'text-stone-600 hover:text-forest-900 dark:text-stone-300 dark:hover:text-white',
                      )}
                    >
                      <Sun className="h-3.5 w-3.5" aria-hidden /> Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme('dark')}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        theme === 'dark'
                          ? 'bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white'
                          : 'text-stone-600 hover:text-forest-900 dark:text-stone-300 dark:hover:text-white',
                      )}
                    >
                      <Moon className="h-3.5 w-3.5" aria-hidden /> Dark
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-forest-950 dark:text-sage-50">Text size</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Changes how large everything reads.</p>
                  </div>
                  <Segmented
                    label="Text size"
                    options={TEXT_SIZES.map((s) => ({ value: s.value, label: s.value === 'small' ? 'S' : s.value === 'medium' ? 'M' : s.value === 'large' ? 'L' : 'XL' }))}
                    value={fontSize}
                    onChange={setFontSize}
                  />
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peach-100 text-peach-800 dark:bg-peach-300/20 dark:text-peach-200">
                  <Accessibility className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Reading & accessibility
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                <SettingRow
                  icon={Eye}
                  title="Reduce animations"
                  body="Calms all motion in the app, and honours your system\u2019s reduced-motion setting."
                >
                  <Toggle checked={reduceMotion} onChange={setReduceMotion} label="Reduce animations" />
                </SettingRow>
                <SettingRow
                  icon={Type}
                  title="Dyslexia-friendly type"
                  body="Switches to a plainer, more widely spaced typeface."
                >
                  <Toggle checked={dyslexiaFont} onChange={setDyslexiaFont} label="Dyslexia-friendly type" />
                </SettingRow>
                <SettingRow
                  icon={Database}
                  title="Higher contrast"
                  body="Darkens light text and strengthens focus outlines for easier reading."
                >
                  <Toggle checked={highContrast} onChange={setHighContrast} label="Higher contrast" />
                </SettingRow>
              </div>
            </Card>

            <Card padding="lg">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-ivory dark:bg-forest-700 dark:text-white">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                  Your data, on your device
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                MindShift has no account and no server. Everything it makes — check-ins, screenings,
                journal entries, programme progress, your support plan — lives in this browser, on
                this device. Nothing is uploaded, shared or sold, and there’s nothing to delete on
                our side.
              </p>

              <div className="mt-5 rounded-soft bg-ivory p-4 dark:bg-forest-900">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                  Stored on this device
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                  <dt className="text-stone-500 dark:text-stone-400">Mood check-ins</dt>
                  <dd className="font-semibold text-forest-950 dark:text-sage-50">{moodHistory.length}</dd>
                  <dt className="text-stone-500 dark:text-stone-400">Screenings</dt>
                  <dd className="font-semibold text-forest-950 dark:text-sage-50">{assessmentHistory.length}</dd>
                  <dt className="text-stone-500 dark:text-stone-400">Journal entries</dt>
                  <dd className="font-semibold text-forest-950 dark:text-sage-50">{journalEntries.length}</dd>
                  <dt className="text-stone-500 dark:text-stone-400">Programme sessions</dt>
                  <dd className="font-semibold text-forest-950 dark:text-sage-50">
                    {Object.values(programmeProgress).reduce((sum, ids) => sum + ids.length, 0)}
                  </dd>
                  <dt className="text-stone-500 dark:text-stone-400">Support plan</dt>
                  <dd className="font-semibold text-forest-950 dark:text-sage-50">{supportFilled ? 'Yes' : 'No'}</dd>
                </dl>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={exportData} variant="secondary" className="flex-1">
                  <Download className="mr-1.5 h-4 w-4" aria-hidden /> Export everything
                </Button>
                <Button onClick={() => setConfirmClear(true)} variant="danger" className="flex-1">
                  <Trash2 className="mr-1.5 h-4 w-4" aria-hidden /> Clear everything
                </Button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-400 dark:text-stone-500">
                Export saves a readable copy you could take anywhere. Clear removes everything stored
                in this browser — including these preferences — and can\u2019t be undone.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
      <ConfirmDialog
        isOpen={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={clearAll}
        title="Clear everything?"
        body="This deletes every piece of data MindShift has stored on this device — mood history, screenings, journal entries, programme progress, your support plan, and your preferences. It can\u2019t be undone."
        confirmLabel="Clear everything"
      />
    </>
  );
}