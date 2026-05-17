export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Santos',
    role: 'Operations Director',
    company: 'Visayas Retail Group',
    quote:
      'FUSION WORK transformed our manual processes into a streamlined digital platform. Delivery was fast, communication was excellent, and the results exceeded expectations.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Rivera',
    role: 'Founder',
    company: 'Mindanao Tours Co.',
    quote:
      'Their team built our booking platform with beautiful UX and rock-solid performance. We saw a 40% increase in online reservations within the first quarter.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Angela Cruz',
    role: 'CTO',
    company: 'Nova Logistics PH',
    quote:
      'From architecture to deployment, FUSION WORK demonstrated deep technical expertise. Our mobile delivery app launched on schedule with outstanding stability.',
    rating: 5,
  },
];
