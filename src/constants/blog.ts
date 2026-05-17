import { Ionicons } from '@expo/vector-icons';

import { BrandAccent } from '../theme/brand';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: BrandAccent;
  /** Full article body as paragraphs */
  content: readonly string[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'philippine-sme-digital-transformation',
    slug: 'philippine-sme-digital-transformation',
    title: 'Why Philippine SMEs Are Investing in Custom Software Now',
    excerpt:
      'Off-the-shelf tools only go so far. Here is how local businesses are using tailored systems to cut costs and scale operations.',
    category: 'Business',
    date: 'Apr 12, 2026',
    readTime: '6 min read',
    author: 'FUSION WORK Team',
    icon: 'business-outline',
    accent: 'yellow',
    content: [
      'Across the Philippines, small and medium enterprises are under pressure to move faster—serve customers online, track inventory accurately, and report in real time. Generic spreadsheets and boxed software often break down once teams grow past a single branch or product line.',
      'That is why more owners are choosing custom software: systems shaped around how they actually work, not the other way around. A retail chain in Mindanao might need multi-branch stock sync; a logistics operator in Visayas needs driver dispatch and proof-of-delivery in one app. One-size-fits-all products rarely cover both without expensive workarounds.',
      'The upfront cost can feel higher than subscribing to a SaaS tool, but the long-term math often favors custom builds. You pay for features you use, avoid per-seat fees that balloon as staff grows, and own your data outright—important for BIR reporting, audits, and partnerships that require exportable records.',
      'At FUSION WORK, we typically start SMEs with a focused MVP: one painful workflow solved well, such as order management, booking, or internal approvals. Shipping in four to eight weeks proves value early, then we expand in phases so budget and training stay manageable.',
      'Security and reliability matter as much as features. Philippine users expect mobile-first experiences, stable performance on average connections, and support when something goes wrong—not a ticket queue overseas. Local development partners who understand GCash integrations, SMS OTP, and regional compliance reduce risk.',
      'If you are still patching together five tools to run one business, it may be time to explore a single platform built for your process. The question is not whether to digitize—it is whether your software will still fit when you double revenue next year.',
    ],
  },
  {
    id: 'building-scalable-web-apps-2026',
    slug: 'building-scalable-web-apps-2026',
    title: 'Building Scalable Web Apps in 2026: What We Ship at FUSION WORK',
    excerpt:
      'From API design to deployment—practical architecture choices that keep products fast, maintainable, and ready to grow.',
    category: 'Engineering',
    date: 'Mar 28, 2026',
    readTime: '8 min read',
    author: 'FUSION WORK Team',
    icon: 'code-slash-outline',
    accent: 'blue',
    content: [
      'A scalable web app is not only about handling traffic spikes—it is about a codebase and infrastructure your team can extend without rewriting every six months. In 2026, our default stack for client platforms combines a modern React front end (including React Native Web where one codebase serves web and mobile), typed APIs, and cloud-hosted services that scale with usage.',
      'We begin every project with clear domain boundaries. Orders, users, billing, and notifications each get their own modules and API surfaces. That separation makes it easier to add features, write tests, and onboard developers who were not on day one.',
      'On the API layer, we favor explicit contracts—OpenAPI or tRPC-style typing where possible—so front-end and back-end teams do not drift. Pagination, filtering, and idempotent writes are standard from the first release, not retrofitted after a client complains about duplicate charges or slow dashboards.',
      'Performance is designed in, not bolted on. Assets are optimized, lists are virtualized, and heavy work moves to background jobs. For Philippine users, we pay special attention to Time to Interactive on mid-range phones and intermittent mobile data; lazy loading and sensible caching cut perceived wait time dramatically.',
      'Deployment pipelines include staging environments, automated checks, and rollback paths. We monitor error rates and core Web Vitals after launch, then iterate. Maintenance retainers are not an afterthought—they keep dependencies patched and security issues addressed before they become incidents.',
      'Whether you are launching a customer portal or an internal operations hub, the goal is the same: a system that stays fast under load and cheap to evolve. Scalability is a product decision as much as an engineering one—and it starts with architecture you will not regret in year two.',
    ],
  },
  {
    id: 'ui-ux-trends-saas-2026',
    slug: 'ui-ux-trends-saas-2026',
    title: 'UI/UX Trends That Actually Convert for SaaS Products',
    excerpt:
      'Motion, clarity, and accessibility beat decorative trends. What we apply on client dashboards and customer-facing apps.',
    category: 'Design',
    date: 'Mar 10, 2026',
    readTime: '5 min read',
    author: 'FUSION WORK Team',
    icon: 'color-palette-outline',
    accent: 'purple',
    content: [
      'Every year brings a new visual trend—glassmorphism, bold gradients, AI-generated illustrations. Most pass. What consistently improves conversion and retention for SaaS products is simpler: users understand what to do next, trust the interface, and complete tasks without friction.',
      'We still use subtle depth and soft cards where they help hierarchy, especially for dashboards that display dense data. The difference is restraint. High contrast for primary actions, muted surfaces for secondary information, and one accent color tied to brand—not six competing highlights on one screen.',
      'Motion should explain state changes, not decorate idle screens. A button press feedback, a panel sliding in with context, or a skeleton while data loads teaches users the system is responding. Excessive parallax or looping animations on marketing pages often hurt accessibility and distract from sign-up or checkout.',
      'Accessibility is no longer optional for serious products. Keyboard navigation, readable font sizes, sufficient color contrast, and screen-reader labels are baseline requirements—not stretch goals. In the Philippines, many users rely on mobile browsers with varying screen sizes; responsive layouts and touch targets of at least 44px prevent costly mistakes.',
      'For B2B SaaS, we invest heavily in empty states, onboarding checklists, and inline help. A beautiful login screen means little if the first-run experience leaves new admins confused. Short guided tours and sample data help teams see value before they import production records.',
      'The best trend in 2026 is honesty: interfaces that match real workflows, performance that feels instant, and copy written for humans—not jargon. That is the standard we hold every FUSION WORK design to, from tourism booking apps to POS and inventory platforms.',
    ],
  },
] as const;

export function getBlogPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id || p.slug === id);
}
