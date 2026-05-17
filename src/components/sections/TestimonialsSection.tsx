import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TESTIMONIALS } from '../../constants/testimonials';
import { useResponsive } from '../../hooks/useResponsive';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { TestimonialCard } from '../ui/TestimonialCard';

export function TestimonialsSection() {
  const { isDesktop, isMobile } = useResponsive();

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Testimonials"
        title="What Our Clients Say"
        subtitle="Real feedback from partners who trust FUSION WORK with their digital future."
      />
      <View style={[styles.grid, isDesktop && { flexDirection: 'row' }]}>
        {TESTIMONIALS.map((t) => (
          <View key={t.id} style={{ flex: isDesktop ? 1 : undefined, width: isMobile ? '100%' : undefined, padding: 8 }}>
            <TestimonialCard testimonial={t} />
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 0 },
});
