import { Home, MessageCircleHeart, Sparkles, Compass, User } from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/talk', label: 'Talk', icon: MessageCircleHeart },
  { to: '/tools', label: 'Tools', icon: Sparkles },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/you', label: 'You', icon: User },
];

export function isNavActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}