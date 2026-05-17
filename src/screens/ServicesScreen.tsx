import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { FAQSection } from '../components/sections/FAQSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SectionContainer } from '../components/ui/SectionContainer';
import { GradientHeading } from '../components/ui/GradientHeading';
import { MainRouteName, RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Services'>;

export function ServicesScreen() {
  const navigation = useNavigation<Nav>();

  const navigate = useCallback(
    (route: string) => navigation.navigate(route as MainRouteName),
    [navigation],
  );

  return (
    <ScreenWrapper currentRoute="Services" onNavigate={navigate}>
      <SectionContainer style={styles.heroBand}>
        <GradientHeading
          title="Our Services"
          subtitle="End-to-end digital solutions tailored for your business goals."
          align="left"
        />
      </SectionContainer>
      <ServicesSection />
      <FAQSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroBand: { paddingTop: 8, paddingBottom: 0 },
});
