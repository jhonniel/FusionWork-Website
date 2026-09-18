import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BlogPost } from '../../constants/blog';
import { useAppTheme } from '../../context/ThemeContext';
import { getAccentColor } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from './GlassCard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  post: BlogPost;
  onPress: () => void;
};

export function BlogCard({ post, onPress }: Props) {
  const { theme } = useAppTheme();
  const accent = getAccentColor(post.accent);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.99, { duration: 100 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 160 });
      }}
      style={[styles.wrap, animatedStyle]}
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${post.title}`}
    >
      <GlassCard style={styles.card}>
        <LinearGradient
          colors={[`${accent}28`, `${accent}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.thumb}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${accent}22`, borderColor: `${accent}44` }]}>
            <Ionicons name={post.icon} size={28} color={accent} />
          </View>
          <Text style={[styles.category, { color: accent }]}>{post.category}</Text>
        </LinearGradient>

        <Text style={[styles.date, { color: theme.textSubtle }]}>
          {post.date} · {post.readTime}
        </Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={[styles.excerpt, { color: theme.textMuted }]} numberOfLines={3}>
          {post.excerpt}
        </Text>
        <Text style={[styles.cta, { color: accent }]}>Read article →</Text>
      </GlassCard>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: { flex: 1, minHeight: 320 },
  thumb: {
    height: 120,
    borderRadius: radius.md,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.1,
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
    flex: 1,
  },
  cta: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    marginTop: 14,
  },
});
