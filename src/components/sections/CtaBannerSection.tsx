import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, radius, spacing } from '../../theme/typography';
import { FuturisticButton } from '../ui/FuturisticButton';
import { SectionContainer } from '../ui/SectionContainer';

type Props = {
  onGetStarted: () => void;
};

export function CtaBannerSection({ onGetStarted }: Props) {
  const { theme, mode } = useAppTheme();
  const { isMobile } = useResponsive();

  return (
    <SectionContainer style={styles.section}>
      <LinearGradient
        colors={
          mode === 'dark'
            ? ['rgba(230,0,0,0.22)', 'rgba(153,51,255,0.12)', 'rgba(0,153,255,0.08)']
            : ['rgba(230,0,0,0.10)', 'rgba(153,51,255,0.08)', 'rgba(0,153,255,0.06)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.banner,
          {
            borderColor: theme.cardBorder,
            paddingHorizontal: isMobile ? 22 : 40,
          },
        ]}
      >
        <View style={[styles.copy, isMobile && styles.copyMobile]}>
          <Text style={[styles.eyebrow, { color: brand.red }]}>Ready when you are</Text>
          <Text style={[styles.title, { color: theme.text }, isMobile && styles.titleMobile]}>
            Let’s build something that moves your business forward
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Tell us about your product, workflow, or growth goal—we’ll map a practical path from concept to launch.
          </Text>
        </View>
        <FuturisticButton
          label="Start a Project"
          onPress={onGetStarted}
          size="lg"
          fullWidth={isMobile}
          style={isMobile ? { width: '100%' } : undefined}
        />
      </LinearGradient>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.xxl,
  },
  banner: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingVertical: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 28,
    flexWrap: 'wrap',
  },
  copy: {
    flex: 1,
    minWidth: 240,
    gap: 10,
  },
  copyMobile: {
    width: '100%',
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.5,
    maxWidth: 520,
  },
  titleMobile: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 480,
  },
});
