import {
  useState,
  useEffect,
} from 'react';
import { ThemeModeContext } from './ThemeModeContext';
import type { Mode } from './ThemeModeContext';

import type { ReactNode } from 'react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from '../config/theme';

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem('theme-mode') as Mode | null;
    return stored ?? 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme: DefaultTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// useThemeMode hook moved to useThemeMode.ts