import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { ServiceItem } from '../../constants/services';
import { useAppTheme } from '../../context/ThemeContext';
import { getAccentColor } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from './GlassCard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  service: ServiceItem;
  index?: number;
  onPress?: () => void;
};

export function ServiceCard({ service, index = 0, onPress }: Props) {
  const { theme } = useAppTheme();
  const accent = getAccentColor(service.accent);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const num = String(index + 1).padStart(2, '0');

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(1.01, { damping: 16 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 16 });
      }}
      style={[styles.wrap, animatedStyle]}
    >
      <GlassCard glow glowColor={accent}>
        <View style={styles.top}>
          <LinearGradient
            colors={[`${accent}33`, `${accent}08`]}
            style={[styles.iconBg, { borderColor: `${accent}44` }]}
          >
            <Ionicons name={service.icon} size={22} color={accent} />
          </LinearGradient>
          <Text style={[styles.num, { color: theme.textMuted, opacity: 0.35 }]}>{num}</Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{service.title}</Text>
        <Text style={[styles.desc, { color: theme.textMuted }]} numberOfLines={3}>
          {service.description}
        </Text>
        <View style={styles.learn}>
          <Text style={[styles.learnText, { color: accent }]}>Learn more</Text>
          <Ionicons name="arrow-forward" size={14} color={accent} />
        </View>
      </GlassCard>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minWidth: 280 },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    fontFamily: fonts.display,
    fontSize: 28,
    opacity: 0.35,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    marginBottom: 8,
    lineHeight: 24,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  learn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  learnText: { fontFamily: fonts.semibold, fontSize: 13 },
});
