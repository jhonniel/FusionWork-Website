import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { brand } from '../../theme/brand';
import { fonts, radius, spacing } from '../../theme/typography';
import { GradientHeading } from './GradientHeading';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: Props) {
  return (
    <View style={[styles.wrap, align === 'center' && styles.center]}>
      {eyebrow ? (
        <View style={[styles.eyebrowWrap, { backgroundColor: `${brand.red}14`, borderColor: `${brand.red}33` }]}>
          <View style={[styles.dot, { backgroundColor: brand.red }]} />
          <Text style={[styles.eyebrow, { color: brand.red }]}>{eyebrow}</Text>
        </View>
      ) : null}
      <GradientHeading
        title={title}
        subtitle={subtitle}
        size="lg"
        align={align}
        gradientTitle={align === 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.xl },
  center: { alignItems: 'center' },
  eyebrowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    marginBottom: spacing.md,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
