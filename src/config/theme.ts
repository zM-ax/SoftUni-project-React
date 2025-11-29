import { BREAKPOINTS, DEVICES } from "../constants/breakpoints";

const base = {
  breakpoints: BREAKPOINTS,
  devices: DEVICES,
  fonts: {
    navigation: `'Podkova', serif`, // Route names
    titles: `'Bad Script', cursive`, // Main titles
    descriptions: `'Neucha', cursive`, // (secondary font)
    body: `'Podkova', serif`, // Default body text
    heading: `'Bad Script', cursive`, // alias за заглавията
  },
};

export const lightTheme = {
  ...base,
  mode: "light" as const,
  colors: {
    pageBackground: "#f2ecdb", // бежаво
    text: "#392414", // кафяво
    textSecondary: "#7a6a5a",

    headerBg: "#f2ecdb",
    headerBorder: "rgba(57, 36, 20, 0.15)",

    heroBg: "#392414", // кафяво - Home
    authBg: "#f2ecdb", // бежаво - login/register

    primary: "#b77f39", // кафеникаво/оранжево
    primaryDark: "#9a6b30", // darker variant

    buttonBackground: "#b77f39",
    buttonText: "#f2ecdb",

    mutedText: "#7a6a5a",
    mutedBackground: "#f7f1e6",

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
    pageBackground: "#1a1006", // very dark brown
    text: "#f2ecdb", // бежаво text on dark
    textSecondary: "#bcae9e",

    headerBg: "#2a1f14",
    headerBorder: "rgba(242, 236, 219, 0.15)",

    heroBg: "#0d0a06",
    authBg: "#2a1f14",

    primary: "#b77f39", // same кафеникаво/оранжево
    primaryDark: "#d49347", // brighter variant for dark theme

    buttonBackground: "#b77f39",
    buttonText: "#1a1006",

    mutedText: "#bcae9e", // alias на textSecondary
    mutedBackground: "#24170d",

    error: "#ff5252",
    errorText: "#ffbdbd",
    errorBorder: "rgba(255, 82, 82, 0.3)",
    errorBg: "rgba(255, 82, 82, 0.07)",
    success: "#7ee787",
  },
};
