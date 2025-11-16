const base = {
  breakpoints: { /* тук слагаш DEVICES/BREAKPOINTS ако искаш */ },
  fonts: {
    body: `'Inter', system-ui, sans-serif`,
  },
};

export const lightTheme = {
  ...base,
  mode: 'light',
  colors: {
    pageBackground: '#f7f7f7',
    text: '#222',
    headerBg: '#ffffff',
    heroBg: '#222222',
    authBg: '#f0ebe4',
  },
};

export const darkTheme = {
  ...base,
  mode: 'dark',
  colors: {
    pageBackground: '#181818',
    text: '#f5f5f5',
    headerBg: '#222222',
    heroBg: '#000000',
    authBg: '#1f1a14',
  },
};