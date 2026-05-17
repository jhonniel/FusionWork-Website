import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COMPANY } from '../../constants/company';
import { STATS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, radius, spacing } from '../../theme/typography';
import { GridOverlay } from '../layout/GridOverlay';
import { DashboardMockup } from '../ui/DashboardMockup';
import { FuturisticButton } from '../ui/FuturisticButton';
import { SplitHeadline } from '../ui/GradientText';

type Props = {
  onGetStarted: () => void;
  onViewServices: () => void;
};

export function HeroSection({ onGetStarted, onViewServices }: Props) {
  const { theme } = useAppTheme();
  const { isDesktop, isMobile, isSmallPhone, horizontalPadding, contentWidth, width } =
    useResponsive();

  const titleSize = isSmallPhone ? 30 : isMobile ? 34 : 52;
  const titleLine = isSmallPhone ? 36 : isMobile ? 40 : 58;

  return (
    <View style={[styles.wrap, { paddingHorizontal: horizontalPadding }]}>
      <GridOverlay opacity={0.05} />
      <View
        style={[
          styles.inner,
          { maxWidth: contentWidth, width: '100%', alignSelf: 'center' },
          isDesktop && styles.row,
        ]}
      >
        <View style={[styles.copy, isDesktop && styles.copyDesktop]}>
          <View style={[styles.badge, { borderColor: `${brand.red}44`, backgroundColor: `${brand.red}10` }]}>
            <View style={[styles.badgeDot, { backgroundColor: brand.red }]} />
            <Text
              style={[styles.badgeText, { color: theme.textMuted }]}
              numberOfLines={isSmallPhone ? 2 : 1}
            >
              {isSmallPhone ? 'Software · Davao City' : 'Software Development · Davao City'}
            </Text>
          </View>

          <SplitHeadline
            prefix="Building the Future of"
            highlight="Digital Innovation"
            style={{ fontSize: titleSize, lineHeight: titleLine }}
          />

          <Text style={[styles.sub, { color: theme.textMuted }]}>{COMPANY.heroSubtext}</Text>

          <View style={styles.ctas}>
            <FuturisticButton
              label="Get Started"
              onPress={onGetStarted}
              size="lg"
              fullWidth={isMobile}
              style={isMobile ? styles.ctaFull : undefined}
            />
            <FuturisticButton
              label="View Services"
              variant="secondary"
              onPress={onViewServices}
              size="lg"
              fullWidth={isMobile}
              style={isMobile ? styles.ctaFull : undefined}
            />
          </View>

          <View style={[styles.trust, isSmallPhone && styles.trustGrid]}>
            {STATS.map((s, i) => {
              const accents = [brand.red, brand.yellow, brand.blue, brand.orange];
              const color = accents[i % accents.length];
              return (
                <View
                  key={s.label}
                  style={[
                    styles.trustItem,
                    { borderColor: theme.cardBorder },
                    isSmallPhone && styles.trustItemHalf,
                  ]}
                >
                  <Ionicons name={s.icon} size={15} color={color} />
                  <Text style={[styles.trustValue, { color: theme.text }]}>{s.value}</Text>
                  <Text style={[styles.trustLabel, { color: theme.textSubtle }]} numberOfLines={1}>
                    {s.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.mockup, !isDesktop && styles.mockupMobile, { maxWidth: width - horizontalPadding * 2 }]}>
          <DashboardMockup />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sectionSm,
    minHeight: 480,
    position: 'relative',
    overflow: 'hidden',
  },
  inner: { gap: 32, zIndex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  copy: { gap: spacing.md, zIndex: 2, width: '100%' },
  copyDesktop: { flex: 1, maxWidth: 560 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    marginBottom: spacing.xs,
    maxWidth: '100%',
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, flexShrink: 0 },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    flexShrink: 1,
  },
  sub: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: spacing.md,
    maxWidth: 480,
  },
  ctas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: spacing.lg,
    width: '100%',
  },
  ctaFull: { width: '100%' },
  trust: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  trustGrid: {
    justifyContent: 'space-between',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    flexShrink: 1,
  },
  trustItemHalf: {
    width: '48%',
  },
  trustValue: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  trustLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    flexShrink: 1,
  },
  mockup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mockupMobile: {
    marginTop: spacing.md,
  },
});
