import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, spacing } from '../../theme/typography';
import { GradientText } from './GradientText';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradientTitle?: boolean;
};

const sizeMap = {
  sm: { title: 24, subtitle: 14, line: 30 },
  md: { title: 30, subtitle: 15, line: 36 },
  lg: { title: 34, subtitle: 16, line: 40 },
  xl: { title: 40, subtitle: 17, line: 46 },
};

export function GradientHeading({
  title,
  subtitle,
  align = 'center',
  size = 'lg',
  gradientTitle = false,
}: Props) {
  const { theme } = useAppTheme();
  const { isMobile, isSmallPhone } = useResponsive();
  const base = sizeMap[isSmallPhone && size === 'xl' ? 'md' : isMobile && (size === 'xl' || size === 'lg') ? 'md' : size];
  const alignStyle = align === 'center' ? styles.center : styles.left;

  return (
    <View style={[styles.wrap, alignStyle]}>
      <LinearGradient
        colors={[brand.red, brand.redBright]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.accent, align === 'center' && styles.accentCenter]}
      />
      {gradientTitle ? (
        <GradientText
          style={{
            fontSize: base.title,
            lineHeight: base.line,
            textAlign: align,
          }}
        >
          {title}
        </GradientText>
      ) : (
        <Text
          style={[
            styles.title,
            {
              fontSize: base.title,
              lineHeight: base.line,
              color: theme.text,
              textAlign: align,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: base.subtitle,
              color: theme.textMuted,
              textAlign: align,
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg, gap: spacing.md, width: '100%' },
  center: { alignItems: 'center' },
  left: { alignItems: 'flex-start' },
  accent: {
    width: 48,
    height: 3,
    borderRadius: 2,
  },
  accentCenter: { alignSelf: 'center' },
  title: {
    fontFamily: fonts.display,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontFamily: fonts.regular,
    lineHeight: 24,
    maxWidth: 580,
    width: '100%',
  },
});
