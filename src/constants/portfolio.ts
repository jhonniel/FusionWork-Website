import { brand } from '../theme/brand';

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: [string, string];
};

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'bms',
    title: 'Business Management System',
    category: 'Enterprise',
    description: 'Unified dashboard for operations, finance, and team collaboration.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    gradient: [brand.yellow, brand.orange],
  },
  {
    id: 'tourism',
    title: 'Tourism Booking Platform',
    category: 'Travel',
    description: 'End-to-end booking with payments, itineraries, and admin analytics.',
    tech: ['Next.js', 'Stripe', 'MongoDB'],
    gradient: [brand.purple, brand.red],
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Assistant',
    category: 'AI',
    description: 'Conversational support bot with knowledge base and live handoff.',
    tech: ['Python', 'OpenAI', 'WebSocket'],
    gradient: [brand.blue, brand.purple],
  },
  {
    id: 'delivery',
    title: 'Mobile Delivery App',
    category: 'Logistics',
    description: 'Real-time tracking, rider management, and customer notifications.',
    tech: ['React Native', 'Firebase', 'Maps API'],
    gradient: [brand.red, brand.orange],
  },
  {
    id: 'inventory',
    title: 'Inventory Management System',
    category: 'Retail',
    description: 'Stock control, supplier workflows, and automated reorder alerts.',
    tech: ['Vue', 'Laravel', 'MySQL'],
    gradient: [brand.red, brand.redDark],
  },
];
