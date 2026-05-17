import { Ionicons } from '@expo/vector-icons';

import { BrandAccent } from '../theme/brand';

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: BrandAccent;
};

/** Services mapped to logo icon colors (yellow, blue, orange, purple, red) */
export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Tailored enterprise systems engineered for your workflows, security requirements, and growth roadmap.',
    icon: 'laptop-outline',
    accent: 'yellow',
  },
  {
    id: 'web-apps',
    title: 'Web Application Development',
    description:
      'High-performance web platforms with modern stacks, responsive UX, and scalable cloud architecture.',
    icon: 'globe-outline',
    accent: 'purple',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile experiences built for engagement, reliability, and app store success.',
    icon: 'phone-portrait-outline',
    accent: 'yellow',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description:
      'Human-centered interfaces that balance aesthetics, usability, and conversion-focused product design.',
    icon: 'color-palette-outline',
    accent: 'purple',
  },
  {
    id: 'automation',
    title: 'Business Automation Solutions',
    description:
      'Intelligent automation that reduces manual work, accelerates operations, and improves decision-making.',
    icon: 'hardware-chip-outline',
    accent: 'blue',
  },
  {
    id: 'support',
    title: 'Technical Support & Maintenance',
    description:
      'Proactive monitoring, updates, and dedicated support to keep your digital products running flawlessly.',
    icon: 'search-outline',
    accent: 'orange',
  },
];
