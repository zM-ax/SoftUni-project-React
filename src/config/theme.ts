import { BREAKPOINTS, DEVICES } from '../constants/breakpoints';

const base = {
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
  fonts: {
    navigation: `'Podkova', serif`,        // Route names
    titles: `'Bad Script', cursive`,       // Main titles  
    descriptions: `'Neucha', cursive`,     // (secondary font)
    body: `'Podkova', serif`,              // Default body text
  },
};

export const lightTheme = {
  ...base,
  mode: 'light' as const,
  colors: {
    pageBackground: '#f2ecdb',     // бежаво
    text: '#392414',               // кафяво

    headerBg: '#f2ecdb',
    headerBorder: 'rgba(57, 36, 20, 0.15)',

    heroBg: '#392414',             // кафяво for Home
    authBg: '#f2ecdb',             // бежаво for login/register

    primary: '#b77f39',            // кафеникаво/оранжево
    primaryDark: '#9a6b30',        // darker variant

    buttonBackground: '#b77f39',
    buttonText: '#f2ecdb',
  },
};

export const darkTheme = {
  ...base,
  mode: 'dark' as const,
  colors: {
    pageBackground: '#1a1006',     // very dark brown
    text: '#f2ecdb',               // бежаво text on dark

    headerBg: '#2a1f14',
    headerBorder: 'rgba(242, 236, 219, 0.15)',

    heroBg: '#0d0a06',
    authBg: '#2a1f14',

    primary: '#b77f39',            // same кафеникаво/оранжево
    primaryDark: '#d49347',        // brighter variant for dark theme
    
    buttonBackground: '#b77f39',
    buttonText: '#1a1006',
  },
};
