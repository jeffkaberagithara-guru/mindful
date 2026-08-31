export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString, options) {
  return new Intl.DateTimeFormat(undefined, options).format(new Date(dateString));
}