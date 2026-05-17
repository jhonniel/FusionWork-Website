import { brand } from './brand';

/** Brand color tokens for light/dark themes */
export const palette = {
  primary: brand.red,
  primaryBright: brand.redBright,
  yellow: brand.yellow,
  blue: brand.blue,
  orange: brand.orange,
  purple: brand.purple,
  white: '#f8fafc',
  muted: '#94a3b8',
} as const;

export const darkTheme = {
  mode: 'dark' as const,
  background: '#050816',
  backgroundSecondary: '#0d1322',
  surface: '#141b2d',
  card: 'rgba(20, 27, 45, 0.92)',
  cardHover: 'rgba(28, 36, 58, 0.95)',
  cardBorder: 'rgba(148, 163, 184, 0.18)',
  text: '#f1f5f9',
  textMuted: '#cbd5e1',
  textSubtle: '#94a3b8',
  gradient: [brand.redBright, brand.red, brand.redDark] as const,
  gradientAccent: [brand.yellow, brand.orange, brand.red] as const,
  accent: brand.red,
  glow: 'rgba(230, 0, 0, 0.35)',
  statusBar: 'light' as const,
};

export const lightTheme = {
  mode: 'light' as const,
  background: '#fafbfc',
  backgroundSecondary: '#f1f5f9',
  surface: '#ffffff',
  card: 'rgba(255, 255, 255, 0.96)',
  cardHover: '#ffffff',
  cardBorder: 'rgba(15, 23, 42, 0.1)',
  text: '#0f172a',
  textMuted: '#475569',
  textSubtle: '#64748b',
  gradient: [brand.redBright, brand.red, brand.redDark] as const,
  gradientAccent: [brand.yellow, brand.orange, brand.red] as const,
  accent: brand.red,
  glow: 'rgba(230, 0, 0, 0.22)',
  statusBar: 'dark' as const,
};

export type AppTheme = typeof darkTheme | typeof lightTheme;
