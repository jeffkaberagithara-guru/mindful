import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  useEffect(() => {
    const element = document.documentElement;

    if (key === 'theme') {
      if (storedValue === 'dark') {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }

    if (key === 'fontSize') {
      // Remove old size classes
      element.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
      // Add new size class if it's not medium (default)
      if (storedValue !== 'medium') {
        // Map stored values to tailwind classes if needed, or use direct values if they align
        const sizeMap = {
          'small': 'text-sm',
          'medium': 'text-base',
          'large': 'text-lg',
          'xlarge': 'text-xl'
        };
        if (sizeMap[storedValue]) {
          element.classList.add(sizeMap[storedValue]);
        }
      }
    }

    if (key === 'dyslexiaFont') {
      if (storedValue === true) {
        element.classList.add('font-dyslexia');
      } else {
        element.classList.remove('font-dyslexia');
      }
    }

    if (key === 'highContrast') {
      if (storedValue === true) {
        element.classList.add('high-contrast');
      } else {
        element.classList.remove('high-contrast');
      }
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};