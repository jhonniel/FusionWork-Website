import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SERVICES } from '../../constants/services';
import { useResponsive } from '../../hooks/useResponsive';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceCard } from '../ui/ServiceCard';

export function ServicesSection() {
  const { isMobile, isTablet, columns } = useResponsive();

  const itemWidth = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Services"
        title="Digital Solutions That Scale"
        subtitle="From concept to deployment, we craft technology that drives measurable business impact."
      />
      <View style={styles.grid}>
        {SERVICES.map((s, i) => (
          <View key={s.id} style={{ width: itemWidth, padding: 8 }}>
            <ServiceCard service={s} index={i} />
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    width: '100%',
  },
});
