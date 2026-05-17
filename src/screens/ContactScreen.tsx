import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ContactSection } from '../components/sections/ContactSection';
import { FAQSection } from '../components/sections/FAQSection';
import { MainRouteName, RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Contact'>;

export function ContactScreen() {
  const navigation = useNavigation<Nav>();

  const navigate = useCallback(
    (route: string) => navigation.navigate(route as MainRouteName),
    [navigation],
  );

  return (
    <ScreenWrapper currentRoute="Contact" onNavigate={navigate}>
      <ContactSection fullPage />
      <FAQSection />
    </ScreenWrapper>
  );
}
