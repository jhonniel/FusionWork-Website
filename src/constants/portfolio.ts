import { ImageSourcePropType } from 'react-native';

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: ImageSourcePropType;
};

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'finditfast',
    title: 'FindITFast',
    category: 'Lost & Found',
    description:
      'Community-powered lost and found platform—search reports, post items, and smart matching connects people from lost to found in just a few clicks.',
    image: require('../../assets/portfolio/finditfast.png'),
  },
  {
    id: 'inventorypro',
    title: 'InventoryPro',
    category: 'Inventory Management',
    description:
      'Comprehensive inventory management—track products, manage suppliers, monitor stock levels, and make data-driven decisions with real-time analytics and QR scanning.',
    image: require('../../assets/portfolio/inventorypro.png'),
  },
  {
    id: 'whatsnearby',
    title: 'whatsnearby',
    category: 'Community Maps',
    description:
      'Shared maps for everyday needs—built by the community, for the community. Discover restrooms, food, hangouts, and trusted local pins neighbors share, with directions when it matters.',
    image: require('../../assets/portfolio/whatsnearby.png'),
  },
  {
    id: 'rezerba',
    title: 'REZERBA',
    category: 'Reservation Platform',
    description:
      'An all-in-one booking platform—discover services, manage schedules, confirm reservations, and track booking activity in one organized place.',
    image: require('../../assets/portfolio/rezerba.png'),
  },
  {
    id: 'easypos-hub',
    title: 'EasyPOS Hub',
    category: 'POS & Inventory',
    description:
      'An all-in-one inventory and point-of-sale management system designed to help businesses simplify daily operations—with fast checkout, real-time stock, and streamlined order workflows.',
    image: require('../../assets/portfolio/easypos-hub.png'),
  },
  {
    id: 'travel-planner',
    title: 'Travel Planner',
    category: 'Travel & Collaboration',
    description:
      'The ultimate travel planning platform that brings friends together. Collaborate, track expenses, manage itineraries, and create unforgettable memories.',
    image: require('../../assets/portfolio/travel-planner.png'),
  },
  {
    id: 'paypals',
    title: 'PayPals',
    category: 'Bill Splitting',
    description:
      'Split every receipt fairly and fast in pesos—scan a bill, assign what everyone ordered, and settle the total without spreadsheets, group chats, or awkward calculations.',
    image: require('../../assets/portfolio/paypals.png'),
  },
  {
    id: 'island-coolers',
    title: 'Island Coolers',
    category: 'Food & Beverage',
    description:
      'Fresh · cold · delivered—order soda flavors, iced coffee, and matcha in a few taps, track live, and earn rewards with every sip.',
    image: require('../../assets/portfolio/island-coolers.png'),
  },
  {
    id: 'dabills',
    title: 'DaBills',
    category: 'Bills & Subscriptions',
    description:
      'Recurring bills and subscriptions tracked in one place—see Netflix, Spotify, and more at a glance so you never miss a payment.',
    image: require('../../assets/portfolio/dabills.png'),
  },
];
