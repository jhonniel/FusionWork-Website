/** Typography scale and font families */
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
  displaySemibold: 'SpaceGrotesk_600SemiBold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  section: 88,
  sectionSm: 64,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const textStyles = {
  hero: {
    fontFamily: fonts.display,
    fontSize: 52,
    lineHeight: 58,
    letterSpacing: -1.2,
  },
  h1: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: fonts.displaySemibold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 26,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 26,
  },
  bodySm: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.6,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase' as const,
  },
};
