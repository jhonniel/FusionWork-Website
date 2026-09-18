import { Ionicons } from '@expo/vector-icons';

import { BrandAccent } from '../theme/brand';

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: BrandAccent;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discover',
    step: '01',
    title: 'Discover',
    description:
      'We map your goals, users, and constraints so the solution fits the business—not the other way around.',
    icon: 'search-outline',
    accent: 'red',
  },
  {
    id: 'design',
    step: '02',
    title: 'Design',
    description:
      'Clear UX, architecture, and prototypes that stakeholders can feel before a single line ships.',
    icon: 'color-palette-outline',
    accent: 'purple',
  },
  {
    id: 'build',
    step: '03',
    title: 'Build',
    description:
      'Iterative development with visible progress, solid engineering, and room to adapt as you learn.',
    icon: 'code-slash-outline',
    accent: 'blue',
  },
  {
    id: 'launch',
    step: '04',
    title: 'Launch & Grow',
    description:
      'Deploy, monitor, and support—so your product keeps improving after day one.',
    icon: 'rocket-outline',
    accent: 'orange',
  },
];

export type IndustryItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: BrandAccent;
};

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'retail',
    title: 'Retail & Commerce',
    description: 'POS, inventory, and customer experiences that keep up with demand.',
    icon: 'storefront-outline',
    accent: 'yellow',
  },
  {
    id: 'tourism',
    title: 'Tourism & Hospitality',
    description: 'Bookings, operations, and guest journeys built for local operators.',
    icon: 'airplane-outline',
    accent: 'blue',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Tracking, dispatch, and workflows that move goods with clarity.',
    icon: 'cube-outline',
    accent: 'orange',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learning platforms and admin systems designed for real campuses.',
    icon: 'school-outline',
    accent: 'purple',
  },
  {
    id: 'services',
    title: 'Professional Services',
    description: 'CRM, scheduling, and portals that make client work smoother.',
    icon: 'briefcase-outline',
    accent: 'red',
  },
  {
    id: 'startups',
    title: 'Startups & SMEs',
    description: 'MVPs and platforms that scale without rewriting everything later.',
    icon: 'flash-outline',
    accent: 'yellow',
  },
];
