import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { AboutSection } from '../components/sections/AboutSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { SectionContainer } from '../components/ui/SectionContainer';
import { GradientHeading } from '../components/ui/GradientHeading';
import { COMPANY } from '../constants/company';
import { useAppTheme } from '../context/ThemeContext';
import { fonts } from '../theme/typography';
import { MainRouteName, RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'About'>;

export function AboutScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useAppTheme();

  const navigate = useCallback(
    (route: string) => navigation.navigate(route as MainRouteName),
    [navigation],
  );

  return (
    <ScreenWrapper currentRoute="About" onNavigate={navigate}>
      <SectionContainer style={styles.heroBand}>
        <GradientHeading
          title="About FUSION WORK"
          subtitle={COMPANY.tagline}
          align="left"
          size="lg"
        />
        <Text style={[styles.lead, { color: theme.textMuted }]}>{COMPANY.about}</Text>
      </SectionContainer>
      <AboutSection />
      <WhyChooseUsSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroBand: { paddingTop: 8, paddingBottom: 0 },
  lead: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    marginTop: -8,
    maxWidth: 640,
  },
});
