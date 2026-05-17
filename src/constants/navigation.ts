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

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'How AI Is Reshaping Philippine SMEs',
    excerpt: 'Practical ways local businesses can adopt intelligent automation without huge budgets.',
    date: 'Apr 12, 2026',
    readTime: '6 min',
  },
  {
    id: '2',
    title: 'Building Scalable Web Apps in 2026',
    excerpt: 'Architecture patterns we use at FUSION WORK for performance and maintainability.',
    date: 'Mar 28, 2026',
    readTime: '8 min',
  },
  {
    id: '3',
    title: 'UI/UX Trends for SaaS Products',
    excerpt: 'Glassmorphism, motion design, and accessibility — what actually converts users.',
    date: 'Mar 10, 2026',
    readTime: '5 min',
  },
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
