import 'styled-components';
import { lightTheme } from '../config/theme';

type AppTheme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: typeof lightTheme.colors;
    breakpoints: typeof lightTheme.breakpoints;
    devices: typeof lightTheme.devices;
    fonts: typeof lightTheme.fonts;
  }
}
