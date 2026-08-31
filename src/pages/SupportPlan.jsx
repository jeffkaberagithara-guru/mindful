import { Link } from 'react-router-dom';
import { Plus, Trash2, FileDown, ShieldPlus, PhoneCall, AlertTriangle } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import EmptyState from '../components/ui/EmptyState';
import { Textarea, Input } from '../components/ui/Field';
import Landscape from '../components/ui/Landscape';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../components/ui/ToastContext';

const emptyPlan = {
  warningSigns: '',
  calmTools: [],
  safePlaces: '',
  people: [],
  professionals: [],
};

const newItem = () => ({ id: crypto.randomUUID(), name: '', contact: '' });

function PersonList({ items, onChange, title, placeholderName, placeholderContact }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            className="flex-1"
            aria-label="Name"
            placeholder={placeholderName}
            value={item.name}
            onChange={(e) =>
              onChange(items.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)))
            }
          />
          <Input
            className="flex-1"
            aria-label="Contact"
            placeholder={placeholderContact}
            value={item.contact}
            onChange={(e) =>
              onChange(items.map((i) => (i.id === item.id ? { ...i, contact: e.target.value } : i)))
            }
          />
          <IconButton
            type="button"
            onClick={() => onChange(items.filter((i) => i.id !== item.id))}
            label={`Remove ${title.toLowerCase()}`}
            tone="danger"
            size="sm"
            className="shrink-0 border border-stone-200 dark:border-white/15"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </IconButton>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onChange([...items, newItem()])}>
        <Plus className="h-4 w-4" aria-hidden /> Add {title.toLowerCase()}
      </Button>
    </div>
  );
}

export default function SupportPlan() {
  const toast = useToast();
  const [plan, setPlan] = useLocalStorage('supportPlan', emptyPlan);

  const set = (key, value) => setPlan({ ...plan, [key]: value });

  const calmAdd = () => set('calmTools', [...plan.calmTools, '']);
  const calmSet = (i, value) =>
    set('calmTools', plan.calmTools.map((t, idx) => (idx === i ? value : t)));
  const calmRemove = (i) => set('calmTools', plan.calmTools.filter((_, idx) => idx !== i));

  const hasContent =
    plan.warningSigns.trim() ||
    plan.calmTools.some((t) => t.trim()) ||
    plan.safePlaces.trim() ||
    plan.people.some((p) => p.name.trim()) ||
    plan.professionals.some((p) => p.name.trim());

  const exportPlan = () => {
    const lines = [];
    lines.push('MY SUPPORT PLAN — MindShift');
    lines.push(`Made ${new Date().toLocaleDateString()} on my own device.`);
    lines.push('');
    lines.push('IF THERE IS AN EMERGENCY RIGHT NOW: call 112 (or your local emergency number) or go to the nearest emergency room.');
    lines.push('');
    lines.push('WARNING SIGNS');
    lines.push(plan.warningSigns.trim() || '(not filled in)');
    lines.push('');
    lines.push('WHAT CALMS ME');
    lines.push(...plan.calmTools.map((t) => `- ${t.trim() || '(blank)'}`));
    lines.push('');
    lines.push('SAFE PLACES');
    lines.push(plan.safePlaces.trim() || '(not filled in)');
    lines.push('');
    lines.push('PEOPLE I CAN REACH OUT TO');
    lines.push(...plan.people.map((p) => `- ${p.name.trim() || '(name)'}${p.contact.trim() ? ` — ${p.contact.trim()}` : ''}`));
    lines.push('');
    lines.push('PROFESSIONALS');
    lines.push(...plan.professionals.map((p) => `- ${p.name.trim() || '(name)'}${p.contact.trim() ? ` — ${p.contact.trim()}` : ''}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-support-plan-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Support plan exported as a text file.');
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-16 h-80 w-80 rounded-blob bg-sage-200/50 blur-3xl dark:bg-sage-300/10"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-col gap-4">
            <SectionHeader
              eyebrow="Support plan"
              as="h1"
              title="Your plan, written ahead of the hard days"
              description="A personal support plan is a real, respected tool: you write down warning signs, what calms you, and who to call — before you need it. It lives on this device, and only you decide who sees it."
            />
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <p className="text-sm text-stone-600 dark:text-stone-300">
                <PhoneCall className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                Not a substitute for professional advice — but it makes the next moment easier to manage.
              </p>
            </div>
          </div>

          {!hasContent && (
            <div className="mt-8">
              <EmptyState
                icon={<ShieldPlus className="h-8 w-8" />}
                title="A blank page is the best start"
                description="Fill in only what feels true to you. Leave anything you can't yet answer — a plan that is half-written is still a plan."
              />
            </div>
          )}

          <div className="mt-8 space-y-5">
            <Card padding="lg">
              <Textarea
                label="My warning signs"
                hint="The first small signals that things are heading a hard way — thoughts, feelings, sleep changes."
                rows={4}
                placeholder="e.g. sleeping through alarms, cancelling plans, that hollow feeling behind the ribs…"
                value={plan.warningSigns}
                onChange={(e) => set('warningSigns', e.target.value)}
              />
            </Card>

            <Card padding="lg">
              <p className="text-sm font-semibold text-forest-800 dark:text-sage-300">What calms me</p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                Small things that actually help — breathing, a walk, music, a person, a place.
              </p>
              <div className="mt-3 space-y-2">
                {plan.calmTools.map((tool, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      className="flex-1"
                      aria-label="Calming thing"
                      placeholder="e.g. five minutes of box breathing"
                      value={tool}
                      onChange={(e) => calmSet(i, e.target.value)}
                    />
                    <IconButton
                      type="button"
                      onClick={() => calmRemove(i)}
                      label="Remove calming thing"
                      tone="danger"
                      size="sm"
                      className="shrink-0 border border-stone-200 dark:border-white/15"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </IconButton>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={calmAdd}>
                  <Plus className="h-4 w-4" aria-hidden /> Add a calming thing
                </Button>
              </div>
            </Card>

            <Card padding="lg">
              <Textarea
                label="Places that feel safe"
                hint="Somewhere you can be without bracing. A favourite room, a bench, a car, a voice."
                rows={3}
                placeholder="e.g. my bedroom with the door closed, the park bench by the lake, my car at night…"
                value={plan.safePlaces}
                onChange={(e) => set('safePlaces', e.target.value)}
              />
            </Card>

            <Card padding="lg">
              <p className="text-sm font-semibold text-forest-800 dark:text-sage-300">People I can reach out to</p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                Ask them first, if you can — the list is stronger when they know they're on it.
              </p>
              <div className="mt-3">
                <PersonList
                  items={plan.people}
                  onChange={(people) => set('people', people)}
                  title="A person"
                  placeholderName="Their name"
                  placeholderContact="Phone or how to reach them"
                />
              </div>
            </Card>

            <Card padding="lg">
              <p className="text-sm font-semibold text-forest-800 dark:text-sage-300">My professionals</p>
              <div className="mt-3">
                <PersonList
                  items={plan.professionals}
                  onChange={(professionals) => set('professionals', professionals)}
                  title="A professional"
                  placeholderName="Doctor / therapist"
                  placeholderContact="Clinic and number"
                />
              </div>
            </Card>

            <Card padding="lg" className="border border-rose-200 bg-rose-50/50 dark:border-rose-400/30 dark:bg-rose-400/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                    If there is an emergency right now
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-rose-800/90 dark:text-rose-200/90">
                    Call <strong>112</strong> (or your local emergency number) or go to the nearest
                    emergency room. Struggling to be safe beats trying to be strong — every time.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-md text-xs leading-relaxed text-stone-400 dark:text-stone-500">
              Bring this with you to a doctor or therapist if you like — it's a shortcut to the
              conversation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => { setPlan(emptyPlan); toast.info('Support plan cleared.'); }}>
                Clear
              </Button>
              <Button onClick={exportPlan} disabled={!hasContent}>
                <FileDown className="mr-1.5 h-4 w-4" aria-hidden /> Export plan
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/crisis"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-rose-500 hover:text-rose-700 dark:border-white/20 dark:text-stone-200 dark:hover:border-rose-400 dark:hover:text-rose-300"
            >
              Need help right now
            </Link>
            <Link
              to="/find-therapist"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-forest-700 hover:text-forest-900 dark:border-white/20 dark:text-stone-200 dark:hover:border-sage-300 dark:hover:text-white"
            >
              Finding a therapist
            </Link>
          </div>
        </div>
      </section>
      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}