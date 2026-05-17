import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { STATS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { fonts } from '../../theme/typography';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { StatCard } from '../ui/StatCard';

export function WhyChooseUsSection() {
  const { theme } = useAppTheme();
  const { isMobile, isSmallPhone } = useResponsive();

  const itemWidth = isSmallPhone ? '50%' : isMobile ? '50%' : '25%';

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Why Choose Us"
        title="Trusted by Growing Businesses"
        subtitle="We combine deep technical expertise with a partnership mindset to deliver results."
      />
      <View style={styles.stats}>
        {STATS.map((s, i) => (
          <View key={s.label} style={{ width: itemWidth, padding: 6 }}>
            <StatCard
              value={s.value}
              label={s.label}
              icon={s.icon}
              index={i}
              countUp={s.label === 'Projects' || s.label === 'Clients'}
            />
          </View>
        ))}
      </View>
      <Text style={[styles.note, { color: theme.textMuted }]}>
        Partner with a team that ships fast, communicates clearly, and stands behind every release.
      </Text>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    width: '100%',
  },
  note: {
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
});
