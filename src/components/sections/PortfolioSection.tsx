import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { PORTFOLIO } from '../../constants/portfolio';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { fonts, spacing } from '../../theme/typography';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { PortfolioCard } from '../ui/PortfolioCard';
import { PortfolioCarousel } from './PortfolioCarousel';

const sectionOverflow: ViewStyle = { overflow: 'visible' };

type Props = {
  /** Carousel on home; grid on the full portfolio page */
  variant?: 'carousel' | 'grid';
};

function PortfolioGrid() {
  const { theme } = useAppTheme();
  const { isMobile, isTablet } = useResponsive();
  const itemWidth = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  return (
    <>
      <View style={styles.grid}>
        {PORTFOLIO.map((project) => (
          <View key={project.id} style={[styles.gridItem, { width: itemWidth }]}>
            <PortfolioCard project={project} />
          </View>
        ))}
      </View>
      <Text style={[styles.moreNote, { color: theme.textMuted }]}>
        More projects will be added here as we continue to ship for our partners.
      </Text>
    </>
  );
}

export function PortfolioSection({ variant = 'carousel' }: Props) {
  return (
    <SectionContainer style={sectionOverflow}>
      <SectionHeader
        eyebrow="Portfolio"
        title="Featured Projects"
        subtitle="A glimpse of the digital products we've engineered for clients across industries."
      />
      {variant === 'carousel' ? <PortfolioCarousel /> : <PortfolioGrid />}
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
  gridItem: {
    padding: 8,
    alignSelf: 'stretch',
  },
  moreNote: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: spacing.xl,
    maxWidth: 520,
    alignSelf: 'center',
  },
});
