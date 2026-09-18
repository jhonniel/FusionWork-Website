import { COMPANY } from '../constants/company';
import { FAQ_ITEMS } from '../constants/navigation';
import { PORTFOLIO } from '../constants/portfolio';
import { SERVICES } from '../constants/services';

export type ChatReply = {
  text: string;
  /** Suggest opening the Contact page */
  suggestContact?: boolean;
  /** Start collecting name → email → message for email send */
  startLeadCapture?: boolean;
  /** Offer a button to start lead capture */
  suggestLead?: boolean;
};

export type LeadStep = 'name' | 'email' | 'message';

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s+@./-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((n) => haystack.includes(n));
}

const PROJECT_INTENT = [
  'make a project',
  'start a project',
  'new project',
  'build me',
  'build us',
  'build an',
  'build a',
  'hire you',
  'hire your',
  'work with you',
  'collaborate',
  'quotation',
  'quote',
  'proposal',
  'pricing for',
  'cost to',
  'how much',
  'budget',
  'need an app',
  'need a website',
  'need a system',
  'want an app',
  'want a website',
  'develop for us',
  'create an app',
  'create a website',
  'custom software for',
  'can you build',
  'can you make',
  'can you develop',
  'get started',
  'book a call',
  'talk to someone',
  'talk to your team',
  'speak to',
];

const LEAD_INTENT = [
  'send a message',
  'send message',
  'send info',
  'send my info',
  'leave a message',
  'leave my info',
  'email you',
  'email your team',
  'contact form',
  'submit inquiry',
  'send inquiry',
  'share my details',
  'give you my',
  'send details',
];

const GREETINGS = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'yo'];

export function isValidChatEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function contactBlock() {
  return [
    `Phone: ${COMPANY.phone}`,
    `Email: ${COMPANY.email}`,
    `Location: ${COMPANY.location}`,
    `Facebook: ${COMPANY.facebook}`,
  ].join('\n');
}

function servicesAnswer() {
  const lines = SERVICES.map((s) => `• ${s.title} — ${s.description}`);
  return [
    `Here are the services we offer at ${COMPANY.name}:`,
    '',
    ...lines,
    '',
    `If you’d like us to build something for you, I can collect your details and email our team — or share our contact info.`,
  ].join('\n');
}

function portfolioAnswer(query: string) {
  const match = PORTFOLIO.find(
    (p) =>
      query.includes(p.title.toLowerCase()) ||
      query.includes(p.id.replace(/-/g, ' ')) ||
      query.includes(p.category.toLowerCase()),
  );

  if (match) {
    return [
      `${match.title} (${match.category})`,
      match.description,
      '',
      `You can see more projects in our Portfolio section on this website.`,
    ].join('\n');
  }

  const titles = PORTFOLIO.map((p) => `• ${p.title} — ${p.category}`).join('\n');
  return [
    `Here’s a snapshot of featured projects on this website:`,
    '',
    titles,
    '',
    `Ask about any project by name for a short description, or browse the Portfolio page.`,
  ].join('\n');
}

function faqAnswer(query: string) {
  let best: { score: number; answer: string } | null = null;

  for (const item of FAQ_ITEMS) {
    const q = normalize(item.question);
    const words = q.split(' ').filter((w) => w.length > 3);
    const score = words.reduce((acc, w) => (query.includes(w) ? acc + 1 : acc), 0);
    if (score >= 2 && (!best || score > best.score)) {
      best = { score, answer: item.answer };
    }
  }

  return best?.answer ?? null;
}

/**
 * Answers only from website content. Lead / project intent can start email capture.
 */
export function answerFromWebsite(rawMessage: string): ChatReply {
  const query = normalize(rawMessage);
  if (!query) {
    return {
      text: `Hi! I’m the ${COMPANY.name} site assistant. Ask me about our services, portfolio, company story, or location — all based on this website.`,
    };
  }

  if (GREETINGS.some((g) => query === g || query.startsWith(`${g} `))) {
    return {
      text: `Hello! I’m here to help with questions about ${COMPANY.name} using only what’s on this website — services, projects, our story, and how to reach us.\n\nYou can also say “send a message” and I’ll email your details to our team.`,
    };
  }

  if (includesAny(query, LEAD_INTENT) || query === 'send us a message') {
    return {
      text: `Great — I can email your info to our team. What’s your name?`,
      startLeadCapture: true,
    };
  }

  if (includesAny(query, PROJECT_INTENT)) {
    return {
      text: [
        `I’d love to help you start a project with ${COMPANY.name}.`,
        `You can send your details here (I’ll email our team), or reach us directly:`,
        '',
        contactBlock(),
      ].join('\n'),
      suggestLead: true,
      suggestContact: true,
    };
  }

  if (includesAny(query, ['contact', 'email', 'phone', 'call', 'reach', 'facebook', 'location', 'address', 'where are you'])) {
    return {
      text: [
        `You can reach ${COMPANY.name} here:`,
        '',
        contactBlock(),
        '',
        `Or say “send a message” and I’ll collect your info and email the team.`,
      ].join('\n'),
      suggestLead: true,
      suggestContact: true,
    };
  }

  if (includesAny(query, ['service', 'services', 'what do you do', 'offer', 'capabilities', 'what can you'])) {
    return { text: servicesAnswer(), suggestLead: true };
  }

  if (
    includesAny(query, [
      'portfolio',
      'project',
      'projects',
      'work',
      'case study',
      'apps you',
      'products you',
      ...PORTFOLIO.map((p) => p.title.toLowerCase()),
      ...PORTFOLIO.map((p) => p.id.replace(/-/g, ' ')),
    ])
  ) {
    return { text: portfolioAnswer(query) };
  }

  if (includesAny(query, ['about', 'story', 'mission', 'vision', 'who are you', 'company', 'fusion work', 'values'])) {
    if (includesAny(query, ['mission'])) {
      return { text: `Our mission: ${COMPANY.mission}` };
    }
    if (includesAny(query, ['vision'])) {
      return { text: `Our vision: ${COMPANY.vision}` };
    }
    if (includesAny(query, ['values'])) {
      return { text: `Our values: ${COMPANY.values.join(', ')}.` };
    }
    return {
      text: [
        COMPANY.about,
        '',
        `Mission: ${COMPANY.mission}`,
        `Vision: ${COMPANY.vision}`,
        `Based in ${COMPANY.location}.`,
      ].join('\n'),
    };
  }

  if (includesAny(query, ['timeline', 'how long', 'duration', 'weeks', 'months', 'maintenance', 'support', 'industries', 'integrate', 'integration'])) {
    const faq = faqAnswer(query);
    if (faq) return { text: faq };
  }

  const faq = faqAnswer(query);
  if (faq) return { text: faq };

  if (includesAny(query, ['price', 'pricing', 'rate', 'rates', 'package', 'packages'])) {
    return {
      text: [
        `We don’t list fixed packages on this website because every build depends on scope.`,
        `Send your project details here and I’ll email our team, or contact us directly:`,
        '',
        contactBlock(),
      ].join('\n'),
      suggestLead: true,
      suggestContact: true,
    };
  }

  return {
    text: [
      `I can only answer using information published on the ${COMPANY.name} website — like our services, featured projects, company story, FAQ, and contact details.`,
      '',
      `Try asking about our services, portfolio, or where we’re based.`,
      `If you want to send us info, say “send a message” and I’ll email the team for you.`,
    ].join('\n'),
    suggestLead: true,
  };
}

export const CHAT_QUICK_PROMPTS = [
  'What services do you offer?',
  'Show featured projects',
  'Tell me about FUSION WORK',
  'Send a message',
] as const;

export function contactApiUrl() {
  const configured = process.env.EXPO_PUBLIC_CONTACT_API_URL?.trim();
  if (configured) return configured;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/contact`;
  }
  return '/api/contact';
}
