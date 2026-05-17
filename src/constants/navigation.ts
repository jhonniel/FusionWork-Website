export type NavRoute = 'Home' | 'About' | 'Services' | 'Portfolio' | 'Contact';

export const NAV_LINKS: { label: string; route: NavRoute }[] = [
  { label: 'Home', route: 'Home' },
  { label: 'About', route: 'About' },
  { label: 'Services', route: 'Services' },
  { label: 'Portfolio', route: 'Portfolio' },
  { label: 'Contact', route: 'Contact' },
];

export const STATS = [
  { label: 'Projects', value: '100+', icon: 'rocket-outline' as const },
  { label: 'Clients', value: '50+', icon: 'people-outline' as const },
  { label: 'Support', value: '24/7', icon: 'headset-outline' as const },
  { label: 'Delivery', value: 'Fast', icon: 'flash-outline' as const },
];

export const FAQ_ITEMS = [
  {
    question: 'What industries do you serve?',
    answer:
      'We work with startups, SMEs, and enterprises across retail, tourism, logistics, education, and professional services throughout the Philippines.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary by scope. MVPs often ship in 4–8 weeks, while enterprise platforms may take 3–6 months with phased delivery.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes. We provide flexible support plans including monitoring, updates, security patches, and feature enhancements.',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer:
      'Absolutely. Our team specializes in API integrations, legacy modernization, and cloud migrations.',
  },
];
