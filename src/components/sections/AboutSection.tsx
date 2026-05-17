import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COMPANY } from '../../constants/company';
import { useAppTheme } from '../../context/ThemeContext';
import { brand } from '../../theme/brand';
import { useResponsive } from '../../hooks/useResponsive';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from '../ui/GlassCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

export function AboutSection({ compact = false }: { compact?: boolean }) {
  const { theme } = useAppTheme();
  const { isDesktop } = useResponsive();

  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="About Us"
        title={compact ? 'Who We Are' : 'Our Story'}
        subtitle={COMPANY.about}
      />

      <View style={[styles.grid, isDesktop && { flexDirection: 'row' }]}>
        <GlassCard style={{ flex: 1 }}>
          <View style={[styles.iconWrap, { backgroundColor: `${brand.red}15` }]}>
            <Ionicons name="flag-outline" size={22} color={brand.red} />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Mission</Text>
          <Text style={[styles.cardBody, { color: theme.textMuted }]}>{COMPANY.mission}</Text>
        </GlassCard>
        <GlassCard style={{ flex: 1 }}>
          <View style={[styles.iconWrap, { backgroundColor: `${brand.purple}15` }]}>
            <Ionicons name="telescope-outline" size={22} color={brand.purple} />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Vision</Text>
          <Text style={[styles.cardBody, { color: theme.textMuted }]}>{COMPANY.vision}</Text>
        </GlassCard>
      </View>

      <Text style={[styles.valuesTitle, { color: theme.text }]}>Core Values</Text>
      <View style={styles.values}>
        {COMPANY.values.map((v) => (
          <View
            key={v}
            style={[styles.valuePill, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}
          >
            <Text style={[styles.valueText, { color: theme.text }]}>{v}</Text>
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 16, marginBottom: 32 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    marginBottom: 8,
  },
  cardBody: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 23,
  },
  valuesTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  values: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  valuePill: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  valueText: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
});
