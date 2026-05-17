import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PORTFOLIO } from '../../constants/portfolio';
import { useResponsive } from '../../hooks/useResponsive';
import { spacing } from '../../theme/typography';
import { FuturisticButton } from '../ui/FuturisticButton';
import { PortfolioCard } from '../ui/PortfolioCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

type Props = { onViewAll?: () => void; limit?: number };

export function PortfolioSection({ onViewAll, limit }: Props) {
  const { isMobile, isTablet } = useResponsive();
  const items = limit ? PORTFOLIO.slice(0, limit) : PORTFOLIO;
  const itemWidth = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="Portfolio"
        title="Featured Projects"
        subtitle="A glimpse of the digital products we've engineered for clients across industries."
      />
      <View style={styles.grid}>
        {items.map((p) => (
          <View
            key={p.id}
            style={{ width: itemWidth, padding: 8 }}
          >
            <PortfolioCard project={p} />
          </View>
        ))}
      </View>
      {onViewAll ? (
        <FuturisticButton
          label="View Full Portfolio"
          variant="secondary"
          onPress={onViewAll}
          style={{ alignSelf: 'center', marginTop: spacing.lg }}
        />
      ) : null}
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
});
