import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ArrowLeft, ArrowRight, Check, AlertTriangle, PhoneCall, RotateCcw, Stethoscope } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Landscape from '../components/ui/Landscape';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn, formatDate } from '../lib/cn';

const OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const PHQ9 = [
  'Little interest or pleasure in doing things.',
  'Feeling down, depressed, or hopeless.',
  'Trouble falling or staying asleep, or sleeping too much.',
  'Feeling tired or having little energy.',
  'Poor appetite or overeating.',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down.',
  'Trouble concentrating on things, such as reading the newspaper or watching television.',
  'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual.',
  'Thoughts that you would be better off dead, or of hurting yourself in some way.',
].map((question, i) => ({ id: String(i + 1), question }));

const GAD7 = [
  'Feeling nervous, anxious, or on edge.',
  'Not being able to stop or control worrying.',
  'Worrying too much about different things.',
  'Trouble relaxing.',
  'Being so restless that it is hard to sit still.',
  'Becoming easily annoyed or irritable.',
  'Feeling afraid, as if something awful might happen.',
].map((question, i) => ({ id: String(i + 1), question }));

const BANDS = {
  depression: [
    { min: 0, max: 4, level: 'Minimal', note: 'Fewer symptoms, and usually not much day-to-day load.' },
    { min: 5, max: 9, level: 'Mild', note: 'Some symptoms. Worth mentioning to a doctor at your next visit.' },
    { min: 10, max: 14, level: 'Moderate', note: 'Noticeable load. A conversation with your doctor is a good next step.' },
    { min: 15, max: 19, level: 'Moderately severe', note: 'High load. Please plan to see a professional soon.' },
    { min: 20, max: 27, level: 'Severe', note: 'Very high load. Please reach out to professional support promptly.' },
  ],
  anxiety: [
    { min: 0, max: 4, level: 'Minimal', note: 'Fewer symptoms, and usually not much day-to-day load.' },
    { min: 5, max: 9, level: 'Mild', note: 'Some symptoms. Worth mentioning to a doctor at your next visit.' },
    { min: 10, max: 14, level: 'Moderate', note: 'Noticeable load. A conversation with your doctor is a good next step.' },
    { min: 15, max: 21, level: 'Severe', note: 'Very high load. Please reach out to professional support promptly.' },
  ],
};

function bandFor(type, score) {
  return BANDS[type].find((b) => score >= b.min && score <= b.max);
}

function Results({ type, score, flagged, history, date }) {
  const band = bandFor(type, score);
  return (
    <Card padding="lg">
      <div className="flex items-center gap-2">
        <Badge tone="sage">Complete</Badge>
        <span className="text-xs text-stone-400 dark:text-stone-500">{formatDate(date)}</span>
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
        Your {type === 'depression' ? 'PHQ-9' : 'GAD-7'} score: {score} of {type === 'depression' ? 27 : 21}
      </h2>
      <p className="mt-2 font-display text-lg text-forest-800 dark:text-sage-300">
        {band.level} symptoms
      </p>
      <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{band.note}</p>

      <div className="mt-5 rounded-soft bg-sage-50/70 p-4 dark:bg-white/5">
        <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-200">
          <strong>Please read honestly:</strong> scores like this are a screening, not a diagnosis.
          They do not decide anything about you on their own. They help you and a real clinician
          start an accurate conversation.
        </p>
      </div>

      {flagged && (
        <div className="mt-4 rounded-soft border border-rose-300 bg-rose-50 p-4 dark:border-rose-400/40 dark:bg-rose-400/10">
          <p className="font-semibold text-rose-900 dark:text-rose-100">
            You answered yes to thoughts of self-harm
          </p>
          <p className="mt-1 text-sm leading-relaxed text-rose-900/90 dark:text-rose-100/90">
            That\u2019s not something to sit with alone. Call 988 (US) — or 112 / your local emergency
            number — or open the crisis page right now.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="tel:988" className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
              <PhoneCall className="h-3.5 w-3.5" aria-hidden /> Call 988
            </a>
            <Link to="/crisis" className="inline-flex items-center gap-1.5 rounded-full border border-rose-400 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-100 dark:text-rose-200 dark:hover:bg-rose-400/20">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Crisis help
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-soft bg-ivory p-4 dark:bg-forest-900">
        <p className="text-sm font-semibold text-forest-950 dark:text-sage-50">Worth doing next</p>
        <ul className="mt-2 grid gap-2 text-sm text-stone-600 dark:text-stone-300 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
            {score <= 4 ? 'Keep the habits that are working.' : 'Mention this to your doctor.'}
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
            Re-screen in two weeks to see the direction.
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
            Look at the therapist guide — no rush needed.
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-sage-700 dark:text-sage-300" aria-hidden />
            Your results stay on this device.
          </li>
        </ul>
      </div>

      {history.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-forest-950 dark:text-sage-50">Your past screens</p>
          <div className="mt-3 overflow-hidden rounded-soft border border-stone-200 dark:border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-500 dark:bg-white/5 dark:text-stone-400">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Screen</th>
                  <th className="px-3 py-2 text-left font-medium">Score</th>
                  <th className="px-3 py-2 text-left font-medium">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                {history.slice(0, 6).map((a) => {
                  const b = bandFor(a.type, a.score);
                  return (
                    <tr key={a.id} className="bg-white dark:bg-forest-900">
                      <td className="px-3 py-2 text-stone-600 dark:text-stone-300">
                        {formatDate(a.date)}
                      </td>
                      <td className="px-3 py-2 capitalize text-stone-600 dark:text-stone-300">
                        {a.type === 'depression' ? 'Depression' : 'Anxiety'}
                      </td>
                      <td className="px-3 py-2 font-semibold text-forest-950 dark:text-sage-50">{a.score}</td>
                      <td className="px-3 py-2 text-stone-600 dark:text-stone-300">{b.level}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AssessmentTool() {
  const [type, setType] = useState('depression');
  const [stage, setStage] = useState('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useLocalStorage('assessmentHistory', []);
  const [lastResult, setLastResult] = useState(null);

  const questions = type === 'depression' ? PHQ9 : GAD7;
  const question = questions[index];
  const selected = answers[question?.id];

  const begin = (nextType) => {
    setType(nextType);
    setAnswers({});
    setIndex(0);
    setStage('questions');
  };

  const finish = () => {
    const score = questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const result = {
      id: Date.now(),
      type,
      score,
      date: new Date().toISOString(),
      answers: { ...answers },
    };
    setHistory([result, ...history]);
    setLastResult({
      ...result,
      flagged: type === 'depression' && (answers['9'] || 0) > 0,
    });
    setStage('results');
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-16 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Wellbeing screening"
            as="h1"
            title="A quiet, honest check-in with two standard screens"
            description="The PHQ-9 and GAD-7 are respected, public-domain questionnaires used by clinicians worldwide. They measure the symptoms you\u2019ve had over the last two weeks — they don\u2019t diagnose, and they don\u2019t decide anything alone."
          />

          {stage === 'intro' && (
            <Card padding="lg" className="mt-8">
              <h2 className="font-display text-xl font-semibold text-forest-950 dark:text-sage-50">
                Which would you like to take?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                Each takes about two minutes. Answer about the past two weeks. You can skip either
                of these entirely — they\u2019re tools, not requirements.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => begin('depression')}
                  className="group rounded-soft border border-stone-900/10 p-5 text-left transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/10 dark:hover:bg-forest-800"
                >
                  <ClipboardList className="h-5 w-5 text-forest-700 dark:text-sage-300" strokeWidth={1.75} aria-hidden />
                  <p className="mt-3 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">Depression · PHQ-9</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">9 questions · 0–27</p>
                </button>
                <button
                  type="button"
                  onClick={() => begin('anxiety')}
                  className="group rounded-soft border border-stone-900/10 p-5 text-left transition-colors hover:border-forest-600 hover:bg-sage-50 dark:border-white/10 dark:hover:bg-forest-800"
                >
                  <ClipboardList className="h-5 w-5 text-forest-700 dark:text-sage-300" strokeWidth={1.75} aria-hidden />
                  <p className="mt-3 font-display text-lg font-semibold text-forest-950 dark:text-sage-50">Anxiety · GAD-7</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">7 questions · 0–21</p>
                </button>
              </div>
              {history.length > 0 && (
                <p className="mt-5 text-xs text-stone-400 dark:text-stone-500">
                  You\u2019ve completed {history.length} {history.length === 1 ? 'screen' : 'screens'} — results show at the end.
                </p>
              )}
            </Card>
          )}

          {stage === 'questions' && (
            <Card padding="lg" className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge tone="sage">{type === 'depression' ? 'PHQ-9 · Depression' : 'GAD-7 · Anxiety'}</Badge>
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  Question {index + 1} of {questions.length}
                </span>
              </div>
              <div className="mt-4">
                <ProgressBar value={((index + 1) / questions.length) * 100} />
              </div>

              <p className="mt-8 font-display text-xl leading-relaxed text-forest-950 dark:text-sage-50">
                Over the past two weeks, how often have you been bothered by:
              </p>
              <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-200">
                {question.question}
              </p>

              <div className="mt-6 space-y-2">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [question.id]: opt.value })}
                    aria-pressed={selected === opt.value}
                    className={cn(
                      'flex w-full items-center justify-between rounded-soft border px-4 py-3 text-left text-sm transition-colors',
                      selected === opt.value
                        ? 'border-forest-700 bg-sage-50 text-forest-950 dark:border-sage-300 dark:bg-forest-800 dark:text-sage-50'
                        : 'border-stone-900/10 text-stone-700 hover:border-forest-500 hover:bg-sage-50/50 dark:border-white/10 dark:text-stone-200 dark:hover:border-sage-400 dark:hover:bg-forest-800/60',
                    )}
                  >
                    <span>{opt.label}</span>
                    {selected === opt.value && (
                      <Check className="h-4 w-4 text-forest-700 dark:text-sage-300" aria-hidden />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden /> Back
                </Button>
                <Button
                  onClick={() => (index === questions.length - 1 ? finish() : setIndex((i) => i + 1))}
                  disabled={!selected}
                >
                  {index === questions.length - 1 ? 'See results' : 'Next'}
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </Card>
          )}

          {stage === 'results' && lastResult && (
            <div className="mt-8">
              <Results type={lastResult.type} score={lastResult.score} flagged={lastResult.flagged} history={history} date={lastResult.date} />
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button variant="secondary" onClick={() => setStage('intro')}>
                  <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden /> Take another screen
                </Button>
                <Link
                  to="/find-therapist"
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-5 py-2 text-sm font-semibold text-ivory transition-colors hover:bg-forest-900 dark:bg-forest-700 dark:hover:bg-forest-600"
                >
                  <Stethoscope className="h-4 w-4" aria-hidden /> A therapist can help next
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}