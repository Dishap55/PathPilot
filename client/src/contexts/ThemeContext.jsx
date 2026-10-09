import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const THEME_STORAGE_KEY = 'pathpilot_theme_preference';
export const THEME_MODES = Object.freeze(['light', 'dark', 'study']);

const ThemeContext = createContext(null);

function isThemeMode(value) {
  return THEME_MODES.includes(value);
}

function readSavedTheme() {
  if (typeof window === 'undefined') return 'light';

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeMode(saved)) return saved;
    if (saved !== null) window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Storage may be disabled by browser privacy settings. Keep the app usable.
  }

  return 'light';
}

export function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
}

export function resetThemeToLight() {
  applyThemeToDocument('light');
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
      window.dispatchEvent(new CustomEvent('pathpilot_theme_reset', { detail: 'light' }));
    }
  } catch {
    // Storage may be disabled by browser privacy settings. Keep the app usable.
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initialTheme = readSavedTheme();
    applyThemeToDocument(initialTheme);
    return initialTheme;
  });

  const setTheme = useCallback((nextTheme) => {
    if (!isThemeMode(nextTheme)) return false;

    setThemeState(nextTheme);
    applyThemeToDocument(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected mode still applies for this session when storage is unavailable.
    }
    return true;
  }, []);

  const resetTheme = useCallback(() => {
    return setTheme('light');
  }, [setTheme]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== THEME_STORAGE_KEY || !isThemeMode(event.newValue)) return;
      setThemeState(event.newValue);
      applyThemeToDocument(event.newValue);
    };

    const handleCustomReset = () => {
      setThemeState('light');
      applyThemeToDocument('light');
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('pathpilot_theme_reset', handleCustomReset);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pathpilot_theme_reset', handleCustomReset);
    };
  }, []);

  const value = useMemo(() => ({ theme, setTheme, resetTheme, modes: THEME_MODES }), [theme, setTheme, resetTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider.');
  return context;
}
