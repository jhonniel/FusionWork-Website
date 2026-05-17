import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { PortfolioProject } from '../../constants/portfolio';
import { useAppTheme } from '../../context/ThemeContext';
import { fonts } from '../../theme/typography';
import { GlassCard } from './GlassCard';

const CARD_HEIGHT = 400;
const BANNER_HEIGHT = 200;

type Props = { project: PortfolioProject; onPress?: () => void };

export function PortfolioCard({ project, onPress }: Props) {
  const { theme } = useAppTheme();

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <GlassCard padding="none" style={styles.card}>
        <Image
          source={project.image}
          style={styles.bannerImage}
          resizeMode="cover"
          accessibilityLabel={`${project.title} preview`}
        />
        <View style={styles.body}>
          <Text style={[styles.category, { color: theme.gradient[1] }]} numberOfLines={1}>
            {project.category}
          </Text>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {project.title}
          </Text>
          <Text style={[styles.desc, { color: theme.textMuted }]} numberOfLines={4}>
            {project.description}
          </Text>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: CARD_HEIGHT,
    width: '100%',
  },
  card: {
    flex: 1,
    overflow: 'hidden',
    height: CARD_HEIGHT,
  },
  bannerImage: {
    height: BANNER_HEIGHT,
    width: '100%',
  },
  body: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  category: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
});
