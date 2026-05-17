/** FUSION WORK brand palette from official logo */
export const brand = {
  red: '#E60000',
  redBright: '#FF1A1A',
  redDark: '#B80000',
  yellow: '#FFCC00',
  blue: '#0099FF',
  orange: '#FF9900',
  purple: '#9933FF',
} as const;

export type BrandAccent = keyof Pick<typeof brand, 'yellow' | 'blue' | 'orange' | 'purple' | 'red'>;

/** Service card glow colors aligned with logo iconography */
export const SERVICE_ACCENTS: Record<string, BrandAccent> = {
  'custom-software': 'yellow',
  'web-apps': 'purple',
  'mobile-apps': 'yellow',
  'ui-ux': 'purple',
  'cloud-api': 'blue',
  automation: 'blue',
  'ai-systems': 'blue',
  support: 'orange',
};

export function getAccentColor(accent: BrandAccent): string {
  return brand[accent];
}
