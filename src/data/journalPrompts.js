export const JOURNAL_PROMPTS = [
  'What has been taking up space in your mind today?',
  'Describe a moment from today that felt okay — even briefly.',
  'What would you say to a friend who lived your exact day?',
  'What small thing are you holding onto that you could put down?',
  'Name one thing you\u2019re looking forward to, even a tiny one.',
  'If tomorrow could be a little gentler, what would be different?',
  'What are three things that are true right now?',
  'Write for three minutes without stopping to judge. Whatever comes.',
  'What has been weighing on you more than you admit?',
  'What\u2019s one decision you keep postponing — and what tiny step sits in front of it?',
  'What did your body need today, and did it get even a little of it?',
  'What would \u201cenough\u201d look like today — not perfect, just enough?',
];

export function randomPrompt(exclude) {
  const pool = exclude
    ? JOURNAL_PROMPTS.filter((p) => p !== exclude)
    : JOURNAL_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}