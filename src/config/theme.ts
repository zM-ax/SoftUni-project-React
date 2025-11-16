import { BREAKPOINTS, DEVICES } from '../constants/breakpoints';

const base = {
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
  fonts: {
    body: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
  },
};

export const lightTheme = {
  ...base,
  mode: 'light' as const,
  colors: {
    pageBackground: '#f7f4ef',
    text: '#2b1b16',

    headerBg: '#ffffff',
    headerBorder: 'rgba(0,0,0,0.06)',

    heroBg: '#222222',          // for Home
    authBg: '#f3ebe3',          // for login/register

    primary: '#e67e22',
    primaryDark: '#d35400',
  },
};

export const darkTheme = {
  ...base,
  mode: 'dark' as const,
  colors: {
    pageBackground: '#181818',
    text: '#f5f5f5',

    headerBg: '#222222',
    headerBorder: 'rgba(255,255,255,0.08)',

    heroBg: '#000000',
    authBg: '#1f1a14',

    primary: '#e67e22',
    primaryDark: '#f39c12',
  },
};
