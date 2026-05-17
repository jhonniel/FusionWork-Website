import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BLOG_POSTS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from '../ui/GlassCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

export function BlogSection() {
  const { theme } = useAppTheme();
  const { isMobile, isTablet } = useResponsive();
  const itemWidth = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Insights"
        title="From Our Blog"
        subtitle="Thoughts on technology, design, and digital transformation in the Philippines."
      />
      <View style={styles.grid}>
        {BLOG_POSTS.map((post) => (
          <View
            key={post.id}
            style={{ width: itemWidth, padding: 8 }}
          >
            <GlassCard>
              <View style={[styles.thumb, { backgroundColor: `${brand.red}18` }]}>
                <Text style={[styles.thumbLabel, { color: brand.red }]}>Article</Text>
              </View>
              <Text style={[styles.date, { color: theme.textSubtle }]}>
                {post.date} · {post.readTime}
              </Text>
              <Text style={[styles.title, { color: theme.text }]}>{post.title}</Text>
              <Text style={[styles.excerpt, { color: theme.textMuted }]} numberOfLines={2}>
                {post.excerpt}
              </Text>
            </GlassCard>
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  thumb: {
    height: 112,
    borderRadius: radius.md,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  date: {
    fontFamily: fonts.medium,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 8,
  },
  excerpt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
  },
});
