import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { INDUSTRIES } from '../../constants/landing';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { getAccentColor } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

function IndustryRow({
  title,
  description,
  icon,
  accent,
  index,
}: (typeof INDUSTRIES)[number] & { index: number }) {
  const { theme } = useAppTheme();
  const color = getAccentColor(accent);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withDelay(
      index * 60,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      index * 60,
      withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }),
    );
  }, [index, opacity, translateY]);

  const anim = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.item,
        {
          borderColor: theme.cardBorder,
          backgroundColor: theme.surface,
        },
        anim,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${color}16` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.desc, { color: theme.textMuted }]}>{description}</Text>
      </View>
    </Animated.View>
  );
}

export function IndustriesSection() {
  const { isMobile, isTablet } = useResponsive();
  const width = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Industries"
        title="Built for Real-World Sectors"
        subtitle="We partner with teams across the Philippines—from local operators to growing digital brands."
      />
      <View style={styles.grid}>
        {INDUSTRIES.map((item, index) => (
          <View key={item.id} style={{ width, padding: 8 }}>
            <IndustryRow {...item} index={index} />
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
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 18,
    minHeight: 112,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
  },
});
