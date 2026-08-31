import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, GraduationCap, HeartHandshake } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProfessionalAvatar from '../components/professional/ProfessionalAvatar';
import Landscape from '../components/ui/Landscape';
import { PROFESSIONAL } from '../data/professionalProfile';

function Section({ eyebrow, title, children }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-700 dark:text-sage-400">
        {eyebrow}
      </p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-forest-950 dark:text-sage-50">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function PillList({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 rounded-soft border border-stone-900/8 bg-white/60 px-4 py-3 text-sm leading-relaxed text-stone-700 dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500 dark:bg-sage-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProfessionalProfile() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-12 pt-8 sm:pt-12">
        <Link
          to="/find-therapist"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-forest-800 dark:text-stone-400 dark:hover:text-sage-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Find support
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
          <div className="flex flex-col items-center text-center lg:sticky lg:top-24 lg:items-start lg:text-left">
            <ProfessionalAvatar name={PROFESSIONAL.name} size="xl" />
            <Badge tone="sage" size="md" className="mt-6">
              {PROFESSIONAL.role}
            </Badge>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-forest-950 sm:text-5xl dark:text-sage-50">
              {PROFESSIONAL.name.replace(' ', '\u00A0')}
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-stone-600 dark:text-stone-300">
              {PROFESSIONAL.shortIntro}
            </p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <a
                href={PROFESSIONAL.mailto}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-base font-medium text-ivory shadow-soft transition-all duration-300 hover:bg-forest-900 hover:shadow-card lg:w-auto dark:bg-forest-700 dark:text-white dark:hover:bg-forest-600"
              >
                Request a consultation
              </a>
              <div className="flex gap-3">
                <a
                  href={PROFESSIONAL.telLink}
                  aria-label={`Call ${PROFESSIONAL.name}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-900/15 px-5 py-3 text-sm font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 lg:flex-none lg:px-6 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call
                </a>
                <a
                  href={PROFESSIONAL.mailto}
                  aria-label={`Email ${PROFESSIONAL.name}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-900/15 px-5 py-3 text-sm font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-sage-50 lg:flex-none lg:px-6 dark:border-white/15 dark:text-sage-50 dark:hover:bg-forest-800"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Section eyebrow="About" title="Getting to know the person behind the support">
              {PROFESSIONAL.about.map((p) => (
                <p key={p} className="text-base leading-relaxed text-stone-700 dark:text-stone-200">
                  {p}
                </p>
              ))}
            </Section>

            <Section eyebrow="Areas of support" title="Topics Bernadatte can help clients explore">
              <PillList items={PROFESSIONAL.areasOfSupport} />
            </Section>

            <Section eyebrow="Professional approach" title="How support works">
              {PROFESSIONAL.approach.map((p) => (
                <p key={p} className="text-base leading-relaxed text-stone-700 dark:text-stone-200">
                  {p}
                </p>
              ))}
            </Section>

            <Section eyebrow="Professional strengths" title="Ways of working">
              <PillList items={PROFESSIONAL.strengths} />
            </Section>

            {PROFESSIONAL.education && PROFESSIONAL.education.length > 0 && (
              <Section eyebrow="Education & professional development" title="Background & qualifications">
                <ul className="space-y-3">
                  {PROFESSIONAL.education.map((ed) => (
                    <li
                      key={`${ed.degree}-${ed.institution}`}
                      className="flex items-start gap-3 rounded-soft border border-stone-900/8 bg-white/60 px-4 py-3.5 text-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-forest-700 dark:text-sage-300" aria-hidden />
                      <span>
                        <span className="font-medium text-forest-950 dark:text-sage-50">{ed.degree}</span>
                        {ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ''}
                        {ed.institution ? (
                          <span className="block text-stone-600 dark:text-stone-300">{ed.institution}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section eyebrow="Contact" title="Start a conversation">
              <Card padding="lg" surface="tinted">
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                      <Phone className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">Phone</p>
                      <a href={PROFESSIONAL.telLink} className="text-base font-semibold text-forest-950 hover:underline dark:text-sage-50">
                        {PROFESSIONAL.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-800 dark:bg-sage-300/20 dark:text-sage-200">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">Email</p>
                      <a href={PROFESSIONAL.mailto} className="text-base font-semibold text-forest-950 hover:underline dark:text-sage-50">
                        {PROFESSIONAL.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-stone-900/8 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                  <p className="text-sm text-stone-600 dark:text-stone-300">
                    Reach out for guidance, counselling or to ask whether this is the right next step for you.
                  </p>
                  <a
                    href={PROFESSIONAL.mailto}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all duration-300 hover:bg-forest-900 dark:bg-forest-700 dark:text-white dark:hover:bg-forest-600"
                  >
                    Request a consultation
                  </a>
                </div>
              </Card>
            </Section>

            <div className="rounded-card border border-stone-900/8 bg-white/60 p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start gap-3">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden />
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  Need something more urgent? This contact is for counselling and guidance. If you are
                  in crisis or thinking about harming yourself or someone else,{' '}
                  <Link to="/crisis" className="font-semibold text-rose-700 underline-offset-2 hover:underline dark:text-rose-300">
                    go to crisis support
                  </Link>{' '}
                  instead — it is always free and always available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Landscape className="-mb-px h-24 w-full text-sage-200/80 dark:text-forest-900" aria-hidden />
    </>
  );
}
