import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { SectionContainer } from '../components/ui/SectionContainer';
import { FuturisticButton } from '../components/ui/FuturisticButton';
import { GradientHeading } from '../components/ui/GradientHeading';
import { spacing } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Portfolio'>;

export function PortfolioScreen() {
  const navigation = useNavigation<Nav>();

  const navigate = useCallback(
    (route: string) => navigation.navigate(route as keyof RootStackParamList),
    [navigation],
  );

  return (
    <ScreenWrapper currentRoute="Portfolio" onNavigate={navigate}>
      <SectionContainer style={styles.heroBand}>
        <GradientHeading
          title="Our Portfolio"
          subtitle="Explore the digital products we've delivered for clients across the Philippines."
          align="left"
        />
        <FuturisticButton
          label="Start Your Project"
          onPress={() => navigate('Contact')}
          style={{ marginTop: spacing.md }}
        />
      </SectionContainer>
      <PortfolioSection />
      <TestimonialsSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroBand: { paddingTop: 8, paddingBottom: 0 },
});
