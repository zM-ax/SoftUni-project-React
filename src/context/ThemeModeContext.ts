import { createContext } from 'react';

export type Mode = 'light' | 'dark';

export type ThemeModeContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined,
);
