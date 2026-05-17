import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

const webPrefix =
  typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : '/';

export const navigationLinking = {
  prefixes: Platform.OS === 'web' ? [webPrefix] : [Linking.createURL('/')],
  config: {
    screens: {
      Home: '',
      About: 'about',
      Services: 'services',
      Portfolio: 'portfolio',
      Contact: 'contact',
      BlogPost: 'blog/:postId',
    },
  },
};
