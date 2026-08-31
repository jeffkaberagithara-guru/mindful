import { ARTICLES, getArticle } from './articles.js';
import { PROGRAMMES, getProgramme } from './programmes.js';
import { PROFESSIONAL } from './professionalProfile.js';

export const SITE = {
  name: 'MindShift',
  tagline: 'Your space for mental wellbeing',
  // TODO(deploy): replace the placeholder URL with the production domain before going live.
  url: 'https://mindshift.example.com',
};

const STATIC_META = {
  '/': {
    title: 'MindShift — Your space for mental wellbeing',
    description:
      'MindShift is a private, device-local space for your mental wellbeing — mood check-ins, guided breathing and grounding, journaling, honest articles, and self-assessments.',
  },
  '/talk': {
    title: 'Talk — MindShift',
    description:
      'Sort things out out loud: an honest AI reflection guide that listens, reflects and asks. Not a therapist, and never a replacement for talking to a real person.',
  },
  '/tools': {
    title: 'Wellbeing tools — MindShift',
    description:
      'Mood check-ins, PHQ-9 and GAD-7 self-assessments, slow breathing, and grounding exercises — free and kept on your device.',
  },
  '/tools/mood-tracker': {
    title: 'Mood check-in & history — MindShift',
    description:
      'Log how you feel each day and look back at your mood history. Everything stays on this device, privately.',
  },
  '/tools/assessment': {
    title: 'Self-assessment: PHQ-9 & GAD-7',
    description:
      'Take the standard PHQ-9 and GAD-7 screening questionnaires. Results are private, and they are not a diagnosis.',
  },
  '/tools/breathing': {
    title: 'Slow breathing exercise — MindShift',
    description:
      'Follow a paced slow-breathing exercise to quiet an over-alert nervous system — no account, nothing to install.',
  },
  '/tools/grounding': {
    title: 'Grounding exercises — MindShift',
    description:
      'Five-senses grounding to return your attention to the present moment when things start to feel overwhelming.',
  },
  '/explore': {
    title: 'Explore — MindShift',
    description:
      'Plain-language psychology and wellbeing articles written for MindShift — anxiety, sleep, stress, burnout, habits, and more.',
  },
  '/journal': {
    title: 'Journal — MindShift',
    description:
      'A private journal on your device with gentle prompts, optional mood tags, and an honest writing streak.',
  },
  '/programmes': {
    title: 'Programmes — MindShift',
    description:
      'Short, honest practice programmes — a calmer mind, softer sleep, kindness to yourself — with progress you keep.',
  },
  '/support-plan': {
    title: 'Support plan — MindShift',
    description:
      'Name your warning signs, calm tools, safe places, and the people and professionals you can call — kept privately.',
  },
  '/learn-more': {
    title: 'Learn — MindShift',
    description:
      'An honest mental-health education hub: plain-language articles, real in-app guides, and straight answers to common questions.',
  },
  '/resources': {
    title: 'Resources — MindShift',
    description:
      "MindShift's honest guide to getting real help: crisis support, finding a therapist, and what to expect from care.",
  },
  '/find-therapist': {
    title: 'Find a therapist — MindShift',
    description:
      'An honest, practical guide to finding a therapist — doctor referrals, insurance, sliding-scale options, and good first questions.',
  },
  [`/professionals/${PROFESSIONAL.slug}`]: {
    title: `${PROFESSIONAL.name} | Psychologist & Founder`,
    description: `Meet ${PROFESSIONAL.name}, founder and psychologist providing psychological guidance, counselling and emotional wellbeing support.`,
  },
  '/crisis': {
    title: 'Crisis support — MindShift',
    description:
      'If you are struggling or thinking about self-harm: verified helplines like 988, national numbers, and an emergency-first plan.',
  },
  '/you': {
    title: 'You — MindShift',
    description:
      'Your private insights: mood trends, check-in streaks, journal momentum, and self-assessment history in one place.',
  },
  '/settings': {
    title: 'Settings — MindShift',
    description:
      'Appearance, reading and accessibility options, and full control of the data MindShift keeps on your device.',
  },
};

const FALLBACK_META = {
  title: 'MindShift — Page not found',
  description:
    "That page doesn't exist. Head back to MindShift's home to find mood tools, articles, and support.",
};

function dynamicMeta(pathname) {
  const articleMatch = pathname.match(/^\/explore\/articles\/(.+)$/);
  if (articleMatch) {
    const article = getArticle(articleMatch[1]);
    if (article) {
      return { title: `MindShift — ${article.title}`, description: article.excerpt };
    }
  }
  const programmeMatch = pathname.match(/^\/programmes\/(.+)$/);
  if (programmeMatch) {
    const programme = getProgramme(programmeMatch[1]);
    if (programme) {
      return { title: `MindShift — ${programme.title}`, description: programme.tagline };
    }
  }
  return null;
}

export function resolveMeta(pathname) {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const meta = STATIC_META[clean] || dynamicMeta(clean) || FALLBACK_META;
  return { ...meta, canonical: `${SITE.url}${clean}` };
}

export function concretePaths() {
  const staticPaths = Object.keys(STATIC_META).filter((path) => !path.includes(':'));
  const articlePaths = ARTICLES.map((a) => `/explore/articles/${a.slug}`);
  const programmePaths = PROGRAMMES.map((p) => `/programmes/${p.slug}`);
  return [...staticPaths, ...articlePaths, ...programmePaths];
}