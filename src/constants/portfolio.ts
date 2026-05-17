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
    id: 'bookease',
    title: 'BookEase',
    category: 'Reservation Platform',
    description:
      'A modern, all-in-one reservation platform that makes booking fast, simple, and reliable. Real-time availability and instant confirmations put convenience and control right at your fingertips.',
    image: require('../../assets/portfolio/bookease.png'),
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
];
