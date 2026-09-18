import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { AboutSection } from '../components/sections/AboutSection';
import { BlogSection } from '../components/sections/BlogSection';
import { ContactSection } from '../components/sections/ContactSection';
import { CtaBannerSection } from '../components/sections/CtaBannerSection';
import { FAQSection } from '../components/sections/FAQSection';
import { HeroSection } from '../components/sections/HeroSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { SectionSpy } from '../context/ScrollSpyContext';
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
    <ScreenWrapper currentRoute="Home" onNavigate={navigate} enableScrollSpy>
      <SectionSpy route="Home">
        <HeroSection
          onGetStarted={() => navigate('Contact')}
          onViewServices={() => navigate('Services')}
        />
      </SectionSpy>
      <SectionSpy route="About">
        <AboutSection compact />
      </SectionSpy>
      <SectionSpy route="Services">
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUsSection />
      </SectionSpy>
      <SectionSpy route="Portfolio">
        <PortfolioSection />
        <IndustriesSection />
        <TestimonialsSection />
        <BlogSection />
        <CtaBannerSection onGetStarted={() => navigate('Contact')} />
        <FAQSection />
      </SectionSpy>
      <SectionSpy route="Contact">
        <ContactSection />
      </SectionSpy>
    </ScreenWrapper>
  );
}
