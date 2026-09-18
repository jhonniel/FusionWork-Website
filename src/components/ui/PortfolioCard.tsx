import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PortfolioProject } from '../../constants/portfolio';
import { useAppTheme } from '../../context/ThemeContext';
import { fonts } from '../../theme/typography';
import { GlassCard } from './GlassCard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CARD_HEIGHT = 400;
const BANNER_HEIGHT = 200;
const SOFT = { duration: 200 };

type Props = { project: PortfolioProject; onPress?: () => void };

export function PortfolioCard({ project, onPress }: Props) {
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);
  const imageScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onHoverIn={() => {
        scale.value = withTiming(1.012, SOFT);
        imageScale.value = withTiming(1.04, SOFT);
      }}
      onHoverOut={() => {
        scale.value = withTiming(1, SOFT);
        imageScale.value = withTiming(1, SOFT);
      }}
      onPressIn={() => {
        scale.value = withTiming(0.99, { duration: 120 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, SOFT);
        imageScale.value = withTiming(1, SOFT);
      }}
      style={[styles.wrap, cardStyle]}
    >
      <GlassCard padding="none" style={styles.card}>
        <View style={styles.bannerClip}>
          <Animated.View style={[styles.bannerAnim, imageStyle]}>
            <Image
              source={project.image}
              style={styles.bannerImage}
              resizeMode="cover"
              accessibilityLabel={`${project.title} preview`}
            />
          </Animated.View>
        </View>
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
    </AnimatedPressable>
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
  bannerClip: {
    height: BANNER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  bannerAnim: {
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    height: '100%',
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
