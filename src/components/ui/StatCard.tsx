import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useAppTheme } from '../../context/ThemeContext';
import { fonts } from '../../theme/typography';
import { CountUpValue } from './CountUpValue';
import { GlassCard } from './GlassCard';

type Props = {
  value: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  index?: number;
  countUp?: boolean;
};

export function StatCard({ value, label, icon, index = 0, countUp = false }: Props) {
  const { theme } = useAppTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withDelay(
      index * 70,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      index * 70,
      withTiming(0, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, animatedStyle]}>
      <GlassCard style={styles.card}>
        <Ionicons name={icon} size={24} color={theme.gradient[0]} />
        {countUp ? (
          <CountUpValue
            value={value}
            style={[styles.value, { color: theme.text }]}
            delay={index * 100}
          />
        ) : (
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
        )}
        <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minWidth: 140 },
  card: { alignItems: 'center', gap: 6, paddingVertical: 28 },
  value: {
    fontFamily: fonts.display,
    fontSize: 32,
    marginTop: 10,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
});
