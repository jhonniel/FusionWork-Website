import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { AboutSection } from '../components/sections/AboutSection';
import { BlogSection } from '../components/sections/BlogSection';
import { ContactSection } from '../components/sections/ContactSection';
import { FAQSection } from '../components/sections/FAQSection';
import { HeroSection } from '../components/sections/HeroSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { MainRouteName, RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  const navigate = useCallback(
    (route: string) => {
      navigation.navigate(route as MainRouteName);
    },
    [navigation],
  );

  return (
    <ScreenWrapper currentRoute="Home" onNavigate={navigate}>
      <HeroSection
        onGetStarted={() => navigate('Contact')}
        onViewServices={() => navigate('Services')}
      />
      <AboutSection compact />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </ScreenWrapper>
  );
}
