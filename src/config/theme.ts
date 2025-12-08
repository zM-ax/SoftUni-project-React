import { BREAKPOINTS, DEVICES } from "../constants/breakpoints";

const base = {
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
  fonts: {
    navigation: `'Podkova', serif`, // Route names
    titles: `'Bad Script', cursive`, // Main titles
    descriptions: `'Neucha', cursive`, // (secondary font)
    body: `'Podkova', serif`, // Default body text
    heading: `'Bad Script', cursive`, // alias for headings
  },
};

export const lightTheme = {
  ...base,
  mode: "light" as const,
  colors: {
    pageBackground: "#f2ecdb", // beige - MAIN color :)
    text: "#392414",
    textSecondary: "#7a6a5a",

    headerBg: "#f2ecdb",
    headerBorder: "rgba(57, 36, 20, 0.15)",

    heroBg: "#392414",
    authBg: "#f2ecdb",

    primary: "#b77f39",
    primaryDark: "#9a6b30",

    buttonBackground: "#b77f39",
    buttonText: "#f2ecdb",

    // a little warmer than pure white
    inputBackground: "#fff8ef",

    mutedText: "#7a6a5a",
    mutedBackground: "#f7f0e4",

    // Useful for Cards / sections like the contact form
    cardBackground: "#fffaf3",

    error: "#b71c1c",
    errorText: "#5b2525",
    errorBorder: "rgba(183, 28, 28, 0.3)",
    errorBg: "rgba(183, 28, 28, 0.04)",
    success: "#2e7d32",
  },
};

export const darkTheme = {
  ...base,
  mode: "dark" as const,
  colors: {
    pageBackground: "#1a1006",
    text: "#f2ecdb",
    textSecondary: "#bcae9e",

    headerBg: "#2a1f14",
    headerBorder: "rgba(242, 236, 219, 0.15)",

    heroBg: "#0d0a06",
    authBg: "#2a1f14",

    primary: "#b77f39",
    primaryDark: "#d49347",

    buttonBackground: "#b77f39",
    buttonText: "#f2ecdb", // clearer contrast on brown

    inputBackground: "#2a1f14",

    mutedText: "#bcae9e",
    mutedBackground: "#24170d",

    cardBackground: "#2a1f14",

    error: "#ff5252",
    errorText: "#ffbdbd",
    errorBorder: "rgba(255, 82, 82, 0.3)",
    errorBg: "rgba(255, 82, 82, 0.07)",
    success: "#7ee787",
  },
};
